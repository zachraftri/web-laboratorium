import { useState } from "react";
import {
  LayoutDashboard, CalendarCheck, ArrowLeftRight, LogOut,
  CheckCircle, XCircle, Eye, Clock, X, User, BookOpen, ShieldCheck, Menu,
} from "lucide-react";
import { logoUIN } from "../assets";

export type BookingRequest = {
  id: string;
  type: "booking";
  kodeForms: string;
  nim: string;
  nama: string;
  prodi: string;
  semester: string;
  lab: string;
  labCategory: string;
  tanggal: string;
  sesi: string;
  keperluan: string;
  jumlahPeserta: string;
  dosen: string;
  catatan: string;
  status: "menunggu" | "disetujui" | "ditolak";
  alasanTolak?: string;
  submittedAt: string;
};

export type PindahRequest = {
  id: string;
  type: "pindah";
  kodePermohonan: string;
  nim: string;
  nama: string;
  prodi: string;
  semester: string;
  lab: string;
  labCategory: string;
  jadwalLama: string;
  slotLama: string;
  jadwalBaru: string;
  slotBaru: string;
  matkul: string;
  dosen: string;
  alasan: string;
  catatan: string;
  status: "menunggu" | "disetujui" | "ditolak";
  alasanTolak?: string;
  submittedAt: string;
};

interface Props {
  user: string;
  onLogout: () => void;
  bookingRequests: BookingRequest[];
  pindahRequests: PindahRequest[];
  onUpdateBooking: (id: string, status: "disetujui" | "ditolak", alasan?: string) => void;
  onUpdatePindah: (id: string, status: "disetujui" | "ditolak", alasan?: string) => void;
}

type Page = "beranda" | "booking" | "pindah" | "profil";

const statusBadge = (status: string) => {
  const map: Record<string, string> = {
    menunggu: "bg-amber-50 text-amber-600 border-amber-200",
    disetujui: "bg-green-50 text-green-600 border-green-200",
    ditolak: "bg-red-50 text-red-500 border-red-200",
  };
  const label: Record<string, string> = { menunggu: "Menunggu", disetujui: "Disetujui", ditolak: "Ditolak" };
  return <span className={`px-2.5 py-1 rounded-full text-xs font-semibold border ${map[status]}`}>{label[status]}</span>;
};

/* ─── Reject Modal ─── */
function RejectModal({ onConfirm, onCancel }: { onConfirm: (reason: string) => void; onCancel: () => void }) {
  const [reason, setReason] = useState("");
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" onClick={onCancel}>
      <div className="absolute inset-0 bg-black/40" />
      <div className="relative bg-white rounded-2xl shadow-xl w-full max-w-md p-6" onClick={(e) => e.stopPropagation()}>
        <h3 className="font-bold text-gray-800 mb-2">Alasan Penolakan</h3>
        <p className="text-sm text-gray-500 mb-4">Berikan alasan penolakan untuk diteruskan ke mahasiswa.</p>
        <textarea
          value={reason}
          onChange={(e) => setReason(e.target.value)}
          placeholder="Tulis alasan penolakan..."
          rows={4}
          className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-red-100 resize-none mb-4"
        />
        <div className="flex gap-3">
          <button onClick={onCancel} className="flex-1 py-2.5 rounded-xl border border-gray-200 text-sm font-medium text-gray-600 hover:bg-gray-50">Batal</button>
          <button
            onClick={() => { if (reason.trim()) onConfirm(reason); }}
            disabled={!reason.trim()}
            className="flex-1 py-2.5 rounded-xl text-sm font-semibold text-white bg-red-500 hover:bg-red-600 disabled:opacity-50 transition-colors"
          >
            Konfirmasi Tolak
          </button>
        </div>
      </div>
    </div>
  );
}

/* ─── Detail Modal Booking ─── */
function BookingDetailModal({ req, onClose, onApprove, onReject }: { req: BookingRequest; onClose: () => void; onApprove: () => void; onReject: () => void }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div className="absolute inset-0 bg-black/50" />
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
        <div className="p-6">
          <div className="flex items-start justify-between mb-4">
            <div>
              <h3 className="font-bold text-gray-800" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>Detail Permohonan Booking</h3>
              <p className="text-xs text-gray-400 mt-0.5">{req.kodeForms}</p>
            </div>
            <button onClick={onClose} className="p-1.5 rounded-lg hover:bg-gray-100"><X size={18} /></button>
          </div>
          <div className="flex items-center gap-2 mb-4">{statusBadge(req.status)}<span className="text-xs text-gray-400">{req.submittedAt}</span></div>
          <div className="space-y-3">
            {[
              ["NIM", req.nim], ["Nama", req.nama], ["Program Studi", req.prodi], ["Semester", req.semester],
              ["Kategori Lab", req.labCategory], ["Laboratorium", req.lab],
              ["Tanggal", req.tanggal], ["Sesi Waktu", req.sesi],
              ["Keperluan", req.keperluan], ["Jumlah Peserta", req.jumlahPeserta],
              ["Dosen Pembimbing", req.dosen || "-"], ["Catatan", req.catatan || "-"],
            ].map(([label, value]) => (
              <div key={label} className="flex text-sm">
                <span className="text-gray-500 w-40 flex-shrink-0">{label}</span>
                <span className="text-gray-800 font-medium">{value}</span>
              </div>
            ))}
          </div>
          {req.status === "menunggu" && (
            <div className="flex gap-3 mt-6 pt-4 border-t border-gray-100">
              <button onClick={onReject} className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-semibold text-red-500 border border-red-200 hover:bg-red-50 transition-colors">
                <XCircle size={16} /> Tolak
              </button>
              <button onClick={onApprove} className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-semibold text-white bg-green-500 hover:bg-green-600 transition-colors">
                <CheckCircle size={16} /> Setujui
              </button>
            </div>
          )}
          {req.alasanTolak && <div className="mt-4 p-3 bg-red-50 rounded-xl text-sm text-red-600"><span className="font-semibold">Alasan Penolakan: </span>{req.alasanTolak}</div>}
        </div>
      </div>
    </div>
  );
}

/* ─── Detail Modal Pindah ─── */
function PindahDetailModal({ req, onClose, onApprove, onReject }: { req: PindahRequest; onClose: () => void; onApprove: () => void; onReject: () => void }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div className="absolute inset-0 bg-black/50" />
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
        <div className="p-6">
          <div className="flex items-start justify-between mb-4">
            <div>
              <h3 className="font-bold text-gray-800" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>Detail Permohonan Pindah Jadwal</h3>
              <p className="text-xs text-gray-400 mt-0.5">{req.kodePermohonan}</p>
            </div>
            <button onClick={onClose} className="p-1.5 rounded-lg hover:bg-gray-100"><X size={18} /></button>
          </div>
          <div className="flex items-center gap-2 mb-4">{statusBadge(req.status)}</div>
          <div className="grid grid-cols-2 gap-3 mb-4">
            <div className="bg-red-50 rounded-xl p-3">
              <p className="text-xs font-semibold text-red-500 mb-1.5 uppercase tracking-wider">Jadwal Lama</p>
              <p className="font-semibold text-gray-800 text-sm">{req.lab}</p>
              <p className="text-xs text-gray-500 mt-0.5">{req.jadwalLama}</p>
              <p className="text-xs text-red-500">{req.slotLama}</p>
            </div>
            <div className="bg-green-50 rounded-xl p-3">
              <p className="text-xs font-semibold text-green-600 mb-1.5 uppercase tracking-wider">Jadwal Baru</p>
              <p className="font-semibold text-gray-800 text-sm">{req.lab}</p>
              <p className="text-xs text-gray-500 mt-0.5">{req.jadwalBaru}</p>
              <p className="text-xs text-green-600">{req.slotBaru}</p>
            </div>
          </div>
          <div className="space-y-3">
            {[
              ["NIM", req.nim], ["Nama", req.nama], ["Program Studi", req.prodi], ["Semester", req.semester],
              ["Mata Kuliah / Kelas", req.matkul], ["Dosen Pembimbing", req.dosen],
              ["Alasan Pemindahan", req.alasan], ["Keterangan", req.catatan || "-"],
            ].map(([label, value]) => (
              <div key={label} className="flex text-sm">
                <span className="text-gray-500 w-40 flex-shrink-0">{label}</span>
                <span className="text-gray-800 font-medium">{value}</span>
              </div>
            ))}
          </div>
          {req.status === "menunggu" && (
            <div className="flex gap-3 mt-6 pt-4 border-t border-gray-100">
              <button onClick={onReject} className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-semibold text-red-500 border border-red-200 hover:bg-red-50 transition-colors">
                <XCircle size={16} /> Tolak
              </button>
              <button onClick={onApprove} className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-semibold text-white bg-green-500 hover:bg-green-600 transition-colors">
                <CheckCircle size={16} /> Setujui
              </button>
            </div>
          )}
          {req.alasanTolak && <div className="mt-4 p-3 bg-red-50 rounded-xl text-sm text-red-600"><span className="font-semibold">Alasan Penolakan: </span>{req.alasanTolak}</div>}
        </div>
      </div>
    </div>
  );
}

/* ─── Main Dashboard ─── */
export function KaprodiDashboard({ user, onLogout, bookingRequests, pindahRequests, onUpdateBooking, onUpdatePindah }: Props) {
  const [page, setPage] = useState<Page>("beranda");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState<BookingRequest | null>(null);
  const [selectedPindah, setSelectedPindah] = useState<PindahRequest | null>(null);
  const [rejectTarget, setRejectTarget] = useState<{ id: string; type: "booking" | "pindah" } | null>(null);

  const pendingBooking = bookingRequests.filter((r) => r.status === "menunggu").length;
  const pendingPindah = pindahRequests.filter((r) => r.status === "menunggu").length;

  const navItems = [
    { id: "beranda" as Page, label: "Beranda", icon: LayoutDashboard },
    { id: "booking" as Page, label: "Persetujuan Booking", icon: CalendarCheck, badge: pendingBooking },
    { id: "pindah" as Page, label: "Pindah Jadwal", icon: ArrowLeftRight, badge: pendingPindah },
    { id: "profil" as Page, label: "Profil", icon: User },
  ];

  const pageTitle: Record<Page, string> = {
    beranda: "Dashboard Kaprodi",
    booking: "Persetujuan Booking Lab",
    pindah: "Persetujuan Pindah Jadwal",
    profil: "Profil Kaprodi",
  };

  return (
    <div className="min-h-screen flex flex-col" style={{ fontFamily: "'Inter', sans-serif", backgroundColor: "#F0F7FF" }}>
      {/* Reject Modal */}
      {rejectTarget && (
        <RejectModal
          onConfirm={(reason) => {
            if (rejectTarget.type === "booking") onUpdateBooking(rejectTarget.id, "ditolak", reason);
            else onUpdatePindah(rejectTarget.id, "ditolak", reason);
            setRejectTarget(null); setSelectedBooking(null); setSelectedPindah(null);
          }}
          onCancel={() => setRejectTarget(null)}
        />
      )}

      {/* Detail Modals */}
      {selectedBooking && (
        <BookingDetailModal
          req={selectedBooking}
          onClose={() => setSelectedBooking(null)}
          onApprove={() => { onUpdateBooking(selectedBooking.id, "disetujui"); setSelectedBooking(null); }}
          onReject={() => setRejectTarget({ id: selectedBooking.id, type: "booking" })}
        />
      )}
      {selectedPindah && (
        <PindahDetailModal
          req={selectedPindah}
          onClose={() => setSelectedPindah(null)}
          onApprove={() => { onUpdatePindah(selectedPindah.id, "disetujui"); setSelectedPindah(null); }}
          onReject={() => setRejectTarget({ id: selectedPindah.id, type: "pindah" })}
        />
      )}

      {/* TOP NAVBAR */}
      <nav className="sticky top-0 z-50 shadow-sm" style={{ backgroundColor: "#1565C0" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center h-16 gap-4">
            {/* Logo */}
            <div className="flex items-center gap-2.5 flex-shrink-0">
              <img src={logoUIN} alt="Logo UIN" className="w-9 h-9 object-contain bg-white rounded-lg p-1 flex-shrink-0" />
              <div className="hidden sm:block">
                <p className="text-white text-sm font-bold leading-tight" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>PLT UIN Jakarta</p>
                <p className="text-blue-200 text-xs">Dashboard Kaprodi</p>
              </div>
            </div>

            {/* Desktop Nav Links */}
            <div className="hidden lg:flex items-center gap-1 flex-1 justify-center">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => setPage(item.id)}
                  className={`relative flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${page === item.id ? "bg-white/20 text-white" : "text-blue-200 hover:bg-white/10 hover:text-white"}`}
                >
                  <item.icon size={16} />
                  {item.label}
                  {item.badge ? (
                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                      {item.badge}
                    </span>
                  ) : null}
                </button>
              ))}
            </div>

            {/* Right: pending badge + user + logout */}
            <div className="hidden lg:flex items-center gap-3 flex-shrink-0 ml-auto">
              {(pendingBooking + pendingPindah) > 0 && (
                <div className="flex items-center gap-2 bg-white/10 border border-white/20 rounded-xl px-3 py-1.5">
                  <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
                  <span className="text-xs text-white font-medium">{pendingBooking + pendingPindah} menunggu</span>
                </div>
              )}
              <div className="flex items-center gap-2 bg-white/10 rounded-xl px-3 py-1.5">
                <div className="w-7 h-7 rounded-full bg-white/20 flex items-center justify-center text-white text-xs font-bold">
                  {user.charAt(0)}
                </div>
                <span className="text-white text-sm font-medium max-w-36 truncate">{user.split(",")[0]}</span>
              </div>
              <button onClick={onLogout} className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-blue-200 hover:bg-white/10 hover:text-white transition-all text-sm">
                <LogOut size={16} /> Keluar
              </button>
            </div>

            {/* Mobile menu button */}
            <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="lg:hidden ml-auto text-white p-2 rounded-lg hover:bg-white/10">
              <Menu size={20} />
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-white/10 px-4 py-3 space-y-1">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => { setPage(item.id); setMobileMenuOpen(false); }}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-left text-sm font-medium transition-all ${page === item.id ? "bg-white/20 text-white" : "text-blue-200 hover:bg-white/10 hover:text-white"}`}
              >
                <item.icon size={18} />
                {item.label}
                {item.badge ? <span className="ml-auto bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">{item.badge}</span> : null}
              </button>
            ))}
            <div className="border-t border-white/10 pt-3 mt-2">
              <button onClick={onLogout} className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-blue-200 hover:bg-white/10 hover:text-white transition-all text-sm">
                <LogOut size={18} /> Keluar
              </button>
            </div>
          </div>
        )}
      </nav>

      {/* Page Header */}
      <div className="bg-white border-b border-blue-100 px-6 py-4 shadow-sm">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div>
            <h1 className="font-bold text-gray-800" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
              {pageTitle[page]}
            </h1>
            <p className="text-xs text-gray-400 mt-0.5">PLT UIN Syarif Hidayatullah Jakarta</p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="flex-1 overflow-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          {/* BERANDA */}
          {page === "beranda" && (
            <div className="space-y-6">
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                  { label: "Menunggu Persetujuan", value: pendingBooking + pendingPindah, color: "#F59E0B", bg: "#FEF3C7", icon: Clock },
                  { label: "Booking Disetujui", value: bookingRequests.filter((r) => r.status === "disetujui").length, color: "#22C55E", bg: "#F0FDF4", icon: CheckCircle },
                  { label: "Booking Ditolak", value: bookingRequests.filter((r) => r.status === "ditolak").length, color: "#EF4444", bg: "#FEF2F2", icon: XCircle },
                  { label: "Total Permohonan", value: bookingRequests.length + pindahRequests.length, color: "#1565C0", bg: "#E3F2FD", icon: BookOpen },
                ].map((kpi) => (
                  <div key={kpi.label} className="bg-white rounded-xl border border-blue-100 shadow-sm p-5">
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-3" style={{ backgroundColor: kpi.bg }}>
                      <kpi.icon size={20} style={{ color: kpi.color }} />
                    </div>
                    <p className="text-2xl font-bold" style={{ color: "#1A1A2E", fontFamily: "'Plus Jakarta Sans', sans-serif" }}>{kpi.value}</p>
                    <p className="text-xs text-gray-500 mt-1">{kpi.label}</p>
                  </div>
                ))}
              </div>

              {/* Recent activity */}
              <div className="bg-white rounded-xl border border-blue-100 shadow-sm p-5">
                <h3 className="font-semibold text-gray-800 mb-4">Permohonan Terbaru</h3>
                {[...bookingRequests, ...pindahRequests].length === 0 ? (
                  <p className="text-sm text-gray-400 text-center py-8">Belum ada permohonan masuk</p>
                ) : (
                  <div className="space-y-3">
                    {[...bookingRequests, ...pindahRequests].slice(-5).reverse().map((r) => (
                      <div key={r.id} className="flex items-center justify-between py-3 border-b border-gray-50 last:border-0">
                        <div>
                          <p className="text-sm font-medium text-gray-800">{r.nama} <span className="text-xs text-gray-400">({r.nim})</span></p>
                          <p className="text-xs text-gray-500">{r.type === "booking" ? `Booking: ${r.lab}` : `Pindah Jadwal: ${r.lab}`}</p>
                        </div>
                        <div className="flex items-center gap-2">
                          {statusBadge(r.status)}
                          <button
                            onClick={() => r.type === "booking" ? setSelectedBooking(r as BookingRequest) : setSelectedPindah(r as PindahRequest)}
                            className="p-1.5 rounded-lg hover:bg-blue-50 transition-colors" style={{ color: "#1565C0" }}
                          >
                            <Eye size={15} />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* PERSETUJUAN BOOKING */}
          {page === "booking" && (
            <div className="bg-white rounded-xl border border-blue-100 shadow-sm overflow-hidden">
              <div className="p-4 border-b border-gray-100 flex items-center justify-between">
                <p className="font-semibold text-gray-800">Daftar Permohonan Booking Lab</p>
                <p className="text-sm text-gray-400">{bookingRequests.length} permohonan</p>
              </div>
              {bookingRequests.length === 0 ? (
                <div className="p-12 text-center">
                  <CalendarCheck size={40} className="mx-auto text-gray-300 mb-3" />
                  <p className="text-gray-400 text-sm">Belum ada permohonan booking dari mahasiswa</p>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-sm min-w-[800px]">
                    <thead>
                      <tr className="bg-gray-50 border-b border-gray-100">
                        {["Kode", "Nama / NIM", "Lab", "Tanggal & Sesi", "Keperluan", "Status", "Aksi"].map((h) => (
                          <th key={h} className="text-left py-3 px-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {bookingRequests.map((req, i) => (
                        <tr key={req.id} className={`border-b border-gray-50 hover:bg-blue-50/30 transition-colors ${i % 2 === 0 ? "bg-white" : "bg-gray-50/30"}`}>
                          <td className="py-3 px-4 text-xs text-gray-500 font-mono">{req.kodeForms}</td>
                          <td className="py-3 px-4">
                            <p className="font-medium text-gray-800">{req.nama}</p>
                            <p className="text-xs text-gray-400">{req.nim} · {req.prodi}</p>
                          </td>
                          <td className="py-3 px-4">
                            <p className="text-gray-700 text-xs font-medium">{req.lab}</p>
                            <p className="text-xs text-gray-400">{req.labCategory}</p>
                          </td>
                          <td className="py-3 px-4 text-xs text-gray-600">{req.tanggal}<br />{req.sesi}</td>
                          <td className="py-3 px-4 text-xs text-gray-600 max-w-32 truncate">{req.keperluan}</td>
                          <td className="py-3 px-4">{statusBadge(req.status)}</td>
                          <td className="py-3 px-4">
                            <div className="flex gap-1.5">
                              <button onClick={() => setSelectedBooking(req)} className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-medium border border-gray-200 text-gray-600 hover:bg-gray-50 transition-colors">
                                <Eye size={11} /> Detail
                              </button>
                              {req.status === "menunggu" && (
                                <>
                                  <button onClick={() => onUpdateBooking(req.id, "disetujui")} className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-medium bg-green-50 text-green-600 hover:bg-green-100 transition-colors">
                                    <CheckCircle size={11} /> Setujui
                                  </button>
                                  <button onClick={() => setRejectTarget({ id: req.id, type: "booking" })} className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-medium bg-red-50 text-red-500 hover:bg-red-100 transition-colors">
                                    <XCircle size={11} /> Tolak
                                  </button>
                                </>
                              )}
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}

          {/* PERSETUJUAN PINDAH JADWAL */}
          {page === "pindah" && (
            <div className="bg-white rounded-xl border border-blue-100 shadow-sm overflow-hidden">
              <div className="p-4 border-b border-gray-100 flex items-center justify-between">
                <p className="font-semibold text-gray-800">Daftar Permohonan Pindah Jadwal</p>
                <p className="text-sm text-gray-400">{pindahRequests.length} permohonan</p>
              </div>
              {pindahRequests.length === 0 ? (
                <div className="p-12 text-center">
                  <ArrowLeftRight size={40} className="mx-auto text-gray-300 mb-3" />
                  <p className="text-gray-400 text-sm">Belum ada permohonan pindah jadwal dari mahasiswa</p>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-sm min-w-[900px]">
                    <thead>
                      <tr className="bg-gray-50 border-b border-gray-100">
                        {["Kode", "Nama / NIM", "Lab", "Jadwal Lama", "Jadwal Baru", "Alasan", "Status", "Aksi"].map((h) => (
                          <th key={h} className="text-left py-3 px-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {pindahRequests.map((req, i) => (
                        <tr key={req.id} className={`border-b border-gray-50 hover:bg-blue-50/30 transition-colors ${i % 2 === 0 ? "bg-white" : "bg-gray-50/30"}`}>
                          <td className="py-3 px-4 text-xs text-gray-500 font-mono">{req.kodePermohonan}</td>
                          <td className="py-3 px-4">
                            <p className="font-medium text-gray-800">{req.nama}</p>
                            <p className="text-xs text-gray-400">{req.nim} · {req.prodi}</p>
                          </td>
                          <td className="py-3 px-4 text-xs text-gray-700">{req.lab}</td>
                          <td className="py-3 px-4 text-xs text-red-600">{req.jadwalLama}<br />{req.slotLama}</td>
                          <td className="py-3 px-4 text-xs text-green-600">{req.jadwalBaru}<br />{req.slotBaru}</td>
                          <td className="py-3 px-4 text-xs text-gray-600 max-w-32 truncate">{req.alasan}</td>
                          <td className="py-3 px-4">{statusBadge(req.status)}</td>
                          <td className="py-3 px-4">
                            <div className="flex gap-1.5">
                              <button onClick={() => setSelectedPindah(req)} className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-medium border border-gray-200 text-gray-600 hover:bg-gray-50 transition-colors">
                                <Eye size={11} /> Detail
                              </button>
                              {req.status === "menunggu" && (
                                <>
                                  <button onClick={() => onUpdatePindah(req.id, "disetujui")} className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-medium bg-green-50 text-green-600 hover:bg-green-100 transition-colors">
                                    <CheckCircle size={11} /> Setujui
                                  </button>
                                  <button onClick={() => setRejectTarget({ id: req.id, type: "pindah" })} className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-medium bg-red-50 text-red-500 hover:bg-red-100 transition-colors">
                                    <XCircle size={11} /> Tolak
                                  </button>
                                </>
                              )}
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}

          {/* PROFIL */}
          {page === "profil" && (
            <div className="max-w-lg">
              <div className="bg-white rounded-xl border border-blue-100 shadow-sm p-6">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-16 h-16 rounded-2xl flex items-center justify-center text-white text-2xl font-bold" style={{ backgroundColor: "#1565C0" }}>
                    {user.charAt(0)}
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-800" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>{user}</h3>
                    <p className="text-sm text-gray-500">Kepala Program Studi</p>
                    <span className="inline-flex items-center gap-1 mt-1 px-2 py-0.5 rounded-full text-xs font-medium bg-blue-50" style={{ color: "#1565C0" }}>
                      <ShieldCheck size={11} /> Kaprodi
                    </span>
                  </div>
                </div>
                {[["NIDN", "0012345678"], ["Email", "amelia.hasanuddin@uinjkt.ac.id"], ["Program Studi", "Kimia"], ["Fakultas", "Sains dan Teknologi"], ["Telepon", "(021) 7401925"]].map(([label, value]) => (
                  <div key={label} className="flex justify-between py-3 border-b border-gray-100 last:border-0 text-sm">
                    <span className="text-gray-500">{label}</span>
                    <span className="text-gray-800 font-medium">{value}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
