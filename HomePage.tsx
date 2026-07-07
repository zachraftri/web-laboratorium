import { useState } from "react";
import { Link } from "react-router";
import {
  ChevronRight, FlaskConical, Microscope, Atom, Leaf, Monitor,
  Pickaxe, Sprout, Wind, Wrench, Building2, UtensilsCrossed,
  BookOpen, Users, TestTube, BarChart3, Eye, ArrowRight, Star, Clock, ChevronDown, ExternalLink,
} from "lucide-react";

import imgSpektrofotometer from "../../imports/Spektrofotometer-UV-VIS-Fungsi-Prinsip-Kerja-dan-Cara-Kerjanya.jpg";
import imgMikroskop from "../../imports/mikroskop.jpg";
import imgGasChromatograph from "../../imports/gas_chromatograph.jpg";
import imgServerRack from "../../imports/rak_server.png";
import imgXRD from "../../imports/XRD.jpg";
import imgPCR from "../../imports/pcr_thermal.jfif";

const PRIMARY   = "#1565C0";
const SECONDARY = "#1E88E5";
const LIGHT_BG  = "#E3F2FD";

const stats = [
  { label: "Total Lab", value: "33", icon: Microscope, color: PRIMARY, bg: LIGHT_BG },
  { label: "Total Alat", value: "318", icon: TestTube, color: SECONDARY, bg: "#BBDEFB" },
  { label: "Pengguna Aktif", value: "1.240", icon: Users, color: "#22C55E", bg: "#F0FDF4" },
  { label: "Penelitian Aktif", value: "87", icon: BarChart3, color: "#F59E0B", bg: "#FEF3C7" },
];

const labCategories = [
  { name: "Lab Pangan", icon: UtensilsCrossed, labs: 2, color: "#F59E0B", bg: "#FEF3C7" },
  { name: "Lab Lingkungan", icon: Wind, labs: 1, color: "#22C55E", bg: "#F0FDF4" },
  { name: "Lab Agribisnis", icon: Sprout, labs: 1, color: "#84CC16", bg: "#F7FEE7" },
  { name: "Lab Fisika", icon: Atom, labs: 5, color: SECONDARY, bg: LIGHT_BG },
  { name: "Lab Kimia", icon: FlaskConical, labs: 4, color: "#EF4444", bg: "#FEF2F2" },
  { name: "Lab Biologi", icon: Leaf, labs: 4, color: "#22C55E", bg: "#F0FDF4" },
  { name: "Lab Komputer (TISIMAT)", icon: Monitor, labs: 12, color: PRIMARY, bg: LIGHT_BG },
  { name: "Lab Teknik Tambang", icon: Pickaxe, labs: 1, color: "#78716C", bg: "#F5F5F4" },
  { name: "Lab Uji Material", icon: Wrench, labs: 1, color: "#8B5CF6", bg: "#F5F3FF" },
  { name: "Ruang Serbaguna", icon: Building2, labs: 1, color: "#EC4899", bg: "#FDF2F8" },
];

const featuredEquipment = [
  { name: "Spektrofotometer UV-Vis", category: "Lab Kimia", lab: "Lab Kimia Analitik", desc: "Mengukur absorbansi cahaya dalam sampel cair", image: imgSpektrofotometer, available: true },
  { name: "Mikroskop Elektron SEM", category: "Lab Biologi", lab: "Lab Biologi Dasar", desc: "Visualisasi struktur mikro pada resolusi tinggi", image: imgMikroskop, available: true },
  { name: "Gas Chromatograph (GC)", category: "Lab Kimia", lab: "Lab Kimia Organik", desc: "Pemisahan dan analisis senyawa kimia gas", image: imgGasChromatograph, available: false },
  { name: "Server Rack & Jaringan", category: "Lab Komputer (TISIMAT)", lab: "Lab Jaringan", desc: "Infrastruktur jaringan komputer untuk simulasi", image: imgServerRack, available: true },
  { name: "XRD Machine", category: "Lab Teknik Tambang", lab: "Lab Teknologi Mineral", desc: "Analisis struktur kristal mineral menggunakan difraksi sinar X", image: imgXRD, available: true },
  { name: "PCR Thermal Cycler", category: "Lab Biologi", lab: "Lab Biologi Dasar", desc: "Amplifikasi DNA untuk penelitian pangan & biologi", image: imgPCR, available: false },
];

const researches = [
  { title: "Analisis Kandungan Bahan Organik Menggunakan Spektrofotometer UV-Vis", category: "Lab Kimia", tools: ["Spektrofotometer UV-Vis"], researcher: "Nopriadi, S.Si., M.Si.", date: "2023", link: "https://ojs.uid.ac.id/index.php/jal/article/view/1168/421" },
  { title: "Implementasi Deep Learning untuk Deteksi Penyakit Tanaman Padi", category: "Lab Komputer (TISIMAT)", tools: ["GPU Cluster", "Server Rack"], researcher: "Rina Kusumawati, M.Kom", date: "2024", link: "https://www.ejournal.itn.ac.id/jati/article/view/18058/9473" },
  { title: "Isolasi dan Karakterisasi Bakteri Endofit dari Tanaman Jahe Merah", category: "Lab Biologi", tools: ["PCR Thermal Cycler", "Mikroskop SEM"], researcher: "Prof. Sri Rahayu, Ph.D", date: "2024", link: "https://jurnal.unipar.ac.id/index.php/biocons/article/view/2342/2494" },
];

const faqs = [
  { q: "Bagaimana cara melakukan booking laboratorium?", a: "Klik menu 'Booking Lab', pilih lab yang diinginkan, pilih jadwal yang tersedia, isi formulir data diri, lalu konfirmasi booking Anda." },
  { q: "Apakah mahasiswa semester 1 bisa meminjam lab?", a: "Mahasiswa semester 1 dapat menggunakan lab untuk keperluan praktikum kelas dengan surat keterangan dari dosen pengampu mata kuliah." },
  { q: "Berapa lama proses persetujuan booking?", a: "Proses persetujuan booking memakan waktu 1x24 jam kerja. Anda akan menerima notifikasi email setelah booking disetujui." },
  { q: "Apa yang harus dibawa saat menggunakan laboratorium?", a: "Wajib membawa kartu mahasiswa, membaca SOP terlebih dahulu, menggunakan APD yang sesuai, dan membawa surat keterangan dari dosen." },
  { q: "Bagaimana jika ingin membatalkan booking?", a: "Pembatalan booking dapat dilakukan maksimal 24 jam sebelum waktu penggunaan melalui halaman riwayat booking Anda." },
];

export function HomePage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <div style={{ fontFamily: "'Inter', sans-serif", backgroundColor: "#F0F7FF" }}>
      {/* Hero */}
      <section className="relative overflow-hidden" style={{ background: `linear-gradient(135deg, ${PRIMARY} 0%, ${SECONDARY} 100%)` }}>
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-20 -right-20 w-96 h-96 rounded-full opacity-10 bg-white" />
          <div className="absolute top-1/2 -left-10 w-64 h-64 rounded-full opacity-5 bg-white" />
          <div className="absolute bottom-0 right-1/3 w-80 h-80 rounded-full opacity-10 bg-white" />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28 relative z-10">
          <div className="text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 bg-white/15 text-blue-100 px-4 py-1.5 rounded-full text-sm mb-6 border border-white/25">
              <Star size={14} /> Pusat Laboratorium Terpadu UIN Jakarta
            </div>
            <h1 className="text-4xl lg:text-5xl xl:text-6xl text-white mb-6 leading-tight" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 700 }}>
              Eksplorasi & Manfaatkan{" "}
              <span className="text-blue-200">Laboratorium Terpadu</span>
            </h1>
            <p className="text-blue-100 text-lg mb-8 leading-relaxed">
              Booking lab, cari alat, dan akses panduan penggunaan — semua dalam satu platform yang mudah digunakan.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/booking-lab"
                className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full font-semibold bg-white transition-all hover:shadow-lg"
                style={{ color: PRIMARY }}>
                Booking Lab Sekarang <ChevronRight size={18} />
              </Link>
              <Link to="/katalog-alat"
                className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full font-semibold text-white border-2 border-white/40 hover:bg-white/15 transition-all">
                Jelajahi Katalog Alat <Eye size={18} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 relative z-10">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((s) => (
            <div key={s.label} className="bg-white rounded-xl p-5 shadow-sm border border-blue-100 flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0" style={{ backgroundColor: s.bg }}>
                <s.icon size={22} style={{ color: s.color }} />
              </div>
              <div>
                <p className="text-2xl font-bold" style={{ color: "#1A1A2E", fontFamily: "'Plus Jakarta Sans', sans-serif" }}>{s.value}</p>
                <p className="text-xs text-gray-500">{s.label}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Daftar Lab */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl font-bold" style={{ color: "#1A1A2E", fontFamily: "'Plus Jakarta Sans', sans-serif" }}>Daftar Lab</h2>
            <p className="text-gray-500 text-sm mt-1">Jelajahi laboratorium yang tersedia di PLT UIN Jakarta</p>
          </div>
          <Link to="/prodi-lab" className="text-sm font-medium flex items-center gap-1" style={{ color: PRIMARY }}>
            Lihat Semua <ArrowRight size={14} />
          </Link>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
          {labCategories.map((p) => (
            <Link key={p.name} to="/prodi-lab"
              className="group bg-white rounded-xl p-4 shadow-sm border border-blue-100 hover:shadow-md hover:border-blue-300 transition-all hover:-translate-y-1 text-center">
              <div className="w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-3" style={{ backgroundColor: p.bg }}>
                <p.icon size={22} style={{ color: p.color }} />
              </div>
              <p className="text-xs font-semibold text-gray-700 leading-tight">{p.name}</p>
              <p className="text-xs text-gray-400 mt-1">{p.labs} Lab</p>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured Equipment */}
      <section className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl font-bold" style={{ color: "#1A1A2E", fontFamily: "'Plus Jakarta Sans', sans-serif" }}>Alat Unggulan Lab</h2>
              <p className="text-gray-500 text-sm mt-1">Peralatan canggih untuk mendukung penelitian Anda</p>
            </div>
            <Link to="/katalog-alat" className="text-sm font-medium flex items-center gap-1" style={{ color: PRIMARY }}>
              Lihat Semua <ArrowRight size={14} />
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredEquipment.map((eq) => (
              <div key={eq.name} className="border border-blue-100 rounded-xl overflow-hidden hover:shadow-md transition-all group">
                <div className="h-40 overflow-hidden">
                  {eq.image
                    ? <img src={eq.image} alt={eq.name} className="w-full h-full object-cover" />
                    : <div className="w-full h-full flex items-center justify-center" style={{ background: `linear-gradient(135deg, ${LIGHT_BG} 0%, #BBDEFB 100%)` }}><FlaskConical size={48} style={{ color: PRIMARY }} className="opacity-25" /></div>
                  }
                </div>
                <div className="p-4">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="font-semibold text-gray-800 text-sm leading-tight">{eq.name}</h3>
                    <span className={`px-2 py-0.5 rounded-full text-xs font-medium flex-shrink-0 ml-2 ${eq.available ? "bg-green-50 text-green-600" : "bg-red-50 text-red-500"}`}>
                      {eq.available ? "Tersedia" : "Tidak Tersedia"}
                    </span>
                  </div>
                  <div className="flex gap-2 mb-2 flex-wrap">
                    <span className="px-2 py-0.5 rounded-full text-xs font-medium" style={{ backgroundColor: LIGHT_BG, color: PRIMARY }}>{eq.category}</span>
                    <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-600">{eq.lab}</span>
                  </div>
                  <p className="text-xs text-gray-500 mb-3">{eq.desc}</p>
                  <div className="flex gap-2">
                    <Link to="/katalog-alat"
                      className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-medium text-white transition-colors"
                      style={{ backgroundColor: PRIMARY }}>
                      <Eye size={12} /> Lihat Detail
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Research */}
      <section className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl font-bold" style={{ color: "#1A1A2E", fontFamily: "'Plus Jakarta Sans', sans-serif" }}>Penelitian Terkini</h2>
              <p className="text-gray-500 text-sm mt-1">Hasil penelitian terbaru menggunakan fasilitas laboratorium</p>
            </div>
            <Link to="/penelitian" className="text-sm font-medium flex items-center gap-1" style={{ color: PRIMARY }}>
              Lihat Semua <ArrowRight size={14} />
            </Link>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {researches.map((r, i) => (
              <div key={i} className="border border-blue-100 rounded-xl p-5 hover:shadow-md transition-all">
                <span className="inline-block px-3 py-1 rounded-full text-xs font-medium mb-3" style={{ backgroundColor: LIGHT_BG, color: PRIMARY }}>{r.category}</span>
                <h3 className="font-semibold text-gray-800 mb-2 leading-snug">{r.title}</h3>
                <div className="flex flex-wrap gap-1.5 mb-3">
                  {r.tools.map((t) => <span key={t} className="px-2 py-0.5 rounded-md text-xs bg-gray-100 text-gray-500">{t}</span>)}
                </div>
                <div className="flex items-center justify-between text-xs text-gray-400 border-t border-gray-100 pt-3 mt-3">
                  <div className="flex items-center gap-1"><BookOpen size={12} /><span>{r.researcher}</span></div>
                  <div className="flex items-center gap-1"><Clock size={12} /><span>{r.date}</span></div>
                </div>
                <a href={r.link} target="_blank" rel="noopener noreferrer" className="text-xs font-medium mt-3 flex items-center gap-1" style={{ color: SECONDARY }}>
                  Baca Selengkapnya <ExternalLink size={12} />
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-10">
          <h2 className="text-2xl font-bold mb-2" style={{ color: "#1A1A2E", fontFamily: "'Plus Jakarta Sans', sans-serif" }}>Pertanyaan yang Sering Diajukan</h2>
          <p className="text-gray-500 text-sm">Temukan jawaban untuk pertanyaan umum seputar penggunaan lab</p>
        </div>
        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <div key={i} className="bg-white rounded-xl border border-blue-100 overflow-hidden shadow-sm">
              <button className="w-full flex items-center justify-between p-5 text-left" onClick={() => setOpenFaq(openFaq === i ? null : i)}>
                <span className="font-medium text-gray-800 text-sm pr-4">{faq.q}</span>
                <ChevronDown size={18} className={`flex-shrink-0 text-gray-400 transition-transform ${openFaq === i ? "rotate-180" : ""}`} />
              </button>
              {openFaq === i && (
                <div className="px-5 pb-5 text-sm text-gray-600 leading-relaxed border-t border-blue-50">
                  <div className="pt-3">{faq.a}</div>
                </div>
              )}
            </div>
          ))}
        </div>
        <div className="text-center mt-8">
          <Link to="/faq" className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-semibold border-2 transition-all hover:bg-blue-50" style={{ color: PRIMARY, borderColor: PRIMARY }}>
            Lihat Semua FAQ <ArrowRight size={16} />
          </Link>
        </div>
      </section>
    </div>
  );
}
