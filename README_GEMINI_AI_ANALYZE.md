# Google Gemini AI Analyze

Backend AI Analyze menggunakan Google Gemini Developer API melalui Interactions API. API key hanya dibaca oleh `server.js` dari environment dan tidak pernah dikirim ke frontend.

## Konfigurasi

1. Jalankan `npm install` dari folder project.
2. Salin `.env.example` menjadi `.env`.
3. Isi environment:

   ```dotenv
   GEMINI_API_KEY=replace_with_your_key
   GEMINI_MODEL=gemini-3.1-flash-lite
   ```

4. Jalankan `npm start`.
5. Buka `http://localhost:3000` dan gunakan tombol **AI Analyze**.

`GEMINI_MODEL` opsional. Jika tidak diisi, backend memakai `gemini-3.1-flash-lite`.

## Integrasi backend

- Provider: Google Gemini Developer API
- API: Interactions API
- Endpoint: `https://generativelanguage.googleapis.com/v1beta/interactions`
- Authentication: header `x-goog-api-key`
- Structured output: JSON Schema melalui `response_format`
- Request stateless dengan `store: false`
- Timeout 120 detik menggunakan `AbortController`
- Endpoint aplikasi: `POST /api/ai/analyze-balance`

AI hanya menganalisis snapshot yang diberikan. Backend selalu menormalkan `safeToAutoApply` menjadi `false`.

## Format respons

Backend membaca teks hanya dari `payload.steps[]`, memilih step `model_output`, lalu menggabungkan `content.text` dengan `content.type === "text"`. Step `thought` tidak digunakan sebagai hasil analisis. Respons sukses aplikasi berbentuk:

```json
{
  "ok": true,
  "provider": "google-gemini",
  "model": "gemini-3.1-flash-lite",
  "result": {
    "status": "ok",
    "summary": "...",
    "rootCauses": [],
    "recommendations": [],
    "safeToAutoApply": false
  }
}
```

Frontend membuka `result` sebelum merender panel. Jika Gemini atau backend mengembalikan error, pesan asli ditampilkan pada summary panel untuk membantu diagnosis.

## Keamanan

- Jangan commit `.env`.
- Jangan menaruh API key di HTML, JavaScript frontend, CSS, atau source code.
- Rotasi API key yang pernah terlihat di screenshot, log, atau percakapan.
