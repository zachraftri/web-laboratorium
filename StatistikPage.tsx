import { Link } from "react-router";
import { ChevronRight, Microscope, FlaskConical, Calendar, Users, CheckCircle } from "lucide-react";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  LineChart, Line, PieChart, Pie, Cell, Legend,
} from "recharts";

const kpis = [
  { label: "Total Lab Aktif", value: "24", icon: Microscope, color: "#1565C0", bg: "#E3F2FD" },
  { label: "Total Alat", value: "318", icon: FlaskConical, color: "#1E88E5", bg: "#FFF3EE" },
  { label: "Booking Bulan Ini", value: "456", icon: Calendar, color: "#22C55E", bg: "#F0FDF4" },
  { label: "Pengguna Terdaftar", value: "1.240", icon: Users, color: "#F59E0B", bg: "#FEF3C7" },
  { label: "Penelitian Selesai", value: "87", icon: CheckCircle, color: "#8B5CF6", bg: "#F5F3FF" },
];

const prodiUsage = [
  { prodi: "Tek. Tambang", bookings: 48 },
  { prodi: "Tek. Informatika", bookings: 87 },
  { prodi: "Sistem Info.", bookings: 65 },
  { prodi: "Biologi", bookings: 92 },
  { prodi: "Kimia", bookings: 76 },
  { prodi: "Fisika", bookings: 54 },
  { prodi: "Matematika", bookings: 32 },
  { prodi: "Agribisnis", bookings: 41 },
];

const trendData = [
  { bulan: "Jun", bookings: 220 },
  { bulan: "Jul", bookings: 180 },
  { bulan: "Agt", bookings: 310 },
  { bulan: "Sep", bookings: 290 },
  { bulan: "Okt", bookings: 380 },
  { bulan: "Nov", bookings: 456 },
];

const pieData = [
  { name: "Biologi", value: 22, color: "#22C55E" },
  { name: "Tek. Informatika", value: 20, color: "#3B82F6" },
  { name: "Kimia", value: 18, color: "#EF4444" },
  { name: "Sistem Info.", value: 15, color: "#8B5CF6" },
  { name: "Tek. Tambang", value: 11, color: "#F59E0B" },
  { name: "Fisika", value: 8, color: "#06B6D4" },
  { name: "Lainnya", value: 6, color: "#9CA3AF" },
];

const topEquipment = [
  { rank: 1, name: "Spektrofotometer UV-Vis", prodi: "Kimia", usage: 145 },
  { rank: 2, name: "Mikroskop Optik Binokuler", prodi: "Biologi", usage: 132 },
  { rank: 3, name: "GPU Server (A100)", prodi: "Tek. Informatika", usage: 98 },
  { rank: 4, name: "PCR Thermal Cycler", prodi: "Biologi", usage: 87 },
  { rank: 5, name: "Gas Chromatograph", prodi: "Kimia", usage: 76 },
  { rank: 6, name: "XRD Machine", prodi: "Tek. Tambang", usage: 65 },
  { rank: 7, name: "Osiloskop Digital", prodi: "Fisika", usage: 58 },
  { rank: 8, name: "Elektroforesis Gel", prodi: "Biologi", usage: 52 },
  { rank: 9, name: "Server Rack Jaringan", prodi: "Tek. Informatika", usage: 48 },
  { rank: 10, name: "Bomb Calorimeter", prodi: "Kimia", usage: 41 },
];

export function StatistikPage() {
  return (
    <div style={{ fontFamily: "'Inter', sans-serif", backgroundColor: "#F0F7FF", minHeight: "100vh" }}>
      {/* Header */}
      <div style={{ backgroundColor: "#1565C0" }} className="py-8 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-2 text-blue-300 text-sm mb-3">
            <Link to="/" className="hover:text-white">Beranda</Link>
            <ChevronRight size={14} />
            <span className="text-white">Statistik</span>
          </div>
          <h1 className="text-3xl font-bold text-white" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>Dashboard Statistik Laboratorium</h1>
          <p className="text-blue-200 mt-2">Ringkasan data dan analitik penggunaan laboratorium kampus</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
        {/* KPI Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
          {kpis.map((k) => (
            <div key={k.label} className="bg-white rounded-xl border border-blue-100 shadow-sm p-5">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-3" style={{ backgroundColor: k.bg }}>
                <k.icon size={20} style={{ color: k.color }} />
              </div>
              <p className="text-2xl font-bold" style={{ color: "#1A1A2E", fontFamily: "'Plus Jakarta Sans', sans-serif" }}>{k.value}</p>
              <p className="text-xs text-gray-500 mt-1">{k.label}</p>
            </div>
          ))}
        </div>

        {/* Charts Row 1 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Bar Chart */}
          <div className="bg-white rounded-xl border border-blue-100 shadow-sm p-5">
            <h3 className="font-semibold text-gray-800 mb-4">Penggunaan Lab per Prodi</h3>
            <ResponsiveContainer width="100%" height={220}>
              <BarChart data={prodiUsage} margin={{ top: 0, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#F3F4F6" />
                <XAxis dataKey="prodi" tick={{ fontSize: 10, fill: "#9CA3AF" }} />
                <YAxis tick={{ fontSize: 10, fill: "#9CA3AF" }} />
                <Tooltip contentStyle={{ borderRadius: 8, fontSize: 12, border: "1px solid #E5E7EB" }} />
                <Bar dataKey="bookings" fill="#1565C0" radius={[4, 4, 0, 0]} name="Booking" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Line Chart */}
          <div className="bg-white rounded-xl border border-blue-100 shadow-sm p-5">
            <h3 className="font-semibold text-gray-800 mb-4">Tren Booking 6 Bulan Terakhir</h3>
            <ResponsiveContainer width="100%" height={220}>
              <LineChart data={trendData} margin={{ top: 0, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#F3F4F6" />
                <XAxis dataKey="bulan" tick={{ fontSize: 11, fill: "#9CA3AF" }} />
                <YAxis tick={{ fontSize: 11, fill: "#9CA3AF" }} />
                <Tooltip contentStyle={{ borderRadius: 8, fontSize: 12, border: "1px solid #E5E7EB" }} />
                <Line type="monotone" dataKey="bookings" stroke="#1E88E5" strokeWidth={2.5} dot={{ fill: "#1E88E5", r: 4 }} name="Booking" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Charts Row 2 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Donut Chart */}
          <div className="bg-white rounded-xl border border-blue-100 shadow-sm p-5">
            <h3 className="font-semibold text-gray-800 mb-4">Distribusi Penggunaan Lab per Prodi</h3>
            <ResponsiveContainer width="100%" height={240}>
              <PieChart>
                <Pie data={pieData} cx="50%" cy="50%" innerRadius={60} outerRadius={90} dataKey="value" paddingAngle={2}>
                  {pieData.map((entry, index) => (
                    <Cell key={index} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip formatter={(v) => [`${v}%`, "Porsi"]} contentStyle={{ borderRadius: 8, fontSize: 12 }} />
                <Legend iconType="circle" iconSize={10} wrapperStyle={{ fontSize: 11 }} />
              </PieChart>
            </ResponsiveContainer>
          </div>

          {/* Top Equipment Table */}
          <div className="bg-white rounded-xl border border-blue-100 shadow-sm p-5">
            <h3 className="font-semibold text-gray-800 mb-4">Alat Paling Sering Digunakan (Top 10)</h3>
            <div className="overflow-y-auto" style={{ maxHeight: 240 }}>
              <table className="w-full text-sm">
                <thead className="sticky top-0 bg-white">
                  <tr className="border-b border-blue-100">
                    <th className="text-left py-2 text-xs text-gray-400 font-medium w-8">#</th>
                    <th className="text-left py-2 text-xs text-gray-400 font-medium">Alat</th>
                    <th className="text-left py-2 text-xs text-gray-400 font-medium">Prodi</th>
                    <th className="text-right py-2 text-xs text-gray-400 font-medium">Penggunaan</th>
                  </tr>
                </thead>
                <tbody>
                  {topEquipment.map((e, i) => (
                    <tr key={i} className={`${i % 2 === 0 ? "bg-white" : "bg-gray-50"}`}>
                      <td className="py-2 text-xs font-bold" style={{ color: i < 3 ? "#1E88E5" : "#9CA3AF" }}>{e.rank}</td>
                      <td className="py-2 text-xs font-medium text-gray-700">{e.name}</td>
                      <td className="py-2">
                        <span className="px-1.5 py-0.5 rounded text-xs bg-blue-50" style={{ color: "#1565C0" }}>{e.prodi}</span>
                      </td>
                      <td className="py-2 text-xs text-gray-600 text-right font-semibold">{e.usage}x</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
