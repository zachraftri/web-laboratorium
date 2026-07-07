import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router";
import {
  Search, Filter, FlaskConical, ChevronRight, FileText, Eye, X, BookOpen, ChevronDown,
} from "lucide-react";

import imgSpektrofotometer from "../../imports/Spektrofotometer-UV-VIS-Fungsi-Prinsip-Kerja-dan-Cara-Kerjanya.jpg";
import imgMikroskop from "../../imports/mikroskop.jpg";
import imgGasChromatograph from "../../imports/gas_chromatograph.jpg";
import imgServerRack from "../../imports/rak_server.png";
import imgXRD from "../../imports/XRD.jpg";
import imgPCR from "../../imports/pcr_thermal.jfif";
import imgAAS from "../../imports/Atomic-Absorption-Spectrophotometer-SP-IAA320-01.jpg";
import imgOsiloskop from "../../imports/osiloskop_digital.jpg";
import imgGPU from "../../imports/gpu_cluster.jpg";
import imgBombCalorimeter from "../../imports/bomb_calorimeter.jpg";
import imgElektroforesis from "../../imports/Gel_electrophoresis_apparatus.jfif";
import imgAlatUji from "../../imports/alat_uji_tekan_batuan.jpg";

/* ─── SOP per alat ─── */
const sopData: Record<string, string[]> = {
  "Spektrofotometer UV-Vis": [
    "Pastikan alat telah menyala dan melakukan proses warm-up sesuai petunjuk.",
    "Gunakan kuvet yang bersih dan bebas goresan sebelum pengukuran.",
    "Lakukan blanko (baseline) sebelum mengukur sampel.",
    "Hindari menyentuh sisi transparan kuvet saat pengukuran.",
    "Bersihkan area kerja dan matikan alat setelah selesai digunakan.",
  ],
  "Mikroskop Elektron SEM": [
    "Pastikan sampel telah dipersiapkan sesuai standar SEM.",
    "Gunakan sarung tangan saat memasang atau melepas sampel.",
    "Jangan membuka ruang vakum saat proses pengamatan berlangsung.",
    "Operasikan alat hanya sesuai parameter yang telah ditentukan.",
    "Keluarkan sampel dan matikan sistem sesuai prosedur shutdown.",
  ],
  "Gas Chromatograph (GC)": [
    "Periksa kondisi gas pembawa sebelum menyalakan alat.",
    "Gunakan vial sampel yang bersih dan tertutup rapat.",
    "Atur metode analisis sesuai jenis sampel.",
    "Jangan membuka kompartemen saat alat sedang berjalan.",
    "Bersihkan injector dan matikan alat setelah penggunaan.",
  ],
  "Server Rack & Jaringan": [
    "Pastikan hanya pengguna berwenang yang mengakses server.",
    "Jangan mencabut kabel jaringan atau listrik tanpa izin.",
    "Monitor suhu dan indikator sistem secara berkala.",
    "Lakukan backup data sesuai jadwal laboratorium.",
    "Tutup dan kunci rack server setelah selesai melakukan pemeliharaan.",
  ],
  "XRD Machine": [
    "Pastikan sampel telah dipasang dengan benar pada holder.",
    "Jangan membuka pelindung alat saat sinar-X aktif.",
    "Gunakan parameter scanning sesuai prosedur pengujian.",
    "Hindari memindahkan sampel selama proses analisis.",
    "Bersihkan holder dan matikan alat setelah selesai.",
  ],
  "PCR Thermal Cycler": [
    "Gunakan tabung PCR yang sesuai dan tertutup rapat.",
    "Susun sampel sesuai posisi yang telah ditentukan.",
    "Pilih program PCR yang sesuai dengan protokol.",
    "Jangan membuka tutup alat selama proses berlangsung.",
    "Bersihkan area kerja setelah seluruh proses selesai.",
  ],
  "Atomic Absorption Spectrophotometer": [
    "Periksa kondisi burner dan sumber gas sebelum digunakan.",
    "Gunakan larutan standar dan blanko sesuai metode analisis.",
    "Pastikan sampel telah disaring bila diperlukan.",
    "Hindari kontak langsung dengan bagian burner yang panas.",
    "Matikan aliran gas dan alat setelah selesai digunakan.",
  ],
  "Osiloskop Digital": [
    "Pastikan probe terpasang dengan benar sebelum pengukuran.",
    "Gunakan rentang tegangan sesuai spesifikasi alat.",
    "Jangan mengukur tegangan melebihi batas maksimum.",
    "Simpan hasil pengukuran sebelum mematikan alat.",
    "Lepaskan probe dan rapikan kabel setelah selesai.",
  ],
  "GPU Cluster (NVIDIA A100)": [
    "Login menggunakan akun yang telah diberikan administrator.",
    "Jalankan komputasi sesuai alokasi resource yang tersedia.",
    "Hindari menginstal perangkat lunak tanpa izin.",
    "Simpan hasil pekerjaan pada penyimpanan yang telah ditentukan.",
    "Logout dan hentikan seluruh proses komputasi setelah selesai.",
  ],
  "Bomb Calorimeter": [
    "Pastikan sampel telah ditimbang sesuai prosedur.",
    "Periksa kondisi bomb dan seal sebelum digunakan.",
    "Isi oksigen sesuai tekanan yang direkomendasikan.",
    "Jangan membuka bomb sebelum tekanan dilepaskan sepenuhnya.",
    "Bersihkan bomb dan area kerja setelah pengujian selesai.",
  ],
  "Elektroforesis Gel": [
    "Siapkan gel dan buffer sesuai prosedur percobaan.",
    "Muat sampel secara hati-hati ke dalam sumur gel.",
    "Pastikan polaritas elektroda telah benar sebelum dijalankan.",
    "Jangan menyentuh buffer saat listrik masih aktif.",
    "Matikan power supply sebelum mengambil gel.",
  ],
  "Alat Uji Tekan Batuan": [
    "Pastikan spesimen telah dipasang dengan posisi yang benar.",
    "Periksa kondisi sensor dan sistem hidrolik sebelum pengujian.",
    "Atur beban sesuai standar pengujian.",
    "Jangan berada di dekat spesimen saat pengujian berlangsung.",
    "Bersihkan area kerja dan matikan alat setelah selesai.",
  ],
};

/* ─── Tutorial per alat ─── */
const tutorialData: Record<string, string[]> = {
  "Spektrofotometer UV-Vis": [
    "Nyalakan alat dan biarkan warm-up selama 15 menit.",
    "Pilih panjang gelombang yang sesuai pada panel kontrol.",
    "Masukkan larutan blanko ke dalam sel referensi dan tekan 'Zero'.",
    "Masukkan sampel ke dalam sel sampel.",
    "Tekan 'Read' atau 'Scan' dan catat nilai absorbansi.",
    "Bersihkan kuvet dengan akuades setelah selesai.",
  ],
  "Mikroskop Elektron SEM": [
    "Nyalakan sistem dan tunggu hingga vakum tercapai.",
    "Pasang sampel yang telah dilapisi coating konduktif.",
    "Atur tegangan akselerasi sesuai jenis sampel (1–20 kV).",
    "Fokuskan gambar menggunakan kontrol fine focus.",
    "Ambil gambar pada perbesaran yang diinginkan.",
    "Keluarkan sampel dan matikan sistem sesuai prosedur.",
  ],
  "Gas Chromatograph (GC)": [
    "Nyalakan alat dan atur suhu injektor, kolom, dan detektor.",
    "Tunggu hingga kondisi baseline stabil.",
    "Siapkan sampel dalam vial bersih.",
    "Injeksikan sampel menggunakan syringe ke injektor.",
    "Tunggu kromatogram selesai dan analisis hasilnya.",
    "Matikan detektor dan kolom secara berurutan setelah selesai.",
  ],
  "Server Rack & Jaringan": [
    "Login ke panel administrasi server menggunakan akun terdaftar.",
    "Periksa status semua node dan koneksi jaringan.",
    "Konfigurasikan jaringan sesuai topologi yang dibutuhkan.",
    "Jalankan simulasi atau layanan yang diperlukan.",
    "Monitor performa menggunakan dashboard sistem.",
    "Simpan konfigurasi dan logout setelah selesai.",
  ],
  "XRD Machine": [
    "Nyalakan alat dan tunggu sistem siap beroperasi.",
    "Siapkan sampel dalam bentuk serbuk halus atau padatan.",
    "Pasang sampel pada holder dengan merata.",
    "Atur parameter: sudut 2θ, kecepatan scan, dan sumber radiasi.",
    "Jalankan pengukuran dan tunggu hingga selesai.",
    "Ekspor data difraktogram untuk analisis lebih lanjut.",
  ],
  "PCR Thermal Cycler": [
    "Persiapkan campuran reaksi PCR di atas es.",
    "Masukkan tabung PCR ke dalam block thermal cycler.",
    "Pilih atau buat program PCR yang sesuai protokol.",
    "Mulai proses (denaturation, annealing, extension).",
    "Tunggu hingga proses selesai (biasanya 1–3 jam).",
    "Simpan produk PCR di freezer atau lanjutkan ke elektroforesis.",
  ],
  "Atomic Absorption Spectrophotometer": [
    "Nyalakan alat dan pilih lampu hollow cathode sesuai logam.",
    "Atur panjang gelombang dan celah sesuai petunjuk.",
    "Nyalakan burner dan atur komposisi gas acetylene/udara.",
    "Aspirasikan larutan blanko dan tekan zeroing.",
    "Aspirasikan larutan standar untuk kurva kalibrasi.",
    "Aspirasikan sampel dan catat nilai absorbansi.",
  ],
  "Osiloskop Digital": [
    "Nyalakan osiloskop dan pilih channel yang akan digunakan.",
    "Pasang probe pada titik pengukuran sirkuit.",
    "Atur time/div dan volt/div sesuai sinyal.",
    "Gunakan auto-set untuk mendapatkan tampilan sinyal awal.",
    "Ukur frekuensi, amplitudo, dan fase menggunakan cursor.",
    "Simpan tangkapan layar atau data ke USB.",
  ],
  "GPU Cluster (NVIDIA A100)": [
    "SSH ke server menggunakan akun dan kunci autentikasi.",
    "Aktifkan environment Python/Conda yang sesuai.",
    "Upload dataset ke direktori yang telah ditentukan.",
    "Jalankan script pelatihan dengan perintah python train.py.",
    "Monitor proses menggunakan nvidia-smi atau tensorboard.",
    "Download hasil model dan hapus file sementara.",
  ],
  "Bomb Calorimeter": [
    "Timbang sampel sebanyak ±1 gram ke dalam cawan.",
    "Pasang cawan dan kawat pembakar pada bomb.",
    "Tutup bomb dan isi oksigen hingga tekanan 30 atm.",
    "Masukkan bomb ke dalam kalorimeter berisi air.",
    "Catat suhu awal dan nyalakan pembakaran.",
    "Catat suhu akhir dan hitung nilai kalori sampel.",
  ],
  "Elektroforesis Gel": [
    "Buat larutan agarose 1–2% dalam buffer TAE/TBE.",
    "Tuangkan gel ke dalam cetakan dan pasang sisir.",
    "Tunggu gel mengeras (±20 menit) lalu lepaskan sisir.",
    "Masukkan gel ke tangki elektroforesis berisi buffer.",
    "Muat sampel + loading dye ke dalam sumur gel.",
    "Jalankan elektroforesis pada 80–120V selama 30–60 menit.",
  ],
  "Alat Uji Tekan Batuan": [
    "Persiapkan spesimen batuan dengan dimensi standar.",
    "Kalibrasi sensor gaya dan displacement sebelum pengujian.",
    "Tempatkan spesimen di antara plat penekan.",
    "Atur kecepatan pembebanan sesuai standar ASTM/ISRM.",
    "Jalankan pengujian dan rekam kurva tegangan-regangan.",
    "Catat nilai kuat tekan maksimum dan analisis data.",
  ],
};

const equipmentData = [
  { id: 1,  name: "Spektrofotometer UV-Vis",          labCategory: "Lab Kimia",            lab: "Lab Kimia Analitik",      desc: "Mengukur absorbansi cahaya pada panjang gelombang UV dan visible",                      category: "Analitik",        image: imgSpektrofotometer, available: true  },
  { id: 2,  name: "Mikroskop Elektron SEM",           labCategory: "Lab Biologi",           lab: "Lab Biologi Sel",         desc: "Visualisasi struktur mikro organisme pada resolusi sangat tinggi",                     category: "Mikroskopi",      image: imgMikroskop,        available: true  },
  { id: 3,  name: "Gas Chromatograph (GC)",           labCategory: "Lab Kimia",            lab: "Lab Kimia Organik",       desc: "Pemisahan dan analisis komponen senyawa kimia dalam fase gas",                        category: "Kromatografi",   image: imgGasChromatograph, available: false },
  { id: 4,  name: "Server Rack & Jaringan",           labCategory: "Lab Komputer (TISIMAT)",lab: "Lab Jaringan",            desc: "Infrastruktur server dan jaringan komputer untuk simulasi",                           category: "Komputasi",       image: imgServerRack,       available: true  },
  { id: 5,  name: "XRD Machine",                     labCategory: "Lab Teknik Tambang",   lab: "Lab Teknologi Mineral",   desc: "Analisis struktur kristal mineral dan material menggunakan difraksi sinar X",          category: "Karakterisasi",   image: imgXRD,              available: true  },
  { id: 6,  name: "PCR Thermal Cycler",               labCategory: "Lab Biologi",           lab: "Lab Biologi Dasar",       desc: "Amplifikasi DNA untuk keperluan penelitian genetika dan biologi molekuler",            category: "Biologi Molekuler",image: imgPCR,             available: false },
  { id: 7,  name: "Atomic Absorption Spectrophotometer", labCategory: "Lab Kimia",         lab: "Lab Kimia Analitik",      desc: "Analisis kuantitatif logam berat dalam sampel lingkungan",                            category: "Analitik",        image: imgAAS,              available: true  },
  { id: 8,  name: "Osiloskop Digital",                labCategory: "Lab Fisika",           lab: "Lab Fisika Instrumentasi",desc: "Pengukuran dan visualisasi sinyal elektronik dalam domain waktu",                      category: "Elektronika",     image: imgOsiloskop,        available: true  },
  { id: 9,  name: "GPU Cluster (NVIDIA A100)",        labCategory: "Lab Komputer (TISIMAT)",lab: "Lab Data Sains",          desc: "Komputasi paralel untuk pelatihan model machine learning skala besar",                 category: "Komputasi",       image: imgGPU,              available: false },
  { id: 10, name: "Bomb Calorimeter",                 labCategory: "Lab Kimia",            lab: "Lab Kimia Dasar",         desc: "Pengukuran nilai kalor pembakaran bahan bakar dan bahan organik",                     category: "Termal",          image: imgBombCalorimeter,  available: true  },
  { id: 11, name: "Elektroforesis Gel",               labCategory: "Lab Biologi",           lab: "Lab Biologi Dasar",       desc: "Pemisahan molekul DNA, RNA, dan protein berdasarkan ukuran",                          category: "Biologi Molekuler",image: imgElektroforesis,  available: true  },
  { id: 12, name: "Alat Uji Tekan Batuan",            labCategory: "Lab Uji Material",     lab: "Lab Uji Material",        desc: "Pengujian kekuatan mekanik batuan untuk keperluan desain tambang",                     category: "Geoteknik",       image: imgAlatUji,          available: false },
];

const labList = ["Semua Lab", "Lab Kimia", "Lab Biologi", "Lab Fisika", "Lab Komputer (TISIMAT)", "Lab Teknik Tambang", "Lab Uji Material", "Lab Pangan", "Lab Lingkungan", "Lab Agribisnis"];
const categories = ["Semua Kategori", "Analitik", "Mikroskopi", "Kromatografi", "Komputasi", "Karakterisasi", "Biologi Molekuler", "Elektronika", "Termal", "Geoteknik"];

type Equipment = typeof equipmentData[number];

function EquipmentImage({ src, alt }: { src: string | null; alt: string }) {
  if (src) return <img src={src} alt={alt} className="w-full h-full object-cover" />;
  return (
    <div className="w-full h-full flex items-center justify-center" style={{ background: "linear-gradient(135deg, #E3F2FD 0%, #E0E7FF 100%)" }}>
      <FlaskConical size={48} style={{ color: "#1565C0" }} className="opacity-25" />
    </div>
  );
}

function DetailModal({ eq, onClose }: { eq: Equipment; onClose: () => void }) {
  const [sopOpen, setSopOpen] = useState(false);
  const [tutorialOpen, setTutorialOpen] = useState(false);

  const specs = [
    { label: "Model", value: `${eq.name.split(" ")[0]}-2024` },
    { label: "Merek", value: "Shimadzu / Thermo Scientific" },
    { label: "Tahun", value: "2022" },
    { label: "Kapasitas", value: "1 sampel / sesi" },
    { label: "Lab", value: eq.lab },
  ];

  const sop = sopData[eq.name] ?? [];
  const tutorial = tutorialData[eq.name] ?? [];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div className="absolute inset-0 bg-black/50" />
      <div
        className="relative bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-6">
          <button onClick={onClose} className="absolute top-4 right-4 p-2 rounded-lg hover:bg-gray-100 transition-colors">
            <X size={20} />
          </button>
          <div className="h-56 rounded-xl overflow-hidden mb-5">
            <EquipmentImage src={eq.image} alt={eq.name} />
          </div>
          <div className="flex items-start justify-between mb-3">
            <h2 className="text-xl font-bold" style={{ color: "#1A1A2E", fontFamily: "'Plus Jakarta Sans', sans-serif" }}>{eq.name}</h2>
            <span className={`px-3 py-1 rounded-full text-xs font-semibold flex-shrink-0 ml-3 ${eq.available ? "bg-green-50 text-green-600" : "bg-red-50 text-red-500"}`}>
              {eq.available ? "Tersedia" : "Tidak Tersedia"}
            </span>
          </div>
          <div className="flex gap-2 mb-4 flex-wrap">
            <span className="px-3 py-1 rounded-full text-xs font-medium bg-blue-50" style={{ color: "#1565C0" }}>{eq.labCategory}</span>
            <span className="px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-600">{eq.lab}</span>
            <span className="px-3 py-1 rounded-full text-xs font-medium bg-purple-50 text-purple-600">{eq.category}</span>
          </div>
          <p className="text-gray-600 text-sm mb-5">{eq.desc}</p>

          {/* Specs */}
          <table className="w-full text-sm mb-5 border-collapse">
            <tbody>
              {specs.map((s, i) => (
                <tr key={i} className={i % 2 === 0 ? "bg-gray-50" : "bg-white"}>
                  <td className="py-2.5 px-3 font-medium text-gray-600 w-1/3 rounded-l">{s.label}</td>
                  <td className="py-2.5 px-3 text-gray-800 rounded-r">{s.value}</td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Tutorial */}
          <div className="border border-gray-100 rounded-xl mb-4 overflow-hidden">
            <button
              onClick={() => setTutorialOpen(!tutorialOpen)}
              className="w-full flex items-center justify-between p-4 text-left hover:bg-gray-50 transition-colors"
            >
              <span className="font-semibold text-gray-800 flex items-center gap-2">
                <BookOpen size={16} style={{ color: "#1565C0" }} /> Tutorial Penggunaan
              </span>
              <ChevronDown size={16} className={`text-gray-400 transition-transform ${tutorialOpen ? "rotate-180" : ""}`} />
            </button>
            {tutorialOpen && (
              <div className="px-4 pb-4 border-t border-gray-50">
                <ol className="space-y-2 mt-3">
                  {tutorial.map((step, i) => (
                    <li key={i} className="flex gap-3 text-sm text-gray-700">
                      <span className="flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold text-white" style={{ backgroundColor: "#1565C0" }}>{i + 1}</span>
                      <span className="leading-relaxed pt-0.5">{step}</span>
                    </li>
                  ))}
                </ol>
              </div>
            )}
          </div>

          {/* SOP */}
          <div className="border border-gray-100 rounded-xl overflow-hidden">
            <button
              onClick={() => setSopOpen(!sopOpen)}
              className="w-full flex items-center justify-between p-4 text-left hover:bg-gray-50 transition-colors"
            >
              <span className="font-semibold text-gray-800">SOP & Panduan Keamanan</span>
              <ChevronDown size={16} className={`text-gray-400 transition-transform ${sopOpen ? "rotate-180" : ""}`} />
            </button>
            {sopOpen && (
              <div className="px-4 pb-4 border-t border-gray-50">
                <ul className="space-y-2 mt-3">
                  {sop.map((item, i) => (
                    <li key={i} className="flex gap-2 text-sm text-gray-700">
                      <span className="flex-shrink-0 mt-1.5 w-1.5 h-1.5 rounded-full bg-blue-500" />
                      <span className="leading-relaxed">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export function KatalogAlatPage() {
  const location = useLocation();
  const [search, setSearch] = useState("");
  const [selectedLab, setSelectedLab] = useState("Semua Lab");
  const [selectedCat, setSelectedCat] = useState("Semua Kategori");
  const [detail, setDetail] = useState<Equipment | null>(null);
  const [tutorialOpen, setTutorialOpen] = useState<number | null>(null);
  const [sopOpen, setSopOpen] = useState<number | null>(null);

  // Terima filter lab dari ProdiLabPage
  useEffect(() => {
    const state = location.state as { labFilter?: string } | null;
    if (state?.labFilter) setSelectedLab(state.labFilter);
  }, [location.state]);

  const filtered = equipmentData.filter((e) => {
    const matchSearch = e.name.toLowerCase().includes(search.toLowerCase()) || e.desc.toLowerCase().includes(search.toLowerCase());
    const matchLab = selectedLab === "Semua Lab" || e.labCategory === selectedLab;
    const matchCat = selectedCat === "Semua Kategori" || e.category === selectedCat;
    return matchSearch && matchLab && matchCat;
  });

  return (
    <div style={{ fontFamily: "'Inter', sans-serif", backgroundColor: "#F0F7FF", minHeight: "100vh" }}>
      {detail && <DetailModal eq={detail} onClose={() => setDetail(null)} />}

      {/* Header */}
      <div style={{ backgroundColor: "#1565C0" }} className="py-8 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-2 text-blue-300 text-sm mb-3">
            <Link to="/" className="hover:text-white">Beranda</Link>
            <ChevronRight size={14} />
            <span className="text-white">Katalog Alat</span>
          </div>
          <h1 className="text-3xl font-bold text-white" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
            Katalog Alat Laboratorium
          </h1>
          <p className="text-blue-200 mt-2">Temukan dan pelajari peralatan laboratorium yang tersedia di kampus</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Sidebar Filter */}
          <div className="w-full lg:w-64 flex-shrink-0">
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-4">
              <div className="flex items-center gap-2 mb-4 font-semibold text-gray-800">
                <Filter size={16} /> Filter
              </div>
              <div className="relative mb-4">
                <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Cari alat..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-100"
                />
              </div>
              <div className="mb-4">
                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Daftar Lab</p>
                <div className="space-y-1">
                  {labList.map((l) => (
                    <label key={l} className="flex items-center gap-2 cursor-pointer py-1">
                      <input type="radio" name="lab" checked={selectedLab === l} onChange={() => setSelectedLab(l)} className="text-blue-600" />
                      <span className="text-sm text-gray-700">{l}</span>
                    </label>
                  ))}
                </div>
              </div>
              <div>
                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Kategori</p>
                <select value={selectedCat} onChange={(e) => setSelectedCat(e.target.value)} className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-100 bg-white">
                  {categories.map((c) => <option key={c}>{c}</option>)}
                </select>
              </div>
            </div>
          </div>

          {/* Equipment Grid */}
          <div className="flex-1">
            <div className="flex items-center justify-between mb-4">
              <p className="text-sm text-gray-500">{filtered.length} alat ditemukan</p>
            </div>
            {filtered.length === 0 ? (
              <div className="bg-white rounded-xl p-12 text-center border border-gray-100">
                <FlaskConical size={48} className="mx-auto text-gray-300 mb-3" />
                <p className="text-gray-500">Tidak ada alat yang sesuai dengan filter</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
                {filtered.map((eq) => (
                  <div key={eq.id} className="bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-all overflow-hidden flex flex-col">
                    <div className="h-44 overflow-hidden flex-shrink-0">
                      <EquipmentImage src={eq.image} alt={eq.name} />
                    </div>
                    <div className="p-4 flex flex-col flex-1">
                      <div className="flex items-start justify-between mb-2">
                        <h3 className="font-semibold text-gray-800 text-sm leading-snug">{eq.name}</h3>
                        <span className={`px-2 py-0.5 rounded-full text-xs font-medium flex-shrink-0 ml-2 ${eq.available ? "bg-green-50 text-green-600" : "bg-red-50 text-red-500"}`}>
                          {eq.available ? "Tersedia" : "Tidak Tersedia"}
                        </span>
                      </div>
                      <div className="flex gap-1.5 mb-2 flex-wrap">
                        <span className="px-2 py-0.5 rounded-full text-xs bg-blue-50" style={{ color: "#1565C0" }}>{eq.labCategory}</span>
                        <span className="px-2 py-0.5 rounded-full text-xs bg-gray-100 text-gray-500">{eq.lab}</span>
                      </div>
                      <p className="text-xs text-gray-500 mb-3 line-clamp-2">{eq.desc}</p>

                      {/* Tutorial expand — hanya kartu ini */}
                      {tutorialOpen === eq.id && (
                        <div className="mb-3 bg-blue-50 rounded-lg p-3 border border-blue-100">
                          <p className="text-xs font-semibold text-blue-700 mb-2">Tutorial Penggunaan:</p>
                          <ol className="space-y-1.5">
                            {(tutorialData[eq.name] ?? []).map((step, i) => (
                              <li key={i} className="text-xs text-gray-700 flex gap-2">
                                <span className="font-bold text-blue-600 flex-shrink-0">{i + 1}.</span>
                                <span>{step}</span>
                              </li>
                            ))}
                          </ol>
                        </div>
                      )}

                      {/* SOP expand — hanya kartu ini */}
                      {sopOpen === eq.id && (
                        <div className="mb-3 bg-gray-50 rounded-lg p-3 border border-gray-100">
                          <p className="text-xs font-semibold text-gray-700 mb-2">SOP & Panduan Keamanan:</p>
                          <ul className="space-y-1.5">
                            {(sopData[eq.name] ?? []).map((item, i) => (
                              <li key={i} className="text-xs text-gray-700 flex gap-2">
                                <span className="flex-shrink-0 mt-1.5 w-1.5 h-1.5 rounded-full bg-blue-500" />
                                <span>{item}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}

                      <div className="flex gap-1.5 mt-auto">
                        <button
                          onClick={() => setDetail(eq)}
                          className="flex-1 flex items-center justify-center gap-1 py-1.5 rounded-lg text-xs font-medium border border-gray-200 text-gray-700 hover:bg-gray-50 transition-colors"
                        >
                          <Eye size={12} /> Detail
                        </button>
                        <button
                          onClick={() => { setTutorialOpen(tutorialOpen === eq.id ? null : eq.id); setSopOpen(null); }}
                          className={`flex-1 flex items-center justify-center gap-1 py-1.5 rounded-lg text-xs font-medium transition-colors ${tutorialOpen === eq.id ? "bg-blue-600 text-white" : "bg-blue-50 text-blue-600 hover:bg-blue-100"}`}
                        >
                          <BookOpen size={12} /> Tutorial
                        </button>
                        <button
                          onClick={() => { setSopOpen(sopOpen === eq.id ? null : eq.id); setTutorialOpen(null); }}
                          className={`flex-1 flex items-center justify-center gap-1 py-1.5 rounded-lg text-xs font-medium transition-colors ${sopOpen === eq.id ? "bg-gray-600 text-white" : "bg-gray-50 text-gray-600 hover:bg-gray-100"}`}
                        >
                          <FileText size={12} /> SOP
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
