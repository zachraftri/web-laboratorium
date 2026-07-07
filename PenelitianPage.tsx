import { useState } from "react";
import { Link } from "react-router";
import { ChevronRight, Search, BookOpen, User, ArrowRight, ExternalLink } from "lucide-react";

const researches = [
  {
    title: "Analisis Kandungan Bahan Organik Menggunakan Spektrofotometer UV-Vis pada Sampel Air Sungai",
    abstract: "Penelitian ini bertujuan menganalisis kandungan bahan organik terlarut pada sampel air sungai menggunakan metode spektrofotometri UV-Vis untuk mengevaluasi kualitas air dan potensi pencemaran lingkungan.",
    author: "Nopriadi, S.Si., M.Si.",
    supervisor: "Dr. Ahmad Fauzi",
    prodi: "Kimia",
    year: "2023",
    equipment: ["Spektrofotometer UV-Vis"],
    link: "https://ojs.uid.ac.id/index.php/jal/article/view/1168/421",
  },
  {
    title: "Sistem Informasi Laboratorium Berbasis Web untuk Manajemen Peminjaman Alat",
    abstract: "Penelitian ini merancang dan mengimplementasikan sistem informasi laboratorium berbasis web yang memudahkan proses peminjaman alat, penjadwalan, dan pelaporan penggunaan laboratorium secara terintegrasi.",
    author: "Rizky Firmansyah",
    supervisor: "Dr. Hendra Wijaya",
    prodi: "Sistem Informasi",
    year: "2023",
    equipment: ["Server Rack", "Komputer Workstation"],
    link: "https://utilityprojectsolution.org/ejournal/index.php/JuKSIT/article/view/50",
  },
  {
    title: "Isolasi dan Karakterisasi Bakteri Endofit dari Tanaman Jahe Merah sebagai Agen Biokontrol",
    abstract: "Penelitian ini mengisolasi dan mengkarakterisasi bakteri endofit dari rizoma jahe merah untuk mengidentifikasi potensinya sebagai agen biokontrol terhadap patogen tanaman secara biologis.",
    author: "Prof. Sri Rahayu, Ph.D",
    supervisor: "Dr. Dewi Lestari",
    prodi: "Biologi",
    year: "2024",
    equipment: ["PCR Thermal Cycler", "Mikroskop SEM", "Spektrofotometer UV-Vis"],
    link: "https://jurnal.unipar.ac.id/index.php/biocons/article/view/2342/2494",
  },
  {
    title: "Analisis Kandungan Mineral Batu Bara Daerah Kalimantan Selatan Menggunakan XRD",
    abstract: "Penelitian ini bertujuan untuk menganalisis komposisi mineral batu bara dari daerah Kalimantan Selatan menggunakan teknik XRD untuk menentukan kualitas dan potensi penggunaannya sebagai bahan bakar.",
    author: "Dr. Ahmad Fauzi, M.T.",
    supervisor: "Prof. Budi Santoso",
    prodi: "Teknik Tambang",
    year: "2024",
    equipment: ["XRD Machine", "Mikroskop SEM"],
    link: "https://www.jurnalpoltekam.or.id/index.php/Amata_amamapare/article/view/113/78",
  },
  {
    title: "Implementasi Deep Learning untuk Deteksi Penyakit Tanaman Padi berbasis Citra Digital",
    abstract: "Penelitian ini mengembangkan model CNN untuk mendeteksi penyakit tanaman padi secara otomatis menggunakan dataset citra daun yang dikumpulkan dari beberapa wilayah pertanian di Jawa Barat.",
    author: "Rina Kusumawati, M.Kom",
    supervisor: "Dr. Hendra Wijaya",
    prodi: "Teknik Informatika",
    year: "2024",
    equipment: ["GPU Cluster", "Server Rack"],
    link: "https://www.ejournal.itn.ac.id/jati/article/view/18058/9473",
  },
  {
    title: "Keanekaragaman Jenis Tumbuhan Paku di Kawasan Hutan Lindung",
    abstract: "Penelitian ini melakukan inventarisasi dan analisis keanekaragaman jenis tumbuhan paku (Pteridophyta) di kawasan hutan lindung menggunakan metode transek dan kuadrat.",
    author: "Dr. Anisa Mutiara",
    supervisor: "Prof. Rudi Hartono",
    prodi: "Biologi",
    year: "2024",
    equipment: ["Mikroskop Elektron SEM", "PCR Thermal Cycler"],
    link: "https://ejournal.brin.go.id/berita_biologi/article/view/8935",
  },
  {
    title: "Analisis Efisiensi Energi pada Panel Surya Polycrystalline menggunakan Sensor IoT",
    abstract: "Penelitian ini merancang sistem monitoring real-time berbasis IoT untuk menganalisis efisiensi konversi energi panel surya polycrystalline pada berbagai kondisi cuaca dan intensitas cahaya.",
    author: "M. Rizky Pratama, M.T.",
    supervisor: "Dr. Siti Aminah",
    prodi: "Fisika",
    year: "2023",
    equipment: ["Osiloskop Digital", "GPU Cluster"],
    link: "https://ejournal.unesa.ac.id/index.php/inovasi-fisika-indonesia/article/view/72228/53082",
  },
  {
    title: "Rancang Bangun Mesin Pengupas Kacang Tanah Semi-Otomatis",
    abstract: "Penelitian ini merancang dan membangun mesin pengupas kacang tanah semi-otomatis yang bertujuan meningkatkan efisiensi proses pengupasan untuk mendukung produktivitas usaha kecil dan menengah di bidang pertanian.",
    author: "Dina Pramesti, M.Kom",
    supervisor: "Dr. Arief Rachman",
    prodi: "Agribisnis",
    year: "2023",
    equipment: ["Alat Uji Tekan Batuan", "Bomb Calorimeter"],
    link: "https://jurnal.ceredindonesia.or.id/index.php/mesil/article/view/1232/1258",
  },
  {
    title: "Penerapan Metode Gas Chromatography untuk Analisis Senyawa Volatil pada Produk Pangan",
    abstract: "Penelitian ini menggunakan Gas Chromatography (GC) untuk mengidentifikasi dan mengkuantifikasi senyawa volatil pada produk pangan fermentasi lokal guna menjamin kualitas dan keamanan pangan.",
    author: "Dr. Budi Santosa",
    supervisor: "Prof. Wulan Sari",
    prodi: "Kimia",
    year: "2024",
    equipment: ["Gas Chromatograph (GC)", "Spektrofotometer UV-Vis"],
    link: "https://ejournal.papanda.org/index.php/jira/article/view/1845",
  },
];

const prodis = ["Semua Prodi", "Kimia", "Biologi", "Fisika", "Teknik Informatika", "Teknik Tambang", "Sistem Informasi", "Agribisnis"];
const years = ["Semua Tahun", "2024", "2023", "2022", "2021"];

const prodiColors: Record<string, { bg: string; text: string }> = {
  "Kimia": { bg: "#FEF2F2", text: "#EF4444" },
  "Biologi": { bg: "#F0FDF4", text: "#22C55E" },
  "Fisika": { bg: "#ECFEFF", text: "#06B6D4" },
  "Teknik Informatika": { bg: "#EFF6FF", text: "#3B82F6" },
  "Teknik Tambang": { bg: "#F5F5F4", text: "#78716C" },
  "Sistem Informasi": { bg: "#F5F3FF", text: "#8B5CF6" },
  "Agribisnis": { bg: "#F7FEE7", text: "#84CC16" },
};

export function PenelitianPage() {
  const [search, setSearch] = useState("");
  const [selectedProdi, setSelectedProdi] = useState("Semua Prodi");
  const [selectedYear, setSelectedYear] = useState("Semua Tahun");

  const filtered = researches.filter((r) => {
    const ms = r.title.toLowerCase().includes(search.toLowerCase()) || r.abstract.toLowerCase().includes(search.toLowerCase());
    const mp = selectedProdi === "Semua Prodi" || r.prodi === selectedProdi;
    const my = selectedYear === "Semua Tahun" || r.year === selectedYear;
    return ms && mp && my;
  });

  return (
    <div style={{ fontFamily: "'Inter', sans-serif", backgroundColor: "#F0F7FF", minHeight: "100vh" }}>
      {/* Header */}
      <div style={{ backgroundColor: "#1565C0" }} className="py-8 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-2 text-blue-300 text-sm mb-3">
            <Link to="/" className="hover:text-white">Beranda</Link>
            <ChevronRight size={14} />
            <span className="text-white">Penelitian</span>
          </div>
          <h1 className="text-3xl font-bold text-white" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>Showcase Penelitian</h1>
          <p className="text-blue-200 mt-2">Hasil penelitian terbaru yang dilakukan menggunakan fasilitas laboratorium kampus</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Filter Bar */}
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-4 mb-6 flex flex-wrap gap-3 items-center">
          <div className="relative flex-1 min-w-48">
            <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Cari penelitian..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-100"
            />
          </div>
          <select value={selectedProdi} onChange={(e) => setSelectedProdi(e.target.value)} className="px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-100 bg-white">
            {prodis.map((p) => <option key={p}>{p}</option>)}
          </select>
          <select value={selectedYear} onChange={(e) => setSelectedYear(e.target.value)} className="px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-100 bg-white">
            {years.map((y) => <option key={y}>{y}</option>)}
          </select>
          <p className="text-sm text-gray-400 ml-auto">{filtered.length} penelitian</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filtered.map((r, i) => {
            const color = prodiColors[r.prodi] ?? { bg: "#EEF2FF", text: "#1565C0" };
            return (
              <div key={i} className="bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-all overflow-hidden flex flex-col">
                <div className="p-5 flex flex-col flex-1">
                  <span
                    className="inline-block px-3 py-1 rounded-full text-xs font-medium mb-3"
                    style={{ backgroundColor: color.bg, color: color.text }}
                  >
                    {r.prodi}
                  </span>
                  <h3 className="font-semibold text-gray-800 leading-snug mb-2">{r.title}</h3>
                  <p className="text-sm text-gray-500 leading-relaxed mb-3 flex-1" style={{ display: "-webkit-box", WebkitLineClamp: 3, WebkitBoxOrient: "vertical", overflow: "hidden" }}>
                    {r.abstract}
                  </p>
                  <div className="flex flex-wrap gap-1.5 mb-3">
                    {r.equipment.map((eq) => (
                      <span key={eq} className="px-2 py-0.5 rounded-md text-xs bg-gray-100 text-gray-500">{eq}</span>
                    ))}
                  </div>
                  <div className="border-t border-gray-100 pt-3 mt-auto">
                    <div className="flex items-center justify-between">
                      <div className="text-xs text-gray-500 space-y-0.5">
                        <div className="flex items-center gap-1.5">
                          <User size={11} />
                          <span>{r.author}</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <BookOpen size={11} />
                          <span>Pembimbing: {r.supervisor}</span>
                        </div>
                        <div className="text-gray-400">{r.year}</div>
                      </div>
                      <a
                        href={r.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-white transition-all hover:opacity-90"
                        style={{ backgroundColor: "#1565C0" }}
                      >
                        Baca Selengkapnya <ExternalLink size={11} />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {filtered.length === 0 && (
          <div className="bg-white rounded-xl p-12 text-center border border-gray-100">
            <BookOpen size={48} className="mx-auto text-gray-300 mb-3" />
            <p className="text-gray-500">Tidak ada penelitian yang sesuai</p>
          </div>
        )}
      </div>
    </div>
  );
}
