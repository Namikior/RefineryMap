const CANVAS = {
  width: 6000,
  height: 3600,
};

const AREAS = [
  {
    id: "CDU",
    name: "Crude Distillation Unit",
    subtitle: "Atmospheric distillation and stabilization",
    x: 140,
    y: 140,
    width: 1000,
    height: 650,
    color: "#0f4ea8",
  },
  {
    id: "HVU",
    name: "High Vacuum Unit",
    subtitle: "Vacuum distillation of reduced crude",
    x: 1320,
    y: 140,
    width: 960,
    height: 620,
    color: "#0f4ea8",
  },
  {
    id: "DHP",
    name: "Distillate Hydrotreating Process",
    subtitle: "Hydrotreating and sulfur removal",
    x: 140,
    y: 980,
    width: 1040,
    height: 620,
    color: "#e6262e",
  },
  {
    id: "EWTP",
    name: "Effluent Water Treatment Plant",
    subtitle: "Wastewater separation and polishing",
    x: 1320,
    y: 900,
    width: 980,
    height: 720,
    color: "#13a65b",
  },
  {
    id: "UTIL",
    name: "Storage & Utilities",
    subtitle: "Product rundown, air, steam, and cooling water",
    x: 2520,
    y: 270,
    width: 820,
    height: 1120,
    color: "#59677a",
  },
];

const NODES = [
  {
    id: "node-cdu-feed",
    tag: "R-TANK",
    name: "Crude Feed Tank Farm",
    unit: "CDU",
    type: "Storage",
    area: "Feed & Preheat",
    x: 260,
    y: 310,
    width: 160,
    height: 70,
    status: "Normal",
    temperature: "32 C",
    pressure: "1.0 barg",
    description: "Sumber umpan crude dari tank farm sebelum dipompa menuju rangkaian preheat CDU.",
    functions: ["Menjaga ketersediaan crude feed.", "Memberi buffer operasi sebelum pompa charge."],
  },
  {
    id: "node-cdu-pump",
    tag: "P-101",
    name: "Crude Charge Pump",
    unit: "CDU",
    type: "Pump",
    area: "Feed & Preheat",
    x: 470,
    y: 310,
    width: 160,
    height: 70,
    status: "Normal",
    temperature: "38 C",
    pressure: "9.5 barg",
    description: "Pompa utama yang menaikkan tekanan crude menuju preheat train.",
    functions: ["Mengalirkan crude secara stabil.", "Menjaga tekanan masuk heat exchanger."],
  },
  {
    id: "node-cdu-cold-preheat",
    tag: "E-101",
    name: "Cold Preheat System",
    unit: "CDU",
    type: "Heat Exchanger",
    area: "Feed & Preheat",
    x: 680,
    y: 310,
    width: 180,
    height: 70,
    status: "Normal",
    temperature: "145 C",
    pressure: "8.8 barg",
    description: "Rangkaian penukar panas awal untuk mengambil panas dari produk CDU.",
    functions: ["Memulihkan panas produk.", "Mengurangi beban furnace."],
  },
  {
    id: "node-cdu-desalter",
    tag: "V-101",
    name: "Desalter",
    unit: "CDU",
    type: "Vessel",
    area: "Feed Treatment",
    x: 900,
    y: 310,
    width: 160,
    height: 70,
    status: "Normal",
    temperature: "138 C",
    pressure: "8.2 barg",
    description: "Vessel pemisah garam dan air dari crude sebelum dipanaskan lebih lanjut.",
    functions: ["Mengurangi garam dan sedimen.", "Melindungi furnace dan kolom dari fouling/korosi."],
  },
  {
    id: "node-cdu-hot-preheat",
    tag: "E-102",
    name: "Hot Preheat System",
    unit: "CDU",
    type: "Heat Exchanger",
    area: "Feed & Preheat",
    x: 460,
    y: 535,
    width: 175,
    height: 70,
    status: "Normal",
    temperature: "238 C",
    pressure: "7.4 barg",
    description: "Preheat lanjutan sebelum crude masuk charge heater.",
    functions: ["Menaikkan temperatur crude.", "Mengoptimalkan heat recovery."],
  },
  {
    id: "node-cdu-heater",
    tag: "H-101",
    name: "Crude Charge Heater",
    unit: "CDU",
    type: "Fired Heater",
    area: "Furnace",
    x: 690,
    y: 535,
    width: 180,
    height: 76,
    status: "Warning",
    temperature: "352 C",
    pressure: "6.8 barg",
    description: "Furnace yang menaikkan temperatur crude sampai kondisi flash zone kolom.",
    functions: ["Memberi panas utama feed CDU.", "Mengatur target flash zone temperature."],
  },
  {
    id: "node-cdu-main-column",
    tag: "C-101",
    name: "Main Fractionator",
    unit: "CDU",
    type: "Column",
    area: "Fractionation",
    x: 925,
    y: 535,
    width: 190,
    height: 84,
    status: "Normal",
    temperature: "350 C",
    pressure: "2.5 barg",
    description: "Kolom distilasi atmosferik untuk memisahkan crude berdasarkan rentang volatilitas.",
    functions: ["Memisahkan naphtha, kerosene, gasoil, dan residu.", "Menjadi pusat neraca panas CDU."],
  },
  {
    id: "node-cdu-overhead",
    tag: "V-102",
    name: "Overhead Accumulator",
    unit: "CDU",
    type: "Accumulator",
    area: "Overhead",
    x: 930,
    y: 690,
    width: 175,
    height: 70,
    status: "Normal",
    temperature: "44 C",
    pressure: "1.8 barg",
    description: "Drum overhead yang memisahkan reflux, hydrocarbon liquid, dan gas ringan.",
    functions: ["Menampung kondensat overhead.", "Menstabilkan reflux ke kolom."],
  },
  {
    id: "node-cdu-stabilizer",
    tag: "C-102",
    name: "Stabilizer",
    unit: "CDU",
    type: "Column",
    area: "Stabilization",
    x: 700,
    y: 690,
    width: 160,
    height: 70,
    status: "Normal",
    temperature: "164 C",
    pressure: "7.2 barg",
    description: "Kolom stabilizer untuk melepas komponen ringan dari naphtha.",
    functions: ["Menstabilkan naphtha.", "Mengirim gas ringan ke LPG/fuel gas recovery."],
  },
  {
    id: "node-hvu-feed",
    tag: "R-201",
    name: "Reduced Crude Feed",
    unit: "HVU",
    type: "Feed",
    area: "Vacuum Feed",
    x: 1450,
    y: 315,
    width: 170,
    height: 70,
    status: "Normal",
    temperature: "345 C",
    pressure: "2.0 barg",
    description: "Reduced crude dari CDU yang menjadi feed utama HVU.",
    functions: ["Menerima bottom CDU.", "Menjaga feed vacuum unit tetap stabil."],
  },
  {
    id: "node-hvu-pump",
    tag: "P-201",
    name: "HVU Feed Pump",
    unit: "HVU",
    type: "Pump",
    area: "Vacuum Feed",
    x: 1660,
    y: 315,
    width: 160,
    height: 70,
    status: "Normal",
    temperature: "348 C",
    pressure: "6.2 barg",
    description: "Pompa feed untuk mengalirkan reduced crude ke vacuum heater.",
    functions: ["Menjaga aliran feed HVU.", "Menaikkan tekanan menuju heater."],
  },
  {
    id: "node-hvu-heater",
    tag: "H-201",
    name: "Vacuum Charge Heater",
    unit: "HVU",
    type: "Fired Heater",
    area: "Vacuum Heater",
    x: 1870,
    y: 315,
    width: 180,
    height: 76,
    status: "Warning",
    temperature: "402 C",
    pressure: "4.9 barg",
    description: "Heater HVU untuk mencapai temperatur pemisahan pada tekanan vakum.",
    functions: ["Memanaskan feed HVU.", "Menjaga vaporization tanpa cracking berlebihan."],
  },
  {
    id: "node-hvu-column",
    tag: "C-201",
    name: "Vacuum Column",
    unit: "HVU",
    type: "Column",
    area: "Vacuum Column",
    x: 2095,
    y: 315,
    width: 175,
    height: 84,
    status: "Normal",
    temperature: "390 C",
    pressure: "70 mmHg",
    description: "Kolom vakum untuk memisahkan LVGO, HVGO, dan vacuum residue.",
    functions: ["Memisahkan fraksi berat pada tekanan rendah.", "Mengurangi risiko thermal cracking."],
  },
  {
    id: "node-hvu-overhead",
    tag: "V-201",
    name: "Vacuum Overhead System",
    unit: "HVU",
    type: "Accumulator",
    area: "Vacuum Overhead",
    x: 2095,
    y: 510,
    width: 190,
    height: 70,
    status: "Normal",
    temperature: "42 C",
    pressure: "65 mmHg",
    description: "Sistem overhead vakum untuk kondensasi dan kontrol tekanan kolom.",
    functions: ["Menjaga kondisi vakum.", "Mengeluarkan non-condensable gas."],
  },
  {
    id: "node-hvu-ejector",
    tag: "EJ-201",
    name: "Vacuum Ejector",
    unit: "HVU",
    type: "Ejector",
    area: "Vacuum System",
    x: 1880,
    y: 510,
    width: 165,
    height: 70,
    status: "Normal",
    temperature: "55 C",
    pressure: "60 mmHg",
    description: "Ejector steam untuk mempertahankan tekanan vakum di overhead system.",
    functions: ["Membentuk dan menjaga vakum.", "Mengeluarkan gas non-condensable."],
  },
  {
    id: "node-dhp-feed",
    tag: "V-301",
    name: "Feed Surge Drum",
    unit: "DHP",
    type: "Vessel",
    area: "Feed Surge",
    x: 270,
    y: 1140,
    width: 170,
    height: 70,
    status: "Normal",
    temperature: "42 C",
    pressure: "4.1 barg",
    description: "Drum surge feed distillate sebelum masuk pompa dan preheat DHP.",
    functions: ["Meredam fluktuasi feed.", "Menjaga NPSH pompa feed."],
  },
  {
    id: "node-dhp-pump",
    tag: "P-301",
    name: "DHP Feed Pump",
    unit: "DHP",
    type: "Pump",
    area: "Feed Pumping",
    x: 480,
    y: 1140,
    width: 160,
    height: 70,
    status: "Normal",
    temperature: "48 C",
    pressure: "38 barg",
    description: "Pompa feed bertekanan tinggi untuk hydrotreating.",
    functions: ["Menaikkan tekanan feed.", "Mengirim distillate ke preheat dan reactor."],
  },
  {
    id: "node-dhp-preheat",
    tag: "E-301",
    name: "Feed Preheater",
    unit: "DHP",
    type: "Heat Exchanger",
    area: "Preheat",
    x: 690,
    y: 1140,
    width: 170,
    height: 70,
    status: "Normal",
    temperature: "285 C",
    pressure: "36 barg",
    description: "Heat exchanger feed/effluent untuk pemulihan panas sebelum reactor.",
    functions: ["Menaikkan temperatur feed.", "Mengurangi beban heater."],
  },
  {
    id: "node-dhp-reactor",
    tag: "R-301",
    name: "Hydrotreating Reactor",
    unit: "DHP",
    type: "Reactor",
    area: "Reactor",
    x: 910,
    y: 1140,
    width: 190,
    height: 80,
    status: "Normal",
    temperature: "335 C",
    pressure: "34 barg",
    description: "Reaktor katalitik untuk menghilangkan sulfur dan kontaminan distillate.",
    functions: ["Menurunkan sulfur produk.", "Mengkonversi nitrogen/olefin sesuai target operasi."],
  },
  {
    id: "node-dhp-separator",
    tag: "V-302",
    name: "High Pressure Separator",
    unit: "DHP",
    type: "Separator",
    area: "Separation",
    x: 910,
    y: 1340,
    width: 190,
    height: 70,
    status: "Normal",
    temperature: "62 C",
    pressure: "31 barg",
    description: "Separator untuk memisahkan gas recycle dari liquid product.",
    functions: ["Memisahkan fase gas dan cair.", "Menstabilkan feed ke stripper."],
  },
  {
    id: "node-dhp-stripper",
    tag: "C-301",
    name: "Product Stripper",
    unit: "DHP",
    type: "Column",
    area: "Stripper",
    x: 1110,
    y: 1340,
    width: 160,
    height: 70,
    status: "Normal",
    temperature: "176 C",
    pressure: "5.5 barg",
    description: "Kolom stripper untuk mengeluarkan light ends dan H2S dari produk hydrotreated.",
    functions: ["Membersihkan produk dari gas ringan.", "Mengirim produk ke rundown/storage."],
  },
  {
    id: "node-ewtp-inlet",
    tag: "S-401",
    name: "Wastewater Inlet",
    unit: "EWTP",
    type: "Inlet",
    area: "Wastewater Inlet",
    x: 1460,
    y: 1090,
    width: 170,
    height: 70,
    status: "Normal",
    temperature: "36 C",
    pressure: "1.1 barg",
    description: "Titik masuk wastewater proses dari desalter, drains, dan unit proses.",
    functions: ["Mengumpulkan aliran wastewater.", "Mengalirkan feed ke oil separator."],
  },
  {
    id: "node-ewtp-cpi",
    tag: "CPI-401",
    name: "Oil Separator",
    unit: "EWTP",
    type: "Separator",
    area: "Oil Separation",
    x: 1680,
    y: 1090,
    width: 170,
    height: 70,
    status: "Normal",
    temperature: "35 C",
    pressure: "1.0 barg",
    description: "Separator gravitasi untuk mengurangi kandungan minyak bebas dari wastewater.",
    functions: ["Memisahkan minyak bebas.", "Mengurangi beban unit treatment hilir."],
  },
  {
    id: "node-ewtp-eq",
    tag: "T-401",
    name: "Equalization Tank",
    unit: "EWTP",
    type: "Tank",
    area: "Equalization",
    x: 1900,
    y: 1090,
    width: 170,
    height: 70,
    status: "Normal",
    temperature: "34 C",
    pressure: "Atmospheric",
    description: "Tangki equalization untuk meredam variasi flow dan kualitas wastewater.",
    functions: ["Meratakan flow dan beban kontaminan.", "Membuat treatment downstream lebih stabil."],
  },
  {
    id: "node-ewtp-daf",
    tag: "DAF-401",
    name: "Flotation Unit",
    unit: "EWTP",
    type: "DAF",
    area: "Flotation",
    x: 2120,
    y: 1090,
    width: 170,
    height: 70,
    status: "Warning",
    temperature: "34 C",
    pressure: "3.0 barg",
    description: "Dissolved air flotation untuk mengangkat oil dan suspended solids.",
    functions: ["Mengurangi oil/grease.", "Menghilangkan padatan tersuspensi."],
  },
  {
    id: "node-ewtp-bio",
    tag: "BIO-401",
    name: "Biological Reactor",
    unit: "EWTP",
    type: "Bioreactor",
    area: "Biological Treatment",
    x: 1900,
    y: 1305,
    width: 185,
    height: 70,
    status: "Normal",
    temperature: "32 C",
    pressure: "Atmospheric",
    description: "Reaktor biologis untuk menurunkan COD/BOD wastewater.",
    functions: ["Mengurai kontaminan organik.", "Menjaga kualitas effluent."],
  },
  {
    id: "node-ewtp-clarifier",
    tag: "CL-401",
    name: "Clarifier",
    unit: "EWTP",
    type: "Clarifier",
    area: "Clarification",
    x: 2120,
    y: 1305,
    width: 170,
    height: 70,
    status: "Normal",
    temperature: "31 C",
    pressure: "Atmospheric",
    description: "Clarifier akhir untuk pemisahan sludge dan treated water.",
    functions: ["Memisahkan sludge biologis.", "Mengirim treated water ke outlet."],
  },
  {
    id: "node-util-naphtha",
    tag: "TK-501",
    name: "Naphtha Storage",
    unit: "UTIL",
    type: "Tank",
    area: "Product Storage",
    x: 2640,
    y: 455,
    width: 170,
    height: 70,
    status: "Normal",
    temperature: "37 C",
    pressure: "Atmospheric",
    description: "Tangki penyimpanan produk naphtha dari CDU/DHP.",
    functions: ["Menyimpan naphtha product.", "Menjadi buffer rundown."],
  },
  {
    id: "node-util-gasoil",
    tag: "TK-502",
    name: "Gasoil Storage",
    unit: "UTIL",
    type: "Tank",
    area: "Product Storage",
    x: 2640,
    y: 610,
    width: 170,
    height: 70,
    status: "Normal",
    temperature: "44 C",
    pressure: "Atmospheric",
    description: "Tangki penyimpanan gasoil dan distillate product.",
    functions: ["Menerima rundown gasoil.", "Menjaga inventory produk."],
  },
  {
    id: "node-util-residue",
    tag: "TK-503",
    name: "Residue Storage",
    unit: "UTIL",
    type: "Tank",
    area: "Heavy Product Storage",
    x: 2640,
    y: 765,
    width: 170,
    height: 70,
    status: "Normal",
    temperature: "82 C",
    pressure: "Atmospheric",
    description: "Tangki penyimpanan residue dan heavy bottoms.",
    functions: ["Menyimpan residue.", "Menjadi sumber feed atau blending heavy product."],
  },
  {
    id: "node-util-air",
    tag: "IA-501",
    name: "Instrument Air",
    unit: "UTIL",
    type: "Utility",
    area: "Air System",
    x: 3020,
    y: 455,
    width: 170,
    height: 70,
    status: "Normal",
    temperature: "30 C",
    pressure: "7.0 barg",
    description: "Header instrument air untuk valve dan instrumentasi refinery.",
    functions: ["Menyuplai udara instrumen.", "Menjaga valve actuator tetap responsif."],
  },
  {
    id: "node-util-steam",
    tag: "STM-501",
    name: "Steam Header",
    unit: "UTIL",
    type: "Utility",
    area: "Steam System",
    x: 3020,
    y: 610,
    width: 170,
    height: 70,
    status: "Normal",
    temperature: "235 C",
    pressure: "18 barg",
    description: "Header steam untuk heater, stripper, dan ejector.",
    functions: ["Menyuplai steam proses.", "Mendukung stripping dan vacuum ejector."],
  },
  {
    id: "node-util-cw",
    tag: "CW-501",
    name: "Cooling Water",
    unit: "UTIL",
    type: "Utility",
    area: "Cooling System",
    x: 3020,
    y: 765,
    width: 170,
    height: 70,
    status: "Normal",
    temperature: "29 C",
    pressure: "4.5 barg",
    description: "Header cooling water untuk cooler dan condenser.",
    functions: ["Menyediakan media pendingin.", "Menjaga temperatur produk dan overhead."],
  },
];

const STREAMS = [];
const PID_SYMBOLS = [];
const PID_CONNECTORS = [];

const PID_SYMBOL_CATEGORIES = [
  {
    id: "equipment",
    label: "Equipment",
    symbols: ["pump", "compressor", "verticalVessel", "horizontalVessel", "tank", "column", "heatExchanger", "reactor", "furnace", "cooler", "filter", "separator", "coolingTower"],
  },
  {
    id: "valve",
    label: "Valve",
    symbols: ["manualValve", "gateValve", "globeValve", "checkValve", "controlValve", "reliefValve"],
  },
  {
    id: "instrument",
    label: "Instruments",
    symbols: ["instrumentBubble", "FT", "FC", "TT", "TC", "PT", "PC", "LT", "LC", "IP"],
  },
  {
    id: "lines",
    label: "Lines",
    symbols: ["processConnector", "signalLine", "dashedSignalLine", "arrowLine"],
  },
  {
    id: "annotation",
    label: "Annotation",
    symbols: ["textLabel", "noteBox", "callout", "tagBubble"],
  },
];

const PID_SYMBOL_LABELS = {
  equipmentBox: "Equipment Box",
  pump: "Pump",
  compressor: "Compressor",
  verticalVessel: "Vertical Vessel",
  horizontalVessel: "Horizontal Vessel",
  tank: "Tank",
  column: "Column",
  heatExchanger: "Heat Exchanger",
  reactor: "Reactor",
  furnace: "Furnace",
  cooler: "Cooler",
  filter: "Filter",
  separator: "Separator",
  coolingTower: "Cooling Tower",
  manualValve: "Manual Valve",
  gateValve: "Gate Valve",
  globeValve: "Globe Valve",
  checkValve: "Check Valve",
  controlValve: "Control Valve",
  reliefValve: "Relief Valve",
  instrumentBubble: "Instrument",
  FT: "FT",
  FC: "FC",
  TT: "TT",
  TC: "TC",
  PT: "PT",
  PC: "PC",
  LT: "LT",
  LC: "LC",
  IP: "IP",
  processConnector: "Process Line",
  signalLine: "Signal Line",
  dashedSignalLine: "Dashed Signal",
  arrowLine: "Arrow Line",
  textLabel: "Text Label",
  noteBox: "Note Box",
  callout: "Callout",
  tagBubble: "Tag Bubble",
};

const PID_STYLE_DEFAULTS = {
  stroke: "#4b5563",
  fill: "#ffffff",
  strokeWidth: 2,
  fontSize: 12,
  fontColor: "#111827",
  fontWeight: "600",
  opacity: 1,
};

const SAMPLE_CONFIG = {
  streamVersion: 2,
  canvas: {
    width: 6000,
    height: 3600,
  },
  areas: [
    { id: "area-cdu", name: "CDU", subtitle: "Crude Distillation Unit", x: 120, y: 280, width: 760, height: 960, color: "#2563eb" },
    { id: "area-hvu", name: "HVU", subtitle: "High Vacuum Unit", x: 980, y: 300, width: 700, height: 920, color: "#7c3aed" },
    { id: "area-hcc", name: "HCC", subtitle: "Hydrocracker Complex", x: 1780, y: 280, width: 760, height: 960, color: "#059669" },
    { id: "area-rfcc", name: "RFCC", subtitle: "Resid Fluid Catalytic Cracking", x: 2640, y: 280, width: 820, height: 980, color: "#dc2626" },
    { id: "area-utilities", name: "Utilities & Hydrogen", subtitle: "Hydrogen, steam, cooling water, fuel gas", x: 1260, y: 1380, width: 1500, height: 500, color: "#0891b2" },
    { id: "area-products", name: "Product Pool", subtitle: "Intermediate and final product routing", x: 700, y: 60, width: 2300, height: 200, color: "#f59e0b" },
  ],
  nodes: [
    {
      tag: "TK-101",
      name: "Crude Oil Feed Tank",
      unit: "CDU",
      type: "Tank",
      area: "area-cdu",
      x: 170,
      y: 700,
      width: 180,
      height: 95,
      status: "Normal",
      temperature: "Ambient",
      pressure: "Atmospheric",
      description: "Crude oil feed source before preheat and desalting.",
      functions: ["Stores incoming crude oil", "Provides stable feed to CDU", "Acts as feed buffer"],
    },
    {
      tag: "E-101",
      name: "Crude Preheat Train",
      unit: "CDU",
      type: "Heat Exchanger Train",
      area: "area-cdu",
      x: 390,
      y: 700,
      width: 200,
      height: 95,
      status: "Normal",
      temperature: "120-180 C",
      pressure: "Medium",
      description: "Preheats crude using hot product streams.",
      functions: ["Recovers heat from CDU products", "Reduces furnace duty", "Improves energy efficiency"],
    },
    {
      tag: "V-101",
      name: "Desalter",
      unit: "CDU",
      type: "Vessel",
      area: "area-cdu",
      x: 630,
      y: 700,
      width: 180,
      height: 95,
      status: "Normal",
      temperature: "120-150 C",
      pressure: "Medium",
      description: "Removes salts, water, and solids from crude oil.",
      functions: ["Reduces salt content", "Protects downstream equipment", "Removes free water"],
    },
    {
      tag: "F-101",
      name: "Crude Charge Heater",
      unit: "CDU",
      type: "Furnace",
      area: "area-cdu",
      x: 390,
      y: 930,
      width: 210,
      height: 105,
      status: "Normal",
      temperature: "330-370 C",
      pressure: "Medium",
      description: "Heats desalted crude before atmospheric distillation.",
      functions: ["Raises crude temperature", "Provides vaporization duty", "Controls CDU feed temperature"],
    },
    {
      tag: "C-101",
      name: "Atmospheric Column",
      unit: "CDU",
      type: "Distillation Column",
      area: "area-cdu",
      x: 660,
      y: 900,
      width: 190,
      height: 290,
      status: "Normal",
      temperature: "Top 120 C / Bottom 360 C",
      pressure: "Low",
      description: "Main CDU fractionation column.",
      functions: ["Separates crude into fractions", "Produces naphtha, kerosene, diesel, AGO", "Sends atmospheric residue to HVU"],
    },
    {
      tag: "D-101",
      name: "CDU Overhead Drum",
      unit: "CDU",
      type: "Drum",
      area: "area-cdu",
      x: 650,
      y: 500,
      width: 190,
      height: 90,
      status: "Normal",
      temperature: "40-60 C",
      pressure: "Low",
      description: "Collects condensed overhead vapor from atmospheric column.",
      functions: ["Separates gas, naphtha, and water", "Provides reflux to atmospheric column", "Routes naphtha to product pool"],
    },
    {
      tag: "P-201",
      name: "Atmospheric Residue Pump",
      unit: "HVU",
      type: "Pump",
      area: "area-hvu",
      x: 1020,
      y: 950,
      width: 190,
      height: 90,
      status: "Normal",
      temperature: "330-360 C",
      pressure: "Medium",
      description: "Transfers atmospheric residue from CDU to HVU heater.",
      functions: ["Moves atmospheric residue", "Controls HVU feed flow", "Maintains stable feed pressure"],
    },
    {
      tag: "F-201",
      name: "Vacuum Heater",
      unit: "HVU",
      type: "Furnace",
      area: "area-hvu",
      x: 1240,
      y: 930,
      width: 210,
      height: 105,
      status: "Normal",
      temperature: "380-420 C",
      pressure: "Medium",
      description: "Heats atmospheric residue before vacuum distillation.",
      functions: ["Raises feed temperature", "Controls flash zone vaporization", "Prepares feed for vacuum column"],
    },
    {
      tag: "C-201",
      name: "Vacuum Column",
      unit: "HVU",
      type: "Vacuum Distillation Column",
      area: "area-hvu",
      x: 1480,
      y: 850,
      width: 190,
      height: 330,
      status: "Normal",
      temperature: "Top 90 C / Bottom 400 C",
      pressure: "Vacuum",
      description: "Separates atmospheric residue under vacuum into VGO and residue.",
      functions: ["Produces LVGO and HVGO", "Minimizes thermal cracking", "Sends vacuum residue to RFCC"],
    },
    {
      tag: "V-201",
      name: "Vacuum System",
      unit: "HVU",
      type: "Ejector / Condenser",
      area: "area-hvu",
      x: 1470,
      y: 610,
      width: 190,
      height: 95,
      status: "Normal",
      temperature: "Cooling service",
      pressure: "Vacuum",
      description: "Maintains low pressure in vacuum column.",
      functions: ["Maintains vacuum condition", "Removes non-condensables", "Supports HVU separation"],
    },
    {
      tag: "D-301",
      name: "HCC Feed Surge Drum",
      unit: "HCC",
      type: "Drum",
      area: "area-hcc",
      x: 1810,
      y: 760,
      width: 210,
      height: 95,
      status: "Normal",
      temperature: "120-180 C",
      pressure: "Medium",
      description: "Receives VGO feed from HVU before hydrocracking.",
      functions: ["Stabilizes HCC feed", "Receives LVGO/HVGO", "Provides suction to feed pump"],
    },
    {
      tag: "K-301",
      name: "Recycle Hydrogen Compressor",
      unit: "HCC",
      type: "Compressor",
      area: "area-hcc",
      x: 1810,
      y: 1480,
      width: 230,
      height: 95,
      status: "Normal",
      temperature: "40-80 C",
      pressure: "High",
      description: "Compresses recycle hydrogen for hydrocracker reactor loop.",
      functions: ["Supplies hydrogen to reactor", "Maintains reactor hydrogen partial pressure", "Supports hydrocracking reactions"],
    },
    {
      tag: "F-301",
      name: "HCC Feed Heater",
      unit: "HCC",
      type: "Furnace",
      area: "area-hcc",
      x: 2070,
      y: 760,
      width: 210,
      height: 105,
      status: "Normal",
      temperature: "350-420 C",
      pressure: "High",
      description: "Heats VGO and hydrogen mixture before reactor.",
      functions: ["Raises reactor inlet temperature", "Controls conversion severity", "Prepares feed for catalyst bed"],
    },
    {
      tag: "R-301",
      name: "Hydrocracker Reactor",
      unit: "HCC",
      type: "Reactor",
      area: "area-hcc",
      x: 2320,
      y: 710,
      width: 200,
      height: 180,
      status: "Normal",
      temperature: "360-430 C",
      pressure: "High",
      description: "Converts VGO into lighter products using hydrogen and catalyst.",
      functions: ["Cracks heavy molecules", "Saturates olefins and aromatics", "Removes sulfur and nitrogen"],
    },
    {
      tag: "V-301",
      name: "High Pressure Separator",
      unit: "HCC",
      type: "Separator",
      area: "area-hcc",
      x: 2315,
      y: 980,
      width: 220,
      height: 95,
      status: "Normal",
      temperature: "180-260 C",
      pressure: "High",
      description: "Separates reactor effluent into gas and liquid phase.",
      functions: ["Recovers hydrogen-rich gas", "Routes liquid to fractionation", "Protects downstream fractionator"],
    },
    {
      tag: "C-301",
      name: "HCC Fractionator",
      unit: "HCC",
      type: "Fractionator",
      area: "area-hcc",
      x: 2190,
      y: 1130,
      width: 200,
      height: 270,
      status: "Normal",
      temperature: "Top 70 C / Bottom 340 C",
      pressure: "Low-Medium",
      description: "Separates hydrocracker liquid into LPG, naphtha, kerosene, diesel, and unconverted oil.",
      functions: ["Separates HCC products", "Recovers middle distillates", "Sends heavy unconverted oil to RFCC"],
    },
    {
      tag: "D-401",
      name: "RFCC Feed Surge Drum",
      unit: "RFCC",
      type: "Drum",
      area: "area-rfcc",
      x: 2660,
      y: 900,
      width: 220,
      height: 95,
      status: "Normal",
      temperature: "150-260 C",
      pressure: "Medium",
      description: "Receives heavy feed from HVU and HCC before RFCC.",
      functions: ["Stabilizes RFCC feed", "Blends residue and heavy oil", "Feeds RFCC riser"],
    },
    {
      tag: "R-401",
      name: "RFCC Riser Reactor",
      unit: "RFCC",
      type: "Riser Reactor",
      area: "area-rfcc",
      x: 2930,
      y: 800,
      width: 190,
      height: 260,
      status: "Normal",
      temperature: "500-540 C",
      pressure: "Low-Medium",
      description: "Cracks heavy oil feed using hot regenerated catalyst.",
      functions: ["Cracks heavy oil into lighter products", "Contacts feed with hot catalyst", "Sends vapor/catalyst mixture to disengager"],
    },
    {
      tag: "V-401",
      name: "Reactor Disengager",
      unit: "RFCC",
      type: "Separator",
      area: "area-rfcc",
      x: 3160,
      y: 760,
      width: 220,
      height: 110,
      status: "Normal",
      temperature: "500 C",
      pressure: "Low-Medium",
      description: "Separates cracked vapor from spent catalyst.",
      functions: ["Separates catalyst from vapor", "Routes vapor to main fractionator", "Sends spent catalyst to regenerator"],
    },
    {
      tag: "R-402",
      name: "RFCC Regenerator",
      unit: "RFCC",
      type: "Regenerator",
      area: "area-rfcc",
      x: 3160,
      y: 1040,
      width: 220,
      height: 150,
      status: "Normal",
      temperature: "650-720 C",
      pressure: "Low-Medium",
      description: "Burns coke from spent catalyst and regenerates catalyst activity.",
      functions: ["Burns coke from catalyst", "Reheats catalyst", "Supplies regenerated catalyst to riser"],
    },
    {
      tag: "C-401",
      name: "RFCC Main Fractionator",
      unit: "RFCC",
      type: "Fractionator",
      area: "area-rfcc",
      x: 2920,
      y: 1130,
      width: 210,
      height: 290,
      status: "Normal",
      temperature: "Top 60 C / Bottom 360 C",
      pressure: "Low",
      description: "Separates cracked vapor into RFCC product fractions.",
      functions: ["Separates dry gas, LPG, gasoline, LCO, slurry oil", "Provides pumparound heat removal", "Routes products to product pool"],
    },
    {
      tag: "K-401",
      name: "Wet Gas Compressor",
      unit: "RFCC",
      type: "Compressor",
      area: "area-rfcc",
      x: 3180,
      y: 520,
      width: 220,
      height: 95,
      status: "Normal",
      temperature: "40-80 C",
      pressure: "Medium",
      description: "Compresses RFCC wet gas for gas recovery.",
      functions: ["Compresses cracked gas", "Feeds gas concentration section", "Supports LPG and dry gas recovery"],
    },
    {
      tag: "H2-001",
      name: "Hydrogen Header",
      unit: "Utilities",
      type: "Utility Header",
      area: "area-utilities",
      x: 1510,
      y: 1510,
      width: 230,
      height: 95,
      status: "Normal",
      temperature: "Ambient",
      pressure: "High",
      description: "Hydrogen supply header for HCC reactor loop.",
      functions: ["Supplies makeup hydrogen", "Supports hydrocracking", "Maintains HCC hydrogen balance"],
    },
    {
      tag: "STM-001",
      name: "Steam Header",
      unit: "Utilities",
      type: "Utility Header",
      area: "area-utilities",
      x: 2820,
      y: 1510,
      width: 210,
      height: 95,
      status: "Normal",
      temperature: "High",
      pressure: "Medium",
      description: "Steam utility supply for stripping and atomization services.",
      functions: ["Supplies stripping steam", "Supports RFCC feed dispersion", "Provides utility service"],
    },
    {
      tag: "POOL-LPG",
      name: "LPG Product Pool",
      unit: "Products",
      type: "Product Pool",
      area: "area-products",
      x: 920,
      y: 120,
      width: 180,
      height: 80,
      status: "Normal",
      temperature: "Ambient",
      pressure: "Storage",
      description: "LPG collection point from HCC and RFCC.",
      functions: ["Collects LPG product"],
    },
    {
      tag: "POOL-NAP",
      name: "Naphtha / Gasoline Pool",
      unit: "Products",
      type: "Product Pool",
      area: "area-products",
      x: 1230,
      y: 120,
      width: 220,
      height: 80,
      status: "Normal",
      temperature: "Ambient",
      pressure: "Storage",
      description: "Naphtha and gasoline routing point.",
      functions: ["Collects naphtha and gasoline"],
    },
    {
      tag: "POOL-KERO",
      name: "Kerosene Pool",
      unit: "Products",
      type: "Product Pool",
      area: "area-products",
      x: 1580,
      y: 120,
      width: 190,
      height: 80,
      status: "Normal",
      temperature: "Ambient",
      pressure: "Storage",
      description: "Kerosene product routing point.",
      functions: ["Collects kerosene product"],
    },
    {
      tag: "POOL-DIESEL",
      name: "Diesel Pool",
      unit: "Products",
      type: "Product Pool",
      area: "area-products",
      x: 1890,
      y: 120,
      width: 190,
      height: 80,
      status: "Normal",
      temperature: "Ambient",
      pressure: "Storage",
      description: "Diesel and middle distillate routing point.",
      functions: ["Collects diesel product"],
    },
    {
      tag: "POOL-LCO",
      name: "LCO / Slurry Pool",
      unit: "Products",
      type: "Product Pool",
      area: "area-products",
      x: 2190,
      y: 120,
      width: 210,
      height: 80,
      status: "Normal",
      temperature: "Ambient",
      pressure: "Storage",
      description: "RFCC LCO and slurry oil routing point.",
      functions: ["Collects RFCC heavy products"],
    },
  ],
  streams: [],
};

const ADMIN_STORAGE_KEY = "refinerymap-stage2-config";
const ADMIN_BACKUP_KEY = "refinerymap-stage6-last-backup";
const ADMIN_SESSION_KEY = "refinerymap-stage2-admin";
const EDIT_MODE_SESSION_KEY = "refinerymap-stage2-edit-mode";
const PRESENTATION_SESSION_KEY = "refinerymap-stage4-presentation";
const THEME_STORAGE_KEY = "refinerymap-color-theme";
const LEGACY_THEME_STORAGE_KEYS = ["refinerymap_theme", "refinerymap_theme_mode"];
const STREAM_LABEL_MODE_STORAGE_KEY = "refinerymap_stream_label_mode";
const PORT_LABEL_MODE_STORAGE_KEY = "refinerymap_port_label_mode";
const NODE_FONT_SCALE_STORAGE_KEY = "refinerymap_node_font_scale";
const NODE_ICON_SCALE_STORAGE_KEY = "refinerymap_node_icon_scale";
const PORT_LABEL_FONT_SIZE_STORAGE_KEY = "refinerymap_port_label_font_size";
const PORT_LABEL_SCALE_STORAGE_KEY = "refinerymap_port_label_scale";
const PORT_LABEL_WEIGHT_STORAGE_KEY = "refinerymap_port_label_weight";
const PORT_LABEL_COLOR_STORAGE_KEY = "refinerymap_port_label_color";
const GRID_VISIBLE_STORAGE_KEY = "refinerymap_grid_visible";
const SNAP_TO_GRID_STORAGE_KEY = "refinerymap_snap_to_grid";
const GRID_SIZE_STORAGE_KEY = "refinerymap_grid_size";
const LAYERS_STORAGE_KEY = "refinerymap_layer_visibility";
const SELECT_STREAM_ON_HOVER_STORAGE_KEY = "refinerymap_select_stream_on_hover";
const STREAM_BRIDGES_STORAGE_KEY = "refinerymap_stream_bridges";
const PREFER_POLYLINE_STORAGE_KEY = "refinerymap_prefer_polyline_pfd";
const AUTO_STRAIGHT_ALIGNED_STORAGE_KEY = "refinerymap_auto_straight_aligned_streams";
const PID_SYMBOLS_LAYER_STORAGE_KEY = "refinerymap_pid_symbols_layer";
const PID_CONNECTORS_LAYER_STORAGE_KEY = "refinerymap_pid_connectors_layer";
const CANVAS_FIRST_EDIT_STORAGE_KEY = "refinerymap_canvas_first_edit";
const AUTO_HIDE_DETAIL_EDIT_STORAGE_KEY = "refinerymap_auto_hide_detail_edit";
const AUTO_COLLAPSE_ADMIN_EDIT_STORAGE_KEY = "refinerymap_auto_collapse_admin_edit";
const ADMIN_COLLAPSED_STORAGE_KEY = "refinerymap_admin_collapsed";
const DEPLOYMENT_CONFIG_PATH = "data/refinery-config.json";
const DEPLOYMENT_CONFIG_API = "/api/config";
const DEPLOYMENT_CONFIG_SAVE_API = "/api/config/default";
const STARTUP_SIMULATION_DATA_PATH = "./data/startup-cdu-v-simulation.json";
const STARTUP_SIMULATION_DATA_PATHS = [
  "./data/startup-cdu-v-simulation.json",
  "data/startup-cdu-v-simulation.json",
];
const STARTUP_SESSION_KEY = "refineryMapStartupSession";
const STARTUP_PANEL_STATE_KEY = "refineryMapStartupPanelState";
const STARTUP_PANEL_DEFAULT_STATE = Object.freeze({ x: 468, y: 24, size: "m", hidden: true, minimized: false });
const VALID_STARTUP_PANEL_SIZES = new Set(["s", "m", "l"]);
const SAFE_MODE = typeof window !== "undefined"
  && new URLSearchParams(window.location.search).get("safe") === "1";
const STARTUP_TIMEOUT_MS = 8000;
const VALID_THEME_MODES = new Set(["light", "night", "graphite", "ocean", "industrial"]);
const VALID_STREAM_LABEL_MODES = new Set(["hidden", "hover", "selected", "always"]);
const VALID_PORT_LABEL_MODES = new Set(["off", "important", "hover", "all"]);
const VALID_STREAM_SHAPES = new Set(["polyline", "cable", "bezier", "straight", "autoStraight"]);
const NODE_STYLE_DEFAULTS = {
  fontSize: 12,
  fontColor: "",
  fontWeight: "700",
  fontStyle: "normal",
  nameFontSize: 11,
  metaFontSize: 10,
  iconSize: 32,
  iconColor: "",
  iconScale: 1,
  portLabelFontSize: null,
  portLabelColor: "",
  portLabelWeight: "",
};
const VIEW_LAYER_DEFAULTS = {
  areas: true,
  nodes: true,
  streams: true,
  ports: true,
  portLabels: true,
  streamLabels: true,
  utilityStreams: true,
  gasStreams: true,
  productStreams: true,
  heavyStreams: true,
  catalystStreams: true,
  sourStreams: true,
};
const PORT_LABEL_FONT_WEIGHTS = new Set(["normal", "500", "600", "700", "bold"]);
const GRID_SIZE_OPTIONS = new Set([10, 20, 40, 80]);
const MAX_HISTORY = 50;
const NODE_STYLE_FONT_WEIGHTS = new Set(["normal", "500", "600", "700", "800", "bold"]);
const NODE_STYLE_FONT_STYLES = new Set(["normal", "italic"]);
const IMPORTANT_PORT_IDS = new Set([
  "gas",
  "overhead",
  "vacuumOverhead",
  "lightNaphtha",
  "heavyNaphtha",
  "naphtha",
  "kerosene",
  "diesel",
  "lightDiesel",
  "heavyDiesel",
  "atmosphericGasOil",
  "ago",
  "bottom",
  "bottoms",
  "lightVGO",
  "heavyVGO",
  "residuum",
  "longResiduum",
  "lpg",
  "gasoline",
  "lco",
  "hco",
  "clo",
  "fccGasoline",
  "alkylate",
  "isomerate",
  "reformate",
]);
const CLEAN_AREA_LAYOUT = {
  "area-cdu": { x: 120, y: 300, width: 760, height: 960 },
  "area-hvu": { x: 980, y: 300, width: 700, height: 960 },
  "area-hcc": { x: 1780, y: 300, width: 760, height: 1180 },
  "area-rfcc": { x: 2640, y: 300, width: 820, height: 1180 },
  "area-products": { x: 700, y: 70, width: 2300, height: 190 },
  "area-utilities": { x: 1220, y: 1640, width: 1660, height: 320 },
};
const CLEAN_NODE_LAYOUT = {
  "TK-101": { x: 170, y: 820, width: 180, height: 95 },
  "E-101": { x: 390, y: 820, width: 200, height: 95 },
  "V-101": { x: 630, y: 820, width: 180, height: 95 },
  "F-101": { x: 390, y: 1010, width: 210, height: 105 },
  "C-101": { x: 660, y: 900, width: 190, height: 290 },
  "D-101": { x: 650, y: 430, width: 190, height: 90 },
  "P-201": { x: 1020, y: 1010, width: 190, height: 90 },
  "F-201": { x: 1240, y: 1010, width: 210, height: 105 },
  "C-201": { x: 1480, y: 880, width: 190, height: 330 },
  "V-201": { x: 1470, y: 430, width: 190, height: 95 },
  "D-301": { x: 1810, y: 760, width: 210, height: 95 },
  "F-301": { x: 2070, y: 760, width: 210, height: 105 },
  "R-301": { x: 2320, y: 730, width: 200, height: 180 },
  "V-301": { x: 2320, y: 1010, width: 220, height: 95 },
  "C-301": { x: 2190, y: 1180, width: 200, height: 270 },
  "K-301": { x: 1810, y: 1690, width: 230, height: 95 },
  "D-401": { x: 2660, y: 920, width: 220, height: 95 },
  "R-401": { x: 2930, y: 790, width: 190, height: 260 },
  "V-401": { x: 3160, y: 740, width: 220, height: 110 },
  "R-402": { x: 3160, y: 1070, width: 220, height: 150 },
  "C-401": { x: 2920, y: 1200, width: 210, height: 290 },
  "K-401": { x: 3180, y: 430, width: 220, height: 95 },
  "H2-001": { x: 1510, y: 1740, width: 230, height: 95 },
  "STM-001": { x: 2820, y: 1740, width: 210, height: 95 },
  "POOL-LPG": { x: 920, y: 120, width: 180, height: 80 },
  "POOL-NAP": { x: 1230, y: 120, width: 220, height: 80 },
  "POOL-KERO": { x: 1580, y: 120, width: 190, height: 80 },
  "POOL-DIESEL": { x: 1890, y: 120, width: 190, height: 80 },
  "POOL-LCO": { x: 2190, y: 120, width: 210, height: 80 },
};
const CLEAN_STREAM_ROUTES = {
  "S-001": { strokeWidth: 3, shape: "elbow" },
  "S-002": { strokeWidth: 3, shape: "straight" },
  "S-003": { strokeWidth: 3, shape: "elbow" },
  "S-004": { strokeWidth: 3, shape: "straight" },
  "S-005": { strokeWidth: 3, shape: "elbow", points: [{ x: 620, y: 1045 }, { x: 620, y: 520 }, { x: 650, y: 520 }] },
  "S-006": { strokeWidth: 3, shape: "elbow", points: [{ x: 900, y: 475 }, { x: 900, y: 245 }, { x: 1230, y: 245 }] },
  "S-007": { strokeWidth: 3, shape: "elbow", points: [{ x: 900, y: 1045 }, { x: 900, y: 270 }, { x: 1580, y: 270 }] },
  "S-008": { strokeWidth: 3, shape: "elbow", points: [{ x: 930, y: 1045 }, { x: 930, y: 300 }, { x: 1890, y: 300 }] },
  "S-009": { strokeWidth: 3, shape: "elbow", points: [{ x: 900, y: 1045 }, { x: 900, y: 1320 }, { x: 1020, y: 1320 }] },
  "S-010": { strokeWidth: 3, shape: "straight" },
  "S-011": { strokeWidth: 3, shape: "straight" },
  "S-012": { strokeWidth: 3, shape: "elbow", points: [{ x: 1440, y: 1045 }, { x: 1440, y: 500 }, { x: 1470, y: 500 }] },
  "S-013": { strokeWidth: 3, shape: "elbow", points: [{ x: 1720, y: 1045 }, { x: 1720, y: 780 }, { x: 1810, y: 780 }] },
  "S-014": { strokeWidth: 3, shape: "straight" },
  "S-015": { strokeWidth: 2, shape: "elbow", points: [{ x: 1770, y: 1788 }, { x: 1770, y: 1740 }] },
  "S-016": { strokeWidth: 2, shape: "elbow", points: [{ x: 2050, y: 1738 }, { x: 2050, y: 812 }] },
  "S-017": { strokeWidth: 3, shape: "straight" },
  "S-018": { strokeWidth: 3, shape: "elbow", points: [{ x: 2560, y: 820 }, { x: 2560, y: 1058 }, { x: 2320, y: 1058 }] },
  "S-019": { strokeWidth: 3, shape: "elbow", points: [{ x: 2280, y: 1058 }, { x: 2280, y: 1315 }] },
  "S-020": { strokeWidth: 3, shape: "elbow", points: [{ x: 2140, y: 1315 }, { x: 2140, y: 250 }, { x: 1100, y: 250 }] },
  "S-021": { strokeWidth: 3, shape: "elbow", points: [{ x: 2110, y: 1315 }, { x: 2110, y: 280 }, { x: 1450, y: 280 }] },
  "S-022": { strokeWidth: 3, shape: "elbow", points: [{ x: 2410, y: 1230 }, { x: 2410, y: 310 }, { x: 1580, y: 310 }] },
  "S-023": { strokeWidth: 3, shape: "elbow", points: [{ x: 2440, y: 1265 }, { x: 2440, y: 340 }, { x: 1890, y: 340 }] },
  "S-024": { strokeWidth: 3, shape: "elbow", points: [{ x: 2410, y: 1315 }, { x: 2560, y: 1360 }, { x: 2560, y: 968 }, { x: 2660, y: 968 }] },
  "S-025": { strokeWidth: 3, shape: "elbow", points: [{ x: 1720, y: 1045 }, { x: 1720, y: 1420 }, { x: 2600, y: 1420 }, { x: 2600, y: 968 }] },
  "S-026": { strokeWidth: 3, shape: "straight" },
  "S-027": { strokeWidth: 3, shape: "straight" },
  "S-028": { strokeWidth: 3, shape: "elbow", points: [{ x: 3440, y: 795 }, { x: 3440, y: 1145 }] },
  "S-029": { strokeWidth: 3, shape: "elbow", points: [{ x: 3100, y: 1145 }, { x: 3100, y: 920 }] },
  "S-030": { strokeWidth: 3, shape: "elbow", points: [{ x: 3140, y: 795 }, { x: 3140, y: 1345 }] },
  "S-031": { strokeWidth: 3, shape: "elbow", points: [{ x: 2880, y: 1345 }, { x: 2880, y: 500 }, { x: 3180, y: 500 }] },
  "S-032": { strokeWidth: 3, shape: "elbow", points: [{ x: 3440, y: 478 }, { x: 3440, y: 240 }, { x: 1100, y: 240 }] },
  "S-033": { strokeWidth: 3, shape: "elbow", points: [{ x: 2860, y: 1345 }, { x: 2860, y: 285 }, { x: 1450, y: 285 }] },
  "S-034": { strokeWidth: 3, shape: "elbow", points: [{ x: 2820, y: 1345 }, { x: 2820, y: 360 }, { x: 2400, y: 360 }] },
  "S-035": { strokeWidth: 3, shape: "elbow", points: [{ x: 2790, y: 1345 }, { x: 2790, y: 400 }, { x: 2400, y: 400 }] },
  "S-036": { strokeWidth: 2, shape: "elbow", points: [{ x: 3060, y: 1788 }, { x: 3060, y: 920 }] },
};

// Stream v2 default: endpoint memakai port/socket node, points adalah titik belok internal.
const NEW_SAMPLE_STREAMS = [
  {
    id: "S-001",
    label: "Crude Feed",
    from: "TK-101",
    fromPort: "out",
    to: "E-101",
    toPort: "in",
    type: "liquid",
    category: "main",
    shape: "bezier",
    strokeWidth: 2.5,
    points: [],
    autoRoute: true,
    avoidNodes: true,
    labelMode: "always",
    visibleInSimplified: true,
  },
  {
    id: "S-002",
    label: "Preheated Crude",
    from: "E-101",
    fromPort: "out",
    to: "V-101",
    toPort: "in",
    type: "liquid",
    category: "main",
    shape: "bezier",
    strokeWidth: 2.5,
    points: [],
    autoRoute: true,
    avoidNodes: true,
    labelMode: "hover",
    visibleInSimplified: true,
  },
  {
    id: "S-003",
    label: "Desalted Crude",
    from: "V-101",
    fromPort: "out",
    to: "F-101",
    toPort: "in",
    type: "liquid",
    category: "main",
    shape: "bezier",
    strokeWidth: 2.5,
    points: [],
    autoRoute: true,
    avoidNodes: true,
    labelMode: "hover",
    visibleInSimplified: true,
  },
  {
    id: "S-004",
    label: "Heated Crude",
    from: "F-101",
    fromPort: "out",
    to: "C-101",
    toPort: "feed",
    type: "liquid",
    category: "main",
    shape: "bezier",
    strokeWidth: 2.8,
    points: [],
    autoRoute: true,
    avoidNodes: true,
    labelMode: "hover",
    visibleInSimplified: true,
  },
  {
    id: "S-005",
    label: "CDU Overhead",
    from: "C-101",
    fromPort: "overhead",
    to: "D-101",
    toPort: "in",
    type: "gas",
    category: "gas",
    shape: "bezier",
    strokeWidth: 2,
    points: [],
    autoRoute: true,
    avoidNodes: true,
    labelMode: "hover",
    visibleInSimplified: true,
  },
  {
    id: "S-006",
    label: "CDU Naphtha",
    from: "D-101",
    fromPort: "liquid",
    to: "POOL-NAP",
    toPort: "in",
    type: "liquid",
    category: "product",
    shape: getDefaultNewStreamShape(),
    strokeWidth: 2,
    points: [
      { x: 760, y: 420 },
      { x: 760, y: 180 },
      { x: 1320, y: 180 },
    ],
    autoRoute: false,
    avoidNodes: true,
    labelMode: "hover",
    visibleInSimplified: false,
  },
  {
    id: "S-007",
    label: "CDU Kerosene",
    from: "C-101",
    fromPort: "kerosene",
    to: "POOL-KERO",
    toPort: "in",
    type: "liquid",
    category: "product",
    shape: getDefaultNewStreamShape(),
    strokeWidth: 2,
    points: [
      { x: 840, y: 870 },
      { x: 840, y: 210 },
      { x: 1680, y: 210 },
    ],
    autoRoute: false,
    avoidNodes: true,
    labelMode: "hover",
    visibleInSimplified: false,
  },
  {
    id: "S-008",
    label: "CDU Diesel",
    from: "C-101",
    fromPort: "diesel",
    to: "POOL-DIESEL",
    toPort: "in",
    type: "liquid",
    category: "product",
    shape: getDefaultNewStreamShape(),
    strokeWidth: 2,
    points: [
      { x: 880, y: 930 },
      { x: 880, y: 240 },
      { x: 1980, y: 240 },
    ],
    autoRoute: false,
    avoidNodes: true,
    labelMode: "hover",
    visibleInSimplified: false,
  },
  {
    id: "S-009",
    label: "Atmospheric Residue to HVU",
    from: "C-101",
    fromPort: "bottom",
    to: "P-201",
    toPort: "suction",
    type: "liquid",
    category: "heavy",
    shape: "cable",
    strokeWidth: 3,
    points: [
      { x: 710, y: 1220 },
      { x: 1040, y: 1220 },
      { x: 1040, y: 980 },
    ],
    autoRoute: false,
    avoidNodes: true,
    labelMode: "always",
    visibleInSimplified: true,
  },
  {
    id: "S-010",
    label: "AR to Vacuum Heater",
    from: "P-201",
    fromPort: "discharge",
    to: "F-201",
    toPort: "feed",
    type: "liquid",
    category: "heavy",
    shape: "bezier",
    strokeWidth: 3,
    points: [],
    autoRoute: true,
    avoidNodes: true,
    labelMode: "hover",
    visibleInSimplified: true,
  },
  {
    id: "S-011",
    label: "Heated AR",
    from: "F-201",
    fromPort: "outlet",
    to: "C-201",
    toPort: "feed",
    type: "liquid",
    category: "heavy",
    shape: "bezier",
    strokeWidth: 3,
    points: [],
    autoRoute: true,
    avoidNodes: true,
    labelMode: "hover",
    visibleInSimplified: true,
  },
  {
    id: "S-012",
    label: "Vacuum Overhead",
    from: "C-201",
    fromPort: "overhead",
    to: "V-201",
    toPort: "in",
    type: "gas",
    category: "gas",
    shape: "bezier",
    strokeWidth: 2,
    points: [],
    autoRoute: true,
    avoidNodes: true,
    labelMode: "hover",
    visibleInSimplified: true,
  },
  {
    id: "S-013",
    label: "VGO to HCC",
    from: "C-201",
    fromPort: "side1",
    to: "D-301",
    toPort: "in",
    type: "liquid",
    category: "main",
    shape: "polyline",
    strokeWidth: 2.8,
    points: [
      { x: 1580, y: 830 },
      { x: 1810, y: 830 },
    ],
    autoRoute: false,
    avoidNodes: true,
    labelMode: "always",
    visibleInSimplified: true,
  },
  {
    id: "S-014",
    label: "HCC Feed",
    from: "D-301",
    fromPort: "out",
    to: "F-301",
    toPort: "feed",
    type: "liquid",
    category: "main",
    shape: "bezier",
    strokeWidth: 2.8,
    points: [],
    autoRoute: true,
    avoidNodes: true,
    labelMode: "hover",
    visibleInSimplified: true,
  },
  {
    id: "S-015",
    label: "Hydrogen Makeup",
    from: "H2-001",
    fromPort: "out",
    to: "K-301",
    toPort: "suction",
    type: "gas",
    category: "utility",
    shape: "polyline",
    strokeWidth: 2,
    points: [
      { x: 1660, y: 1720 },
      { x: 1930, y: 1720 },
      { x: 1930, y: 1510 },
    ],
    autoRoute: false,
    avoidNodes: true,
    labelMode: "hover",
    visibleInSimplified: true,
  },
  {
    id: "S-016",
    label: "Recycle Hydrogen",
    from: "K-301",
    fromPort: "discharge",
    to: "F-301",
    toPort: "utility",
    type: "gas",
    category: "utility",
    shape: "polyline",
    strokeWidth: 2,
    points: [
      { x: 2030, y: 1510 },
      { x: 2150, y: 1510 },
      { x: 2150, y: 910 },
    ],
    autoRoute: false,
    avoidNodes: true,
    labelMode: "hover",
    visibleInSimplified: true,
  },
  {
    id: "S-017",
    label: "Heated Feed + H2",
    from: "F-301",
    fromPort: "outlet",
    to: "R-301",
    toPort: "feed",
    type: "liquid",
    category: "main",
    shape: "bezier",
    strokeWidth: 2.8,
    points: [],
    autoRoute: true,
    avoidNodes: true,
    labelMode: "hover",
    visibleInSimplified: true,
  },
  {
    id: "S-018",
    label: "HCC Effluent",
    from: "R-301",
    fromPort: "product",
    to: "V-301",
    toPort: "in",
    type: "liquid",
    category: "main",
    shape: "bezier",
    strokeWidth: 2.8,
    points: [],
    autoRoute: true,
    avoidNodes: true,
    labelMode: "hover",
    visibleInSimplified: true,
  },
  {
    id: "S-019",
    label: "Liquid to Fractionator",
    from: "V-301",
    fromPort: "liquid",
    to: "C-301",
    toPort: "feed",
    type: "liquid",
    category: "main",
    shape: "bezier",
    strokeWidth: 2.8,
    points: [],
    autoRoute: true,
    avoidNodes: true,
    labelMode: "hover",
    visibleInSimplified: true,
  },
  {
    id: "S-020",
    label: "HCC LPG",
    from: "C-301",
    fromPort: "overhead",
    to: "POOL-LPG",
    toPort: "in",
    type: "gas",
    category: "product",
    shape: "polyline",
    strokeWidth: 2,
    points: [
      { x: 2290, y: 960 },
      { x: 2290, y: 160 },
      { x: 1010, y: 160 },
    ],
    autoRoute: false,
    avoidNodes: true,
    labelMode: "hover",
    visibleInSimplified: false,
  },
  {
    id: "S-021",
    label: "HCC Naphtha",
    from: "C-301",
    fromPort: "side1",
    to: "POOL-NAP",
    toPort: "in",
    type: "liquid",
    category: "product",
    shape: "polyline",
    strokeWidth: 2,
    points: [
      { x: 2390, y: 1120 },
      { x: 2390, y: 190 },
      { x: 1360, y: 190 },
    ],
    autoRoute: false,
    avoidNodes: true,
    labelMode: "hover",
    visibleInSimplified: false,
  },
  {
    id: "S-022",
    label: "HCC Kerosene",
    from: "C-301",
    fromPort: "side2",
    to: "POOL-KERO",
    toPort: "in",
    type: "liquid",
    category: "product",
    shape: "polyline",
    strokeWidth: 2,
    points: [
      { x: 2420, y: 1190 },
      { x: 2420, y: 220 },
      { x: 1680, y: 220 },
    ],
    autoRoute: false,
    avoidNodes: true,
    labelMode: "hover",
    visibleInSimplified: false,
  },
  {
    id: "S-023",
    label: "HCC Diesel",
    from: "C-301",
    fromPort: "side3",
    to: "POOL-DIESEL",
    toPort: "in",
    type: "liquid",
    category: "product",
    shape: "polyline",
    strokeWidth: 2,
    points: [
      { x: 2450, y: 1260 },
      { x: 2450, y: 250 },
      { x: 1980, y: 250 },
    ],
    autoRoute: false,
    avoidNodes: true,
    labelMode: "hover",
    visibleInSimplified: false,
  },
  {
    id: "S-024",
    label: "Unconverted Oil to RFCC",
    from: "C-301",
    fromPort: "bottom",
    to: "D-401",
    toPort: "in",
    type: "liquid",
    category: "heavy",
    shape: "polyline",
    strokeWidth: 3,
    points: [
      { x: 2290, y: 1430 },
      { x: 2720, y: 1430 },
      { x: 2720, y: 960 },
    ],
    autoRoute: false,
    avoidNodes: true,
    labelMode: "always",
    visibleInSimplified: true,
  },
  {
    id: "S-025",
    label: "Vacuum Residue to RFCC",
    from: "C-201",
    fromPort: "bottom",
    to: "D-401",
    toPort: "in",
    type: "liquid",
    category: "heavy",
    shape: "polyline",
    strokeWidth: 3,
    points: [
      { x: 1510, y: 1370 },
      { x: 2680, y: 1370 },
      { x: 2680, y: 990 },
    ],
    autoRoute: false,
    avoidNodes: true,
    labelMode: "hover",
    visibleInSimplified: true,
  },
  {
    id: "S-026",
    label: "RFCC Feed",
    from: "D-401",
    fromPort: "out",
    to: "R-401",
    toPort: "feed",
    type: "liquid",
    category: "main",
    shape: "bezier",
    strokeWidth: 3,
    points: [],
    autoRoute: true,
    avoidNodes: true,
    labelMode: "always",
    visibleInSimplified: true,
  },
  {
    id: "S-027",
    label: "Cracked Vapor + Catalyst",
    from: "R-401",
    fromPort: "product",
    to: "V-401",
    toPort: "in",
    type: "gas",
    category: "main",
    shape: "bezier",
    strokeWidth: 2.8,
    points: [],
    autoRoute: true,
    avoidNodes: true,
    labelMode: "hover",
    visibleInSimplified: true,
  },
  {
    id: "S-028",
    label: "Spent Catalyst",
    from: "V-401",
    fromPort: "spent",
    to: "R-402",
    toPort: "spent",
    type: "solid",
    category: "catalyst",
    shape: "polyline",
    strokeWidth: 2.5,
    points: [
      { x: 3260, y: 930 },
      { x: 3260, y: 1040 },
    ],
    autoRoute: false,
    avoidNodes: true,
    labelMode: "hover",
    visibleInSimplified: true,
  },
  {
    id: "S-029",
    label: "Regenerated Catalyst",
    from: "R-402",
    fromPort: "regen",
    to: "R-401",
    toPort: "catalyst",
    type: "solid",
    category: "catalyst",
    shape: "polyline",
    strokeWidth: 2.5,
    points: [
      { x: 3150, y: 1130 },
      { x: 3040, y: 1130 },
      { x: 3040, y: 1040 },
    ],
    autoRoute: false,
    avoidNodes: true,
    labelMode: "hover",
    visibleInSimplified: true,
  },
  {
    id: "S-030",
    label: "RFCC Vapor to Fractionator",
    from: "V-401",
    fromPort: "vapor",
    to: "C-401",
    toPort: "feed",
    type: "gas",
    category: "main",
    shape: "bezier",
    strokeWidth: 2.8,
    points: [],
    autoRoute: true,
    avoidNodes: true,
    labelMode: "hover",
    visibleInSimplified: true,
  },
  {
    id: "S-031",
    label: "RFCC Wet Gas",
    from: "C-401",
    fromPort: "overhead",
    to: "K-401",
    toPort: "suction",
    type: "gas",
    category: "gas",
    shape: "bezier",
    strokeWidth: 2,
    points: [],
    autoRoute: true,
    avoidNodes: true,
    labelMode: "hover",
    visibleInSimplified: true,
  },
  {
    id: "S-032",
    label: "RFCC LPG",
    from: "K-401",
    fromPort: "discharge",
    to: "POOL-LPG",
    toPort: "in",
    type: "gas",
    category: "product",
    shape: "polyline",
    strokeWidth: 2,
    points: [
      { x: 3300, y: 520 },
      { x: 3300, y: 150 },
      { x: 1010, y: 150 },
    ],
    autoRoute: false,
    avoidNodes: true,
    labelMode: "hover",
    visibleInSimplified: false,
  },
  {
    id: "S-033",
    label: "RFCC Gasoline",
    from: "C-401",
    fromPort: "side1",
    to: "POOL-NAP",
    toPort: "in",
    type: "liquid",
    category: "product",
    shape: "polyline",
    strokeWidth: 2,
    points: [
      { x: 3130, y: 1170 },
      { x: 3130, y: 170 },
      { x: 1360, y: 170 },
    ],
    autoRoute: false,
    avoidNodes: true,
    labelMode: "hover",
    visibleInSimplified: false,
  },
  {
    id: "S-034",
    label: "RFCC LCO",
    from: "C-401",
    fromPort: "side2",
    to: "POOL-LCO",
    toPort: "in",
    type: "liquid",
    category: "product",
    shape: "polyline",
    strokeWidth: 2,
    points: [
      { x: 3160, y: 1260 },
      { x: 3160, y: 230 },
      { x: 2290, y: 230 },
    ],
    autoRoute: false,
    avoidNodes: true,
    labelMode: "hover",
    visibleInSimplified: false,
  },
  {
    id: "S-035",
    label: "RFCC Slurry Oil",
    from: "C-401",
    fromPort: "bottom",
    to: "POOL-LCO",
    toPort: "in",
    type: "liquid",
    category: "heavy",
    shape: "polyline",
    strokeWidth: 2.5,
    points: [
      { x: 3020, y: 1440 },
      { x: 3020, y: 260 },
      { x: 2290, y: 260 },
    ],
    autoRoute: false,
    avoidNodes: true,
    labelMode: "hover",
    visibleInSimplified: false,
  },
  {
    id: "S-036",
    label: "Steam to RFCC",
    from: "STM-001",
    fromPort: "out",
    to: "R-401",
    toPort: "utility",
    type: "gas",
    category: "utility",
    shape: "polyline",
    strokeWidth: 2,
    points: [
      { x: 2920, y: 1740 },
      { x: 2920, y: 1060 },
    ],
    autoRoute: false,
    avoidNodes: true,
    labelMode: "hover",
    visibleInSimplified: true,
  },
];

const DEFAULT_FLOW_UNIT = "m3/h";
const VALID_BALANCE_TYPES = new Set(["none", "simple", "splitBased", "source", "passThrough", "separator", "productPool"]);
const VALID_STREAM_PHASES = new Set(["liquid", "gas", "water", "solid", "mixed"]);
const VALID_BALANCE_CATEGORIES = new Set(["hydrocarbon", "water", "utility", "loss", "other"]);
const VALID_STREAM_BALANCE_ROLES = new Set(["feed", "product", "internal", "recycle", "utility", "loss"]);
const VALID_STREAM_CONSTRAINT_ROLES = new Set(["normal", "downstream-feed", "product-quality", "internal-circulation", "recycle-return"]);
const VALID_STREAM_FLOW_RANGE_UNITS = new Set(["m3/h", "MBSD"]);
const VALID_STREAM_RANGE_MODES = new Set(["monitor", "control-target", "locked-flow"]);
const VALID_TARGET_SOLVE_MODES = new Set(["adjust-siblings", "adjust-source-intake", "adjust-split-ratio", "adjust-downstream-only", "manual-only"]);
const HYDROCARBON_BALANCE_CATEGORIES = ["hydrocarbon"];
const CDU_LOCAL_BALANCE_CATEGORIES = ["hydrocarbon", "water"];
const DEFAULT_NODE_TOLERANCE_PERCENT = 0.5;
const SPLIT_MODEL_TOTAL_TARGET = 100;
const SPLIT_MODEL_TOTAL_TOLERANCE = 0.01;
const MASS_BALANCE_DEBUG = false;
const PORT_DEBUG = false;
const CDU_BASE_CAPACITY = {
  m3h: 400,
  mbsd: 60,
};
const CDU_FLOATING_TABLE_DEFAULT_POSITION = {
  x: 24,
  y: 24,
};
const CDU_FLOW_SOURCE = {
  sourceNodeId: "CRUDE-SOURCE",
  intakeField: "crudeIntakeM3H",
};
const VALID_PORT_FLOW_MODES = new Set(["off", "compact", "full"]);
const VALID_PORT_VALUE_DISPLAYS = new Set(["off", "m3h", "mbsd", "both"]);
const VALID_PORT_INFO_LAYOUTS = new Set(["auto", "stacked", "inline"]);
const VALID_PORT_INFO_SCALES = new Set([0.8, 1, 1.2]);
const VALID_CDU_TABLE_SIZES = new Set(["small", "medium", "large"]);
const CDU_STREAM_DENSITY_DEFAULTS = {
  crudeLight: 0.82,
  crudeMedium: 0.86,
  crudeHeavy: 0.92,
  offGas: 0.0012,
  lightNaphtha: 0.68,
  heavyNaphtha: 0.74,
  kerosene: 0.8,
  lightGasoil: 0.84,
  heavyGasoil: 0.88,
  residueHVU2: 0.95,
  residueHVU3: 0.97,
  water: 1,
};
const CDU_MAIN_SPLIT_MODEL = {
  offGas: 1,
  lightNaphtha: 8,
  heavyNaphtha: 12,
  kerosene: 13,
  lightGasoil: 18,
  heavyGasoil: 17,
  residueHVU2: 16,
  residueHVU3: 15,
};
const CDU_CRUDE_ASSAYS = {
  light: {
    id: "light",
    name: "Light Crude",
    apiGravity: 40,
    density: 820,
    sulfur: 0.3,
    description: "Light crude with higher naphtha and middle distillate yield.",
    splitModel: {
      offGas: 1,
      lightNaphtha: 12,
      heavyNaphtha: 16,
      kerosene: 14,
      lightGasoil: 18,
      heavyGasoil: 16,
      residueHVU2: 12,
      residueHVU3: 11,
    },
  },
  medium: {
    id: "medium",
    name: "Medium Crude",
    apiGravity: 31,
    density: 860,
    sulfur: 0.8,
    description: "Medium crude with balanced naphtha, distillate, and residue yield.",
    splitModel: CDU_MAIN_SPLIT_MODEL,
  },
  heavy: {
    id: "heavy",
    name: "Heavy Crude",
    apiGravity: 22,
    density: 920,
    sulfur: 1.8,
    description: "Heavy crude with lower light products and higher atmospheric residue.",
    splitModel: {
      offGas: 0.5,
      lightNaphtha: 5,
      heavyNaphtha: 8,
      kerosene: 10,
      lightGasoil: 16,
      heavyGasoil: 18,
      residueHVU2: 21,
      residueHVU3: 21.5,
    },
  },
};
const DEFAULT_CDU_RUN_STATE = {
  selectedCrudeType: "medium",
  crudeSG: 0.886,
  crudeAPI: 28.16,
  crudeClassification: "medium",
  crudeBlend: {
    components: [
      {
        id: "crude-1",
        name: "Crude A",
        sg: 0.886,
        flowrate: 400,
        flowUnit: "m3/h",
        api: 28.164786,
        classification: "medium",
      },
    ],
    totalFlowM3H: 400,
    blendSG: 0.886,
    blendAPI: 28.164786,
    blendClassification: "medium",
  },
  crudeIntakeM3H: 400,
  crudeIntakeMBSD: 60,
  intakeUnit: "m3h",
  crudeIntake: 400,
  hasStarted: false,
  lastRunAt: null,
  lastResult: null,
};
const CDU_SPLIT_LABELS = {
  offGas: "Off Gas",
  lightNaphtha: "Light Naphtha",
  heavyNaphtha: "Heavy Naphtha",
  kerosene: "Kerosene",
  lightGasoil: "Light Gasoil",
  heavyGasoil: "Heavy Gasoil",
  residueHVU2: "Atmospheric Residue to HVU II",
  residueHVU3: "Atmospheric Residue to HVU III",
};
const CDU_SPLIT_STREAM_IDS = {
  "S-CDU-011": "offGas",
  "S-CDU-016": "lightNaphtha",
  "S-CDU-017": "heavyNaphtha",
  "S-CDU-019": "kerosene",
  "S-CDU-021": "lightGasoil",
  "S-CDU-023": "heavyGasoil",
  "S-CDU-024": "residueHVU2",
  "S-CDU-025": "residueHVU3",
};
const CDU_PRODUCT_STREAM_MAP = {
  offGas: "S-CDU-011",
  lightNaphtha: "S-CDU-016",
  heavyNaphtha: "S-CDU-017",
  kerosene: "S-CDU-019",
  lightGasoil: "S-CDU-021",
  heavyGasoil: "S-CDU-023",
  residueHVU2: "S-CDU-024",
  residueHVU3: "S-CDU-025",
};
const CDU_FEED_STREAM_IDS = ["S-CDU-001"];
const CDU_FEED_FORWARD_STREAM_IDS = ["S-CDU-001", "S-CDU-002", "S-CDU-003", "S-CDU-005", "S-CDU-006", "S-CDU-007"];
const CDU_NODE_BALANCE_DEFAULTS = {
  "CRUDE-SOURCE": { balanceType: "source", balanceCategories: CDU_LOCAL_BALANCE_CATEGORIES },
  "CDU-P-101": { balanceType: "passThrough", balanceCategories: CDU_LOCAL_BALANCE_CATEGORIES },
  "CDU-E-101": { balanceType: "passThrough", balanceCategories: CDU_LOCAL_BALANCE_CATEGORIES },
  "CDU-D-101": { balanceType: "separator", balanceCategories: HYDROCARBON_BALANCE_CATEGORIES },
  "CDU-E-102": { balanceType: "passThrough", balanceCategories: CDU_LOCAL_BALANCE_CATEGORIES },
  "CDU-H-101": { balanceType: "passThrough", balanceCategories: CDU_LOCAL_BALANCE_CATEGORIES },
  "CDU-C-101": { balanceType: "splitBased", balanceScope: "unit", balanceUnit: "CDU", balanceCategories: HYDROCARBON_BALANCE_CATEGORIES },
  "CDU-V-102": { balanceType: "separator", balanceCategories: CDU_LOCAL_BALANCE_CATEGORIES },
  "CDU-V-103": { balanceType: "passThrough", balanceCategories: CDU_LOCAL_BALANCE_CATEGORIES },
  "CDU-K-101": { balanceType: "passThrough", balanceCategories: CDU_LOCAL_BALANCE_CATEGORIES },
  "CDU-V-104": { balanceType: "passThrough", balanceCategories: CDU_LOCAL_BALANCE_CATEGORIES },
  "CDU-C-102": { balanceType: "separator", balanceCategories: CDU_LOCAL_BALANCE_CATEGORIES },
  "CDU-C-103": { balanceType: "separator", balanceCategories: CDU_LOCAL_BALANCE_CATEGORIES },
  "CDU-C-104": { balanceType: "passThrough", balanceCategories: CDU_LOCAL_BALANCE_CATEGORIES },
  "CDU-C-105": { balanceType: "passThrough", balanceCategories: CDU_LOCAL_BALANCE_CATEGORIES },
  "CDU-C-106": { balanceType: "passThrough", balanceCategories: CDU_LOCAL_BALANCE_CATEGORIES },
  "PRODUCT-OFFGAS": { balanceType: "productPool", balanceCategories: CDU_LOCAL_BALANCE_CATEGORIES },
  "PRODUCT-LN": { balanceType: "productPool", balanceCategories: CDU_LOCAL_BALANCE_CATEGORIES },
  "PRODUCT-HN": { balanceType: "productPool", balanceCategories: CDU_LOCAL_BALANCE_CATEGORIES },
  "PRODUCT-KERO": { balanceType: "productPool", balanceCategories: CDU_LOCAL_BALANCE_CATEGORIES },
  "PRODUCT-LGO": { balanceType: "productPool", balanceCategories: CDU_LOCAL_BALANCE_CATEGORIES },
  "PRODUCT-HGO": { balanceType: "productPool", balanceCategories: CDU_LOCAL_BALANCE_CATEGORIES },
  "PRODUCT-RES-HVU2": { balanceType: "productPool", balanceCategories: CDU_LOCAL_BALANCE_CATEGORIES },
  "PRODUCT-RES-HVU3": { balanceType: "productPool", balanceCategories: CDU_LOCAL_BALANCE_CATEGORIES },
  "WASTE-WATER": { balanceType: "productPool", balanceCategories: ["water"] },
};

function pfdArea(id, name, subtitle, x, y, width, height, color) {
  return { id, name, subtitle, x, y, width, height, color };
}

function pfdPort(id, label, side, offset, important) {
  return { id, label, side, offset, important };
}

function slugifyId(value) {
  return makeNodeId(value);
}

function pfdPorts(inputs = [], outputs = []) {
  return { inputs, outputs };
}

function simpleInOutPorts() {
  return pfdPorts(
    [pfdPort("in", "In", "left", 0.5)],
    [pfdPort("out", "Out", "right", 0.5)],
  );
}

function inletOnlyPorts() {
  return pfdPorts([pfdPort("in", "In", "left", 0.5)], []);
}

function outletOnlyPorts() {
  return pfdPorts([], [pfdPort("out", "Out", "right", 0.5)]);
}

function pfdNode(tag, name, type, unit, section, area, x, y, width, height, ports, options = {}) {
  return {
    id: slugifyId(tag),
    tag,
    name,
    unit,
    section,
    type,
    area,
    x,
    y,
    width,
    height,
    status: options.status || "Normal",
    temperature: options.temperature || "-",
    pressure: options.pressure || "-",
    flow: options.flow || "-",
    description: options.description || `${name} pada section ${section}.`,
    functions: options.functions || [`Menghubungkan aliran proses pada ${section}.`],
    operation: options.operation || ["PFD simplified block node; detail operasi dapat ditambahkan dari admin editor."],
    watch: options.watch || ["Flow", "Temperature", "Pressure", "Status"],
    ports,
    isMajor: typeof options.isMajor === "boolean" ? options.isMajor : true,
    visibleIn: Array.isArray(options.visibleIn) ? [...options.visibleIn] : ["refinery", "unit", "section"],
    balanceType: options.balanceType || "none",
    tolerancePercent: Number.isFinite(Number(options.tolerancePercent))
      ? Number(options.tolerancePercent)
      : DEFAULT_NODE_TOLERANCE_PERCENT,
    splitModel: options.splitModel ? deepClone(options.splitModel) : undefined,
    balanceCategories: Array.isArray(options.balanceCategories)
      ? [...options.balanceCategories]
      : HYDROCARBON_BALANCE_CATEGORIES,
    balanceScope: options.balanceScope || "node",
    balanceUnit: options.balanceUnit || null,
  };
}

function pfdStream(id, label, from, fromPort, to, toPort, type = "liquid", category = "main", strokeWidth = 2.2, labelMode = "hover") {
  return {
    id,
    label,
    from,
    fromPort,
    to,
    toPort,
    type,
    category,
    shape: "polyline",
    strokeWidth,
    points: [],
    autoRoute: true,
    avoidNodes: true,
    labelMode,
    visibleInSimplified: true,
    visibleIn: ["refinery", "unit", "section"],
    isMajor: true,
    flowrate: null,
    flowUnit: DEFAULT_FLOW_UNIT,
    flowM3H: null,
    flowMBSD: null,
    percentCap: null,
    temperature: null,
    pressure: null,
    density: null,
    densityTonM3: null,
    phase: type === "water" ? "water" : type === "gas" ? "gas" : type === "solid" ? "solid" : "liquid",
    isCalculated: false,
    balanceCategory: type === "water" ? "water" : category === "utility" ? "utility" : "hydrocarbon",
    isFinalProduct: false,
    includeInProductTable: false,
    includeInFeedTable: false,
    balanceRole: category === "utility" ? "utility" : "internal",
    isRecycle: false,
    includeInNodeBalance: true,
    includeInUnitBalance: true,
    flowMin: null,
    flowTarget: null,
    flowMax: null,
    flowRangeUnit: DEFAULT_FLOW_UNIT,
    temperatureMin: null,
    temperatureTarget: null,
    temperatureMax: null,
    pressureMin: null,
    pressureTarget: null,
    pressureMax: null,
    downstreamUse: "",
    constraintRole: "normal",
    constraintGroup: "",
    rangeStatus: "not-set",
    rangeMode: "monitor",
    useAsCalculationTarget: false,
    calculationPriority: 100,
    targetSolveMode: "adjust-siblings",
    targetTolerancePercent: DEFAULT_NODE_TOLERANCE_PERCENT,
    allowAutoAdjust: false,
    lockedFlow: null,
  };
}

function cduStream(id, label, from, fromPort, to, toPort, options = {}) {
  const phase = options.phase || "liquid";
  const type = options.type || (phase === "gas" ? "gas" : phase === "water" ? "water" : phase === "solid" ? "solid" : "liquid");
  return {
    ...pfdStream(id, label, from, fromPort, to, toPort, type, options.category || "main", options.strokeWidth || 2.4, options.labelMode || "hover"),
    flowrate: Number.isFinite(Number(options.flowrate)) ? Number(options.flowrate) : null,
    flowUnit: options.flowUnit || DEFAULT_FLOW_UNIT,
    flowM3H: Number.isFinite(Number(options.flowM3H))
      ? Number(options.flowM3H)
      : Number.isFinite(Number(options.flowrate))
        ? Number(options.flowrate)
        : null,
    flowMBSD: Number.isFinite(Number(options.flowMBSD)) ? Number(options.flowMBSD) : null,
    percentCap: Number.isFinite(Number(options.percentCap)) ? Number(options.percentCap) : null,
    temperature: options.temperature ?? null,
    pressure: options.pressure ?? null,
    density: options.density ?? null,
    densityTonM3: Number.isFinite(Number(options.densityTonM3)) ? Number(options.densityTonM3) : null,
    phase,
    isCalculated: Boolean(options.isCalculated),
    balanceCategory: options.balanceCategory || (phase === "water" ? "water" : "hydrocarbon"),
    isFinalProduct: Boolean(options.isFinalProduct),
    includeInProductTable: typeof options.includeInProductTable === "boolean" ? options.includeInProductTable : Boolean(options.isFinalProduct),
    includeInFeedTable: typeof options.includeInFeedTable === "boolean" ? options.includeInFeedTable : id === "S-CDU-001",
    balanceRole: normalizeStreamBalanceRole(options.balanceRole || (options.isFinalProduct ? "product" : "internal")),
    isRecycle: Boolean(options.isRecycle),
    includeInNodeBalance: typeof options.includeInNodeBalance === "boolean" ? options.includeInNodeBalance : options.balanceRole !== "recycle",
    includeInUnitBalance: typeof options.includeInUnitBalance === "boolean" ? options.includeInUnitBalance : true,
    flowMin: normalizeNullableNumber(options.flowMin),
    flowTarget: normalizeNullableNumber(options.flowTarget),
    flowMax: normalizeNullableNumber(options.flowMax),
    flowRangeUnit: normalizeStreamFlowRangeUnit(options.flowRangeUnit || options.flowUnit || DEFAULT_FLOW_UNIT),
    temperatureMin: normalizeNullableNumber(options.temperatureMin),
    temperatureTarget: normalizeNullableNumber(options.temperatureTarget),
    temperatureMax: normalizeNullableNumber(options.temperatureMax),
    pressureMin: normalizeNullableNumber(options.pressureMin),
    pressureTarget: normalizeNullableNumber(options.pressureTarget),
    pressureMax: normalizeNullableNumber(options.pressureMax),
    downstreamUse: safeText(options.downstreamUse, ""),
    constraintRole: normalizeStreamConstraintRole(options.constraintRole),
    constraintGroup: safeText(options.constraintGroup, ""),
    rangeStatus: safeText(options.rangeStatus, "not-set"),
    rangeMode: normalizeStreamRangeMode(options.rangeMode),
    useAsCalculationTarget: Boolean(options.useAsCalculationTarget),
    calculationPriority: Number.isFinite(Number(options.calculationPriority)) ? Number(options.calculationPriority) : 100,
    targetSolveMode: normalizeTargetSolveMode(options.targetSolveMode),
    targetTolerancePercent: normalizeTolerancePercent(options.targetTolerancePercent),
    allowAutoAdjust: Boolean(options.allowAutoAdjust),
    lockedFlow: normalizeNullableNumber(options.lockedFlow),
    splitKey: options.splitKey || "",
    splitSource: options.splitSource || "",
    points: Array.isArray(options.points) ? deepClone(options.points) : [],
    autoRoute: options.autoRoute !== false,
    avoidNodes: options.avoidNodes !== false,
    visibleIn: Array.isArray(options.visibleIn) ? [...options.visibleIn] : ["refinery", "unit", "section"],
    visibleInSimplified: options.visibleInSimplified !== false,
    unit: options.unit || "CDU",
    section: options.section || "CDU Split Model",
    isMajor: Boolean(options.isMajor),
  };
}

function cduNode(tag, name, type, section, area, x, y, width, height, ports, options = {}) {
  return pfdNode(tag, name, type, "CDU", section, area, x, y, width, height, ports, {
    visibleIn: ["refinery", "unit", "section"],
    isMajor: true,
    balanceType: "none",
    balanceCategories: HYDROCARBON_BALANCE_CATEGORIES,
    ...options,
  });
}

function cduDesalterPorts() {
  return pfdPorts(
    [pfdPort("crude", "Crude", "left", 0.48)],
    [
      pfdPort("desalted", "Desalted", "right", 0.42, true),
      pfdPort("water", "Water", "bottom", 0.62),
    ],
  );
}

function cduFractionatorPorts() {
  return pfdPorts(
    [pfdPort("feed", "Feed", "left", 0.55, true)],
    [
      pfdPort("overhead", "OH", "top", 0.5, true),
      pfdPort("kerosene", "Kero", "right", 0.3, true),
      pfdPort("lgo", "LGO", "right", 0.48, true),
      pfdPort("hgo", "HGO", "right", 0.66, true),
      pfdPort("residue2", "HVU II", "bottom", 0.38, true),
      pfdPort("residue3", "HVU III", "bottom", 0.68, true),
    ],
  );
}

function cduAccumulatorPorts() {
  return pfdPorts(
    [pfdPort("overhead", "OH", "left", 0.45, true)],
    [
      pfdPort("gas", "Gas", "right", 0.28, true),
      pfdPort("liquid", "Liquid", "right", 0.68, true),
    ],
  );
}

function cduNaphthaSplitterPorts() {
  return pfdPorts(
    [pfdPort("feed", "Feed", "left", 0.5, true)],
    [
      pfdPort("light", "Light", "right", 0.32, true),
      pfdPort("heavy", "Heavy", "right", 0.68, true),
    ],
  );
}

function cduStabilizerPorts() {
  return pfdPorts(
    [pfdPort("feed", "Feed", "left", 0.5, true)],
    [
      pfdPort("overhead", "OH", "top", 0.5, true),
      pfdPort("naphtha", "Naphtha", "right", 0.55, true),
    ],
  );
}

function cduSimpleTopPorts(inputId = "in", outputId = "out") {
  return pfdPorts(
    [pfdPort(inputId, "In", "left", 0.5, true)],
    [pfdPort(outputId, "Out", "right", 0.5, true)],
  );
}

const SECTION_PFD_AREAS = [
  pfdArea("area-cdu-feed", "CDU Feed Preparation", "Crude preheat, desalting, and degassing", 40, 390, 1220, 240, "#0f4ea8"),
  pfdArea("area-cdu-dist", "CDU Atmospheric Distillation", "Preflash, heater, and atmospheric column", 1260, 80, 760, 880, "#2563eb"),
  pfdArea("area-cdu-products", "CDU Product Draws", "Local CDU product cooling, stripping, and outlets", 2020, 80, 980, 880, "#13a65b"),
  pfdArea("area-hvu-dist", "HVU Vacuum Distillation", "Vacuum heater and vacuum column", 760, 1040, 860, 720, "#7c3aed"),
  pfdArea("area-hvu-products", "HVU Vacuum Product Draws", "Vacuum products and RFCC heavy feed connector", 260, 1060, 1710, 760, "#0891b2"),
  pfdArea("area-rfcc-reaction", "RFCC Reaction & Regeneration", "Feed, reactor, and regenerator block", 1940, 900, 600, 410, "#e6262e"),
  pfdArea("area-rfcc-fluegas", "RFCC Flue Gas / Steam", "Steam generation, ESP, and atmosphere outlet", 2180, 420, 1020, 390, "#f59e0b"),
  pfdArea("area-rfcc-frac", "RFCC Main Fractionation", "RFCC main fractionator product separation", 2620, 900, 430, 410, "#0f4ea8"),
  pfdArea("area-rfcc-gasconc", "RFCC Gas Concentration", "Wet gas recovery and gas concentration", 3040, 930, 360, 340, "#13a65b"),
  pfdArea("area-rfcc-treating", "RFCC Treating & Recovery", "Sour water, amine, sulfur, and Merox treating", 3020, 660, 580, 1160, "#7c3aed"),
  pfdArea("area-rfcc-products", "RFCC Product Routing / Storage", "Local LPG, gasoline, LCO, HCO, and CLO storage", 2620, 1280, 980, 540, "#059669"),
  pfdArea("area-rfcc-catalyst", "RFCC Catalyst Circulation", "Catalyst input, regenerated catalyst, and spent catalyst", 1940, 1380, 520, 430, "#64748b"),
];

const SECTION_PFD_NODES = [
  pfdNode("CRUDE-IN", "Crude Feed", "Boundary / Feed Inlet", "CDU", "CDU Feed Preparation", "area-cdu-feed", 80, 470, 120, 60, outletOnlyPorts()),
  pfdNode("CDU-PREHEAT-1", "Crude Preheat Exchanger 1", "Heat Exchanger", "CDU", "CDU Feed Preparation", "area-cdu-feed", 260, 445, 150, 90, simpleInOutPorts()),
  pfdNode("DESALTER-101", "Desalters", "Desalter", "CDU", "CDU Feed Preparation", "area-cdu-feed", 460, 445, 190, 90, pfdPorts([pfdPort("crude", "Crude", "left", 0.5)], [pfdPort("desaltedCrude", "Desalted", "right", 0.5)])),
  pfdNode("CDU-PREHEAT-2", "Crude Preheat Exchanger 2", "Heat Exchanger", "CDU", "CDU Feed Preparation", "area-cdu-feed", 700, 445, 150, 90, simpleInOutPorts()),
  pfdNode("E-200", "Degassing Drum / E-200", "Degassing Vessel", "CDU", "CDU Feed Preparation", "area-cdu-feed", 900, 435, 110, 110, simpleInOutPorts()),
  pfdNode("CDU-PREHEAT-3", "Crude Preheat Exchanger 3", "Heat Exchanger", "CDU", "CDU Feed Preparation", "area-cdu-feed", 1070, 445, 150, 90, simpleInOutPorts()),
  pfdNode("K-210", "Atmospheric Preflash / Stripper K-210", "Column", "CDU", "CDU Atmospheric Distillation", "area-cdu-dist", 1320, 280, 150, 330, pfdPorts([pfdPort("feed", "Feed", "left", 0.55)], [pfdPort("overhead", "OH", "top", 0.55), pfdPort("bottoms", "Bottoms", "bottom", 0.55)])),
  pfdNode("E-210", "CDU Overhead Condenser E-210", "Heat Exchanger", "CDU", "CDU Atmospheric Distillation", "area-cdu-dist", 1430, 120, 190, 90, pfdPorts([pfdPort("vapor", "Vapor", "bottom", 0.5)], [pfdPort("liquid", "Liquid", "right", 0.5)])),
  pfdNode("P-201", "CDU Heater / Furnace P-201", "Furnace", "CDU", "CDU Atmospheric Distillation", "area-cdu-dist", 1460, 700, 180, 150, pfdPorts([pfdPort("feed", "Feed", "left", 0.5)], [pfdPort("outlet", "Outlet", "right", 0.5)])),
  pfdNode("CDU-ATM-COL", "Atmospheric Distillation Column", "Main Column", "CDU", "CDU Atmospheric Distillation", "area-cdu-dist", 1780, 330, 190, 520, pfdPorts([pfdPort("feed", "Feed", "left", 0.5), pfdPort("reflux", "Reflux", "top", 0.5), pfdPort("steam", "Steam", "right", 0.8)], [pfdPort("overhead", "OH", "top", 0.55), pfdPort("naphtha", "Naphtha", "right", 0.22), pfdPort("kerosene", "Kero", "right", 0.42), pfdPort("lightDiesel", "L Diesel", "right", 0.62), pfdPort("heavyDiesel", "H Diesel", "bottom", 0.35), pfdPort("reducedCrude", "Reduced", "bottom", 0.7)])),
  pfdNode("E-221", "Naphtha Condenser E-221", "Heat Exchanger", "CDU", "CDU Product Draws", "area-cdu-products", 2060, 130, 190, 90, simpleInOutPorts()),
  pfdNode("E-220", "Naphtha Cooler E-220", "Heat Exchanger", "CDU", "CDU Product Draws", "area-cdu-products", 2220, 260, 190, 90, simpleInOutPorts()),
  pfdNode("K-220", "Naphtha Stabilizer / K-220", "Column", "CDU", "CDU Product Draws", "area-cdu-products", 2150, 420, 160, 280, pfdPorts([pfdPort("feed", "Feed", "left", 0.5)], [pfdPort("naphtha", "Naphtha", "right", 0.5)])),
  pfdNode("K-232", "Kerosene Stripper K-232", "Stripper", "CDU", "CDU Product Draws", "area-cdu-products", 2420, 580, 120, 150, pfdPorts([pfdPort("kerosene", "Kero", "left", 0.5)], [pfdPort("kerosene", "Kero", "right", 0.5)])),
  pfdNode("K-233", "Light Diesel Stripper K-233", "Stripper", "CDU", "CDU Product Draws", "area-cdu-products", 2420, 760, 120, 150, pfdPorts([pfdPort("lightDiesel", "L Diesel", "left", 0.5), pfdPort("steam", "Steam", "right", 0.8)], [pfdPort("lightDiesel", "L Diesel", "right", 0.5)])),
  pfdNode("NAPHTHA-OUT", "Naphtha Product", "Product Outlet", "CDU", "CDU Product Draws", "area-cdu-products", 2720, 260, 180, 70, inletOnlyPorts()),
  pfdNode("KEROSENE-OUT", "Kerosene Product", "Product Outlet", "CDU", "CDU Product Draws", "area-cdu-products", 2720, 610, 180, 70, inletOnlyPorts()),
  pfdNode("LIGHT-DIESEL-OUT", "Light Diesel Product", "Product Outlet", "CDU", "CDU Product Draws", "area-cdu-products", 2720, 790, 190, 70, inletOnlyPorts()),
  pfdNode("HEAVY-DIESEL-OUT", "Heavy Diesel Product", "Product Outlet", "CDU", "CDU Product Draws", "area-cdu-products", 1940, 970, 190, 70, inletOnlyPorts()),
  pfdNode("ATM-RESIDUE-OUT", "Atmospheric Reduced Crude", "Inter-Unit Outlet", "CDU", "CDU Atmospheric Distillation", "area-cdu-dist", 2200, 970, 230, 70, simpleInOutPorts()),
  pfdNode("HVU-FEED-IN", "Atmospheric Reduced Crude to HVU", "Inter-Unit Inlet", "HVU", "HVU Vacuum Distillation", "area-hvu-dist", 1160, 1080, 220, 70, simpleInOutPorts()),
  pfdNode("P-301", "Vacuum Heater / P-301", "Furnace", "HVU", "HVU Vacuum Distillation", "area-hvu-dist", 1280, 1420, 180, 150, pfdPorts([pfdPort("feed", "Feed", "left", 0.5)], [pfdPort("outlet", "Outlet", "right", 0.5)])),
  pfdNode("K-310", "Vacuum Distillation Column K-310", "Vacuum Column", "HVU", "HVU Vacuum Distillation", "area-hvu-dist", 850, 1220, 190, 430, pfdPorts([pfdPort("feed", "Feed", "right", 0.55), pfdPort("upperPA", "Upper PA", "left", 0.3), pfdPort("lowerPA", "Lower PA", "left", 0.48)], [pfdPort("vacuumOverhead", "Vac OH", "left", 0.12), pfdPort("vacuumDiesel", "Vac Diesel", "left", 0.3), pfdPort("lightVGO", "LVGO", "left", 0.5), pfdPort("heavyVGO", "HVGO", "left", 0.68), pfdPort("longResiduum", "Resid", "bottom", 0.5)])),
  pfdNode("VAC-OH-OUT", "Vacuum Overhead", "Product Outlet", "HVU", "HVU Vacuum Product Draws", "area-hvu-products", 320, 1120, 190, 70, inletOnlyPorts()),
  pfdNode("VAC-DIESEL-OUT", "Vacuum Diesel", "Product Outlet", "HVU", "HVU Vacuum Product Draws", "area-hvu-products", 300, 1260, 190, 70, inletOnlyPorts()),
  pfdNode("LIGHT-VGO-OUT", "Light VGO", "Product Outlet", "HVU", "HVU Vacuum Product Draws", "area-hvu-products", 300, 1410, 190, 70, inletOnlyPorts()),
  pfdNode("HEAVY-VGO-OUT", "Heavy VGO to RFCC", "Inter-Unit Outlet", "HVU", "HVU Vacuum Product Draws", "area-hvu-products", 300, 1560, 210, 70, simpleInOutPorts()),
  pfdNode("LONG-RESID-OUT", "Long Residuum", "Product Outlet", "HVU", "HVU Vacuum Product Draws", "area-hvu-products", 300, 1710, 210, 70, inletOnlyPorts()),
  pfdNode("RFCC-FEED-FROM-HVU", "HVU Heavy Feed to RFCC", "Inter-Unit Connector", "INTERUNIT", "CDU-HVU-RFCC Interconnection", "area-hvu-products", 1680, 1540, 240, 80, simpleInOutPorts()),
  pfdNode("FEED-RFCC", "RFCC Feed", "Boundary / Feed Inlet", "RFCC", "RFCC Reaction & Regeneration", "area-rfcc-reaction", 1980, 1110, 150, 70, simpleInOutPorts()),
  pfdNode("R-401", "Reactor and Regenerator", "Reactor / Regenerator", "RFCC", "RFCC Reaction & Regeneration", "area-rfcc-reaction", 2220, 950, 270, 300, pfdPorts([pfdPort("feed", "Feed", "left", 0.45), pfdPort("regenCatalyst", "Regen Cat", "bottom", 0.35), pfdPort("steam", "Steam", "top", 0.3)], [pfdPort("vapor", "Vapor", "right", 0.45), pfdPort("flueGas", "Flue Gas", "top", 0.55), pfdPort("spentCatalyst", "Spent Cat", "bottom", 0.65)])),
  pfdNode("SG-401", "Steam Generator", "Utility Equipment", "RFCC", "RFCC Flue Gas / Steam", "area-rfcc-fluegas", 2220, 620, 230, 150, pfdPorts([pfdPort("flueGas", "Flue Gas", "bottom", 0.5)], [pfdPort("steam", "Steam", "right", 0.55), pfdPort("flueGas", "Flue Gas", "top", 0.55)])),
  pfdNode("ESP-401", "Electrostatic Precipitator", "Environmental Equipment", "RFCC", "RFCC Flue Gas / Steam", "area-rfcc-fluegas", 2580, 480, 270, 120, pfdPorts([pfdPort("flueGas", "Flue Gas", "left", 0.5)], [pfdPort("atmosphere", "Atmos", "right", 0.5)])),
  pfdNode("ATM-OUT", "To Atmosphere", "Boundary / Outlet", "RFCC", "RFCC Flue Gas / Steam", "area-rfcc-fluegas", 3000, 510, 170, 70, inletOnlyPorts()),
  pfdNode("C-401", "Fractionation Chamber Main Column", "Main Fractionator", "RFCC", "RFCC Main Fractionation", "area-rfcc-frac", 2670, 990, 310, 260, pfdPorts([pfdPort("vapor", "Vapor", "left", 0.45)], [pfdPort("wetGas", "Wet Gas", "right", 0.3), pfdPort("lco", "LCO", "right", 0.58), pfdPort("hco", "HCO", "bottom", 0.45), pfdPort("clo", "CLO", "bottom", 0.7)])),
  pfdNode("GCU-401", "Gas Concentration Unit", "Gas Processing Unit", "RFCC", "RFCC Gas Concentration", "area-rfcc-gasconc", 3080, 1000, 290, 240, pfdPorts([pfdPort("wetGas", "Wet Gas", "left", 0.45)], [pfdPort("sourWater", "Sour H2O", "top", 0.45), pfdPort("sourGas", "Sour Gas", "right", 0.28), pfdPort("lpg", "LPG", "right", 0.55), pfdPort("gasoline", "Gasoline", "bottom", 0.55)])),
  pfdNode("SWU-401", "Sour Water Stripping Unit", "Treating Unit", "RFCC", "RFCC Treating & Recovery", "area-rfcc-treating", 3080, 700, 250, 180, pfdPorts([pfdPort("sourWater", "Sour H2O", "left", 0.5)], [pfdPort("acidGas", "Acid Gas", "bottom", 0.55)])),
  pfdNode("ATU-401", "Amine Treatment Unit", "Treating Unit", "RFCC", "RFCC Treating & Recovery", "area-rfcc-treating", 3080, 1270, 250, 170, pfdPorts([pfdPort("sourGas", "Sour Gas", "left", 0.5)], [pfdPort("acidGas", "Acid Gas", "right", 0.5)])),
  pfdNode("SRU-401", "Sulfur Recovery Unit", "Recovery Unit", "RFCC", "RFCC Treating & Recovery", "area-rfcc-treating", 3340, 880, 230, 150, pfdPorts([pfdPort("acidGas", "Acid Gas", "left", 0.5)], [pfdPort("sulfur", "Sulfur", "right", 0.5)])),
  pfdNode("LPG-MEROX", "LPG Merox Treatment Unit", "Treating Unit", "RFCC", "RFCC Treating & Recovery", "area-rfcc-treating", 3080, 1480, 280, 140, pfdPorts([pfdPort("lpg", "LPG", "left", 0.5)], [pfdPort("lpg", "LPG", "right", 0.5)])),
  pfdNode("GAS-MEROX", "Gasoline Merox Treatment Unit", "Treating Unit", "RFCC", "RFCC Treating & Recovery", "area-rfcc-treating", 3080, 1660, 280, 150, pfdPorts([pfdPort("gasoline", "Gasoline", "left", 0.5)], [pfdPort("gasoline", "Gasoline", "right", 0.5)])),
  pfdNode("LPG-STG", "LPG to Storage", "Product Storage", "RFCC", "RFCC Product Routing / Storage", "area-rfcc-products", 3380, 1490, 190, 100, inletOnlyPorts()),
  pfdNode("GAS-STG", "Gasoline to Storage", "Product Storage", "RFCC", "RFCC Product Routing / Storage", "area-rfcc-products", 3380, 1680, 190, 100, inletOnlyPorts()),
  pfdNode("LCO-STG", "LCO to Storage", "Product Storage", "RFCC", "RFCC Product Routing / Storage", "area-rfcc-products", 2670, 1320, 250, 100, inletOnlyPorts()),
  pfdNode("HCO-STG", "HCO to Storage", "Product Storage", "RFCC", "RFCC Product Routing / Storage", "area-rfcc-products", 2670, 1480, 250, 100, inletOnlyPorts()),
  pfdNode("CLO-STG", "CLO to Storage", "Product Storage", "RFCC", "RFCC Product Routing / Storage", "area-rfcc-products", 2670, 1640, 250, 100, inletOnlyPorts()),
  pfdNode("RFCC-CAT-IN", "RFCC Catalyst", "Catalyst Inlet", "RFCC", "RFCC Catalyst Circulation", "area-rfcc-catalyst", 1980, 1420, 180, 80, outletOnlyPorts()),
  pfdNode("REGEN-CAT", "Regenerator Catalyst", "Catalyst Stream Node", "RFCC", "RFCC Catalyst Circulation", "area-rfcc-catalyst", 2180, 1580, 190, 70, outletOnlyPorts()),
  pfdNode("SPENT-CAT", "Spent Catalyst", "Catalyst Stream Node", "RFCC", "RFCC Catalyst Circulation", "area-rfcc-catalyst", 2180, 1710, 190, 70, inletOnlyPorts()),
];

const SECTION_PFD_STREAMS = [
  pfdStream("CDU-S001", "Crude Feed", "CRUDE-IN", "out", "CDU-PREHEAT-1", "in", "liquid", "main", 2.8, "always"),
  pfdStream("CDU-S002", "Preheated Crude", "CDU-PREHEAT-1", "out", "DESALTER-101", "crude"),
  pfdStream("CDU-S003", "Desalted Crude", "DESALTER-101", "desaltedCrude", "CDU-PREHEAT-2", "in"),
  pfdStream("CDU-S004", "Preheated Desalted Crude", "CDU-PREHEAT-2", "out", "E-200", "in"),
  pfdStream("CDU-S005", "Degassed Crude", "E-200", "out", "CDU-PREHEAT-3", "in"),
  pfdStream("CDU-S006", "Heated Crude to K-210", "CDU-PREHEAT-3", "out", "K-210", "feed", "liquid", "main", 2.8, "always"),
  pfdStream("CDU-S007", "K-210 Bottoms to Heater", "K-210", "bottoms", "P-201", "feed", "liquid", "main", 2.8),
  pfdStream("CDU-S008", "Heater Outlet to Atmospheric Column", "P-201", "outlet", "CDU-ATM-COL", "feed", "liquid", "main", 2.8),
  pfdStream("CDU-S009", "K-210 Overhead to E-210", "K-210", "overhead", "E-210", "vapor", "gas", "gas", 2),
  pfdStream("CDU-S010", "E-210 Reflux/Product to Atmospheric Column", "E-210", "liquid", "CDU-ATM-COL", "reflux", "liquid", "main", 2.2),
  pfdStream("CDU-S011", "Atmospheric Overhead to E-221", "CDU-ATM-COL", "overhead", "E-221", "in", "gas", "gas", 2),
  pfdStream("CDU-S012", "E-221 to E-220", "E-221", "out", "E-220", "in"),
  pfdStream("CDU-S013", "E-220 to K-220", "E-220", "out", "K-220", "feed"),
  pfdStream("CDU-S014", "K-220 Naphtha to Outlet", "K-220", "naphtha", "NAPHTHA-OUT", "in", "liquid", "product", 2),
  pfdStream("CDU-S015", "Kerosene Draw", "CDU-ATM-COL", "kerosene", "K-232", "kerosene", "liquid", "product", 2),
  pfdStream("CDU-S016", "Kerosene Product", "K-232", "kerosene", "KEROSENE-OUT", "in", "liquid", "product", 2),
  pfdStream("CDU-S017", "Light Diesel Draw", "CDU-ATM-COL", "lightDiesel", "K-233", "lightDiesel", "liquid", "product", 2),
  pfdStream("CDU-S018", "Light Diesel Product", "K-233", "lightDiesel", "LIGHT-DIESEL-OUT", "in", "liquid", "product", 2),
  pfdStream("CDU-S019", "Heavy Diesel Product", "CDU-ATM-COL", "heavyDiesel", "HEAVY-DIESEL-OUT", "in", "liquid", "product", 2),
  pfdStream("CDU-S020", "Atmospheric Reduced Crude", "CDU-ATM-COL", "reducedCrude", "ATM-RESIDUE-OUT", "in", "liquid", "heavy", 2.8, "always"),
  pfdStream("CDU-HVU-S001", "Residue to HVU", "ATM-RESIDUE-OUT", "out", "HVU-FEED-IN", "in", "liquid", "interunit", 2.8),
  pfdStream("HVU-S001", "HVU Feed to Heater", "HVU-FEED-IN", "out", "P-301", "feed", "liquid", "heavy", 2.8),
  pfdStream("HVU-S002", "Heated HVU Feed to Vacuum Column", "P-301", "outlet", "K-310", "feed", "liquid", "heavy", 2.8),
  pfdStream("HVU-S003", "Vacuum Overhead", "K-310", "vacuumOverhead", "VAC-OH-OUT", "in", "gas", "gas", 2),
  pfdStream("HVU-S004", "Vacuum Diesel", "K-310", "vacuumDiesel", "VAC-DIESEL-OUT", "in", "liquid", "product", 2),
  pfdStream("HVU-S005", "Light VGO", "K-310", "lightVGO", "LIGHT-VGO-OUT", "in", "liquid", "product", 2),
  pfdStream("HVU-S006", "Heavy VGO", "K-310", "heavyVGO", "HEAVY-VGO-OUT", "in", "liquid", "heavy", 2.8, "always"),
  pfdStream("HVU-S007", "Long Residuum", "K-310", "longResiduum", "LONG-RESID-OUT", "in", "liquid", "heavy", 2.8),
  pfdStream("HVU-RFCC-S001", "Heavy VGO to RFCC Feed", "HEAVY-VGO-OUT", "out", "RFCC-FEED-FROM-HVU", "in", "liquid", "interunit", 2.8, "always"),
  pfdStream("INT-S001", "Heavy VGO/HVU Feed to RFCC", "RFCC-FEED-FROM-HVU", "out", "FEED-RFCC", "in", "liquid", "interunit", 2.8, "always"),
  pfdStream("RFCC-S001", "RFCC Feed", "FEED-RFCC", "out", "R-401", "feed", "liquid", "main", 2.8, "always"),
  pfdStream("RFCC-S002", "Reactor Vapor", "R-401", "vapor", "C-401", "vapor", "gas", "main", 2.8, "always"),
  pfdStream("RFCC-S003", "Wet Gas", "C-401", "wetGas", "GCU-401", "wetGas", "gas", "gas", 2, "always"),
  pfdStream("RFCC-S004", "Sour H2O", "GCU-401", "sourWater", "SWU-401", "sourWater", "water", "sour", 2),
  pfdStream("RFCC-S005", "Sour Gas", "GCU-401", "sourGas", "ATU-401", "sourGas", "gas", "sour", 2),
  pfdStream("RFCC-S006", "Acid Gas from SWS", "SWU-401", "acidGas", "SRU-401", "acidGas", "gas", "sour", 2),
  pfdStream("RFCC-S007", "Acid Gas from Amine", "ATU-401", "acidGas", "SRU-401", "acidGas", "gas", "sour", 2),
  pfdStream("RFCC-S008", "LPG", "GCU-401", "lpg", "LPG-MEROX", "lpg", "liquid", "product", 2, "always"),
  pfdStream("RFCC-S009", "LPG to Storage", "LPG-MEROX", "lpg", "LPG-STG", "in", "liquid", "product", 2),
  pfdStream("RFCC-S010", "Gasoline", "GCU-401", "gasoline", "GAS-MEROX", "gasoline", "liquid", "product", 2, "always"),
  pfdStream("RFCC-S011", "Gasoline to Storage", "GAS-MEROX", "gasoline", "GAS-STG", "in", "liquid", "product", 2),
  pfdStream("RFCC-S012", "LCO", "C-401", "lco", "LCO-STG", "in", "liquid", "product", 2, "always"),
  pfdStream("RFCC-S013", "HCO", "C-401", "hco", "HCO-STG", "in", "liquid", "product", 2, "always"),
  pfdStream("RFCC-S014", "CLO", "C-401", "clo", "CLO-STG", "in", "liquid", "product", 2, "always"),
  pfdStream("RFCC-S015", "RFCC Catalyst", "RFCC-CAT-IN", "out", "R-401", "regenCatalyst", "solid", "catalyst", 2.4),
  pfdStream("RFCC-S016", "Regenerator Catalyst", "REGEN-CAT", "out", "R-401", "regenCatalyst", "solid", "catalyst", 2.4),
  pfdStream("RFCC-S017", "Spent Catalyst", "R-401", "spentCatalyst", "SPENT-CAT", "in", "solid", "catalyst", 2.4),
  pfdStream("RFCC-S018", "Flue Gas to Steam Generator", "R-401", "flueGas", "SG-401", "flueGas", "gas", "fluegas", 2),
  pfdStream("RFCC-S019", "Steam to Reactor", "SG-401", "steam", "R-401", "steam", "gas", "utility", 2),
  pfdStream("RFCC-S020", "Flue Gas to ESP", "SG-401", "flueGas", "ESP-401", "flueGas", "gas", "fluegas", 2),
  pfdStream("RFCC-S021", "To Atmosphere", "ESP-401", "atmosphere", "ATM-OUT", "in", "gas", "fluegas", 2, "always"),
];

function hydrotreaterPorts() {
  return pfdPorts(
    [
      pfdPort("in", "In", "left", 0.5),
      pfdPort("h2", "H2", "top", 0.7),
    ],
    [pfdPort("out", "Out", "right", 0.5)],
  );
}

function crudeUnitPorts() {
  return pfdPorts(
    [pfdPort("crude", "Crude", "left", 0.45)],
    [
      pfdPort("gas", "Gas", "top", 0.5),
      pfdPort("lightNaphtha", "L Naphtha", "right", 0.22),
      pfdPort("heavyNaphtha", "H Naphtha", "right", 0.34),
      pfdPort("kerosene", "Kerosene", "right", 0.48),
      pfdPort("diesel", "Diesel", "right", 0.6),
      pfdPort("atmosphericGasOil", "AGO", "right", 0.72),
      pfdPort("bottoms", "Bottoms", "bottom", 0.5),
    ],
  );
}

function vacuumUnitPorts() {
  return pfdPorts(
    [pfdPort("bottoms", "Bottoms", "top", 0.5)],
    [
      pfdPort("vacuumOverhead", "Vac OH", "left", 0.2),
      pfdPort("lightVGO", "LVGO", "right", 0.38),
      pfdPort("heavyVGO", "HVGO", "right", 0.55),
      pfdPort("residuum", "Resid", "bottom", 0.5),
    ],
  );
}

function gasolineBlendPorts() {
  return pfdPorts(
    [
      pfdPort("isomerate", "Isomerate", "left", 0.2),
      pfdPort("reformate", "Reformate", "left", 0.35),
      pfdPort("hydrocrackedGasoline", "HCU Gasoline", "left", 0.5),
      pfdPort("alkylate", "Alkylate", "left", 0.65),
      pfdPort("fccGasoline", "FCC Gasoline", "left", 0.8),
      pfdPort("cokerNaphtha", "Coker Naphtha", "left", 0.92),
    ],
    [pfdPort("gasoline", "Gasoline", "right", 0.5)],
  );
}

function gasProcessingPorts() {
  return pfdPorts(
    [pfdPort("in", "Gas", "left", 0.5)],
    [
      pfdPort("out", "Fuel Gas", "right", 0.35),
      pfdPort("lpg", "LPG", "right", 0.65),
    ],
  );
}

function aminePorts() {
  return pfdPorts(
    [pfdPort("in", "Gas", "left", 0.5)],
    [
      pfdPort("out", "Sweet Gas", "right", 0.42),
      pfdPort("h2s", "H2S", "right", 0.72),
    ],
  );
}

function hcuPorts() {
  return pfdPorts(
    [
      pfdPort("in", "Feed", "left", 0.5),
      pfdPort("h2", "H2", "top", 0.7),
    ],
    [
      pfdPort("gasoline", "Gasoline", "right", 0.35),
      pfdPort("diesel", "Diesel", "right", 0.65),
    ],
  );
}

function rfccOverviewPorts() {
  return pfdPorts(
    [pfdPort("in", "Feed", "left", 0.5)],
    [
      pfdPort("gasoline", "Gasoline", "right", 0.28),
      pfdPort("lpgOlefins", "LPG/Olefins", "right", 0.52),
      pfdPort("gasOil", "Gas Oil", "right", 0.78),
    ],
  );
}

function dcuPorts() {
  return pfdPorts(
    [pfdPort("in", "Resid", "left", 0.5)],
    [
      pfdPort("naphtha", "Naphtha", "right", 0.25),
      pfdPort("gasOil", "Gas Oil", "right", 0.5),
      pfdPort("coke", "Coke", "right", 0.75),
    ],
  );
}

function h2PlantPorts() {
  return pfdPorts([], [pfdPort("h2", "H2", "top", 0.5)]);
}

function swsPorts() {
  return pfdPorts(
    [pfdPort("sourWater", "Sour Water", "left", 0.5)],
    [
      pfdPort("h2s", "H2S", "top", 0.5),
      pfdPort("strippedWater", "Water", "right", 0.5),
    ],
  );
}

function clausPorts() {
  return pfdPorts(
    [pfdPort("h2s", "H2S", "left", 0.5)],
    [pfdPort("sulfur", "Sulfur", "right", 0.5)],
  );
}

function overviewStream(id, label, from, fromPort, to, toPort, type = "liquid", category = "main", options = {}) {
  return {
    id,
    label,
    from,
    fromPort,
    to,
    toPort,
    type,
    category,
    shape: "polyline",
    strokeWidth: options.strokeWidth ?? getOverviewStrokeWidth(category, type),
    points: Array.isArray(options.points) ? options.points : [],
    autoRoute: options.autoRoute ?? !Array.isArray(options.points),
    avoidNodes: options.avoidNodes ?? true,
    labelMode: options.labelMode || "hover",
    visibleInSimplified: options.visibleInSimplified ?? true,
    visibleIn: ["refinery", "unit", "section"],
    isMajor: options.isMajor ?? true,
  };
}

function getOverviewStrokeWidth(category, type) {
  if (category === "main" || category === "heavy") return 2.6;
  if (category === "hydrogen" || category === "gas" || category === "sour" || category === "sulfur") return 1.8;
  if (category === "product") return 2;
  if (type === "gas" || type === "water") return 1.8;
  return 2;
}

const REFINERY_OVERVIEW_AREAS = [
  pfdArea("area-distillation", "Distillation", "Crude, atmospheric, and vacuum distillation", 80, 560, 900, 2120, "#0f4ea8"),
  pfdArea("area-gas-processing", "Gas Processing", "Fuel gas, LPG recovery, amine, and sulfur feed", 1050, 120, 2300, 520, "#13a65b"),
  pfdArea("area-naphtha-processing", "Naphtha Processing", "Light/heavy naphtha treating, isomerization, and reforming", 1050, 600, 2050, 560, "#0f4ea8"),
  pfdArea("area-middle-distillate", "Middle Distillate Treating", "Kerosene and diesel treating", 1050, 1160, 2050, 560, "#0891b2"),
  pfdArea("area-heavy-conversion", "Heavy Oil Conversion", "VGO, RFCC, hydrocracker, coker feed, and fuel oil routes", 1050, 1840, 2300, 880, "#e6262e"),
  pfdArea("area-lpg-alkylation", "LPG / Alkylation", "Olefin upgrading to alkylate", 2450, 1960, 760, 380, "#f59e0b"),
  pfdArea("area-product-blending", "Product Blending", "Gasoline blending and local product outlets", 3900, 500, 1500, 2100, "#13a65b"),
  pfdArea("area-hydrogen-utilities", "Hydrogen & Utilities", "Hydrogen supply and stripped water handling", 3200, 2700, 1900, 700, "#64748b"),
  pfdArea("area-sulfur-sour-water", "Sulfur & Sour Water", "H2S routing, Claus sulfur, and sour water stripping", 2450, 90, 2700, 3320, "#7c3aed"),
  pfdArea("area-asphalt-coke", "Asphalt / Coke", "Vacuum residuum, delayed coker, asphalt, and coke products", 560, 2680, 1600, 620, "#92400e"),
];

const CDU_DETAIL_AREAS = [
  {
    ...pfdArea("area-cdu-feed", "Feed System", "Crude source and charge pumping", 120, 980, 620, 430, "#0f4ea8"),
    unit: "CDU",
    section: "Feed System",
    visibleIn: ["refinery", "unit", "section"],
    locked: true,
  },
  {
    ...pfdArea("area-cdu-preheat", "Preheat & Desalting", "Cold preheat, desalting, and hot preheat", 820, 820, 940, 620, "#0891b2"),
    unit: "CDU",
    section: "Preheat & Desalting",
    visibleIn: ["refinery", "unit", "section"],
    locked: true,
  },
  {
    ...pfdArea("area-cdu-furnace", "Furnace", "Crude charge heater", 1860, 900, 460, 420, "#f59e0b"),
    unit: "CDU",
    section: "Furnace",
    visibleIn: ["refinery", "unit", "section"],
    locked: true,
  },
  {
    ...pfdArea("area-cdu-fractionation", "Main Fractionation", "Atmospheric fractionator and main product draws", 2440, 620, 560, 1140, "#2563eb"),
    unit: "CDU",
    section: "Main Fractionation",
    visibleIn: ["refinery", "unit", "section"],
    locked: true,
  },
  {
    ...pfdArea("area-cdu-overhead", "Overhead System", "Overhead accumulator, suction drum, and gas compressor", 3160, 340, 930, 450, "#13a65b"),
    unit: "CDU",
    section: "Overhead System",
    visibleIn: ["refinery", "unit", "section"],
    locked: true,
  },
  {
    ...pfdArea("area-cdu-naphtha", "Stabilizer & Naphtha Splitter", "Naphtha stabilization and light/heavy naphtha split", 3160, 860, 1120, 640, "#0f766e"),
    unit: "CDU",
    section: "Stabilizer & Naphtha Splitter",
    visibleIn: ["refinery", "unit", "section"],
    locked: true,
  },
  {
    ...pfdArea("area-cdu-strippers", "Side Strippers", "Kerosene, LGO, and HGO stripping", 3160, 1600, 760, 780, "#7c3aed"),
    unit: "CDU",
    section: "Side Strippers",
    visibleIn: ["refinery", "unit", "section"],
    locked: true,
  },
  {
    ...pfdArea("area-cdu-products", "Product Routing", "Final CDU product streams", 4420, 430, 1050, 1980, "#059669"),
    unit: "CDU",
    section: "Product Routing",
    visibleIn: ["refinery", "unit", "section"],
    locked: true,
  },
  {
    ...pfdArea("area-cdu-water", "Water System", "Desalter water outlet", 820, 1510, 560, 300, "#64748b"),
    unit: "CDU",
    section: "Water System",
    visibleIn: ["refinery", "unit", "section"],
    locked: true,
  },
];

const REFINERY_OVERVIEW_NODES = [
  pfdNode("CRUDE-IN", "Crude Oil Feed", "Boundary / Feed Inlet", "REFINERY", "Distillation", "area-distillation", 120, 1350, 150, 72, outletOnlyPorts()),
  pfdNode("ADU-101", "Atmospheric Distillation", "Atmospheric Column", "CDU", "Distillation", "area-distillation", 450, 700, 260, 950, crudeUnitPorts(), {
    description: "Atmospheric distillation receives crude oil and separates gas, naphtha, kerosene, diesel, atmospheric gas oil, and atmospheric bottoms.",
    functions: ["Primary crude fractionation.", "Feeds downstream treating, conversion, and vacuum distillation routes."],
  }),
  pfdNode("VDU-101", "Vacuum Distillation", "Vacuum Column", "VDU", "Distillation", "area-distillation", 520, 2050, 240, 520, vacuumUnitPorts(), {
    description: "Vacuum distillation processes atmospheric bottoms into VGO fractions and vacuum residuum.",
    functions: ["Recovers light and heavy VGO.", "Routes residuum to coking or asphalt service."],
  }),

  pfdNode("GPU-101", "Gas Processing", "Gas Processing Unit", "GAS", "Gas Processing", "area-gas-processing", 1150, 320, 230, 120, gasProcessingPorts()),
  pfdNode("AMINE-101", "Amine Treating", "Treating Unit", "GAS", "Gas Processing", "area-gas-processing", 1750, 180, 230, 120, aminePorts()),
  pfdNode("MEROX-LPG", "LPG Merox Treaters", "Merox Treating", "LPG", "LPG / Alkylation", "area-lpg-alkylation", 1750, 430, 240, 120, simpleInOutPorts()),
  pfdNode("CLAUS-101", "Claus Sulfur Plant", "Sulfur Recovery", "SULFUR", "Sulfur & Sour Water", "area-sulfur-sour-water", 2550, 180, 230, 120, clausPorts()),
  pfdNode("LPG-OUT", "LPG / Butanes Product", "Product Outlet", "PRODUCT", "Product Blending", "area-product-blending", 2550, 450, 220, 90, inletOnlyPorts()),
  pfdNode("REFINERY-FUEL-OUT", "Refinery Fuel Gas", "Fuel Gas Outlet", "PRODUCT", "Product Blending", "area-product-blending", 3100, 160, 240, 90, inletOnlyPorts()),
  pfdNode("SULFUR-OUT", "Sulfur Product", "Product Outlet", "PRODUCT", "Product Blending", "area-product-blending", 3100, 300, 210, 90, inletOnlyPorts()),

  pfdNode("NHT-LN-101", "Light Naphtha Hydrotreater", "Hydrotreater", "NAPHTHA", "Naphtha Processing", "area-naphtha-processing", 1150, 680, 230, 120, hydrotreaterPorts()),
  pfdNode("ISOM-101", "Isomerization Plant", "Isomerization", "NAPHTHA", "Naphtha Processing", "area-naphtha-processing", 1750, 680, 220, 120, simpleInOutPorts()),
  pfdNode("NHT-HN-101", "Heavy Naphtha Hydrotreater", "Hydrotreater", "NAPHTHA", "Naphtha Processing", "area-naphtha-processing", 1150, 920, 230, 120, hydrotreaterPorts()),
  pfdNode("REFORMER-101", "Catalytic Reformer", "Reformer", "NAPHTHA", "Naphtha Processing", "area-naphtha-processing", 1750, 920, 230, 120, simpleInOutPorts()),
  pfdNode("GASOLINE-BLEND", "Gasoline Blending Pool", "Blending Pool", "PRODUCT", "Product Blending", "area-product-blending", 4100, 750, 260, 1700, gasolineBlendPorts(), {
    description: "Gasoline blending pool combines isomerate, reformate, hydrocracked gasoline, alkylate, FCC gasoline, and coker naphtha.",
    functions: ["Collects gasoline blendstocks.", "Routes finished gasoline to product outlet."],
  }),
  pfdNode("GASOLINE-OUT", "Gasoline Product", "Product Outlet", "PRODUCT", "Product Blending", "area-product-blending", 4700, 1500, 230, 100, inletOnlyPorts()),

  pfdNode("MEROX-KERO", "Jet Fuel / Kerosene Merox Treater", "Merox Treating", "MIDDLE", "Middle Distillate Treating", "area-middle-distillate", 1150, 1220, 260, 120, simpleInOutPorts()),
  pfdNode("DHT-101", "Diesel Hydrotreater", "Hydrotreater", "MIDDLE", "Middle Distillate Treating", "area-middle-distillate", 1150, 1500, 230, 120, hydrotreaterPorts()),
  pfdNode("JETFUEL-OUT", "Jet Fuel / Kerosene Product", "Product Outlet", "PRODUCT", "Product Blending", "area-product-blending", 1850, 1220, 260, 100, inletOnlyPorts()),
  pfdNode("DIESEL-OUT", "Diesel Oil Product", "Product Outlet", "PRODUCT", "Product Blending", "area-product-blending", 1850, 1500, 230, 100, inletOnlyPorts()),

  pfdNode("HCU-101", "Hydrocracker", "Conversion Unit", "HCU", "Heavy Oil Conversion", "area-heavy-conversion", 1750, 1900, 240, 140, hcuPorts()),
  pfdNode("FCC-FEED-HTR", "FCC Feed Hydrotreater", "Hydrotreater", "RFCC", "Heavy Oil Conversion", "area-heavy-conversion", 1150, 2200, 250, 130, hydrotreaterPorts()),
  pfdNode("RFCC-101", "Fluid Catalytic Cracker / RFCC", "Conversion Unit", "RFCC", "Heavy Oil Conversion", "area-heavy-conversion", 1750, 2300, 250, 160, rfccOverviewPorts()),
  pfdNode("ALKYLATION-101", "Alkylation Unit", "Alkylation", "LPG", "LPG / Alkylation", "area-lpg-alkylation", 2550, 2100, 240, 120, simpleInOutPorts()),
  pfdNode("DCU-101", "Delayed Coker", "Conversion Unit", "COKER", "Asphalt / Coke", "area-asphalt-coke", 1150, 2750, 240, 150, dcuPorts()),
  pfdNode("ASPHALT-101", "Asphalt Blowing", "Asphalt Unit", "ASPHALT", "Asphalt / Coke", "area-asphalt-coke", 650, 2850, 230, 120, simpleInOutPorts()),
  pfdNode("FUEL-OIL-OUT", "Fuel Oil Product", "Product Outlet", "PRODUCT", "Product Blending", "area-product-blending", 2550, 2500, 230, 100, inletOnlyPorts()),
  pfdNode("PETCOKE-OUT", "Petroleum Coke Product", "Product Outlet", "PRODUCT", "Asphalt / Coke", "area-asphalt-coke", 1750, 3000, 240, 100, inletOnlyPorts()),
  pfdNode("ASPHALT-OUT", "Asphalt Product", "Product Outlet", "PRODUCT", "Asphalt / Coke", "area-asphalt-coke", 1150, 3150, 220, 100, inletOnlyPorts()),

  pfdNode("H2-PLANT", "Hydrogen Synthesis", "Hydrogen Plant", "UTILITIES", "Hydrogen & Utilities", "area-hydrogen-utilities", 3300, 3000, 250, 120, h2PlantPorts()),
  pfdNode("SOUR-WATER-IN", "Sour Waters Connector", "Boundary / Sour Water Inlet", "UTILITIES", "Sulfur & Sour Water", "area-hydrogen-utilities", 3950, 2850, 230, 100, outletOnlyPorts()),
  pfdNode("SWS-101", "Sour Water Stripper", "Treating Unit", "UTILITIES", "Sulfur & Sour Water", "area-hydrogen-utilities", 4300, 2850, 230, 150, swsPorts()),
  pfdNode("H2S-TO-SULFUR", "H2S to Sulfur Plant", "Connector", "SULFUR", "Sulfur & Sour Water", "area-sulfur-sour-water", 3600, 2720, 220, 90, simpleInOutPorts()),
  pfdNode("STRIPPED-WATER-OUT", "Stripped Water Outlet", "Water Outlet", "UTILITIES", "Hydrogen & Utilities", "area-hydrogen-utilities", 4900, 3000, 240, 100, inletOnlyPorts()),
];

const CDU_DETAIL_NODES = [
  cduNode("CRUDE-SOURCE", "Crude Feed Source", "Feed Source", "Feed System", "area-cdu-feed", 190, 1140, 170, 80, outletOnlyPorts(), { balanceType: "source", balanceCategories: CDU_LOCAL_BALANCE_CATEGORIES }),
  cduNode("CDU-P-101", "Crude Oil Pump", "Pump", "Feed System", "area-cdu-feed", 500, 1135, 150, 90, simpleInOutPorts(), { balanceType: "passThrough", balanceCategories: CDU_LOCAL_BALANCE_CATEGORIES }),
  cduNode("CDU-E-101", "Cold Preheat System", "Heat Exchanger Train", "Preheat & Desalting", "area-cdu-preheat", 900, 1120, 190, 110, simpleInOutPorts(), { balanceType: "passThrough", balanceCategories: CDU_LOCAL_BALANCE_CATEGORIES }),
  cduNode("CDU-V-101", "Desalter Water Surge Drum", "Drum", "Preheat & Desalting", "area-cdu-preheat", 960, 1290, 180, 90, simpleInOutPorts()),
  cduNode("CDU-D-101", "Desalter", "Desalter", "Preheat & Desalting", "area-cdu-preheat", 1240, 1115, 170, 115, cduDesalterPorts(), { balanceType: "separator", balanceCategories: HYDROCARBON_BALANCE_CATEGORIES }),
  cduNode("CDU-E-102", "Hot Preheat System", "Heat Exchanger Train", "Preheat & Desalting", "area-cdu-preheat", 1510, 1120, 190, 110, simpleInOutPorts(), { balanceType: "passThrough", balanceCategories: CDU_LOCAL_BALANCE_CATEGORIES }),
  cduNode("CDU-H-101", "Crude Charge Heater", "Furnace", "Furnace", "area-cdu-furnace", 1965, 1030, 180, 180, pfdPorts([pfdPort("feed", "Feed", "left", 0.5, true)], [pfdPort("outlet", "Outlet", "right", 0.5, true)]), { balanceType: "passThrough", balanceCategories: CDU_LOCAL_BALANCE_CATEGORIES }),
  cduNode("CDU-C-101", "Main Fractionator Column", "Distillation Column", "Main Fractionation", "area-cdu-fractionation", 2630, 820, 210, 760, cduFractionatorPorts(), {
    balanceType: "splitBased",
    tolerancePercent: 0.5,
    balanceScope: "unit",
    balanceUnit: "CDU",
    splitModel: CDU_MAIN_SPLIT_MODEL,
    balanceCategories: HYDROCARBON_BALANCE_CATEGORIES,
    description: "CDU overall balance node. Crude feed is separated by selected crude assay yields into final CDU product streams.",
    functions: ["Runs split-based CDU mass balance.", "Compares unit feed against final hydrocarbon products.", "Routes residue to HVU II and HVU III."],
  }),
  cduNode("CDU-V-102", "Main Fractionator Overhead Accumulator", "Accumulator Drum", "Overhead System", "area-cdu-overhead", 3260, 485, 230, 110, cduAccumulatorPorts(), { balanceType: "separator", balanceCategories: CDU_LOCAL_BALANCE_CATEGORIES }),
  cduNode("CDU-V-103", "Suction Drum", "Drum", "Overhead System", "area-cdu-overhead", 3600, 485, 160, 95, simpleInOutPorts(), { balanceType: "passThrough", balanceCategories: CDU_LOCAL_BALANCE_CATEGORIES }),
  cduNode("CDU-K-101", "Overhead Gas Compressor", "Compressor", "Overhead System", "area-cdu-overhead", 3860, 480, 180, 105, simpleInOutPorts(), { balanceType: "passThrough", balanceCategories: CDU_LOCAL_BALANCE_CATEGORIES }),
  cduNode("CDU-V-104", "Stabilizer Feed Surge Drum", "Drum", "Stabilizer & Naphtha Splitter", "area-cdu-naphtha", 3260, 1020, 220, 105, simpleInOutPorts(), { balanceType: "passThrough", balanceCategories: CDU_LOCAL_BALANCE_CATEGORIES }),
  cduNode("CDU-C-102", "Stabilizer", "Distillation Column", "Stabilizer & Naphtha Splitter", "area-cdu-naphtha", 3610, 940, 165, 260, cduStabilizerPorts(), { balanceType: "separator", balanceCategories: CDU_LOCAL_BALANCE_CATEGORIES }),
  cduNode("CDU-V-105", "Stabilizer Overhead Accumulator", "Accumulator Drum", "Stabilizer & Naphtha Splitter", "area-cdu-naphtha", 3845, 885, 230, 105, inletOnlyPorts()),
  cduNode("CDU-C-103", "Naphtha Splitter", "Distillation Column", "Stabilizer & Naphtha Splitter", "area-cdu-naphtha", 4035, 1060, 170, 260, cduNaphthaSplitterPorts(), { balanceType: "separator", balanceCategories: CDU_LOCAL_BALANCE_CATEGORIES }),
  cduNode("CDU-V-106", "Splitter Overhead Accumulator", "Accumulator Drum", "Stabilizer & Naphtha Splitter", "area-cdu-naphtha", 4020, 1370, 230, 105, inletOnlyPorts()),
  cduNode("CDU-C-104", "Kerosene Stripper", "Stripper", "Side Strippers", "area-cdu-strippers", 3300, 1770, 170, 130, simpleInOutPorts(), { balanceType: "passThrough", balanceCategories: CDU_LOCAL_BALANCE_CATEGORIES }),
  cduNode("CDU-C-105", "LGO Stripper", "Stripper", "Side Strippers", "area-cdu-strippers", 3525, 1930, 160, 130, simpleInOutPorts(), { balanceType: "passThrough", balanceCategories: CDU_LOCAL_BALANCE_CATEGORIES }),
  cduNode("CDU-C-106", "HGO Stripper", "Stripper", "Side Strippers", "area-cdu-strippers", 3740, 2090, 160, 130, simpleInOutPorts(), { balanceType: "passThrough", balanceCategories: CDU_LOCAL_BALANCE_CATEGORIES }),
  cduNode("PRODUCT-OFFGAS", "Off Gas Product", "Product Pool", "Product Routing", "area-cdu-products", 4690, 470, 185, 85, inletOnlyPorts(), { balanceType: "productPool", balanceCategories: CDU_LOCAL_BALANCE_CATEGORIES }),
  cduNode("PRODUCT-LN", "Light Naphtha Product", "Product Pool", "Product Routing", "area-cdu-products", 4690, 930, 205, 85, inletOnlyPorts(), { balanceType: "productPool", balanceCategories: CDU_LOCAL_BALANCE_CATEGORIES }),
  cduNode("PRODUCT-HN", "Heavy Naphtha Product", "Product Pool", "Product Routing", "area-cdu-products", 4690, 1115, 210, 85, inletOnlyPorts(), { balanceType: "productPool", balanceCategories: CDU_LOCAL_BALANCE_CATEGORIES }),
  cduNode("PRODUCT-KERO", "Kerosene Product", "Product Pool", "Product Routing", "area-cdu-products", 4690, 1540, 195, 85, inletOnlyPorts(), { balanceType: "productPool", balanceCategories: CDU_LOCAL_BALANCE_CATEGORIES }),
  cduNode("PRODUCT-LGO", "Light Gasoil Product", "Product Pool", "Product Routing", "area-cdu-products", 4690, 1745, 205, 85, inletOnlyPorts(), { balanceType: "productPool", balanceCategories: CDU_LOCAL_BALANCE_CATEGORIES }),
  cduNode("PRODUCT-HGO", "Heavy Gasoil Product", "Product Pool", "Product Routing", "area-cdu-products", 4690, 1950, 210, 85, inletOnlyPorts(), { balanceType: "productPool", balanceCategories: CDU_LOCAL_BALANCE_CATEGORIES }),
  cduNode("PRODUCT-RES-HVU2", "Atmospheric Residue to HVU II", "Product Pool", "Product Routing", "area-cdu-products", 4690, 2160, 250, 85, inletOnlyPorts(), { balanceType: "productPool", balanceCategories: CDU_LOCAL_BALANCE_CATEGORIES }),
  cduNode("PRODUCT-RES-HVU3", "Atmospheric Residue to HVU III", "Product Pool", "Product Routing", "area-cdu-products", 5030, 2160, 260, 85, inletOnlyPorts(), { balanceType: "productPool", balanceCategories: CDU_LOCAL_BALANCE_CATEGORIES }),
  cduNode("WASTE-WATER", "Desalter Water Outlet", "Water Outlet", "Water System", "area-cdu-water", 980, 1620, 210, 85, inletOnlyPorts(), {
    balanceType: "productPool",
    balanceCategories: ["water"],
  }),
];

const REFINERY_OVERVIEW_STREAMS = [
  overviewStream("OV-S001", "Crude Oil Feed", "CRUDE-IN", "out", "ADU-101", "crude", "liquid", "main", { strokeWidth: 2.6, labelMode: "always" }),
  overviewStream("OV-S002", "Atmospheric Bottoms to Vacuum Distillation", "ADU-101", "bottoms", "VDU-101", "bottoms", "liquid", "heavy", { strokeWidth: 2.6, labelMode: "always" }),

  overviewStream("OV-S003", "ADU Gas to Gas Processing", "ADU-101", "gas", "GPU-101", "in", "gas", "gas", { strokeWidth: 1.8 }),
  overviewStream("OV-S004", "Gas Processing to Amine Treating", "GPU-101", "out", "AMINE-101", "in", "gas", "gas", { strokeWidth: 1.8 }),
  overviewStream("OV-S005", "Amine to Refinery Fuel", "AMINE-101", "out", "REFINERY-FUEL-OUT", "in", "gas", "gas", { strokeWidth: 1.8 }),
  overviewStream("OV-S006", "H2S from Amine to Claus", "AMINE-101", "h2s", "CLAUS-101", "h2s", "gas", "sour", { strokeWidth: 1.8 }),
  overviewStream("OV-S007", "Claus Sulfur Product", "CLAUS-101", "sulfur", "SULFUR-OUT", "in", "liquid", "sulfur", { strokeWidth: 1.8 }),
  overviewStream("OV-S008", "Gas Processing to LPG Merox", "GPU-101", "lpg", "MEROX-LPG", "in", "liquid", "product", { strokeWidth: 2 }),
  overviewStream("OV-S009", "LPG Merox to LPG Product", "MEROX-LPG", "out", "LPG-OUT", "in", "liquid", "product", { strokeWidth: 2 }),

  overviewStream("OV-S010", "Light Naphtha to Hydrotreater", "ADU-101", "lightNaphtha", "NHT-LN-101", "in", "liquid", "product", { strokeWidth: 2 }),
  overviewStream("OV-S011", "Light Naphtha Hydrotreater to Isomerization", "NHT-LN-101", "out", "ISOM-101", "in", "liquid", "product", { strokeWidth: 2 }),
  overviewStream("OV-S012", "Isomerate to Gasoline Blending Pool", "ISOM-101", "out", "GASOLINE-BLEND", "isomerate", "liquid", "product", { strokeWidth: 2 }),
  overviewStream("OV-S013", "Heavy Naphtha to Hydrotreater", "ADU-101", "heavyNaphtha", "NHT-HN-101", "in", "liquid", "product", { strokeWidth: 2 }),
  overviewStream("OV-S014", "Heavy Naphtha Hydrotreater to Reformer", "NHT-HN-101", "out", "REFORMER-101", "in", "liquid", "product", { strokeWidth: 2 }),
  overviewStream("OV-S015", "Reformate to Gasoline Blending Pool", "REFORMER-101", "out", "GASOLINE-BLEND", "reformate", "liquid", "product", { strokeWidth: 2 }),
  overviewStream("OV-S016", "Gasoline Product", "GASOLINE-BLEND", "gasoline", "GASOLINE-OUT", "in", "liquid", "product", { strokeWidth: 2.4, labelMode: "always" }),

  overviewStream("OV-S017", "Kerosene to Merox", "ADU-101", "kerosene", "MEROX-KERO", "in", "liquid", "product", { strokeWidth: 2 }),
  overviewStream("OV-S018", "Merox Kerosene to Jet Fuel Product", "MEROX-KERO", "out", "JETFUEL-OUT", "in", "liquid", "product", { strokeWidth: 2 }),
  overviewStream("OV-S019", "Diesel to Hydrotreater", "ADU-101", "diesel", "DHT-101", "in", "liquid", "product", { strokeWidth: 2 }),
  overviewStream("OV-S020", "Diesel Hydrotreater to Diesel Product", "DHT-101", "out", "DIESEL-OUT", "in", "liquid", "product", { strokeWidth: 2 }),

  overviewStream("OV-S021", "Atmospheric Gas Oil to FCC Feed Hydrotreater", "ADU-101", "atmosphericGasOil", "FCC-FEED-HTR", "in", "liquid", "heavy", { strokeWidth: 2.6 }),
  overviewStream("OV-S022", "Light VGO to Hydrocracker", "VDU-101", "lightVGO", "HCU-101", "in", "liquid", "heavy", { strokeWidth: 2.6, labelMode: "always" }),
  overviewStream("OV-S023", "Hydrocracker Gasoline to Gasoline Blending Pool", "HCU-101", "gasoline", "GASOLINE-BLEND", "hydrocrackedGasoline", "liquid", "product", { strokeWidth: 2 }),
  overviewStream("OV-S024", "Hydrocracker Diesel to Diesel Product", "HCU-101", "diesel", "DIESEL-OUT", "in", "liquid", "product", { strokeWidth: 2 }),
  overviewStream("OV-S025", "Heavy VGO to FCC Feed Hydrotreater", "VDU-101", "heavyVGO", "FCC-FEED-HTR", "in", "liquid", "heavy", { strokeWidth: 2.6, labelMode: "always" }),
  overviewStream("OV-S026", "FCC Feed Hydrotreater to RFCC", "FCC-FEED-HTR", "out", "RFCC-101", "in", "liquid", "heavy", { strokeWidth: 2.6 }),
  overviewStream("OV-S027", "RFCC Naphtha / FCC Gasoline to Gasoline Blending Pool", "RFCC-101", "gasoline", "GASOLINE-BLEND", "fccGasoline", "liquid", "product", { strokeWidth: 2, labelMode: "always" }),
  overviewStream("OV-S028", "RFCC Gas Oil to Fuel Oil", "RFCC-101", "gasOil", "FUEL-OIL-OUT", "in", "liquid", "heavy", { strokeWidth: 2.6 }),
  overviewStream("OV-S029", "RFCC LPG/Olefins to Alkylation", "RFCC-101", "lpgOlefins", "ALKYLATION-101", "in", "liquid", "product", { strokeWidth: 2 }),
  overviewStream("OV-S030", "Alkylate to Gasoline Blending Pool", "ALKYLATION-101", "out", "GASOLINE-BLEND", "alkylate", "liquid", "product", { strokeWidth: 2 }),

  overviewStream("OV-S031", "Vacuum Residuum to Delayed Coker", "VDU-101", "residuum", "DCU-101", "in", "liquid", "heavy", { strokeWidth: 2.6, labelMode: "always", points: [{ x: 640, y: 2670 }, { x: 1040, y: 2670 }] }),
  overviewStream("OV-S032", "Delayed Coker Naphtha to Gasoline Blending Pool", "DCU-101", "naphtha", "GASOLINE-BLEND", "cokerNaphtha", "liquid", "product", { strokeWidth: 2 }),
  overviewStream("OV-S033", "Delayed Coker Gas Oil to FCC Feed Hydrotreater", "DCU-101", "gasOil", "FCC-FEED-HTR", "in", "liquid", "heavy", { strokeWidth: 2.6 }),
  overviewStream("OV-S034", "Petroleum Coke Product", "DCU-101", "coke", "PETCOKE-OUT", "in", "solid", "product", { strokeWidth: 2 }),
  overviewStream("OV-S035", "Vacuum Residuum to Asphalt Blowing", "VDU-101", "residuum", "ASPHALT-101", "in", "liquid", "heavy", { strokeWidth: 2.6, points: [{ x: 640, y: 2790 }, { x: 600, y: 2790 }] }),
  overviewStream("OV-S036", "Asphalt Product", "ASPHALT-101", "out", "ASPHALT-OUT", "in", "liquid", "product", { strokeWidth: 2 }),

  overviewStream("OV-S037", "Hydrogen to Light Naphtha Hydrotreater", "H2-PLANT", "h2", "NHT-LN-101", "h2", "gas", "hydrogen", { strokeWidth: 1.8, points: [{ x: 3425, y: 2720 }, { x: 1460, y: 2720 }, { x: 1460, y: 620 }] }),
  overviewStream("OV-S038", "Hydrogen to Heavy Naphtha Hydrotreater", "H2-PLANT", "h2", "NHT-HN-101", "h2", "gas", "hydrogen", { strokeWidth: 1.8, points: [{ x: 3445, y: 2640 }, { x: 1480, y: 2640 }, { x: 1480, y: 860 }] }),
  overviewStream("OV-S039", "Hydrogen to Diesel Hydrotreater", "H2-PLANT", "h2", "DHT-101", "h2", "gas", "hydrogen", { strokeWidth: 1.8, points: [{ x: 3465, y: 2660 }, { x: 1500, y: 2660 }, { x: 1500, y: 1440 }] }),
  overviewStream("OV-S040", "Hydrogen to Hydrocracker", "H2-PLANT", "h2", "HCU-101", "h2", "gas", "hydrogen", { strokeWidth: 1.8, points: [{ x: 3485, y: 2680 }, { x: 2140, y: 2680 }, { x: 2140, y: 1840 }] }),
  overviewStream("OV-S041", "Hydrogen to FCC Feed Hydrotreater", "H2-PLANT", "h2", "FCC-FEED-HTR", "h2", "gas", "hydrogen", { strokeWidth: 1.8, points: [{ x: 3505, y: 2700 }, { x: 1520, y: 2700 }, { x: 1520, y: 2140 }] }),

  overviewStream("OV-S042", "Sour Waters to Sour Water Stripper", "SOUR-WATER-IN", "out", "SWS-101", "sourWater", "water", "sour", { strokeWidth: 1.8 }),
  overviewStream("OV-S043", "SWS H2S to Sulfur Connector", "SWS-101", "h2s", "H2S-TO-SULFUR", "in", "gas", "sour", { strokeWidth: 1.8 }),
  overviewStream("OV-S044", "H2S to Claus Sulfur Plant", "H2S-TO-SULFUR", "out", "CLAUS-101", "h2s", "gas", "sour", { strokeWidth: 1.8, points: [{ x: 3868, y: 2660 }, { x: 2380, y: 2660 }, { x: 2380, y: 240 }] }),
  overviewStream("OV-S045", "Stripped Water Outlet", "SWS-101", "strippedWater", "STRIPPED-WATER-OUT", "in", "water", "product", { strokeWidth: 1.8 }),
];

const CDU_DETAIL_STREAMS = [
  cduStream("S-CDU-001", "Crude Feed", "CRUDE-SOURCE", "out", "CDU-P-101", "in", { flowrate: 400, strokeWidth: 3, labelMode: "always" }),
  cduStream("S-CDU-002", "Crude to Cold Preheat", "CDU-P-101", "out", "CDU-E-101", "in", { flowrate: 400, strokeWidth: 2.8, labelMode: "always" }),
  cduStream("S-CDU-003", "Preheated Crude to Desalter", "CDU-E-101", "out", "CDU-D-101", "crude", { flowrate: 400, strokeWidth: 2.8 }),
  cduStream("S-CDU-004", "Desalter Water", "CDU-D-101", "water", "WASTE-WATER", "in", { flowrate: 2, phase: "water", category: "utility", balanceCategory: "water", strokeWidth: 1.8 }),
  cduStream("S-CDU-005", "Desalted Crude", "CDU-D-101", "desalted", "CDU-E-102", "in", { flowrate: 400, strokeWidth: 2.8 }),
  cduStream("S-CDU-006", "Hot Preheated Crude", "CDU-E-102", "out", "CDU-H-101", "feed", { flowrate: 400, strokeWidth: 2.8 }),
  cduStream("S-CDU-007", "Furnace Outlet", "CDU-H-101", "outlet", "CDU-C-101", "feed", { flowrate: 400, phase: "mixed", strokeWidth: 3, labelMode: "always" }),
  cduStream("S-CDU-008", "Overhead Vapor", "CDU-C-101", "overhead", "CDU-V-102", "overhead", { flowrate: 84, phase: "mixed", category: "gas", strokeWidth: 2.2, isCalculated: true }),
  cduStream("S-CDU-009", "Overhead Gas to Suction Drum", "CDU-V-102", "gas", "CDU-V-103", "in", { flowrate: 4, phase: "gas", category: "gas", strokeWidth: 2, isCalculated: true }),
  cduStream("S-CDU-010", "Gas to Compressor", "CDU-V-103", "out", "CDU-K-101", "in", { flowrate: 4, phase: "gas", category: "gas", strokeWidth: 2, isCalculated: true }),
  cduStream("S-CDU-011", "Off Gas", "CDU-K-101", "out", "PRODUCT-OFFGAS", "in", { flowrate: 4, phase: "gas", category: "gas", strokeWidth: 2, isCalculated: true, isFinalProduct: true, splitKey: "offGas", splitSource: "CDU-C-101", labelMode: "always" }),
  cduStream("S-CDU-012", "Stabilizer Feed", "CDU-V-102", "liquid", "CDU-V-104", "in", { flowrate: 80, category: "product", strokeWidth: 2.2, isCalculated: true }),
  cduStream("S-CDU-013", "Stabilizer Feed to Column", "CDU-V-104", "out", "CDU-C-102", "feed", { flowrate: 80, category: "product", strokeWidth: 2.2, isCalculated: true }),
  cduStream("S-CDU-014", "Stabilizer Overhead", "CDU-C-102", "overhead", "CDU-V-105", "in", { flowrate: 4, phase: "gas", category: "gas", balanceCategory: "other", strokeWidth: 1.8, isCalculated: true }),
  cduStream("S-CDU-015", "Stabilized Naphtha", "CDU-C-102", "naphtha", "CDU-C-103", "feed", { flowrate: 80, category: "product", strokeWidth: 2.2, isCalculated: true }),
  cduStream("S-CDU-016", "Light Naphtha", "CDU-C-103", "light", "PRODUCT-LN", "in", { flowrate: 32, category: "product", isCalculated: true, isFinalProduct: true, splitKey: "lightNaphtha", splitSource: "CDU-C-101", labelMode: "always" }),
  cduStream("S-CDU-017", "Heavy Naphtha", "CDU-C-103", "heavy", "PRODUCT-HN", "in", { flowrate: 48, category: "product", isCalculated: true, isFinalProduct: true, splitKey: "heavyNaphtha", splitSource: "CDU-C-101", labelMode: "always" }),
  cduStream("S-CDU-018", "Kerosene Draw", "CDU-C-101", "kerosene", "CDU-C-104", "in", { flowrate: 52, category: "product", isCalculated: true }),
  cduStream("S-CDU-019", "Kerosene Product", "CDU-C-104", "out", "PRODUCT-KERO", "in", { flowrate: 52, category: "product", isCalculated: true, isFinalProduct: true, splitKey: "kerosene", splitSource: "CDU-C-101", labelMode: "always" }),
  cduStream("S-CDU-020", "LGO Draw", "CDU-C-101", "lgo", "CDU-C-105", "in", { flowrate: 72, category: "product", isCalculated: true }),
  cduStream("S-CDU-021", "Light Gasoil Product", "CDU-C-105", "out", "PRODUCT-LGO", "in", { flowrate: 72, category: "product", isCalculated: true, isFinalProduct: true, splitKey: "lightGasoil", splitSource: "CDU-C-101", labelMode: "always" }),
  cduStream("S-CDU-022", "HGO Draw", "CDU-C-101", "hgo", "CDU-C-106", "in", { flowrate: 68, category: "heavy", isCalculated: true }),
  cduStream("S-CDU-023", "Heavy Gasoil Product", "CDU-C-106", "out", "PRODUCT-HGO", "in", { flowrate: 68, category: "heavy", isCalculated: true, isFinalProduct: true, splitKey: "heavyGasoil", splitSource: "CDU-C-101", labelMode: "always" }),
  cduStream("S-CDU-024", "Atmospheric Residue to HVU II", "CDU-C-101", "residue2", "PRODUCT-RES-HVU2", "in", { flowrate: 64, category: "heavy", strokeWidth: 2.8, isCalculated: true, isFinalProduct: true, splitKey: "residueHVU2", splitSource: "CDU-C-101", labelMode: "always" }),
  cduStream("S-CDU-025", "Atmospheric Residue to HVU III", "CDU-C-101", "residue3", "PRODUCT-RES-HVU3", "in", { flowrate: 60, category: "heavy", strokeWidth: 2.8, isCalculated: true, isFinalProduct: true, splitKey: "residueHVU3", splitSource: "CDU-C-101", labelMode: "always" }),
];

const NODE_SIZE_PRESETS = {
  small: { width: 120, height: 70, label: "Small" },
  medium: { width: 180, height: 95, label: "Medium" },
  large: { width: 240, height: 120, label: "Large" },
};
const STREAM_CONFIG_VERSION = 2;
const PFD_DATA_VERSION = "cdu-mass-balance-default-v1";
const STREAM_NODE_MARGIN = 24;
const STREAM_PORT_STUB = 48;

function createDefaultCduConfig() {
  return deepClone({
    version: 4,
    dataVersion: PFD_DATA_VERSION,
    streamVersion: STREAM_CONFIG_VERSION,
    userModified: false,
    updatedAt: new Date().toISOString(),
    canvas: { width: 6000, height: 3600 },
    areas: CDU_DETAIL_AREAS,
    nodes: CDU_DETAIL_NODES,
    streams: CDU_DETAIL_STREAMS,
    pidSymbols: [],
    pidConnectors: [],
    cduRunState: DEFAULT_CDU_RUN_STATE,
    cduBaseCapacity: CDU_BASE_CAPACITY,
    cduFlowSource: CDU_FLOW_SOURCE,
    viewOptions: {
      showNodeBalance: true,
      showPortFlow: true,
      portFlowMode: "full",
      portValueDisplay: "both",
      portInfoLayout: "auto",
      portInfoScale: 1,
      cduTablesVisible: true,
      cduTablesCollapsed: false,
      cduFloatingTableSize: "medium",
      cduFloatingTablePosition: CDU_FLOATING_TABLE_DEFAULT_POSITION,
      cduAutoHideTableInPresentation: true,
    },
  });
}

Object.assign(SAMPLE_CONFIG, createDefaultCduConfig());
const DEFAULT_CONFIG = createDefaultCduConfig();

const state = {
  zoom: 1,
  panX: 0,
  panY: 0,
  isPanning: false,
  panStart: null,
  selectedNodeId: "",
  selectedNode: "",
  selectedNodeTags: new Set(),
  massBalanceResults: new Map(),
  massBalanceConstraintGroups: [],
  massBalanceTargetResult: null,
  massBalanceRuntime: null,
  targetSolver: null,
  cduRunState: deepClone(DEFAULT_CDU_RUN_STATE),
  cduBaseCapacity: deepClone(CDU_BASE_CAPACITY),
  cduFlowSource: deepClone(CDU_FLOW_SOURCE),
  cduConnectivityGraph: null,
  cduReachableNodeIds: new Set(),
  cduPropagatedProductFlows: {},
  cduProductMassBalanceTable: [],
  cduFeedMassBalanceTable: [],
  quickConstraintStreamId: "",
  quickConstraintPopover: null,
  showNodeBalance: true,
  showPortFlow: true,
  portFlowMode: "full",
  portValueDisplay: "both",
  portInfoLayout: "auto",
  portInfoScale: 1,
  activeNodeContext: {
    nodeId: null,
    mode: "context",
  },
  cduTablesVisible: true,
  cduTablesCollapsed: false,
  cduFloatingTableSize: "medium",
  cduFloatingTablePosition: deepClone(CDU_FLOATING_TABLE_DEFAULT_POSITION),
  cduAutoHideTableInPresentation: true,
  draggingSelection: null,
  searchResults: [],
  searchIndex: -1,
  adminTriggerClicks: [],
  adminTypedSequence: "",
  activeAdminTab: "area",
  activeAreaId: "area-cdu-fractionation",
  activeNodeTag: "CDU-C-101",
  activeStreamId: "S-CDU-001",
  selectedStream: "S-CDU-001",
  currentScope: "refinery",
  currentUnit: "",
  currentSection: "",
  simplifiedView: true,
  themeMode: "light",
  streamLabelModeGlobal: "hover",
  portLabelModeGlobal: "important",
  nodeFontScaleGlobal: 1,
  nodeIconScaleGlobal: 1,
  portLabelFontSize: 10,
  portLabelFontScale: 1,
  portLabelColor: "",
  portLabelWeight: "700",
  gridVisible: true,
  snapToGrid: false,
  gridSize: 20,
  straightAlignTolerance: 8,
  layers: { ...VIEW_LAYER_DEFAULTS },
  selectStreamOnHover: false,
  streamBridges: true,
  preferPolylinePfd: true,
  autoStraightAlignedStreams: true,
  canvasFirstEdit: true,
  autoHideDetailInEditMode: true,
  autoCollapseAdminInEditMode: true,
  adminCollapsed: false,
  hoveredStreamId: "",
  streamHoverTimer: 0,
  copiedNodeTemplate: null,
  pasteOffsetCount: 0,
  collapsedSections: {},
  streamEditMode: false,
  streamAddPointMode: false,
  streamCreateMode: null,
  streamCreateFrom: "",
  portConnectionDrag: null,
  portConnectionCandidate: null,
  streamEndpointPickMode: "",
  selectedStreamPointIndex: -1,
  draggedStreamPoint: null,
  streamReconnectDrag: null,
  streamReconnectCandidateTag: "",
  routePointWasAdjusted: false,
  activePidTool: "",
  selectedPidSymbolId: "",
  copiedPidSymbolTemplate: null,
  pidPasteOffsetCount: 0,
  draggingPidSymbol: null,
  resizingPidSymbol: null,
  pidPaletteSearch: "",
  pidLayers: {
    symbols: true,
    connectors: true,
    equipment: true,
    valves: true,
    instruments: true,
  },
  activePresentationAreaId: "ALL",
  presentationNodeIndex: 0,
  presentationOverlayNodeId: "",
  presentationOverlayExpanded: false,
  presentationOverlayTimer: 0,
  saveIndicatorTimer: 0,
  deploymentStatus: "Autosaved locally",
  deploymentStatusType: "local",
  startupModeActive: false,
  startup: {
    data: null,
    steps: [],
    totalSteps: 0,
    message: "Startup simulation data belum tersedia.",
  },
  startupSimulationData: null,
  startupSession: null,
  startupDataError: "",
  startupPanelState: { ...STARTUP_PANEL_DEFAULT_STATE },
  draggingStartupPanel: null,
  pendingImportConfig: null,
  userModified: false,
  undoStack: [],
  redoStack: [],
  historySnapshot: null,
  isRestoringHistory: false,
  // Fitur Baru
  isEditMode: false,
  isInteracting: false,
  viewRaf: 0,
  zoomAnimationFrame: 0,
  draggedNodeId: null,
  suppressNodeClickUntil: 0,
  resizingNode: null,
  touchDistance: 0,
};

const els = {};
const nodeById = new Map();
const nodeByTag = new Map();

document.addEventListener("DOMContentLoaded", () => {
  const startupTimeout = window.setTimeout(() => {
    console.warn("Loading timeout fallback triggered");
    hideLoading();
  }, STARTUP_TIMEOUT_MS);

  bootstrapApp()
    .catch(handleFatalStartupError)
    .finally(() => {
      window.clearTimeout(startupTimeout);
      hideLoading();
    })
    .catch((error) => {
      console.error("RefineryMap startup recovery failed:", error);
      hideLoading();
    });
});

async function bootstrapApp() {
  showLoading("Loading RefineryMap...");
  cacheElementsSafely();
  assertRequiredDomElements();
  injectAiAnalyzeButton();
  hideMinimap();
  loadSettingsSafely();
  await loadDataSafely();
  normalizeDataSafely();
  indexDataSafely();
  initializeHistorySnapshot();
  bindEventsSafely();
  await initStartupSimulatorSafely();
  initAdminSafely();
  renderAllSafely();
  populateAdminFormsSafely();
  updateToolbarSafely();
  handleLogoFallbackSafely();

  await waitForNextFrame();
  fitAllSafely();
  selectInitialNodeSafely();
  restorePresentationModeSafely();
  if (SAFE_MODE) showToast("Safe Mode aktif: memakai sample data default.", "warning");
}

function buildAiBalanceSnapshot() {
  const runState = normalizeCduRunState(state.cduRunState);
  const assay = CDU_CRUDE_ASSAYS[runState.selectedCrudeType] || CDU_CRUDE_ASSAYS.medium;
  const overallResult = getMassBalanceResult(getCduOverallNode());
  const runtime = state.massBalanceRuntime;

  const unbalancedNodes = NODES
    .map((node) => {
      const result = getMassBalanceResult(node) || node.balanceResult || node.localBalanceResult;
      const status = result?.status || node.balanceStatus || null;
      if (!status || status === "balanced") return null;
      return {
        node: node.tag || node.id,
        name: node.name || "",
        status,
        inputM3H: normalizeNullableNumber(result?.totalInputM3H ?? result?.totalInput),
        outputM3H: normalizeNullableNumber(result?.totalOutputM3H ?? result?.totalOutput),
        differenceM3H: normalizeNullableNumber(result?.differenceM3H ?? result?.difference),
        errorPercent: normalizeNullableNumber(result?.errorPercent),
        tolerancePercent: normalizeNullableNumber(result?.tolerancePercent),
        missingStreams: [...new Set([
          ...(Array.isArray(result?.missingInputStreams) ? result.missingInputStreams : []),
          ...(Array.isArray(result?.missingOutputStreams) ? result.missingOutputStreams : []),
        ])],
      };
    })
    .filter(Boolean);

  const relevantStreams = getActiveStreams()
    .filter((stream) => {
      const hasConstraint = [stream.flowTarget, stream.flowMin, stream.flowMax, stream.lockedFlow]
        .some((value) => normalizeNullableNumber(value) !== null)
        || Boolean(stream.useAsCalculationTarget);
      const runtimeTargetStatus = stream.runtimeTargetResult?.status;
      return hasConstraint || (runtimeTargetStatus && runtimeTargetStatus !== "target-ok");
    })
    .map((stream) => ({
      stream: stream.id,
      label: stream.label || stream.name || "",
      from: stream.from || "",
      to: stream.to || "",
      flowM3H: normalizeNullableNumber(getFinalRuntimeStreamFlowM3H(stream, runtime)),
      flowMBSD: normalizeNullableNumber(getFinalRuntimeStreamFlowMBSD(stream, runtime)),
      flowMin: normalizeNullableNumber(stream.flowMin),
      flowTarget: normalizeNullableNumber(stream.flowTarget),
      flowMax: normalizeNullableNumber(stream.flowMax),
      lockedFlow: normalizeNullableNumber(stream.lockedFlow),
      useAsCalculationTarget: Boolean(stream.useAsCalculationTarget),
      runtimeTargetStatus: stream.runtimeTargetResult?.status || null,
      runtimeTargetMessage: stream.runtimeTargetResult?.message || "",
    }));

  return {
    snapshotVersion: 1,
    generatedAt: new Date().toISOString(),
    crude: {
      type: runState.selectedCrudeType,
      name: assay.name,
      sg: normalizeNullableNumber(runState.crudeSG),
    },
    intake: {
      m3h: normalizeNullableNumber(runState.crudeIntakeM3H),
      mbsd: normalizeNullableNumber(runState.crudeIntakeMBSD),
    },
    cduStatus: runState.hasStarted ? (overallResult?.status || "incomplete") : "notStarted",
    unbalancedNodes,
    relevantStreams,
  };
}

async function analyzeBalanceWithAi() {
  const button = document.getElementById("aiAnalyzeBalanceButton");
  if (button?.disabled) return;

  if (button) {
    button.disabled = true;
    button.classList.add("is-loading");
    button.setAttribute("aria-busy", "true");
    button.setAttribute("aria-label", "AI is analyzing the mass balance");
    button.dataset.tooltip = "Analyzing…";
  }

  renderAiBalancePanel({
    status: "ok",
    summary: "Mengirim snapshot mass balance ke Google Gemini...",
    rootCauses: [],
    recommendations: [],
    safeToAutoApply: false,
    isLoading: true,
  });

  try {
    const snapshot = buildAiBalanceSnapshot();
    const response = await fetch(
      "/api/ai/analyze-balance",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(snapshot),
      }
    );

    let data;

    try {
      data = await response.json();
    } catch {
      throw new Error(
        `AI Analyze HTTP ${response.status}: respons backend bukan JSON.`
      );
    }

    if (!response.ok || data?.ok !== true) {
      throw new Error(
        data?.error ||
          `AI Analyze HTTP ${response.status}`
      );
    }

    renderAiBalancePanel(data.result);
  } catch (error) {
    console.error(
      "AI Analyze failed:",
      error
    );

    renderAiBalancePanel({
      status: "error",
      summary:
        error?.message ||
        "AI Analyze gagal.",
      rootCauses: [],
      recommendations: [],
      safeToAutoApply: false,
    });
  } finally {
    if (button) {
      button.disabled = false;
      button.classList.remove("is-loading");
      button.removeAttribute("aria-busy");
      button.setAttribute("aria-label", "Analyze mass balance with AI");
      button.dataset.tooltip = "AI Analyze";
    }
  }
}

function renderAiBalancePanel(result = {}) {
  const panel = document.getElementById("aiBalanceAssistantPanel");
  if (!panel) return;

  const allowedStatuses = new Set(["ok", "warning", "error"]);
  const status = allowedStatuses.has(result.status) ? result.status : "error";
  const statusElement = panel.querySelector("[data-ai-status]");
  const summaryElement = panel.querySelector("[data-ai-summary]");
  const rootCauseList = panel.querySelector("[data-ai-root-causes]");
  const recommendationList = panel.querySelector("[data-ai-recommendations]");

  statusElement.textContent = result.isLoading ? "Analyzing" : status;
  statusElement.dataset.status = status;
  summaryElement.textContent = typeof result.summary === "string" ? result.summary : "Tidak ada ringkasan dari AI.";

  rootCauseList.replaceChildren();
  const rootCauses = Array.isArray(result.rootCauses) ? result.rootCauses : [];
  if (!rootCauses.length) {
    const item = document.createElement("li");
    item.className = "ai-balance-empty";
    item.textContent = result.isLoading ? "Menunggu hasil analisis..." : "Tidak ada root cause yang dilaporkan.";
    rootCauseList.appendChild(item);
  } else {
    rootCauses.forEach((cause) => {
      const item = document.createElement("li");
      item.dataset.severity = ["info", "warning", "error"].includes(cause?.severity) ? cause.severity : "info";
      const target = [cause?.node, cause?.stream].filter(Boolean).join(" / ") || "General";
      const strong = document.createElement("strong");
      strong.textContent = target;
      const message = document.createElement("span");
      message.textContent = cause?.issue || "Issue tidak dijelaskan.";
      item.append(strong, message);
      rootCauseList.appendChild(item);
    });
  }

  recommendationList.replaceChildren();
  const recommendations = Array.isArray(result.recommendations) ? result.recommendations : [];
  if (!recommendations.length) {
    const item = document.createElement("li");
    item.className = "ai-balance-empty";
    item.textContent = result.isLoading ? "Menunggu rekomendasi..." : "Tidak ada rekomendasi tambahan.";
    recommendationList.appendChild(item);
  } else {
    recommendations.forEach((recommendation) => {
      const item = document.createElement("li");
      const strong = document.createElement("strong");
      strong.textContent = recommendation?.target || recommendation?.action || "Review";
      const message = document.createElement("span");
      message.textContent = recommendation?.message || "Review kondisi mass balance secara manual.";
      item.append(strong, message);
      recommendationList.appendChild(item);
    });
  }

  panel.classList.remove("is-hidden");
  panel.setAttribute("aria-hidden", "false");
}

function injectAiAnalyzeButton() {
  const runPanel = document.getElementById("cduRunPanel");
  if (!runPanel) return;

  let button = document.getElementById("aiAnalyzeBalanceButton");
  if (!button) {
    button = document.createElement("button");
    button.id = "aiAnalyzeBalanceButton";
    button.className = "icon-action-btn ai-analyze-button";
    button.type = "button";
    button.title = "AI Analyze (read-only)";
    button.dataset.tooltip = "AI Analyze";
    button.setAttribute("aria-label", "Analyze mass balance with AI");
    button.innerHTML = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="m12 3 1.35 4.15L17.5 8.5l-4.15 1.35L12 14l-1.35-4.15L6.5 8.5l4.15-1.35L12 3Z"></path></svg><span class="sr-only">AI Analyze</span>';
    const primaryActions = runPanel.querySelector(".primary-action-group");
    (primaryActions || runPanel).appendChild(button);
  }
  if (button.dataset.aiAnalyzeBound !== "true") {
    button.addEventListener("click", analyzeBalanceWithAi);
    button.dataset.aiAnalyzeBound = "true";
  }

  if (document.getElementById("aiBalanceAssistantPanel")) return;

  const panel = document.createElement("aside");
  panel.id = "aiBalanceAssistantPanel";
  panel.className = "ai-balance-panel is-hidden";
  panel.setAttribute("aria-label", "AI Balance Assistant");
  panel.setAttribute("aria-live", "polite");
  panel.setAttribute("aria-hidden", "true");
  panel.innerHTML = `
    <div class="ai-balance-header">
      <div>
        <span class="ai-balance-kicker">Read-only analysis</span>
        <h2>AI Balance Assistant</h2>
      </div>
      <button class="ai-balance-close" type="button" aria-label="Close AI Balance Assistant">&times;</button>
    </div>
    <div class="ai-balance-status-row">
      <span>Status</span>
      <strong class="ai-balance-status" data-ai-status data-status="ok">Ready</strong>
    </div>
    <p class="ai-balance-summary" data-ai-summary>Click AI Analyze to inspect the current mass balance snapshot.</p>
    <section>
      <h3>Root causes</h3>
      <ul class="ai-balance-list" data-ai-root-causes></ul>
    </section>
    <section>
      <h3>Recommendations</h3>
      <ul class="ai-balance-list" data-ai-recommendations></ul>
    </section>
    <p class="ai-balance-safety">AI tidak dapat mengubah flow, stream, node, constraint, atau mass balance.</p>`;
  panel.querySelector(".ai-balance-close").addEventListener("click", () => {
    panel.classList.add("is-hidden");
    panel.setAttribute("aria-hidden", "true");
  });
  document.body.appendChild(panel);
}

function waitForNextFrame() {
  return new Promise((resolve) => requestAnimationFrame(resolve));
}

function cacheElementsSafely() {
  try {
    cacheElements();
  } catch (error) {
    console.error("cacheElements failed:", error);
    throw error;
  }
}

function assertRequiredDomElements() {
  const required = ["canvasViewport", "canvasStage", "streamLayer", "areaLayer", "pidSymbolLayer", "nodeLayer"];
  const missing = required.filter((id) => !document.getElementById(id));
  if (missing.length) {
    throw new Error(`Missing required DOM elements: ${missing.join(", ")}`);
  }
}

function loadSettingsSafely() {
  try {
    loadStartupPanelState();
    loadViewPreferences();
    if (SAFE_MODE) {
      state.streamBridges = false;
      state.selectStreamOnHover = false;
    }
    state.preferPolylinePfd = true;
    state.streamLabelModeGlobal = "hover";
    state.portLabelModeGlobal = "important";
    applyViewPreferences({ silent: true });
  } catch (error) {
    console.error("loadSettings failed:", error);
    state.themeMode = "light";
    state.streamBridges = false;
    state.selectStreamOnHover = false;
    applyViewPreferences({ silent: true });
  }
}

async function loadDataSafely() {
  try {
    if (SAFE_MODE) {
      loadDefaultPfdConfig("", "Safe Mode");
      return;
    }
    await loadStoredConfig();
  } catch (error) {
    console.error("loadData failed:", error);
    backupCorruptLocalStorage(safeLocalStorageGet(ADMIN_STORAGE_KEY), "loadData-exception");
    hydrateFallbackConfig("Data startup gagal dimuat. Memakai sample data default.");
  }
}

function normalizeDataSafely() {
  try {
    normalizeData();
  } catch (error) {
    console.error("normalizeData failed:", error);
    hydrateFallbackConfig("Normalisasi data gagal. Memakai sample data default.");
    try {
      normalizeData();
    } catch (fallbackError) {
      console.error("fallback normalizeData failed:", fallbackError);
      throw fallbackError;
    }
  }
}

function indexDataSafely() {
  try {
    indexData();
  } catch (error) {
    console.error("indexData failed:", error);
    throw error;
  }
}

function bindEventsSafely() {
  try {
    bindEvents();
  } catch (error) {
    console.error("bindEvents failed:", error);
    showToast("Sebagian kontrol tidak aktif karena bind event gagal.", "error");
  }
}

async function initStartupSimulatorSafely() {
  try {
    await initStartupSimulator();
  } catch (error) {
    console.warn("Startup simulator init failed:", error);
    setStartupSimulatorUnavailable(`Startup simulation data belum tersedia. Pastikan file data/startup-cdu-v-simulation.json ada dan valid. (${error?.message || error})`);
  }
}

function initAdminSafely() {
  try {
    initAdmin();
  } catch (error) {
    console.error("initAdmin failed:", error);
  }
}

function renderAllSafely() {
  try {
    renderCanvas();
    updateCduRunControls();
  } catch (error) {
    console.error("renderAll failed:", error);
    showToast("Render error. Sebagian item mungkin disembunyikan.", "error");
    renderStartupFallbackCanvas(error);
  }
}

function populateAdminFormsSafely() {
  try {
    renderAdminPanel();
  } catch (error) {
    console.warn("populateAdminForms failed:", error);
  }
}

function updateToolbarSafely() {
  try {
    applyViewPreferences({ silent: true });
    updateViewStatus();
    updateCduRunControls();
    renderConfigSummary();
  } catch (error) {
    console.warn("updateToolbar failed:", error);
  }
}

function fitAllSafely() {
  try {
    fitAll();
  } catch (error) {
    console.warn("fitAll failed:", error);
  }
}

function selectInitialNodeSafely() {
  try {
    const initial = NODES.find((node) => node.tag === "CDU-C-101") || NODES[0];
    selectNode(initial?.id, { focus: false, openDetail: false });
    renderPresentationAreaOptions();
  } catch (error) {
    console.warn("initial selection failed:", error);
  }
}

function restorePresentationModeSafely() {
  try {
    if (sessionStorage.getItem(PRESENTATION_SESSION_KEY) === "true") {
      setPresentationMode(true, { silent: true });
    }
  } catch (error) {
    console.warn("restore presentation mode failed:", error);
  }
}

function handleLogoFallbackSafely() {
  try {
    handleLogoFallback();
  } catch (error) {
    console.warn("logo fallback failed:", error);
  }
}

function handleFatalStartupError(error) {
  console.error("RefineryMap startup failed:", error);
  try {
    hydrateFallbackConfig("Startup gagal. Memakai sample data default.");
    normalizeDataSafely();
    indexDataSafely();
    renderAllSafely();
    populateAdminFormsSafely();
  } catch (fallbackError) {
    console.error("Fallback render failed:", fallbackError);
    showStartupErrorPanel(error, fallbackError);
  } finally {
    hideLoading();
  }
}

function cacheElements() {
  els.brandLogo = document.getElementById("brandLogo");
  els.canvasViewport = document.getElementById("canvasViewport");
  els.canvasStage = document.getElementById("canvasStage");
  els.areaLayer = document.getElementById("areaLayer");
  els.nodeLayer = document.getElementById("nodeLayer");
  els.streamLayer = document.getElementById("streamLayer");
  els.pidSymbolLayer = document.getElementById("pidSymbolLayer");
  els.streamPointLayer = document.getElementById("streamPointLayer");
  els.zoomIn = document.getElementById("zoomIn");
  els.zoomOut = document.getElementById("zoomOut");
  els.zoomValue = document.getElementById("zoomValue");
  els.fitAll = document.getElementById("fitAll");
  els.resetView = document.getElementById("resetView");
  els.viewOptionsToggle = document.getElementById("viewOptionsToggle");
  els.viewOptionsPopover = document.getElementById("viewOptionsPopover");
  els.showNodeBalanceOption = document.getElementById("showNodeBalanceOption");
  els.showPortFlowOption = document.getElementById("showPortFlowOption");
  els.portFlowModeSelect = document.getElementById("portFlowModeSelect");
  els.portValueDisplayGlobal = document.getElementById("portValueDisplayGlobal");
  els.portInfoLayoutGlobal = document.getElementById("portInfoLayoutGlobal");
  els.portInfoScaleGlobal = document.getElementById("portInfoScaleGlobal");
  els.themeModeSelect = document.getElementById("themeModeSelect");
  els.themeToggle = document.getElementById("themeToggle");
  els.themePresetControl = document.getElementById("themePresetControl");
  els.themePresetPopover = document.getElementById("themePresetPopover");
  els.themePresetOptions = Array.from(document.querySelectorAll("[data-theme-preset]"));
  els.nodeFontScaleGlobal = document.getElementById("nodeFontScaleGlobal");
  els.nodeIconScaleGlobal = document.getElementById("nodeIconScaleGlobal");
  els.streamLabelModeGlobal = document.getElementById("streamLabelModeGlobal");
  els.portLabelModeGlobal = document.getElementById("portLabelModeGlobal");
  els.portLabelFontSizeGlobal = document.getElementById("portLabelFontSizeGlobal");
  els.portLabelScaleGlobal = document.getElementById("portLabelScaleGlobal");
  els.portLabelWeightGlobal = document.getElementById("portLabelWeightGlobal");
  els.portLabelColorGlobal = document.getElementById("portLabelColorGlobal");
  els.portLabelColorResetGlobal = document.getElementById("portLabelColorResetGlobal");
  els.gridVisibleToggle = document.getElementById("gridVisibleToggle");
  els.snapToGridToggle = document.getElementById("snapToGridToggle");
  els.gridSizeSelect = document.getElementById("gridSizeSelect");
  els.layerToggles = Array.from(document.querySelectorAll("[data-layer-toggle]"));
  els.undoButton = document.getElementById("undoButton");
  els.redoButton = document.getElementById("redoButton");
  els.contextToolbar = document.getElementById("contextToolbar");
  els.selectStreamOnHover = document.getElementById("selectStreamOnHover");
  els.streamBridgesToggle = document.getElementById("streamBridgesToggle");
  els.preferPolylineToggle = document.getElementById("preferPolylineToggle");
  els.autoStraightAlignedToggle = document.getElementById("autoStraightAlignedToggle");
  els.canvasFirstEditToggle = document.getElementById("canvasFirstEditToggle");
  els.autoHideDetailEditToggle = document.getElementById("autoHideDetailEditToggle");
  els.autoCollapseAdminEditToggle = document.getElementById("autoCollapseAdminEditToggle");
  els.pidSymbolsLayerToggle = document.getElementById("pidSymbolsLayerToggle");
  els.pidConnectorsLayerToggle = document.getElementById("pidConnectorsLayerToggle");
  els.simplifiedViewOption = document.getElementById("simplifiedViewOption");
  els.pidPaletteToggle = document.getElementById("pidPaletteToggle");
  els.pidPalette = document.getElementById("pidPalette");
  els.pidPaletteGroups = document.getElementById("pidPaletteGroups");
  els.pidSymbolSearch = document.getElementById("pidSymbolSearch");
  els.pidPinTool = document.getElementById("pidPinTool");
  els.shortcutHelp = document.getElementById("shortcutHelp");
  els.shortcutModal = document.getElementById("shortcutModal");
  els.shortcutClose = document.getElementById("shortcutClose");
  els.presentationToggle = document.getElementById("presentationToggle");
  els.presentationBar = document.getElementById("presentationBar");
  els.presentationAreaSelect = document.getElementById("presentationAreaSelect");
  els.presentationFocusArea = document.getElementById("presentationFocusArea");
  els.presentationPrevNode = document.getElementById("presentationPrevNode");
  els.presentationNextNode = document.getElementById("presentationNextNode");
  els.presentationFocusNode = document.getElementById("presentationFocusNode");
  els.presentationExit = document.getElementById("presentationExit");
  els.presentationInfoOverlay = document.getElementById("presentationInfoOverlay");
  els.presentationOverlayClose = document.getElementById("presentationOverlayClose");
  els.presentationOverlayMore = document.getElementById("presentationOverlayMore");
  els.presentationOverlayKicker = document.getElementById("presentationOverlayKicker");
  els.presentationOverlayName = document.getElementById("presentationOverlayName");
  els.presentationOverlayTag = document.getElementById("presentationOverlayTag");
  els.presentationOverlayDescription = document.getElementById("presentationOverlayDescription");
  els.quickInspector = document.getElementById("quickInspector");
  els.quickInspectorKicker = document.getElementById("quickInspectorKicker");
  els.quickInspectorTitle = document.getElementById("quickInspectorTitle");
  els.quickInspectorMeta = document.getElementById("quickInspectorMeta");
  els.quickInspectorActions = document.getElementById("quickInspectorActions");
  els.quickInspectorClose = document.getElementById("quickInspectorClose");
  els.viewStatus = document.getElementById("viewStatus");
  els.cduCrudeTypeSelect = document.getElementById("cduCrudeTypeSelect");
  els.cduCrudeSGInput = document.getElementById("cduCrudeSGInput");
  els.cduCrudeAPIValue = document.getElementById("cduCrudeAPIValue");
  els.cduCrudeClassificationBadge = document.getElementById("cduCrudeClassificationBadge");
  els.cduBlendToggle = document.getElementById("cduBlendToggle");
  els.cduBlendPanel = document.getElementById("cduBlendPanel");
  els.cduBlendClose = document.getElementById("cduBlendClose");
  els.cduBlendRows = document.getElementById("cduBlendRows");
  els.cduBlendAdd = document.getElementById("cduBlendAdd");
  els.cduBlendApply = document.getElementById("cduBlendApply");
  els.cduBlendSummary = document.getElementById("cduBlendSummary");
  els.cduCrudeIntakeInput = document.getElementById("cduCrudeIntakeInput");
  els.cduIntakeUnitSelect = document.getElementById("cduIntakeUnitSelect");
  els.cduStartBalance = document.getElementById("cduStartBalance");
  els.cduResetCalculation = document.getElementById("cduResetCalculation");
  els.cduRunStatus = document.getElementById("cduRunStatus");
  els.startupModeToggle = document.getElementById("startupModeToggle");
  els.startupPanel = document.getElementById("startupPanel");
  els.startupPanelDragHandle = document.getElementById("startupPanelDragHandle");
  els.startupPanelBody = document.getElementById("startupPanelBody");
  els.startupPanelClose = document.getElementById("startupPanelClose");
  els.startupPanelMinimize = document.getElementById("startupPanelMinimize");
  els.startupPanelResetPosition = document.getElementById("startupPanelResetPosition");
  els.startupPanelSizeButtons = Array.from(document.querySelectorAll("[data-startup-panel-size]"));
  els.startupStatusIndicator = document.getElementById("startupStatusIndicator");
  els.startupSource = document.getElementById("startupSource");
  els.startupTitle = document.getElementById("startupTitle");
  els.startupStatusLine = document.getElementById("startupStatusLine");
  els.startupStart = document.getElementById("startupStart");
  els.startupPause = document.getElementById("startupPause");
  els.startupReset = document.getElementById("startupReset");
  els.startupPrev = document.getElementById("startupPrev");
  els.startupNext = document.getElementById("startupNext");
  els.startupComplete = document.getElementById("startupComplete");
  els.startupNotReady = document.getElementById("startupNotReady");
  els.startupStageTabs = document.getElementById("startupStageTabs");
  els.startupProgress = document.getElementById("startupProgress");
  els.startupEmptyState = document.getElementById("startupEmptyState");
  els.startupStepCard = document.getElementById("startupStepCard");
  els.startupReport = document.getElementById("startupReport");
  els.cduFloatingTables = document.getElementById("cduFloatingTables");
  els.cduFloatingTableDragHandle = document.getElementById("cduFloatingTableDragHandle");
  els.cduFloatingTitle = document.getElementById("cduFloatingTitle");
  els.cduFloatingMeta = document.getElementById("cduFloatingMeta");
  els.cduFloatingContent = document.getElementById("cduFloatingContent");
  els.cduTableSizeToggle = document.getElementById("cduTableSizeToggle");
  els.cduTableSizeButtons = Array.from(document.querySelectorAll("[data-cdu-table-size]"));
  els.cduTablesCollapse = document.getElementById("cduTablesCollapse");
  els.cduTablesResetPosition = document.getElementById("cduTablesResetPosition");
  els.cduTablesHide = document.getElementById("cduTablesHide");
  els.cduTablesShow = document.getElementById("cduTablesShow");
  els.scopeBack = document.getElementById("scopeBack");
  els.scopeOverview = document.getElementById("scopeOverview");
  els.scopeBreadcrumb = document.getElementById("scopeBreadcrumb");
  els.scopeSections = document.getElementById("scopeSections");
  els.simplifiedView = document.getElementById("simplifiedView");
  els.nodeSearch = document.getElementById("nodeSearch");
  els.searchResults = document.getElementById("searchResults");
  els.canvasEmptyState = document.getElementById("canvasEmptyState");
  els.canvasEmptyMessage = document.getElementById("canvasEmptyMessage");
  els.loadingOverlay = document.getElementById("loadingOverlay");
  els.detailPanel = document.getElementById("detailPanel");
  els.detailPanelClose = document.getElementById("detailPanelClose");
  els.emptyDetail = document.getElementById("emptyDetail");
  els.nodeDetail = document.getElementById("nodeDetail");
  els.streamDetail = document.getElementById("streamDetail");
  els.detailUnit = document.getElementById("detailUnit");
  els.detailStatus = document.getElementById("detailStatus");
  els.detailName = document.getElementById("detailName");
  els.detailTag = document.getElementById("detailTag");
  els.detailDescription = document.getElementById("detailDescription");
  els.detailType = document.getElementById("detailType");
  els.detailArea = document.getElementById("detailArea");
  els.detailTemperature = document.getElementById("detailTemperature");
  els.detailPressure = document.getElementById("detailPressure");
  els.detailFunctions = document.getElementById("detailFunctions");
  els.detailMassBalance = document.getElementById("detailMassBalance");
  els.detailOpenUnit = document.getElementById("detailOpenUnit");
  els.detailOpenSection = document.getElementById("detailOpenSection");
  els.streamDetailType = document.getElementById("streamDetailType");
  els.streamDetailShape = document.getElementById("streamDetailShape");
  els.streamDetailName = document.getElementById("streamDetailName");
  els.streamDetailId = document.getElementById("streamDetailId");
  els.streamDetailDescription = document.getElementById("streamDetailDescription");
  els.streamDetailFrom = document.getElementById("streamDetailFrom");
  els.streamDetailTo = document.getElementById("streamDetailTo");
  els.streamDetailPoints = document.getElementById("streamDetailPoints");
  els.streamDetailStroke = document.getElementById("streamDetailStroke");
  els.streamMassDetail = document.getElementById("streamMassDetail");
  els.toastRoot = document.getElementById("toastRoot");
  els.adminSecretTrigger = document.getElementById("adminSecretTrigger");
  els.adminLoginModal = document.getElementById("adminLoginModal");
  els.adminLoginForm = document.getElementById("adminLoginForm");
  els.adminUsername = document.getElementById("adminUsername");
  els.adminPassword = document.getElementById("adminPassword");
  els.adminLoginError = document.getElementById("adminLoginError");
  els.adminLoginCancel = document.getElementById("adminLoginCancel");
  els.adminPanel = document.getElementById("adminPanel");
  els.adminPanelClose = document.getElementById("adminPanelClose");
  els.adminPanelCollapse = document.getElementById("adminPanelCollapse");
  els.adminCollapsedTabs = Array.from(document.querySelectorAll("[data-admin-collapsed-tab]"));
  els.adminLogout = document.getElementById("adminLogout");
  els.adminEditMode = document.getElementById("adminEditMode");
  els.adminModeHint = document.getElementById("adminModeHint");
  els.autosaveIndicator = document.getElementById("autosaveIndicator");
  els.adminTabs = Array.from(document.querySelectorAll("[data-admin-tab]"));
  els.adminTabPanels = Array.from(document.querySelectorAll("[data-admin-panel]"));
  els.adminEditable = Array.from(document.querySelectorAll(".admin-editable"));
  els.adminRequiresEdit = Array.from(document.querySelectorAll(".admin-requires-edit"));
  els.adminAreaSelect = document.getElementById("adminAreaSelect");
  els.adminAreaNew = document.getElementById("adminAreaNew");
  els.adminAreaSave = document.getElementById("adminAreaSave");
  els.adminAreaDelete = document.getElementById("adminAreaDelete");
  els.adminAreaId = document.getElementById("adminAreaId");
  els.adminAreaName = document.getElementById("adminAreaName");
  els.adminAreaSubtitle = document.getElementById("adminAreaSubtitle");
  els.adminAreaX = document.getElementById("adminAreaX");
  els.adminAreaY = document.getElementById("adminAreaY");
  els.adminAreaWidth = document.getElementById("adminAreaWidth");
  els.adminAreaHeight = document.getElementById("adminAreaHeight");
  els.adminAreaColor = document.getElementById("adminAreaColor");
  els.adminAreaLocked = document.getElementById("adminAreaLocked");
  els.adminNodeSelect = document.getElementById("adminNodeSelect");
  els.adminNodeNew = document.getElementById("adminNodeNew");
  els.adminNodeSave = document.getElementById("adminNodeSave");
  els.adminNodeDelete = document.getElementById("adminNodeDelete");
  els.adminNodePreview = document.getElementById("adminNodePreview");
  els.adminNodePreviewTag = document.getElementById("adminNodePreviewTag");
  els.adminNodePreviewName = document.getElementById("adminNodePreviewName");
  els.adminNodePreviewMeta = document.getElementById("adminNodePreviewMeta");
  els.adminNodeTag = document.getElementById("adminNodeTag");
  els.adminNodeName = document.getElementById("adminNodeName");
  els.adminNodeUnit = document.getElementById("adminNodeUnit");
  els.adminNodeType = document.getElementById("adminNodeType");
  els.adminNodeArea = document.getElementById("adminNodeArea");
  els.adminNodeStatus = document.getElementById("adminNodeStatus");
  els.adminNodeX = document.getElementById("adminNodeX");
  els.adminNodeY = document.getElementById("adminNodeY");
  els.adminNodeSizePreset = document.getElementById("adminNodeSizePreset");
  els.adminNodeWidth = document.getElementById("adminNodeWidth");
  els.adminNodeHeight = document.getElementById("adminNodeHeight");
  els.adminNodeScale = document.getElementById("adminNodeScale");
  els.adminNodeScale75 = document.getElementById("adminNodeScale75");
  els.adminNodeScale100 = document.getElementById("adminNodeScale100");
  els.adminNodeScale125 = document.getElementById("adminNodeScale125");
  els.adminNodeScale150 = document.getElementById("adminNodeScale150");
  els.adminNodeResetSize = document.getElementById("adminNodeResetSize");
  els.adminNodeCopy = document.getElementById("adminNodeCopy");
  els.adminNodePaste = document.getElementById("adminNodePaste");
  els.adminNodeDuplicate = document.getElementById("adminNodeDuplicate");
  els.adminNodeTagFontSize = document.getElementById("adminNodeTagFontSize");
  els.adminNodeNameFontSize = document.getElementById("adminNodeNameFontSize");
  els.adminNodeMetaFontSize = document.getElementById("adminNodeMetaFontSize");
  els.adminNodeFontColor = document.getElementById("adminNodeFontColor");
  els.adminNodeFontColorReset = document.getElementById("adminNodeFontColorReset");
  els.adminNodeFontWeight = document.getElementById("adminNodeFontWeight");
  els.adminNodeFontStyle = document.getElementById("adminNodeFontStyle");
  els.adminNodeIconSize = document.getElementById("adminNodeIconSize");
  els.adminNodeIconColor = document.getElementById("adminNodeIconColor");
  els.adminNodeIconColorReset = document.getElementById("adminNodeIconColorReset");
  els.adminNodeIconScale = document.getElementById("adminNodeIconScale");
  els.adminNodePortLabelFontSize = document.getElementById("adminNodePortLabelFontSize");
  els.adminNodePortLabelColor = document.getElementById("adminNodePortLabelColor");
  els.adminNodePortLabelWeight = document.getElementById("adminNodePortLabelWeight");
  els.adminNodePortLabelReset = document.getElementById("adminNodePortLabelReset");
  els.adminNodeVisualReset = document.getElementById("adminNodeVisualReset");
  els.adminNodeTemperature = document.getElementById("adminNodeTemperature");
  els.adminNodePressure = document.getElementById("adminNodePressure");
  els.adminNodeDescription = document.getElementById("adminNodeDescription");
  els.adminNodeFunctions = document.getElementById("adminNodeFunctions");
  els.adminNodeBalanceType = document.getElementById("adminNodeBalanceType");
  els.adminNodeBalanceScope = document.getElementById("adminNodeBalanceScope");
  els.adminNodeBalanceUnit = document.getElementById("adminNodeBalanceUnit");
  els.adminNodeTolerancePercent = document.getElementById("adminNodeTolerancePercent");
  els.adminNodeSplitModel = document.getElementById("adminNodeSplitModel");
  els.adminNodeSplitModelStatus = document.getElementById("adminNodeSplitModelStatus");
  els.adminNodeInputPorts = document.getElementById("adminNodeInputPorts");
  els.adminNodeOutputPorts = document.getElementById("adminNodeOutputPorts");
  els.adminNodePortsDefault = document.getElementById("adminNodePortsDefault");
  els.adminNodePortsColumn = document.getElementById("adminNodePortsColumn");
  els.adminNodePortsReactor = document.getElementById("adminNodePortsReactor");
  els.adminNodePortsProduct = document.getElementById("adminNodePortsProduct");
  els.adminNodePortsUtility = document.getElementById("adminNodePortsUtility");
  els.adminNodeSection = document.getElementById("adminNodeSection");
  els.adminNodeLevel = document.getElementById("adminNodeLevel");
  els.adminNodeVisibleIn = document.getElementById("adminNodeVisibleIn");
  els.adminNodeIsMajor = document.getElementById("adminNodeIsMajor");
  els.adminStreamSelect = document.getElementById("adminStreamSelect");
  els.adminStreamNew = document.getElementById("adminStreamNew");
  els.adminStreamSave = document.getElementById("adminStreamSave");
  els.adminStreamDelete = document.getElementById("adminStreamDelete");
  els.adminStreamDeleteCanvas = document.getElementById("adminStreamDeleteCanvas");
  els.adminStreamId = document.getElementById("adminStreamId");
  els.adminStreamLabel = document.getElementById("adminStreamLabel");
  els.adminStreamFrom = document.getElementById("adminStreamFrom");
  els.adminStreamFromPort = document.getElementById("adminStreamFromPort");
  els.adminStreamTo = document.getElementById("adminStreamTo");
  els.adminStreamToPort = document.getElementById("adminStreamToPort");
  els.adminStreamType = document.getElementById("adminStreamType");
  els.adminStreamShape = document.getElementById("adminStreamShape");
  els.adminStreamStrokeWidth = document.getElementById("adminStreamStrokeWidth");
  els.adminStreamLabelMode = document.getElementById("adminStreamLabelMode");
  els.adminStreamAutoRoute = document.getElementById("adminStreamAutoRoute");
  els.adminStreamAvoidNodes = document.getElementById("adminStreamAvoidNodes");
  els.adminStreamUnit = document.getElementById("adminStreamUnit");
  els.adminStreamSection = document.getElementById("adminStreamSection");
  els.adminStreamCategory = document.getElementById("adminStreamCategory");
  els.adminStreamFlowrate = document.getElementById("adminStreamFlowrate");
  els.adminStreamFlowUnit = document.getElementById("adminStreamFlowUnit");
  els.adminStreamTemperature = document.getElementById("adminStreamTemperature");
  els.adminStreamPressure = document.getElementById("adminStreamPressure");
  els.adminStreamDensity = document.getElementById("adminStreamDensity");
  els.adminStreamDensityTonM3 = document.getElementById("adminStreamDensityTonM3");
  els.adminStreamPhase = document.getElementById("adminStreamPhase");
  els.adminStreamIsCalculated = document.getElementById("adminStreamIsCalculated");
  els.adminStreamIsFinalProduct = document.getElementById("adminStreamIsFinalProduct");
  els.adminStreamIncludeProductTable = document.getElementById("adminStreamIncludeProductTable");
  els.adminStreamIncludeFeedTable = document.getElementById("adminStreamIncludeFeedTable");
  els.adminStreamBalanceCategory = document.getElementById("adminStreamBalanceCategory");
  els.adminStreamBalanceRole = document.getElementById("adminStreamBalanceRole");
  els.adminStreamIsRecycle = document.getElementById("adminStreamIsRecycle");
  els.adminStreamIncludeNodeBalance = document.getElementById("adminStreamIncludeNodeBalance");
  els.adminStreamIncludeUnitBalance = document.getElementById("adminStreamIncludeUnitBalance");
  els.adminStreamDownstreamUse = document.getElementById("adminStreamDownstreamUse");
  els.adminStreamConstraintRole = document.getElementById("adminStreamConstraintRole");
  els.adminStreamConstraintGroup = document.getElementById("adminStreamConstraintGroup");
  els.adminStreamFlowMin = document.getElementById("adminStreamFlowMin");
  els.adminStreamFlowTarget = document.getElementById("adminStreamFlowTarget");
  els.adminStreamFlowMax = document.getElementById("adminStreamFlowMax");
  els.adminStreamFlowRangeUnit = document.getElementById("adminStreamFlowRangeUnit");
  els.adminStreamRangeMode = document.getElementById("adminStreamRangeMode");
  els.adminStreamUseAsTarget = document.getElementById("adminStreamUseAsTarget");
  els.adminStreamCalculationPriority = document.getElementById("adminStreamCalculationPriority");
  els.adminStreamTargetSolveMode = document.getElementById("adminStreamTargetSolveMode");
  els.adminStreamTargetTolerancePercent = document.getElementById("adminStreamTargetTolerancePercent");
  els.adminStreamAllowAutoAdjust = document.getElementById("adminStreamAllowAutoAdjust");
  els.adminStreamLockedFlow = document.getElementById("adminStreamLockedFlow");
  els.adminStreamTemperatureMin = document.getElementById("adminStreamTemperatureMin");
  els.adminStreamTemperatureTarget = document.getElementById("adminStreamTemperatureTarget");
  els.adminStreamTemperatureMax = document.getElementById("adminStreamTemperatureMax");
  els.adminStreamPressureMin = document.getElementById("adminStreamPressureMin");
  els.adminStreamPressureTarget = document.getElementById("adminStreamPressureTarget");
  els.adminStreamPressureMax = document.getElementById("adminStreamPressureMax");
  els.adminStreamUseHvuPreset = document.getElementById("adminStreamUseHvuPreset");
  els.adminStreamClearRange = document.getElementById("adminStreamClearRange");
  els.adminStreamVisibleIn = document.getElementById("adminStreamVisibleIn");
  els.adminStreamIsMajor = document.getElementById("adminStreamIsMajor");
  els.adminStreamEditPath = document.getElementById("adminStreamEditPath");
  els.adminStreamCreateCanvas = document.getElementById("adminStreamCreateCanvas");
  els.adminStreamPickFrom = document.getElementById("adminStreamPickFrom");
  els.adminStreamPickTo = document.getElementById("adminStreamPickTo");
  els.adminStreamCanvasInfo = document.getElementById("adminStreamCanvasInfo");
  els.adminStreamAddPoint = document.getElementById("adminStreamAddPoint");
  els.adminStreamDeletePoint = document.getElementById("adminStreamDeletePoint");
  els.adminStreamConvertCable = document.getElementById("adminStreamConvertCable");
  els.adminStreamConvertPolyline = document.getElementById("adminStreamConvertPolyline");
  els.adminStreamResetPath = document.getElementById("adminStreamResetPath");
  els.adminStreamAutoFixRoute = document.getElementById("adminStreamAutoFixRoute");
  els.adminStreamApplyCleanRoutes = document.getElementById("adminStreamApplyCleanRoutes");
  els.adminStreamPointStatus = document.getElementById("adminStreamPointStatus");
  els.adminStreamRouteStatus = document.getElementById("adminStreamRouteStatus");
  els.adminPidSelect = document.getElementById("adminPidSelect");
  els.adminPidNew = document.getElementById("adminPidNew");
  els.adminPidType = document.getElementById("adminPidType");
  els.adminPidTag = document.getElementById("adminPidTag");
  els.adminPidLabel = document.getElementById("adminPidLabel");
  els.adminPidX = document.getElementById("adminPidX");
  els.adminPidY = document.getElementById("adminPidY");
  els.adminPidWidth = document.getElementById("adminPidWidth");
  els.adminPidHeight = document.getElementById("adminPidHeight");
  els.adminPidStroke = document.getElementById("adminPidStroke");
  els.adminPidFill = document.getElementById("adminPidFill");
  els.adminPidStrokeWidth = document.getElementById("adminPidStrokeWidth");
  els.adminPidFontSize = document.getElementById("adminPidFontSize");
  els.adminPidFontColor = document.getElementById("adminPidFontColor");
  els.adminPidFontWeight = document.getElementById("adminPidFontWeight");
  els.adminPidOpacity = document.getElementById("adminPidOpacity");
  els.adminPidLocked = document.getElementById("adminPidLocked");
  els.adminPidSave = document.getElementById("adminPidSave");
  els.adminPidDuplicate = document.getElementById("adminPidDuplicate");
  els.adminPidDelete = document.getElementById("adminPidDelete");
  els.adminAreaCount = document.getElementById("adminAreaCount");
  els.adminNodeCount = document.getElementById("adminNodeCount");
  els.adminStreamCount = document.getElementById("adminStreamCount");
  els.adminStorageStatus = document.getElementById("adminStorageStatus");
  els.adminConfigExport = document.getElementById("adminConfigExport");
  els.adminConfigDeploy = document.getElementById("adminConfigDeploy");
  els.adminDeploymentStatus = document.getElementById("adminDeploymentStatus");
  els.adminConfigImport = document.getElementById("adminConfigImport");
  els.adminConfigRestore = document.getElementById("adminConfigRestore");
  els.adminLoadCduDefault = document.getElementById("adminLoadCduDefault");
  els.adminCduBaseCapacityM3H = document.getElementById("adminCduBaseCapacityM3H");
  els.adminCduBaseCapacityMBSD = document.getElementById("adminCduBaseCapacityMBSD");
  els.adminCduTablesVisible = document.getElementById("adminCduTablesVisible");
  els.adminShowNodeBalance = document.getElementById("adminShowNodeBalance");
  els.adminCduAutoHidePresentation = document.getElementById("adminCduAutoHidePresentation");
  els.adminImportPreview = document.getElementById("adminImportPreview");
  els.adminImportPreviewTitle = document.getElementById("adminImportPreviewTitle");
  els.adminImportAreaCount = document.getElementById("adminImportAreaCount");
  els.adminImportNodeCount = document.getElementById("adminImportNodeCount");
  els.adminImportStreamCount = document.getElementById("adminImportStreamCount");
  els.adminImportPreviewMessage = document.getElementById("adminImportPreviewMessage");
  els.adminImportApply = document.getElementById("adminImportApply");
  els.adminImportCancel = document.getElementById("adminImportCancel");
  els.adminConfigReset = document.getElementById("adminConfigReset");
  
  // Fitur Baru Elemen
  els.minimapContainer = document.getElementById("minimapContainer");
  els.minimapViewport = document.getElementById("minimapViewport");
}

function indexData() {
  nodeById.clear();
  nodeByTag.clear();
  NODES.forEach((node) => {
    nodeById.set(node.id, node);
    nodeByTag.set(node.tag, node);
  });
}

async function loadStoredConfig() {
  if (SAFE_MODE) {
    loadDefaultPfdConfig("", "Safe Mode");
    return;
  }
  const raw = safeLocalStorageGet(ADMIN_STORAGE_KEY);
  const stored = safeJsonParse(raw);
  if (stored && isConfigShapeValid(stored) && stored.dataVersion === PFD_DATA_VERSION) {
    try {
      const { config, migrated } = migrateStreamConfigVersion(stored);
      state.userModified = Boolean(config.userModified);
      hydrateConfig(config);
      if (migrated) {
        try {
          safeLocalStorageSet(ADMIN_STORAGE_KEY, JSON.stringify(config));
          showToast("Stream lama dimigrasi ke sistem port/socket v2.", "info");
        } catch (error) {
          console.warn("Gagal menyimpan migrasi stream v2:", error);
        }
      }
      updateAutosaveIndicator("Autosaved locally", "saved");
      updateDeploymentStatus("Autosaved locally", "local");
      return;
    } catch (error) {
      console.warn("Stored config valid secara bentuk, tetapi gagal dimuat. Fallback default.", error);
      backupCorruptLocalStorage(raw, "hydrate-valid-config-failed");
      hydrateFallbackConfig("Config tersimpan gagal dimuat. Memakai sample data default.");
      return;
    }
  }
  if (stored && isConfigShapeValid(stored) && stored.dataVersion !== PFD_DATA_VERSION) {
    if (stored.userModified) {
      console.warn("Config user memakai dataVersion lama. RefineryMap mempertahankan data user dan menjalankan normalisasi aman.");
      try {
        state.userModified = true;
        hydrateConfig({
          ...stored,
          dataVersion: PFD_DATA_VERSION,
          streamVersion: STREAM_CONFIG_VERSION,
        });
        saveCurrentConfig("Config user dimigrasi aman");
      } catch (error) {
        console.warn("Migrasi config user gagal. Fallback default.", error);
        backupCorruptLocalStorage(raw, "migration-failed");
        hydrateFallbackConfig("Migrasi config gagal. Memakai sample data default.");
      }
      return;
    }
    loadDefaultPfdConfig("Sample data CDU mass balance baru dimuat.", "Default CDU");
    return;
  }
  if (raw) {
    backupCorruptLocalStorage(raw, "invalid-shape");
    showToast("Config localStorage rusak. RefineryMap memakai sample data default.", "warning");
    await loadDeploymentDefaultOrInternalConfig("", "Fallback default");
  } else {
    await loadDeploymentDefaultOrInternalConfig("", "Default CDU");
  }
}

async function loadDeploymentDefaultOrInternalConfig(toastMessage = "", autosaveLabel = "Deployment Default") {
  const deploymentConfig = await loadDeploymentDefaultConfig();
  if (deploymentConfig) {
    state.userModified = Boolean(deploymentConfig.userModified);
    hydrateConfig(deploymentConfig);
    applySafeModeDataSimplifications();
    try {
      safeLocalStorageSet(ADMIN_STORAGE_KEY, JSON.stringify(getCurrentConfig()));
      updateAutosaveIndicator(autosaveLabel, "saved");
      updateDeploymentStatus("Autosaved locally", "local");
    } catch (error) {
      console.warn("Gagal menyimpan deployment default ke localStorage:", error);
      updateAutosaveIndicator("Default", "warning");
    }
    if (toastMessage) showToast(toastMessage, "info");
    return true;
  }

  loadDefaultPfdConfig(toastMessage, autosaveLabel);
  return false;
}

async function loadDeploymentDefaultConfig() {
  // Startup default: prefer data/refinery-config.json, then optional API, then internal sample.
  const candidates = [
    { url: DEPLOYMENT_CONFIG_PATH, source: "file" },
    { url: DEPLOYMENT_CONFIG_API, source: "api" },
  ];

  for (const candidate of candidates) {
    try {
      const response = await fetch(`${candidate.url}?v=${Date.now()}`, {
        cache: "no-store",
        credentials: "same-origin",
      });
      if (!response.ok) continue;
      const parsed = await response.json();
      const config = normalizeDeploymentConfigResponse(parsed);
      const validation = validateConfigShape(config);
      if (!validation.valid) {
        console.warn(`Deployment config ${candidate.source} tidak valid:`, validation.issues);
        continue;
      }
      return normalizeImportedConfig(config);
    } catch (error) {
      console.info(`Deployment config ${candidate.source} tidak tersedia:`, error?.message || error);
    }
  }
  return null;
}

function normalizeDeploymentConfigResponse(payload) {
  if (validateConfigShape(payload).valid) return payload;
  if (validateConfigShape(payload?.config).valid) return payload.config;
  return payload;
}

function backupCorruptLocalStorage(raw, reason = "corrupt") {
  if (!raw) return;
  try {
    const key = `${ADMIN_STORAGE_KEY}_corrupt_backup_${Date.now()}`;
    localStorage.setItem(key, JSON.stringify({
      reason,
      backedUpAt: new Date().toISOString(),
      raw,
    }));
    console.warn(`Backup localStorage rusak dibuat: ${key}`);
  } catch (error) {
    console.warn("Gagal membuat backup localStorage rusak:", error);
  }
}

function hydrateFallbackConfig(message = "") {
  state.userModified = false;
  hydrateConfig(DEFAULT_CONFIG);
  applySafeModeDataSimplifications();
  if (message) showToast(message, "warning");
}

function loadDefaultPfdConfig(toastMessage = "", autosaveLabel = "Default CDU") {
  state.userModified = false;
  hydrateConfig(DEFAULT_CONFIG);
  applySafeModeDataSimplifications();
  if (!SAFE_MODE) {
    try {
      safeLocalStorageSet(ADMIN_STORAGE_KEY, JSON.stringify(getCurrentConfig()));
      updateAutosaveIndicator(autosaveLabel, "saved");
      updateDeploymentStatus("Autosaved locally", "local");
    } catch (error) {
      console.warn("Gagal menyimpan sample PFD default:", error);
      updateAutosaveIndicator("Default", "warning");
    }
  } else {
    updateAutosaveIndicator(autosaveLabel, "warning");
  }
  if (toastMessage) showToast(toastMessage, "info");
}

function applySafeModeDataSimplifications() {
  if (!SAFE_MODE) return;
  state.streamBridges = false;
  state.selectStreamOnHover = false;
  state.streamLabelModeGlobal = "hover";
  STREAMS.forEach((stream) => {
    stream.shape = "polyline";
    stream.avoidNodes = false;
    if (!Array.isArray(stream.points)) stream.points = [];
  });
}

function migrateStreamConfigVersion(config) {
  const next = deepClone(config || DEFAULT_CONFIG);
  if (next.dataVersion !== PFD_DATA_VERSION) {
    return { config: deepClone(DEFAULT_CONFIG), migrated: true };
  }
  const version = Number(next.streamVersion || 0);
  if (version >= STREAM_CONFIG_VERSION) {
    if (!Array.isArray(next.streams)) next.streams = deepClone(CDU_DETAIL_STREAMS);
    if (!Array.isArray(next.pidSymbols)) next.pidSymbols = [];
    if (!Array.isArray(next.pidConnectors)) next.pidConnectors = [];
    next.dataVersion = PFD_DATA_VERSION;
    next.streamVersion = STREAM_CONFIG_VERSION;
    return { config: next, migrated: false };
  }

  if (!next.userModified || !Array.isArray(next.streams)) {
    next.streams = deepClone(CDU_DETAIL_STREAMS);
  }
  if (!Array.isArray(next.pidSymbols)) next.pidSymbols = [];
  if (!Array.isArray(next.pidConnectors)) next.pidConnectors = [];
  next.dataVersion = PFD_DATA_VERSION;
  next.streamVersion = STREAM_CONFIG_VERSION;
  return { config: next, migrated: true };
}

function hydrateConfig(config) {
  if (isCanvasConfigValid(config?.canvas)) {
    CANVAS.width = Number(config.canvas.width);
    CANVAS.height = Number(config.canvas.height);
  } else {
    CANVAS.width = DEFAULT_CONFIG.canvas.width;
    CANVAS.height = DEFAULT_CONFIG.canvas.height;
  }

  const normalizedCapacity = normalizeCduBaseCapacity(config?.cduBaseCapacity);
  state.cduBaseCapacity = normalizedCapacity;
  const source = {
    areas: Array.isArray(config?.areas) ? config.areas : DEFAULT_CONFIG.areas,
    nodes: Array.isArray(config?.nodes) ? config.nodes : DEFAULT_CONFIG.nodes,
    streams: Array.isArray(config?.streams) ? config.streams : DEFAULT_CONFIG.streams,
    pidSymbols: Array.isArray(config?.pidSymbols) ? config.pidSymbols : DEFAULT_CONFIG.pidSymbols,
    pidConnectors: Array.isArray(config?.pidConnectors) ? config.pidConnectors : DEFAULT_CONFIG.pidConnectors,
    cduRunState: normalizeCduRunState(config?.cduRunState),
    cduBaseCapacity: normalizedCapacity,
    cduFlowSource: normalizeCduFlowSource(config?.cduFlowSource),
    viewOptions: normalizeViewOptions(config?.viewOptions),
  };

  AREAS.splice(0, AREAS.length, ...deepClone(source.areas).filter(isPlainObject));
  NODES.splice(0, NODES.length, ...deepClone(source.nodes).filter(isPlainObject));
  STREAMS.splice(0, STREAMS.length, ...deepClone(source.streams).filter(isPlainObject));
  PID_SYMBOLS.splice(0, PID_SYMBOLS.length, ...deepClone(source.pidSymbols).filter(isPlainObject));
  PID_CONNECTORS.splice(0, PID_CONNECTORS.length, ...deepClone(source.pidConnectors).filter(isPlainObject));
  state.cduRunState = source.cduRunState;
  state.cduBaseCapacity = source.cduBaseCapacity;
  state.cduFlowSource = source.cduFlowSource;
  state.showNodeBalance = source.viewOptions.showNodeBalance;
  state.showPortFlow = source.viewOptions.showPortFlow;
  state.portFlowMode = source.viewOptions.portFlowMode;
  state.portValueDisplay = source.viewOptions.portValueDisplay;
  state.portInfoLayout = source.viewOptions.portInfoLayout;
  state.portInfoScale = source.viewOptions.portInfoScale;
  state.cduTablesVisible = source.viewOptions.cduTablesVisible;
  state.cduTablesCollapsed = source.viewOptions.cduTablesCollapsed;
  state.cduFloatingTableSize = source.viewOptions.cduFloatingTableSize;
  state.cduFloatingTablePosition = source.viewOptions.cduFloatingTablePosition;
  state.cduAutoHideTableInPresentation = source.viewOptions.cduAutoHideTableInPresentation;
  normalizeNodeIdentities();
  normalizeNodeSizes();
  normalizeScopeMetadata();
  normalizeData();
}

function normalizeData() {
  state.cduConnectivityGraph = null;
  state.cduReachableNodeIds = new Set();
  if (!Number.isFinite(Number(CANVAS.width)) || Number(CANVAS.width) < 800) CANVAS.width = DEFAULT_CONFIG.canvas.width || 6000;
  if (!Number.isFinite(Number(CANVAS.height)) || Number(CANVAS.height) < 600) CANVAS.height = DEFAULT_CONFIG.canvas.height || 3600;
  AREAS.splice(0, AREAS.length, ...AREAS.filter(isPlainObject));
  NODES.splice(0, NODES.length, ...NODES.filter(isPlainObject));
  STREAMS.splice(0, STREAMS.length, ...STREAMS.filter(isPlainObject));
  PID_SYMBOLS.splice(0, PID_SYMBOLS.length, ...PID_SYMBOLS.filter(isPlainObject));
  PID_CONNECTORS.splice(0, PID_CONNECTORS.length, ...PID_CONNECTORS.filter(isPlainObject));
  normalizeAreas();
  normalizeNodeIdentities();
  normalizeNodeSizes();
  normalizeScopeMetadata();
  normalizeAllNodePorts();
  indexData();
  normalizeAllStreams();
  detectMassBalanceCycles(NODES, getActiveStreams());
  normalizePidSymbols();
  normalizePidConnectors();
  indexData();
  calculateAllMassBalances();
  evaluateAllStreamRanges();
  state.massBalanceConstraintGroups = evaluateConstraintGroups();
  state.massBalanceRuntime = buildMassBalanceRuntime();
  applyRuntimeMassBalanceStatusToNodes(state.massBalanceRuntime);
  state.massBalanceRuntime = buildMassBalanceRuntime();
  state.cduProductMassBalanceTable = state.massBalanceRuntime.productRows;
  state.cduFeedMassBalanceTable = state.massBalanceRuntime.feedRows;
}

function normalizeAreas() {
  const used = new Set();
  AREAS.forEach((area, index) => {
    const fallbackId = `AREA-${index + 1}`;
    let id = safeText(area.id, fallbackId).toUpperCase();
    let counter = 2;
    while (used.has(id)) {
      id = `${safeText(area.id, fallbackId).toUpperCase()}-${counter}`;
      counter += 1;
    }
    used.add(id);
    area.id = id;
    area.name = safeText(area.name, "New Area");
    area.subtitle = safeText(area.subtitle, "New section");
    area.x = safeNumber(area.x, 120 + index * 40);
    area.y = safeNumber(area.y, 120 + index * 40);
    area.width = Math.max(180, safeNumber(area.width, 500));
    area.height = Math.max(140, safeNumber(area.height, 300));
    area.color = normalizeColor(area.color, "#2563eb");
    area.unit = safeText(area.unit, getAreaUnit(area) || "GENERAL");
    area.section = safeText(area.section, "General");
    area.visibleIn = normalizeVisibleIn(area.visibleIn, true);
    area.locked = typeof area.locked === "boolean" ? area.locked : false;
    if (typeof area.userCreated !== "boolean") area.userCreated = false;
  });
}

function normalizeStreams() {
  const usedIds = new Set();
  STREAMS.forEach((stream, index) => {
    const from = nodeByTag.get(stream.from);
    const to = nodeByTag.get(stream.to);
    const baseId = safeText(stream.id, `S-${String(index + 1).padStart(3, "0")}`);
    let nextId = baseId;
    let counter = 2;
    while (usedIds.has(nextId)) {
      nextId = `${baseId}-${counter}`;
      counter += 1;
    }
    stream.id = nextId;
    usedIds.add(nextId);
    stream.label = safeText(stream.label, stream.from && stream.to ? `${stream.from} -> ${stream.to}` : "New Stream");
    stream.type = safeText(stream.type, "liquid");
    stream.category = safeText(stream.category, inferStreamCategory(stream));
    stream.temperature = normalizeNullableProcessValue(stream.temperature);
    stream.pressure = normalizeNullableProcessValue(stream.pressure);
    stream.density = normalizeNullableProcessValue(stream.density);
    stream.densityTonM3 = normalizeNullableNumber(stream.densityTonM3);
    applyDefaultStreamMassFields(stream);
    stream.splitKey = safeText(stream.splitKey, "");
    stream.splitSource = safeText(stream.splitSource, "");
    stream.shape = normalizeStreamShape(stream.shape);
    stream.strokeWidth = clamp(safeNumber(stream.strokeWidth, 2.2), 1, 4);
    stream.points = normalizeStreamPointList(stream.points);
    stream.autoRoute = typeof stream.autoRoute === "boolean" ? stream.autoRoute : !stream.points.length;
    stream.avoidNodes = typeof stream.avoidNodes === "boolean" ? stream.avoidNodes : true;
    stream.labelMode = safeText(stream.labelMode, "hover");
    stream.visibleIn = normalizeVisibleIn(stream.visibleIn, stream.isMajor);
    stream.visibleInSimplified = stream.userCreated === true
      ? true
      : (typeof stream.visibleInSimplified === "boolean" ? stream.visibleInSimplified : Boolean(stream.isMajor));
    stream.unit = safeText(stream.unit, inferStreamUnit(stream, from, to));
    stream.section = safeText(stream.section, inferStreamSection(stream, from, to));
    stream.isMajor = typeof stream.isMajor === "boolean" ? stream.isMajor : inferStreamIsMajor(stream);
    stream.invalid = !from || !to || from.tag === to.tag;
    if (stream.invalid) {
      console.warn(`Stream ${stream.id} invalid dan akan dilewati saat render.`, {
        from: stream.from,
        to: stream.to,
      });
      stream.fromPort = safeText(stream.fromPort, "out");
      stream.toPort = safeText(stream.toPort, "in");
    } else {
      stream.fromPort = getValidPortId(from, "outputs", stream.fromPort) || "out";
      stream.toPort = getValidPortId(to, "inputs", stream.toPort) || "in";
    }
    if (typeof stream.userCreated !== "boolean") stream.userCreated = false;
  });
}

function isValidStream(stream) {
  if (!stream || typeof stream !== "object") return false;
  const id = safeText(stream.id, "");
  const fromTag = safeText(stream.from, "");
  const toTag = safeText(stream.to, "");
  if (!id || !fromTag || !toTag || fromTag === toTag) return false;
  return nodeByTag.has(fromTag) && nodeByTag.has(toTag);
}

function getActiveStreams() {
  return STREAMS.filter((stream) => isValidStream(stream));
}

function isNodeBalanceStream(stream) {
  if (!stream) return false;
  if (stream.includeInNodeBalance === false) return false;
  if (stream.isRecycle === true) return false;
  if (normalizeStreamBalanceRole(stream.balanceRole) === "recycle") return false;
  if (stream.runtimeRecycleCandidate === true) return false;
  return true;
}

function isUnitBalanceStream(stream) {
  if (!stream) return false;
  return stream.includeInUnitBalance !== false;
}

function getNodeBalanceStreams() {
  return getActiveStreams().filter((stream) => isNodeBalanceStream(stream));
}

function detectMassBalanceCycles(nodes = NODES, streams = getActiveStreams()) {
  const nodeTags = new Set((Array.isArray(nodes) ? nodes : []).map((node) => node?.tag).filter(Boolean));
  const cycleStreams = new Set();
  const cycleNodes = new Set();
  const adjacency = new Map();
  (Array.isArray(streams) ? streams : []).forEach((stream) => {
    if (!isValidStream(stream) || !isNodeBalanceStream(stream)) return;
    if (!nodeTags.has(stream.from) || !nodeTags.has(stream.to)) return;
    if (!adjacency.has(stream.from)) adjacency.set(stream.from, []);
    adjacency.get(stream.from).push(stream);
  });

  const visiting = new Set();
  const visited = new Set();
  const stack = [];

  const visit = (tag) => {
    if (visiting.has(tag)) return;
    if (visited.has(tag)) return;
    visiting.add(tag);
    stack.push(tag);
    (adjacency.get(tag) || []).forEach((stream) => {
      const nextTag = stream.to;
      if (visiting.has(nextTag)) {
        cycleStreams.add(stream);
        const cycleStart = stack.indexOf(nextTag);
        stack.slice(cycleStart >= 0 ? cycleStart : 0).forEach((item) => cycleNodes.add(item));
        cycleNodes.add(tag);
        cycleNodes.add(nextTag);
        return;
      }
      visit(nextTag);
    });
    stack.pop();
    visiting.delete(tag);
    visited.add(tag);
  };

  nodeTags.forEach((tag) => visit(tag));
  cycleStreams.forEach((stream) => {
    stream.runtimeRecycleCandidate = true;
  });
  if (cycleStreams.size) {
    console.warn("[MassBalance] cycle detected, treating recycle stream as non-blocking", {
      streams: Array.from(cycleStreams).map((stream) => stream.id),
      nodes: Array.from(cycleNodes),
    });
  }
  return {
    streams: Array.from(cycleStreams),
    nodes: Array.from(cycleNodes),
  };
}

function normalizeAllStreams() {
  normalizeStreams();
  STREAMS.forEach((stream) => {
    clearStreamRuntimeArtifacts(stream);
    stream.invalid = !isValidStream(stream);
    applyDefaultStreamMassFields(stream);
  });
  if (MASS_BALANCE_DEBUG) {
    STREAMS.filter((stream) => !isValidStream(stream)).forEach((stream) => {
      console.debug("[MassBalance] inactive stream skipped", {
        id: stream?.id,
        from: stream?.from,
        to: stream?.to,
      });
    });
  }
  return getActiveStreams();
}

function getCrudeSourceNode() {
  const flowSource = normalizeCduFlowSource(state.cduFlowSource);
  state.cduFlowSource = flowSource;
  return resolveBalanceNode(flowSource.sourceNodeId) || nodeByTag.get(CDU_FLOW_SOURCE.sourceNodeId) || null;
}

function rebuildCduConnectivityGraph() {
  const outgoing = new Map();
  const incoming = new Map();
  getNodeBalanceStreams().forEach((stream) => {
    if (!outgoing.has(stream.from)) outgoing.set(stream.from, []);
    if (!incoming.has(stream.to)) incoming.set(stream.to, []);
    outgoing.get(stream.from).push(stream);
    incoming.get(stream.to).push(stream);
  });
  const graph = { outgoing, incoming };
  state.cduConnectivityGraph = graph;
  state.cduReachableNodeIds = findDownstreamNodesFromSource(graph);
  return graph;
}

function getCduConnectivityGraph() {
  return state.cduConnectivityGraph || rebuildCduConnectivityGraph();
}

function getSourceOutputStreams(graph = getCduConnectivityGraph()) {
  const source = getCrudeSourceNode();
  if (!source) return [];
  return graph.outgoing.get(source.tag) || [];
}

function findDownstreamNodesFromSource(graph = getCduConnectivityGraph()) {
  const source = getCrudeSourceNode();
  const reachable = new Set();
  if (!source) return reachable;
  const queue = [source.tag];
  reachable.add(source.id);
  reachable.add(source.tag);
  while (queue.length) {
    const tag = queue.shift();
    (graph.outgoing.get(tag) || []).forEach((stream) => {
      const node = nodeByTag.get(stream.to);
      if (!node || reachable.has(node.tag)) return;
      reachable.add(node.id);
      reachable.add(node.tag);
      queue.push(node.tag);
    });
  }
  state.cduReachableNodeIds = reachable;
  return reachable;
}

function isNodeReachableFromCrudeSource(nodeId) {
  const node = resolveBalanceNode(nodeId);
  if (!node) return false;
  const source = getCrudeSourceNode();
  if (source && node.tag === source.tag) return true;
  const reachable = state.cduReachableNodeIds instanceof Set && state.cduReachableNodeIds.size
    ? state.cduReachableNodeIds
    : findDownstreamNodesFromSource(getCduConnectivityGraph());
  return reachable.has(node.id) || reachable.has(node.tag);
}

function normalizePidSymbols() {
  const usedIds = new Set();
  const usedTags = new Set();
  PID_SYMBOLS.forEach((symbol, index) => {
    const type = normalizePidSymbolType(symbol.symbolType);
    const defaults = getPidSymbolDefaults(type);
    const fallbackId = `PID-${String(index + 1).padStart(3, "0")}`;
    let id = safeText(symbol.id, fallbackId).replace(/\s+/g, "-");
    let idCounter = 2;
    while (usedIds.has(id)) {
      id = `${safeText(symbol.id, fallbackId).replace(/\s+/g, "-")}-${idCounter}`;
      idCounter += 1;
    }
    usedIds.add(id);

    let tag = safeText(symbol.tag, id).toUpperCase();
    let tagCounter = 2;
    while (usedTags.has(tag)) {
      tag = `${safeText(symbol.tag, id).toUpperCase()}-${tagCounter}`;
      tagCounter += 1;
    }
    usedTags.add(tag);

    symbol.id = id;
    symbol.kind = "pidSymbol";
    symbol.symbolType = type;
    symbol.tag = tag;
    symbol.label = safeText(symbol.label, PID_SYMBOL_LABELS[type] || "P&ID Symbol");
    symbol.x = safeNumber(symbol.x, 400 + index * 30);
    symbol.y = safeNumber(symbol.y, 400 + index * 30);
    symbol.width = Math.max(30, safeNumber(symbol.width, defaults.width));
    symbol.height = Math.max(30, safeNumber(symbol.height, defaults.height));
    symbol.rotation = safeNumber(symbol.rotation, 0);
    symbol.locked = typeof symbol.locked === "boolean" ? symbol.locked : false;
    symbol.layer = safeText(symbol.layer, "pid");
    symbol.category = getPidSymbolCategory(type);
    symbol.style = normalizePidStyle(symbol.style);
    symbol.ports = normalizePidPorts(symbol, defaults.ports);
    if (typeof symbol.userCreated !== "boolean") symbol.userCreated = true;
  });
}

function normalizePidConnectors() {
  const symbolIds = new Set(PID_SYMBOLS.map((symbol) => symbol.id));
  const usedIds = new Set();
  PID_CONNECTORS.forEach((connector, index) => {
    const fallbackId = `PID-CONN-${String(index + 1).padStart(3, "0")}`;
    let id = safeText(connector.id, fallbackId).replace(/\s+/g, "-");
    let counter = 2;
    while (usedIds.has(id)) {
      id = `${safeText(connector.id, fallbackId).replace(/\s+/g, "-")}-${counter}`;
      counter += 1;
    }
    usedIds.add(id);
    connector.id = id;
    connector.fromSymbolId = safeText(connector.fromSymbolId, "");
    connector.toSymbolId = safeText(connector.toSymbolId, "");
    connector.fromPort = safeText(connector.fromPort, "out");
    connector.toPort = safeText(connector.toPort, "in");
    connector.shape = safeText(connector.shape, "polyline");
    connector.points = normalizeStreamPointList(connector.points);
    connector.lineType = ["process", "signal", "pneumatic", "electric", "hydraulic"].includes(connector.lineType)
      ? connector.lineType
      : "process";
    connector.arrowEnd = typeof connector.arrowEnd === "boolean" ? connector.arrowEnd : true;
    connector.style = {
      stroke: normalizeColor(connector.style?.stroke, "#4b5563"),
      strokeWidth: clamp(safeNumber(connector.style?.strokeWidth, 2), 0.5, 8),
    };
    connector.invalid = !symbolIds.has(connector.fromSymbolId)
      || !symbolIds.has(connector.toSymbolId)
      || connector.fromSymbolId === connector.toSymbolId;
  });
}

function normalizePidSymbolType(symbolType) {
  const value = safeText(symbolType, "equipmentBox");
  if (PID_SYMBOL_LABELS[value]) return value;
  if (["valve", "manual", "gate"].includes(value)) return "manualValve";
  if (["equipment", "box", "equipmentBox"].includes(value)) return "equipmentBox";
  return "equipmentBox";
}

function getPidSymbolDefaults(symbolType = "equipmentBox") {
  const sizeMap = {
    equipmentBox: { width: 160, height: 80 },
    pump: { width: 90, height: 70 },
    compressor: { width: 100, height: 70 },
    verticalVessel: { width: 70, height: 150 },
    horizontalVessel: { width: 150, height: 70 },
    tank: { width: 90, height: 120 },
    column: { width: 80, height: 220 },
    heatExchanger: { width: 140, height: 80 },
    reactor: { width: 110, height: 140 },
    furnace: { width: 120, height: 150 },
    cooler: { width: 130, height: 80 },
    filter: { width: 80, height: 140 },
    separator: { width: 150, height: 80 },
    coolingTower: { width: 140, height: 120 },
    manualValve: { width: 70, height: 50 },
    gateValve: { width: 70, height: 50 },
    globeValve: { width: 70, height: 50 },
    checkValve: { width: 70, height: 50 },
    controlValve: { width: 80, height: 70 },
    reliefValve: { width: 78, height: 70 },
    instrumentBubble: { width: 54, height: 54 },
    FT: { width: 54, height: 54 },
    FC: { width: 54, height: 54 },
    TT: { width: 54, height: 54 },
    TC: { width: 54, height: 54 },
    PT: { width: 54, height: 54 },
    PC: { width: 54, height: 54 },
    LT: { width: 54, height: 54 },
    LC: { width: 54, height: 54 },
    IP: { width: 54, height: 54 },
    processConnector: { width: 160, height: 46 },
    signalLine: { width: 160, height: 46 },
    dashedSignalLine: { width: 160, height: 46 },
    arrowLine: { width: 160, height: 46 },
    textLabel: { width: 160, height: 50 },
    noteBox: { width: 220, height: 100 },
    callout: { width: 190, height: 80 },
    tagBubble: { width: 110, height: 54 },
  };
  const size = sizeMap[symbolType] || sizeMap.equipmentBox;
  return {
    ...size,
    ports: getPidDefaultPorts(symbolType),
  };
}

function getPidDefaultPorts(symbolType = "equipmentBox") {
  const inOut = {
    inputs: [{ id: "in", label: "In", side: "left", offset: 0.5 }],
    outputs: [{ id: "out", label: "Out", side: "right", offset: 0.5 }],
  };
  if (symbolType === "column") {
    return {
      inputs: [{ id: "feed", label: "Feed", side: "left", offset: 0.52 }],
      outputs: [
        { id: "overhead", label: "Overhead", side: "top", offset: 0.5 },
        { id: "bottoms", label: "Bottoms", side: "bottom", offset: 0.5 },
        { id: "side1", label: "Side 1", side: "right", offset: 0.35 },
        { id: "side2", label: "Side 2", side: "right", offset: 0.55 },
        { id: "side3", label: "Side 3", side: "right", offset: 0.75 },
      ],
    };
  }
  if (["verticalVessel", "tank"].includes(symbolType)) {
    return {
      inputs: [{ id: "feed", label: "Feed", side: "left", offset: 0.5 }],
      outputs: [
        { id: "out", label: "Out", side: "right", offset: 0.5 },
        { id: "top", label: "Top", side: "top", offset: 0.5 },
        { id: "bottom", label: "Bottom", side: "bottom", offset: 0.5 },
      ],
    };
  }
  if (symbolType === "heatExchanger") {
    return {
      inputs: [
        { id: "shellIn", label: "Shell In", side: "left", offset: 0.32 },
        { id: "tubeIn", label: "Tube In", side: "left", offset: 0.68 },
      ],
      outputs: [
        { id: "shellOut", label: "Shell Out", side: "right", offset: 0.32 },
        { id: "tubeOut", label: "Tube Out", side: "right", offset: 0.68 },
      ],
    };
  }
  if (symbolType === "reactor") {
    return {
      inputs: [{ id: "feed", label: "Feed", side: "left", offset: 0.5 }],
      outputs: [
        { id: "product", label: "Product", side: "right", offset: 0.5 },
        { id: "vapor", label: "Vapor", side: "top", offset: 0.5 },
        { id: "drain", label: "Drain", side: "bottom", offset: 0.5 },
      ],
    };
  }
  if (isPidInstrumentSymbol(symbolType)) {
    return {
      inputs: [
        { id: "signalIn", label: "Signal In", side: "left", offset: 0.5 },
        { id: "tap", label: "Tap", side: "bottom", offset: 0.5 },
      ],
      outputs: [{ id: "signalOut", label: "Signal Out", side: "right", offset: 0.5 }],
    };
  }
  return inOut;
}

function normalizePidPorts(symbol, fallback) {
  return {
    inputs: normalizePortList(symbol?.ports?.inputs, fallback.inputs, "inputs"),
    outputs: normalizePortList(symbol?.ports?.outputs, fallback.outputs, "outputs"),
  };
}

function normalizePidStyle(style = {}) {
  return {
    stroke: normalizeColor(style.stroke, PID_STYLE_DEFAULTS.stroke),
    fill: normalizeColor(style.fill, PID_STYLE_DEFAULTS.fill),
    strokeWidth: clamp(safeNumber(style.strokeWidth, PID_STYLE_DEFAULTS.strokeWidth), 0.5, 8),
    fontSize: clamp(safeNumber(style.fontSize, PID_STYLE_DEFAULTS.fontSize), 8, 32),
    fontColor: normalizeColor(style.fontColor, PID_STYLE_DEFAULTS.fontColor),
    fontWeight: ["400", "500", "600", "700", "800", "normal", "bold"].includes(String(style.fontWeight))
      ? String(style.fontWeight)
      : PID_STYLE_DEFAULTS.fontWeight,
    opacity: clamp(safeNumber(style.opacity, PID_STYLE_DEFAULTS.opacity), 0.1, 1),
  };
}

function getPidSymbolCategory(symbolType = "") {
  const group = PID_SYMBOL_CATEGORIES.find((category) => category.symbols.includes(symbolType));
  return group?.id || "equipment";
}

function isPidInstrumentSymbol(symbolType = "") {
  return getPidSymbolCategory(symbolType) === "instrument";
}

function normalizeStreamPointList(points) {
  if (!Array.isArray(points)) return [];
  return points
    .map((point) => ({
      x: Number(point?.x),
      y: Number(point?.y),
    }))
    .filter(isFinitePoint);
}

function normalizeStreamShape(shape) {
  const value = safeText(shape, "polyline").toLowerCase();
  if (value === "curve") return "cable";
  if (value === "autostraight" || value === "auto-straight") return "autoStraight";
  if (value === "elbow") return "polyline";
  return VALID_STREAM_SHAPES.has(value) ? value : "polyline";
}

function normalizeScopeMetadata() {
  NODES.forEach((node) => {
    node.unit = safeText(node.unit, inferUnitFromArea(node.area));
    node.section = safeText(node.section, inferNodeSection(node));
    node.level = safeText(node.level, "unit");
    if (typeof node.isMajor !== "boolean") {
      node.isMajor = inferNodeIsMajor(node);
    }
    node.visibleIn = normalizeVisibleIn(node.visibleIn, node.isMajor);
    node.ports = normalizeNodePorts(node);
    if (!Array.isArray(node.children)) node.children = [];
    if (node.parent === undefined) node.parent = null;
    if (typeof node.isCollapsed !== "boolean") node.isCollapsed = false;
  });

  STREAMS.forEach((stream) => {
    const from = NODES.find((node) => node.tag === stream.from);
    const to = NODES.find((node) => node.tag === stream.to);
    stream.unit = safeText(stream.unit, inferStreamUnit(stream, from, to));
    stream.section = safeText(stream.section, inferStreamSection(stream, from, to));
    stream.category = safeText(stream.category, inferStreamCategory(stream));
    if (typeof stream.isMajor !== "boolean") {
      stream.isMajor = inferStreamIsMajor(stream);
    }
    stream.level = safeText(stream.level, stream.isMajor ? "refinery" : "unit");
    stream.visibleIn = normalizeVisibleIn(stream.visibleIn, stream.isMajor);
    if (typeof stream.visibleInSimplified !== "boolean") {
      stream.visibleInSimplified = Boolean(stream.isMajor);
    }
    if (!stream.visibleIn.includes("refinery")) {
      stream.visibleIn.push("refinery");
    }
    stream.bus = safeText(stream.bus, stream.category);
    stream.labelMode = safeText(stream.labelMode, stream.isMajor ? "always" : "hover");
    stream.invalid = !from || !to || from.tag === to.tag;
    stream.fromPort = stream.invalid ? safeText(stream.fromPort, "out") : (getValidPortId(from, "outputs", stream.fromPort) || "out");
    stream.toPort = stream.invalid ? safeText(stream.toPort, "in") : (getValidPortId(to, "inputs", stream.toPort) || "in");
    stream.points = normalizeStreamPointList(stream.points);
    if (typeof stream.autoRoute !== "boolean") stream.autoRoute = !stream.points.length;
    if (typeof stream.avoidNodes !== "boolean") stream.avoidNodes = true;
    stream.routeStatus = "Unknown";
  });
}

function normalizeNodePorts(node) {
  const hasInputPorts = Array.isArray(node?.inputPorts);
  const hasOutputPorts = Array.isArray(node?.outputPorts);
  const legacyInputs = !hasInputPorts && Array.isArray(node?.ports?.inputs) ? node.ports.inputs : [];
  const legacyOutputs = !hasOutputPorts && Array.isArray(node?.ports?.outputs) ? node.ports.outputs : [];
  let inputs = normalizePortList(hasInputPorts ? node.inputPorts : legacyInputs, [], "inputs");
  let outputs = normalizePortList(hasOutputPorts ? node.outputPorts : legacyOutputs, [], "outputs");
  if (!inputs.length && !outputs.length) {
    const fallback = getPortPreset("default");
    inputs = normalizePortList(fallback.inputs, [], "inputs");
    outputs = normalizePortList(fallback.outputs, [], "outputs");
  }
  const normalized = { inputs, outputs };
  if (node && typeof node === "object") {
    node.inputPorts = deepClone(normalized.inputs);
    node.outputPorts = deepClone(normalized.outputs);
    node.ports = deepClone(normalized);
  }
  return normalized;
}

function ensureDefaultPortsForNode(node) {
  if (!node || typeof node !== "object") return getPortPreset("default");
  const normalized = normalizeNodePorts(node);
  node.ports = normalized;
  node.inputPorts = deepClone(normalized.inputs);
  node.outputPorts = deepClone(normalized.outputs);
  return normalized;
}

function normalizeAllNodePorts() {
  NODES.forEach((node) => ensureDefaultPortsForNode(node));
}

function normalizePortList(list, fallback, direction = "") {
  const source = Array.isArray(list) && list.length ? list : fallback;
  const used = new Set();
  return source
    .map((port, index) => {
      const defaultId = direction === "outputs" ? (index === 0 ? "out" : `out${index + 1}`) : (index === 0 ? "in" : `in${index + 1}`);
      const defaultSide = direction === "outputs" ? "right" : "left";
      const id = safeText(port?.id, defaultId).replace(/\s+/g, "-").toLowerCase();
      if (!id || used.has(id)) return null;
      used.add(id);
      return {
        id,
        label: safeText(port?.label, id),
        side: normalizePortSide(port?.side, defaultSide),
        offset: clamp(safeNumber(port?.offset, 0.5), 0, 1),
        important: typeof port?.important === "boolean"
          ? port.important
          : isAutoImportantPort({ id, label: port?.label }, direction),
        style: normalizePortStyle(port?.style),
      };
    })
    .filter(Boolean);
}

function normalizePortStyle(style = {}) {
  const source = isPlainObject(style) ? style : {};
  return {
    fontSize: source.fontSize === null || source.fontSize === "" || source.fontSize === undefined
      ? null
      : clamp(safeNumber(source.fontSize, 10), 8, 18),
    color: isCssHexColor(source.color) ? source.color : "",
    fontWeight: PORT_LABEL_FONT_WEIGHTS.has(String(source.fontWeight || "")) ? String(source.fontWeight) : "",
  };
}

function normalizePortSide(side, fallback = "left") {
  const value = safeText(side, "").toLowerCase();
  const safeFallback = ["left", "right", "top", "bottom"].includes(fallback) ? fallback : "left";
  return ["left", "right", "top", "bottom"].includes(value) ? value : safeFallback;
}

function parseBooleanFlag(value) {
  const text = safeText(value, "").toLowerCase();
  if (!text) return undefined;
  return ["true", "yes", "1", "important", "y"].includes(text);
}

function isAutoImportantPort(port = {}, direction = "") {
  const id = safeText(port.id, "").replace(/[-_\s]/g, "").toLowerCase();
  const label = safeText(port.label, "").replace(/[-_\s]/g, "").toLowerCase();
  if (["in", "out", "feed", "suction", "discharge", "utility"].includes(id)) return false;
  const matchesKnownPort = [...IMPORTANT_PORT_IDS].some((item) => {
    const normalized = item.replace(/[-_\s]/g, "").toLowerCase();
    return id === normalized || label === normalized || id.includes(normalized) || label.includes(normalized);
  });
  return matchesKnownPort
    || (direction === "outputs" && /(product|gasoline|diesel|kerosene|lpg|vgo|resid|bottom|gas|naphtha)/.test(label));
}

function getDefaultPortsForNode(node = {}) {
  const type = safeText(node.type, "").toLowerCase();
  if (type.includes("regenerator")) return getPortPreset("regenerator");
  if (type.includes("column") || type.includes("fractionator")) return getPortPreset("column");
  if (type.includes("reactor")) return getPortPreset("reactor");
  if (type.includes("furnace") || type.includes("heater") || type.includes("exchanger")) return getPortPreset("heater");
  if (type.includes("drum") || type.includes("separator") || type.includes("vessel") || type.includes("desalter")) return getPortPreset("vessel");
  if (type.includes("product pool")) return getPortPreset("product");
  if (type.includes("utility") || type.includes("header")) return getPortPreset("utility");
  if (type.includes("pump") || type.includes("compressor")) {
    return {
      inputs: [{ id: "suction", label: "Suction", side: "left", offset: 0.5 }],
      outputs: [{ id: "discharge", label: "Disch", side: "right", offset: 0.5 }],
    };
  }
  return getPortPreset("default");
}

function getPortPreset(preset = "default") {
  const presets = {
    default: {
      inputs: [{ id: "in", label: "In", side: "left", offset: 0.5 }],
      outputs: [{ id: "out", label: "Out", side: "right", offset: 0.5 }],
    },
    heater: {
      inputs: [
        { id: "in", label: "In", side: "left", offset: 0.5 },
        { id: "feed", label: "Feed", side: "left", offset: 0.58 },
        { id: "utility", label: "Utility", side: "bottom", offset: 0.5 },
      ],
      outputs: [
        { id: "out", label: "Out", side: "right", offset: 0.5 },
        { id: "outlet", label: "Outlet", side: "right", offset: 0.58 },
      ],
    },
    column: {
      inputs: [
        { id: "feed", label: "Feed", side: "left", offset: 0.55 },
        { id: "reflux", label: "Reflux", side: "top", offset: 0.32 },
      ],
      outputs: [
        { id: "overhead", label: "OH", side: "top", offset: 0.62 },
        { id: "naphtha", label: "Naphtha", side: "right", offset: 0.25 },
        { id: "kerosene", label: "Kero", side: "right", offset: 0.42 },
        { id: "diesel", label: "Diesel", side: "right", offset: 0.6 },
        { id: "side1", label: "Side 1", side: "right", offset: 0.34 },
        { id: "side2", label: "Side 2", side: "right", offset: 0.52 },
        { id: "side3", label: "Side 3", side: "right", offset: 0.7 },
        { id: "bottom", label: "Bottom", side: "bottom", offset: 0.5 },
      ],
    },
    reactor: {
      inputs: [
        { id: "feed", label: "Feed", side: "left", offset: 0.45 },
        { id: "utility", label: "Util", side: "bottom", offset: 0.35 },
        { id: "catalyst", label: "Catalyst", side: "bottom", offset: 0.7 },
      ],
      outputs: [
        { id: "product", label: "Prod", side: "right", offset: 0.45 },
        { id: "spent", label: "Spent", side: "bottom", offset: 0.65 },
      ],
    },
    regenerator: {
      inputs: [
        { id: "spent", label: "Spent", side: "top", offset: 0.5 },
        { id: "utility", label: "Air", side: "left", offset: 0.68 },
      ],
      outputs: [
        { id: "regen", label: "Regen", side: "left", offset: 0.35 },
      ],
    },
    vessel: {
      inputs: [
        { id: "in", label: "In", side: "left", offset: 0.5 },
        { id: "inlet", label: "Inlet", side: "left", offset: 0.56 },
      ],
      outputs: [
        { id: "out", label: "Out", side: "right", offset: 0.5 },
        { id: "vapor", label: "Vapor", side: "top", offset: 0.58 },
        { id: "liquid", label: "Liquid", side: "bottom", offset: 0.55 },
        { id: "spent", label: "Spent", side: "bottom", offset: 0.75 },
      ],
    },
    product: {
      inputs: [
        { id: "in", label: "In", side: "left", offset: 0.5 },
        { id: "in1", label: "In 1", side: "left", offset: 0.34 },
        { id: "in2", label: "In 2", side: "left", offset: 0.66 },
      ],
      outputs: [],
    },
    utility: {
      inputs: [],
      outputs: [
        { id: "out", label: "Out", side: "right", offset: 0.5 },
        { id: "out1", label: "Out 1", side: "right", offset: 0.34 },
        { id: "out2", label: "Out 2", side: "right", offset: 0.66 },
      ],
    },
  };
  return deepClone(presets[preset] || presets.default);
}

function getValidPortId(node, direction, portId) {
  if (!node) return "";
  const ports = getNodePorts(node, direction);
  if (!ports.length) return "";
  const requested = safeText(portId, "");
  return ports.some((port) => port.id === requested) ? requested : ports[0].id;
}

function repairStreamsAfterNodePortChange(nodeIdOrTag) {
  const node = resolveBalanceNode(nodeIdOrTag) || nodeByTag.get(nodeIdOrTag);
  if (!node) return 0;
  const outputPorts = getNodePorts(node, "outputs");
  const inputPorts = getNodePorts(node, "inputs");
  let repaired = 0;
  STREAMS.forEach((stream) => {
    if (stream.from === node.tag && outputPorts.length && !outputPorts.some((port) => port.id === stream.fromPort)) {
      stream.fromPort = outputPorts[0].id;
      repaired += 1;
    }
    if (stream.to === node.tag && inputPorts.length && !inputPorts.some((port) => port.id === stream.toPort)) {
      stream.toPort = inputPorts[0].id;
      repaired += 1;
    }
  });
  return repaired;
}

function getNodePorts(node, direction) {
  if (!node) return [];
  const normalized = ensureDefaultPortsForNode(node);
  return Array.isArray(normalized?.[direction]) ? normalized[direction] : [];
}

function getNodePort(node, direction, portId) {
  const ports = getNodePorts(node, direction);
  const safeId = safeText(portId, "");
  return ports.find((port) => port.id === safeId) || ports[0] || null;
}

function getPortDirectionVector(side) {
  switch (side) {
    case "left": return { x: -1, y: 0 };
    case "right": return { x: 1, y: 0 };
    case "top": return { x: 0, y: -1 };
    case "bottom": return { x: 0, y: 1 };
    default: return { x: 1, y: 0 };
  }
}

function getPortPoint(node, direction, portId) {
  const layout = getScopedNodeLayout(node);
  const port = getNodePort(node, direction, portId);
  const fallback = getNodeCenter(node);
  if (!port || !isFiniteRect(layout)) return fallback;
  if (port.side === "left") return { x: layout.x, y: layout.y + layout.height * port.offset, side: port.side };
  if (port.side === "right") return { x: layout.x + layout.width, y: layout.y + layout.height * port.offset, side: port.side };
  if (port.side === "top") return { x: layout.x + layout.width * port.offset, y: layout.y, side: port.side };
  return { x: layout.x + layout.width * port.offset, y: layout.y + layout.height, side: port.side };
}

function getPortStubPoint(portPoint, distance = STREAM_PORT_STUB) {
  if (!isFinitePoint(portPoint)) return { x: 0, y: 0, side: "right" };
  const vector = getPortDirectionVector(portPoint?.side);
  return {
    x: Math.round(Number(portPoint.x) + vector.x * distance),
    y: Math.round(Number(portPoint.y) + vector.y * distance),
    side: portPoint.side,
  };
}

function portsToText(ports = []) {
  return ports.map((port) => (
    `${port.id} | ${port.label} | ${port.side} | ${port.offset} | ${port.important === true ? "true" : ""}`
  )).join("\n");
}

function parsePortsTextarea(value, defaultSide = "right") {
  const used = new Set();
  return String(value || "")
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean)
    .map((line) => {
      const parts = line.split("|").map((part) => part.trim());
      const rawId = parts[0];
      const id = safeText(rawId, "").replace(/\s+/g, "-").toLowerCase();
      if (!id || used.has(id)) return null;
      used.add(id);
      const label = parts[1] || rawId || id;
      const side = normalizePortSide(parts[2] || defaultSide, defaultSide);
      const offsetRaw = Number.parseFloat(parts[3]);
      const offset = Number.isFinite(offsetRaw) ? clamp(offsetRaw, 0, 1) : 0.5;
      const importantRaw = safeText(parts[4], "").toLowerCase();
      const important = ["true", "yes", "1", "important"].includes(importantRaw);
      return { id, label, side, offset, important };
    })
    .filter(Boolean);
}

function serializePortsTextarea(ports = []) {
  return portsToText(ports);
}

function parsePortsText(text, direction) {
  const defaultSide = direction === "outputs" ? "right" : "left";
  const parsed = parsePortsTextarea(text, defaultSide);
  const fallback = direction === "outputs" ? getPortPreset("default").outputs : getPortPreset("default").inputs;
  return normalizePortList(parsed, fallback, direction);
}

function normalizeVisibleIn(value, isMajor = false) {
  if (Array.isArray(value) && value.length) {
    return value.map((item) => safeText(item, "").toLowerCase()).filter(Boolean);
  }
  if (typeof value === "string" && value.trim()) {
    return value.split(",").map((item) => item.trim().toLowerCase()).filter(Boolean);
  }
  return isMajor ? ["refinery", "unit"] : ["unit", "section"];
}

function parseNumericInput(value) {
  if (value === null || value === undefined || value === "") return null;
  if (typeof value === "number") return Number.isFinite(value) ? value : NaN;
  const text = String(value).trim().replace(",", ".");
  if (!text) return null;
  const number = Number(text);
  return Number.isFinite(number) ? number : NaN;
}

function normalizeNullableNumber(value) {
  const number = parseNumericInput(value);
  return number === null || Number.isNaN(number) ? null : number;
}

function normalizeNullableProcessValue(value) {
  if (value === null || value === undefined) return null;
  if (typeof value === "number") return Number.isFinite(value) ? value : null;
  const text = String(value).trim();
  if (!text) return null;
  const number = Number(text);
  return Number.isFinite(number) && String(number) === text ? number : text;
}

function normalizeBalanceType(value) {
  const type = safeText(value, "none");
  return VALID_BALANCE_TYPES.has(type) ? type : "none";
}

function normalizeCduBaseCapacity(value = {}) {
  const source = value && typeof value === "object" && !Array.isArray(value) ? value : {};
  const m3h = Number(source.m3h);
  const mbsd = Number(source.mbsd);
  return {
    m3h: Number.isFinite(m3h) && m3h > 0 ? m3h : CDU_BASE_CAPACITY.m3h,
    mbsd: Number.isFinite(mbsd) && mbsd > 0 ? mbsd : CDU_BASE_CAPACITY.mbsd,
  };
}

function normalizeCduFlowSource(value = {}) {
  const source = value && typeof value === "object" && !Array.isArray(value) ? value : {};
  return {
    sourceNodeId: safeText(source.sourceNodeId, CDU_FLOW_SOURCE.sourceNodeId) || CDU_FLOW_SOURCE.sourceNodeId,
    intakeField: safeText(source.intakeField, CDU_FLOW_SOURCE.intakeField) || CDU_FLOW_SOURCE.intakeField,
  };
}

function mapLegacyPortValueDisplay(source = {}) {
  if (VALID_PORT_VALUE_DISPLAYS.has(source.portValueDisplay)) return source.portValueDisplay;
  if (source.showPortFlow === false) return "off";
  if (source.portFlowMode === "off") return "off";
  if (source.portFlowMode === "compact") return "m3h";
  return "both";
}

function normalizeViewOptions(value = {}) {
  const source = value && typeof value === "object" && !Array.isArray(value) ? value : {};
  const portFlowMode = VALID_PORT_FLOW_MODES.has(source.portFlowMode) ? source.portFlowMode : "full";
  const tableSize = VALID_CDU_TABLE_SIZES.has(source.cduFloatingTableSize) ? source.cduFloatingTableSize : "medium";
  const scale = Number(source.portInfoScale);
  return {
    showNodeBalance: source.showNodeBalance !== false,
    showPortFlow: source.showPortFlow !== false,
    portFlowMode: source.showPortFlow === false ? "off" : portFlowMode,
    portValueDisplay: mapLegacyPortValueDisplay(source),
    portInfoLayout: VALID_PORT_INFO_LAYOUTS.has(source.portInfoLayout) ? source.portInfoLayout : "auto",
    portInfoScale: VALID_PORT_INFO_SCALES.has(scale) ? scale : 1,
    cduTablesVisible: source.cduTablesVisible !== false,
    cduTablesCollapsed: Boolean(source.cduTablesCollapsed),
    cduFloatingTableSize: tableSize,
    cduFloatingTablePosition: normalizeCduFloatingTablePosition(source.cduFloatingTablePosition),
    cduAutoHideTableInPresentation: source.cduAutoHideTableInPresentation !== false,
  };
}

function normalizeCduFloatingTablePosition(value = {}) {
  const source = value && typeof value === "object" && !Array.isArray(value) ? value : {};
  const x = Number(source.x);
  const y = Number(source.y);
  return {
    x: Number.isFinite(x) ? x : CDU_FLOATING_TABLE_DEFAULT_POSITION.x,
    y: Number.isFinite(y) ? y : CDU_FLOATING_TABLE_DEFAULT_POSITION.y,
  };
}

function normalizePortFlowMode(value) {
  const mode = safeText(value, "full");
  return VALID_PORT_FLOW_MODES.has(mode) ? mode : "full";
}

function normalizePortValueDisplay(value) {
  const display = safeText(value, "both");
  return VALID_PORT_VALUE_DISPLAYS.has(display) ? display : "both";
}

function normalizePortInfoLayout(value) {
  const layout = safeText(value, "auto");
  return VALID_PORT_INFO_LAYOUTS.has(layout) ? layout : "auto";
}

function normalizePortInfoScale(value) {
  const scale = Number(value);
  return VALID_PORT_INFO_SCALES.has(scale) ? scale : 1;
}

function normalizeCduFloatingTableSize(value) {
  const size = safeText(value, "medium");
  return VALID_CDU_TABLE_SIZES.has(size) ? size : "medium";
}

function normalizeBalanceScope(value) {
  const scope = safeText(value, "node");
  return scope === "unit" ? "unit" : "node";
}

function normalizeTolerancePercent(value) {
  const number = Number(value);
  return Number.isFinite(number) && number >= 0 ? number : DEFAULT_NODE_TOLERANCE_PERCENT;
}

function normalizeSplitModel(model) {
  if (!model || typeof model !== "object" || Array.isArray(model)) return {};
  return Object.entries(model).reduce((result, [key, value]) => {
    const percent = Number(value);
    if (key && Number.isFinite(percent)) result[key] = percent;
    return result;
  }, {});
}

function normalizeBalanceCategories(value) {
  const source = Array.isArray(value)
    ? value
    : typeof value === "string"
      ? value.split(",")
      : HYDROCARBON_BALANCE_CATEGORIES;
  const categories = source
    .map((item) => safeText(item, "").trim())
    .filter((item) => VALID_BALANCE_CATEGORIES.has(item));
  return categories.length ? Array.from(new Set(categories)) : HYDROCARBON_BALANCE_CATEGORIES;
}

function apiFromSG(sg) {
  const value = Number(sg);
  if (!value || !Number.isFinite(value) || value <= 0) return null;
  return roundFlowrate((141.5 / value) - 131.5);
}

function sgFromApi(api) {
  const value = Number(api);
  if (!Number.isFinite(value)) return null;
  return roundFlowrate(141.5 / (value + 131.5));
}

function classifyCrudeByApi(api) {
  const value = Number(api);
  if (Number.isNaN(value) || !Number.isFinite(value)) return "";
  if (value > 31.1) return "light";
  if (value >= 22.3) return "medium";
  if (value >= 10) return "heavy";
  return "extraHeavy";
}

function mapCrudeClassificationToAssayType(classification) {
  const normalized = safeText(classification, "medium");
  if (normalized === "extraHeavy") return "heavy";
  return CDU_CRUDE_ASSAYS[normalized] ? normalized : DEFAULT_CDU_RUN_STATE.selectedCrudeType;
}

function getDefaultCrudeSGForType(crudeType) {
  const defaults = {
    light: 0.85,
    medium: 0.886,
    heavy: 0.93,
  };
  return defaults[crudeType] || DEFAULT_CDU_RUN_STATE.crudeSG;
}

function formatCrudeClassificationLabel(classification) {
  const labels = {
    light: "Light",
    medium: "Medium",
    heavy: "Heavy",
    extraHeavy: "Extra Heavy",
  };
  return labels[classification] || "-";
}

function normalizeCrudeBlendFlowUnit(unit) {
  return safeText(unit, DEFAULT_FLOW_UNIT).toUpperCase() === "MBSD" ? "MBSD" : "m3/h";
}

function convertFlowToM3H(value, unit = DEFAULT_FLOW_UNIT) {
  const numeric = Number(value);
  if (!Number.isFinite(numeric) || numeric <= 0) return 0;
  return normalizeCrudeBlendFlowUnit(unit) === "MBSD" ? (convertMBSDToM3H(numeric) || 0) : numeric;
}

function makeCrudeBlendComponentId() {
  return `crude-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 6)}`;
}

function normalizeCrudeBlendComponent(component = {}, index = 0) {
  const sg = normalizeNullableNumber(component.sg);
  const flowrate = normalizeNullableNumber(component.flowrate);
  const normalizedSg = sg !== null && sg > 0 ? sg : getDefaultCrudeSGForType(DEFAULT_CDU_RUN_STATE.selectedCrudeType);
  const api = apiFromSG(normalizedSg);
  const classification = classifyCrudeByApi(api);
  return {
    id: safeText(component.id, `crude-${index + 1}`),
    name: safeText(component.name, `Crude ${String.fromCharCode(65 + index)}`),
    sg: normalizedSg,
    flowrate: flowrate !== null && flowrate > 0 ? flowrate : 0,
    flowUnit: normalizeCrudeBlendFlowUnit(component.flowUnit),
    api,
    classification,
  };
}

function calculateCrudeBlend(components = []) {
  const valid = (Array.isArray(components) ? components : [])
    .map((component, index) => {
      const normalized = normalizeCrudeBlendComponent(component, index);
      return {
        ...normalized,
        flowM3H: convertFlowToM3H(normalized.flowrate, normalized.flowUnit),
        sg: Number(normalized.sg),
      };
    })
    .filter((component) => component.flowM3H > 0 && component.sg > 0);
  const totalFlowM3H = valid.reduce((sum, component) => sum + component.flowM3H, 0);
  if (!totalFlowM3H) {
    return {
      components: (Array.isArray(components) ? components : []).map(normalizeCrudeBlendComponent),
      totalFlowM3H: 0,
      blendSG: null,
      blendAPI: null,
      blendClassification: "",
    };
  }
  const blendSG = valid.reduce((sum, component) => sum + component.sg * component.flowM3H, 0) / totalFlowM3H;
  const blendAPI = apiFromSG(blendSG);
  const blendClassification = classifyCrudeByApi(blendAPI);
  return {
    components: (Array.isArray(components) ? components : []).map(normalizeCrudeBlendComponent),
    totalFlowM3H: roundFlowrate(totalFlowM3H),
    blendSG: roundFlowrate(blendSG),
    blendAPI,
    blendClassification,
  };
}

function createDefaultCrudeBlend(source = {}) {
  const sg = normalizeNullableNumber(source.crudeSG) || DEFAULT_CDU_RUN_STATE.crudeSG;
  const flowrate = normalizeNullableNumber(source.crudeIntakeM3H) || DEFAULT_CDU_RUN_STATE.crudeIntakeM3H;
  return calculateCrudeBlend([
    {
      id: "crude-1",
      name: "Crude A",
      sg,
      flowrate,
      flowUnit: "m3/h",
    },
  ]);
}

function normalizeCduRunState(value = {}) {
  const source = value && typeof value === "object" && !Array.isArray(value) ? value : {};
  const sourceSg = normalizeNullableNumber(source.crudeSG);
  const crudeSG = sourceSg !== null && sourceSg > 0
    ? sourceSg
    : getDefaultCrudeSGForType(source.selectedCrudeType || DEFAULT_CDU_RUN_STATE.selectedCrudeType);
  const crudeAPI = normalizeNullableNumber(source.crudeAPI) ?? apiFromSG(crudeSG);
  const crudeClassification = safeText(source.crudeClassification, classifyCrudeByApi(crudeAPI) || DEFAULT_CDU_RUN_STATE.crudeClassification);
  const crudeBlend = calculateCrudeBlend(Array.isArray(source.crudeBlend?.components) && source.crudeBlend.components.length
    ? source.crudeBlend.components
    : createDefaultCrudeBlend({ ...source, crudeSG }).components);
  const hasBlendClassification = Boolean(crudeBlend.blendClassification);
  const blendClassification = safeText(crudeBlend.blendClassification, crudeClassification);
  const effectiveClassification = hasBlendClassification ? blendClassification : crudeClassification;
  const effectiveSG = hasBlendClassification && Number.isFinite(Number(crudeBlend.blendSG)) ? crudeBlend.blendSG : crudeSG;
  const effectiveAPI = hasBlendClassification && Number.isFinite(Number(crudeBlend.blendAPI)) ? crudeBlend.blendAPI : crudeAPI;
  const mappedType = mapCrudeClassificationToAssayType(effectiveClassification);
  const blendComponentCount = Array.isArray(source.crudeBlend?.components) ? source.crudeBlend.components.length : 0;
  const selectedCrudeType = hasBlendClassification && blendComponentCount > 1
    ? mappedType
    : CDU_CRUDE_ASSAYS[source.selectedCrudeType]
    ? source.selectedCrudeType
    : mappedType;
  const intakeUnit = safeText(source.intakeUnit, DEFAULT_CDU_RUN_STATE.intakeUnit) === "mbsd" ? "mbsd" : "m3h";
  let intakeM3H = Number.isFinite(Number(source.crudeIntakeM3H)) && Number(source.crudeIntakeM3H) > 0
    ? Number(source.crudeIntakeM3H)
    : DEFAULT_CDU_RUN_STATE.crudeIntakeM3H;
  let intakeMBSD = Number.isFinite(Number(source.crudeIntakeMBSD)) && Number(source.crudeIntakeMBSD) > 0
    ? Number(source.crudeIntakeMBSD)
    : convertM3HToMBSD(intakeM3H);
  if (intakeUnit === "mbsd" && Number.isFinite(Number(intakeMBSD)) && intakeMBSD > 0) {
    intakeM3H = convertMBSDToM3H(intakeMBSD) || intakeM3H;
  } else {
    intakeMBSD = convertM3HToMBSD(intakeM3H) || DEFAULT_CDU_RUN_STATE.crudeIntakeMBSD;
  }
  return {
    selectedCrudeType,
    crudeSG: effectiveSG,
    crudeAPI: effectiveAPI,
    crudeClassification: effectiveClassification,
    crudeBlend,
    crudeIntakeM3H: roundFlowrate(intakeM3H),
    crudeIntakeMBSD: roundFlowrate(intakeMBSD),
    intakeUnit,
    crudeIntake: roundFlowrate(intakeM3H),
    hasStarted: Boolean(source.hasStarted),
    lastRunAt: source.lastRunAt || null,
    lastResult: source.lastResult && typeof source.lastResult === "object" ? deepClone(source.lastResult) : null,
  };
}

function normalizeStreamPhase(value) {
  const phase = safeText(value, "liquid");
  return VALID_STREAM_PHASES.has(phase) ? phase : "liquid";
}

function normalizeBalanceCategory(value) {
  const category = safeText(value, "hydrocarbon");
  return VALID_BALANCE_CATEGORIES.has(category) ? category : "hydrocarbon";
}

function normalizeStreamBalanceRole(value) {
  const role = safeText(value, "internal");
  return VALID_STREAM_BALANCE_ROLES.has(role) ? role : "internal";
}

function normalizeStreamConstraintRole(value) {
  const role = safeText(value, "normal");
  return VALID_STREAM_CONSTRAINT_ROLES.has(role) ? role : "normal";
}

function normalizeStreamFlowRangeUnit(value) {
  const raw = safeText(value, DEFAULT_FLOW_UNIT).trim();
  const lowered = raw.toLowerCase();
  if (lowered === "mbsd") return "MBSD";
  if (lowered.includes("m3") || lowered.includes("m³") || lowered.includes("m^3")) return "m3/h";
  return DEFAULT_FLOW_UNIT;
}

function normalizeStreamRangeStatus(value) {
  const status = safeText(value, "not-set");
  return ["ok", "low", "high", "not-set", "target-active", "target-ok", "target-miss", "locked", "adjusted", "over-constrained"].includes(status) ? status : "not-set";
}

function normalizeStreamRangeMode(value) {
  const mode = safeText(value, "monitor");
  return VALID_STREAM_RANGE_MODES.has(mode) ? mode : "monitor";
}

function normalizeTargetSolveMode(value) {
  const mode = safeText(value, "adjust-siblings");
  return VALID_TARGET_SOLVE_MODES.has(mode) ? mode : "adjust-siblings";
}

function hasActiveConstraint(stream) {
  if (!stream) return false;
  const hasValue = (value) => value !== null && value !== undefined && value !== "";
  return Boolean(
    stream.useAsCalculationTarget === true
      || normalizeStreamRangeMode(stream.rangeMode) === "control-target"
      || normalizeStreamRangeMode(stream.rangeMode) === "locked-flow"
      || hasValue(stream.flowMin)
      || hasValue(stream.flowTarget)
      || hasValue(stream.flowMax)
      || hasValue(stream.lockedFlow)
  );
}

function hasAnyActiveConstraint(streams = STREAMS) {
  return (Array.isArray(streams) ? streams : []).some((stream) => hasActiveConstraint(stream));
}

function resetStreamConstraint(stream) {
  if (!stream) return null;
  stream.flowMin = null;
  stream.flowTarget = null;
  stream.flowMax = null;
  stream.flowRangeUnit = "MBSD";
  stream.rangeMode = "monitor";
  stream.useAsCalculationTarget = false;
  stream.calculationPriority = 100;
  stream.targetSolveMode = "adjust-siblings";
  stream.targetTolerancePercent = DEFAULT_NODE_TOLERANCE_PERCENT;
  stream.lockedFlow = null;
  stream.allowAutoAdjust = false;
  stream.rangeStatus = "not-set";
  clearStreamRuntimeArtifacts(stream);
  return stream;
}

function clearStreamRuntimeArtifacts(stream) {
  if (!stream) return;
  delete stream.runtimeRange;
  delete stream.runtimeTarget;
  delete stream.runtimeTargetResult;
  delete stream.runtimeBadge;
  delete stream.targetStatus;
  delete stream.adjustedStatus;
  delete stream.runtimeRecycleCandidate;
}

function clearNodeRuntimeArtifacts(node) {
  if (!node) return;
  delete node.targetSolverStatus;
  delete node.targetSolverMessage;
  delete node.targetSolverTargetSum;
  delete node.targetSolverAvailableFlow;
  delete node.targetSolverDifference;
}

function clearMassBalanceRuntimeArtifacts() {
  state.massBalanceRuntime = {
    streams: {},
    nodes: {},
    productRows: [],
    feedRows: [],
    targetSolver: {
      status: "off",
      messages: [],
      targetResults: {},
    },
  };
  state.massBalanceTargetResult = null;
  state.targetSolver = state.massBalanceRuntime.targetSolver;
  state.cduTargetOkProductKeys = new Set();
  STREAMS.forEach((stream) => {
    clearStreamRuntimeArtifacts(stream);
    if (!hasActiveConstraint(stream)) {
      stream.rangeStatus = "not-set";
      stream.useAsCalculationTarget = false;
      if (normalizeStreamRangeMode(stream.rangeMode) !== "monitor") stream.rangeMode = "monitor";
    }
  });
  NODES.forEach(clearNodeRuntimeArtifacts);
}

function applyDefaultStreamMassFields(stream) {
  if (!stream || typeof stream !== "object") return stream;
  stream.flowrate = normalizeNullableNumber(stream.flowrate);
  stream.flowUnit = safeText(stream.flowUnit, DEFAULT_FLOW_UNIT);
  stream.flowM3H = normalizeNullableNumber(stream.flowM3H);
  if (stream.flowM3H === null && stream.flowrate !== null) {
    stream.flowM3H = getStreamFlowM3H(stream);
  }
  stream.flowMBSD = normalizeNullableNumber(stream.flowMBSD);
  stream.percentCap = normalizeNullableNumber(stream.percentCap);
  if (stream.flowM3H !== null) updateStreamVolumeMetrics(stream, stream.flowM3H);
  stream.phase = normalizeStreamPhase(stream.phase || inferPhaseFromStream(stream));
  stream.balanceCategory = normalizeBalanceCategory(stream.balanceCategory || inferBalanceCategory(stream));
  stream.isCalculated = typeof stream.isCalculated === "boolean" ? stream.isCalculated : false;
  stream.isFinalProduct = typeof stream.isFinalProduct === "boolean" ? stream.isFinalProduct : false;
  stream.includeInProductTable = typeof stream.includeInProductTable === "boolean"
    ? stream.includeInProductTable
    : Boolean(stream.isFinalProduct);
  stream.includeInFeedTable = typeof stream.includeInFeedTable === "boolean"
    ? stream.includeInFeedTable
    : stream.id === "S-CDU-001";

  stream.balanceRole = normalizeStreamBalanceRole(stream.balanceRole || (stream.isFinalProduct ? "product" : "internal"));
  stream.isRecycle = stream.isRecycle === true || stream.balanceRole === "recycle";
  stream.includeInNodeBalance = typeof stream.includeInNodeBalance === "boolean" ? stream.includeInNodeBalance : true;
  stream.includeInUnitBalance = typeof stream.includeInUnitBalance === "boolean" ? stream.includeInUnitBalance : true;
  if (stream.isRecycle || stream.balanceRole === "recycle") {
    stream.balanceRole = "recycle";
    stream.isRecycle = true;
    stream.includeInNodeBalance = false;
    if (typeof stream.includeInUnitBalance !== "boolean") stream.includeInUnitBalance = true;
  }

  stream.flowMin = normalizeNullableNumber(stream.flowMin);
  stream.flowTarget = normalizeNullableNumber(stream.flowTarget);
  stream.flowMax = normalizeNullableNumber(stream.flowMax);
  stream.flowRangeUnit = normalizeStreamFlowRangeUnit(stream.flowRangeUnit || stream.flowUnit || DEFAULT_FLOW_UNIT);
  stream.temperatureMin = normalizeNullableNumber(stream.temperatureMin);
  stream.temperatureTarget = normalizeNullableNumber(stream.temperatureTarget);
  stream.temperatureMax = normalizeNullableNumber(stream.temperatureMax);
  stream.pressureMin = normalizeNullableNumber(stream.pressureMin);
  stream.pressureTarget = normalizeNullableNumber(stream.pressureTarget);
  stream.pressureMax = normalizeNullableNumber(stream.pressureMax);
  stream.downstreamUse = safeText(stream.downstreamUse, "");
  stream.constraintRole = normalizeStreamConstraintRole(stream.constraintRole);
  stream.constraintGroup = safeText(stream.constraintGroup, "");
  stream.rangeStatus = normalizeStreamRangeStatus(stream.rangeStatus);
  stream.rangeMode = normalizeStreamRangeMode(stream.rangeMode);
  stream.useAsCalculationTarget = typeof stream.useAsCalculationTarget === "boolean"
    ? stream.useAsCalculationTarget
    : stream.rangeMode === "control-target" || stream.rangeMode === "locked-flow";
  stream.calculationPriority = Number.isFinite(Number(stream.calculationPriority)) ? Number(stream.calculationPriority) : 100;
  stream.targetSolveMode = normalizeTargetSolveMode(stream.targetSolveMode);
  stream.targetTolerancePercent = normalizeTolerancePercent(stream.targetTolerancePercent);
  stream.allowAutoAdjust = typeof stream.allowAutoAdjust === "boolean" ? stream.allowAutoAdjust : false;
  stream.lockedFlow = normalizeNullableNumber(stream.lockedFlow);
  clearStreamRuntimeArtifacts(stream);
  if (!hasActiveConstraint(stream)) {
    stream.rangeStatus = "not-set";
    stream.useAsCalculationTarget = false;
    stream.rangeMode = "monitor";
  }
  return stream;
}

function inferPhaseFromStream(stream) {
  if (stream?.type === "gas" || stream?.category === "gas") return "gas";
  if (stream?.type === "water") return "water";
  if (stream?.type === "solid") return "solid";
  return "liquid";
}

function inferBalanceCategory(stream) {
  if (stream?.type === "water") return "water";
  const category = safeText(stream?.category, "").toLowerCase();
  if (category === "utility" || category === "hydrogen") return "utility";
  if (category === "loss") return "loss";
  return "hydrocarbon";
}

function getDefaultVisibleInForCurrentScope() {
  if (state.currentScope === "refinery") return ["refinery", "unit", "section"];
  if (state.currentScope === "unit") return ["unit", "section"];
  if (state.currentScope === "section") return ["section", "unit"];
  return ["unit", "section"];
}

function isInCurrentScope(item) {
  if (!item) return false;
  if (state.currentScope === "refinery") return normalizeVisibleIn(item.visibleIn, item.isMajor).includes("refinery");
  if (state.currentScope === "unit") return sameUnit(item.unit, state.currentUnit);
  if (state.currentScope === "section") {
    return sameUnit(item.unit, state.currentUnit) && sameSection(item.section, state.currentSection);
  }
  if (state.currentScope === "equipment") {
    const selected = nodeById.get(state.selectedNodeId);
    return selected && (item.tag === selected.tag || item.from === selected.tag || item.to === selected.tag);
  }
  return true;
}

function getCanvasCenter() {
  const rect = els.canvasViewport?.getBoundingClientRect?.();
  if (rect?.width && rect?.height) {
    return screenToCanvas(rect.width / 2, rect.height / 2);
  }
  return { x: CANVAS.width / 2, y: CANVAS.height / 2 };
}

function getBestAreaForPosition(point = getCanvasCenter()) {
  const area = AREAS.find((item) => pointInRect(point, item));
  if (area) return area.id;
  return getAreaForUnit(state.currentUnit)?.id || AREAS[0]?.id || "AREA-1";
}

function inferUnitFromArea(areaId) {
  const area = AREAS.find((item) => item.id === areaId);
  return area?.name || "-";
}

function inferNodeSection(node) {
  const unit = safeText(node.unit, "").toUpperCase();
  const tag = safeText(node.tag, "");
  const type = safeText(node.type, "").toLowerCase();
  if (unit === "CDU") {
    if (tag === "D-101") return "Overhead System";
    if (tag === "F-101") return "Furnace";
    if (tag === "C-101") return "Atmospheric Fractionation";
    if (tag === "TK-101" || tag === "E-101" || tag === "V-101") return "Feed Preparation";
    return "Product Draw";
  }
  if (unit === "HVU") {
    if (tag === "F-201" || tag === "P-201") return "Feed Heater";
    if (tag === "C-201") return "Vacuum Column";
    if (tag === "V-201") return "Vacuum System";
    return "VGO Draw";
  }
  if (unit === "HCC") {
    if (tag === "D-301" || tag === "F-301") return "Feed System";
    if (tag === "R-301") return "Reaction Section";
    if (tag === "V-301") return "High Pressure Separation";
    if (tag === "K-301") return "Hydrogen System";
    if (tag === "C-301") return "Fractionation";
  }
  if (unit === "RFCC") {
    if (tag === "D-401") return "Feed System";
    if (tag === "R-401") return "Riser Reactor";
    if (tag === "R-402") return "Regenerator";
    if (tag === "V-401") return "Catalyst Circulation";
    if (tag === "C-401") return "Main Fractionator";
    if (tag === "K-401") return "Gas Recovery";
  }
  if (unit === "UTILITIES" || type.includes("utility")) return "Utilities";
  if (unit === "PRODUCTS" || type.includes("product")) return "Product Pool";
  return safeText(node.area, "General");
}

function inferNodeIsMajor(node) {
  const tag = safeText(node.tag, "");
  const type = safeText(node.type, "").toLowerCase();
  return [
    "C-101", "D-101", "P-201", "C-201", "D-301", "R-301", "C-301",
    "D-401", "R-401", "V-401", "R-402", "C-401", "K-401",
    "H2-001", "STM-001", "POOL-LPG", "POOL-NAP", "POOL-KERO", "POOL-DIESEL", "POOL-LCO",
  ].includes(tag)
    || type.includes("column")
    || type.includes("reactor")
    || type.includes("fractionator")
    || type.includes("product pool");
}

function inferStreamUnit(stream, from, to) {
  if (from?.unit && to?.unit && from.unit === to.unit) return from.unit;
  return "INTERUNIT";
}

function inferStreamSection(stream, from, to) {
  if (from?.section && to?.section && from.section === to.section) return from.section;
  return safeText(from?.section || to?.section, "Inter-unit Transfer");
}

function inferStreamCategory(stream) {
  if (stream.type === "gas") return "gas";
  if (stream.type === "air" || stream.type === "water") return "utility";
  if (stream.type === "solid") return "catalyst";
  const label = safeText(stream.label, "").toLowerCase();
  if (label.includes("residue") || label.includes("heavy") || label.includes("uco")) return "heavy";
  if (label.includes("pool") || label.includes("product") || label.includes("lpg") || label.includes("diesel") || label.includes("naphtha")) return "product";
  return "main";
}

function inferStreamIsMajor(stream) {
  return [
    "S-001", "S-009", "S-013", "S-015", "S-024", "S-025", "S-026", "S-032", "S-033", "S-036",
  ].includes(stream.id)
    || safeText(stream.unit, "").toUpperCase() === "INTERUNIT";
}

function applyCleanCanvasPreset(config) {
  if (!config) return 0;
  if (config.dataVersion === PFD_DATA_VERSION) return 0;
  Object.entries(CLEAN_AREA_LAYOUT).forEach(([areaId, layout]) => {
    const area = config.areas?.find((item) => item.id === areaId);
    if (area) Object.assign(area, layout);
  });
  Object.entries(CLEAN_NODE_LAYOUT).forEach(([tag, layout]) => {
    const node = config.nodes?.find((item) => item.tag === tag);
    if (node) Object.assign(node, layout);
  });
  if (Number(config.streamVersion || 0) >= STREAM_CONFIG_VERSION) return 0;
  return applyCleanRoutePreset(config.streams || []);
}

function applyCleanRoutePreset(streams) {
  let changed = 0;
  streams.forEach((stream) => {
    const route = CLEAN_STREAM_ROUTES[stream.id];
    if (!route) return;
    if (route.shape) stream.shape = route.shape;
    if (route.type) stream.type = route.type;
    if (Number.isFinite(Number(route.strokeWidth))) {
      stream.strokeWidth = Number(route.strokeWidth);
    }
    if (Array.isArray(route.points) && route.points.length) {
      stream.points = deepClone(route.points);
    } else {
      delete stream.points;
    }
    changed += 1;
  });
  return changed;
}

function isConfigShapeValid(config) {
  const result = validateConfigShape(config);
  if (!result.valid) {
    console.warn("Config RefineryMap tidak valid:", result.issues);
  }
  return result.valid;
}

function getCurrentConfig() {
  const serializableNodes = NODES.map((node) => {
    const copy = { ...node };
    delete copy.balanceStatus;
    delete copy.balanceResult;
    delete copy.localBalanceResult;
    delete copy.targetSolverStatus;
    delete copy.targetSolverMessage;
    delete copy.targetSolverTargetSum;
    delete copy.targetSolverAvailableFlow;
    delete copy.targetSolverDifference;
    return copy;
  });
  const serializableStreams = STREAMS.map((stream) => {
    const copy = { ...stream };
    delete copy.runtimeRange;
    delete copy.runtimeTarget;
    delete copy.runtimeTargetResult;
    delete copy.runtimeBadge;
    delete copy.runtimeRecycleCandidate;
    delete copy.targetStatus;
    delete copy.adjustedStatus;
    copy.rangeStatus = hasActiveConstraint(copy) ? normalizeStreamRangeStatus(copy.rangeStatus) : "not-set";
    return copy;
  });
  return deepClone({
    version: 4,
    dataVersion: PFD_DATA_VERSION,
    streamVersion: STREAM_CONFIG_VERSION,
    userModified: Boolean(state.userModified),
    updatedAt: new Date().toISOString(),
    canvas: CANVAS,
    areas: AREAS,
    nodes: serializableNodes,
    streams: serializableStreams,
    pidSymbols: PID_SYMBOLS,
    pidConnectors: PID_CONNECTORS,
    cduRunState: normalizeCduRunState(state.cduRunState),
    cduBaseCapacity: normalizeCduBaseCapacity(state.cduBaseCapacity),
    cduFlowSource: normalizeCduFlowSource(state.cduFlowSource),
    viewOptions: {
      showNodeBalance: state.showNodeBalance !== false,
      showPortFlow: state.showPortFlow !== false,
      portFlowMode: normalizePortFlowMode(state.portFlowMode),
      portValueDisplay: normalizePortValueDisplay(state.portValueDisplay),
      portInfoLayout: normalizePortInfoLayout(state.portInfoLayout),
      portInfoScale: normalizePortInfoScale(state.portInfoScale),
      cduTablesVisible: state.cduTablesVisible !== false,
      cduTablesCollapsed: Boolean(state.cduTablesCollapsed),
      cduFloatingTableSize: normalizeCduFloatingTableSize(state.cduFloatingTableSize),
      cduFloatingTablePosition: normalizeCduFloatingTablePosition(state.cduFloatingTablePosition),
      cduAutoHideTableInPresentation: state.cduAutoHideTableInPresentation !== false,
    },
  });
}

function getActiveCanvasConfig() {
  return getCurrentConfig();
}

function cloneSerializableData(value) {
  try {
    return structuredClone(value);
  } catch {
    return deepClone(value);
  }
}

function initializeHistorySnapshot() {
  state.undoStack = [];
  state.redoStack = [];
  state.historySnapshot = cloneSerializableData(getCurrentConfig());
  state.isRestoringHistory = false;
  updateUndoRedoButtons();
}

function pushUndoSnapshot(reason = "Perubahan") {
  if (state.isRestoringHistory) return;
  const snapshot = state.historySnapshot || cloneSerializableData(getCurrentConfig());
  state.undoStack.push(cloneSerializableData(snapshot));
  if (state.undoStack.length > MAX_HISTORY) state.undoStack.shift();
  state.redoStack = [];
  state.lastUndoReason = reason;
  updateUndoRedoButtons();
}

function updateUndoRedoButtons() {
  if (els.undoButton) els.undoButton.disabled = !state.undoStack.length;
  if (els.redoButton) els.redoButton.disabled = !state.redoStack.length;
}

function restoreHistorySnapshot(snapshot, label = "History restored") {
  if (!snapshot) return;
  state.isRestoringHistory = true;
  try {
    hydrateConfig(snapshot);
    state.userModified = Boolean(snapshot.userModified);
    saveCurrentConfig(label, { silentToast: true, skipHistorySnapshot: true });
    state.historySnapshot = cloneSerializableData(getCurrentConfig());
    refreshAfterAdminChange({ focusSelected: false });
  } catch (error) {
    console.error("Gagal restore history:", error);
    showToast("Undo/Redo gagal memulihkan data", "error");
  } finally {
    state.isRestoringHistory = false;
    updateUndoRedoButtons();
  }
}

function undo() {
  if (!state.undoStack.length || state.isRestoringHistory) return;
  const current = cloneSerializableData(getCurrentConfig());
  const previous = state.undoStack.pop();
  state.redoStack.push(current);
  restoreHistorySnapshot(previous, "Undo diterapkan");
  showToast("Undo", "info");
}

function redo() {
  if (!state.redoStack.length || state.isRestoringHistory) return;
  const current = cloneSerializableData(getCurrentConfig());
  const next = state.redoStack.pop();
  state.undoStack.push(current);
  restoreHistorySnapshot(next, "Redo diterapkan");
  showToast("Redo", "info");
}

function saveCurrentConfig(message = "Config tersimpan", options = {}) {
  state.userModified = true;
  updateAutosaveIndicator("Menyimpan...", "saving");
  try {
    // Autosave tetap lokal agar admin bisa mengedit tanpa backend.
    safeLocalStorageSet(ADMIN_STORAGE_KEY, JSON.stringify(getActiveCanvasConfig()));
    renderConfigSummary();
    updateAutosaveIndicator("Autosaved locally", "saved");
    updateDeploymentStatus("Autosaved locally", "local");
    if (!options.skipHistorySnapshot) {
      state.historySnapshot = cloneSerializableData(getCurrentConfig());
      updateUndoRedoButtons();
    }
    if (!options.silentToast) {
      const compactSave = /\b(Stream|Node|Area|P&ID|Koneksi|Jalur|Titik)\b/i.test(message);
      showToast(message, "success", { duration: options.toastDuration || (compactSave ? 1400 : undefined) });
    }
    return true;
  } catch (error) {
    console.error(error);
    updateAutosaveIndicator("Gagal simpan", "error");
    showToast("Gagal menyimpan config ke localStorage", "error");
    return false;
  }
}

function commitDataChange(reason = "Config tersimpan", options = {}) {
  try {
    if (!options.skipHistory) pushUndoSnapshot(reason);
    return refreshMassBalanceAfterDataChange(reason, options);
  } catch (error) {
    console.error(`Gagal commit data: ${reason}`, error);
    showToast("Perubahan gagal diterapkan. Cek data editor.", "error");
    return false;
  }
}

function clearAllBalanceResults() {
  if (!state.massBalanceResults || typeof state.massBalanceResults.clear !== "function") {
    state.massBalanceResults = new Map();
  }
  state.massBalanceResults.clear();
  state.massBalanceRuntime = null;
  NODES.forEach((node) => {
    node.balanceResult = null;
    node.localBalanceResult = null;
    node.balanceStatus = null;
    clearNodeRuntimeArtifacts(node);
  });
  document.querySelectorAll(".process-node, .canvas-node, .node").forEach((element) => {
    element.classList.remove(
      "balance-balanced",
      "balance-warning",
      "balance-error",
      "balance-incomplete",
      "balance-not-started",
    );
  });
}

function findStreamById(streamId) {
  const id = safeText(streamId, "");
  return id ? STREAMS.find((stream) => stream.id === id) || null : null;
}

function recalculateDerivedCduStreamsIfStarted() {
  const runState = normalizeCduRunState(state.cduRunState);
  if (!runState.hasStarted) return;
  propagateCduFlowFromSource();
}

function renderFloatingMassBalanceTables() {
  renderCduFloatingTables();
}

function updateDetailPanelIfOpen() {
  if (!isDetailPanelOpen()) return;
  const activeNode = nodeById.get(state.selectedNodeId);
  const activeStream = findStreamById(state.activeStreamId);
  if (activeNode) {
    renderDetail(activeNode);
  } else if (activeStream) {
    renderStreamDetail(activeStream);
  } else {
    closeDetailPanel();
  }
}

function updateQuickInspectorIfOpen() {
  renderQuickInspector();
}

function saveConfigToLocalStorage(reason = "Config tersimpan", options = {}) {
  return saveCurrentConfig(reason, options);
}

function refreshMassBalanceAfterDataChange(reason = "data-change", options = {}) {
  clearAllBalanceResults();
  normalizeData();
  normalizeAllStreams();
  clearMassBalanceRuntimeArtifacts();
  detectMassBalanceCycles(NODES, getActiveStreams());
  const graph = rebuildCduConnectivityGraph();
  resetAllStreamCalculatedFlows();
  const runState = normalizeCduRunState(state.cduRunState);
  const activeConstraints = hasAnyActiveConstraint(STREAMS);
  state.cduSolvedProductFlows = null;
  if (runState.hasStarted) {
    propagateCduFlowFromSource();
    if (activeConstraints) {
      runTargetDrivenMassBalance();
    } else {
      state.massBalanceTargetResult = null;
      state.targetSolver = {
        status: "off",
        messages: [],
        targetResults: {},
      };
    }
  } else {
    state.cduReachableNodeIds = findDownstreamNodesFromSource(graph);
    state.massBalanceTargetResult = null;
    state.targetSolver = {
      status: "off",
      messages: [],
      targetResults: {},
    };
  }
  clearAllBalanceResults();
  calculateAllNodeMassBalances();
  calculateCduOverallMassBalance();
  evaluateAllStreamRanges();
  state.massBalanceConstraintGroups = evaluateConstraintGroups();
  state.massBalanceRuntime = buildMassBalanceRuntime();
  applyRuntimeMassBalanceStatusToNodes(state.massBalanceRuntime);
  state.massBalanceRuntime = buildMassBalanceRuntime();
  state.cduProductMassBalanceTable = state.massBalanceRuntime.productRows;
  state.cduFeedMassBalanceTable = state.massBalanceRuntime.feedRows;
  applyMassBalanceStatusToAllNodes();

  if (MASS_BALANCE_DEBUG) {
    console.debug("[MassBalance]", reason, {
      nodes: NODES.length,
      streams: STREAMS.length,
      activeStreams: getActiveStreams().length,
      results: state.massBalanceResults?.size || 0,
    });
    console.debug("[MassBalance] runtime stream values", state.massBalanceRuntime?.streams || {});
    console.debug("[MassBalance] floating table rows", state.massBalanceRuntime?.productRows || []);
    console.debug("[TargetSolver] target results", state.targetSolver || {});
  }
  console.log("[Constraint] active?", activeConstraints);
  console.log("[Constraint] active streams", STREAMS.filter(hasActiveConstraint).map((stream) => ({
    id: stream.id,
    label: stream.label,
    flowMin: stream.flowMin,
    flowTarget: stream.flowTarget,
    flowMax: stream.flowMax,
    rangeMode: stream.rangeMode,
    useAsCalculationTarget: stream.useAsCalculationTarget,
  })));
  console.log("[Runtime] streams", state.massBalanceRuntime?.streams);
  console.log("[Runtime] productRows", state.massBalanceRuntime?.productRows);

  renderCanvas();
  renderStreams();
  renderPortFlowBadges();
  renderFloatingMassBalanceTables();
  renderAdminPanel();
  renderPresentationAreaOptions();
  updateCduRunControls();
  syncSelectionAfterAdminChange(options);
  updateDetailPanelIfOpen();
  updateQuickInspectorIfOpen();
  renderConfigSummary();

  if (options.save === false) return true;
  return saveConfigToLocalStorage(reason, {
    skipHistorySnapshot: options.skipHistorySnapshot,
    silentToast: options.silentToast,
  });
}

window.debugClearAllConstraints = function debugClearAllConstraints() {
  STREAMS.forEach((stream) => resetStreamConstraint(stream));
  clearMassBalanceRuntimeArtifacts();
  refreshMassBalanceAfterDataChange("Debug: all constraints cleared", {
    focusSelected: false,
    toastDuration: 1400,
  });
  console.log("[Debug] All constraints cleared");
};

async function resetStoredConfig() {
  if (!requireEditMode("Reset Config")) return;
  const confirmed = window.confirm("Reset semua perubahan admin dan kembali ke default deployment/refinery sample?");
  if (!confirmed) return;

  safeLocalStorageRemove(ADMIN_STORAGE_KEY);
  state.userModified = false;
  await loadDeploymentDefaultOrInternalConfig("", "Default");
  refreshMassBalanceAfterDataChange("reset-config", { save: false });
  try {
    safeLocalStorageSet(ADMIN_STORAGE_KEY, JSON.stringify(getCurrentConfig()));
  } catch (error) {
    console.warn("Gagal menyimpan default setelah reset:", error);
  }
  updateCduRunControls();
  updateAutosaveIndicator("Default", "saved");
  updateDeploymentStatus("Autosaved locally", "local");
  showToast("Config kembali ke default", "success");
}

// CDU-V Startup Simulator
async function loadStartupSimulationData() {
  let lastError = null;
  for (const url of STARTUP_SIMULATION_DATA_PATHS) {
    const requestUrl = `${url}?v=${Date.now()}`;
    console.debug("[StartupSimulator] Loading simulation data", { url, requestUrl });
    try {
      const response = await fetch(requestUrl, {
        cache: "no-store",
        credentials: "same-origin",
      });
      console.debug("[StartupSimulator] HTTP status", { url, status: response.status, ok: response.ok });
      if (!response.ok) throw new Error(`Startup simulation data fetch failed: ${url} returned HTTP ${response.status}`);

      let data = null;
      try {
        data = await response.json();
      } catch (parseError) {
        console.error("[StartupSimulator] JSON parse error", { url, error: parseError });
        throw new Error(`Startup simulation JSON invalid: ${parseError.message || parseError}`);
      }

      const validation = validateStartupSimulationData(data);
      if (!validation.valid) throw new Error(`Startup simulation data invalid: ${validation.issues.join("; ")}`);
      const totalSteps = getStartupTotalSteps(data);
      console.debug("[StartupSimulator] Data summary", {
        url,
        stages: data.stages?.length || 0,
        totalSteps,
      });
      if (totalSteps <= 0) {
        setStartupSimulatorUnavailable("Data simulator tersedia tetapi belum memiliki step.");
        return null;
      }
      setStartupSimulatorReady(data);
      return data;
    } catch (error) {
      lastError = error;
      console.warn("[StartupSimulator] Load attempt failed", { url, error: error?.message || String(error) });
    }
  }

  const message = `Startup simulation data belum tersedia. Pastikan file data/startup-cdu-v-simulation.json ada dan valid.${lastError ? ` (${lastError.message || lastError})` : ""}`;
  setStartupSimulatorUnavailable(message);
  return null;
}

async function initStartupSimulator() {
  const data = await loadStartupSimulationData();
  if (data) state.startupSession = loadStartupSession();
  renderStartupSimulator();
}

function getStartupTotalSteps(data) {
  return data?.stages?.reduce((sum, stage) => sum + (stage.steps?.length || 0), 0) || 0;
}

function flattenStartupSteps(data) {
  const steps = [];
  data?.stages?.forEach((stage) => {
    stage.steps?.forEach((step) => steps.push({ stage, step }));
  });
  return steps;
}

function hasStartupSimulatorData() {
  return Boolean(state.startup?.data && state.startup?.totalSteps > 0);
}

function getStartupCompactMessage(message) {
  const fullMessage = safeText(message, "");
  if (/belum tersedia|fetch failed|json invalid|http 404|unexpected token/i.test(fullMessage)) {
    return "Data simulator belum tersedia.\nPeriksa file startup-cdu-v-simulation.json";
  }
  return fullMessage;
}

function setStartupSimulatorUnavailable(message = "Startup simulation data belum tersedia. Pastikan file data/startup-cdu-v-simulation.json ada dan valid.") {
  state.startup = {
    data: null,
    steps: [],
    totalSteps: 0,
    message,
  };
  state.startupSimulationData = null;
  state.startupSession = null;
  state.startupDataError = message;
  clearStartupHighlights();
  if (els.startupProgress) els.startupProgress.textContent = "0 / 0 complete";
  const compactMessage = getStartupCompactMessage(message);
  if (els.startupStatusLine) {
    els.startupStatusLine.textContent = compactMessage;
    els.startupStatusLine.title = message;
  }
  if (els.startupStageTabs) els.startupStageTabs.replaceChildren();
  if (els.startupEmptyState) {
    els.startupEmptyState.textContent = compactMessage;
    els.startupEmptyState.title = message;
    els.startupEmptyState.classList.remove("is-hidden");
  }
  els.startupStepCard?.classList.add("is-hidden");
  els.startupReport?.classList.add("is-hidden");
  updateStartupActionButtons();
}

function setStartupSimulatorReady(data) {
  const steps = flattenStartupSteps(data);
  state.startup = {
    data,
    steps,
    totalSteps: steps.length,
    message: "",
  };
  state.startupSimulationData = data;
  state.startupDataError = "";
  state.startupSession = loadStartupSession();
  if (!findStartupStepById(state.startupSession.currentStepId)) {
    state.startupSession = createDefaultStartupSession();
  }
  if (els.startupEmptyState) els.startupEmptyState.classList.add("is-hidden");
  if (els.startupProgress) els.startupProgress.textContent = `0 / ${steps.length} complete`;
  if (els.startupStatusLine) els.startupStatusLine.textContent = "Not Started";
  updateStartupActionButtons();
  renderStartupStageTabs();
  renderStartupStepCard(getCurrentStartupStep());
  renderStartupReport();
}

function updateStartupActionButtons() {
  const ready = hasStartupSimulatorData();
  const started = ready && Boolean(state.startupSession?.startedAt);
  const hasCurrentStep = ready && Boolean(getCurrentStartupStep());
  const setDisabled = (element, disabled) => {
    if (!element) return;
    element.disabled = Boolean(disabled);
    element.classList.toggle("is-disabled", Boolean(disabled));
  };
  setDisabled(els.startupStart, !ready);
  setDisabled(els.startupReset, !ready);
  setDisabled(els.startupPause, !ready || !started);
  setDisabled(els.startupPrev, !ready || !started || !hasCurrentStep);
  setDisabled(els.startupNext, !ready || !started || !hasCurrentStep);
  setDisabled(els.startupComplete, !ready || !started || !hasCurrentStep);
  setDisabled(els.startupNotReady, !ready || !started || !hasCurrentStep);
}

function validateStartupSimulationData(data) {
  const issues = [];
  if (!isPlainObject(data)) issues.push("data harus object");
  if (!safeText(data?.id, "")) issues.push("id simulator kosong");
  if (!Array.isArray(data?.stages)) issues.push("stages harus array");
  data?.stages?.forEach((stage, stageIndex) => {
    if (!safeText(stage?.id, "")) issues.push(`stage[${stageIndex}] tanpa id`);
    if (!Array.isArray(stage?.steps)) issues.push(`stage[${stageIndex}] steps bukan array`);
    stage?.steps?.forEach((step, stepIndex) => {
      if (!safeText(step?.id, "")) issues.push(`stage[${stageIndex}].steps[${stepIndex}] tanpa id`);
      if (!safeText(step?.title, "")) issues.push(`step ${step?.id || stepIndex} tanpa title`);
    });
  });
  return { valid: issues.length === 0, issues };
}

function createDefaultStartupSession() {
  const data = state.startupSimulationData;
  const firstItem = flattenStartupSteps(data)[0] || null;
  const firstStage = firstItem?.stage || data?.stages?.[0] || null;
  const firstStep = firstItem?.step || null;
  const now = new Date().toISOString();
  return {
    simulationId: data?.id || "startup-cdu-v",
    currentStageId: firstStage?.id || "",
    currentStepId: firstStep?.id || "",
    completedSteps: [],
    stepStatus: {},
    stepInputs: {},
    warnings: [],
    startedAt: "",
    updatedAt: now,
    paused: false,
  };
}

function loadStartupSession() {
  const raw = safeLocalStorageGet(STARTUP_SESSION_KEY);
  const parsed = safeJsonParse(raw);
  if (!parsed || parsed.simulationId !== (state.startupSimulationData?.id || "startup-cdu-v")) {
    return createDefaultStartupSession();
  }
  return normalizeStartupSession(parsed);
}

function normalizeStartupSession(session) {
  const fallback = createDefaultStartupSession();
  const completedSteps = Array.isArray(session?.completedSteps) ? session.completedSteps.filter(Boolean) : [];
  return {
    ...fallback,
    ...session,
    completedSteps,
    stepStatus: isPlainObject(session?.stepStatus) ? session.stepStatus : {},
    stepInputs: isPlainObject(session?.stepInputs) ? session.stepInputs : {},
    warnings: Array.isArray(session?.warnings) ? session.warnings : [],
    updatedAt: session?.updatedAt || fallback.updatedAt,
    paused: Boolean(session?.paused),
  };
}

function saveStartupSession() {
  if (!state.startupSession) return;
  state.startupSession.updatedAt = new Date().toISOString();
  try {
    safeLocalStorageSet(STARTUP_SESSION_KEY, JSON.stringify(state.startupSession));
  } catch (error) {
    console.warn("Gagal menyimpan startup session:", error);
  }
}

function normalizeStartupPanelState(value = {}) {
  const source = value && typeof value === "object" && !Array.isArray(value) ? value : {};
  const x = Number(source.x);
  const y = Number(source.y);
  return {
    x: Number.isFinite(x) ? x : STARTUP_PANEL_DEFAULT_STATE.x,
    y: Number.isFinite(y) ? y : STARTUP_PANEL_DEFAULT_STATE.y,
    size: VALID_STARTUP_PANEL_SIZES.has(source.size) ? source.size : "m",
    hidden: typeof source.hidden === "boolean" ? source.hidden : true,
    minimized: Boolean(source.minimized),
  };
}

function loadStartupPanelState() {
  let stored = null;
  try {
    const raw = safeLocalStorageGet(STARTUP_PANEL_STATE_KEY);
    stored = raw ? JSON.parse(raw) : null;
  } catch (error) {
    console.warn("Gagal memuat startup panel state:", error);
  }
  state.startupPanelState = normalizeStartupPanelState(stored || STARTUP_PANEL_DEFAULT_STATE);
  state.startupModeActive = !state.startupPanelState.hidden;
}

function saveStartupPanelState() {
  state.startupPanelState = normalizeStartupPanelState(state.startupPanelState);
  safeLocalStorageSet(STARTUP_PANEL_STATE_KEY, JSON.stringify(state.startupPanelState));
}

function getConstrainedStartupPanelPosition(x, y) {
  const next = normalizeStartupPanelState({ ...state.startupPanelState, x, y });
  const viewportRect = els.canvasViewport?.getBoundingClientRect();
  if (!viewportRect) return { x: next.x, y: next.y };
  const margin = 12;
  const widths = { s: 340, m: 440, l: 560 };
  const heights = { s: 300, m: 430, l: 560 };
  const width = els.startupPanel?.offsetWidth || widths[next.size];
  const height = next.minimized ? (els.startupPanelDragHandle?.offsetHeight || 58) : (els.startupPanel?.offsetHeight || heights[next.size]);
  return {
    x: clamp(next.x, margin, Math.max(margin, viewportRect.width - width - margin)),
    y: clamp(next.y, margin, Math.max(margin, viewportRect.height - height - margin)),
  };
}

function setStartupPanelPosition(x, y) {
  if (!els.startupPanel) return;
  const next = getConstrainedStartupPanelPosition(x, y);
  state.startupPanelState.x = next.x;
  state.startupPanelState.y = next.y;
  Object.assign(els.startupPanel.style, { left: `${next.x}px`, top: `${next.y}px`, right: "auto", bottom: "auto" });
}

function applyStartupPanelState() {
  if (!els.startupPanel) return;
  const panelState = normalizeStartupPanelState(state.startupPanelState);
  state.startupPanelState = panelState;
  els.startupPanel.classList.remove("startup-panel-size-s", "startup-panel-size-m", "startup-panel-size-l");
  els.startupPanel.classList.add(`startup-panel-size-${panelState.size}`);
  els.startupPanel.classList.toggle("is-minimized", panelState.minimized);
  els.startupPanel.classList.toggle("is-hidden", panelState.hidden);
  els.startupPanel.setAttribute("aria-hidden", String(panelState.hidden));
  els.startupPanelBody?.setAttribute("aria-hidden", String(panelState.minimized));
  els.startupModeToggle?.setAttribute("aria-pressed", String(!panelState.hidden));
  els.startupPanelSizeButtons?.forEach((button) => {
    const active = button.dataset.startupPanelSize === panelState.size;
    button.classList.toggle("is-active", active);
    button.setAttribute("aria-pressed", String(active));
  });
  if (els.startupPanelMinimize) {
    els.startupPanelMinimize.textContent = panelState.minimized ? "+" : "-";
    els.startupPanelMinimize.title = panelState.minimized ? "Expand Startup Simulator" : "Minimize Startup Simulator";
    els.startupPanelMinimize.setAttribute("aria-label", els.startupPanelMinimize.title);
  }
  setStartupPanelPosition(panelState.x, panelState.y);
}

function focusStartupPanel() {
  if (!els.startupPanel || state.startupPanelState.hidden) return;
  els.startupPanel.focus({ preventScroll: true });
  els.startupPanel.classList.add("is-focused");
  window.setTimeout(() => els.startupPanel?.classList.remove("is-focused"), 520);
}

function handleStartupToolbarClick() {
  if (!state.startupModeActive || state.startupPanelState.hidden) setStartupModeActive(true);
  else focusStartupPanel();
}

function setStartupPanelSize(size) {
  state.startupPanelState.size = VALID_STARTUP_PANEL_SIZES.has(size) ? size : "m";
  applyStartupPanelState();
  saveStartupPanelState();
}

function toggleStartupPanelMinimized() {
  state.startupPanelState.minimized = !state.startupPanelState.minimized;
  applyStartupPanelState();
  saveStartupPanelState();
}

function resetStartupPanelPosition() {
  setStartupPanelPosition(STARTUP_PANEL_DEFAULT_STATE.x, STARTUP_PANEL_DEFAULT_STATE.y);
  saveStartupPanelState();
}

function constrainStartupPanelToViewport() {
  if (els.startupPanel && !state.startupPanelState.hidden) {
    setStartupPanelPosition(state.startupPanelState.x, state.startupPanelState.y);
    saveStartupPanelState();
  }
}

function startStartupPanelDrag(event) {
  if (!els.startupPanel || event.target.closest("button, input, select, textarea, label")) return;
  if (event.button !== 0 && event.pointerType === "mouse") return;
  event.preventDefault();
  event.stopPropagation();
  const rect = els.startupPanel.getBoundingClientRect();
  const viewportRect = els.canvasViewport?.getBoundingClientRect();
  state.draggingStartupPanel = {
    pointerId: event.pointerId,
    startX: event.clientX,
    startY: event.clientY,
    panelStartX: rect.left - (viewportRect?.left || 0),
    panelStartY: rect.top - (viewportRect?.top || 0),
  };
  els.startupPanel.classList.add("is-dragging");
  try { els.startupPanelDragHandle?.setPointerCapture(event.pointerId); } catch { /* document listeners remain active */ }
}

function updateStartupPanelDrag(event) {
  const drag = state.draggingStartupPanel;
  if (!drag) return;
  event.preventDefault();
  setStartupPanelPosition(drag.panelStartX + event.clientX - drag.startX, drag.panelStartY + event.clientY - drag.startY);
}

function finishStartupPanelDrag(event = {}) {
  const drag = state.draggingStartupPanel;
  if (!drag) return;
  state.draggingStartupPanel = null;
  els.startupPanel?.classList.remove("is-dragging");
  try { els.startupPanelDragHandle?.releasePointerCapture(drag.pointerId || event.pointerId); } catch { /* no active capture */ }
  saveStartupPanelState();
}

function setStartupModeActive(active) {
  state.startupModeActive = Boolean(active);
  state.startupPanelState.hidden = !state.startupModeActive;
  saveStartupPanelState();
  document.body.classList.toggle("startup-mode-active", state.startupModeActive);
  applyStartupPanelState();
  if (state.startupModeActive && !state.startupSession) {
    state.startupSession = loadStartupSession();
  }
  renderStartupSimulator();
  highlightStartupLinkedItems(getCurrentStartupStep());
  if (state.startupModeActive) focusStartupPanel();
}

function getStartupFlatSteps() {
  if (Array.isArray(state.startup?.steps) && state.startup.steps.length) return state.startup.steps;
  return flattenStartupSteps(state.startupSimulationData);
}

function getCurrentStartupStep() {
  const session = state.startupSession;
  if (!session) return null;
  return findStartupStepById(session.currentStepId)?.step || null;
}

function getCurrentStartupStage() {
  const session = state.startupSession;
  if (!session) return null;
  return state.startupSimulationData?.stages?.find((stage) => stage.id === session.currentStageId) || null;
}

function findStartupStepById(stepId) {
  const id = safeText(stepId, "");
  return getStartupFlatSteps().find((item) => item.step.id === id) || null;
}

function getStartupStepInput(stepId) {
  const id = safeText(stepId, "");
  if (!state.startupSession) state.startupSession = createDefaultStartupSession();
  if (!state.startupSession.stepInputs[id]) {
    state.startupSession.stepInputs[id] = {
      checklist: {},
      parameters: {},
      warnings: [],
      notReady: false,
    };
  }
  return state.startupSession.stepInputs[id];
}

function startStartupSimulation() {
  if (!hasStartupSimulatorData()) {
    setStartupSimulatorUnavailable(state.startupDataError || "Startup simulation data belum tersedia. Pastikan file data/startup-cdu-v-simulation.json ada dan valid.");
    showToast("Startup simulation data belum tersedia.", "warning");
    return;
  }
  if (!state.startupSession) state.startupSession = createDefaultStartupSession();
  if (!state.startupSession.startedAt) state.startupSession.startedAt = new Date().toISOString();
  state.startupSession.paused = false;
  const currentStep = getCurrentStartupStep();
  if (currentStep && !state.startupSession.stepStatus[currentStep.id]) {
    state.startupSession.stepStatus[currentStep.id] = "running";
  }
  setStartupModeActive(true);
  saveStartupSession();
  renderStartupSimulator();
  highlightStartupLinkedItems(currentStep);
  showToast("CDU-V startup simulation dimulai", "success");
}

function pauseStartupSimulation() {
  if (!hasStartupSimulatorData() || !state.startupSession?.startedAt) return;
  if (!state.startupSession) state.startupSession = createDefaultStartupSession();
  state.startupSession.paused = !state.startupSession.paused;
  saveStartupSession();
  renderStartupSimulator();
  showToast(state.startupSession.paused ? "Startup simulation paused" : "Startup simulation resumed", "info");
}

function resetStartupSimulation() {
  if (!hasStartupSimulatorData()) return;
  state.startupSession = createDefaultStartupSession();
  safeLocalStorageRemove(STARTUP_SESSION_KEY);
  clearStartupHighlights();
  renderStartupSimulator();
  highlightStartupLinkedItems(getCurrentStartupStep());
  showToast("Startup simulation direset", "info");
}

function goToStartupStep(stepId) {
  if (!hasStartupSimulatorData() || !state.startupSession?.startedAt) return;
  const item = findStartupStepById(stepId);
  if (!item || !state.startupSession) return;
  state.startupSession.currentStageId = item.stage.id;
  state.startupSession.currentStepId = item.step.id;
  if (!state.startupSession.stepStatus[item.step.id]) {
    state.startupSession.stepStatus[item.step.id] = state.startupSession.paused ? "waiting" : "running";
  }
  saveStartupSession();
  renderStartupSimulator();
  highlightStartupLinkedItems(item.step);
}

function nextStartupStep() {
  if (!hasStartupSimulatorData() || !state.startupSession?.startedAt) return;
  const flat = getStartupFlatSteps();
  const index = flat.findIndex((item) => item.step.id === state.startupSession?.currentStepId);
  if (index >= 0 && index < flat.length - 1) goToStartupStep(flat[index + 1].step.id);
}

function previousStartupStep() {
  if (!hasStartupSimulatorData() || !state.startupSession?.startedAt) return;
  const flat = getStartupFlatSteps();
  const index = flat.findIndex((item) => item.step.id === state.startupSession?.currentStepId);
  if (index > 0) goToStartupStep(flat[index - 1].step.id);
}

function completeStartupStep(stepId) {
  if (!hasStartupSimulatorData() || !state.startupSession?.startedAt) return;
  const item = findStartupStepById(stepId);
  if (!item || !state.startupSession) return;
  collectStartupStepInputs(item.step);
  const validation = validateStartupParameters(item.step);
  const input = getStartupStepInput(item.step.id);
  input.warnings = validation.warnings;
  if (!state.startupSession.completedSteps.includes(item.step.id)) {
    state.startupSession.completedSteps.push(item.step.id);
  }
  state.startupSession.stepStatus[item.step.id] = validation.warnings.length ? "warning" : "complete";
  updateStartupWarningsForStep(item.step.id, validation.warnings);
  saveStartupSession();
  renderStartupSimulator();
  highlightStartupLinkedItems(item.step);
  showToast(validation.warnings.length ? "Step complete dengan warning" : "Step complete", validation.warnings.length ? "warning" : "success");
}

function markStartupStepNotReady() {
  if (!hasStartupSimulatorData() || !state.startupSession?.startedAt) return;
  const step = getCurrentStartupStep();
  if (!step || !state.startupSession) return;
  const input = getStartupStepInput(step.id);
  input.notReady = true;
  state.startupSession.stepStatus[step.id] = isStartupEmergencyStep(step) ? "abnormal" : "warning";
  updateStartupWarningsForStep(step.id, [`${step.title}: Not ready`]);
  saveStartupSession();
  renderStartupSimulator();
  highlightStartupLinkedItems(step);
  showToast("Step ditandai Not Ready", "warning");
}

function collectStartupStepInputs(step) {
  if (!step || !els.startupStepCard) return;
  const input = getStartupStepInput(step.id);
  els.startupStepCard.querySelectorAll("[data-startup-param]").forEach((field) => {
    input.parameters[field.dataset.startupParam] = field.value;
  });
  els.startupStepCard.querySelectorAll("[data-startup-check]").forEach((field) => {
    if (field.checked) input.checklist[field.dataset.startupCheck] = field.value === "yes";
  });
}

function getStartupCheckItems(step) {
  if (Array.isArray(step?.checks) && step.checks.length) {
    return step.checks.map((check, index) => ({
      id: safeText(check?.id, String(index)),
      label: safeText(check?.label, check?.id || `Check ${index + 1}`),
    }));
  }
  if (Array.isArray(step?.checklist) && step.checklist.length) {
    return step.checklist.map((check, index) => {
      if (isPlainObject(check)) {
        return {
          id: safeText(check.id, String(index)),
          label: safeText(check.label, check.id || `Check ${index + 1}`),
        };
      }
      return {
        id: String(index),
        label: safeText(check, `Check ${index + 1}`),
      };
    });
  }
  return [];
}

function getStartupParameterKey(parameter) {
  return safeText(parameter?.id || parameter?.tag || parameter?.name || parameter?.label, "");
}

function getStartupParameterLabel(parameter) {
  return safeText(parameter?.label || parameter?.name || parameter?.tag || parameter?.id, "Parameter");
}

function getStartupStepWarningMessage(step, condition, parameter, fallback) {
  const match = Array.isArray(step?.warnings)
    ? step.warnings.find((warning) => warning?.condition === condition)
    : null;
  if (match?.message) return match.message;
  if (condition === "belowMin" && parameter?.warningLow) return parameter.warningLow;
  if (condition === "aboveMax" && parameter?.warningHigh) return parameter.warningHigh;
  return fallback;
}

function handleStartupStepInputChange(event) {
  const step = getCurrentStartupStep();
  if (!step || !event.target.closest?.("[data-startup-param], [data-startup-check]")) return;
  collectStartupStepInputs(step);
  if (event.type === "input") {
    saveStartupSession();
    return;
  }
  const validation = validateStartupParameters(step);
  const input = getStartupStepInput(step.id);
  input.warnings = validation.warnings;
  updateStartupWarningsForStep(step.id, validation.warnings);
  if (!state.startupSession.completedSteps.includes(step.id)) {
    state.startupSession.stepStatus[step.id] = validation.warnings.length ? "warning" : "running";
  }
  saveStartupSession();
  renderStartupSimulator();
  highlightStartupLinkedItems(step);
}

function validateStartupParameters(step) {
  if (!step) return { status: "notStarted", warnings: [] };
  const input = getStartupStepInput(step.id);
  const warnings = [];
  (step.parameters || []).forEach((parameter) => {
    const key = getStartupParameterKey(parameter);
    const label = getStartupParameterLabel(parameter);
    const raw = input.parameters?.[key];
    if (raw === undefined || raw === null || raw === "") return;
    const value = Number(raw);
    if (!Number.isFinite(value)) {
      warnings.push(`${label}: input harus angka`);
      return;
    }
    if (Number.isFinite(Number(parameter.min)) && value < Number(parameter.min)) {
      warnings.push(getStartupStepWarningMessage(
        step,
        "belowMin",
        parameter,
        `${label} di bawah minimum ${parameter.min}${parameter.unit ? ` ${parameter.unit}` : ""}`,
      ));
    }
    if (Number.isFinite(Number(parameter.max)) && value > Number(parameter.max)) {
      warnings.push(getStartupStepWarningMessage(
        step,
        "aboveMax",
        parameter,
        `${label} di atas maksimum ${parameter.max}${parameter.unit ? ` ${parameter.unit}` : ""}`,
      ));
    }
  });
  if (input.notReady) warnings.push(`${step.title}: Not ready`);
  const status = isStartupEmergencyStep(step)
    ? "abnormal"
    : warnings.length
      ? "warning"
      : "running";
  return { status, warnings };
}

function updateStartupWarningsForStep(stepId, warnings) {
  if (!state.startupSession) return;
  const otherWarnings = (state.startupSession.warnings || []).filter((warning) => warning.stepId !== stepId);
  state.startupSession.warnings = [
    ...otherWarnings,
    ...warnings.map((message) => ({ stepId, message, at: new Date().toISOString() })),
  ];
}

function getStartupStepStatus(step) {
  if (!step || !state.startupSession?.startedAt) return "notStarted";
  if (isStartupEmergencyStep(step)) return state.startupSession.stepStatus?.[step.id] || "abnormal";
  if (state.startupSession.completedSteps?.includes(step.id)) {
    return state.startupSession.stepStatus?.[step.id] || "complete";
  }
  return state.startupSession.stepStatus?.[step.id] || (step.id === state.startupSession.currentStepId ? "running" : "waiting");
}

function isStartupEmergencyStep(step) {
  const status = safeText(step?.status, "").toLowerCase();
  return status === "abnormal" || status === "emergency";
}

function renderStartupSimulator() {
  if (!els.startupPanel) return;
  applyStartupPanelState();
  document.body.classList.toggle("startup-mode-active", state.startupModeActive);

  const data = state.startupSimulationData;
  if (els.startupTitle) els.startupTitle.textContent = data?.title || "CDU-V Startup Simulation";
  if (els.startupSource) els.startupSource.textContent = "STARTUP SIMULATOR";
  const dataReady = hasStartupSimulatorData();
  if (els.startupStatusIndicator) {
    els.startupStatusIndicator.classList.toggle("is-ready", dataReady);
    els.startupStatusIndicator.classList.toggle("is-error", !dataReady);
    els.startupStatusIndicator.title = dataReady ? "Startup data ready" : "Startup data unavailable";
  }

  if (!dataReady) {
    const message = state.startupDataError || "Startup simulation data belum tersedia. Pastikan file data/startup-cdu-v-simulation.json ada dan valid.";
    const compactMessage = getStartupCompactMessage(message);
    if (els.startupStatusLine) {
      els.startupStatusLine.textContent = compactMessage;
      els.startupStatusLine.title = message;
    }
    if (els.startupStageTabs) els.startupStageTabs.replaceChildren();
    if (els.startupProgress) els.startupProgress.textContent = "0 / 0 complete";
    if (els.startupEmptyState) {
      els.startupEmptyState.textContent = compactMessage;
      els.startupEmptyState.title = message;
      els.startupEmptyState.classList.remove("is-hidden");
    }
    els.startupStepCard?.classList.add("is-hidden");
    els.startupReport?.classList.add("is-hidden");
    if (els.startupReport) els.startupReport.replaceChildren();
    updateStartupActionButtons();
    return;
  }

  if (!state.startupSession) state.startupSession = loadStartupSession();
  if (els.startupEmptyState) els.startupEmptyState.classList.add("is-hidden");
  const session = state.startupSession;
  const currentStep = getCurrentStartupStep();
  const currentStatus = getStartupStepStatus(currentStep);
  const flat = getStartupFlatSteps();
  const completeCount = session.completedSteps?.length || 0;
  if (els.startupStatusLine) {
    els.startupStatusLine.textContent = session.startedAt
      ? `${formatStartupStatus(currentStatus)} - ${completeCount}/${flat.length} step complete${session.paused ? " - Paused" : ""}`
      : "Not Started";
  }
  if (els.startupProgress) els.startupProgress.textContent = `${completeCount} / ${flat.length} complete`;
  renderStartupStageTabs();
  renderStartupStepCard(currentStep);
  renderStartupReport();
  updateStartupActionButtons();
}

function renderStartupStageTabs() {
  if (!els.startupStageTabs) return;
  els.startupStageTabs.replaceChildren();
  const currentStageId = state.startupSession?.currentStageId;
  state.startupSimulationData?.stages?.forEach((stage) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "startup-stage-tab";
    button.classList.toggle("is-active", stage.id === currentStageId);
    button.textContent = stage.name;
    button.disabled = !state.startupSession?.startedAt || !(stage.steps?.length);
    button.addEventListener("click", () => {
      const firstStep = stage.steps?.[0];
      if (firstStep) goToStartupStep(firstStep.id);
    });
    els.startupStageTabs.appendChild(button);
  });
}

function renderStartupStepCard(step) {
  if (!els.startupStepCard) return;
  els.startupStepCard.replaceChildren();
  if (!step) {
    els.startupStepCard.className = "startup-step-card is-hidden";
    if (els.startupEmptyState) {
      els.startupEmptyState.textContent = "Belum ada step aktif untuk simulator.";
      els.startupEmptyState.classList.remove("is-hidden");
    }
    return;
  }

  const status = getStartupStepStatus(step);
  els.startupStepCard.className = `startup-step-card startup-step-active startup-step-${status}`;
  els.startupStepCard.classList.remove("is-hidden");
  const input = getStartupStepInput(step.id);
  const stage = getCurrentStartupStage();

  const header = document.createElement("div");
  header.className = "startup-step-header";
  header.innerHTML = `
    <div>
      <p class="eyebrow">${escapeHtml(stage?.name || "Startup Stage")}</p>
      <h4>${escapeHtml(step.title)}</h4>
    </div>
    <span class="startup-step-status" data-status="${escapeHtml(status)}">${escapeHtml(formatStartupStatus(status))}</span>
  `;
  els.startupStepCard.appendChild(header);

  appendStartupListSection(els.startupStepCard, "Linked Nodes", step.linkedNodes);
  appendStartupListSection(els.startupStepCard, "Instruments", step.instruments);
  appendStartupListSection(els.startupStepCard, "Precondition", step.preconditions);
  appendStartupListSection(els.startupStepCard, "Action", step.actions);
  appendStartupListSection(els.startupStepCard, "Scenario", step.scenario);
  appendStartupListSection(els.startupStepCard, "Simulator Behavior", step.simulatorBehavior);
  appendStartupListSection(els.startupStepCard, "Products", step.products);

  const checkItems = getStartupCheckItems(step);
  if (checkItems.length) {
    const section = document.createElement("section");
    section.className = "startup-checklist";
    section.innerHTML = `<h5>Checklist YA/TIDAK</h5>`;
    checkItems.forEach((item, index) => {
      const key = item.id;
      const value = input.checklist?.[key];
      const row = document.createElement("div");
      row.className = "startup-check-row";
      row.innerHTML = `
        <span>${escapeHtml(item.label)}</span>
        <label><input type="radio" name="startup-check-${escapeHtml(step.id)}-${index}" data-startup-check="${key}" value="yes" ${value === true ? "checked" : ""}> YA</label>
        <label><input type="radio" name="startup-check-${escapeHtml(step.id)}-${index}" data-startup-check="${key}" value="no" ${value === false ? "checked" : ""}> TIDAK</label>
      `;
      section.appendChild(row);
    });
    els.startupStepCard.appendChild(section);
  }

  if (Array.isArray(step.parameters) && step.parameters.length) {
    const section = document.createElement("section");
    section.className = "startup-parameters";
    section.innerHTML = `<h5>Input Parameter Simulasi</h5>`;
    step.parameters.forEach((parameter) => {
      const key = getStartupParameterKey(parameter);
      const value = input.parameters?.[key] ?? "";
      const row = document.createElement("label");
      row.className = "startup-param-field";
      const hint = formatStartupParameterHint(parameter);
      row.innerHTML = `
        <span>${escapeHtml(getStartupParameterLabel(parameter))}</span>
        <input type="number" step="any" data-startup-param="${escapeHtml(key)}" value="${escapeHtml(value)}">
        <em>${escapeHtml(parameter.unit || "")}</em>
        ${hint ? `<small>${escapeHtml(hint)}</small>` : ""}
      `;
      section.appendChild(row);
    });
    els.startupStepCard.appendChild(section);
  }

  const validation = validateStartupParameters(step);
  if (validation.warnings.length) {
    const warningBox = document.createElement("div");
    warningBox.className = "startup-warning-box";
    warningBox.innerHTML = `<strong>Warning</strong><ul>${validation.warnings.map((warning) => `<li>${escapeHtml(warning)}</li>`).join("")}</ul>`;
    els.startupStepCard.appendChild(warningBox);
  }
}

function appendStartupListSection(container, title, items) {
  if (!Array.isArray(items) || !items.length) return;
  const section = document.createElement("section");
  section.className = "startup-list-section";
  section.innerHTML = `<h5>${escapeHtml(title)}</h5><ul>${items.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}</ul>`;
  container.appendChild(section);
}

function formatStartupParameterHint(parameter) {
  const parts = [];
  if (Number.isFinite(Number(parameter.min))) parts.push(`min ${parameter.min}`);
  if (Number.isFinite(Number(parameter.max))) parts.push(`max ${parameter.max}`);
  if (Number.isFinite(Number(parameter.target))) parts.push(`target ${parameter.target}`);
  return parts.length ? `${parts.join(" - ")}${parameter.unit ? ` ${parameter.unit}` : ""}` : "";
}

function formatStartupStatus(status) {
  const map = {
    notStarted: "Not Started",
    waiting: "Waiting",
    running: "Running",
    complete: "Complete",
    warning: "Warning",
    abnormal: "Abnormal",
    emergency: "Emergency",
  };
  return map[status] || map.notStarted;
}

function renderStartupReport() {
  if (!els.startupReport || !state.startupSimulationData || !state.startupSession) return;
  els.startupReport.classList.remove("is-hidden");
  const report = generateStartupReport();
  els.startupReport.innerHTML = `
    <h4>Summary Report</h4>
    <dl>
      <div><dt>Total Step</dt><dd>${report.totalSteps}</dd></div>
      <div><dt>Complete</dt><dd>${report.completedSteps}</dd></div>
      <div><dt>Warning</dt><dd>${report.warningSteps}</dd></div>
      <div><dt>Abnormal</dt><dd>${report.abnormalSteps}</dd></div>
      <div><dt>Parameter Out of Range</dt><dd>${report.parameterOutOfRange}</dd></div>
      <div><dt>Emergency Score</dt><dd>${report.emergencyResponseScore}</dd></div>
    </dl>
    <p>${escapeHtml(report.recommendation)}</p>
  `;
}

function generateStartupReport() {
  const flat = getStartupFlatSteps();
  const session = state.startupSession || createDefaultStartupSession();
  const warningStepIds = new Set((session.warnings || []).map((warning) => warning.stepId));
  const abnormalSteps = flat.filter((item) => isStartupEmergencyStep(item.step)
    && (session.stepStatus?.[item.step.id] === "abnormal" || session.stepStatus?.[item.step.id] === "emergency")).length;
  const emergencySteps = flat.filter((item) => isStartupEmergencyStep(item.step));
  const completedEmergency = emergencySteps.filter((item) => session.completedSteps?.includes(item.step.id)).length;
  const emergencyResponseScore = emergencySteps.length
    ? Math.round((completedEmergency / emergencySteps.length) * 100)
    : 100;
  const parameterOutOfRange = (session.warnings || []).filter((warning) => !/Not ready/i.test(warning.message)).length;
  return {
    totalSteps: flat.length,
    completedSteps: session.completedSteps?.length || 0,
    warningSteps: warningStepIds.size,
    abnormalSteps,
    parameterOutOfRange,
    emergencyResponseScore,
    recommendation: warningStepIds.size
      ? "Review step warning, ulangi parameter yang keluar batas, dan diskusikan respon abnormal dengan supervisor trainer."
      : "Progress simulator normal. Lanjutkan verifikasi lapangan dan DCS sesuai STK/TKI resmi.",
  };
}

function clearStartupHighlights() {
  els.nodeLayer?.querySelectorAll(".startup-linked-highlight, .startup-emergency-highlight").forEach((element) => {
    element.classList.remove("startup-linked-highlight", "startup-emergency-highlight");
  });
  els.streamLayer?.querySelectorAll(".startup-stream-highlight, .startup-emergency-highlight").forEach((element) => {
    element.classList.remove("startup-stream-highlight", "startup-emergency-highlight");
  });
}

function highlightStartupLinkedItems(step) {
  clearStartupHighlights();
  if (!state.startupModeActive || !step) return;
  const emergency = isStartupEmergencyStep(step);
  const linkedNodeKeys = new Set((step.linkedNodes || []).map((item) => safeText(item, "").toLowerCase()).filter(Boolean));
  const linkedStreamKeys = new Set((step.linkedStreams || []).map((item) => safeText(item, "").toLowerCase()).filter(Boolean));
  const matchedNodeTags = new Set();

  NODES.forEach((node) => {
    const keys = [node.id, node.tag].map((item) => safeText(item, "").toLowerCase());
    if (!keys.some((key) => linkedNodeKeys.has(key))) return;
    matchedNodeTags.add(node.tag);
    const nodeEl = els.nodeLayer?.querySelector(`.canvas-node[data-node-id="${CSS.escape(node.id)}"]`);
    nodeEl?.classList.add(emergency ? "startup-emergency-highlight" : "startup-linked-highlight");
  });

  STREAMS.forEach((stream) => {
    const streamKeys = [stream.id, stream.label].map((item) => safeText(item, "").toLowerCase());
    const directMatch = streamKeys.some((key) => linkedStreamKeys.has(key));
    const nodeMatch = matchedNodeTags.has(stream.from) || matchedNodeTags.has(stream.to);
    if (!directMatch && !nodeMatch) return;
    els.streamLayer?.querySelectorAll(`[data-stream-id="${CSS.escape(stream.id)}"]`).forEach((element) => {
      element.classList.add(emergency ? "startup-emergency-highlight" : "startup-stream-highlight");
    });
  });
}

// Mass Balance Engine
function resolveBalanceNode(nodeId) {
  return nodeById.get(nodeId) || nodeByTag.get(nodeId) || NODES.find((node) => node.id === nodeId || node.tag === nodeId) || null;
}

function getNodeInputStreams(nodeId) {
  const node = resolveBalanceNode(nodeId);
  if (!node) return [];
  return getActiveStreams().filter((stream) => stream.to === node.tag && isNodeBalanceStream(stream));
}

function getNodeOutputStreams(nodeId) {
  const node = resolveBalanceNode(nodeId);
  if (!node) return [];
  return getActiveStreams().filter((stream) => stream.from === node.tag && isNodeBalanceStream(stream));
}

function getUnitStreams(unitName) {
  const unit = safeText(unitName, "").toUpperCase();
  if (!unit) return [];
  return getActiveStreams().filter((stream) => {
    const fromNode = nodeByTag.get(stream.from);
    const toNode = nodeByTag.get(stream.to);
    return sameUnit(stream.unit, unit) || sameUnit(fromNode?.unit, unit) || sameUnit(toNode?.unit, unit);
  });
}

function getUnitFeedStreams(unitName) {
  const unit = safeText(unitName, "").toUpperCase();
  if (!unit) return [];
  const streams = getUnitStreams(unit).filter((stream) => isUnitBalanceStream(stream));
  const explicitFeeds = streams.filter((stream) => CDU_FEED_STREAM_IDS.includes(stream.id));
  if (explicitFeeds.length) return explicitFeeds;
  const sourceFeeds = streams.filter((stream) => {
    const fromNode = nodeByTag.get(stream.from);
    const toNode = nodeByTag.get(stream.to);
    const fromType = safeText(fromNode?.type, "").toLowerCase();
    const fromTag = safeText(fromNode?.tag, "").toUpperCase();
    return sameUnit(toNode?.unit, unit)
      && !stream.isFinalProduct
      && (fromType.includes("feed source") || fromTag.includes("SOURCE") || fromTag.includes("CRUDE"));
  });
  if (sourceFeeds.length) return sourceFeeds;
  const overallNode = getCduOverallNode();
  return overallNode && sameUnit(overallNode.unit, unit) ? getNodeInputStreams(overallNode.id) : [];
}

function getUnitFinalProductStreams(unitName, node = null) {
  const unit = safeText(unitName, "").toUpperCase();
  if (!unit) return [];
  return getUnitStreams(unit).filter((stream) => isUnitBalanceStream(stream) && (
    stream.isFinalProduct === true
    || (node && getStreamSplitKey(stream) && isStreamLinkedToSplitSource(stream, node))
  ));
}

function calculateUnitMassBalance(unitName, options = {}) {
  const balanceCategories = options.balanceCategories || HYDROCARBON_BALANCE_CATEGORIES;
  const node = options.node || null;
  const inputSummary = sumStreamFlowrate(getUnitFeedStreams(unitName), { balanceCategories });
  const outputSummary = sumStreamFlowrate(getUnitFinalProductStreams(unitName, node), { balanceCategories });
  return { inputSummary, outputSummary };
}

function shouldIncludeStreamInBalance(stream, options = {}) {
  const categories = normalizeBalanceCategories(options.balanceCategories || options.categories || HYDROCARBON_BALANCE_CATEGORIES);
  if (categories.length === 1 && categories[0] === "hydrocarbon") {
    return normalizeBalanceCategory(stream.balanceCategory) === "hydrocarbon";
  }
  return categories.includes(normalizeBalanceCategory(stream.balanceCategory));
}

function sumStreamFlowrate(streams, options = {}) {
  const allStreams = Array.isArray(streams) ? streams.filter((stream) => isValidStream(stream)) : [];
  const countedStreams = allStreams.filter((stream) => shouldIncludeStreamInBalance(stream, options));
  const missingStreams = [];
  const total = countedStreams.reduce((sum, stream) => {
    const flowM3H = getStreamFlowM3H(stream);
    if (flowM3H === null || flowM3H === undefined || flowM3H === "") {
      missingStreams.push(stream);
      return sum;
    }
    const numericFlow = Number(flowM3H);
    if (!Number.isFinite(numericFlow)) {
      missingStreams.push(stream);
      return sum;
    }
    return sum + numericFlow;
  }, 0);
  return {
    total: roundFlowrate(total),
    streams: allStreams,
    countedStreams,
    missingStreams,
  };
}

function calculateSimpleMassBalance(nodeId) {
  const node = resolveBalanceNode(nodeId);
  if (!node) return null;
  const unitName = node.balanceUnit || node.unit;
  const inputStreams = normalizeBalanceScope(node.balanceScope) === "unit" ? getUnitFeedStreams(unitName) : getNodeInputStreams(node.id);
  const outputStreams = normalizeBalanceScope(node.balanceScope) === "unit" ? getUnitFinalProductStreams(unitName, node) : getNodeOutputStreams(node.id);
  const inputSummary = sumStreamFlowrate(inputStreams, { balanceCategories: node.balanceCategories });
  const outputSummary = sumStreamFlowrate(outputStreams, { balanceCategories: node.balanceCategories });
  return buildMassBalanceResult(node, inputSummary, outputSummary, {
    type: "simple",
    splitTotal: null,
    splitTotalValid: true,
    productFlows: [],
  });
}

function calculateLocalNodeMassBalance(nodeId) {
  const node = resolveBalanceNode(nodeId);
  if (!node) return null;
  const balanceType = normalizeBalanceType(node.balanceType);
  if (balanceType === "none") return null;
  const inputStreams = getNodeInputStreams(node.id);
  const outputStreams = getNodeOutputStreams(node.id);
  const inputSummary = sumStreamFlowrate(inputStreams, { balanceCategories: node.balanceCategories });
  const outputSummary = sumStreamFlowrate(outputStreams, { balanceCategories: node.balanceCategories });
  const notStarted = !normalizeCduRunState(state.cduRunState).hasStarted;

  if (!notStarted && !isNodeReachableFromCrudeSource(node.id)) {
    return buildMassBalanceResult(node, inputSummary, outputSummary, {
      type: balanceType,
      hasImportantInputOverride: false,
      statusOverride: "incomplete",
      productFlows: [],
      noCrudePath: true,
    });
  }

  if (balanceType === "source") {
    const total = outputSummary.total;
    const hasOutput = outputSummary.countedStreams.length > 0;
    return buildMassBalanceResult(node, inputSummary, outputSummary, {
      type: "source",
      totalInputOverride: total,
      totalOutputOverride: total,
      hasImportantInputOverride: hasOutput,
      statusOverride: notStarted ? "notStarted" : !hasOutput || outputSummary.missingStreams.length ? "incomplete" : "balanced",
      productFlows: [],
    });
  }

  if (balanceType === "productPool") {
    const total = inputSummary.total;
    const hasInput = inputSummary.countedStreams.length > 0;
    return buildMassBalanceResult(node, inputSummary, outputSummary, {
      type: "productPool",
      totalOutputOverride: total,
      hasImportantInputOverride: hasInput,
      statusOverride: notStarted ? "notStarted" : !hasInput || inputSummary.missingStreams.length ? "incomplete" : "balanced",
      productFlows: [],
    });
  }

  const result = buildMassBalanceResult(node, inputSummary, outputSummary, {
    type: balanceType === "splitBased" ? "splitBased" : balanceType,
    splitTotal: balanceType === "splitBased" ? getSplitModelTotal(node.splitModel) : null,
    splitTotalValid: balanceType === "splitBased" ? isSplitModelTotalValid(getSplitModelTotal(node.splitModel)) : true,
    productFlows: [],
  });
  if (notStarted) result.status = "notStarted";
  return result;
}

function calculateCduOverallMassBalance() {
  const node = getCduOverallNode();
  return node ? calculateSplitBasedMassBalance(node.id) : null;
}

// CDU Split Model
function calculateSplitBasedMassBalance(nodeId) {
  const node = resolveBalanceNode(nodeId);
  if (!node) return null;
  const splitModel = normalizeSplitModel(node.splitModel);
  const balanceScope = normalizeBalanceScope(node.balanceScope);
  const balanceUnit = safeText(node.balanceUnit, node.unit);
  const inputStreams = balanceScope === "unit" ? getUnitFeedStreams(balanceUnit) : getNodeInputStreams(node.id);
  const outputStreams = balanceScope === "unit" ? getUnitFinalProductStreams(balanceUnit, node) : getNodeOutputStreams(node.id);
  const inputSummary = sumStreamFlowrate(inputStreams, { balanceCategories: node.balanceCategories });
  const splitEntries = Object.entries(splitModel);
  const productFlows = [];
  const missingSplitKeys = [];
  const canEvaluateSplit = inputSummary.total > 0
    && !inputSummary.missingStreams.length
    && (!isCduOverallBalanceNode(node) || state.cduRunState.hasStarted);

  if (canEvaluateSplit) {
    splitEntries.forEach(([key, percent]) => {
      const stream = getSplitStreamForKey(node, key);
      if (!stream) {
        missingSplitKeys.push(key);
        return;
      }
      const calculatedFlow = roundFlowrate((inputSummary.total * Number(percent)) / 100);
      productFlows.push({
        key,
        label: CDU_SPLIT_LABELS[key] || formatSplitKeyLabel(key),
        percent: Number(percent),
        streamId: stream.id,
        calculatedFlowM3H: calculatedFlow,
        flowrate: getStreamFlowM3H(stream),
        flowM3H: getStreamFlowM3H(stream),
        flowMBSD: getStreamFlowMBSD(stream),
        percentCap: getStreamPercentCap(stream),
        flowUnit: DEFAULT_FLOW_UNIT,
      });
    });
  } else {
    splitEntries.forEach(([key, percent]) => {
      const stream = getSplitStreamForKey(node, key);
      if (!stream) missingSplitKeys.push(key);
      productFlows.push({
        key,
        label: CDU_SPLIT_LABELS[key] || formatSplitKeyLabel(key),
        percent: Number(percent),
        streamId: stream?.id || "",
        flowrate: getStreamFlowM3H(stream),
        flowM3H: getStreamFlowM3H(stream),
        flowMBSD: getStreamFlowMBSD(stream),
        percentCap: getStreamPercentCap(stream),
        flowUnit: DEFAULT_FLOW_UNIT,
      });
    });
  }

  const splitStreams = productFlows
    .map((item) => getActiveStreams().find((stream) => stream.id === item.streamId))
    .filter((stream) => stream && isUnitBalanceStream(stream));
  const outputSummary = sumStreamFlowrate(splitStreams.length ? splitStreams : outputStreams, {
    balanceCategories: node.balanceCategories,
  });
  const splitTotal = getSplitModelTotal(splitModel);
  const result = buildMassBalanceResult(node, inputSummary, outputSummary, {
    type: "splitBased",
    splitTotal,
    splitTotalValid: isSplitModelTotalValid(splitTotal),
    productFlows,
    missingSplitKeys,
    cduRunState: isCduOverallBalanceNode(node) ? normalizeCduRunState(state.cduRunState) : null,
    crudeAssay: isCduOverallBalanceNode(node) ? getSelectedCduAssay() : null,
  });
  if (missingSplitKeys.length) result.status = "incomplete";
  if (!result.splitTotalValid && result.status === "balanced") result.status = "warning";
  if (isCduOverallBalanceNode(node) && !state.cduRunState.hasStarted) result.status = "notStarted";
  return result;
}

function calculateNodeMassBalance(nodeId) {
  const node = resolveBalanceNode(nodeId);
  const balanceType = normalizeBalanceType(node?.balanceType);
  if (!node || balanceType === "none") return null;
  if (isCduOverallBalanceNode(node)) return calculateCduOverallMassBalance();
  return calculateLocalNodeMassBalance(node.id);
}

function calculateAllMassBalances() {
  return calculateAllNodeMassBalances();
}

function calculateAllNodeMassBalances() {
  if (!state.massBalanceResults || typeof state.massBalanceResults.clear !== "function") {
    state.massBalanceResults = new Map();
  }
  state.massBalanceResults.clear();
  NODES.forEach((node) => {
    delete node.balanceStatus;
    delete node.balanceResult;
    delete node.localBalanceResult;
    const localResult = calculateLocalNodeMassBalance(node.id);
    if (localResult) node.localBalanceResult = localResult;
    const result = calculateNodeMassBalance(node.id);
    if (result) {
      if (localResult && result !== localResult) result.localBalanceResult = localResult;
      applyMassBalanceStatusToNode(node.id, result);
    }
  });
  applyMassBalanceStatusToAllNodes();
}

function applyMassBalanceStatusToAllNodes() {
  if (!state.massBalanceResults) return;
  state.massBalanceResults.forEach((result, nodeId) => {
    const node = resolveBalanceNode(nodeId);
    if (!node) return;
    node.balanceStatus = result.status;
    node.balanceResult = result;
  });
}

function setAllBalancesNotStarted() {
  if (!state.massBalanceResults || typeof state.massBalanceResults.clear !== "function") {
    state.massBalanceResults = new Map();
  }
  state.massBalanceResults.clear();
  NODES.forEach((node) => {
    if (normalizeBalanceType(node.balanceType) === "none") return;
    const localResult = calculateLocalNodeMassBalance(node.id);
    if (!localResult) return;
    localResult.status = "notStarted";
    node.localBalanceResult = localResult;
    applyMassBalanceStatusToNode(node.id, localResult);
  });
}

function applyMassBalanceStatusToNode(nodeId, result) {
  const node = resolveBalanceNode(nodeId);
  if (!node || !result) return;
  node.balanceStatus = result.status;
  node.balanceResult = result;
  state.massBalanceResults.set(node.id, result);
}

function buildMassBalanceResult(node, inputSummary, outputSummary, extra = {}) {
  const tolerancePercent = normalizeTolerancePercent(node.tolerancePercent);
  const totalInputM3H = roundFlowrate(extra.totalInputOverride ?? inputSummary.total);
  const totalOutputM3H = roundFlowrate(extra.totalOutputOverride ?? outputSummary.total);
  const differenceM3H = roundFlowrate(totalInputM3H - totalOutputM3H);
  const totalInputMBSD = convertM3HToMBSD(totalInputM3H);
  const totalOutputMBSD = convertM3HToMBSD(totalOutputM3H);
  const differenceMBSD = convertM3HToMBSD(differenceM3H);
  const inputPercentCap = calculatePercentCapacityFromM3H(totalInputM3H);
  const outputPercentCap = calculatePercentCapacityFromM3H(totalOutputM3H);
  const errorPercent = totalInputM3H > 0 ? roundFlowrate((Math.abs(differenceM3H) / totalInputM3H) * 100) : null;
  const hasMissingFlow = inputSummary.missingStreams.length > 0 || outputSummary.missingStreams.length > 0;
  const hasImportantInput = typeof extra.hasImportantInputOverride === "boolean"
    ? extra.hasImportantInputOverride
    : inputSummary.countedStreams.length > 0;
  let status = extra.statusOverride || getMassBalanceStatus({
    totalInput: totalInputM3H,
    errorPercent,
    tolerancePercent,
    hasMissingFlow,
    hasImportantInput,
  });
  const recycleStreams = getActiveStreams()
    .filter((stream) => (stream.from === node.tag || stream.to === node.tag) && !isNodeBalanceStream(stream))
    .filter((stream) => stream.isRecycle === true || normalizeStreamBalanceRole(stream.balanceRole) === "recycle" || stream.runtimeRecycleCandidate === true)
    .map((stream) => stream.id);
  const targetStreams = getActiveStreams()
    .filter((stream) => (stream.from === node.tag || stream.to === node.tag) && stream.runtimeTargetResult)
    .map((stream) => stream.id);
  const overConstrainedStreams = getActiveStreams()
    .filter((stream) => (stream.from === node.tag || stream.to === node.tag)
      && (stream.runtimeTargetResult?.status === "over-constrained" || stream.runtimeTargetResult?.message?.toLowerCase().includes("target lebih besar")))
    .map((stream) => stream.id);
  if (overConstrainedStreams.length && status === "balanced") status = "warning";
  return {
    nodeId: node.id,
    nodeTag: node.tag,
    balanceType: extra.type || normalizeBalanceType(node.balanceType),
    balanceScope: normalizeBalanceScope(node.balanceScope),
    balanceUnit: node.balanceUnit || node.unit || "",
    totalInput: totalInputM3H,
    totalOutput: totalOutputM3H,
    difference: differenceM3H,
    totalInputM3H,
    totalOutputM3H,
    totalInputMBSD,
    totalOutputMBSD,
    inputPercentCap,
    outputPercentCap,
    differenceM3H,
    differenceMBSD,
    errorPercent,
    tolerancePercent,
    status,
    hasRecycle: recycleStreams.length > 0,
    recycleStreams,
    hasTarget: targetStreams.length > 0,
    targetStreams,
    overConstrained: overConstrainedStreams.length > 0,
    overConstrainedStreams,
    hasRangeWarning: false,
    rangeWarningStreams: [],
    lastCalculatedAt: new Date().toISOString(),
    inputStreams: (inputSummary.streams || inputSummary.countedStreams).map((stream) => stream.id),
    outputStreams: (outputSummary.streams || outputSummary.countedStreams).map((stream) => stream.id),
    missingStreams: [
      ...inputSummary.missingStreams.map((stream) => stream.id),
      ...outputSummary.missingStreams.map((stream) => stream.id),
    ],
    ...extra,
  };
}

function getMassBalanceStatus({ totalInput, errorPercent, tolerancePercent, hasMissingFlow, hasImportantInput }) {
  if (!hasImportantInput || totalInput <= 0 || hasMissingFlow || errorPercent === null) return "incomplete";
  if (errorPercent <= tolerancePercent) return "balanced";
  if (errorPercent <= tolerancePercent * 4) return "warning";
  return "error";
}

function getMassBalanceResult(nodeOrId) {
  const node = typeof nodeOrId === "object" ? nodeOrId : resolveBalanceNode(nodeOrId);
  if (!node || !state.massBalanceResults) return null;
  return state.massBalanceResults.get(node.id) || null;
}

function getSplitStreamForKey(node, key) {
  const activeStreams = getActiveStreams();
  if (normalizeBalanceScope(node.balanceScope) === "unit") {
    const dynamicProduct = getCduProductPoolNodes()
      .flatMap((poolNode) => getCduProductPoolInputStreams(poolNode))
      .find((stream) => getCduProductKeyForStream(stream) === key);
    if (dynamicProduct) return dynamicProduct;
    const mappedId = CDU_PRODUCT_STREAM_MAP[key];
    const mapped = mappedId ? activeStreams.find((stream) => stream.id === mappedId) : null;
    if (mapped) return mapped;
    const finalProduct = activeStreams.find((stream) => stream.isFinalProduct === true && getStreamSplitKey(stream) === key);
    if (finalProduct) return finalProduct;
  }
  const direct = getNodeOutputStreams(node.id).find((stream) => getStreamSplitKey(stream) === key);
  if (direct) return direct;
  return activeStreams.find((stream) => getStreamSplitKey(stream) === key && isStreamLinkedToSplitSource(stream, node)) || null;
}

function getStreamSplitKey(stream) {
  return safeText(stream?.splitKey, "") || CDU_SPLIT_STREAM_IDS[stream?.id] || "";
}

function getCduProductKeyForStream(stream) {
  if (!stream) return "";
  const explicit = getStreamSplitKey(stream);
  if (explicit) return explicit;
  const mapped = Object.entries(CDU_PRODUCT_STREAM_MAP).find(([, streamId]) => streamId === stream.id);
  if (mapped) return mapped[0];
  const port = safeText(stream.fromPort || stream.outputPort || stream.port, "").toLowerCase();
  const portMap = {
    kerosene: "kerosene",
    kero: "kerosene",
    lgo: "lightGasoil",
    lightgasoil: "lightGasoil",
    light_gasoil: "lightGasoil",
    hgo: "heavyGasoil",
    heavygasoil: "heavyGasoil",
    heavy_gasoil: "heavyGasoil",
    residue2: "residueHVU2",
    residue_hvu2: "residueHVU2",
    residuehvu2: "residueHVU2",
    residue3: "residueHVU3",
    residue_hvu3: "residueHVU3",
    residuehvu3: "residueHVU3",
    offgas: "offGas",
    off_gas: "offGas",
    gas: "offGas",
    light: "lightNaphtha",
    lightnaphtha: "lightNaphtha",
    light_naphtha: "lightNaphtha",
    heavy: "heavyNaphtha",
    heavynaphtha: "heavyNaphtha",
    heavy_naphtha: "heavyNaphtha",
  };
  if (portMap[port]) return portMap[port];
  return "";
}

const CDU_PRODUCT_CONSTRAINT_GROUPS = {
  overhead: ["offGas", "lightNaphtha", "heavyNaphtha"],
};

function getCduProductConstraintDescriptor(stream) {
  if (!stream) return null;
  const singleKey = getCduProductKeyForStream(stream);
  if (singleKey) {
    return {
      type: "single",
      key: singleKey,
      keys: [singleKey],
      groupKey: `product:${singleKey}`,
      label: CDU_SPLIT_LABELS[singleKey] || singleKey,
    };
  }

  const fromRef = safeText(stream.from || stream.fromNodeId || stream.sourceNodeId || "");
  const port = safeText(stream.fromPort || stream.outputPort || stream.port || "").toLowerCase();
  const isCduColumnOutlet = fromRef === "CDU-C-101" || safeText(stream.splitSource, "") === "CDU-C-101";
  if (isCduColumnOutlet && port === "overhead") {
    return {
      type: "group",
      key: "overhead",
      keys: CDU_PRODUCT_CONSTRAINT_GROUPS.overhead.slice(),
      groupKey: "group:overhead",
      label: "Overhead",
    };
  }

  return null;
}

function isCduProductStreamConstraint(stream) {
  return Boolean(getCduProductConstraintDescriptor(stream));
}

function getCduProductKeys() {
  const assay = getSelectedCduAssay?.() || CDU_CRUDE_ASSAYS.medium;
  const splitModel = normalizeSplitModel(assay.splitModel);
  const keys = Object.keys(CDU_SPLIT_LABELS).filter((key) => key in splitModel || CDU_PRODUCT_STREAM_MAP[key]);
  Object.keys(splitModel).forEach((key) => {
    if (!keys.includes(key)) keys.push(key);
  });
  return keys;
}

function getCduProductBaseFlows(availableFlow) {
  const assay = getSelectedCduAssay?.() || CDU_CRUDE_ASSAYS.medium;
  const splitModel = normalizeSplitModel(assay.splitModel);
  const keys = getCduProductKeys();
  const flows = {};
  keys.forEach((key) => {
    flows[key] = roundFlowrate((Number(availableFlow) * (Number(splitModel[key]) || 0)) / 100);
  });
  return closeCduProductFlows(flows, availableFlow);
}

function closeCduProductFlows(flows = {}, availableFlow = null, preferredKey = "") {
  const keys = getCduProductKeys().filter((key) => Object.prototype.hasOwnProperty.call(flows, key));
  if (!keys.length || !Number.isFinite(Number(availableFlow))) return flows;
  const total = roundFlowrate(keys.reduce((sum, key) => sum + (Number(flows[key]) || 0), 0));
  const diff = roundFlowrate(Number(availableFlow) - total);
  if (Math.abs(diff) <= 0.000001) return flows;
  const adjustmentKey = preferredKey && keys.includes(preferredKey)
    ? preferredKey
    : [...keys].sort((a, b) => (Number(flows[b]) || 0) - (Number(flows[a]) || 0))[0];
  flows[adjustmentKey] = roundFlowrate(Math.max(0, (Number(flows[adjustmentKey]) || 0) + diff));
  return flows;
}

function getValidatedCduSolvedProductFlows(availableFlow) {
  const solved = state.cduSolvedProductFlows;
  if (!solved || !Number.isFinite(Number(availableFlow)) || Number(availableFlow) <= 0) return null;
  const keys = getCduProductKeys();
  const flows = {};
  keys.forEach((key) => {
    flows[key] = Math.max(0, Number(solved[key]) || 0);
  });
  const total = roundFlowrate(keys.reduce((sum, key) => sum + (Number(flows[key]) || 0), 0));
  const tolerance = Math.max(Number(availableFlow) * 0.005, 0.0001);
  if (Math.abs(total - Number(availableFlow)) > tolerance) return null;
  return closeCduProductFlows(flows, Number(availableFlow));
}

function setCduSplitModelFromProductFlows(node, productFlows = {}, availableFlow = null) {
  if (!node || !Number.isFinite(Number(availableFlow)) || Number(availableFlow) <= 0) return;
  const splitModel = normalizeSplitModel(node.splitModel);
  getCduProductKeys().forEach((key) => {
    const flow = Number(productFlows[key]);
    if (Number.isFinite(flow)) splitModel[key] = roundFlowrate((flow / Number(availableFlow)) * 100);
  });
  node.splitModel = splitModel;
}

function getCduProductPoolNodes() {
  return NODES.filter((node) => {
    if (normalizeBalanceType(node.balanceType) !== "productPool") return false;
    const inputs = getNodeInputStreams(node.id).filter((stream) => getCduProductKeyForStream(stream));
    if (!inputs.length) return false;
    return inputs.some((stream) => normalizeBalanceCategory(stream.balanceCategory) === "hydrocarbon" && stream.includeInProductTable !== false);
  });
}

function getCduProductPoolInputStreams(node) {
  return getNodeInputStreams(node?.id).filter((stream) => (
    getCduProductKeyForStream(stream)
    && normalizeBalanceCategory(stream.balanceCategory) === "hydrocarbon"
    && stream.includeInProductTable !== false
  ));
}

function getCduProductTableSortIndex(stream, fallbackIndex = 999) {
  const key = getCduProductKeyForStream(stream);
  const known = getCduProductKeys();
  const index = known.indexOf(key);
  return index >= 0 ? index : fallbackIndex;
}

function collectCduProductConstraintStreams(activeStreams = getActiveStreams()) {
  return (activeStreams || [])
    .filter((stream) => isStreamCalculationTarget(stream) && isCduProductStreamConstraint(stream))
    .sort((a, b) => (Number(a.calculationPriority) || 100) - (Number(b.calculationPriority) || 100));
}

function solveCduProductPoolTargets(runtimeState = state, solverState = runtimeState.targetSolver || null) {
  const runState = normalizeCduRunState(state.cduRunState);
  if (!runState.hasStarted) return { handled: false, status: "not-started" };
  const constraintStreams = collectCduProductConstraintStreams(getActiveStreams());
  if (!constraintStreams.length) {
    state.cduSolvedProductFlows = null;
    return { handled: false, status: "no-target" };
  }

  const cduNode = getCduOverallNode();
  const result = getMassBalanceResult(cduNode) || cduNode?.balanceResult || null;
  const availableFlow = Number.isFinite(Number(result?.totalInputM3H)) && Number(result.totalInputM3H) > 0
    ? Number(result.totalInputM3H)
    : Number(runState.crudeIntakeM3H);
  if (!Number.isFinite(availableFlow) || availableFlow <= 0) {
    constraintStreams.forEach((stream) => recordTargetSolverResult(runtimeState, stream, "target-miss", "CDU intake belum tersedia", getStreamTargetFlowM3H(stream)));
    if (solverState) solverState.status = "partial";
    return { handled: true, status: "no-available-flow" };
  }

  const messages = [];
  let overConstrained = false;
  const singleTargetsByKey = new Map();
  const groupTargetsByKey = new Map();

  constraintStreams.forEach((stream) => {
    const descriptor = getCduProductConstraintDescriptor(stream);
    const targetM3H = getStreamTargetFlowM3H(stream);
    const rangeCheck = isStreamTargetInConfiguredRange(stream);
    if (!descriptor || !rangeCheck.ok || !Number.isFinite(Number(targetM3H))) {
      const warning = rangeCheck.message || "Target flow belum tersedia";
      messages.push(warning);
      recordTargetSolverResult(runtimeState, stream, "target-miss", warning, targetM3H);
      return;
    }

    const item = {
      descriptor,
      key: descriptor.key,
      keys: descriptor.keys.slice(),
      stream,
      targetM3H: Number(targetM3H),
      priority: Number(stream.calculationPriority) || 100,
      locked: normalizeStreamRangeMode(stream.rangeMode) === "locked-flow",
    };

    const map = descriptor.type === "group" ? groupTargetsByKey : singleTargetsByKey;
    const existing = map.get(descriptor.groupKey);
    if (existing && Math.abs(existing.targetM3H - item.targetM3H) > Math.max(availableFlow * 0.005, 0.0001)) {
      const warning = `Target ${descriptor.label || descriptor.key} konflik pada beberapa stream`;
      overConstrained = true;
      messages.push(warning);
      recordTargetSolverResult(runtimeState, existing.stream, "over-constrained", warning, existing.targetM3H);
      recordTargetSolverResult(runtimeState, stream, "over-constrained", warning, item.targetM3H);
      return;
    }
    if (!existing || item.locked || item.priority < existing.priority) map.set(descriptor.groupKey, item);
  });

  const baseFlows = getCduProductBaseFlows(availableFlow);
  const solvedFlows = { ...baseFlows };
  const constrainedKeys = new Set();
  const targetOkKeys = new Set();
  const groupTargetItems = Array.from(groupTargetsByKey.values());
  const singleTargetItems = Array.from(singleTargetsByKey.values());

  singleTargetItems.forEach((item) => {
    solvedFlows[item.key] = roundFlowrate(item.targetM3H);
    constrainedKeys.add(item.key);
    targetOkKeys.add(item.key);
  });

  groupTargetItems.forEach((item) => {
    const groupKeys = item.keys.filter((key) => Object.prototype.hasOwnProperty.call(baseFlows, key));
    const fixedInside = groupKeys.reduce((sum, key) => sum + (constrainedKeys.has(key) ? Number(solvedFlows[key]) || 0 : 0), 0);
    const remainingForGroup = roundFlowrate(item.targetM3H - fixedInside);
    if (!groupKeys.length || remainingForGroup < -0.0001) {
      const warning = `Target ${item.descriptor.label || item.key} lebih kecil dari target produk di dalam grup`;
      overConstrained = true;
      messages.push(warning);
      recordTargetSolverResult(runtimeState, item.stream, "over-constrained", warning, item.targetM3H);
      return;
    }

    const adjustableGroupKeys = groupKeys.filter((key) => !constrainedKeys.has(key));
    if (!adjustableGroupKeys.length && Math.abs(remainingForGroup) > 0.0001) {
      const warning = `Tidak ada produk ${item.descriptor.label || item.key} yang dapat disesuaikan`;
      overConstrained = true;
      messages.push(warning);
      recordTargetSolverResult(runtimeState, item.stream, "over-constrained", warning, item.targetM3H);
      return;
    }

    const baseGroupSum = adjustableGroupKeys.reduce((sum, key) => sum + (Number(baseFlows[key]) || 0), 0);
    adjustableGroupKeys.forEach((key, index) => {
      const flow = baseGroupSum > 0
        ? roundFlowrate((remainingForGroup * (Number(baseFlows[key]) || 0)) / baseGroupSum)
        : index === adjustableGroupKeys.length - 1
          ? roundFlowrate(remainingForGroup - roundFlowrate(remainingForGroup / Math.max(1, adjustableGroupKeys.length)) * (adjustableGroupKeys.length - 1))
          : roundFlowrate(remainingForGroup / Math.max(1, adjustableGroupKeys.length));
      solvedFlows[key] = Math.max(0, flow);
    });

    closeCduProductFlows(
      Object.fromEntries(groupKeys.map((key) => [key, solvedFlows[key]])),
      item.targetM3H,
      adjustableGroupKeys[adjustableGroupKeys.length - 1] || groupKeys[groupKeys.length - 1] || "",
    );
    groupKeys.forEach((key) => {
      constrainedKeys.add(key);
      targetOkKeys.add(key);
    });
  });

  const constrainedTotal = roundFlowrate(Array.from(constrainedKeys).reduce((sum, key) => sum + (Number(solvedFlows[key]) || 0), 0));
  if (overConstrained || constrainedTotal > availableFlow * 1.005) {
    const warning = overConstrained ? "Target produk CDU konflik" : "Total target produk CDU melebihi intake CDU";
    state.cduSolvedProductFlows = null;
    markNodeOverConstrained(cduNode, constrainedTotal, availableFlow);
    [...singleTargetItems, ...groupTargetItems].forEach((item) => recordTargetSolverResult(runtimeState, item.stream, "over-constrained", warning, item.targetM3H));
    if (solverState) {
      solverState.status = "over-constrained";
      messages.forEach((message) => solverState.messages.push({ nodeId: cduNode?.id || "", nodeTag: cduNode?.tag || "CDU-C-101", message }));
      solverState.messages.push({ nodeId: cduNode?.id || "", nodeTag: cduNode?.tag || "CDU-C-101", message: warning });
    }
    return { handled: true, ok: false, status: "over-constrained", availableFlow, targetSum: constrainedTotal, messages };
  }

  const adjustableKeys = getCduProductKeys().filter((key) => !constrainedKeys.has(key));
  const remainingFlow = roundFlowrate(availableFlow - constrainedTotal);
  const baseAdjustableSum = adjustableKeys.reduce((sum, key) => sum + (Number(baseFlows[key]) || 0), 0);
  if (!adjustableKeys.length && Math.abs(remainingFlow) > 0.0001) {
    const warning = "Tidak ada produk CDU yang dapat disesuaikan untuk menjaga balance";
    state.cduSolvedProductFlows = null;
    markNodeOverConstrained(cduNode, constrainedTotal, availableFlow);
    [...singleTargetItems, ...groupTargetItems].forEach((item) => recordTargetSolverResult(runtimeState, item.stream, "over-constrained", warning, item.targetM3H));
    if (solverState) {
      solverState.status = "over-constrained";
      solverState.messages.push({ nodeId: cduNode?.id || "", nodeTag: cduNode?.tag || "CDU-C-101", message: warning });
    }
    return { handled: true, ok: false, status: "over-constrained", availableFlow, targetSum: constrainedTotal, messages: [warning, ...messages] };
  }

  adjustableKeys.forEach((key, index) => {
    const flow = baseAdjustableSum > 0
      ? roundFlowrate((remainingFlow * (Number(baseFlows[key]) || 0)) / baseAdjustableSum)
      : index === adjustableKeys.length - 1
        ? roundFlowrate(remainingFlow - roundFlowrate(remainingFlow / Math.max(1, adjustableKeys.length)) * (adjustableKeys.length - 1))
        : roundFlowrate(remainingFlow / Math.max(1, adjustableKeys.length));
    solvedFlows[key] = Math.max(0, flow);
  });
  closeCduProductFlows(solvedFlows, availableFlow, adjustableKeys[adjustableKeys.length - 1] || Array.from(constrainedKeys).pop() || "");

  state.cduSolvedProductFlows = solvedFlows;
  state.cduPropagatedProductFlows = solvedFlows;
  state.cduTargetOkProductKeys = targetOkKeys;
  setCduSplitModelFromProductFlows(cduNode, solvedFlows, availableFlow);
  markNodeCompleteWithTarget(cduNode);

  singleTargetItems.forEach((item) => {
    const status = item.locked ? "locked" : "target-ok";
    const message = item.locked ? "Locked product flow applied" : "Product target flow applied";
    recordTargetSolverResult(runtimeState, item.stream, status, message, item.targetM3H);
  });
  groupTargetItems.forEach((item) => {
    const status = item.locked ? "locked" : "target-ok";
    const message = item.locked ? "Locked product group flow applied" : "Product group target flow applied";
    recordTargetSolverResult(runtimeState, item.stream, status, message, item.targetM3H);
  });

  getActiveStreams().forEach((stream) => {
    const descriptor = getCduProductConstraintDescriptor(stream);
    const streamKey = getCduProductKeyForStream(stream);
    if (streamKey && targetOkKeys.has(streamKey)) {
      const isDirectTarget = singleTargetItems.some((item) => item.stream.id === stream.id);
      const inheritedFromGroup = groupTargetItems.some((item) => item.keys.includes(streamKey));
      if (!isDirectTarget && (stream.isFinalProduct === true || stream.includeInProductTable === true || inheritedFromGroup)) {
        recordTargetSolverResult(runtimeState, stream, "target-ok", inheritedFromGroup ? "Target group applied upstream" : "Target applied upstream", solvedFlows[streamKey]);
      }
      return;
    }
    if (streamKey && !targetOkKeys.has(streamKey) && (stream.includeInProductTable === true || stream.isFinalProduct === true || stream.from === "CDU-C-101")) {
      recordTargetSolverResult(runtimeState, stream, "adjusted", "Adjusted to preserve CDU product balance", null);
    }
  });

  if (solverState) {
    if (solverState.status === "ok") solverState.status = "complete-with-target";
    solverState.nodeResults[cduNode?.tag || "CDU-C-101"] = {
      ok: true,
      status: "complete-with-target",
      nodeId: cduNode?.id || "",
      nodeTag: cduNode?.tag || "CDU-C-101",
      availableFlow,
      targetSum: constrainedTotal,
      remainingFlow,
      acceptedTargets: [...singleTargetItems, ...groupTargetItems].map((item) => item.stream.id),
      missedTargets: [],
      messages,
    };
    messages.forEach((message) => solverState.messages.push({ nodeId: cduNode?.id || "", nodeTag: cduNode?.tag || "CDU-C-101", message }));
  }

  return { handled: true, ok: true, status: "complete-with-target", availableFlow, targetSum: constrainedTotal, remainingFlow, productFlows: solvedFlows, messages };
}

function isStreamLinkedToSplitSource(stream, node) {
  const source = safeText(stream?.splitSource, "");
  return source === node.tag || source === node.id || stream?.from === node.tag;
}

function getSplitModelTotal(splitModel) {
  return roundFlowrate(Object.values(normalizeSplitModel(splitModel)).reduce((sum, value) => sum + Number(value), 0));
}

function isSplitModelTotalValid(total) {
  return Number.isFinite(Number(total)) && Math.abs(Number(total) - SPLIT_MODEL_TOTAL_TARGET) <= SPLIT_MODEL_TOTAL_TOLERANCE;
}

function roundFlowrate(value) {
  if (!Number.isFinite(Number(value))) return 0;
  return Math.round(Number(value) * 1000000) / 1000000;
}

function formatSplitKeyLabel(key) {
  return safeText(key, "")
    .replace(/([A-Z])/g, " $1")
    .replace(/\s+/g, " ")
    .trim()
    .replace(/^./, (char) => char.toUpperCase());
}

// Balance UI Rendering
function getBalanceStatusClass(node) {
  const status = getMassBalanceResult(node)?.status || node?.balanceStatus || "";
  if (status === "notStarted") return "balance-not-started";
  return ["balanced", "warning", "error", "incomplete"].includes(status) ? `balance-${status}` : "";
}

function getNodeMiniBalanceText(node) {
  if (state.showNodeBalance === false) return "";
  const result = getMassBalanceResult(node) || node?.balanceResult || node?.localBalanceResult;
  const balanceType = normalizeBalanceType(node?.balanceType);
  if (!result || result.status === "notStarted") return balanceType === "none" ? "" : "Not Started";
  if (result.noCrudePath) return "No crude path";
  const hasInputStreams = Array.isArray(result.inputStreams) && result.inputStreams.length > 0;
  const hasOutputStreams = Array.isArray(result.outputStreams) && result.outputStreams.length > 0;
  const expectsInput = !["source", "none"].includes(balanceType);
  const expectsOutput = !["productPool", "none"].includes(balanceType);
  const missingRequiredEndpoint = (expectsInput && !hasInputStreams) || (expectsOutput && !hasOutputStreams);
  if (result.status === "incomplete" || missingRequiredEndpoint || (Array.isArray(result.missingStreams) && result.missingStreams.length)) {
    return hasInputStreams || hasOutputStreams ? "Incomplete" : "No active stream";
  }
  let m3h = result.totalOutputM3H;
  let mbsd = result.totalOutputMBSD;
  let percentCap = result.outputPercentCap;
  if (balanceType === "productPool") {
    m3h = result.totalInputM3H;
    mbsd = result.totalInputMBSD;
    percentCap = result.inputPercentCap;
  } else if (balanceType === "source" || !Number.isFinite(Number(m3h)) || Number(m3h) <= 0) {
    m3h = result.totalInputM3H > 0 ? result.totalInputM3H : result.totalOutputM3H;
    mbsd = result.totalInputM3H > 0 ? result.totalInputMBSD : result.totalOutputMBSD;
    percentCap = result.totalInputM3H > 0 ? result.inputPercentCap : result.outputPercentCap;
  }
  if (!Number.isFinite(Number(m3h))) return "Incomplete";
  if (Number(m3h) === 0 && result.status !== "balanced") return "Incomplete";
  const compact = getNodeWidth(node) < 150 || getNodeHeight(node) < 84;
  return formatMiniBalanceText(m3h, mbsd, percentCap, compact);
}

function formatMassBalanceStatus(status) {
  const labels = {
    balanced: "Balanced",
    warning: "Warning",
    error: "Error",
    incomplete: "Incomplete",
    notStarted: "Not Started",
  };
  return labels[status] || "Not calculated";
}

function formatMassBalanceResultStatus(result) {
  if (!result) return "Not calculated";
  if (result.runtimeStatus === "complete-with-target") return "Complete with Target";
  if (result.runtimeStatus === "over-constrained") return "Over-constrained";
  if (result.overConstrained) return "Over-constrained";
  const complete = result.status === "balanced";
  const parts = [complete ? "Complete" : formatMassBalanceStatus(result.status)];
  if (complete && result.hasTarget) parts[0] = "Complete with Target";
  if (result.hasRecycle && complete) parts.push("Recycle OK");
  if (result.hasRangeWarning && complete) parts.push("Range Warning");
  return parts.join(" · ");
}

function formatNumber(value, digits = 2) {
  if (value === null || value === undefined || value === "") return "-";
  if (!Number.isFinite(Number(value))) return "-";
  return Number(value).toLocaleString("en-US", {
    minimumFractionDigits: digits,
    maximumFractionDigits: digits,
  });
}

function formatFlowrateValue(value, unit = DEFAULT_FLOW_UNIT) {
  if (value === null || value === undefined || value === "") return "-";
  if (!Number.isFinite(Number(value))) return "-";
  return `${formatNumber(Number(value), 2)} ${unit || DEFAULT_FLOW_UNIT}`;
}

function formatRangeText(min, target, max, unit = "") {
  const parts = [
    ["Min", normalizeNullableNumber(min)],
    ["Target", normalizeNullableNumber(target)],
    ["Max", normalizeNullableNumber(max)],
  ].filter(([, value]) => value !== null)
    .map(([label, value]) => `${label} ${formatNumber(value, 2)}${unit ? ` ${unit}` : ""}`);
  return parts.length ? parts.join(" · ") : "-";
}

function formatPercentValue(value) {
  if (value === null || value === undefined || value === "") return "-";
  if (!Number.isFinite(Number(value))) return "-";
  return `${formatNumber(Number(value), 2)}%`;
}

function getCduBaseCapacity() {
  state.cduBaseCapacity = normalizeCduBaseCapacity(state.cduBaseCapacity);
  return state.cduBaseCapacity;
}

function getCduCrudeDensityDefault(crudeType = "") {
  const type = CDU_CRUDE_ASSAYS[crudeType] ? crudeType : normalizeCduRunState(state.cduRunState).selectedCrudeType;
  if (type === "light") return CDU_STREAM_DENSITY_DEFAULTS.crudeLight;
  if (type === "heavy") return CDU_STREAM_DENSITY_DEFAULTS.crudeHeavy;
  return CDU_STREAM_DENSITY_DEFAULTS.crudeMedium;
}

function getDensityForStream(stream) {
  const explicitDensity = normalizeNullableNumber(stream?.densityTonM3);
  if (explicitDensity && explicitDensity > 0) return explicitDensity;
  const processDensity = normalizeNullableNumber(stream?.density);
  if (processDensity && processDensity > 0 && processDensity < 5) return processDensity;
  const splitKey = getStreamSplitKey(stream);
  if (splitKey && CDU_STREAM_DENSITY_DEFAULTS[splitKey]) return CDU_STREAM_DENSITY_DEFAULTS[splitKey];
  if (stream?.id === "S-CDU-001" || safeText(stream?.label, "").toLowerCase().includes("crude")) {
    return getCduCrudeDensityDefault();
  }
  if (normalizeBalanceCategory(stream?.balanceCategory) === "water" || normalizeStreamPhase(stream?.phase) === "water") {
    return CDU_STREAM_DENSITY_DEFAULTS.water;
  }
  if (normalizeStreamPhase(stream?.phase) === "gas") return CDU_STREAM_DENSITY_DEFAULTS.offGas;
  return CDU_STREAM_DENSITY_DEFAULTS.crudeMedium;
}

function convertTonHrToM3H(tonHr, densityTonM3) {
  const flow = Number(tonHr);
  const density = Number(densityTonM3);
  if (!Number.isFinite(flow) || !Number.isFinite(density) || density <= 0) return null;
  return roundFlowrate(flow / density);
}

function convertM3HToMBSD(m3h) {
  const value = Number(m3h);
  const capacity = getCduBaseCapacity();
  if (!Number.isFinite(value) || !Number.isFinite(capacity.m3h) || !Number.isFinite(capacity.mbsd) || capacity.m3h <= 0) return null;
  return roundFlowrate((value / capacity.m3h) * capacity.mbsd);
}

function convertMBSDToM3H(mbsd) {
  const value = Number(mbsd);
  const capacity = getCduBaseCapacity();
  if (!Number.isFinite(value) || !Number.isFinite(capacity.m3h) || !Number.isFinite(capacity.mbsd) || capacity.mbsd <= 0) return null;
  return roundFlowrate((value / capacity.mbsd) * capacity.m3h);
}

function calculatePercentCapacityFromM3H(m3h) {
  const value = Number(m3h);
  const capacity = getCduBaseCapacity();
  if (!Number.isFinite(value) || !Number.isFinite(capacity.m3h) || capacity.m3h <= 0) return null;
  return roundFlowrate((value / capacity.m3h) * 100);
}

function calculatePercentCapacity(m3h) {
  return calculatePercentCapacityFromM3H(m3h);
}

function getStreamFlowM3H(stream) {
  const explicit = normalizeNullableNumber(stream?.flowM3H);
  if (explicit !== null) return explicit;
  const flowrate = normalizeNullableNumber(stream?.flowrate);
  if (flowrate === null) return null;
  const unit = safeText(stream?.flowUnit, DEFAULT_FLOW_UNIT).toLowerCase();
  if (unit.includes("m3") || unit.includes("m³") || unit.includes("m^3")) return flowrate;
  const density = getDensityForStream(stream);
  return convertTonHrToM3H(flowrate, density);
}

function updateStreamVolumeMetrics(stream, flowM3H) {
  if (!stream) return null;
  const normalizedFlow = normalizeNullableNumber(flowM3H);
  stream.flowM3H = normalizedFlow;
  stream.flowMBSD = normalizedFlow === null ? null : convertM3HToMBSD(normalizedFlow);
  stream.percentCap = normalizedFlow === null ? null : calculatePercentCapacityFromM3H(normalizedFlow);
  return stream;
}

function recalculateCduVolumeMetrics() {
  STREAMS.forEach((stream) => updateStreamVolumeMetrics(stream, getStreamFlowM3H(stream)));
}

function getStreamFlowMBSD(stream) {
  const explicit = normalizeNullableNumber(stream?.flowMBSD);
  if (explicit !== null) return explicit;
  return convertM3HToMBSD(getStreamFlowM3H(stream));
}

function convertFlowValue(value, fromUnit, toUnit) {
  const numeric = normalizeNullableNumber(value);
  if (numeric === null) return null;
  const from = normalizeStreamFlowRangeUnit(fromUnit);
  const to = normalizeStreamFlowRangeUnit(toUnit);
  if (from === to) return numeric;
  if (from === "m3/h" && to === "MBSD") return convertM3HToMBSD(numeric);
  if (from === "MBSD" && to === "m3/h") return convertMBSDToM3H(numeric);
  return numeric;
}

function getStreamFlowValue(stream, unit = DEFAULT_FLOW_UNIT) {
  const targetUnit = normalizeStreamFlowRangeUnit(unit);
  if (targetUnit === "MBSD") {
    const explicit = normalizeNullableNumber(stream?.flowMBSD);
    if (explicit !== null) return explicit;
    return convertM3HToMBSD(getStreamFlowM3H(stream));
  }
  const explicit = normalizeNullableNumber(stream?.flowM3H);
  if (explicit !== null) return explicit;
  const mbsd = normalizeNullableNumber(stream?.flowMBSD);
  if (mbsd !== null) return convertMBSDToM3H(mbsd);
  return getStreamFlowM3H(stream);
}

function hasConfiguredFlowRange(stream) {
  return normalizeNullableNumber(stream?.flowMin) !== null
    || normalizeNullableNumber(stream?.flowTarget) !== null
    || normalizeNullableNumber(stream?.flowMax) !== null;
}

function evaluateStreamRange(stream) {
  const unit = normalizeStreamFlowRangeUnit(stream?.flowRangeUnit || stream?.flowUnit || DEFAULT_FLOW_UNIT);
  const actual = getStreamFlowValue(stream, unit);
  const min = normalizeNullableNumber(stream?.flowMin);
  const max = normalizeNullableNumber(stream?.flowMax);

  if (actual === null || actual === undefined || Number.isNaN(Number(actual))) {
    return {
      status: "not-set",
      label: "NOT SET",
      message: "Flow belum tersedia",
      actual: null,
      unit,
    };
  }

  const numericActual = Number(actual);
  if (min !== null && numericActual < min) {
    return {
      status: "low",
      label: "LOW",
      message: "Flow di bawah minimum",
      actual: numericActual,
      unit,
    };
  }

  if (max !== null && numericActual > max) {
    return {
      status: "high",
      label: "HIGH",
      message: "Flow di atas maksimum",
      actual: numericActual,
      unit,
    };
  }

  if (hasConfiguredFlowRange(stream)) {
    return {
      status: "ok",
      label: "OK",
      message: "Flow dalam range operasi",
      actual: numericActual,
      unit,
    };
  }

  return {
    status: "not-set",
    label: "NOT SET",
    message: "Range belum diatur",
    actual: numericActual,
    unit,
  };
}

function evaluateAllStreamRanges() {
  getActiveStreams().forEach((stream) => {
    const result = evaluateStreamRange(stream);
    stream.runtimeRange = result;
    if (stream.runtimeTargetResult?.status === "locked") {
      stream.rangeStatus = "locked";
    } else if (stream.runtimeTargetResult?.status === "target-ok") {
      stream.rangeStatus = "target-ok";
    } else if (stream.runtimeTargetResult?.status === "adjusted") {
      stream.rangeStatus = "adjusted";
    } else if (stream.runtimeTargetResult?.status === "over-constrained") {
      stream.rangeStatus = "over-constrained";
    } else if (stream.runtimeTargetResult?.status === "target-miss") {
      stream.rangeStatus = "target-miss";
    } else {
      stream.rangeStatus = result.status;
    }
  });
  applyStreamRangeWarningsToNodes();
  return getActiveStreams().map((stream) => stream.runtimeRange).filter(Boolean);
}

function applyStreamRangeWarningsToNodes() {
  const warningByNodeTag = new Map();
  getActiveStreams().forEach((stream) => {
    const status = stream.runtimeRange?.status;
    if (status !== "low" && status !== "high") return;
    [stream.from, stream.to].forEach((tag) => {
      if (!warningByNodeTag.has(tag)) warningByNodeTag.set(tag, []);
      warningByNodeTag.get(tag).push(stream.id);
    });
  });
  NODES.forEach((node) => {
    const result = node.balanceResult || getMassBalanceResult(node);
    if (!result) return;
    const warnings = warningByNodeTag.get(node.tag) || [];
    result.hasRangeWarning = warnings.length > 0;
    result.rangeWarningStreams = warnings;
  });
}

function evaluateConstraintGroups(streams = getActiveStreams()) {
  const groups = new Map();
  (Array.isArray(streams) ? streams : []).forEach((stream) => {
    const groupId = safeText(stream.constraintGroup, "");
    if (!groupId) return;
    const range = stream.runtimeRange || evaluateStreamRange(stream);
    const unit = range.unit || normalizeStreamFlowRangeUnit(stream.flowRangeUnit);
    const actual = normalizeNullableNumber(range.actual);
    if (!groups.has(groupId)) {
      groups.set(groupId, { id: groupId, unit, totalActual: 0, streams: [], status: "not-set" });
    }
    const group = groups.get(groupId);
    group.streams.push(stream.id);
    if (actual !== null) group.totalActual += convertFlowValue(actual, unit, group.unit) || 0;
    if (range.status === "low" || range.status === "high") group.status = "warning";
    if (group.status === "not-set" && range.status === "ok") group.status = "ok";
  });
  return Array.from(groups.values()).map((group) => ({
    ...group,
    totalActual: roundFlowrate(group.totalActual),
  }));
}

function getStreamTargetFlow(stream) {
  if (!stream) return null;
  if (normalizeStreamRangeMode(stream.rangeMode) === "locked-flow" && normalizeNullableNumber(stream.lockedFlow) !== null) {
    return normalizeNullableNumber(stream.lockedFlow);
  }
  if (normalizeNullableNumber(stream.flowTarget) !== null) return normalizeNullableNumber(stream.flowTarget);
  const min = normalizeNullableNumber(stream.flowMin);
  const max = normalizeNullableNumber(stream.flowMax);
  if (min !== null && max !== null) return roundFlowrate((min + max) / 2);
  return null;
}

function getStreamTargetFlowM3H(stream) {
  const target = getStreamTargetFlow(stream);
  if (target === null) return null;
  return convertFlowValue(target, stream.flowRangeUnit || DEFAULT_FLOW_UNIT, DEFAULT_FLOW_UNIT);
}

function getTargetFlowM3H(stream) {
  return getStreamTargetFlowM3H(stream);
}

function isStreamCalculationTarget(stream) {
  if (!stream) return false;
  const mode = normalizeStreamRangeMode(stream.rangeMode);
  return stream.useAsCalculationTarget === true || mode === "control-target" || mode === "locked-flow";
}

function isProtectedTargetStream(stream, activeStream = null) {
  if (!stream || stream.id === activeStream?.id) return false;
  return normalizeStreamRangeMode(stream.rangeMode) === "locked-flow"
    || stream.runtimeTargetResult?.status === "target-ok"
    || stream.runtimeTargetResult?.status === "locked";
}

function getStreamSourceNodeRef(stream) {
  return safeText(stream?.from || stream?.fromNodeId || stream?.sourceNodeId || stream?.source, "");
}

function streamBelongsToNodeSource(stream, node) {
  const fromId = getStreamSourceNodeRef(stream);
  return Boolean(node && (fromId === node.id || fromId === node.tag));
}

function getNodeOutgoingBalanceStreams(node, streams = getActiveStreams()) {
  return (Array.isArray(streams) ? streams : []).filter((stream) => (
    isNodeBalanceStream(stream) && streamBelongsToNodeSource(stream, node)
  ));
}

function getStreamTargetGroupKey(stream) {
  const constraintGroup = safeText(stream?.constraintGroup, "");
  if (constraintGroup) return `constraint:${constraintGroup}`;
  return "";
}

function getSiblingOutputGroupForTarget(node, targetStream, outgoingStreams) {
  const groupKey = getStreamTargetGroupKey(targetStream);
  if (!groupKey) return outgoingStreams;
  return outgoingStreams.filter((stream) => getStreamTargetGroupKey(stream) === groupKey);
}

function getTargetStreamsForNode(node, outgoingStreams) {
  return (outgoingStreams || [])
    .filter((stream) => isStreamCalculationTarget(stream))
    .sort((a, b) => (Number(a.calculationPriority) || 100) - (Number(b.calculationPriority) || 100));
}

function getBaseOrRuntimeStreamFlowM3H(runtimeState, streamId) {
  const base = runtimeState?.targetBaseFlows?.[streamId];
  if (Number.isFinite(Number(base))) return Number(base);
  return getStreamFlowM3H(findStreamById(streamId));
}

function setRuntimeStreamFlow(runtimeState, streamId, flowM3H, options = {}) {
  const stream = findStreamById(streamId);
  if (!stream) return null;
  if (!runtimeState.streamFlows) runtimeState.streamFlows = {};
  const normalizedFlow = normalizeNullableNumber(flowM3H);
  runtimeState.streamFlows[streamId] = normalizedFlow;
  updateStreamFlow(stream, normalizedFlow, { isCalculated: true, ...options });
  return stream;
}

function getRuntimeStreamFlowM3H(runtimeState, streamId) {
  const runtimeFlow = runtimeState?.streamFlows?.[streamId];
  if (Number.isFinite(Number(runtimeFlow))) return Number(runtimeFlow);
  return getStreamFlowM3H(findStreamById(streamId));
}

function getNodeAvailableFlow(node, runtimeState = state, outgoingGroup = null) {
  if (!node) return null;
  const allOutgoing = getNodeOutgoingBalanceStreams(node);
  const group = Array.isArray(outgoingGroup) ? outgoingGroup : [];
  const isSubsetGroup = group.length > 0 && group.length < allOutgoing.length;
  if (isSubsetGroup) {
    const groupTotal = group.reduce((sum, stream) => {
      const flow = getBaseOrRuntimeStreamFlowM3H(runtimeState, stream.id);
      return sum + (Number.isFinite(Number(flow)) ? Number(flow) : 0);
    }, 0);
    if (groupTotal > 0) return roundFlowrate(groupTotal);
  }
  const currentResult = getMassBalanceResult(node) || node.balanceResult || node.localBalanceResult;
  if (Number.isFinite(Number(currentResult?.totalInputM3H)) && Number(currentResult.totalInputM3H) > 0) {
    return Number(currentResult.totalInputM3H);
  }
  const inputSummary = sumStreamFlowrate(getNodeInputStreams(node.id), { balanceCategories: node.balanceCategories });
  if (Number.isFinite(Number(inputSummary.total)) && Number(inputSummary.total) > 0) {
    if (!isSubsetGroup) return Number(inputSummary.total);
  }
  const groupStreams = Array.isArray(outgoingGroup) && outgoingGroup.length ? outgoingGroup : getNodeOutgoingBalanceStreams(node);
  const groupTotal = groupStreams.reduce((sum, stream) => {
    const flow = getBaseOrRuntimeStreamFlowM3H(runtimeState, stream.id);
    return sum + (Number.isFinite(Number(flow)) ? Number(flow) : 0);
  }, 0);
  if (groupTotal > 0) return roundFlowrate(groupTotal);
  if (Number.isFinite(Number(inputSummary.total)) && Number(inputSummary.total) > 0) return Number(inputSummary.total);
  const sourceFlow = normalizeNullableNumber(node.flowM3H ?? node.flowrate);
  return sourceFlow !== null && sourceFlow > 0 ? sourceFlow : null;
}

function distributeRemainingFlow(adjustableStreams, remainingFlow, runtimeState) {
  const adjustable = (adjustableStreams || []).filter(Boolean);
  const remaining = Number(remainingFlow);
  if (!adjustable.length) {
    if (Math.abs(remaining || 0) > 0.0001) {
      runtimeState.unallocatedFlow = roundFlowrate((Number(runtimeState.unallocatedFlow) || 0) + remaining);
    }
    return [];
  }
  const baseFlows = adjustable.map((stream) => ({
    stream,
    baseFlow: Math.max(0, Number(getBaseOrRuntimeStreamFlowM3H(runtimeState, stream.id)) || 0),
  }));
  const baseSum = baseFlows.reduce((sum, item) => sum + item.baseFlow, 0);
  const equalFlow = roundFlowrate(remaining / adjustable.length);
  const updated = [];
  baseFlows.forEach((item, index) => {
    const flow = baseSum > 0
      ? roundFlowrate((remaining * item.baseFlow) / baseSum)
      : index === adjustable.length - 1
        ? roundFlowrate(remaining - equalFlow * (adjustable.length - 1))
        : equalFlow;
    setRuntimeStreamFlow(runtimeState, item.stream.id, Math.max(0, flow), { isCalculated: true });
    recordTargetSolverResult(runtimeState, item.stream, "adjusted", "Adjusted to preserve node output balance", null);
    updated.push(item.stream);
  });
  return updated;
}

function getNodeOutputFlow(node, runtimeState = state, outgoingStreams = null) {
  const streams = Array.isArray(outgoingStreams) ? outgoingStreams : getNodeOutgoingBalanceStreams(node);
  return roundFlowrate(streams.reduce((sum, stream) => {
    const flow = getRuntimeStreamFlowM3H(runtimeState, stream.id);
    return sum + (Number.isFinite(Number(flow)) ? Number(flow) : 0);
  }, 0));
}

function assertNodeConservation(node, runtimeState = state, outgoingStreams = null, availableFlow = null) {
  const input = Number.isFinite(Number(availableFlow)) ? Number(availableFlow) : getNodeAvailableFlow(node, runtimeState, outgoingStreams);
  const output = getNodeOutputFlow(node, runtimeState, outgoingStreams);
  if (!Number.isFinite(input) || input <= 0) return { ok: false, input, output, percent: null };
  const percent = roundFlowrate((output / input) * 100);
  const ok = percent <= 100.5 && percent >= 99.5;
  if (!ok) {
    console.warn("[MassBalance] Node conservation failed", {
      node: node?.id || node?.tag,
      input,
      output,
      percent,
    });
  }
  return { ok, input, output, percent, diff: roundFlowrate(output - input) };
}

function markNodeCompleteWithTarget(node) {
  if (!node) return;
  node.targetSolverStatus = "complete-with-target";
}

function markNodeOverConstrained(node, targetSum, availableFlow) {
  if (!node) return;
  node.targetSolverStatus = "over-constrained";
  node.targetSolverMessage = "Total target flow exceeds available node flow";
  node.targetSolverTargetSum = targetSum;
  node.targetSolverAvailableFlow = availableFlow;
}

function markNodeRangeWarning(node, diff) {
  if (!node) return;
  node.targetSolverStatus = "imbalance-after-target";
  node.targetSolverMessage = "Output does not match available flow after target redistribution";
  node.targetSolverDifference = diff;
}

function markTargetResult(stream, status, message, targetM3H = null) {
  if (!stream) return null;
  const actualM3H = getStreamFlowM3H(stream);
  const targetMBSD = targetM3H === null ? null : convertM3HToMBSD(targetM3H);
  stream.runtimeTargetResult = {
    status,
    label: status === "locked"
      ? "LOCKED"
      : status === "target-ok"
        ? "TARGET OK"
        : status === "adjusted"
          ? "ADJUSTED"
          : status === "over-constrained"
            ? "OVER-CONSTRAINED"
            : "TARGET MISS",
    message,
    targetM3H,
    targetMBSD,
    actualM3H,
    actualMBSD: convertM3HToMBSD(actualM3H),
    solvedAt: new Date().toISOString(),
  };
  stream.rangeStatus = status === "locked"
    ? "locked"
    : status === "target-ok"
      ? "target-ok"
      : status === "adjusted"
        ? "adjusted"
        : status === "over-constrained"
          ? "over-constrained"
          : "target-miss";
  return stream.runtimeTargetResult;
}

function getTargetNodeAvailableFlowM3H(node, outputs) {
  if (!node) return null;
  const inputSummary = sumStreamFlowrate(getNodeInputStreams(node.id), { balanceCategories: node.balanceCategories });
  if (Number.isFinite(Number(inputSummary.total)) && Number(inputSummary.total) > 0) return Number(inputSummary.total);
  const outputTotal = (outputs || []).reduce((sum, stream) => sum + (Number(getStreamFlowM3H(stream)) || 0), 0);
  return outputTotal > 0 ? roundFlowrate(outputTotal) : null;
}

function distributeRemainingToSiblings(siblings, remainingM3H) {
  const adjustable = (siblings || []).filter(Boolean);
  if (!adjustable.length) return [];
  const currentTotal = adjustable.reduce((sum, stream) => sum + (Number(getStreamFlowM3H(stream)) || 0), 0);
  const equalShare = roundFlowrate(remainingM3H / adjustable.length);
  const updated = [];
  adjustable.forEach((stream, index) => {
    const flow = currentTotal > 0
      ? roundFlowrate((remainingM3H * (Number(getStreamFlowM3H(stream)) || 0)) / currentTotal)
      : index === adjustable.length - 1
        ? roundFlowrate(remainingM3H - equalShare * (adjustable.length - 1))
        : equalShare;
    updateStreamFlow(stream, Math.max(0, flow), { isCalculated: true });
    updated.push(stream);
  });
  return updated;
}

function applyAdjustSiblingsTarget(stream, targetM3H) {
  const node = nodeByTag.get(stream.from);
  if (!node) return { ok: false, status: "target-miss", message: "Target node tidak ditemukan" };
  const outputs = getActiveStreams().filter((item) => item.from === node.tag && isNodeBalanceStream(item));
  const available = getTargetNodeAvailableFlowM3H(node, outputs);
  if (!Number.isFinite(Number(available)) || Number(available) <= 0) {
    return { ok: false, status: "target-miss", message: "Available node feed belum tersedia" };
  }
  const protectedTotal = outputs
    .filter((item) => isProtectedTargetStream(item, stream))
    .reduce((sum, item) => sum + (Number(getStreamFlowM3H(item)) || 0), 0);
  const tolerance = normalizeTolerancePercent(stream.targetTolerancePercent);
  if (targetM3H + protectedTotal > available * (1 + tolerance / 100)) {
    return {
      ok: false,
      status: "over-constrained",
      message: "Total target lebih besar dari available input node",
      available,
      protectedTotal,
    };
  }
  const adjustableSiblings = outputs.filter((item) => item.id !== stream.id && !isProtectedTargetStream(item, stream));
  const remaining = Math.max(0, roundFlowrate(available - targetM3H - protectedTotal));
  updateStreamFlow(stream, targetM3H, { isCalculated: true });
  distributeRemainingToSiblings(adjustableSiblings, remaining);
  return {
    ok: true,
    status: normalizeStreamRangeMode(stream.rangeMode) === "locked-flow" ? "locked" : "target-ok",
    message: "Target applied; sibling streams adjusted",
    available,
  };
}

function applyAdjustSplitRatioTarget(stream, targetM3H) {
  const node = nodeByTag.get(stream.from);
  if (!node) return { ok: false, status: "target-miss", message: "Split node tidak ditemukan" };
  const outputs = getActiveStreams().filter((item) => item.from === node.tag && isNodeBalanceStream(item));
  const available = getTargetNodeAvailableFlowM3H(node, outputs);
  if (!Number.isFinite(Number(available)) || Number(available) <= 0) {
    return { ok: false, status: "target-miss", message: "Available split feed belum tersedia" };
  }
  const targetPercent = roundFlowrate((targetM3H / available) * 100);
  if (targetPercent < 0 || targetPercent > 100) {
    return { ok: false, status: "over-constrained", message: "Target split ratio di luar 0-100%" };
  }
  const targetKey = getStreamSplitKey(stream);
  const splitModel = normalizeSplitModel(node.splitModel);
  if (targetKey) splitModel[targetKey] = targetPercent;
  const siblingStreams = outputs.filter((item) => item.id !== stream.id && getStreamSplitKey(item));
  const protectedSiblings = siblingStreams.filter((item) => isProtectedTargetStream(item, stream));
  const protectedPercent = protectedSiblings.reduce((sum, item) => {
    const flow = Number(getStreamFlowM3H(item)) || 0;
    return sum + (flow / available) * 100;
  }, 0);
  const remainingPercent = roundFlowrate(100 - targetPercent - protectedPercent);
  if (remainingPercent < -0.0001) {
    return { ok: false, status: "over-constrained", message: "Total target split lebih besar dari 100%" };
  }
  const adjustableSiblings = siblingStreams.filter((item) => !isProtectedTargetStream(item, stream));
  const basePercentTotal = adjustableSiblings.reduce((sum, item) => {
    const key = getStreamSplitKey(item);
    return sum + (Number(splitModel[key]) || (Number(getStreamFlowM3H(item)) || 0) / available * 100);
  }, 0);
  adjustableSiblings.forEach((item, index) => {
    const key = getStreamSplitKey(item);
    if (!key) return;
    const base = Number(splitModel[key]) || (Number(getStreamFlowM3H(item)) || 0) / available * 100;
    splitModel[key] = basePercentTotal > 0
      ? roundFlowrate((remainingPercent * base) / basePercentTotal)
      : roundFlowrate(remainingPercent / Math.max(1, adjustableSiblings.length));
    if (index === adjustableSiblings.length - 1) {
      const used = adjustableSiblings
        .slice(0, -1)
        .reduce((sum, sibling) => sum + (Number(splitModel[getStreamSplitKey(sibling)]) || 0), 0);
      splitModel[key] = roundFlowrate(Math.max(0, remainingPercent - used));
    }
  });
  node.splitModel = splitModel;
  return applyAdjustSiblingsTarget(stream, targetM3H);
}

function getNodeAvailableOutputFlow(node, runtimeState = state) {
  const outputs = getActiveStreams().filter((stream) => stream.from === node?.tag && isNodeBalanceStream(stream));
  return getTargetNodeAvailableFlowM3H(node, outputs);
}

function isStreamTargetInConfiguredRange(stream) {
  const target = getStreamTargetFlow(stream);
  if (target === null) return { ok: false, message: "Target flow belum tersedia" };
  const min = normalizeNullableNumber(stream.flowMin);
  const max = normalizeNullableNumber(stream.flowMax);
  if ((min !== null && target < min) || (max !== null && target > max)) {
    return { ok: false, message: "Flow Target harus berada di antara Flow Min dan Flow Max." };
  }
  return { ok: true, target };
}

function recordTargetSolverResult(runtimeState, stream, status, message, targetM3H = null) {
  const result = markTargetResult(stream, status, message, targetM3H);
  if (!runtimeState.targetSolver) {
    runtimeState.targetSolver = {
      status: "ok",
      messages: [],
      targetResults: {},
    };
  }
  const unit = normalizeStreamFlowRangeUnit(stream?.flowRangeUnit || DEFAULT_FLOW_UNIT);
  runtimeState.targetSolver.targetResults[stream.id] = {
    target: targetM3H === null ? null : convertFlowValue(targetM3H, DEFAULT_FLOW_UNIT, unit),
    actual: getStreamFlowValue(stream, unit),
    unit,
    status,
    message,
  };
  return result;
}

function updateSplitModelFromSolvedOutputs(node, outputStreams, availableFlow) {
  if (!node || !Number.isFinite(Number(availableFlow)) || Number(availableFlow) <= 0) return;
  const splitModel = normalizeSplitModel(node.splitModel);
  const flows = { ...(state.cduPropagatedProductFlows || {}) };
  let changed = false;

  (outputStreams || []).forEach((stream) => {
    const flow = Number(getStreamFlowM3H(stream));
    if (!Number.isFinite(flow)) return;

    const key = getStreamSplitKey(stream) || getCduProductKeyForStream(stream);
    if (key) {
      flows[key] = roundFlowrate(flow);
      splitModel[key] = roundFlowrate((flow / Number(availableFlow)) * 100);
      changed = true;
      return;
    }

    const descriptor = getCduProductConstraintDescriptor(stream);
    if (descriptor?.type === "group") {
      const groupKeys = descriptor.keys.filter((itemKey) => Object.prototype.hasOwnProperty.call(splitModel, itemKey));
      const baseGroupSum = groupKeys.reduce((sum, itemKey) => sum + (Number(splitModel[itemKey]) || 0), 0);
      groupKeys.forEach((itemKey, index) => {
        const basePercent = Number(splitModel[itemKey]) || 0;
        const groupFlow = baseGroupSum > 0
          ? roundFlowrate((flow * basePercent) / baseGroupSum)
          : index === groupKeys.length - 1
            ? roundFlowrate(flow - roundFlowrate(flow / Math.max(1, groupKeys.length)) * (groupKeys.length - 1))
            : roundFlowrate(flow / Math.max(1, groupKeys.length));
        flows[itemKey] = Math.max(0, groupFlow);
        splitModel[itemKey] = roundFlowrate((flows[itemKey] / Number(availableFlow)) * 100);
      });
      changed = true;
    }
  });

  if (!changed) return;
  node.splitModel = splitModel;
  state.cduSolvedProductFlows = closeCduProductFlows(flows, Number(availableFlow));
  state.cduPropagatedProductFlows = state.cduSolvedProductFlows;
}

function solveNodeTargetsAndRedistribute(node, streams, runtimeState = state) {
  const outgoing = getNodeOutgoingBalanceStreams(node, streams);
  if (!outgoing.length) return { ok: true, status: "no-output", messages: [] };

  const availableFlow = getNodeAvailableFlow(node, runtimeState, outgoing);
  if (!Number.isFinite(Number(availableFlow)) || Number(availableFlow) <= 0) {
    return {
      ok: false,
      status: "no-available-flow",
      message: "Available node flow is not available",
      messages: ["Available node flow is not available"],
      availableFlow,
      targetSum: 0,
    };
  }

  const targetStreams = getTargetStreamsForNode(node, outgoing);
  const targetItems = [];
  const missedTargets = [];
  const messages = [];
  targetStreams.forEach((stream) => {
    const targetM3H = getStreamTargetFlowM3H(stream);
    if ((stream.isRecycle || normalizeStreamBalanceRole(stream.balanceRole) === "recycle") && stream.allowAutoAdjust !== true) {
      const warning = "Recycle target requires iterative solver; currently treated as monitor only.";
      messages.push(warning);
      missedTargets.push(stream.id);
      recordTargetSolverResult(runtimeState, stream, "target-miss", warning, targetM3H);
      return;
    }
    const rangeCheck = isStreamTargetInConfiguredRange(stream);
    if (!rangeCheck.ok || !Number.isFinite(Number(targetM3H))) {
      const warning = rangeCheck.message || "Target flow belum tersedia";
      messages.push(warning);
      missedTargets.push(stream.id);
      recordTargetSolverResult(runtimeState, stream, "target-miss", warning, targetM3H);
      return;
    }
    targetItems.push({ stream, targetM3H: Number(targetM3H) });
  });

  const targetSum = roundFlowrate(targetItems.reduce((sum, item) => sum + item.targetM3H, 0));
  const toleranceFraction = Math.max(...targetStreams.map((stream) => normalizeTolerancePercent(stream.targetTolerancePercent)), 0) / 100;
  if (targetSum > Number(availableFlow) * (1 + toleranceFraction)) {
    const warning = "Total target flow exceeds available node flow";
    markNodeOverConstrained(node, targetSum, availableFlow);
    targetItems.forEach((item) => {
      missedTargets.push(item.stream.id);
      recordTargetSolverResult(runtimeState, item.stream, "over-constrained", warning, item.targetM3H);
    });
    return {
      ok: false,
      status: "over-constrained",
      message: warning,
      messages: [warning, ...messages],
      availableFlow,
      targetSum,
      missedTargets,
      acceptedTargets: [],
    };
  }

  const targetIds = new Set(targetItems.map((item) => item.stream.id));
  const adjustableSiblings = outgoing.filter((stream) => {
    if (targetIds.has(stream.id)) return false;
    if (normalizeStreamRangeMode(stream.rangeMode) === "locked-flow") return false;
    if (stream.useAsCalculationTarget === true) return false;
    if (stream.isRecycle === true) return false;
    if (stream.includeInNodeBalance === false) return false;
    return true;
  });
  const remainingFlow = roundFlowrate(Number(availableFlow) - targetSum);

  targetItems.forEach((item) => {
    setRuntimeStreamFlow(runtimeState, item.stream.id, item.targetM3H, { isCalculated: true });
    const status = normalizeStreamRangeMode(item.stream.rangeMode) === "locked-flow" ? "locked" : "target-ok";
    const message = status === "locked" ? "Locked flow applied" : "Target flow applied";
    recordTargetSolverResult(runtimeState, item.stream, status, message, item.targetM3H);
  });

  distributeRemainingFlow(adjustableSiblings, remainingFlow, runtimeState);
  const conservation = assertNodeConservation(node, runtimeState, outgoing, availableFlow);
  if (!conservation.ok) {
    markNodeRangeWarning(node, conservation.diff);
    return {
      ok: false,
      status: "imbalance-after-target",
      message: "Output does not match available flow after target redistribution",
      messages: ["Output does not match available flow after target redistribution", ...messages],
      availableFlow,
      targetSum,
      remainingFlow,
      finalOutput: conservation.output,
      diff: conservation.diff,
      acceptedTargets: targetItems.map((item) => item.stream.id),
      missedTargets,
    };
  }

  markNodeCompleteWithTarget(node);
  return {
    ok: true,
    status: "complete-with-target",
    availableFlow,
    targetSum,
    remainingFlow,
    finalOutput: conservation.output,
    acceptedTargets: targetItems.map((item) => item.stream.id),
    missedTargets,
    messages,
  };
}

function recalculateDownstreamFromRuntime(runtimeState = state) {
  const graph = getCduConnectivityGraph();
  const queue = [];
  getActiveStreams().forEach((stream) => {
    if (!stream.runtimeTargetResult) return;
    const nextNode = nodeByTag.get(stream.to) || nodeById.get(stream.to);
    if (nextNode && normalizeBalanceType(nextNode.balanceType) !== "productPool") queue.push(nextNode);
  });
  const processed = new Set();
  let guard = 0;
  while (queue.length && guard < 500) {
    guard += 1;
    const node = queue.shift();
    if (!node || processed.has(node.tag)) continue;
    processed.add(node.tag);
    const balanceType = normalizeBalanceType(node.balanceType);
    let updated = [];
    if (balanceType === "passThrough" || balanceType === "simple") {
      updated = propagatePassThroughNode(node, graph);
    } else if (balanceType === "separator") {
      updated = propagateSeparatorNode(node, graph);
    }
    updated.forEach((stream) => {
      const flow = getStreamFlowM3H(stream);
      if (Number.isFinite(Number(flow))) {
        if (!runtimeState.streamFlows) runtimeState.streamFlows = {};
        runtimeState.streamFlows[stream.id] = Number(flow);
      }
      const nextNode = nodeByTag.get(stream.to) || nodeById.get(stream.to);
      if (nextNode && normalizeBalanceType(nextNode.balanceType) !== "productPool" && normalizeBalanceType(nextNode.balanceType) !== "splitBased") {
        queue.push(nextNode);
      }
    });
  }
  return runtimeState;
}

function solveNodeTargetStreams(node, outputStreams, runtimeState = state) {
  const nodeResult = {
    ok: true,
    status: "ok",
    nodeId: node?.id || "",
    nodeTag: node?.tag || "",
    availableFlow: null,
    targetSum: 0,
    acceptedTargets: [],
    missedTargets: [],
    messages: [],
  };
  if (!node) {
    nodeResult.ok = false;
    nodeResult.status = "partial";
    nodeResult.messages.push("Available node flow belum tersedia");
    return nodeResult;
  }

  const outgoing = outputStreams?.length ? outputStreams : getNodeOutgoingBalanceStreams(node);
  const targets = getTargetStreamsForNode(node, outgoing);
  if (!targets.length) return nodeResult;

  const targetGroups = new Map();
  targets.forEach((targetStream) => {
    const groupStreams = getSiblingOutputGroupForTarget(node, targetStream, outgoing);
    const groupKey = getStreamTargetGroupKey(targetStream) || `node:${node.tag}`;
    if (!targetGroups.has(groupKey)) targetGroups.set(groupKey, groupStreams);
  });

  targetGroups.forEach((groupStreams) => {
    const groupResult = solveNodeTargetsAndRedistribute(node, groupStreams, runtimeState);
    nodeResult.availableFlow = roundFlowrate((Number(nodeResult.availableFlow) || 0) + (Number(groupResult.availableFlow) || 0));
    nodeResult.targetSum = roundFlowrate((Number(nodeResult.targetSum) || 0) + (Number(groupResult.targetSum) || 0));
    nodeResult.acceptedTargets.push(...(groupResult.acceptedTargets || []));
    nodeResult.missedTargets.push(...(groupResult.missedTargets || []));
    nodeResult.messages.push(...(groupResult.messages || (groupResult.message ? [groupResult.message] : [])));
    if (!groupResult.ok) {
      nodeResult.ok = false;
      nodeResult.status = groupResult.status === "over-constrained" ? "over-constrained" : "partial";
    } else if (nodeResult.status === "ok" && groupResult.status === "complete-with-target") {
      nodeResult.status = "complete-with-target";
    }
  });

  if (normalizeBalanceType(node.balanceType) === "splitBased" && outgoing.some((stream) => stream.runtimeTargetResult?.status === "target-ok" || stream.runtimeTargetResult?.status === "locked")) {
    const fullAvailable = getNodeAvailableFlow(node, runtimeState, outgoing);
    updateSplitModelFromSolvedOutputs(node, outgoing, fullAvailable);
    if (node.tag === "CDU-C-101") {
      propagateCduFlowFromSource();
    }
  }
  return nodeResult;
}

function runTargetDrivenMassBalance(config = null, runtimeState = state) {
  const activeStreams = getActiveStreams();
  activeStreams.forEach((stream) => {
    stream.runtimeTargetResult = null;
  });
  runtimeState.streamFlows = {};
  runtimeState.unallocatedFlow = 0;
  runtimeState.targetBaseFlows = activeStreams.reduce((result, stream) => {
    const flow = getStreamFlowM3H(stream);
    if (Number.isFinite(Number(flow))) result[stream.id] = Number(flow);
    return result;
  }, {});
  const solverState = {
    status: "ok",
    messages: [],
    targetResults: {},
    nodeResults: {},
  };
  runtimeState.targetSolver = solverState;

  const cduProductSolver = solveCduProductPoolTargets(runtimeState, solverState);
  if (cduProductSolver?.handled && cduProductSolver.ok) {
    propagateCduFlowFromSource();
  }

  const targetStreams = activeStreams.filter((stream) => (
    isStreamCalculationTarget(stream)
    && !(cduProductSolver?.handled && isCduProductStreamConstraint(stream))
  ));
  const targetsByNode = new Map();
  targetStreams.forEach((stream) => {
    const fromId = getStreamSourceNodeRef(stream);
    const node = nodeByTag.get(fromId) || nodeById.get(fromId);
    if (!node) {
      const warning = "Target source node tidak ditemukan";
      solverState.status = "partial";
      solverState.messages.push({ streamId: stream.id, message: warning });
      recordTargetSolverResult(runtimeState, stream, "target-miss", warning, getStreamTargetFlowM3H(stream));
      return;
    }
    if (!targetsByNode.has(node.tag)) targetsByNode.set(node.tag, { node, streams: [] });
    targetsByNode.get(node.tag).streams.push(stream);
  });

  targetsByNode.forEach(({ node }) => {
    const outputStreams = getNodeOutgoingBalanceStreams(node, activeStreams);
    const result = solveNodeTargetStreams(node, outputStreams, runtimeState);
    solverState.nodeResults[node.tag] = result;
    result.messages.forEach((message) => solverState.messages.push({ nodeId: node.id, nodeTag: node.tag, message }));
    if (result.status === "over-constrained") {
      solverState.status = "over-constrained";
    } else if (result.status === "complete-with-target" && solverState.status === "ok") {
      solverState.status = "complete-with-target";
    } else if (!["ok", "complete-with-target", "no-output"].includes(result.status) && solverState.status === "ok") {
      solverState.status = "partial";
    }
  });

  recalculateDownstreamFromRuntime(runtimeState);

  runtimeState.massBalanceTargetResult = {
    status: solverState.status,
    applied: Object.entries(solverState.targetResults)
      .filter(([, result]) => result.status === "target-ok" || result.status === "locked")
      .map(([streamId, result]) => ({ streamId, ...result })),
    warnings: solverState.messages,
    overConstrained: Object.entries(solverState.targetResults)
      .filter(([, result]) => result.status === "over-constrained")
      .map(([streamId, result]) => ({ streamId, ...result })),
  };
  return solverState;
}

function runConstraintDrivenMassBalance(config = null, runtimeState = state) {
  return runTargetDrivenMassBalance(config, runtimeState);
}

function getStreamPercentCap(stream) {
  const explicit = normalizeNullableNumber(stream?.percentCap);
  if (explicit !== null) return explicit;
  return calculatePercentCapacityFromM3H(getStreamFlowM3H(stream));
}

function getStreamConstraintVisualStatus(stream) {
  if (!stream) return { status: "normal", label: "", className: "" };
  const target = stream.runtimeTargetResult;
  const rangeStatus = normalizeStreamRangeStatus(stream.rangeStatus || stream.runtimeRange?.status);
  if (target?.status === "over-constrained" || rangeStatus === "over-constrained") {
    return { status: "over", label: "OVER", className: "mb-row-over" };
  }
  if (target?.status === "target-miss" || rangeStatus === "target-miss") {
    return { status: "target-miss", label: "TARGET MISS", className: "mb-row-target-miss" };
  }
  if (target?.status === "locked" || rangeStatus === "locked") {
    return { status: "locked", label: "LOCKED", className: "mb-row-target-ok" };
  }
  if (target?.status === "target-ok" || rangeStatus === "target-ok") {
    return { status: "target-ok", label: "TARGET OK", className: "mb-row-target-ok" };
  }
  if (target?.status === "adjusted" || rangeStatus === "adjusted") {
    return { status: "adjusted", label: "ADJUSTED", className: "mb-row-adjusted" };
  }
  if (isStreamCalculationTarget(stream)) {
    return { status: "target-active", label: "TARGET", className: "mb-row-target" };
  }
  if (rangeStatus === "low" || rangeStatus === "high") {
    return { status: rangeStatus, label: rangeStatus.toUpperCase(), className: "mb-row-target-miss" };
  }
  if (hasActiveConstraint(stream)) {
    return { status: "range", label: "RANGE", className: "mb-row-range" };
  }
  return { status: "normal", label: "", className: "" };
}

function createMassBalanceStatusBadge(statusInfo) {
  if (!statusInfo?.label) return null;
  const badge = document.createElement("span");
  badge.className = `mb-badge mb-badge-${statusInfo.status}`;
  badge.textContent = statusInfo.label;
  return badge;
}

function getRuntimeStreamRecord(streamOrId, runtime = state.massBalanceRuntime) {
  const streamId = typeof streamOrId === "object" ? streamOrId?.id : streamOrId;
  if (!streamId) return null;
  return runtime?.streams?.[streamId] || runtime?.massBalance?.streams?.[streamId] || null;
}

function getFinalRuntimeStreamFlowM3H(stream, runtime = state.massBalanceRuntime) {
  const record = getRuntimeStreamRecord(stream, runtime);
  if (record?.flowM3H !== null && record?.flowM3H !== undefined && Number.isFinite(Number(record.flowM3H))) return Number(record.flowM3H);
  return getStreamFlowM3H(stream);
}

function getFinalRuntimeStreamFlowMBSD(stream, runtime = state.massBalanceRuntime) {
  const record = getRuntimeStreamRecord(stream, runtime);
  if (record?.flowMBSD !== null && record?.flowMBSD !== undefined && Number.isFinite(Number(record.flowMBSD))) return Number(record.flowMBSD);
  return getStreamFlowMBSD(stream);
}

function getFinalRuntimeStreamPercentCap(stream, runtime = state.massBalanceRuntime) {
  const record = getRuntimeStreamRecord(stream, runtime);
  if (record?.percentCapacity !== null && record?.percentCapacity !== undefined && Number.isFinite(Number(record.percentCapacity))) return Number(record.percentCapacity);
  if (record?.percentCap !== null && record?.percentCap !== undefined && Number.isFinite(Number(record.percentCap))) return Number(record.percentCap);
  return getStreamPercentCap(stream);
}

function normalizeRuntimeConstraintStatus(status) {
  const normalized = safeText(status, "normal");
  if (normalized === "over-constrained") return "over";
  if (normalized === "target-ok" || normalized === "locked" || normalized === "adjusted" || normalized === "target-miss" || normalized === "target-active" || normalized === "over" || normalized === "range") {
    return normalized;
  }
  if (normalized === "low" || normalized === "high") return "target-miss";
  return "normal";
}

function getRuntimeStreamSource(stream, visualStatus) {
  const targetStatus = safeText(stream?.runtimeTargetResult?.status, "");
  if (targetStatus === "adjusted") return "adjusted";
  if (targetStatus === "locked") return "locked";
  if (targetStatus === "target-ok" || targetStatus === "target-miss" || targetStatus === "over-constrained") return "target-solver";
  if (visualStatus?.status && visualStatus.status !== "normal") return "target-solver";
  if (stream?.isCalculated) return "base";
  return "manual";
}

function buildRuntimeStreamRecord(stream) {
  const flowM3H = getStreamFlowM3H(stream);
  const flowMBSD = getStreamFlowMBSD(stream);
  const percentCapacity = getStreamPercentCap(stream);
  const visual = getStreamConstraintVisualStatus(stream);
  const visualStatus = normalizeRuntimeConstraintStatus(visual.status);
  const status = visualStatus === "over" ? "over-constrained" : visualStatus;
  return {
    streamId: stream.id,
    flowM3H,
    flowMBSD,
    percentCapacity,
    percentCap: percentCapacity,
    status,
    visualStatus,
    badge: visual.label || "",
    className: visual.className || "",
    source: getRuntimeStreamSource(stream, visual),
    targetResult: stream.runtimeTargetResult ? deepClone(stream.runtimeTargetResult) : null,
    range: stream.runtimeRange ? deepClone(stream.runtimeRange) : null,
  };
}

function hasTargetStreams(node, runtime = state.massBalanceRuntime) {
  if (!node) return false;
  if (node.targetSolverStatus === "complete-with-target") return true;
  const records = runtime?.targetSolver?.targetResults || state.targetSolver?.targetResults || {};
  return getNodeOutgoingBalanceStreams(node).some((stream) => (
    isStreamCalculationTarget(stream)
      || Boolean(stream.runtimeTargetResult)
      || Boolean(records[stream.id])
  ));
}

function hasOverConstrainedStreams(node, runtime = state.massBalanceRuntime) {
  if (!node) return false;
  if (node.targetSolverStatus === "over-constrained") return true;
  const records = runtime?.targetSolver?.targetResults || state.targetSolver?.targetResults || {};
  return getNodeOutgoingBalanceStreams(node).some((stream) => (
    stream.runtimeTargetResult?.status === "over-constrained"
      || records[stream.id]?.status === "over-constrained"
  ));
}

function validateNodeBalanceFromRuntime(node, runtimeState = state.massBalanceRuntime, resultOverride = null) {
  const nodeRuntime = runtimeState?.nodes?.[node?.id] || runtimeState?.massBalance?.nodes?.[node?.id] || null;
  const result = resultOverride || getMassBalanceResult(node) || node?.balanceResult || null;
  if (hasOverConstrainedStreams(node, runtimeState)) return "over-constrained";
  const input = Number(nodeRuntime?.inputM3H ?? result?.totalInputM3H);
  const output = Number(nodeRuntime?.outputM3H ?? result?.totalOutputM3H);
  if (!Number.isFinite(input) || input <= 0) return result?.status === "notStarted" ? "not-started" : "error";
  const tolerancePercent = normalizeTolerancePercent(result?.tolerancePercent ?? node?.tolerancePercent);
  const tolerance = Math.max(input * (tolerancePercent / 100), 0.0001);
  const diff = output - input;
  if (Number.isFinite(output) && Math.abs(diff) <= tolerance) {
    if (hasTargetStreams(node, runtimeState)) return "complete-with-target";
    return "complete";
  }
  return "error";
}

function buildRuntimeNodeRecord(node, result) {
  const inputM3H = normalizeNullableNumber(result?.totalInputM3H);
  const outputM3H = normalizeNullableNumber(result?.totalOutputM3H);
  const percent = inputM3H && outputM3H !== null ? roundFlowrate((outputM3H / inputM3H) * 100) : null;
  return {
    nodeId: node.id,
    nodeTag: node.tag,
    inputM3H,
    outputM3H,
    inputMBSD: inputM3H === null ? null : convertM3HToMBSD(inputM3H),
    outputMBSD: outputM3H === null ? null : convertM3HToMBSD(outputM3H),
    percent,
    status: validateNodeBalanceFromRuntime(node, null, result),
    rawStatus: result?.status || "",
  };
}

function applyRuntimeMassBalanceStatusToNodes(runtime) {
  if (!runtime) return;
  NODES.forEach((node) => {
    const result = getMassBalanceResult(node) || node.balanceResult;
    if (!result) return;
    const runtimeStatus = validateNodeBalanceFromRuntime(node, runtime, result);
    result.runtimeStatus = runtimeStatus;
    if (runtimeStatus === "complete-with-target") {
      result.status = "balanced";
      result.hasTarget = true;
    } else if (runtimeStatus === "over-constrained") {
      result.status = "error";
      result.overConstrained = true;
    }
    node.balanceStatus = result.status;
    node.balanceResult = result;
    state.massBalanceResults.set(node.id, result);
    if (runtime.nodes?.[node.id]) runtime.nodes[node.id].status = runtimeStatus;
  });
}

function getMassBalanceRuntimeData(runtimeState = state.massBalanceRuntime) {
  return runtimeState?.massBalance || runtimeState || {
    streams: {},
    nodes: {},
    productRows: [],
    feedRows: [],
    targetSolver: { status: "ok", messages: [], targetResults: {} },
  };
}

function buildFloatingTableRowsFromRuntime(runtimeState = state.massBalanceRuntime) {
  const runtime = getMassBalanceRuntimeData(runtimeState);
  const streams = runtime.streams || {};
  return {
    productRows: buildCduProductMassBalanceTable(streams),
    feedRows: buildCduFeedMassBalanceTable(streams),
  };
}

function buildMassBalanceRuntime() {
  const activeStreams = getActiveStreams();
  const streams = {};
  activeStreams.forEach((stream) => {
    streams[stream.id] = buildRuntimeStreamRecord(stream);
  });
  const nodes = {};
  NODES.forEach((node) => {
    const result = getMassBalanceResult(node) || node.balanceResult || node.localBalanceResult;
    if (result) nodes[node.id] = buildRuntimeNodeRecord(node, result);
  });
  const runtime = {
    streams,
    nodes,
    productRows: [],
    feedRows: [],
    targetSolver: state.targetSolver ? deepClone(state.targetSolver) : {
      status: "ok",
      messages: [],
      targetResults: {},
    },
    builtAt: new Date().toISOString(),
  };
  const rows = buildFloatingTableRowsFromRuntime(runtime);
  runtime.productRows = rows.productRows;
  runtime.feedRows = rows.feedRows;
  runtime.massBalance = {
    streams: runtime.streams,
    nodes: runtime.nodes,
    productRows: runtime.productRows,
    feedRows: runtime.feedRows,
    targetSolver: runtime.targetSolver,
  };
  return runtime;
}

function formatM3HValue(value) {
  if (!Number.isFinite(Number(value))) return "-";
  return `${formatNumber(Number(value), 1)} m3/h`;
}

function formatMBSDValue(value) {
  if (!Number.isFinite(Number(value))) return "-";
  return `${formatNumber(value, 2)} MBSD`;
}

function formatCapacityPercentValue(value) {
  if (!Number.isFinite(Number(value))) return "-";
  return `${formatNumber(value, 1)}%`;
}

function formatBalanceTriplet(m3h, mbsd = null, percentCap = null) {
  const flowM3H = Number(m3h);
  if (!Number.isFinite(flowM3H)) return "-";
  const flowMBSD = Number.isFinite(Number(mbsd)) ? Number(mbsd) : convertM3HToMBSD(flowM3H);
  const cap = Number.isFinite(Number(percentCap)) ? Number(percentCap) : calculatePercentCapacityFromM3H(flowM3H);
  return `${formatM3HValue(flowM3H)} | ${formatMBSDValue(flowMBSD)} | ${formatCapacityPercentValue(cap)}`;
}

function formatMiniBalanceText(m3h, mbsd = null, percentCap = null, compact = false) {
  const flowM3H = Number(m3h);
  if (!Number.isFinite(flowM3H)) return "-";
  const flowMBSD = Number.isFinite(Number(mbsd)) ? Number(mbsd) : convertM3HToMBSD(flowM3H);
  const cap = Number.isFinite(Number(percentCap)) ? Number(percentCap) : calculatePercentCapacityFromM3H(flowM3H);
  return compact
    ? `${formatMBSDValue(flowMBSD)} · ${formatCapacityPercentValue(cap)}`
    : `${formatM3HValue(flowM3H)} · ${formatMBSDValue(flowMBSD)} · ${formatCapacityPercentValue(cap)}`;
}

function buildCduTableRow(name, stream, runtimeEntry = null) {
  const massFlowTonHr = normalizeNullableNumber(stream?.flowrate);
  const densityTonM3 = getDensityForStream(stream);
  const m3h = runtimeEntry && runtimeEntry.flowM3H !== null && runtimeEntry.flowM3H !== undefined && Number.isFinite(Number(runtimeEntry.flowM3H))
    ? Number(runtimeEntry.flowM3H)
    : getFinalRuntimeStreamFlowM3H(stream);
  const mbsd = runtimeEntry && runtimeEntry.flowMBSD !== null && runtimeEntry.flowMBSD !== undefined && Number.isFinite(Number(runtimeEntry.flowMBSD))
    ? Number(runtimeEntry.flowMBSD)
    : getFinalRuntimeStreamFlowMBSD(stream);
  const percentCap = runtimeEntry && runtimeEntry.percentCapacity !== null && runtimeEntry.percentCapacity !== undefined && Number.isFinite(Number(runtimeEntry.percentCapacity))
    ? Number(runtimeEntry.percentCapacity)
    : getFinalRuntimeStreamPercentCap(stream);
  const constraintStatus = runtimeEntry
    ? {
      status: runtimeEntry.visualStatus || normalizeRuntimeConstraintStatus(runtimeEntry.status),
      label: runtimeEntry.badge || "",
      className: runtimeEntry.className || (normalizeRuntimeConstraintStatus(runtimeEntry.status) !== "normal" ? `mb-row-${normalizeRuntimeConstraintStatus(runtimeEntry.status)}` : ""),
    }
    : getStreamConstraintVisualStatus(stream);
  return {
    name,
    label: name,
    streamId: stream?.id || "",
    massFlowTonHr,
    densityTonM3,
    m3h,
    flowM3H: m3h,
    mbsd,
    flowMBSD: mbsd,
    percentCap,
    percentCapacity: percentCap,
    status: runtimeEntry?.status || constraintStatus.status || "normal",
    badge: constraintStatus.label || "",
    isGasVolumeEstimate: normalizeStreamPhase(stream?.phase) === "gas",
    isIncomplete: m3h === null || m3h === undefined || !Number.isFinite(Number(m3h)),
    isOverCapacity: Number(percentCap) > 100,
    constraintStatus: constraintStatus.status,
    constraintLabel: constraintStatus.label,
    constraintClassName: constraintStatus.className,
  };
}

function buildMissingCduTableRow(name, streamId = "") {
  return {
    name,
    label: name,
    streamId,
    massFlowTonHr: null,
    densityTonM3: null,
    m3h: null,
    flowM3H: null,
    mbsd: null,
    flowMBSD: null,
    percentCap: null,
    percentCapacity: null,
    status: "missing",
    badge: "Missing",
    isGasVolumeEstimate: false,
    isOverCapacity: false,
    isMissing: true,
  };
}

function buildCduProductMassBalanceTable(runtimeStreams = state.massBalanceRuntime?.streams || null) {
  const dynamicRows = [];
  const usedStreamIds = new Set();
  getCduProductPoolNodes()
    .flatMap((node, poolIndex) => getCduProductPoolInputStreams(node).map((stream) => ({ node, stream, poolIndex })))
    .sort((a, b) => getCduProductTableSortIndex(a.stream, a.poolIndex + 999) - getCduProductTableSortIndex(b.stream, b.poolIndex + 999))
    .forEach(({ node, stream }) => {
      if (!stream || usedStreamIds.has(stream.id)) return;
      usedStreamIds.add(stream.id);
      const key = getCduProductKeyForStream(stream);
      const label = CDU_SPLIT_LABELS[key] || safeText(node.name, safeText(stream.label, stream.id));
      dynamicRows.push(buildCduTableRow(label, stream, runtimeStreams?.[stream.id] || null));
    });
  if (dynamicRows.length) return dynamicRows;

  const activeStreams = getActiveStreams();
  return Object.entries(CDU_PRODUCT_STREAM_MAP)
    .map(([key, streamId]) => {
      const label = CDU_SPLIT_LABELS[key] || streamId;
      const stream = activeStreams.find((item) => item.id === streamId);
      if (!stream || stream.includeInProductTable === false) return buildMissingCduTableRow(label, streamId);
      return buildCduTableRow(CDU_SPLIT_LABELS[key] || safeText(stream.label, streamId), stream, runtimeStreams?.[stream.id] || null);
    })
    .filter(Boolean);
}

function buildCduFeedMassBalanceTable(runtimeStreams = state.massBalanceRuntime?.streams || null) {
  const activeStreams = getActiveStreams();
  const feedStreams = activeStreams.filter((stream) => stream.includeInFeedTable === true || CDU_FEED_STREAM_IDS.includes(stream.id));
  const rows = feedStreams.map((stream) => buildCduTableRow(safeText(stream.label, stream.id), stream, runtimeStreams?.[stream.id] || null));
  if (!feedStreams.some((stream) => stream.id === "S-CDU-001")) {
    rows.unshift(buildMissingCduTableRow("Crude Feed", "S-CDU-001"));
  }
  return rows;
}

function summarizeVolumetricRows(rows = []) {
  const totalM3H = roundFlowrate(rows.reduce((sum, row) => sum + (Number(row.m3h) || 0), 0));
  const totalMBSD = roundFlowrate(rows.reduce((sum, row) => sum + (Number(row.mbsd) || 0), 0));
  const percentCap = calculatePercentCapacityFromM3H(totalM3H);
  return {
    name: "TOTAL",
    streamId: "",
    massFlowTonHr: roundFlowrate(rows.reduce((sum, row) => sum + (Number(row.massFlowTonHr) || 0), 0)),
    densityTonM3: null,
    m3h: totalM3H,
    mbsd: totalMBSD,
    percentCap,
    isTotal: true,
    isOverCapacity: Number(percentCap) > 100,
  };
}

// CDU Run Controls
function getSelectedCduAssay() {
  const runState = normalizeCduRunState(state.cduRunState);
  return CDU_CRUDE_ASSAYS[runState.selectedCrudeType] || CDU_CRUDE_ASSAYS[DEFAULT_CDU_RUN_STATE.selectedCrudeType];
}

function getCduOverallNode() {
  return nodeByTag.get("CDU-C-101") || NODES.find((node) => node.tag === "CDU-C-101") || null;
}

function isCduOverallBalanceNode(node) {
  return Boolean(node && node.tag === "CDU-C-101" && normalizeBalanceScope(node.balanceScope) === "unit");
}

function setStreamFlowrateById(streamId, flowrate, options = {}) {
  const stream = findStreamById(streamId);
  if (!stream) return null;
  const flowM3H = normalizeNullableNumber(options.flowM3H ?? flowrate);
  stream.flowrate = flowM3H;
  stream.flowUnit = options.flowUnit || DEFAULT_FLOW_UNIT;
  updateStreamVolumeMetrics(stream, flowM3H);
  if (options.phase) stream.phase = normalizeStreamPhase(options.phase);
  if (Number.isFinite(Number(options.densityTonM3))) stream.densityTonM3 = Number(options.densityTonM3);
  if (options.balanceCategory) stream.balanceCategory = normalizeBalanceCategory(options.balanceCategory);
  if (typeof options.isCalculated === "boolean") stream.isCalculated = options.isCalculated;
  if (typeof options.isFinalProduct === "boolean") stream.isFinalProduct = options.isFinalProduct;
  if (typeof options.includeInProductTable === "boolean") stream.includeInProductTable = options.includeInProductTable;
  if (typeof options.includeInFeedTable === "boolean") stream.includeInFeedTable = options.includeInFeedTable;
  if (options.splitKey) stream.splitKey = options.splitKey;
  if (options.splitSource) stream.splitSource = options.splitSource;
  return stream;
}

function updateStreamFlow(stream, flowM3H, options = {}) {
  if (!stream) return null;
  const normalizedFlow = normalizeNullableNumber(flowM3H);
  stream.flowrate = normalizedFlow;
  stream.flowUnit = options.flowUnit || stream.flowUnit || DEFAULT_FLOW_UNIT;
  updateStreamVolumeMetrics(stream, normalizedFlow);
  if (options.phase) stream.phase = normalizeStreamPhase(options.phase);
  if (Number.isFinite(Number(options.densityTonM3))) stream.densityTonM3 = Number(options.densityTonM3);
  if (options.balanceCategory) stream.balanceCategory = normalizeBalanceCategory(options.balanceCategory);
  if (typeof options.isCalculated === "boolean") stream.isCalculated = options.isCalculated;
  if (typeof options.isFinalProduct === "boolean") stream.isFinalProduct = options.isFinalProduct;
  if (typeof options.includeInProductTable === "boolean") stream.includeInProductTable = options.includeInProductTable;
  if (typeof options.includeInFeedTable === "boolean") stream.includeInFeedTable = options.includeInFeedTable;
  if (options.splitKey) stream.splitKey = options.splitKey;
  if (options.splitSource) stream.splitSource = options.splitSource;
  stream.propagationStatus = normalizedFlow === null ? "incomplete" : "propagated";
  return stream;
}

function isCduStream(stream) {
  if (!stream) return false;
  const fromNode = nodeByTag.get(stream.from);
  const toNode = nodeByTag.get(stream.to);
  return sameUnit(stream.unit, "CDU")
    || sameUnit(fromNode?.unit, "CDU")
    || sameUnit(toNode?.unit, "CDU")
    || safeText(stream.id, "").startsWith("S-CDU-");
}

function resetAllStreamCalculatedFlows() {
  state.cduPropagatedProductFlows = {};
  STREAMS.forEach((stream) => {
    if (!isCduStream(stream)) return;
    if (!isNodeBalanceStream(stream) && (stream.isRecycle || normalizeStreamBalanceRole(stream.balanceRole) === "recycle" || stream.runtimeRecycleCandidate)) return;
    updateStreamFlow(stream, null);
    stream.propagationStatus = "pending";
  });
}

function getIncomingHydrocarbonFlow(node, graph = getCduConnectivityGraph()) {
  const streams = (graph.incoming.get(node?.tag) || []).filter((stream) => (
    normalizeBalanceCategory(stream.balanceCategory) === "hydrocarbon"
  ));
  if (!streams.length) return { total: null, streams, missingStreams: [] };
  const missingStreams = [];
  const total = streams.reduce((sum, stream) => {
    const flow = getStreamFlowM3H(stream);
    if (!Number.isFinite(Number(flow))) {
      missingStreams.push(stream);
      return sum;
    }
    return sum + Number(flow);
  }, 0);
  return {
    total: missingStreams.length ? null : roundFlowrate(total),
    streams,
    missingStreams,
  };
}

function getPropagatableOutputStreams(node, graph = getCduConnectivityGraph()) {
  return (graph.outgoing.get(node?.tag) || []).filter((stream) => (
    normalizeBalanceCategory(stream.balanceCategory) === "hydrocarbon"
  ));
}

function getPreferredPassThroughOutputStream(streams = []) {
  const nonFinalProcess = streams.find((stream) => {
    const toNode = nodeByTag.get(stream.to);
    return stream.isFinalProduct !== true && normalizeBalanceType(toNode?.balanceType) !== "productPool";
  });
  return nonFinalProcess || streams[0] || null;
}

function getColumnOutputFlowForStream(stream, productFlows = state.cduPropagatedProductFlows || {}) {
  const port = safeText(stream?.fromPort, "");
  const splitKey = getStreamSplitKey(stream);
  if (splitKey && Number.isFinite(Number(productFlows[splitKey]))) return productFlows[splitKey];
  if (port === "overhead") {
    return roundFlowrate((Number(productFlows.offGas) || 0) + (Number(productFlows.lightNaphtha) || 0) + (Number(productFlows.heavyNaphtha) || 0));
  }
  if (port === "kerosene") return productFlows.kerosene ?? null;
  if (port === "lgo") return productFlows.lightGasoil ?? null;
  if (port === "hgo") return productFlows.heavyGasoil ?? null;
  if (port === "residue2") return productFlows.residueHVU2 ?? null;
  if (port === "residue3") return productFlows.residueHVU3 ?? null;
  return null;
}

function propagatePassThroughNode(node, graph = getCduConnectivityGraph()) {
  const input = getIncomingHydrocarbonFlow(node, graph);
  if (!Number.isFinite(Number(input.total))) return [];
  const outputs = getPropagatableOutputStreams(node, graph);
  if (!outputs.length) return [];
  if (outputs.length === 1) {
    updateStreamFlow(outputs[0], input.total, { isCalculated: true, balanceCategory: "hydrocarbon" });
    return outputs;
  }
  const preferred = getPreferredPassThroughOutputStream(outputs);
  if (!preferred) return [];
  updateStreamFlow(preferred, input.total, { isCalculated: true, balanceCategory: "hydrocarbon" });
  return [preferred];
}

function propagateDesalterNode(node, graph = getCduConnectivityGraph()) {
  const input = getIncomingHydrocarbonFlow(node, graph);
  const updated = [];
  const outputs = graph.outgoing.get(node.tag) || [];
  outputs.forEach((stream) => {
    const category = normalizeBalanceCategory(stream.balanceCategory);
    if (category === "water" || normalizeStreamPhase(stream.phase) === "water" || stream.id === "S-CDU-004") {
      updateStreamFlow(stream, 2, {
        phase: "water",
        densityTonM3: CDU_STREAM_DENSITY_DEFAULTS.water,
        balanceCategory: "water",
        isCalculated: true,
      });
      updated.push(stream);
      return;
    }
    if (Number.isFinite(Number(input.total))) {
      updateStreamFlow(stream, input.total, { isCalculated: true, balanceCategory: "hydrocarbon" });
      updated.push(stream);
    }
  });
  return updated;
}

function propagateOverheadAccumulatorNode(node, graph = getCduConnectivityGraph()) {
  const input = getIncomingHydrocarbonFlow(node, graph);
  if (!Number.isFinite(Number(input.total))) return [];
  const flows = state.cduPropagatedProductFlows || {};
  const offGas = Number(flows.offGas) || 0;
  const naphthaTotal = roundFlowrate((Number(flows.lightNaphtha) || 0) + (Number(flows.heavyNaphtha) || 0));
  const updated = [];
  getPropagatableOutputStreams(node, graph).forEach((stream) => {
    const port = safeText(stream.fromPort, "");
    const flow = port === "gas" ? offGas : port === "liquid" ? naphthaTotal : null;
    if (!Number.isFinite(Number(flow))) return;
    updateStreamFlow(stream, flow, {
      phase: port === "gas" ? "gas" : "liquid",
      isCalculated: true,
      balanceCategory: "hydrocarbon",
    });
    updated.push(stream);
  });
  return updated;
}


function getSeparatorOutputRole(stream) {
  const text = [
    stream?.fromPort,
    stream?.toPort,
    stream?.label,
    stream?.category,
    stream?.type,
    stream?.phase,
    stream?.balanceCategory,
  ].map((value) => safeText(value, "").toLowerCase()).join(" ");
  if (/water|waste|spent|drain|sour/.test(text)) return "water";
  if (/gas|vapor|vapour|overhead|\boh\b|vent|flare/.test(text)) return "gas";
  if (/naphtha|liquid|product|bottom|out|heavy|light|main/.test(text)) return "liquid";
  if (normalizeBalanceCategory(stream?.balanceCategory) === "hydrocarbon") return "liquid";
  return "secondary";
}

function getSeparatorOutputPhaseForRole(role, stream) {
  if (role === "gas") return "gas";
  if (role === "water") return "water";
  return normalizeStreamPhase(stream?.phase || "liquid");
}

function getSeparatorOutputCategoryForRole(role) {
  if (role === "water") return "water";
  if (role === "secondary") return "other";
  return "hydrocarbon";
}

function getSeparatorTargetM3H(stream) {
  if (!stream || !isStreamCalculationTarget(stream)) return null;
  const target = getStreamTargetFlowM3H(stream);
  if (!Number.isFinite(Number(target))) return null;
  return Math.max(0, Number(target));
}

function setSeparatorOutputFlow(stream, flowM3H, role, options = {}) {
  const flow = Math.max(0, roundFlowrate(Number(flowM3H) || 0));
  updateStreamFlow(stream, flow, {
    flowUnit: DEFAULT_FLOW_UNIT,
    phase: getSeparatorOutputPhaseForRole(role, stream),
    balanceCategory: getSeparatorOutputCategoryForRole(role),
    isCalculated: true,
  });
  if (options.target === true) {
    markTargetResult(stream, normalizeStreamRangeMode(stream.rangeMode) === "locked-flow" ? "locked" : "target-ok", "Separator target accepted", flow);
  } else if (stream.runtimeTargetResult && !isStreamCalculationTarget(stream)) {
    delete stream.runtimeTargetResult;
  }
  return stream;
}

function distributeSeparatorRemainder(outputs, remainingFlow) {
  const updated = [];
  const assignable = outputs.filter((item) => item.role === "liquid" || item.role === "secondary");
  const preferred = assignable.length ? assignable : outputs;
  if (!preferred.length) return updated;
  const baseTotal = preferred.reduce((sum, item) => {
    const base = Number(getStreamFlowM3H(item.stream));
    return sum + (Number.isFinite(base) && base > 0 ? base : 0);
  }, 0);
  let used = 0;
  preferred.forEach((item, index) => {
    const isLast = index === preferred.length - 1;
    const base = Number(getStreamFlowM3H(item.stream));
    const flow = isLast
      ? roundFlowrate(Math.max(0, remainingFlow - used))
      : roundFlowrate(baseTotal > 0 && Number.isFinite(base) && base > 0
        ? (remainingFlow * base) / baseTotal
        : remainingFlow / preferred.length);
    used += flow;
    setSeparatorOutputFlow(item.stream, flow, item.role);
    updated.push(item.stream);
  });
  return updated;
}

function propagateGenericSeparatorNode(node, graph = getCduConnectivityGraph()) {
  const input = getIncomingHydrocarbonFlow(node, graph);
  if (!Number.isFinite(Number(input.total))) return [];
  const rawOutputs = (graph.outgoing.get(node.tag) || []).filter((stream) => isValidStream(stream));
  if (!rawOutputs.length) return [];

  const outputItems = rawOutputs.map((stream) => ({
    stream,
    role: getSeparatorOutputRole(stream),
    targetM3H: getSeparatorTargetM3H(stream),
  }));
  const updated = [];
  let remaining = Number(input.total);

  outputItems.forEach((item) => {
    if (!Number.isFinite(Number(item.targetM3H))) return;
    const flow = Math.min(Math.max(0, Number(item.targetM3H)), Math.max(0, remaining));
    setSeparatorOutputFlow(item.stream, flow, item.role, { target: true });
    updated.push(item.stream);
    remaining = roundFlowrate(Math.max(0, remaining - flow));
  });

  const nonTargetItems = outputItems.filter((item) => !Number.isFinite(Number(item.targetM3H)));
  const secondaryItems = nonTargetItems.filter((item) => item.role === "gas" || item.role === "water");
  secondaryItems.forEach((item) => {
    setSeparatorOutputFlow(item.stream, 0, item.role);
    updated.push(item.stream);
  });

  distributeSeparatorRemainder(
    nonTargetItems.filter((item) => item.role !== "gas" && item.role !== "water"),
    remaining,
  ).forEach((stream) => updated.push(stream));

  const totalOut = outputItems.reduce((sum, item) => sum + (Number(getStreamFlowM3H(item.stream)) || 0), 0);
  const diff = roundFlowrate(Number(input.total) - totalOut);
  node.targetSolverStatus = Math.abs(diff) <= 0.1 ? "separator-split-ok" : "separator-split-warning";
  node.targetSolverMessage = Math.abs(diff) <= 0.1
    ? "Separator split propagated"
    : `Separator split difference ${formatM3HValue(Math.abs(diff))}`;
  return Array.from(new Set(updated));
}

function propagateStabilizerNode(node, graph = getCduConnectivityGraph()) {
  // Stabilizer/separator dengan 3 port tidak boleh membuat node incomplete.
  // Default: gas/overhead/spent = 0 kecuali diberi target, sisa flow ke outlet liquid/naphtha.
  return propagateGenericSeparatorNode(node, graph);
}

function propagateNaphthaSplitterNode(node, graph = getCduConnectivityGraph()) {
  const input = getIncomingHydrocarbonFlow(node, graph);
  if (!Number.isFinite(Number(input.total))) return [];
  const flows = state.cduPropagatedProductFlows || {};
  const updated = [];
  getPropagatableOutputStreams(node, graph).forEach((stream) => {
    const port = safeText(stream.fromPort, "");
    const key = getStreamSplitKey(stream) || (port === "light" ? "lightNaphtha" : port === "heavy" ? "heavyNaphtha" : "");
    const flow = key ? flows[key] : null;
    if (!Number.isFinite(Number(flow))) return;
    updateStreamFlow(stream, flow, {
      phase: "liquid",
      isCalculated: true,
      isFinalProduct: stream.isFinalProduct === true,
      includeInProductTable: stream.includeInProductTable === true || stream.isFinalProduct === true,
      splitKey: key,
      splitSource: "CDU-C-101",
      densityTonM3: CDU_STREAM_DENSITY_DEFAULTS[key] || null,
      balanceCategory: "hydrocarbon",
    });
    updated.push(stream);
  });
  return updated;
}

function propagateSeparatorNode(node, graph = getCduConnectivityGraph()) {
  if (node?.tag === "CDU-D-101") return propagateDesalterNode(node, graph);
  if (node?.tag === "CDU-V-102") return propagateOverheadAccumulatorNode(node, graph);
  if (node?.tag === "CDU-C-102") return propagateStabilizerNode(node, graph);
  if (node?.tag === "CDU-C-103") return propagateNaphthaSplitterNode(node, graph);
  return propagateGenericSeparatorNode(node, graph);
}

function propagateSplitBasedNode(node, graph = getCduConnectivityGraph()) {
  const input = getIncomingHydrocarbonFlow(node, graph);
  if (!Number.isFinite(Number(input.total))) return [];
  const runState = normalizeCduRunState(state.cduRunState);
  const assay = CDU_CRUDE_ASSAYS[runState.selectedCrudeType] || CDU_CRUDE_ASSAYS.medium;
  const splitModel = normalizeSplitModel(assay.splitModel);
  node.balanceType = "splitBased";
  node.balanceScope = "unit";
  node.balanceUnit = "CDU";
  node.splitModel = splitModel;
  node.balanceCategories = HYDROCARBON_BALANCE_CATEGORIES;

  const solvedProductFlows = getValidatedCduSolvedProductFlows(input.total);
  const productFlows = solvedProductFlows || Object.fromEntries(Object.entries(splitModel).map(([key, percent]) => [
    key,
    roundFlowrate((input.total * Number(percent)) / 100),
  ]));
  closeCduProductFlows(productFlows, input.total);
  if (solvedProductFlows) setCduSplitModelFromProductFlows(node, productFlows, input.total);
  state.cduPropagatedProductFlows = productFlows;
  const updated = [];
  getPropagatableOutputStreams(node, graph).forEach((stream) => {
    const flow = getColumnOutputFlowForStream(stream, productFlows);
    if (!Number.isFinite(Number(flow))) return;
    const key = getStreamSplitKey(stream);
    updateStreamFlow(stream, flow, {
      flowUnit: DEFAULT_FLOW_UNIT,
      phase: stream.fromPort === "overhead" ? "mixed" : stream.phase,
      isCalculated: true,
      isFinalProduct: stream.isFinalProduct === true,
      includeInProductTable: stream.includeInProductTable === true || stream.isFinalProduct === true,
      splitKey: key || undefined,
      splitSource: key ? "CDU-C-101" : undefined,
      densityTonM3: key ? CDU_STREAM_DENSITY_DEFAULTS[key] || null : stream.densityTonM3,
      balanceCategory: "hydrocarbon",
    });
    updated.push(stream);
  });
  return updated;
}

function propagateCduFlowFromSource() {
  const runState = normalizeCduRunState(state.cduRunState);
  if (!runState.hasStarted) return {};
  const graph = rebuildCduConnectivityGraph();
  const source = getCrudeSourceNode();
  if (!source) return graph;
  const intake = normalizeNullableNumber(runState.crudeIntakeM3H);
  if (!Number.isFinite(Number(intake)) || Number(intake) <= 0) return graph;

  const queue = [];
  getSourceOutputStreams(graph).forEach((stream) => {
    updateStreamFlow(stream, intake, {
      flowUnit: DEFAULT_FLOW_UNIT,
      isCalculated: stream.id !== "S-CDU-001",
      densityTonM3: getCduCrudeDensityDefault(runState.selectedCrudeType),
      includeInFeedTable: stream.id === "S-CDU-001",
      balanceCategory: "hydrocarbon",
    });
    const nextNode = nodeByTag.get(stream.to);
    if (nextNode) queue.push(nextNode);
  });

  const processed = new Set();
  let guard = 0;
  while (queue.length && guard < 1000) {
    guard += 1;
    const node = queue.shift();
    if (!node || processed.has(node.tag)) continue;
    processed.add(node.tag);
    if (!isNodeReachableFromCrudeSource(node.id)) continue;
    const balanceType = normalizeBalanceType(node.balanceType);
    let updated = [];
    if (balanceType === "splitBased") {
      updated = propagateSplitBasedNode(node, graph);
    } else if (balanceType === "separator") {
      updated = propagateSeparatorNode(node, graph);
    } else if (balanceType === "passThrough" || balanceType === "simple") {
      updated = propagatePassThroughNode(node, graph);
    }
    updated.forEach((stream) => {
      if (!Number.isFinite(Number(getStreamFlowM3H(stream)))) return;
      const nextNode = nodeByTag.get(stream.to);
      if (nextNode && normalizeBalanceType(nextNode.balanceType) !== "productPool") queue.push(nextNode);
    });
  }
  return graph;
}

function applySplitModelToCdu(options = {}) {
  const selectedCrudeType = CDU_CRUDE_ASSAYS[options.selectedCrudeType]
    ? options.selectedCrudeType
    : normalizeCduRunState(state.cduRunState).selectedCrudeType;
  const crudeIntakeM3H = Number.isFinite(Number(options.crudeIntakeM3H)) && Number(options.crudeIntakeM3H) > 0
    ? Number(options.crudeIntakeM3H)
    : Number.isFinite(Number(options.crudeIntake)) && Number(options.crudeIntake) > 0
      ? Number(options.crudeIntake)
      : normalizeCduRunState(state.cduRunState).crudeIntakeM3H;
  const assay = CDU_CRUDE_ASSAYS[selectedCrudeType] || CDU_CRUDE_ASSAYS.medium;
  const splitModel = normalizeSplitModel(assay.splitModel);
  const productFlows = {};

  state.cduRunState = normalizeCduRunState({
    ...state.cduRunState,
    selectedCrudeType,
    crudeIntakeM3H,
  });

  const cduNode = getCduOverallNode();
  if (cduNode) {
    cduNode.balanceType = "splitBased";
    cduNode.balanceScope = "unit";
    cduNode.balanceUnit = "CDU";
    cduNode.tolerancePercent = normalizeTolerancePercent(cduNode.tolerancePercent);
    cduNode.splitModel = splitModel;
    cduNode.balanceCategories = HYDROCARBON_BALANCE_CATEGORIES;
  }

  CDU_FEED_FORWARD_STREAM_IDS.forEach((streamId) => {
    setStreamFlowrateById(streamId, crudeIntakeM3H, {
      flowUnit: DEFAULT_FLOW_UNIT,
      isCalculated: streamId !== "S-CDU-001",
      densityTonM3: getCduCrudeDensityDefault(selectedCrudeType),
      includeInFeedTable: streamId === "S-CDU-001",
      balanceCategory: "hydrocarbon",
    });
  });
  setStreamFlowrateById("S-CDU-004", roundFlowrate(crudeIntakeM3H * 0.005), {
    flowUnit: DEFAULT_FLOW_UNIT,
    phase: "water",
    densityTonM3: CDU_STREAM_DENSITY_DEFAULTS.water,
    balanceCategory: "water",
  });

  Object.entries(splitModel).forEach(([key, percent]) => {
    const flowM3H = roundFlowrate((crudeIntakeM3H * Number(percent)) / 100);
    productFlows[key] = flowM3H;
    const streamId = CDU_PRODUCT_STREAM_MAP[key];
    if (streamId) {
      setStreamFlowrateById(streamId, flowM3H, {
        flowUnit: DEFAULT_FLOW_UNIT,
        isCalculated: true,
        isFinalProduct: true,
        includeInProductTable: true,
        splitKey: key,
        splitSource: "CDU-C-101",
        densityTonM3: CDU_STREAM_DENSITY_DEFAULTS[key] || null,
        balanceCategory: "hydrocarbon",
      });
    }
  });

  updateCduIntermediateStreams(productFlows);
  return productFlows;
}

function updateCduIntermediateStreams(productFlows = {}) {
  const offGas = roundFlowrate(productFlows.offGas || 0);
  const lightNaphtha = roundFlowrate(productFlows.lightNaphtha || 0);
  const heavyNaphtha = roundFlowrate(productFlows.heavyNaphtha || 0);
  const kerosene = roundFlowrate(productFlows.kerosene || 0);
  const lightGasoil = roundFlowrate(productFlows.lightGasoil || 0);
  const heavyGasoil = roundFlowrate(productFlows.heavyGasoil || 0);
  const naphthaTotal = roundFlowrate(lightNaphtha + heavyNaphtha);
  const overheadTotal = roundFlowrate(offGas + naphthaTotal);

  [
    ["S-CDU-008", overheadTotal, "mixed", "hydrocarbon"],
    ["S-CDU-009", offGas, "gas", "hydrocarbon"],
    ["S-CDU-010", offGas, "gas", "hydrocarbon"],
    ["S-CDU-012", naphthaTotal, "liquid", "hydrocarbon"],
    ["S-CDU-013", naphthaTotal, "liquid", "hydrocarbon"],
    ["S-CDU-014", offGas, "gas", "other"],
    ["S-CDU-015", naphthaTotal, "liquid", "hydrocarbon"],
    ["S-CDU-018", kerosene, "liquid", "hydrocarbon"],
    ["S-CDU-020", lightGasoil, "liquid", "hydrocarbon"],
    ["S-CDU-022", heavyGasoil, "liquid", "hydrocarbon"],
  ].forEach(([streamId, flowrate, phase, balanceCategory]) => {
    setStreamFlowrateById(streamId, flowrate, {
      flowUnit: DEFAULT_FLOW_UNIT,
      phase,
      isCalculated: true,
      balanceCategory,
    });
  });
}

function summarizeMassBalanceResult(result) {
  if (!result) return null;
  return {
    status: result.status,
    totalInput: result.totalInput,
    totalOutput: result.totalOutput,
    totalInputM3H: result.totalInputM3H,
    totalOutputM3H: result.totalOutputM3H,
    totalInputMBSD: result.totalInputMBSD,
    totalOutputMBSD: result.totalOutputMBSD,
    inputPercentCap: result.inputPercentCap,
    outputPercentCap: result.outputPercentCap,
    difference: result.difference,
    differenceM3H: result.differenceM3H,
    differenceMBSD: result.differenceMBSD,
    errorPercent: result.errorPercent,
    calculatedAt: new Date().toISOString(),
  };
}

function getCanonicalCduIntakeM3H(runStateInput = state.cduRunState) {
  return normalizeCduRunState(runStateInput).crudeIntakeM3H;
}

function getCanonicalCduIntakeMBSD(runStateInput = state.cduRunState) {
  return normalizeCduRunState(runStateInput).crudeIntakeMBSD;
}

function syncCduIntakeFromInput() {
  const unit = els.cduIntakeUnitSelect?.value === "mbsd" ? "mbsd" : "m3h";
  const value = Number(els.cduCrudeIntakeInput?.value);
  if (!Number.isFinite(value) || value <= 0) {
    state.cduRunState = normalizeCduRunState({ ...state.cduRunState, intakeUnit: unit });
    return null;
  }
  const crudeIntakeM3H = unit === "mbsd" ? convertMBSDToM3H(value) : value;
  const crudeIntakeMBSD = unit === "mbsd" ? value : convertM3HToMBSD(value);
  state.cduRunState = normalizeCduRunState({
    ...state.cduRunState,
    crudeIntakeM3H,
    crudeIntakeMBSD,
    intakeUnit: unit,
  });
  if (!hasMultiCrudeBlend()) {
    const component = state.cduRunState.crudeBlend?.components?.[0] || { id: "crude-1", name: "Crude A" };
    state.cduRunState = normalizeCduRunState({
      ...state.cduRunState,
      crudeBlend: calculateCrudeBlend([{
        ...component,
        sg: state.cduRunState.crudeSG,
        flowrate: crudeIntakeM3H,
        flowUnit: "m3/h",
      }]),
    });
  }
  return state.cduRunState;
}

function updateCduIntakeInputDisplay() {
  const runState = normalizeCduRunState(state.cduRunState);
  state.cduRunState = runState;
  if (els.cduIntakeUnitSelect) els.cduIntakeUnitSelect.value = runState.intakeUnit;
  if (els.cduCrudeIntakeInput) {
    const value = runState.intakeUnit === "mbsd" ? runState.crudeIntakeMBSD : runState.crudeIntakeM3H;
    els.cduCrudeIntakeInput.value = String(roundFlowrate(value));
    els.cduCrudeIntakeInput.step = runState.intakeUnit === "mbsd" ? "0.1" : "10";
    els.cduCrudeIntakeInput.setAttribute("aria-label", runState.intakeUnit === "mbsd" ? "Crude intake MBSD" : "Crude intake cubic meter per hour");
  }
}

function updateCrudeSelector(mappedType) {
  if (!els.cduCrudeTypeSelect) return;
  const type = CDU_CRUDE_ASSAYS[mappedType] ? mappedType : DEFAULT_CDU_RUN_STATE.selectedCrudeType;
  els.cduCrudeTypeSelect.value = type;
}

function updateCrudeClassificationBadge(api, classification) {
  const normalized = safeText(classification, "");
  if (els.cduCrudeAPIValue) {
    els.cduCrudeAPIValue.textContent = Number.isFinite(Number(api)) ? formatNumber(api, 2) : "-";
  }
  if (els.cduCrudeClassificationBadge) {
    els.cduCrudeClassificationBadge.textContent = formatCrudeClassificationLabel(normalized);
    els.cduCrudeClassificationBadge.className = `crude-classification-badge crude-${normalized === "extraHeavy" ? "extra-heavy" : normalized || "medium"}`;
  }
}

function updateCrudeTypeFromSG(options = {}) {
  const sg = normalizeNullableNumber(els.cduCrudeSGInput?.value);
  if (sg === null || sg <= 0) {
    updateCrudeClassificationBadge(null, "");
    if (!options.silent) showToast("SG crude harus lebih besar dari 0", "warning");
    return null;
  }
  const api = apiFromSG(sg);
  const classification = classifyCrudeByApi(api);
  const mappedType = mapCrudeClassificationToAssayType(classification);
  const currentBlendComponents = Array.isArray(state.cduRunState?.crudeBlend?.components)
    ? state.cduRunState.crudeBlend.components
    : [];
  const blendComponents = currentBlendComponents.length > 1
    ? currentBlendComponents
    : [{
      ...(currentBlendComponents[0] || { id: "crude-1", name: "Crude A" }),
      sg,
      flowrate: state.cduRunState?.crudeIntakeM3H || DEFAULT_CDU_RUN_STATE.crudeIntakeM3H,
      flowUnit: "m3/h",
    }];
  state.cduRunState = normalizeCduRunState({
    ...state.cduRunState,
    crudeSG: sg,
    crudeAPI: api,
    crudeClassification: classification,
    selectedCrudeType: mappedType,
    crudeBlend: calculateCrudeBlend(blendComponents),
  });
  updateCrudeSelector(mappedType);
  updateCrudeClassificationBadge(api, classification);
  renderCrudeBlendSummary(state.cduRunState.crudeBlend);
  if (classification === "extraHeavy" && !options.silent) {
    showToast("Extra Heavy dipetakan sementara ke Heavy assay", "warning", { duration: 1800 });
  }
  return state.cduRunState;
}

function hasMultiCrudeBlend() {
  return Array.isArray(state.cduRunState?.crudeBlend?.components) && state.cduRunState.crudeBlend.components.length > 1;
}

function mountCduBlendPanelAsModal() {
  if (!els.cduBlendPanel) return;
  if (els.cduBlendPanel.parentElement !== document.body) {
    document.body.appendChild(els.cduBlendPanel);
  }
  if (els.cduBlendPanel.dataset.modalEventsBound !== "true") {
    // Bubble-phase only: target button/input handlers must still run.
    ["pointerdown", "mousedown", "click", "dblclick", "wheel", "touchstart"].forEach((eventName) => {
      els.cduBlendPanel.addEventListener(eventName, (event) => event.stopPropagation());
    });
    els.cduBlendPanel.dataset.modalEventsBound = "true";
  }
}

function toggleCduBlendPanel(force = null) {
  if (!els.cduBlendPanel) return;
  const shouldOpen = typeof force === "boolean" ? force : els.cduBlendPanel.classList.contains("is-hidden");
  if (shouldOpen) {
    mountCduBlendPanelAsModal();
    renderCrudeBlendPanel();
    els.cduBlendPanel.classList.remove("is-hidden");
    els.cduBlendPanel.hidden = false;
    document.body.classList.add("is-cdu-blend-open");
    requestAnimationFrame(() => {
      const firstInput = els.cduBlendPanel.querySelector("input, select, button");
      firstInput?.focus?.({ preventScroll: true });
    });
  } else {
    els.cduBlendPanel.classList.add("is-hidden");
    els.cduBlendPanel.hidden = true;
    document.body.classList.remove("is-cdu-blend-open");
  }
  els.cduBlendToggle?.setAttribute("aria-expanded", shouldOpen ? "true" : "false");
}

function createCrudeBlendInput(className, value, attributes = {}) {
  const input = document.createElement("input");
  input.className = className;
  input.value = value ?? "";
  Object.entries(attributes).forEach(([key, attrValue]) => {
    if (attrValue !== undefined && attrValue !== null) input.setAttribute(key, String(attrValue));
  });
  return input;
}

function renderCrudeBlendPanel() {
  if (!els.cduBlendRows) return;
  const blend = calculateCrudeBlend(state.cduRunState?.crudeBlend?.components?.length
    ? state.cduRunState.crudeBlend.components
    : createDefaultCrudeBlend(state.cduRunState).components);
  state.cduRunState = normalizeCduRunState({ ...state.cduRunState, crudeBlend: blend });
  els.cduBlendRows.replaceChildren();
  blend.components.forEach((component, index) => {
    const row = document.createElement("div");
    row.className = "cdu-blend-row";
    row.dataset.componentId = component.id;

    row.appendChild(createCrudeBlendInput("cdu-blend-name", component.name, { "aria-label": "Crude name" }));
    row.appendChild(createCrudeBlendInput("cdu-blend-sg", component.sg, {
      type: "number",
      min: "0.5",
      max: "1.3",
      step: "0.001",
      "aria-label": "Crude specific gravity",
    }));
    row.appendChild(createCrudeBlendInput("cdu-blend-flow", component.flowrate, {
      type: "number",
      min: "0",
      step: "0.1",
      "aria-label": "Crude component flow",
    }));

    const unitSelect = document.createElement("select");
    unitSelect.className = "cdu-blend-unit";
    unitSelect.setAttribute("aria-label", "Crude component flow unit");
    ["m3/h", "MBSD"].forEach((unit) => {
      const option = document.createElement("option");
      option.value = unit;
      option.textContent = unit;
      option.selected = normalizeCrudeBlendFlowUnit(component.flowUnit) === unit;
      unitSelect.appendChild(option);
    });
    row.appendChild(unitSelect);

    const apiValue = document.createElement("span");
    apiValue.className = "cdu-blend-api";
    apiValue.textContent = Number.isFinite(Number(component.api)) ? formatNumber(component.api, 2) : "-";
    row.appendChild(apiValue);

    const classification = document.createElement("span");
    classification.className = `crude-classification-badge crude-${component.classification === "extraHeavy" ? "extra-heavy" : component.classification || "medium"}`;
    classification.textContent = formatCrudeClassificationLabel(component.classification);
    row.appendChild(classification);

    const removeButton = document.createElement("button");
    removeButton.className = "cdu-blend-remove";
    removeButton.type = "button";
    removeButton.dataset.action = "remove-crude-blend";
    removeButton.disabled = blend.components.length <= 1;
    removeButton.textContent = index === 0 && blend.components.length <= 1 ? "Keep" : "Remove";
    row.appendChild(removeButton);

    els.cduBlendRows.appendChild(row);
  });
  renderCrudeBlendSummary(blend);
}

function readCrudeBlendComponentsFromPanel() {
  if (!els.cduBlendRows) return state.cduRunState?.crudeBlend?.components || [];
  return Array.from(els.cduBlendRows.querySelectorAll(".cdu-blend-row")).map((row, index) => ({
    id: row.dataset.componentId || `crude-${index + 1}`,
    name: row.querySelector(".cdu-blend-name")?.value || `Crude ${String.fromCharCode(65 + index)}`,
    sg: row.querySelector(".cdu-blend-sg")?.value,
    flowrate: row.querySelector(".cdu-blend-flow")?.value,
    flowUnit: row.querySelector(".cdu-blend-unit")?.value || "m3/h",
  }));
}

function renderCrudeBlendSummary(blend = state.cduRunState?.crudeBlend) {
  if (!els.cduBlendSummary) return;
  const normalized = calculateCrudeBlend(blend?.components || []);
  if (!Number.isFinite(Number(normalized.totalFlowM3H)) || normalized.totalFlowM3H <= 0 || !normalized.blendClassification) {
    els.cduBlendSummary.textContent = "Blend belum valid. Isi SG dan flow minimal satu crude.";
    els.cduBlendSummary.dataset.status = "empty";
    return;
  }
  const blendMBSD = convertM3HToMBSD(normalized.totalFlowM3H);
  els.cduBlendSummary.textContent = `Blend SG ${formatNumber(normalized.blendSG, 5)} | API ${formatNumber(normalized.blendAPI, 2)} | ${formatCrudeClassificationLabel(normalized.blendClassification)} | ${formatM3HValue(normalized.totalFlowM3H)} | ${formatMBSDValue(blendMBSD)}`;
  els.cduBlendSummary.dataset.status = normalized.blendClassification;
}

function syncCrudeBlendFromPanel(options = {}) {
  const components = readCrudeBlendComponentsFromPanel();
  const blend = calculateCrudeBlend(components);
  const next = {
    ...state.cduRunState,
    crudeBlend: blend,
  };
  if (blend.blendClassification) {
    next.crudeSG = blend.blendSG;
    next.crudeAPI = blend.blendAPI;
    next.crudeClassification = blend.blendClassification;
    next.selectedCrudeType = mapCrudeClassificationToAssayType(blend.blendClassification);
  }
  if (options.applyIntake && blend.totalFlowM3H > 0) {
    next.crudeIntakeM3H = blend.totalFlowM3H;
    next.crudeIntakeMBSD = convertM3HToMBSD(blend.totalFlowM3H);
    next.intakeUnit = "m3h";
  }
  state.cduRunState = normalizeCduRunState(next);
  updateCrudeSelector(state.cduRunState.selectedCrudeType);
  updateCrudeClassificationBadge(state.cduRunState.crudeAPI, state.cduRunState.crudeClassification);
  renderCrudeBlendSummary(state.cduRunState.crudeBlend);
  if (els.cduCrudeSGInput) {
    els.cduCrudeSGInput.value = Number.isFinite(Number(state.cduRunState.crudeSG)) ? String(roundFlowrate(state.cduRunState.crudeSG)) : "";
  }
  return state.cduRunState.crudeBlend;
}

function addCrudeBlendComponent() {
  const components = readCrudeBlendComponentsFromPanel();
  components.push({
    id: makeCrudeBlendComponentId(),
    name: `Crude ${String.fromCharCode(65 + Math.min(25, components.length))}`,
    sg: state.cduRunState?.crudeSG || DEFAULT_CDU_RUN_STATE.crudeSG,
    flowrate: 0,
    flowUnit: "m3/h",
  });
  state.cduRunState = normalizeCduRunState({ ...state.cduRunState, crudeBlend: calculateCrudeBlend(components) });
  renderCrudeBlendPanel();
  saveConfigToLocalStorage("Crude blend tersimpan", { silentToast: true, skipHistorySnapshot: true });
}

function removeCrudeBlendComponent(componentId) {
  const components = readCrudeBlendComponentsFromPanel().filter((component) => component.id !== componentId);
  const nextComponents = components.length ? components : createDefaultCrudeBlend(state.cduRunState).components;
  state.cduRunState = normalizeCduRunState({ ...state.cduRunState, crudeBlend: calculateCrudeBlend(nextComponents) });
  renderCrudeBlendPanel();
  saveConfigToLocalStorage("Crude blend tersimpan", { silentToast: true, skipHistorySnapshot: true });
}

function applyCrudeBlendToMassBalance() {
  const blend = syncCrudeBlendFromPanel({ applyIntake: true });
  if (!blend || blend.totalFlowM3H <= 0 || !blend.blendClassification) {
    showToast("Crude blend belum valid", "warning");
    return;
  }
  updateCduRunControls();
  saveConfigToLocalStorage("Crude blend diterapkan ke intake", { silentToast: true, skipHistorySnapshot: true });
  showToast(`Blend applied: ${formatM3HValue(blend.totalFlowM3H)}, ${formatCrudeClassificationLabel(blend.blendClassification)}`, "success", { duration: 1800 });
}

function handleStartCduMassBalance() {
  if (hasMultiCrudeBlend()) {
    syncCrudeBlendFromPanel({ silent: true });
  } else {
    updateCrudeTypeFromSG({ silent: true });
  }
  const selectedCrudeType = els.cduCrudeTypeSelect?.value || DEFAULT_CDU_RUN_STATE.selectedCrudeType;
  const syncedRunState = syncCduIntakeFromInput();
  const intakeUnit = syncedRunState?.intakeUnit || (els.cduIntakeUnitSelect?.value === "mbsd" ? "mbsd" : "m3h");
  const crudeIntakeM3H = syncedRunState?.crudeIntakeM3H;
  const crudeIntakeMBSD = syncedRunState?.crudeIntakeMBSD;
  if (!CDU_CRUDE_ASSAYS[selectedCrudeType]) {
    showToast("Crude type CDU tidak valid", "error");
    return;
  }
  if (!Number.isFinite(crudeIntakeM3H) || crudeIntakeM3H <= 0 || !Number.isFinite(crudeIntakeMBSD) || crudeIntakeMBSD <= 0) {
    showToast("Crude intake harus lebih besar dari 0", "error");
    return;
  }

  const assay = CDU_CRUDE_ASSAYS[selectedCrudeType];
  const splitTotal = getSplitModelTotal(assay.splitModel);
  if (!isSplitModelTotalValid(splitTotal)) {
    showToast(`Total split ${formatPercentValue(splitTotal)} tidak mendekati 100%`, "warning");
  }

  setCduCalculationState(true);
  window.setTimeout(() => {
    try {
      pushUndoSnapshot("CDU mass balance run");
      state.cduRunState = normalizeCduRunState({
        ...state.cduRunState,
        selectedCrudeType,
        crudeIntakeM3H,
        crudeIntakeMBSD,
        intakeUnit,
        hasStarted: true,
        lastRunAt: new Date().toISOString(),
        lastResult: null,
      });
      refreshMassBalanceAfterDataChange("cdu-mass-balance-started", { save: false, focusSelected: false });
      state.cduRunState.lastResult = summarizeMassBalanceResult(getMassBalanceResult(getCduOverallNode()));
      triggerCduCalculationCompleteAnimation();
      const mbsd = convertM3HToMBSD(crudeIntakeM3H);
      const percentCap = calculatePercentCapacityFromM3H(crudeIntakeM3H);
      saveCurrentConfig(`CDU mass balance completed: ${assay.name}, ${formatM3HValue(crudeIntakeM3H)}, ${formatMBSDValue(mbsd)}, ${formatCapacityPercentValue(percentCap)} Cap.`);
    } finally {
      setCduCalculationState(false);
    }
  }, 320);
}

function setCduCalculationState(isCalculating) {
  if (!els.cduStartBalance) return;
  els.cduStartBalance.classList.toggle("is-calculating", Boolean(isCalculating));
  els.cduStartBalance.disabled = Boolean(isCalculating);
  els.cduStartBalance.textContent = isCalculating ? "Calculating" : "Start";
}

function restartTimedAnimation(element, className, timeoutMs = 900) {
  if (!element) return;
  element.classList.remove(className);
  void element.offsetWidth;
  element.classList.add(className);
  const cleanup = () => element.classList.remove(className);
  element.addEventListener("animationend", cleanup, { once: true });
  window.setTimeout(cleanup, timeoutMs);
}

function triggerCduCalculationCompleteAnimation() {
  restartTimedAnimation(els.cduRunStatus, "calculation-complete", 900);
  restartTimedAnimation(els.cduFloatingTables, "table-refreshing", 700);
  document.querySelectorAll(".node-balance-mini").forEach((element) => {
    restartTimedAnimation(element, "balance-pulse", 800);
  });
}

function resetCduCalculation() {
  pushUndoSnapshot("Reset CDU calculation");
  state.cduRunState = deepClone(DEFAULT_CDU_RUN_STATE);
  state.cduRunState.lastResult = null;
  refreshMassBalanceAfterDataChange("reset-cdu-calculation", { save: false, focusSelected: false });
  clearPortFlowBadges();
  saveCurrentConfig("CDU calculation direset");
}

function refreshAfterCduMassBalance() {
  refreshMassBalanceAfterDataChange("cdu-mass-balance-refresh", { save: false, focusSelected: false });
}

function updateCduRunControls() {
  const normalizedRunState = normalizeCduRunState(state.cduRunState);
  state.cduRunState = normalizedRunState;
  if (els.cduCrudeTypeSelect) {
    const current = normalizedRunState.selectedCrudeType;
    if (!els.cduCrudeTypeSelect.options.length) {
      Object.values(CDU_CRUDE_ASSAYS).forEach((assay) => {
        const option = document.createElement("option");
        option.value = assay.id;
        option.textContent = assay.name;
        els.cduCrudeTypeSelect.appendChild(option);
      });
    }
    els.cduCrudeTypeSelect.value = current;
  }
  if (els.cduCrudeSGInput) els.cduCrudeSGInput.value = Number.isFinite(Number(normalizedRunState.crudeSG)) ? String(roundFlowrate(normalizedRunState.crudeSG)) : "";
  updateCrudeClassificationBadge(normalizedRunState.crudeAPI, normalizedRunState.crudeClassification);
  renderCrudeBlendPanel();
  updateCduIntakeInputDisplay();
  if (els.cduRunStatus) {
    const runState = normalizeCduRunState(state.cduRunState);
    const result = getMassBalanceResult(getCduOverallNode());
    const status = runState.hasStarted ? formatMassBalanceStatus(result?.status) : "Not Started";
    const assay = CDU_CRUDE_ASSAYS[runState.selectedCrudeType] || CDU_CRUDE_ASSAYS.medium;
    const crudeLabel = safeText(assay.name, "Crude").replace(/\s+Crude$/i, "");
    const mbsd = runState.crudeIntakeMBSD;
    const percentCap = calculatePercentCapacityFromM3H(runState.crudeIntakeM3H);
    const intakeText = runState.intakeUnit === "mbsd"
      ? `${formatMBSDValue(mbsd)} · ${formatM3HValue(runState.crudeIntakeM3H)}`
      : `${formatM3HValue(runState.crudeIntakeM3H)} · ${formatMBSDValue(mbsd)}`;
    els.cduRunStatus.textContent = runState.hasStarted
      ? `${status} · ${crudeLabel} · ${intakeText} · ${formatCapacityPercentValue(percentCap)}`
      : `Not Started · ${crudeLabel} · ${intakeText}`;
    els.cduRunStatus.dataset.status = runState.hasStarted ? (result?.status || "incomplete") : "notStarted";
  }
}

function loadCduDefaultConfig() {
  if (!requireEditMode("Load CDU Default")) return;
  const confirmed = window.confirm("Load CDU default dan ganti config aktif? Backup config saat ini akan dibuat.");
  if (!confirmed) return;
  try {
    safeLocalStorageSet(ADMIN_BACKUP_KEY, JSON.stringify(getCurrentConfig()));
  } catch (error) {
    console.warn("Gagal membuat backup sebelum load CDU default:", error);
  }
  state.userModified = false;
  hydrateConfig(createDefaultCduConfig());
  hideImportPreview();
  refreshMassBalanceAfterDataChange("load-cdu-default", { save: false, focusSelected: true });
  try {
    safeLocalStorageSet(ADMIN_STORAGE_KEY, JSON.stringify(getCurrentConfig()));
    updateAutosaveIndicator("Default CDU", "saved");
  } catch (error) {
    console.warn("Gagal menyimpan CDU default:", error);
    updateAutosaveIndicator("Default CDU", "warning");
  }
  initializeHistorySnapshot();
  updateCduRunControls();
  showToast("CDU default dimuat", "success");
}

function exportConfigJson() {
  const config = getCurrentConfig();
  const json = JSON.stringify(config, null, 2);
  const blob = new Blob([json], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `refinerymap-config-${getDateForFilename()}.json`;
  document.body.appendChild(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);
  showToast("Config JSON diexport", "success");
}

function prepareDeploymentConfig(config = getActiveCanvasConfig()) {
  return deepClone({
    ...config,
    userModified: false,
    deploymentDefault: true,
    deploymentSavedAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  });
}

function downloadDeploymentConfig(config = prepareDeploymentConfig()) {
  const json = JSON.stringify(config, null, 2);
  const blob = new Blob([json], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = "refinery-config.json";
  document.body.appendChild(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);
  updateDeploymentStatus("Downloaded config for manual deployment", "warning");
  showToast("Downloaded config for manual deployment", "info");
}

async function saveDeploymentDefaultToServer(config, adminToken) {
  const response = await fetch(DEPLOYMENT_CONFIG_SAVE_API, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Admin-Token": adminToken || "",
    },
    credentials: "same-origin",
    body: JSON.stringify({
      adminToken,
      config,
    }),
  });

  if (!response.ok) {
    const error = new Error(`Server returned ${response.status}`);
    error.status = response.status;
    try {
      const payload = await response.json();
      error.message = payload?.error || error.message;
    } catch {
      // Static hosts often return HTML for missing API endpoints.
    }
    throw error;
  }

  return response.json().catch(() => ({ ok: true }));
}

async function handleSaveDeploymentDefault() {
  if (!requireEditMode("Save & Deploy Default")) return;

  const config = prepareDeploymentConfig(getActiveCanvasConfig());
  const validation = validateConfigShape(config);
  if (!validation.valid) {
    console.warn("Deployment config ditolak:", validation.issues);
    updateDeploymentStatus("Failed to save to server", "error");
    showToast("Config aktif tidak valid untuk deployment", "error");
    return;
  }

  saveConfigToLocalStorage("Autosaved locally", { silentToast: true, skipHistorySnapshot: true });
  updateDeploymentStatus("Saving deployment default...", "local");

  try {
    els.adminConfigDeploy?.classList.add("is-disabled");
    if (els.adminConfigDeploy) els.adminConfigDeploy.disabled = true;
    try {
      await saveDeploymentDefaultToServer(config, "");
    } catch (error) {
      if (error.status !== 401 && error.status !== 403) throw error;
      const token = window.prompt("Admin token/password untuk menyimpan deployment default:", "");
      if (token === null) {
        downloadDeploymentConfig(config);
        showToast("Upload/timpa file ini ke folder data/refinery-config.json lalu deploy ulang.", "info", { duration: 3600 });
        return;
      }
      await saveDeploymentDefaultToServer(config, token);
    }
    updateDeploymentStatus("Saved as deployment default", "saved");
    showToast("Saved as deployment default", "success");
  } catch (error) {
    console.warn("Gagal menyimpan deployment default ke server:", error);
    updateDeploymentStatus("Failed to save to server", "error");
    showToast("Failed to save to server", "error");
    if (error.status !== 401 && error.status !== 403) {
      downloadDeploymentConfig(config);
      showToast("Upload/timpa file ini ke folder data/refinery-config.json lalu deploy ulang.", "info", { duration: 4200 });
    }
  } finally {
    els.adminConfigDeploy?.classList.remove("is-disabled");
    if (els.adminConfigDeploy) els.adminConfigDeploy.disabled = false;
  }
}

async function handleConfigImportFile(event) {
  const file = event.target.files?.[0];
  if (!file) return;
  if (!file.name.toLowerCase().endsWith(".json") && file.type !== "application/json") {
    showToast("File import harus berformat JSON", "error");
    clearImportInput();
    return;
  }

  try {
    const text = await file.text();
    const parsed = JSON.parse(text);
    const validation = validateConfigShape(parsed);
    if (!validation.valid) {
      console.warn("Import config ditolak:", validation.issues);
      showToast("JSON tidak valid untuk config RefineryMap", "error");
      hideImportPreview();
      clearImportInput();
      return;
    }
    state.pendingImportConfig = normalizeImportedConfig(parsed);
    renderImportPreview(state.pendingImportConfig, file.name);
    showToast("Preview import siap diperiksa", "info");
  } catch (error) {
    console.error(error);
    showToast("JSON tidak valid atau tidak bisa dibaca", "error");
    hideImportPreview();
  } finally {
    clearImportInput();
  }
}

function normalizeImportedConfig(config) {
  const normalized = deepClone({
    version: Number(config.version) || 3,
    dataVersion: safeText(config.dataVersion, ""),
    streamVersion: Number(config.streamVersion) || 0,
    importedAt: new Date().toISOString(),
    canvas: {
      width: Number(config.canvas.width),
      height: Number(config.canvas.height),
    },
    areas: config.areas,
    nodes: config.nodes,
    streams: config.streams,
    pidSymbols: Array.isArray(config.pidSymbols) ? config.pidSymbols : [],
    pidConnectors: Array.isArray(config.pidConnectors) ? config.pidConnectors : [],
    cduRunState: normalizeCduRunState(config.cduRunState),
    cduBaseCapacity: normalizeCduBaseCapacity(config.cduBaseCapacity),
    cduFlowSource: normalizeCduFlowSource(config.cduFlowSource),
    viewOptions: normalizeViewOptions(config.viewOptions),
  });
  if (normalized.dataVersion !== PFD_DATA_VERSION) {
    normalized.dataVersion = PFD_DATA_VERSION;
    normalized.streamVersion = STREAM_CONFIG_VERSION;
    return normalized;
  }
  return migrateStreamConfigVersion(normalized).config;
}

function renderImportPreview(config, fileName = "config JSON") {
  if (!els.adminImportPreview) return;
  els.adminImportPreview.classList.remove("is-hidden");
  els.adminImportPreviewTitle.textContent = fileName;
  els.adminImportAreaCount.textContent = String(config.areas.length);
  els.adminImportNodeCount.textContent = String(config.nodes.length);
  els.adminImportStreamCount.textContent = String(config.streams.length);
  els.adminImportPreviewMessage.textContent = `Canvas ${config.canvas.width} x ${config.canvas.height}. Klik Terapkan Import untuk mengganti config aktif.`;
}

function hideImportPreview() {
  state.pendingImportConfig = null;
  els.adminImportPreview?.classList.add("is-hidden");
}

function clearImportInput() {
  if (els.adminConfigImport) els.adminConfigImport.value = "";
}

function cancelPendingImportConfig() {
  hideImportPreview();
  showToast("Import dibatalkan", "info");
}

function applyPendingImportConfig() {
  if (!requireEditMode("Import Config")) return;
  const config = state.pendingImportConfig;
  if (!config) {
    showToast("Belum ada config import yang dipreview", "warning");
    return;
  }
  const confirmed = window.confirm(`Import config ini dan ganti config aktif?\n\nArea: ${config.areas.length}\nNode: ${config.nodes.length}\nStream: ${config.streams.length}`);
  if (!confirmed) return;

  try {
    safeLocalStorageSet(ADMIN_BACKUP_KEY, JSON.stringify(getCurrentConfig()));
  } catch (error) {
    console.error(error);
    showToast("Gagal membuat backup config lama", "error");
    return;
  }

  hydrateConfig(config);
  hideImportPreview();
  refreshMassBalanceAfterDataChange("Config import tersimpan", { focusSelected: true });
}

function restoreLastBackupConfig() {
  if (!requireEditMode("Restore Backup")) return;
  const raw = safeLocalStorageGet(ADMIN_BACKUP_KEY);
  const backup = safeJsonParse(raw);
  if (!backup || !isConfigShapeValid(backup)) {
    showToast("Backup terakhir tidak tersedia atau tidak valid", "error");
    return;
  }
  const confirmed = window.confirm(`Pulihkan backup terakhir?\n\nArea: ${backup.areas.length}\nNode: ${backup.nodes.length}\nStream: ${backup.streams.length}`);
  if (!confirmed) return;
  hydrateConfig(backup);
  hideImportPreview();
  refreshMassBalanceAfterDataChange("Backup terakhir dipulihkan", { focusSelected: true });
}

function getDateForFilename() {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function refreshAfterAdminChange(options = {}) {
  indexData();
  renderCanvas();
  renderAdminPanel();
  renderPresentationAreaOptions();
  updateCduRunControls();
  syncSelectionAfterAdminChange(options);
}

function syncSelectionAfterAdminChange(options = {}) {
  if (options.keepPid && state.selectedPidSymbolId) {
    const symbol = PID_SYMBOLS.find((item) => item.id === state.selectedPidSymbolId);
    if (symbol) {
      selectPidSymbol(symbol.id, { syncAdmin: false });
      return;
    }
  }

  if (options.keepStream && state.activeStreamId) {
    const stream = STREAMS.find((item) => item.id === state.activeStreamId);
    if (stream) {
      selectStream(stream.id, { openDetail: options.openDetail !== false, syncAdmin: false });
      return;
    }
  }

  const selected = nodeById.get(state.selectedNodeId);
  const preferred = selected || NODES.find((node) => node.tag === state.activeNodeTag) || NODES[0];
  if (preferred) {
    selectNode(preferred.id, { focus: Boolean(options.focusSelected) });
  } else {
    state.selectedNodeId = "";
    closeDetailPanel();
    els.emptyDetail.hidden = false;
    els.emptyDetail.classList.remove("is-hidden");
    els.nodeDetail.hidden = true;
    els.nodeDetail.classList.add("is-hidden");
    hideStreamDetail();
  }
}

function loadViewPreferences() {
  const theme = safeLocalStorageGet(THEME_STORAGE_KEY)
    || LEGACY_THEME_STORAGE_KEYS.map((key) => safeLocalStorageGet(key)).find(Boolean);
  const streamLabels = safeLocalStorageGet(STREAM_LABEL_MODE_STORAGE_KEY);
  const portLabels = safeLocalStorageGet(PORT_LABEL_MODE_STORAGE_KEY);
  const fontScale = safeNumber(safeLocalStorageGet(NODE_FONT_SCALE_STORAGE_KEY), 1);
  const iconScale = safeNumber(safeLocalStorageGet(NODE_ICON_SCALE_STORAGE_KEY), 1);
  const portLabelFontSize = safeNumber(safeLocalStorageGet(PORT_LABEL_FONT_SIZE_STORAGE_KEY), 10);
  const portLabelScale = safeNumber(safeLocalStorageGet(PORT_LABEL_SCALE_STORAGE_KEY), 1);
  const portLabelWeight = safeLocalStorageGet(PORT_LABEL_WEIGHT_STORAGE_KEY);
  const portLabelColor = safeLocalStorageGet(PORT_LABEL_COLOR_STORAGE_KEY);
  const gridVisible = safeLocalStorageGet(GRID_VISIBLE_STORAGE_KEY);
  const snapToGrid = safeLocalStorageGet(SNAP_TO_GRID_STORAGE_KEY);
  const gridSize = safeNumber(safeLocalStorageGet(GRID_SIZE_STORAGE_KEY), 20);
  const layers = safeJsonParse(safeLocalStorageGet(LAYERS_STORAGE_KEY));
  const hoverSelect = safeLocalStorageGet(SELECT_STREAM_ON_HOVER_STORAGE_KEY);
  const streamBridges = safeLocalStorageGet(STREAM_BRIDGES_STORAGE_KEY);
  const preferPolyline = safeLocalStorageGet(PREFER_POLYLINE_STORAGE_KEY);
  const autoStraightAligned = safeLocalStorageGet(AUTO_STRAIGHT_ALIGNED_STORAGE_KEY);
  const canvasFirstEdit = safeLocalStorageGet(CANVAS_FIRST_EDIT_STORAGE_KEY);
  const autoHideDetailEdit = safeLocalStorageGet(AUTO_HIDE_DETAIL_EDIT_STORAGE_KEY);
  const autoCollapseAdminEdit = safeLocalStorageGet(AUTO_COLLAPSE_ADMIN_EDIT_STORAGE_KEY);
  const adminCollapsed = safeLocalStorageGet(ADMIN_COLLAPSED_STORAGE_KEY);
  const pidSymbolsLayer = safeLocalStorageGet(PID_SYMBOLS_LAYER_STORAGE_KEY);
  const pidConnectorsLayer = safeLocalStorageGet(PID_CONNECTORS_LAYER_STORAGE_KEY);
  state.themeMode = VALID_THEME_MODES.has(theme) ? theme : "light";
  state.streamLabelModeGlobal = VALID_STREAM_LABEL_MODES.has(streamLabels) ? streamLabels : "hover";
  state.portLabelModeGlobal = VALID_PORT_LABEL_MODES.has(portLabels) ? portLabels : "important";
  state.nodeFontScaleGlobal = [0.8, 1, 1.2, 1.4].includes(fontScale) ? fontScale : 1;
  state.nodeIconScaleGlobal = [0.8, 1, 1.2, 1.4].includes(iconScale) ? iconScale : 1;
  state.portLabelFontSize = clamp(portLabelFontSize, 8, 18);
  state.portLabelFontScale = [0.8, 1, 1.2, 1.4].includes(portLabelScale) ? portLabelScale : 1;
  state.portLabelWeight = PORT_LABEL_FONT_WEIGHTS.has(String(portLabelWeight || "")) ? String(portLabelWeight) : "700";
  state.portLabelColor = isCssHexColor(portLabelColor) ? portLabelColor : "";
  state.gridVisible = gridVisible === null || gridVisible === "" ? true : gridVisible === "true";
  state.snapToGrid = snapToGrid === null || snapToGrid === "" ? false : snapToGrid === "true";
  state.gridSize = GRID_SIZE_OPTIONS.has(gridSize) ? gridSize : 20;
  state.layers = normalizeLayerSettings(layers);
  state.selectStreamOnHover = hoverSelect === null || hoverSelect === "" ? false : hoverSelect === "true";
  state.streamBridges = streamBridges === null || streamBridges === "" ? true : streamBridges === "true";
  state.preferPolylinePfd = preferPolyline === null || preferPolyline === "" ? true : preferPolyline === "true";
  state.autoStraightAlignedStreams = autoStraightAligned === null || autoStraightAligned === "" ? true : autoStraightAligned === "true";
  state.canvasFirstEdit = canvasFirstEdit === null || canvasFirstEdit === "" ? true : canvasFirstEdit === "true";
  state.autoHideDetailInEditMode = autoHideDetailEdit === null || autoHideDetailEdit === "" ? true : autoHideDetailEdit === "true";
  state.autoCollapseAdminInEditMode = autoCollapseAdminEdit === null || autoCollapseAdminEdit === "" ? true : autoCollapseAdminEdit === "true";
  state.adminCollapsed = adminCollapsed === null || adminCollapsed === "" ? false : adminCollapsed === "true";
  state.pidLayers.symbols = pidSymbolsLayer === null || pidSymbolsLayer === "" ? true : pidSymbolsLayer === "true";
  state.pidLayers.connectors = pidConnectorsLayer === null || pidConnectorsLayer === "" ? true : pidConnectorsLayer === "true";
}

function applyViewPreferences(options = {}) {
  document.documentElement.dataset.theme = state.themeMode;
  document.documentElement.dataset.streamLabels = state.streamLabelModeGlobal;
  document.documentElement.dataset.portLabels = state.portLabelModeGlobal;
  document.documentElement.dataset.streamBridges = state.streamBridges ? "on" : "off";
  document.documentElement.dataset.gridVisible = state.gridVisible ? "on" : "off";
  document.documentElement.dataset.snapToGrid = state.snapToGrid ? "on" : "off";
  document.body.classList.toggle("is-canvas-first-edit", Boolean(state.canvasFirstEdit));
  document.documentElement.style.setProperty("--grid-size", `${state.gridSize}px`);
  document.documentElement.style.setProperty("--global-port-label-font-size", `${Math.round(state.portLabelFontSize * state.portLabelFontScale)}px`);
  document.documentElement.style.setProperty("--global-port-label-font-weight", state.portLabelWeight);
  if (state.portLabelColor) {
    document.documentElement.style.setProperty("--global-port-label-color", state.portLabelColor);
  } else {
    document.documentElement.style.removeProperty("--global-port-label-color");
  }
  updateZoomLabelDensity();
  if (els.themeModeSelect) els.themeModeSelect.value = state.themeMode;
  if (els.themeToggle) {
    els.themeToggle.dataset.theme = state.themeMode;
    els.themeToggle.title = `Color theme: ${formatThemePresetLabel(state.themeMode)}`;
    els.themeToggle.setAttribute("aria-label", `Choose color theme. Current: ${formatThemePresetLabel(state.themeMode)}`);
  }
  els.themePresetOptions?.forEach((option) => {
    const active = option.dataset.themePreset === state.themeMode;
    option.classList.toggle("is-active", active);
    option.setAttribute("aria-checked", String(active));
  });
  if (els.nodeFontScaleGlobal) els.nodeFontScaleGlobal.value = String(state.nodeFontScaleGlobal);
  if (els.nodeIconScaleGlobal) els.nodeIconScaleGlobal.value = String(state.nodeIconScaleGlobal);
  if (els.streamLabelModeGlobal) els.streamLabelModeGlobal.value = state.streamLabelModeGlobal;
  if (els.portLabelModeGlobal) els.portLabelModeGlobal.value = state.portLabelModeGlobal;
  if (els.portLabelFontSizeGlobal) els.portLabelFontSizeGlobal.value = String(state.portLabelFontSize);
  if (els.portLabelScaleGlobal) els.portLabelScaleGlobal.value = String(state.portLabelFontScale);
  if (els.portLabelWeightGlobal) els.portLabelWeightGlobal.value = state.portLabelWeight;
  if (els.portLabelColorGlobal) {
    els.portLabelColorGlobal.value = state.portLabelColor || "#10233f";
    els.portLabelColorGlobal.dataset.default = state.portLabelColor ? "false" : "true";
  }
  if (els.gridVisibleToggle) els.gridVisibleToggle.checked = Boolean(state.gridVisible);
  if (els.snapToGridToggle) els.snapToGridToggle.checked = Boolean(state.snapToGrid);
  if (els.gridSizeSelect) els.gridSizeSelect.value = String(state.gridSize);
  syncLayerToggleControls();
  applyLayerVisibility();
  if (els.selectStreamOnHover) els.selectStreamOnHover.checked = Boolean(state.selectStreamOnHover);
  if (els.streamBridgesToggle) els.streamBridgesToggle.checked = Boolean(state.streamBridges);
  if (els.preferPolylineToggle) els.preferPolylineToggle.checked = Boolean(state.preferPolylinePfd);
  if (els.autoStraightAlignedToggle) els.autoStraightAlignedToggle.checked = Boolean(state.autoStraightAlignedStreams);
  if (els.canvasFirstEditToggle) els.canvasFirstEditToggle.checked = Boolean(state.canvasFirstEdit);
  if (els.autoHideDetailEditToggle) els.autoHideDetailEditToggle.checked = Boolean(state.autoHideDetailInEditMode);
  if (els.autoCollapseAdminEditToggle) els.autoCollapseAdminEditToggle.checked = Boolean(state.autoCollapseAdminInEditMode);
  applyAdminCollapseState({ silent: true });
  if (els.pidSymbolsLayerToggle) els.pidSymbolsLayerToggle.checked = Boolean(state.pidLayers.symbols);
  if (els.pidConnectorsLayerToggle) els.pidConnectorsLayerToggle.checked = Boolean(state.pidLayers.connectors);
  if (els.simplifiedViewOption) els.simplifiedViewOption.checked = Boolean(state.simplifiedView);
  if (els.showNodeBalanceOption) els.showNodeBalanceOption.checked = state.showNodeBalance !== false;
  if (els.showPortFlowOption) els.showPortFlowOption.checked = state.showPortFlow !== false && normalizePortFlowMode(state.portFlowMode) !== "off";
  if (els.portFlowModeSelect) els.portFlowModeSelect.value = normalizePortFlowMode(state.portFlowMode);
  if (els.portValueDisplayGlobal) els.portValueDisplayGlobal.value = normalizePortValueDisplay(state.portValueDisplay);
  if (els.portInfoLayoutGlobal) els.portInfoLayoutGlobal.value = normalizePortInfoLayout(state.portInfoLayout);
  if (els.portInfoScaleGlobal) els.portInfoScaleGlobal.value = String(normalizePortInfoScale(state.portInfoScale));
  if (els.simplifiedView) els.simplifiedView.checked = Boolean(state.simplifiedView);
  if (els.viewOptionsToggle) {
    els.viewOptionsToggle.setAttribute("aria-label", "View Options");
    els.viewOptionsToggle.title = "View Options";
  }
  if (!options.silent) {
    renderStreams();
    renderPidLayer();
    renderNodes();
  }
}

function persistViewPreference(key, value) {
  try {
    safeLocalStorageSet(key, value);
  } catch {
    showToast("Preferensi tampilan tidak dapat disimpan.", "warning");
  }
}

function normalizeLayerSettings(value = {}) {
  const source = isPlainObject(value) ? value : {};
  return Object.fromEntries(Object.entries(VIEW_LAYER_DEFAULTS).map(([key, fallback]) => [
    key,
    typeof source[key] === "boolean" ? source[key] : fallback,
  ]));
}

function persistLayerSettings() {
  persistViewPreference(LAYERS_STORAGE_KEY, JSON.stringify(state.layers));
}

function syncLayerToggleControls() {
  els.layerToggles?.forEach((input) => {
    const key = input.dataset.layerToggle;
    if (!key) return;
    input.checked = state.layers[key] !== false;
  });
}

function applyLayerVisibility() {
  els.areaLayer?.classList.toggle("is-layer-hidden", state.layers.areas === false);
  els.nodeLayer?.classList.toggle("is-layer-hidden", state.layers.nodes === false);
  els.streamLayer?.classList.toggle("is-layer-hidden", state.layers.streams === false);
  document.documentElement.dataset.layerPorts = state.layers.ports === false ? "off" : "on";
  document.documentElement.dataset.layerPortLabels = state.layers.portLabels === false ? "off" : "on";
  document.documentElement.dataset.layerStreamLabels = state.layers.streamLabels === false ? "off" : "on";
}

function setLayerVisibility(layerName, enabled) {
  if (!Object.prototype.hasOwnProperty.call(VIEW_LAYER_DEFAULTS, layerName)) return;
  state.layers[layerName] = Boolean(enabled);
  persistLayerSettings();
  applyViewPreferences({ silent: true });
  renderStreams();
  renderNodes();
  renderAreas();
  showToast(`${layerName} ${enabled ? "ditampilkan" : "disembunyikan"}`, "info");
}

function setThemeMode(mode) {
  state.themeMode = VALID_THEME_MODES.has(mode) ? mode : "light";
  persistViewPreference(THEME_STORAGE_KEY, state.themeMode);
  LEGACY_THEME_STORAGE_KEYS.forEach((key) => safeLocalStorageRemove(key));
  applyViewPreferences();
  closeThemePresetPopover();
  showToast(`${formatThemePresetLabel(state.themeMode)} theme aktif`, "info");
}

function formatThemePresetLabel(theme) {
  const value = VALID_THEME_MODES.has(theme) ? theme : "light";
  return value.charAt(0).toUpperCase() + value.slice(1);
}

function openThemePresetPopover() {
  if (!els.themePresetPopover) return;
  els.themePresetPopover.classList.remove("is-hidden");
  els.themeToggle?.setAttribute("aria-expanded", "true");
}

function closeThemePresetPopover() {
  if (!els.themePresetPopover) return;
  els.themePresetPopover.classList.add("is-hidden");
  els.themeToggle?.setAttribute("aria-expanded", "false");
}

function toggleThemePresetPopover() {
  if (!els.themePresetPopover) return;
  if (els.themePresetPopover.classList.contains("is-hidden")) openThemePresetPopover();
  else closeThemePresetPopover();
}

function setGlobalNodeFontScale(scale) {
  state.nodeFontScaleGlobal = clamp(safeNumber(scale, 1), 0.8, 1.4);
  persistViewPreference(NODE_FONT_SCALE_STORAGE_KEY, String(state.nodeFontScaleGlobal));
  applyViewPreferences();
  updateAdminNodePreview();
  showToast(`Node font scale ${Math.round(state.nodeFontScaleGlobal * 100)}%`, "info");
}

function setGlobalNodeIconScale(scale) {
  state.nodeIconScaleGlobal = clamp(safeNumber(scale, 1), 0.8, 1.4);
  persistViewPreference(NODE_ICON_SCALE_STORAGE_KEY, String(state.nodeIconScaleGlobal));
  applyViewPreferences();
  updateAdminNodePreview();
  showToast(`Node icon scale ${Math.round(state.nodeIconScaleGlobal * 100)}%`, "info");
}

function setGlobalPortLabelFontSize(value) {
  state.portLabelFontSize = clamp(safeNumber(value, 10), 8, 18);
  persistViewPreference(PORT_LABEL_FONT_SIZE_STORAGE_KEY, String(state.portLabelFontSize));
  applyViewPreferences();
  showToast(`Port label ${state.portLabelFontSize}px`, "info");
}

function setGlobalPortLabelScale(value) {
  state.portLabelFontScale = [0.8, 1, 1.2, 1.4].includes(safeNumber(value, 1)) ? safeNumber(value, 1) : 1;
  persistViewPreference(PORT_LABEL_SCALE_STORAGE_KEY, String(state.portLabelFontScale));
  applyViewPreferences();
  showToast(`Port label scale ${Math.round(state.portLabelFontScale * 100)}%`, "info");
}

function setGlobalPortLabelWeight(value) {
  state.portLabelWeight = PORT_LABEL_FONT_WEIGHTS.has(String(value || "")) ? String(value) : "700";
  persistViewPreference(PORT_LABEL_WEIGHT_STORAGE_KEY, state.portLabelWeight);
  applyViewPreferences();
}

function setGlobalPortLabelColor(value) {
  state.portLabelColor = isCssHexColor(value) ? value : "";
  persistViewPreference(PORT_LABEL_COLOR_STORAGE_KEY, state.portLabelColor);
  applyViewPreferences();
}

function setGridVisible(enabled) {
  state.gridVisible = Boolean(enabled);
  persistViewPreference(GRID_VISIBLE_STORAGE_KEY, String(state.gridVisible));
  applyViewPreferences({ silent: true });
  showToast(state.gridVisible ? "Grid ditampilkan" : "Grid disembunyikan", "info");
}

function setSnapToGrid(enabled) {
  state.snapToGrid = Boolean(enabled);
  persistViewPreference(SNAP_TO_GRID_STORAGE_KEY, String(state.snapToGrid));
  applyViewPreferences({ silent: true });
  showToast(state.snapToGrid ? "Snap to Grid aktif" : "Snap to Grid nonaktif", "info");
}

function setGridSize(value) {
  const size = safeNumber(value, 20);
  state.gridSize = GRID_SIZE_OPTIONS.has(size) ? size : 20;
  persistViewPreference(GRID_SIZE_STORAGE_KEY, String(state.gridSize));
  applyViewPreferences({ silent: true });
  showToast(`Grid size ${state.gridSize}px`, "info");
}

function setSelectStreamOnHover(enabled) {
  state.selectStreamOnHover = Boolean(enabled);
  persistViewPreference(SELECT_STREAM_ON_HOVER_STORAGE_KEY, String(state.selectStreamOnHover));
  applyViewPreferences({ silent: true });
  showToast(state.selectStreamOnHover ? "Hover select stream aktif" : "Hover select stream nonaktif", "info");
}

function setStreamBridges(enabled) {
  state.streamBridges = Boolean(enabled);
  persistViewPreference(STREAM_BRIDGES_STORAGE_KEY, String(state.streamBridges));
  applyViewPreferences();
  showToast(state.streamBridges ? "Stream bridges aktif" : "Stream bridges nonaktif", "info");
}

function setPreferPolylinePfd(enabled) {
  state.preferPolylinePfd = Boolean(enabled);
  persistViewPreference(PREFER_POLYLINE_STORAGE_KEY, String(state.preferPolylinePfd));
  applyViewPreferences({ silent: true });
  showToast(state.preferPolylinePfd ? "Stream baru default Polyline" : "Stream baru default Cable", "info");
}

function setAutoStraightAlignedStreams(enabled) {
  state.autoStraightAlignedStreams = Boolean(enabled);
  persistViewPreference(AUTO_STRAIGHT_ALIGNED_STORAGE_KEY, String(state.autoStraightAlignedStreams));
  applyViewPreferences({ silent: true });
  showToast(state.autoStraightAlignedStreams ? "Auto-straight stream sejajar aktif" : "Auto-straight stream sejajar nonaktif", "info");
}

function setCanvasFirstEdit(enabled) {
  state.canvasFirstEdit = Boolean(enabled);
  persistViewPreference(CANVAS_FIRST_EDIT_STORAGE_KEY, String(state.canvasFirstEdit));
  applyViewPreferences({ silent: true });
  if (isEditMode() && state.canvasFirstEdit && state.autoHideDetailInEditMode) closeDetailPanel();
  renderQuickInspector();
  showToast(`Canvas First ${state.canvasFirstEdit ? "ON" : "OFF"}`, "info");
}

function setAutoHideDetailInEditMode(enabled) {
  state.autoHideDetailInEditMode = Boolean(enabled);
  persistViewPreference(AUTO_HIDE_DETAIL_EDIT_STORAGE_KEY, String(state.autoHideDetailInEditMode));
  applyViewPreferences({ silent: true });
  if (isEditMode() && state.autoHideDetailInEditMode) closeDetailPanel();
}

function setAutoCollapseAdminInEditMode(enabled) {
  state.autoCollapseAdminInEditMode = Boolean(enabled);
  persistViewPreference(AUTO_COLLAPSE_ADMIN_EDIT_STORAGE_KEY, String(state.autoCollapseAdminInEditMode));
  applyViewPreferences({ silent: true });
  if (isEditMode() && state.autoCollapseAdminInEditMode) collapseAdminPanel();
}

function setAdminCollapsed(enabled) {
  state.adminCollapsed = Boolean(enabled);
  persistViewPreference(ADMIN_COLLAPSED_STORAGE_KEY, String(state.adminCollapsed));
  applyAdminCollapseState();
}

function collapseAdminPanel() {
  setAdminCollapsed(true);
}

function expandAdminPanel(tabName = "") {
  setAdminCollapsed(false);
  showAdminPanel();
  if (tabName) switchAdminTab(tabName);
}

function toggleAdminCollapsed() {
  setAdminCollapsed(!state.adminCollapsed);
}

function applyAdminCollapseState() {
  if (!els.adminPanel) return;
  els.adminPanel.classList.toggle("is-collapsed", Boolean(state.adminCollapsed));
  els.adminPanelCollapse?.setAttribute("aria-expanded", String(!state.adminCollapsed));
  if (els.adminPanelCollapse) {
    els.adminPanelCollapse.textContent = state.adminCollapsed ? ">" : "<";
    els.adminPanelCollapse.title = state.adminCollapsed ? "Expand admin panel" : "Collapse admin panel";
  }
}

function setPidLayerPreference(layerName, enabled) {
  if (!Object.prototype.hasOwnProperty.call(state.pidLayers, layerName)) return;
  state.pidLayers[layerName] = Boolean(enabled);
  const key = layerName === "connectors" ? PID_CONNECTORS_LAYER_STORAGE_KEY : PID_SYMBOLS_LAYER_STORAGE_KEY;
  persistViewPreference(key, String(state.pidLayers[layerName]));
  renderPidLayer();
  showToast(`${layerName === "connectors" ? "P&ID connectors" : "P&ID symbols"} ${enabled ? "ditampilkan" : "disembunyikan"}`, "info");
}

function setSimplifiedView(enabled) {
  state.simplifiedView = Boolean(enabled);
  if (els.simplifiedView) els.simplifiedView.checked = state.simplifiedView;
  if (els.simplifiedViewOption) els.simplifiedViewOption.checked = state.simplifiedView;
  renderCanvas();
  fitVisibleScope();
}

function getDefaultNewStreamShape() {
  // Startup-safe default: this function is used while default data is still being built,
  // before runtime state exists. Keep it independent from state to prevent top-level crashes.
  return "polyline";
}

function setStreamLabelMode(mode) {
  state.streamLabelModeGlobal = VALID_STREAM_LABEL_MODES.has(mode) ? mode : "hover";
  persistViewPreference(STREAM_LABEL_MODE_STORAGE_KEY, state.streamLabelModeGlobal);
  applyViewPreferences();
  showToast(`Stream Labels: ${state.streamLabelModeGlobal}`, "info");
}

function setPortLabelMode(mode) {
  state.portLabelModeGlobal = VALID_PORT_LABEL_MODES.has(mode) ? mode : "important";
  persistViewPreference(PORT_LABEL_MODE_STORAGE_KEY, state.portLabelModeGlobal);
  applyViewPreferences();
  showToast(`Port Labels: ${state.portLabelModeGlobal}`, "info");
}

function toggleViewOptionsPopover(event) {
  event?.preventDefault();
  event?.stopPropagation();
  if (!els.viewOptionsPopover || !els.viewOptionsToggle) return;
  const isOpen = !els.viewOptionsPopover.classList.contains("is-hidden");
  els.viewOptionsPopover.classList.toggle("is-hidden", isOpen);
  els.viewOptionsToggle.setAttribute("aria-expanded", String(!isOpen));
}

function closeViewOptionsPopover() {
  els.viewOptionsPopover?.classList.add("is-hidden");
  els.viewOptionsToggle?.setAttribute("aria-expanded", "false");
}

function updateZoomLabelDensity() {
  if (state.zoom < 0.3) {
    document.documentElement.dataset.zoomPortLabels = "none";
  } else if (state.zoom < 0.45) {
    document.documentElement.dataset.zoomPortLabels = "selected";
  } else {
    document.documentElement.dataset.zoomPortLabels = "normal";
  }
}

function bindEvents() {
  els.zoomIn.addEventListener("click", () => setZoom(state.zoom * 1.18));
  els.zoomOut.addEventListener("click", () => setZoom(state.zoom / 1.18));
  els.fitAll.addEventListener("click", fitAll);
  els.resetView.addEventListener("click", resetView);
  els.scopeBack?.addEventListener("click", backScope);
  els.scopeOverview?.addEventListener("click", () => setScope("refinery", { focus: true }));
  els.simplifiedView?.addEventListener("change", () => {
    setSimplifiedView(els.simplifiedView.checked);
  });
  els.detailOpenUnit?.addEventListener("click", () => {
    const node = nodeById.get(state.selectedNodeId);
    if (node?.unit) setScope("unit", { unit: node.unit, focus: true });
  });
  els.detailOpenSection?.addEventListener("click", () => {
    const node = nodeById.get(state.selectedNodeId);
    if (node?.unit && node?.section) setScope("section", { unit: node.unit, section: node.section, focus: true });
  });
  els.detailPanelClose?.addEventListener("click", closeDetailPanel);
  els.shortcutHelp?.addEventListener("click", openShortcutModal);
  els.shortcutClose?.addEventListener("click", closeShortcutModal);
  els.shortcutModal?.addEventListener("click", (event) => {
    if (event.target === els.shortcutModal) closeShortcutModal();
  });
  els.viewOptionsToggle?.addEventListener("click", toggleViewOptionsPopover);
  els.themeModeSelect?.addEventListener("change", (event) => setThemeMode(event.target.value));
  els.themeToggle?.addEventListener("click", toggleThemePresetPopover);
  els.themePresetOptions?.forEach((option) => {
    option.addEventListener("click", () => setThemeMode(option.dataset.themePreset));
  });
  els.nodeFontScaleGlobal?.addEventListener("change", (event) => setGlobalNodeFontScale(event.target.value));
  els.nodeIconScaleGlobal?.addEventListener("change", (event) => setGlobalNodeIconScale(event.target.value));
  els.streamLabelModeGlobal?.addEventListener("change", (event) => setStreamLabelMode(event.target.value));
  els.portLabelModeGlobal?.addEventListener("change", (event) => setPortLabelMode(event.target.value));
  els.portLabelFontSizeGlobal?.addEventListener("input", (event) => setGlobalPortLabelFontSize(event.target.value));
  els.portLabelScaleGlobal?.addEventListener("change", (event) => setGlobalPortLabelScale(event.target.value));
  els.portLabelWeightGlobal?.addEventListener("change", (event) => setGlobalPortLabelWeight(event.target.value));
  els.portLabelColorGlobal?.addEventListener("input", (event) => setGlobalPortLabelColor(event.target.value));
  els.portLabelColorResetGlobal?.addEventListener("click", () => setGlobalPortLabelColor(""));
  els.showNodeBalanceOption?.addEventListener("change", (event) => setShowNodeBalance(event.target.checked));
  els.showPortFlowOption?.addEventListener("change", (event) => setShowPortFlow(event.target.checked));
  els.portFlowModeSelect?.addEventListener("change", (event) => setPortFlowMode(event.target.value));
  els.portValueDisplayGlobal?.addEventListener("change", (event) => setPortValueDisplay(event.target.value));
  els.portInfoLayoutGlobal?.addEventListener("change", (event) => setPortInfoLayout(event.target.value));
  els.portInfoScaleGlobal?.addEventListener("change", (event) => setPortInfoScale(event.target.value));
  els.gridVisibleToggle?.addEventListener("change", (event) => setGridVisible(event.target.checked));
  els.snapToGridToggle?.addEventListener("change", (event) => setSnapToGrid(event.target.checked));
  els.gridSizeSelect?.addEventListener("change", (event) => setGridSize(event.target.value));
  els.layerToggles?.forEach((input) => {
    input.addEventListener("change", () => setLayerVisibility(input.dataset.layerToggle, input.checked));
  });
  els.undoButton?.addEventListener("click", undo);
  els.redoButton?.addEventListener("click", redo);
  els.startupModeToggle?.addEventListener("click", handleStartupToolbarClick);
  els.startupPanelClose?.addEventListener("click", () => setStartupModeActive(false));
  els.startupPanelMinimize?.addEventListener("click", toggleStartupPanelMinimized);
  els.startupPanelResetPosition?.addEventListener("click", resetStartupPanelPosition);
  els.startupPanelSizeButtons?.forEach((button) => button.addEventListener("click", () => setStartupPanelSize(button.dataset.startupPanelSize)));
  els.startupPanelDragHandle?.addEventListener("pointerdown", startStartupPanelDrag);
  els.startupPanel?.addEventListener("pointerdown", (event) => event.stopPropagation());
  els.startupStart?.addEventListener("click", startStartupSimulation);
  els.startupPause?.addEventListener("click", pauseStartupSimulation);
  els.startupReset?.addEventListener("click", resetStartupSimulation);
  els.startupPrev?.addEventListener("click", previousStartupStep);
  els.startupNext?.addEventListener("click", nextStartupStep);
  els.startupComplete?.addEventListener("click", () => completeStartupStep(getCurrentStartupStep()?.id));
  els.startupNotReady?.addEventListener("click", markStartupStepNotReady);
  els.startupStepCard?.addEventListener("input", handleStartupStepInputChange);
  els.startupStepCard?.addEventListener("change", handleStartupStepInputChange);
  els.cduStartBalance?.addEventListener("click", handleStartCduMassBalance);
  els.cduResetCalculation?.addEventListener("click", resetCduCalculation);
  els.cduTablesHide?.addEventListener("click", () => setCduTablesVisible(false));
  els.cduTablesShow?.addEventListener("click", () => setCduTablesVisible(true));
  els.cduTablesCollapse?.addEventListener("click", toggleCduTablesCollapsed);
  els.cduTablesResetPosition?.addEventListener("click", resetCduFloatingTablePosition);
  els.cduTableSizeButtons?.forEach((button) => {
    button.addEventListener("click", () => setCduFloatingTableSize(button.dataset.cduTableSize));
  });
  els.cduFloatingTableDragHandle?.addEventListener("pointerdown", startCduFloatingTableDrag);
  els.cduFloatingTables?.addEventListener("pointerdown", (event) => event.stopPropagation());
  els.cduTablesShow?.addEventListener("pointerdown", (event) => event.stopPropagation());
  document.addEventListener("pointermove", updateCduFloatingTableDrag);
  document.addEventListener("pointerup", finishCduFloatingTableDrag);
  document.addEventListener("pointercancel", finishCduFloatingTableDrag);
  document.addEventListener("pointermove", updateStartupPanelDrag);
  document.addEventListener("pointerup", finishStartupPanelDrag);
  document.addEventListener("pointercancel", finishStartupPanelDrag);
  window.addEventListener("resize", () => {
    if (!els.cduFloatingTables?.classList.contains("is-hidden")) {
      setCduFloatingTablePosition(state.cduFloatingTablePosition?.x, state.cduFloatingTablePosition?.y);
    }
    constrainStartupPanelToViewport();
  });
  els.cduCrudeTypeSelect?.addEventListener("change", () => {
    const selectedCrudeType = els.cduCrudeTypeSelect.value;
    const crudeSG = getDefaultCrudeSGForType(selectedCrudeType);
    const crudeAPI = apiFromSG(crudeSG);
    const crudeClassification = classifyCrudeByApi(crudeAPI);
    const crudeBlend = calculateCrudeBlend([{
      id: "crude-1",
      name: `${formatCrudeClassificationLabel(crudeClassification)} Crude`,
      sg: crudeSG,
      flowrate: state.cduRunState?.crudeIntakeM3H || DEFAULT_CDU_RUN_STATE.crudeIntakeM3H,
      flowUnit: "m3/h",
    }]);
    state.cduRunState = normalizeCduRunState({
      ...state.cduRunState,
      selectedCrudeType,
      crudeSG,
      crudeAPI,
      crudeClassification,
      crudeBlend,
    });
    updateCduRunControls();
    saveConfigToLocalStorage("Crude type tersimpan", { silentToast: true, skipHistorySnapshot: true });
  });
  els.cduCrudeSGInput?.addEventListener("input", () => {
    updateCrudeTypeFromSG({ silent: true });
  });
  els.cduCrudeSGInput?.addEventListener("change", () => {
    updateCrudeTypeFromSG();
    updateCduRunControls();
    saveConfigToLocalStorage("SG crude tersimpan", { silentToast: true, skipHistorySnapshot: true });
  });
  els.cduBlendToggle?.addEventListener("click", () => toggleCduBlendPanel());
  els.cduBlendClose?.addEventListener("click", () => toggleCduBlendPanel(false));
  els.cduBlendAdd?.addEventListener("click", addCrudeBlendComponent);
  els.cduBlendApply?.addEventListener("click", applyCrudeBlendToMassBalance);
  // Recovery V8: Crude Blend is mounted outside the canvas; handle panel buttons on pointerup too.
  [els.cduBlendClose, els.cduBlendAdd, els.cduBlendApply].forEach((button) => {
    button?.addEventListener("pointerup", (event) => {
      if (event.button !== undefined && event.button !== 0) return;
      event.preventDefault();
      event.stopPropagation();
      if (button === els.cduBlendClose) toggleCduBlendPanel(false);
      if (button === els.cduBlendAdd) addCrudeBlendComponent();
      if (button === els.cduBlendApply) applyCrudeBlendToMassBalance();
    });
  });
  els.cduBlendRows?.addEventListener("input", () => {
    syncCrudeBlendFromPanel({ silent: true });
    saveConfigToLocalStorage("Crude blend tersimpan", { silentToast: true, skipHistorySnapshot: true });
  });
  els.cduBlendRows?.addEventListener("change", () => {
    syncCrudeBlendFromPanel({ silent: true });
    renderCrudeBlendPanel();
    saveConfigToLocalStorage("Crude blend tersimpan", { silentToast: true, skipHistorySnapshot: true });
  });
  els.cduBlendRows?.addEventListener("click", (event) => {
    const button = event.target.closest("[data-action='remove-crude-blend']");
    if (!button) return;
    removeCrudeBlendComponent(button.closest(".cdu-blend-row")?.dataset.componentId);
  });
  els.cduCrudeIntakeInput?.addEventListener("change", () => {
    syncCduIntakeFromInput();
    updateCduRunControls();
  });
  els.cduIntakeUnitSelect?.addEventListener("change", () => {
    const nextUnit = els.cduIntakeUnitSelect.value === "mbsd" ? "mbsd" : "m3h";
    state.cduRunState = normalizeCduRunState({
      ...state.cduRunState,
      intakeUnit: nextUnit,
    });
    updateCduRunControls();
  });
  els.selectStreamOnHover?.addEventListener("change", (event) => setSelectStreamOnHover(event.target.checked));
  els.streamBridgesToggle?.addEventListener("change", (event) => setStreamBridges(event.target.checked));
  els.preferPolylineToggle?.addEventListener("change", (event) => setPreferPolylinePfd(event.target.checked));
  els.autoStraightAlignedToggle?.addEventListener("change", (event) => setAutoStraightAlignedStreams(event.target.checked));
  els.canvasFirstEditToggle?.addEventListener("change", (event) => setCanvasFirstEdit(event.target.checked));
  els.autoHideDetailEditToggle?.addEventListener("change", (event) => setAutoHideDetailInEditMode(event.target.checked));
  els.autoCollapseAdminEditToggle?.addEventListener("change", (event) => setAutoCollapseAdminInEditMode(event.target.checked));
  els.pidSymbolsLayerToggle?.addEventListener("change", (event) => setPidLayerPreference("symbols", event.target.checked));
  els.pidConnectorsLayerToggle?.addEventListener("change", (event) => setPidLayerPreference("connectors", event.target.checked));
  els.simplifiedViewOption?.addEventListener("change", (event) => setSimplifiedView(event.target.checked));
  els.pidPaletteToggle?.addEventListener("click", togglePidPalette);
  els.pidSymbolSearch?.addEventListener("input", (event) => {
    state.pidPaletteSearch = event.target.value;
    renderPidPalette();
  });

  els.canvasViewport.addEventListener("wheel", handleWheel, { passive: false });
  els.canvasViewport.addEventListener("pointerdown", startPan);
  els.canvasViewport.addEventListener("click", handleCanvasBackgroundClick);
  window.addEventListener("pointermove", updatePan);
  window.addEventListener("pointerup", endPan);
  window.addEventListener("resize", debounce(fitAll, 160));

  els.nodeSearch.addEventListener("input", () => performSearch(els.nodeSearch.value));
  els.nodeSearch.addEventListener("keydown", handleSearchKeydown);
  document.addEventListener("pointerdown", (event) => {
    const popover = document.getElementById("streamQuickConstraintPopover");
    if (!popover || popover.classList.contains("is-hidden")) return;
    if (popover.contains(event.target)) return;
    const trigger = event.target.closest("[data-stream-constraint-trigger], .stream-hit-path, .stream-label, .stream-range-badge, .node-port");
    if (trigger) return;
    hideStreamQuickConstraintPopover();
  }, true);
  document.addEventListener("click", (event) => {
    if (!event.target.closest(".search-box")) closeSearchResults();
    if (!event.target.closest(".view-options")) closeViewOptionsPopover();
    if (!event.target.closest(".pid-palette-wrapper")) closePidPalette();
    if (!event.target.closest(".theme-preset-control")) closeThemePresetPopover();
    if (!event.target.closest(".stream-quick-constraint, .stream-hit-path, .stream-label, .node-port")) {
      hideStreamQuickConstraintPopover();
    }
  });
  els.presentationToggle?.addEventListener("click", () => setPresentationMode(!isPresentationMode()));
  els.presentationExit?.addEventListener("click", () => setPresentationMode(false));
  els.presentationFocusArea?.addEventListener("click", () => focusPresentationArea());
  els.presentationFocusNode?.addEventListener("click", () => focusPresentationNode());
  els.presentationPrevNode?.addEventListener("click", () => stepPresentationNode(-1));
  els.presentationNextNode?.addEventListener("click", () => stepPresentationNode(1));
  els.presentationOverlayClose?.addEventListener("click", hidePresentationOverlay);
  els.presentationOverlayMore?.addEventListener("click", togglePresentationOverlayExpanded);
  els.presentationInfoOverlay?.addEventListener("mouseenter", clearPresentationOverlayTimer);
  els.presentationInfoOverlay?.addEventListener("mouseleave", schedulePresentationOverlayAutoHide);
  els.quickInspectorClose?.addEventListener("click", hideQuickInspector);
  els.presentationAreaSelect?.addEventListener("change", () => {
    state.activePresentationAreaId = els.presentationAreaSelect.value;
    state.presentationNodeIndex = 0;
    renderAreas();
    focusPresentationArea();
  });
  document.addEventListener("keydown", handleGlobalKeyboard);
  document.addEventListener("keydown", handlePresentationKeyboard);
  
  // Event Fitur Baru
  document.addEventListener('keydown', handleKeyboardNav);
  els.canvasViewport.addEventListener('touchstart', handleTouchStart, { passive: false });
  els.canvasViewport.addEventListener('touchmove', handleTouchMove, { passive: false });
  els.canvasViewport.addEventListener('touchend', handleTouchEnd);
  
  if (typeof bindAdminEvents === 'function') bindAdminEvents();
}

function startPan(event) {
  if (isInsideInteractiveOverlay(event)) return;
  if (isFormControl(event.target)) return;
  if (event.button !== 0 && event.pointerType === 'mouse') return;

  // Fitur Drag & Drop Mode Edit
  const nodeTarget = event.target.closest('.canvas-node');
  if (document.body.classList.contains('is-edit-mode') && nodeTarget) {
    state.draggedNodeId = nodeTarget.dataset.nodeId;
    const draggedNode = nodeById.get(state.draggedNodeId);
    if (draggedNode) {
      setActiveNode(draggedNode.id);
      syncAdminNodeSelection(draggedNode);
    }
    nodeTarget.classList.add('is-dragging');
    state.panStart = { x: event.clientX, y: event.clientY };
    els.canvasViewport.setPointerCapture?.(event.pointerId);
    return;
  }

  if (event.target.closest(".canvas-node, button, input, .search-results")) return;

  state.isPanning = true;
  state.panStart = {
    pointerId: event.pointerId,
    x: event.clientX,
    y: event.clientY,
    panX: state.panX,
    panY: state.panY,
  };
  els.canvasViewport.classList.add("is-panning");
  els.canvasViewport.setPointerCapture?.(event.pointerId);
}

function updatePan(event) {
  // Update posisi node saat Drag
  if (state.draggedNodeId && state.panStart) {
    const dx = (event.clientX - state.panStart.x) / state.zoom;
    const dy = (event.clientY - state.panStart.y) / state.zoom;
    const node = nodeById.get(state.draggedNodeId);
    
    if (node) {
      node.x += dx;
      node.y += dy;
      const el = document.querySelector(`.canvas-node[data-node-id="${node.id}"]`);
      if (el) {
        el.style.left = `${Math.round(node.x)}px`;
        el.style.top = `${Math.round(node.y)}px`;
      }
      renderStreams();
    }
    state.panStart = { x: event.clientX, y: event.clientY };
    return;
  }

  if (!state.isPanning || !state.panStart) return;
  const dx = event.clientX - state.panStart.x;
  const dy = event.clientY - state.panStart.y;
  state.panX = state.panStart.panX + dx;
  state.panY = state.panStart.panY + dy;
  scheduleViewUpdate();
}

function endPan() {
  // Simpan posisi saat Drag selesai
  if (state.draggedNodeId) {
    const draggedNode = nodeById.get(state.draggedNodeId);
    const nodeEl = document.querySelector('.canvas-node.is-dragging');
    if (nodeEl) nodeEl.classList.remove('is-dragging');
    if (draggedNode) {
      draggedNode.x = Math.round(draggedNode.x);
      draggedNode.y = Math.round(draggedNode.y);
      if (state.activeNodeTag === draggedNode.tag) {
        els.adminNodeX.value = draggedNode.x;
        els.adminNodeY.value = draggedNode.y;
        updateAdminNodePreview();
      }
    }
    state.draggedNodeId = null;
    if (typeof commitDataChange === "function") commitDataChange("Posisi Node diperbarui");
  }

  state.isPanning = false;
  state.panStart = null;
  els.canvasViewport.classList.remove("is-panning");
}

function applyView() {
  els.canvasStage.style.transform = `translate(${state.panX}px, ${state.panY}px) scale(${state.zoom})`;
  els.zoomValue.textContent = `${Math.round(state.zoom * 100)}%`;
  updateZoomLabelDensity();
  updateViewStatus();
  updateMinimap();
}

function renderCanvas() {
  applyCanvasConfig();
  try {
    renderScopeControls();
  } catch (error) {
    console.warn("Scope controls gagal dirender:", error);
  }
  try {
    renderAreas();
  } catch (error) {
    console.warn("Area canvas gagal dirender:", error);
  }
  try {
    renderStreams();
  } catch (error) {
    console.warn("Stream canvas gagal dirender:", error);
  }
  try {
    renderPidLayer();
  } catch (error) {
    console.warn("P&ID layer gagal dirender:", error);
  }
  try {
    renderNodes();
  } catch (error) {
    console.warn("Node canvas gagal dirender:", error);
  }
  try {
    renderStreamPointEditor();
  } catch (error) {
    console.warn("Editor titik stream gagal dirender:", error);
  }
  try {
    renderCanvasEmptyState();
  } catch (error) {
    console.warn("Empty state gagal dirender:", error);
  }
  try {
    renderCduFloatingTables();
  } catch (error) {
    console.warn("CDU floating tables gagal dirender:", error);
  }
  try {
    renderStartupSimulator();
    highlightStartupLinkedItems(getCurrentStartupStep());
  } catch (error) {
    console.warn("Startup simulator gagal dirender:", error);
  }
  try {
    updateViewStatus();
  } catch (error) {
    console.warn("View status gagal diperbarui:", error);
  }
  try {
    renderPidPalette();
  } catch (error) {
    console.warn("P&ID palette gagal dirender:", error);
  }
}

function applyCanvasConfig() {
  if (!els.canvasStage || !els.streamLayer) return;
  els.canvasStage.style.width = `${CANVAS.width}px`;
  els.canvasStage.style.height = `${CANVAS.height}px`;
  els.streamLayer.setAttribute("width", String(CANVAS.width));
  els.streamLayer.setAttribute("height", String(CANVAS.height));
  els.streamLayer.setAttribute("viewBox", `0 0 ${CANVAS.width} ${CANVAS.height}`);
  if (els.pidSymbolLayer) {
    els.pidSymbolLayer.setAttribute("width", String(CANVAS.width));
    els.pidSymbolLayer.setAttribute("height", String(CANVAS.height));
    els.pidSymbolLayer.setAttribute("viewBox", `0 0 ${CANVAS.width} ${CANVAS.height}`);
  }
}

function showLoading(message = "Loading...") {
  const loading = els.loadingOverlay || document.getElementById("loadingOverlay") || document.getElementById("appLoading");
  document.body?.classList.add("is-loading");
  if (!loading) return;
  loading.classList.remove("is-hidden");
  const messageElement = loading.querySelector("[data-loading-message]");
  if (messageElement) messageElement.textContent = message;
}

function hideLoading() {
  const loading = els.loadingOverlay || document.getElementById("loadingOverlay") || document.getElementById("appLoading");
  document.body?.classList.remove("is-loading");
  loading?.classList.add("is-hidden");
}

function setLoadingState(isLoading) {
  if (isLoading) {
    showLoading("Memuat RefineryMap...");
  } else {
    hideLoading();
  }
}

function renderStartupFallbackCanvas(error) {
  try {
    renderAreas();
  } catch (areaError) {
    console.warn("Fallback area render failed:", areaError);
  }
  try {
    renderNodes();
  } catch (nodeError) {
    console.warn("Fallback node render failed:", nodeError);
  }
  showStartupErrorPanel(error);
}

function showStartupErrorPanel(error, fallbackError = null) {
  const panel = els.canvasEmptyState || document.getElementById("canvasEmptyState");
  const message = els.canvasEmptyMessage || document.getElementById("canvasEmptyMessage");
  if (panel) {
    panel.classList.remove("is-hidden");
    panel.innerHTML = `
      <p class="eyebrow">Startup error</p>
      <h2>RefineryMap failed to load</h2>
      <p id="canvasEmptyMessage">${escapeHtml(getStartupErrorText(error, fallbackError))}</p>
      <div class="startup-error-actions">
        <button type="button" class="tool-button" data-startup-action="reset">Reset Local Data</button>
        <button type="button" class="tool-button" data-startup-action="reload">Reload App</button>
        <button type="button" class="tool-button" data-startup-action="safe">Open Safe Mode</button>
      </div>
    `;
    panel.querySelector('[data-startup-action="reset"]')?.addEventListener("click", resetLocalDataAndReload);
    panel.querySelector('[data-startup-action="reload"]')?.addEventListener("click", () => window.location.reload());
    panel.querySelector('[data-startup-action="safe"]')?.addEventListener("click", openSafeMode);
  } else if (message) {
    message.textContent = getStartupErrorText(error, fallbackError);
  }
}

function getStartupErrorText(error, fallbackError = null) {
  const primary = error?.message || String(error || "Unknown startup error");
  const fallback = fallbackError?.message ? ` Fallback: ${fallbackError.message}` : "";
  return `${primary}${fallback}`;
}

function resetLocalDataAndReload() {
  try {
    Object.keys(localStorage)
      .filter((key) => key.toLowerCase().includes("refinerymap"))
      .forEach((key) => localStorage.removeItem(key));
  } catch (error) {
    console.warn("Reset local data failed:", error);
  }
  window.location.reload();
}

function openSafeMode() {
  const url = new URL(window.location.href);
  url.searchParams.set("safe", "1");
  window.location.href = url.toString();
}

function renderCanvasEmptyState() {
  if (!els.canvasEmptyState) return;
  const messages = [];
  if (!AREAS.length) messages.push("area");
  if (!NODES.filter((node) => isNodeVisibleInScope(node)).length && !PID_SYMBOLS.length) messages.push("node atau P&ID symbol pada scope aktif");

  const isEmpty = messages.length > 0;
  els.canvasEmptyState.classList.toggle("is-hidden", !isEmpty);
  els.canvasViewport?.classList.toggle("has-empty-state", isEmpty);
  if (isEmpty && els.canvasEmptyMessage) {
    els.canvasEmptyMessage.textContent = `Data ${messages.join(", ")} masih kosong. Buka admin Edit Mode untuk menambahkan data Big Canvas.`;
  }
}

function renderScopeControls() {
  if (!els.scopeBreadcrumb) return;
  const parts = ["Refinery Overview"];
  if (state.currentScope === "unit" || state.currentScope === "section" || state.currentScope === "equipment") {
    parts.push(safeText(state.currentUnit, "Unit"));
  }
  if (state.currentScope === "section" || state.currentScope === "equipment") {
    parts.push(safeText(state.currentSection, "Section"));
  }
  if (state.currentScope === "equipment") {
    const node = nodeById.get(state.selectedNodeId);
    if (node) parts.push(node.tag);
  }
  if (parts.length === 1) {
    els.scopeBreadcrumb.textContent = "";
    els.scopeBreadcrumb.classList.add("is-empty");
  } else {
    els.scopeBreadcrumb.classList.remove("is-empty");
    els.scopeBreadcrumb.innerHTML = parts.map((part, index) => (
      `<span class="${index === parts.length - 1 ? "is-current" : ""}">${escapeHtml(part)}</span>`
    )).join("<span aria-hidden=\"true\">/</span>");
  }
  if (els.scopeBack) els.scopeBack.disabled = state.currentScope === "refinery";
  if (els.simplifiedView) els.simplifiedView.checked = state.simplifiedView;
  renderScopeSections();
}

function renderScopeSections() {
  if (!els.scopeSections) return;
  els.scopeSections.replaceChildren();
  if (state.currentScope === "refinery" || !state.currentUnit) {
    els.scopeSections.classList.add("is-empty");
    return;
  }
  els.scopeSections.classList.remove("is-empty");
  getSectionsForUnit(state.currentUnit).forEach((section) => {
    const group = document.createElement("span");
    group.className = "scope-section-group";

    const button = document.createElement("button");
    button.type = "button";
    button.className = "scope-section-chip";
    button.classList.toggle("is-active", state.currentScope === "section" && state.currentSection === section);
    button.classList.toggle("is-collapsed", state.currentScope === "unit" && isSectionCollapsed(state.currentUnit, section));
    button.textContent = section;
    button.addEventListener("click", () => setScope("section", { unit: state.currentUnit, section, focus: true }));

    const toggle = document.createElement("button");
    toggle.type = "button";
    toggle.className = "scope-section-toggle";
    toggle.setAttribute("aria-label", `${isSectionCollapsed(state.currentUnit, section) ? "Expand" : "Collapse"} ${section}`);
    toggle.setAttribute("aria-pressed", String(isSectionCollapsed(state.currentUnit, section)));
    toggle.textContent = isSectionCollapsed(state.currentUnit, section) ? "+" : "-";
    toggle.addEventListener("click", (event) => {
      event.preventDefault();
      event.stopPropagation();
      toggleSectionCollapse(state.currentUnit, section);
    });

    group.append(button, toggle);
    els.scopeSections.appendChild(group);
  });
}

function getSectionsForUnit(unit) {
  return [...new Set(NODES
    .filter((node) => sameUnit(node.unit, unit))
    .map((node) => safeText(node.section, "General")))]
    .filter(Boolean)
    .sort((a, b) => a.localeCompare(b));
}

function getSectionKey(unit, section) {
  return `${safeText(unit, "").toUpperCase()}::${safeText(section, "").toLowerCase()}`;
}

function isSectionCollapsed(unit, section) {
  return Boolean(state.collapsedSections[getSectionKey(unit, section)]);
}

function toggleSectionCollapse(unit, section) {
  const key = getSectionKey(unit, section);
  state.collapsedSections[key] = !state.collapsedSections[key];
  renderCanvas();
}

function setScope(scope, options = {}) {
  state.currentScope = scope;
  state.currentUnit = scope === "refinery" ? "" : safeText(options.unit || state.currentUnit, "");
  state.currentSection = scope === "section" || scope === "equipment"
    ? safeText(options.section || state.currentSection, "")
    : "";
  if (typeof options.simplifiedView === "boolean") state.simplifiedView = options.simplifiedView;
  state.streamEditMode = false;
  state.streamAddPointMode = false;
  state.streamEndpointPickMode = "";
  state.portConnectionDrag = null;
  state.selectedStreamPointIndex = -1;
  document.body.classList.remove("is-cable-dragging", "is-port-pick-mode");
  renderCanvas();
  if (options.focus) fitVisibleScope();
  updateViewStatus();
}

function backScope() {
  if (state.currentScope === "section") {
    setScope("unit", { unit: state.currentUnit, focus: true });
    return;
  }
  if (state.currentScope === "unit" || state.currentScope === "equipment") {
    setScope("refinery", { focus: true });
  }
}

function getVisibleNodes() {
  if (state.layers.nodes === false) return [];
  return NODES.filter((node) => isNodeVisibleInScope(node));
}

function getVisibleNodeTagSet() {
  return new Set(getVisibleNodes().map((node) => node.tag));
}

function isNodeVisibleInScope(node) {
  if (node?.userCreated) {
    if (!isInCurrentScope(node)) return false;
    if (state.currentScope === "refinery") return normalizeVisibleIn(node.visibleIn, true).includes("refinery");
    return true;
  }
  const visibleIn = normalizeVisibleIn(node.visibleIn, node.isMajor);
  if (state.currentScope === "refinery") {
    return visibleIn.includes("refinery") && (!state.simplifiedView || node.isMajor);
  }
  if (state.currentScope === "unit") {
    if (!sameUnit(node.unit, state.currentUnit) || !visibleIn.includes("unit")) return false;
    if (isSectionCollapsed(node.unit, node.section)) {
      return node.isMajor || node.id === state.selectedNodeId;
    }
    return true;
  }
  if (state.currentScope === "section") {
    return sameUnit(node.unit, state.currentUnit)
      && sameSection(node.section, state.currentSection)
      && (visibleIn.includes("section") || node.isMajor);
  }
  if (state.currentScope === "equipment") {
    return node.id === state.selectedNodeId
      || node.parent === nodeById.get(state.selectedNodeId)?.tag
      || node.children?.includes(nodeById.get(state.selectedNodeId)?.tag);
  }
  return true;
}

function getVisibleStreams() {
  if (state.layers.streams === false) return [];
  const visibleTags = getVisibleNodeTagSet();
  return STREAMS.filter((stream) => {
    if (stream.invalid) return false;
    if (!isStreamCategoryLayerVisible(stream)) return false;
    if (!visibleTags.has(stream.from) || !visibleTags.has(stream.to)) return false;
    if (!isStreamEndpointValid(stream)) {
      console.warn(`Stream ${stream.id || "(tanpa id)"} dilewati: endpoint atau port tidak valid.`);
      return false;
    }
    if (stream.userCreated) {
      if (!isInCurrentScope(stream)) return false;
      return true;
    }
    const visibleIn = normalizeVisibleIn(stream.visibleIn, stream.isMajor);
    if (state.currentScope === "refinery") {
      return visibleIn.includes("refinery") && (
        !state.simplifiedView
        || stream.visibleInSimplified === true
      );
    }
    if (state.currentScope === "unit") {
      return visibleIn.includes("unit") && (
        sameUnit(stream.unit, state.currentUnit)
        || sameUnit(nodeByTag.get(stream.from)?.unit, state.currentUnit)
        || sameUnit(nodeByTag.get(stream.to)?.unit, state.currentUnit)
      );
    }
    if (state.currentScope === "section") {
      return (visibleIn.includes("section") || stream.isMajor) && sameSection(stream.section, state.currentSection);
    }
    if (state.currentScope === "equipment") {
      const selected = nodeById.get(state.selectedNodeId);
      return selected && (stream.from === selected.tag || stream.to === selected.tag);
    }
    return true;
  });
}

function isStreamCategoryLayerVisible(stream) {
  const key = getStreamLayerKey(stream);
  return key ? state.layers[key] !== false : true;
}

function getStreamLayerKey(stream) {
  const text = `${safeText(stream.category)} ${safeText(stream.type)} ${safeText(stream.label)}`.toLowerCase();
  if (/(utility|steam|water|air|cooling|hydrogen)/.test(text)) return "utilityStreams";
  if (/(gas|offgas|fuelgas|overhead|lpg)/.test(text)) return "gasStreams";
  if (/(product|gasoline|diesel|kerosene|naphtha|lpg)/.test(text)) return "productStreams";
  if (/(heavy|residue|slurry|vgo|lco|hco|clo)/.test(text)) return "heavyStreams";
  if (/catalyst/.test(text)) return "catalystStreams";
  if (/(sour|sulfur|amine|h2s)/.test(text)) return "sourStreams";
  return "";
}

function sameUnit(a, b) {
  return safeText(a, "").toUpperCase() === safeText(b, "").toUpperCase();
}

function sameSection(a, b) {
  return safeText(a, "").toLowerCase() === safeText(b, "").toLowerCase();
}

function fitVisibleScope() {
  const nodes = getVisibleNodes();
  if (!nodes.length) {
    fitAll();
    return;
  }
  fitBounds(nodes.map((node) => getScopedNodeLayout(node)));
}

function fitBounds(rects) {
  const valid = rects.filter(Boolean);
  if (!valid.length) return;
  const minX = Math.min(...valid.map((rect) => rect.x));
  const minY = Math.min(...valid.map((rect) => rect.y));
  const maxX = Math.max(...valid.map((rect) => rect.x + rect.width));
  const maxY = Math.max(...valid.map((rect) => rect.y + rect.height));
  const viewport = els.canvasViewport.getBoundingClientRect();
  const padding = 220;
  const width = Math.max(1, maxX - minX + padding * 2);
  const height = Math.max(1, maxY - minY + padding * 2);
  const nextZoom = clamp(Math.min(viewport.width / width, viewport.height / height), 0.18, 1.35);
  state.zoom = nextZoom;
  state.panX = viewport.width / 2 - ((minX + maxX) / 2) * nextZoom;
  state.panY = viewport.height / 2 - ((minY + maxY) / 2) * nextZoom;
  applyView();
}

function renderAreas() {
  els.areaLayer.replaceChildren();
  if (state.layers.areas === false) return;
  const fragment = document.createDocumentFragment();

  getVisibleAreas().forEach((area) => {
    const card = document.createElement("section");
    card.className = "area-card";
    card.classList.toggle("is-locked", Boolean(area.locked));
    card.dataset.areaId = area.id;
    card.tabIndex = 0;
    card.setAttribute("role", "button");
    card.setAttribute("aria-label", `Open ${area.name} unit view`);
    card.classList.toggle("is-focus-area", isPresentationMode() && state.activePresentationAreaId === area.id);
    card.style.left = `${area.x}px`;
    card.style.top = `${area.y}px`;
    card.style.width = `${area.width}px`;
    card.style.height = `${area.height}px`;
    card.style.setProperty("--area-color", area.color);

    const title = document.createElement("h2");
    title.textContent = area.name;

    const subtitle = document.createElement("p");
    subtitle.textContent = area.id;

    const caption = document.createElement("small");
    caption.textContent = area.subtitle;

    card.append(title, subtitle, caption);
    card.addEventListener("click", () => {
      const unit = getAreaUnit(area);
      if (unit) setScope("unit", { unit, focus: true });
    });
    card.addEventListener("keydown", (event) => {
      if (event.key !== "Enter" && event.key !== " ") return;
      event.preventDefault();
      const unit = getAreaUnit(area);
      if (unit) setScope("unit", { unit, focus: true });
    });
    fragment.appendChild(card);
  });

  els.areaLayer.appendChild(fragment);
}

function renderPidLayer() {
  if (!els.pidSymbolLayer) return;
  clearSvg(els.pidSymbolLayer);
  if (state.pidLayers.connectors) {
    try {
      renderPidConnectors();
    } catch (error) {
      console.warn("P&ID connectors gagal dirender:", error);
    }
  }
  if (!state.pidLayers.symbols) return;
  const fragment = document.createDocumentFragment();
  PID_SYMBOLS.forEach((symbol) => {
    try {
      if (!isPidSymbolVisible(symbol)) return;
      fragment.appendChild(createPidSymbolElement(symbol));
    } catch (error) {
      console.warn(`P&ID symbol ${symbol?.id || "(tanpa id)"} dilewati:`, error);
    }
  });
  els.pidSymbolLayer.appendChild(fragment);
}

function renderPidConnectors() {
  PID_CONNECTORS.forEach((connector) => {
    if (connector.invalid) return;
    const from = PID_SYMBOLS.find((symbol) => symbol.id === connector.fromSymbolId);
    const to = PID_SYMBOLS.find((symbol) => symbol.id === connector.toSymbolId);
    if (!from || !to) return;
    const start = getPidSymbolPortPosition(from, "outputs", connector.fromPort);
    const end = getPidSymbolPortPosition(to, "inputs", connector.toPort);
    if (!isFinitePoint(start) || !isFinitePoint(end)) return;
    const points = Array.isArray(connector.points) && connector.points.length
      ? [start, ...connector.points, end]
      : [start, { x: (start.x + end.x) / 2, y: start.y }, { x: (start.x + end.x) / 2, y: end.y }, end];
    const path = createSvgElement("path");
    path.setAttribute("class", `pid-connector pid-connector-${connector.lineType || "process"}`);
    path.dataset.connectorId = connector.id;
    path.setAttribute("d", pointsToPath(points));
    path.setAttribute("fill", "none");
    path.setAttribute("stroke", connector.style?.stroke || "#4b5563");
    path.setAttribute("stroke-width", String(connector.style?.strokeWidth || 2));
    els.pidSymbolLayer.appendChild(path);
  });
}

function isPidSymbolVisible(symbol) {
  if (!symbol || symbol.locked === "hidden") return false;
  const category = getPidSymbolCategory(symbol.symbolType);
  if (category === "equipment" && state.pidLayers.equipment === false) return false;
  if (category === "valve" && state.pidLayers.valves === false) return false;
  if (category === "instrument" && state.pidLayers.instruments === false) return false;
  return true;
}

function createPidSymbolElement(symbol) {
  const style = normalizePidStyle(symbol.style);
  const group = createSvgElement("g");
  group.classList.add("pid-symbol", `pid-symbol-${getPidSymbolCategory(symbol.symbolType)}`);
  group.classList.toggle("is-selected", symbol.id === state.selectedPidSymbolId);
  group.classList.toggle("is-locked", Boolean(symbol.locked));
  group.dataset.symbolId = symbol.id;
  group.dataset.symbolType = symbol.symbolType;
  group.setAttribute("tabindex", "0");
  group.setAttribute("role", "button");
  group.setAttribute("aria-label", `${symbol.tag} ${symbol.label}`);
  group.setAttribute("transform", `translate(${symbol.x} ${symbol.y}) rotate(${safeNumber(symbol.rotation, 0)} ${symbol.width / 2} ${symbol.height / 2})`);
  group.style.opacity = String(style.opacity);

  appendPidSymbolShape(group, symbol, style);
  appendPidSymbolText(group, symbol, style);
  appendPidSymbolPorts(group, symbol);
  appendPidSelection(group, symbol);

  group.addEventListener("pointerdown", (event) => startPidSymbolPointer(event, symbol.id));
  group.addEventListener("click", (event) => {
    event.preventDefault();
    event.stopPropagation();
    selectPidSymbol(symbol.id, { syncAdmin: isAdmin() });
  });
  group.addEventListener("keydown", (event) => {
    if (event.key !== "Enter" && event.key !== " ") return;
    event.preventDefault();
    selectPidSymbol(symbol.id, { syncAdmin: isAdmin() });
  });
  return group;
}

function appendPidSymbolShape(group, symbol, style) {
  const type = symbol.symbolType;
  const w = safeNumber(symbol.width, 90);
  const h = safeNumber(symbol.height, 70);
  const stroke = style.stroke;
  const fill = style.fill;
  const strokeWidth = String(style.strokeWidth);
  const add = (tag, attrs = {}) => {
    const element = createSvgElement(tag);
    Object.entries(attrs).forEach(([key, value]) => element.setAttribute(key, String(value)));
    group.appendChild(element);
    return element;
  };
  const common = { stroke, "stroke-width": strokeWidth, fill, "vector-effect": "non-scaling-stroke" };
  const lineCommon = { stroke, "stroke-width": strokeWidth, fill: "none", "vector-effect": "non-scaling-stroke", "stroke-linecap": "round", "stroke-linejoin": "round" };

  if (["manualValve", "gateValve", "globeValve", "checkValve", "controlValve", "reliefValve"].includes(type)) {
    add("line", { ...lineCommon, x1: 0, y1: h / 2, x2: w, y2: h / 2 });
    add("polygon", { ...common, points: `${w * 0.16},${h * 0.24} ${w * 0.5},${h / 2} ${w * 0.16},${h * 0.76}` });
    add("polygon", { ...common, points: `${w * 0.84},${h * 0.24} ${w * 0.5},${h / 2} ${w * 0.84},${h * 0.76}` });
    if (type === "checkValve") add("path", { ...lineCommon, d: `M ${w * 0.58} ${h * 0.24} L ${w * 0.72} ${h / 2} L ${w * 0.58} ${h * 0.76}` });
    if (type === "globeValve") add("circle", { ...common, cx: w / 2, cy: h / 2, r: Math.min(w, h) * 0.16 });
    if (type === "controlValve" || type === "reliefValve") {
      add("line", { ...lineCommon, x1: w / 2, y1: h * 0.2, x2: w / 2, y2: 0 });
      add(type === "controlValve" ? "rect" : "circle", type === "controlValve"
        ? { ...common, x: w * 0.32, y: 0, width: w * 0.36, height: h * 0.24, rx: 8 }
        : { ...common, cx: w / 2, cy: h * 0.12, r: Math.min(w, h) * 0.12 });
    }
    return;
  }

  if (isPidInstrumentSymbol(type)) {
    add("circle", { ...common, cx: w / 2, cy: h / 2, r: Math.min(w, h) * 0.42 });
    if (["FC", "TC", "PC", "LC"].includes(type)) add("line", { ...lineCommon, x1: w * 0.18, y1: h / 2, x2: w * 0.82, y2: h / 2 });
    return;
  }

  if (["processConnector", "signalLine", "dashedSignalLine", "arrowLine"].includes(type)) {
    const dash = type === "signalLine" ? "8 6" : type === "dashedSignalLine" ? "4 5" : "";
    add("line", { ...lineCommon, x1: 6, y1: h / 2, x2: w - 12, y2: h / 2, "stroke-dasharray": dash });
    if (type === "arrowLine") add("path", { ...lineCommon, d: `M ${w - 18} ${h * 0.28} L ${w - 6} ${h / 2} L ${w - 18} ${h * 0.72}` });
    return;
  }

  if (type === "textLabel") {
    add("rect", { ...common, x: 0, y: 0, width: w, height: h, rx: 10, fill: "transparent", "stroke-dasharray": "4 4" });
    return;
  }
  if (type === "noteBox" || type === "callout") {
    add("rect", { ...common, x: 0, y: 0, width: w, height: h, rx: 12 });
    if (type === "callout") add("path", { ...lineCommon, d: `M ${w * 0.65} ${h} L ${w * 0.82} ${h + 24}` });
    return;
  }
  if (type === "tagBubble") {
    add("rect", { ...common, x: 0, y: 0, width: w, height: h, rx: h / 2 });
    return;
  }

  if (type === "pump") {
    add("line", { ...lineCommon, x1: 0, y1: h / 2, x2: w * 0.16, y2: h / 2 });
    add("line", { ...lineCommon, x1: w * 0.84, y1: h / 2, x2: w, y2: h / 2 });
    add("ellipse", { ...common, cx: w / 2, cy: h / 2, rx: w * 0.32, ry: h * 0.34 });
    add("path", { ...lineCommon, d: `M ${w * 0.45} ${h * 0.32} L ${w * 0.64} ${h / 2} L ${w * 0.45} ${h * 0.68}` });
    return;
  }
  if (type === "compressor") {
    add("line", { ...lineCommon, x1: 0, y1: h / 2, x2: w * 0.16, y2: h / 2 });
    add("path", { ...common, d: `M ${w * 0.18} ${h * 0.2} C ${w * 0.55} ${h * 0.06}, ${w * 0.8} ${h * 0.22}, ${w * 0.88} ${h / 2} C ${w * 0.8} ${h * 0.78}, ${w * 0.55} ${h * 0.94}, ${w * 0.18} ${h * 0.8} Z` });
    add("line", { ...lineCommon, x1: w * 0.88, y1: h / 2, x2: w, y2: h / 2 });
    add("path", { ...lineCommon, d: `M ${w * 0.4} ${h * 0.28} L ${w * 0.55} ${h / 2} L ${w * 0.4} ${h * 0.72}` });
    return;
  }
  if (type === "verticalVessel" || type === "tank" || type === "column" || type === "reactor" || type === "filter") {
    add("rect", { ...common, x: w * 0.18, y: h * 0.08, width: w * 0.64, height: h * 0.84, rx: Math.min(w * 0.22, 18) });
    add("ellipse", { ...common, cx: w / 2, cy: h * 0.1, rx: w * 0.32, ry: h * 0.07 });
    add("ellipse", { ...lineCommon, cx: w / 2, cy: h * 0.9, rx: w * 0.32, ry: h * 0.07 });
    if (type === "column") {
      [0.22, 0.34, 0.46, 0.58, 0.7, 0.82].forEach((y) => add("line", { ...lineCommon, x1: w * 0.28, y1: h * y, x2: w * 0.72, y2: h * y }));
    }
    if (type === "reactor") {
      [0.35, 0.5, 0.65].forEach((y) => add("circle", { ...lineCommon, cx: w / 2, cy: h * y, r: Math.min(w, h) * 0.08 }));
    }
    if (type === "filter") {
      add("path", { ...lineCommon, d: `M ${w * 0.3} ${h * 0.22} L ${w * 0.7} ${h * 0.78} M ${w * 0.7} ${h * 0.22} L ${w * 0.3} ${h * 0.78}` });
    }
    return;
  }
  if (type === "horizontalVessel" || type === "separator" || type === "cooler") {
    add("rect", { ...common, x: w * 0.08, y: h * 0.2, width: w * 0.84, height: h * 0.6, rx: h * 0.3 });
    add("ellipse", { ...lineCommon, cx: w * 0.13, cy: h / 2, rx: w * 0.06, ry: h * 0.3 });
    add("ellipse", { ...lineCommon, cx: w * 0.87, cy: h / 2, rx: w * 0.06, ry: h * 0.3 });
    if (type === "separator") add("line", { ...lineCommon, x1: w * 0.5, y1: h * 0.22, x2: w * 0.5, y2: h * 0.78 });
    if (type === "cooler") add("path", { ...lineCommon, d: `M ${w * 0.22} ${h * 0.65} L ${w * 0.34} ${h * 0.35} L ${w * 0.46} ${h * 0.65} L ${w * 0.58} ${h * 0.35} L ${w * 0.7} ${h * 0.65}` });
    return;
  }
  if (type === "heatExchanger") {
    add("rect", { ...common, x: w * 0.06, y: h * 0.18, width: w * 0.88, height: h * 0.64, rx: h * 0.26 });
    add("path", { ...lineCommon, d: `M ${w * 0.18} ${h * 0.66} C ${w * 0.28} ${h * 0.18}, ${w * 0.36} ${h * 0.82}, ${w * 0.46} ${h * 0.34} S ${w * 0.64} ${h * 0.82}, ${w * 0.74} ${h * 0.34} S ${w * 0.86} ${h * 0.58}, ${w * 0.9} ${h * 0.44}` });
    return;
  }
  if (type === "furnace") {
    add("rect", { ...common, x: w * 0.14, y: h * 0.14, width: w * 0.72, height: h * 0.76, rx: 12 });
    add("path", { ...lineCommon, d: `M ${w * 0.32} ${h * 0.42} H ${w * 0.68} M ${w * 0.32} ${h * 0.52} H ${w * 0.68} M ${w * 0.32} ${h * 0.62} H ${w * 0.68}` });
    add("path", { ...lineCommon, d: `M ${w * 0.44} ${h * 0.8} C ${w * 0.32} ${h * 0.66}, ${w * 0.52} ${h * 0.64}, ${w * 0.46} ${h * 0.48} C ${w * 0.66} ${h * 0.62}, ${w * 0.7} ${h * 0.76}, ${w * 0.56} ${h * 0.84}` });
    return;
  }
  if (type === "coolingTower") {
    add("polygon", { ...common, points: `${w * 0.24},${h * 0.12} ${w * 0.76},${h * 0.12} ${w * 0.88},${h * 0.92} ${w * 0.12},${h * 0.92}` });
    add("line", { ...lineCommon, x1: w * 0.18, y1: h * 0.34, x2: w * 0.82, y2: h * 0.34 });
    add("line", { ...lineCommon, x1: w * 0.16, y1: h * 0.68, x2: w * 0.84, y2: h * 0.68 });
    return;
  }

  add("rect", { ...common, x: 0, y: 0, width: w, height: h, rx: 14 });
  add("line", { ...lineCommon, x1: w * 0.18, y1: h * 0.5, x2: w * 0.82, y2: h * 0.5 });
}

function appendPidSymbolText(group, symbol, style) {
  const w = safeNumber(symbol.width, 90);
  const h = safeNumber(symbol.height, 70);
  const category = getPidSymbolCategory(symbol.symbolType);
  const isLine = category === "lines";
  const isAnnotation = category === "annotation";
  const centerText = isPidInstrumentSymbol(symbol.symbolType) ? symbol.symbolType : "";
  const makeText = (text, attrs = {}) => {
    const element = createSvgElement("text");
    element.textContent = safeText(text, "");
    element.setAttribute("fill", style.fontColor);
    element.setAttribute("font-size", String(style.fontSize));
    element.setAttribute("font-weight", style.fontWeight);
    element.setAttribute("text-anchor", "middle");
    element.setAttribute("dominant-baseline", "middle");
    Object.entries(attrs).forEach(([key, value]) => element.setAttribute(key, String(value)));
    group.appendChild(element);
    return element;
  };
  if (centerText) {
    makeText(centerText, { x: w / 2, y: h / 2 });
    return;
  }
  if (isAnnotation) {
    makeText(symbol.label || symbol.tag, { x: w / 2, y: h / 2 });
    return;
  }
  if (isLine) {
    makeText(symbol.label || symbol.tag, { x: w / 2, y: Math.max(10, h - 8), "font-size": Math.max(8, style.fontSize - 1) });
    return;
  }
  makeText(symbol.tag, { x: w / 2, y: h + 13, "font-size": style.fontSize });
  if (symbol.label) {
    makeText(symbol.label, { x: w / 2, y: h + 28, "font-size": Math.max(8, style.fontSize - 2), "font-weight": "500" });
  }
}

function appendPidSymbolPorts(group, symbol) {
  if (!isEditMode() && symbol.id !== state.selectedPidSymbolId) return;
  ["inputs", "outputs"].forEach((direction) => {
    const ports = symbol.ports?.[direction] || [];
    ports.forEach((port) => {
      const point = getPidSymbolLocalPortPosition(symbol, port);
      const dot = createSvgElement("circle");
      dot.classList.add("pid-symbol-port", `pid-symbol-port-${direction}`);
      dot.dataset.symbolId = symbol.id;
      dot.dataset.portId = port.id;
      dot.dataset.portDirection = direction;
      dot.setAttribute("cx", String(point.x));
      dot.setAttribute("cy", String(point.y));
      dot.setAttribute("r", "4.5");
      group.appendChild(dot);
    });
  });
}

function appendPidSelection(group, symbol) {
  if (symbol.id !== state.selectedPidSymbolId) return;
  const w = safeNumber(symbol.width, 90);
  const h = safeNumber(symbol.height, 70);
  const outline = createSvgElement("rect");
  outline.classList.add("pid-selection-outline");
  outline.setAttribute("x", "-8");
  outline.setAttribute("y", "-8");
  outline.setAttribute("width", String(w + 16));
  outline.setAttribute("height", String(h + 16));
  outline.setAttribute("rx", "10");
  group.insertBefore(outline, group.firstChild);
  if (isEditMode() && !symbol.locked) {
    const handle = createSvgElement("rect");
    handle.classList.add("pid-symbol-resize-handle");
    handle.dataset.symbolId = symbol.id;
    handle.setAttribute("x", String(w - 7));
    handle.setAttribute("y", String(h - 7));
    handle.setAttribute("width", "14");
    handle.setAttribute("height", "14");
    handle.setAttribute("rx", "4");
    handle.addEventListener("pointerdown", (event) => startPidSymbolResize(event, symbol.id));
    group.appendChild(handle);
  }
}

function getPidSymbolLocalPortPosition(symbol, port) {
  const w = safeNumber(symbol.width, 90);
  const h = safeNumber(symbol.height, 70);
  const offset = clamp(safeNumber(port?.offset, 0.5), 0.05, 0.95);
  switch (normalizePortSide(port?.side)) {
    case "right":
      return { x: w, y: h * offset };
    case "top":
      return { x: w * offset, y: 0 };
    case "bottom":
      return { x: w * offset, y: h };
    case "left":
    default:
      return { x: 0, y: h * offset };
  }
}

function getPidSymbolPortPosition(symbol, direction, portId) {
  const ports = symbol?.ports?.[direction] || [];
  const port = ports.find((item) => item.id === portId) || ports[0] || { side: direction === "outputs" ? "right" : "left", offset: 0.5 };
  const local = getPidSymbolLocalPortPosition(symbol, port);
  return {
    x: safeNumber(symbol?.x, 0) + local.x,
    y: safeNumber(symbol?.y, 0) + local.y,
  };
}

function getVisibleAreas() {
  if (state.currentScope === "refinery") {
    return AREAS.filter((area) => normalizeVisibleIn(area.visibleIn, true).includes("refinery"));
  }
  return AREAS.filter((area) => sameUnit(getAreaUnit(area), state.currentUnit)
    || area.id === "area-products"
    || area.id === "area-utilities");
}

function getAreaUnit(area) {
  const explicitUnit = safeText(area?.unit, "");
  if (explicitUnit && explicitUnit !== "GENERAL") return explicitUnit;
  const name = safeText(area?.name, "");
  const upperName = name.toUpperCase();
  if (["CDU", "HVU", "HCC", "RFCC"].includes(upperName)) return upperName;
  if (upperName.startsWith("CDU")) return "CDU";
  if (upperName.startsWith("HVU") || upperName.startsWith("VDU")) return "HVU";
  if (upperName.startsWith("RFCC")) return "RFCC";
  if (name.toLowerCase().includes("utilit")) return "Utilities";
  if (name.toLowerCase().includes("product")) return "Products";
  return "";
}

function getAreaForUnit(unit) {
  return AREAS.find((area) => sameUnit(getAreaUnit(area), unit));
}

function getEquipmentIcon(type, node = {}) {
  const key = getEquipmentIconKey(type, node);
  const icons = {
    column: `<svg viewBox="0 0 24 24" focusable="false"><rect x="8" y="3" width="8" height="18" rx="3"></rect><path d="M9 7h6M9 11h6M9 15h6M9 19h6"></path></svg>`,
    pump: `<svg viewBox="0 0 24 24" focusable="false"><circle cx="10" cy="12" r="5"></circle><path d="M15 12h5M5 12H2M11 9l3 3-3 3"></path></svg>`,
    exchanger: `<svg viewBox="0 0 24 24" focusable="false"><rect x="3" y="7" width="18" height="10" rx="5"></rect><path d="M6 16l4-8 4 8 4-8"></path></svg>`,
    furnace: `<svg viewBox="0 0 24 24" focusable="false"><rect x="5" y="6" width="14" height="15" rx="2"></rect><path d="M9 15c0-2 3-3 2-6 3 2 5 4 4 7a3 3 0 0 1-6 0zM8 6V3h8v3"></path></svg>`,
    reactor: `<svg viewBox="0 0 24 24" focusable="false"><rect x="7" y="3" width="10" height="18" rx="4"></rect><path d="M10 8h4M10 16h4M12 8v8"></path></svg>`,
    vessel: `<svg viewBox="0 0 24 24" focusable="false"><rect x="4" y="8" width="16" height="9" rx="4.5"></rect><path d="M7 8V6m10 2V6M8 17v2m8-2v2"></path></svg>`,
    compressor: `<svg viewBox="0 0 24 24" focusable="false"><circle cx="9" cy="12" r="5"></circle><path d="M14 9h5v6h-5M9 7v10M4 12h3"></path></svg>`,
    tank: `<svg viewBox="0 0 24 24" focusable="false"><path d="M6 7c0-2 12-2 12 0v10c0 2-12 2-12 0z"></path><path d="M6 7c0 2 12 2 12 0M6 17c0 2 12 2 12 0"></path></svg>`,
    treatment: `<svg viewBox="0 0 24 24" focusable="false"><rect x="5" y="5" width="14" height="14" rx="3"></rect><path d="M8 9h8M8 13h5M15 13l2 2-2 2"></path></svg>`,
    gas: `<svg viewBox="0 0 24 24" focusable="false"><path d="M4 15c2-4 4 4 8 0s6 4 8 0M4 9c2-4 4 4 8 0s6 4 8 0"></path></svg>`,
    sulfur: `<svg viewBox="0 0 24 24" focusable="false"><path d="M12 3l7 4v10l-7 4-7-4V7z"></path><path d="M8 12h8M10 8h4M10 16h4"></path></svg>`,
    boundary: `<svg viewBox="0 0 24 24" focusable="false"><path d="M3 12h14"></path><path d="M13 6l6 6-6 6"></path><path d="M3 6v12"></path></svg>`,
    catalyst: `<svg viewBox="0 0 24 24" focusable="false"><circle cx="8" cy="9" r="2"></circle><circle cx="15" cy="7" r="2"></circle><circle cx="16" cy="15" r="2"></circle><path d="M8 17a7 7 0 0 1 9-10M16 17A7 7 0 0 1 7 7"></path></svg>`,
    utility: `<svg viewBox="0 0 24 24" focusable="false"><path d="M13 2L5 14h6l-1 8 8-12h-6z"></path></svg>`,
    valve: `<svg viewBox="0 0 24 24" focusable="false"><path d="M4 8l7 4-7 4V8zm16 0l-7 4 7 4V8zM12 5v14"></path></svg>`,
    generic: `<svg viewBox="0 0 24 24" focusable="false"><rect x="5" y="5" width="14" height="14" rx="3"></rect><path d="M8 9h8M8 15h8M12 5v14"></path></svg>`,
  };
  return icons[key] || icons.generic;
}

function getEquipmentIconKey(type, node = {}) {
  const text = [
    type,
    node.type,
    node.name,
    node.tag,
    node.area,
    node.section,
  ].map((item) => String(item || "").toLowerCase()).join(" ");

  if (/(atmospheric|fractionator|fractionation|vacuum column|main column|column)/.test(text)) return "column";
  if (/pump/.test(text)) return "pump";
  if (/(heat exchanger|exchanger|condenser|cooler|preheat)/.test(text)) return "exchanger";
  if (/(furnace|heater)/.test(text)) return "furnace";
  if (/(reactor|regenerator|rfcc)/.test(text)) return "reactor";
  if (/(vessel|drum|separator|desalter)/.test(text)) return "vessel";
  if (/compressor/.test(text)) return "compressor";
  if (/(tank|storage)/.test(text)) return "tank";
  if (/(treating|merox|amine|hydrotreater|hydrotreating)/.test(text)) return "treatment";
  if (/gas processing/.test(text)) return "gas";
  if (/(sulfur|claus)/.test(text)) return "sulfur";
  if (/(product outlet|boundary|inlet|outlet|battery limit)/.test(text)) return "boundary";
  if (/catalyst/.test(text)) return "catalyst";
  if (/(utility|hydrogen|steam|power|water)/.test(text)) return "utility";
  if (/valve/.test(text)) return "valve";
  return "generic";
}

function renderNodes() {
  els.nodeLayer.replaceChildren();
  const fragment = document.createDocumentFragment();

  getVisibleNodes().forEach((node) => {
    const layout = getScopedNodeLayout(node);
    const wrapper = document.createElement("div");
    wrapper.className = `canvas-node ${getStatusClass(node.status)}`;
    const balanceClass = getBalanceStatusClass(node);
    if (balanceClass) wrapper.classList.add(balanceClass);
    wrapper.classList.toggle("is-multi-selected", state.selectedNodeTags?.has(node.tag));
    wrapper.classList.toggle("is-locked", Boolean(node.locked));
    wrapper.dataset.nodeId = node.id;
    wrapper.dataset.tag = node.tag;
    wrapper.dataset.unit = node.unit;
    wrapper.dataset.status = safeText(node.status, "unknown").toLowerCase();
    wrapper.dataset.balanceStatus = getMassBalanceResult(node)?.status || "";
    wrapper.style.left = `${layout.x}px`;
    wrapper.style.top = `${layout.y}px`;
    wrapper.style.width = `${layout.width}px`;
    wrapper.style.height = `${layout.height}px`;
    applyNodeStyleVariables(wrapper, node);

    const button = document.createElement("button");
    button.className = "node-button";
    button.type = "button";
    button.setAttribute("aria-label", `${node.tag} ${node.name}`);
    const miniBalanceText = getNodeMiniBalanceText(node);
    button.innerHTML = `
      <span class="node-header">
        <span class="node-icon" aria-hidden="true">${getEquipmentIcon(node.type, node)}</span>
        <span class="node-status-dot" aria-hidden="true"></span>
      </span>
      <strong class="node-tag">${escapeHtml(node.tag)}</strong>
      <span class="node-name">${escapeHtml(node.name)}</span>
      <span class="node-meta">${escapeHtml(node.unit)} / ${escapeHtml(node.type)}</span>
      ${miniBalanceText ? `<span class="node-balance-mini">${escapeHtml(miniBalanceText)}</span>` : ""}
    `;
    button.addEventListener("click", (event) => {
      event.preventDefault();
      event.stopPropagation();
      if (state.suppressNodeClickUntil && Date.now() < state.suppressNodeClickUntil) {
        state.suppressNodeClickUntil = 0;
        return;
      }
      if (isEditMode() && (event.shiftKey || event.ctrlKey || event.metaKey)) {
        toggleNodeMultiSelection(node, { focus: false });
      } else {
        selectNode(node.id, { focus: false, openDetail: true });
      }
    });

    wrapper.appendChild(button);
    if (node.locked) {
      const lock = document.createElement("span");
      lock.className = "node-lock-icon";
      lock.textContent = "L";
      lock.title = "Locked";
      wrapper.appendChild(lock);
    }
    renderNodePorts(node, wrapper, layout);
    renderNodeResizeHandles(node, wrapper);
    fragment.appendChild(wrapper);
  });

  els.nodeLayer.appendChild(fragment);
  renderPortFlowBadges();
}

function applyNodeStyleVariables(element, node) {
  const style = normalizeNodeStyle(node?.style);
  const fontScale = clamp(safeNumber(state.nodeFontScaleGlobal, 1), 0.8, 1.4);
  const iconScale = clamp(safeNumber(state.nodeIconScaleGlobal, 1), 0.8, 1.4);
  const iconSize = Math.round(style.iconSize * style.iconScale * iconScale);
  element.style.setProperty("--node-tag-font-size", `${Math.round(style.fontSize * fontScale)}px`);
  element.style.setProperty("--node-name-font-size", `${Math.round(style.nameFontSize * fontScale)}px`);
  element.style.setProperty("--node-meta-font-size", `${Math.round(style.metaFontSize * fontScale)}px`);
  element.style.setProperty("--node-font-weight", style.fontWeight);
  element.style.setProperty("--node-font-style", style.fontStyle);
  element.style.setProperty("--node-icon-size", `${iconSize}px`);
  if (style.fontColor) {
    element.style.setProperty("--node-font-color", style.fontColor);
  } else {
    element.style.removeProperty("--node-font-color");
  }
  if (style.iconColor) {
    element.style.setProperty("--node-icon-color", style.iconColor);
  } else {
    element.style.removeProperty("--node-icon-color");
  }
  const portStyle = getEffectivePortLabelStyle(null, node);
  element.style.setProperty("--port-label-font-size", `${portStyle.fontSize}px`);
  element.style.setProperty("--port-label-font-weight", portStyle.fontWeight);
  if (portStyle.color) {
    element.style.setProperty("--port-label-color", portStyle.color);
  } else {
    element.style.removeProperty("--port-label-color");
  }
}

function renderNodeResizeHandles(node, wrapper) {
  if (!isEditMode() || node.id !== state.selectedNodeId) return;
  const handle = document.createElement("button");
  handle.type = "button";
  handle.className = "node-resize-handle node-resize-se";
  handle.dataset.nodeId = node.id;
  handle.setAttribute("aria-label", `Resize node ${node.tag}`);
  handle.addEventListener("click", (event) => {
    event.preventDefault();
    event.stopPropagation();
  });
  handle.addEventListener("pointerdown", (event) => startNodeResize(event, node));
  wrapper.appendChild(handle);

  const sizeBadge = document.createElement("span");
  sizeBadge.className = "node-size-badge";
  sizeBadge.textContent = `${Math.round(getNodeWidth(node))} x ${Math.round(getNodeHeight(node))}`;
  wrapper.appendChild(sizeBadge);
}

function renderNodePorts(node, wrapper, layout) {
  if (state.layers.ports === false) return;
  const usedPortLabelSlots = [];
  const directions = [
    { key: "inputs", type: "input" },
    { key: "outputs", type: "output" },
  ];
  directions.forEach(({ key, type }) => {
    getNodePorts(node, key).forEach((port) => {
      const point = getPortPoint(node, key, port.id);
      const isImportant = isPortLabelImportant(node, port, key, layout);
      const isConnected = isPortConnected(node.tag, port.id, type);
      const isDecluttered = isPortLabelDecluttered(port, usedPortLabelSlots);
      const element = document.createElement("button");
      element.type = "button";
      element.className = `node-port node-port-${type} node-port-${port.side}`;
      element.classList.toggle("is-port-label-important", isImportant);
      element.classList.toggle("is-port-connected", isConnected);
      element.classList.toggle("is-port-label-decluttered", isDecluttered);
      element.dataset.nodeId = node.id;
      element.dataset.tag = node.tag;
      element.dataset.portId = port.id;
      element.dataset.portType = type;
      element.dataset.streamConstraintTrigger = "true";
      element.dataset.important = String(isImportant);
      element.style.left = `${point.x - layout.x}px`;
      element.style.top = `${point.y - layout.y}px`;
      element.title = `${node.tag} ${port.label}`;
      element.setAttribute("aria-label", `${type === "output" ? "Output" : "Input"} port ${port.label} ${node.tag}`);
      element.innerHTML = "";
      element.addEventListener("click", (event) => {
        event.preventDefault();
        event.stopPropagation();
        handleNodePortClick(node, key, port, event);
      });
      element.addEventListener("pointerdown", (event) => {
        if (key !== "outputs" || !isAdmin() || !isEditMode()) return;
        if (state.streamEndpointPickMode) return;
        startPortConnectionDrag(event, node, port);
      });
      wrapper.appendChild(element);
    });
  });
}

function clearPortFlowBadges() {
  els.nodeLayer?.querySelectorAll(".port-flow-badge, .port-info-group").forEach((badge) => badge.remove());
}

function clearPortInfoGroups() {
  clearPortFlowBadges();
}

function getStreamsForPort(nodeId, portId, direction) {
  const node = resolveBalanceNode(nodeId);
  if (!node || !portId) return [];
  const key = direction === "outputs" || direction === "output" ? "outputs" : "inputs";
  return getActiveStreams().filter((stream) => (
    key === "outputs"
      ? stream.from === node.tag && stream.fromPort === portId
      : stream.to === node.tag && stream.toPort === portId
  ));
}

function getPortFlowSummary(nodeId, port) {
  const direction = port?.direction || port?.key || "inputs";
  const streams = getStreamsForPort(nodeId, port?.id, direction);
  if (!streams.length) return null;
  let hasMissingFlow = false;
  const totalM3H = streams.reduce((sum, stream) => {
    const flow = getFinalRuntimeStreamFlowM3H(stream);
    if (!Number.isFinite(Number(flow))) {
      hasMissingFlow = true;
      return sum;
    }
    return sum + Number(flow);
  }, 0);
  const flowM3H = hasMissingFlow ? null : roundFlowrate(totalM3H);
  const flowMBSD = hasMissingFlow ? null : convertM3HToMBSD(flowM3H);
  return {
    streams,
    flowM3H,
    flowMBSD,
    hasMissingFlow,
    isOverCapacity: Number(calculatePercentCapacityFromM3H(flowM3H)) > 100,
  };
}

function formatPortFlowBadge(summary) {
  if (!summary || summary.hasMissingFlow || !Number.isFinite(Number(summary.flowM3H))) return "Incomplete";
  const mode = normalizePortFlowMode(state.portFlowMode);
  if (mode === "compact") {
    return `${formatNumber(summary.flowM3H, 1)} | ${formatNumber(summary.flowMBSD, 2)}`;
  }
  return `${formatM3HValue(summary.flowM3H)} | ${formatMBSDValue(summary.flowMBSD)}`;
}

function formatCompactM3H(value) {
  if (!Number.isFinite(Number(value))) return "-";
  const digits = Math.abs(Number(value)) >= 100 ? 0 : 1;
  return `${formatNumber(Number(value), digits)} m3/h`;
}

function formatPortFlowValue(summary) {
  const display = normalizePortValueDisplay(state.showPortFlow === false ? "off" : state.portValueDisplay);
  if (display === "off") return "";
  if (!summary || summary.hasMissingFlow || !Number.isFinite(Number(summary.flowM3H))) return "Incomplete";
  if (display === "m3h") return formatCompactM3H(summary.flowM3H);
  if (display === "mbsd") return formatMBSDValue(summary.flowMBSD);
  return `${formatCompactM3H(summary.flowM3H)} · ${formatMBSDValue(summary.flowMBSD)}`;
}

function getPortInfoGroupData(node, port, direction) {
  const summary = getPortFlowSummary(node.id, { ...port, direction });
  return {
    label: state.layers.portLabels === false ? "" : safeText(port.label, port.id),
    flowText: normalizeCduRunState(state.cduRunState).hasStarted ? formatPortFlowValue(summary) : "",
    summary,
  };
}

function getPortInfoLayout(port) {
  const layout = normalizePortInfoLayout(state.portInfoLayout);
  if (layout !== "auto") return layout;
  return ["top", "bottom"].includes(normalizePortSide(port.side)) ? "stacked" : "inline";
}

function positionPortInfoGroup(groupEl, nodeEl, port, direction, layout) {
  if (!groupEl || !nodeEl || !port || !layout) return;
  const side = normalizePortSide(port.side, direction === "outputs" ? "right" : "left");
  const width = groupEl.offsetWidth || 80;
  const height = groupEl.offsetHeight || 20;
  let left = port.localX;
  let top = port.localY;
  if (side === "right") {
    left = layout.width + 10;
    top = port.localY - height / 2;
  } else if (side === "left") {
    left = -width - 10;
    top = port.localY - height / 2;
  } else if (side === "top") {
    left = port.localX - width / 2;
    top = -height - 8;
  } else {
    left = port.localX - width / 2;
    top = layout.height + 8;
  }
  groupEl.style.left = `${Math.round(left)}px`;
  groupEl.style.top = `${Math.round(top)}px`;
  groupEl.dataset.side = side;
  groupEl.dataset.baseLeft = String(Math.round(left));
  groupEl.dataset.baseTop = String(Math.round(top));
}

function avoidPortInfoOverlap(groups = []) {
  const grouped = new Map();
  groups.forEach((group) => {
    const key = `${group.dataset.nodeId}:${group.dataset.side}`;
    if (!grouped.has(key)) grouped.set(key, []);
    grouped.get(key).push(group);
  });
  grouped.forEach((items) => {
    const side = items[0]?.dataset.side || "right";
    const vertical = side === "left" || side === "right";
    items.sort((a, b) => Number(vertical ? a.style.top.replace("px", "") : a.style.left.replace("px", ""))
      - Number(vertical ? b.style.top.replace("px", "") : b.style.left.replace("px", "")));
    let cursor = null;
    items.forEach((item) => {
      if (vertical) {
        const top = Number.parseFloat(item.style.top) || 0;
        const height = item.offsetHeight || 18;
        const nextTop = cursor === null ? top : Math.max(top, cursor + 4);
        item.style.top = `${Math.round(nextTop)}px`;
        cursor = nextTop + height;
      } else {
        const left = Number.parseFloat(item.style.left) || 0;
        const width = item.offsetWidth || 70;
        const nextLeft = cursor === null ? left : Math.max(left, cursor + 4);
        item.style.left = `${Math.round(nextLeft)}px`;
        cursor = nextLeft + width;
      }
    });
  });
}

function renderPortInfoGroups() {
  clearPortInfoGroups();
  if (state.layers.nodes === false || state.layers.ports === false) return;
  const groups = [];
  getVisibleNodes().forEach((node) => {
    const nodeEl = els.nodeLayer?.querySelector(`.canvas-node[data-node-id="${CSS.escape(node.id)}"]`);
    if (!nodeEl) return;
    const layout = getScopedNodeLayout(node);
    [
      { key: "inputs", type: "input" },
      { key: "outputs", type: "output" },
    ].forEach(({ key, type }) => {
      getNodePorts(node, key).forEach((port) => {
        const point = getPortPoint(node, key, port.id);
        const data = getPortInfoGroupData(node, port, key);
        if (!data.label && !data.flowText) return;
        const group = document.createElement("div");
        const infoLayout = getPortInfoLayout(port);
        group.className = `port-info-group port-side-${normalizePortSide(port.side)} ${infoLayout === "stacked" ? "is-stacked" : "is-inline"}`;
        group.classList.toggle("has-label-only", !data.flowText);
        group.classList.toggle("is-incomplete", data.flowText === "Incomplete");
        group.classList.toggle("is-warning", Boolean(data.summary?.isOverCapacity));
        group.dataset.nodeId = node.id;
        group.dataset.portId = port.id;
        group.dataset.portType = type;
        group.style.setProperty("--port-info-scale", String(normalizePortInfoScale(state.portInfoScale)));
        if (data.label) {
          const label = document.createElement("span");
          label.className = "port-info-label";
          label.textContent = data.label;
          group.appendChild(label);
        }
        if (data.flowText) {
          const flow = document.createElement("span");
          flow.className = "port-info-flow";
          flow.textContent = data.flowText;
          group.appendChild(flow);
        }
        nodeEl.appendChild(group);
        positionPortInfoGroup(group, nodeEl, {
          ...port,
          localX: point.x - layout.x,
          localY: point.y - layout.y,
        }, key, layout);
        groups.push(group);
      });
    });
  });
  avoidPortInfoOverlap(groups);
}

function positionPortFlowBadge(badgeEl, nodeEl, port) {
  if (!badgeEl || !nodeEl || !port) return;
  badgeEl.style.left = `${port.localX}px`;
  badgeEl.style.top = `${port.localY}px`;
  badgeEl.classList.add(`port-flow-${normalizePortSide(port.side)}`);
}

function renderPortFlowBadges() {
  renderPortInfoGroups();
}

function getEffectivePortLabelStyle(port = null, node = null) {
  const nodeStyle = normalizeNodeStyle(node?.style || {});
  const portStyle = normalizePortStyle(port?.style || {});
  const fontSize = portStyle.fontSize
    ?? nodeStyle.portLabelFontSize
    ?? clamp(safeNumber(state.portLabelFontSize, 10), 8, 18);
  const scaledFontSize = Math.round(fontSize * clamp(safeNumber(state.portLabelFontScale, 1), 0.8, 1.4));
  return {
    fontSize: clamp(scaledFontSize, 7, 26),
    color: portStyle.color || nodeStyle.portLabelColor || state.portLabelColor || "",
    fontWeight: portStyle.fontWeight || nodeStyle.portLabelWeight || state.portLabelWeight || "700",
  };
}

function isPortLabelImportant(node, port, direction, layout) {
  if (port?.important === true) return true;
  const largeNode = Boolean(node?.isMajor) || safeNumber(layout?.width, 0) >= 180 || safeNumber(layout?.height, 0) >= 120;
  return largeNode && isAutoImportantPort(port, direction);
}

function isPortConnected(tag, portId, portType) {
  return getActiveStreams().some((stream) => (
    portType === "output"
      ? stream.from === tag && stream.fromPort === portId
      : stream.to === tag && stream.toPort === portId
  ));
}

function isPortLabelDecluttered(port, usedSlots) {
  const slot = `${port.side}:${Math.round(safeNumber(port.offset, 0.5) * 10)}`;
  if (usedSlots.includes(slot)) return true;
  usedSlots.push(slot);
  return false;
}

function handleNodePortClick(node, direction, port, event = null) {
  if (!isAdmin()) return;
  const endpoint = state.streamEndpointPickMode;
  if (!endpoint) {
    const streams = getStreamsForPort(node.id, port.id, direction);
    if (streams.length) {
      state.activeStreamId = streams[0].id;
      selectStream(streams[0].id, { syncAdmin: true, openDetail: false });
      showStreamQuickConstraintPopover(streams[0], event);
    }
    return;
  }
  if (!isEditMode()) return;
  const stream = STREAMS.find((item) => item.id === state.activeStreamId);
  if (!stream) return;
  const type = direction === "outputs" ? "output" : "input";
  const validation = validatePortReconnectCandidate(stream, endpoint, node.tag, port.id, type);
  if (!validation.valid) {
    showToast(validation.message, "error");
    return;
  }
  applyStreamEndpoint(stream, endpoint, node.tag, port.id);
  state.streamEndpointPickMode = "";
  document.body.classList.remove("is-port-pick-mode");
  syncAdminStreamForm(stream);
  renderStreamDetail(stream);
  commitDataChange("Koneksi stream diperbarui", { keepStream: true });
}

function startPortConnectionDrag(event, node, port) {
  if (!isAdmin() || !isEditMode()) return;
  event.preventDefault();
  event.stopPropagation();
  const point = getPortPoint(node, "outputs", port.id);
  state.portConnectionDrag = {
    from: node.tag,
    fromPort: port.id,
    pointerId: event.pointerId,
    currentPoint: { x: point.x, y: point.y, side: "left" },
  };
  state.streamEndpointPickMode = "";
  state.streamAddPointMode = false;
  state.draggedNodeId = null;
  state.draggedStreamPoint = null;
  clearTextSelection();
  try {
    event.currentTarget.setPointerCapture?.(event.pointerId);
  } catch {
    // Pointer capture can fail in synthetic or interrupted pointer sequences.
  }
  document.body.classList.add("is-cable-dragging");
  document.body.classList.add("is-canvas-dragging");
  showToast("Tarik cable ke input port tujuan", "info");
  renderStreams();
}

function startNodeResize(event, node) {
  if (!isEditMode()) return;
  if (node?.locked) {
    showToast("Node terkunci. Unlock untuk resize.", "warning");
    return;
  }
  event.preventDefault();
  event.stopPropagation();
  selectNode(node.id, { focus: false, renderHandles: false });
  pushUndoSnapshot("Resize node");
  state.resizingNode = {
    nodeId: node.id,
    pointerId: event.pointerId,
    startX: event.clientX,
    startY: event.clientY,
    startWidth: getNodeWidth(node),
    startHeight: getNodeHeight(node),
    originalBaseWidth: safeNumber(node.baseWidth, getNodeWidth(node)),
    originalBaseHeight: safeNumber(node.baseHeight, getNodeHeight(node)),
    originalScale: safeNumber(node.scale, 1),
    aspect: getNodeWidth(node) / Math.max(getNodeHeight(node), 1),
  };
  state.draggedNodeId = null;
  state.isPanning = false;
  clearTextSelection();
  document.body.classList.add("is-node-resizing", "is-canvas-dragging");
  try {
    event.currentTarget.setPointerCapture?.(event.pointerId);
  } catch {
    // Pointer capture can fail if the pointer was captured by another element.
  }
}

function updateNodeResize(event) {
  const resize = state.resizingNode;
  if (!resize) return;
  const node = nodeById.get(resize.nodeId);
  if (!node) return;
  const dx = (event.clientX - resize.startX) / state.zoom;
  const dy = (event.clientY - resize.startY) / state.zoom;
  let width = Math.max(80, Math.round(resize.startWidth + dx));
  let height = Math.max(50, Math.round(resize.startHeight + dy));
  if (event.shiftKey) {
    if (Math.abs(dx) > Math.abs(dy)) {
      height = Math.max(50, Math.round(width / resize.aspect));
    } else {
      width = Math.max(80, Math.round(height * resize.aspect));
    }
  }
  node.width = width;
  node.height = height;
  node.baseWidth = width;
  node.baseHeight = height;
  node.scale = 1;
  const nodeElement = els.nodeLayer.querySelector(`.canvas-node[data-node-id="${CSS.escape(node.id)}"]`);
  if (nodeElement) {
    nodeElement.style.width = `${width}px`;
    nodeElement.style.height = `${height}px`;
    refreshNodePortsForElement(node, nodeElement);
    const badge = nodeElement.querySelector(".node-size-badge");
    if (badge) badge.textContent = `${width} x ${height}`;
  }
  if (state.activeNodeTag === node.tag) {
    if (els.adminNodeWidth) els.adminNodeWidth.value = width;
    if (els.adminNodeHeight) els.adminNodeHeight.value = height;
    if (els.adminNodeScale) els.adminNodeScale.value = 1;
    if (els.adminNodeSizePreset) els.adminNodeSizePreset.value = getNodeSizePresetKey(width, height);
    updateNodeSizePresetState();
    updateAdminNodePreview();
  }
  syncConnectedStreamEndpointPoints(node.tag);
  renderStreams();
  renderStreamPointEditor();
}

function refreshNodePortsForElement(node, nodeElement) {
  nodeElement.querySelectorAll(".node-port").forEach((port) => port.remove());
  nodeElement.querySelectorAll(".port-flow-badge").forEach((badge) => badge.remove());
  renderNodePorts(node, nodeElement, getScopedNodeLayout(node));
  renderPortFlowBadges();
}

function finishNodeResize() {
  const resize = state.resizingNode;
  if (!resize) return;
  const node = nodeById.get(resize.nodeId);
  state.resizingNode = null;
  document.body.classList.remove("is-node-resizing", "is-canvas-dragging");
  clearTextSelection();
  if (node) {
    const snapped = snapRect({ x: node.x, y: node.y, width: node.width, height: node.height });
    node.x = snapped.x;
    node.y = snapped.y;
    node.width = snapped.width;
    node.height = snapped.height;
    node.baseWidth = node.width;
    node.baseHeight = node.height;
    syncConnectedStreamEndpointPoints(node.tag);
    commitDataChange("Node diubah ukurannya", { focusSelected: false, skipHistory: true });
  } else {
    renderStreams();
    renderStreamPointEditor();
  }
}

function cancelNodeResize() {
  const resize = state.resizingNode;
  if (!resize) return;
  const node = nodeById.get(resize.nodeId);
  if (node) {
    node.width = resize.startWidth;
    node.height = resize.startHeight;
    node.baseWidth = resize.originalBaseWidth;
    node.baseHeight = resize.originalBaseHeight;
    node.scale = resize.originalScale;
  }
  state.resizingNode = null;
  document.body.classList.remove("is-node-resizing", "is-canvas-dragging");
  clearTextSelection();
  renderNodes();
  renderStreams();
  renderStreamPointEditor();
  if (node) setActiveNode(node.id);
  showToast("Resize node dibatalkan", "info");
}

function updatePortConnectionDrag(event) {
  const drag = state.portConnectionDrag;
  if (!drag) return;
  const rect = els.canvasViewport.getBoundingClientRect();
  const point = screenToCanvas(event.clientX - rect.left, event.clientY - rect.top);
  drag.currentPoint = { x: Math.round(point.x), y: Math.round(point.y), side: "left" };
  const candidate = getPortAtClientPoint(event.clientX, event.clientY, "input");
  updatePortCandidateVisual(candidate, (candidateItem) => (
    candidateItem && candidateItem.tag !== drag.from
  ));
  renderStreams();
}

function finishPortConnectionDrag(event) {
  const drag = state.portConnectionDrag;
  if (!drag) return;
  const candidate = getPortAtClientPoint(event.clientX, event.clientY, "input");
  clearPortCandidateVisual();
  document.body.classList.remove("is-cable-dragging");
  document.body.classList.remove("is-canvas-dragging");
  clearTextSelection();
  state.portConnectionDrag = null;
  if (!candidate) {
    showToast("Create stream dibatalkan", "info");
    renderStreams();
    return;
  }
  if (candidate.tag === drag.from) {
    showToast("From dan To stream tidak boleh node yang sama", "error");
    renderStreams();
    return;
  }
  const stream = createStreamBetweenPorts(drag.from, drag.fromPort, candidate.tag, candidate.portId);
  if (stream) {
    commitDataChange("Stream baru dibuat dari port", { keepStream: true });
    selectStream(stream.id, { syncAdmin: true });
  }
}

function cancelPortConnectionDrag() {
  state.portConnectionDrag = null;
  clearPortCandidateVisual();
  document.body.classList.remove("is-cable-dragging");
  document.body.classList.remove("is-canvas-dragging");
  clearTextSelection();
  renderStreams();
  showToast("Create stream dibatalkan", "info");
}

function getEffectiveStreamLabelMode(stream) {
  const globalMode = state.streamLabelModeGlobal || "hover";
  if (globalMode === "hidden") return "hidden";
  if (globalMode === "always") return "always";
  if (globalMode === "selected") return "selected";
  if (globalMode === "hover") return stream?.labelMode === "always" ? "hover" : "hover";
  return "hover";
}

function getStreamLabelText(stream) {
  return safeText(stream?.label, "");
}

function shouldRenderStreamLabel(stream, labelMode, labelText, usedAnchors = []) {
  if (!labelText || labelMode === "hidden") return false;
  const isActive = stream.id === state.activeStreamId;
  if (isActive || (isEditMode() && stream.id === state.activeStreamId)) return true;
  if (labelMode === "selected") return false;
  if (labelMode === "hover") return true;
  if (labelMode !== "always") return false;

  const anchor = getStreamLabelAnchor(stream);
  if (!anchor) return true;
  const collides = usedAnchors.some((item) => (
    Math.abs(item.x - anchor.x) < 190 && Math.abs(item.y - anchor.y) < 34
  ));
  if (collides) return false;
  usedAnchors.push(anchor);
  return true;
}

function getStreamLabelAnchor(stream) {
  const points = getStreamRenderPoints(stream);
  if (!Array.isArray(points) || points.length < 2) return null;
  const index = Math.floor((points.length - 1) / 2);
  const a = points[index];
  const b = points[index + 1] || points[index];
  return {
    x: Math.round((a.x + b.x) / 2),
    y: Math.round((a.y + b.y) / 2),
  };
}

function renderStreamRangeBadge(stream, rangeStatus = "not-set") {
  if (!els.streamLayer || !stream) return;
  const range = stream.runtimeRange || evaluateStreamRange(stream);
  const visualStatus = getStreamConstraintVisualStatus(stream);
  const status = visualStatus.status !== "normal"
    ? normalizeStreamRangeStatus(visualStatus.status === "over" ? "over-constrained" : visualStatus.status)
    : normalizeStreamRangeStatus(rangeStatus || range.status);
  if (status === "not-set") return;
  const anchor = getStreamLabelAnchor(stream);
  if (!anchor) return;
  const group = createSvgElement("g");
  group.setAttribute("class", `stream-range-badge range-badge stream-range-${status}`);
  group.dataset.streamId = stream.id;
  group.dataset.streamConstraintTrigger = "true";
  const text = createSvgElement("text");
  const target = stream.runtimeTargetResult;
  const label = visualStatus.label || target?.label || range.label;
  const runtimeRecord = getRuntimeStreamRecord(stream);
  const actualUnit = normalizeStreamFlowRangeUnit(stream.flowRangeUnit || range.unit);
  const actualValue = actualUnit === "MBSD" && runtimeRecord?.flowMBSD !== null && runtimeRecord?.flowMBSD !== undefined && Number.isFinite(Number(runtimeRecord.flowMBSD))
    ? runtimeRecord.flowMBSD
    : actualUnit === DEFAULT_FLOW_UNIT && runtimeRecord?.flowM3H !== null && runtimeRecord?.flowM3H !== undefined && Number.isFinite(Number(runtimeRecord.flowM3H))
      ? runtimeRecord.flowM3H
      : actualUnit === "MBSD" && Number.isFinite(Number(target?.actualMBSD))
        ? target.actualMBSD
        : actualUnit === DEFAULT_FLOW_UNIT && Number.isFinite(Number(target?.actualM3H))
          ? target.actualM3H
          : range.actual;
  const actual = Number.isFinite(Number(actualValue))
    ? `${formatNumber(actualValue, actualUnit === "MBSD" ? 2 : 1)} ${actualUnit}`
    : "";
  text.textContent = actual ? `${actual} · ${label}` : label;
  text.setAttribute("x", String(anchor.x + 10));
  text.setAttribute("y", String(anchor.y - 10));
  group.appendChild(text);
  els.streamLayer.appendChild(group);
}

function renderStreams() {
  clearSvg(els.streamLayer);
  const defs = createSvgElement("defs");
  const marker = createSvgElement("marker");
  marker.setAttribute("id", "arrowHead");
  marker.setAttribute("markerWidth", "7");
  marker.setAttribute("markerHeight", "7");
  marker.setAttribute("refX", "6");
  marker.setAttribute("refY", "2.5");
  marker.setAttribute("orient", "auto");
  marker.setAttribute("markerUnits", "strokeWidth");
  const markerPath = createSvgElement("path");
  markerPath.setAttribute("d", "M0,0 L6,2.5 L0,5 Z");
  markerPath.setAttribute("class", "stream-arrow");
  markerPath.setAttribute("fill", "context-stroke");
  marker.appendChild(markerPath);
  defs.appendChild(marker);
  els.streamLayer.appendChild(defs);

  const usedStreamLabelAnchors = [];
  const visibleStreams = getVisibleStreams();
  let streamBridgeMap = new Map();
  if (!state.isInteracting && state.streamBridges && state.zoom > 0.35) {
    try {
      streamBridgeMap = computeStreamCrossings(visibleStreams);
    } catch (error) {
      console.warn("Stream bridge disabled for this render:", error);
      streamBridgeMap = new Map();
    }
  }

  visibleStreams.forEach((stream) => {
    let pathData = "";
    try {
      pathData = buildStreamPath(stream, streamBridgeMap.get(stream.id) || []);
    } catch (error) {
      console.warn(`Stream ${stream.id || "(tanpa id)"} gagal dirender dengan bridge. Fallback ke route normal.`, error);
      try {
        pathData = buildStreamPath(stream, []);
      } catch (fallbackError) {
        console.warn(`Stream ${stream.id || "(tanpa id)"} dilewati karena route invalid.`, fallbackError);
        pathData = "";
      }
    }
    if (!isValidSvgPathD(pathData)) {
      console.warn("Invalid stream path, skipping stream hit area", stream.id, pathData);
      return;
    }

    const shape = normalizeStreamShape(stream.shape);
    const isActive = stream.id === state.activeStreamId;
    const isHovered = stream.id === state.hoveredStreamId;
    const routeClass = stream.routeStatus === "Conflict" ? " is-conflict route-conflict" : "";
    const recycleClass = stream.isRecycle || normalizeStreamBalanceRole(stream.balanceRole) === "recycle"
      ? " stream-recycle"
      : stream.runtimeRecycleCandidate
        ? " stream-recycle-candidate"
        : "";
    const rangeStatus = normalizeStreamRangeStatus(stream.rangeStatus || stream.runtimeRange?.status);
    const rangeClass = ` stream-range-${rangeStatus}`;
    const targetClass = stream.runtimeTargetResult?.status === "locked"
      ? " stream-locked-flow stream-target-ok"
      : stream.runtimeTargetResult?.status === "target-ok"
        ? " stream-target-active stream-target-ok"
        : stream.runtimeTargetResult?.status === "adjusted"
          ? " stream-target-active stream-target-ok stream-target-adjusted"
          : stream.runtimeTargetResult?.status
            ? " stream-target-active stream-target-miss"
            : "";
    const hitPath = createSvgElement("path");
    hitPath.setAttribute("id", `${stream.id}-hit`);
    hitPath.setAttribute("class", `stream-hit-path stream-${stream.type || "liquid"}${recycleClass}${rangeClass}${targetClass}${isActive ? " is-active" : ""}${isHovered ? " is-hovered" : ""}`);
    hitPath.dataset.streamId = stream.id;
    hitPath.dataset.streamConstraintTrigger = "true";
    hitPath.setAttribute("d", pathData);
    hitPath.setAttribute("fill", "none");
    hitPath.setAttribute("stroke", "transparent");
    hitPath.setAttribute("stroke-width", "18");
    hitPath.setAttribute("tabindex", "0");
    hitPath.setAttribute("role", "button");
    hitPath.setAttribute("aria-label", `Stream ${stream.label || stream.id} dari ${stream.from} ke ${stream.to}`);
    hitPath.addEventListener("pointerenter", () => handleStreamPointerEnter(stream.id));
    hitPath.addEventListener("pointerleave", () => handleStreamPointerLeave(stream.id));
    hitPath.addEventListener("pointerdown", (event) => handleStreamHitPointerDown(event, stream));
    hitPath.addEventListener("click", (event) => handleStreamHitClick(event, stream));
    hitPath.addEventListener("dblclick", (event) => {
      if (!isEditMode()) return;
      event.preventDefault();
      event.stopPropagation();
      selectStream(stream.id, { syncAdmin: true });
      addStreamPointAtEvent(event, stream);
    });
    hitPath.addEventListener("keydown", (event) => {
      if (event.key !== "Enter" && event.key !== " ") return;
      event.preventDefault();
      selectStream(stream.id, { syncAdmin: true });
    });

    const path = createSvgElement("path");
    path.setAttribute("id", stream.id);
    path.setAttribute("class", `canvas-stream stream-${stream.type || "liquid"} shape-${shape}${recycleClass}${rangeClass}${targetClass}${isActive ? " is-active" : ""}${isHovered ? " is-hovered" : ""}${routeClass}`);
    path.dataset.streamId = stream.id;
    path.setAttribute("d", pathData);
    path.setAttribute("fill", "none");
    path.setAttribute("stroke-width", getStreamStrokeWidth(stream, isActive));
    path.setAttribute("marker-end", "url(#arrowHead)");
    els.streamLayer.appendChild(path);
    els.streamLayer.appendChild(hitPath);

    const labelMode = getEffectiveStreamLabelMode(stream);
    const labelText = getStreamLabelText(stream);
    if (state.layers.streamLabels !== false && shouldRenderStreamLabel(stream, labelMode, labelText, usedStreamLabelAnchors)) {
      const label = createSvgElement("text");
      label.setAttribute("class", `stream-label stream-label-${labelMode}${recycleClass}${rangeClass}${targetClass}${isActive ? " is-active" : ""}${isHovered ? " is-hovered" : ""}`);
      label.dataset.streamId = stream.id;
      label.dataset.streamConstraintTrigger = "true";
      label.addEventListener("pointerdown", (event) => handleStreamHitPointerDown(event, stream));
      label.addEventListener("click", (event) => handleStreamHitClick(event, stream));
      const textPath = createSvgElement("textPath");
      textPath.setAttribute("href", `#${stream.id}`);
      textPath.setAttribute("startOffset", "50%");
      textPath.setAttribute("text-anchor", "middle");
      textPath.textContent = formatStreamLabel({ ...stream, label: labelText }, stream.id === state.activeStreamId);
      label.appendChild(textPath);
      els.streamLayer.appendChild(label);
    }
    renderStreamRangeBadge(stream, rangeStatus);
  });

  renderStreamReconnectPreview();
  renderPortConnectionPreview();
  updateStreamPointStatus();
}

function handleStreamPointerEnter(streamId) {
  if (!streamId || isCanvasInteractionBusy()) return;
  state.hoveredStreamId = streamId;
  setStreamHoverClass(streamId, true);
  window.clearTimeout(state.streamHoverTimer);
  if (isEditMode() && state.selectStreamOnHover) {
    state.streamHoverTimer = window.setTimeout(() => {
      if (state.hoveredStreamId === streamId && !isCanvasInteractionBusy()) {
        selectStream(streamId, { syncAdmin: true, openDetail: false });
      }
    }, 120);
  }
}

function handleStreamPointerLeave(streamId) {
  if (state.hoveredStreamId === streamId) state.hoveredStreamId = "";
  window.clearTimeout(state.streamHoverTimer);
  setStreamHoverClass(streamId, false);
}

function canUseQuickConstraint() {
  // Quick constraint is an edit/admin action. Keep it disabled in normal viewer mode.
  return Boolean(isEditMode());
}

function handleStreamHitClick(event, stream) {
  if (isEditableTarget(event.target)) return;
  if (!stream || stream.invalid) {
    showToast("Stream invalid", "error");
    return;
  }
  if (state.isPanning
    || state.draggedNodeId
    || state.draggedStreamPoint
    || state.streamReconnectDrag
    || state.portConnectionDrag
    || state.resizingNode) return;

  event.preventDefault();
  event.stopPropagation();
  state.suppressNodeClickUntil = Date.now() + 180;
  selectStream(stream.id, { syncAdmin: true, openDetail: !isEditMode() });
  if (canUseQuickConstraint()) {
    showStreamQuickConstraintPopover(stream, event);
  }
}

function handleStreamHitPointerDown(event, stream) {
  if (isEditableTarget(event.target)) return;
  if (!stream || stream.invalid) return;
  if (state.isPanning
    || state.draggedNodeId
    || state.draggedStreamPoint
    || state.streamReconnectDrag
    || state.portConnectionDrag
    || state.resizingNode) return;

  // Do not open Quick Insert or prevent default on pointerdown.
  // Pointerdown is only used to stop canvas panning on streams, and for stream point edit mode.
  event.stopPropagation();
  if (state.streamAddPointMode && stream.id === state.activeStreamId) {
    event.preventDefault();
    state.suppressNodeClickUntil = Date.now() + 250;
    addStreamPointAtEvent(event, stream);
  }
}

function getQuickConstraintStatusText(stream) {
  const status = getStreamConstraintVisualStatus(stream);
  if (status.label) return status.label;
  const range = stream.runtimeRange || evaluateStreamRange(stream);
  return range?.label || "NOT SET";
}

function stopQuickConstraintEvent(event) {
  event.stopPropagation();
}

function bindQuickConstraintPopoverEvents(popover) {
  if (!popover || popover.dataset.eventsBound === "true") return;

  const keepEventInsidePopover = (event) => {
    event.stopPropagation();
  };

  const runActionImmediately = (event) => {
    const actionButton = event.target.closest?.("[data-action]");
    if (!actionButton || !popover.contains(actionButton)) return;
    event.preventDefault();
    event.stopPropagation();
    event.stopImmediatePropagation?.();
    handleStreamQuickConstraintAction(event);
  };

  ["pointerdown", "mousedown", "mouseup", "click", "dblclick", "touchstart", "wheel"].forEach((eventName) => {
    popover.addEventListener(eventName, keepEventInsidePopover, true);
    popover.addEventListener(eventName, keepEventInsidePopover);
  });

  // Action buttons must work even when the canvas has active pointer handlers.
  popover.addEventListener("pointerdown", runActionImmediately, true);
  popover.addEventListener("mousedown", runActionImmediately, true);

  popover.dataset.eventsBound = "true";
}

function ensureStreamQuickConstraintPopover() {
  if (state.quickConstraintPopover?.isConnected) return state.quickConstraintPopover;
  const popover = document.createElement("div");
  popover.id = "streamQuickConstraintPopover";
  popover.className = "stream-quick-constraint stream-quick-constraint-popover is-hidden";
  popover.innerHTML = `
    <div class="stream-quick-constraint-card" role="dialog" aria-label="Quick stream constraint">
      <div class="stream-quick-constraint-header">
        <div>
          <strong data-field="title">Stream Constraint</strong>
          <span data-field="status">NOT SET</span>
        </div>
        <button type="button" data-action="close" aria-label="Close quick constraint">x</button>
      </div>
      <div class="stream-quick-constraint-actual">
        <span>Actual Flow</span>
        <strong data-field="actualFlow">-</strong>
      </div>
      <div class="stream-quick-constraint-grid">
        <label class="stream-quick-constraint-field">
          <span>Min</span>
          <input data-field="flowMin" type="text" inputmode="decimal">
        </label>
        <label class="stream-quick-constraint-field">
          <span>Target</span>
          <input data-field="flowTarget" type="text" inputmode="decimal">
        </label>
        <label class="stream-quick-constraint-field">
          <span>Max</span>
          <input data-field="flowMax" type="text" inputmode="decimal">
        </label>
        <label class="stream-quick-constraint-field">
          <span>Unit</span>
          <select data-field="flowRangeUnit">
            <option value="m3/h">m3/h</option>
            <option value="MBSD">MBSD</option>
          </select>
        </label>
        <label class="stream-quick-constraint-field is-wide">
          <span>Mode</span>
          <select data-field="rangeMode">
            <option value="monitor">Monitor</option>
            <option value="control-target">Control Target</option>
            <option value="locked-flow">Locked Flow</option>
          </select>
        </label>
        <label class="stream-quick-constraint-field">
          <span>Priority</span>
          <input data-field="calculationPriority" type="text" inputmode="numeric">
        </label>
        <label class="stream-quick-constraint-check is-wide">
          <input data-field="useAsCalculationTarget" type="checkbox">
          <span>Use as calculation target</span>
        </label>
        <label class="stream-quick-constraint-field is-wide">
          <span>Locked Flow</span>
          <input data-field="lockedFlow" type="text" inputmode="decimal">
        </label>
      </div>
      <div class="stream-quick-constraint-actions">
        <button type="button" data-action="save" class="admin-button admin-button-primary">Save</button>
        <button type="button" data-action="clear" class="admin-button">Clear Constraint</button>
        <button type="button" data-action="cancel" class="admin-button">Cancel</button>
      </div>
    </div>
  `;
  bindQuickConstraintPopoverEvents(popover);
  popover.addEventListener("click", handleStreamQuickConstraintAction);
  popover.querySelectorAll("[data-action]").forEach((button) => {
    button.addEventListener("click", handleStreamQuickConstraintAction);
  });
  document.body.appendChild(popover);
  state.quickConstraintPopover = popover;
  return popover;
}

function setQuickConstraintField(popover, field, value) {
  const input = popover.querySelector(`[data-field="${field}"]`);
  if (!input) return;
  if (input.type === "checkbox") {
    input.checked = Boolean(value);
  } else {
    input.value = value === null || value === undefined ? "" : String(value);
  }
}

function getQuickConstraintField(popover, field) {
  const input = popover.querySelector(`[data-field="${field}"]`);
  if (!input) return null;
  return input.type === "checkbox" ? input.checked : input.value;
}

function positionStreamQuickConstraintPopover(popover, anchor = {}) {
  if (!popover) return;
  const card = popover.querySelector(".stream-quick-constraint-card") || popover;
  const margin = 12;
  const width = card.offsetWidth || 300;
  const height = card.offsetHeight || 260;
  const viewportWidth = window.innerWidth || document.documentElement.clientWidth;
  const viewportHeight = window.innerHeight || document.documentElement.clientHeight;
  const clientX = Number.isFinite(Number(anchor.clientX)) ? Number(anchor.clientX) : viewportWidth / 2;
  const clientY = Number.isFinite(Number(anchor.clientY)) ? Number(anchor.clientY) : viewportHeight / 2;
  const left = clamp(clientX + 14, margin, Math.max(margin, viewportWidth - width - margin));
  const top = clamp(clientY + 14, margin, Math.max(margin, viewportHeight - height - margin));
  popover.style.left = `${Math.round(left)}px`;
  popover.style.top = `${Math.round(top)}px`;
}

function showStreamQuickConstraintPopover(stream, anchor = {}) {
  if (!stream || !canUseQuickConstraint()) return;
  const popover = ensureStreamQuickConstraintPopover();
  if (MASS_BALANCE_DEBUG) console.debug("[QuickConstraint] open", stream.id);
  state.quickConstraintStreamId = stream.id;
  popover.dataset.streamId = stream.id;
  popover.querySelector('[data-field="title"]').textContent = `${stream.id} - ${safeText(stream.label, "Stream")}`;
  popover.querySelector('[data-field="status"]').textContent = getQuickConstraintStatusText(stream);
  popover.querySelector('[data-field="actualFlow"]').textContent = formatBalanceTriplet(
    getFinalRuntimeStreamFlowM3H(stream),
    getFinalRuntimeStreamFlowMBSD(stream),
    getFinalRuntimeStreamPercentCap(stream),
  );
  setQuickConstraintField(popover, "flowMin", stream.flowMin);
  setQuickConstraintField(popover, "flowTarget", stream.flowTarget);
  setQuickConstraintField(popover, "flowMax", stream.flowMax);
  setQuickConstraintField(popover, "flowRangeUnit", normalizeStreamFlowRangeUnit(stream.flowRangeUnit || stream.flowUnit || DEFAULT_FLOW_UNIT));
  setQuickConstraintField(popover, "rangeMode", normalizeStreamRangeMode(stream.rangeMode));
  setQuickConstraintField(popover, "useAsCalculationTarget", isStreamCalculationTarget(stream));
  setQuickConstraintField(popover, "calculationPriority", Number.isFinite(Number(stream.calculationPriority)) ? stream.calculationPriority : 100);
  setQuickConstraintField(popover, "lockedFlow", stream.lockedFlow);
  popover.classList.remove("is-hidden");
  positionStreamQuickConstraintPopover(popover, anchor || {});
  requestAnimationFrame(() => {
    const targetInput = popover.querySelector('[data-field="flowTarget"]');
    targetInput?.focus?.({ preventScroll: true });
    targetInput?.select?.();
  });
}

function hideStreamQuickConstraintPopover() {
  state.quickConstraintStreamId = "";
  state.quickConstraintPopover?.classList.add("is-hidden");
}

function applyQuickConstraintToStream(clear = false) {
  const popover = state.quickConstraintPopover;
  const stream = findStreamById(state.quickConstraintStreamId || popover?.dataset.streamId);
  if (!popover || !stream) return;
  if (clear) {
    resetStreamConstraint(stream);
  } else {
    const flowMin = parseNumericInput(getQuickConstraintField(popover, "flowMin"));
    const flowTarget = parseNumericInput(getQuickConstraintField(popover, "flowTarget"));
    const flowMax = parseNumericInput(getQuickConstraintField(popover, "flowMax"));
    const lockedFlow = parseNumericInput(getQuickConstraintField(popover, "lockedFlow"));
    const priority = parseNumericInput(getQuickConstraintField(popover, "calculationPriority"));
    if ([flowMin, flowTarget, flowMax, lockedFlow, priority].some((value) => Number.isNaN(value))) {
      showToast("Constraint harus berupa angka valid", "error");
      return;
    }
    if (flowTarget !== null && flowMin !== null && flowTarget < flowMin) {
      showToast("Flow Target tidak boleh lebih kecil dari Flow Min", "error");
      return;
    }
    if (flowTarget !== null && flowMax !== null && flowTarget > flowMax) {
      showToast("Flow Target tidak boleh lebih besar dari Flow Max", "error");
      return;
    }
    const rangeMode = normalizeStreamRangeMode(getQuickConstraintField(popover, "rangeMode"));
    stream.flowMin = flowMin;
    stream.flowTarget = flowTarget;
    stream.flowMax = flowMax;
    stream.flowRangeUnit = normalizeStreamFlowRangeUnit(getQuickConstraintField(popover, "flowRangeUnit"));
    stream.rangeMode = rangeMode;
    stream.useAsCalculationTarget = Boolean(getQuickConstraintField(popover, "useAsCalculationTarget"))
      || rangeMode === "control-target"
      || rangeMode === "locked-flow";
    stream.calculationPriority = priority === null ? 100 : priority;
    stream.targetSolveMode = normalizeTargetSolveMode(stream.targetSolveMode || "adjust-siblings");
    stream.targetTolerancePercent = normalizeTolerancePercent(stream.targetTolerancePercent);
    stream.lockedFlow = lockedFlow;
  }
  state.activeStreamId = stream.id;
  applyDefaultStreamMassFields(stream);
  if (MASS_BALANCE_DEBUG) {
    console.debug("[QuickConstraint] save", stream.id, {
      clear,
      flowMin: stream.flowMin,
      flowTarget: stream.flowTarget,
      flowMax: stream.flowMax,
      flowRangeUnit: stream.flowRangeUnit,
      rangeMode: stream.rangeMode,
      useAsCalculationTarget: stream.useAsCalculationTarget,
    });
  }
  hideStreamQuickConstraintPopover();
  loadStreamForm(stream.id);
  commitDataChange(clear ? "Constraint stream dibersihkan" : "Constraint stream tersimpan", {
    keepStream: true,
    toastDuration: 1400,
    skipHistory: false,
  });
}

function handleStreamQuickConstraintAction(event) {
  const action = event.target.closest("[data-action]")?.dataset.action;
  if (!action) return;
  event.preventDefault();
  event.stopPropagation();
  if (action === "save") {
    applyQuickConstraintToStream(false);
  } else if (action === "clear") {
    applyQuickConstraintToStream(true);
  } else {
    hideStreamQuickConstraintPopover();
  }
}

function setStreamHoverClass(streamId, enabled) {
  if (!streamId || !els.streamLayer) return;
  els.streamLayer.querySelectorAll(`[data-stream-id="${CSS.escape(streamId)}"]`).forEach((element) => {
    element.classList.toggle("is-hovered", enabled);
  });
  els.streamLayer.querySelectorAll(".stream-label").forEach((label) => {
    const href = label.querySelector("textPath")?.getAttribute("href");
    if (href === `#${streamId}`) label.classList.toggle("is-hovered", enabled);
  });
}

function isCanvasInteractionBusy() {
  return Boolean(
    state.isPanning
      || state.draggedNodeId
      || state.resizingNode
      || state.draggedStreamPoint
      || state.streamAddPointMode
      || state.streamReconnectDrag
      || state.portConnectionDrag
      || state.streamEndpointPickMode
      || state.draggingPidSymbol
      || state.resizingPidSymbol,
  );
}

function buildStreamPath(stream, bridges = []) {
  const shape = normalizeStreamShape(stream?.shape);
  if (shape === "straight" || shape === "autoStraight") {
    const straightPath = buildStraightOrAutoStraightPath(stream, bridges);
    if (straightPath) return straightPath;
  }

  const points = getStreamRenderPoints(stream);
  if (points.length < 2) return "";
  if (!points.every(isFinitePoint)) {
    console.warn(`Stream ${stream?.id || "(tanpa id)"} dilewati: titik route tidak valid.`);
    return "";
  }
  if (shape === "cable" || shape === "bezier") {
    if (hasManualStreamPoints(stream)) {
      try {
        return pointsToRoundedPath(points, 24);
      } catch (error) {
        console.warn(`Rounded cable stream ${stream?.id || "(tanpa id)"} fallback ke polyline.`, error);
      }
    } else {
      try {
        const cablePath = buildDirectCablePath(stream);
        if (cablePath) return cablePath;
      } catch (error) {
        console.warn(`Cable stream ${stream?.id || "(tanpa id)"} fallback ke polyline.`, error);
      }
    }
  }
  try {
    return pointsToPathWithBridges(points, shape === "polyline" ? bridges : []);
  } catch (error) {
    console.warn(`Bridge path stream ${stream?.id || "(tanpa id)"} fallback ke polyline basic.`, error);
    return pointsToPath(points);
  }
}

function isValidSvgPathD(pathData) {
  return typeof pathData === "string"
    && pathData.trim().length > 0
    && !pathData.includes("NaN")
    && !pathData.includes("undefined")
    && !pathData.includes("Infinity");
}

function buildStraightOrAutoStraightPath(stream, bridges = []) {
  const shape = normalizeStreamShape(stream?.shape);
  const endpoints = getStreamEndpointPoints(stream);
  if (!endpoints) return "";
  const directPoints = [endpoints.start, endpoints.end];
  const canUseDirect = shape === "straight"
    || arePortsAligned(endpoints.start, endpoints.end, state.straightAlignTolerance || 8);

  if (canUseDirect) {
    const conflicts = countRouteConflicts(directPoints, stream);
    stream.routeStatus = conflicts > 0 ? "Conflict" : "Clear";
    stream.routeWarning = conflicts > 0 ? "Route conflict: straight stream crosses node body" : "";
    if (shape === "straight" || conflicts === 0 || stream.avoidNodes === false) {
      if (Array.isArray(bridges) && bridges.length) return pointsToPathWithBridges(directPoints, bridges);
      return buildStraightPath(endpoints.start, endpoints.end);
    }
  }

  const fallback = getStreamRenderPoints({ ...stream, shape: "polyline" });
  if (fallback.length >= 2) updateStreamRouteStatus(stream, fallback);
  return fallback.length >= 2 ? pointsToPathWithBridges(fallback, bridges) : "";
}

function buildStraightPath(start, end) {
  if (!isFinitePoint(start) || !isFinitePoint(end)) {
    throw new Error("Invalid straight stream endpoints");
  }
  return `M ${Math.round(start.x)} ${Math.round(start.y)} L ${Math.round(end.x)} ${Math.round(end.y)}`;
}

function arePortsAligned(start, end, tolerance = 8) {
  if (!isFinitePoint(start) || !isFinitePoint(end)) return false;
  const gap = Number.isFinite(Number(tolerance)) ? Number(tolerance) : 8;
  return Math.abs(start.x - end.x) <= gap || Math.abs(start.y - end.y) <= gap;
}

function buildDirectCablePath(stream) {
  const endpoints = getStreamEndpointPoints(stream);
  if (!endpoints) return "";
  const sampledPoints = sampleDirectCablePoints(endpoints.start, endpoints.end, 22);
  if (stream.avoidNodes !== false && countRouteConflicts(sampledPoints, stream) > 0) {
    const fallback = getStreamRenderPoints({ ...stream, shape: "polyline" });
    if (fallback.length >= 2) updateStreamRouteStatus(stream, fallback);
    return fallback.length >= 2 ? pointsToPath(fallback) : "";
  }
  updateStreamRouteStatus(stream, sampledPoints);
  return pointsToDirectCablePath(endpoints.start, endpoints.end);
}

function hasManualStreamPoints(stream) {
  return Array.isArray(stream?.points) && stream.points.length > 0;
}

function getBridgeDetectionPoints(stream) {
  const shape = normalizeStreamShape(stream?.shape);
  if (shape === "straight") {
    const endpoints = getStreamEndpointPoints(stream);
    return endpoints ? [endpoints.start, endpoints.end] : [];
  }
  if (shape === "autoStraight") {
    const endpoints = getStreamEndpointPoints(stream);
    if (endpoints && arePortsAligned(endpoints.start, endpoints.end, state.straightAlignTolerance || 8)) {
      const directPoints = [endpoints.start, endpoints.end];
      if (stream.avoidNodes === false || countRouteConflicts(directPoints, stream) === 0) return directPoints;
    }
    return getStreamRenderPoints({ ...stream, shape: "polyline" });
  }
  return getStreamRenderPoints(stream);
}

function renderStreamReconnectPreview() {
  if (!state.streamReconnectDrag) return;
  const drag = state.streamReconnectDrag;
  const stream = STREAMS.find((item) => item.id === drag.streamId);
  if (!stream || !drag.currentPoint) return;

  const endpoints = getStreamEndpointPoints(stream);
  if (!endpoints) return;
  const start = drag.endpoint === "from" ? drag.currentPoint : endpoints.start;
  const end = drag.endpoint === "to" ? drag.currentPoint : endpoints.end;
  const path = createSvgElement("path");
  path.setAttribute("class", `stream-reconnect-preview stream-${stream.type || "liquid"}`);
  path.setAttribute("d", `M ${Math.round(start.x)} ${Math.round(start.y)} L ${Math.round(end.x)} ${Math.round(end.y)}`);
  path.setAttribute("fill", "none");
  path.setAttribute("stroke-width", getStreamStrokeWidth(stream, true));
  path.setAttribute("marker-end", "url(#arrowHead)");
  els.streamLayer.appendChild(path);
}

function renderPortConnectionPreview() {
  const drag = state.portConnectionDrag;
  if (!drag) return;
  const fromNode = nodeByTag.get(drag.from);
  if (!fromNode || !drag.currentPoint) return;
  const start = getPortPoint(fromNode, "outputs", drag.fromPort);
  const end = drag.currentPoint;
  const path = createSvgElement("path");
  path.setAttribute("class", "stream-reconnect-preview stream-liquid");
  path.setAttribute("d", pointsToCablePath([start, end]));
  path.setAttribute("fill", "none");
  path.setAttribute("stroke-width", "3");
  path.setAttribute("marker-end", "url(#arrowHead)");
  els.streamLayer.appendChild(path);
}

function getStreamEndpointPoints(stream) {
  if (stream?.invalid) return null;
  const from = nodeByTag.get(stream?.from);
  const to = nodeByTag.get(stream?.to);
  if (!from || !to) return null;
  const start = getPortPoint(from, "outputs", stream.fromPort);
  const end = getPortPoint(to, "inputs", stream.toPort);
  if (!isFinitePoint(start) || !isFinitePoint(end)) return null;
  return {
    start,
    end,
    from,
    to,
  };
}

function getStreamRenderPoints(stream) {
  const endpoints = getStreamEndpointPoints(stream);
  if (!endpoints) return [];
  const shape = normalizeStreamShape(stream?.shape);
  if (shape === "straight") {
    const directPoints = [endpoints.start, endpoints.end];
    updateStreamRouteStatus(stream, directPoints);
    return directPoints;
  }
  if (shape === "autoStraight" && arePortsAligned(endpoints.start, endpoints.end, state.straightAlignTolerance || 8)) {
    const directPoints = [endpoints.start, endpoints.end];
    if (stream.avoidNodes === false || countRouteConflicts(directPoints, stream) === 0) {
      updateStreamRouteStatus(stream, directPoints);
      return directPoints;
    }
  }
  const startStub = getPortStubPoint(endpoints.start, STREAM_PORT_STUB);
  const endStub = getPortStubPoint(endpoints.end, STREAM_PORT_STUB);
  if (!isFinitePoint(startStub) || !isFinitePoint(endStub)) return [];
  if (Array.isArray(stream.points) && stream.points.length) {
    const routePoints = normalizeManualRoutePoints(stream.points, stream);
    const points = cleanRoutePoints([endpoints.start, startStub, ...routePoints, endStub, endpoints.end]);
    if (!points.every(isFinitePoint)) return [];
    updateStreamRouteStatus(stream, points);
    return points;
  }
  return buildAutoStreamPoints(stream);
}

function getStreamStrokeWidth(stream, isActive = false) {
  const fallback = getDefaultStreamStrokeWidth(stream);
  const base = clamp(safeNumber(stream?.strokeWidth, fallback), 1.5, 4);
  return isActive ? Math.min(base + 0.75, 4) : base;
}

function getDefaultStreamStrokeWidth(streamOrType) {
  const type = typeof streamOrType === "string" ? streamOrType : streamOrType?.type;
  const category = typeof streamOrType === "string" ? "" : safeText(streamOrType?.category, "");
  if (category === "main" || category === "heavy" || category === "interunit") return 2.6;
  if (category === "hydrogen" || category === "gas" || category === "sour" || category === "sulfur") return 1.8;
  if (category === "product") return 2;
  if (category === "catalyst") return 2.2;
  if (type === "gas" || type === "air" || type === "water") return 1.8;
  if (type === "solid") return 2;
  return 2;
}

function pointsToPath(points) {
  if (!Array.isArray(points) || points.length < 2 || !points.every(isFinitePoint)) return "";
  const [first, ...rest] = points;
  return [`M ${first.x} ${first.y}`, ...rest.map((point) => `L ${point.x} ${point.y}`)].join(" ");
}

function pointsToPathWithBridges(points, bridges = [], radius = 12) {
  if (!Array.isArray(points) || points.length < 2) return "";
  if (!points.every(isFinitePoint)) return "";
  if (!Array.isArray(bridges) || !bridges.length) return pointsToPath(points);

  const bridgeBySegment = new Map();
  bridges.forEach((bridge) => {
    if (!Number.isFinite(bridge?.segmentIndex) || !bridge?.point) return;
    if (!bridgeBySegment.has(bridge.segmentIndex)) bridgeBySegment.set(bridge.segmentIndex, []);
    bridgeBySegment.get(bridge.segmentIndex).push(bridge);
  });

  const parts = [`M ${Math.round(points[0].x)} ${Math.round(points[0].y)}`];
  for (let index = 0; index < points.length - 1; index += 1) {
    const start = points[index];
    const end = points[index + 1];
    const segmentBridges = (bridgeBySegment.get(index) || [])
      .map((bridge) => ({ ...bridge, distance: Math.hypot(bridge.point.x - start.x, bridge.point.y - start.y) }))
      .sort((a, b) => a.distance - b.distance)
      .slice(0, 20);

    if (!segmentBridges.length) {
      parts.push(`L ${Math.round(end.x)} ${Math.round(end.y)}`);
      continue;
    }

    const isHorizontal = Math.abs(start.y - end.y) <= 1;
    const isVertical = Math.abs(start.x - end.x) <= 1;
    if (!isHorizontal && !isVertical) {
      parts.push(`L ${Math.round(end.x)} ${Math.round(end.y)}`);
      continue;
    }

    const segmentLength = Math.hypot(end.x - start.x, end.y - start.y);
    const direction = isHorizontal ? Math.sign(end.x - start.x || 1) : Math.sign(end.y - start.y || 1);
    let cursorDistance = 0;

    segmentBridges.forEach((bridge) => {
      if (bridge.distance - cursorDistance < radius * 2) return;
      if (segmentLength - bridge.distance < radius * 2) return;
      const arcDir = bridge.arcDir || (isHorizontal ? -1 : 1);
      if (isHorizontal) {
        const y = start.y;
        const entryX = bridge.point.x - direction * radius;
        const exitX = bridge.point.x + direction * radius;
        parts.push(`L ${Math.round(entryX)} ${Math.round(y)}`);
        parts.push(`C ${Math.round(entryX)} ${Math.round(y + arcDir * radius)}, ${Math.round(exitX)} ${Math.round(y + arcDir * radius)}, ${Math.round(exitX)} ${Math.round(y)}`);
      } else {
        const x = start.x;
        const entryY = bridge.point.y - direction * radius;
        const exitY = bridge.point.y + direction * radius;
        parts.push(`L ${Math.round(x)} ${Math.round(entryY)}`);
        parts.push(`C ${Math.round(x + arcDir * radius)} ${Math.round(entryY)}, ${Math.round(x + arcDir * radius)} ${Math.round(exitY)}, ${Math.round(x)} ${Math.round(exitY)}`);
      }
      cursorDistance = bridge.distance + radius;
    });
    parts.push(`L ${Math.round(end.x)} ${Math.round(end.y)}`);
  }
  return parts.join(" ");
}

function pointsToDirectCablePath(start, end) {
  if (!start || !end) return "";
  if (!isFinitePoint(start) || !isFinitePoint(end)) return "";
  const { c1, c2 } = getCableControlPoints(start, end);
  return [
    `M ${Math.round(start.x)} ${Math.round(start.y)}`,
    `C ${Math.round(c1.x)} ${Math.round(c1.y)}, ${Math.round(c2.x)} ${Math.round(c2.y)}, ${Math.round(end.x)} ${Math.round(end.y)}`,
  ].join(" ");
}

function getCableControlPoints(start, end) {
  if (!isFinitePoint(start) || !isFinitePoint(end)) {
    throw new Error("Invalid cable endpoints");
  }
  const distance = Math.hypot(end.x - start.x, end.y - start.y);
  const tangent = clamp(distance * 0.45, 80, 320);
  const startNormal = getPortDirectionVector(start.side || (end.x >= start.x ? "right" : "left"));
  const endNormal = getPortDirectionVector(end.side || (start.x <= end.x ? "left" : "right"));
  return {
    c1: {
      x: start.x + startNormal.x * tangent,
      y: start.y + startNormal.y * tangent,
    },
    c2: {
      x: end.x + endNormal.x * tangent,
      y: end.y + endNormal.y * tangent,
    },
  };
}

function sampleDirectCablePoints(start, end, steps = 20) {
  if (!isFinitePoint(start) || !isFinitePoint(end)) return [];
  const { c1, c2 } = getCableControlPoints(start, end);
  const samples = [];
  for (let index = 0; index <= steps; index += 1) {
    const t = index / steps;
    const mt = 1 - t;
    samples.push({
      x: (mt ** 3 * start.x) + (3 * mt ** 2 * t * c1.x) + (3 * mt * t ** 2 * c2.x) + (t ** 3 * end.x),
      y: (mt ** 3 * start.y) + (3 * mt ** 2 * t * c1.y) + (3 * mt * t ** 2 * c2.y) + (t ** 3 * end.y),
    });
  }
  return samples;
}

function pointsToRoundedPath(points, radius = 22) {
  if (!Array.isArray(points) || points.length < 2) return "";
  if (!points.every(isFinitePoint)) return "";
  if (points.length === 2) return pointsToDirectCablePath(points[0], points[1]);
  const parts = [`M ${Math.round(points[0].x)} ${Math.round(points[0].y)}`];
  for (let index = 1; index < points.length - 1; index += 1) {
    const previous = points[index - 1];
    const current = points[index];
    const next = points[index + 1];
    const incomingLength = Math.hypot(current.x - previous.x, current.y - previous.y);
    const outgoingLength = Math.hypot(next.x - current.x, next.y - current.y);
    const corner = Math.min(radius, incomingLength / 2, outgoingLength / 2);
    if (corner <= 1) {
      parts.push(`L ${Math.round(current.x)} ${Math.round(current.y)}`);
      continue;
    }
    const inPoint = {
      x: current.x - ((current.x - previous.x) / incomingLength) * corner,
      y: current.y - ((current.y - previous.y) / incomingLength) * corner,
    };
    const outPoint = {
      x: current.x + ((next.x - current.x) / outgoingLength) * corner,
      y: current.y + ((next.y - current.y) / outgoingLength) * corner,
    };
    parts.push(`L ${Math.round(inPoint.x)} ${Math.round(inPoint.y)}`);
    parts.push(`Q ${Math.round(current.x)} ${Math.round(current.y)}, ${Math.round(outPoint.x)} ${Math.round(outPoint.y)}`);
  }
  const last = points[points.length - 1];
  parts.push(`L ${Math.round(last.x)} ${Math.round(last.y)}`);
  return parts.join(" ");
}

function pointsToCablePath(points) {
  if (!Array.isArray(points) || points.length < 2) return "";
  if (!points.every(isFinitePoint)) return "";
  if (points.length === 2) return pointsToDirectCablePath(points[0], points[1]);
  const parts = [`M ${Math.round(points[0].x)} ${Math.round(points[0].y)}`];
  for (let index = 1; index < points.length; index += 1) {
    const previous = points[index - 1];
    const current = points[index];
    const distance = Math.max(60, Math.min(260, Math.abs(current.x - previous.x) * 0.5));
    const prevVector = getPortDirectionVector(previous.side || (current.x >= previous.x ? "right" : "left"));
    const currentVector = getPortDirectionVector(current.side || (current.x >= previous.x ? "left" : "right"));
    const c1 = {
      x: previous.x + prevVector.x * distance,
      y: previous.y + prevVector.y * distance,
    };
    const c2 = {
      x: current.x + currentVector.x * distance,
      y: current.y + currentVector.y * distance,
    };
    parts.push(`C ${Math.round(c1.x)} ${Math.round(c1.y)}, ${Math.round(c2.x)} ${Math.round(c2.y)}, ${Math.round(current.x)} ${Math.round(current.y)}`);
  }
  return parts.join(" ");
}

function getNodeCenter(node) {
  const layout = getScopedNodeLayout(node);
  return {
    x: layout.x + layout.width / 2,
    y: layout.y + layout.height / 2,
  };
}

function normalizeNodeIdentities() {
  const usedIds = new Set();
  const usedTags = new Set();
  NODES.forEach((node, index) => {
    const fallbackTag = `NODE-${index + 1}`;
    let nextTag = safeText(node.tag, fallbackTag).toUpperCase();
    let tagCounter = 2;
    while (usedTags.has(nextTag)) {
      nextTag = `${safeText(node.tag, fallbackTag).toUpperCase()}-${tagCounter}`;
      tagCounter += 1;
    }
    node.tag = nextTag;
    usedTags.add(nextTag);
    const baseId = safeText(node.id, "") || makeNodeId(node.tag);
    let nextId = baseId;
    let counter = 2;
    while (usedIds.has(nextId)) {
      nextId = `${baseId}-${counter}`;
      counter += 1;
    }
    node.id = nextId;
    usedIds.add(nextId);
    node.name = safeText(node.name, node.tag);
    node.unit = safeText(node.unit, "GENERAL");
    node.section = safeText(node.section, "General");
    node.type = safeText(node.type, "Equipment");
    node.area = safeText(node.area, AREAS[0]?.id || "AREA-1");
    node.status = safeText(node.status, "Normal");
    node.temperature = safeText(node.temperature, "-");
    node.pressure = safeText(node.pressure, "-");
    node.description = safeText(node.description, "");
    node.functions = Array.isArray(node.functions) ? node.functions.map((item) => safeText(item, "")).filter(Boolean) : [];
    node.visibleIn = normalizeVisibleIn(node.visibleIn, node.isMajor);
    applyCduNodeBalanceDefaults(node);
    node.balanceType = normalizeBalanceType(node.balanceType);
    node.tolerancePercent = normalizeTolerancePercent(node.tolerancePercent);
    node.splitModel = normalizeSplitModel(node.splitModel);
    node.balanceCategories = normalizeBalanceCategories(node.balanceCategories);
    node.balanceScope = normalizeBalanceScope(node.balanceScope);
    node.balanceUnit = node.balanceUnit === null || node.balanceUnit === undefined ? null : safeText(node.balanceUnit, node.unit);
    clearNodeRuntimeArtifacts(node);
  });
}

function applyCduNodeBalanceDefaults(node) {
  const defaults = CDU_NODE_BALANCE_DEFAULTS[node.tag];
  if (!defaults) return;
  if (!node.balanceType || normalizeBalanceType(node.balanceType) === "none") {
    node.balanceType = defaults.balanceType;
  }
  if (defaults.balanceScope && !node.balanceScope) node.balanceScope = defaults.balanceScope;
  if (defaults.balanceUnit && !node.balanceUnit) node.balanceUnit = defaults.balanceUnit;
  if (!Array.isArray(node.balanceCategories) || !node.balanceCategories.length) {
    node.balanceCategories = [...defaults.balanceCategories];
  }
}

function normalizeNodeSizes() {
  NODES.forEach((node) => {
    if (!Number.isFinite(Number(node.width))) node.width = NODE_SIZE_PRESETS.medium.width;
    if (!Number.isFinite(Number(node.height))) node.height = NODE_SIZE_PRESETS.medium.height;
    node.width = Math.max(80, safeNumber(node.width, NODE_SIZE_PRESETS.medium.width));
    node.height = Math.max(50, safeNumber(node.height, NODE_SIZE_PRESETS.medium.height));
    if (!Number.isFinite(Number(node.baseWidth))) node.baseWidth = node.width;
    if (!Number.isFinite(Number(node.baseHeight))) node.baseHeight = node.height;
    if (!Number.isFinite(Number(node.scale))) node.scale = 1;
    node.scale = clamp(safeNumber(node.scale, 1), 0.5, 2.5);
    node.locked = typeof node.locked === "boolean" ? node.locked : false;
    node.style = normalizeNodeStyle(node.style);
  });
}

function normalizeNodeStyle(style = {}) {
  const source = style && typeof style === "object" ? style : {};
  return {
    fontSize: clamp(safeNumber(source.fontSize, NODE_STYLE_DEFAULTS.fontSize), 8, 32),
    fontColor: isCssHexColor(source.fontColor) ? source.fontColor : "",
    fontWeight: NODE_STYLE_FONT_WEIGHTS.has(String(source.fontWeight || "")) ? String(source.fontWeight) : NODE_STYLE_DEFAULTS.fontWeight,
    fontStyle: NODE_STYLE_FONT_STYLES.has(String(source.fontStyle || "")) ? String(source.fontStyle) : NODE_STYLE_DEFAULTS.fontStyle,
    nameFontSize: clamp(safeNumber(source.nameFontSize, NODE_STYLE_DEFAULTS.nameFontSize), 8, 28),
    metaFontSize: clamp(safeNumber(source.metaFontSize, NODE_STYLE_DEFAULTS.metaFontSize), 8, 24),
    iconSize: clamp(safeNumber(source.iconSize, NODE_STYLE_DEFAULTS.iconSize), 16, 72),
    iconColor: isCssHexColor(source.iconColor) ? source.iconColor : "",
    iconScale: clamp(safeNumber(source.iconScale, NODE_STYLE_DEFAULTS.iconScale), 0.5, 2),
    portLabelFontSize: source.portLabelFontSize === null || source.portLabelFontSize === "" || source.portLabelFontSize === undefined
      ? null
      : clamp(safeNumber(source.portLabelFontSize, 10), 8, 18),
    portLabelColor: isCssHexColor(source.portLabelColor) ? source.portLabelColor : "",
    portLabelWeight: PORT_LABEL_FONT_WEIGHTS.has(String(source.portLabelWeight || "")) ? String(source.portLabelWeight) : "",
  };
}

function isCssHexColor(value) {
  return typeof value === "string" && /^#[0-9a-f]{6}$/i.test(value.trim());
}

function getNodeWidth(node) {
  return safeNumber(node?.width, NODE_SIZE_PRESETS.medium.width);
}

function getNodeHeight(node) {
  return safeNumber(node?.height, NODE_SIZE_PRESETS.medium.height);
}

function getScopedNodeLayout(node) {
  const scoped = node?.layoutByScope?.[state.currentScope];
  if (scoped && Number.isFinite(Number(scoped.x)) && Number.isFinite(Number(scoped.y))) {
    return {
      x: Number(scoped.x),
      y: Number(scoped.y),
      width: safeNumber(scoped.width, getNodeWidth(node)),
      height: safeNumber(scoped.height, getNodeHeight(node)),
    };
  }
  return {
    x: safeNumber(node?.x, 0),
    y: safeNumber(node?.y, 0),
    width: getNodeWidth(node),
    height: getNodeHeight(node),
  };
}

function getNodeSizePresetKey(width, height) {
  const normalizedWidth = Number(width);
  const normalizedHeight = Number(height);
  const match = Object.entries(NODE_SIZE_PRESETS).find(([, preset]) => (
    preset.width === normalizedWidth && preset.height === normalizedHeight
  ));
  return match?.[0] || "custom";
}

function getNodeOutputPoint(from, to) {
  const fromLayout = getScopedNodeLayout(from);
  const fromCenter = getNodeCenter(from);
  const toCenter = getNodeCenter(to);
  if (toCenter.x >= fromCenter.x) {
    return { x: fromLayout.x + fromLayout.width, y: fromCenter.y };
  }
  return { x: fromLayout.x, y: fromCenter.y };
}

function getNodeInputPoint(to, from) {
  const fromCenter = getNodeCenter(from);
  const toLayout = getScopedNodeLayout(to);
  const toCenter = getNodeCenter(to);
  if (fromCenter.x <= toCenter.x) {
    return { x: toLayout.x, y: toCenter.y };
  }
  return { x: toLayout.x + toLayout.width, y: toCenter.y };
}

function shouldAutoOpenDetail(options = {}) {
  if (options.openDetail === true) return true;
  if (options.openDetail === false) return false;
  return !isEditMode() || !state.canvasFirstEdit;
}

function selectNode(nodeId, options = {}) {
  const node = nodeById.get(nodeId);
  if (!node) return;

  if (!options.keepMulti) {
    state.selectedNodeTags.clear();
    state.selectedNodeTags.add(node.tag);
  }
  state.selectedNodeId = nodeId;
  state.selectedNode = nodeId;
  if (state.selectedPidSymbolId) {
    state.selectedPidSymbolId = "";
    renderPidLayer();
  }
  if (isEditMode() && options.renderHandles !== false) {
    renderNodes();
    renderStreams();
    renderStreamPointEditor();
  }
  setActiveNode(nodeId);
  renderDetail(node);
  hideStreamDetail();
  if (shouldAutoOpenDetail(options) && !isPresentationMode()) {
    openDetailPanel("node");
    hideQuickInspector();
  } else if (isEditMode() && !isPresentationMode()) {
    if (state.autoHideDetailInEditMode) closeDetailPanel();
    renderQuickInspector();
  }
  updateViewStatus();
  if (isEditMode()) {
    syncAdminNodeSelection(node);
  }

  if (options.focus) {
    focusNode(nodeId);
  }

  if (isPresentationMode()) {
    syncPresentationIndexForNode(node.id);
    showPresentationOverlay(node, { pan: Boolean(options.focus) });
  }
  renderContextToolbar();
  renderQuickInspector();
}

function toggleNodeMultiSelection(node, options = {}) {
  if (!node) return;
  if (state.selectedNodeTags.has(node.tag)) {
    state.selectedNodeTags.delete(node.tag);
  } else {
    state.selectedNodeTags.add(node.tag);
  }
  if (!state.selectedNodeTags.size) state.selectedNodeTags.add(node.tag);
  state.selectedNodeId = node.id;
  state.selectedNode = node.id;
  state.activeNodeTag = node.tag;
  setActiveNode(node.id);
  renderNodes();
  renderStreamPointEditor();
  renderContextToolbar();
  if (isEditMode()) syncAdminNodeSelection(node);
  if (options.focus) focusNode(node.id);
}

function getSelectedNodes() {
  const tags = state.selectedNodeTags instanceof Set ? [...state.selectedNodeTags] : [];
  const selected = tags.map((tag) => nodeByTag.get(tag)).filter(Boolean);
  if (selected.length) return selected;
  const single = nodeById.get(state.selectedNodeId);
  return single ? [single] : [];
}

function setActiveNode(nodeId) {
  els.nodeLayer.querySelectorAll(".canvas-node").forEach((element) => {
    const isActive = element.dataset.nodeId === nodeId;
    element.classList.toggle("is-active", isActive);
    element.querySelector(".node-button")?.setAttribute("aria-pressed", String(isActive));
  });
}

function syncAdminNodeSelection(node) {
  if (!node || !els.adminPanel || !isAdmin()) return;
  if (els.adminPanel.classList.contains("is-hidden") && !(isEditMode() && state.canvasFirstEdit)) {
    showAdminPanel();
  }
  state.activeNodeTag = node.tag;
  if (state.activeAdminTab !== "node") switchAdminTab("node");
  if (els.adminNodeSelect) {
    els.adminNodeSelect.value = node.tag;
  }
  loadNodeForm(node.tag);
}

function renderDetail(node) {
  const status = getStatusMeta(node.status);
  els.emptyDetail.hidden = true;
  els.emptyDetail.classList.add("is-hidden");
  els.nodeDetail.hidden = false;
  els.nodeDetail.classList.remove("is-hidden");
  hideStreamDetail();

  els.detailUnit.textContent = `${safeText(node.unit)} / ${safeText(node.section, getAreaDisplayName(node.area))}`;
  els.detailStatus.textContent = status.label;
  els.detailStatus.className = `status-chip ${status.className}`;
  els.detailName.textContent = safeText(node.name, "Equipment");
  els.detailTag.textContent = safeText(node.tag, "-");
  const fullDescription = safeText(node.description, "Belum ada deskripsi equipment.");
  els.detailDescription.textContent = summarizeTechnicalText(fullDescription, 120);
  els.detailDescription.title = fullDescription;
  els.detailType.textContent = safeText(node.type, "-");
  els.detailArea.textContent = getAreaDisplayName(node.area);
  els.detailTemperature.textContent = safeText(node.temperature, "-");
  els.detailPressure.textContent = safeText(node.pressure, "-");
  if (els.detailOpenUnit) {
    els.detailOpenUnit.hidden = !node.unit;
    els.detailOpenUnit.textContent = `Open ${safeText(node.unit, "Unit")}`;
  }
  if (els.detailOpenSection) {
    els.detailOpenSection.hidden = !node.unit || !node.section;
    els.detailOpenSection.textContent = `Open ${safeText(node.section, "Section")}`;
  }
  renderFunctionList(node.functions);
  renderMassBalanceDetail(node);
}

function summarizeTechnicalText(value, maxLength = 120) {
  const text = safeText(value, "-").replace(/\s+/g, " ").trim();
  const sentenceEnd = text.search(/[.!?](?:\s|$)/);
  const firstSentence = sentenceEnd >= 0 ? text.slice(0, sentenceEnd + 1) : text;
  if (firstSentence.length <= maxLength) return firstSentence;
  return `${firstSentence.slice(0, Math.max(0, maxLength - 1)).trimEnd()}…`;
}

function renderFunctionList(items) {
  els.detailFunctions.replaceChildren();
  const safeItems = Array.isArray(items) && items.length ? items : ["Belum ada data fungsi utama."];
  els.detailFunctions.title = safeItems.map((item) => safeText(item, "")).filter(Boolean).join("\n");
  safeItems.slice(0, 3).forEach((item) => {
    const li = document.createElement("li");
    li.textContent = summarizeTechnicalText(item, 96);
    els.detailFunctions.appendChild(li);
  });
  if (safeItems.length > 3) {
    const more = document.createElement("li");
    more.className = "detail-more-count";
    more.textContent = `+${safeItems.length - 3} more`;
    els.detailFunctions.appendChild(more);
  }
}

function renderMassBalanceDetail(node) {
  if (!els.detailMassBalance) return;
  els.detailMassBalance.replaceChildren();
  const result = getMassBalanceResult(node);
  if (!result || normalizeBalanceType(node.balanceType) === "none") {
    els.detailMassBalance.classList.add("is-hidden");
    return;
  }

  els.detailMassBalance.classList.remove("is-hidden");
  if (isCduOverallBalanceNode(node)) {
    renderCduRunDetail(result);
    renderBalanceSummaryGrid("Overall Mass Balance", result);
    renderMassBalanceTables(els.detailMassBalance, buildCduProductMassBalanceTable(), buildCduFeedMassBalanceTable());
    renderSplitModelDetail(result);
    renderLocalNodeBalance(els.detailMassBalance, node.localBalanceResult || result);
    return;
  }

  renderLocalNodeBalance(els.detailMassBalance, node.localBalanceResult || result);
  if (normalizeBalanceType(node.balanceType) === "productPool") {
    renderReceivedProductDetail(els.detailMassBalance, node.localBalanceResult || result);
  }
}

function renderBalanceSummaryGrid(titleText, result) {
  const title = document.createElement("h3");
  title.textContent = titleText;

  const grid = document.createElement("dl");
  grid.className = "detail-grid mass-balance-grid";
  [
    ["Balance Type", result.balanceType],
    ["Balance Scope", result.balanceScope],
    ["Balance Unit", result.balanceUnit || "-"],
    ["Total Input", formatBalanceTriplet(result.totalInputM3H, result.totalInputMBSD, result.inputPercentCap)],
    ["Total Output", formatBalanceTriplet(result.totalOutputM3H, result.totalOutputMBSD, result.outputPercentCap)],
    ["Difference", `${formatM3HValue(result.differenceM3H)} | ${formatMBSDValue(result.differenceMBSD)}`],
    ["Error %", result.errorPercent === null ? "-" : formatPercentValue(result.errorPercent)],
    ["Tolerance %", formatPercentValue(result.tolerancePercent)],
    ["Status", formatMassBalanceResultStatus(result)],
  ].forEach(([label, value]) => {
    grid.appendChild(createDetailDefinition(label, value));
  });

  els.detailMassBalance.append(title, grid);
}

function renderCduRunDetail(result) {
  const runState = normalizeCduRunState(result.cduRunState || state.cduRunState);
  const assay = result.crudeAssay || CDU_CRUDE_ASSAYS[runState.selectedCrudeType] || CDU_CRUDE_ASSAYS.medium;
  const title = document.createElement("h3");
  title.textContent = "CDU Run";
  const grid = document.createElement("dl");
  grid.className = "detail-grid mass-balance-grid";
  [
    ["Crude Type", assay.name],
    ["SG Crude", Number.isFinite(Number(runState.crudeSG)) ? formatNumber(runState.crudeSG, 3) : "-"],
    ["API Gravity", Number.isFinite(Number(runState.crudeAPI)) ? formatNumber(runState.crudeAPI, 2) : "-"],
    ["Crude Classification", formatCrudeClassificationLabel(runState.crudeClassification)],
    ["Assay API", assay.apiGravity],
    ["Density", `${formatNumber(assay.density, 0)} kg/m3`],
    ["Sulfur", formatPercentValue(assay.sulfur)],
    ["Crude Intake", formatBalanceTriplet(runState.crudeIntakeM3H, convertM3HToMBSD(runState.crudeIntakeM3H), calculatePercentCapacityFromM3H(runState.crudeIntakeM3H))],
    ["Last Run", runState.lastRunAt ? new Date(runState.lastRunAt).toLocaleString() : "-"],
    ["Run Status", runState.hasStarted ? "Started" : "Not Started"],
  ].forEach(([label, value]) => {
    grid.appendChild(createDetailDefinition(label, value));
  });
  els.detailMassBalance.append(title, grid);
}

function renderMassBalanceTables(container, productTable, feedTable) {
  renderVolumetricBalanceTable(container, "Product Mass Balance", "Produk", productTable);
  renderVolumetricBalanceTable(container, "Feed Mass Balance", "Feed", feedTable);
}

function renderCduFloatingTables() {
  if (!els.cduFloatingTables || !els.cduFloatingContent) return;
  applyCduFloatingTableSize();
  const presentationHidden = isPresentationMode() && state.cduAutoHideTableInPresentation !== false;
  const visible = state.cduTablesVisible !== false && !presentationHidden;
  els.cduFloatingTables.classList.toggle("is-hidden", !visible);
  els.cduTablesShow?.classList.toggle("is-hidden", visible || presentationHidden);
  if (!visible) return;
  setCduFloatingTablePosition(state.cduFloatingTablePosition?.x, state.cduFloatingTablePosition?.y, { skipState: true });

  const runState = normalizeCduRunState(state.cduRunState);
  const assay = CDU_CRUDE_ASSAYS[runState.selectedCrudeType] || CDU_CRUDE_ASSAYS.medium;
  const overall = getMassBalanceResult(getCduOverallNode());
  const runtime = state.massBalanceRuntime;
  const runtimeRows = buildFloatingTableRowsFromRuntime(runtime);
  const productRows = runtime?.productRows || runtimeRows.productRows;
  const feedRows = runtime?.feedRows || runtimeRows.feedRows;
  const feedTotal = summarizeVolumetricRows(feedRows);
  const status = runState.hasStarted ? formatMassBalanceResultStatus(overall) : "Not Started";
  const collapsed = Boolean(state.cduTablesCollapsed);
  const crudeLabel = safeText(assay.name, "Crude").replace(/\s+Crude$/i, "");

  if (els.cduFloatingTitle) els.cduFloatingTitle.textContent = "CDU Mass Balance";
  if (els.cduFloatingMeta) {
    els.cduFloatingMeta.textContent = `${crudeLabel} · ${formatM3HValue(runState.crudeIntakeM3H)} · ${formatMBSDValue(convertM3HToMBSD(runState.crudeIntakeM3H))} · ${formatCapacityPercentValue(calculatePercentCapacityFromM3H(runState.crudeIntakeM3H))} · ${status}`;
    const unitText = runState.intakeUnit === "mbsd"
      ? `${formatMBSDValue(runState.crudeIntakeMBSD)} · ${formatM3HValue(runState.crudeIntakeM3H)}`
      : `${formatM3HValue(runState.crudeIntakeM3H)} · ${formatMBSDValue(runState.crudeIntakeMBSD)}`;
    els.cduFloatingMeta.textContent = `${crudeLabel} · ${unitText} · ${formatCapacityPercentValue(calculatePercentCapacityFromM3H(runState.crudeIntakeM3H))} · ${status}`;
    els.cduFloatingMeta.dataset.status = runState.hasStarted ? (overall?.status || "incomplete") : "notStarted";
  }
  if (els.cduTablesCollapse) {
    els.cduTablesCollapse.textContent = collapsed ? "+" : "-";
    els.cduTablesCollapse.title = collapsed ? "Expand CDU tables" : "Collapse CDU tables";
  }
  els.cduFloatingTables.classList.toggle("is-collapsed", collapsed);
  els.cduFloatingContent.replaceChildren();
  if (collapsed) return;

  if (!runState.hasStarted) {
    const message = document.createElement("p");
    message.className = "mass-balance-note";
    message.textContent = "Start mass balance to view CDU tables.";
    els.cduFloatingContent.appendChild(message);
    return;
  }
  renderVolumetricBalanceTable(els.cduFloatingContent, "Product Mass Balance", "Produk", productRows);
  renderVolumetricBalanceTable(els.cduFloatingContent, "Feed Mass Balance", "Feed", feedRows);
  if (Number(feedTotal.percentCap) > 100) {
    const warning = document.createElement("p");
    warning.className = "mass-balance-note is-warning";
    warning.textContent = "Warning: CDU intake above 100% base capacity.";
    els.cduFloatingContent.appendChild(warning);
  }
}

function applyCduFloatingTableSize() {
  if (!els.cduFloatingTables) return;
  const size = normalizeCduFloatingTableSize(state.cduFloatingTableSize);
  state.cduFloatingTableSize = size;
  els.cduFloatingTables.classList.remove("cdu-table-small", "cdu-table-medium", "cdu-table-large");
  els.cduFloatingTables.classList.add(`cdu-table-${size}`);
  els.cduTableSizeButtons?.forEach((button) => {
    const active = button.dataset.cduTableSize === size;
    button.classList.toggle("is-active", active);
    button.setAttribute("aria-pressed", String(active));
  });
}

function getConstrainedFloatingTablePosition(x, y) {
  const panel = els.cduFloatingTables;
  const viewport = els.canvasViewport;
  const fallback = normalizeCduFloatingTablePosition({ x, y });
  if (!panel || !viewport) return fallback;
  const margin = 12;
  const viewportRect = viewport.getBoundingClientRect();
  const panelWidth = panel.offsetWidth || 420;
  const panelHeight = panel.offsetHeight || 260;
  const maxX = Math.max(margin, viewportRect.width - panelWidth - margin);
  const maxY = Math.max(margin, viewportRect.height - panelHeight - margin);
  return {
    x: clamp(Number(fallback.x), margin, maxX),
    y: clamp(Number(fallback.y), margin, maxY),
  };
}

function setCduFloatingTablePosition(x, y, options = {}) {
  const panel = els.cduFloatingTables;
  if (!panel) return;
  const next = getConstrainedFloatingTablePosition(x, y);
  panel.style.left = `${next.x}px`;
  panel.style.top = `${next.y}px`;
  panel.style.right = "auto";
  if (!options.skipState) state.cduFloatingTablePosition = next;
}

function saveCduFloatingTablePosition() {
  state.cduFloatingTablePosition = normalizeCduFloatingTablePosition(state.cduFloatingTablePosition);
  saveCurrentConfig("Posisi CDU table tersimpan", { skipHistorySnapshot: true, silentToast: true });
}

function resetCduFloatingTablePosition() {
  state.cduFloatingTablePosition = deepClone(CDU_FLOATING_TABLE_DEFAULT_POSITION);
  setCduFloatingTablePosition(state.cduFloatingTablePosition.x, state.cduFloatingTablePosition.y);
  saveCduFloatingTablePosition();
}

function startCduFloatingTableDrag(event) {
  if (!els.cduFloatingTables || event.target.closest("button")) return;
  event.preventDefault();
  event.stopPropagation();
  els.contextToolbar?.classList.add("is-hidden");
  const rect = els.cduFloatingTables.getBoundingClientRect();
  const parentRect = els.canvasViewport?.getBoundingClientRect();
  state.draggingCduFloatingTable = {
    pointerId: event.pointerId,
    startX: event.clientX,
    startY: event.clientY,
    panelStartX: rect.left - (parentRect?.left || 0),
    panelStartY: rect.top - (parentRect?.top || 0),
  };
  try {
    els.cduFloatingTableDragHandle?.setPointerCapture(event.pointerId);
  } catch {
    // Pointer capture can fail on older browser paths; document listeners still handle drag.
  }
  els.cduFloatingTables.classList.add("is-dragging");
}

function updateCduFloatingTableDrag(event) {
  const drag = state.draggingCduFloatingTable;
  if (!drag) return;
  event.preventDefault();
  const nextX = drag.panelStartX + event.clientX - drag.startX;
  const nextY = drag.panelStartY + event.clientY - drag.startY;
  const next = getConstrainedFloatingTablePosition(nextX, nextY);
  state.cduFloatingTablePosition = next;
  setCduFloatingTablePosition(next.x, next.y);
}

function finishCduFloatingTableDrag(event = {}) {
  const drag = state.draggingCduFloatingTable;
  if (!drag) return;
  state.draggingCduFloatingTable = null;
  els.cduFloatingTables?.classList.remove("is-dragging");
  try {
    els.cduFloatingTableDragHandle?.releasePointerCapture(drag.pointerId || event.pointerId);
  } catch {
    // No-op when pointer capture was not active.
  }
  saveCduFloatingTablePosition();
}

function setCduTablesVisible(visible) {
  state.cduTablesVisible = Boolean(visible);
  renderCduFloatingTables();
  renderConfigSummary();
  saveCurrentConfig(state.cduTablesVisible ? "CDU floating tables ditampilkan" : "CDU floating tables disembunyikan", { skipHistorySnapshot: true });
}

function toggleCduTablesCollapsed() {
  state.cduTablesCollapsed = !state.cduTablesCollapsed;
  renderCduFloatingTables();
  saveCurrentConfig(state.cduTablesCollapsed ? "CDU tables collapsed" : "CDU tables expanded", { skipHistorySnapshot: true });
}

function setShowNodeBalance(enabled) {
  state.showNodeBalance = Boolean(enabled);
  if (els.showNodeBalanceOption) els.showNodeBalanceOption.checked = state.showNodeBalance;
  if (els.adminShowNodeBalance) els.adminShowNodeBalance.checked = state.showNodeBalance;
  renderNodes();
  saveCurrentConfig(state.showNodeBalance ? "Node balance ditampilkan" : "Node balance disembunyikan", { skipHistorySnapshot: true });
}

function setShowPortFlow(enabled) {
  state.showPortFlow = Boolean(enabled);
  if (!state.showPortFlow) {
    state.portFlowMode = "off";
    state.portValueDisplay = "off";
  } else if (normalizePortFlowMode(state.portFlowMode) === "off") {
    state.portFlowMode = "full";
    state.portValueDisplay = "both";
  }
  if (!state.showPortFlow) clearPortFlowBadges();
  if (els.showPortFlowOption) els.showPortFlowOption.checked = state.showPortFlow;
  if (els.portFlowModeSelect) els.portFlowModeSelect.value = normalizePortFlowMode(state.portFlowMode);
  if (els.portValueDisplayGlobal) els.portValueDisplayGlobal.value = normalizePortValueDisplay(state.portValueDisplay);
  renderPortFlowBadges();
  saveCurrentConfig(state.showPortFlow ? "Port flow ditampilkan" : "Port flow disembunyikan", { skipHistorySnapshot: true });
}

function setPortFlowMode(mode) {
  const nextMode = normalizePortFlowMode(mode);
  state.portFlowMode = nextMode;
  state.showPortFlow = nextMode !== "off";
  state.portValueDisplay = nextMode === "off" ? "off" : nextMode === "compact" ? "m3h" : "both";
  if (els.showPortFlowOption) els.showPortFlowOption.checked = state.showPortFlow;
  if (els.portFlowModeSelect) els.portFlowModeSelect.value = nextMode;
  if (els.portValueDisplayGlobal) els.portValueDisplayGlobal.value = state.portValueDisplay;
  renderPortFlowBadges();
  saveCurrentConfig(`Port flow mode ${nextMode}`, { skipHistorySnapshot: true });
}

function setPortValueDisplay(value) {
  state.portValueDisplay = normalizePortValueDisplay(value);
  state.showPortFlow = state.portValueDisplay !== "off";
  state.portFlowMode = state.portValueDisplay === "off" ? "off" : state.portValueDisplay === "m3h" ? "compact" : "full";
  if (els.showPortFlowOption) els.showPortFlowOption.checked = state.showPortFlow;
  if (els.portFlowModeSelect) els.portFlowModeSelect.value = normalizePortFlowMode(state.portFlowMode);
  if (els.portValueDisplayGlobal) els.portValueDisplayGlobal.value = state.portValueDisplay;
  renderPortInfoGroups();
  saveCurrentConfig(`Port value display ${state.portValueDisplay}`, { skipHistorySnapshot: true });
}

function setPortInfoLayout(value) {
  state.portInfoLayout = normalizePortInfoLayout(value);
  if (els.portInfoLayoutGlobal) els.portInfoLayoutGlobal.value = state.portInfoLayout;
  renderPortInfoGroups();
  saveCurrentConfig(`Port info layout ${state.portInfoLayout}`, { skipHistorySnapshot: true });
}

function setPortInfoScale(value) {
  state.portInfoScale = normalizePortInfoScale(value);
  if (els.portInfoScaleGlobal) els.portInfoScaleGlobal.value = String(state.portInfoScale);
  renderPortInfoGroups();
  saveCurrentConfig(`Port info scale ${state.portInfoScale}`, { skipHistorySnapshot: true });
}

function setCduFloatingTableSize(size) {
  state.cduFloatingTableSize = normalizeCduFloatingTableSize(size);
  renderCduFloatingTables();
  setCduFloatingTablePosition(state.cduFloatingTablePosition?.x, state.cduFloatingTablePosition?.y);
  saveCurrentConfig(`CDU table size ${state.cduFloatingTableSize}`, { skipHistorySnapshot: true });
}

function renderVolumetricBalanceTable(container, titleText, firstColumnLabel, rows = []) {
  const title = document.createElement("h3");
  title.textContent = titleText;
  const wrapper = document.createElement("div");
  wrapper.className = "mass-balance-table-wrap";
  const table = document.createElement("table");
  table.className = "mass-balance-table";
  const thead = document.createElement("thead");
  const headerRow = document.createElement("tr");
  [firstColumnLabel, "M3/h", "MBSD", "% Cap"].forEach((label) => {
    const th = document.createElement("th");
    th.textContent = label;
    headerRow.appendChild(th);
  });
  thead.appendChild(headerRow);
  const tbody = document.createElement("tbody");
  const tableRows = [...rows, summarizeVolumetricRows(rows)];
  tableRows.forEach((row) => {
    const tr = document.createElement("tr");
    if (row.isTotal) tr.classList.add("is-total");
    if (row.isOverCapacity) tr.classList.add("is-over-capacity");
    if (row.isMissing) tr.classList.add("is-missing");
    if (row.isIncomplete) tr.classList.add("is-incomplete");
    if (row.constraintClassName) tr.classList.add(row.constraintClassName);
    if (row.constraintStatus) tr.dataset.constraintStatus = row.constraintStatus;
    const name = document.createElement("td");
    const nameText = document.createElement("span");
    nameText.textContent = `${row.name}${row.isGasVolumeEstimate ? " *" : ""}`;
    name.appendChild(nameText);
    const badge = createMassBalanceStatusBadge({
      status: row.constraintStatus,
      label: row.constraintLabel,
    });
    if (badge) name.appendChild(badge);
    const m3h = document.createElement("td");
    if (row.constraintStatus && row.constraintStatus !== "normal") m3h.classList.add(`mb-value-${row.constraintStatus}`);
    m3h.textContent = row.isMissing ? "Missing" : row.isIncomplete ? "Incomplete" : formatNumber(row.m3h, 1);
    const mbsd = document.createElement("td");
    if (row.constraintStatus && row.constraintStatus !== "normal") mbsd.classList.add(`mb-value-${row.constraintStatus}`);
    mbsd.textContent = row.isMissing || row.isIncomplete ? "-" : formatNumber(row.mbsd, 2);
    const cap = document.createElement("td");
    cap.textContent = row.isMissing || row.isIncomplete ? "-" : formatCapacityPercentValue(row.percentCap);
    tr.append(name, m3h, mbsd, cap);
    tbody.appendChild(tr);
  });
  table.append(thead, tbody);
  wrapper.appendChild(table);
  if (rows.some((row) => row.isGasVolumeEstimate)) {
    const note = document.createElement("p");
    note.className = "mass-balance-note";
    note.textContent = "* Gas volume uses default density estimate.";
    wrapper.appendChild(note);
  }
  if (tableRows.some((row) => row.isOverCapacity)) {
    const warning = document.createElement("p");
    warning.className = "mass-balance-note is-warning";
    const capacity = getCduBaseCapacity();
    warning.textContent = `Warning: % Cap above 100% of ${formatNumber(capacity.m3h, 1)} m3/h / ${formatNumber(capacity.mbsd, 2)} MBSD base capacity.`;
    wrapper.appendChild(warning);
  }
  if (tableRows.some((row) => row.isMissing)) {
    const warning = document.createElement("p");
    warning.className = "mass-balance-note is-warning";
    warning.textContent = "Warning: one or more mapped CDU streams are missing from active data.";
    wrapper.appendChild(warning);
  }
  if (tableRows.some((row) => row.isIncomplete)) {
    const warning = document.createElement("p");
    warning.className = "mass-balance-note is-warning";
    warning.textContent = "Warning: one or more active CDU streams do not have propagated flow.";
    wrapper.appendChild(warning);
  }
  container.append(title, wrapper);
}

function renderLocalNodeBalance(container, nodeBalance) {
  if (!nodeBalance) return;
  const node = resolveBalanceNode(nodeBalance.nodeId);
  const title = document.createElement("h3");
  title.textContent = "Local Node Mass Balance";
  const grid = document.createElement("dl");
  grid.className = "detail-grid mass-balance-grid";
  [
    ["Node Name", safeText(node?.name, nodeBalance.nodeTag)],
    ["Balance Type", nodeBalance.balanceType],
    ["Input", formatBalanceTriplet(nodeBalance.totalInputM3H, nodeBalance.totalInputMBSD, nodeBalance.inputPercentCap)],
    ["Output", formatBalanceTriplet(nodeBalance.totalOutputM3H, nodeBalance.totalOutputMBSD, nodeBalance.outputPercentCap)],
    ["Difference", `${formatM3HValue(nodeBalance.differenceM3H)} | ${formatMBSDValue(nodeBalance.differenceMBSD)}`],
    ["Error %", nodeBalance.errorPercent === null ? "-" : formatPercentValue(nodeBalance.errorPercent)],
    ["Status", formatMassBalanceResultStatus(nodeBalance)],
    ["Tolerance %", formatPercentValue(nodeBalance.tolerancePercent)],
  ].forEach(([label, value]) => {
    grid.appendChild(createDetailDefinition(label, value));
  });
  container.append(title, grid);
  renderStreamFlowTable(container, "Input Streams", nodeBalance.inputStreams);
  renderStreamFlowTable(container, "Output Streams", nodeBalance.outputStreams);
}

function renderStreamFlowTable(container, titleText, streamIds = []) {
  const title = document.createElement("h3");
  title.textContent = titleText;
  const wrapper = document.createElement("div");
  wrapper.className = "mass-balance-table-wrap";
  const table = document.createElement("table");
  table.className = "mass-balance-table";
  const thead = document.createElement("thead");
  const headerRow = document.createElement("tr");
  ["Stream", "M3/h", "MBSD", "%Cap"].forEach((label) => {
    const th = document.createElement("th");
    th.textContent = label;
    headerRow.appendChild(th);
  });
  thead.appendChild(headerRow);
  const tbody = document.createElement("tbody");
  if (!streamIds.length) {
    const tr = document.createElement("tr");
    const td = document.createElement("td");
    td.colSpan = 4;
    td.textContent = "-";
    tr.appendChild(td);
    tbody.appendChild(tr);
  } else {
    streamIds.forEach((streamId) => {
      const stream = STREAMS.find((item) => item.id === streamId);
      const tr = document.createElement("tr");
      const name = document.createElement("td");
      name.textContent = stream ? `${stream.id} - ${stream.label}` : streamId;
      const flow = document.createElement("td");
      flow.textContent = formatNumber(getFinalRuntimeStreamFlowM3H(stream), 1);
      const mbsd = document.createElement("td");
      mbsd.textContent = formatNumber(getFinalRuntimeStreamFlowMBSD(stream), 2);
      const cap = document.createElement("td");
      cap.textContent = formatCapacityPercentValue(getFinalRuntimeStreamPercentCap(stream));
      tr.append(name, flow, mbsd, cap);
      tbody.appendChild(tr);
    });
  }
  table.append(thead, tbody);
  wrapper.appendChild(table);
  container.append(title, wrapper);
}

function renderReceivedProductDetail(container, nodeBalance) {
  const inputIds = nodeBalance?.inputStreams || [];
  const streams = inputIds.map((streamId) => STREAMS.find((stream) => stream.id === streamId)).filter(Boolean);
  if (!streams.length) return;
  const runtimeStreams = state.massBalanceRuntime?.streams || null;
  const rows = streams.map((stream) => buildCduTableRow(safeText(stream.label, stream.id), stream, runtimeStreams?.[stream.id] || null));
  renderVolumetricBalanceTable(container, "Received Product", "Product", rows);
}

function renderSplitModelDetail(result) {
  const splitTitle = document.createElement("h3");
  splitTitle.textContent = "Split Model";
  const splitTotal = document.createElement("p");
  splitTotal.className = result.splitTotalValid ? "mass-balance-note" : "mass-balance-note is-warning";
  splitTotal.textContent = `Total split: ${formatPercentValue(result.splitTotal)}${result.splitTotalValid ? "" : " - warning, total harus mendekati 100%"}`;

  const list = document.createElement("ul");
  list.className = "mass-balance-split-list";
  (result.productFlows || []).forEach((item) => {
    const li = document.createElement("li");
    const name = document.createElement("span");
    name.textContent = `${item.label} ${formatPercentValue(item.percent)}`;
    const flow = document.createElement("strong");
    flow.textContent = formatBalanceTriplet(item.flowM3H ?? item.flowrate, item.flowMBSD, item.percentCap);
    li.append(name, flow);
    list.appendChild(li);
  });

  if (Array.isArray(result.missingSplitKeys) && result.missingSplitKeys.length) {
    const warning = document.createElement("p");
    warning.className = "mass-balance-note is-warning";
    warning.textContent = `Split stream belum lengkap: ${result.missingSplitKeys.join(", ")}`;
    els.detailMassBalance.append(splitTitle, splitTotal, warning, list);
    return;
  }
  els.detailMassBalance.append(splitTitle, splitTotal, list);
}

function createDetailDefinition(label, value) {
  const row = document.createElement("div");
  const dt = document.createElement("dt");
  const dd = document.createElement("dd");
  dt.textContent = label;
  dd.textContent = safeText(value, "-");
  row.append(dt, dd);
  return row;
}

function selectStream(streamId, options = {}) {
  const stream = STREAMS.find((item) => item.id === streamId);
  if (!stream) return;

  state.activeStreamId = stream.id;
  state.selectedStream = stream.id;
  state.selectedNodeTags.clear();
  state.selectedNodeId = "";
  if (state.selectedPidSymbolId) {
    state.selectedPidSymbolId = "";
    renderPidLayer();
  }
  state.selectedStreamPointIndex = -1;
  if (isEditMode()) state.streamEditMode = true;
  renderStreams();
  renderStreamPointEditor();
  renderStreamDetail(stream);
  renderContextToolbar();
  if (shouldAutoOpenDetail(options) && !isPresentationMode()) {
    openDetailPanel("stream");
    hideQuickInspector();
  } else if (isEditMode() && !isPresentationMode()) {
    if (state.autoHideDetailInEditMode) closeDetailPanel();
    renderQuickInspector();
  }
  updateStreamPointStatus();

  if (options.syncAdmin && els.adminStreamSelect) {
    if (isAdmin()) {
      if (els.adminPanel?.classList.contains("is-hidden") && !(isEditMode() && state.canvasFirstEdit)) showAdminPanel();
      switchAdminTab("stream");
    }
    els.adminStreamSelect.value = stream.id;
    loadStreamForm(stream.id);
    if (isAdmin()) {
      window.setTimeout(() => {
        if (state.activeStreamId === stream.id) switchAdminTab("stream");
      }, 0);
    }
  }
}

function renderStreamDetail(stream) {
  if (!els.streamDetail) return;
  els.emptyDetail.hidden = true;
  els.emptyDetail.classList.add("is-hidden");
  els.nodeDetail.hidden = true;
  els.nodeDetail.classList.add("is-hidden");
  els.streamDetail.hidden = false;
  els.streamDetail.classList.remove("is-hidden");

  const from = nodeByTag.get(stream.from);
  const to = nodeByTag.get(stream.to);
  els.streamDetailType.textContent = safeText(stream.type, "Stream");
  els.streamDetailShape.textContent = formatStreamShapeLabel(normalizeStreamShape(stream.shape));
  els.streamDetailName.textContent = safeText(stream.label, `${stream.from} to ${stream.to}`);
  els.streamDetailId.textContent = safeText(stream.id, "-");
  els.streamDetailDescription.textContent = `${safeText(from?.name, stream.from)} → ${safeText(to?.name, stream.to)}`;
  els.streamDetailFrom.textContent = safeText(stream.from, "-");
  els.streamDetailTo.textContent = safeText(stream.to, "-");
  els.streamDetailPoints.textContent = String(Array.isArray(stream.points) ? stream.points.length : 0);
  els.streamDetailStroke.textContent = `${safeNumber(stream.strokeWidth, 4)} px`;
  renderStreamMassDetail(stream);
}

function renderStreamMassDetail(stream) {
  if (!els.streamMassDetail) return;
  els.streamMassDetail.replaceChildren();
  els.streamMassDetail.classList.remove("is-hidden");
  const range = stream.runtimeRange || evaluateStreamRange(stream);
  const runtimeFlowM3H = getFinalRuntimeStreamFlowM3H(stream);
  const runtimeFlowMBSD = getFinalRuntimeStreamFlowMBSD(stream);
  const runtimePercentCap = getFinalRuntimeStreamPercentCap(stream);
  const title = document.createElement("h3");
  title.textContent = "Mass Data";
  const grid = document.createElement("dl");
  grid.className = "detail-grid mass-balance-grid";
  [
    ["Flow", formatBalanceTriplet(runtimeFlowM3H, runtimeFlowMBSD, runtimePercentCap)],
    ["Legacy Flowrate", formatFlowrateValue(stream.flowrate, stream.flowUnit)],
    ["Temperature", stream.temperature ?? "-"],
    ["Pressure", stream.pressure ?? "-"],
    ["Density", stream.density ?? "-"],
    ["Density ton/m3", Number.isFinite(Number(stream.densityTonM3)) ? formatNumber(stream.densityTonM3, 4) : formatNumber(getDensityForStream(stream), 4)],
    ["Phase", normalizeStreamPhase(stream.phase)],
    ["Balance Category", normalizeBalanceCategory(stream.balanceCategory)],
    ["Is Calculated", stream.isCalculated ? "Yes" : "No"],
    ["Final Product", stream.isFinalProduct ? "Yes" : "No"],
    ["Product Table", stream.includeInProductTable ? "Yes" : "No"],
    ["Feed Table", stream.includeInFeedTable ? "Yes" : "No"],
  ].forEach(([label, value]) => {
    grid.appendChild(createDetailDefinition(label, value));
  });

  const behaviorTitle = document.createElement("h3");
  behaviorTitle.textContent = "Balance Behavior";
  const behaviorGrid = document.createElement("dl");
  behaviorGrid.className = "detail-grid mass-balance-grid";
  [
    ["Balance Role", normalizeStreamBalanceRole(stream.balanceRole)],
    ["Is Recycle", stream.isRecycle ? "Yes" : "No"],
    ["Node Balance", isNodeBalanceStream(stream) ? "included" : "excluded"],
    ["Unit Balance", isUnitBalanceStream(stream) ? "included" : "excluded"],
    ["Recycle Status", stream.isRecycle || normalizeStreamBalanceRole(stream.balanceRole) === "recycle" ? "Non-blocking recycle stream" : "-"],
  ].forEach(([label, value]) => {
    behaviorGrid.appendChild(createDetailDefinition(label, value));
  });

  const rangeTitle = document.createElement("h3");
  rangeTitle.textContent = "Operating Range";
  const rangeGrid = document.createElement("dl");
  rangeGrid.className = "detail-grid mass-balance-grid";
  [
    ["Downstream Use", safeText(stream.downstreamUse, "-")],
    ["Constraint Role", normalizeStreamConstraintRole(stream.constraintRole)],
    ["Constraint Group", safeText(stream.constraintGroup, "-")],
    ["Actual Flow", range.actual === null ? "-" : `${formatNumber(range.actual, range.unit === "MBSD" ? 2 : 1)} ${range.unit}`],
    ["Min", normalizeNullableNumber(stream.flowMin) === null ? "-" : `${formatNumber(stream.flowMin, 2)} ${range.unit}`],
    ["Target", normalizeNullableNumber(stream.flowTarget) === null ? "-" : `${formatNumber(stream.flowTarget, 2)} ${range.unit}`],
    ["Max", normalizeNullableNumber(stream.flowMax) === null ? "-" : `${formatNumber(stream.flowMax, 2)} ${range.unit}`],
    ["Temperature Range", formatRangeText(stream.temperatureMin, stream.temperatureTarget, stream.temperatureMax)],
    ["Pressure Range", formatRangeText(stream.pressureMin, stream.pressureTarget, stream.pressureMax)],
    ["Status", range.label],
    ["Message", range.message],
  ].forEach(([label, value]) => {
    rangeGrid.appendChild(createDetailDefinition(label, value));
  });

  const target = stream.runtimeTargetResult || {};
  const targetFlow = getStreamTargetFlow(stream);
  const targetTitle = document.createElement("h3");
  targetTitle.textContent = "Target Driven Balance";
  const targetGrid = document.createElement("dl");
  targetGrid.className = "detail-grid mass-balance-grid";
  [
    ["Range Mode", normalizeStreamRangeMode(stream.rangeMode)],
    ["Use as Calculation Target", isStreamCalculationTarget(stream) ? "Yes" : "No"],
    ["Target Flow", targetFlow === null ? "-" : `${formatNumber(targetFlow, 2)} ${normalizeStreamFlowRangeUnit(stream.flowRangeUnit)}`],
    ["Actual Flow", range.actual === null ? "-" : `${formatNumber(range.actual, range.unit === "MBSD" ? 2 : 1)} ${range.unit}`],
    ["Solve Mode", normalizeTargetSolveMode(stream.targetSolveMode)],
    ["Priority", Number.isFinite(Number(stream.calculationPriority)) ? formatNumber(stream.calculationPriority, 0) : "100"],
    ["Target Tolerance %", formatPercentValue(stream.targetTolerancePercent ?? DEFAULT_NODE_TOLERANCE_PERCENT)],
    ["Allow Auto Adjust", stream.allowAutoAdjust ? "Yes" : "No"],
    ["Locked Flow", normalizeNullableNumber(stream.lockedFlow) === null ? "-" : `${formatNumber(stream.lockedFlow, 2)} ${normalizeStreamFlowRangeUnit(stream.flowRangeUnit)}`],
    ["Solver Status", target.label || "-"],
    ["Solver Message", target.message || "-"],
  ].forEach(([label, value]) => {
    targetGrid.appendChild(createDetailDefinition(label, value));
  });
  els.streamMassDetail.append(title, grid, behaviorTitle, behaviorGrid, rangeTitle, rangeGrid, targetTitle, targetGrid);
}

function formatStreamShapeLabel(shape) {
  const labels = {
    polyline: "Polyline",
    cable: "Cable",
    bezier: "Bezier",
    straight: "Straight",
    autoStraight: "Auto Straight",
  };
  return labels[shape] || "Polyline";
}

function hideStreamDetail() {
  if (!els.streamDetail) return;
  els.streamDetail.hidden = true;
  els.streamDetail.classList.add("is-hidden");
  els.streamMassDetail?.classList.add("is-hidden");
}

function openDetailPanel(kind = "node") {
  if (!els.detailPanel) return;
  closeFloatingUiBeforeDetail();
  hideQuickInspector();
  els.detailPanel.classList.remove("is-hidden");
  els.detailPanel.classList.add("is-open");
  els.detailPanel.dataset.detailKind = kind;
  els.detailPanel.setAttribute("aria-hidden", "false");
  document.body.classList.add("detail-open");
}

function closeDetailPanel() {
  if (!els.detailPanel) return;
  els.detailPanel.classList.remove("is-open");
  els.detailPanel.classList.add("is-hidden");
  els.detailPanel.setAttribute("aria-hidden", "true");
  document.body.classList.remove("detail-open");
  renderQuickInspector();
}

function isDetailPanelOpen() {
  return Boolean(els.detailPanel?.classList.contains("is-open"));
}

function closeFloatingUiBeforeDetail() {
  try {
    closeViewOptionsPopover?.();
    closePidPalette?.();
    if (els.presentationInfoOverlay) els.presentationInfoOverlay.classList.add("is-hidden");
    document.querySelectorAll(".floating-panel, .context-toolbar, .stream-tooltip, .canvas-helper").forEach((element) => {
      if (!element.textContent.trim() && !element.children.length) {
        element.classList.add("is-hidden");
      }
    });
  } catch (error) {
    console.warn("Floating UI gagal ditutup sebelum detail panel:", error);
  }
}

function handleCanvasBackgroundClick(event) {
  if (isEditMode() && state.activePidTool) {
    const target = event.target;
    if (target.closest?.(".pid-symbol, .pid-palette, .admin-panel, .detail-panel, .view-options-popover, .stream-quick-constraint, button, input, textarea, select")) return;
    event.preventDefault();
    event.stopPropagation();
    const rect = els.canvasViewport.getBoundingClientRect();
    const point = screenToCanvas(event.clientX - rect.left, event.clientY - rect.top);
    addPidSymbolAt(point, state.activePidTool);
    return;
  }
  if (isEditMode() || state.nodeDragMoved) return;
  const target = event.target;
  if (target.closest?.(
    ".canvas-node, .canvas-stream, .stream-label, .stream-point-handle, .stream-endpoint-handle, .node-port, .pid-symbol, .pid-palette, .search-box, .detail-panel, .admin-panel, button, input, textarea, select"
  )) {
    return;
  }
  closeDetailPanel();
}

function isPresentationMode() {
  return document.body.classList.contains("is-presentation-mode");
}

function setPresentationMode(enabled, options = {}) {
  const next = Boolean(enabled);
  sessionStorage.setItem(PRESENTATION_SESSION_KEY, String(next));
  document.body.classList.toggle("is-presentation-mode", next);
  els.presentationToggle?.setAttribute("aria-pressed", String(next));
  if (els.presentationToggle) {
    els.presentationToggle.setAttribute("aria-label", next ? "Keluar presentation mode" : "Masuk presentation mode");
    els.presentationToggle.title = next ? "Exit Presentation" : "Presentation Mode";
    els.presentationToggle.classList.toggle("is-active", next);
  }
  els.presentationBar?.classList.toggle("is-hidden", !next);

  if (next) {
    els.adminPanel?.classList.add("is-hidden");
    closeViewOptionsPopover?.();
    closePidPalette?.();
    hideQuickInspector?.();
    closeDetailPanel?.();
    els.contextToolbar?.classList.add("is-hidden");
    state.streamEditMode = false;
    state.streamAddPointMode = false;
    state.streamEndpointPickMode = "";
    state.portConnectionDrag = null;
    state.portConnectionCandidate = null;
    state.selectedStreamPointIndex = -1;
    renderStreamPointEditor();
    renderPresentationAreaOptions();
    renderAreas();
    const selected = nodeById.get(state.selectedNodeId) || NODES[0];
    if (selected) {
      syncPresentationIndexForNode(selected.id);
      focusNode(selected.id);
      showPresentationOverlay(selected);
    } else {
      fitAll();
    }
    if (!options.silent) showToast("Presentation Mode aktif", "info");
  } else {
    hidePresentationOverlay();
    els.contextToolbar?.classList.add("is-hidden");
    renderAreas();
    if (!options.silent) showToast("Presentation Mode nonaktif", "info");
  }
  updateViewStatus();
  renderCduFloatingTables();
}

function renderPresentationAreaOptions() {
  if (!els.presentationAreaSelect) return;
  const current = state.activePresentationAreaId || "ALL";
  els.presentationAreaSelect.replaceChildren();
  const allOption = document.createElement("option");
  allOption.value = "ALL";
  allOption.textContent = "Semua Area";
  els.presentationAreaSelect.appendChild(allOption);
  AREAS.forEach((area) => {
    const option = document.createElement("option");
    option.value = area.id;
    option.textContent = `${area.id} - ${area.name}`;
    els.presentationAreaSelect.appendChild(option);
  });
  state.activePresentationAreaId = AREAS.some((area) => area.id === current) ? current : "ALL";
  els.presentationAreaSelect.value = state.activePresentationAreaId;
}

function focusPresentationArea() {
  if (state.activePresentationAreaId === "ALL") {
    fitAll();
    hidePresentationOverlay();
    return;
  }
  const area = AREAS.find((item) => item.id === state.activePresentationAreaId);
  if (!area) {
    fitAll();
    return;
  }
  fitRectToViewport(area.x, area.y, area.width, area.height, 150);
  renderAreas();
  const firstNode = getPresentationNodes()[0];
  if (firstNode) {
    selectNode(firstNode.id, { focus: false, skipPresentationFocus: true });
  }
}

function focusPresentationNode() {
  const selected = nodeById.get(state.selectedNodeId);
  if (selected && isNodeInPresentationScope(selected)) {
    selectNode(selected.id, { focus: true });
    return;
  }
  const node = getPresentationNodes()[state.presentationNodeIndex] || getPresentationNodes()[0];
  if (node) selectNode(node.id, { focus: true });
}

function stepPresentationNode(direction) {
  const nodes = getPresentationNodes();
  if (!nodes.length) return;
  state.presentationNodeIndex = (state.presentationNodeIndex + direction + nodes.length) % nodes.length;
  selectNode(nodes[state.presentationNodeIndex].id, { focus: true });
}

function getPresentationNodes() {
  if (state.activePresentationAreaId && state.activePresentationAreaId !== "ALL") {
    return NODES.filter((node) => node.unit === state.activePresentationAreaId);
  }
  return NODES;
}

function isNodeInPresentationScope(node) {
  return state.activePresentationAreaId === "ALL" || node.unit === state.activePresentationAreaId;
}

function syncPresentationIndexForNode(nodeId) {
  const nodes = getPresentationNodes();
  const index = nodes.findIndex((node) => node.id === nodeId);
  if (index >= 0) state.presentationNodeIndex = index;
}

function fitRectToViewport(x, y, width, height, padding = 120) {
  const rect = els.canvasViewport.getBoundingClientRect();
  if (!rect.width || !rect.height) return;
  const paddedWidth = Math.max(width + padding * 2, 1);
  const paddedHeight = Math.max(height + padding * 2, 1);
  state.zoom = clamp(Math.min(rect.width / paddedWidth, rect.height / paddedHeight), 0.18, 1.8);
  state.panX = rect.width / 2 - (x + width / 2) * state.zoom;
  state.panY = rect.height / 2 - (y + height / 2) * state.zoom;
  applyView();
}

function clearPresentationOverlayTimer() {
  if (!state.presentationOverlayTimer) return;
  window.clearTimeout(state.presentationOverlayTimer);
  state.presentationOverlayTimer = 0;
}

function schedulePresentationOverlayAutoHide() {
  clearPresentationOverlayTimer();
  if (!isPresentationMode() || state.presentationOverlayExpanded) return;
  state.presentationOverlayTimer = window.setTimeout(() => {
    if (!state.presentationOverlayExpanded) hidePresentationOverlay();
  }, 5200);
}

function togglePresentationOverlayExpanded(event) {
  event?.preventDefault?.();
  event?.stopPropagation?.();
  state.presentationOverlayExpanded = !state.presentationOverlayExpanded;
  els.presentationInfoOverlay?.classList.toggle("is-expanded", state.presentationOverlayExpanded);
  if (els.presentationOverlayMore) {
    els.presentationOverlayMore.textContent = state.presentationOverlayExpanded ? "Less" : "More";
  }
  if (state.presentationOverlayExpanded) clearPresentationOverlayTimer();
  else schedulePresentationOverlayAutoHide();
}

function showPresentationOverlay(node, options = {}) {
  if (!els.presentationInfoOverlay || !isPresentationMode()) return;
  state.presentationOverlayNodeId = node.id;
  els.presentationOverlayKicker.textContent = `${safeText(node.unit)} · ${safeText(node.type)}`;
  els.presentationOverlayName.textContent = safeText(node.name, "Equipment");
  els.presentationOverlayTag.textContent = safeText(node.tag, "-");
  els.presentationOverlayDescription.textContent = safeText(node.description, "Belum ada deskripsi equipment.");
  const balance = getMassBalanceResult(node) || node.balanceResult || node.localBalanceResult;
  const flowText = balance
    ? normalizeBalanceType(node.balanceType) === "productPool"
      ? formatMBSDValue(balance.totalInputMBSD)
      : formatMBSDValue(balance.totalOutputMBSD)
    : "Not Started";
  els.presentationOverlayKicker.textContent = `${safeText(node.tag, "-")} - ${safeText(node.name, "Equipment")}`;
  els.presentationOverlayName.textContent = `${safeText(node.type, "Equipment")} - Balance: ${formatMassBalanceResultStatus(balance)}`;
  els.presentationOverlayTag.textContent = `${safeText(node.unit, "-")} - ${flowText}`;
  els.presentationInfoOverlay.classList.toggle("is-expanded", state.presentationOverlayExpanded);
  if (els.presentationOverlayMore) {
    els.presentationOverlayMore.textContent = state.presentationOverlayExpanded ? "Less" : "More";
  }
  els.presentationInfoOverlay.classList.remove("is-hidden");
  if (!options.pan) schedulePresentationOverlayAutoHide();
  window.requestAnimationFrame(updatePresentationOverlayPosition);
}

function hidePresentationOverlay() {
  clearPresentationOverlayTimer();
  state.presentationOverlayNodeId = "";
  state.presentationOverlayExpanded = false;
  if (els.presentationOverlayMore) els.presentationOverlayMore.textContent = "More";
  els.presentationInfoOverlay?.classList.add("is-hidden");
  els.presentationInfoOverlay?.classList.remove("is-expanded");
}

function updatePresentationOverlayPosition() {
  return;
  if (!isPresentationMode() || !state.presentationOverlayNodeId || !els.presentationInfoOverlay) return;
  const target = els.nodeLayer.querySelector(`.canvas-node[data-node-id="${CSS.escape(state.presentationOverlayNodeId)}"]`);
  if (!target) return;
  const panelRect = target.closest(".canvas-panel").getBoundingClientRect();
  const targetRect = target.getBoundingClientRect();
  const overlay = els.presentationInfoOverlay;
  const overlayWidth = overlay.offsetWidth || 300;
  const overlayHeight = overlay.offsetHeight || 180;
  let left = targetRect.right - panelRect.left + 14;
  let top = targetRect.top - panelRect.top - 10;
  if (left + overlayWidth > panelRect.width - 12) {
    left = targetRect.left - panelRect.left - overlayWidth - 14;
  }
  if (top + overlayHeight > panelRect.height - 12) {
    top = panelRect.height - overlayHeight - 12;
  }
  left = clamp(left, 12, Math.max(12, panelRect.width - overlayWidth - 12));
  top = clamp(top, 12, Math.max(12, panelRect.height - overlayHeight - 12));
  overlay.style.left = `${Math.round(left)}px`;
  overlay.style.top = `${Math.round(top)}px`;
}

function handlePresentationKeyboard(event) {
  if (!isPresentationMode()) return;
  if (isTextInputActive() && event.key !== "Escape") return;

  if (event.key === "Escape") {
    event.preventDefault();
    setPresentationMode(false);
  } else if (event.key === "ArrowRight") {
    event.preventDefault();
    stepPresentationNode(1);
  } else if (event.key === "ArrowLeft") {
    event.preventDefault();
    stepPresentationNode(-1);
  } else if (event.key.toLowerCase() === "f") {
    event.preventDefault();
    fitAll();
  } else if (event.key.toLowerCase() === "r") {
    event.preventDefault();
    resetView();
  }
}

function handleGlobalKeyboard(event) {
  const ignoreShortcut = shouldIgnoreGlobalShortcut(event);
  if (event.key === "Escape") {
    if (state.quickConstraintPopover && !state.quickConstraintPopover.classList.contains("is-hidden")) {
      event.preventDefault();
      hideStreamQuickConstraintPopover();
      return;
    }
    if (ignoreShortcut && !state.portConnectionDrag && !state.streamReconnectDrag && !state.resizingNode) return;
    if (state.portConnectionDrag) {
      event.preventDefault();
      cancelPortConnectionDrag();
      return;
    }
    if (state.streamReconnectDrag) {
      event.preventDefault();
      cancelStreamReconnectDrag();
      return;
    }
    if (state.resizingNode) {
      event.preventDefault();
      cancelNodeResize();
      return;
    }
    if (state.streamAddPointMode || state.streamEndpointPickMode) {
      event.preventDefault();
      state.streamAddPointMode = false;
      state.streamEndpointPickMode = "";
      document.body.classList.remove("is-port-pick-mode");
      renderStreams();
      renderStreamPointEditor();
      showToast("Mode edit stream dibatalkan", "info");
      return;
    }
    if (isDialogOpen(els.shortcutModal)) {
      event.preventDefault();
      closeShortcutModal();
      return;
    }
    if (isDialogOpen(els.adminLoginModal)) {
      event.preventDefault();
      closeAdminLoginModal();
      return;
    }
    if (els.viewOptionsPopover && !els.viewOptionsPopover.classList.contains("is-hidden")) {
      event.preventDefault();
      closeViewOptionsPopover();
      return;
    }
    if (els.pidPalette && !els.pidPalette.classList.contains("is-hidden")) {
      event.preventDefault();
      state.activePidTool = "";
      closePidPalette();
      renderPidPalette();
      return;
    }
    if (els.searchResults && !els.searchResults.classList.contains("is-hidden")) {
      event.preventDefault();
      closeSearchResults();
      return;
    }
    if (isDetailPanelOpen()) {
      event.preventDefault();
      closeDetailPanel();
      return;
    }
    if (!isPresentationMode() && els.adminPanel && !els.adminPanel.classList.contains("is-hidden")) {
      event.preventDefault();
      els.adminPanel.classList.add("is-hidden");
      return;
    }
    if (isEditMode() && (state.selectedNodeId || state.activeStreamId)) {
      event.preventDefault();
      clearCanvasSelection();
      return;
    }
    return;
  }

  if (!ignoreShortcut && event.key === "Enter" && isEditMode()) {
    if (state.selectedNodeId || state.activeStreamId) {
      event.preventDefault();
      openSelectedDetail();
      return;
    }
  }

  if (!ignoreShortcut && isAdmin() && isEditMode() && (event.ctrlKey || event.metaKey)) {
    const key = event.key.toLowerCase();
    if (key === "z") {
      event.preventDefault();
      if (event.shiftKey) redo();
      else undo();
      return;
    }
    if (key === "y") {
      event.preventDefault();
      redo();
      return;
    }
    if (key === "c") {
      event.preventDefault();
      if (state.selectedPidSymbolId) {
        copySelectedPidSymbol();
        return;
      }
      copySelectedNode();
      return;
    }
    if (key === "v") {
      event.preventDefault();
      if (state.copiedPidSymbolTemplate) {
        pasteCopiedPidSymbol();
        return;
      }
      pasteCopiedNode();
      return;
    }
  }

  if (ignoreShortcut || event.ctrlKey || event.metaKey || event.altKey) return;
  if (isAdmin() && isEditMode()) {
    if (event.key.toLowerCase() === "g") {
      event.preventDefault();
      if (event.shiftKey) setSnapToGrid(!state.snapToGrid);
      else setGridVisible(!state.gridVisible);
      return;
    }
    if (event.key === "Delete" || event.key === "Backspace") {
      event.preventDefault();
      if (state.selectedPidSymbolId) {
        deleteSelectedPidSymbol();
      } else if (state.selectedStreamPointIndex >= 0) {
        deleteSelectedStreamPoint();
      } else if (getSelectedNodes().length) {
        deleteSelectedNode();
      } else if (state.activeStreamId) {
        deleteSelectedStream();
      }
      return;
    }
    if (event.key.toLowerCase() === "a") {
      event.preventDefault();
      addStreamPoint();
      return;
    }
    if (event.key.toLowerCase() === "r") {
      event.preventDefault();
      resetSelectedStreamPath();
      return;
    }
    if (event.key.toLowerCase() === "c") {
      event.preventDefault();
      startCreateStreamFromCanvas();
      return;
    }
  }
  if (event.key === "?") {
    event.preventDefault();
    openShortcutModal();
  }
}

function openShortcutModal() {
  if (!els.shortcutModal) return;
  els.shortcutModal.classList.remove("is-hidden");
  window.setTimeout(() => els.shortcutClose?.focus(), 40);
}

function closeShortcutModal() {
  els.shortcutModal?.classList.add("is-hidden");
  els.shortcutHelp?.focus();
}

function isDialogOpen(element) {
  return Boolean(element && !element.classList.contains("is-hidden"));
}

function renderStreamPointEditor() {
  if (!els.streamPointLayer) return;
  els.streamPointLayer.replaceChildren();
  const stream = STREAMS.find((item) => item.id === state.activeStreamId);
  if (!stream || !isEditMode()) {
    updateStreamPointStatus();
    return;
  }

  const fragment = document.createDocumentFragment();

  if (state.streamEditMode) {
    const points = ensureStreamPoints(stream);
    points.forEach((point, index) => {
      const handle = document.createElement("button");
      handle.type = "button";
      handle.className = "stream-point-handle";
      handle.dataset.streamId = stream.id;
      handle.dataset.index = String(index);
      handle.style.left = `${point.x}px`;
      handle.style.top = `${point.y}px`;
      handle.setAttribute("aria-label", `Titik belok stream ${index + 1}`);
      handle.classList.toggle("is-selected", index === state.selectedStreamPointIndex);
      handle.addEventListener("click", (event) => {
        event.preventDefault();
        event.stopPropagation();
        state.selectedStreamPointIndex = index;
        renderStreamPointEditor();
      });
      handle.addEventListener("pointerdown", (event) => {
        if (!isEditMode()) return;
        event.preventDefault();
        event.stopPropagation();
        state.selectedStreamPointIndex = index;
        state.draggedStreamPoint = {
          streamId: stream.id,
          index,
          pointerId: event.pointerId,
        };
        clearTextSelection();
        document.body.classList.add("is-canvas-dragging");
        setInteractionMode(true);
        try {
          handle.setPointerCapture?.(event.pointerId);
        } catch {
          // Synthetic tests and a few browsers can reject capture when no active pointer is registered.
        }
        renderStreamPointEditor();
      });
      fragment.appendChild(handle);
    });
  }

  renderStreamReconnectHandles(stream, fragment);

  els.streamPointLayer.appendChild(fragment);
  updateStreamPointStatus();
  renderContextToolbar();
}

function renderContextToolbar() {
  if (!els.contextToolbar) return;
  els.contextToolbar.replaceChildren();
  els.contextToolbar.classList.remove("node-context-card", "stream-context-toolbar");
  state.activeNodeContext = { nodeId: null, mode: "context" };
  if (!isAdmin() || !isEditMode() || isTextInputActive() || isCanvasInteractionBusy()) {
    els.contextToolbar.classList.add("is-hidden");
    return;
  }

  const selectedNodes = getSelectedNodes();
  const stream = STREAMS.find((item) => item.id === state.activeStreamId);
  if (selectedNodes.length) {
    renderNodeContextToolbar(selectedNodes);
    return;
  }
  if (stream && state.streamEditMode) {
    renderStreamContextToolbar(stream);
    return;
  }
  els.contextToolbar.classList.add("is-hidden");
}

function renderNodeContextToolbar(nodes) {
  const primary = nodeById.get(state.selectedNodeId) || nodes[0];
  if (!primary) return;
  state.activeNodeContext = { nodeId: primary.id, mode: "context" };
  hideQuickInspector();
  els.contextToolbar.classList.add("node-context-card");
  const balance = getMassBalanceResult(primary) || primary.balanceResult || primary.localBalanceResult;
  const header = document.createElement("div");
  header.className = "node-context-header";
  const titleGroup = document.createElement("div");
  const title = document.createElement("h3");
  title.textContent = safeText(primary.tag, "Node");
  const meta = document.createElement("p");
  meta.className = "node-context-meta";
  meta.textContent = `${safeText(primary.type, "Equipment")} · ${safeText(primary.unit, "-")} · ${normalizeBalanceType(primary.balanceType)}`;
  titleGroup.append(title, meta);
  const close = document.createElement("button");
  close.type = "button";
  close.className = "node-context-close";
  close.textContent = "x";
  close.setAttribute("aria-label", "Tutup context card");
  close.addEventListener("click", (event) => {
    event.preventDefault();
    event.stopPropagation();
    clearCanvasSelection();
  });
  header.append(titleGroup, close);
  els.contextToolbar.appendChild(header);

  const stats = document.createElement("div");
  stats.className = "node-context-balance";
  if (balance) {
    const input = formatM3HValue(balance.totalInputM3H);
    const output = formatM3HValue(balance.totalOutputM3H);
    stats.textContent = normalizeBalanceType(primary.balanceType) === "productPool"
      ? `Received ${formatM3HValue(balance.totalInputM3H)} · ${formatMassBalanceResultStatus(balance)}`
      : `In ${input} · Out ${output} · ${formatMassBalanceResultStatus(balance)}`;
    stats.dataset.status = balance.status || "incomplete";
  } else {
    stats.textContent = "Balance not started";
    stats.dataset.status = "notStarted";
  }
  els.contextToolbar.appendChild(stats);

  const actions = document.createElement("div");
  actions.className = "node-context-actions";
  els.contextToolbar.appendChild(actions);
  [
    { label: "Edit", title: "Edit node", action: () => { showAdminPanel(); switchAdminTab("node"); } },
    { label: "Detail", title: "Detail node", action: openSelectedDetail },
    { label: "Duplicate", title: "Duplicate node", action: duplicateSelectedNode },
    { label: primary.locked ? "Unlock" : "Lock", title: primary.locked ? "Unlock node" : "Lock node", action: () => toggleSelectedNodesLock(!primary.locked) },
    { label: "Delete", title: "Delete node", action: deleteSelectedNode, tone: "danger" },
  ].forEach((item) => appendNodeContextAction(actions, item));
  positionContextToolbarForRect(getSelectionBounds(nodes));
}

function renderStreamContextToolbar(stream) {
  els.contextToolbar.classList.add("stream-context-toolbar");
  [
    { icon: "edit", title: "Edit stream", action: () => { showAdminPanel(); switchAdminTab("stream"); } },
    { icon: "addPoint", title: "Add stream point", action: addStreamPoint },
    { icon: "resetRoute", title: "Reset route", action: resetSelectedStreamPath },
    { icon: stream.shape === "cable" ? "polyline" : "cable", title: "Toggle cable/polyline", action: () => convertSelectedStreamShape(stream.shape === "cable" ? "polyline" : "cable") },
    { separator: true },
    { icon: "trash", title: "Delete stream", action: deleteSelectedStream },
  ].forEach((item) => (item.separator ? appendContextSeparator() : appendContextButton(item)));
  const anchor = getStreamLabelAnchor(stream) || getStreamEndpointPoints(stream)?.start;
  positionContextToolbarForPoint(anchor || { x: 40, y: 40 });
}

function appendNodeContextAction(container, { label, title, action, tone = "" }) {
  const button = document.createElement("button");
  button.type = "button";
  button.textContent = label;
  button.title = title;
  button.className = tone === "danger" ? "is-danger" : "";
  button.addEventListener("click", (event) => {
    event.preventDefault();
    event.stopPropagation();
    action?.();
  });
  container.appendChild(button);
}

function appendContextButton({ icon, label, title, action }) {
  const button = document.createElement("button");
  button.type = "button";
  button.innerHTML = getContextToolbarIcon(icon) || `<span>${safeText(label, "?")}</span>`;
  button.title = title;
  button.setAttribute("aria-label", title);
  button.addEventListener("click", (event) => {
    event.preventDefault();
    event.stopPropagation();
    action?.();
  });
  els.contextToolbar.appendChild(button);
}

function appendContextSeparator() {
  const separator = document.createElement("span");
  separator.className = "context-toolbar-separator";
  separator.setAttribute("aria-hidden", "true");
  els.contextToolbar.appendChild(separator);
}

function getContextToolbarIcon(name) {
  const icons = {
    edit: `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 20h9"></path><path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4Z"></path></svg>`,
    copy: `<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="9" y="9" width="11" height="11" rx="2"></rect><rect x="4" y="4" width="11" height="11" rx="2"></rect></svg>`,
    duplicate: `<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="8" y="8" width="10" height="10" rx="2"></rect><path d="M6 16H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path><path d="M13 11v4"></path><path d="M11 13h4"></path></svg>`,
    lock: `<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="5" y="10" width="14" height="10" rx="2"></rect><path d="M8 10V7a4 4 0 0 1 8 0v3"></path></svg>`,
    unlock: `<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="5" y="10" width="14" height="10" rx="2"></rect><path d="M8 10V7a4 4 0 0 1 7.5-2"></path></svg>`,
    alignLeft: `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 4v16"></path><path d="M9 7h10"></path><path d="M9 12h7"></path><path d="M9 17h11"></path></svg>`,
    alignCenter: `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 4v16"></path><path d="M7 7h10"></path><path d="M9 12h6"></path><path d="M6 17h12"></path></svg>`,
    alignRight: `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M19 4v16"></path><path d="M5 7h10"></path><path d="M8 12h7"></path><path d="M4 17h11"></path></svg>`,
    alignTop: `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 5h16"></path><path d="M7 9v10"></path><path d="M12 9v7"></path><path d="M17 9v11"></path></svg>`,
    alignMiddle: `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 12h16"></path><path d="M7 5v14"></path><path d="M12 7v10"></path><path d="M17 4v16"></path></svg>`,
    alignBottom: `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 19h16"></path><path d="M7 5v10"></path><path d="M12 8v7"></path><path d="M17 4v11"></path></svg>`,
    distributeHorizontal: `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 5v14"></path><path d="M20 5v14"></path><rect x="7" y="8" width="3" height="8" rx="1"></rect><rect x="14" y="8" width="3" height="8" rx="1"></rect></svg>`,
    distributeVertical: `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 4h14"></path><path d="M5 20h14"></path><rect x="8" y="7" width="8" height="3" rx="1"></rect><rect x="8" y="14" width="8" height="3" rx="1"></rect></svg>`,
    trash: `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 7h16"></path><path d="M10 11v6"></path><path d="M14 11v6"></path><path d="M6 7l1 14h10l1-14"></path><path d="M9 7V4h6v3"></path></svg>`,
    addPoint: `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 12h16"></path><circle cx="12" cy="12" r="3"></circle><path d="M12 7v10"></path><path d="M7 12h10"></path></svg>`,
    resetRoute: `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 4v6h6"></path><path d="M5.5 14a7 7 0 1 0 1.7-7.1L4 10"></path></svg>`,
    cable: `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 16C8 4 16 20 20 8"></path></svg>`,
    polyline: `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 17h6V7h10"></path></svg>`,
  };
  return icons[name] || "";
}

function getSelectionBounds(nodes) {
  const rects = nodes.map((node) => getScopedNodeLayout(node)).filter(isFiniteRect);
  if (!rects.length) return null;
  const minX = Math.min(...rects.map((rect) => rect.x));
  const minY = Math.min(...rects.map((rect) => rect.y));
  const maxX = Math.max(...rects.map((rect) => rect.x + rect.width));
  const maxY = Math.max(...rects.map((rect) => rect.y + rect.height));
  return { x: minX, y: minY, width: maxX - minX, height: maxY - minY };
}

function positionContextToolbarForRect(rect) {
  if (!rect) {
    els.contextToolbar.classList.add("is-hidden");
    return;
  }
  positionContextToolbarForAnchor({
    x: rect.x,
    y: rect.y,
    width: rect.width,
    height: rect.height,
  });
}

function positionContextToolbarForPoint(point) {
  if (!point) return;
  positionContextToolbarForAnchor({
    x: point.x,
    y: point.y,
    width: 1,
    height: 1,
  });
}

function rectsOverlap(rectA, rectB) {
  if (!rectA || !rectB) return false;
  return rectA.left < rectB.right
    && rectA.right > rectB.left
    && rectA.top < rectB.bottom
    && rectA.bottom > rectB.top;
}

function getFloatingTableRect() {
  if (!els.cduFloatingTables || els.cduFloatingTables.classList.contains("is-hidden")) return null;
  if (state.cduTablesVisible === false) return null;
  return els.cduFloatingTables.getBoundingClientRect();
}

function canvasRectToViewportRect(left, top, width, height) {
  const viewportRect = els.canvasViewport?.getBoundingClientRect();
  const zoom = Number.isFinite(state.zoom) && state.zoom > 0 ? state.zoom : 1;
  if (!viewportRect) return null;
  return {
    left: viewportRect.left + state.panX + left * zoom,
    top: viewportRect.top + state.panY + top * zoom,
    right: viewportRect.left + state.panX + (left + width) * zoom,
    bottom: viewportRect.top + state.panY + (top + height) * zoom,
  };
}

function positionContextToolbarForAnchor(anchor) {
  if (!anchor || !els.contextToolbar || !els.canvasViewport) return;
  els.contextToolbar.classList.remove("is-hidden");
  els.contextToolbar.style.visibility = "hidden";
  els.contextToolbar.style.left = "0px";
  els.contextToolbar.style.top = "0px";

  const toolbarRect = els.contextToolbar.getBoundingClientRect();
  const viewportRect = els.canvasViewport.getBoundingClientRect();
  const zoom = Number.isFinite(state.zoom) && state.zoom > 0 ? state.zoom : 1;
  const toolbarWidth = toolbarRect.width / zoom;
  const toolbarHeight = toolbarRect.height / zoom;
  const viewportBounds = {
    x: -state.panX / zoom,
    y: -state.panY / zoom,
    width: viewportRect.width / zoom,
    height: viewportRect.height / zoom,
  };
  const margin = 8 / zoom;
  const gap = 10 / zoom;
  const clampCandidate = (candidate) => ({
    left: clamp(candidate.left, viewportBounds.x + margin, viewportBounds.x + viewportBounds.width - toolbarWidth - margin),
    top: clamp(candidate.top, viewportBounds.y + margin, viewportBounds.y + viewportBounds.height - toolbarHeight - margin),
  });
  const candidates = [
    { left: anchor.x + anchor.width + gap, top: anchor.y + anchor.height / 2 - toolbarHeight / 2 },
    { left: anchor.x - toolbarWidth - gap, top: anchor.y + anchor.height / 2 - toolbarHeight / 2 },
    { left: anchor.x + anchor.width / 2 - toolbarWidth / 2, top: anchor.y + anchor.height + gap },
    { left: anchor.x + anchor.width / 2 - toolbarWidth / 2, top: anchor.y - toolbarHeight - gap },
    {
      left: viewportBounds.x + viewportBounds.width - toolbarWidth - margin,
      top: viewportBounds.y + viewportBounds.height - toolbarHeight - margin,
    },
  ].map(clampCandidate);
  const floatingRect = getFloatingTableRect();
  const selected = candidates.find((candidate) => {
    const screenRect = canvasRectToViewportRect(candidate.left, candidate.top, toolbarWidth, toolbarHeight);
    return !floatingRect || !rectsOverlap(screenRect, floatingRect);
  }) || candidates[candidates.length - 1];
  let left = selected.left;
  let top = selected.top;
  els.contextToolbar.style.left = `${Math.round(left)}px`;
  els.contextToolbar.style.top = `${Math.round(top)}px`;
  els.contextToolbar.style.visibility = "";
  els.contextToolbar.classList.remove("is-hidden");
}

function hideQuickInspector() {
  els.quickInspector?.classList.add("is-hidden");
}

function hideNodeContextMenu() {
  state.activeNodeContext = { nodeId: null, mode: "context" };
  els.contextToolbar?.classList.add("is-hidden");
}

function showNodeContextMenu(nodeId, options = {}) {
  const node = nodeById.get(nodeId) || resolveBalanceNode(nodeId);
  if (!node || isPresentationMode()) return;
  state.selectedNodeId = node.id;
  state.selectedNode = node.id;
  state.selectedNodeTags.clear();
  state.selectedNodeTags.add(node.tag);
  renderContextToolbar();
  hideQuickInspector();
  if (options.focus) focusNode(node.id);
}

function renderNodeContextMenu(node) {
  if (!node) return;
  renderNodeContextToolbar([node]);
}

function clearCanvasSelection() {
  state.selectedNodeId = "";
  state.selectedNode = "";
  state.selectedNodeTags.clear();
  state.activeStreamId = "";
  state.selectedStream = "";
  state.streamEditMode = false;
  state.selectedStreamPointIndex = -1;
  setActiveNode("");
  renderStreams();
  renderStreamPointEditor();
  renderContextToolbar();
  hideNodeContextMenu();
  hideQuickInspector();
  updateViewStatus();
}

function renderQuickInspector() {
  if (!els.quickInspector || !els.quickInspectorActions) return;
  els.quickInspectorActions.replaceChildren();
  const hasNodeContext = state.activeNodeContext?.nodeId && !els.contextToolbar?.classList.contains("is-hidden");
  if (hasNodeContext) {
    hideQuickInspector();
    return;
  }
  if (!isEditMode() || !state.canvasFirstEdit || isDetailPanelOpen() || isPresentationMode()) {
    hideQuickInspector();
    return;
  }

  const node = nodeById.get(state.selectedNodeId);
  if (node) {
    renderQuickInspectorNode(node);
    return;
  }

  const stream = STREAMS.find((item) => item.id === state.activeStreamId);
  if (stream && state.streamEditMode) {
    renderQuickInspectorStream(stream);
    return;
  }

  hideQuickInspector();
}

function renderQuickInspectorNode(node) {
  const selectedCount = getSelectedNodes().length;
  els.quickInspectorKicker.textContent = selectedCount > 1 ? `${selectedCount} nodes selected` : "Node";
  els.quickInspectorTitle.textContent = safeText(node.tag, "Node");
  const balance = getMassBalanceResult(node);
  const meta = [`${safeText(node.type, "Equipment")} - ${safeText(node.unit, "-")} - ${normalizeBalanceType(node.balanceType)}`];
  if (balance) {
    if (isCduOverallBalanceNode(node)) {
      const runState = normalizeCduRunState(state.cduRunState);
      const assay = CDU_CRUDE_ASSAYS[runState.selectedCrudeType] || CDU_CRUDE_ASSAYS.medium;
      const productTotal = summarizeVolumetricRows(buildCduProductMassBalanceTable());
      meta.push(`${assay.name}: ${formatM3HValue(runState.crudeIntakeM3H)} | Product ${formatM3HValue(productTotal.m3h)}`);
    }
    if (normalizeBalanceType(node.balanceType) === "productPool") {
      meta.push(`Received: ${formatBalanceTriplet(balance.totalInputM3H, balance.totalInputMBSD, balance.inputPercentCap)}`);
    } else {
      meta.push(`In ${formatM3HValue(balance.totalInputM3H)} | Out ${formatM3HValue(balance.totalOutputM3H)} | ${formatMassBalanceResultStatus(balance)}`);
    }
    meta.push(`Error: ${balance.errorPercent === null ? "-" : formatPercentValue(balance.errorPercent)}`);
  }
  els.quickInspectorMeta.textContent = meta.join("\n");
  els.quickInspector.classList.remove("is-hidden");
}

function renderQuickInspectorStream(stream) {
  els.quickInspectorKicker.textContent = "Stream";
  els.quickInspectorTitle.textContent = safeText(stream.id, "Stream");
  els.quickInspectorMeta.textContent = `${safeText(stream.from, "?")} -> ${safeText(stream.to, "?")} - ${formatStreamShapeLabel(normalizeStreamShape(stream.shape))}`;
  appendQuickInspectorButton("Edit", () => expandAdminPanel("stream"));
  appendQuickInspectorButton("Detail", () => openSelectedDetail());
  appendQuickInspectorButton("Reset Route", resetSelectedStreamPath);
  appendQuickInspectorButton("Delete", deleteSelectedStream, "danger");
  els.quickInspector.classList.remove("is-hidden");
}

function appendQuickInspectorButton(label, action, tone = "") {
  const button = document.createElement("button");
  button.type = "button";
  button.textContent = label;
  button.className = tone === "danger" ? "quick-inspector-button is-danger" : "quick-inspector-button";
  button.addEventListener("click", (event) => {
    event.preventDefault();
    event.stopPropagation();
    action?.();
  });
  els.quickInspectorActions.appendChild(button);
}

function openSelectedDetail() {
  const node = nodeById.get(state.selectedNodeId);
  if (node) {
    renderDetail(node);
    hideStreamDetail();
    openDetailPanel("node");
    return;
  }
  const stream = STREAMS.find((item) => item.id === state.activeStreamId);
  if (stream) {
    renderStreamDetail(stream);
    openDetailPanel("stream");
  }
}

function alignSelectedNodes(mode) {
  if (!requireEditMode("Align Nodes")) return;
  const nodes = getSelectedNodes().filter((node) => !node.locked);
  if (nodes.length < 2) {
    showToast("Pilih minimal 2 node untuk align", "warning");
    return;
  }
  pushUndoSnapshot("Align nodes");
  const bounds = getSelectionBounds(nodes);
  nodes.forEach((node) => {
    if (mode === "left") node.x = bounds.x;
    if (mode === "center") node.x = bounds.x + bounds.width / 2 - getNodeWidth(node) / 2;
    if (mode === "right") node.x = bounds.x + bounds.width - getNodeWidth(node);
    if (mode === "top") node.y = bounds.y;
    if (mode === "middle") node.y = bounds.y + bounds.height / 2 - getNodeHeight(node) / 2;
    if (mode === "bottom") node.y = bounds.y + bounds.height - getNodeHeight(node);
    const snapped = snapPoint({ x: node.x, y: node.y });
    node.x = Math.round(snapped.x);
    node.y = Math.round(snapped.y);
    syncConnectedStreamEndpointPoints(node.tag);
  });
  commitDataChange("Node disejajarkan", { skipHistory: true, focusSelected: false });
}

function distributeSelectedNodes(axis) {
  if (!requireEditMode("Distribute Nodes")) return;
  const nodes = getSelectedNodes().filter((node) => !node.locked);
  if (nodes.length < 3) {
    showToast("Pilih minimal 3 node untuk distribute", "warning");
    return;
  }
  pushUndoSnapshot("Distribute nodes");
  const sorted = [...nodes].sort((a, b) => axis === "horizontal" ? a.x - b.x : a.y - b.y);
  const first = sorted[0];
  const last = sorted[sorted.length - 1];
  const firstCenter = axis === "horizontal" ? first.x + getNodeWidth(first) / 2 : first.y + getNodeHeight(first) / 2;
  const lastCenter = axis === "horizontal" ? last.x + getNodeWidth(last) / 2 : last.y + getNodeHeight(last) / 2;
  const gap = (lastCenter - firstCenter) / (sorted.length - 1);
  sorted.forEach((node, index) => {
    if (index === 0 || index === sorted.length - 1) return;
    const center = firstCenter + gap * index;
    if (axis === "horizontal") node.x = Math.round(center - getNodeWidth(node) / 2);
    else node.y = Math.round(center - getNodeHeight(node) / 2);
    const snapped = snapPoint({ x: node.x, y: node.y });
    node.x = snapped.x;
    node.y = snapped.y;
    syncConnectedStreamEndpointPoints(node.tag);
  });
  commitDataChange(axis === "horizontal" ? "Node didistribusi horizontal" : "Node didistribusi vertikal", { skipHistory: true, focusSelected: false });
}

function toggleSelectedNodesLock(locked) {
  if (!requireEditMode(locked ? "Lock Node" : "Unlock Node")) return;
  const nodes = getSelectedNodes();
  if (!nodes.length) return;
  pushUndoSnapshot(locked ? "Lock nodes" : "Unlock nodes");
  nodes.forEach((node) => {
    node.locked = Boolean(locked);
  });
  commitDataChange(locked ? "Node dikunci" : "Node dibuka", { skipHistory: true, focusSelected: false });
}

function renderStreamReconnectHandles(stream, fragment) {
  const endpoints = getStreamEndpointPoints(stream);
  if (!endpoints) return;

  [
    { endpoint: "from", label: "From", point: endpoints.start },
    { endpoint: "to", label: "To", point: endpoints.end },
  ].forEach((item) => {
    const handle = document.createElement("button");
    handle.type = "button";
    handle.className = `stream-endpoint-handle stream-endpoint-${item.endpoint}`;
    handle.dataset.streamId = stream.id;
    handle.dataset.endpoint = item.endpoint;
    handle.style.left = `${item.point.x}px`;
    handle.style.top = `${item.point.y}px`;
    handle.textContent = item.label;
    handle.setAttribute("aria-label", `${item.label} handle stream ${stream.id}`);
    handle.addEventListener("click", (event) => {
      event.preventDefault();
      event.stopPropagation();
      selectStream(stream.id, { syncAdmin: true });
    });
    handle.addEventListener("pointerdown", (event) => startStreamReconnectDrag(event, stream, item.endpoint, item.point));
    fragment.appendChild(handle);
  });
}

function startStreamReconnectDrag(event, stream, endpoint, point) {
  if (!isAdmin() || !isEditMode()) return;
  event.preventDefault();
  event.stopPropagation();
  selectStream(stream.id, { syncAdmin: true });
  state.streamReconnectDrag = {
    streamId: stream.id,
    endpoint,
    pointerId: event.pointerId,
    originalFrom: stream.from,
    originalTo: stream.to,
    originalFromPort: stream.fromPort,
    originalToPort: stream.toPort,
    originalPoints: Array.isArray(stream.points) ? deepClone(stream.points) : null,
    originalLabel: safeText(stream.label, ""),
    autoLabel: isAutoGeneratedStreamLabel(stream),
    currentPoint: { x: point.x, y: point.y },
  };
  state.draggedStreamPoint = null;
  state.draggedNodeId = null;
  state.streamReconnectCandidateTag = "";
  clearTextSelection();
  document.body.classList.add("is-stream-reconnect-dragging");
  document.body.classList.add("is-canvas-dragging");
  try {
    event.currentTarget.setPointerCapture?.(event.pointerId);
  } catch {
    // Some browsers reject pointer capture if the pointer is already captured elsewhere.
  }
  renderStreams();
  renderStreamPointEditor();
}

function updateStreamReconnectDrag(event) {
  const drag = state.streamReconnectDrag;
  if (!drag) return;

  const rect = els.canvasViewport.getBoundingClientRect();
  const point = screenToCanvas(event.clientX - rect.left, event.clientY - rect.top);
  drag.currentPoint = {
    x: Math.round(point.x),
    y: Math.round(point.y),
  };

  const expectedType = drag.endpoint === "from" ? "output" : "input";
  const candidate = getPortAtClientPoint(event.clientX, event.clientY, expectedType);
  state.streamReconnectCandidateTag = candidate?.tag || "";
  updateStreamReconnectCandidateVisual(candidate);
  renderStreams();
}

function finishStreamReconnectDrag(event) {
  const drag = state.streamReconnectDrag;
  if (!drag) return;

  const stream = STREAMS.find((item) => item.id === drag.streamId);
  const expectedType = drag.endpoint === "from" ? "output" : "input";
  const candidate = getPortAtClientPoint(event.clientX, event.clientY, expectedType);
  const candidateTag = candidate?.tag || "";
  const validation = validatePortReconnectCandidate(stream, drag.endpoint, candidateTag, candidate?.portId, expectedType);

  clearStreamReconnectCandidateVisual();
  document.body.classList.remove("is-stream-reconnect-dragging");
  document.body.classList.remove("is-canvas-dragging");
  clearTextSelection();
  state.streamReconnectDrag = null;
  state.streamReconnectCandidateTag = "";

  if (!stream) {
    renderStreams();
    renderStreamPointEditor();
    return;
  }

  if (!candidateTag) {
    showToast("Reconnect stream dibatalkan", "info");
    renderStreams();
    renderStreamPointEditor();
    return;
  }

  if (!validation.valid) {
    showToast(validation.message, "error");
    renderStreams();
    renderStreamPointEditor();
    return;
  }

  applyStreamEndpoint(stream, drag.endpoint, candidateTag, candidate.portId);

  if (drag.autoLabel) {
    stream.label = `${stream.from} -> ${stream.to}`;
  }
  syncStreamEndpointPoints(stream);
  state.activeStreamId = stream.id;
  state.selectedStreamPointIndex = -1;
  syncAdminStreamForm(stream);
  renderStreams();
  renderStreamPointEditor();
  renderStreamDetail(stream);
  updateStreamPointStatus();
  commitDataChange("Koneksi stream diperbarui", { keepStream: true });
}

function cancelStreamReconnectDrag(message = "Reconnect stream dibatalkan") {
  const drag = state.streamReconnectDrag;
  if (!drag) return;
  const stream = STREAMS.find((item) => item.id === drag.streamId);
  if (stream) {
    stream.from = drag.originalFrom;
    stream.to = drag.originalTo;
    stream.fromPort = drag.originalFromPort;
    stream.toPort = drag.originalToPort;
    stream.label = drag.originalLabel;
    if (drag.originalPoints) {
      stream.points = deepClone(drag.originalPoints);
    }
  }
  state.streamReconnectDrag = null;
  state.streamReconnectCandidateTag = "";
  clearStreamReconnectCandidateVisual();
  document.body.classList.remove("is-stream-reconnect-dragging");
  document.body.classList.remove("is-canvas-dragging");
  clearTextSelection();
  renderStreams();
  renderStreamPointEditor();
  if (stream) renderStreamDetail(stream);
  showToast(message, "info");
}

function getNodeAtClientPoint(clientX, clientY) {
  const nodes = [...els.nodeLayer.querySelectorAll(".canvas-node")];
  const element = nodes.find((nodeElement) => {
    const rect = nodeElement.getBoundingClientRect();
    return clientX >= rect.left && clientX <= rect.right && clientY >= rect.top && clientY <= rect.bottom;
  });
  if (!element) return null;
  return nodeById.get(element.dataset.nodeId) || null;
}

function updateStreamReconnectCandidateVisual(candidate) {
  clearStreamReconnectCandidateVisual();
  if (!candidate || !state.streamReconnectDrag) return;
  const selector = `.node-port[data-tag="${CSS.escape(candidate.tag)}"][data-port-id="${CSS.escape(candidate.portId)}"]`;
  const element = els.nodeLayer.querySelector(selector);
  if (!element) return;
  const validation = validatePortReconnectCandidate(
    STREAMS.find((stream) => stream.id === state.streamReconnectDrag.streamId),
    state.streamReconnectDrag.endpoint,
    candidate.tag,
    candidate.portId,
    candidate.portType,
  );
  element.classList.add(validation.valid ? "is-port-candidate" : "is-port-invalid");
}

function clearStreamReconnectCandidateVisual() {
  els.nodeLayer.querySelectorAll(".is-reconnect-candidate, .is-reconnect-invalid, .is-port-candidate, .is-port-invalid").forEach((element) => {
    element.classList.remove("is-reconnect-candidate", "is-reconnect-invalid", "is-port-candidate", "is-port-invalid");
  });
}

function validateReconnectCandidate(stream, endpoint, candidateTag) {
  if (!stream) return { valid: false, message: "Stream tidak ditemukan" };
  if (!candidateTag || !nodeByTag.has(candidateTag)) return { valid: false, message: "Lepaskan handle di atas node valid" };
  if (endpoint === "from" && candidateTag === stream.from) {
    return { valid: false, message: "From node sudah memakai node tersebut" };
  }
  if (endpoint === "to" && candidateTag === stream.to) {
    return { valid: false, message: "To node sudah memakai node tersebut" };
  }
  if (endpoint === "from" && candidateTag === stream.to) {
    return { valid: false, message: "From node tidak boleh sama dengan To node" };
  }
  if (endpoint === "to" && candidateTag === stream.from) {
    return { valid: false, message: "To node tidak boleh sama dengan From node" };
  }
  return { valid: true, message: "" };
}

function validatePortReconnectCandidate(stream, endpoint, candidateTag, candidatePort, portType) {
  if (!stream) return { valid: false, message: "Stream tidak ditemukan" };
  if (!candidateTag || !nodeByTag.has(candidateTag)) return { valid: false, message: "Lepaskan handle di atas port valid" };
  if (endpoint === "from" && portType !== "output") return { valid: false, message: "From harus memakai output port" };
  if (endpoint === "to" && portType !== "input") return { valid: false, message: "To harus memakai input port" };
  if (endpoint === "from" && candidateTag === stream.to) {
    return { valid: false, message: "From node tidak boleh sama dengan To node" };
  }
  if (endpoint === "to" && candidateTag === stream.from) {
    return { valid: false, message: "To node tidak boleh sama dengan From node" };
  }
  if (endpoint === "from" && candidateTag === stream.from && candidatePort === stream.fromPort) {
    return { valid: false, message: "From port sudah memakai port tersebut" };
  }
  if (endpoint === "to" && candidateTag === stream.to && candidatePort === stream.toPort) {
    return { valid: false, message: "To port sudah memakai port tersebut" };
  }
  const node = nodeByTag.get(candidateTag);
  const direction = endpoint === "from" ? "outputs" : "inputs";
  if (!getValidPortId(node, direction, candidatePort)) return { valid: false, message: "Port tujuan tidak valid" };
  return { valid: true, message: "" };
}

function applyStreamEndpoint(stream, endpoint, tag, portId) {
  if (endpoint === "from") {
    stream.from = tag;
    stream.fromPort = portId;
  } else {
    stream.to = tag;
    stream.toPort = portId;
  }
  if (isAutoGeneratedStreamLabel(stream)) {
    stream.label = `${stream.from} -> ${stream.to}`;
  }
  syncStreamEndpointPoints(stream);
}

function getPortAtClientPoint(clientX, clientY, expectedType = "") {
  const ports = [...els.nodeLayer.querySelectorAll(".node-port")];
  const element = ports.find((portElement) => {
    if (expectedType && portElement.dataset.portType !== expectedType) return false;
    const rect = portElement.getBoundingClientRect();
    return clientX >= rect.left - 4 && clientX <= rect.right + 4
      && clientY >= rect.top - 4 && clientY <= rect.bottom + 4;
  });
  if (!element) return null;
  return {
    tag: element.dataset.tag,
    nodeId: element.dataset.nodeId,
    portId: element.dataset.portId,
    portType: element.dataset.portType,
  };
}

function updatePortCandidateVisual(candidate, isValidFn = () => true) {
  clearPortCandidateVisual();
  if (!candidate) return;
  const selector = `.node-port[data-tag="${CSS.escape(candidate.tag)}"][data-port-id="${CSS.escape(candidate.portId)}"]`;
  const element = els.nodeLayer.querySelector(selector);
  if (!element) return;
  element.classList.add(isValidFn(candidate) ? "is-port-candidate" : "is-port-invalid");
}

function clearPortCandidateVisual() {
  els.nodeLayer.querySelectorAll(".is-port-candidate, .is-port-invalid").forEach((element) => {
    element.classList.remove("is-port-candidate", "is-port-invalid");
  });
}

function createStreamBetweenPorts(from, fromPort, to, toPort) {
  if (!from || !to || from === to) return null;
  const id = makeStreamId();
  const fromNode = nodeByTag.get(from);
  const toNode = nodeByTag.get(to);
  const stream = {
    id,
    label: `${from} -> ${to}`,
    from,
    fromPort,
    to,
    toPort,
    type: "liquid",
    category: "main",
    shape: getShapeForNewPortStream(fromNode, fromPort, toNode, toPort, "cable"),
    strokeWidth: 2,
    points: [],
    autoRoute: true,
    avoidNodes: true,
    labelMode: "hover",
    visibleInSimplified: true,
    unit: state.currentUnit || inferStreamUnit({}, fromNode, toNode),
    section: state.currentSection || inferStreamSection({}, fromNode, toNode),
    visibleIn: getDefaultVisibleInForCurrentScope(),
    isMajor: state.currentScope === "refinery",
    userCreated: true,
  };
  applyDefaultStreamMassFields(stream);
  STREAMS.push(stream);
  state.activeStreamId = stream.id;
  state.streamEditMode = true;
  state.selectedStreamPointIndex = -1;
  return stream;
}

function getShapeForNewPortStream(fromNode, fromPort, toNode, toPort, fallback = "polyline") {
  if (!state.autoStraightAlignedStreams) return fallback;
  if (!fromNode || !toNode) return fallback;
  const start = getPortPoint(fromNode, "outputs", fromPort);
  const end = getPortPoint(toNode, "inputs", toPort);
  return arePortsAligned(start, end, state.straightAlignTolerance || 8) ? "autoStraight" : fallback;
}

function makeStreamId() {
  const used = new Set(STREAMS.map((stream) => stream.id));
  let index = 1;
  let candidate = `STR-${String(index).padStart(3, "0")}`;
  while (used.has(candidate)) {
    index += 1;
    candidate = `STR-${String(index).padStart(3, "0")}`;
  }
  return candidate;
}

function generateUniqueStreamId(prefix = "S") {
  const used = new Set(STREAMS.map((stream) => stream.id));
  let index = 1;
  let candidate = `${prefix}-${String(index).padStart(3, "0")}`;
  while (used.has(candidate)) {
    index += 1;
    candidate = `${prefix}-${String(index).padStart(3, "0")}`;
  }
  return candidate;
}

function firstOutputPortId(node) {
  return getNodePorts(node, "outputs")[0]?.id || "out";
}

function firstInputPortId(node) {
  return getNodePorts(node, "inputs")[0]?.id || "in";
}

function isAutoGeneratedStreamLabel(stream) {
  const label = safeText(stream?.label, "").trim();
  if (!label) return true;
  return [
    `${stream.from} → ${stream.to}`,
    `${stream.from} -> ${stream.to}`,
    `${stream.from} to ${stream.to}`,
  ].includes(label);
}

function syncAdminStreamForm(stream) {
  if (!stream) return;
  if (els.adminStreamSelect) els.adminStreamSelect.value = stream.id;
  if (els.adminStreamFrom) els.adminStreamFrom.value = stream.from;
  if (els.adminStreamTo) els.adminStreamTo.value = stream.to;
  updateAdminStreamPortOptions({ fromPort: stream.fromPort, toPort: stream.toPort });
  if (els.adminStreamLabel) els.adminStreamLabel.value = safeText(stream.label, "");
  if (els.adminStreamId) els.adminStreamId.value = stream.id;
  if (els.adminStreamType) els.adminStreamType.value = safeText(stream.type, "liquid");
  if (els.adminStreamShape) els.adminStreamShape.value = normalizeStreamShape(stream.shape);
  if (els.adminStreamStrokeWidth) els.adminStreamStrokeWidth.value = safeNumber(stream.strokeWidth, getDefaultStreamStrokeWidth(stream));
  if (els.adminStreamUnit) els.adminStreamUnit.value = safeText(stream.unit, "");
  if (els.adminStreamSection) els.adminStreamSection.value = safeText(stream.section, "");
  if (els.adminStreamCategory) els.adminStreamCategory.value = safeText(stream.category, inferStreamCategory(stream));
  if (els.adminStreamFlowrate) els.adminStreamFlowrate.value = Number.isFinite(Number(getStreamFlowM3H(stream))) ? getStreamFlowM3H(stream) : "";
  if (els.adminStreamFlowUnit) els.adminStreamFlowUnit.value = safeText(stream.flowUnit, DEFAULT_FLOW_UNIT);
  if (els.adminStreamTemperature) els.adminStreamTemperature.value = stream.temperature ?? "";
  if (els.adminStreamPressure) els.adminStreamPressure.value = stream.pressure ?? "";
  if (els.adminStreamDensity) els.adminStreamDensity.value = stream.density ?? "";
  if (els.adminStreamDensityTonM3) els.adminStreamDensityTonM3.value = Number.isFinite(Number(stream.densityTonM3)) ? stream.densityTonM3 : "";
  if (els.adminStreamPhase) els.adminStreamPhase.value = normalizeStreamPhase(stream.phase || inferPhaseFromStream(stream));
  if (els.adminStreamIsCalculated) els.adminStreamIsCalculated.checked = Boolean(stream.isCalculated);
  if (els.adminStreamIsFinalProduct) els.adminStreamIsFinalProduct.checked = Boolean(stream.isFinalProduct);
  if (els.adminStreamIncludeProductTable) els.adminStreamIncludeProductTable.checked = Boolean(stream.includeInProductTable);
  if (els.adminStreamIncludeFeedTable) els.adminStreamIncludeFeedTable.checked = Boolean(stream.includeInFeedTable);
  if (els.adminStreamBalanceCategory) els.adminStreamBalanceCategory.value = normalizeBalanceCategory(stream.balanceCategory || inferBalanceCategory(stream));
  if (els.adminStreamBalanceRole) els.adminStreamBalanceRole.value = normalizeStreamBalanceRole(stream.balanceRole || (stream.isFinalProduct ? "product" : "internal"));
  if (els.adminStreamIsRecycle) els.adminStreamIsRecycle.checked = Boolean(stream.isRecycle || normalizeStreamBalanceRole(stream.balanceRole) === "recycle");
  if (els.adminStreamIncludeNodeBalance) els.adminStreamIncludeNodeBalance.checked = stream.includeInNodeBalance !== false;
  if (els.adminStreamIncludeUnitBalance) els.adminStreamIncludeUnitBalance.checked = stream.includeInUnitBalance !== false;
  if (els.adminStreamDownstreamUse) els.adminStreamDownstreamUse.value = safeText(stream.downstreamUse, "");
  if (els.adminStreamConstraintRole) els.adminStreamConstraintRole.value = normalizeStreamConstraintRole(stream.constraintRole);
  if (els.adminStreamConstraintGroup) els.adminStreamConstraintGroup.value = safeText(stream.constraintGroup, "");
  setNullableNumberInput(els.adminStreamFlowMin, stream.flowMin);
  setNullableNumberInput(els.adminStreamFlowTarget, stream.flowTarget);
  setNullableNumberInput(els.adminStreamFlowMax, stream.flowMax);
  if (els.adminStreamFlowRangeUnit) els.adminStreamFlowRangeUnit.value = normalizeStreamFlowRangeUnit(stream.flowRangeUnit || stream.flowUnit || DEFAULT_FLOW_UNIT);
  if (els.adminStreamRangeMode) els.adminStreamRangeMode.value = normalizeStreamRangeMode(stream.rangeMode);
  if (els.adminStreamUseAsTarget) els.adminStreamUseAsTarget.checked = Boolean(stream.useAsCalculationTarget);
  setNullableNumberInput(els.adminStreamCalculationPriority, Number.isFinite(Number(stream.calculationPriority)) ? stream.calculationPriority : 100);
  if (els.adminStreamTargetSolveMode) els.adminStreamTargetSolveMode.value = normalizeTargetSolveMode(stream.targetSolveMode);
  setNullableNumberInput(els.adminStreamTargetTolerancePercent, Number.isFinite(Number(stream.targetTolerancePercent)) ? stream.targetTolerancePercent : DEFAULT_NODE_TOLERANCE_PERCENT);
  if (els.adminStreamAllowAutoAdjust) els.adminStreamAllowAutoAdjust.checked = Boolean(stream.allowAutoAdjust);
  setNullableNumberInput(els.adminStreamLockedFlow, stream.lockedFlow);
  setNullableNumberInput(els.adminStreamTemperatureMin, stream.temperatureMin);
  setNullableNumberInput(els.adminStreamTemperatureTarget, stream.temperatureTarget);
  setNullableNumberInput(els.adminStreamTemperatureMax, stream.temperatureMax);
  setNullableNumberInput(els.adminStreamPressureMin, stream.pressureMin);
  setNullableNumberInput(els.adminStreamPressureTarget, stream.pressureTarget);
  setNullableNumberInput(els.adminStreamPressureMax, stream.pressureMax);
  syncStreamBalanceRoleControls();
  if (els.adminStreamVisibleIn) els.adminStreamVisibleIn.value = normalizeVisibleIn(stream.visibleIn, stream.isMajor).join(", ");
  if (els.adminStreamIsMajor) els.adminStreamIsMajor.checked = Boolean(stream.isMajor);
  if (els.adminStreamLabelMode) els.adminStreamLabelMode.value = safeText(stream.labelMode, "hover");
  if (els.adminStreamAutoRoute) els.adminStreamAutoRoute.checked = stream.autoRoute !== false;
  if (els.adminStreamAvoidNodes) els.adminStreamAvoidNodes.checked = stream.avoidNodes !== false;
}

function toggleStreamPathEditor() {
  if (!requireEditMode("Edit Jalur Stream")) return;
  const stream = STREAMS.find((item) => item.id === state.activeStreamId);
  if (!stream) {
    showToast("Pilih stream terlebih dahulu", "warning");
    return;
  }
  if (!validateStreamEndpoints(stream)) return;

  state.streamEditMode = !state.streamEditMode;
  if (state.streamEditMode) {
    ensureStreamPoints(stream);
    state.selectedStreamPointIndex = stream.points.length
      ? Math.min(Math.max(state.selectedStreamPointIndex, 0), stream.points.length - 1)
      : -1;
    showToast("Editor jalur stream aktif", "info");
  } else {
    state.selectedStreamPointIndex = -1;
    showToast("Editor jalur stream nonaktif", "info");
  }
  renderStreams();
  renderStreamPointEditor();
  renderStreamDetail(stream);
}

function addStreamPoint() {
  if (!requireEditMode("Tambah Titik Stream")) return;
  const stream = STREAMS.find((item) => item.id === state.activeStreamId);
  if (!stream || !validateStreamEndpoints(stream)) return;
  state.streamAddPointMode = true;
  state.streamEditMode = true;
  ensureStreamPoints(stream);
  renderStreams();
  renderStreamPointEditor();
  renderStreamDetail(stream);
  showToast("Klik segmen stream terpilih untuk menambah titik", "info");
}

function addStreamPointAtEvent(event, stream) {
  if (!requireEditMode("Tambah Titik Stream")) return;
  if (!stream || stream.id !== state.activeStreamId || !validateStreamEndpoints(stream)) return;
  let points = ensureStreamPoints(stream);
  let renderPoints = getStreamRenderPoints(stream);
  if (!points.length && renderPoints.length > 2) {
    stream.points = renderPoints.slice(2, -2).map((point) => ({ x: point.x, y: point.y }));
    stream.autoRoute = false;
    points = stream.points;
    renderPoints = getStreamRenderPoints(stream);
  }
  if (renderPoints.length < 2) return;
  const rect = els.canvasViewport.getBoundingClientRect();
  const point = screenToCanvas(event.clientX - rect.left, event.clientY - rect.top);
  let segmentIndex = findNearestSegmentIndex(renderPoints, point);
  segmentIndex = clamp(segmentIndex, 0, renderPoints.length - 2);
  const proposedPoint = {
    x: Math.round(point.x),
    y: Math.round(point.y),
  };
  const constrained = pushPointOutsideNodeBodies(proposedPoint, stream);
  const nextPoint = constrained.point;
  if (constrained.adjusted) {
    showToast("Titik stream digeser keluar dari node body.", "warning");
  }
  stream.autoRoute = false;
  const insertIndex = clamp(segmentIndex - 1, 0, points.length);
  points.splice(insertIndex, 0, nextPoint);
  state.selectedStreamPointIndex = insertIndex;
  state.streamAddPointMode = false;
  renderStreams();
  renderStreamPointEditor();
  renderStreamDetail(stream);
  commitDataChange("Titik stream ditambahkan", { keepStream: true });
}

function findNearestSegmentIndex(points, target) {
  let winner = 0;
  let bestDistance = Infinity;
  for (let index = 0; index < points.length - 1; index += 1) {
    const distance = distancePointToSegment(target, points[index], points[index + 1]);
    if (distance < bestDistance) {
      bestDistance = distance;
      winner = index;
    }
  }
  return winner;
}

function distancePointToSegment(point, start, end) {
  const dx = end.x - start.x;
  const dy = end.y - start.y;
  if (dx === 0 && dy === 0) return Math.hypot(point.x - start.x, point.y - start.y);
  const t = clamp(((point.x - start.x) * dx + (point.y - start.y) * dy) / (dx * dx + dy * dy), 0, 1);
  const projection = { x: start.x + t * dx, y: start.y + t * dy };
  return Math.hypot(point.x - projection.x, point.y - projection.y);
}

function deleteSelectedStreamPoint() {
  if (!requireEditMode("Hapus Titik Stream")) return;
  const stream = STREAMS.find((item) => item.id === state.activeStreamId);
  if (!stream || !Array.isArray(stream.points)) return;

  const index = state.selectedStreamPointIndex;
  if (index < 0 || index >= stream.points.length) {
    showToast("Pilih titik belok yang ingin dihapus.", "warning");
    return;
  }

  stream.points.splice(index, 1);
  state.selectedStreamPointIndex = stream.points.length ? Math.min(index, stream.points.length - 1) : -1;
  renderStreams();
  renderStreamPointEditor();
  renderStreamDetail(stream);
  commitDataChange("Titik stream dihapus", { keepStream: true });
}

function resetSelectedStreamPath() {
  if (!requireEditMode("Reset Jalur Stream")) return;
  const stream = STREAMS.find((item) => item.id === state.activeStreamId);
  if (!stream) return;
  if (Array.isArray(stream.points) && stream.points.length) {
    const confirmed = window.confirm(`Reset route ${stream.id} dan hapus semua titik belok manual?`);
    if (!confirmed) return;
  }
  stream.points = [];
  stream.autoRoute = true;
  stream.avoidNodes = true;
  state.streamAddPointMode = false;
  state.selectedStreamPointIndex = -1;
  state.streamEditMode = false;
  renderStreams();
  renderStreamPointEditor();
  renderStreamDetail(stream);
  commitDataChange("Jalur stream kembali auto route", { keepStream: true });
}

function autoFixSelectedStreamRoute() {
  if (!requireEditMode("Auto Fix Route")) return;
  const stream = STREAMS.find((item) => item.id === state.activeStreamId);
  if (!stream) {
    showToast("Pilih stream lebih dulu.", "warning");
    return;
  }
  stream.points = [];
  stream.autoRoute = true;
  stream.avoidNodes = true;
  state.streamAddPointMode = false;
  state.selectedStreamPointIndex = -1;
  renderStreams();
  renderStreamPointEditor();
  renderStreamDetail(stream);
  loadStreamForm(stream.id);
  commitDataChange(stream.routeStatus === "Conflict" ? "Auto route dibuat, masih ada conflict" : "Auto route clear", { keepStream: true });
}

function convertSelectedStreamShape(shape) {
  if (!requireEditMode("Convert Stream Shape")) return;
  const stream = STREAMS.find((item) => item.id === state.activeStreamId);
  if (!stream) {
    showToast("Pilih stream lebih dulu.", "warning");
    return;
  }
  const nextShape = normalizeStreamShape(shape);
  stream.shape = nextShape;
  if (nextShape === "cable" || nextShape === "bezier" || nextShape === "straight" || nextShape === "autoStraight") {
    stream.points = [];
    stream.autoRoute = true;
    stream.avoidNodes = true;
  } else {
    const route = buildAutoStreamPoints({ ...stream, shape: "polyline", points: [], autoRoute: true, avoidNodes: true });
    stream.points = route.length > 4 ? route.slice(2, -2).map((point) => ({ x: point.x, y: point.y })) : [];
    stream.autoRoute = false;
    stream.avoidNodes = true;
  }
  state.streamEditMode = nextShape === "polyline";
  state.selectedStreamPointIndex = -1;
  if (els.adminStreamShape) els.adminStreamShape.value = nextShape;
  renderStreams();
  renderStreamPointEditor();
  renderStreamDetail(stream);
  loadStreamForm(stream.id);
  commitDataChange(`Stream dikonversi ke ${formatStreamShapeLabel(nextShape)}`, { keepStream: true });
}

function applyCleanRoutesFromAdmin() {
  if (!requireEditMode("Apply Clean Routes")) return;
  let changed = 0;
  STREAMS.forEach((stream) => {
    stream.points = [];
    stream.autoRoute = true;
    stream.avoidNodes = true;
    changed += 1;
  });
  if (!changed) {
    showToast("Tidak ada stream untuk di-auto route", "warning");
    return;
  }
  state.streamEditMode = false;
  state.selectedStreamPointIndex = -1;
  commitDataChange("Auto route diterapkan ke semua stream", { focusSelected: true, keepStream: true });
}

function validateStreamEndpoints(stream) {
  if (!stream?.from || !stream?.to || !nodeByTag.has(stream.from) || !nodeByTag.has(stream.to)) {
    showToast("Stream memiliki from/to node tidak valid", "error");
    return false;
  }
  if (stream.from === stream.to) {
    showToast("From dan To stream tidak boleh sama", "error");
    return false;
  }
  if (!getValidPortId(nodeByTag.get(stream.from), "outputs", stream.fromPort)
    || !getValidPortId(nodeByTag.get(stream.to), "inputs", stream.toPort)) {
    showToast("Stream memiliki from/to port tidak valid", "error");
    return false;
  }
  return true;
}

function isStreamEndpointValid(stream, options = {}) {
  if (!stream?.from || !stream?.to || !nodeByTag.has(stream.from) || !nodeByTag.has(stream.to)) return false;
  if (stream.from === stream.to) return false;
  if (options.checkPorts === false) return true;
  return Boolean(getValidPortId(nodeByTag.get(stream.from), "outputs", stream.fromPort)
    && getValidPortId(nodeByTag.get(stream.to), "inputs", stream.toPort));
}

function ensureStreamPoints(stream) {
  if (!Array.isArray(stream.points)) {
    stream.points = [];
  }
  return stream.points;
}

function findLongestSegmentIndex(points) {
  let winner = 0;
  let longest = -1;
  for (let index = 0; index < points.length - 1; index += 1) {
    const a = points[index];
    const b = points[index + 1];
    const distance = Math.hypot(b.x - a.x, b.y - a.y);
    if (distance > longest) {
      longest = distance;
      winner = index;
    }
  }
  return winner;
}

function normalizeManualRoutePoints(points = [], stream) {
  let adjusted = false;
  const normalized = points.map((point) => {
    const result = pushPointOutsideNodeBodies(point, stream);
    if (result.adjusted) adjusted = true;
    return result.point;
  });
  if (adjusted) {
    stream.points = normalized.map((point) => ({ x: point.x, y: point.y }));
    stream.routeStatus = "Conflict";
    stream.routeWarning = "Route conflict: stream point was moved outside node body";
  }
  return normalized;
}

function pushPointOutsideNodeBodies(point, stream) {
  let next = {
    x: Math.round(Number(point.x)),
    y: Math.round(Number(point.y)),
  };
  let adjusted = false;
  getRoutingNodes(stream).forEach((node) => {
    const rect = getNodeBounds(node, STREAM_NODE_MARGIN);
    if (!pointInsideRect(next, rect)) return;
    next = projectPointOutsideRect(next, rect, STREAM_NODE_MARGIN);
    adjusted = true;
  });
  return { point: next, adjusted };
}

function projectPointOutsideRect(point, rect, gap = STREAM_NODE_MARGIN) {
  const distances = [
    { side: "left", value: Math.abs(point.x - rect.x), point: { x: rect.x - gap, y: point.y } },
    { side: "right", value: Math.abs(rect.x + rect.width - point.x), point: { x: rect.x + rect.width + gap, y: point.y } },
    { side: "top", value: Math.abs(point.y - rect.y), point: { x: point.x, y: rect.y - gap } },
    { side: "bottom", value: Math.abs(rect.y + rect.height - point.y), point: { x: point.x, y: rect.y + rect.height + gap } },
  ];
  distances.sort((a, b) => a.value - b.value);
  return distances[0].point;
}

function buildAutoStreamPoints(stream) {
  const from = nodeByTag.get(stream.from);
  const to = nodeByTag.get(stream.to);
  if (!from || !to) return [];

  const endpoints = getStreamEndpointPoints(stream);
  if (!endpoints) return [];
  const start = endpoints.start;
  const end = endpoints.end;
  const startStub = getPortStubPoint(start, STREAM_PORT_STUB);
  const endStub = getPortStubPoint(end, STREAM_PORT_STUB);
  const base = cleanRoutePoints(buildBaseRoutePoints(stream, start, startStub, endStub, end));

  if (stream.autoRoute === false || stream.avoidNodes === false) {
    updateStreamRouteStatus(stream, base);
    return base;
  }

  const candidates = buildRouteCandidates(stream, start, startStub, endStub, end, base);
  let best = { points: base, conflicts: countRouteConflicts(base, stream) };
  const clear = candidates.find((candidate) => countRouteConflicts(cleanRoutePoints(candidate), stream) === 0);
  if (clear) {
    stream.routeStatus = "Clear";
    stream.routeWarning = "";
    return cleanRoutePoints(clear);
  }

  candidates.forEach((candidate) => {
    const points = cleanRoutePoints(candidate);
    const conflicts = countRouteConflicts(points, stream);
    const length = getRouteLength(points);
    const bestLength = getRouteLength(best.points);
    if (conflicts < best.conflicts || (conflicts === best.conflicts && length < bestLength)) {
      best = { points, conflicts };
    }
  });

  stream.routeStatus = best.conflicts > 0 ? "Conflict" : "Clear";
  stream.routeWarning = best.conflicts > 0 ? "Route conflict: stream crosses node body" : "";
  return best.points;
}

function buildBaseRoutePoints(stream, start, startStub, endStub, end) {
  const midX = Math.round((startStub.x + endStub.x) / 2);
  if (stream.shape === "straight" && stream.avoidNodes === false) return [start, startStub, endStub, end];
  if (stream.shape === "elbow" || stream.shape === "polyline") {
    return [start, startStub, { x: midX, y: startStub.y }, { x: midX, y: endStub.y }, endStub, end];
  }
  return [start, startStub, { x: midX, y: startStub.y }, { x: midX, y: endStub.y }, endStub, end];
}

function buildRouteCandidates(stream, start, startStub, endStub, end, base) {
  const midX = Math.round((startStub.x + endStub.x) / 2);
  const midY = Math.round((startStub.y + endStub.y) / 2);
  const bounds = getStreamRelatedBounds(stream);
  const topLane = clamp(bounds.minY - 120, 40, CANVAS.height - 40);
  const bottomLane = clamp(bounds.maxY + 120, 40, CANVAS.height - 40);
  const leftLane = clamp(bounds.minX - 140, 40, CANVAS.width - 40);
  const rightLane = clamp(bounds.maxX + 140, 40, CANVAS.width - 40);
  const busLane = getStreamBusLane(stream, startStub, endStub);

  return [
    base,
    [start, startStub, { x: midX, y: startStub.y }, { x: midX, y: endStub.y }, endStub, end],
    [start, startStub, { x: startStub.x, y: midY }, { x: endStub.x, y: midY }, endStub, end],
    [start, startStub, { x: startStub.x, y: topLane }, { x: endStub.x, y: topLane }, endStub, end],
    [start, startStub, { x: startStub.x, y: bottomLane }, { x: endStub.x, y: bottomLane }, endStub, end],
    [start, startStub, { x: leftLane, y: startStub.y }, { x: leftLane, y: endStub.y }, endStub, end],
    [start, startStub, { x: rightLane, y: startStub.y }, { x: rightLane, y: endStub.y }, endStub, end],
    [start, startStub, { x: startStub.x, y: busLane }, { x: endStub.x, y: busLane }, endStub, end],
  ];
}

function getStreamRelatedBounds(stream) {
  const from = nodeByTag.get(stream.from);
  const to = nodeByTag.get(stream.to);
  const rects = [from, to].filter(Boolean).map((node) => getNodeBounds(node, STREAM_NODE_MARGIN));
  if (!rects.length) return { minX: 0, minY: 0, maxX: CANVAS.width, maxY: CANVAS.height };
  return {
    minX: Math.min(...rects.map((rect) => rect.x)),
    minY: Math.min(...rects.map((rect) => rect.y)),
    maxX: Math.max(...rects.map((rect) => rect.x + rect.width)),
    maxY: Math.max(...rects.map((rect) => rect.y + rect.height)),
  };
}

function getStreamBusLane(stream, startStub, endStub) {
  const category = safeText(stream.category, inferStreamCategory(stream)).toLowerCase();
  const lanes = {
    product: 180,
    gas: 360,
    utility: CANVAS.height - 430,
    catalyst: 1130,
    heavy: 1430,
    main: Math.round((startStub.y + endStub.y) / 2),
  };
  return clamp(lanes[category] ?? lanes.main, 40, CANVAS.height - 40);
}

function cleanRoutePoints(points = []) {
  const cleaned = [];
  points.forEach((point) => {
    if (!point || !Number.isFinite(Number(point.x)) || !Number.isFinite(Number(point.y))) return;
    const next = {
      x: Math.round(Number(point.x)),
      y: Math.round(Number(point.y)),
      side: point.side,
    };
    const previous = cleaned[cleaned.length - 1];
    if (previous && Math.abs(previous.x - next.x) < 1 && Math.abs(previous.y - next.y) < 1) return;
    cleaned.push(next);
  });
  return cleaned;
}

function updateStreamRouteStatus(stream, points) {
  const conflicts = countRouteConflicts(points, stream);
  stream.routeStatus = conflicts > 0 ? "Conflict" : "Clear";
  stream.routeWarning = conflicts > 0 ? "Route conflict: stream crosses node body" : "";
}

function countRouteConflicts(points, stream) {
  if (!Array.isArray(points) || points.length < 2) return 0;
  let conflicts = 0;
  getRoutingNodes(stream).forEach((node) => {
    if (pathIntersectsNodeBody(points, node, {
      fromTag: stream.from,
      toTag: stream.to,
    })) conflicts += 1;
  });
  return conflicts;
}

function getRoutingNodes(stream) {
  const visible = getVisibleNodes();
  if (visible.length) return visible;
  return NODES.filter((node) => node.tag === stream?.from || node.tag === stream?.to);
}

function getNodeBounds(node, margin = 0) {
  const rect = getScopedNodeLayout(node);
  return expandRect(rect, margin);
}

function pointInsideRect(point, rect) {
  return point.x > rect.x
    && point.x < rect.x + rect.width
    && point.y > rect.y
    && point.y < rect.y + rect.height;
}

function lineIntersectsRect(p1, p2, rect) {
  return segmentIntersectsRect(p1, p2, rect);
}

function pathIntersectsNodeBody(pathPoints, node, options = {}) {
  const tag = node?.tag;
  const rect = getNodeBounds(node, STREAM_NODE_MARGIN);
  const isFrom = tag === options.fromTag;
  const isTo = tag === options.toTag;
  const lastSegmentIndex = pathPoints.length - 2;
  for (let index = 0; index < pathPoints.length - 1; index += 1) {
    if ((isFrom && index === 0) || (isTo && index === lastSegmentIndex)) continue;
    if (lineIntersectsRect(pathPoints[index], pathPoints[index + 1], rect)) return true;
  }
  return false;
}

function canRenderStreamBridges() {
  return state.streamBridges !== false
    && state.zoom > 0.35
    && !isCanvasInteractionBusy();
}

function computeStreamCrossings(visibleStreams = []) {
  const bridgeMap = new Map();
  if (!canRenderStreamBridges()) return bridgeMap;

  const entries = visibleStreams
    .filter((stream) => ["polyline", "straight", "autoStraight"].includes(normalizeStreamShape(stream.shape)))
    .map((stream) => {
      const points = getBridgeDetectionPoints(stream);
      if (!Array.isArray(points) || points.length < 2 || !points.every(isFinitePoint)) {
        return { stream, segments: [] };
      }
      const segments = [];
      for (let index = 0; index < points.length - 1; index += 1) {
        const start = points[index];
        const end = points[index + 1];
        const isHorizontal = Math.abs(start.y - end.y) <= 1;
        const isVertical = Math.abs(start.x - end.x) <= 1;
        if (!isHorizontal && !isVertical) continue;
        if (Math.hypot(end.x - start.x, end.y - start.y) < 36) continue;
        segments.push({ index, start, end, stream });
      }
      return { stream, segments };
    })
    .filter((entry) => entry.segments.length);

  for (let entryIndex = 0; entryIndex < entries.length; entryIndex += 1) {
    for (let otherIndex = entryIndex + 1; otherIndex < entries.length; otherIndex += 1) {
      const first = entries[entryIndex];
      const second = entries[otherIndex];
      first.segments.forEach((firstSegment) => {
        second.segments.forEach((secondSegment) => {
          const intersection = getLineIntersection(firstSegment.start, firstSegment.end, secondSegment.start, secondSegment.end);
          if (!intersection) return;
          if (isSharedStreamEndpoint(firstSegment, secondSegment, intersection)) return;
          if (isNearPoint(intersection, firstSegment.start, 24)
            || isNearPoint(intersection, firstSegment.end, 24)
            || isNearPoint(intersection, secondSegment.start, 24)
            || isNearPoint(intersection, secondSegment.end, 24)) return;
          if (pointInsideAnyNodeBounds(intersection, 12)) return;

          const winningSegment = pickBridgeSegment(firstSegment, secondSegment);
          const existing = bridgeMap.get(winningSegment.stream.id) || [];
          if (existing.length >= 20) return;
          existing.push({
            segmentIndex: winningSegment.index,
            point: intersection,
            arcDir: getBridgeArcDirection(winningSegment, intersection),
          });
          bridgeMap.set(winningSegment.stream.id, existing);
        });
      });
    }
  }

  return bridgeMap;
}

function getLineIntersection(a1, a2, b1, b2) {
  if (![a1, a2, b1, b2].every(isFinitePoint)) return null;
  const denominator = ((a1.x - a2.x) * (b1.y - b2.y)) - ((a1.y - a2.y) * (b1.x - b2.x));
  if (Math.abs(denominator) < 0.001) return null;
  const determinantA = (a1.x * a2.y) - (a1.y * a2.x);
  const determinantB = (b1.x * b2.y) - (b1.y * b2.x);
  const x = ((determinantA * (b1.x - b2.x)) - ((a1.x - a2.x) * determinantB)) / denominator;
  const y = ((determinantA * (b1.y - b2.y)) - ((a1.y - a2.y) * determinantB)) / denominator;
  const point = { x, y };
  if (!pointWithinSegmentBounds(point, a1, a2) || !pointWithinSegmentBounds(point, b1, b2)) return null;
  return point;
}

function pointWithinSegmentBounds(point, start, end, tolerance = 0.5) {
  return point.x >= Math.min(start.x, end.x) - tolerance
    && point.x <= Math.max(start.x, end.x) + tolerance
    && point.y >= Math.min(start.y, end.y) - tolerance
    && point.y <= Math.max(start.y, end.y) + tolerance;
}

function isSharedStreamEndpoint(firstSegment, secondSegment, intersection) {
  return [
    firstSegment.start,
    firstSegment.end,
    secondSegment.start,
    secondSegment.end,
  ].some((point) => isNearPoint(intersection, point, 2));
}

function isNearPoint(a, b, tolerance = 24) {
  if (!a || !b) return false;
  return Math.hypot(a.x - b.x, a.y - b.y) <= tolerance;
}

function pickBridgeSegment(firstSegment, secondSegment) {
  const firstPriority = getStreamPriority(firstSegment.stream);
  const secondPriority = getStreamPriority(secondSegment.stream);
  if (firstPriority > secondPriority) return firstSegment;
  if (secondPriority > firstPriority) return secondSegment;
  return String(firstSegment.stream.id).localeCompare(String(secondSegment.stream.id)) >= 0
    ? firstSegment
    : secondSegment;
}

function getStreamPriority(stream) {
  const category = safeText(stream?.category, "").toLowerCase();
  const type = safeText(stream?.type, "").toLowerCase();
  const categoryPriority = {
    main: 50,
    heavy: 45,
    product: 40,
    gas: 35,
    utility: 30,
    sour: 30,
    catalyst: 25,
  };
  let priority = categoryPriority[category] || (type === "gas" ? 35 : 34);
  if (stream?.id === state.activeStreamId) priority += 100;
  if (stream?.id === state.hoveredStreamId) priority += 50;
  return priority;
}

function getBridgeArcDirection(segment, point) {
  const isHorizontal = Math.abs(segment.start.y - segment.end.y) <= 1;
  if (isHorizontal) {
    if (!isBridgeSideBlocked(point, "horizontal", -1)) return -1;
    if (!isBridgeSideBlocked(point, "horizontal", 1)) return 1;
    return -1;
  }
  if (!isBridgeSideBlocked(point, "vertical", 1)) return 1;
  if (!isBridgeSideBlocked(point, "vertical", -1)) return -1;
  return 1;
}

function isBridgeSideBlocked(point, orientation, direction) {
  const probe = orientation === "horizontal"
    ? { x: point.x, y: point.y + direction * 28 }
    : { x: point.x + direction * 28, y: point.y };
  return pointInsideAnyNodeBounds(probe, 8);
}

function pointInsideAnyNodeBounds(point, margin = 0) {
  return getVisibleNodes().some((node) => pointInsideRect(point, getNodeBounds(node, margin)));
}

function expandRect(rect, margin) {
  return {
    x: rect.x - margin,
    y: rect.y - margin,
    width: rect.width + margin * 2,
    height: rect.height + margin * 2,
  };
}

function segmentIntersectsRect(a, b, rect) {
  if (pointInsideRect(a, rect) || pointInsideRect(b, rect)) return true;
  const topLeft = { x: rect.x, y: rect.y };
  const topRight = { x: rect.x + rect.width, y: rect.y };
  const bottomRight = { x: rect.x + rect.width, y: rect.y + rect.height };
  const bottomLeft = { x: rect.x, y: rect.y + rect.height };
  return segmentsIntersect(a, b, topLeft, topRight)
    || segmentsIntersect(a, b, topRight, bottomRight)
    || segmentsIntersect(a, b, bottomRight, bottomLeft)
    || segmentsIntersect(a, b, bottomLeft, topLeft);
}

function pointInRect(point, rect) {
  return point.x >= rect.x
    && point.x <= rect.x + rect.width
    && point.y >= rect.y
    && point.y <= rect.y + rect.height;
}

function segmentsIntersect(a, b, c, d) {
  const o1 = orientation(a, b, c);
  const o2 = orientation(a, b, d);
  const o3 = orientation(c, d, a);
  const o4 = orientation(c, d, b);
  if (o1 !== o2 && o3 !== o4) return true;
  return (o1 === 0 && pointOnSegment(c, a, b))
    || (o2 === 0 && pointOnSegment(d, a, b))
    || (o3 === 0 && pointOnSegment(a, c, d))
    || (o4 === 0 && pointOnSegment(b, c, d));
}

function orientation(a, b, c) {
  const value = (b.y - a.y) * (c.x - b.x) - (b.x - a.x) * (c.y - b.y);
  if (Math.abs(value) < 0.001) return 0;
  return value > 0 ? 1 : 2;
}

function pointOnSegment(point, start, end) {
  return point.x <= Math.max(start.x, end.x)
    && point.x >= Math.min(start.x, end.x)
    && point.y <= Math.max(start.y, end.y)
    && point.y >= Math.min(start.y, end.y);
}

function getRouteLength(points = []) {
  let length = 0;
  for (let index = 0; index < points.length - 1; index += 1) {
    length += Math.hypot(points[index + 1].x - points[index].x, points[index + 1].y - points[index].y);
  }
  return length;
}

function syncStreamEndpointPoints(stream) {
  // Stream points are internal bend points. Endpoints are always derived from current nodes.
  if (!Array.isArray(stream?.points)) return;
}

function syncConnectedStreamEndpointPoints(nodeTag) {
  STREAMS.forEach((stream) => {
    if (stream.from === nodeTag || stream.to === nodeTag) {
      syncStreamEndpointPoints(stream);
    }
  });
}

function updateStreamPointStatus() {
  const stream = STREAMS.find((item) => item.id === state.activeStreamId);
  if (els.adminStreamRouteStatus) {
    els.adminStreamRouteStatus.classList.remove("is-clear", "is-conflict");
    if (stream) {
      const status = stream.routeStatus || "Unknown";
      els.adminStreamRouteStatus.textContent = status === "Conflict"
        ? "Route conflict: stream crosses node body"
        : `Route: ${status}`;
      if (status === "Clear") els.adminStreamRouteStatus.classList.add("is-clear");
      if (status === "Conflict") els.adminStreamRouteStatus.classList.add("is-conflict");
    } else {
      els.adminStreamRouteStatus.textContent = "Route: -";
    }
  }
  if (!els.adminStreamPointStatus) return;
  if (!stream) {
    els.adminStreamPointStatus.textContent = "Belum ada stream dipilih.";
    if (els.adminStreamCanvasInfo) els.adminStreamCanvasInfo.textContent = "Pilih stream untuk mulai edit visual.";
    return;
  }
  const count = Array.isArray(stream.points) ? stream.points.length : 0;
  const mode = state.streamEditMode && isEditMode() ? "aktif" : "nonaktif";
  const selected = state.selectedStreamPointIndex >= 0 ? ` · titik belok ${state.selectedStreamPointIndex + 1} dipilih` : "";
  els.adminStreamPointStatus.textContent = `Editor ${mode} · ${count || "auto"} titik belok${selected}`;
  if (els.adminStreamCanvasInfo) {
    const addPoint = state.streamAddPointMode ? " · mode tambah titik" : "";
    const pick = state.streamEndpointPickMode ? ` · pick ${state.streamEndpointPickMode}` : "";
    els.adminStreamCanvasInfo.textContent = `${stream.id} · ${stream.from}:${stream.fromPort || "out"} -> ${stream.to}:${stream.toPort || "in"} · ${count} point${addPoint}${pick}`;
  }
}

function focusNode(nodeId) {
  const node = nodeById.get(nodeId);
  if (!node) return;
  const rect = els.canvasViewport.getBoundingClientRect();
  const nextZoom = Math.max(state.zoom, 0.56);
  const center = getNodeCenter(node);
  state.zoom = clamp(nextZoom, 0.18, 2.4);
  state.panX = rect.width / 2 - center.x * state.zoom;
  state.panY = rect.height / 2 - center.y * state.zoom;
  applyView();
}

function performSearch(query) {
  const normalized = query.trim().toLowerCase();
  state.searchIndex = -1;
  clearSearchHighlights();

  if (!normalized) {
    closeSearchResults();
    return;
  }

  const results = NODES.filter((node) => {
    const haystack = [
      node.tag,
      node.name,
      node.unit,
      node.type,
      node.area,
      getAreaDisplayName(node.area),
      node.section,
      node.level,
      node.status,
      node.description,
    ]
      .join(" ")
      .toLowerCase();
    return haystack.includes(normalized);
  }).slice(0, 12);

  state.searchResults = results;
  renderSearchResults(results, normalized);
  highlightSearchResults(results);
}

function renderSearchResults(results, query) {
  els.searchResults.replaceChildren();
  els.searchResults.hidden = false;
  els.searchResults.classList.remove("is-hidden");

  if (!results.length) {
    const empty = document.createElement("div");
    empty.className = "search-empty";
    empty.innerHTML = `<strong>Node tidak ditemukan</strong><span>Coba tag, nama, unit, atau area lain.</span>`;
    els.searchResults.appendChild(empty);
    return;
  }

  const count = document.createElement("div");
  count.className = "search-count";
  count.textContent = `${results.length} hasil untuk "${query}"`;
  els.searchResults.appendChild(count);

  results.forEach((node, index) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "search-result";
    button.dataset.index = String(index);
    button.innerHTML = `
      <strong>${escapeHtml(node.tag)} · ${escapeHtml(node.name)}</strong>
      <span>${escapeHtml(node.unit)} · ${escapeHtml(getAreaDisplayName(node.area))} · ${escapeHtml(node.status)}</span>
    `;
    button.addEventListener("click", () => {
      selectSearchNode(node);
      closeSearchResults();
      els.nodeSearch.value = `${node.tag} - ${node.name}`;
    });
    els.searchResults.appendChild(button);
  });
}

function handleSearchKeydown(event) {
  if (!state.searchResults.length && event.key !== "Escape") return;

  if (event.key === "ArrowDown") {
    event.preventDefault();
    state.searchIndex = Math.min(state.searchIndex + 1, state.searchResults.length - 1);
    updateSearchActiveDescendant();
  }

  if (event.key === "ArrowUp") {
    event.preventDefault();
    state.searchIndex = Math.max(state.searchIndex - 1, 0);
    updateSearchActiveDescendant();
  }

  if (event.key === "Enter") {
    event.preventDefault();
    const node = state.searchResults[state.searchIndex] || state.searchResults[0];
    if (node) {
      selectSearchNode(node);
      els.nodeSearch.value = `${node.tag} - ${node.name}`;
      closeSearchResults();
    }
  }

  if (event.key === "Escape") {
    event.preventDefault();
    els.nodeSearch.value = "";
    state.searchResults = [];
    clearSearchHighlights();
    closeSearchResults();
  }
}

function selectSearchNode(node) {
  if (!node) return;
  if (state.layers.nodes === false) showToast("Node ditemukan, tetapi layer Nodes sedang disembunyikan.", "warning");
  ensureNodeVisibleScope(node);
  selectNode(node.id, { focus: true });
}

function ensureNodeVisibleScope(node) {
  if (isNodeVisibleInScope(node)) return;
  if (node.unit && node.section) {
    setScope("section", { unit: node.unit, section: node.section });
    return;
  }
  if (node.unit) {
    setScope("unit", { unit: node.unit });
  }
}

function updateSearchActiveDescendant() {
  els.searchResults.querySelectorAll(".search-result").forEach((button, index) => {
    button.classList.toggle("is-active", index === state.searchIndex);
    if (index === state.searchIndex) {
      button.scrollIntoView({ block: "nearest" });
    }
  });
}

function highlightSearchResults(results) {
  const tags = new Set(results.map((node) => node.tag));
  els.nodeLayer.querySelectorAll(".canvas-node").forEach((element) => {
    element.classList.toggle("is-search-match", tags.has(element.dataset.tag));
  });
}

function clearSearchHighlights() {
  els.nodeLayer.querySelectorAll(".canvas-node").forEach((element) => {
    element.classList.remove("is-search-match");
  });
}

function closeSearchResults() {
  els.searchResults.hidden = true;
  els.searchResults.classList.add("is-hidden");
}

function initAdmin() {
  const loggedIn = isAdmin();
  document.body.classList.toggle("is-admin", loggedIn);
  setEditMode(sessionStorage.getItem(EDIT_MODE_SESSION_KEY) === "true" && loggedIn, { silent: true });
  renderAdminPanel();
}

function bindAdminEvents() {
  els.adminSecretTrigger?.addEventListener("click", handleAdminSecretClick);
  els.adminLoginForm?.addEventListener("submit", handleAdminLoginSubmit);
  els.adminLoginCancel?.addEventListener("click", closeAdminLoginModal);
  els.adminPanelClose?.addEventListener("click", () => els.adminPanel.classList.add("is-hidden"));
  els.adminPanelCollapse?.addEventListener("click", toggleAdminCollapsed);
  els.adminCollapsedTabs?.forEach((button) => {
    button.addEventListener("click", () => expandAdminPanel(button.dataset.adminCollapsedTab));
  });
  els.adminLogout?.addEventListener("click", logoutAdmin);
  els.adminEditMode?.addEventListener("change", (event) => setEditMode(event.target.checked));
  els.adminTabs.forEach((button) => {
    button.addEventListener("click", () => switchAdminTab(button.dataset.adminTab));
  });

  els.adminAreaSelect?.addEventListener("change", () => {
    state.activeAreaId = els.adminAreaSelect.value;
    loadAreaForm(state.activeAreaId);
  });
  els.adminAreaNew?.addEventListener("click", createNewAreaDraft);
  els.adminAreaSave?.addEventListener("click", saveAreaFromForm);
  els.adminAreaDelete?.addEventListener("click", deleteSelectedArea);

  els.adminNodeSelect?.addEventListener("change", () => {
    state.activeNodeTag = els.adminNodeSelect.value;
    loadNodeForm(state.activeNodeTag);
  });
  els.adminNodeNew?.addEventListener("click", createNewNodeDraft);
  els.adminNodeSave?.addEventListener("click", saveNodeFromForm);
  els.adminNodeDelete?.addEventListener("click", deleteSelectedNode);
  els.adminNodeSizePreset?.addEventListener("change", handleNodeSizePresetChange);
  els.adminNodeScale?.addEventListener("input", () => applyNodeScaleFromControl(false));
  els.adminNodeScale?.addEventListener("change", () => applyNodeScaleFromControl(true));
  els.adminNodeScale75?.addEventListener("click", () => applyNodeScalePreset(0.75));
  els.adminNodeScale100?.addEventListener("click", () => applyNodeScalePreset(1));
  els.adminNodeScale125?.addEventListener("click", () => applyNodeScalePreset(1.25));
  els.adminNodeScale150?.addEventListener("click", () => applyNodeScalePreset(1.5));
  els.adminNodeResetSize?.addEventListener("click", resetSelectedNodeSize);
  els.adminNodeCopy?.addEventListener("click", copySelectedNode);
  els.adminNodePaste?.addEventListener("click", pasteCopiedNode);
  els.adminNodeDuplicate?.addEventListener("click", duplicateSelectedNode);
  [
    els.adminNodeTagFontSize,
    els.adminNodeNameFontSize,
    els.adminNodeMetaFontSize,
    els.adminNodeFontWeight,
    els.adminNodeFontStyle,
    els.adminNodeIconSize,
    els.adminNodeIconScale,
    els.adminNodePortLabelFontSize,
    els.adminNodePortLabelWeight,
  ].forEach((field) => {
    field?.addEventListener("input", () => applyNodeVisualStyleFromForm(false));
    field?.addEventListener("change", () => applyNodeVisualStyleFromForm(true));
  });
  [els.adminNodeFontColor, els.adminNodeIconColor, els.adminNodePortLabelColor].forEach((field) => {
    field?.addEventListener("input", () => {
      field.dataset.default = "false";
      applyNodeVisualStyleFromForm(false);
    });
    field?.addEventListener("change", () => {
      field.dataset.default = "false";
      applyNodeVisualStyleFromForm(true);
    });
  });
  els.adminNodeFontColorReset?.addEventListener("click", () => resetOptionalNodeColor("font"));
  els.adminNodeIconColorReset?.addEventListener("click", () => resetOptionalNodeColor("icon"));
  els.adminNodePortLabelReset?.addEventListener("click", resetSelectedNodePortLabelStyle);
  els.adminNodeVisualReset?.addEventListener("click", resetSelectedNodeVisualStyle);
  els.adminNodePortsDefault?.addEventListener("click", () => applyNodePortPreset("default"));
  els.adminNodePortsColumn?.addEventListener("click", () => applyNodePortPreset("column"));
  els.adminNodePortsReactor?.addEventListener("click", () => applyNodePortPreset("reactor"));
  els.adminNodePortsProduct?.addEventListener("click", () => applyNodePortPreset("product"));
  els.adminNodePortsUtility?.addEventListener("click", () => applyNodePortPreset("utility"));
  els.adminNodeBalanceType?.addEventListener("change", updateAdminSplitModelStatus);
  els.adminNodeTolerancePercent?.addEventListener("input", updateAdminSplitModelStatus);
  els.adminNodeSplitModel?.addEventListener("input", updateAdminSplitModelStatus);
  document.querySelectorAll("#adminTabNode .admin-editable").forEach((field) => {
    field.addEventListener("input", updateAdminNodePreview);
    field.addEventListener("change", updateAdminNodePreview);
  });

  els.adminStreamSelect?.addEventListener("change", () => {
    state.activeStreamId = els.adminStreamSelect.value;
    loadStreamForm(state.activeStreamId);
    selectStream(state.activeStreamId);
  });
  els.adminStreamFrom?.addEventListener("change", () => updateAdminStreamPortOptions({ resetFrom: true }));
  els.adminStreamTo?.addEventListener("change", () => updateAdminStreamPortOptions({ resetTo: true }));
  els.adminStreamBalanceRole?.addEventListener("change", syncStreamBalanceRoleControls);
  els.adminStreamIsRecycle?.addEventListener("change", () => {
    if (els.adminStreamIsRecycle?.checked && els.adminStreamBalanceRole) els.adminStreamBalanceRole.value = "recycle";
    syncStreamBalanceRoleControls();
  });
  els.adminStreamRangeMode?.addEventListener("change", () => {
    const mode = normalizeStreamRangeMode(els.adminStreamRangeMode?.value);
    if (els.adminStreamUseAsTarget) els.adminStreamUseAsTarget.checked = mode === "control-target" || mode === "locked-flow";
  });
  els.adminStreamUseHvuPreset?.addEventListener("click", applyHvuFeedPresetToStreamForm);
  els.adminStreamClearRange?.addEventListener("click", clearStreamRangeForm);
  els.adminStreamNew?.addEventListener("click", createNewStreamDraft);
  els.adminStreamSave?.addEventListener("click", saveStreamFromForm);
  els.adminStreamDelete?.addEventListener("click", deleteSelectedStream);
  els.adminStreamCreateCanvas?.addEventListener("click", startCreateStreamFromCanvas);
  els.adminStreamPickFrom?.addEventListener("click", () => startStreamEndpointPick("from"));
  els.adminStreamPickTo?.addEventListener("click", () => startStreamEndpointPick("to"));
  els.adminStreamDeleteCanvas?.addEventListener("click", deleteSelectedStream);
  els.adminStreamEditPath?.addEventListener("click", toggleStreamPathEditor);
  els.adminStreamAddPoint?.addEventListener("click", addStreamPoint);
  els.adminStreamDeletePoint?.addEventListener("click", deleteSelectedStreamPoint);
  els.adminStreamConvertCable?.addEventListener("click", () => convertSelectedStreamShape("cable"));
  els.adminStreamConvertPolyline?.addEventListener("click", () => convertSelectedStreamShape("polyline"));
  els.adminStreamResetPath?.addEventListener("click", resetSelectedStreamPath);
  els.adminStreamAutoFixRoute?.addEventListener("click", autoFixSelectedStreamRoute);
  els.adminStreamApplyCleanRoutes?.addEventListener("click", applyCleanRoutesFromAdmin);
  els.adminPidSelect?.addEventListener("change", () => selectPidSymbol(els.adminPidSelect.value, { syncAdmin: false }));
  els.adminPidNew?.addEventListener("click", createNewPidSymbolFromAdmin);
  els.adminPidSave?.addEventListener("click", savePidSymbolFromForm);
  els.adminPidDuplicate?.addEventListener("click", duplicateSelectedPidSymbol);
  els.adminPidDelete?.addEventListener("click", deleteSelectedPidSymbol);
  document.querySelectorAll("#adminTabPid .admin-editable").forEach((field) => {
    field.addEventListener("input", previewPidSymbolFromForm);
    field.addEventListener("change", previewPidSymbolFromForm);
  });
  els.adminConfigExport?.addEventListener("click", exportConfigJson);
  els.adminConfigDeploy?.addEventListener("click", handleSaveDeploymentDefault);
  els.adminConfigImport?.addEventListener("change", handleConfigImportFile);
  els.adminCduBaseCapacityM3H?.addEventListener("change", saveCduCapacitySettingsFromForm);
  els.adminCduBaseCapacityMBSD?.addEventListener("change", saveCduCapacitySettingsFromForm);
  els.adminCduTablesVisible?.addEventListener("change", saveCduCapacitySettingsFromForm);
  els.adminShowNodeBalance?.addEventListener("change", saveCduCapacitySettingsFromForm);
  els.adminCduAutoHidePresentation?.addEventListener("change", saveCduCapacitySettingsFromForm);
  els.adminImportApply?.addEventListener("click", applyPendingImportConfig);
  els.adminImportCancel?.addEventListener("click", cancelPendingImportConfig);
  els.adminLoadCduDefault?.addEventListener("click", loadCduDefaultConfig);
  els.adminConfigRestore?.addEventListener("click", restoreLastBackupConfig);
  els.adminConfigReset?.addEventListener("click", resetStoredConfig);

  document.addEventListener("keydown", handleAdminKeyboardTrigger);
}

function handleAdminSecretClick() {
  const now = Date.now();
  state.adminTriggerClicks = state.adminTriggerClicks.filter((time) => now - time < 3000);
  state.adminTriggerClicks.push(now);
  if (state.adminTriggerClicks.length >= 5) {
    state.adminTriggerClicks = [];
    openAdminLoginModal();
  }
}

function handleAdminKeyboardTrigger(event) {
  if (shouldIgnoreGlobalShortcut(event)) return;
  if (event.ctrlKey && event.shiftKey && event.key.toLowerCase() === "a") {
    event.preventDefault();
    openAdminLoginModal();
    return;
  }

  if (event.ctrlKey || event.metaKey || event.altKey || event.key.length !== 1) return;
  state.adminTypedSequence = `${state.adminTypedSequence}${event.key.toLowerCase()}`.slice(-5);
  if (state.adminTypedSequence === "admin") {
    state.adminTypedSequence = "";
    openAdminLoginModal();
  }
}

function handleAdminLoginSubmit(event) {
  event.preventDefault();
  const username = els.adminUsername.value.trim();
  const password = els.adminPassword.value;
  if (loginAdmin(username, password)) {
    closeAdminLoginModal();
    showToast("Login admin berhasil", "success");
  } else {
    els.adminLoginError.textContent = "Username atau password salah.";
    showToast("Login admin gagal", "error");
  }
}

function openAdminLoginModal() {
  if (isAdmin()) {
    showAdminPanel();
    return;
  }
  els.adminLoginError.textContent = "";
  els.adminLoginModal.classList.remove("is-hidden");
  window.setTimeout(() => els.adminUsername?.focus(), 40);
}

function closeAdminLoginModal() {
  els.adminLoginModal.classList.add("is-hidden");
  els.adminLoginForm?.reset();
}

function loginAdmin(username, password) {
  if (username !== "admin" || password !== "admin123") return false;
  sessionStorage.setItem(ADMIN_SESSION_KEY, "true");
  document.body.classList.add("is-admin");
  showAdminPanel();
  setEditMode(false, { silent: true });
  renderAdminPanel();
  return true;
}

function logoutAdmin() {
  sessionStorage.removeItem(ADMIN_SESSION_KEY);
  setEditMode(false, { silent: true });
  document.body.classList.remove("is-admin");
  els.adminPanel.classList.add("is-hidden");
  showToast("Logout admin berhasil", "success");
}

function showAdminPanel() {
  if (isPresentationMode()) return;
  els.adminPanel.classList.remove("is-hidden");
  applyAdminCollapseState();
  renderAdminPanel();
}

function isAdmin() {
  return sessionStorage.getItem(ADMIN_SESSION_KEY) === "true";
}

function isEditMode() {
  return isAdmin() && sessionStorage.getItem(EDIT_MODE_SESSION_KEY) === "true";
}

function setEditMode(enabled, options = {}) {
  const next = Boolean(enabled && isAdmin());
  sessionStorage.setItem(EDIT_MODE_SESSION_KEY, String(next));
  document.body.classList.toggle("is-edit-mode", next);
  state.isEditMode = next;
  if (!next) {
    state.streamEditMode = false;
    state.selectedStreamPointIndex = -1;
    state.draggedStreamPoint = null;
    state.streamReconnectDrag = null;
    state.streamReconnectCandidateTag = "";
    clearStreamReconnectCandidateVisual();
    document.body.classList.remove("is-stream-reconnect-dragging", "is-cable-dragging", "is-port-pick-mode");
    renderStreams();
    renderPidLayer();
    renderStreamPointEditor();
    hideQuickInspector();
  } else {
    if (state.canvasFirstEdit && state.autoHideDetailInEditMode) closeDetailPanel();
    closeViewOptionsPopover();
    closePidPalette?.();
    if (state.autoCollapseAdminInEditMode) collapseAdminPanel();
    renderQuickInspector();
  }
  if (els.adminEditMode) els.adminEditMode.checked = next;
  if (els.adminModeHint) {
    els.adminModeHint.textContent = next
      ? "Edit Mode ON. Form editor aktif dan perubahan dapat disimpan."
      : "Edit Mode OFF. Data dapat dilihat, perubahan dinonaktifkan.";
  }
  setAdminControlsEnabled(next);
  if (next) renderPidLayer();
  if (!options.silent) showToast(next ? "Edit Mode aktif" : "Edit Mode nonaktif", "info");
}

function requireEditMode(actionName = "Aksi") {
  if (isEditMode()) return true;
  showToast(`${actionName} membutuhkan Edit Mode ON`, "warning");
  return false;
}

function setAdminControlsEnabled(enabled) {
  els.adminEditable = Array.from(document.querySelectorAll(".admin-editable"));
  els.adminRequiresEdit = Array.from(document.querySelectorAll(".admin-requires-edit"));
  els.adminEditable.forEach((field) => {
    field.disabled = !enabled;
    if ("readOnly" in field) field.readOnly = false;
    field.removeAttribute("readonly");
    field.style.pointerEvents = "auto";
    field.classList.toggle("is-readonly", !enabled);
  });
  els.adminRequiresEdit.forEach((button) => {
    if ("disabled" in button) button.disabled = !enabled;
    button.setAttribute("aria-disabled", String(!enabled));
    button.classList.toggle("is-disabled", !enabled);
    button.querySelectorAll?.("input, button, select, textarea").forEach((child) => {
      child.disabled = !enabled;
    });
  });
  updateNodeSizePresetState();
}

function renderAdminPanel() {
  if (!els.adminPanel) return;
  renderAreaOptions();
  renderNodeOptions();
  renderStreamOptions();
  renderPidOptions();
  renderConfigSummary();
  setAdminControlsEnabled(isEditMode());
}

function switchAdminTab(tabName) {
  state.activeAdminTab = tabName;
  els.adminTabs.forEach((button) => button.classList.toggle("is-active", button.dataset.adminTab === tabName));
  els.adminCollapsedTabs?.forEach((button) => button.classList.toggle("is-active", button.dataset.adminCollapsedTab === tabName));
  els.adminTabPanels.forEach((panel) => panel.classList.toggle("is-active", panel.dataset.adminPanel === tabName));
}

function renderPidPalette() {
  if (!els.pidPaletteGroups) return;
  const query = safeText(state.pidPaletteSearch, "").toLowerCase();
  els.pidPaletteGroups.replaceChildren();
  PID_SYMBOL_CATEGORIES.forEach((category) => {
    const symbols = category.symbols.filter((symbolType) => {
      const label = PID_SYMBOL_LABELS[symbolType] || symbolType;
      return !query || label.toLowerCase().includes(query) || symbolType.toLowerCase().includes(query);
    });
    if (!symbols.length) return;
    const section = document.createElement("section");
    section.className = "pid-palette-section";
    const heading = document.createElement("h4");
    heading.textContent = category.label;
    const grid = document.createElement("div");
    grid.className = "pid-symbol-grid";
    symbols.forEach((symbolType) => {
      const button = document.createElement("button");
      button.type = "button";
      button.className = "pid-symbol-button";
      button.classList.toggle("is-active", state.activePidTool === symbolType);
      button.dataset.pidSymbol = symbolType;
      button.title = PID_SYMBOL_LABELS[symbolType] || symbolType;
      button.setAttribute("aria-label", `Tambah ${PID_SYMBOL_LABELS[symbolType] || symbolType}`);
      button.innerHTML = `<svg viewBox="0 0 120 90" aria-hidden="true">${getPidPaletteIconMarkup(symbolType)}</svg><span>${escapeHtml(PID_SYMBOL_LABELS[symbolType] || symbolType)}</span>`;
      button.addEventListener("click", () => setActivePidTool(symbolType));
      grid.appendChild(button);
    });
    section.append(heading, grid);
    els.pidPaletteGroups.appendChild(section);
  });
}

function getPidPaletteIconMarkup(symbolType) {
  if (["manualValve", "gateValve", "globeValve", "checkValve", "controlValve", "reliefValve"].includes(symbolType)) {
    return `<line x1="8" y1="45" x2="112" y2="45"></line><polygon points="24,25 60,45 24,65"></polygon><polygon points="96,25 60,45 96,65"></polygon>${symbolType === "controlValve" ? "<line x1=\"60\" y1=\"24\" x2=\"60\" y2=\"6\"></line><rect x=\"42\" y=\"4\" width=\"36\" height=\"18\" rx=\"6\"></rect>" : ""}`;
  }
  if (isPidInstrumentSymbol(symbolType)) return `<circle cx="60" cy="45" r="28"></circle><text x="60" y="48" text-anchor="middle" font-size="18">${escapeHtml(symbolType)}</text>`;
  if (["verticalVessel", "tank", "column", "reactor", "filter"].includes(symbolType)) return `<rect x="44" y="10" width="32" height="70" rx="14"></rect><ellipse cx="60" cy="12" rx="16" ry="6"></ellipse><line x1="48" y1="35" x2="72" y2="35"></line><line x1="48" y1="52" x2="72" y2="52"></line>`;
  if (["horizontalVessel", "separator", "cooler", "heatExchanger"].includes(symbolType)) return `<rect x="18" y="28" width="84" height="34" rx="17"></rect><path d="M28 58 L42 32 L56 58 L70 32 L84 58"></path>`;
  if (symbolType === "pump") return `<line x1="8" y1="45" x2="28" y2="45"></line><ellipse cx="60" cy="45" rx="30" ry="24"></ellipse><path d="M55 30 L76 45 L55 60"></path><line x1="90" y1="45" x2="112" y2="45"></line>`;
  if (symbolType === "compressor") return `<path d="M24 25 C70 8 98 25 104 45 C98 65 70 82 24 65 Z"></path><path d="M48 28 L66 45 L48 62"></path>`;
  if (symbolType === "furnace") return `<rect x="30" y="12" width="60" height="68" rx="10"></rect><path d="M48 66 C36 52 58 50 50 34 C76 50 78 65 62 72"></path>`;
  if (symbolType === "coolingTower") return `<polygon points="36,12 84,12 96,80 24,80"></polygon><line x1="30" y1="38" x2="90" y2="38"></line>`;
  if (["processConnector", "signalLine", "dashedSignalLine", "arrowLine"].includes(symbolType)) return `<line x1="12" y1="45" x2="100" y2="45" ${symbolType !== "processConnector" && symbolType !== "arrowLine" ? "stroke-dasharray=\"8 6\"" : ""}></line>${symbolType === "arrowLine" ? "<path d=\"M 94 32 L 108 45 L 94 58\"></path>" : ""}`;
  return `<rect x="20" y="20" width="80" height="50" rx="12"></rect><line x1="34" y1="45" x2="86" y2="45"></line>`;
}

function togglePidPalette(event) {
  event?.preventDefault?.();
  if (!els.pidPalette || !els.pidPaletteToggle) return;
  const isHidden = els.pidPalette.classList.toggle("is-hidden");
  els.pidPaletteToggle.setAttribute("aria-expanded", String(!isHidden));
  if (!isHidden) renderPidPalette();
}

function closePidPalette() {
  els.pidPalette?.classList.add("is-hidden");
  els.pidPaletteToggle?.setAttribute("aria-expanded", "false");
}

function setActivePidTool(symbolType) {
  if (!isAdmin() || !isEditMode()) {
    showToast("P&ID palette membutuhkan Admin Edit Mode", "warning");
    return;
  }
  state.activePidTool = state.activePidTool === symbolType ? "" : symbolType;
  renderPidPalette();
  showToast(state.activePidTool ? `Klik canvas untuk menambahkan ${PID_SYMBOL_LABELS[symbolType] || symbolType}` : "P&ID tool nonaktif", "info");
}

function addPidSymbolAt(point, symbolType = state.activePidTool) {
  if (!requireEditMode("Tambah P&ID Symbol")) return null;
  if (!symbolType) return null;
  const symbol = createPidSymbolDraft(symbolType, point);
  PID_SYMBOLS.push(symbol);
  state.selectedPidSymbolId = symbol.id;
  state.activeAreaId = "";
  state.activeStreamId = "";
  state.selectedNodeId = "";
  commitDataChange("P&ID symbol ditambahkan", { keepPid: true });
  if (!els.pidPinTool?.checked) {
    state.activePidTool = "";
    closePidPalette();
  }
  return symbol;
}

function createPidSymbolDraft(symbolType, point = getCanvasCenter()) {
  const type = normalizePidSymbolType(symbolType);
  const defaults = getPidSymbolDefaults(type);
  const id = makeUniqueId("PID", PID_SYMBOLS.map((symbol) => symbol.id));
  const tag = makeUniqueId(getPidSymbolTagPrefix(type), PID_SYMBOLS.map((symbol) => symbol.tag));
  return {
    id,
    kind: "pidSymbol",
    symbolType: type,
    tag,
    label: PID_SYMBOL_LABELS[type] || "P&ID Symbol",
    x: Math.round(point.x - defaults.width / 2),
    y: Math.round(point.y - defaults.height / 2),
    width: defaults.width,
    height: defaults.height,
    rotation: 0,
    locked: false,
    layer: "pid",
    style: normalizePidStyle(),
    ports: deepClone(defaults.ports),
    userCreated: true,
  };
}

function getPidSymbolTagPrefix(symbolType) {
  if (symbolType === "pump") return "P";
  if (symbolType === "compressor") return "K";
  if (["verticalVessel", "horizontalVessel", "tank", "separator"].includes(symbolType)) return "V";
  if (symbolType === "column") return "C";
  if (symbolType === "heatExchanger" || symbolType === "cooler") return "E";
  if (symbolType === "furnace") return "F";
  if (isPidInstrumentSymbol(symbolType)) return symbolType;
  if (getPidSymbolCategory(symbolType) === "valve") return "XV";
  return "PID";
}

function renderPidOptions() {
  populatePidTypeSelect();
  const current = PID_SYMBOLS.some((symbol) => symbol.id === state.selectedPidSymbolId)
    ? state.selectedPidSymbolId
    : "";
  if (els.adminPidSelect) {
    fillSelect(els.adminPidSelect, PID_SYMBOLS, (symbol) => symbol.id, (symbol) => `${symbol.tag} - ${symbol.label}`);
    if (!current) {
      const option = document.createElement("option");
      option.value = "";
      option.textContent = PID_SYMBOLS.length ? "Pilih P&ID symbol" : "Belum ada symbol";
      els.adminPidSelect.insertBefore(option, els.adminPidSelect.firstChild);
    }
    state.selectedPidSymbolId = current;
    els.adminPidSelect.value = current;
  }
  loadPidSymbolForm(current);
}

function populatePidTypeSelect() {
  if (!els.adminPidType || els.adminPidType.options.length) return;
  PID_SYMBOL_CATEGORIES.forEach((category) => {
    const group = document.createElement("optgroup");
    group.label = category.label;
    category.symbols.forEach((symbolType) => {
      const option = document.createElement("option");
      option.value = symbolType;
      option.textContent = PID_SYMBOL_LABELS[symbolType] || symbolType;
      group.appendChild(option);
    });
    els.adminPidType.appendChild(group);
  });
}

function loadPidSymbolForm(symbolId) {
  if (!els.adminPidSelect) return;
  const symbol = PID_SYMBOLS.find((item) => item.id === symbolId) || {};
  if (els.adminPidType) els.adminPidType.value = safeText(symbol.symbolType, "pump");
  if (els.adminPidTag) els.adminPidTag.value = safeText(symbol.tag, "");
  if (els.adminPidLabel) els.adminPidLabel.value = safeText(symbol.label, "");
  if (els.adminPidX) els.adminPidX.value = safeNumber(symbol.x, 0);
  if (els.adminPidY) els.adminPidY.value = safeNumber(symbol.y, 0);
  if (els.adminPidWidth) els.adminPidWidth.value = safeNumber(symbol.width, 90);
  if (els.adminPidHeight) els.adminPidHeight.value = safeNumber(symbol.height, 70);
  const style = normalizePidStyle(symbol.style);
  if (els.adminPidStroke) els.adminPidStroke.value = style.stroke;
  if (els.adminPidFill) els.adminPidFill.value = style.fill;
  if (els.adminPidStrokeWidth) els.adminPidStrokeWidth.value = style.strokeWidth;
  if (els.adminPidFontSize) els.adminPidFontSize.value = style.fontSize;
  if (els.adminPidFontColor) els.adminPidFontColor.value = style.fontColor;
  if (els.adminPidFontWeight) els.adminPidFontWeight.value = style.fontWeight;
  if (els.adminPidOpacity) els.adminPidOpacity.value = style.opacity;
  if (els.adminPidLocked) els.adminPidLocked.checked = Boolean(symbol.locked);
}

function readPidSymbolForm(existing = {}) {
  const type = normalizePidSymbolType(els.adminPidType?.value || existing.symbolType || "pump");
  const defaults = getPidSymbolDefaults(type);
  return {
    ...existing,
    id: safeText(existing.id, makeUniqueId("PID", PID_SYMBOLS.map((symbol) => symbol.id))),
    kind: "pidSymbol",
    symbolType: type,
    tag: safeText(els.adminPidTag?.value, existing.tag || "PID").toUpperCase(),
    label: safeText(els.adminPidLabel?.value, PID_SYMBOL_LABELS[type] || "P&ID Symbol"),
    x: readNumber(els.adminPidX, existing.x ?? 100),
    y: readNumber(els.adminPidY, existing.y ?? 100),
    width: Math.max(30, readNumber(els.adminPidWidth, existing.width ?? defaults.width)),
    height: Math.max(30, readNumber(els.adminPidHeight, existing.height ?? defaults.height)),
    rotation: safeNumber(existing.rotation, 0),
    locked: Boolean(els.adminPidLocked?.checked),
    layer: "pid",
    style: normalizePidStyle({
      stroke: els.adminPidStroke?.value,
      fill: els.adminPidFill?.value,
      strokeWidth: readNumber(els.adminPidStrokeWidth, PID_STYLE_DEFAULTS.strokeWidth),
      fontSize: readNumber(els.adminPidFontSize, PID_STYLE_DEFAULTS.fontSize),
      fontColor: els.adminPidFontColor?.value,
      fontWeight: els.adminPidFontWeight?.value,
      opacity: readNumber(els.adminPidOpacity, PID_STYLE_DEFAULTS.opacity),
    }),
    ports: existing.symbolType === type && existing.ports ? existing.ports : deepClone(defaults.ports),
    userCreated: true,
  };
}

function previewPidSymbolFromForm() {
  if (!isEditMode() || !state.selectedPidSymbolId) return;
  const symbol = PID_SYMBOLS.find((item) => item.id === state.selectedPidSymbolId);
  if (!symbol) return;
  Object.assign(symbol, readPidSymbolForm(symbol));
  normalizePidSymbols();
  renderPidLayer();
}

function savePidSymbolFromForm() {
  if (!requireEditMode("Simpan P&ID Symbol")) return;
  const oldId = state.selectedPidSymbolId;
  const existing = PID_SYMBOLS.find((item) => item.id === oldId);
  if (!existing) {
    showToast("Pilih P&ID symbol terlebih dahulu", "warning");
    return;
  }
  const draft = readPidSymbolForm(existing);
  if (!validatePidSymbolDraft(draft, oldId)) return;
  const index = PID_SYMBOLS.findIndex((item) => item.id === oldId);
  PID_SYMBOLS[index] = draft;
  state.selectedPidSymbolId = draft.id;
  commitDataChange("P&ID symbol tersimpan", { keepPid: true });
}

function createNewPidSymbolFromAdmin() {
  if (!requireEditMode("Tambah P&ID Symbol")) return;
  const symbol = createPidSymbolDraft(els.adminPidType?.value || "pump", getCanvasCenter());
  PID_SYMBOLS.push(symbol);
  state.selectedPidSymbolId = symbol.id;
  commitDataChange("P&ID symbol ditambahkan", { keepPid: true });
  fitRectToViewport(symbol.x, symbol.y, symbol.width, symbol.height, 260);
}

function duplicateSelectedPidSymbol() {
  if (!requireEditMode("Duplicate P&ID Symbol")) return;
  const source = PID_SYMBOLS.find((symbol) => symbol.id === state.selectedPidSymbolId);
  if (!source) {
    showToast("Pilih P&ID symbol terlebih dahulu", "warning");
    return;
  }
  const copy = deepClone(source);
  copy.id = makeUniqueId("PID", PID_SYMBOLS.map((symbol) => symbol.id));
  copy.tag = makeUniqueId(`${source.tag}-COPY`, PID_SYMBOLS.map((symbol) => symbol.tag));
  copy.label = `${source.label} Copy`;
  copy.x = clamp(safeNumber(source.x, 0) + 40, 0, CANVAS.width - safeNumber(source.width, 90));
  copy.y = clamp(safeNumber(source.y, 0) + 40, 0, CANVAS.height - safeNumber(source.height, 70));
  copy.locked = false;
  copy.userCreated = true;
  PID_SYMBOLS.push(copy);
  state.selectedPidSymbolId = copy.id;
  commitDataChange("P&ID symbol diduplicate", { keepPid: true });
}

function deleteSelectedPidSymbol() {
  if (!requireEditMode("Hapus P&ID Symbol")) return;
  const symbol = PID_SYMBOLS.find((item) => item.id === state.selectedPidSymbolId);
  if (!symbol) return;
  const message = symbol.locked
    ? `Symbol ${symbol.tag} terkunci. Tetap hapus?`
    : `Hapus P&ID symbol ${symbol.tag}?`;
  if (!window.confirm(message)) return;
  const index = PID_SYMBOLS.findIndex((item) => item.id === symbol.id);
  if (index >= 0) PID_SYMBOLS.splice(index, 1);
  PID_CONNECTORS.splice(0, PID_CONNECTORS.length, ...PID_CONNECTORS.filter((connector) => connector.fromSymbolId !== symbol.id && connector.toSymbolId !== symbol.id));
  state.selectedPidSymbolId = PID_SYMBOLS[0]?.id || "";
  commitDataChange("P&ID symbol dihapus", { keepPid: true });
}

function copySelectedPidSymbol() {
  if (!isEditMode()) return;
  const source = PID_SYMBOLS.find((symbol) => symbol.id === state.selectedPidSymbolId);
  if (!source) return;
  state.copiedPidSymbolTemplate = deepClone(source);
  state.pidPasteOffsetCount = 0;
  showToast("P&ID symbol disalin", "success");
}

function pasteCopiedPidSymbol() {
  if (!requireEditMode("Paste P&ID Symbol")) return;
  if (!state.copiedPidSymbolTemplate) {
    showToast("Belum ada P&ID symbol yang disalin", "warning");
    return;
  }
  state.pidPasteOffsetCount += 1;
  const offset = 40 * state.pidPasteOffsetCount;
  const copy = deepClone(state.copiedPidSymbolTemplate);
  copy.id = makeUniqueId("PID", PID_SYMBOLS.map((symbol) => symbol.id));
  copy.tag = makeUniqueId(`${copy.tag}-COPY`, PID_SYMBOLS.map((symbol) => symbol.tag));
  copy.label = `${copy.label} Copy`;
  copy.x = clamp(safeNumber(copy.x, 0) + offset, 0, CANVAS.width - safeNumber(copy.width, 90));
  copy.y = clamp(safeNumber(copy.y, 0) + offset, 0, CANVAS.height - safeNumber(copy.height, 70));
  copy.locked = false;
  copy.userCreated = true;
  PID_SYMBOLS.push(copy);
  state.selectedPidSymbolId = copy.id;
  commitDataChange("P&ID symbol ditempel", { keepPid: true });
}

function validatePidSymbolDraft(symbol, oldId = "") {
  if (!safeText(symbol.tag, "")) return markInvalid(els.adminPidTag, "Tag P&ID wajib diisi");
  if (PID_SYMBOLS.some((item) => item.tag === symbol.tag && item.id !== oldId)) {
    return markInvalid(els.adminPidTag, "Tag P&ID sudah digunakan");
  }
  if (!Number.isFinite(Number(symbol.x)) || !Number.isFinite(Number(symbol.y))) {
    return markInvalid(els.adminPidX, "Koordinat P&ID harus valid");
  }
  if (symbol.width < 30 || symbol.height < 30) return markInvalid(els.adminPidWidth, "Ukuran P&ID terlalu kecil");
  return true;
}

function selectPidSymbol(symbolId, options = {}) {
  const symbol = PID_SYMBOLS.find((item) => item.id === symbolId);
  if (!symbol) return;
  state.selectedPidSymbolId = symbol.id;
  state.selectedNodeId = "";
  if (options.syncAdmin && isAdmin()) {
    if (els.adminPanel?.classList.contains("is-hidden")) showAdminPanel();
    switchAdminTab("pid");
  }
  if (els.adminPidSelect) els.adminPidSelect.value = symbol.id;
  loadPidSymbolForm(symbol.id);
  renderPidLayer();
}

function startPidSymbolPointer(event, symbolId) {
  if (isEditableTarget(event.target)) return;
  const symbol = PID_SYMBOLS.find((item) => item.id === symbolId);
  if (!symbol) return;
  event.preventDefault();
  event.stopPropagation();
  selectPidSymbol(symbol.id, { syncAdmin: isAdmin() });
  if (!isEditMode()) return;
  if (symbol.locked) {
    showToast("P&ID symbol terkunci", "warning");
    return;
  }
  state.draggingPidSymbol = {
    symbolId: symbol.id,
    pointerId: event.pointerId,
    startX: event.clientX,
    startY: event.clientY,
    symbolX: safeNumber(symbol.x, 0),
    symbolY: safeNumber(symbol.y, 0),
    moved: false,
  };
  beginCanvasPointerDrag(event);
}

function startPidSymbolResize(event, symbolId) {
  if (!isEditMode()) return;
  const symbol = PID_SYMBOLS.find((item) => item.id === symbolId);
  if (!symbol || symbol.locked) return;
  event.preventDefault();
  event.stopPropagation();
  selectPidSymbol(symbol.id, { syncAdmin: isAdmin() });
  state.resizingPidSymbol = {
    symbolId: symbol.id,
    pointerId: event.pointerId,
    startX: event.clientX,
    startY: event.clientY,
    width: safeNumber(symbol.width, 90),
    height: safeNumber(symbol.height, 70),
    aspect: safeNumber(symbol.width, 90) / Math.max(1, safeNumber(symbol.height, 70)),
    moved: false,
  };
  beginCanvasPointerDrag(event);
}

function updatePidSymbolDrag(event) {
  const drag = state.draggingPidSymbol;
  if (!drag) return;
  const symbol = PID_SYMBOLS.find((item) => item.id === drag.symbolId);
  if (!symbol) return;
  const dx = (event.clientX - drag.startX) / state.zoom;
  const dy = (event.clientY - drag.startY) / state.zoom;
  const nextX = clamp(Math.round(drag.symbolX + dx), 0, CANVAS.width - safeNumber(symbol.width, 90));
  const nextY = clamp(Math.round(drag.symbolY + dy), 0, CANVAS.height - safeNumber(symbol.height, 70));
  if (symbol.x !== nextX || symbol.y !== nextY) {
    drag.moved = true;
    symbol.x = nextX;
    symbol.y = nextY;
    if (els.adminPidX) els.adminPidX.value = symbol.x;
    if (els.adminPidY) els.adminPidY.value = symbol.y;
    renderPidLayer();
  }
}

function updatePidSymbolResize(event) {
  const resize = state.resizingPidSymbol;
  if (!resize) return;
  const symbol = PID_SYMBOLS.find((item) => item.id === resize.symbolId);
  if (!symbol) return;
  const dx = (event.clientX - resize.startX) / state.zoom;
  const dy = (event.clientY - resize.startY) / state.zoom;
  let width = Math.max(30, Math.round(resize.width + dx));
  let height = Math.max(30, Math.round(resize.height + dy));
  if (event.shiftKey) {
    height = Math.max(30, Math.round(width / resize.aspect));
  }
  width = clamp(width, 30, CANVAS.width - safeNumber(symbol.x, 0));
  height = clamp(height, 30, CANVAS.height - safeNumber(symbol.y, 0));
  if (symbol.width !== width || symbol.height !== height) {
    resize.moved = true;
    symbol.width = width;
    symbol.height = height;
    if (els.adminPidWidth) els.adminPidWidth.value = symbol.width;
    if (els.adminPidHeight) els.adminPidHeight.value = symbol.height;
    renderPidLayer();
  }
}

function finishPidSymbolDrag(event = {}) {
  const drag = state.draggingPidSymbol;
  state.draggingPidSymbol = null;
  endCanvasPointerDrag(event);
  if (drag?.moved) commitDataChange("P&ID symbol dipindahkan", { keepPid: true });
}

function finishPidSymbolResize(event = {}) {
  const resize = state.resizingPidSymbol;
  state.resizingPidSymbol = null;
  endCanvasPointerDrag(event);
  if (resize?.moved) commitDataChange("Ukuran P&ID symbol tersimpan", { keepPid: true });
}

function renderAreaOptions() {
  const current = AREAS.some((area) => area.id === state.activeAreaId) ? state.activeAreaId : AREAS[0]?.id || "";
  fillSelect(els.adminAreaSelect, AREAS, (area) => area.id, (area) => `${area.id} - ${area.name}`);
  state.activeAreaId = current;
  els.adminAreaSelect.value = current;
  loadAreaForm(current);
}

function loadAreaForm(areaId) {
  const area = AREAS.find((item) => item.id === areaId) || AREAS[0] || {};
  els.adminAreaId.value = safeText(area.id, "");
  els.adminAreaName.value = safeText(area.name, "");
  els.adminAreaSubtitle.value = safeText(area.subtitle, "");
  els.adminAreaX.value = safeNumber(area.x, 0);
  els.adminAreaY.value = safeNumber(area.y, 0);
  els.adminAreaWidth.value = safeNumber(area.width, 600);
  els.adminAreaHeight.value = safeNumber(area.height, 400);
  els.adminAreaColor.value = normalizeColor(area.color, "#0f4ea8");
  if (els.adminAreaLocked) els.adminAreaLocked.checked = Boolean(area.locked);
}

function createNewAreaDraft() {
  if (!requireEditMode("Tambah Area")) return;
  const nextId = makeUniqueId("AREA", AREAS.map((area) => area.id));
  const center = getCanvasCenter();
  const snapped = snapRect({
    x: Math.round(center.x - 250),
    y: Math.round(center.y - 150),
    width: 500,
    height: 300,
  });
  const area = {
    id: nextId,
    name: "New Area",
    subtitle: "New section",
    x: snapped.x,
    y: snapped.y,
    width: snapped.width,
    height: snapped.height,
    color: "#2563eb",
    visibleIn: getDefaultVisibleInForCurrentScope(),
    unit: state.currentUnit || "GENERAL",
    section: state.currentSection || "General",
    locked: false,
    userCreated: true,
  };
  AREAS.push(area);
  state.activeAreaId = area.id;
  commitDataChange("Area berhasil ditambahkan");
  loadAreaForm(area.id);
  fitBounds([area]);
}

function saveAreaFromForm() {
  if (!requireEditMode("Simpan Area")) return;
  clearAdminValidation();
  const oldId = state.activeAreaId;
  const area = {
    id: els.adminAreaId.value.trim(),
    name: els.adminAreaName.value.trim(),
    subtitle: els.adminAreaSubtitle.value.trim(),
    x: readNumber(els.adminAreaX, 0),
    y: readNumber(els.adminAreaY, 0),
    width: readNumber(els.adminAreaWidth, 600),
    height: readNumber(els.adminAreaHeight, 400),
    color: normalizeColor(els.adminAreaColor.value, "#0f4ea8"),
    visibleIn: getDefaultVisibleInForCurrentScope(),
    unit: state.currentUnit || "GENERAL",
    section: state.currentSection || "General",
    locked: Boolean(els.adminAreaLocked?.checked),
    userCreated: true,
  };
  const snapped = snapRect(area);
  area.x = snapped.x;
  area.y = snapped.y;
  area.width = snapped.width;
  area.height = snapped.height;

  if (!validateAreaDraft(area, oldId)) return;

  const index = AREAS.findIndex((item) => item.id === oldId);
  if (index >= 0) {
    AREAS[index] = area;
  } else {
    AREAS.push(area);
  }
  state.activeAreaId = area.id;
  commitDataChange("Area berhasil ditambahkan", { focusAreaId: area.id });
}

function deleteSelectedArea() {
  if (!requireEditMode("Hapus Area")) return;
  const areaId = state.activeAreaId;
  if (!areaId) return;
  const confirmed = window.confirm(`Hapus area ${areaId}? Node tidak ikut terhapus.`);
  if (!confirmed) return;
  const index = AREAS.findIndex((area) => area.id === areaId);
  if (index >= 0) AREAS.splice(index, 1);
  state.activeAreaId = AREAS[0]?.id || "";
  commitDataChange("Area dihapus");
}

function renderNodeOptions() {
  const current = NODES.some((node) => node.tag === state.activeNodeTag) ? state.activeNodeTag : NODES[0]?.tag || "";
  fillSelect(els.adminNodeSelect, NODES, (node) => node.tag, (node) => `${node.tag} - ${node.name}`);
  fillSelect(els.adminStreamFrom, NODES, (node) => node.tag, (node) => `${node.tag} - ${node.name}`);
  fillSelect(els.adminStreamTo, NODES, (node) => node.tag, (node) => `${node.tag} - ${node.name}`);
  state.activeNodeTag = current;
  els.adminNodeSelect.value = current;
  loadNodeForm(current);
}

function loadNodeForm(tag) {
  const node = nodeByTag.get(tag) || NODES[0] || {};
  els.adminNodeTag.value = safeText(node.tag, "");
  els.adminNodeName.value = safeText(node.name, "");
  els.adminNodeUnit.value = safeText(node.unit, "");
  els.adminNodeType.value = safeText(node.type, "");
  els.adminNodeArea.value = safeText(node.area, "");
  els.adminNodeStatus.value = safeText(node.status, "Normal");
  els.adminNodeX.value = safeNumber(node.x, 100);
  els.adminNodeY.value = safeNumber(node.y, 100);
  els.adminNodeWidth.value = getNodeWidth(node);
  els.adminNodeHeight.value = getNodeHeight(node);
  if (els.adminNodeScale) els.adminNodeScale.value = clamp(safeNumber(node.scale, 1), 0.5, 2.5);
  if (els.adminNodeSizePreset) {
    els.adminNodeSizePreset.value = getNodeSizePresetKey(els.adminNodeWidth.value, els.adminNodeHeight.value);
  }
  els.adminNodeTemperature.value = safeText(node.temperature, "");
  els.adminNodePressure.value = safeText(node.pressure, "");
  els.adminNodeDescription.value = safeText(node.description, "");
  els.adminNodeFunctions.value = Array.isArray(node.functions) ? node.functions.join("\n") : "";
  if (els.adminNodeBalanceType) els.adminNodeBalanceType.value = normalizeBalanceType(node.balanceType);
  if (els.adminNodeBalanceScope) els.adminNodeBalanceScope.value = normalizeBalanceScope(node.balanceScope);
  if (els.adminNodeBalanceUnit) els.adminNodeBalanceUnit.value = safeText(node.balanceUnit, node.unit || "");
  if (els.adminNodeTolerancePercent) els.adminNodeTolerancePercent.value = normalizeTolerancePercent(node.tolerancePercent);
  if (els.adminNodeSplitModel) els.adminNodeSplitModel.value = JSON.stringify(normalizeSplitModel(node.splitModel), null, 2);
  updateAdminSplitModelStatus();
  if (els.adminNodeInputPorts) els.adminNodeInputPorts.value = serializePortsTextarea(getNodePorts(node, "inputs"));
  if (els.adminNodeOutputPorts) els.adminNodeOutputPorts.value = serializePortsTextarea(getNodePorts(node, "outputs"));
  if (els.adminNodeSection) els.adminNodeSection.value = safeText(node.section, inferNodeSection(node));
  if (els.adminNodeLevel) els.adminNodeLevel.value = safeText(node.level, "unit");
  if (els.adminNodeVisibleIn) els.adminNodeVisibleIn.value = normalizeVisibleIn(node.visibleIn, node.isMajor).join(", ");
  if (els.adminNodeIsMajor) els.adminNodeIsMajor.checked = Boolean(node.isMajor);
  loadNodeStyleForm(node.style);
  updateNodeSizePresetState();
  updateAdminNodePreview();
}

function loadNodeStyleForm(styleInput = {}) {
  const style = normalizeNodeStyle(styleInput);
  if (els.adminNodeTagFontSize) els.adminNodeTagFontSize.value = style.fontSize;
  if (els.adminNodeNameFontSize) els.adminNodeNameFontSize.value = style.nameFontSize;
  if (els.adminNodeMetaFontSize) els.adminNodeMetaFontSize.value = style.metaFontSize;
  if (els.adminNodeFontWeight) els.adminNodeFontWeight.value = style.fontWeight;
  if (els.adminNodeFontStyle) els.adminNodeFontStyle.value = style.fontStyle;
  if (els.adminNodeIconSize) els.adminNodeIconSize.value = style.iconSize;
  if (els.adminNodeIconScale) els.adminNodeIconScale.value = style.iconScale;
  if (els.adminNodePortLabelFontSize) els.adminNodePortLabelFontSize.value = style.portLabelFontSize ?? "";
  if (els.adminNodePortLabelWeight) els.adminNodePortLabelWeight.value = style.portLabelWeight || "";
  setOptionalColorInput(els.adminNodeFontColor, style.fontColor, "#10233f");
  setOptionalColorInput(els.adminNodeIconColor, style.iconColor, "#0f4ea8");
  setOptionalColorInput(els.adminNodePortLabelColor, style.portLabelColor, "#10233f");
}

function setOptionalColorInput(input, value, fallback) {
  if (!input) return;
  input.value = isCssHexColor(value) ? value : fallback;
  input.dataset.default = isCssHexColor(value) ? "false" : "true";
}

function readOptionalColorInput(input) {
  if (!input || input.dataset.default === "true") return "";
  return isCssHexColor(input.value) ? input.value : "";
}

function readNodeStyleForm() {
  return normalizeNodeStyle({
    fontSize: readNumber(els.adminNodeTagFontSize, NODE_STYLE_DEFAULTS.fontSize),
    nameFontSize: readNumber(els.adminNodeNameFontSize, NODE_STYLE_DEFAULTS.nameFontSize),
    metaFontSize: readNumber(els.adminNodeMetaFontSize, NODE_STYLE_DEFAULTS.metaFontSize),
    fontColor: readOptionalColorInput(els.adminNodeFontColor),
    fontWeight: safeText(els.adminNodeFontWeight?.value, NODE_STYLE_DEFAULTS.fontWeight),
    fontStyle: safeText(els.adminNodeFontStyle?.value, NODE_STYLE_DEFAULTS.fontStyle),
    iconSize: readNumber(els.adminNodeIconSize, NODE_STYLE_DEFAULTS.iconSize),
    iconColor: readOptionalColorInput(els.adminNodeIconColor),
    iconScale: safeNumber(els.adminNodeIconScale?.value, NODE_STYLE_DEFAULTS.iconScale),
    portLabelFontSize: els.adminNodePortLabelFontSize?.value ? readNumber(els.adminNodePortLabelFontSize, state.portLabelFontSize) : null,
    portLabelColor: readOptionalColorInput(els.adminNodePortLabelColor),
    portLabelWeight: safeText(els.adminNodePortLabelWeight?.value, ""),
  });
}

function readAdminSplitModel() {
  const raw = safeText(els.adminNodeSplitModel?.value, "").trim();
  if (!raw) return { valid: true, value: {} };
  try {
    const parsed = JSON.parse(raw);
    if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) {
      return { valid: false, value: {}, message: "Split Model JSON harus berupa object" };
    }
    return { valid: true, value: normalizeSplitModel(parsed) };
  } catch {
    return { valid: false, value: {}, message: "Split Model JSON tidak valid" };
  }
}

function updateAdminSplitModelStatus() {
  if (!els.adminNodeSplitModelStatus) return;
  const draft = readAdminSplitModel();
  if (!draft.valid) {
    els.adminNodeSplitModelStatus.textContent = draft.message;
    els.adminNodeSplitModelStatus.dataset.status = "error";
    return;
  }
  const total = getSplitModelTotal(draft.value);
  const valid = isSplitModelTotalValid(total);
  els.adminNodeSplitModelStatus.textContent = `Split model total: ${formatPercentValue(total)}${valid ? "" : " - warning, total harus mendekati 100%"}`;
  els.adminNodeSplitModelStatus.dataset.status = valid ? "balanced" : "warning";
}

function readNullableNumberInput(input) {
  const raw = safeText(input?.value, "").trim();
  if (!raw) return null;
  const number = parseNumericInput(raw);
  return Number.isFinite(number) ? number : NaN;
}

function readNullableProcessInput(input) {
  return normalizeNullableProcessValue(input?.value ?? null);
}

function createNewNodeDraft() {
  if (!requireEditMode("Tambah Node")) return;
  const nextTag = makeUniqueId("N-NEW", NODES.map((node) => node.tag));
  const center = getCanvasCenter();
  const position = snapPoint({ x: Math.round(center.x - 90), y: Math.round(center.y - 45) });
  const defaultPorts = getPortPreset("default");
  const node = {
    id: makeNodeId(nextTag),
    tag: nextTag,
    name: "New Node",
    unit: state.currentUnit || "GENERAL",
    section: state.currentSection || "General",
    type: "Equipment",
    area: getBestAreaForPosition(center),
    x: position.x,
    y: position.y,
    width: NODE_SIZE_PRESETS.medium.width,
    height: NODE_SIZE_PRESETS.medium.height,
    baseWidth: NODE_SIZE_PRESETS.medium.width,
    baseHeight: NODE_SIZE_PRESETS.medium.height,
    scale: 1,
    style: normalizeNodeStyle(),
    status: "Normal",
    temperature: "-",
    pressure: "-",
    description: "",
    functions: [],
    inputPorts: deepClone(defaultPorts.inputs),
    outputPorts: deepClone(defaultPorts.outputs),
    ports: deepClone(defaultPorts),
    visibleIn: getDefaultVisibleInForCurrentScope(),
    isMajor: state.currentScope === "refinery",
    level: state.currentScope === "refinery" ? "refinery" : "unit",
    userCreated: true,
  };
  ensureDefaultPortsForNode(node);
  NODES.push(node);
  state.activeNodeTag = node.tag;
  state.selectedNodeId = node.id;
  commitDataChange("Node berhasil ditambahkan", { focusSelected: true });
  loadNodeForm(node.tag);
}

function handleNodeSizePresetChange() {
  const presetKey = els.adminNodeSizePreset?.value || "medium";
  const preset = NODE_SIZE_PRESETS[presetKey];
  if (preset) {
    els.adminNodeWidth.value = preset.width;
    els.adminNodeHeight.value = preset.height;
  }
  updateNodeSizePresetState();
  updateAdminNodePreview();
}

function updateNodeSizePresetState() {
  if (!els.adminNodeSizePreset || !els.adminNodeWidth || !els.adminNodeHeight) return;
  const editable = isEditMode();
  els.adminNodeWidth.disabled = !editable;
  els.adminNodeHeight.disabled = !editable;
  if ("readOnly" in els.adminNodeWidth) els.adminNodeWidth.readOnly = false;
  if ("readOnly" in els.adminNodeHeight) els.adminNodeHeight.readOnly = false;
}

function updateAdminNodePreview() {
  if (!els.adminNodePreview) return;
  const width = readNumber(els.adminNodeWidth, NODE_SIZE_PRESETS.medium.width);
  const height = readNumber(els.adminNodeHeight, NODE_SIZE_PRESETS.medium.height);
  const scale = Math.min(1, 220 / Math.max(width, 1), 110 / Math.max(height, 1));
  const presetKey = els.adminNodeSizePreset?.value || getNodeSizePresetKey(width, height);
  const presetLabel = NODE_SIZE_PRESETS[presetKey]?.label || "Custom";
  const status = safeText(els.adminNodeStatus?.value, "Normal");
  const tag = safeText(els.adminNodeTag?.value, "TAG");
  const name = safeText(els.adminNodeName?.value, "Node preview");
  const card = els.adminNodePreview.querySelector(".admin-node-preview-card");
  if (card) {
    card.style.width = `${Math.max(width * scale, 96)}px`;
    card.style.height = `${Math.max(height * scale, 54)}px`;
    card.dataset.status = status.toLowerCase();
    applyAdminNodePreviewStyle(card, readNodeStyleForm());
  }
  els.adminNodePreviewTag.textContent = tag;
  els.adminNodePreviewName.textContent = name;
  els.adminNodePreviewMeta.textContent = `${presetLabel} / ${status}`;
}

function applyAdminNodePreviewStyle(card, styleInput) {
  const style = normalizeNodeStyle(styleInput);
  const fontScale = clamp(safeNumber(state.nodeFontScaleGlobal, 1), 0.8, 1.4);
  const iconScale = clamp(safeNumber(state.nodeIconScaleGlobal, 1), 0.8, 1.4);
  card.style.setProperty("--node-tag-font-size", `${Math.round(style.fontSize * fontScale)}px`);
  card.style.setProperty("--node-name-font-size", `${Math.round(style.nameFontSize * fontScale)}px`);
  card.style.setProperty("--node-meta-font-size", `${Math.round(style.metaFontSize * fontScale)}px`);
  card.style.setProperty("--node-font-weight", style.fontWeight);
  card.style.setProperty("--node-font-style", style.fontStyle);
  card.style.setProperty("--node-icon-size", `${Math.round(style.iconSize * style.iconScale * iconScale)}px`);
  if (style.fontColor) {
    card.style.setProperty("--node-font-color", style.fontColor);
  } else {
    card.style.removeProperty("--node-font-color");
  }
  if (style.iconColor) {
    card.style.setProperty("--node-icon-color", style.iconColor);
  } else {
    card.style.removeProperty("--node-icon-color");
  }
}

function applyNodePortPreset(preset) {
  if (!requireEditMode("Ubah Port Node")) return;
  const ports = getPortPreset(preset);
  if (els.adminNodeInputPorts) els.adminNodeInputPorts.value = portsToText(ports.inputs);
  if (els.adminNodeOutputPorts) els.adminNodeOutputPorts.value = portsToText(ports.outputs);
  updateAdminNodePreview();
  showToast("Preset port diterapkan. Klik Simpan Node untuk menyimpan.", "info");
}

function applyNodeScaleFromControl(commit = false) {
  const scale = clamp(safeNumber(els.adminNodeScale?.value, 1), 0.5, 2.5);
  applyNodeScale(scale, { commit });
}

function applyNodeScalePreset(scale) {
  if (els.adminNodeScale) els.adminNodeScale.value = scale;
  applyNodeScale(scale, { commit: true });
}

function applyNodeScale(scale, options = {}) {
  if (!requireEditMode("Scale Node")) return;
  const node = nodeByTag.get(state.activeNodeTag) || nodeById.get(state.selectedNodeId);
  if (!node) {
    showToast("Pilih node terlebih dahulu", "warning");
    return;
  }
  const baseWidth = safeNumber(node.baseWidth, getNodeWidth(node));
  const baseHeight = safeNumber(node.baseHeight, getNodeHeight(node));
  node.baseWidth = baseWidth;
  node.baseHeight = baseHeight;
  node.scale = clamp(safeNumber(scale, 1), 0.5, 2.5);
  node.width = Math.max(80, Math.round(baseWidth * node.scale));
  node.height = Math.max(50, Math.round(baseHeight * node.scale));
  if (els.adminNodeWidth) els.adminNodeWidth.value = node.width;
  if (els.adminNodeHeight) els.adminNodeHeight.value = node.height;
  if (els.adminNodeSizePreset) els.adminNodeSizePreset.value = getNodeSizePresetKey(node.width, node.height);
  updateNodeSizePresetState();
  updateAdminNodePreview();
  renderNodes();
  renderStreams();
  renderStreamPointEditor();
  setActiveNode(node.id);
  if (options.commit) {
    commitDataChange("Scale node tersimpan", { focusSelected: false });
  }
}

function resetSelectedNodeSize() {
  if (!requireEditMode("Reset Size")) return;
  const node = nodeByTag.get(state.activeNodeTag) || nodeById.get(state.selectedNodeId);
  if (!node) {
    showToast("Pilih node terlebih dahulu", "warning");
    return;
  }
  const preset = getDefaultNodeSizeForType(node);
  node.width = preset.width;
  node.height = preset.height;
  node.baseWidth = preset.width;
  node.baseHeight = preset.height;
  node.scale = 1;
  if (els.adminNodeWidth) els.adminNodeWidth.value = node.width;
  if (els.adminNodeHeight) els.adminNodeHeight.value = node.height;
  if (els.adminNodeScale) els.adminNodeScale.value = 1;
  if (els.adminNodeSizePreset) els.adminNodeSizePreset.value = getNodeSizePresetKey(node.width, node.height);
  updateNodeSizePresetState();
  updateAdminNodePreview();
  syncConnectedStreamEndpointPoints(node.tag);
  commitDataChange("Ukuran node direset", { focusSelected: false });
}

function getDefaultNodeSizeForType(node) {
  const text = `${safeText(node?.type)} ${safeText(node?.name)}`.toLowerCase();
  if (text.includes("column") || text.includes("fractionator")) return { width: 190, height: 320 };
  if (text.includes("reactor")) return { width: 200, height: 150 };
  if (text.includes("pool") || text.includes("boundary")) return NODE_SIZE_PRESETS.large;
  if (text.includes("pump") || text.includes("compressor") || text.includes("valve")) return NODE_SIZE_PRESETS.small;
  return NODE_SIZE_PRESETS.medium;
}

function applyNodeVisualStyleFromForm(commit = false) {
  if (!isEditMode()) {
    updateAdminNodePreview();
    return;
  }
  const node = nodeByTag.get(state.activeNodeTag) || nodeById.get(state.selectedNodeId);
  if (!node) return;
  node.style = readNodeStyleForm();
  updateAdminNodePreview();
  renderNodes();
  renderStreamPointEditor();
  setActiveNode(node.id);
  if (commit) {
    commitDataChange("Visual style node tersimpan", { focusSelected: false });
  }
}

function resetOptionalNodeColor(type) {
  if (!requireEditMode(type === "font" ? "Reset Font Color" : "Reset Icon Color")) return;
  if (type === "font") {
    setOptionalColorInput(els.adminNodeFontColor, "", "#10233f");
  } else {
    setOptionalColorInput(els.adminNodeIconColor, "", "#0f4ea8");
  }
  applyNodeVisualStyleFromForm(true);
}

function resetSelectedNodeVisualStyle() {
  if (!requireEditMode("Reset Visual Style")) return;
  loadNodeStyleForm(NODE_STYLE_DEFAULTS);
  applyNodeVisualStyleFromForm(true);
}

function resetSelectedNodePortLabelStyle() {
  if (!requireEditMode("Reset Port Label Style")) return;
  if (els.adminNodePortLabelFontSize) els.adminNodePortLabelFontSize.value = "";
  if (els.adminNodePortLabelWeight) els.adminNodePortLabelWeight.value = "";
  setOptionalColorInput(els.adminNodePortLabelColor, "", "#10233f");
  applyNodeVisualStyleFromForm(true);
}

function copySelectedNode() {
  if (!requireEditMode("Copy Node")) return;
  const node = nodeByTag.get(state.activeNodeTag) || nodeById.get(state.selectedNodeId);
  if (!node) {
    showToast("Pilih node yang ingin disalin", "warning");
    return;
  }
  state.copiedNodeTemplate = deepClone(node);
  state.pasteOffsetCount = 0;
  showToast("Node disalin", "success");
}

function pasteCopiedNode() {
  if (!requireEditMode("Paste Node")) return;
  if (!state.copiedNodeTemplate) {
    showToast("Belum ada node yang disalin", "warning");
    return;
  }
  state.pasteOffsetCount += 1;
  const original = state.copiedNodeTemplate;
  const offset = 40 * state.pasteOffsetCount;
  const tag = generateUniqueNodeTag(original.tag);
  const node = deepClone(original);
  delete node.routeConflict;
  delete node.elementRef;
  node.id = makeNodeId(tag);
  node.tag = tag;
  node.name = `${safeText(original.name, "Node")} Copy`;
  node.x = clamp(safeNumber(original.x, 0) + offset, 0, Math.max(0, CANVAS.width - getNodeWidth(original)));
  node.y = clamp(safeNumber(original.y, 0) + offset, 0, Math.max(0, CANVAS.height - getNodeHeight(original)));
  node.width = getNodeWidth(original);
  node.height = getNodeHeight(original);
  node.baseWidth = safeNumber(original.baseWidth, node.width);
  node.baseHeight = safeNumber(original.baseHeight, node.height);
  node.scale = safeNumber(original.scale, 1);
  node.locked = false;
  node.userCreated = true;
  node.visibleIn = normalizeVisibleIn(original.visibleIn, original.isMajor);
  if (!node.visibleIn.includes(state.currentScope) && state.currentScope !== "equipment") {
    node.visibleIn = Array.from(new Set([...node.visibleIn, ...getDefaultVisibleInForCurrentScope()]));
  }
  NODES.push(node);
  state.activeNodeTag = node.tag;
  state.selectedNodeId = node.id;
  commitDataChange("Node ditempel", { focusSelected: true });
}

function duplicateSelectedNode() {
  if (!requireEditMode("Duplicate Node")) return;
  copySelectedNode();
  pasteCopiedNode();
}

function generateUniqueNodeTag(originalTag = "N") {
  const base = `${safeText(originalTag, "N")}-COPY`;
  const existing = new Set(NODES.map((node) => node.tag));
  let index = 1;
  let candidate = `${base}-${index}`;
  while (existing.has(candidate)) {
    index += 1;
    candidate = `${base}-${index}`;
  }
  return candidate;
}

function startCreateStreamFromCanvas() {
  if (!requireEditMode("Create Stream")) return;
  state.streamEndpointPickMode = "";
  state.streamAddPointMode = false;
  showAdminPanel();
  switchAdminTab("stream");
  showToast("Drag dari output port node ke input port tujuan", "info");
}

function startStreamEndpointPick(endpoint) {
  if (!requireEditMode("Pick Endpoint Stream")) return;
  const stream = STREAMS.find((item) => item.id === state.activeStreamId);
  if (!stream) {
    showToast("Pilih stream terlebih dahulu", "warning");
    return;
  }
  state.streamEndpointPickMode = endpoint;
  state.streamAddPointMode = false;
  state.streamEditMode = true;
  document.body.classList.add("is-port-pick-mode");
  renderStreamPointEditor();
  updateStreamPointStatus();
  showToast(`Klik ${endpoint === "from" ? "output" : "input"} port untuk mengganti ${endpoint}`, "info");
}

function saveNodeFromForm() {
  if (!requireEditMode("Simpan Node")) return;
  clearAdminValidation();
  const oldTag = state.activeNodeTag;
  const tag = els.adminNodeTag.value.trim();
  const splitModelDraft = readAdminSplitModel();
  if (!splitModelDraft.valid) {
    return markInvalid(els.adminNodeSplitModel, splitModelDraft.message);
  }

  const existing = nodeByTag.get(oldTag);
  const width = readNumber(els.adminNodeWidth, NODE_SIZE_PRESETS.medium.width);
  const height = readNumber(els.adminNodeHeight, NODE_SIZE_PRESETS.medium.height);
  const scale = clamp(safeNumber(els.adminNodeScale?.value, existing?.scale || 1), 0.5, 2.5);
  const inputPorts = parsePortsTextarea(els.adminNodeInputPorts?.value || "", "left");
  const outputPorts = parsePortsTextarea(els.adminNodeOutputPorts?.value || "", "right");
  const node = {
    id: existing?.id || makeNodeId(tag),
    tag,
    name: els.adminNodeName.value.trim() || "Equipment",
    unit: els.adminNodeUnit.value.trim() || "-",
    type: els.adminNodeType.value.trim() || "Equipment",
    area: els.adminNodeArea.value.trim() || "-",
    x: readNumber(els.adminNodeX, 100),
    y: readNumber(els.adminNodeY, 100),
    width,
    height,
    baseWidth: safeNumber(existing?.baseWidth, width),
    baseHeight: safeNumber(existing?.baseHeight, height),
    scale,
    style: readNodeStyleForm(),
    status: els.adminNodeStatus.value || "Normal",
    temperature: els.adminNodeTemperature.value.trim() || "-",
    pressure: els.adminNodePressure.value.trim() || "-",
    description: els.adminNodeDescription.value.trim() || "Belum ada deskripsi equipment.",
    functions: textareaToList(els.adminNodeFunctions.value),
    balanceType: normalizeBalanceType(els.adminNodeBalanceType?.value),
    balanceScope: normalizeBalanceScope(els.adminNodeBalanceScope?.value),
    balanceUnit: els.adminNodeBalanceUnit?.value.trim() || els.adminNodeUnit.value.trim() || null,
    tolerancePercent: readNumber(els.adminNodeTolerancePercent, DEFAULT_NODE_TOLERANCE_PERCENT),
    splitModel: splitModelDraft.value,
    balanceCategories: normalizeBalanceCategories(existing?.balanceCategories),
    inputPorts,
    outputPorts,
    ports: {
      inputs: inputPorts,
      outputs: outputPorts,
    },
    section: els.adminNodeSection?.value.trim() || "General",
    level: els.adminNodeLevel?.value.trim() || "unit",
    visibleIn: normalizeVisibleIn(els.adminNodeVisibleIn?.value || "", Boolean(els.adminNodeIsMajor?.checked)),
    isMajor: Boolean(els.adminNodeIsMajor?.checked),
    locked: Boolean(existing?.locked),
    userCreated: existing?.userCreated === true || !existing,
  };
  ensureDefaultPortsForNode(node);
  if (!validateNodeDraft(node, oldTag)) return;

  const index = NODES.findIndex((item) => item.tag === oldTag);
  if (index >= 0) {
    NODES[index] = node;
    updateStreamTags(oldTag, tag);
  } else {
    NODES.push(node);
  }

  state.activeNodeTag = tag;
  state.selectedNodeId = node.id;
  const repairedPorts = repairStreamsAfterNodePortChange(node.id);
  if (PORT_DEBUG) {
    console.debug("[Ports] saved", {
      nodeId: node.id,
      inputPorts: node.inputPorts,
      outputPorts: node.outputPorts,
      repairedPorts,
    });
  }
  commitDataChange(existing ? "Node saved" : "Node berhasil ditambahkan", { focusSelected: true, toastDuration: 1400 });
  if (repairedPorts) showToast("Some stream ports were reset because ports changed.", "warning", { duration: 1800 });
  loadNodeForm(tag);
  updateAdminStreamPortOptions();
}

function deleteSelectedNode() {
  if (!requireEditMode("Hapus Node")) return;
  const selected = getSelectedNodes();
  const tags = selected.length ? selected.map((node) => node.tag) : [state.activeNodeTag].filter(Boolean);
  if (!tags.length) return;
  const related = STREAMS.filter((stream) => tags.includes(stream.from) || tags.includes(stream.to)).length;
  const lockedCount = selected.filter((node) => node.locked).length;
  const confirmed = window.confirm(`Hapus ${tags.length} node? ${related} stream terkait juga akan dihapus.${lockedCount ? ` ${lockedCount} node terkunci.` : ""}`);
  if (!confirmed) return;
  if (lockedCount) {
    const lockedConfirmed = window.confirm("Sebagian node terkunci. Hapus tetap?");
    if (!lockedConfirmed) return;
  }
  for (let i = NODES.length - 1; i >= 0; i -= 1) {
    if (tags.includes(NODES[i].tag)) NODES.splice(i, 1);
  }
  for (let i = STREAMS.length - 1; i >= 0; i -= 1) {
    if (tags.includes(STREAMS[i].from) || tags.includes(STREAMS[i].to)) STREAMS.splice(i, 1);
  }
  state.selectedNodeTags.clear();
  state.activeNodeTag = NODES[0]?.tag || "";
  state.activeStreamId = STREAMS[0]?.id || "";
  commitDataChange(tags.length > 1 ? "Node terpilih dihapus" : "Node dihapus");
}

function updateStreamTags(oldTag, newTag) {
  if (oldTag === newTag) return;
  STREAMS.forEach((stream) => {
    if (stream.from === oldTag) stream.from = newTag;
    if (stream.to === oldTag) stream.to = newTag;
  });
}

function renderStreamOptions() {
  const current = STREAMS.some((stream) => stream.id === state.activeStreamId) ? state.activeStreamId : STREAMS[0]?.id || "";
  fillSelect(els.adminStreamSelect, STREAMS, (stream) => stream.id, (stream) => `${stream.id} - ${stream.label || `${stream.from} to ${stream.to}`}`);
  state.activeStreamId = current;
  els.adminStreamSelect.value = current;
  loadStreamForm(current);
}

function setNullableNumberInput(input, value) {
  if (!input) return;
  input.value = Number.isFinite(Number(value)) ? String(value) : "";
}

function syncStreamBalanceRoleControls() {
  const role = normalizeStreamBalanceRole(els.adminStreamBalanceRole?.value);
  if (role !== "recycle") return;
  if (els.adminStreamIsRecycle) els.adminStreamIsRecycle.checked = true;
  if (els.adminStreamIncludeNodeBalance) els.adminStreamIncludeNodeBalance.checked = false;
  if (els.adminStreamIncludeUnitBalance) els.adminStreamIncludeUnitBalance.checked = true;
  if (els.adminStreamConstraintRole && els.adminStreamConstraintRole.value === "normal") {
    els.adminStreamConstraintRole.value = "recycle-return";
  }
}

function applyHvuFeedPresetToStreamForm() {
  if (!requireEditMode("Use HVU Feed Preset")) return;
  const finalProduct = Boolean(els.adminStreamIsFinalProduct?.checked);
  if (els.adminStreamBalanceRole) els.adminStreamBalanceRole.value = finalProduct ? "product" : "internal";
  if (els.adminStreamIsRecycle) els.adminStreamIsRecycle.checked = false;
  if (els.adminStreamIncludeNodeBalance) els.adminStreamIncludeNodeBalance.checked = true;
  if (els.adminStreamIncludeUnitBalance) els.adminStreamIncludeUnitBalance.checked = true;
  if (els.adminStreamConstraintRole) els.adminStreamConstraintRole.value = "downstream-feed";
  if (els.adminStreamConstraintGroup && !els.adminStreamConstraintGroup.value.trim()) els.adminStreamConstraintGroup.value = "hvu-feed";
  if (els.adminStreamFlowRangeUnit) els.adminStreamFlowRangeUnit.value = "MBSD";
  if (els.adminStreamRangeMode) els.adminStreamRangeMode.value = "monitor";
  if (els.adminStreamUseAsTarget) els.adminStreamUseAsTarget.checked = false;
  if (els.adminStreamTargetSolveMode) els.adminStreamTargetSolveMode.value = "adjust-siblings";
  setNullableNumberInput(els.adminStreamCalculationPriority, 100);
  setNullableNumberInput(els.adminStreamTargetTolerancePercent, DEFAULT_NODE_TOLERANCE_PERCENT);
  if (els.adminStreamAllowAutoAdjust) els.adminStreamAllowAutoAdjust.checked = false;
  setNullableNumberInput(els.adminStreamLockedFlow, null);
  setNullableNumberInput(els.adminStreamFlowMin, 9);
  setNullableNumberInput(els.adminStreamFlowTarget, safeText(els.adminStreamLabel?.value, "").toUpperCase().includes("HVU III") ? 10.8 : 10.5);
  setNullableNumberInput(els.adminStreamFlowMax, 12);
  showToast("HVU feed preset diterapkan", "success", { duration: 1400 });
}

function clearStreamRangeForm() {
  if (!requireEditMode("Clear Range")) return;
  const activeStream = findStreamById(state.activeStreamId);
  if (activeStream) {
    resetStreamConstraint(activeStream);
    loadStreamForm(activeStream.id);
    commitDataChange("Constraint stream dibersihkan", {
      keepStream: true,
      toastDuration: 1400,
      skipHistory: false,
    });
    return;
  }
  [
    els.adminStreamFlowMin,
    els.adminStreamFlowTarget,
    els.adminStreamFlowMax,
    els.adminStreamTemperatureMin,
    els.adminStreamTemperatureTarget,
    els.adminStreamTemperatureMax,
    els.adminStreamPressureMin,
    els.adminStreamPressureTarget,
    els.adminStreamPressureMax,
    els.adminStreamLockedFlow,
  ].forEach((field) => setNullableNumberInput(field, null));
  if (els.adminStreamDownstreamUse) els.adminStreamDownstreamUse.value = "";
  if (els.adminStreamConstraintRole) els.adminStreamConstraintRole.value = "normal";
  if (els.adminStreamConstraintGroup) els.adminStreamConstraintGroup.value = "";
  if (els.adminStreamRangeMode) els.adminStreamRangeMode.value = "monitor";
  if (els.adminStreamUseAsTarget) els.adminStreamUseAsTarget.checked = false;
  if (els.adminStreamTargetSolveMode) els.adminStreamTargetSolveMode.value = "adjust-siblings";
  setNullableNumberInput(els.adminStreamCalculationPriority, 100);
  setNullableNumberInput(els.adminStreamTargetTolerancePercent, DEFAULT_NODE_TOLERANCE_PERCENT);
  if (els.adminStreamAllowAutoAdjust) els.adminStreamAllowAutoAdjust.checked = false;
  showToast("Range stream dibersihkan", "success", { duration: 1400 });
}

function loadStreamForm(streamId) {
  const stream = STREAMS.find((item) => item.id === streamId) || STREAMS[0] || {};
  els.adminStreamId.value = safeText(stream.id, "");
  els.adminStreamLabel.value = safeText(stream.label, "");
  els.adminStreamFrom.value = safeText(stream.from, NODES[0]?.tag || "");
  els.adminStreamTo.value = safeText(stream.to, NODES[1]?.tag || NODES[0]?.tag || "");
  updateAdminStreamPortOptions({
    fromPort: safeText(stream.fromPort, ""),
    toPort: safeText(stream.toPort, ""),
  });
  els.adminStreamType.value = safeText(stream.type, "liquid");
  els.adminStreamShape.value = normalizeStreamShape(stream.shape);
  els.adminStreamStrokeWidth.value = safeNumber(stream.strokeWidth, getDefaultStreamStrokeWidth(stream));
  if (els.adminStreamLabelMode) els.adminStreamLabelMode.value = safeText(stream.labelMode, "hover");
  if (els.adminStreamAutoRoute) els.adminStreamAutoRoute.checked = stream.autoRoute !== false;
  if (els.adminStreamAvoidNodes) els.adminStreamAvoidNodes.checked = stream.avoidNodes !== false;
  if (els.adminStreamUnit) els.adminStreamUnit.value = safeText(stream.unit, "");
  if (els.adminStreamSection) els.adminStreamSection.value = safeText(stream.section, "");
  if (els.adminStreamCategory) els.adminStreamCategory.value = safeText(stream.category, inferStreamCategory(stream));
  if (els.adminStreamFlowrate) els.adminStreamFlowrate.value = Number.isFinite(Number(getStreamFlowM3H(stream))) ? getStreamFlowM3H(stream) : "";
  if (els.adminStreamFlowUnit) els.adminStreamFlowUnit.value = safeText(stream.flowUnit, DEFAULT_FLOW_UNIT);
  if (els.adminStreamTemperature) els.adminStreamTemperature.value = stream.temperature ?? "";
  if (els.adminStreamPressure) els.adminStreamPressure.value = stream.pressure ?? "";
  if (els.adminStreamDensity) els.adminStreamDensity.value = stream.density ?? "";
  if (els.adminStreamDensityTonM3) els.adminStreamDensityTonM3.value = Number.isFinite(Number(stream.densityTonM3)) ? stream.densityTonM3 : "";
  if (els.adminStreamPhase) els.adminStreamPhase.value = normalizeStreamPhase(stream.phase || inferPhaseFromStream(stream));
  if (els.adminStreamIsCalculated) els.adminStreamIsCalculated.checked = Boolean(stream.isCalculated);
  if (els.adminStreamIsFinalProduct) els.adminStreamIsFinalProduct.checked = Boolean(stream.isFinalProduct);
  if (els.adminStreamIncludeProductTable) els.adminStreamIncludeProductTable.checked = Boolean(stream.includeInProductTable);
  if (els.adminStreamIncludeFeedTable) els.adminStreamIncludeFeedTable.checked = Boolean(stream.includeInFeedTable);
  if (els.adminStreamBalanceCategory) els.adminStreamBalanceCategory.value = normalizeBalanceCategory(stream.balanceCategory || inferBalanceCategory(stream));
  if (els.adminStreamBalanceRole) els.adminStreamBalanceRole.value = normalizeStreamBalanceRole(stream.balanceRole || (stream.isFinalProduct ? "product" : "internal"));
  if (els.adminStreamIsRecycle) els.adminStreamIsRecycle.checked = Boolean(stream.isRecycle || normalizeStreamBalanceRole(stream.balanceRole) === "recycle");
  if (els.adminStreamIncludeNodeBalance) els.adminStreamIncludeNodeBalance.checked = stream.includeInNodeBalance !== false;
  if (els.adminStreamIncludeUnitBalance) els.adminStreamIncludeUnitBalance.checked = stream.includeInUnitBalance !== false;
  if (els.adminStreamDownstreamUse) els.adminStreamDownstreamUse.value = safeText(stream.downstreamUse, "");
  if (els.adminStreamConstraintRole) els.adminStreamConstraintRole.value = normalizeStreamConstraintRole(stream.constraintRole);
  if (els.adminStreamConstraintGroup) els.adminStreamConstraintGroup.value = safeText(stream.constraintGroup, "");
  setNullableNumberInput(els.adminStreamFlowMin, stream.flowMin);
  setNullableNumberInput(els.adminStreamFlowTarget, stream.flowTarget);
  setNullableNumberInput(els.adminStreamFlowMax, stream.flowMax);
  if (els.adminStreamFlowRangeUnit) els.adminStreamFlowRangeUnit.value = normalizeStreamFlowRangeUnit(stream.flowRangeUnit || stream.flowUnit || DEFAULT_FLOW_UNIT);
  if (els.adminStreamRangeMode) els.adminStreamRangeMode.value = normalizeStreamRangeMode(stream.rangeMode);
  if (els.adminStreamUseAsTarget) els.adminStreamUseAsTarget.checked = Boolean(stream.useAsCalculationTarget);
  setNullableNumberInput(els.adminStreamCalculationPriority, Number.isFinite(Number(stream.calculationPriority)) ? stream.calculationPriority : 100);
  if (els.adminStreamTargetSolveMode) els.adminStreamTargetSolveMode.value = normalizeTargetSolveMode(stream.targetSolveMode);
  setNullableNumberInput(els.adminStreamTargetTolerancePercent, Number.isFinite(Number(stream.targetTolerancePercent)) ? stream.targetTolerancePercent : DEFAULT_NODE_TOLERANCE_PERCENT);
  if (els.adminStreamAllowAutoAdjust) els.adminStreamAllowAutoAdjust.checked = Boolean(stream.allowAutoAdjust);
  setNullableNumberInput(els.adminStreamLockedFlow, stream.lockedFlow);
  setNullableNumberInput(els.adminStreamTemperatureMin, stream.temperatureMin);
  setNullableNumberInput(els.adminStreamTemperatureTarget, stream.temperatureTarget);
  setNullableNumberInput(els.adminStreamTemperatureMax, stream.temperatureMax);
  setNullableNumberInput(els.adminStreamPressureMin, stream.pressureMin);
  setNullableNumberInput(els.adminStreamPressureTarget, stream.pressureTarget);
  setNullableNumberInput(els.adminStreamPressureMax, stream.pressureMax);
  syncStreamBalanceRoleControls();
  if (els.adminStreamVisibleIn) els.adminStreamVisibleIn.value = normalizeVisibleIn(stream.visibleIn, stream.isMajor).join(", ");
  if (els.adminStreamIsMajor) els.adminStreamIsMajor.checked = Boolean(stream.isMajor);
  if (stream.id) getStreamRenderPoints(stream);
  updateStreamPointStatus();
}

function updateAdminStreamPortOptions(options = {}) {
  if (!els.adminStreamFrom || !els.adminStreamTo) return;
  const from = nodeByTag.get(els.adminStreamFrom.value);
  const to = nodeByTag.get(els.adminStreamTo.value);
  fillSelect(
    els.adminStreamFromPort,
    getNodePorts(from, "outputs"),
    (port) => port.id,
    (port) => `${port.label} (${port.id})`,
  );
  fillSelect(
    els.adminStreamToPort,
    getNodePorts(to, "inputs"),
    (port) => port.id,
    (port) => `${port.label} (${port.id})`,
  );
  if (els.adminStreamFromPort) {
    els.adminStreamFromPort.value = options.resetFrom
      ? getValidPortId(from, "outputs", "")
      : getValidPortId(from, "outputs", options.fromPort || els.adminStreamFromPort.value);
  }
  if (els.adminStreamToPort) {
    els.adminStreamToPort.value = options.resetTo
      ? getValidPortId(to, "inputs", "")
      : getValidPortId(to, "inputs", options.toPort || els.adminStreamToPort.value);
  }
}

function createNewStreamDraft() {
  if (!requireEditMode("Tambah Stream")) return;
  state.streamEditMode = false;
  state.selectedStreamPointIndex = -1;
  const visibleNodes = getVisibleNodes();
  const preferredFrom = nodeById.get(state.selectedNodeId) || visibleNodes[0];
  const fromNode = preferredFrom && getNodePorts(preferredFrom, "outputs").length
    ? preferredFrom
    : visibleNodes.find((node) => getNodePorts(node, "outputs").length);
  const toNode = visibleNodes.find((node) => node.tag !== fromNode?.tag && getNodePorts(node, "inputs").length);
  if (!fromNode || !toNode) {
    console.warn("Stream gagal dibuat: missing from/to node visible.", { fromNode, toNode });
    showToast("Stream gagal dibuat: pilih node asal dan tujuan", "error");
    return;
  }
  const stream = {
    id: generateUniqueStreamId("S"),
    label: "New Stream",
    from: fromNode.tag,
    fromPort: firstOutputPortId(fromNode),
    to: toNode.tag,
    toPort: firstInputPortId(toNode),
    type: "liquid",
    category: "main",
    shape: "cable",
    strokeWidth: 2.2,
    points: [],
    autoRoute: true,
    avoidNodes: true,
    labelMode: "hover",
    flowrate: null,
    flowUnit: DEFAULT_FLOW_UNIT,
    flowM3H: null,
    flowMBSD: null,
    percentCap: null,
    temperature: null,
    pressure: null,
    density: null,
    densityTonM3: null,
    phase: "liquid",
    isCalculated: false,
    isFinalProduct: false,
    includeInProductTable: false,
    includeInFeedTable: false,
    balanceCategory: "hydrocarbon",
    visibleIn: getDefaultVisibleInForCurrentScope(),
    visibleInSimplified: true,
    unit: state.currentUnit || inferStreamUnit({}, fromNode, toNode),
    section: state.currentSection || inferStreamSection({}, fromNode, toNode),
    isMajor: state.currentScope === "refinery",
    userCreated: true,
  };
  applyDefaultStreamMassFields(stream);
  if (!validateStreamDraft(stream, "")) return;
  STREAMS.push(stream);
  state.activeStreamId = stream.id;
  state.streamEditMode = true;
  commitDataChange("Stream berhasil ditambahkan", { keepStream: true });
  switchAdminTab("stream");
  loadStreamForm(stream.id);
  selectStream(stream.id, { syncAdmin: false });
}

function saveStreamFromForm() {
  if (!requireEditMode("Simpan Stream")) return;
  clearAdminValidation();
  const oldId = state.activeStreamId;
  const existing = STREAMS.find((item) => item.id === oldId);
  const flowrate = readNullableNumberInput(els.adminStreamFlowrate);
  if (Number.isNaN(flowrate)) return markInvalid(els.adminStreamFlowrate, "Flowrate harus angka atau kosong");
  const densityTonM3 = readNullableNumberInput(els.adminStreamDensityTonM3);
  if (Number.isNaN(densityTonM3)) return markInvalid(els.adminStreamDensityTonM3, "Density ton/m3 harus angka atau kosong");
  const flowMin = readNullableNumberInput(els.adminStreamFlowMin);
  if (Number.isNaN(flowMin)) return markInvalid(els.adminStreamFlowMin, "Flow Min harus angka atau kosong");
  const flowTarget = readNullableNumberInput(els.adminStreamFlowTarget);
  if (Number.isNaN(flowTarget)) return markInvalid(els.adminStreamFlowTarget, "Flow Target harus angka atau kosong");
  const flowMax = readNullableNumberInput(els.adminStreamFlowMax);
  if (Number.isNaN(flowMax)) return markInvalid(els.adminStreamFlowMax, "Flow Max harus angka atau kosong");
  const calculationPriority = readNullableNumberInput(els.adminStreamCalculationPriority);
  if (Number.isNaN(calculationPriority)) return markInvalid(els.adminStreamCalculationPriority, "Calculation Priority harus angka atau kosong");
  const targetTolerancePercent = readNullableNumberInput(els.adminStreamTargetTolerancePercent);
  if (Number.isNaN(targetTolerancePercent)) return markInvalid(els.adminStreamTargetTolerancePercent, "Target Tolerance harus angka atau kosong");
  const lockedFlow = readNullableNumberInput(els.adminStreamLockedFlow);
  if (Number.isNaN(lockedFlow)) return markInvalid(els.adminStreamLockedFlow, "Locked Flow harus angka atau kosong");
  const temperatureMin = readNullableNumberInput(els.adminStreamTemperatureMin);
  if (Number.isNaN(temperatureMin)) return markInvalid(els.adminStreamTemperatureMin, "Temperature Min harus angka atau kosong");
  const temperatureTarget = readNullableNumberInput(els.adminStreamTemperatureTarget);
  if (Number.isNaN(temperatureTarget)) return markInvalid(els.adminStreamTemperatureTarget, "Temperature Target harus angka atau kosong");
  const temperatureMax = readNullableNumberInput(els.adminStreamTemperatureMax);
  if (Number.isNaN(temperatureMax)) return markInvalid(els.adminStreamTemperatureMax, "Temperature Max harus angka atau kosong");
  const pressureMin = readNullableNumberInput(els.adminStreamPressureMin);
  if (Number.isNaN(pressureMin)) return markInvalid(els.adminStreamPressureMin, "Pressure Min harus angka atau kosong");
  const pressureTarget = readNullableNumberInput(els.adminStreamPressureTarget);
  if (Number.isNaN(pressureTarget)) return markInvalid(els.adminStreamPressureTarget, "Pressure Target harus angka atau kosong");
  const pressureMax = readNullableNumberInput(els.adminStreamPressureMax);
  if (Number.isNaN(pressureMax)) return markInvalid(els.adminStreamPressureMax, "Pressure Max harus angka atau kosong");
  let balanceRole = normalizeStreamBalanceRole(els.adminStreamBalanceRole?.value);
  let isRecycle = Boolean(els.adminStreamIsRecycle?.checked);
  let includeInNodeBalance = Boolean(els.adminStreamIncludeNodeBalance?.checked);
  let includeInUnitBalance = Boolean(els.adminStreamIncludeUnitBalance?.checked);
  if (balanceRole === "recycle" || isRecycle) {
    balanceRole = "recycle";
    isRecycle = true;
    includeInNodeBalance = false;
    includeInUnitBalance = true;
  }
  const rangeMode = normalizeStreamRangeMode(els.adminStreamRangeMode?.value);
  const useAsCalculationTarget = Boolean(els.adminStreamUseAsTarget?.checked) || rangeMode === "control-target" || rangeMode === "locked-flow";
  const targetSolveMode = normalizeTargetSolveMode(els.adminStreamTargetSolveMode?.value);
  const stream = {
    id: els.adminStreamId.value.trim(),
    from: els.adminStreamFrom.value,
    fromPort: els.adminStreamFromPort?.value || "out",
    to: els.adminStreamTo.value,
    toPort: els.adminStreamToPort?.value || "in",
    type: els.adminStreamType.value,
    label: els.adminStreamLabel.value.trim(),
    shape: normalizeStreamShape(els.adminStreamShape.value),
    strokeWidth: readNumber(els.adminStreamStrokeWidth, 2),
    autoRoute: Boolean(els.adminStreamAutoRoute?.checked),
    avoidNodes: Boolean(els.adminStreamAvoidNodes?.checked),
    labelMode: safeText(els.adminStreamLabelMode?.value, "hover"),
    visibleInSimplified: typeof existing?.visibleInSimplified === "boolean"
      ? existing.visibleInSimplified
      : true,
    unit: els.adminStreamUnit?.value.trim() || "INTERUNIT",
    section: els.adminStreamSection?.value.trim() || "General",
    category: els.adminStreamCategory?.value.trim() || inferStreamCategory({ type: els.adminStreamType.value, label: els.adminStreamLabel.value }),
    flowrate,
    flowUnit: els.adminStreamFlowUnit?.value.trim() || DEFAULT_FLOW_UNIT,
    flowM3H: flowrate,
    flowMBSD: flowrate === null ? null : convertM3HToMBSD(flowrate),
    percentCap: flowrate === null ? null : calculatePercentCapacityFromM3H(flowrate),
    temperature: readNullableProcessInput(els.adminStreamTemperature),
    pressure: readNullableProcessInput(els.adminStreamPressure),
    density: readNullableProcessInput(els.adminStreamDensity),
    densityTonM3,
    phase: normalizeStreamPhase(els.adminStreamPhase?.value || inferPhaseFromStream({ type: els.adminStreamType.value })),
    isCalculated: Boolean(els.adminStreamIsCalculated?.checked),
    isFinalProduct: Boolean(els.adminStreamIsFinalProduct?.checked),
    includeInProductTable: Boolean(els.adminStreamIncludeProductTable?.checked),
    includeInFeedTable: Boolean(els.adminStreamIncludeFeedTable?.checked),
    balanceCategory: normalizeBalanceCategory(els.adminStreamBalanceCategory?.value || inferBalanceCategory({ type: els.adminStreamType.value, category: els.adminStreamCategory?.value })),
    balanceRole,
    isRecycle,
    includeInNodeBalance,
    includeInUnitBalance,
    flowMin,
    flowTarget,
    flowMax,
    flowRangeUnit: normalizeStreamFlowRangeUnit(els.adminStreamFlowRangeUnit?.value || DEFAULT_FLOW_UNIT),
    rangeMode,
    useAsCalculationTarget,
    calculationPriority: calculationPriority ?? 100,
    targetSolveMode,
    targetTolerancePercent: targetTolerancePercent ?? DEFAULT_NODE_TOLERANCE_PERCENT,
    allowAutoAdjust: Boolean(els.adminStreamAllowAutoAdjust?.checked),
    lockedFlow,
    temperatureMin,
    temperatureTarget,
    temperatureMax,
    pressureMin,
    pressureTarget,
    pressureMax,
    downstreamUse: els.adminStreamDownstreamUse?.value.trim() || "",
    constraintRole: normalizeStreamConstraintRole(els.adminStreamConstraintRole?.value),
    constraintGroup: els.adminStreamConstraintGroup?.value.trim() || "",
    rangeStatus: normalizeStreamRangeStatus(existing?.rangeStatus),
    splitKey: safeText(existing?.splitKey, ""),
    splitSource: safeText(existing?.splitSource, ""),
    visibleIn: normalizeVisibleIn(els.adminStreamVisibleIn?.value || "", Boolean(els.adminStreamIsMajor?.checked)),
    isMajor: Boolean(els.adminStreamIsMajor?.checked),
    userCreated: existing?.userCreated === true || !existing,
  };
  if (Array.isArray(existing?.points)) {
    stream.points = deepClone(existing.points);
  }

  if (!validateStreamDraft(stream, oldId)) return;
  syncStreamEndpointPoints(stream);

  const index = STREAMS.findIndex((item) => item.id === oldId);
  if (index >= 0) {
    STREAMS[index] = stream;
  } else {
    STREAMS.push(stream);
  }

  state.activeStreamId = stream.id;
  if (state.streamEditMode && !stream.points) ensureStreamPoints(stream);
  commitDataChange(existing ? "Stream tersimpan" : "Stream berhasil ditambahkan", { keepStream: true });
}

function deleteSelectedStream() {
  if (!requireEditMode("Hapus Stream")) return;
  const streamId = state.activeStreamId;
  if (!streamId) return;
  const confirmed = window.confirm(`Hapus stream ${streamId}?`);
  if (!confirmed) return;
  const index = STREAMS.findIndex((stream) => stream.id === streamId);
  if (index >= 0) STREAMS.splice(index, 1);
  state.activeStreamId = STREAMS[0]?.id || "";
  state.streamEditMode = false;
  state.selectedStreamPointIndex = -1;
  commitDataChange("Stream dihapus");
}

function validateAreaDraft(area, oldId) {
  if (!area.id) return markInvalid(els.adminAreaId, "ID area wajib diisi");
  if (!area.name) return markInvalid(els.adminAreaName, "Nama area wajib diisi");
  if (AREAS.some((item) => item.id === area.id && item.id !== oldId)) {
    return markInvalid(els.adminAreaId, "ID area sudah digunakan");
  }
  if (!isFiniteRect(area)) return markInvalid(els.adminAreaX, "Koordinat dan ukuran area harus berupa angka valid");
  if (area.width < 180 || area.height < 140) return markInvalid(els.adminAreaWidth, "Ukuran area terlalu kecil");
  if (!isRectReasonable(area)) return markInvalid(els.adminAreaX, "Area berada terlalu jauh dari batas canvas");
  return true;
}

function validateNodeDraft(node, oldTag) {
  if (!node.tag) return markInvalid(els.adminNodeTag, "Tag node wajib diisi");
  if (!node.name) return markInvalid(els.adminNodeName, "Nama node wajib diisi");
  if (NODES.some((item) => item.tag === node.tag && item.tag !== oldTag)) {
    return markInvalid(els.adminNodeTag, "Tag node sudah digunakan");
  }
  const candidateId = node.id || makeNodeId(node.tag);
  if (NODES.some((item) => item.id === candidateId && item.tag !== oldTag)) {
    return markInvalid(els.adminNodeTag, "Tag menghasilkan ID node yang sudah digunakan");
  }
  if (!isFiniteRect(node)) return markInvalid(els.adminNodeX, "Koordinat dan ukuran node harus berupa angka valid");
  if (node.width < 80 || node.height < 44) return markInvalid(els.adminNodeWidth, "Ukuran node terlalu kecil");
  if (!isRectReasonable(node)) return markInvalid(els.adminNodeX, "Node berada terlalu jauh dari batas canvas");
  if (!validateNodePorts(node)) return false;
  return true;
}

function validateNodePorts(node) {
  const groups = [
    ["inputs", getNodePorts(node, "inputs"), els.adminNodeInputPorts],
    ["outputs", getNodePorts(node, "outputs"), els.adminNodeOutputPorts],
  ];
  for (const [, ports, field] of groups) {
    const ids = new Set();
    for (const port of ports) {
      if (!port.id) return markInvalid(field || els.adminNodeInputPorts, "Port ID tidak boleh kosong");
      const key = `${port.id}`;
      if (ids.has(key)) return markInvalid(field || els.adminNodeInputPorts, "Port ID tidak boleh duplikat dalam satu grup port");
      ids.add(key);
      if (!["left", "right", "top", "bottom"].includes(port.side)) {
        return markInvalid(field || els.adminNodeInputPorts, "Side port harus left/right/top/bottom");
      }
      if (!Number.isFinite(Number(port.offset)) || Number(port.offset) < 0 || Number(port.offset) > 1) {
        return markInvalid(field || els.adminNodeInputPorts, "Offset port harus angka 0 sampai 1");
      }
    }
  }
  return true;
}

function validateStreamDraft(stream, oldId) {
  const validTypes = new Set(["liquid", "water", "gas", "air", "solid"]);
  const validShapes = new Set(["straight", "autoStraight", "elbow", "curve", "bezier", "cable", "polyline"]);
  if (!stream.id) return markInvalid(els.adminStreamId, "ID stream wajib diisi");
  if (STREAMS.some((item) => item.id === stream.id && item.id !== oldId)) {
    return markInvalid(els.adminStreamId, "ID stream sudah digunakan");
  }
  if (!nodeByTag.has(stream.from)) return markInvalid(els.adminStreamFrom, "From node tidak valid");
  if (!nodeByTag.has(stream.to)) return markInvalid(els.adminStreamTo, "To node tidak valid");
  if (stream.from === stream.to) return markInvalid(els.adminStreamTo, "From dan To stream tidak boleh sama");
  if (!getValidPortId(nodeByTag.get(stream.from), "outputs", stream.fromPort)) {
    return markInvalid(els.adminStreamFromPort, "From port harus output port yang valid");
  }
  if (!getValidPortId(nodeByTag.get(stream.to), "inputs", stream.toPort)) {
    return markInvalid(els.adminStreamToPort, "To port harus input port yang valid");
  }
  if (!validTypes.has(stream.type)) return markInvalid(els.adminStreamType, "Jenis stream tidak valid");
  if (!VALID_STREAM_PHASES.has(stream.phase)) return markInvalid(els.adminStreamPhase, "Phase stream tidak valid");
  if (!VALID_BALANCE_CATEGORIES.has(stream.balanceCategory)) return markInvalid(els.adminStreamBalanceCategory, "Balance category tidak valid");
  if (!VALID_STREAM_BALANCE_ROLES.has(stream.balanceRole)) return markInvalid(els.adminStreamBalanceRole, "Balance role tidak valid");
  if (!VALID_STREAM_CONSTRAINT_ROLES.has(stream.constraintRole)) return markInvalid(els.adminStreamConstraintRole, "Constraint role tidak valid");
  if (!VALID_STREAM_FLOW_RANGE_UNITS.has(stream.flowRangeUnit)) return markInvalid(els.adminStreamFlowRangeUnit, "Flow range unit tidak valid");
  if (!VALID_STREAM_RANGE_MODES.has(stream.rangeMode)) return markInvalid(els.adminStreamRangeMode, "Range mode tidak valid");
  if (!VALID_TARGET_SOLVE_MODES.has(stream.targetSolveMode)) return markInvalid(els.adminStreamTargetSolveMode, "Solve mode tidak valid");
  if (stream.flowrate !== null && !Number.isFinite(Number(stream.flowrate))) {
    return markInvalid(els.adminStreamFlowrate, "Flowrate harus angka atau kosong");
  }
  const invalidRange = [
    [stream.flowMin, els.adminStreamFlowMin, "Flow Min"],
    [stream.flowTarget, els.adminStreamFlowTarget, "Flow Target"],
    [stream.flowMax, els.adminStreamFlowMax, "Flow Max"],
    [stream.calculationPriority, els.adminStreamCalculationPriority, "Calculation Priority"],
    [stream.targetTolerancePercent, els.adminStreamTargetTolerancePercent, "Target Tolerance"],
    [stream.lockedFlow, els.adminStreamLockedFlow, "Locked Flow"],
    [stream.temperatureMin, els.adminStreamTemperatureMin, "Temperature Min"],
    [stream.temperatureTarget, els.adminStreamTemperatureTarget, "Temperature Target"],
    [stream.temperatureMax, els.adminStreamTemperatureMax, "Temperature Max"],
    [stream.pressureMin, els.adminStreamPressureMin, "Pressure Min"],
    [stream.pressureTarget, els.adminStreamPressureTarget, "Pressure Target"],
    [stream.pressureMax, els.adminStreamPressureMax, "Pressure Max"],
  ].some(([value, field, label]) => {
    if (value === null || Number.isFinite(Number(value))) return false;
    markInvalid(field, `${label} harus angka atau kosong`);
    return true;
  });
  if (invalidRange) return false;
  if (stream.flowTarget !== null) {
    if (stream.flowMin !== null && Number(stream.flowTarget) < Number(stream.flowMin)) {
      return markInvalid(els.adminStreamFlowTarget, "Flow Target harus berada di antara Flow Min dan Flow Max");
    }
    if (stream.flowMax !== null && Number(stream.flowTarget) > Number(stream.flowMax)) {
      return markInvalid(els.adminStreamFlowTarget, "Flow Target harus berada di antara Flow Min dan Flow Max");
    }
  }
  if (!validShapes.has(stream.shape)) return markInvalid(els.adminStreamShape, "Shape stream tidak valid");
  if (!Number.isFinite(stream.strokeWidth) || stream.strokeWidth < 1 || stream.strokeWidth > 4) {
    return markInvalid(els.adminStreamStrokeWidth, "Stroke width harus 1 sampai 4");
  }
  return true;
}

function isFiniteRect(rect) {
  return ["x", "y", "width", "height"].every((field) => Number.isFinite(Number(rect[field])));
}

function isRectReasonable(rect) {
  const margin = 600;
  return rect.x >= -margin
    && rect.y >= -margin
    && rect.x <= CANVAS.width + margin
    && rect.y <= CANVAS.height + margin;
}

function markInvalid(field, message) {
  if (field) {
    field.setAttribute("aria-invalid", "true");
    field.title = message;
    field.focus();
  }
  showToast(message, "error");
  return false;
}

function clearAdminValidation() {
  els.adminEditable?.forEach((field) => {
    field.removeAttribute("aria-invalid");
    field.removeAttribute("title");
  });
}

function renderConfigSummary() {
  if (!els.adminAreaCount) return;
  els.adminAreaCount.textContent = String(AREAS.length);
  els.adminNodeCount.textContent = String(NODES.length);
  els.adminStreamCount.textContent = String(STREAMS.length);
  els.adminStorageStatus.textContent = safeLocalStorageGet(ADMIN_STORAGE_KEY) ? "Tersimpan" : "Default";
  if (els.adminDeploymentStatus) {
    els.adminDeploymentStatus.textContent = state.deploymentStatus || "Autosaved locally";
    els.adminDeploymentStatus.dataset.status = state.deploymentStatusType || "local";
  }
  const capacity = getCduBaseCapacity();
  if (els.adminCduBaseCapacityM3H) els.adminCduBaseCapacityM3H.value = String(capacity.m3h);
  if (els.adminCduBaseCapacityMBSD) els.adminCduBaseCapacityMBSD.value = String(capacity.mbsd);
  if (els.adminCduTablesVisible) els.adminCduTablesVisible.checked = state.cduTablesVisible !== false;
  if (els.adminShowNodeBalance) els.adminShowNodeBalance.checked = state.showNodeBalance !== false;
  if (els.adminCduAutoHidePresentation) els.adminCduAutoHidePresentation.checked = state.cduAutoHideTableInPresentation !== false;
}

function updateDeploymentStatus(message = "Autosaved locally", type = "local") {
  state.deploymentStatus = message;
  state.deploymentStatusType = type;
  if (els.adminDeploymentStatus) {
    els.adminDeploymentStatus.textContent = message;
    els.adminDeploymentStatus.dataset.status = type;
  }
}

function saveCduCapacitySettingsFromForm() {
  if (!requireEditMode("Simpan CDU Capacity Settings")) {
    renderConfigSummary();
    return;
  }
  const m3h = Number(els.adminCduBaseCapacityM3H?.value);
  const mbsd = Number(els.adminCduBaseCapacityMBSD?.value);
  if (!Number.isFinite(m3h) || m3h <= 0) {
    markInvalid(els.adminCduBaseCapacityM3H, "Base capacity M3/h harus lebih besar dari 0");
    return;
  }
  if (!Number.isFinite(mbsd) || mbsd <= 0) {
    markInvalid(els.adminCduBaseCapacityMBSD, "Base capacity MBSD harus lebih besar dari 0");
    return;
  }
  pushUndoSnapshot("CDU capacity settings diperbarui");
  state.cduBaseCapacity = normalizeCduBaseCapacity({ m3h, mbsd });
  const currentRun = normalizeCduRunState(state.cduRunState);
  state.cduRunState = normalizeCduRunState(currentRun.intakeUnit === "mbsd"
    ? { ...currentRun, crudeIntakeM3H: convertMBSDToM3H(currentRun.crudeIntakeMBSD) }
    : { ...currentRun, crudeIntakeMBSD: convertM3HToMBSD(currentRun.crudeIntakeM3H) });
  state.cduTablesVisible = els.adminCduTablesVisible?.checked !== false;
  state.showNodeBalance = els.adminShowNodeBalance?.checked !== false;
  state.cduAutoHideTableInPresentation = els.adminCduAutoHidePresentation?.checked !== false;
  recalculateCduVolumeMetrics();
  refreshMassBalanceAfterDataChange("CDU capacity settings tersimpan", {
    focusSelected: false,
    skipHistorySnapshot: true,
  });
}

function fillSelect(select, items, valueFn, labelFn) {
  if (!select) return;
  const selected = select.value;
  select.replaceChildren();
  if (!items.length) {
    const option = document.createElement("option");
    option.value = "";
    option.textContent = "Tidak ada data";
    select.appendChild(option);
    return;
  }
  items.forEach((item) => {
    const option = document.createElement("option");
    option.value = valueFn(item);
    option.textContent = labelFn(item);
    select.appendChild(option);
  });
  if (items.some((item) => valueFn(item) === selected)) select.value = selected;
}

function readNumber(input, fallback) {
  const value = Number(input?.value);
  return Number.isFinite(value) ? value : fallback;
}

function safeNumber(value, fallback) {
  const number = Number(value);
  return Number.isFinite(number) ? number : fallback;
}

function isFinitePoint(point) {
  return Boolean(point)
    && Number.isFinite(Number(point.x))
    && Number.isFinite(Number(point.y));
}

function isPlainObject(value) {
  return Boolean(value) && typeof value === "object" && !Array.isArray(value);
}

function textareaToList(value) {
  const items = value.split(/\r?\n/).map((item) => item.trim()).filter(Boolean);
  return items.length ? items : ["Belum ada data fungsi utama."];
}

function makeUniqueId(prefix, existingIds) {
  const existing = new Set(existingIds);
  let index = 1;
  let candidate = prefix;
  while (existing.has(candidate)) {
    candidate = `${prefix}-${index}`;
    index += 1;
  }
  return candidate;
}

function makeNodeId(tag) {
  return `node-${slugify(tag)}`;
}

function slugify(value) {
  return String(value || "node")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "") || "node";
}

function normalizeColor(value, fallback) {
  return /^#[0-9a-f]{6}$/i.test(String(value || "")) ? value : fallback;
}

function showToast(message, type = "info", options = {}) {
  if (!els.toastRoot) return;
  while (els.toastRoot.children.length >= 3) {
    els.toastRoot.firstElementChild?.remove();
  }
  const toast = document.createElement("div");
  toast.className = `toast toast-${type}`;
  toast.textContent = message;
  els.toastRoot.appendChild(toast);
  const duration = Number.isFinite(Number(options.duration))
    ? Number(options.duration)
    : type === "error"
      ? 2800
      : 1800;
  const dismiss = () => {
    if (!toast.isConnected || toast.classList.contains("is-leaving")) return;
    toast.classList.add("is-leaving");
    window.setTimeout(() => toast.remove(), 180);
  };
  toast.addEventListener("click", dismiss);
  window.setTimeout(dismiss, duration);
}

function safeJsonParse(value) {
  if (!value) return null;
  try {
    return JSON.parse(value);
  } catch (error) {
    console.warn("Gagal membaca JSON localStorage:", error);
    return null;
  }
}

function safeLocalStorageGet(key) {
  try {
    return localStorage.getItem(key);
  } catch (error) {
    console.warn(`Gagal mengakses localStorage key ${key}:`, error);
    showToast("Browser menolak akses localStorage. Memakai sample data sementara.", "warning");
    return null;
  }
}

function safeLocalStorageSet(key, value) {
  try {
    localStorage.setItem(key, value);
  } catch (error) {
    console.warn(`Gagal menyimpan localStorage key ${key}:`, error);
    throw error;
  }
}

function safeLocalStorageRemove(key) {
  try {
    localStorage.removeItem(key);
  } catch (error) {
    console.warn(`Gagal menghapus localStorage key ${key}:`, error);
    showToast("Browser menolak penghapusan localStorage.", "error");
  }
}

function validateConfigShape(config) {
  const issues = [];
  if (!isCanvasConfigValid(config?.canvas)) issues.push("canvas width/height tidak valid");
  if (!Array.isArray(config?.areas)) issues.push("areas bukan array");
  if (!Array.isArray(config?.nodes)) issues.push("nodes bukan array");
  if (!Array.isArray(config?.streams)) issues.push("streams bukan array");
  if (config?.pidSymbols !== undefined && !Array.isArray(config.pidSymbols)) issues.push("pidSymbols bukan array");
  if (config?.pidConnectors !== undefined && !Array.isArray(config.pidConnectors)) issues.push("pidConnectors bukan array");
  if (issues.length) return { valid: false, issues };

  const areaIds = new Set();
  config.areas.forEach((area, index) => {
    if (!safeText(area?.id, "")) issues.push(`area[${index}] tanpa id`);
    if (areaIds.has(area?.id)) issues.push(`duplicate area id ${area.id}`);
    areaIds.add(area?.id);
    ["x", "y", "width", "height"].forEach((field) => {
      if (!Number.isFinite(Number(area?.[field]))) issues.push(`area ${area?.id || index} ${field} tidak valid`);
    });
  });

  const nodeTags = new Set();
  const nodeIds = new Set();
  config.nodes.forEach((node, index) => {
    if (!safeText(node?.tag, "")) issues.push(`node[${index}] tanpa tag`);
    if (nodeTags.has(node?.tag)) issues.push(`duplicate node tag ${node.tag}`);
    if (node?.id && nodeIds.has(node.id)) issues.push(`duplicate node id ${node.id}`);
    nodeTags.add(node?.tag);
    if (node?.id) nodeIds.add(node.id);
    ["x", "y"].forEach((field) => {
      if (!Number.isFinite(Number(node?.[field]))) issues.push(`node ${node?.tag || index} ${field} tidak valid`);
    });
    ["width", "height"].forEach((field) => {
      if (node?.[field] !== undefined && !Number.isFinite(Number(node[field]))) {
        issues.push(`node ${node?.tag || index} ${field} tidak valid`);
      }
    });
  });

  const streamIds = new Set();
  config.streams.forEach((stream, index) => {
    if (!safeText(stream?.id, "")) issues.push(`stream[${index}] tanpa id`);
    if (streamIds.has(stream?.id)) issues.push(`duplicate stream id ${stream.id}`);
    streamIds.add(stream?.id);
    if (!nodeTags.has(stream?.from)) issues.push(`stream ${stream?.id || index} from tidak valid`);
    if (!nodeTags.has(stream?.to)) issues.push(`stream ${stream?.id || index} to tidak valid`);
    if (stream?.from && stream.from === stream.to) issues.push(`stream ${stream?.id || index} from/to sama`);
  });

  const pidSymbolIds = new Set();
  (config.pidSymbols || []).forEach((symbol, index) => {
    if (!safeText(symbol?.id, "")) issues.push(`pidSymbols[${index}] tanpa id`);
    if (pidSymbolIds.has(symbol?.id)) issues.push(`duplicate P&ID symbol id ${symbol.id}`);
    pidSymbolIds.add(symbol?.id);
    ["x", "y", "width", "height"].forEach((field) => {
      if (symbol?.[field] !== undefined && !Number.isFinite(Number(symbol[field]))) {
        issues.push(`P&ID symbol ${symbol?.id || index} ${field} tidak valid`);
      }
    });
  });

  return { valid: issues.length === 0, issues };
}

function isCanvasConfigValid(canvas) {
  const width = Number(canvas?.width);
  const height = Number(canvas?.height);
  return Number.isFinite(width) && Number.isFinite(height) && width >= 800 && height >= 600;
}

function updateAutosaveIndicator(label, status = "idle") {
  if (!els.autosaveIndicator) return;
  window.clearTimeout(state.saveIndicatorTimer);
  els.autosaveIndicator.textContent = label;
  els.autosaveIndicator.dataset.status = status;
  if (status === "saved") {
    state.saveIndicatorTimer = window.setTimeout(() => {
      if (!els.autosaveIndicator) return;
      els.autosaveIndicator.textContent = "Siap";
      els.autosaveIndicator.dataset.status = "idle";
    }, 2200);
  }
}

function deepClone(value) {
  return JSON.parse(JSON.stringify(value));
}

function isTextInputActive() {
  const element = document.activeElement;
  if (!element) return false;
  return ["INPUT", "TEXTAREA", "SELECT"].includes(element.tagName) || element.isContentEditable;
}

function isEditableTarget(target) {
  return Boolean(target?.closest?.(
    "input, textarea, select, option, button, label, [contenteditable='true'], .admin-panel, .detail-panel, .admin-login-modal, .shortcut-modal, .modal, .view-options-popover, .stream-quick-constraint, .context-toolbar, .quick-inspector, .pid-palette"
  ));
}

function isFormControl(target) {
  return isEditableTarget(target);
}

function isInsideInteractiveOverlay(eventOrTarget) {
  const target = eventOrTarget?.target || eventOrTarget;
  return Boolean(target?.closest?.(
    ".stream-quick-constraint-popover, .stream-quick-constraint-card, .stream-quick-constraint, input, select, textarea, button"
  ));
}

function shouldIgnoreGlobalShortcut(event) {
  return isEditableTarget(event?.target) || isTextInputActive();
}

function clearTextSelection() {
  if (isEditableTarget(document.activeElement)) return;
  const selection = window.getSelection && window.getSelection();
  if (selection && selection.removeAllRanges) {
    selection.removeAllRanges();
  }
}

function shouldIgnoreCanvasPanTarget(target) {
  return Boolean(target?.closest?.(
    "input, textarea, select, option, button, label, [contenteditable='true'], .admin-panel, .admin-login-modal, .detail-panel, .view-options-popover, .stream-quick-constraint, .context-toolbar, .quick-inspector, .pid-palette, .pid-symbol, .pid-symbol-port, .pid-symbol-resize-handle, .search-results, .stream-point-handle, .stream-endpoint-handle, .stream-hit-path, .node-port"
  ));
}

function beginCanvasPointerDrag(event) {
  clearTextSelection();
  document.body.classList.add("is-canvas-dragging");
  setInteractionMode(true);
  els.canvasViewport?.classList.add("is-panning");
  try {
    els.canvasViewport?.setPointerCapture?.(event.pointerId);
  } catch {
    // Pointer capture can fail if the browser already transferred capture to a child control.
  }
}

function endCanvasPointerDrag(event = {}) {
  try {
    if (event.pointerId !== undefined) {
      els.canvasViewport?.releasePointerCapture?.(event.pointerId);
    }
  } catch {
    // The pointer may already be released by the browser.
  }
  document.body.classList.remove("is-canvas-dragging");
  setInteractionMode(false);
  els.canvasViewport?.classList.remove("is-panning");
  clearTextSelection();
}

function handleWheel(event) {
  if (isFormControl(event.target) || !event.target.closest("#canvasViewport")) return;
  event.preventDefault();
  zoomAt(event.clientX, event.clientY, event.deltaY);
}

function setInteractionMode(enabled) {
  state.isInteracting = Boolean(enabled);
  document.body.classList.toggle("is-interacting", state.isInteracting);
}

function zoomAt(clientX, clientY, deltaY) {
  const rect = els.canvasViewport.getBoundingClientRect();
  const pointerX = clientX - rect.left;
  const pointerY = clientY - rect.top;
  const oldZoom = state.zoom || 1;
  const nextZoom = clamp(oldZoom * Math.exp(-deltaY * 0.0015), 0.15, 2.5);
  const worldX = (pointerX - state.panX) / oldZoom;
  const worldY = (pointerY - state.panY) / oldZoom;
  state.zoom = nextZoom;
  state.panX = pointerX - worldX * nextZoom;
  state.panY = pointerY - worldY * nextZoom;
  setInteractionMode(true);
  scheduleViewUpdate();
  window.clearTimeout(state.zoomEndTimer);
  state.zoomEndTimer = window.setTimeout(() => {
    setInteractionMode(false);
    renderContextToolbar();
    renderQuickInspector();
  }, 140);
}

function snapValue(value, gridSize = state.gridSize) {
  if (!state.snapToGrid) return value;
  const size = GRID_SIZE_OPTIONS.has(safeNumber(gridSize, 20)) ? safeNumber(gridSize, 20) : 20;
  return Math.round(safeNumber(value, 0) / size) * size;
}

function snapPoint(point) {
  if (!point) return { x: 0, y: 0 };
  return {
    x: snapValue(point.x),
    y: snapValue(point.y),
  };
}

function snapRect(rect) {
  if (!state.snapToGrid || !rect) return rect;
  return {
    ...rect,
    x: snapValue(rect.x),
    y: snapValue(rect.y),
    width: Math.max(80, snapValue(rect.width)),
    height: Math.max(50, snapValue(rect.height)),
  };
}

function startPan(event) {
  if (event.button !== 0) return;
  const target = event.target;
  const nodeTarget = target.closest?.(".canvas-node");

  // Keep popovers, inputs, and normal controls interactive.
  // Node cards are buttons, so they are handled before the generic button guard.
  if (!nodeTarget && isInsideInteractiveOverlay(event)) return;

  // Stream, port, and resize interactions own their pointerdown events.
  if (target.closest(".stream-point-handle, .stream-endpoint-handle, .node-port, .node-resize-handle, .pid-symbol-port, .pid-symbol-resize-handle")) return;
  if (state.activePidTool && isEditMode() && !target.closest(".pid-symbol")) return;

  // Node click must stay a real click. Only convert it to drag after pointer moves.
  // Moving nodes is allowed only in Edit Mode. In viewer mode, leave the event
  // untouched so the normal node click/detail handler still works.
  if (nodeTarget) {
    if (!isEditMode()) return;
    if (event.shiftKey || event.ctrlKey || event.metaKey) return;

    const node = nodeById.get(nodeTarget.dataset.nodeId);
    if (!node) return;
    if (node.locked) {
      showToast("Node terkunci. Unlock untuk memindahkan.", "warning");
      return;
    }

    state.pendingNodeDrag = {
      nodeId: node.id,
      pointerId: event.pointerId,
      x: event.clientX,
      y: event.clientY,
    };
    return;
  }

  if (isFormControl(target)) return;
  if (shouldIgnoreCanvasPanTarget(target)) return;

  event.preventDefault();
  state.isPanning = true;
  state.panStart = {
    pointerId: event.pointerId,
    x: event.clientX,
    y: event.clientY,
    panX: state.panX,
    panY: state.panY,
  };
  beginCanvasPointerDrag(event);
}

function updatePan(event) {
  if (
    state.isPanning
    || state.draggedNodeId
    || state.draggedStreamPoint
    || state.streamReconnectDrag
    || state.portConnectionDrag
    || state.resizingNode
    || state.draggingPidSymbol
    || state.resizingPidSymbol
  ) {
    event.preventDefault?.();
    clearTextSelection();
  }

  if (state.pendingNodeDrag && !state.draggedNodeId) {
    const pending = state.pendingNodeDrag;
    const dx0 = event.clientX - pending.x;
    const dy0 = event.clientY - pending.y;
    if (Math.abs(dx0) > 4 || Math.abs(dy0) > 4) {
      const node = nodeById.get(pending.nodeId);
      if (!node || node.locked) {
        state.pendingNodeDrag = null;
        return;
      }
      if (!state.selectedNodeTags.has(node.tag)) {
        state.selectedNodeTags.clear();
        state.selectedNodeTags.add(node.tag);
      }
      selectNode(node.id, { focus: false, renderHandles: false, openDetail: false, keepMulti: true });
      state.isPanning = false;
      state.draggedNodeId = node.id;
      state.nodeDragMoved = false;
      const selectedNodes = getSelectedNodes().filter((item) => !item.locked);
      state.panStart = {
        pointerId: pending.pointerId,
        x: pending.x,
        y: pending.y,
        nodeX: safeNumber(node.x, 0),
        nodeY: safeNumber(node.y, 0),
        selection: selectedNodes.map((item) => ({
          id: item.id,
          tag: item.tag,
          x: safeNumber(item.x, 0),
          y: safeNumber(item.y, 0),
        })),
      };
      const nodeElement = els.nodeLayer.querySelector(`.canvas-node[data-node-id="${CSS.escape(node.id)}"]`);
      nodeElement?.classList.add("is-dragging");
      pushUndoSnapshot("Move node");
      beginCanvasPointerDrag(event);
      event.preventDefault?.();
      clearTextSelection();
    }
  }

  if (state.portConnectionDrag) {
    updatePortConnectionDrag(event);
    return;
  }

  if (state.draggingPidSymbol) {
    updatePidSymbolDrag(event);
    return;
  }

  if (state.resizingPidSymbol) {
    updatePidSymbolResize(event);
    return;
  }

  if (state.streamReconnectDrag) {
    updateStreamReconnectDrag(event);
    return;
  }

  if (state.resizingNode) {
    updateNodeResize(event);
    return;
  }

  if (state.draggedStreamPoint) {
    const stream = STREAMS.find((item) => item.id === state.draggedStreamPoint.streamId);
    if (stream?.points?.[state.draggedStreamPoint.index]) {
      const rect = els.canvasViewport.getBoundingClientRect();
      const point = screenToCanvas(event.clientX - rect.left, event.clientY - rect.top);
      stream.autoRoute = false;
      const constrained = pushPointOutsideNodeBodies({
        x: Math.round(point.x),
        y: Math.round(point.y),
      }, stream);
      if (constrained.adjusted) state.routePointWasAdjusted = true;
      stream.points[state.draggedStreamPoint.index] = constrained.point;
      renderStreams();
      renderStreamPointEditor();
      renderStreamDetail(stream);
    }
    return;
  }

  if (state.draggedNodeId && state.panStart) {
    const node = nodeById.get(state.draggedNodeId);
    if (!node) return;
    const dx = (event.clientX - state.panStart.x) / state.zoom;
    const dy = (event.clientY - state.panStart.y) / state.zoom;
    const selection = Array.isArray(state.panStart.selection) && state.panStart.selection.length
      ? state.panStart.selection
      : [{ id: node.id, tag: node.tag, x: state.panStart.nodeX, y: state.panStart.nodeY }];
    let moved = false;
    selection.forEach((item) => {
      const targetNode = nodeById.get(item.id);
      if (!targetNode || targetNode.locked) return;
      const nextX = Math.round(item.x + dx);
      const nextY = Math.round(item.y + dy);
      if (targetNode.x === nextX && targetNode.y === nextY) return;
      targetNode.x = nextX;
      targetNode.y = nextY;
      moved = true;
      const element = els.nodeLayer.querySelector(`.canvas-node[data-node-id="${CSS.escape(targetNode.id)}"]`);
      if (element) {
        element.style.left = `${targetNode.x}px`;
        element.style.top = `${targetNode.y}px`;
      }
      syncConnectedStreamEndpointPoints(targetNode.tag);
    });
    if (moved) {
      state.nodeDragMoved = true;
      if (state.activeNodeTag === node.tag) {
        els.adminNodeX.value = node.x;
        els.adminNodeY.value = node.y;
        updateAdminNodePreview();
      }
      renderStreams();
      renderStreamPointEditor();
      renderContextToolbar();
    }
    return;
  }

  if (!state.isPanning || !state.panStart) return;
  const dx = event.clientX - state.panStart.x;
  const dy = event.clientY - state.panStart.y;
  state.panX = state.panStart.panX + dx;
  state.panY = state.panStart.panY + dy;
  applyView();
}

function endPan(event = {}) {
  state.pendingNodeDrag = null;
  if (state.portConnectionDrag) {
    finishPortConnectionDrag(event);
    return;
  }

  if (state.draggingPidSymbol) {
    finishPidSymbolDrag(event);
    return;
  }

  if (state.resizingPidSymbol) {
    finishPidSymbolResize(event);
    return;
  }

  if (state.streamReconnectDrag) {
    finishStreamReconnectDrag(event);
    return;
  }

  if (state.resizingNode) {
    finishNodeResize();
    return;
  }

  if (state.draggedStreamPoint) {
    const stream = STREAMS.find((item) => item.id === state.draggedStreamPoint.streamId);
    state.draggedStreamPoint = null;
    document.body.classList.remove("is-canvas-dragging");
    setInteractionMode(false);
    clearTextSelection();
    if (stream) {
      if (state.snapToGrid && Array.isArray(stream.points)) {
        stream.points = stream.points.map((point) => snapPoint(point));
      }
      renderStreamPointEditor();
      if (state.routePointWasAdjusted) {
        showToast("Titik stream dipindahkan keluar dari node body.", "warning");
      }
      state.routePointWasAdjusted = false;
      commitDataChange("Jalur stream diperbarui", { keepStream: true });
    }
  }

  if (state.draggedNodeId) {
    const node = nodeById.get(state.draggedNodeId);
    const dragSelection = Array.isArray(state.panStart?.selection)
      ? state.panStart.selection.map((item) => nodeById.get(item.id)).filter(Boolean)
      : [];
    const nodeElement = [...els.nodeLayer.querySelectorAll(".canvas-node")]
      .find((element) => element.dataset.nodeId === state.draggedNodeId);
    nodeElement?.classList.remove("is-dragging");
    state.draggedNodeId = null;
    state.panStart = null;
    endCanvasPointerDrag(event);
    if (node && state.nodeDragMoved) {
      const movedNodes = dragSelection.length ? dragSelection : [node];
      movedNodes.forEach((item) => {
        if (item.locked) return;
        const snapped = snapPoint({ x: item.x, y: item.y });
        item.x = snapped.x;
        item.y = snapped.y;
        syncConnectedStreamEndpointPoints(item.tag);
      });
      state.activeNodeTag = node.tag;
      if (els.adminNodeX) els.adminNodeX.value = node.x;
      if (els.adminNodeY) els.adminNodeY.value = node.y;
      updateAdminNodePreview();
      state.suppressNodeClickUntil = Date.now() + 350;
      commitDataChange(movedNodes.length > 1 ? "Posisi node terpilih tersimpan" : "Posisi node tersimpan", { skipHistory: true });
      renderQuickInspector();
    }
    state.nodeDragMoved = false;
    return;
  }

  state.isPanning = false;
  state.panStart = null;
  endCanvasPointerDrag(event);
}

function setZoom(nextZoom) {
  const rect = els.canvasViewport.getBoundingClientRect();
  const center = screenToCanvas(rect.width / 2, rect.height / 2);
  const zoom = clamp(nextZoom, 0.15, 2.5);
  animateViewTo({
    zoom,
    panX: rect.width / 2 - center.x * zoom,
    panY: rect.height / 2 - center.y * zoom,
  }, 180);
}

function fitAll() {
  if (state.currentScope !== "refinery") {
    fitVisibleScope();
    return;
  }
  const rect = els.canvasViewport.getBoundingClientRect();
  if (!rect.width || !rect.height) return;

  const nextZoom = Math.min(rect.width / CANVAS.width, rect.height / CANVAS.height) * 0.92;
  const zoom = clamp(nextZoom, 0.18, 1.2);
  animateViewTo({
    zoom,
    panX: (rect.width - CANVAS.width * zoom) / 2,
    panY: (rect.height - CANVAS.height * zoom) / 2,
  }, 240);
}

function resetView() {
  animateViewTo({ zoom: 0.48, panX: 28, panY: 28 }, 220);
}

function screenToCanvas(x, y) {
  return {
    x: (x - state.panX) / state.zoom,
    y: (y - state.panY) / state.zoom,
  };
}

function applyView() {
  els.canvasStage.style.transform = `translate3d(${state.panX}px, ${state.panY}px, 0) scale(${state.zoom})`;
  els.zoomValue.textContent = `${Math.round(state.zoom * 100)}%`;
  updateZoomLabelDensity();
  updateViewStatus();
  updatePresentationOverlayPosition();
}

function scheduleViewUpdate() {
  if (state.viewRaf) return;
  state.viewRaf = window.requestAnimationFrame(() => {
    state.viewRaf = 0;
    applyView();
  });
}

function animateViewTo(nextView, duration = 180) {
  window.cancelAnimationFrame(state.zoomAnimationFrame);
  const start = { zoom: state.zoom, panX: state.panX, panY: state.panY };
  const startedAt = performance.now();
  setInteractionMode(true);
  const frame = (now) => {
    const t = clamp((now - startedAt) / duration, 0, 1);
    const eased = 1 - Math.pow(1 - t, 3);
    state.zoom = lerp(start.zoom, nextView.zoom, eased);
    state.panX = lerp(start.panX, nextView.panX, eased);
    state.panY = lerp(start.panY, nextView.panY, eased);
    applyView();
    if (t < 1) {
      state.zoomAnimationFrame = window.requestAnimationFrame(frame);
    } else {
      state.zoomAnimationFrame = 0;
      setInteractionMode(false);
      renderContextToolbar();
      renderQuickInspector();
    }
  };
  state.zoomAnimationFrame = window.requestAnimationFrame(frame);
}

function lerp(start, end, t) {
  return start + (end - start) * t;
}

function updateViewStatus() {
  const selected = nodeById.get(state.selectedNodeId);
  const scopeLabel = state.currentScope === "refinery"
    ? "Refinery Overview"
    : state.currentScope === "section"
      ? `${state.currentUnit} / ${state.currentSection}`
      : `${state.currentUnit || "Unit"} View`;
  if (isPresentationMode()) {
    els.viewStatus.textContent = selected
      ? `${safeText(selected.tag, "Node")} selected`
      : `${getVisibleNodes().length} node - ${getVisibleStreams().length} stream`;
    return;
  }
  if (!selected) {
    els.viewStatus.textContent = `${scopeLabel} · ${getVisibleNodes().length} node · ${getVisibleStreams().length} stream`;
    return;
  }
  els.viewStatus.textContent = `${scopeLabel} · ${selected.unit} / ${selected.tag} selected`;
}

function handleLogoFallback() {
  if (!els.brandLogo) return;
  els.brandLogo.addEventListener("error", () => {
    els.brandLogo.classList.add("is-hidden");
    document.body.classList.add("brand-logo-missing");
  });
}

function getStatusMeta(status) {
  const normalized = String(status || "Unknown").trim().toLowerCase();
  if (["normal", "running", "online"].includes(normalized)) {
    return { label: "Normal", className: "status-normal" };
  }
  if (["warning", "caution"].includes(normalized)) {
    return { label: "Warning", className: "status-warning" };
  }
  if (["alarm", "critical", "high risk"].includes(normalized)) {
    return { label: "Alarm", className: "status-alarm" };
  }
  if (["offline", "shutdown", "stop"].includes(normalized)) {
    return { label: "Offline", className: "status-offline" };
  }
  return { label: "Unknown", className: "status-unknown" };
}

function getStatusClass(status) {
  const meta = getStatusMeta(status);
  return meta.className;
}

function safeText(value, fallback = "-") {
  if (value === null || value === undefined) return fallback;
  const text = String(value).trim();
  return text || fallback;
}

function getAreaDisplayName(areaId) {
  const area = AREAS.find((item) => item.id === areaId || item.name === areaId);
  return safeText(area?.name || areaId, "-");
}

function formatStreamLabel(stream, isActive = false) {
  const label = safeText(stream?.label, `${stream?.from || ""} → ${stream?.to || ""}`);
  const maxLength = isActive ? 42 : 24;
  return label.length > maxLength ? `${label.slice(0, maxLength - 1)}…` : label;
}

function escapeHtml(value) {
  return safeText(value, "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function clamp(value, min, max) {
  const number = Number(value);
  if (!Number.isFinite(number)) return min;
  return Math.min(Math.max(number, min), max);
}

function debounce(fn, delay) {
  let timer = 0;
  return (...args) => {
    window.clearTimeout(timer);
    timer = window.setTimeout(() => fn(...args), delay);
  };
}

function createSvgElement(tagName) {
  return document.createElementNS("http://www.w3.org/2000/svg", tagName);
}

function clearSvg(svg) {
  if (!svg) return;
  while (svg.firstChild) {
    svg.removeChild(svg.firstChild);
  }
}
/* =====================================
   FUNGSI FITUR BARU: MINIMAP, TOUCH, NAV
   ===================================== */
  function hideMinimap() {
    const minimap = document.getElementById("minimapContainer");
    if (!minimap) return;
    minimap.classList.add("is-hidden");
    minimap.setAttribute("aria-hidden", "true");
  }

  function showMinimap() {
    const minimap = document.getElementById("minimapContainer");
    if (!minimap) return;
    minimap.classList.remove("is-hidden");
    minimap.setAttribute("aria-hidden", "false");
  }

   function updateMinimap() {
    if (!els.minimapContainer || !els.minimapViewport) return;
    if (els.minimapContainer.classList.contains("is-hidden")) return;
    const rect = els.canvasViewport.getBoundingClientRect();
    const scaleX = 240 / CANVAS.width;
    const scaleY = 146 / CANVAS.height;
  
    const viewWidth = (rect.width / state.zoom) * scaleX;
    const viewHeight = (rect.height / state.zoom) * scaleY;
    const viewX = (-state.panX / state.zoom) * scaleX;
    const viewY = (-state.panY / state.zoom) * scaleY;
  
    els.minimapViewport.style.width = `${Math.max(viewWidth, 4)}px`;
    els.minimapViewport.style.height = `${Math.max(viewHeight, 4)}px`;
    els.minimapViewport.style.transform = `translate(${viewX}px, ${viewY}px)`;
  }
  
  function handleKeyboardNav(e) {
    if (isPresentationMode()) return;
    if (shouldIgnoreGlobalShortcut(e)) return;
    const step = 60;
    let panned = false;
    if (e.key === 'ArrowUp') { state.panY += step; panned = true; }
    if (e.key === 'ArrowDown') { state.panY -= step; panned = true; }
    if (e.key === 'ArrowLeft') { state.panX += step; panned = true; }
    if (e.key === 'ArrowRight') { state.panX -= step; panned = true; }
  
    if (panned) { e.preventDefault(); applyView(); }
    if (e.key === '+' || e.key === '=') { setZoom(state.zoom * 1.15); }
    if (e.key === '-') { setZoom(state.zoom / 1.15); }
  }
  
  function getDistance(touches) {
    const dx = touches[0].clientX - touches[1].clientX;
    const dy = touches[0].clientY - touches[1].clientY;
    return Math.sqrt(dx * dx + dy * dy);
  }
  
  function handleTouchStart(e) {
    if (e.touches.length === 2) {
      e.preventDefault();
      state.touchDistance = getDistance(e.touches);
      state.isPanning = false;
    }
  }
  
  function handleTouchMove(e) {
    if (e.touches.length === 2) {
      e.preventDefault();
      const newDistance = getDistance(e.touches);
      const center = {
        x: (e.touches[0].clientX + e.touches[1].clientX) / 2,
        y: (e.touches[0].clientY + e.touches[1].clientY) / 2
      };
      const rect = els.canvasViewport.getBoundingClientRect();
      const pointerX = center.x - rect.left;
      const pointerY = center.y - rect.top;
      const before = screenToCanvas(pointerX, pointerY);
  
      const zoomFactor = newDistance / state.touchDistance;
      state.zoom = clamp(state.zoom * zoomFactor, 0.18, 2.4);
      state.panX = pointerX - before.x * state.zoom;
      state.panY = pointerY - before.y * state.zoom;
      
      state.touchDistance = newDistance;
      applyView();
    }
  }
  
  function handleTouchEnd(e) {
    if (e.touches.length < 2) state.touchDistance = 0;
  }
  
