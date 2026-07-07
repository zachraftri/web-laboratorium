import { useState } from "react";
import { Link } from "react-router";
import { ChevronRight, List, Grid3X3 } from "lucide-react";

const days = ["Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu"];
const hours = ["08:00", "09:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00"];

const allLabs = [
  // Lab Pangan
  "Lab Bioteknologi Pangan",
  "Lab Kimia Pangan",
  // Lab Lingkungan
  "Lab Lingkungan 1",
  // Lab Agribisnis
  "Lab Agribisnis",
  // Lab Fisika
  "Lab Fisika Dasar",
  "Lab Fisika Lanjut",
  "Lab Fisika Material dan Komputasi",
  "Lab Fisika Instrumentasi",
  "Lab Geofisika",
  // Lab Kimia
  "Lab Kimia Dasar",
  "Lab Kimia Analitik",
  "Lab Kimia Organik",
  "Lab Biokimia",
  // Lab Biologi
  "Lab Biologi Dasar",
  "Lab Fisiologi",
  "Lab Ekologi",
  "Lab Mikrobiologi",
  // Lab Komputer (TISIMAT)
  "Lab Sistem Operasi",
  "Lab Pemrograman",
  "Lab Jaringan",
  "Lab Matematika",
  "Lab Aplikasi 1",
  "Lab Aplikasi 2",
  "Lab Multimedia 1",
  "Lab Multimedia 2",
  "Lab Digital dan Robotik",
  "Lab Data Sains",
  "Lab Riset dan Pengembangan",
  "ELC Matematika",
  // Lab Teknik Tambang
  "Lab Teknologi Mineral",
  // Lab Uji Material
  "Lab Uji Material",
  // Ruang Serbaguna
  "Ruang Smart Class",
];

const labCategories: Record<string, string> = {
  "Lab Bioteknologi Pangan": "Lab Pangan",
  "Lab Kimia Pangan": "Lab Pangan",
  "Lab Lingkungan 1": "Lab Lingkungan",
  "Lab Agribisnis": "Lab Agribisnis",
  "Lab Fisika Dasar": "Lab Fisika",
  "Lab Fisika Lanjut": "Lab Fisika",
  "Lab Fisika Material dan Komputasi": "Lab Fisika",
  "Lab Fisika Instrumentasi": "Lab Fisika",
  "Lab Geofisika": "Lab Fisika",
  "Lab Kimia Dasar": "Lab Kimia",
  "Lab Kimia Analitik": "Lab Kimia",
  "Lab Kimia Organik": "Lab Kimia",
  "Lab Biokimia": "Lab Kimia",
  "Lab Biologi Dasar": "Lab Biologi",
  "Lab Fisiologi": "Lab Biologi",
  "Lab Ekologi": "Lab Biologi",
  "Lab Mikrobiologi": "Lab Biologi",
  "Lab Sistem Operasi": "Lab Komputer (TISIMAT)",
  "Lab Pemrograman": "Lab Komputer (TISIMAT)",
  "Lab Jaringan": "Lab Komputer (TISIMAT)",
  "Lab Matematika": "Lab Komputer (TISIMAT)",
  "Lab Aplikasi 1": "Lab Komputer (TISIMAT)",
  "Lab Aplikasi 2": "Lab Komputer (TISIMAT)",
  "Lab Multimedia 1": "Lab Komputer (TISIMAT)",
  "Lab Multimedia 2": "Lab Komputer (TISIMAT)",
  "Lab Digital dan Robotik": "Lab Komputer (TISIMAT)",
  "Lab Data Sains": "Lab Komputer (TISIMAT)",
  "Lab Riset dan Pengembangan": "Lab Komputer (TISIMAT)",
  "ELC Matematika": "Lab Komputer (TISIMAT)",
  "Lab Teknologi Mineral": "Lab Teknik Tambang",
  "Lab Uji Material": "Lab Uji Material",
  "Ruang Smart Class": "Ruang Serbaguna",
};

type BookingEntry = {
  lab: string;
  day: number;
  start: number;
  duration: number;
  group: string;
  status: "confirmed" | "pending";
};

const bookings: BookingEntry[] = [
  { lab: "Lab Bioteknologi Pangan", day: 0, start: 0, duration: 2, group: "Kelompok A1", status: "confirmed" },
  { lab: "Lab Kimia Pangan", day: 1, start: 2, duration: 2, group: "Kelompok B2", status: "confirmed" },
  { lab: "Lab Lingkungan 1", day: 2, start: 4, duration: 2, group: "Kelompok C1", status: "pending" },
  { lab: "Lab Agribisnis", day: 0, start: 4, duration: 2, group: "Kelas Agribisnis-2A", status: "confirmed" },
  { lab: "Lab Fisika Dasar", day: 1, start: 0, duration: 2, group: "Kelas Fisika-1A", status: "confirmed" },
  { lab: "Lab Fisika Lanjut", day: 3, start: 2, duration: 2, group: "Kelompok Riset", status: "pending" },
  { lab: "Lab Fisika Material dan Komputasi", day: 4, start: 0, duration: 3, group: "Tim Peneliti", status: "confirmed" },
  { lab: "Lab Fisika Instrumentasi", day: 2, start: 0, duration: 2, group: "Kelas Fisika-3B", status: "confirmed" },
  { lab: "Lab Geofisika", day: 5, start: 1, duration: 2, group: "Kelompok D2", status: "confirmed" },
  { lab: "Lab Kimia Dasar", day: 0, start: 2, duration: 2, group: "Kelas Kimia-1A", status: "confirmed" },
  { lab: "Lab Kimia Analitik", day: 1, start: 4, duration: 2, group: "Kelompok A3", status: "confirmed" },
  { lab: "Lab Kimia Organik", day: 3, start: 0, duration: 2, group: "Kelompok C2", status: "pending" },
  { lab: "Lab Biokimia", day: 4, start: 4, duration: 2, group: "Tim Peneliti Biokimia", status: "confirmed" },
  { lab: "Lab Biologi Dasar", day: 0, start: 6, duration: 2, group: "Kelas Biologi-1B", status: "confirmed" },
  { lab: "Lab Fisiologi", day: 2, start: 2, duration: 2, group: "Kelompok E1", status: "confirmed" },
  { lab: "Lab Ekologi", day: 5, start: 3, duration: 2, group: "Kelompok Ekologi", status: "pending" },
  { lab: "Lab Mikrobiologi", day: 1, start: 6, duration: 2, group: "Kelompok F3", status: "confirmed" },
  { lab: "Lab Sistem Operasi", day: 0, start: 0, duration: 2, group: "Kelas TI-2A", status: "confirmed" },
  { lab: "Lab Pemrograman", day: 1, start: 0, duration: 2, group: "Kelas TI-1A", status: "confirmed" },
  { lab: "Lab Jaringan", day: 2, start: 6, duration: 2, group: "Kelas TI-3A", status: "pending" },
  { lab: "Lab Matematika", day: 3, start: 4, duration: 2, group: "Kelas Mat-2B", status: "confirmed" },
  { lab: "Lab Aplikasi 1", day: 4, start: 2, duration: 2, group: "Kelas SI-2A", status: "confirmed" },
  { lab: "Lab Aplikasi 2", day: 0, start: 4, duration: 2, group: "Kelas SI-3B", status: "confirmed" },
  { lab: "Lab Multimedia 1", day: 1, start: 2, duration: 2, group: "Kelas TI-2B", status: "confirmed" },
  { lab: "Lab Multimedia 2", day: 5, start: 0, duration: 2, group: "Kelas Multimedia", status: "pending" },
  { lab: "Lab Digital dan Robotik", day: 3, start: 0, duration: 2, group: "Tim Robotik", status: "confirmed" },
  { lab: "Lab Data Sains", day: 2, start: 4, duration: 3, group: "Tim Data Science", status: "confirmed" },
  { lab: "Lab Riset dan Pengembangan", day: 4, start: 6, duration: 2, group: "Tim R&D", status: "confirmed" },
  { lab: "ELC Matematika", day: 1, start: 4, duration: 2, group: "Kelas Mat-1A", status: "confirmed" },
  { lab: "Lab Teknologi Mineral", day: 3, start: 2, duration: 2, group: "Kelas Tambang-3A", status: "confirmed" },
  { lab: "Lab Uji Material", day: 5, start: 2, duration: 2, group: "Tim Uji Material", status: "pending" },
  { lab: "Ruang Smart Class", day: 0, start: 2, duration: 4, group: "Seminar Nasional", status: "confirmed" },
];

const tableData = bookings.map((b) => ({
  tanggal: ["Senin, 18 Nov", "Selasa, 19 Nov", "Rabu, 20 Nov", "Kamis, 21 Nov", "Jumat, 22 Nov", "Sabtu, 23 Nov"][b.day] + " 2024",
  lab: b.lab,
  kategori: labCategories[b.lab] || "-",
  waktu: `${hours[b.start]}–${hours[b.start + b.duration]}`,
  pengguna: b.group,
  status: b.status === "confirmed" ? "Dikonfirmasi" : "Menunggu",
}));

const categoryOptions = ["Semua Kategori", ...Array.from(new Set(Object.values(labCategories)))];

export function JadwalPage() {
  const [view, setView] = useState<"weekly" | "list">("list");
  const [filterKategori, setFilterKategori] = useState("Semua Kategori");
  const [filterLab, setFilterLab] = useState("Semua Lab");
  const [hoveredBlock, setHoveredBlock] = useState<BookingEntry | null>(null);
  const [hoverPos, setHoverPos] = useState({ x: 0, y: 0 });

  const filteredLabs = filterKategori === "Semua Kategori"
    ? allLabs
    : allLabs.filter((l) => labCategories[l] === filterKategori);

  const filteredBookings = bookings.filter((b) => {
    const matchKat = filterKategori === "Semua Kategori" || labCategories[b.lab] === filterKategori;
    const matchLab = filterLab === "Semua Lab" || b.lab === filterLab;
    return matchKat && matchLab;
  });

  const filteredTable = tableData.filter((r) => {
    const matchKat = filterKategori === "Semua Kategori" || r.kategori === filterKategori;
    const matchLab = filterLab === "Semua Lab" || r.lab === filterLab;
    return matchKat && matchLab;
  });

  const blockColor = (status: string) =>
    status === "confirmed"
      ? "bg-blue-500 text-white"
      : "bg-orange-400 text-white";

  return (
    <div style={{ fontFamily: "'Inter', sans-serif", backgroundColor: "#F0F7FF", minHeight: "100vh" }}>
      {/* Header */}
      <div style={{ backgroundColor: "#1565C0" }} className="py-8 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-2 text-blue-300 text-sm mb-3">
            <Link to="/" className="hover:text-white">Beranda</Link>
            <ChevronRight size={14} />
            <span className="text-white">Jadwal Lab</span>
          </div>
          <h1 className="text-3xl font-bold text-white" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>Jadwal Penggunaan Lab</h1>
          <p className="text-blue-200 mt-2">Lihat ketersediaan dan jadwal penggunaan seluruh laboratorium secara realtime</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Filter Bar */}
        <div className="bg-white rounded-xl border border-blue-100 shadow-sm p-4 mb-6 flex flex-wrap gap-3 items-center">
          <select
            value={filterKategori}
            onChange={(e) => { setFilterKategori(e.target.value); setFilterLab("Semua Lab"); }}
            className="px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-100 bg-white"
          >
            {categoryOptions.map((c) => <option key={c}>{c}</option>)}
          </select>

          <select
            value={filterLab}
            onChange={(e) => setFilterLab(e.target.value)}
            className="px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-100 bg-white"
          >
            <option>Semua Lab</option>
            {filteredLabs.map((l) => <option key={l}>{l}</option>)}
          </select>

          <input type="date" className="px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-100" defaultValue="2024-11-18" />

          <div className="ml-auto flex gap-2">
            <button
              onClick={() => setView("weekly")}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${view === "weekly" ? "text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200"}`}
              style={view === "weekly" ? { backgroundColor: "#1565C0" } : {}}
            >
              <Grid3X3 size={14} /> Mingguan
            </button>
            <button
              onClick={() => setView("list")}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${view === "list" ? "text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200"}`}
              style={view === "list" ? { backgroundColor: "#1565C0" } : {}}
            >
              <List size={14} /> List
            </button>
          </div>
        </div>

        {/* Legend */}
        <div className="flex gap-4 mb-4 flex-wrap text-sm">
          {[["Dikonfirmasi", "bg-blue-500"], ["Menunggu", "bg-orange-400"]].map(([l, c]) => (
            <div key={l} className="flex items-center gap-2">
              <div className={`w-4 h-4 rounded ${c}`} />
              <span className="text-gray-600">{l}</span>
            </div>
          ))}
          <span className="text-gray-400 text-xs ml-2">{filteredTable.length} jadwal ditemukan</span>
        </div>

        {/* Weekly View */}
        {view === "weekly" && (
          <div className="bg-white rounded-xl border border-blue-100 shadow-sm overflow-x-auto relative">
            {hoveredBlock && (
              <div
                className="fixed z-50 bg-gray-900 text-white rounded-xl p-3 shadow-xl text-xs pointer-events-none"
                style={{ left: hoverPos.x + 14, top: hoverPos.y - 70, maxWidth: 220 }}
              >
                <p className="font-semibold">{hoveredBlock.lab}</p>
                <p className="text-gray-300">{hoveredBlock.group}</p>
                <p className="text-gray-300">{labCategories[hoveredBlock.lab]}</p>
                <p className="text-gray-300">{hours[hoveredBlock.start]}–{hours[hoveredBlock.start + hoveredBlock.duration]}</p>
              </div>
            )}
            <div className="min-w-[720px]">
              <div className="grid border-b border-blue-100" style={{ gridTemplateColumns: "60px repeat(6, 1fr)" }}>
                <div className="p-3 text-xs text-gray-400" />
                {days.map((d) => (
                  <div key={d} className="p-3 text-xs font-semibold text-gray-600 text-center border-l border-blue-100">{d}</div>
                ))}
              </div>
              {hours.slice(0, -1).map((hour, hIdx) => (
                <div key={hour} className="grid border-b border-gray-50" style={{ gridTemplateColumns: "60px repeat(6, 1fr)", minHeight: 48 }}>
                  <div className="p-2 text-xs text-gray-400 font-medium flex items-center">{hour}</div>
                  {days.map((_, dIdx) => {
                    const block = filteredBookings.find((b) => b.day === dIdx && b.start === hIdx);
                    if (block) {
                      return (
                        <div
                          key={dIdx}
                          className="border-l border-blue-100 p-1 cursor-pointer"
                          onMouseEnter={(e) => { setHoveredBlock(block); setHoverPos({ x: e.clientX, y: e.clientY }); }}
                          onMouseMove={(e) => setHoverPos({ x: e.clientX, y: e.clientY })}
                          onMouseLeave={() => setHoveredBlock(null)}
                        >
                          <div
                            className={`rounded-lg px-1.5 py-1 text-xs font-medium ${blockColor(block.status)}`}
                            style={{ minHeight: `${block.duration * 48 - 4}px`, display: "flex", flexDirection: "column", justifyContent: "center" }}
                          >
                            <p className="truncate font-semibold leading-tight" style={{ fontSize: 10 }}>{block.lab}</p>
                            <p className="truncate opacity-80" style={{ fontSize: 9 }}>{block.group}</p>
                          </div>
                        </div>
                      );
                    }
                    const occupied = filteredBookings.find((b) => b.day === dIdx && b.start < hIdx && b.start + b.duration > hIdx);
                    if (occupied) return <div key={dIdx} className="border-l border-blue-100" />;
                    return (
                      <div key={dIdx} className="border-l border-blue-100 p-1">
                        <div className="h-10 rounded-lg bg-green-50 border border-green-100 opacity-40" />
                      </div>
                    );
                  })}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* List View */}
        {view === "list" && (
          <div className="bg-white rounded-xl border border-blue-100 shadow-sm overflow-x-auto">
            <table className="w-full text-sm min-w-[700px]">
              <thead>
                <tr className="border-b border-blue-100 bg-gray-50">
                  {["Tanggal", "Laboratorium", "Kategori", "Waktu", "Pengguna", "Status"].map((h) => (
                    <th key={h} className="text-left py-3 px-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filteredTable.map((row, i) => (
                  <tr key={i} className={`border-b border-gray-50 hover:bg-blue-50/30 transition-colors ${i % 2 === 0 ? "bg-white" : "bg-gray-50/40"}`}>
                    <td className="py-3 px-4 text-gray-500 text-xs whitespace-nowrap">{row.tanggal}</td>
                    <td className="py-3 px-4 font-medium text-gray-800 text-sm">{row.lab}</td>
                    <td className="py-3 px-4">
                      <span className="px-2 py-0.5 rounded-full text-xs bg-blue-50 whitespace-nowrap" style={{ color: "#1565C0" }}>{row.kategori}</span>
                    </td>
                    <td className="py-3 px-4 text-gray-600 text-xs whitespace-nowrap">{row.waktu}</td>
                    <td className="py-3 px-4 text-gray-700 text-xs">{row.pengguna}</td>
                    <td className="py-3 px-4">
                      <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${row.status === "Dikonfirmasi" ? "bg-green-50 text-green-600" : "bg-blue-50 text-blue-500"}`}>
                        {row.status}
                      </span>
                    </td>
                  </tr>
                ))}
                {filteredTable.length === 0 && (
                  <tr>
                    <td colSpan={6} className="py-12 text-center text-gray-400 text-sm">Tidak ada jadwal ditemukan</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
