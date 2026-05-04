const commonsImage = (file, width = 1000) =>
  `https://commons.wikimedia.org/wiki/Special:FilePath/${encodeURIComponent(file)}?width=${width}`;

const commonsPage = (file) =>
  `https://commons.wikimedia.org/wiki/File:${encodeURIComponent(file.replaceAll(" ", "_"))}`;

const refs = {
  column: {
    image: commonsImage("Worlds largest crude destillation column Dangote.jpg", 1200),
    source: commonsPage("Worlds largest crude destillation column Dangote.jpg"),
  },
  vessel: {
    image: commonsImage("Pressure Vessel.jpg", 950),
    source: commonsPage("Pressure Vessel.jpg"),
  },
  exchanger: {
    image: commonsImage("Shell and tube heat exchanger.jpg", 950),
    source: commonsPage("Shell and tube heat exchanger.jpg"),
  },
  pump: {
    image: commonsImage("Oil pump on an oil tanker.jpg", 950),
    source: commonsPage("Oil pump on an oil tanker.jpg"),
  },
  heater: {
    image: commonsImage("Oil Heater 5293.jpg", 950),
    source: commonsPage("Oil Heater 5293.jpg"),
  },
  compressor: {
    image: commonsImage("Gas Compressor wellsite.jpg", 950),
    source: commonsPage("Gas Compressor wellsite.jpg"),
  },
  treatment: {
    image: commonsImage("Water treatment plant.jpg", 950),
    source: commonsPage("Water treatment plant.jpg"),
  },
};

const icons = {
  column:
    '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M9 3h6"/><path d="M8 6h8"/><path d="M8 18h8"/><path d="M9 21h6"/><path d="M8 6c1.4 1 1.4 11 0 12"/><path d="M16 6c-1.4 1-1.4 11 0 12"/><path d="M10 10h4"/><path d="M10 14h4"/></svg>',
  vessel:
    '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 8h14a4 4 0 0 1 0 8H5a4 4 0 0 1 0-8Z"/><path d="M5 8v8"/><path d="M19 8v8"/><path d="M9 16v3"/><path d="M15 16v3"/></svg>',
  exchanger:
    '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 8h16"/><path d="M4 16h16"/><path d="M7 6v12"/><path d="M17 6v12"/><path d="m8 16 8-8"/><path d="m8 8 8 8"/></svg>',
  pump:
    '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 10a5 5 0 1 0 0 4"/><path d="M5 7h6a5 5 0 0 1 0 10H5"/><path d="M15 12h6"/><path d="m18 9 3 3-3 3"/><path d="M4 12h4"/></svg>',
  heater:
    '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 21c4 0 7-2.7 7-6.3 0-2.7-1.5-4.9-4.2-6.8.1 2-1 3.2-2.4 4.2.3-3-1-5.2-3.4-7.1.1 3.6-4 5.2-4 9.6C5 18.3 8 21 12 21Z"/><path d="M12 18c1.7 0 3-1.1 3-2.6 0-1.1-.6-2-1.8-2.8 0 1-.5 1.6-1.2 2.1.1-1.4-.5-2.5-1.6-3.4 0 1.8-1.4 2.6-1.4 4.1 0 1.5 1.3 2.6 3 2.6Z"/></svg>',
  compressor:
    '<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="4"/><path d="M12 2v6"/><path d="M12 16v6"/><path d="M2 12h6"/><path d="M16 12h6"/><path d="m7.8 7.8 2.8 2.8"/><path d="m13.4 13.4 2.8 2.8"/><path d="m16.2 7.8-2.8 2.8"/><path d="m10.6 13.4-2.8 2.8"/></svg>',
  outlet:
    '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M3 12h14"/><path d="m13 6 6 6-6 6"/><path d="M4 6h4"/><path d="M4 18h4"/></svg>',
  treatment:
    '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 8h16"/><path d="M5 8v9a3 3 0 0 0 3 3h8a3 3 0 0 0 3-3V8"/><path d="M8 12c2-1.5 4 1.5 6 0s3 0 4 1"/><path d="M9 4h6"/><path d="M12 4v4"/></svg>',
};

const iconMarkup = (name) => icons[name] ?? icons.vessel;

const STREAM_TYPES = {
  all: "Semua",
  liquid: "Hydrocarbon / Liquid",
  water: "Water / Wash",
  gas: "Gas / Overhead",
  air: "Air",
};

const UNITS = {
  CDU: {
    title: "Crude Distillation Unit",
    eyebrow: "CDU refinery flow",
    image: "./assets/refinery-flow.png",
    aspectRatio: "1334 / 800",
    description:
      "Unit distilasi atmosferik untuk memisahkan crude menjadi naphtha, kerosene, gasoil, dan residue.",
    equipmentIds: [
      "CDU-TANK-FARM",
      "G-201-01",
      "C-201-11",
      "HX-COLD",
      "C-201-07",
      "HX-HOT",
      "F-201-01",
      "C-201-01",
      "C-201-08",
      "C-201-09",
      "K-201-01",
      "C-201-10",
      "C-201-02",
      "C-201-03",
      "C-201-04",
      "C-201-05",
      "C-201-12",
      "C-201-13",
      "C-201-06",
      "CDU-OFFGAS",
      "CDU-LPG",
      "CDU-LNAP",
      "CDU-HNAP",
      "CDU-KEROSENE",
      "CDU-LGO",
      "CDU-HGO",
      "CDU-RESIDUE",
    ],
    streamIds: [
      "crude-feed",
      "desalter-water",
      "heater-feed",
      "main-column-feed",
      "overhead-gas",
      "stabilizer-feed",
      "kerosene-draw",
      "lgo-draw",
      "hgo-draw",
      "residue",
      "air-preheater",
    ],
    sections: [
      {
        id: "cdu-feed",
        title: "Feed & Preheat Section",
        summary: "Menyiapkan crude dari tank farm sampai cukup panas dan bersih sebelum heater.",
        equipmentIds: ["CDU-TANK-FARM", "G-201-01", "HX-COLD", "C-201-07", "HX-HOT", "F-201-01", "C-201-11"],
      },
      {
        id: "cdu-fractionation",
        title: "Fractionation Section",
        summary: "Memisahkan crude di kolom utama dan menangani sistem overhead.",
        equipmentIds: ["C-201-01", "C-201-08", "C-201-09", "K-201-01"],
      },
      {
        id: "cdu-stripper",
        title: "Side Stripper Section",
        summary: "Memoles side draw agar light ends berkurang sebelum menjadi produk.",
        equipmentIds: ["C-201-02", "C-201-03", "C-201-04"],
      },
      {
        id: "cdu-stabilizer",
        title: "Stabilizer & Splitter Section",
        summary: "Menstabilkan naphtha dan memisahkannya menjadi light dan heavy naphtha.",
        equipmentIds: ["C-201-10", "C-201-05", "C-201-12", "C-201-13", "C-201-06"],
      },
      {
        id: "cdu-product",
        title: "Product Outlet Section",
        summary: "Titik keluaran produk akhir dan intermediate CDU.",
        equipmentIds: ["CDU-OFFGAS", "CDU-LPG", "CDU-LNAP", "CDU-HNAP", "CDU-KEROSENE", "CDU-LGO", "CDU-HGO", "CDU-RESIDUE"],
      },
    ],
  },
  HVU: {
    title: "High Vacuum Unit",
    eyebrow: "HVU refinery flow",
    image: "./assets/hvu-flow.png",
    aspectRatio: "1365 / 768",
    description:
      "Unit distilasi vakum untuk memisahkan atmospheric residue menjadi gasoil vakum dan vacuum residue.",
    equipmentIds: ["HVU-FEED", "HVU-PUMP", "HVU-PREHEAT", "HVU-HEATER", "HVU-COLUMN", "HVU-OVERHEAD", "HVU-LVGO", "HVU-HVGO", "HVU-RESIDUE", "HVU-EJECTOR"],
    streamIds: ["hvu-feed", "hvu-preheat", "hvu-heater-feed", "hvu-column-feed", "hvu-overhead", "hvu-ejector-steam", "hvu-products", "hvu-residue", "hvu-air"],
    sections: [
      { id: "hvu-feed", title: "Vacuum Feed & Heater Section", summary: "Menaikkan temperatur atmospheric residue sebelum masuk kolom vakum.", equipmentIds: ["HVU-FEED", "HVU-PUMP", "HVU-PREHEAT", "HVU-HEATER"] },
      { id: "hvu-column", title: "Vacuum Column Section", summary: "Memisahkan fraksi berat pada tekanan rendah untuk mencegah cracking termal.", equipmentIds: ["HVU-COLUMN"] },
      { id: "hvu-overhead", title: "Vacuum Overhead System", summary: "Menjaga tekanan vakum dan menangani non-condensable gas.", equipmentIds: ["HVU-OVERHEAD"] },
      { id: "hvu-products", title: "LVGO / HVGO Product Section", summary: "Mengambil side draw LVGO dan HVGO untuk unit downstream.", equipmentIds: ["HVU-LVGO", "HVU-HVGO"] },
      { id: "hvu-residue", title: "Vacuum Residue Section", summary: "Mengirim residue vakum ke storage atau upgrading unit.", equipmentIds: ["HVU-RESIDUE"] },
      { id: "hvu-vacuum", title: "Ejector / Vacuum System", summary: "Membentuk dan mempertahankan kondisi vakum kolom.", equipmentIds: ["HVU-EJECTOR"] },
    ],
  },
  EWTP: {
    title: "Effluent Water Treatment Plant",
    eyebrow: "EWTP refinery flow",
    image: "./assets/ewtp-flow.png",
    aspectRatio: "16 / 9",
    description:
      "Sistem pengolahan air limbah untuk menurunkan oil, solid, COD, dan kontaminan sebelum air keluar plant.",
    equipmentIds: ["EWTP-INLET", "EWTP-CPI", "EWTP-EQ", "EWTP-DOSING", "EWTP-DAF", "EWTP-BIO", "EWTP-CLARIFIER", "EWTP-SLUDGE", "EWTP-OUTLET"],
    streamIds: [],
    sections: [
      { id: "ewtp-inlet", title: "Inlet Wastewater Section", summary: "Menerima aliran limbah cair dari area proses dan utility.", equipmentIds: ["EWTP-INLET"] },
      { id: "ewtp-cpi", title: "Oil Separator / CPI Section", summary: "Memisahkan free oil dan suspended solid awal.", equipmentIds: ["EWTP-CPI"] },
      { id: "ewtp-eq", title: "Equalization Section", summary: "Meredam fluktuasi flow, pH, dan loading kontaminan.", equipmentIds: ["EWTP-EQ"] },
      { id: "ewtp-chemical", title: "Chemical Dosing Section", summary: "Mengatur pH, koagulasi, dan flokulasi sebelum flotation.", equipmentIds: ["EWTP-DOSING"] },
      { id: "ewtp-daf", title: "Flotation / DAF Section", summary: "Mengangkat oil dan flok halus dengan microbubble.", equipmentIds: ["EWTP-DAF"] },
      { id: "ewtp-bio", title: "Biological Treatment Section", summary: "Menguraikan organik terlarut menggunakan proses biologis.", equipmentIds: ["EWTP-BIO"] },
      { id: "ewtp-clarifier", title: "Clarifier Section", summary: "Memisahkan biomass dan solid dari treated water.", equipmentIds: ["EWTP-CLARIFIER"] },
      { id: "ewtp-sludge", title: "Sludge Handling Section", summary: "Mengumpulkan dan menyiapkan sludge untuk disposal.", equipmentIds: ["EWTP-SLUDGE"] },
      { id: "ewtp-outlet", title: "Treated Water Outlet Section", summary: "Mengontrol kualitas air keluar sebelum discharge atau reuse.", equipmentIds: ["EWTP-OUTLET"] },
    ],
  },
  DHP: {
    title: "Distillate Hydrotreating Process",
    eyebrow: "DHP refinery flow",
    image: "./assets/dhp-flow.png",
    aspectRatio: "16 / 9",
    description:
      "Unit hydrotreating distillate untuk menurunkan sulfur, nitrogen, olefin, dan kontaminan lain dengan hidrogen.",
    equipmentIds: ["DHP-FEED", "DHP-PUMP", "DHP-PREHEAT", "DHP-REACTOR", "DHP-HPS", "DHP-STRIPPER", "DHP-RGC", "DHP-RUNDOWN", "DHP-OFFGAS"],
    streamIds: [],
    sections: [
      { id: "dhp-feed", title: "Feed Surge & Pumping Section", summary: "Menyiapkan feed distillate dan tekanan masuk unit.", equipmentIds: ["DHP-FEED", "DHP-PUMP"] },
      { id: "dhp-preheat", title: "Heat Exchanger / Preheat Section", summary: "Mengambil panas effluent reactor untuk memanaskan feed.", equipmentIds: ["DHP-PREHEAT"] },
      { id: "dhp-reactor", title: "Reactor Section", summary: "Reaksi hydrotreating terjadi pada catalyst bed dengan hidrogen.", equipmentIds: ["DHP-REACTOR"] },
      { id: "dhp-separator", title: "Separator Section", summary: "Memisahkan gas hidrogen recycle dari liquid product.", equipmentIds: ["DHP-HPS"] },
      { id: "dhp-stripper", title: "Stripper Section", summary: "Melepas H2S, NH3, dan light ends dari produk.", equipmentIds: ["DHP-STRIPPER"] },
      { id: "dhp-recycle", title: "Recycle Gas Compressor Section", summary: "Mengembalikan hidrogen recycle ke inlet reactor.", equipmentIds: ["DHP-RGC"] },
      { id: "dhp-product", title: "Product Cooler / Rundown Section", summary: "Mendinginkan produk sebelum dikirim ke storage atau blending.", equipmentIds: ["DHP-RUNDOWN"] },
      { id: "dhp-sour", title: "Sour Water / Off Gas Section", summary: "Menangani sour water dan off gas dari pemisahan.", equipmentIds: ["DHP-OFFGAS"] },
    ],
  },
};

const EQUIPMENT = [
  {
    id: "CDU-TANK-FARM",
    unit: "CDU",
    tag: "R Tank Farm",
    name: "Crude Feed from Tank Farm",
    type: "Feed source",
    area: "Feed",
    section: "Feed & Preheat Section",
    x: 4.0,
    y: 39.0,
    w: 7.0,
    h: 8.0,
    icon: "outlet",
    streams: ["liquid"],
    photo: refs.vessel,
    description: "Sumber crude dari tank farm menuju suction crude oil pump. Titik ini mewakili inventory dan blending crude sebelum CDU.",
    details: detail(
      ["Menjadi titik awal alur feed CDU.", "Menyediakan crude sesuai batch, kualitas, dan target throughput."],
      ["Crude dari storage dialirkan ke suction pump dengan monitoring level tank dan line-up valve.", "Perubahan crude slate harus dikomunikasikan karena memengaruhi preheat, desalter, dan cut point."],
      ["Level tank", "Crude slate", "Water content", "Suction pressure"]
    ),
    operation: op("38 C", "2.0 barg", "1450 m3/h", "Normal"),
    path: ["CDU", "Tank Farm"],
  },
  {
    id: "G-201-01",
    unit: "CDU",
    tag: "G-201-01 A/B",
    name: "Crude Oil Pump",
    type: "Pump",
    area: "Feed",
    section: "Feed & Preheat Section",
    x: 10.6,
    y: 40.4,
    w: 7.0,
    h: 10.0,
    icon: "pump",
    streams: ["liquid"],
    photo: refs.pump,
    description: "Pompa umpan crude dari tank farm. Konfigurasi A/B menjaga aliran CDU tetap kontinu saat satu pompa standby.",
    details: detail(
      ["Mendorong crude menuju preheat train, desalter, heater, dan kolom utama.", "Menjaga feed rate unit sesuai target operasi."],
      ["Suction berasal dari tank farm dan discharge dikontrol oleh flow atau speed control.", "Proteksi low suction pressure dan monitoring vibrasi mencegah kavitasi serta kerusakan mekanis."],
      ["Flow crude feed", "Suction dan discharge pressure", "Vibrasi", "Temperatur bearing"]
    ),
    operation: op("40 C", "9.5 barg", "1450 m3/h", "Normal"),
    path: ["CDU", "Tank Farm", "Pump"],
  },
  {
    id: "C-201-11",
    unit: "CDU",
    tag: "C-201-11",
    name: "Desalter Water Surge Drum",
    type: "Surge drum",
    area: "Desalting",
    section: "Feed & Preheat Section",
    x: 16.4,
    y: 18.9,
    w: 6.0,
    h: 18.0,
    icon: "vessel",
    streams: ["water"],
    photo: refs.vessel,
    description: "Surge drum air untuk sistem desalter. Drum ini menstabilkan pasokan wash water sebelum diinjeksi ke crude.",
    details: detail(
      ["Menampung wash water dan meredam fluktuasi flow.", "Membantu pencucian garam pada crude sebelum masuk desalter."],
      ["Level drum dijaga agar injeksi air tidak kehilangan suction.", "Wash water dicampur dengan crude untuk melarutkan garam anorganik."],
      ["Level drum", "Flow wash water", "Kualitas air", "Chloride outlet desalter"]
    ),
    operation: op("55 C", "4.2 barg", "55 m3/h", "Normal"),
    path: ["CDU", "Water Drum", "Desalter"],
  },
  {
    id: "HX-COLD",
    unit: "CDU",
    tag: "Cold Preheat",
    name: "Cold Preheat System",
    type: "Heat exchanger train",
    area: "Preheat",
    section: "Feed & Preheat Section",
    x: 19.3,
    y: 38.9,
    w: 8.0,
    h: 8.0,
    icon: "exchanger",
    streams: ["liquid", "water"],
    photo: refs.exchanger,
    description: "Rangkaian heat exchanger awal. Crude dingin dipanaskan secara bertahap memakai panas produk atau pumparound.",
    details: detail(
      ["Menaikkan temperatur crude agar viskositas turun.", "Mengambil kembali panas dari produk panas sehingga beban heater berkurang."],
      ["Crude melewati beberapa exchanger secara seri.", "Bypass dan kontrol flow menjaga temperatur target sebelum desalter."],
      ["Temperatur inlet/outlet", "Pressure drop", "Fouling factor", "Approach temperature"]
    ),
    operation: op("118 C", "8.8 barg", "1450 m3/h", "Warning"),
    path: ["CDU", "Pump", "Cold Preheat"],
  },
  {
    id: "C-201-07",
    unit: "CDU",
    tag: "C-201-07",
    name: "Desalter",
    type: "Electrostatic desalter",
    area: "Desalting",
    section: "Feed & Preheat Section",
    x: 28.7,
    y: 39.1,
    w: 9.0,
    h: 8.0,
    icon: "vessel",
    streams: ["liquid", "water"],
    photo: refs.vessel,
    description: "Vessel horizontal untuk menghilangkan garam, air bebas, dan padatan halus dari crude sebelum pemanasan lanjut.",
    details: detail(
      ["Mengurangi chloride, salt, BS&W, dan padatan halus.", "Menurunkan risiko korosi serta fouling di heater dan kolom."],
      ["Crude dicampur wash water dan demulsifier sebelum vessel.", "Medan elektrostatik menggabungkan droplet air agar cepat mengendap."],
      ["Salt content outlet", "Interface level", "Voltage dan current", "Oil in brine"]
    ),
    operation: op("128 C", "7.6 barg", "1450 m3/h", "Normal"),
    path: ["CDU", "Pump", "Preheat", "Desalter"],
  },
  {
    id: "HX-HOT",
    unit: "CDU",
    tag: "Hot Preheat",
    name: "Hot Preheat System",
    type: "Heat exchanger train",
    area: "Preheat",
    section: "Feed & Preheat Section",
    x: 8.7,
    y: 65.2,
    w: 9.0,
    h: 8.0,
    icon: "exchanger",
    streams: ["liquid", "air"],
    photo: refs.exchanger,
    description: "Rangkaian preheat lanjutan setelah desalter. Crude menerima panas lebih tinggi sebelum masuk fired heater.",
    details: detail(
      ["Menaikkan temperatur crude mendekati inlet heater.", "Memaksimalkan heat recovery dari produk berat dan pumparound."],
      ["Crude bersih dari desalter dipanaskan di beberapa exchanger.", "Trend pressure drop dipakai untuk memantau fouling."],
      ["Outlet preheat temperature", "Pressure drop", "Duty exchanger", "Fouling trend"]
    ),
    operation: op("238 C", "6.3 barg", "1450 m3/h", "Normal"),
    path: ["CDU", "Desalter", "Hot Preheat"],
  },
  {
    id: "F-201-01",
    unit: "CDU",
    tag: "F-201-01",
    name: "Crude Charge Heater",
    type: "Fired heater",
    area: "Heating",
    section: "Feed & Preheat Section",
    x: 22.8,
    y: 66.4,
    w: 9.0,
    h: 15.0,
    icon: "heater",
    streams: ["liquid", "air"],
    photo: refs.heater,
    description: "Fired heater yang memberi panas akhir ke crude sebelum masuk main fractionator. Outlet temperature menentukan flash di kolom.",
    details: detail(
      ["Menaikkan temperatur crude sampai cukup untuk vaporisasi parsial.", "Menjadi pengatur duty panas utama CDU."],
      ["Crude mengalir di coil heater, burner membakar fuel gas atau fuel oil.", "Draft, excess oxygen, dan tube skin temperature dijaga agar tube tidak overheat."],
      ["Coil outlet temperature", "Draft", "O2 flue gas", "Tube skin temperature"]
    ),
    operation: op("352 C", "4.8 barg", "1450 m3/h", "Normal"),
    path: ["CDU", "Desalter", "Heater"],
  },
  {
    id: "C-201-01",
    unit: "CDU",
    tag: "C-201-01",
    name: "Main Fractionator Column",
    type: "Column",
    area: "Fractionation",
    section: "Fractionation Section",
    x: 39.0,
    y: 55.0,
    w: 8.0,
    h: 67.0,
    icon: "column",
    streams: ["liquid", "gas"],
    photo: refs.column,
    description: "Kolom distilasi atmosferik utama. Crude panas masuk ke flash zone lalu dipisahkan berdasarkan volatilitas.",
    details: detail(
      ["Memisahkan crude menjadi overhead naphtha/gas, kerosene, gasoil, dan residu.", "Menjadi pusat neraca panas dan material CDU."],
      ["Feed panas masuk dekat flash zone, komponen ringan naik, komponen berat turun.", "Reflux, pumparound, dan side draw menjaga profil temperatur serta kualitas cut."],
      ["Top temperature", "Flash zone temperature", "Pressure drop", "Bottom level"]
    ),
    operation: op("Top 118 C / Bottom 348 C", "1.4 barg", "1450 m3/h", "Normal"),
    path: ["CDU", "Pump", "Preheat", "Desalter", "Heater", "Main Fractionator"],
  },
  {
    id: "C-201-08",
    unit: "CDU",
    tag: "C-201-08",
    name: "Main Fractionator Overhead Accumulator",
    type: "Overhead accumulator",
    area: "Overhead",
    section: "Fractionation Section",
    x: 43.1,
    y: 10.8,
    w: 10.0,
    h: 8.0,
    icon: "vessel",
    streams: ["gas", "liquid", "water"],
    photo: refs.vessel,
    description: "Accumulator overhead main fractionator untuk memisahkan gas, naphtha cair, dan sour water setelah kondensasi.",
    details: detail(
      ["Memisahkan tiga fase dari overhead condenser.", "Menyediakan reflux dan feed ke stabilizer system."],
      ["Gas keluar dari top, hydrocarbon liquid keluar sebagai reflux atau product, air keluar dari boot.", "Level dan pressure menjaga kestabilan overhead system."],
      ["Overhead pressure", "Hydrocarbon level", "Water boot level", "Condenser outlet temperature"]
    ),
    operation: op("52 C", "0.8 barg", "210 m3/h", "Normal"),
    path: ["CDU", "Main Fractionator", "Overhead Accumulator"],
  },
  {
    id: "C-201-09",
    unit: "CDU",
    tag: "C-201-09",
    name: "Suction Drum",
    type: "Compressor suction drum",
    area: "Gas handling",
    section: "Fractionation Section",
    x: 61.5,
    y: 9.7,
    w: 6.0,
    h: 12.0,
    icon: "vessel",
    streams: ["gas"],
    photo: refs.vessel,
    description: "Suction drum sebelum overhead gas compressor. Drum menangkap cairan agar compressor hanya menerima gas.",
    details: detail(
      ["Melindungi compressor dari liquid carry-over.", "Menstabilkan pressure dan flow gas overhead."],
      ["Gas masuk drum, velocity turun, droplet cair jatuh ke bottom.", "Demister menangkap mist halus sebelum suction compressor."],
      ["Level drum", "Suction pressure", "Demister DP", "High-high level alarm"]
    ),
    operation: op("45 C", "0.6 barg", "38 t/h", "Normal"),
    path: ["CDU", "Overhead", "Suction Drum"],
  },
  {
    id: "K-201-01",
    unit: "CDU",
    tag: "K-201-01",
    name: "Overhead Gas Compressor",
    type: "Gas compressor",
    area: "Gas handling",
    section: "Fractionation Section",
    x: 76.0,
    y: 9.9,
    w: 14.0,
    h: 9.0,
    icon: "compressor",
    streams: ["gas"],
    photo: refs.compressor,
    description: "Compressor gas overhead yang menaikkan tekanan off gas untuk LPG recovery, fuel gas system, atau unit penerima.",
    details: detail(
      ["Meningkatkan tekanan gas ringan dari overhead system.", "Menjaga pressure balance overhead agar kolom stabil."],
      ["Gas kering dari suction drum dinaikkan tekanannya secara mekanis.", "Anti-surge atau recycle menjaga compressor jauh dari surge."],
      ["Suction/discharge pressure", "Vibrasi", "Anti-surge valve", "Lube oil temperature"]
    ),
    operation: op("58 C", "8.2 barg discharge", "38 t/h", "Warning"),
    path: ["CDU", "Overhead", "Suction Drum", "Compressor"],
  },
  {
    id: "C-201-10",
    unit: "CDU",
    tag: "C-201-10",
    name: "Stabilizer Feed Surge Drum",
    type: "Feed surge drum",
    area: "Stabilizer feed",
    section: "Stabilizer & Splitter Section",
    x: 50.2,
    y: 30.7,
    w: 6.0,
    h: 14.0,
    icon: "vessel",
    streams: ["liquid", "gas"],
    photo: refs.vessel,
    description: "Surge drum feed stabilizer untuk meredam fluktuasi naphtha sebelum masuk kolom stabilizer.",
    details: detail(
      ["Menampung naphtha feed dari overhead system.", "Memberi flow yang lebih stabil ke stabilizer."],
      ["Level drum dikontrol agar feed stabilizer tidak terputus.", "Gas ringan dilepas sesuai desain ke overhead atau fuel gas."],
      ["Level drum", "Feed flow", "Pressure drum", "Komposisi light ends"]
    ),
    operation: op("64 C", "5.0 barg", "160 m3/h", "Normal"),
    path: ["CDU", "Overhead", "Stabilizer Feed Drum"],
  },
  {
    id: "C-201-02",
    unit: "CDU",
    tag: "C-201-02",
    name: "Kerosene Stripper",
    type: "Side stripper column",
    area: "Side draw",
    section: "Side Stripper Section",
    x: 50.8,
    y: 61.3,
    w: 6.0,
    h: 14.0,
    icon: "column",
    streams: ["liquid"],
    photo: refs.column,
    description: "Side stripper kerosene untuk menghilangkan komponen ringan yang ikut terbawa dari side draw main fractionator.",
    details: detail(
      ["Memperbaiki flash point kerosene.", "Mengembalikan vapor ringan ke main fractionator."],
      ["Kerosene side draw kontak dengan steam atau reboil vapor.", "Produk bottom keluar sebagai kerosene yang lebih stabil."],
      ["Flash point", "Steam rate", "Bottom temperature", "Level bottom"]
    ),
    operation: op("205 C", "1.2 barg", "120 m3/h", "Normal"),
    path: ["CDU", "Main Fractionator", "Kerosene Stripper"],
  },
  {
    id: "C-201-03",
    unit: "CDU",
    tag: "C-201-03",
    name: "LGO Stripper",
    type: "Side stripper column",
    area: "Side draw",
    section: "Side Stripper Section",
    x: 50.7,
    y: 77.2,
    w: 6.0,
    h: 13.0,
    icon: "column",
    streams: ["liquid"],
    photo: refs.column,
    description: "Side stripper light gasoil untuk menurunkan light ends dan menstabilkan rentang distilasi produk.",
    details: detail(
      ["Mengurangi komponen ringan pada LGO.", "Menstabilkan kualitas LGO untuk storage atau unit downstream."],
      ["LGO kontak dengan stripping steam.", "Light components naik sebagai vapor dan kembali ke kolom utama."],
      ["Initial boiling point", "Steam rate", "Bottom temperature", "Flow LGO"]
    ),
    operation: op("255 C", "1.3 barg", "180 m3/h", "Normal"),
    path: ["CDU", "Main Fractionator", "LGO Stripper"],
  },
  {
    id: "C-201-04",
    unit: "CDU",
    tag: "C-201-04",
    name: "HGO Stripper",
    type: "Side stripper column",
    area: "Side draw",
    section: "Side Stripper Section",
    x: 50.8,
    y: 91.7,
    w: 6.0,
    h: 10.0,
    icon: "column",
    streams: ["liquid"],
    photo: refs.column,
    description: "Side stripper heavy gasoil untuk membantu HGO memenuhi batas volatilitas sebelum diarahkan ke unit lanjutan.",
    details: detail(
      ["Mengeluarkan light ends dari fraksi HGO.", "Menjaga overlap HGO dengan LGO dan residue tetap terkendali."],
      ["HGO side draw dikontakkan dengan stripping steam.", "Produk bottom ditarik sebagai HGO dengan komposisi lebih berat."],
      ["Distillation range", "Steam rate", "Bottom temperature", "Flow HGO"]
    ),
    operation: op("308 C", "1.5 barg", "210 m3/h", "Normal"),
    path: ["CDU", "Main Fractionator", "HGO Stripper"],
  },
  {
    id: "C-201-05",
    unit: "CDU",
    tag: "C-201-05",
    name: "Stabilizer",
    type: "Stabilizer column",
    area: "Naphtha stabilization",
    section: "Stabilizer & Splitter Section",
    x: 63.3,
    y: 40.8,
    w: 7.0,
    h: 24.0,
    icon: "column",
    streams: ["liquid", "gas"],
    photo: refs.column,
    description: "Kolom stabilizer untuk melepas C1-C4/light ends dari naphtha sehingga vapor pressure produk turun.",
    details: detail(
      ["Menstabilkan naphtha dengan melepas komponen ringan.", "Menghasilkan stabilized naphtha untuk naphtha splitter."],
      ["Feed masuk ke tray tengah, light ends naik ke overhead, fraksi lebih berat turun ke bottom.", "Reflux dan reboiler duty mengatur pemisahan."],
      ["Top pressure", "Bottom temperature", "RVP naphtha", "Reflux ratio"]
    ),
    operation: op("Top 70 C / Bottom 155 C", "8.0 barg", "155 m3/h", "Normal"),
    path: ["CDU", "Stabilizer Feed", "Stabilizer"],
  },
  {
    id: "C-201-12",
    unit: "CDU",
    tag: "C-201-12",
    name: "Stabilizer Overhead Accumulator",
    type: "Overhead accumulator",
    area: "Stabilizer overhead",
    section: "Stabilizer & Splitter Section",
    x: 80.5,
    y: 32.8,
    w: 11.0,
    h: 8.0,
    icon: "vessel",
    streams: ["gas", "liquid"],
    photo: refs.vessel,
    description: "Accumulator overhead stabilizer untuk memisahkan gas ringan dan cairan overhead sebagai reflux atau LPG recovery feed.",
    details: detail(
      ["Mengumpulkan kondensat overhead stabilizer.", "Menyediakan reflux dan mengirim light ends ke LPG recovery."],
      ["Overhead vapor dikondensasikan lalu masuk accumulator.", "Gas dan cairan dipisahkan berdasarkan level serta pressure control."],
      ["Pressure", "Liquid level", "Reflux flow", "LPG recovery flow"]
    ),
    operation: op("45 C", "7.4 barg", "34 t/h", "Normal"),
    path: ["CDU", "Stabilizer", "Overhead Accumulator"],
  },
  {
    id: "C-201-13",
    unit: "CDU",
    tag: "C-201-13",
    name: "Splitter Overhead Accumulator",
    type: "Overhead accumulator",
    area: "Naphtha splitter overhead",
    section: "Stabilizer & Splitter Section",
    x: 84.2,
    y: 47.0,
    w: 10.0,
    h: 7.0,
    icon: "vessel",
    streams: ["liquid", "gas"],
    photo: refs.vessel,
    description: "Accumulator overhead naphtha splitter untuk menampung light naphtha condensate dan menyediakan reflux ke splitter.",
    details: detail(
      ["Menampung condensate overhead splitter.", "Menyediakan reflux dan outlet light naphtha."],
      ["Overhead vapor dari splitter dikondensasikan dan dipisahkan di accumulator.", "Level drum mengatur rundown light naphtha."],
      ["Level accumulator", "Overhead temperature", "Reflux flow", "Light naphtha quality"]
    ),
    operation: op("48 C", "2.8 barg", "75 m3/h", "Warning"),
    path: ["CDU", "Stabilizer", "Naphtha Splitter", "Overhead Accumulator"],
  },
  {
    id: "C-201-06",
    unit: "CDU",
    tag: "C-201-06",
    name: "Naphtha Splitter",
    type: "Splitter column",
    area: "Naphtha splitting",
    section: "Stabilizer & Splitter Section",
    x: 83.7,
    y: 62.4,
    w: 5.5,
    h: 17.0,
    icon: "column",
    streams: ["liquid"],
    photo: refs.column,
    description: "Kolom splitter yang memisahkan stabilized naphtha menjadi light naphtha dan heavy naphtha.",
    details: detail(
      ["Memisahkan naphtha berdasarkan boiling range.", "Menghasilkan light naphtha dan heavy naphtha untuk blending atau unit downstream."],
      ["Feed masuk ke bagian tengah, fraksi ringan ke overhead, fraksi berat ke bottom.", "Reflux dan reboiler menjaga cut point."],
      ["Top temperature", "Bottom temperature", "Reflux ratio", "Product endpoint"]
    ),
    operation: op("Top 62 C / Bottom 142 C", "2.5 barg", "135 m3/h", "Normal"),
    path: ["CDU", "Stabilizer", "Naphtha Splitter"],
  },
  outletEquipment("CDU-OFFGAS", "CDU", "Off Gas", "Off Gas Outlet", "Gas outlet", "Product Outlet Section", 95.0, 2.3, "gas", "Off gas dikirim ke fuel gas atau recovery system setelah kompresi overhead."),
  outletEquipment("CDU-LPG", "CDU", "LPG Rec", "LPG Recovery Outlet", "LPG outlet", "Product Outlet Section", 94.0, 25.0, "gas", "Light ends dari stabilizer overhead dikirim menuju Plant 6 LPG recovery."),
  outletEquipment("CDU-LNAP", "CDU", "L. Naphtha", "Light Naphtha Outlet", "Naphtha outlet", "Product Outlet Section", 94.0, 58.8, "liquid", "Light naphtha keluar dari overhead naphtha splitter untuk blending atau processing lanjutan."),
  outletEquipment("CDU-HNAP", "CDU", "H. Naphtha", "Heavy Naphtha Outlet", "Naphtha outlet", "Product Outlet Section", 94.0, 65.1, "liquid", "Heavy naphtha keluar dari bottom splitter sebagai komponen blending atau feed downstream."),
  outletEquipment("CDU-KEROSENE", "CDU", "Kerosene", "Kerosene Outlet", "Product outlet", "Product Outlet Section", 93.0, 75.0, "liquid", "Kerosene dari side stripper dikirim ke treating, storage, atau blending pool."),
  outletEquipment("CDU-LGO", "CDU", "L. Gasoil", "Light Gasoil Outlet", "Product outlet", "Product Outlet Section", 93.0, 82.2, "liquid", "Light gasoil keluar dari LGO stripper sebagai produk menengah."),
  outletEquipment("CDU-HGO", "CDU", "H. Gasoil", "Heavy Gasoil Outlet", "Product outlet", "Product Outlet Section", 93.0, 88.0, "liquid", "Heavy gasoil keluar dari HGO stripper untuk storage atau feed unit lanjutan."),
  outletEquipment("CDU-RESIDUE", "CDU", "L. Residue", "Long Residue Outlet", "Bottom product outlet", "Product Outlet Section", 93.0, 96.0, "liquid", "Long residue dari bottom main fractionator dikirim ke HVU atau storage sesuai lineup."),
  unitEquipment("HVU-FEED", "HVU", "HVU-FEED", "Vacuum Feed", "Feed surge", "Vacuum Feed & Heater Section", "vessel", "Atmospheric residue ditampung dan distabilkan sebelum dipanaskan menuju kolom vakum.", "liquid", refs.vessel, "335 C", "3.2 barg", "720 m3/h", "Normal"),
  unitEquipment("HVU-PUMP", "HVU", "HVU-PUMP", "HVU Feed Pump", "Feed pump", "Vacuum Feed & Heater Section", "pump", "Pompa feed HVU menaikkan tekanan reduced crude agar melewati preheat train dan vacuum heater.", "liquid", refs.pump, "342 C", "8.5 barg discharge", "720 m3/h", "Normal"),
  unitEquipment("HVU-PREHEAT", "HVU", "HVU-PREHEAT", "Preheat System", "Heat exchanger train", "Vacuum Feed & Heater Section", "exchanger", "Preheat system memanfaatkan panas produk HVU untuk menaikkan temperatur feed sebelum vacuum charge heater.", "liquid", refs.exchanger, "360 C", "6.7 barg", "720 m3/h", "Normal"),
  unitEquipment("HVU-HEATER", "HVU", "F-HVU", "Vacuum Heater", "Fired heater", "Vacuum Feed & Heater Section", "heater", "Heater menaikkan temperatur residue agar separasi vakum dapat berjalan tanpa cracking berlebih.", "liquid", refs.heater, "398 C", "2.1 barg", "720 m3/h", "Warning"),
  unitEquipment("HVU-COLUMN", "HVU", "C-HVU", "Vacuum Column", "Vacuum column", "Vacuum Column Section", "column", "Kolom vakum memisahkan residue pada tekanan rendah menjadi LVGO, HVGO, dan vacuum residue.", "liquid", refs.column, "Top 90 C / Flash 390 C", "65 mmHgA", "720 m3/h", "Normal"),
  unitEquipment("HVU-OVERHEAD", "HVU", "OVHD-HVU", "Overhead Vacuum System", "Overhead system", "Vacuum Overhead System", "vessel", "Sistem overhead menangani non-condensable gas, ejector condensate, dan menjaga vacuum pressure.", "gas", refs.vessel, "48 C", "60 mmHgA", "18 t/h", "Normal"),
  unitEquipment("HVU-LVGO", "HVU", "LVGO", "LVGO Product Section", "Side draw", "LVGO / HVGO Product Section", "outlet", "LVGO side draw didinginkan dan dikirim ke unit downstream atau storage.", "liquid", refs.exchanger, "210 C", "1.1 barg", "155 m3/h", "Normal"),
  unitEquipment("HVU-HVGO", "HVU", "HVGO", "HVGO Product Section", "Side draw", "LVGO / HVGO Product Section", "outlet", "HVGO side draw menjadi feed hydrocracker, FCC, atau blending sesuai konfigurasi refinery.", "liquid", refs.exchanger, "315 C", "1.3 barg", "260 m3/h", "Normal"),
  unitEquipment("HVU-RESIDUE", "HVU", "VR", "Vacuum Residue Section", "Bottom product", "Vacuum Residue Section", "outlet", "Vacuum residue keluar dari bottom column menuju storage, asphalt, coker, atau residue upgrading.", "liquid", refs.vessel, "370 C", "1.7 barg", "290 m3/h", "Warning"),
  unitEquipment("HVU-EJECTOR", "HVU", "EJ-HVU", "Ejector / Vacuum System", "Vacuum package", "Ejector / Vacuum System", "compressor", "Steam ejector atau vacuum package mempertahankan tekanan rendah kolom vakum.", "gas", refs.compressor, "42 C", "60 mmHgA", "Steam 24 t/h", "Normal"),
  unitEquipment("EWTP-INLET", "EWTP", "WW-IN", "Wastewater Inlet", "Inlet basin", "Inlet Wastewater Section", "treatment", "Titik masuk limbah cair dari process area, utility, dan drain system.", "water", refs.treatment, "36 C", "Atmospheric", "620 m3/h", "Normal"),
  unitEquipment("EWTP-CPI", "EWTP", "CPI", "Oil Separator / CPI", "Oil separator", "Oil Separator / CPI Section", "treatment", "CPI separator mengurangi free oil dan suspended solid kasar dari wastewater.", "water", refs.treatment, "35 C", "Atmospheric", "620 m3/h", "Warning"),
  unitEquipment("EWTP-EQ", "EWTP", "EQ-TK", "Equalization Tank", "Tank", "Equalization Section", "vessel", "Equalization tank meratakan flow dan konsentrasi kontaminan sebelum treatment kimia.", "water", refs.vessel, "34 C", "Atmospheric", "610 m3/h", "Normal"),
  unitEquipment("EWTP-DOSING", "EWTP", "CHEM", "Chemical Dosing", "Dosing package", "Chemical Dosing Section", "treatment", "Chemical dosing mengatur pH, koagulasi, dan flokulasi agar oil/solid mudah dipisahkan.", "water", refs.treatment, "34 C", "2.0 barg", "610 m3/h", "Normal"),
  unitEquipment("EWTP-DAF", "EWTP", "DAF", "Dissolved Air Flotation", "Flotation unit", "Flotation / DAF Section", "treatment", "DAF mengangkat oil dan flok halus menggunakan microbubble.", "water", refs.treatment, "34 C", "4.8 barg recycle", "590 m3/h", "Normal"),
  unitEquipment("EWTP-BIO", "EWTP", "BIO", "Biological Treatment", "Bioreactor", "Biological Treatment Section", "treatment", "Biological treatment menurunkan COD dan BOD dengan aktivitas mikroorganisme.", "water", refs.treatment, "32 C", "Atmospheric", "585 m3/h", "Normal"),
  unitEquipment("EWTP-CLARIFIER", "EWTP", "CLAR", "Clarifier", "Clarifier", "Clarifier Section", "treatment", "Clarifier memisahkan biomass dan suspended solid dari treated water.", "water", refs.treatment, "32 C", "Atmospheric", "575 m3/h", "Normal"),
  unitEquipment("EWTP-SLUDGE", "EWTP", "SLUDGE", "Sludge Handling", "Sludge package", "Sludge Handling Section", "treatment", "Sludge handling mengentalkan dan menyiapkan sludge untuk disposal atau dewatering.", "water", refs.treatment, "31 C", "3.0 barg", "35 m3/h", "Warning"),
  unitEquipment("EWTP-OUTLET", "EWTP", "TW-OUT", "Treated Water Outlet", "Outlet monitoring", "Treated Water Outlet Section", "outlet", "Treated water outlet memonitor kualitas akhir sebelum discharge atau reuse.", "water", refs.treatment, "31 C", "Atmospheric", "560 m3/h", "Normal"),
  unitEquipment("DHP-FEED", "DHP", "DHP-FEED", "Feed Surge Drum", "Feed drum", "Feed Surge & Pumping Section", "vessel", "Feed surge drum meredam fluktuasi distillate sebelum dipompa ke reactor section.", "liquid", refs.vessel, "45 C", "4.0 barg", "320 m3/h", "Normal"),
  unitEquipment("DHP-PUMP", "DHP", "DHP-PUMP", "Feed Pump", "Pump", "Feed Surge & Pumping Section", "pump", "Feed pump menaikkan tekanan distillate agar sesuai dengan pressure reactor.", "liquid", refs.pump, "50 C", "72 barg discharge", "320 m3/h", "Normal"),
  unitEquipment("DHP-PREHEAT", "DHP", "E-DHP", "Heat Exchanger / Preheat", "Heat exchanger train", "Heat Exchanger / Preheat Section", "exchanger", "Preheat train memanaskan feed dengan effluent reactor sebelum fired heater atau reactor inlet.", "liquid", refs.exchanger, "265 C", "68 barg", "320 m3/h", "Normal"),
  unitEquipment("DHP-REACTOR", "DHP", "R-DHP", "Hydrotreating Reactor", "Reactor", "Reactor Section", "column", "Reactor menghilangkan sulfur dan nitrogen melalui reaksi katalitik dengan hidrogen.", "liquid", refs.column, "345 C", "64 barg", "320 m3/h", "Warning"),
  unitEquipment("DHP-HPS", "DHP", "HPS", "High Pressure Separator", "Separator", "Separator Section", "vessel", "High pressure separator memisahkan gas hidrogen recycle dari liquid hydrotreated product.", "gas", refs.vessel, "52 C", "58 barg", "Reactor effluent", "Normal"),
  unitEquipment("DHP-STRIPPER", "DHP", "STRIP", "Product Stripper", "Stripper column", "Stripper Section", "column", "Stripper melepas H2S, NH3, dan light ends dari produk hydrotreated.", "liquid", refs.column, "Top 95 C / Bottom 235 C", "5.5 barg", "305 m3/h", "Normal"),
  unitEquipment("DHP-RGC", "DHP", "RGC", "Recycle Gas Compressor", "Compressor", "Recycle Gas Compressor Section", "compressor", "Recycle gas compressor mengembalikan hidrogen recycle ke inlet reactor.", "gas", refs.compressor, "60 C", "70 barg discharge", "42 t/h", "Alarm"),
  unitEquipment("DHP-RUNDOWN", "DHP", "RUN", "Product Cooler / Rundown", "Cooler and rundown", "Product Cooler / Rundown Section", "exchanger", "Produk hydrotreated didinginkan sebelum dikirim ke storage atau blending.", "liquid", refs.exchanger, "45 C", "3.8 barg", "300 m3/h", "Normal"),
  unitEquipment("DHP-OFFGAS", "DHP", "SOUR", "Sour Water / Off Gas", "Sour system", "Sour Water / Off Gas Section", "outlet", "Off gas dan sour water dikirim ke fasilitas penanganan sulfur dan sour water.", "gas", refs.vessel, "40 C", "3.2 barg", "18 t/h", "Normal"),
];

const EQUIPMENT_COORDINATES = {
  // CDU coordinates for assets/refinery-flow.png. Values are percentages relative to the bitmap.
  "CDU-TANK-FARM": { x: 5.1, y: 39.8, w: 7.0, h: 6.0 },
  "G-201-01": { x: 13.5, y: 40.0, w: 5.0, h: 7.0 },
  "C-201-11": { x: 21.4, y: 23.7, w: 5.0, h: 17.0 },
  "HX-COLD": { x: 21.8, y: 38.8, w: 7.0, h: 7.0 },
  "C-201-07": { x: 31.5, y: 39.8, w: 8.0, h: 7.0 },
  "HX-HOT": { x: 8.7, y: 63.5, w: 7.6, h: 7.0 },
  "F-201-01": { x: 20.6, y: 61.8, w: 8.0, h: 15.0 },
  "C-201-01": { x: 40.8, y: 43.9, w: 7.6, h: 56.0 },
  "C-201-08": { x: 49.3, y: 15.8, w: 9.2, h: 7.0 },
  "C-201-09": { x: 59.8, y: 14.2, w: 5.0, h: 11.0 },
  "K-201-01": { x: 67.9, y: 15.8, w: 8.0, h: 8.0 },
  "C-201-10": { x: 59.0, y: 31.5, w: 8.0, h: 8.0 },
  "C-201-02": { x: 49.7, y: 39.2, w: 5.4, h: 12.0 },
  "C-201-03": { x: 49.7, y: 54.5, w: 5.4, h: 12.0 },
  "C-201-04": { x: 49.8, y: 70.8, w: 5.4, h: 12.0 },
  "C-201-05": { x: 77.1, y: 30.8, w: 5.8, h: 27.0 },
  "C-201-12": { x: 85.8, y: 8.8, w: 9.0, h: 8.0 },
  "C-201-13": { x: 88.8, y: 36.0, w: 9.0, h: 7.0 },
  "C-201-06": { x: 81.9, y: 52.7, w: 5.2, h: 20.0 },
  "CDU-OFFGAS": { x: 94.8, y: 3.0, w: 7.5, h: 5.8 },
  "CDU-LPG": { x: 94.7, y: 16.5, w: 7.0, h: 5.5 },
  "CDU-LNAP": { x: 94.3, y: 42.3, w: 7.0, h: 5.5 },
  "CDU-HNAP": { x: 94.3, y: 62.6, w: 7.0, h: 5.5 },
  "CDU-KEROSENE": { x: 94.3, y: 67.7, w: 7.0, h: 5.2 },
  "CDU-LGO": { x: 94.3, y: 72.8, w: 7.0, h: 5.2 },
  "CDU-HGO": { x: 94.3, y: 77.8, w: 7.0, h: 5.2 },
  "CDU-RESIDUE": { x: 94.3, y: 86.0, w: 7.0, h: 11.0 },
  // HVU coordinates for assets/hvu-flow.png.
  "HVU-FEED": { x: 14.2, y: 63.5, w: 6.0, h: 17.0 },
  "HVU-PUMP": { x: 20.4, y: 82.3, w: 7.0, h: 8.0 },
  "HVU-PREHEAT": { x: 29.2, y: 82.1, w: 8.0, h: 8.0 },
  "HVU-HEATER": { x: 33.2, y: 24.2, w: 12.0, h: 25.0 },
  "HVU-COLUMN": { x: 49.5, y: 53.5, w: 9.0, h: 62.0 },
  "HVU-OVERHEAD": { x: 69.0, y: 35.2, w: 22.0, h: 10.0 },
  "HVU-LVGO": { x: 94.0, y: 47.3, w: 8.5, h: 6.0 },
  "HVU-HVGO": { x: 94.0, y: 70.8, w: 8.5, h: 6.0 },
  "HVU-RESIDUE": { x: 94.0, y: 91.3, w: 8.5, h: 6.0 },
  "HVU-EJECTOR": { x: 68.0, y: 12.8, w: 27.0, h: 9.0 },
};

EQUIPMENT.forEach((item) => Object.assign(item, EQUIPMENT_COORDINATES[item.id] || {}));

const STREAMS = [
  // Koordinat stream memakai persen terhadap gambar aktif: x 0-100 dan y 0-100.
  // Gunakan mode Kalibrasi atau tombol K, lalu klik diagram untuk mendapatkan format { x, y }.
  { id: "crude-feed", unit: "CDU", type: "liquid", label: "Crude Feed", points: [{ x: 0.8, y: 39.8 }, { x: 13.5, y: 39.8 }, { x: 21.8, y: 38.8 }, { x: 25.2, y: 49.0 }, { x: 8.7, y: 63.5 }, { x: 20.6, y: 61.8 }, { x: 40.8, y: 61.8 }] },
  { id: "desalter-water", unit: "CDU", type: "water", label: "Desalter Wash Water", points: [{ x: 1.0, y: 23.7 }, { x: 21.4, y: 23.7 }, { x: 21.4, y: 32.4 }, { x: 31.5, y: 32.4 }, { x: 31.5, y: 39.8 }] },
  { id: "heater-feed", unit: "CDU", type: "liquid", label: "Desalted Crude to Heater", points: [{ x: 31.5, y: 39.8 }, { x: 26.6, y: 39.8 }, { x: 26.6, y: 49.0 }, { x: 1.0, y: 49.0 }, { x: 1.0, y: 62.6 }, { x: 8.7, y: 63.5 }, { x: 20.6, y: 61.8 }] },
  { id: "main-column-feed", unit: "CDU", type: "liquid", label: "Heater Outlet to Main Column", points: [{ x: 20.6, y: 61.8 }, { x: 35.4, y: 61.8 }, { x: 40.8, y: 61.8 }] },
  { id: "overhead-gas", unit: "CDU", type: "gas", label: "Main Column Overhead Gas", points: [{ x: 40.8, y: 12.2 }, { x: 49.3, y: 15.8 }, { x: 59.8, y: 14.2 }, { x: 67.9, y: 15.8 }, { x: 85.8, y: 8.8 }, { x: 94.8, y: 3.0 }] },
  { id: "stabilizer-feed", unit: "CDU", type: "liquid", label: "Stabilizer Feed", points: [{ x: 49.3, y: 20.0 }, { x: 59.0, y: 31.5 }, { x: 72.0, y: 31.5 }, { x: 77.1, y: 30.8 }] },
  { id: "kerosene-draw", unit: "CDU", type: "liquid", label: "Kerosene Draw", points: [{ x: 40.8, y: 37.8 }, { x: 49.7, y: 39.2 }, { x: 73.5, y: 44.6 }, { x: 94.3, y: 67.7 }] },
  { id: "lgo-draw", unit: "CDU", type: "liquid", label: "LGO Draw", points: [{ x: 40.8, y: 53.0 }, { x: 49.7, y: 54.5 }, { x: 70.0, y: 60.0 }, { x: 94.3, y: 72.8 }] },
  { id: "hgo-draw", unit: "CDU", type: "liquid", label: "HGO Draw", points: [{ x: 40.8, y: 70.8 }, { x: 49.8, y: 70.8 }, { x: 70.0, y: 77.8 }, { x: 94.3, y: 77.8 }] },
  { id: "residue", unit: "CDU", type: "liquid", label: "Long Residue", points: [{ x: 40.8, y: 82.5 }, { x: 82.5, y: 82.5 }, { x: 82.5, y: 88.5 }, { x: 94.3, y: 88.5 }] },
  { id: "air-preheater", unit: "CDU", type: "air", label: "Air Preheater", points: [{ x: 0.7, y: 75.0 }, { x: 20.6, y: 75.0 }, { x: 20.6, y: 61.8 }] },
  { id: "hvu-feed", unit: "HVU", type: "liquid", label: "Reduced Crude Feed", points: [{ x: 0.8, y: 65.0 }, { x: 14.2, y: 65.0 }, { x: 14.2, y: 80.8 }, { x: 20.4, y: 82.3 }, { x: 29.2, y: 82.1 }] },
  { id: "hvu-preheat", unit: "HVU", type: "liquid", label: "HVU Preheat", points: [{ x: 20.4, y: 82.3 }, { x: 29.2, y: 82.1 }, { x: 36.8, y: 80.8 }, { x: 36.8, y: 48.0 }] },
  { id: "hvu-heater-feed", unit: "HVU", type: "liquid", label: "Vacuum Heater Feed", points: [{ x: 36.8, y: 48.0 }, { x: 23.7, y: 48.0 }, { x: 23.7, y: 24.0 }, { x: 33.2, y: 24.2 }] },
  { id: "hvu-column-feed", unit: "HVU", type: "liquid", label: "Heater Outlet to Vacuum Column", points: [{ x: 33.2, y: 24.2 }, { x: 44.6, y: 24.2 }, { x: 44.6, y: 57.8 }, { x: 49.5, y: 53.5 }] },
  { id: "hvu-overhead", unit: "HVU", type: "gas", label: "Vacuum Overhead", points: [{ x: 49.5, y: 26.0 }, { x: 56.8, y: 12.8 }, { x: 68.0, y: 12.8 }, { x: 79.0, y: 12.8 }, { x: 91.0, y: 12.8 }] },
  { id: "hvu-ejector-steam", unit: "HVU", type: "gas", label: "Ejector Steam / NCG", points: [{ x: 56.8, y: 12.8 }, { x: 56.8, y: 3.8 }, { x: 94.0, y: 3.8 }] },
  { id: "hvu-products", unit: "HVU", type: "liquid", label: "Vacuum Products", points: [{ x: 49.5, y: 47.3 }, { x: 94.0, y: 47.3 }, { x: 49.5, y: 55.2 }, { x: 94.0, y: 55.2 }, { x: 49.5, y: 63.4 }, { x: 94.0, y: 63.4 }, { x: 49.5, y: 70.8 }, { x: 94.0, y: 70.8 }] },
  { id: "hvu-residue", unit: "HVU", type: "liquid", label: "Short Residue", points: [{ x: 49.5, y: 89.5 }, { x: 94.0, y: 91.3 }] },
  { id: "hvu-air", unit: "HVU", type: "air", label: "Air Preheater", points: [{ x: 0.8, y: 29.8 }, { x: 9.5, y: 30.0 }, { x: 33.2, y: 30.0 }] },
];

const TOUR_STEPS = {
  CDU: [
    { id: "CDU-TANK-FARM", label: "From R Tank Farm", stream: "liquid" },
    { id: "G-201-01", label: "Crude Oil Pump", stream: "liquid" },
    { id: "HX-COLD", label: "Cold Preheat System", stream: "liquid" },
    { id: "C-201-07", label: "Desalter", stream: "water" },
    { id: "F-201-01", label: "Crude Charge Heater", stream: "air" },
    { id: "C-201-01", label: "Main Fractionator", stream: "liquid" },
    { id: "C-201-02", label: "Kerosene / LGO / HGO Stripper", stream: "liquid" },
    { id: "C-201-05", label: "Stabilizer", stream: "gas" },
    { id: "C-201-06", label: "Naphtha Splitter", stream: "liquid" },
    { id: "CDU-KEROSENE", label: "Product Outlets", stream: "liquid" },
  ],
  HVU: [
    { id: "HVU-FEED", label: "Vacuum Feed", stream: "liquid" },
    { id: "HVU-PUMP", label: "HVU Feed Pump", stream: "liquid" },
    { id: "HVU-PREHEAT", label: "Preheat System", stream: "liquid" },
    { id: "HVU-HEATER", label: "Vacuum Heater", stream: "liquid" },
    { id: "HVU-COLUMN", label: "Vacuum Column", stream: "liquid" },
    { id: "HVU-OVERHEAD", label: "Overhead Vacuum System", stream: "gas" },
    { id: "HVU-LVGO", label: "LVGO", stream: "liquid" },
    { id: "HVU-HVGO", label: "HVGO", stream: "liquid" },
    { id: "HVU-RESIDUE", label: "Vacuum Residue", stream: "liquid" },
  ],
  EWTP: [
    { id: "EWTP-INLET", label: "Wastewater Inlet", stream: "water" },
    { id: "EWTP-CPI", label: "Oil Separation", stream: "water" },
    { id: "EWTP-EQ", label: "Equalization", stream: "water" },
    { id: "EWTP-DOSING", label: "Chemical Treatment", stream: "water" },
    { id: "EWTP-DAF", label: "DAF", stream: "water" },
    { id: "EWTP-BIO", label: "Biological Treatment", stream: "water" },
    { id: "EWTP-CLARIFIER", label: "Clarifier", stream: "water" },
    { id: "EWTP-SLUDGE", label: "Sludge Handling", stream: "water" },
    { id: "EWTP-OUTLET", label: "Treated Water Outlet", stream: "water" },
  ],
  DHP: [
    { id: "DHP-FEED", label: "Feed Surge", stream: "liquid" },
    { id: "DHP-PUMP", label: "Feed Pump", stream: "liquid" },
    { id: "DHP-PREHEAT", label: "Preheat", stream: "liquid" },
    { id: "DHP-REACTOR", label: "Reactor", stream: "liquid" },
    { id: "DHP-HPS", label: "High Pressure Separator", stream: "gas" },
    { id: "DHP-STRIPPER", label: "Stripper", stream: "liquid" },
    { id: "DHP-RUNDOWN", label: "Product Rundown", stream: "liquid" },
    { id: "DHP-OFFGAS", label: "Off Gas / Sour Water", stream: "gas" },
  ],
};

const EQUIPMENT_BY_ID = new Map(EQUIPMENT.map((item) => [item.id, item]));
const STREAM_BY_ID = new Map(STREAMS.map((item) => [item.id, item]));
const CALIBRATION_STORAGE_KEY = "refinery-calibration-overrides-v1";
const PREFERENCES_STORAGE_KEY = "refinery-ui-preferences-v1";
const DIAGRAM_VIEW_MODE_KEY = "refinery-diagram-view-mode-v1";
const ADMIN_SESSION_KEY = "refinery-admin-session-v1";
const ADMIN_STORAGE_KEYS = {
  equipment: "refineryAdminEquipmentOverrides",
  flowImage: "refineryAdminFlowImage",
  nodes: "refineryAdminNodes",
  streams: "refineryAdminStreams",
  hiddenNodes: "refineryAdminHiddenNodes",
  processTour: "refineryAdminProcessTour",
};
const ADMIN_EDIT_MODE_KEY = "refinery-admin-edit-mode-v1";
const ADMIN_SNAP_KEY = "refinery-admin-snap-v1";
const PRESENTATION_MODE_KEY = "refinery-presentation-mode-v1";
const LAYER_PREFERENCES_KEY = "refinery-layer-preferences-v1";
const DEFAULT_UNITS_SNAPSHOT = cloneData(UNITS);
const DEFAULT_EQUIPMENT_SNAPSHOT = cloneData(EQUIPMENT);
const DEFAULT_STREAMS_SNAPSHOT = cloneData(STREAMS);

const STREAM_DESCRIPTIONS = {
  all: "Menampilkan semua aliran proses",
  liquid: "Menyorot aliran hydrocarbon",
  water: "Menyorot aliran water/wash",
  gas: "Menyorot aliran gas/overhead",
  air: "Menyorot aliran udara",
};

const els = {};
const searchOptionByValue = new Map();
const adminTabs = [
  { id: "equipment", label: "Equipment" },
  { id: "node", label: "Schematic" },
  { id: "stream", label: "Stream" },
  { id: "config", label: "Config" },
];

const DEFAULT_LAYER_PREFERENCES = {
  hotspots: true,
  streams: true,
  streamLabels: true,
  statusBadges: true,
  calibrationMarkers: true,
  miniMap: true,
  tooltip: true,
  processPath: true,
  autoFocus: true,
  focusSelected: false,
  presentationSearch: false,
};

const state = {
  activeUnitId: "CDU",
  diagramViewMode: "image",
  selectedEquipmentId: null,
  activeStream: "all",
  diagramReady: false,
  diagramFallbackTimer: null,
  calibrationMode: false,
  streamHidden: false,
  searchQuery: "",
  isExporting: false,
  isFullscreen: false,
  toastId: 0,
  calibrationOverrides: {
    equipment: {},
    streams: {},
  },
  calibrationDrag: null,
  ignoreNextHotspotClick: false,
  selectionGuard: {
    id: "",
    time: 0,
  },
  zoom: {
    value: 1,
    min: 0.7,
    max: 2.8,
    step: 0.18,
    fit: true,
  },
  pan: {
    active: false,
    pointerId: null,
    startX: 0,
    startY: 0,
    scrollLeft: 0,
    scrollTop: 0,
  },
  tour: {
    running: false,
    paused: false,
    index: 0,
    timer: null,
    unitId: "CDU",
  },
  admin: {
    loggedIn: false,
    editMode: false,
    activeTab: "equipment",
    selectedEquipmentId: null,
    selectedNodeId: null,
    selectedStreamId: null,
    secretClicks: [],
    typedSequence: "",
    pendingNodeImage: "",
    pendingEquipmentImage: "",
    pickingNodePosition: false,
    previewStream: null,
    streamPathEdit: {
      active: false,
      streamId: "",
      mode: "image",
    },
    pendingPreview: null,
    history: [],
    redo: [],
    searchResults: [],
    searchIndex: [],
    searchCursor: -1,
    snap: { enabled: false, size: 1 },
  },
  adminData: {
    equipmentOverrides: {},
    flowImages: {},
    nodes: [],
    streams: {},
    hiddenNodes: [],
    processTour: {},
  },
  layerPreferences: { ...DEFAULT_LAYER_PREFERENCES },
  presentationMode: false,
  presentationOverlay: {
    equipmentId: null,
    hotspot: null,
  },
  viewerMenuOpen: false,
  tooltip: {
    timer: null,
    target: null,
  },
};

function detail(fn, operation, watch) {
  return { function: fn, operation, watch };
}

function op(temperature, pressure, flow, status) {
  return { temperature, pressure, flow, status };
}

function outletEquipment(id, unit, tag, name, type, section, x, y, stream, description) {
  return {
    id,
    unit,
    tag,
    name,
    type,
    area: "Product outlet",
    section,
    x,
    y,
    w: 7.5,
    h: 6.5,
    icon: "outlet",
    streams: [stream],
    photo: refs.vessel,
    description,
    details: detail(
      ["Menjadi titik monitoring kualitas dan flow produk.", "Mengirim produk ke storage, blending, atau unit downstream."],
      ["Outlet dikontrol melalui flow, temperatur, dan line-up downstream.", "Perubahan kualitas upstream terlihat pada trend produk outlet."],
      ["Flow produk", "Temperatur rundown", "Kualitas produk", "Line-up valve"]
    ),
    operation: op(stream === "gas" ? "45 C" : "55 C", stream === "gas" ? "6.0 barg" : "2.0 barg", stream === "gas" ? "32 t/h" : "95 m3/h", "Normal"),
    path: [unit, "Main Fractionator", section, tag],
  };
}

function unitEquipment(id, unit, tag, name, type, section, icon, description, stream, photo, temperature, pressure, flow, status) {
  return {
    id,
    unit,
    tag,
    name,
    type,
    area: section.replace(" Section", ""),
    section,
    icon,
    streams: [stream],
    photo,
    description,
    details: detail(
      [`Menjalankan fungsi utama pada ${section}.`, "Menjaga kontinuitas proses dan kualitas output unit."],
      ["Parameter operasi dipantau melalui temperatur, pressure, flow, dan status equipment.", "Perubahan trend menjadi dasar tindakan operator sebelum unit mencapai batas alarm."],
      ["Temperature", "Pressure", "Flow", "Status alarm dan interlock"]
    ),
    operation: op(temperature, pressure, flow, status),
    path: [unit, section, name],
  };
}

function initApp() {
  cacheDom();
  initToasts();
  bindEvents();
  initKeyboardShortcuts();
  loadAdminState();
  loadLayerPreferences();
  loadProcessTourConfig();
  mergeAdminDataWithDefault();
  loadCalibrationOverrides();
  syncAdminUi();
  renderUnitTabs();
  const preferences = loadPreferences();
  const initialDiagramMode = getDiagramViewMode();
  state.diagramViewMode = initialDiagramMode;
  const fallbackTheme = window.matchMedia?.("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  setTheme(preferences.theme || localStorage.getItem("refinery-theme") || fallbackTheme);
  els.iconOpacityToggle.checked = Boolean(preferences.iconOpacity);
  const initialUnit = UNITS[preferences.selectedUnit] ? preferences.selectedUnit : "CDU";
  const initialEquipment = getSafeEquipmentPreference(preferences.lastSelectedEquipment, initialUnit);
  setActiveUnit(initialUnit, { equipmentId: initialEquipment || undefined });
  setDiagramViewMode(initialDiagramMode, { silent: true, keepSelection: true });
  setStreamFilter(STREAM_TYPES[preferences.selectedStream] ? preferences.selectedStream : "all");
  setZoom(1, true);
  setPresentationMode(sessionStorage.getItem(PRESENTATION_MODE_KEY) === "active", { silent: true });
  applyLayerPreferences();
}

function cacheDom() {
  Object.assign(els, {
    unitEyebrow: document.getElementById("unitEyebrow"),
    unitTitle: document.getElementById("unitTitle"),
    brandLogo: document.querySelector(".brand-logo"),
    selectedStatus: document.getElementById("selectedStatus"),
    themeToggle: document.getElementById("themeToggle"),
    themeToggleText: document.getElementById("themeToggleText"),
    unitTabs: document.getElementById("unitTabs"),
    workspace: document.getElementById("workspace"),
    diagramPanel: document.getElementById("diagramPanel"),
    diagramToolbar: document.getElementById("diagramToolbar"),
    zoomOut: document.getElementById("zoomOut"),
    zoomIn: document.getElementById("zoomIn"),
    zoomFit: document.getElementById("zoomFit"),
    zoomValue: document.getElementById("zoomValue"),
    equipmentSearch: document.getElementById("equipmentSearch"),
    equipmentSearchList: document.getElementById("equipmentSearchList"),
    searchFeedback: document.getElementById("searchFeedback"),
    searchAllUnits: document.getElementById("searchAllUnits"),
    searchClear: document.getElementById("searchClear"),
    viewerMoreToggle: document.getElementById("viewerMoreToggle"),
    viewerMorePanel: document.getElementById("viewerMorePanel"),
    streamControls: document.getElementById("streamControls"),
    streamDescription: document.getElementById("streamDescription"),
    shortcutHint: document.getElementById("shortcutHint"),
    processRun: document.getElementById("processRun"),
    processPause: document.getElementById("processPause"),
    processStop: document.getElementById("processStop"),
    stepCounter: document.getElementById("stepCounter"),
    calibrationToggle: document.getElementById("calibrationToggle"),
    visualToggle: document.getElementById("visualToggle"),
    fullscreenToggle: document.getElementById("fullscreenToggle"),
    exportPng: document.getElementById("exportPng"),
    fitSelected: document.getElementById("fitSelected"),
    layerToggle: document.getElementById("layerToggle"),
    presentationToggle: document.getElementById("presentationToggle"),
    diagramModeImage: document.getElementById("diagramModeImage"),
    diagramModeSchematic: document.getElementById("diagramModeSchematic"),
    iconOpacityToggle: document.getElementById("iconOpacityToggle"),
    diagramScroll: document.getElementById("diagramScroll"),
    diagramStage: document.getElementById("diagramStage"),
    imageDiagramLayer: document.getElementById("imageDiagramLayer"),
    schematicDiagramLayer: document.getElementById("schematicDiagramLayer"),
    schematicCanvas: document.getElementById("schematicCanvas"),
    flowImage: document.getElementById("flowImage"),
    selectedSummary: document.getElementById("selectedSummary"),
    summaryStatus: document.getElementById("summaryStatus"),
    summaryTag: document.getElementById("summaryTag"),
    summaryName: document.getElementById("summaryName"),
    summaryStatusText: document.getElementById("summaryStatusText"),
    summaryDetail: document.getElementById("summaryDetail"),
    summaryReset: document.getElementById("summaryReset"),
    streamOverlay: document.getElementById("streamOverlay"),
    hotspotLayer: document.getElementById("hotspotLayer"),
    calibrationLayer: document.getElementById("calibrationLayer"),
    miniMap: document.getElementById("miniMap"),
    presentationEquipmentOverlay: document.getElementById("presentationEquipmentOverlay"),
    equipmentTooltip: document.getElementById("equipmentTooltip"),
    diagramEmptyState: document.getElementById("diagramEmptyState"),
    equipmentStrip: document.getElementById("equipmentStrip"),
    equipmentSections: document.getElementById("equipmentSections"),
    detailPanel: document.getElementById("detailPanel"),
    detailClose: document.getElementById("detailClose"),
    equipmentImage: document.getElementById("equipmentImage"),
    equipmentType: document.getElementById("equipmentType"),
    equipmentName: document.getElementById("equipmentName"),
    equipmentDescription: document.getElementById("equipmentDescription"),
    detailIcon: document.getElementById("detailIcon"),
    processPath: document.getElementById("processPath"),
    operationTemperature: document.getElementById("operationTemperature"),
    operationPressure: document.getElementById("operationPressure"),
    operationFlow: document.getElementById("operationFlow"),
    operationStatus: document.getElementById("operationStatus"),
    heroStatus: document.getElementById("heroStatus"),
    equipmentFunction: document.getElementById("equipmentFunction"),
    equipmentOperation: document.getElementById("equipmentOperation"),
    equipmentWatch: document.getElementById("equipmentWatch"),
    sourceLink: document.getElementById("sourceLink"),
    equipmentUnit: document.getElementById("equipmentUnit"),
    equipmentSection: document.getElementById("equipmentSection"),
    equipmentTag: document.getElementById("equipmentTag"),
    equipmentArea: document.getElementById("equipmentArea"),
    toastRoot: document.getElementById("toastRoot"),
    fullscreenEquipmentCard: document.getElementById("fullscreenEquipmentCard"),
    fullscreenEquipmentClose: document.getElementById("fullscreenEquipmentClose"),
    fullscreenEquipmentImage: document.getElementById("fullscreenEquipmentImage"),
    fullscreenEquipmentType: document.getElementById("fullscreenEquipmentType"),
    fullscreenEquipmentName: document.getElementById("fullscreenEquipmentName"),
    fullscreenEquipmentStatus: document.getElementById("fullscreenEquipmentStatus"),
    fullscreenEquipmentFunction: document.getElementById("fullscreenEquipmentFunction"),
    adminSecretTrigger: document.getElementById("adminSecretTrigger"),
    adminStatusIndicator: document.getElementById("adminStatusIndicator"),
    adminSaveIndicator: document.getElementById("adminSaveIndicator"),
    adminEditModeToggle: document.getElementById("adminEditModeToggle"),
    adminPanelOpen: document.getElementById("adminPanelOpen"),
    adminLogout: document.getElementById("adminLogout"),
    adminLoginModal: document.getElementById("adminLoginModal"),
    adminLoginForm: document.getElementById("adminLoginForm"),
    adminLoginClose: document.getElementById("adminLoginClose"),
    adminLoginCancel: document.getElementById("adminLoginCancel"),
    adminUsername: document.getElementById("adminUsername"),
    adminPassword: document.getElementById("adminPassword"),
    adminLoginError: document.getElementById("adminLoginError"),
    adminPanel: document.getElementById("adminPanel"),
    adminPanelClose: document.getElementById("adminPanelClose"),
    adminUndo: document.getElementById("adminUndo"),
    adminRedo: document.getElementById("adminRedo"),
    adminTabs: document.getElementById("adminTabs"),
    adminPanelBody: document.getElementById("adminPanelBody"),
    layerPanel: document.getElementById("layerPanel"),
  });
}

function bindEvents() {
  els.brandLogo?.addEventListener("error", () => {
    els.brandLogo.classList.add("is-hidden");
    document.body.classList.add("brand-logo-missing");
  });

  els.themeToggle.addEventListener("click", () => {
    setTheme(document.body.dataset.theme === "dark" ? "light" : "dark");
  });

  els.zoomOut.addEventListener("click", () => setZoom(state.zoom.value - state.zoom.step, false));
  els.zoomIn.addEventListener("click", () => setZoom(state.zoom.value + state.zoom.step, false));
  els.zoomFit.addEventListener("click", () => {
    setZoom(1, true);
    els.diagramScroll.scrollTo({ left: 0, top: 0, behavior: "smooth" });
  });

  els.searchAllUnits.addEventListener("change", () => {
    renderSearchOptions();
    renderEquipmentStrip();
    renderEquipmentSections();
    updateSearchFeedback();
  });
  els.equipmentSearch.addEventListener("input", handleSearchInput);
  els.equipmentSearch.addEventListener("change", selectSearchResult);
  els.equipmentSearch.addEventListener("keydown", (event) => {
    if (event.key === "ArrowDown" || event.key === "ArrowUp") {
      event.preventDefault();
      moveSearchCursor(event.key === "ArrowDown" ? 1 : -1);
      return;
    }
    if (event.key === "Escape") {
      event.preventDefault();
      clearSearch();
      return;
    }
    if (event.key === "Enter") {
      event.preventDefault();
      selectSearchResult();
    }
  });
  els.searchClear.addEventListener("click", () => {
    clearSearch();
    els.equipmentSearch.focus();
  });
  els.viewerMoreToggle?.addEventListener("click", (event) => {
    event.stopPropagation();
    toggleViewerMoreMenu();
  });
  els.diagramModeImage?.addEventListener("click", () => setDiagramViewMode("image"));
  els.diagramModeSchematic?.addEventListener("click", () => setDiagramViewMode("schematic"));
  document.addEventListener("click", (event) => {
    if (!state.viewerMenuOpen) {
      return;
    }
    if (event.target.closest("#viewerMorePanel") || event.target.closest("#viewerMoreToggle")) {
      return;
    }
    toggleViewerMoreMenu(false);
  });

  els.streamControls.addEventListener("click", (event) => {
    const button = event.target.closest("[data-stream]");
    if (button) {
      setStreamFilter(button.dataset.stream);
      showToast(`Filter stream: ${STREAM_TYPES[state.activeStream]}`, "info");
    }
  });

  els.processRun.addEventListener("click", startProcessTour);
  els.processPause.addEventListener("click", pauseProcessTour);
  els.processStop.addEventListener("click", () => stopProcessTour());
  els.calibrationToggle.addEventListener("click", () => toggleCalibrationMode());
  els.visualToggle.addEventListener("click", toggleStreamVisibility);
  els.fullscreenToggle.addEventListener("click", toggleFullscreen);
  els.exportPng.addEventListener("click", exportDiagram);
  els.fitSelected?.addEventListener("click", () => fitToSelectedEquipment());
  els.layerToggle?.addEventListener("click", toggleLayerPanel);
  els.presentationToggle?.addEventListener("click", () => setPresentationMode(!isPresentationMode()));

  els.iconOpacityToggle.addEventListener("change", () => {
    els.hotspotLayer.classList.toggle("icons-transparent", els.iconOpacityToggle.checked);
    savePreferences({ iconOpacity: els.iconOpacityToggle.checked });
  });

  els.summaryDetail.addEventListener("click", () => {
    els.detailPanel.scrollIntoView({ behavior: "smooth", block: "start" });
  });

  els.summaryReset.addEventListener("click", () => {
    pulseActiveHotspot(null);
    els.selectedSummary.classList.add("is-hidden");
  });

  els.detailClose?.addEventListener("click", () => {
    closeDetailPanel();
  });

  setupDetailAccordions();
  bindFullscreenEquipmentCard();

  els.diagramStage.addEventListener("click", (event) => {
    if (state.admin.pickingNodePosition && isAdmin()) {
      event.preventDefault();
      const point = getDiagramPercentCoordinate(event);
      setAdminNodePosition(point);
      addCalibrationLabel(point);
      showToast("Posisi node dipilih", "success", `{ x: ${point.x}, y: ${point.y} }`);
      return;
    }

    if (
      !state.calibrationMode ||
      event.target.closest(".hotspot") ||
      event.target.closest(".stream-point") ||
      event.target.closest(".stream-path") ||
      event.target.closest(".stream-hit-path")
    ) {
      return;
    }
    const point = getDiagramPercentCoordinate(event);
    console.log(`{ x: ${point.x}, y: ${point.y} }`);
    addCalibrationLabel(point);
    els.selectedStatus.textContent = `Kalibrasi: { x: ${point.x}, y: ${point.y} }`;
  });

  document.addEventListener("keydown", (event) => {
    if (event.key.toLowerCase() !== "k") {
      return;
    }
    if (event.target.closest("input, textarea, select")) {
      return;
    }
    toggleCalibrationMode();
  });

  document.addEventListener("fullscreenchange", () => {
    updateFullscreenButton();
    if (!isDiagramFullscreen()) {
      hideFullscreenEquipmentCard();
    }
  });
  window.addEventListener("resize", updatePannableState);
  window.addEventListener("resize", debounce(() => {
    updateMiniMapViewport();
    updatePresentationOverlayPosition();
  }, 80));
  bindPanning();
  bindAdminEvents();
  bindPresentationOverlayEvents();
  applyViewerModeVisibility();
}

function bindPanning() {
  els.diagramScroll.addEventListener("pointerdown", (event) => {
    if (
      state.calibrationMode ||
      !els.diagramScroll.classList.contains("is-pannable") ||
      event.target.closest("button, input, label, a")
    ) {
      return;
    }

    state.pan.active = true;
    state.pan.pointerId = event.pointerId;
    state.pan.startX = event.clientX;
    state.pan.startY = event.clientY;
    state.pan.scrollLeft = els.diagramScroll.scrollLeft;
    state.pan.scrollTop = els.diagramScroll.scrollTop;
    els.diagramScroll.classList.add("is-panning");
    els.diagramScroll.setPointerCapture(event.pointerId);
  });

  els.diagramScroll.addEventListener("pointermove", (event) => {
    if (!state.pan.active || event.pointerId !== state.pan.pointerId) {
      return;
    }
    els.diagramScroll.scrollLeft = state.pan.scrollLeft - (event.clientX - state.pan.startX);
    els.diagramScroll.scrollTop = state.pan.scrollTop - (event.clientY - state.pan.startY);
  });

  const stopPanning = (event) => {
    if (!state.pan.active || event.pointerId !== state.pan.pointerId) {
      return;
    }
    state.pan.active = false;
    state.pan.pointerId = null;
    els.diagramScroll.classList.remove("is-panning");
  };

  els.diagramScroll.addEventListener("pointerup", stopPanning);
  els.diagramScroll.addEventListener("pointercancel", stopPanning);
}

// Viewer toolbar stays minimal; advanced controls are opened through the compact "more" menu.
function toggleViewerMoreMenu(force) {
  const nextState = typeof force === "boolean" ? force : !state.viewerMenuOpen;
  state.viewerMenuOpen = nextState;
  els.viewerMorePanel?.classList.toggle("is-open", nextState);
  els.viewerMoreToggle?.classList.toggle("is-active", nextState);
  els.viewerMoreToggle?.setAttribute("aria-pressed", String(nextState));
}

function applyViewerModeVisibility() {
  const viewerOnly = !isAdmin();
  document.body.classList.toggle("viewer-minimal", viewerOnly);
  if (!viewerOnly) {
    toggleViewerMoreMenu(true);
    return;
  }
  toggleViewerMoreMenu(false);
}

function initToasts() {
  if (!els.toastRoot) {
    const root = document.createElement("div");
    root.className = "toast-root";
    root.id = "toastRoot";
    root.setAttribute("aria-live", "polite");
    root.setAttribute("aria-atomic", "true");
    document.body.appendChild(root);
    els.toastRoot = root;
  }
}

function showToast(message, type = "info", detail = "") {
  if (!els.toastRoot) {
    return;
  }
  const toast = document.createElement("div");
  const toastId = `toast-${state.toastId += 1}`;
  toast.className = `toast toast-${type}`;
  toast.id = toastId;
  toast.setAttribute("role", type === "error" ? "alert" : "status");
  toast.innerHTML = `<strong>${message}</strong>${detail ? `<span>${detail}</span>` : ""}`;
  els.toastRoot.appendChild(toast);
  window.setTimeout(() => {
    toast.style.opacity = "0";
    toast.style.transform = "translateY(8px)";
    window.setTimeout(() => toast.remove(), 180);
  }, type === "error" ? 4600 : 3000);
}

// Admin/editor layer: all mutable changes are stored as overrides so default data stays recoverable.
function bindAdminEvents() {
  els.adminSecretTrigger?.addEventListener("click", handleAdminSecretClick);
  els.adminEditModeToggle?.addEventListener("click", () => setEditMode(!isEditMode()));
  els.adminPanelOpen?.addEventListener("click", openAdminPanel);
  els.adminLogout?.addEventListener("click", logoutAdmin);
  els.adminPanelClose?.addEventListener("click", closeAdminPanel);
  els.adminUndo?.addEventListener("click", undoAdminChange);
  els.adminRedo?.addEventListener("click", redoAdminChange);
  els.adminLoginClose?.addEventListener("click", closeAdminLoginModal);
  els.adminLoginCancel?.addEventListener("click", closeAdminLoginModal);
  els.adminLoginModal?.addEventListener("click", (event) => {
    if (event.target === els.adminLoginModal) {
      closeAdminLoginModal();
    }
  });
  els.adminLoginForm?.addEventListener("submit", (event) => {
    event.preventDefault();
    loginAdmin(els.adminUsername.value.trim(), els.adminPassword.value);
  });
}

function handleAdminSecretClick() {
  const now = Date.now();
  state.admin.secretClicks = state.admin.secretClicks.filter((time) => now - time < 3000);
  state.admin.secretClicks.push(now);
  if (state.admin.secretClicks.length >= 5) {
    state.admin.secretClicks = [];
    openAdminLoginModal();
  }
}

function trackAdminTypedSequence(event) {
  if (event.ctrlKey || event.metaKey || event.altKey || event.key.length !== 1) {
    return;
  }
  state.admin.typedSequence = `${state.admin.typedSequence}${event.key.toLowerCase()}`.slice(-12);
  if (state.admin.typedSequence.endsWith("admin")) {
    state.admin.typedSequence = "";
    openAdminLoginModal();
  }
}

function isAdmin() {
  return state.admin.loggedIn === true;
}

function openAdminLoginModal() {
  if (isAdmin()) {
    openAdminPanel();
    return;
  }
  els.adminLoginError.classList.add("is-hidden");
  els.adminUsername.value = "";
  els.adminPassword.value = "";
  els.adminLoginModal.classList.remove("is-hidden");
  window.setTimeout(() => els.adminUsername.focus(), 40);
}

function closeAdminLoginModal() {
  els.adminLoginModal.classList.add("is-hidden");
}

function loginAdmin(username, password) {
  if (!username || !password) {
    els.adminLoginError.textContent = "Username dan password wajib diisi.";
    els.adminLoginError.classList.remove("is-hidden");
    showToast("Input admin belum lengkap", "warning");
    return;
  }
  if (username !== "admin" || password !== "admin123") {
    els.adminLoginError.textContent = "Login admin gagal.";
    els.adminLoginError.classList.remove("is-hidden");
    showToast("Login admin gagal", "error");
    return;
  }
  sessionStorage.setItem(ADMIN_SESSION_KEY, "active");
  state.admin.loggedIn = true;
  closeAdminLoginModal();
  syncAdminUi();
  renderAdminPanel();
  openAdminPanel();
  showToast("Login admin berhasil", "success");
}

function logoutAdmin() {
  sessionStorage.removeItem(ADMIN_SESSION_KEY);
  state.admin.loggedIn = false;
  setEditMode(false, { silent: true });
  if (state.calibrationMode) {
    toggleCalibrationMode(false);
  }
  state.admin.pickingNodePosition = false;
  state.admin.previewStream = null;
  closeAdminPanel();
  syncAdminUi();
  renderStreamOverlay();
  setStreamFilter(state.activeStream);
  showToast("Logout admin berhasil", "info");
}

function requireAdmin(actionName = "Fitur ini") {
  els.selectedStatus.textContent = `${actionName} hanya untuk admin`;
  showToast("Mode kalibrasi hanya untuk admin", "warning", "Login admin diperlukan untuk mengubah visualisasi.");
  return false;
}

function isEditMode() {
  return isAdmin() && state.admin.editMode === true;
}

function setEditMode(enabled, options = {}) {
  const next = Boolean(enabled) && isAdmin();
  state.admin.editMode = next;
  document.body.classList.toggle("is-edit-mode", next);
  sessionStorage.setItem(ADMIN_EDIT_MODE_KEY, next ? "active" : "inactive");
  if (!next && state.calibrationMode) {
    toggleCalibrationMode(false);
  }
  if (!next) {
    state.admin.pickingNodePosition = false;
    stopAdminStreamPathEdit({ render: false });
    cancelAdminPreview({ silent: true });
  }
  syncAdminUi();
  renderAdminPanel();
  if (!options.silent) {
    showToast(next ? "Edit Mode aktif" : "Edit Mode nonaktif", next ? "warning" : "info");
  }
}

function requireEditMode(actionName = "Perubahan admin") {
  if (isEditMode()) {
    return true;
  }
  showToast("Aktifkan Edit Mode terlebih dahulu", "warning", actionName);
  els.selectedStatus.textContent = `${actionName} membutuhkan Edit Mode`;
  return false;
}

function syncAdminUi() {
  document.body.classList.toggle("is-admin", isAdmin());
  document.body.classList.toggle("is-edit-mode", isEditMode());
  els.adminStatusIndicator?.classList.toggle("is-hidden", !isAdmin());
  if (els.adminEditModeToggle) {
    els.adminEditModeToggle.classList.toggle("is-active", isEditMode());
    els.adminEditModeToggle.textContent = isEditMode() ? "Edit ON" : "Edit Mode";
    els.adminEditModeToggle.setAttribute("aria-pressed", String(isEditMode()));
  }
  els.calibrationToggle.classList.toggle("is-locked", !isAdmin() || !isEditMode());
  els.calibrationToggle.setAttribute("aria-disabled", "false");
  els.calibrationToggle.title = !isAdmin() ? "Kalibrasi hanya untuk admin" : isEditMode() ? "Kalibrasi koordinat" : "Aktifkan Edit Mode terlebih dahulu";
  updateUndoRedoButtons();
  if (isAdmin()) {
    setAdminSaveState("saved");
  }
  if (!isAdmin()) {
    els.adminPanel?.classList.add("is-hidden");
  }
  applyViewerModeVisibility();
}

function isAdminPanelOpen() {
  return Boolean(els.adminPanel && !els.adminPanel.classList.contains("is-hidden"));
}

function openAdminPanel() {
  if (!isAdmin()) {
    openAdminLoginModal();
    return;
  }
  if (!adminTabs.some((tab) => tab.id === state.admin.activeTab)) {
    state.admin.activeTab = "equipment";
  }
  renderAdminPanel();
  els.adminPanel.classList.remove("is-hidden");
}

function closeAdminPanel() {
  if (hasPendingPreview()) {
    cancelAdminPreview({ silent: true });
    showToast("Preview dibatalkan", "info");
  }
  els.adminPanel?.classList.add("is-hidden");
  state.admin.pickingNodePosition = false;
  stopAdminStreamPathEdit({ render: false });
  renderStreamOverlay();
  setStreamFilter(state.activeStream);
}

function loadAdminState() {
  state.admin.loggedIn = sessionStorage.getItem(ADMIN_SESSION_KEY) === "active";
  state.admin.editMode = state.admin.loggedIn && sessionStorage.getItem(ADMIN_EDIT_MODE_KEY) === "active";
  const snap = readStorageJson(ADMIN_SNAP_KEY, { enabled: false, size: 1 }, { session: true });
  state.admin.snap = { enabled: Boolean(snap.enabled), size: Number(snap.size) || 1 };
  state.adminData.equipmentOverrides = readStorageJson(ADMIN_STORAGE_KEYS.equipment, {});
  state.adminData.flowImages = normalizeFlowImages(readStorageJson(ADMIN_STORAGE_KEYS.flowImage, {}));
  state.adminData.nodes = readStorageJson(ADMIN_STORAGE_KEYS.nodes, []);
  state.adminData.streams = readStorageJson(ADMIN_STORAGE_KEYS.streams, {});
  state.adminData.hiddenNodes = readStorageJson(ADMIN_STORAGE_KEYS.hiddenNodes, []);
  state.adminData.processTour = readStorageJson(ADMIN_STORAGE_KEYS.processTour, {});
}

function saveAdminState() {
  setAdminSaveState("saving");
  safeLocalStorageSet(ADMIN_STORAGE_KEYS.equipment, state.adminData.equipmentOverrides);
  safeLocalStorageSet(ADMIN_STORAGE_KEYS.flowImage, state.adminData.flowImages);
  safeLocalStorageSet(ADMIN_STORAGE_KEYS.nodes, state.adminData.nodes);
  safeLocalStorageSet(ADMIN_STORAGE_KEYS.streams, state.adminData.streams);
  safeLocalStorageSet(ADMIN_STORAGE_KEYS.hiddenNodes, state.adminData.hiddenNodes);
  safeLocalStorageSet(ADMIN_STORAGE_KEYS.processTour, state.adminData.processTour);
  window.setTimeout(() => setAdminSaveState("saved"), 180);
}

function setAdminSaveState(status = "saved") {
  if (!els.adminSaveIndicator) {
    return;
  }
  const labels = {
    dirty: "Belum disimpan",
    saving: "Menyimpan...",
    saved: "Tersimpan",
  };
  els.adminSaveIndicator.textContent = labels[status] || labels.saved;
  els.adminSaveIndicator.classList.remove("is-dirty", "is-saving", "is-saved");
  els.adminSaveIndicator.classList.add(`is-${status}`);
}

function mergeAdminDataWithDefault() {
  resetRuntimeDataToDefaults();
  Object.entries(state.adminData.equipmentOverrides || {}).forEach(([id, override]) => {
    const item = EQUIPMENT.find((entry) => entry.id === id);
    if (item) {
      mergeEquipmentData(item, override);
    }
  });
  (state.adminData.nodes || []).forEach((node) => {
    if (!node?.id) {
      return;
    }
    const existing = EQUIPMENT.find((entry) => entry.id === node.id);
    if (existing) {
      mergeEquipmentData(existing, { ...node, adminCreated: true });
    } else {
      EQUIPMENT.push(normalizeEquipmentPayload({ ...node, adminCreated: true }));
    }
  });
  applyAdminStreams();
  applyAdminFlowImage();
  normalizeUnitEquipmentMembership();
  rebuildDataIndexes();
}

function resetRuntimeDataToDefaults() {
  Object.keys(UNITS).forEach((key) => delete UNITS[key]);
  Object.entries(cloneData(DEFAULT_UNITS_SNAPSHOT)).forEach(([key, value]) => {
    UNITS[key] = value;
  });
  EQUIPMENT.splice(0, EQUIPMENT.length, ...cloneData(DEFAULT_EQUIPMENT_SNAPSHOT));
  STREAMS.splice(0, STREAMS.length, ...cloneData(DEFAULT_STREAMS_SNAPSHOT));
  rebuildDataIndexes();
}

function rebuildDataIndexes() {
  EQUIPMENT_BY_ID.clear();
  EQUIPMENT.forEach((item) => EQUIPMENT_BY_ID.set(item.id, item));
  STREAM_BY_ID.clear();
  STREAMS.forEach((stream) => STREAM_BY_ID.set(stream.id, stream));
}

function applyAdminStreams() {
  Object.entries(state.adminData.streams || {}).forEach(([id, value]) => {
    const existingIndex = STREAMS.findIndex((stream) => stream.id === id);
    if (value?.deleted) {
      if (existingIndex >= 0) {
        STREAMS.splice(existingIndex, 1);
      }
      return;
    }
    const next = normalizeStreamPayload(value);
    if (!next.id) {
      return;
    }
    if (existingIndex >= 0) {
      STREAMS[existingIndex] = { ...STREAMS[existingIndex], ...next };
    } else {
      STREAMS.push(next);
    }
  });
  Object.values(UNITS).forEach((unit) => {
    unit.streamIds = [];
  });
  STREAMS.forEach((stream) => {
    const unit = UNITS[stream.unit];
    if (unit && !unit.streamIds.includes(stream.id)) {
      unit.streamIds.push(stream.id);
    }
  });
}

function applyAdminFlowImage() {
  Object.entries(state.adminData.flowImages || {}).forEach(([unitId, image]) => {
    if (UNITS[unitId] && image) {
      UNITS[unitId].image = image;
    }
  });
}

function normalizeUnitEquipmentMembership() {
  const hidden = new Set(state.adminData.hiddenNodes || []);
  Object.values(UNITS).forEach((unit) => {
    unit.equipmentIds = [];
    unit.sections.forEach((section) => {
      section.equipmentIds = [];
    });
  });
  EQUIPMENT.forEach((item) => {
    ensureEquipmentModePositions(item);
    if (hidden.has(item.id)) {
      item.disabled = true;
      return;
    }
    ensureEquipmentInUnitSection(item);
  });
}

function ensureEquipmentInUnitSection(item) {
  if (!item.unit || !UNITS[item.unit]) {
    item.unit = state.activeUnitId || "CDU";
  }
  const unit = UNITS[item.unit];
  if (!unit.equipmentIds.includes(item.id)) {
    unit.equipmentIds.push(item.id);
  }
  const sectionTitle = safeText(item.section, "Admin Section");
  let section = unit.sections.find((entry) => entry.title === sectionTitle || entry.id === slugify(sectionTitle));
  if (!section) {
    section = {
      id: `${item.unit.toLowerCase()}-${slugify(sectionTitle)}`,
      title: sectionTitle,
      summary: "Equipment tambahan dari editor admin.",
      equipmentIds: [],
    };
    unit.sections.push(section);
  }
  if (!section.equipmentIds.includes(item.id)) {
    section.equipmentIds.push(item.id);
  }
}

function refreshAfterAdminDataChange(options = {}) {
  const selectedId = options.equipmentId || state.selectedEquipmentId;
  const activeUnit = options.unitId || state.activeUnitId;
  mergeAdminDataWithDefault();
  loadCalibrationOverrides();
  renderUnitTabs();
  const nextItem = EQUIPMENT_BY_ID.get(selectedId);
  const nextUnit = nextItem?.unit || (UNITS[activeUnit] ? activeUnit : "CDU");
  setActiveUnit(nextUnit, { equipmentId: nextItem?.id, selectFirst: Boolean(nextItem) });
  renderAdminPanel();
}

function resetAdminData(type) {
  if (!requireEditMode("Reset data admin")) {
    return;
  }
  pushAdminHistory(`Reset ${type}`);
  if (type === "flowImage") {
    delete state.adminData.flowImages[state.activeUnitId];
  }
  if (type === "streams") {
    state.adminData.streams = {};
    state.admin.previewStream = null;
  }
  if (type === "equipment") {
    const id = state.admin.selectedEquipmentId || state.selectedEquipmentId;
    delete state.adminData.equipmentOverrides[id];
  }
  saveAdminState();
  refreshAfterAdminDataChange();
  showToast("Reset berhasil", "success");
}

function renderAdminPanel() {
  if (!isAdmin() || !els.adminPanelBody) {
    return;
  }
  renderAdminTabs();
  if (state.admin.activeTab === "equipment") {
    renderAdminEquipmentEditor();
  } else if (state.admin.activeTab === "node") {
    renderAdminNodeEditor();
  } else if (state.admin.activeTab === "stream") {
    renderAdminStreamEditor();
  } else {
    renderAdminConfigEditor();
  }
  injectAdminUtilityBar();
  applyAdminEditorModeState();
  bindAdminSaveIndicator();
  updateUndoRedoButtons();
}

function bindAdminSaveIndicator() {
  if (!els.adminPanelBody) {
    return;
  }
  els.adminPanelBody.querySelectorAll("input, textarea, select").forEach((field) => {
    field.addEventListener("input", () => setAdminSaveState("dirty"));
    field.addEventListener("change", () => setAdminSaveState("dirty"));
  });
}

function renderAdminTabs() {
  const buttons = adminTabs.map((tab) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "admin-tab";
    button.classList.toggle("is-active", state.admin.activeTab === tab.id);
    button.textContent = tab.label;
    button.setAttribute("aria-pressed", String(state.admin.activeTab === tab.id));
    button.addEventListener("click", () => {
      if (state.admin.activeTab === "stream" && tab.id !== "stream") {
        stopAdminStreamPathEdit({ render: false });
      }
      state.admin.activeTab = tab.id;
      state.admin.previewStream = null;
      renderStreamOverlay();
      setStreamFilter(state.activeStream);
      renderAdminPanel();
    });
    return button;
  });
  els.adminTabs.replaceChildren(...buttons);
}

function renderAdminEquipmentEditor() {
  const selectedId = state.admin.selectedEquipmentId || state.selectedEquipmentId || getUnitEquipment()[0]?.id || EQUIPMENT[0]?.id;
  const item = EQUIPMENT_BY_ID.get(selectedId) || EQUIPMENT[0];
  state.admin.selectedEquipmentId = item?.id || "";
  state.admin.pendingEquipmentImage = "";
  els.adminPanelBody.innerHTML = `
    <form class="admin-form" id="adminEquipmentForm">
      <label class="admin-field">
        <span>Pilih equipment</span>
        <select id="adminEquipmentSelect">${EQUIPMENT.map((entry) => `<option value="${escapeHtml(entry.id)}"${entry.id === item.id ? " selected" : ""}>${escapeHtml(entry.tag)} - ${escapeHtml(entry.name)} [${escapeHtml(entry.unit)}]</option>`).join("")}</select>
      </label>
      ${adminTextInput("adminEquipmentName", "Nama equipment", item.name)}
      ${adminTextInput("adminEquipmentTag", "Tag", item.tag)}
      ${adminTextInput("adminEquipmentStatus", "Status", item.operation?.status)}
      ${adminTextarea("adminEquipmentDescription", "Deskripsi equipment", item.description, 4)}
      <label class="admin-field">
        <span>Upload / ganti gambar equipment</span>
        <input id="adminEquipmentImageInput" type="file" accept="image/*">
      </label>
      <div class="admin-upload-preview"><img id="adminEquipmentPreview" src="${escapeHtml(getEquipmentImageSrc(item))}" alt="Preview equipment"></div>
      <details class="admin-advanced-block">
        <summary>Advanced</summary>
        <div class="admin-advanced-grid">
          ${adminSelect("adminEquipmentUnit", "Unit", Object.keys(UNITS), item.unit)}
          ${adminTextInput("adminEquipmentSection", "Section", item.section)}
          ${adminTextInput("adminEquipmentArea", "Area", item.area)}
          ${adminTextInput("adminEquipmentType", "Type", item.type)}
          ${adminTextarea("adminEquipmentFunctionText", "Fungsi utama (satu baris = satu item)", listToText(item.details?.function), 4)}
          ${adminTextarea("adminEquipmentOperationText", "Prinsip operasi (satu baris = satu item)", listToText(item.details?.operation), 4)}
          ${adminTextarea("adminEquipmentWatchText", "Parameter dipantau (satu baris = satu item)", listToText(item.details?.watch), 4)}
          <div class="admin-grid-two">
            ${adminTextInput("adminEquipmentTemperature", "Temperature", item.operation?.temperature)}
            ${adminTextInput("adminEquipmentPressure", "Pressure", item.operation?.pressure)}
            ${adminTextInput("adminEquipmentFlow", "Flow", item.operation?.flow)}
          </div>
        </div>
      </details>
      <div class="admin-form-actions">
        <button class="tool-button ghost-button" id="adminEquipmentPreviewApply" type="button">Preview Equipment</button>
        <button class="tool-button" type="submit">Simpan Equipment</button>
      </div>
    </form>
  `;
  document.getElementById("adminEquipmentSelect").addEventListener("change", (event) => {
    state.admin.selectedEquipmentId = event.target.value;
    renderAdminEquipmentEditor();
  });
  document.getElementById("adminEquipmentImageInput").addEventListener("change", (event) => {
    if (!requireEditMode("Upload gambar equipment")) {
      event.target.value = "";
      return;
    }
    readAdminImageFile(event.target.files[0], (dataUrl) => {
      state.admin.pendingEquipmentImage = dataUrl;
      document.getElementById("adminEquipmentPreview").src = dataUrl;
      showToast("Upload gambar equipment berhasil", "success");
    });
  });
  document.getElementById("adminEquipmentPreviewApply").addEventListener("click", () => {
    if (!requireEditMode("Preview equipment")) {
      return;
    }
    const payload = readAdminEquipmentFields("adminEquipment", item);
    if (state.admin.pendingEquipmentImage) {
      payload.photo = { image: state.admin.pendingEquipmentImage, source: "Admin preview" };
    }
    applyAdminPreview("equipment", payload);
    showToast("Preview equipment aktif", "info", payload.name);
  });
  document.getElementById("adminEquipmentForm").addEventListener("submit", saveAdminEquipmentEditor);
}

function saveAdminEquipmentEditor(event) {
  event.preventDefault();
  if (!requireEditMode("Simpan equipment")) {
    return;
  }
  const id = state.admin.selectedEquipmentId;
  const item = EQUIPMENT_BY_ID.get(id);
  if (!item) {
    showToast("Equipment tidak valid", "error");
    return;
  }
  const payload = readAdminEquipmentFields("adminEquipment", item);
  if (state.admin.pendingEquipmentImage) {
    payload.photo = { image: state.admin.pendingEquipmentImage, source: "Admin upload" };
  }
  pushAdminHistory("Simpan equipment");
  state.adminData.equipmentOverrides[id] = payload;
  saveAdminState();
  state.admin.pendingPreview = null;
  refreshAfterAdminDataChange({ equipmentId: id, unitId: payload.unit });
  showToast("Data equipment tersimpan", "success", payload.name);
}

function renderAdminConfigEditor() {
  const unitOptions = Object.keys(UNITS).map((unitId) => `<option value="${unitId}"${unitId === state.activeUnitId ? " selected" : ""}>${unitId} - ${escapeHtml(UNITS[unitId].title)}</option>`).join("");
  const currentImage = UNITS[state.activeUnitId]?.image || "";
  els.adminPanelBody.innerHTML = `
    <form class="admin-form" id="adminConfigForm">
      <label class="admin-field">
        <span>Unit diagram</span>
        <select id="adminFlowUnit">${unitOptions}</select>
      </label>
      <label class="admin-field">
        <span>Upload / ganti flow diagram utama</span>
        <input id="adminFlowImageInput" type="file" accept="image/*">
      </label>
      <div class="admin-upload-preview wide"><img id="adminFlowPreview" src="${escapeHtml(currentImage)}" alt="Preview flow diagram"></div>
      <div class="admin-form-actions">
        <button class="tool-button" id="adminFlowSave" type="button">Simpan Flow Diagram</button>
        <button class="tool-button ghost-button" id="adminFlowReset" type="button">Reset gambar flow</button>
        <button class="tool-button ghost-button" id="adminConfigExport" type="button">Export Config</button>
        <label class="admin-import-label">
          <input id="adminConfigImport" type="file" accept="application/json,.json">
          <span>Import Config</span>
        </label>
        <button class="tool-button ghost-button" id="adminConfigReset" type="button">Reset Config</button>
      </div>
    </form>
  `;
  let pendingFlowImage = "";
  document.getElementById("adminFlowUnit").addEventListener("change", (event) => {
    setActiveUnit(event.target.value, { selectFirst: true });
    renderAdminConfigEditor();
  });
  document.getElementById("adminFlowImageInput").addEventListener("change", (event) => {
    if (!requireEditMode("Upload gambar flow")) {
      event.target.value = "";
      return;
    }
    readAdminImageFile(event.target.files[0], (dataUrl) => {
      pendingFlowImage = dataUrl;
      document.getElementById("adminFlowPreview").src = dataUrl;
      applyAdminPreview("flowImage", { unitId: state.activeUnitId, image: dataUrl });
      showToast("Upload gambar flow berhasil", "success");
    });
  });
  document.getElementById("adminFlowSave").addEventListener("click", () => {
    if (!pendingFlowImage) {
      showToast("Pilih gambar flow terlebih dahulu", "warning");
      return;
    }
    if (!requireEditMode("Simpan flow diagram")) {
      return;
    }
    pushAdminHistory("Simpan flow diagram");
    state.adminData.flowImages[state.activeUnitId] = pendingFlowImage;
    saveAdminState();
    state.admin.pendingPreview = null;
    refreshAfterAdminDataChange({ unitId: state.activeUnitId });
    showToast("Flow diagram tersimpan", "success", state.activeUnitId);
  });
  document.getElementById("adminFlowReset").addEventListener("click", () => resetAdminData("flowImage"));
  document.getElementById("adminConfigExport").addEventListener("click", exportAdminConfig);
  document.getElementById("adminConfigImport").addEventListener("change", (event) => importAdminConfig(event.target.files[0]));
  document.getElementById("adminConfigReset").addEventListener("click", () => {
    if (!requireEditMode("Reset config")) {
      return;
    }
    pushAdminHistory("Reset config admin");
    state.adminData = {
      equipmentOverrides: {},
      flowImages: {},
      nodes: [],
      streams: {},
      hiddenNodes: [],
      processTour: {},
    };
    saveAdminState();
    refreshAfterAdminDataChange();
    showToast("Config admin direset", "success");
  });
}

function renderAdminNodeEditor() {
  const nodes = state.adminData.nodes || [];
  const unitEquipment = getUnitEquipment();
  const selectedId = state.admin.selectedNodeId || state.selectedEquipmentId || unitEquipment[0]?.id || "";
  const baseItem = EQUIPMENT_BY_ID.get(selectedId) || null;
  const nodeOverride = nodes.find((node) => node.id === selectedId) || null;
  const item = nodeOverride || baseItem;
  const deletable = Boolean(nodeOverride?.adminCreated);
  const imagePos = getEquipmentPositionByMode(item || {}, "image");
  const schematicPos = getEquipmentPositionByMode(item || {}, "schematic");
  const schematicSize = normalizeSchematicSize(item?.schematicSize);
  state.admin.selectedNodeId = selectedId;
  state.admin.pendingNodeImage = "";
  els.adminPanelBody.innerHTML = `
    <form class="admin-form" id="adminNodeForm">
      <label class="admin-field">
        <span>Edit node admin</span>
        <select id="adminNodeSelect">
          <option value="">Node baru</option>
          ${unitEquipment.map((node) => `<option value="${escapeHtml(node.id)}"${node.id === selectedId ? " selected" : ""}>${escapeHtml(node.tag)} - ${escapeHtml(node.name)}</option>`).join("")}
        </select>
      </label>
      ${adminSelect("adminNodeUnit", "Unit", Object.keys(UNITS), item?.unit || state.activeUnitId)}
      ${adminTextInput("adminNodeSection", "Section", item?.section || "Admin Section")}
      ${adminTextInput("adminNodeTag", "Tag", item?.tag || "")}
      ${adminTextInput("adminNodeName", "Nama", item?.name || "")}
      ${adminTextInput("adminNodeType", "Type", item?.type || "Equipment")}
      ${adminSelect("adminNodeIcon", "Icon", Object.keys(icons), item?.icon || guessIcon(item?.type || "Equipment"))}
      ${adminTextInput("adminNodeArea", "Area", item?.area || "Admin")}
      <div class="admin-grid-two">
        ${adminNumberInput("adminNodeImageX", "Image X (%)", imagePos.x)}
        ${adminNumberInput("adminNodeImageY", "Image Y (%)", imagePos.y)}
        ${adminNumberInput("adminNodeSchematicX", "Schematic X (%)", schematicPos.x)}
        ${adminNumberInput("adminNodeSchematicY", "Schematic Y (%)", schematicPos.y)}
        ${adminNumberInput("adminNodeSchematicW", "Schematic lebar", schematicSize.w)}
        ${adminNumberInput("adminNodeSchematicH", "Schematic tinggi", schematicSize.h)}
        ${adminNumberInput("adminNodeSchematicIconSize", "Ukuran icon", item?.schematicIconSize || 1)}
      </div>
      ${adminTextInput("adminNodeSchematicLabel", "Label schematic", item?.schematicLabel || "")}
      ${adminTextInput("adminNodeSchematicNote", "Keterangan schematic", item?.schematicNote || "")}
      ${adminSelect("adminNodeStreamType", "Jenis stream/equipment", ["liquid", "water", "gas", "air"], item?.streams?.[0] || "liquid")}
      ${adminTextarea("adminNodeDescription", "Deskripsi", item?.description || "", 3)}
      ${adminTextarea("adminNodeFunctionText", "Fungsi utama", listToText(item?.details?.function), 3)}
      ${adminTextarea("adminNodeOperationText", "Prinsip operasi", listToText(item?.details?.operation), 3)}
      ${adminTextarea("adminNodeWatchText", "Parameter dipantau", listToText(item?.details?.watch), 3)}
      <div class="admin-grid-two">
        ${adminTextInput("adminNodeTemperature", "Temperature", item?.operation?.temperature || "-")}
        ${adminTextInput("adminNodePressure", "Pressure", item?.operation?.pressure || "-")}
        ${adminTextInput("adminNodeFlow", "Flow", item?.operation?.flow || "-")}
        ${adminTextInput("adminNodeStatus", "Status", item?.operation?.status || "Normal")}
      </div>
      <label class="admin-field">
        <span>Upload gambar optional</span>
        <input id="adminNodeImageInput" type="file" accept="image/*">
      </label>
      <div class="admin-form-actions">
        <button class="tool-button ghost-button" id="adminPickNodePosition" type="button">Pilih posisi di diagram</button>
        <button class="tool-button ghost-button" id="adminSchematicAutoLayout" type="button">Auto Layout</button>
        <button class="tool-button ghost-button" id="adminSchematicResetLayout" type="button">Reset Layout</button>
        <button class="tool-button ghost-button" id="adminNodePreview" type="button">Preview Node</button>
        <button class="tool-button" type="submit">${item ? "Simpan Node" : "Tambah Node"}</button>
        <button class="tool-button ghost-button" id="adminNodeDelete" type="button"${deletable ? "" : " disabled"}>Hapus Node</button>
      </div>
    </form>
  `;
  document.getElementById("adminNodeSelect").addEventListener("change", (event) => {
    state.admin.selectedNodeId = event.target.value;
    renderAdminNodeEditor();
  });
  document.getElementById("adminNodeImageInput").addEventListener("change", (event) => {
    if (!requireEditMode("Upload gambar node")) {
      event.target.value = "";
      return;
    }
    readAdminImageFile(event.target.files[0], (dataUrl) => {
      state.admin.pendingNodeImage = dataUrl;
      showToast("Upload gambar node berhasil", "success");
    });
  });
  document.getElementById("adminPickNodePosition").addEventListener("click", () => {
    if (!requireEditMode("Pilih posisi node")) {
      return;
    }
    const targetMode = state.diagramViewMode === "schematic" ? "Schematic" : "Image";
    state.admin.pickingNodePosition = true;
    els.selectedStatus.textContent = `Klik posisi node pada ${targetMode} Mode`;
    showToast("Pilih posisi node", "info", `Klik satu titik pada ${targetMode} Mode.`);
  });
  document.getElementById("adminNodePreview").addEventListener("click", () => {
    if (!requireEditMode("Preview node")) {
      return;
    }
    const imagePoint = snapPoint({ x: Number(adminValue("adminNodeImageX")), y: Number(adminValue("adminNodeImageY")) });
    const schematicPoint = snapPoint({ x: Number(adminValue("adminNodeSchematicX")), y: Number(adminValue("adminNodeSchematicY")) });
    const preview = normalizeEquipmentPayload({
      id: "ADMIN-PREVIEW-NODE",
      unit: adminValue("adminNodeUnit"),
      tag: adminValue("adminNodeTag") || "PREVIEW",
      name: adminValue("adminNodeName") || "Preview Node",
      type: adminValue("adminNodeType") || "Equipment",
      section: adminValue("adminNodeSection") || "Admin Section",
      area: adminValue("adminNodeArea") || "Admin",
      x: imagePoint.x,
      y: imagePoint.y,
      imagePosition: imagePoint,
      schematicPosition: schematicPoint,
      w: 5,
      h: 6,
      icon: adminValue("adminNodeIcon") || guessIcon(adminValue("adminNodeType")),
      schematicSize: normalizeSchematicSize({ w: Number(adminValue("adminNodeSchematicW")), h: Number(adminValue("adminNodeSchematicH")) }),
      schematicIconSize: Number(adminValue("adminNodeSchematicIconSize")) || 1,
      schematicLabel: adminValue("adminNodeSchematicLabel"),
      schematicNote: adminValue("adminNodeSchematicNote"),
      streams: [adminValue("adminNodeStreamType") || "liquid"],
      operation: op(adminValue("adminNodeTemperature") || "-", adminValue("adminNodePressure") || "-", adminValue("adminNodeFlow") || "-", adminValue("adminNodeStatus") || "Normal"),
      description: adminValue("adminNodeDescription") || "Preview node admin.",
    });
    applyAdminPreview("equipment", preview);
    if (!EQUIPMENT_BY_ID.has(preview.id)) {
      EQUIPMENT.push(preview);
      ensureEquipmentInUnitSection(preview);
      rebuildDataIndexes();
      renderHotspots();
    }
    showToast("Preview node aktif", "info", preview.tag);
  });
  document.getElementById("adminSchematicAutoLayout").addEventListener("click", autoLayoutSchematicUnit);
  document.getElementById("adminSchematicResetLayout").addEventListener("click", resetSchematicLayoutUnit);
  document.getElementById("adminNodeDelete").addEventListener("click", deleteAdminNode);
  document.getElementById("adminNodeForm").addEventListener("submit", saveAdminNodeEditor);
}

function saveAdminNodeEditor(event) {
  event.preventDefault();
  if (!requireEditMode("Simpan node")) {
    return;
  }
  const editingId = state.admin.selectedNodeId;
  const tag = adminValue("adminNodeTag");
  if (!tag) {
    showToast("Tag node wajib diisi", "warning");
    return;
  }
  if (!validateUniqueTag(tag, editingId)) {
    showToast("Tag node harus unik", "error");
    return;
  }
  const imagePoint = snapPoint({ x: Number(adminValue("adminNodeImageX")), y: Number(adminValue("adminNodeImageY")) });
  const schematicPoint = snapPoint({ x: Number(adminValue("adminNodeSchematicX")), y: Number(adminValue("adminNodeSchematicY")) });
  if (!isPercent(imagePoint.x) || !isPercent(imagePoint.y) || !isPercent(schematicPoint.x) || !isPercent(schematicPoint.y)) {
    showToast("Koordinat image/schematic harus 0 sampai 100", "error");
    return;
  }
  const id = editingId || createUniqueEquipmentId(adminValue("adminNodeUnit"), tag);
  const existingItem = EQUIPMENT_BY_ID.get(id);
  const payload = normalizeEquipmentPayload({
    id,
    adminCreated: true,
    unit: adminValue("adminNodeUnit"),
    tag,
    name: adminValue("adminNodeName") || tag,
    type: adminValue("adminNodeType") || "Equipment",
    section: adminValue("adminNodeSection") || "Admin Section",
    area: adminValue("adminNodeArea") || "Admin",
    x: imagePoint.x,
    y: imagePoint.y,
    imagePosition: imagePoint,
    schematicPosition: schematicPoint,
    w: 5,
    h: 6,
    icon: adminValue("adminNodeIcon") || guessIcon(adminValue("adminNodeType")),
    schematicSize: normalizeSchematicSize({ w: Number(adminValue("adminNodeSchematicW")), h: Number(adminValue("adminNodeSchematicH")) }),
    schematicIconSize: Number(adminValue("adminNodeSchematicIconSize")) || 1,
    schematicLabel: adminValue("adminNodeSchematicLabel"),
    schematicNote: adminValue("adminNodeSchematicNote"),
    streams: [adminValue("adminNodeStreamType") || "liquid"],
    description: adminValue("adminNodeDescription") || "Belum ada deskripsi equipment.",
    details: detail(splitAdminLines(adminValue("adminNodeFunctionText")), splitAdminLines(adminValue("adminNodeOperationText")), splitAdminLines(adminValue("adminNodeWatchText"))),
    operation: op(adminValue("adminNodeTemperature") || "-", adminValue("adminNodePressure") || "-", adminValue("adminNodeFlow") || "-", adminValue("adminNodeStatus") || "Normal"),
    photo: state.admin.pendingNodeImage ? { image: state.admin.pendingNodeImage, source: "Admin upload" } : (existingItem?.photo || refs.vessel),
    path: [adminValue("adminNodeUnit"), adminValue("adminNodeSection"), adminValue("adminNodeName") || tag],
  });
  const index = state.adminData.nodes.findIndex((node) => node.id === id);
  if (index >= 0) {
    pushAdminHistory("Edit node");
    state.adminData.nodes[index] = payload;
  } else {
    pushAdminHistory("Tambah node");
    state.adminData.nodes.push(payload);
  }
  state.admin.selectedNodeId = id;
  saveAdminState();
  state.admin.pendingPreview = null;
  refreshAfterAdminDataChange({ equipmentId: id, unitId: payload.unit });
  showToast(index >= 0 ? "Node tersimpan" : "Node berhasil ditambahkan", "success", payload.tag);
}

function deleteAdminNode() {
  if (!requireEditMode("Hapus node")) {
    return;
  }
  const id = state.admin.selectedNodeId;
  if (!id) {
    return;
  }
  pushAdminHistory("Hapus node");
  state.adminData.nodes = state.adminData.nodes.filter((node) => node.id !== id);
  state.admin.selectedNodeId = "";
  saveAdminState();
  refreshAfterAdminDataChange({ unitId: state.activeUnitId });
  showToast("Node admin dihapus", "success");
}

function autoLayoutSchematicUnit() {
  if (!requireEditMode("Auto Layout Schematic")) {
    return;
  }
  pushAdminHistory("Auto Layout Schematic");
  const unit = getActiveUnit();
  const sections = (unit.sections || []).filter((section) => section.equipmentIds?.length);
  sections.forEach((section, rowIndex) => {
    const items = section.equipmentIds.map((id) => EQUIPMENT_BY_ID.get(id)).filter(Boolean);
    const y = sections.length === 1 ? 50 : round1(10 + (rowIndex * 80) / Math.max(1, sections.length - 1));
    items.forEach((item, itemIndex) => {
      const x = items.length === 1 ? 50 : round1(8 + (itemIndex * 84) / Math.max(1, items.length - 1));
      item.schematicPosition = { x: clamp(x, 6, 94), y: clamp(y, 8, 92) };
      item.schematicSize = normalizeSchematicSize(item.schematicSize || {});
      upsertAdminNodeOverride(item);
    });
  });
  saveAdminState();
  mergeAdminDataWithDefault();
  renderDiagramByMode();
  renderAdminNodeEditor();
  showToast("Auto Layout Schematic diterapkan", "success", unit.id);
}

function resetSchematicLayoutUnit() {
  if (!requireEditMode("Reset Layout Schematic")) {
    return;
  }
  pushAdminHistory("Reset Layout Schematic");
  getUnitEquipment().forEach((item, index) => {
    const row = Math.floor(index / 6);
    const column = index % 6;
    item.schematicPosition = {
      x: round1(clamp(8 + column * 15.5, 6, 96)),
      y: round1(clamp(12 + row * 18, 8, 94)),
    };
    item.schematicSize = normalizeSchematicSize();
    item.schematicIconSize = 1;
    item.schematicLabel = "";
    item.schematicNote = "";
    upsertAdminNodeOverride(item);
  });
  saveAdminState();
  mergeAdminDataWithDefault();
  renderDiagramByMode();
  renderAdminNodeEditor();
  showToast("Layout Schematic direset", "success", state.activeUnitId);
}

function upsertAdminNodeOverride(item) {
  const payload = normalizeEquipmentPayload({
    ...item,
    adminCreated: Boolean(item.adminCreated),
  });
  const index = state.adminData.nodes.findIndex((node) => node.id === item.id);
  if (index >= 0) {
    state.adminData.nodes[index] = payload;
  } else {
    state.adminData.nodes.push(payload);
  }
}

function renderAdminStreamEditor() {
  const streams = getUnitStreams(state.activeUnitId);
  const selectedId = state.admin.selectedStreamId || streams[0]?.id || "";
  const stream = STREAM_BY_ID.get(selectedId);
  state.admin.selectedStreamId = stream?.id || "";
  els.adminPanelBody.innerHTML = `
    <form class="admin-form" id="adminStreamForm">
      <label class="admin-field">
        <span>Pilih stream</span>
        <select id="adminStreamSelect">
          <option value="">Stream baru</option>
          ${streams.map((entry) => `<option value="${escapeHtml(entry.id)}"${entry.id === stream?.id ? " selected" : ""}>${escapeHtml(entry.id)} - ${escapeHtml(entry.label)}</option>`).join("")}
        </select>
      </label>
      ${adminTextInput("adminStreamId", "Stream ID", stream?.id || "")}
      ${adminTextInput("adminStreamLabel", "Label", stream?.label || "")}
      ${adminSelect("adminStreamFrom", "From node tag", getEquipmentTagOptions(), getNearestStreamTag(stream, "from"))}
      ${adminSelect("adminStreamTo", "To node tag", getEquipmentTagOptions(), getNearestStreamTag(stream, "to"))}
      ${adminSelect("adminStreamType", "Jenis stream", ["liquid", "water", "gas", "air"], stream?.type || "liquid")}
      ${adminSelect("adminStreamShape", "Bentuk path", ["straight", "elbow", "curve"], stream?.shape || "elbow")}
      <div class="admin-path-editor">
        <div>
          <strong>Editor jalur stream</strong>
          <span>Mode aktif: ${state.diagramViewMode === "schematic" ? "Schematic" : "Image"}. Jalur manual disimpan terpisah per mode.</span>
        </div>
        <div class="admin-form-actions compact">
          <button class="tool-button ghost-button" id="adminStreamEditPath" type="button"${stream ? "" : " disabled"}>Atur Jalur</button>
          <button class="tool-button ghost-button" id="adminStreamSavePath" type="button"${stream ? "" : " disabled"}>Simpan Jalur</button>
          <button class="tool-button ghost-button" id="adminStreamCancelPath" type="button">Selesai</button>
        </div>
      </div>
      <div class="admin-form-actions">
        <button class="tool-button ghost-button" id="adminStreamPreview" type="button">Preview Stream</button>
        <button class="tool-button" type="submit">Simpan Stream</button>
        <button class="tool-button ghost-button" id="adminStreamDelete" type="button"${stream ? "" : " disabled"}>Hapus Stream</button>
      </div>
    </form>
  `;
  document.getElementById("adminStreamSelect").addEventListener("change", (event) => {
    stopAdminStreamPathEdit({ render: false });
    state.admin.selectedStreamId = event.target.value;
    state.admin.previewStream = null;
    renderAdminStreamEditor();
  });
  document.getElementById("adminStreamPreview").addEventListener("click", previewAdminStream);
  document.getElementById("adminStreamDelete").addEventListener("click", deleteAdminStream);
  document.getElementById("adminStreamEditPath").addEventListener("click", startAdminStreamPathEdit);
  document.getElementById("adminStreamSavePath").addEventListener("click", saveAdminStreamPathEdit);
  document.getElementById("adminStreamCancelPath").addEventListener("click", stopAdminStreamPathEdit);
  document.getElementById("adminStreamForm").addEventListener("submit", saveAdminStreamEditor);
}

function previewAdminStream() {
  if (!requireEditMode("Preview stream")) {
    return;
  }
  const stream = readAdminStreamFields({ preview: true });
  if (!stream) {
    return;
  }
  state.admin.previewStream = { ...stream, id: `preview-${stream.id}`, preview: true };
  renderStreamOverlay();
  setStreamFilter(state.activeStream);
  showToast("Preview stream aktif", "info", stream.label);
}

function saveAdminStreamEditor(event) {
  event.preventDefault();
  if (!requireEditMode("Simpan stream")) {
    return;
  }
  const stream = readAdminStreamFields();
  if (!stream) {
    return;
  }
  pushAdminHistory("Simpan stream");
  state.adminData.streams[stream.id] = stream;
  state.admin.selectedStreamId = stream.id;
  state.admin.previewStream = null;
  saveAdminState();
  refreshAfterAdminDataChange({ unitId: stream.unit });
  showToast("Stream berhasil disimpan", "success", stream.label);
}

function deleteAdminStream() {
  if (!requireEditMode("Hapus stream")) {
    return;
  }
  const id = state.admin.selectedStreamId;
  if (!id) {
    return;
  }
  pushAdminHistory("Hapus stream");
  state.adminData.streams[id] = { id, unit: state.activeUnitId, deleted: true };
  state.admin.selectedStreamId = "";
  state.admin.previewStream = null;
  saveAdminState();
  refreshAfterAdminDataChange({ unitId: state.activeUnitId });
  showToast("Stream dihapus", "success", id);
}

function getActiveStreamEditMode() {
  return state.diagramViewMode === "schematic" ? "schematic" : "image";
}

function isStreamPathEditing(stream, mode = getActiveStreamEditMode()) {
  return Boolean(
    isAdmin() &&
      isEditMode() &&
      state.admin.streamPathEdit?.active &&
      state.admin.streamPathEdit.streamId === stream?.id &&
      state.admin.streamPathEdit.mode === mode
  );
}

function startAdminStreamPathEdit() {
  if (!requireEditMode("Atur jalur stream")) {
    return;
  }
  const id = adminValue("adminStreamId") || state.admin.selectedStreamId;
  const stream = STREAM_BY_ID.get(id);
  if (!stream) {
    showToast("Pilih dan simpan stream lebih dulu", "warning");
    return;
  }
  const mode = getActiveStreamEditMode();
  const points = getStreamControlPoints(stream, mode);
  if (points.length < 2) {
    showToast("Stream belum punya titik awal/akhir valid", "error");
    return;
  }
  state.admin.streamPathEdit = { active: true, streamId: stream.id, mode };
  els.diagramStage.classList.add("is-stream-path-editing");
  renderDiagramByMode();
  els.selectedStatus.textContent = `${stream.label}: drag titik untuk mengatur jalur ${mode}`;
  showToast("Atur Jalur aktif", "info", "Drag titik stream, Alt+klik titik tengah untuk hapus.");
}

function stopAdminStreamPathEdit(options = {}) {
  state.admin.streamPathEdit = { active: false, streamId: "", mode: getActiveStreamEditMode() };
  els.diagramStage?.classList.remove("is-stream-path-editing");
  if (options.render !== false) {
    renderDiagramByMode();
  }
}

function saveAdminStreamPathEdit() {
  if (!requireEditMode("Simpan jalur stream")) {
    return;
  }
  const edit = state.admin.streamPathEdit;
  const stream = STREAM_BY_ID.get(edit?.streamId || state.admin.selectedStreamId);
  if (!stream) {
    showToast("Tidak ada stream yang sedang diedit", "warning");
    return;
  }
  const mode = edit?.mode || getActiveStreamEditMode();
  const fields = getModeStreamFields(mode);
  const controlPoints = getStreamControlPoints(stream, mode);
  if (controlPoints.length < 2) {
    showToast("Jalur stream belum valid", "error");
    return;
  }
  pushAdminHistory(`Simpan jalur stream ${mode}`);
  state.adminData.streams[stream.id] = normalizeStreamPayload({
    ...(state.adminData.streams[stream.id] || {}),
    ...stream,
    [fields.controlPoints]: controlPoints,
    [fields.path]: getPathByShape(controlPoints, stream.shape || "elbow"),
    [fields.useCustomPath]: true,
  });
  state.admin.selectedStreamId = stream.id;
  saveAdminState();
  refreshAfterAdminDataChange({ unitId: stream.unit });
  stopAdminStreamPathEdit({ render: true });
  showToast("Jalur stream tersimpan", "success", `${stream.label} (${mode})`);
}

function readAdminStreamFields(options = {}) {
  const id = adminValue("adminStreamId") || (options.preview ? "stream-preview" : "");
  const fromTag = adminValue("adminStreamFrom");
  const toTag = adminValue("adminStreamTo");
  const from = findEquipmentByTag(fromTag);
  const to = findEquipmentByTag(toTag);
  const shape = adminValue("adminStreamShape") || "elbow";
  if (!id) {
    showToast("Stream ID wajib diisi", "warning");
    return null;
  }
  if (!from || !to) {
    showToast("From node dan To node harus ada", "error");
    return null;
  }
  const existing = STREAM_BY_ID.get(id) || state.adminData.streams[id] || {};
  return normalizeStreamPayload({
    ...existing,
    id,
    unit: state.activeUnitId,
    fromTag,
    toTag,
    type: adminValue("adminStreamType") || "liquid",
    label: adminValue("adminStreamLabel") || id,
    shape,
  });
}

function readAdminEquipmentFields(prefix, fallbackItem = {}) {
  return normalizeEquipmentPayload({
    id: fallbackItem.id,
    unit: adminValue(`${prefix}Unit`) || fallbackItem.unit,
    tag: adminValue(`${prefix}Tag`) || fallbackItem.tag,
    name: adminValue(`${prefix}Name`) || fallbackItem.name,
    type: adminValue(`${prefix}Type`) || fallbackItem.type,
    section: adminValue(`${prefix}Section`) || fallbackItem.section,
    area: adminValue(`${prefix}Area`) || fallbackItem.area,
    description: adminValue(`${prefix}Description`) || fallbackItem.description,
    icon: fallbackItem.icon || guessIcon(adminValue(`${prefix}Type`)),
    streams: fallbackItem.streams || ["liquid"],
    x: fallbackItem.x,
    y: fallbackItem.y,
    w: fallbackItem.w,
    h: fallbackItem.h,
    size: fallbackItem.size,
    photo: fallbackItem.photo,
    details: detail(splitAdminLines(adminValue(`${prefix}FunctionText`)), splitAdminLines(adminValue(`${prefix}OperationText`)), splitAdminLines(adminValue(`${prefix}WatchText`))),
    operation: op(adminValue(`${prefix}Temperature`) || "-", adminValue(`${prefix}Pressure`) || "-", adminValue(`${prefix}Flow`) || "-", adminValue(`${prefix}Status`) || "Unknown"),
    path: [adminValue(`${prefix}Unit`) || fallbackItem.unit, adminValue(`${prefix}Section`) || fallbackItem.section, adminValue(`${prefix}Name`) || fallbackItem.name],
  });
}

function readAdminImageFile(file, callback) {
  if (!file) {
    return;
  }
  if (!file.type.startsWith("image/")) {
    showToast("File harus berupa gambar", "error");
    return;
  }
  const reader = new FileReader();
  reader.onload = () => callback(reader.result);
  reader.onerror = () => showToast("Upload gambar gagal", "error");
  reader.readAsDataURL(file);
}

function setAdminNodePosition(point) {
  const nextPoint = snapPoint(point);
  const isSchematic = state.diagramViewMode === "schematic";
  const xInput = document.getElementById(isSchematic ? "adminNodeSchematicX" : "adminNodeImageX");
  const yInput = document.getElementById(isSchematic ? "adminNodeSchematicY" : "adminNodeImageY");
  if (xInput && yInput) {
    xInput.value = nextPoint.x;
    yInput.value = nextPoint.y;
  }
  state.admin.pickingNodePosition = false;
}

function adminValue(id) {
  return safeText(document.getElementById(id)?.value, "");
}

function splitAdminLines(value) {
  return String(value || "")
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean);
}

function listToText(items) {
  return Array.isArray(items) ? items.filter(Boolean).join("\n") : "";
}

function adminTextInput(id, label, value = "") {
  return `<label class="admin-field"><span>${escapeHtml(label)}</span><input id="${id}" type="text" value="${escapeHtml(safeText(value, ""))}"></label>`;
}

function adminNumberInput(id, label, value = "") {
  return `<label class="admin-field"><span>${escapeHtml(label)}</span><input id="${id}" type="number" step="0.1" value="${escapeHtml(safeText(value, ""))}"></label>`;
}

function adminTextarea(id, label, value = "", rows = 3) {
  return `<label class="admin-field"><span>${escapeHtml(label)}</span><textarea id="${id}" rows="${rows}">${escapeHtml(safeText(value, ""))}</textarea></label>`;
}

function adminSelect(id, label, options, selected = "") {
  return `<label class="admin-field"><span>${escapeHtml(label)}</span><select id="${id}">${options.map((option) => {
    const value = typeof option === "string" ? option : option.value;
    const text = typeof option === "string" ? option : option.label;
    return `<option value="${escapeHtml(value)}"${value === selected ? " selected" : ""}>${escapeHtml(text)}</option>`;
  }).join("")}</select></label>`;
}

function readStorageJson(key, fallback, options = {}) {
  try {
    const storage = options.session ? sessionStorage : localStorage;
    const raw = storage.getItem(key);
    return raw ? JSON.parse(raw) : cloneData(fallback);
  } catch (error) {
    console.warn(`Storage ${key} tidak dapat dibaca.`, error);
    return cloneData(fallback);
  }
}

function normalizeFlowImages(value) {
  if (typeof value === "string" && value) {
    return { CDU: value };
  }
  return value && typeof value === "object" && !Array.isArray(value) ? value : {};
}

function cloneData(value) {
  return JSON.parse(JSON.stringify(value ?? null));
}

function mergeEquipmentData(target, source) {
  const payload = normalizeEquipmentPayload(source);
  Object.assign(target, payload);
  target.details = {
    function: payload.details?.function || target.details?.function || [],
    operation: payload.details?.operation || target.details?.operation || [],
    watch: payload.details?.watch || target.details?.watch || [],
  };
  target.operation = payload.operation || target.operation || op("-", "-", "-", "Unknown");
  target.photo = payload.photo || target.photo || refs.vessel;
}

function normalizeEquipmentPayload(item = {}) {
  const imagePosition = {
    x: clamp(round1(Number(item.imagePosition?.x ?? item.x ?? 50)), 0, 100),
    y: clamp(round1(Number(item.imagePosition?.y ?? item.y ?? 50)), 0, 100),
  };
  const schematicPosition = {
    x: clamp(round1(Number(item.schematicPosition?.x ?? imagePosition.x ?? 50)), 0, 100),
    y: clamp(round1(Number(item.schematicPosition?.y ?? imagePosition.y ?? 50)), 0, 100),
  };
  const schematicSize = normalizeSchematicSize(item.schematicSize);
  return {
    ...item,
    unit: safeText(item.unit, state.activeUnitId || "CDU"),
    tag: safeText(item.tag, "TAG"),
    name: safeText(item.name, safeText(item.tag, "Equipment")),
    type: safeText(item.type, "Equipment"),
    area: safeText(item.area, "Admin"),
    section: safeText(item.section, "Admin Section"),
    icon: item.icon || guessIcon(item.type),
    streams: Array.isArray(item.streams) && item.streams.length ? item.streams : ["liquid"],
    x: imagePosition.x,
    y: imagePosition.y,
    imagePosition,
    schematicPosition,
    schematicSize,
    schematicIconSize: clamp(round1(Number(item.schematicIconSize ?? 1)), 0.6, 2.6),
    schematicLabel: safeText(item.schematicLabel, ""),
    schematicNote: safeText(item.schematicNote, ""),
    description: safeText(item.description, "Belum ada deskripsi equipment."),
    details: {
      function: Array.isArray(item.details?.function) ? item.details.function : [],
      operation: Array.isArray(item.details?.operation) ? item.details.operation : [],
      watch: Array.isArray(item.details?.watch) ? item.details.watch : [],
    },
    operation: item.operation || op("-", "-", "-", "Unknown"),
    photo: item.photo || refs.vessel,
    path: Array.isArray(item.path) ? item.path : [item.unit, item.section, item.name].filter(Boolean),
  };
}

function normalizeSchematicSize(size = {}) {
  return {
    w: clamp(round1(Number(size.w ?? size.width ?? 10.4)), 7, 22),
    h: clamp(round1(Number(size.h ?? size.height ?? 5.6)), 4.4, 13),
  };
}

function normalizeStreamPayload(stream = {}) {
  const shape = ["straight", "elbow", "curve", "custom"].includes(stream.shape) ? stream.shape : "elbow";
  const imageControlPoints = normalizePointArray(stream.imageControlPoints);
  const schematicControlPoints = normalizePointArray(stream.schematicControlPoints);
  const next = {
    ...stream,
    id: safeText(stream.id, ""),
    unit: safeText(stream.unit, state.activeUnitId || "CDU"),
    fromTag: safeText(stream.fromTag || stream.from, ""),
    toTag: safeText(stream.toTag || stream.to, ""),
    type: STREAM_TYPES[stream.type] ? stream.type : "liquid",
    label: safeText(stream.label, safeText(stream.id, "Stream")),
    direction: stream.direction === "reverse" ? "reverse" : "forward",
    shape,
    strokeWidth: Number.isFinite(Number(stream.strokeWidth)) && Number(stream.strokeWidth) > 0 ? Number(stream.strokeWidth) : undefined,
    points: normalizePointArray(stream.points),
    imagePath: safeText(stream.imagePath || (stream.shape === "custom" ? stream.pathD : ""), ""),
    schematicPath: safeText(stream.schematicPath, ""),
    useCustomImagePath: Boolean(stream.useCustomImagePath),
    useCustomSchematicPath: Boolean(stream.useCustomSchematicPath),
    imageControlPoints,
    schematicControlPoints,
  };

  if (!next.imagePath && imageControlPoints.length >= 2) {
    next.imagePath = getPathByShape(imageControlPoints, shape);
  }
  if (!next.schematicPath && schematicControlPoints.length >= 2) {
    next.schematicPath = getPathByShape(schematicControlPoints, shape);
  }
  return next;
}

function normalizePointArray(points) {
  if (!Array.isArray(points)) {
    return [];
  }
  return points
    .filter((point) => Number.isFinite(Number(point?.x)) && Number.isFinite(Number(point?.y)))
    .map((point) => ({
      x: clamp(round1(Number(point.x)), 0, 100),
      y: clamp(round1(Number(point.y)), 0, 100),
    }));
}

function validateUniqueTag(tag, editingId = "") {
  const normalized = tag.trim().toLowerCase();
  return !EQUIPMENT.some((item) => item.id !== editingId && item.id !== "ADMIN-PREVIEW-NODE" && item.tag.toLowerCase() === normalized);
}

function createUniqueEquipmentId(unitId, tag) {
  const base = `ADMIN-${unitId}-${slugify(tag)}`.toUpperCase();
  let id = base;
  let counter = 2;
  while (EQUIPMENT_BY_ID.has(id) || state.adminData.nodes.some((node) => node.id === id)) {
    id = `${base}-${counter}`;
    counter += 1;
  }
  return id;
}

function slugify(value) {
  return safeText(value, "item")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "") || "item";
}

function isPercent(value) {
  return Number.isFinite(value) && value >= 0 && value <= 100;
}

function guessIcon(type = "") {
  const text = type.toLowerCase();
  if (text.includes("pump")) return "pump";
  if (text.includes("heater") || text.includes("furnace")) return "heater";
  if (text.includes("compressor") || text.includes("ejector")) return "compressor";
  if (text.includes("exchanger") || text.includes("preheat") || text.includes("cooler")) return "exchanger";
  if (text.includes("column") || text.includes("stripper") || text.includes("reactor")) return "column";
  if (text.includes("outlet")) return "outlet";
  if (text.includes("treatment") || text.includes("water")) return "treatment";
  return "vessel";
}

function getEquipmentTagOptions() {
  return getUnitEquipment().filter(hasHotspotCoordinate).map((item) => ({ value: item.tag, label: `${item.tag} - ${item.name}` }));
}

function findEquipmentByTag(tag) {
  const normalized = safeText(tag, "").toLowerCase();
  return EQUIPMENT.find((item) => item.tag.toLowerCase() === normalized || item.id.toLowerCase() === normalized);
}

function ensureEquipmentModePositions(item) {
  if (!item || typeof item !== "object") {
    return;
  }
  if (!item.imagePosition) {
    item.imagePosition = {
      x: round1(Number(item.x ?? 50)),
      y: round1(Number(item.y ?? 50)),
    };
  }
  if (!item.schematicPosition) {
    item.schematicPosition = {
      x: round1(Number(item.imagePosition?.x ?? item.x ?? 50)),
      y: round1(Number(item.imagePosition?.y ?? item.y ?? 50)),
    };
  }
  if (!Number.isFinite(Number(item.x))) {
    item.x = round1(Number(item.imagePosition?.x ?? 50));
  }
  if (!Number.isFinite(Number(item.y))) {
    item.y = round1(Number(item.imagePosition?.y ?? 50));
  }
}

function getEquipmentPositionByMode(item, mode = "image") {
  if (!item) {
    return { x: 50, y: 50 };
  }
  ensureEquipmentModePositions(item);
  if (mode === "schematic") {
    return {
      x: clamp(round1(Number(item.schematicPosition?.x ?? item.imagePosition?.x ?? 50)), 0, 100),
      y: clamp(round1(Number(item.schematicPosition?.y ?? item.imagePosition?.y ?? 50)), 0, 100),
    };
  }
  return {
    x: clamp(round1(Number(item.imagePosition?.x ?? item.x ?? 50)), 0, 100),
    y: clamp(round1(Number(item.imagePosition?.y ?? item.y ?? 50)), 0, 100),
  };
}

function pointFromEquipment(item, mode = "image") {
  const position = getEquipmentPositionByMode(item, mode);
  return { x: position.x, y: position.y };
}

function getNearestStreamTag(stream, side) {
  if (!stream) {
    return getUnitEquipment()[0]?.tag || "";
  }
  if (side === "from" && stream.fromTag) return stream.fromTag;
  if (side === "to" && stream.toTag) return stream.toTag;
  const basePoints = normalizePointArray(stream.imageControlPoints).length >= 2 ? normalizePointArray(stream.imageControlPoints) : normalizePointArray(stream.points);
  const point = side === "from" ? basePoints?.[0] : basePoints?.[basePoints.length - 1];
  if (!point) {
    return getUnitEquipment()[0]?.tag || "";
  }
  return getUnitEquipment().reduce((nearest, item) => {
    const imagePosition = getEquipmentPositionByMode(item, "image");
    const distance = Math.hypot((imagePosition.x || 0) - point.x, (imagePosition.y || 0) - point.y);
    return distance < nearest.distance ? { tag: item.tag, distance } : nearest;
  }, { tag: getUnitEquipment()[0]?.tag || "", distance: Number.POSITIVE_INFINITY }).tag;
}

function buildStreamPointsByMode(from, to, shape, mode = "image") {
  const start = pointFromEquipment(from, mode);
  const end = pointFromEquipment(to, mode);
  const midX = round1((start.x + end.x) / 2);
  if (shape === "straight") {
    return [start, end];
  }
  if (shape === "curve") {
    return [start, { x: midX, y: round1(start.y) }, { x: midX, y: round1(end.y) }, end];
  }
  return [start, { x: midX, y: round1(start.y) }, { x: midX, y: round1(end.y) }, end];
}

function buildStreamPoints(from, to, shape) {
  return buildStreamPointsByMode(from, to, shape, "image");
}

function getModeStreamFields(mode = "image") {
  return mode === "schematic"
    ? { path: "schematicPath", controlPoints: "schematicControlPoints", useCustomPath: "useCustomSchematicPath" }
    : { path: "imagePath", controlPoints: "imageControlPoints", useCustomPath: "useCustomImagePath" };
}

function getAutoStreamPoints(stream, mode = "image") {
  if (mode === "image" && Array.isArray(stream.points) && stream.points.length >= 2) {
    return normalizePointArray(stream.points);
  }
  const from = stream.fromTag ? findEquipmentByTag(stream.fromTag) : null;
  const to = stream.toTag ? findEquipmentByTag(stream.toTag) : null;
  if (from && to) {
    return buildStreamPointsByMode(from, to, stream.shape || "elbow", mode);
  }
  const inferredFromTag = getNearestStreamTag(stream, "from");
  const inferredToTag = getNearestStreamTag(stream, "to");
  const inferredFrom = findEquipmentByTag(inferredFromTag);
  const inferredTo = findEquipmentByTag(inferredToTag);
  if (inferredFrom && inferredTo) {
    stream.fromTag = stream.fromTag || inferredFrom.tag;
    stream.toTag = stream.toTag || inferredTo.tag;
    return buildStreamPointsByMode(inferredFrom, inferredTo, stream.shape || "elbow", mode);
  }
  if (Array.isArray(stream.points) && stream.points.length >= 2) {
    return normalizePointArray(stream.points);
  }
  return null;
}

function getStreamControlPoints(stream, mode = "image") {
  const fields = getModeStreamFields(mode);
  const modePoints = normalizePointArray(stream?.[fields.controlPoints]);
  if (modePoints.length >= 2) {
    return modePoints;
  }
  return getAutoStreamPoints(stream, mode) || [];
}

function setStreamControlPoints(stream, mode = "image", points = []) {
  const fields = getModeStreamFields(mode);
  const nextPoints = normalizePointArray(points);
  stream[fields.controlPoints] = nextPoints;
  stream[fields.useCustomPath] = nextPoints.length >= 2;
  stream[fields.path] = nextPoints.length >= 2 ? getPathByShape(nextPoints, stream.shape || "elbow") : "";
  if (mode === "image" && !Array.isArray(stream.points)) {
    stream.points = [];
  }
  return nextPoints;
}

function buildStreamPath(stream, mode = "image") {
  if (!stream) {
    return "";
  }
  const fields = getModeStreamFields(mode);
  const customPath = safeText(stream[fields.path], "");
  if (stream[fields.useCustomPath] && customPath) {
    return customPath;
  }
  const modePoints = normalizePointArray(stream[fields.controlPoints]);
  if (modePoints.length >= 2) {
    return getPathByShape(modePoints, stream.shape || "elbow");
  }
  if (mode === "image" && stream.shape === "custom" && stream.pathD) {
    return stream.pathD;
  }
  return getPathByShape(getAutoStreamPoints(stream, mode) || [], stream.shape || "elbow");
}

function getStreamPathD(stream, mode = "image") {
  return buildStreamPath(stream, mode);
}

function applyStreamVisualStyle(path, stream) {
  if (stream.color) {
    path.style.stroke = stream.color;
  }
  if (stream.strokeWidth) {
    path.style.strokeWidth = stream.strokeWidth;
  }
  if (stream.direction === "reverse") {
    path.style.animationDirection = "reverse";
  }
}

function escapeHtml(value) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

// Enhancement layer: editor guard, history, layers, minimap, labels, and presentation overlay.
function injectAdminUtilityBar() {
  if (!els.adminPanelBody || els.adminPanelBody.querySelector(".admin-utility-bar")) {
    return;
  }
  const bar = document.createElement("section");
  bar.className = "admin-utility-bar";
  bar.innerHTML = `
    <div class="admin-edit-state ${isEditMode() ? "is-on" : ""}">${isEditMode() ? "Edit Mode aktif" : "Read-only mode"}</div>
    <label class="admin-inline-toggle"><input id="adminSnapToggle" type="checkbox"${isSnapEnabled() ? " checked" : ""}${isEditMode() ? "" : " disabled"}><span>Snap to Grid</span></label>
    <label class="admin-field compact"><span>Grid</span><select id="adminSnapSize"${isEditMode() ? "" : " disabled"}>${[1, 2, 5, 10].map((size) => `<option value="${size}"${getGridSize() === size ? " selected" : ""}>${size}%</option>`).join("")}</select></label>
    <button class="admin-mini-button" id="adminBackupConfig" type="button">Backup Config</button>
    <label class="admin-import-label">
      <input id="adminImportConfig" type="file" accept="application/json,.json"${isEditMode() ? "" : " disabled"}>
      <span>Import Config</span>
    </label>
    <button class="admin-mini-button" id="adminCancelPreview" type="button"${hasPendingPreview() ? "" : " disabled"}>Batal Preview</button>
  `;
  els.adminPanelBody.prepend(bar);
  document.getElementById("adminSnapToggle")?.addEventListener("change", (event) => {
    state.admin.snap.enabled = event.target.checked;
    sessionStorage.setItem(ADMIN_SNAP_KEY, JSON.stringify(state.admin.snap));
  });
  document.getElementById("adminSnapSize")?.addEventListener("change", (event) => {
    state.admin.snap.size = Number(event.target.value) || 1;
    sessionStorage.setItem(ADMIN_SNAP_KEY, JSON.stringify(state.admin.snap));
  });
  document.getElementById("adminBackupConfig")?.addEventListener("click", exportAdminConfig);
  document.getElementById("adminImportConfig")?.addEventListener("change", (event) => importAdminConfig(event.target.files[0]));
  document.getElementById("adminCancelPreview")?.addEventListener("click", () => cancelAdminPreview());
}

function applyAdminEditorModeState() {
  if (!els.adminPanelBody) {
    return;
  }
  const editable = isEditMode();
  const readonlySelects = new Set(["adminEquipmentSelect", "adminNodeSelect", "adminStreamSelect", "adminFlowUnit"]);
  els.adminPanelBody.querySelectorAll("input, textarea, select").forEach((field) => {
    if (readonlySelects.has(field.id)) {
      field.disabled = false;
    } else {
      field.disabled = !editable;
    }
  });
  els.adminPanelBody.querySelectorAll("button").forEach((button) => {
    const alwaysEnabled = ["adminBackupConfig", "adminCancelPreview"].includes(button.id);
    button.disabled = !editable && !alwaysEnabled;
  });
  els.adminPanelBody.querySelector("#adminCancelPreview")?.toggleAttribute("disabled", !hasPendingPreview());
}

function pushAdminHistory(label = "Perubahan admin") {
  if (!isAdmin()) {
    return;
  }
  state.admin.history.push({ label, snapshot: getAdminSnapshot() });
  if (state.admin.history.length > 30) {
    state.admin.history.shift();
  }
  state.admin.redo = [];
  updateUndoRedoButtons();
}

function undoAdminChange() {
  if (!isAdmin() || !isEditMode() || !state.admin.history.length) {
    return;
  }
  state.admin.redo.push({ label: "Redo", snapshot: getAdminSnapshot() });
  const entry = state.admin.history.pop();
  restoreAdminSnapshot(entry.snapshot);
  showToast("Undo admin", "info", entry.label);
}

function redoAdminChange() {
  if (!isAdmin() || !isEditMode() || !state.admin.redo.length) {
    return;
  }
  state.admin.history.push({ label: "Undo", snapshot: getAdminSnapshot() });
  const entry = state.admin.redo.pop();
  restoreAdminSnapshot(entry.snapshot);
  showToast("Redo admin", "info", entry.label);
}

function updateUndoRedoButtons() {
  if (els.adminUndo) {
    els.adminUndo.disabled = !isAdmin() || !isEditMode() || !state.admin.history.length;
  }
  if (els.adminRedo) {
    els.adminRedo.disabled = !isAdmin() || !isEditMode() || !state.admin.redo.length;
  }
}

function getAdminSnapshot() {
  return {
    adminData: cloneData(state.adminData),
    calibrationOverrides: cloneData(state.calibrationOverrides),
  };
}

function restoreAdminSnapshot(snapshot) {
  state.adminData = cloneData(snapshot.adminData || state.adminData);
  state.calibrationOverrides = cloneData(snapshot.calibrationOverrides || state.calibrationOverrides);
  saveAdminState();
  persistCalibrationOverrides();
  refreshAfterAdminDataChange();
}

function applyAdminPreview(type, payload) {
  if (!isEditMode()) {
    return;
  }
  if (!state.admin.pendingPreview) {
    state.admin.pendingPreview = { snapshot: getAdminSnapshot(), type };
  }
  if (type === "flowImage") {
    const unit = UNITS[payload.unitId];
    if (unit) {
      unit.image = payload.image;
      loadUnitDiagram(payload.unitId);
    }
  }
  if (type === "equipment") {
    const item = EQUIPMENT_BY_ID.get(payload.id);
    if (item) {
      mergeEquipmentData(item, payload);
      updateDetailPanel(item);
      renderHotspots();
      renderSchematicDiagram();
      renderEquipmentStrip();
      renderEquipmentSections();
    }
  }
}

function commitAdminPreview() {
  state.admin.pendingPreview = null;
  renderAdminPanel();
}

function cancelAdminPreview(options = {}) {
  if (!state.admin.pendingPreview && !state.admin.previewStream) {
    return;
  }
  if (state.admin.pendingPreview) {
    restoreAdminSnapshot(state.admin.pendingPreview.snapshot);
  }
  state.admin.pendingPreview = null;
  state.admin.previewStream = null;
  renderStreamOverlay();
  setStreamFilter(state.activeStream);
  if (!options.silent) {
    showToast("Preview dibatalkan", "info");
  }
}

function hasPendingPreview() {
  return Boolean(state.admin.pendingPreview || state.admin.previewStream);
}

function exportAdminConfig() {
  const now = new Date();
  const config = {
    version: 1,
    exportedAt: now.toISOString(),
    equipmentOverrides: state.adminData.equipmentOverrides,
    flowImage: state.adminData.flowImages,
    nodes: state.adminData.nodes,
    streams: state.adminData.streams,
    hiddenNodes: state.adminData.hiddenNodes,
    processTour: state.adminData.processTour,
    diagramViewMode: state.diagramViewMode,
    layerPreferences: state.layerPreferences,
  };
  const blob = new Blob([JSON.stringify(config, null, 2)], { type: "application/json" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = `refinerymap-config-${getTimestampForFilename(now)}.json`;
  link.click();
  URL.revokeObjectURL(link.href);
  showToast("Backup config dibuat", "success", link.download);
}

function importAdminConfig(file) {
  if (!requireEditMode("Import config")) {
    return;
  }
  if (!file) {
    return;
  }
  const reader = new FileReader();
  reader.onload = () => {
    try {
      const config = JSON.parse(reader.result);
      const validation = validateAdminConfig(config);
      if (!validation.valid) {
        console.warn("Config invalid", validation.issues);
        showToast("File config tidak valid", "error");
        return;
      }
      const summary = `${Object.keys(config.equipmentOverrides || {}).length} equipment override, ${(config.nodes || []).length} node, ${Object.keys(config.streams || {}).length} stream`;
      if (!window.confirm(`Import config ini?\n${summary}`)) {
        return;
      }
      pushAdminHistory("Import config");
      applyImportedConfig(config);
      showToast("Config berhasil diimport", "success", summary);
    } catch (error) {
      console.warn("Config tidak dapat dibaca.", error);
      showToast("File config tidak valid", "error");
    }
  };
  reader.readAsText(file);
}

function validateAdminConfig(config) {
  const issues = [];
  if (!config || typeof config !== "object") {
    issues.push("Root config harus object.");
  }
  if (config?.nodes && !Array.isArray(config.nodes)) {
    issues.push("nodes harus array.");
  }
  if (config?.streams && typeof config.streams !== "object") {
    issues.push("streams harus object.");
  }
  return { valid: !issues.length, issues };
}

function applyImportedConfig(config) {
  state.adminData.equipmentOverrides = config.equipmentOverrides || {};
  state.adminData.flowImages = normalizeFlowImages(config.flowImage || {});
  state.adminData.nodes = Array.isArray(config.nodes) ? config.nodes : [];
  state.adminData.streams = config.streams || {};
  state.adminData.hiddenNodes = Array.isArray(config.hiddenNodes) ? config.hiddenNodes : [];
  state.adminData.processTour = config.processTour || {};
  state.layerPreferences = { ...DEFAULT_LAYER_PREFERENCES, ...(config.layerPreferences || {}) };
  if (config.diagramViewMode === "image" || config.diagramViewMode === "schematic") {
    state.diagramViewMode = config.diagramViewMode;
    try {
      localStorage.setItem(DIAGRAM_VIEW_MODE_KEY, config.diagramViewMode);
    } catch (error) {
      console.warn("Mode diagram impor tidak bisa disimpan.", error);
    }
  }
  saveAdminState();
  saveLayerPreferences();
  refreshAfterAdminDataChange();
  renderDiagramByMode();
  applyLayerPreferences();
}

function isSnapEnabled() {
  return isEditMode() && state.admin.snap.enabled;
}

function getGridSize() {
  return Number(state.admin.snap.size) || 1;
}

function snapCoordinate(value) {
  if (!isSnapEnabled()) {
    return round1(Number(value));
  }
  const size = getGridSize();
  return round1(Math.round(Number(value) / size) * size);
}

function snapPoint(point) {
  return {
    x: clamp(snapCoordinate(point.x), 0, 100),
    y: clamp(snapCoordinate(point.y), 0, 100),
  };
}

function loadLayerPreferences() {
  state.layerPreferences = { ...DEFAULT_LAYER_PREFERENCES, ...safeLocalStorageGet(LAYER_PREFERENCES_KEY, {}) };
}

function saveLayerPreferences() {
  safeLocalStorageSet(LAYER_PREFERENCES_KEY, state.layerPreferences);
}

function getLayerPreferences() {
  return state.layerPreferences;
}

function setLayerPreference(layerName, enabled) {
  state.layerPreferences[layerName] = Boolean(enabled);
  saveLayerPreferences();
  applyLayerPreferences();
  renderLayerControls();
}

function applyLayerPreferences() {
  const pref = getLayerPreferences();
  document.body.classList.toggle("layer-hotspots-hidden", !pref.hotspots);
  document.body.classList.toggle("layer-stream-labels-hidden", !pref.streamLabels);
  document.body.classList.toggle("layer-status-hidden", !pref.statusBadges);
  document.body.classList.toggle("layer-calibration-hidden", !pref.calibrationMarkers);
  document.body.classList.toggle("layer-tooltip-hidden", !pref.tooltip);
  document.body.classList.toggle("layer-process-path-hidden", !pref.processPath);
  document.body.classList.toggle("focus-selected-mode", Boolean(pref.focusSelected));
  document.body.classList.toggle("layer-presentation-search", Boolean(pref.presentationSearch));
  els.diagramStage?.classList.toggle("stream-hidden", state.streamHidden || !pref.streams);
  els.miniMap?.classList.toggle("is-hidden", !pref.miniMap);
  updateStreamLabelVisibility();
  renderMiniMap();
}

function renderLayerControls() {
  if (!els.layerPanel) {
    return;
  }
  const labels = {
    hotspots: "Equipment Hotspot",
    streams: "Stream",
    streamLabels: "Stream Label",
    statusBadges: "Status Badge",
    calibrationMarkers: "Calibration Marker",
    miniMap: "Mini Map",
    tooltip: "Tooltip",
    processPath: "Process Path",
    autoFocus: "Auto Focus Selected Equipment",
    focusSelected: "Focus Selected Mode",
    presentationSearch: "Search di Presentation",
  };
  els.layerPanel.innerHTML = `
    <header><strong>Layer Visibility</strong><button class="admin-close-button" id="layerPanelClose" type="button" aria-label="Tutup layer panel">&times;</button></header>
    <div class="layer-control-list">
      ${Object.entries(labels).map(([key, label]) => `
        <label class="layer-toggle"><input type="checkbox" data-layer="${key}"${state.layerPreferences[key] ? " checked" : ""}><span>${label}</span></label>
      `).join("")}
    </div>
  `;
  els.layerPanel.querySelector("#layerPanelClose")?.addEventListener("click", () => els.layerPanel.classList.add("is-hidden"));
  els.layerPanel.querySelectorAll("[data-layer]").forEach((input) => {
    input.addEventListener("change", () => setLayerPreference(input.dataset.layer, input.checked));
  });
}

function toggleLayerPanel(force) {
  renderLayerControls();
  const show = typeof force === "boolean" ? force : els.layerPanel.classList.contains("is-hidden");
  els.layerPanel.classList.toggle("is-hidden", !show);
}

function renderMiniMap() {
  if (!els.miniMap || !state.layerPreferences.miniMap) {
    return;
  }
  const mode = state.diagramViewMode === "schematic" ? "schematic" : "image";
  const equipment = getUnitEquipment()
    .filter((item) => hasHotspotCoordinate(item))
    .map((item) => ({
      item,
      pos: getEquipmentPositionByMode(item, mode),
    }));
  els.miniMap.innerHTML = `
    <button class="mini-map-toggle" id="miniMapToggle" type="button" aria-label="Collapse mini map">${els.miniMap.classList.contains("is-collapsed") ? "Map" : "−"}</button>
    <div class="mini-map-stage">
      ${equipment.map(({ item, pos }) => `<button class="mini-map-dot${item.id === state.selectedEquipmentId ? " is-active" : ""}" data-id="${escapeHtml(item.id)}" style="left:${pos.x}%;top:${pos.y}%;" aria-label="${escapeHtml(item.tag)}"></button>`).join("")}
      <span class="mini-map-viewport" id="miniMapViewport"></span>
    </div>
  `;
  els.miniMap.querySelector("#miniMapToggle")?.addEventListener("click", toggleMiniMap);
  els.miniMap.querySelectorAll(".mini-map-dot").forEach((dot) => {
    dot.addEventListener("click", () => {
      const item = EQUIPMENT_BY_ID.get(dot.dataset.id);
      if (item) {
        selectEquipmentSmooth(item.id, { focus: true, force: true });
      }
    });
  });
  updateMiniMapViewport();
}

function updateMiniMapViewport() {
  const viewport = els.miniMap?.querySelector("#miniMapViewport");
  if (!viewport || !els.diagramScroll) {
    return;
  }
  const maxLeft = Math.max(1, els.diagramScroll.scrollWidth);
  const maxTop = Math.max(1, els.diagramScroll.scrollHeight);
  viewport.style.left = `${(els.diagramScroll.scrollLeft / maxLeft) * 100}%`;
  viewport.style.top = `${(els.diagramScroll.scrollTop / maxTop) * 100}%`;
  viewport.style.width = `${Math.min(100, (els.diagramScroll.clientWidth / maxLeft) * 100)}%`;
  viewport.style.height = `${Math.min(100, (els.diagramScroll.clientHeight / maxTop) * 100)}%`;
}

function toggleMiniMap() {
  if (!state.layerPreferences.miniMap) {
    setLayerPreference("miniMap", true);
    return;
  }
  els.miniMap.classList.toggle("is-collapsed");
  renderMiniMap();
}

function showEquipmentTooltip(equipment, targetElement) {
  if (!state.layerPreferences.tooltip || window.matchMedia("(max-width: 760px)").matches) {
    return;
  }
  window.clearTimeout(state.tooltip.timer);
  state.tooltip.target = targetElement;
  state.tooltip.timer = window.setTimeout(() => {
    els.equipmentTooltip.innerHTML = `
      <strong>${escapeHtml(equipment.tag)}</strong>
      <span>${escapeHtml(equipment.name)}</span>
    `;
    els.equipmentTooltip.classList.remove("is-hidden");
    positionEquipmentTooltip(targetElement);
  }, 90);
}

function hideEquipmentTooltip() {
  window.clearTimeout(state.tooltip.timer);
  els.equipmentTooltip?.classList.add("is-hidden");
  state.tooltip.target = null;
}

function positionEquipmentTooltip(targetElement = state.tooltip.target) {
  if (!targetElement || !els.equipmentTooltip) {
    return;
  }
  const stageRect = els.diagramStage.getBoundingClientRect();
  const rect = targetElement.getBoundingClientRect();
  const tooltipRect = els.equipmentTooltip.getBoundingClientRect();
  const left = clamp(rect.left - stageRect.left + rect.width / 2 + 12, 8, stageRect.width - tooltipRect.width - 8);
  const top = clamp(rect.top - stageRect.top - tooltipRect.height - 8, 8, stageRect.height - tooltipRect.height - 8);
  els.equipmentTooltip.style.left = `${left}px`;
  els.equipmentTooltip.style.top = `${top}px`;
}

function normalizeEquipmentStatus(status = "Unknown") {
  const text = safeText(status, "Unknown").toLowerCase();
  if (text.includes("critical") || text.includes("alarm") || text.includes("high risk")) return "critical";
  if (text.includes("warning") || text.includes("caution")) return "warning";
  if (text.includes("maintenance") || text.includes("standby")) return "maintenance";
  if (text.includes("offline") || text.includes("shutdown") || text.includes("stop")) return "offline";
  if (text.includes("normal") || text.includes("running")) return "normal";
  return "unknown";
}

function getStatusClass(status) {
  return `status-${normalizeEquipmentStatus(status)}`;
}

function applyStatusVisual(element, status) {
  if (!element) {
    return;
  }
  element.dataset.status = normalizeEquipmentStatus(status);
  element.classList.add(getStatusClass(status));
}

function buildSearchIndex() {
  const source = els.searchAllUnits?.checked ? EQUIPMENT : getUnitEquipment();
  state.admin.searchIndex = source.map((item) => ({
    item,
    haystack: [item.id, item.tag, item.name, item.area, item.unit, item.section, item.operation?.status, item.type, item.description]
      .join(" ")
      .toLowerCase(),
  }));
  return state.admin.searchIndex;
}

function performEquipmentSearch(query) {
  if (!query) {
    return [];
  }
  return buildSearchIndex()
    .filter((entry) => entry.haystack.includes(query.toLowerCase()))
    .map((entry) => entry.item);
}

function renderSearchResults(results) {
  renderSearchOptions();
  if (!results.length) {
    return;
  }
  results.slice(0, 20).forEach((item) => {
    const option = document.createElement("option");
    option.value = `${item.tag} - ${item.name} [${item.unit}]`;
    option.label = `${item.status || item.operation?.status || "Status"} | ${item.area}`;
    els.equipmentSearchList.appendChild(option);
  });
}

function highlightSearchResults(results) {
  const ids = new Set(results.map((item) => item.id));
  getEquipmentNodes().forEach((node) => {
    node.classList.toggle("is-search-match", ids.has(node.dataset.id));
  });
}

function moveSearchCursor(delta) {
  const results = state.admin.searchResults.length ? state.admin.searchResults : performEquipmentSearch(state.searchQuery);
  if (!results.length) {
    return;
  }
  state.admin.searchCursor = (state.admin.searchCursor + delta + results.length) % results.length;
  const item = results[state.admin.searchCursor];
  els.equipmentSearch.value = `${item.tag} - ${item.name} [${item.unit}]`;
  highlightSearchResults([item]);
}

function fitToSelectedEquipment(tag = null) {
  const item = tag ? findEquipmentByTag(tag) : EQUIPMENT_BY_ID.get(state.selectedEquipmentId);
  if (item) {
    focusEquipment(item.tag, { preserveZoom: true, pulse: true });
  }
}

function focusEquipment(tag, options = {}) {
  const item = findEquipmentByTag(tag) || EQUIPMENT_BY_ID.get(tag);
  if (!item) {
    return;
  }
  scrollEquipmentIntoView(item.tag);
  if (options.pulse !== false) {
    pulseActiveHotspot(item.id);
  }
}

function scrollEquipmentIntoView(tag) {
  const item = findEquipmentByTag(tag) || EQUIPMENT_BY_ID.get(tag);
  if (!item || !hasHotspotCoordinate(item)) {
    return;
  }
  const mode = state.diagramViewMode === "schematic" ? "schematic" : "image";
  const position = getEquipmentPositionByMode(item, mode);
  const stageWidth = els.diagramStage.offsetWidth;
  const stageHeight = els.diagramStage.offsetHeight;
  const targetX = (position.x / 100) * stageWidth;
  const targetY = (position.y / 100) * stageHeight;
  els.diagramScroll.scrollTo({
    left: Math.max(0, targetX - els.diagramScroll.clientWidth / 2),
    top: Math.max(0, targetY - els.diagramScroll.clientHeight / 2),
    behavior: "smooth",
  });
  updateMiniMapViewport();
}

function setAutoFocusPreference(enabled) {
  setLayerPreference("autoFocus", enabled);
}

function setPresentationMode(enabled, options = {}) {
  state.presentationMode = Boolean(enabled);
  document.body.classList.toggle("is-presentation-mode", state.presentationMode);
  sessionStorage.setItem(PRESENTATION_MODE_KEY, state.presentationMode ? "active" : "inactive");
  els.presentationToggle?.classList.toggle("is-active", state.presentationMode);
  els.presentationToggle?.setAttribute("aria-pressed", String(state.presentationMode));
  if (state.presentationMode) {
    closeAdminPanel();
    hideFullscreenEquipmentCard();
    toggleViewerMoreMenu(true);
    if (state.selectedEquipmentId) {
      const item = EQUIPMENT_BY_ID.get(state.selectedEquipmentId);
      showPresentationEquipmentOverlay(item, getHotspotElement(item?.id));
    }
  } else {
    hidePresentationEquipmentOverlay();
    if (!isAdmin()) {
      toggleViewerMoreMenu(false);
    }
  }
  if (!options.silent) {
    showToast(state.presentationMode ? "Presentation Mode aktif" : "Presentation Mode nonaktif", "info");
  }
}

function isPresentationMode() {
  return state.presentationMode === true;
}

function renderPresentationOverlay(equipment, tourStep = null) {
  const meta = getStatusMeta(equipment.operation?.status);
  const description = safeText(tourStep?.description || equipment.description, "Belum ada deskripsi equipment.");
  els.presentationEquipmentOverlay.innerHTML = `
    <button class="presentation-overlay-close" type="button" aria-label="Tutup overlay">&times;</button>
    <div class="presentation-overlay-media">
      <img id="presentationEquipmentImage" alt="">
    </div>
    <div class="presentation-overlay-copy">
      <strong>${escapeHtml(equipment.tag)}</strong>
      <h3>${escapeHtml(equipment.name)}</h3>
      <span class="status-chip ${meta.className}">${escapeHtml(meta.label)}</span>
      <p class="presentation-meta">${escapeHtml(equipment.area)} | ${escapeHtml(equipment.type)}</p>
      <p>${escapeHtml(description)}</p>
      <button class="summary-button" type="button" data-action="detail">Detail</button>
    </div>
  `;
  const image = els.presentationEquipmentOverlay.querySelector("#presentationEquipmentImage");
  setImageWithFallback(image, getEquipmentImageSrc(equipment), safeText(equipment.tag, "Equipment"));
  image.alt = `Foto referensi ${safeText(equipment.name, "Equipment")}`;
  els.presentationEquipmentOverlay.querySelector(".presentation-overlay-close")?.addEventListener("click", hidePresentationEquipmentOverlay);
  els.presentationEquipmentOverlay.querySelector("[data-action='detail']")?.addEventListener("click", () => {
    els.detailPanel.scrollIntoView({ behavior: "smooth", block: "start" });
  });
}

function showPresentationEquipmentOverlay(equipment, hotspotElement, tourStep = null) {
  if (!equipment || !els.presentationEquipmentOverlay) {
    return;
  }
  state.presentationOverlay.equipmentId = equipment.id;
  state.presentationOverlay.hotspot = hotspotElement || getHotspotElement(equipment.id);
  renderPresentationOverlay(equipment, tourStep);
  els.presentationEquipmentOverlay.classList.remove("is-hidden");
  requestAnimationFrame(() => {
    positionPresentationEquipmentOverlay(state.presentationOverlay.hotspot);
    els.presentationEquipmentOverlay.classList.add("is-visible");
  });
}

function hidePresentationEquipmentOverlay() {
  if (!els.presentationEquipmentOverlay) {
    return;
  }
  els.presentationEquipmentOverlay.classList.remove("is-visible");
  els.presentationEquipmentOverlay.classList.add("is-hidden");
  state.presentationOverlay.equipmentId = null;
  state.presentationOverlay.hotspot = null;
}

function isPresentationOverlayVisible() {
  return Boolean(els.presentationEquipmentOverlay && !els.presentationEquipmentOverlay.classList.contains("is-hidden"));
}

function positionPresentationEquipmentOverlay(hotspotElement = state.presentationOverlay.hotspot) {
  if (!hotspotElement || !els.presentationEquipmentOverlay) {
    return;
  }
  const stageRect = els.diagramStage.getBoundingClientRect();
  const hotspotRect = hotspotElement.getBoundingClientRect();
  const overlayRect = els.presentationEquipmentOverlay.getBoundingClientRect();
  let left = hotspotRect.right - stageRect.left + 14;
  let top = hotspotRect.top - stageRect.top - overlayRect.height / 2 + hotspotRect.height / 2;
  if (left + overlayRect.width > stageRect.width - 8) {
    left = hotspotRect.left - stageRect.left - overlayRect.width - 14;
  }
  top = clamp(top, 8, stageRect.height - overlayRect.height - 8);
  left = clamp(left, 8, stageRect.width - overlayRect.width - 8);
  els.presentationEquipmentOverlay.style.left = `${left}px`;
  els.presentationEquipmentOverlay.style.top = `${top}px`;
}

function updatePresentationOverlayPosition() {
  if (isPresentationOverlayVisible()) {
    positionPresentationEquipmentOverlay();
  }
}

function bindPresentationOverlayEvents() {
  els.diagramStage.addEventListener("click", (event) => {
    if (!isPresentationMode() || event.target.closest(".hotspot") || event.target.closest(".presentation-equipment-overlay")) {
      return;
    }
    hidePresentationEquipmentOverlay();
  });
  els.diagramScroll.addEventListener("scroll", debounce(() => {
    updateMiniMapViewport();
    updatePresentationOverlayPosition();
  }, 50));
}

function getHotspotElement(equipmentId) {
  if (!equipmentId) {
    return null;
  }
  return (
    els.hotspotLayer.querySelector(`.hotspot[data-id="${CSS.escape(equipmentId)}"]`) ||
    els.schematicCanvas?.querySelector(`.schematic-node[data-id="${CSS.escape(equipmentId)}"]`) ||
    null
  );
}

function renderStreamLabels(streams) {
  if (!streams.length) {
    return [];
  }
  return streams.map((stream) => {
    const text = document.createElementNS("http://www.w3.org/2000/svg", "text");
    text.classList.add("stream-label", `stream-${stream.type}`);
    text.dataset.stream = stream.type;
    const pathRef = document.createElementNS("http://www.w3.org/2000/svg", "textPath");
    pathRef.setAttribute("href", `#${getStreamDomId(stream)}`);
    pathRef.setAttribute("startOffset", "50%");
    pathRef.setAttribute("text-anchor", "middle");
    pathRef.textContent = stream.label || `${stream.fromTag || "from"} -> ${stream.toTag || "to"}`;
    text.appendChild(pathRef);
    return text;
  });
}

function updateStreamLabelVisibility() {
  const visible = state.layerPreferences.streamLabels && state.zoom.value >= 0.75;
  els.diagramStage?.querySelectorAll(".stream-label").forEach((label) => {
    label.classList.toggle("is-hidden", !visible);
  });
}

function getStreamDomId(stream, mode = "image") {
  return `${mode}-stream-path-${slugify(stream.id || stream.label)}`;
}

function validateDiagramConfig() {
  const issues = [];
  const seenTags = new Map();
  EQUIPMENT.forEach((item) => {
    if (!hasHotspotCoordinate(item)) {
      issues.push(issue("warning", "Node tanpa koordinat valid", item.id, "node"));
    }
    if (!isPercent(Number(item.x)) || !isPercent(Number(item.y))) {
      issues.push(issue("error", "Koordinat node di luar 0-100", item.id, "node"));
    }
    const key = item.tag.toLowerCase();
    if (seenTags.has(key)) {
      issues.push(issue("error", `Tag duplikat: ${item.tag}`, item.id, "equipment"));
    }
    seenTags.set(key, item.id);
    if (!safeText(item.description, "")) {
      issues.push(issue("info", "Equipment tanpa deskripsi", item.id, "equipment"));
    }
    if (!getEquipmentImageSrc(item)) {
      issues.push(issue("warning", "Image equipment kosong", item.id, "equipment"));
    }
  });
  STREAMS.forEach((stream) => {
    if (!STREAM_TYPES[stream.type]) issues.push(issue("error", `Stream type tidak dikenal: ${stream.id}`, stream.id, "stream"));
    if (!getStreamPathD(stream)) issues.push(issue("error", `Stream path kosong: ${stream.id}`, stream.id, "stream"));
    if (stream.fromTag && stream.toTag && stream.fromTag === stream.toTag) issues.push(issue("warning", `From dan To sama: ${stream.id}`, stream.id, "stream"));
    if (stream.fromTag && !findEquipmentByTag(stream.fromTag)) issues.push(issue("error", `From node tidak valid: ${stream.id}`, stream.id, "stream"));
    if (stream.toTag && !findEquipmentByTag(stream.toTag)) issues.push(issue("error", `To node tidak valid: ${stream.id}`, stream.id, "stream"));
  });
  Object.entries(UNITS).forEach(([unitId, unit]) => {
    if (!unit.image) issues.push(issue("warning", `Flow image kosong: ${unitId}`, unitId, "flow"));
    getProcessTourSteps(unitId).forEach((step) => {
      if (!getEquipmentFromTourStep(step)) issues.push(issue("warning", `Tour step tidak valid: ${step.label}`, step.id || step.tag, "tour"));
    });
  });
  return issues;
}

function issue(severity, message, targetId, tab) {
  return { severity, message, targetId, tab };
}

function renderValidationPanel() {
  const issues = validateDiagramConfig();
  els.adminPanelBody.innerHTML = `
    <section class="validation-panel">
      <h3>Validation (${issues.length})</h3>
      ${issues.length ? issues.map((entry, index) => `
        <article class="validation-issue severity-${entry.severity}">
          <strong>${escapeHtml(entry.severity.toUpperCase())}</strong>
          <span>${escapeHtml(entry.message)}</span>
          <button class="admin-mini-button" type="button" data-issue="${index}">Perbaiki</button>
        </article>
      `).join("") : "<p>Konfigurasi terlihat baik.</p>"}
    </section>
  `;
  els.adminPanelBody.querySelectorAll("[data-issue]").forEach((button) => {
    button.addEventListener("click", () => focusValidationIssue(issues[Number(button.dataset.issue)]));
  });
}

function focusValidationIssue(issueItem) {
  if (!issueItem) {
    return;
  }
  state.admin.activeTab = issueItem.tab === "stream" ? "stream" : issueItem.tab === "tour" ? "tour" : "equipment";
  if (issueItem.tab === "stream") state.admin.selectedStreamId = issueItem.targetId;
  if (issueItem.tab !== "stream" && issueItem.tab !== "tour") state.admin.selectedEquipmentId = issueItem.targetId;
  renderAdminPanel();
}

function loadProcessTourConfig() {
  state.adminData.processTour = safeLocalStorageGet(ADMIN_STORAGE_KEYS.processTour, {});
}

function saveProcessTourConfig() {
  safeLocalStorageSet(ADMIN_STORAGE_KEYS.processTour, state.adminData.processTour);
}

function getProcessTourSteps(unitId = state.activeUnitId) {
  const saved = state.adminData.processTour?.[unitId];
  return Array.isArray(saved) && saved.length ? saved : (TOUR_STEPS[unitId] || []);
}

function getProcessTourStepDuration(step) {
  return Math.max(700, Number(step?.duration) || 2300);
}

function getEquipmentFromTourStep(step) {
  return EQUIPMENT_BY_ID.get(step.id) || findEquipmentByTag(step.tag || step.label);
}

function renderProcessTourEditor() {
  const steps = getProcessTourSteps(state.activeUnitId);
  els.adminPanelBody.innerHTML = `
    <form class="admin-form" id="adminTourForm">
      <p class="admin-help">Format per baris: tag | label | stream | durasi ms | deskripsi | autoFocus(true/false)</p>
      <label class="admin-field"><span>Pilih step</span><select id="adminTourStepSelect">${steps.map((step, index) => `<option value="${index}">${index + 1}. ${escapeHtml(step.label || step.id)}</option>`).join("")}</select></label>
      ${adminTextarea("adminTourSteps", "Urutan alur proses", steps.map((step) => {
        const item = getEquipmentFromTourStep(step);
        return [item?.tag || step.tag || step.id, step.label || item?.name || "", step.stream || "all", step.duration || 2300, step.description || "", step.autoFocus === false ? "false" : "true"].join(" | ");
      }).join("\n"), 12)}
      <div class="admin-form-actions">
        <button class="tool-button ghost-button" id="adminTourAdd" type="button">Add step</button>
        <button class="tool-button ghost-button" id="adminTourDelete" type="button">Delete step</button>
        <button class="tool-button ghost-button" id="adminTourUp" type="button">Move up</button>
        <button class="tool-button ghost-button" id="adminTourDown" type="button">Move down</button>
        <button class="tool-button" type="submit">Save tour</button>
        <button class="tool-button ghost-button" id="adminTourPreview" type="button">Preview tour</button>
        <button class="tool-button ghost-button" id="adminTourReset" type="button">Reset tour default</button>
      </div>
    </form>
  `;
  document.getElementById("adminTourForm").addEventListener("submit", (event) => {
    event.preventDefault();
    if (!requireEditMode("Simpan tour")) return;
    pushAdminHistory("Simpan process tour");
    state.adminData.processTour[state.activeUnitId] = parseTourText(adminValue("adminTourSteps"));
    saveAdminState();
    saveProcessTourConfig();
    showToast("Process tour tersimpan", "success", state.activeUnitId);
  });
  document.getElementById("adminTourAdd").addEventListener("click", () => mutateTourText("add"));
  document.getElementById("adminTourDelete").addEventListener("click", () => mutateTourText("delete"));
  document.getElementById("adminTourUp").addEventListener("click", () => mutateTourText("up"));
  document.getElementById("adminTourDown").addEventListener("click", () => mutateTourText("down"));
  document.getElementById("adminTourPreview").addEventListener("click", startProcessTour);
  document.getElementById("adminTourReset").addEventListener("click", () => {
    if (!requireEditMode("Reset tour")) return;
    pushAdminHistory("Reset process tour");
    delete state.adminData.processTour[state.activeUnitId];
    saveAdminState();
    renderProcessTourEditor();
  });
}

function mutateTourText(action) {
  if (!requireEditMode("Edit tour")) return;
  const textarea = document.getElementById("adminTourSteps");
  const selector = document.getElementById("adminTourStepSelect");
  const lines = textarea.value.split(/\r?\n/).filter((line) => line.trim());
  let index = Number(selector.value) || 0;
  if (action === "add") {
    const item = EQUIPMENT_BY_ID.get(state.selectedEquipmentId) || getUnitEquipment()[0];
    lines.splice(index + 1, 0, `${item.tag} | ${item.name} | ${item.streams?.[0] || "liquid"} | 2300 |  | true`);
    index += 1;
  } else if (action === "delete" && lines.length) {
    lines.splice(index, 1);
    index = Math.max(0, index - 1);
  } else if (action === "up" && index > 0) {
    [lines[index - 1], lines[index]] = [lines[index], lines[index - 1]];
    index -= 1;
  } else if (action === "down" && index < lines.length - 1) {
    [lines[index + 1], lines[index]] = [lines[index], lines[index + 1]];
    index += 1;
  }
  textarea.value = lines.join("\n");
  selector.innerHTML = lines.map((line, nextIndex) => `<option value="${nextIndex}"${nextIndex === index ? " selected" : ""}>${nextIndex + 1}. ${escapeHtml(line.split("|")[1]?.trim() || line.split("|")[0]?.trim() || "Step")}</option>`).join("");
}

function parseTourText(value) {
  return String(value || "").split(/\r?\n/).map((line) => {
    const [tag, label, stream, duration, description, autoFocus] = line.split("|").map((part) => part?.trim() || "");
    const item = findEquipmentByTag(tag);
    return {
      id: item?.id || tag,
      tag,
      label: label || item?.name || tag,
      stream: STREAM_TYPES[stream] ? stream : "all",
      duration: Number(duration) || 2300,
      description,
      autoFocus: autoFocus !== "false",
    };
  }).filter((step) => step.tag);
}

function validateProcessTourConfig() {
  return getProcessTourSteps().filter((step) => !getEquipmentFromTourStep(step));
}

function runProcessTourFromConfig() {
  startProcessTour();
}

function safeLocalStorageSet(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
    return true;
  } catch (error) {
    console.warn("localStorage write gagal.", key, error);
    showToast("Penyimpanan browser penuh, export config lalu bersihkan data lama.", "error");
    return false;
  }
}

function safeLocalStorageGet(key, fallback = {}) {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : cloneData(fallback);
  } catch (error) {
    console.warn("localStorage read gagal.", key, error);
    return cloneData(fallback);
  }
}

function debounce(fn, delay = 120) {
  let timer = null;
  return (...args) => {
    window.clearTimeout(timer);
    timer = window.setTimeout(() => fn(...args), delay);
  };
}

function wait(ms) {
  return new Promise((resolve) => window.setTimeout(resolve, ms));
}

function initKeyboardShortcuts() {
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && isFullscreenEquipmentCardVisible()) {
      event.preventDefault();
      hideFullscreenEquipmentCard();
      return;
    }

    if (event.key === "Escape" && isPresentationOverlayVisible()) {
      event.preventDefault();
      hidePresentationEquipmentOverlay();
      return;
    }

    if (event.key === "Escape" && !els.adminLoginModal.classList.contains("is-hidden")) {
      event.preventDefault();
      closeAdminLoginModal();
      return;
    }

    if (event.key === "Escape" && isAdminPanelOpen()) {
      event.preventDefault();
      closeAdminPanel();
      return;
    }

    if (event.key === "Escape" && state.viewerMenuOpen && !isTypingTarget(event.target)) {
      event.preventDefault();
      toggleViewerMoreMenu(false);
      return;
    }

    if (!isTypingTarget(event.target)) {
      if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "z" && !event.shiftKey) {
        if (isAdmin() && isEditMode()) {
          event.preventDefault();
          undoAdminChange();
        }
        return;
      }
      if (((event.ctrlKey || event.metaKey) && event.shiftKey && event.key.toLowerCase() === "z") || ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "y")) {
        if (isAdmin() && isEditMode()) {
          event.preventDefault();
          redoAdminChange();
        }
        return;
      }
      if (event.ctrlKey && event.shiftKey && event.key.toLowerCase() === "a") {
        event.preventDefault();
        openAdminLoginModal();
        return;
      }
      trackAdminTypedSequence(event);
    }

    if (isTypingTarget(event.target)) {
      if (event.key === "Escape" && event.target === els.equipmentSearch) {
        clearSearch();
        els.equipmentSearch.blur();
      }
      return;
    }

    if (event.key === "/") {
      event.preventDefault();
      els.equipmentSearch.focus();
      return;
    }

    if (event.key.toLowerCase() === "f") {
      event.preventDefault();
      setZoom(1, true);
      els.diagramScroll.scrollTo({ left: 0, top: 0, behavior: "smooth" });
      return;
    }

    if (event.key.toLowerCase() === "p") {
      event.preventDefault();
      setPresentationMode(!isPresentationMode());
      return;
    }

    if (event.key.toLowerCase() === "l") {
      event.preventDefault();
      toggleLayerPanel();
      return;
    }

    if (event.key.toLowerCase() === "m") {
      event.preventDefault();
      toggleMiniMap();
      return;
    }

    if (event.key === "+" || event.key === "=") {
      event.preventDefault();
      setZoom(state.zoom.value + state.zoom.step, false);
      return;
    }

    if (event.key === "-") {
      event.preventDefault();
      setZoom(state.zoom.value - state.zoom.step, false);
      return;
    }

    if (event.code === "Space") {
      event.preventDefault();
      if (state.tour.running) {
        pauseProcessTour();
      } else {
        startProcessTour();
      }
      return;
    }

    if (event.key === "Escape") {
      if (state.searchQuery) {
        clearSearch();
        return;
      }
      if (state.calibrationMode) {
        toggleCalibrationMode(false);
        return;
      }
      if (state.tour.running) {
        stopProcessTour();
      }
    }
  });
}

function isTypingTarget(target) {
  return Boolean(target?.closest?.("input, textarea, select, [contenteditable='true']"));
}

function renderUnitTabs() {
  const buttons = Object.entries(UNITS).map(([unitId, unit]) => {
    const button = document.createElement("button");
    button.className = "unit-tab";
    button.type = "button";
    button.dataset.unit = unitId;
    button.setAttribute("aria-label", `Buka unit ${unitId}`);
    button.innerHTML = `<strong>${unitId}</strong><span>${unit.title}</span>`;
    button.addEventListener("click", () => setActiveUnit(unitId));
    return button;
  });
  els.unitTabs.replaceChildren(...buttons);
}

function setupDetailAccordions() {
  els.detailPanel.querySelectorAll(".detail-section-header").forEach((button) => {
    button.addEventListener("click", () => toggleDetailSection(button));
  });
}

function toggleDetailSection(button) {
  const section = button.closest(".detail-section");
  if (!section) {
    return;
  }
  const isOpen = !section.classList.contains("is-open");
  section.classList.toggle("is-open", isOpen);
  button.setAttribute("aria-expanded", String(isOpen));
}

// Diagram can run in heavy Image mode or lightweight Schematic mode.
function getDiagramViewMode() {
  try {
    const saved = localStorage.getItem(DIAGRAM_VIEW_MODE_KEY);
    return saved === "schematic" ? "schematic" : "image";
  } catch (error) {
    return "image";
  }
}

function setDiagramViewMode(mode, options = {}) {
  const nextMode = mode === "schematic" ? "schematic" : "image";
  const changed = state.diagramViewMode !== nextMode;
  state.diagramViewMode = nextMode;
  try {
    localStorage.setItem(DIAGRAM_VIEW_MODE_KEY, nextMode);
  } catch (error) {
    console.warn("Mode diagram tidak bisa disimpan.", error);
  }
  els.diagramModeImage?.classList.toggle("is-active", nextMode === "image");
  els.diagramModeImage?.setAttribute("aria-pressed", String(nextMode === "image"));
  els.diagramModeSchematic?.classList.toggle("is-active", nextMode === "schematic");
  els.diagramModeSchematic?.setAttribute("aria-pressed", String(nextMode === "schematic"));
  if (nextMode === "image" && !state.diagramReady) {
    loadUnitDiagram(state.activeUnitId);
  }
  if (state.admin.streamPathEdit?.active) {
    state.admin.streamPathEdit.mode = nextMode;
  }
  renderDiagramByMode();
  if (document.body.classList.contains("viewer-minimal") && !isPresentationMode()) {
    toggleViewerMoreMenu(false);
  }
  if (!options.silent && changed) {
    showToast(nextMode === "image" ? "Image Mode aktif" : "Schematic Mode aktif", "info");
  }
}

function renderDiagramByMode() {
  const isImage = state.diagramViewMode === "image";
  els.imageDiagramLayer?.classList.toggle("is-hidden", !isImage);
  els.schematicDiagramLayer?.classList.toggle("is-hidden", isImage);
  els.diagramStage?.classList.toggle("is-schematic-mode", !isImage);
  if (isImage) {
    renderImageDiagram();
  } else {
    renderSchematicDiagram();
  }
  updateActiveNodes(state.selectedEquipmentId);
  updatePresentationOverlayPosition();
}

function renderImageDiagram() {
  renderStreamOverlay();
  renderHotspots();
  setStreamFilter(state.activeStream);
}

function renderSchematicDiagram() {
  if (!els.schematicCanvas) {
    return;
  }
  ensureSchematicLayoutForUnit(state.activeUnitId);
  const fragment = document.createDocumentFragment();
  const streamGroup = document.createElementNS("http://www.w3.org/2000/svg", "g");
  streamGroup.classList.add("schematic-stream-group");
  const nodeGroup = document.createElementNS("http://www.w3.org/2000/svg", "g");
  nodeGroup.classList.add("schematic-node-group");
  renderSchematicStreams(streamGroup);
  renderSchematicNodes(nodeGroup);
  fragment.appendChild(streamGroup);
  fragment.appendChild(nodeGroup);
  els.schematicCanvas.replaceChildren(fragment);
  setStreamFilter(state.activeStream);
  updateActiveNodes(state.selectedEquipmentId);
}

function ensureSchematicLayoutForUnit(unitId = state.activeUnitId) {
  const equipment = getUnitEquipment(unitId);
  if (!equipment.length) {
    return;
  }
  const total = equipment.length;
  equipment.forEach((item, index) => {
    ensureEquipmentModePositions(item);
    if (!item.schematicPosition || !isPercent(Number(item.schematicPosition.x)) || !isPercent(Number(item.schematicPosition.y))) {
      const row = Math.floor(index / 6);
      const column = index % 6;
      item.schematicPosition = {
        x: round1(clamp(8 + column * 15.5, 6, 96)),
        y: round1(clamp(12 + row * 18, 8, 94)),
      };
    }
    if (total <= 8 && index < 8) {
      item.schematicPosition.y = round1(clamp(20 + (index % 4) * 16, 10, 90));
    }
  });
}

function renderSchematicNodes(nodeGroup) {
  const equipment = getUnitEquipment().filter((item) => !item.disabled);
  equipment.forEach((item) => {
    const position = getEquipmentPositionByMode(item, "schematic");
    const visual = getSchematicNodeVisual(item);
    const node = document.createElementNS("http://www.w3.org/2000/svg", "g");
    node.classList.add("schematic-node");
    node.dataset.id = item.id;
    node.setAttribute("transform", `translate(${position.x} ${position.y})`);
    node.setAttribute("tabindex", "0");
    node.setAttribute("role", "button");
    node.setAttribute("aria-label", `${safeText(item.tag, item.id)} ${safeText(item.name, "Equipment")}`);
    node.innerHTML = `
      <g class="schematic-node-card">
        <rect x="${-visual.w / 2}" y="${-visual.h / 2}" width="${visual.w}" height="${visual.h}" rx="${visual.rx}"></rect>
        <circle class="schematic-node-icon-bg" cx="${visual.iconX}" cy="${visual.iconY}" r="${visual.iconRadius}"></circle>
        <text class="schematic-node-icon" x="${visual.iconX}" y="${visual.iconY + visual.iconTextOffset}" text-anchor="middle">${escapeHtml(visual.iconText)}</text>
        <text class="schematic-node-tag" x="${visual.textX}" y="${visual.tagY}" text-anchor="middle">${escapeHtml(visual.tag)}</text>
        <text class="schematic-node-name" x="${visual.textX}" y="${visual.nameY}" text-anchor="middle">${escapeHtml(visual.label)}</text>
        <text class="schematic-node-note" x="${visual.textX}" y="${visual.noteY}" text-anchor="middle">${escapeHtml(visual.note)}</text>
        <circle class="schematic-node-status" cx="${visual.statusX}" cy="${visual.statusY}" r="${visual.statusRadius}"></circle>
        <circle class="schematic-node-resize" cx="${visual.resizeX}" cy="${visual.resizeY}" r="${visual.resizeRadius}"></circle>
      </g>
    `;
    applyStatusVisual(node, item.operation?.status);
    node.addEventListener("pointerdown", (event) => {
      if (!canDragSchematicNode()) {
        return;
      }
      event.preventDefault();
      event.stopPropagation();
      const mode = event.target.classList.contains("schematic-node-resize") ? "schematic-resize" : "schematic-move";
      startSchematicNodeDrag(event, item, node, mode);
    });
    node.addEventListener("click", (event) => {
      event.preventDefault();
      event.stopPropagation();
      if (state.ignoreNextHotspotClick) {
        state.ignoreNextHotspotClick = false;
        return;
      }
      selectEquipmentSmooth(item.id, { focus: true, targetElement: node, source: "hotspot", scrollDetail: false });
    });
    node.addEventListener("keydown", (event) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        selectEquipmentSmooth(item.id, { focus: true, targetElement: node, source: "hotspot", scrollDetail: false });
      }
    });
    node.addEventListener("pointerenter", () => showEquipmentTooltip(item, node));
    node.addEventListener("pointerleave", hideEquipmentTooltip);
    nodeGroup.appendChild(node);
  });
}

function getSchematicNodeVisual(item) {
  const size = normalizeSchematicSize(item.schematicSize);
  const iconSize = clamp(round1(Number(item.schematicIconSize ?? 1)), 0.6, 2.6);
  const hasNote = Boolean(safeText(item.schematicNote, ""));
  return {
    w: size.w,
    h: size.h,
    rx: Math.min(2.4, round1(size.h / 2.4)),
    iconX: round1(-size.w / 2 + 1.45),
    iconY: round1(-size.h / 2 + 1.35),
    iconRadius: round1(0.78 * iconSize),
    iconTextOffset: round1(0.22 * iconSize),
    iconText: getSchematicIconText(item),
    textX: round1(Math.min(0.6, size.w * 0.04)),
    tagY: round1(-size.h * 0.17),
    nameY: round1(size.h * 0.13),
    noteY: round1(size.h * 0.38),
    statusX: round1(size.w / 2 - 0.86),
    statusY: round1(-size.h / 2 + 0.72),
    statusRadius: round1(Math.max(0.45, Math.min(0.68, size.h * 0.1))),
    resizeX: round1(size.w / 2 - 0.42),
    resizeY: round1(size.h / 2 - 0.42),
    resizeRadius: round1(Math.max(0.42, Math.min(0.66, size.h * 0.09))),
    tag: shortenName(safeText(item.tag, item.id), Math.max(8, Math.round(size.w * 1.3))),
    label: shortenName(safeText(item.schematicLabel, item.name), Math.max(10, Math.round(size.w * 1.8))),
    note: hasNote ? shortenName(item.schematicNote, Math.max(10, Math.round(size.w * 1.8))) : shortenName(item.name, Math.max(10, Math.round(size.w * 1.8))),
  };
}

function getSchematicIconText(item) {
  const iconName = safeText(item.icon, guessIcon(item.type));
  const map = {
    column: "C",
    vessel: "V",
    exchanger: "E",
    pump: "P",
    heater: "H",
    compressor: "K",
    outlet: "O",
    treatment: "T",
  };
  return map[iconName] || safeText(item.type, "E").slice(0, 1).toUpperCase();
}

function canDragSchematicNode() {
  return isAdmin() && isEditMode() && state.diagramViewMode === "schematic" && state.admin.activeTab === "node" && isAdminPanelOpen();
}

function renderSchematicStreams(streamGroup) {
  const streams = getUnitStreams().slice();
  if (state.admin.previewStream?.unit === state.activeUnitId) {
    streams.push(state.admin.previewStream);
  }
  streams.forEach((stream) => {
    const pathD = buildStreamPath(stream, "schematic");
    const points = getStreamControlPoints(stream, "schematic");
    if (!pathD || !points || points.length < 2) {
      return;
    }
    const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
    path.classList.add("stream-path", "schematic-stream-path", `stream-${stream.type}`);
    path.dataset.stream = stream.type;
    path.dataset.pathId = stream.id;
    path.id = getStreamDomId(stream, "schematic");
    path.setAttribute("d", pathD);
    applyStreamVisualStyle(path, stream);
    streamGroup.appendChild(path);

    if (isStreamPathEditing(stream, "schematic") && !stream.preview) {
      const hitPath = document.createElementNS("http://www.w3.org/2000/svg", "path");
      hitPath.setAttribute("d", pathD);
      hitPath.dataset.stream = stream.type;
      hitPath.dataset.pathId = stream.id;
      hitPath.classList.add("stream-hit-path", `stream-${stream.type}`);
      hitPath.addEventListener("pointerdown", (event) => {
        if (event.button !== 0 || !isStreamPathEditing(stream, "schematic")) {
          return;
        }
        event.preventDefault();
        event.stopPropagation();
        beginStreamLineDrag(event, stream, hitPath);
      });
      streamGroup.appendChild(hitPath);

      points.forEach((point, index) => {
        const circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
        circle.setAttribute("cx", point.x);
        circle.setAttribute("cy", point.y);
        circle.setAttribute("r", index === 0 || index === points.length - 1 ? "1.12" : "0.92");
        circle.dataset.pathId = stream.id;
        circle.dataset.index = String(index);
        circle.classList.add("stream-point", `stream-${stream.type}`);
        circle.addEventListener("pointerdown", (event) => {
          if (!isStreamPathEditing(stream, "schematic")) {
            return;
          }
          event.preventDefault();
          event.stopPropagation();
          if (event.altKey && points.length > 2) {
            deleteStreamPoint(stream, index, "schematic");
            return;
          }
          startStreamPointDrag(event, stream, index, circle, { mode: "schematic", adminPathEdit: true });
        });
        streamGroup.appendChild(circle);
      });
    }

    const label = document.createElementNS("http://www.w3.org/2000/svg", "text");
    label.classList.add("stream-label", "schematic-stream-label");
    label.dataset.stream = stream.type;
    const labelPath = document.createElementNS("http://www.w3.org/2000/svg", "textPath");
    labelPath.setAttribute("href", `#${path.id}`);
    labelPath.setAttribute("startOffset", "50%");
    labelPath.setAttribute("text-anchor", "middle");
    labelPath.textContent = safeText(stream.label, `${safeText(stream.fromTag, "from")} -> ${safeText(stream.toTag, "to")}`);
    label.appendChild(labelPath);
    streamGroup.appendChild(label);
  });
}

function getStreamPointsForMode(stream, mode = "image") {
  return getStreamControlPoints(stream, mode);
}

function getPathByShape(points, shape = "elbow") {
  if (!points?.length) {
    return "";
  }
  if (shape === "curve" && points.length >= 4) {
    const [start, c1, c2, end] = points;
    return `M ${start.x} ${start.y} C ${c1.x} ${c1.y}, ${c2.x} ${c2.y}, ${end.x} ${end.y}`;
  }
  return pointsToPath(points);
}

function shortenName(name, maxLength = 20) {
  const value = safeText(name, "");
  if (value.length <= maxLength) {
    return value;
  }
  return `${value.slice(0, Math.max(4, maxLength - 1))}…`;
}

function setActiveUnit(unitId, options = {}) {
  const unit = UNITS[unitId];
  if (!unit) {
    return;
  }

  if (!options.keepTour) {
    stopProcessTour(false);
  }

  state.activeUnitId = unitId;
  state.selectedEquipmentId = null;
  state.activeStream = "all";
  savePreferences({ selectedUnit: unitId });
  els.unitEyebrow.textContent = unit.eyebrow || `${unitId} refinery flow`;
  els.unitTitle.textContent = "RefineryMap";
  els.diagramStage.style.aspectRatio = unit.aspectRatio || "16 / 9";
  els.calibrationLayer.replaceChildren();
  els.equipmentSearch.value = "";
  state.searchQuery = "";
  els.equipmentSearch.closest(".search-control")?.classList.remove("is-active");

  els.unitTabs.querySelectorAll(".unit-tab").forEach((button) => {
    const isActive = button.dataset.unit === unitId;
    button.classList.toggle("is-active", isActive);
    button.setAttribute("aria-selected", String(isActive));
  });

  loadUnitDiagram(unitId);
  renderSearchOptions();
  renderStreamOverlay();
  renderHotspots();
  renderSchematicDiagram();
  renderDiagramByMode();
  renderEquipmentStrip();
  renderEquipmentSections();
  setStreamFilter("all");

  const firstEquipmentId = options.equipmentId || unit.equipmentIds[0];
  if (options.selectFirst !== false && firstEquipmentId) {
    selectEquipment(firstEquipmentId, { force: true, focus: false });
  } else {
    closeDetailPanel();
  }
}

function loadUnitDiagram(unitId) {
  const unit = UNITS[unitId];
  state.diagramReady = false;
  window.clearTimeout(state.diagramFallbackTimer);
  els.flowImage.classList.add("is-hidden");
  showDiagramEmptyState(unitId, "Memuat diagram...");

  if (!unit.image) {
    showDiagramEmptyState(unitId, `Diagram ${unitId} belum tersedia`);
    if (state.diagramViewMode === "image") {
      showToast("Gambar flow gagal dimuat, beralih ke Schematic Mode", "warning");
      setDiagramViewMode("schematic", { silent: true });
    }
    return;
  }

  const loadToken = `${unitId}-${Date.now()}`;
  state.currentDiagramLoadToken = loadToken;

  els.flowImage.onload = () => {
    if (state.currentDiagramLoadToken !== loadToken) {
      return;
    }
    state.diagramReady = true;
    window.clearTimeout(state.diagramFallbackTimer);
    els.flowImage.classList.remove("is-hidden");
    els.diagramEmptyState.classList.add("is-hidden");
    els.flowImage.alt = `Flow diagram ${unitId}`;
    if (state.diagramViewMode === "image") {
      renderDiagramByMode();
    }
  };

  els.flowImage.onerror = () => {
    if (state.currentDiagramLoadToken !== loadToken) {
      return;
    }
    state.diagramReady = false;
    window.clearTimeout(state.diagramFallbackTimer);
    els.flowImage.classList.add("is-hidden");
    showDiagramEmptyState(unitId, "Diagram belum tersedia", `Pastikan file ${unit.image.replace("./", "")} tersedia.`);
    if (state.diagramViewMode === "image") {
      els.selectedStatus.textContent = "Image tidak tersedia, memakai Schematic Mode";
      showToast("Gambar flow gagal dimuat, beralih ke Schematic Mode", "warning");
      setDiagramViewMode("schematic", { silent: true });
    }
  };

  els.flowImage.src = unit.image;
  state.diagramFallbackTimer = window.setTimeout(() => {
    if (state.currentDiagramLoadToken !== loadToken || state.diagramReady || state.activeUnitId !== unitId) {
      return;
    }
    if (state.diagramViewMode === "image") {
      els.selectedStatus.textContent = "Koneksi lambat, memakai Schematic Mode";
      showToast("Koneksi lambat, beralih ke Schematic Mode", "warning");
      setDiagramViewMode("schematic", { silent: true });
    }
  }, 4000);

  window.setTimeout(() => {
    if (els.flowImage.complete && els.flowImage.naturalWidth > 0 && state.activeUnitId === unitId) {
      els.flowImage.onload();
    }
  }, 0);
}

function showDiagramEmptyState(unitId, title, helperText) {
  const unit = UNITS[unitId];
  els.diagramEmptyState.classList.remove("is-hidden");
  els.diagramEmptyState.innerHTML = `
    <div class="empty-copy">
      <strong>${title}</strong>
      <p>${unit.description}</p>
      <p>${helperText || `Subbab equipment tetap aktif. Tambahkan file ${unit.image || "diagram"} untuk mengaktifkan hotspot dan stream overlay unit ini.`}</p>
      <small>Mode ringan Schematic tetap tersedia untuk koneksi lambat atau gambar yang belum tersedia.</small>
    </div>
  `;
}

function renderHotspots() {
  const unitEquipment = getUnitEquipment().filter(hasHotspotCoordinate);
  const nodes = unitEquipment.map((item) => {
    const imagePoint = getEquipmentPositionByMode(item, "image");
    const data = item.operation || op("-", "-", "-", "Normal");
    const statusMeta = getStatusMeta(data.status);
    const normalizedStatus = normalizeEquipmentStatus(data.status);
    const button = document.createElement("button");
    button.className = `hotspot ${statusMeta.className} status-${normalizedStatus}`;
    button.type = "button";
    button.dataset.id = item.id;
    button.dataset.statusLevel = statusMeta.level;
    button.style.setProperty("--x", imagePoint.x);
    button.style.setProperty("--y", imagePoint.y);
    button.style.setProperty("--w", item.w || 4);
    button.style.setProperty("--h", item.h || 4);
    button.style.setProperty("--marker-size", `${item.size || 34}px`);
    button.setAttribute("aria-label", `${item.tag} ${item.name}`);
    button.innerHTML = `
      <span class="hotspot-marker">${iconMarkup(item.icon)}</span>
      <span class="hotspot-label">${item.tag}</span>
      <span class="hotspot-status-badge" aria-hidden="true"></span>
      <span class="hotspot-resize" title="Drag untuk mengubah ukuran icon" aria-hidden="true"></span>
    `;
    applyStatusVisual(button, data.status);
    button.addEventListener("pointerenter", () => showEquipmentTooltip(item, button));
    button.addEventListener("pointerleave", hideEquipmentTooltip);
    button.addEventListener("focus", () => showEquipmentTooltip(item, button));
    button.addEventListener("blur", hideEquipmentTooltip);
    button.addEventListener("pointerdown", (event) => {
      if (!state.calibrationMode) {
        return;
      }
      event.preventDefault();
      event.stopPropagation();
      startEquipmentCalibrationDrag(event, item, button, event.target.closest(".hotspot-resize") ? "resize" : "move");
    });
    button.addEventListener("click", (event) => {
      event.preventDefault();
      event.stopPropagation();
      hideEquipmentTooltip();
      if (state.ignoreNextHotspotClick) {
        state.ignoreNextHotspotClick = false;
        return;
      }
      if (state.calibrationMode) {
        selectEquipment(item.id, { focus: false, allowToggle: true });
        return;
      }
      selectEquipmentSmooth(item.id, { focus: true, targetElement: button, source: "hotspot", scrollDetail: false });
    });
    return button;
  });
  els.hotspotLayer.replaceChildren(...nodes);
  els.hotspotLayer.classList.toggle("icons-transparent", els.iconOpacityToggle.checked);
  renderMiniMap();
  applyLayerPreferences();
}

function renderEquipmentStrip() {
  const tabs = getFilteredUnitEquipment().map((item) => {
    const button = document.createElement("button");
    button.className = "equipment-tab";
    button.type = "button";
    button.dataset.id = item.id;
    button.innerHTML = `<span class="icon-wrap">${iconMarkup(item.icon)}</span><span class="tab-copy"><strong>${item.tag}</strong><span>${item.name}</span></span>`;
    applyStatusVisual(button, item.operation?.status);
    button.addEventListener("click", () => selectEquipmentSmooth(item.id, { focus: true, force: true }));
    return button;
  });
  els.equipmentStrip.replaceChildren(...tabs);
  updateActiveNodes(state.selectedEquipmentId);
}

function renderStreamOverlay() {
  const unit = getActiveUnit();
  const streams = getUnitStreams(unit.id).slice();
  if (state.admin.previewStream?.unit === unit.id) {
    streams.push(state.admin.previewStream);
  }
  const nodes = [];
  streams.forEach((stream) => {
    const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
    path.setAttribute("d", buildStreamPath(stream, "image"));
    path.id = getStreamDomId(stream);
    path.dataset.stream = stream.type;
    path.dataset.pathId = stream.id;
    path.classList.add("stream-path", `stream-${stream.type}`);
    path.classList.toggle("is-preview", Boolean(stream.preview));
    applyStreamVisualStyle(path, stream);
    const title = document.createElementNS("http://www.w3.org/2000/svg", "title");
    title.textContent = stream.label;
    path.appendChild(title);
    nodes.push(path);

    const editablePoints = getStreamControlPoints(stream, "image");
    const canEditPath = (state.calibrationMode || isStreamPathEditing(stream, "image")) && editablePoints.length >= 2 && !stream.preview;
    if (canEditPath) {
      const hitPath = document.createElementNS("http://www.w3.org/2000/svg", "path");
      hitPath.setAttribute("d", buildStreamPath(stream, "image"));
      hitPath.dataset.stream = stream.type;
      hitPath.dataset.pathId = stream.id;
      hitPath.classList.add("stream-hit-path", `stream-${stream.type}`);
      hitPath.addEventListener("pointerdown", (event) => {
        if ((!state.calibrationMode && !isStreamPathEditing(stream, "image")) || event.button !== 0) {
          return;
        }
        event.preventDefault();
        event.stopPropagation();
        beginStreamLineDrag(event, stream, hitPath);
      });
      nodes.push(hitPath);

      editablePoints.forEach((point, index) => {
        const circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
        circle.setAttribute("cx", point.x);
        circle.setAttribute("cy", point.y);
        circle.setAttribute("r", index === 0 || index === editablePoints.length - 1 ? "1.12" : "0.92");
        circle.dataset.pathId = stream.id;
        circle.dataset.index = String(index);
        circle.classList.add("stream-point", `stream-${stream.type}`);
        circle.addEventListener("pointerdown", (event) => {
          if (!state.calibrationMode && !isStreamPathEditing(stream, "image")) {
            return;
          }
          event.preventDefault();
          event.stopPropagation();
          if (event.altKey && editablePoints.length > 2) {
            deleteStreamPoint(stream, index, "image");
            return;
          }
          startStreamPointDrag(event, stream, index, circle, { mode: "image", adminPathEdit: isStreamPathEditing(stream, "image") });
        });
        nodes.push(circle);
      });
    }
  });
  nodes.push(...renderStreamLabels(streams));
  els.streamOverlay.replaceChildren(...nodes);
  updateStreamLabelVisibility();
  if (state.diagramViewMode === "schematic") {
    renderSchematicDiagram();
  }
}

function setStreamFilter(type) {
  const nextType = STREAM_TYPES[type] ? type : "all";
  state.activeStream = nextType;
  savePreferences({ selectedStream: nextType });
  if (els.streamDescription) {
    els.streamDescription.textContent = STREAM_DESCRIPTIONS[nextType] || STREAM_DESCRIPTIONS.all;
  }

  els.streamControls.querySelectorAll(".stream-button").forEach((button) => {
    const isActive = button.dataset.stream === nextType;
    button.classList.toggle("is-active", isActive);
    button.setAttribute("aria-pressed", String(isActive));
  });

  const filtering = nextType !== "all";
  els.diagramStage.classList.toggle("stream-filtering", filtering);

  els.diagramStage.querySelectorAll(".stream-path").forEach((path) => {
    const isMatch = path.dataset.stream === nextType;
    path.classList.toggle("is-active", filtering && isMatch);
    path.classList.toggle("is-dimmed", filtering && !isMatch);
  });
  els.diagramStage.querySelectorAll(".stream-label").forEach((label) => {
    const isMatch = label.dataset.stream === nextType;
    label.classList.toggle("is-dimmed", filtering && !isMatch);
  });

  getEquipmentNodes().forEach((node) => {
    const item = EQUIPMENT_BY_ID.get(node.dataset.id);
    const relevant = !filtering || item?.streams?.includes(nextType);
    node.classList.toggle("is-stream-muted", !relevant);
  });
  updateStreamLabelVisibility();
}

function selectEquipment(equipmentId, options = {}) {
  const item = EQUIPMENT_BY_ID.get(equipmentId);
  if (!item) {
    return;
  }

  if (!options.fromTour) {
    stopProcessTour(false);
  }

  if (item.unit !== state.activeUnitId) {
    setActiveUnit(item.unit, { selectFirst: false, keepTour: options.fromTour });
  }

  if (state.selectedEquipmentId === item.id && options.allowToggle && !options.force) {
    closeDetailPanel();
    return;
  }

  state.selectedEquipmentId = item.id;
  state.admin.selectedEquipmentId = item.id;
  els.workspace.classList.remove("detail-closed");
  els.detailPanel.classList.remove("is-hidden");
  els.detailPanel.removeAttribute("aria-hidden");
  updateActiveNodes(item.id);
  updateDetailPanel(item);
  updateSelectedEquipmentSummary(item);
  setSelectedStatus(item, `${item.tag} dipilih`);
  savePreferences({ selectedUnit: item.unit, lastSelectedEquipment: item.id });
  if (!options.fromTour && options.source !== "hotspot") {
    showToast(`${item.tag} dipilih`, "info", item.name);
  }

  if (options.focus) {
    if (state.layerPreferences.autoFocus) {
      focusEquipment(item.tag, { preserveZoom: true });
    } else {
      focusSelectedEquipment(item);
    }
    pulseActiveHotspot(item.id);
    if (options.scrollDetail !== false) {
      scrollDetailPanelForSelection();
    }
  }

  if (isPresentationMode()) {
    showPresentationEquipmentOverlay(item, options.targetElement || getHotspotElement(item.id), options.tourStep || null);
    hideFullscreenEquipmentCard();
  } else if (isDiagramFullscreen()) {
    showFullscreenEquipmentCard(item);
  }
}

function selectEquipmentSmooth(tagOrId, options = {}) {
  const item = findEquipmentByTag(tagOrId) || EQUIPMENT_BY_ID.get(tagOrId);
  if (!item) {
    return;
  }
  if (!options.fromTour && isDuplicateEquipmentSelection(item.id)) {
    pulseActiveHotspot(item.id);
    return;
  }
  const panelOpen = Boolean(els.detailPanel && !els.detailPanel.classList.contains("is-hidden"));
  if (state.selectedEquipmentId === item.id && panelOpen && !options.fromTour && !options.refresh) {
    updateActiveNodes(item.id);
    if (options.focus) {
      focusSelectedEquipment(item);
      pulseActiveHotspot(item.id);
    }
    if (isPresentationMode()) {
      showPresentationEquipmentOverlay(item, options.targetElement || getHotspotElement(item.id), options.tourStep || null);
      hideFullscreenEquipmentCard();
    }
    return;
  }
  selectEquipment(item.id, { focus: options.focus !== false, force: options.force === true, ...options });
}

function isDuplicateEquipmentSelection(equipmentId) {
  const now = performance.now();
  const isDuplicate = state.selectionGuard.id === equipmentId && now - state.selectionGuard.time < 220;
  state.selectionGuard.id = equipmentId;
  state.selectionGuard.time = now;
  return isDuplicate;
}

function updateDetailPanel(item = EQUIPMENT_BY_ID.get(state.selectedEquipmentId)) {
  if (!item) {
    return;
  }

  const unit = UNITS[item.unit] || {};
  els.equipmentType.textContent = `${safeText(item.type, "Equipment")} | ${safeText(item.tag, "-")}`;
  els.equipmentName.textContent = safeText(item.name, "Equipment dipilih");
  els.equipmentDescription.textContent = safeText(item.description, "Belum ada deskripsi equipment.");
  els.detailIcon.innerHTML = iconMarkup(item.icon);
  renderMetadata(item, unit);
  setEquipmentPhoto(item);
  renderProcessPath(item);
  renderOperationSnapshot(item);
  renderDetailList(els.equipmentFunction, item.details?.function, "Belum ada data.");
  renderDetailList(els.equipmentOperation, item.details?.operation, "Belum ada data.");
  renderDetailList(els.equipmentWatch, item.details?.watch, "Belum ada data.");
}

function updateSelectedEquipmentSummary(item) {
  const meta = getStatusMeta(item.operation?.status);
  els.selectedSummary.classList.remove("is-hidden", "status-normal", "status-warning", "status-alarm", "status-critical", "status-running", "status-success", "status-danger", "status-muted", "status-neutral");
  els.selectedSummary.classList.add(meta.className);
  els.summaryStatus.className = `summary-status ${meta.className}`;
  els.summaryTag.textContent = safeText(item.tag, "-");
  els.summaryName.textContent = safeText(item.name, "Equipment");
  els.summaryStatusText.textContent = meta.label;
  els.summaryStatusText.className = `summary-chip ${meta.className}`;
}

function setSelectedStatus(item, message) {
  const meta = getStatusMeta(item?.operation?.status);
  els.selectedStatus.className = `status-pill ${meta.className}`;
  els.selectedStatus.textContent = message || meta.shortMessage;
}

function renderEquipmentSections() {
  const unit = getActiveUnit();
  let resultCount = 0;
  const cards = unit.sections.map((section) => {
    const card = document.createElement("article");
    card.className = "unit-section-card";
    const items = section.equipmentIds.map((id) => EQUIPMENT_BY_ID.get(id)).filter(Boolean).filter(matchesEquipmentSearch);
    resultCount += items.length;
    if (!items.length && state.searchQuery) {
      return null;
    }
    card.innerHTML = `
      <header>
        <h3>${section.title}</h3>
        <p>${section.summary}</p>
      </header>
      <div class="section-equipment-list"></div>
    `;
    const list = card.querySelector(".section-equipment-list");
    const buttons = items.map((item) => {
      const button = document.createElement("button");
      button.className = "section-equipment-button";
      button.type = "button";
      button.dataset.id = item.id;
      button.innerHTML = `<strong>${item.tag}</strong><span>${item.name}</span>`;
      button.addEventListener("click", () => selectEquipmentSmooth(item.id, { focus: true, force: true }));
      return button;
    });
    list.replaceChildren(...buttons);
    return card;
  }).filter(Boolean);

  if (state.searchQuery && !resultCount) {
    const totalMatches = getSearchResults().length;
    const emptyState = document.createElement("article");
    emptyState.className = "search-empty-state";
    emptyState.innerHTML = totalMatches
      ? `
        <strong>${totalMatches} hasil di unit lain</strong>
        <span>Aktifkan hasil dari kotak pencarian untuk pindah unit.</span>
      `
      : `
        <strong>Equipment tidak ditemukan</strong>
        <span>Coba gunakan tag, nama equipment, atau area lain.</span>
      `;
    els.equipmentSections.replaceChildren(emptyState);
    return;
  }

  els.equipmentSections.replaceChildren(...cards);
  updateActiveNodes(state.selectedEquipmentId);
}

function focusEquipment(tagOrId, options = {}) {
  const item = findEquipmentByTag(tagOrId) || EQUIPMENT_BY_ID.get(tagOrId);
  if (!item) {
    return;
  }
  focusSelectedEquipment(item);
  if (options.pulse !== false) {
    pulseActiveHotspot(item.id);
  }
}

function focusSelectedEquipment(item) {
  if (!item || !hasHotspotCoordinate(item)) {
    els.diagramScroll.scrollTo({ left: 0, top: 0, behavior: "smooth" });
    return;
  }

  const mode = state.diagramViewMode === "schematic" ? "schematic" : "image";
  const position = getEquipmentPositionByMode(item, mode);
  const targetLeft = (position.x / 100) * els.diagramStage.offsetWidth - els.diagramScroll.clientWidth / 2;
  const targetTop = (position.y / 100) * els.diagramStage.offsetHeight - els.diagramScroll.clientHeight / 2;
  els.diagramScroll.scrollTo({
    left: Math.max(0, targetLeft),
    top: Math.max(0, targetTop),
    behavior: "smooth",
  });
}

function pulseActiveHotspot(equipmentId) {
  els.diagramStage.querySelectorAll(".hotspot.is-pulsing, .schematic-node.is-pulsing").forEach((node) => {
    node.classList.remove("is-pulsing");
  });
  window.clearTimeout(pulseActiveHotspot.timer);
  if (!equipmentId) {
    return;
  }
  const node = getHotspotElement(equipmentId);
  if (!node) {
    return;
  }
  node.classList.add("is-pulsing");
  pulseActiveHotspot.timer = window.setTimeout(() => {
    node.classList.remove("is-pulsing");
  }, 1800);
}

function scrollDetailPanelForSelection() {
  els.detailPanel.scrollTo?.({ top: 0, behavior: "smooth" });
  if (window.matchMedia("(max-width: 1180px)").matches) {
    els.detailPanel.scrollIntoView({ behavior: "smooth", block: "start" });
  }
}

function startProcessTour() {
  const steps = getProcessTourSteps(state.activeUnitId);
  if (!steps.length) {
    els.selectedStatus.textContent = "Alur proses unit ini belum tersedia";
    return;
  }

  stopProcessTour(false);
  state.tour.running = true;
  state.tour.paused = false;
  state.tour.index = 0;
  state.tour.unitId = state.activeUnitId;
  updateTourControls();
  showToast("Alur proses dijalankan", "info", UNITS[state.activeUnitId]?.title || state.activeUnitId);
  runTourStep();
  state.tour.timer = window.setInterval(runTourStep, getProcessTourStepDuration(steps[0]));
}

function pauseProcessTour() {
  if (!state.tour.running) {
    return;
  }
  state.tour.paused = !state.tour.paused;
  updateTourControls();
  els.selectedStatus.textContent = state.tour.paused ? "Alur proses dijeda" : "Alur proses dilanjutkan";
  showToast(state.tour.paused ? "Alur proses dijeda" : "Alur proses dilanjutkan", "info");
}

function stopProcessTour(resetStatus = true) {
  if (state.tour.timer) {
    window.clearInterval(state.tour.timer);
    state.tour.timer = null;
  }
  state.tour.running = false;
  state.tour.paused = false;
  state.tour.index = 0;
  setLearningMarker(null);
  updateTourControls();
  if (resetStatus) {
    setStreamFilter("all");
    const item = EQUIPMENT_BY_ID.get(state.selectedEquipmentId);
    els.selectedStatus.textContent = item ? `${item.tag} dipilih` : "Alur proses dihentikan";
    showToast("Alur proses dihentikan", "info");
  }
}

function runTourStep() {
  if (!state.tour.running || state.tour.paused) {
    return;
  }

  const steps = getProcessTourSteps(state.tour.unitId);
  if (state.tour.index >= steps.length) {
    stopProcessTour(false);
    els.stepCounter.classList.add("is-hidden");
    els.selectedStatus.textContent = "Alur proses selesai";
    showToast("Alur proses selesai", "success");
    return;
  }

  const step = steps[state.tour.index];
  const item = getEquipmentFromTourStep(step);
  if (!item) {
    console.warn("Tour step dilewati karena equipment tidak valid.", step);
    state.tour.index += 1;
    return;
  }
  selectEquipment(item.id, { focus: step.autoFocus !== false, force: true, fromTour: true, tourStep: step });
  setStreamFilter(step.stream || "all");
  setLearningMarker(item.id);
  els.stepCounter.textContent = `Step ${state.tour.index + 1}/${steps.length}`;
  els.stepCounter.classList.remove("is-hidden");
  els.selectedStatus.textContent = `Step ${state.tour.index + 1}/${steps.length}: ${step.label}`;
  state.tour.index += 1;
  if (state.tour.timer) {
    window.clearInterval(state.tour.timer);
    state.tour.timer = window.setInterval(runTourStep, getProcessTourStepDuration(step));
  }
}

function setButtonLabel(button, label, title = label) {
  const labelNode = button.querySelector(".button-label");
  if (labelNode) {
    labelNode.textContent = label;
  } else {
    button.textContent = label;
  }
  button.title = title;
}

function setButtonIcon(button, symbolId) {
  const use = button.querySelector("use");
  if (!use) {
    return;
  }
  use.setAttribute("href", `#${symbolId}`);
  use.setAttributeNS("http://www.w3.org/1999/xlink", "href", `#${symbolId}`);
}

function toggleCalibrationMode(force) {
  const wantsEnable = typeof force === "boolean" ? force : !state.calibrationMode;
  if (wantsEnable && !isAdmin()) {
    requireAdmin("Mode kalibrasi");
    return;
  }
  if (wantsEnable && !isEditMode()) {
    requireEditMode("Mode kalibrasi");
    return;
  }
  if (wantsEnable && state.diagramViewMode === "schematic") {
    showToast("Kalibrasi hanya tersedia di Image Mode", "warning");
    return;
  }
  state.calibrationMode = typeof force === "boolean" ? force : !state.calibrationMode;
  if (state.calibrationMode && state.streamHidden) {
    toggleStreamVisibility(false);
  }
  els.diagramStage.classList.toggle("is-calibrating", state.calibrationMode);
  els.calibrationToggle.classList.toggle("is-active", state.calibrationMode);
  els.calibrationToggle.setAttribute("aria-pressed", String(state.calibrationMode));
  renderStreamOverlay();
  setStreamFilter(state.activeStream);
  els.selectedStatus.textContent = state.calibrationMode
    ? "Kalibrasi aktif: drag icon untuk posisi, handle biru untuk ukuran, drag titik stream atau garis stream untuk mengatur line."
    : "Mode kalibrasi nonaktif";
  showToast(state.calibrationMode ? "Mode kalibrasi aktif" : "Mode kalibrasi nonaktif", state.calibrationMode ? "warning" : "info");
}

function toggleStreamVisibility(force) {
  state.streamHidden = typeof force === "boolean" ? force : !state.streamHidden;
  els.diagramStage.classList.toggle("stream-hidden", state.streamHidden);
  els.visualToggle.classList.toggle("is-active", state.streamHidden);
  setButtonLabel(els.visualToggle, state.streamHidden ? "Show Stream" : "Hide Stream", state.streamHidden ? "Show Stream" : "Hide Stream");
  setButtonIcon(els.visualToggle, state.streamHidden ? "i-eye" : "i-stream");
  els.visualToggle.setAttribute("aria-label", state.streamHidden ? "Tampilkan animasi stream" : "Sembunyikan animasi stream");
  els.visualToggle.setAttribute("aria-pressed", String(state.streamHidden));
  applyLayerPreferences();
  els.selectedStatus.textContent = state.streamHidden ? "Stream overlay disembunyikan" : "Stream overlay ditampilkan";
  showToast(state.streamHidden ? "Stream disembunyikan" : "Stream ditampilkan", "info");
}

function getDiagramPercentCoordinate(event) {
  const rect = els.diagramStage.getBoundingClientRect();
  const x = clamp(((event.clientX - rect.left) / rect.width) * 100, 0, 100);
  const y = clamp(((event.clientY - rect.top) / rect.height) * 100, 0, 100);
  return {
    x: Number(x.toFixed(1)),
    y: Number(y.toFixed(1)),
  };
}

async function exportDiagram() {
  if (state.isExporting) {
    return;
  }
  state.isExporting = true;
  setExportLoading(true);
  els.selectedStatus.textContent = "Membuat export PNG...";
  const filename = `refinerymap-export-${getTimestampForFilename(new Date())}.png`;

  try {
    const html2canvas = await waitForHtml2Canvas();
    if (!html2canvas) {
      showToast("Export PNG gagal", "error", "html2canvas belum siap. Coba ulang beberapa detik lagi.");
      els.selectedStatus.textContent = "Export PNG membutuhkan html2canvas";
      return;
    }

    const canvas = await html2canvas(els.diagramStage, {
      backgroundColor: "#ffffff",
      scale: Math.min(2, window.devicePixelRatio || 1.5),
      useCORS: true,
      logging: false,
    });
    await downloadCanvasPng(canvas, filename);
    els.selectedStatus.textContent = "Export PNG diagram dibuat";
    showToast("Export PNG berhasil", "success", filename);
  } catch (error) {
    console.warn("html2canvas gagal, memakai fallback canvas manual.", error);
    try {
      const canvas = buildManualExportCanvas({ includeImage: true });
      assertCanvasReadable(canvas);
      await downloadCanvasPng(canvas, filename);
      els.selectedStatus.textContent = "Export PNG fallback dibuat";
      showToast("Export PNG berhasil", "success", "Fallback canvas manual digunakan.");
    } catch (fallbackError) {
      try {
        const canvas = buildManualExportCanvas({ includeImage: false });
        await downloadCanvasPng(canvas, filename);
        els.selectedStatus.textContent = "Export PNG dibuat tanpa bitmap utama";
        showToast("Export PNG dibuat", "warning", "Bitmap utama diblokir browser, overlay tetap diexport.");
        console.warn("Bitmap diagram lokal tidak dapat diexport dari file://, fallback overlay dipakai.", fallbackError);
      } catch (finalError) {
        els.selectedStatus.textContent = "Export PNG gagal";
        showToast("Export PNG gagal", "error", "Browser tidak dapat membuat file PNG saat ini.");
        console.error(finalError);
      }
    }
  } finally {
    state.isExporting = false;
    setExportLoading(false);
  }
}

function waitForHtml2Canvas(timeout = 5000) {
  if (window.html2canvas) {
    return Promise.resolve(window.html2canvas);
  }
  return new Promise((resolve) => {
    const startedAt = Date.now();
    const timer = window.setInterval(() => {
      if (window.html2canvas) {
        window.clearInterval(timer);
        resolve(window.html2canvas);
        return;
      }
      if (Date.now() - startedAt >= timeout) {
        window.clearInterval(timer);
        resolve(null);
      }
    }, 120);
  });
}

function setExportLoading(isLoading) {
  els.exportPng.disabled = isLoading;
  els.exportPng.classList.toggle("is-loading", isLoading);
  els.exportPng.setAttribute("aria-busy", String(isLoading));
  setButtonLabel(els.exportPng, isLoading ? "Exporting" : "Export PNG", isLoading ? "Export sedang berjalan" : "Export PNG");
}

function getTimestampForFilename(date = new Date()) {
  return `${date.getFullYear()}${String(date.getMonth() + 1).padStart(2, "0")}${String(date.getDate()).padStart(2, "0")}-${String(date.getHours()).padStart(2, "0")}${String(date.getMinutes()).padStart(2, "0")}`;
}

async function toggleFullscreen() {
  try {
    if (!document.fullscreenElement) {
      await els.diagramPanel.requestFullscreen();
    } else {
      await document.exitFullscreen();
    }
  } catch (error) {
    els.selectedStatus.textContent = "Fullscreen tidak tersedia di browser ini";
    showToast("Fullscreen gagal", "error", "Browser tidak mengizinkan fullscreen saat ini.");
  }
}

function updateFullscreenButton() {
  const isFullscreen = isDiagramFullscreen();
  setButtonLabel(els.fullscreenToggle, isFullscreen ? "Keluar Fullscreen" : "Fullscreen", isFullscreen ? "Keluar Fullscreen" : "Fullscreen");
  setButtonIcon(els.fullscreenToggle, isFullscreen ? "i-minimize" : "i-maximize");
  els.fullscreenToggle.setAttribute("aria-label", isFullscreen ? "Keluar dari fullscreen diagram panel" : "Aktifkan fullscreen diagram panel");
  els.fullscreenToggle.setAttribute("aria-pressed", String(isFullscreen));
  if (state.isFullscreen !== isFullscreen) {
    showToast(isFullscreen ? "Fullscreen aktif" : "Fullscreen nonaktif", "info");
  }
  state.isFullscreen = isFullscreen;
}

function bindFullscreenEquipmentCard() {
  els.fullscreenEquipmentClose?.addEventListener("click", hideFullscreenEquipmentCard);
}

function isDiagramFullscreen() {
  return document.fullscreenElement === els.diagramPanel || els.diagramPanel.classList.contains("is-fullscreen");
}

function isFullscreenEquipmentCardVisible() {
  return Boolean(els.fullscreenEquipmentCard && !els.fullscreenEquipmentCard.classList.contains("is-hidden"));
}

function showFullscreenEquipmentCard(item) {
  if (!els.fullscreenEquipmentCard || !item || isPresentationMode()) {
    return;
  }
  renderFullscreenEquipmentCard(item);
  els.fullscreenEquipmentCard.classList.remove("is-hidden");
  els.fullscreenEquipmentCard.classList.add("is-visible");
}

function hideFullscreenEquipmentCard() {
  if (!els.fullscreenEquipmentCard) {
    return;
  }
  els.fullscreenEquipmentCard.classList.add("is-hidden");
  els.fullscreenEquipmentCard.classList.remove("is-visible");
}

function renderFullscreenEquipmentCard(item) {
  const meta = getStatusMeta(item.operation?.status);
  els.fullscreenEquipmentType.textContent = `${safeText(item.type, "Equipment")} | ${safeText(item.tag, "-")}`;
  els.fullscreenEquipmentName.textContent = safeText(item.name, "Equipment dipilih");
  els.fullscreenEquipmentStatus.textContent = meta.label;
  els.fullscreenEquipmentStatus.className = `status-chip ${meta.className}`;
  setImageWithFallback(els.fullscreenEquipmentImage, getEquipmentImageSrc(item), safeText(item.tag, "Equipment"));
  els.fullscreenEquipmentImage.alt = `Foto referensi ${safeText(item.name, "Equipment")}`;
  renderFullscreenFunctionList(item);
}

function renderFullscreenFunctionList(item) {
  const entries = Array.isArray(item.details?.function)
    ? item.details.function.map((entry) => safeText(entry, "")).filter(Boolean).slice(0, 3)
    : [];
  renderDetailList(els.fullscreenEquipmentFunction, entries, "Belum ada data fungsi utama.");
}

function renderSearchOptions() {
  const items = els.searchAllUnits.checked ? EQUIPMENT : getUnitEquipment();
  searchOptionByValue.clear();
  const options = items.map((item) => {
    const option = document.createElement("option");
    const value = `${item.tag} - ${item.name} [${item.unit}]`;
    option.value = value;
    option.label = `${item.area} | ${item.section}`;
    searchOptionByValue.set(value.toLowerCase(), item.id);
    return option;
  });
  els.equipmentSearchList.replaceChildren(...options);
}

function handleSearchInput() {
  state.searchQuery = els.equipmentSearch.value.trim().toLowerCase();
  state.admin.searchCursor = -1;
  state.admin.searchResults = performEquipmentSearch(state.searchQuery);
  els.equipmentSearch.closest(".search-control")?.classList.toggle("is-active", Boolean(state.searchQuery));
  renderEquipmentStrip();
  renderEquipmentSections();
  updateSearchFeedback();
  renderSearchResults(state.admin.searchResults);
  highlightSearchResults(state.admin.searchResults);
}

function clearSearch() {
  els.equipmentSearch.value = "";
  state.searchQuery = "";
  els.equipmentSearch.closest(".search-control")?.classList.remove("is-active");
  renderSearchOptions();
  renderEquipmentStrip();
  renderEquipmentSections();
  updateSearchFeedback();
  state.admin.searchResults = [];
  state.admin.searchCursor = -1;
  highlightSearchResults([]);
}

function selectSearchResult() {
  const item = state.admin.searchCursor >= 0
    ? state.admin.searchResults[state.admin.searchCursor]
    : findEquipmentBySearch(els.equipmentSearch.value);
  if (!item) {
    els.selectedStatus.textContent = "Equipment tidak ditemukan";
    state.searchQuery = els.equipmentSearch.value.trim().toLowerCase();
    els.equipmentSearch.closest(".search-control")?.classList.toggle("is-active", Boolean(state.searchQuery));
    renderEquipmentStrip();
    renderEquipmentSections();
    updateSearchFeedback();
    showToast("Equipment tidak ditemukan", "warning", "Coba gunakan tag, nama equipment, atau area lain.");
    return;
  }
  els.equipmentSearch.value = `${item.tag} - ${item.name} [${item.unit}]`;
  state.searchQuery = "";
  els.equipmentSearch.closest(".search-control")?.classList.remove("is-active");
  renderEquipmentStrip();
  renderEquipmentSections();
  updateSearchFeedback();
  selectEquipmentSmooth(item.id, { focus: true, force: true });
}

function updateSearchFeedback() {
  if (!els.searchFeedback) {
    return;
  }
  if (!state.searchQuery) {
    els.searchFeedback.textContent = "";
    return;
  }
  const count = getSearchResults().length;
  els.searchFeedback.textContent = count
    ? `${count} hasil ditemukan${els.searchAllUnits.checked ? " di semua unit" : ""}. Enter memilih hasil pertama.`
    : "Equipment tidak ditemukan. Coba tag, nama equipment, atau area lain.";
}

function getSearchResults() {
  if (!state.searchQuery) {
    return [];
  }
  const source = els.searchAllUnits.checked ? EQUIPMENT : getUnitEquipment();
  return source.filter(matchesEquipmentSearch);
}

function findEquipmentBySearch(value) {
  const query = value.trim().toLowerCase();
  if (!query) {
    return null;
  }

  const exactId = searchOptionByValue.get(query);
  if (exactId) {
    return EQUIPMENT_BY_ID.get(exactId);
  }

  const source = els.searchAllUnits.checked ? EQUIPMENT : getUnitEquipment();
  return source.find((item) => {
    const haystack = [item.id, item.tag, item.name, item.type, item.area, item.section, item.unit].join(" ").toLowerCase();
    return haystack.includes(query);
  });
}

function closeDetailPanel() {
  state.selectedEquipmentId = null;
  state.selectionGuard = { id: "", time: 0 };
  updateActiveNodes(null);
  pulseActiveHotspot(null);
  els.selectedSummary.classList.add("is-hidden");
  els.workspace.classList.add("detail-closed");
  els.detailPanel.classList.add("is-hidden");
  els.detailPanel.setAttribute("aria-hidden", "true");
  els.selectedStatus.textContent = "Tidak ada equipment dipilih";
  els.selectedStatus.className = "status-pill";
}

function updateActiveNodes(equipmentId) {
  document.body.classList.toggle("has-selected-equipment", Boolean(equipmentId));
  getEquipmentNodes().forEach((node) => {
    node.classList.toggle("is-active", node.dataset.id === equipmentId);
  });
  renderMiniMap();
}

function updateTourControls() {
  setButtonLabel(els.processRun, state.tour.running ? "Restart Alur" : "Jalankan Alur Proses", state.tour.running ? "Restart alur proses" : "Jalankan alur proses");
  setButtonLabel(els.processPause, state.tour.paused ? "Lanjutkan" : "Pause", state.tour.paused ? "Lanjutkan alur proses" : "Pause alur proses");
  setButtonIcon(els.processPause, state.tour.paused ? "i-play" : "i-pause");
  els.processPause.classList.toggle("is-hidden", !state.tour.running);
  els.processStop.classList.toggle("is-hidden", !state.tour.running);
  els.processRun.classList.toggle("is-active", state.tour.running);
  els.processRun.setAttribute("aria-pressed", String(state.tour.running));
  els.processPause.setAttribute("aria-pressed", String(state.tour.paused));
  els.stepCounter.classList.toggle("is-hidden", !state.tour.running);
}

function setLearningMarker(equipmentId) {
  getEquipmentNodes().forEach((node) => {
    node.classList.toggle("is-learning", node.dataset.id === equipmentId);
  });
}

function loadCalibrationOverrides() {
  try {
    const raw = localStorage.getItem(CALIBRATION_STORAGE_KEY);
    if (!raw) {
      return;
    }
    const parsed = JSON.parse(raw);
    state.calibrationOverrides = {
      equipment: parsed.equipment || {},
      streams: parsed.streams || {},
    };

    Object.entries(state.calibrationOverrides.equipment).forEach(([id, value]) => {
      const item = EQUIPMENT_BY_ID.get(id);
      if (!item) {
        return;
      }
      ["x", "y", "w", "h", "size"].forEach((key) => {
        if (Number.isFinite(value[key])) {
          item[key] = value[key];
        }
      });
      if (Number.isFinite(value.x) && Number.isFinite(value.y)) {
        item.imagePosition = {
          x: round1(clamp(Number(value.x), 0, 100)),
          y: round1(clamp(Number(value.y), 0, 100)),
        };
      }
    });

    Object.entries(state.calibrationOverrides.streams).forEach(([id, points]) => {
      const stream = STREAM_BY_ID.get(id);
      if (!stream || !Array.isArray(points) || points.length < 2) {
        return;
      }
      const normalizedPoints = normalizePointArray(points);
      stream.points = normalizedPoints;
      stream.imageControlPoints = normalizedPoints;
      stream.imagePath = getPathByShape(normalizedPoints, stream.shape || "elbow");
      stream.useCustomImagePath = true;
    });
  } catch (error) {
    console.warn("Kalibrasi tersimpan tidak dapat dibaca.", error);
  }
}

function loadPreferences() {
  try {
    const raw = localStorage.getItem(PREFERENCES_STORAGE_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch (error) {
    console.warn("Preferensi UI tidak bisa dibaca.", error);
    return {};
  }
}

function savePreferences(nextValues) {
  try {
    const current = loadPreferences();
    safeLocalStorageSet(PREFERENCES_STORAGE_KEY, { ...current, ...nextValues });
  } catch (error) {
    console.warn("Preferensi UI tidak bisa disimpan.", error);
  }
}

function getSafeEquipmentPreference(equipmentId, unitId) {
  const item = EQUIPMENT_BY_ID.get(equipmentId);
  return item?.unit === unitId ? item.id : null;
}

function persistCalibrationOverrides() {
  safeLocalStorageSet(CALIBRATION_STORAGE_KEY, state.calibrationOverrides);
}

function saveEquipmentCalibration(item) {
  state.calibrationOverrides.equipment[item.id] = {
    x: round1(item.x),
    y: round1(item.y),
    w: round1(item.w || 4),
    h: round1(item.h || 4),
    size: Math.round(item.size || 34),
  };
  persistCalibrationOverrides();
}

function saveStreamCalibration(stream) {
  const points = normalizePointArray(stream.imageControlPoints).length >= 2 ? normalizePointArray(stream.imageControlPoints) : normalizePointArray(stream.points);
  state.calibrationOverrides.streams[stream.id] = points.map((point) => ({
    x: round1(point.x),
    y: round1(point.y),
  }));
  persistCalibrationOverrides();
}

function startSchematicNodeDrag(event, item, node, mode = "schematic-move") {
  const position = getEquipmentPositionByMode(item, "schematic");
  const size = normalizeSchematicSize(item.schematicSize);
  state.admin.selectedNodeId = item.id;
  state.calibrationDrag = {
    type: "equipment",
    mode,
    item,
    node,
    pointerId: event.pointerId,
    moved: false,
    startPoint: getDiagramPercentCoordinate(event),
    x: position.x,
    y: position.y,
    schematicW: size.w,
    schematicH: size.h,
  };
  try {
    node.setPointerCapture?.(event.pointerId);
  } catch (error) {
    console.warn("Pointer capture schematic node tidak tersedia, drag tetap dilanjutkan.", error);
  }
  node.addEventListener("pointermove", handleCalibrationDrag);
  node.addEventListener("pointerup", finishCalibrationDrag, { once: true });
  node.addEventListener("pointercancel", finishCalibrationDrag, { once: true });
}

function startEquipmentCalibrationDrag(event, item, node, mode) {
  state.calibrationDrag = {
    type: "equipment",
    mode,
    item,
    node,
    pointerId: event.pointerId,
    moved: false,
    startPoint: getDiagramPercentCoordinate(event),
    startClientX: event.clientX,
    startClientY: event.clientY,
    x: item.x,
    y: item.y,
    w: item.w || 4,
    h: item.h || 4,
    size: item.size || 34,
  };
  node.setPointerCapture(event.pointerId);
  node.addEventListener("pointermove", handleCalibrationDrag);
  node.addEventListener("pointerup", finishCalibrationDrag, { once: true });
  node.addEventListener("pointercancel", finishCalibrationDrag, { once: true });
}

function beginStreamLineDrag(event, stream, node) {
  const point = getDiagramPercentCoordinate(event);
  const mode = state.diagramViewMode === "schematic" ? "schematic" : "image";
  const adminPathEdit = isStreamPathEditing(stream, mode);
  const insertAt = insertStreamPoint(stream, point, { mode, persist: false, render: false, silent: true });
  node.setAttribute("d", buildStreamPath(stream, mode));
  const visualPath = getStreamPathElement(stream, mode);
  if (visualPath) {
    visualPath.setAttribute("d", buildStreamPath(stream, mode));
  }
  startStreamPointDrag(event, stream, insertAt, node, { created: true, mode, adminPathEdit });
  els.selectedStatus.textContent = `${stream.label}: titik baru dibuat, drag untuk mengatur line`;
}

function getStreamPathElement(stream, mode = "image", className = "stream-path") {
  const root = mode === "schematic" ? els.schematicCanvas : els.streamOverlay;
  return root?.querySelector(`.${className}[data-path-id="${CSS.escape(stream.id)}"]`) || null;
}

function startStreamPointDrag(event, stream, index, node, options = {}) {
  state.calibrationDrag = {
    type: "stream-point",
    stream,
    index,
    node,
    mode: options.mode || (state.diagramViewMode === "schematic" ? "schematic" : "image"),
    adminPathEdit: Boolean(options.adminPathEdit),
    pointerId: event.pointerId,
    moved: false,
    created: Boolean(options.created),
  };
  try {
    node.setPointerCapture?.(event.pointerId);
  } catch (error) {
    console.warn("Pointer capture stream tidak tersedia, drag tetap dilanjutkan.", error);
  }
  node.addEventListener("pointermove", handleCalibrationDrag);
  node.addEventListener("pointerup", finishCalibrationDrag, { once: true });
  node.addEventListener("pointercancel", finishCalibrationDrag, { once: true });
}

function handleCalibrationDrag(event) {
  const drag = state.calibrationDrag;
  if (!drag || event.pointerId !== drag.pointerId) {
    return;
  }
  event.preventDefault();
  drag.moved = true;

  if (drag.type === "equipment") {
    updateEquipmentDrag(event, drag);
    return;
  }

  if (drag.type === "stream-point") {
    updateStreamPointDrag(event, drag);
  }
}

function updateEquipmentDrag(event, drag) {
  const point = getDiagramPercentCoordinate(event);
  const item = drag.item;
  const dx = point.x - drag.startPoint.x;
  const dy = point.y - drag.startPoint.y;

  if (drag.mode === "schematic-move") {
    const snapped = snapPoint({ x: drag.x + dx, y: drag.y + dy });
    item.schematicPosition = {
      x: round1(clamp(snapped.x, 0, 100)),
      y: round1(clamp(snapped.y, 0, 100)),
    };
    drag.node.setAttribute("transform", `translate(${item.schematicPosition.x} ${item.schematicPosition.y})`);
    updateAdminNodeCoordinateInputs(item, "schematic");
  } else if (drag.mode === "schematic-resize") {
    const nextSize = normalizeSchematicSize({
      w: drag.schematicW + dx * 0.42,
      h: drag.schematicH + dy * 0.42,
    });
    item.schematicSize = nextSize;
    updateSchematicNodeVisualNode(drag.node, item);
    updateAdminNodeSchematicSizeInputs(item);
  } else if (drag.mode === "move") {
    const snapped = snapPoint({ x: drag.x + dx, y: drag.y + dy });
    item.x = round1(clamp(snapped.x, 0, 100));
    item.y = round1(clamp(snapped.y, 0, 100));
    item.imagePosition = { x: item.x, y: item.y };
    updateAdminNodeCoordinateInputs(item, "image");
  } else {
    const pixelDelta = (event.clientX - drag.startClientX + event.clientY - drag.startClientY) / 2;
    item.size = Math.round(clamp(drag.size + pixelDelta, 18, 72));
    item.w = round1(clamp(drag.w + dx * 1.3, 2, 24));
    item.h = round1(clamp(drag.h + dy * 1.3, 2, 42));
  }

  updateHotspotNodeStyle(drag.node, item);
  els.selectedStatus.textContent =
    drag.mode === "schematic-move"
      ? `${item.tag}: schematic x ${item.schematicPosition.x}, y ${item.schematicPosition.y}`
      : drag.mode === "schematic-resize"
      ? `${item.tag}: schematic w ${item.schematicSize.w}, h ${item.schematicSize.h}`
      : drag.mode === "move"
      ? `${item.tag}: x ${item.x}, y ${item.y}`
      : `${item.tag}: size ${item.size}px, w ${item.w}, h ${item.h}`;
}

function updateAdminNodeCoordinateInputs(item, mode) {
  if (!isAdminPanelOpen() || state.admin.activeTab !== "node") {
    return;
  }
  const point = getEquipmentPositionByMode(item, mode);
  const xInput = document.getElementById(mode === "schematic" ? "adminNodeSchematicX" : "adminNodeImageX");
  const yInput = document.getElementById(mode === "schematic" ? "adminNodeSchematicY" : "adminNodeImageY");
  if (xInput) xInput.value = point.x;
  if (yInput) yInput.value = point.y;
}

function updateAdminNodeSchematicSizeInputs(item) {
  if (!isAdminPanelOpen() || state.admin.activeTab !== "node") {
    return;
  }
  const size = normalizeSchematicSize(item.schematicSize);
  const wInput = document.getElementById("adminNodeSchematicW");
  const hInput = document.getElementById("adminNodeSchematicH");
  if (wInput) wInput.value = size.w;
  if (hInput) hInput.value = size.h;
}

function updateSchematicNodeVisualNode(node, item) {
  const visual = getSchematicNodeVisual(item);
  const rect = node.querySelector("rect");
  rect?.setAttribute("x", -visual.w / 2);
  rect?.setAttribute("y", -visual.h / 2);
  rect?.setAttribute("width", visual.w);
  rect?.setAttribute("height", visual.h);
  rect?.setAttribute("rx", visual.rx);
  const iconBg = node.querySelector(".schematic-node-icon-bg");
  iconBg?.setAttribute("cx", visual.iconX);
  iconBg?.setAttribute("cy", visual.iconY);
  iconBg?.setAttribute("r", visual.iconRadius);
  const icon = node.querySelector(".schematic-node-icon");
  icon?.setAttribute("x", visual.iconX);
  icon?.setAttribute("y", visual.iconY + visual.iconTextOffset);
  const tag = node.querySelector(".schematic-node-tag");
  tag?.setAttribute("x", visual.textX);
  tag?.setAttribute("y", visual.tagY);
  tag && (tag.textContent = visual.tag);
  const name = node.querySelector(".schematic-node-name");
  name?.setAttribute("x", visual.textX);
  name?.setAttribute("y", visual.nameY);
  name && (name.textContent = visual.label);
  const note = node.querySelector(".schematic-node-note");
  note?.setAttribute("x", visual.textX);
  note?.setAttribute("y", visual.noteY);
  note && (note.textContent = visual.note);
  const status = node.querySelector(".schematic-node-status");
  status?.setAttribute("cx", visual.statusX);
  status?.setAttribute("cy", visual.statusY);
  status?.setAttribute("r", visual.statusRadius);
  const resize = node.querySelector(".schematic-node-resize");
  resize?.setAttribute("cx", visual.resizeX);
  resize?.setAttribute("cy", visual.resizeY);
  resize?.setAttribute("r", visual.resizeRadius);
}

function updateStreamPointDrag(event, drag) {
  const point = snapPoint(getDiagramPercentCoordinate(event));
  const mode = drag.mode || "image";
  const points = getStreamControlPoints(drag.stream, mode);
  const streamPoint = points[drag.index];
  if (!streamPoint) {
    return;
  }
  streamPoint.x = round1(point.x);
  streamPoint.y = round1(point.y);
  setStreamControlPoints(drag.stream, mode, points);
  if (drag.node.tagName?.toLowerCase() === "circle") {
    drag.node.setAttribute("cx", streamPoint.x);
    drag.node.setAttribute("cy", streamPoint.y);
  }

  const path = getStreamPathElement(drag.stream, mode);
  if (path) {
    path.setAttribute("d", buildStreamPath(drag.stream, mode));
  }
  const hitPath = getStreamPathElement(drag.stream, mode, "stream-hit-path");
  if (hitPath) {
    hitPath.setAttribute("d", buildStreamPath(drag.stream, mode));
  }
  els.selectedStatus.textContent = `${drag.stream.label}: titik ${drag.index + 1} { x: ${streamPoint.x}, y: ${streamPoint.y} }`;
}

function finishCalibrationDrag(event) {
  const drag = state.calibrationDrag;
  if (!drag) {
    return;
  }

  drag.node.removeEventListener("pointermove", handleCalibrationDrag);
  drag.node.removeEventListener("pointerup", finishCalibrationDrag);
  drag.node.removeEventListener("pointercancel", finishCalibrationDrag);
  if (event?.pointerId === drag.pointerId && drag.node.hasPointerCapture?.(drag.pointerId)) {
    drag.node.releasePointerCapture(drag.pointerId);
  }

  if (drag.type === "equipment") {
    if (drag.moved) {
      if (drag.mode === "schematic-move") {
        pushAdminHistory("Edit posisi schematic node");
        saveSchematicNodeVisualEdit(drag.item);
        console.log(`"${drag.item.id}".schematicPosition = ${JSON.stringify(drag.item.schematicPosition)}`);
      } else {
        pushAdminHistory("Kalibrasi node");
        saveEquipmentCalibration(drag.item);
        console.log(`"${drag.item.id}": { x: ${round1(drag.item.x)}, y: ${round1(drag.item.y)}, w: ${round1(drag.item.w || 4)}, h: ${round1(drag.item.h || 4)}, size: ${Math.round(drag.item.size || 34)} }`);
      }
    } else {
      selectEquipment(drag.item.id, { focus: false, allowToggle: true });
    }
    state.ignoreNextHotspotClick = true;
  }

  if (drag.type === "stream-point" && (drag.moved || drag.created)) {
    if (drag.adminPathEdit) {
      const points = getStreamControlPoints(drag.stream, drag.mode);
      setStreamControlPoints(drag.stream, drag.mode, points);
      console.log(`${drag.stream.id}.${getModeStreamFields(drag.mode).controlPoints} = ${JSON.stringify(points)}`);
      els.selectedStatus.textContent = `${drag.stream.label}: jalur ${drag.mode} berubah, klik Simpan Jalur untuk menyimpan`;
      renderDiagramByMode();
    } else {
      pushAdminHistory("Kalibrasi stream");
      saveStreamCalibration(drag.stream);
      console.log(`${drag.stream.id}.points = ${JSON.stringify(drag.stream.points)}`);
      renderStreamOverlay();
      setStreamFilter(state.activeStream);
    }
  }

  state.calibrationDrag = null;
}

function updateHotspotNodeStyle(node, item) {
  node.style.setProperty("--x", item.x);
  node.style.setProperty("--y", item.y);
  node.style.setProperty("--w", item.w || 4);
  node.style.setProperty("--h", item.h || 4);
  node.style.setProperty("--marker-size", `${item.size || 34}px`);
}

function saveSchematicNodeVisualEdit(item) {
  const existingOverride = state.adminData.nodes.find((node) => node.id === item.id);
  const payload = normalizeEquipmentPayload({
    ...item,
    adminCreated: Boolean(item.adminCreated || existingOverride?.adminCreated),
  });
  const index = state.adminData.nodes.findIndex((node) => node.id === item.id);
  if (index >= 0) {
    state.adminData.nodes[index] = payload;
  } else {
    state.adminData.nodes.push(payload);
  }
  saveAdminState();
  renderSchematicDiagram();
  setStreamFilter(state.activeStream);
  showToast("Posisi schematic tersimpan", "success", item.tag);
}

function insertStreamPoint(stream, point, options = {}) {
  const mode = options.mode || (state.diagramViewMode === "schematic" ? "schematic" : "image");
  const points = getStreamControlPoints(stream, mode);
  const nextPoint = { x: round1(point.x), y: round1(point.y) };
  const insertAt = getNearestSegmentIndex(points, nextPoint) + 1;
  points.splice(insertAt, 0, nextPoint);
  setStreamControlPoints(stream, mode, points);
  if (options.persist !== false) {
    saveStreamCalibration(stream);
  }
  if (options.render !== false) {
    renderStreamOverlay();
    setStreamFilter(state.activeStream);
  }
  if (!options.silent) {
    els.selectedStatus.textContent = `${stream.label}: titik baru ditambahkan`;
  }
  return insertAt;
}

function deleteStreamPoint(stream, index, mode = state.diagramViewMode === "schematic" ? "schematic" : "image") {
  const points = getStreamControlPoints(stream, mode);
  if (points.length <= 2) {
    return;
  }
  points.splice(index, 1);
  setStreamControlPoints(stream, mode, points);
  if (!isStreamPathEditing(stream, mode)) {
    saveStreamCalibration(stream);
  }
  renderStreamOverlay();
  setStreamFilter(state.activeStream);
  els.selectedStatus.textContent = `${stream.label}: titik stream dihapus`;
}

function getNearestSegmentIndex(points, point) {
  let nearestIndex = 0;
  let nearestDistance = Number.POSITIVE_INFINITY;
  for (let index = 0; index < points.length - 1; index += 1) {
    const distance = distanceToSegment(point, points[index], points[index + 1]);
    if (distance < nearestDistance) {
      nearestDistance = distance;
      nearestIndex = index;
    }
  }
  return nearestIndex;
}

function distanceToSegment(point, start, end) {
  const dx = end.x - start.x;
  const dy = end.y - start.y;
  if (dx === 0 && dy === 0) {
    return Math.hypot(point.x - start.x, point.y - start.y);
  }
  const t = clamp(((point.x - start.x) * dx + (point.y - start.y) * dy) / (dx * dx + dy * dy), 0, 1);
  const projection = {
    x: start.x + t * dx,
    y: start.y + t * dy,
  };
  return Math.hypot(point.x - projection.x, point.y - projection.y);
}

function renderProcessPath(item) {
  const pathSource = (item.path || [item.unit, item.section, item.name]).map((entry) => safeText(entry, "")).filter(Boolean);
  if (!pathSource.length) {
    els.processPath.classList.add("is-hidden");
    els.processPath.replaceChildren();
    return;
  }
  els.processPath.classList.remove("is-hidden");
  const nodes = pathSource.map((label, index, path) => {
    const node = document.createElement("span");
    node.className = "path-node";
    node.classList.toggle("is-current", index === path.length - 1);
    node.textContent = label;
    return node;
  });
  els.processPath.replaceChildren(...nodes);
}

function renderOperationData(item) {
  renderOperationSnapshot(item);
}

function renderOperationSnapshot(item) {
  const data = item.operation || op("-", "-", "-", "Normal");
  const meta = getStatusMeta(data.status);
  els.operationTemperature.textContent = safeText(data.temperature, "-");
  els.operationPressure.textContent = safeText(data.pressure, "-");
  els.operationFlow.textContent = safeText(data.flow, "-");
  els.operationStatus.textContent = meta.label;
  els.operationStatus.className = `status-chip ${meta.className}`;
  if (els.heroStatus) {
    els.heroStatus.textContent = meta.label;
    els.heroStatus.className = `status-chip ${meta.className}`;
  }
}

function getEquipmentStatusLevel(item) {
  return getStatusMeta(item.operation?.status).level;
}

function getStatusMeta(status = "Unknown") {
  const label = safeText(status, "Unknown");
  const normalized = label.toLowerCase();
  if (normalized.includes("alarm") || normalized.includes("critical")) {
    return {
      label,
      level: "danger",
      className: "status-danger",
      shortMessage: "Prioritas tinggi",
    };
  }
  if (normalized.includes("warning")) {
    return {
      label,
      level: "warning",
      className: "status-warning",
      shortMessage: "Perlu perhatian",
    };
  }
  if (normalized.includes("offline") || normalized.includes("stop")) {
    return {
      label,
      level: "muted",
      className: "status-muted",
      shortMessage: "Equipment tidak aktif",
    };
  }
  if (normalized.includes("normal") || normalized.includes("running")) {
    return {
      label,
      level: "success",
      className: "status-success",
      shortMessage: "Operasi berjalan normal",
    };
  }
  return {
    label,
    level: "neutral",
    className: "status-neutral",
    shortMessage: "Status belum diketahui",
  };
}

function parseMeasurement(value) {
  const match = String(value || "").match(/-?\d+(?:\.\d+)?/);
  return match ? Number(match[0]) : 0;
}

function animateDetailPanel() {
  els.detailPanel.classList.remove("is-refreshing");
  void els.detailPanel.offsetWidth;
  els.detailPanel.classList.add("is-refreshing");
  window.clearTimeout(animateDetailPanel.timer);
  animateDetailPanel.timer = window.setTimeout(() => {
    els.detailPanel.classList.remove("is-refreshing");
  }, 240);
}

function renderMetadata(item, unit = {}) {
  els.equipmentUnit.textContent = item.unit && unit.title ? `${item.unit} - ${unit.title}` : safeText(item.unit, "-");
  els.equipmentSection.textContent = safeText(item.section, "-");
  els.equipmentTag.textContent = safeText(item.tag, "-");
  els.equipmentArea.textContent = safeText(item.area, "-");
}

function renderDetailList(target, entries, fallback = "Belum ada data.") {
  const safeEntries = Array.isArray(entries) ? entries.map((entry) => safeText(entry, "")).filter(Boolean) : [];
  const items = (safeEntries.length ? safeEntries : [fallback]).map((entry) => {
    const li = document.createElement("li");
    li.textContent = entry;
    return li;
  });
  target.replaceChildren(...items);
}

function renderList(target, entries) {
  renderDetailList(target, entries);
}

function getEquipmentImageSrc(item) {
  return item?.photo?.image || refs.vessel.image || "";
}

function setEquipmentPhoto(item) {
  const photo = item.photo || refs.vessel;
  const frame = els.equipmentImage.closest(".photo-frame");
  frame?.classList.add("is-loading");
  setImageWithFallback(els.equipmentImage, getEquipmentImageSrc(item), safeText(item.tag, "Equipment"), () => {
    frame?.classList.remove("is-loading");
  }, () => {
    frame?.classList.remove("is-loading");
  });
  els.equipmentImage.alt = `Foto referensi ${safeText(item.name, "Equipment")}`;
  if (photo.source && photo.source !== "#") {
    els.sourceLink.href = photo.source;
    els.sourceLink.classList.remove("is-hidden");
  } else {
    els.sourceLink.removeAttribute("href");
    els.sourceLink.classList.add("is-hidden");
  }
}

function setImageWithFallback(imgElement, src, fallbackText = "No image", onLoad, onError) {
  if (!imgElement) {
    return;
  }
  const fallbackSrc = placeholderImage({ tag: fallbackText, name: "No image" });
  const nextSrc = src || fallbackSrc;
  if (imgElement.dataset.currentSrc === nextSrc && (imgElement.classList.contains("is-loaded") || imgElement.classList.contains("is-placeholder"))) {
    onLoad?.();
    return;
  }

  const loader = new Image();
  loader.onload = () => {
    imgElement.src = nextSrc;
    imgElement.dataset.currentSrc = nextSrc;
    imgElement.classList.remove("is-placeholder");
    imgElement.classList.add("is-loaded");
    onLoad?.();
  };
  loader.onerror = () => {
    imgElement.src = fallbackSrc;
    imgElement.dataset.currentSrc = fallbackSrc;
    imgElement.classList.remove("is-loaded");
    imgElement.classList.add("is-placeholder");
    imgElement.alt = `Placeholder ${fallbackText}`;
    onError?.();
  };
  loader.src = nextSrc;
}

function safeText(value, fallback = "-") {
  if (value === undefined || value === null) {
    return fallback;
  }
  const text = String(value).trim();
  if (!text || text === "undefined" || text === "null" || text === "NaN") {
    return fallback;
  }
  return text;
}

function pointsToPath(points) {
  if (!points.length) {
    return "";
  }
  return points.map((point, index) => `${index === 0 ? "M" : "L"} ${point.x} ${point.y}`).join(" ");
}

function getActiveUnit() {
  return { id: state.activeUnitId, ...UNITS[state.activeUnitId] };
}

function getUnitEquipment(unitId = state.activeUnitId) {
  return (UNITS[unitId]?.equipmentIds || []).map((id) => EQUIPMENT_BY_ID.get(id)).filter(Boolean);
}

function getFilteredUnitEquipment(unitId = state.activeUnitId) {
  return getUnitEquipment(unitId).filter(matchesEquipmentSearch);
}

function matchesEquipmentSearch(item) {
  if (!state.searchQuery) {
    return true;
  }
  const haystack = [item.id, item.tag, item.name, item.type, item.area, item.section, item.unit, item.operation?.status, item.description].join(" ").toLowerCase();
  return haystack.includes(state.searchQuery);
}

function getUnitStreams(unitId = state.activeUnitId) {
  const unit = UNITS[unitId];
  return (unit?.streamIds || []).map((id) => STREAM_BY_ID.get(id)).filter(Boolean);
}

function getEquipmentNodes() {
  return document.querySelectorAll(".hotspot[data-id], .schematic-node[data-id], .equipment-tab[data-id], .section-equipment-button[data-id]");
}

function hasHotspotCoordinate(item) {
  const point = getEquipmentPositionByMode(item, state.diagramViewMode === "schematic" ? "schematic" : "image");
  return Number.isFinite(point.x) && Number.isFinite(point.y);
}

function setZoom(nextValue, fit = false) {
  state.zoom.value = clamp(nextValue, state.zoom.min, state.zoom.max);
  state.zoom.fit = fit;
  els.diagramStage.classList.toggle("is-fit", fit);
  els.diagramStage.style.width = fit ? "100%" : `${Math.round(state.zoom.value * 100)}%`;
  els.zoomValue.textContent = fit ? "Pas" : `${Math.round(state.zoom.value * 100)}%`;
  window.requestAnimationFrame(() => {
    updatePannableState();
    updateStreamLabelVisibility();
    updateMiniMapViewport();
    updatePresentationOverlayPosition();
  });
}

function updatePannableState() {
  const canPan = !state.zoom.fit && state.zoom.value > 1.04;
  els.diagramScroll.classList.toggle("is-pannable", canPan);
  if (!canPan) {
    els.diagramScroll.classList.remove("is-panning");
  }
}

function setTheme(theme) {
  const isDark = theme === "dark";
  document.body.dataset.theme = isDark ? "dark" : "light";
  els.themeToggle.setAttribute("aria-pressed", String(isDark));
  els.themeToggleText.textContent = isDark ? "Mode terang" : "Mode malam";
  try {
    localStorage.setItem("refinery-theme", isDark ? "dark" : "light");
  } catch (error) {
    console.warn("Theme tidak bisa disimpan.", error);
  }
  savePreferences({ theme: isDark ? "dark" : "light" });
}

function addCalibrationLabel(point) {
  const marker = document.createElement("span");
  marker.className = "calibration-point";
  marker.style.left = `${point.x}%`;
  marker.style.top = `${point.y}%`;
  marker.textContent = `{ x: ${point.x}, y: ${point.y} }`;
  els.calibrationLayer.appendChild(marker);

  while (els.calibrationLayer.children.length > 8) {
    els.calibrationLayer.firstElementChild.remove();
  }
}

function buildManualExportCanvas(options = {}) {
  const includeImage = options.includeImage !== false;
  const unit = getActiveUnit();
  const width = els.flowImage.naturalWidth || 1672;
  const height = els.flowImage.naturalHeight || 941;
  const canvas = document.createElement("canvas");
  const context = canvas.getContext("2d");
  canvas.width = width;
  canvas.height = height;

  context.fillStyle = "#ffffff";
  context.fillRect(0, 0, width, height);

  if (includeImage && state.diagramReady && els.flowImage.naturalWidth > 0) {
    context.drawImage(els.flowImage, 0, 0, width, height);
  } else {
    context.fillStyle = "#f4f6f3";
    context.fillRect(0, 0, width, height);
    context.fillStyle = "#15201f";
    context.font = "700 36px Segoe UI, Arial, sans-serif";
    context.fillText(`${state.activeUnitId} - ${unit.title}`, 56, 80);
    context.font = "500 22px Segoe UI, Arial, sans-serif";
    context.fillText(
      includeImage ? `Diagram ${state.activeUnitId} belum tersedia` : "Bitmap utama tidak disertakan oleh proteksi file lokal",
      56,
      122
    );
  }

  drawExportStreams(context, width, height);
  drawExportHotspots(context, width, height);
  return canvas;
}

function drawExportStreams(context, width, height) {
  if (state.streamHidden) {
    return;
  }
  const streams = getUnitStreams();
  context.save();
  context.scale(width / 100, height / 100);
  streams.forEach((stream) => {
    const isMatch = state.activeStream === "all" || stream.type === state.activeStream;
    context.globalAlpha = isMatch ? 0.82 : 0.08;
    context.strokeStyle = stream.color || { liquid: "#111827", water: "#155eef", gas: "#e79b00", air: "#249348" }[stream.type] || "#111827";
    context.lineWidth = stream.strokeWidth || (isMatch ? 0.75 : 0.35);
    context.setLineDash(isMatch ? [3.2, 2.4] : []);
    context.beginPath();
    const pathD = getStreamPathD(stream);
    try {
      context.stroke(new Path2D(pathD));
    } catch (error) {
      (stream.points || []).forEach((point, index) => {
        if (index === 0) {
          context.moveTo(point.x, point.y);
        } else {
          context.lineTo(point.x, point.y);
        }
      });
      context.stroke();
    }
  });
  context.restore();
  context.globalAlpha = 1;
}

function drawExportHotspots(context, width, height) {
  getUnitEquipment().filter(hasHotspotCoordinate).forEach((item) => {
    const x = (item.x / 100) * width;
    const y = (item.y / 100) * height;
    const isSelected = state.selectedEquipmentId === item.id;
    const isDimmed = state.activeStream !== "all" && !item.streams.includes(state.activeStream);
    context.globalAlpha = isDimmed ? 0.28 : 0.95;
    context.fillStyle = isSelected ? "#155eef" : "#f1b90b";
    context.strokeStyle = "#ffffff";
    context.lineWidth = isSelected ? 6 : 4;
    context.beginPath();
    context.arc(x, y, isSelected ? 18 : 13, 0, Math.PI * 2);
    context.fill();
    context.stroke();
  });
  context.globalAlpha = 1;
}

function assertCanvasReadable(canvas) {
  canvas.getContext("2d").getImageData(0, 0, 1, 1);
}

function downloadCanvasPng(canvas, filename) {
  return new Promise((resolve, reject) => {
    try {
      canvas.toBlob((blob) => {
        if (!blob) {
          reject(new Error("Canvas tidak dapat dibuat menjadi PNG."));
          return;
        }
        const link = document.createElement("a");
        const url = URL.createObjectURL(blob);
        link.download = filename;
        link.href = url;
        link.click();
        window.setTimeout(() => URL.revokeObjectURL(url), 1000);
        resolve();
      }, "image/png");
    } catch (error) {
      reject(error);
    }
  });
}

function placeholderImage(item) {
  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" width="900" height="650" viewBox="0 0 900 650">
      <rect width="900" height="650" fill="#e8ece9"/>
      <rect x="48" y="48" width="804" height="554" rx="16" fill="#ffffff" stroke="#cdd5cf"/>
      <text x="82" y="132" font-family="Segoe UI, Arial, sans-serif" font-size="42" font-weight="700" fill="#15201f">${escapeSvg(item.tag)}</text>
      <text x="82" y="188" font-family="Segoe UI, Arial, sans-serif" font-size="28" fill="#5e6a66">${escapeSvg(item.name)}</text>
      <text x="82" y="246" font-family="Segoe UI, Arial, sans-serif" font-size="22" fill="#5e6a66">Foto equipment tidak tersedia.</text>
    </svg>
  `;
  return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`;
}

function escapeSvg(value) {
  return String(value).replace(/[&<>"']/g, (char) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&apos;",
  }[char]));
}

function clamp(value, min, max) {
  return Math.min(max, Math.max(min, value));
}

function round1(value) {
  return Number(Number(value).toFixed(1));
}

document.addEventListener("DOMContentLoaded", initApp);
