"use strict";

require("dotenv").config();

const path = require("path");
const express = require("express");
const cors = require("cors");

const app = express();
const PORT = Number(process.env.PORT) || 3000;
const GEMINI_API_URL = "https://generativelanguage.googleapis.com/v1beta/interactions";
const GEMINI_MODEL = process.env.GEMINI_MODEL || "gemini-3.1-flash-lite";
const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
const AI_REQUEST_TIMEOUT_MS = 120000;

app.use(cors());
app.use(express.json({ limit: "1mb" }));

const AI_ANALYSIS_SCHEMA = {
  type: "object",
  additionalProperties: false,
  properties: {
    status: { type: "string", enum: ["ok", "warning", "error"] },
    summary: { type: "string" },
    rootCauses: {
      type: "array",
      items: {
        type: "object",
        additionalProperties: false,
        properties: {
          node: { type: "string" },
          stream: { type: "string" },
          issue: { type: "string" },
          severity: { type: "string", enum: ["info", "warning", "error"] },
        },
        required: ["node", "stream", "issue", "severity"],
      },
    },
    recommendations: {
      type: "array",
      items: {
        type: "object",
        additionalProperties: false,
        properties: {
          action: { type: "string" },
          target: { type: "string" },
          message: { type: "string" },
        },
        required: ["action", "target", "message"],
      },
    },
    safeToAutoApply: {
      type: "boolean",
      description: "Must always be false because AI Analyze is read-only.",
    },
  },
  required: ["status", "summary", "rootCauses", "recommendations", "safeToAutoApply"],
};

const REQUIRED_RESPONSE_SHAPE = `{
  "status": "ok | warning | error",
  "summary": "string",
  "rootCauses": [
    { "node": "string", "stream": "string", "issue": "string", "severity": "info | warning | error" }
  ],
  "recommendations": [
    { "action": "string", "target": "string", "message": "string" }
  ],
  "safeToAutoApply": false
}`;

function buildAnalyzePrompt(snapshot) {
  return [
    "You are a refinery CDU mass-balance diagnostic assistant.",
    "Analyze only the supplied snapshot. Treat all data as read-only evidence.",
    "Do not propose automatic edits and do not claim to change flows, streams, nodes, constraints, or the solver.",
    "Identify likely causes of imbalance or target misses, distinguish missing data from real imbalance, and recommend manual checks.",
    "Use concise Indonesian. Refer only to node and stream identifiers present in the snapshot.",
    "Return one valid JSON object only, without markdown or commentary.",
    `The JSON must match this schema exactly:\n${REQUIRED_RESPONSE_SHAPE}`,
    "safeToAutoApply must always be false.",
    `Snapshot:\n${JSON.stringify(snapshot)}`,
  ].join("\n\n");
}

function validateSnapshot(snapshot) {
  return snapshot
    && typeof snapshot === "object"
    && !Array.isArray(snapshot)
    && snapshot.crude
    && snapshot.intake
    && Array.isArray(snapshot.unbalancedNodes)
    && Array.isArray(snapshot.relevantStreams);
}

function normalizeAiResult(value) {
  if (!value || typeof value !== "object" || Array.isArray(value)) {
    throw new Error("Gemini returned a non-object JSON response");
  }

  const allowedStatuses = new Set(["ok", "warning", "error"]);
  const allowedSeverities = new Set(["info", "warning", "error"]);
  if (!allowedStatuses.has(value.status) || typeof value.summary !== "string") {
    throw new Error("Gemini response does not match the required status/summary schema");
  }
  if (!Array.isArray(value.rootCauses) || !Array.isArray(value.recommendations)) {
    throw new Error("Gemini response does not contain the required arrays");
  }

  return {
    status: value.status,
    summary: value.summary,
    rootCauses: value.rootCauses.map((item) => ({
      node: typeof item?.node === "string" ? item.node : "",
      stream: typeof item?.stream === "string" ? item.stream : "",
      issue: typeof item?.issue === "string" ? item.issue : "",
      severity: allowedSeverities.has(item?.severity) ? item.severity : "info",
    })),
    recommendations: value.recommendations.map((item) => ({
      action: typeof item?.action === "string" ? item.action : "review-manually",
      target: typeof item?.target === "string" ? item.target : "CDU mass balance",
      message: typeof item?.message === "string" ? item.message : "Review manually.",
    })),
    safeToAutoApply: false,
  };
}

function extractGeminiOutputText(payload) {
  const steps = Array.isArray(payload?.steps)
    ? payload.steps
    : [];

  return steps
    .filter((step) => step?.type === "model_output")
    .flatMap((step) =>
      Array.isArray(step.content)
        ? step.content
        : []
    )
    .filter(
      (content) =>
        content?.type === "text" &&
        typeof content.text === "string"
    )
    .map((content) => content.text)
    .join("")
    .trim();
}

async function analyzeBalanceWithGemini(snapshot, signal) {
  if (!GEMINI_API_KEY) {
    throw new Error("GEMINI_API_KEY belum dikonfigurasi di environment server.");
  }

  const geminiResponse = await fetch(GEMINI_API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-goog-api-key": GEMINI_API_KEY,
    },
    signal,
    body: JSON.stringify({
      model: GEMINI_MODEL,
      input: buildAnalyzePrompt(snapshot),
      store: false,
      response_format: {
        type: "text",
        mime_type: "application/json",
        schema: AI_ANALYSIS_SCHEMA,
      },
    }),
  });

  const rawResponse = await geminiResponse.text();

  console.log(
    `[Gemini] HTTP status: ${geminiResponse.status}`
  );

  if (!geminiResponse.ok) {
    console.error(
      `[Gemini] HTTP ${geminiResponse.status}`,
      rawResponse.slice(0, 2000)
    );

    throw new Error(
      `Gemini API HTTP ${geminiResponse.status}: ${rawResponse.slice(0, 500)}`
    );
  }

  let payload;

  try {
    payload = JSON.parse(rawResponse);
  } catch {
    throw new Error(
      "Respons Gemini API bukan JSON yang valid."
    );
  }

  console.log(
    "[Gemini] step types:",
    Array.isArray(payload?.steps)
      ? payload.steps.map((step) => step?.type)
      : []
  );

  const outputText =
    extractGeminiOutputText(payload);

  console.log(
    "[Gemini] output text found:",
    Boolean(outputText)
  );

  if (!outputText) {
    console.error(
      "[Gemini] model_output text tidak ditemukan:",
      JSON.stringify(
        {
          status: payload?.status,
          model: payload?.model,
          steps: payload?.steps,
        },
        null,
        2
      )
    );

    throw new Error(
      "Gemini berhasil merespons, tetapi model_output text tidak ditemukan."
    );
  }

  let parsedResult;

  try {
    parsedResult = JSON.parse(outputText);
  } catch {
    console.error(
      "[Gemini] Invalid structured output:",
      outputText.slice(0, 2000)
    );

    throw new Error(
      "Structured output Gemini bukan JSON yang valid."
    );
  }

  const normalizedResult =
    normalizeAiResult(parsedResult);

  normalizedResult.safeToAutoApply = false;

  return normalizedResult;
}

app.post("/api/ai/analyze-balance", async (req, res) => {
  if (!validateSnapshot(req.body)) {
    return res.status(400).json({
      ok: false,
      error: "Snapshot mass balance tidak valid.",
      safeToAutoApply: false,
    });
  }

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), AI_REQUEST_TIMEOUT_MS);
  try {
    const result = await analyzeBalanceWithGemini(req.body, controller.signal);
    return res.json({
      ok: true,
      provider: "google-gemini",
      model: GEMINI_MODEL,
      result,
    });
  } catch (error) {
    const message = error.name === "AbortError"
      ? "Gemini tidak merespons dalam 120 detik."
      : error.message;
    console.error("AI balance analysis failed:", message);
    return res.status(502).json({
      ok: false,
      error: message,
      safeToAutoApply: false,
    });
  } finally {
    clearTimeout(timeout);
  }
});

app.use(express.static(__dirname));

app.get("*", (req, res, next) => {
  if (req.path.startsWith("/api/")) return next();
  return res.sendFile(path.join(__dirname, "index.html"));
});

app.use((req, res) => {
  res.status(404).json({ error: "Endpoint tidak ditemukan." });
});

app.listen(PORT, "127.0.0.1", () => {
  console.log(`RefineryMap CDU Mass Balance: http://localhost:${PORT}`);
  console.log(`AI provider: Google Gemini Developer API (${GEMINI_MODEL})`);
});
