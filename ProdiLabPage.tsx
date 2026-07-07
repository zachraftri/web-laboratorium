import { useState } from "react";
import { Link } from "react-router";
import {
  FlaskConical, Atom, Leaf, Monitor, Pickaxe, Sprout, Wind, Wrench, Building2, UtensilsCrossed,
  Users, ChevronRight, Eye, CalendarCheck,
} from "lucide-react";

const labCategories = [
  {
    name: "Lab Pangan",
    icon: UtensilsCrossed,
    color: "#F59E0B",
    bg: "#FEF3C7",
    desc: "Laboratorium yang berfokus pada penelitian dan pengujian produk pangan, bioteknologi pangan, serta keamanan dan kualitas bahan pangan.",
    labs: [
      { name: "Lab Bioteknologi Pangan", capacity: 24, status: "Tersedia", facilities: ["Spektrofotometer", "PCR", "AC", "Lemari Asam"] },
      { name: "Lab Kimia Pangan", capacity: 20, status: "Terbatas", facilities: ["Sentrifuge", "AC", "Lemari Asam", "Proyektor"] },
    ],
  },
  {
    name: "Lab Lingkungan",
    icon: Wind,
    color: "#22C55E",
    bg: "#F0FDF4",
    desc: "Laboratorium untuk analisis kualitas lingkungan, pengujian polutan, dan penelitian terkait ekosistem dan kesehatan lingkungan.",
    labs: [
      { name: "Lab Lingkungan 1", capacity: 28, status: "Tersedia", facilities: ["Alat Sampling", "Spektrofotometer", "AC", "Proyektor"] },
    ],
  },
  {
    name: "Lab Agribisnis",
    icon: Sprout,
    color: "#84CC16",
    bg: "#F7FEE7",
    desc: "Laboratorium yang mengintegrasikan ilmu pertanian dengan manajemen bisnis untuk mendukung pengembangan sektor agrikultur.",
    labs: [
      { name: "Lab Agribisnis", capacity: 35, status: "Tersedia", facilities: ["Komputer", "AC", "Proyektor", "Internet"] },
    ],
  },
  {
    name: "Lab Fisika",
    icon: Atom,
    color: "#06B6D4",
    bg: "#ECFEFF",
    desc: "Laboratorium fisika untuk praktikum dan penelitian mulai dari fisika dasar hingga fisika material, instrumentasi, dan geofisika.",
    labs: [
      { name: "Lab Fisika Dasar", capacity: 30, status: "Tersedia", facilities: ["Alat Optik", "AC", "Proyektor"] },
      { name: "Lab Fisika Lanjut", capacity: 20, status: "Terbatas", facilities: ["Laser", "Spektrometer", "AC"] },
      { name: "Lab Fisika Material dan Komputasi", capacity: 24, status: "Tersedia", facilities: ["XRD", "Komputer", "AC"] },
      { name: "Lab Fisika Instrumentasi", capacity: 22, status: "Penuh", facilities: ["Osiloskop", "Multimeter", "AC"] },
      { name: "Lab Geofisika", capacity: 18, status: "Tersedia", facilities: ["Alat Survei", "Komputer", "AC"] },
    ],
  },
  {
    name: "Lab Kimia",
    icon: FlaskConical,
    color: "#EF4444",
    bg: "#FEF2F2",
    desc: "Laboratorium kimia yang mencakup kimia dasar, analitik, organik, dan biokimia untuk mendukung kegiatan praktikum dan penelitian.",
    labs: [
      { name: "Lab Kimia Dasar", capacity: 30, status: "Tersedia", facilities: ["Alat Dasar", "AC", "Lemari Asam", "Proyektor"] },
      { name: "Lab Kimia Analitik", capacity: 24, status: "Tersedia", facilities: ["Spektrofotometer", "AC", "Lemari Asam"] },
      { name: "Lab Kimia Organik", capacity: 20, status: "Terbatas", facilities: ["GC", "AC", "Lemari Asam"] },
      { name: "Lab Biokimia", capacity: 22, status: "Tersedia", facilities: ["Sentrifuge", "Spektrofotometer", "AC"] },
    ],
  },
  {
    name: "Lab Biologi",
    icon: Leaf,
    color: "#22C55E",
    bg: "#F0FDF4",
    desc: "Laboratorium biologi yang mencakup studi biologi dasar, fisiologi, ekologi, dan mikrobiologi untuk keperluan akademik dan riset.",
    labs: [
      { name: "Lab Biologi Dasar", capacity: 28, status: "Tersedia", facilities: ["Mikroskop", "AC", "Proyektor"] },
      { name: "Lab Fisiologi", capacity: 24, status: "Terbatas", facilities: ["Alat Uji", "Mikroskop", "AC"] },
      { name: "Lab Ekologi", capacity: 30, status: "Tersedia", facilities: ["Alat Sampling", "AC", "Proyektor"] },
      { name: "Lab Mikrobiologi", capacity: 22, status: "Penuh", facilities: ["Autoklaf", "Laminar Flow", "AC"] },
    ],
  },
  {
    name: "Lab Komputer (TISIMAT)",
    icon: Monitor,
    color: "#3B82F6",
    bg: "#EFF6FF",
    desc: "Kompleks laboratorium komputer untuk program studi Teknik Informatika, Sistem Informasi, dan Matematika dengan fasilitas lengkap.",
    labs: [
      { name: "Lab Sistem Operasi", capacity: 40, status: "Tersedia", facilities: ["Komputer", "AC", "Proyektor"] },
      { name: "Lab Pemrograman", capacity: 40, status: "Tersedia", facilities: ["Komputer", "AC", "Proyektor"] },
      { name: "Lab Jaringan", capacity: 35, status: "Terbatas", facilities: ["Server Rack", "Switch", "AC"] },
      { name: "Lab Matematika", capacity: 40, status: "Tersedia", facilities: ["Komputer", "AC", "Proyektor"] },
      { name: "Lab Aplikasi 1", capacity: 40, status: "Penuh", facilities: ["Komputer", "AC", "Proyektor"] },
      { name: "Lab Aplikasi 2", capacity: 40, status: "Tersedia", facilities: ["Komputer", "AC", "Proyektor"] },
      { name: "Lab Multimedia 1", capacity: 30, status: "Tersedia", facilities: ["Komputer", "Kamera", "AC"] },
      { name: "Lab Multimedia 2", capacity: 30, status: "Terbatas", facilities: ["Komputer", "Kamera", "AC"] },
      { name: "Lab Digital dan Robotik", capacity: 25, status: "Tersedia", facilities: ["Robot Kit", "Arduino", "AC"] },
      { name: "Lab Data Sains", capacity: 35, status: "Tersedia", facilities: ["GPU Server", "Komputer", "AC"] },
      { name: "Lab Riset dan Pengembangan", capacity: 20, status: "Terbatas", facilities: ["Workstation", "Server", "AC"] },
      { name: "ELC Matematika", capacity: 40, status: "Tersedia", facilities: ["Komputer", "AC", "Proyektor", "Internet"] },
    ],
  },
  {
    name: "Lab Teknik Tambang",
    icon: Pickaxe,
    color: "#78716C",
    bg: "#F5F5F4",
    desc: "Laboratorium untuk penelitian dan pengujian material mineral serta mendukung kegiatan akademik program studi Teknik Pertambangan.",
    labs: [
      { name: "Lab Teknologi Mineral", capacity: 25, status: "Tersedia", facilities: ["XRD", "Mikroskop", "AC", "Proyektor"] },
    ],
  },
  {
    name: "Lab Uji Material",
    icon: Wrench,
    color: "#8B5CF6",
    bg: "#F5F3FF",
    desc: "Laboratorium pengujian material untuk analisis sifat mekanik, fisik, dan kimia berbagai jenis material teknik.",
    labs: [
      { name: "Lab Uji Material", capacity: 20, status: "Terbatas", facilities: ["Alat Uji Tekan", "Alat Uji Tarik", "AC"] },
    ],
  },
  {
    name: "Ruang Serbaguna",
    icon: Building2,
    color: "#EC4899",
    bg: "#FDF2F8",
    desc: "Ruang multifungsi yang dapat digunakan untuk seminar, workshop, kuliah tamu, dan kegiatan akademik lainnya.",
    labs: [
      { name: "Ruang Smart Class", capacity: 50, status: "Tersedia", facilities: ["Proyektor", "AC", "Sound System", "Internet", "Smart Board"] },
    ],
  },
];

function StatusBadge({ status }: { status: string }) {
  const map: Record<string, string> = {
    Tersedia: "bg-green-50 text-green-600 border-green-200",
    Terbatas: "bg-blue-50 text-blue-500 border-blue-200",
    Penuh: "bg-red-50 text-red-500 border-red-200",
  };
  return (
    <span className={`px-2.5 py-1 rounded-full text-xs font-semibold border ${map[status] || ""}`}>
      {status}
    </span>
  );
}

export function ProdiLabPage() {
  const [selected, setSelected] = useState(0);
  const category = labCategories[selected];

  return (
    <div style={{ fontFamily: "'Inter', sans-serif", backgroundColor: "#F0F7FF", minHeight: "100vh" }}>
      {/* Header */}
      <div style={{ backgroundColor: "#1565C0" }} className="py-8 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-2 text-blue-300 text-sm mb-3">
            <Link to="/" className="hover:text-white">Beranda</Link>
            <ChevronRight size={14} />
            <span className="text-white">Daftar Lab</span>
          </div>
          <h1 className="text-3xl font-bold text-white" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
            Daftar Lab
          </h1>
          <p className="text-blue-200 mt-2">Pilih kategori lab untuk melihat daftar laboratorium yang tersedia</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Category Tabs */}
        <div className="flex flex-wrap gap-2 mb-8">
          {labCategories.map((cat, i) => (
            <button
              key={cat.name}
              onClick={() => setSelected(i)}
              className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all border ${
                selected === i
                  ? "text-white border-transparent shadow-sm"
                  : "bg-white border-gray-200 text-gray-600 hover:border-gray-300"
              }`}
              style={selected === i ? { backgroundColor: "#1565C0" } : {}}
            >
              <cat.icon size={14} />
              {cat.name}
            </button>
          ))}
        </div>

        {/* Category Banner */}
        <div
          className="rounded-2xl p-6 mb-8 flex items-center gap-5"
          style={{ backgroundColor: category.bg, border: `1px solid ${category.color}30` }}
        >
          <div
            className="w-16 h-16 rounded-2xl flex items-center justify-center flex-shrink-0"
            style={{ backgroundColor: category.color + "20" }}
          >
            <category.icon size={32} style={{ color: category.color }} />
          </div>
          <div>
            <h2 className="text-xl font-bold mb-1" style={{ color: "#1A1A2E", fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
              {category.name}
            </h2>
            <p className="text-gray-600 text-sm">{category.desc}</p>
            <p className="text-sm font-medium mt-1" style={{ color: category.color }}>
              {category.labs.length} Laboratorium tersedia
            </p>
          </div>
        </div>

        {/* Lab Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {category.labs.map((lab) => (
            <div key={lab.name} className="bg-white rounded-xl border border-blue-100 shadow-sm hover:shadow-md transition-all p-5">
              <div className="flex items-start justify-between mb-3">
                <h3 className="font-semibold text-gray-800">{lab.name}</h3>
                <StatusBadge status={lab.status} />
              </div>
              <span
                className="inline-block px-2.5 py-1 rounded-full text-xs font-medium mb-3"
                style={{ backgroundColor: category.bg, color: category.color }}
              >
                {category.name}
              </span>
              <div className="flex items-center gap-2 text-sm text-gray-500 mb-3">
                <Users size={14} />
                <span>Kapasitas: {lab.capacity} orang</span>
              </div>
              <div className="flex flex-wrap gap-1.5 mb-4">
                {lab.facilities.map((f) => (
                  <span key={f} className="px-2 py-1 bg-gray-50 rounded-lg text-xs text-gray-500 border border-blue-100">
                    {f}
                  </span>
                ))}
              </div>
              <div className="flex gap-2 border-t border-gray-50 pt-4">
                <Link
                  to="/katalog-alat"
                  state={{ labFilter: category.name }}
                  className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg text-sm font-medium border border-gray-200 text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  <Eye size={14} /> Lihat Alat
                </Link>
                <Link
                  to="/booking-lab"
                  className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg text-sm font-medium text-white transition-colors"
                  style={{ backgroundColor: "#1E88E5" }}
                >
                  <CalendarCheck size={14} /> Booking Lab
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
