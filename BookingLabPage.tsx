import { useState } from "react";
import { Link } from "react-router";
import {
  ChevronRight, Check, FlaskConical, Leaf, Atom,
  Pickaxe, Sprout, ChevronLeft, Clock, Users,
  Upload, CheckCircle, Download, Info, Monitor, Wrench, Building2, UtensilsCrossed, Wind,
  CalendarCheck, ArrowLeftRight, ArrowRight,
} from "lucide-react";

/* ─── shared data ─── */
const labCategories = [
  { name: "Lab Pangan", icon: UtensilsCrossed, color: "#F59E0B", bg: "#FEF3C7", labs: 2 },
  { name: "Lab Lingkungan", icon: Wind, color: "#22C55E", bg: "#F0FDF4", labs: 1 },
  { name: "Lab Agribisnis", icon: Sprout, color: "#84CC16", bg: "#F7FEE7", labs: 1 },
  { name: "Lab Fisika", icon: Atom, color: "#06B6D4", bg: "#ECFEFF", labs: 5 },
  { name: "Lab Kimia", icon: FlaskConical, color: "#EF4444", bg: "#FEF2F2", labs: 4 },
  { name: "Lab Biologi", icon: Leaf, color: "#22C55E", bg: "#F0FDF4", labs: 4 },
  { name: "Lab Komputer (TISIMAT)", icon: Monitor, color: "#3B82F6", bg: "#EFF6FF", labs: 12 },
  { name: "Lab Teknik Tambang", icon: Pickaxe, color: "#78716C", bg: "#F5F5F4", labs: 1 },
  { name: "Lab Uji Material", icon: Wrench, color: "#8B5CF6", bg: "#F5F3FF", labs: 1 },
  { name: "Ruang Serbaguna", icon: Building2, color: "#EC4899", bg: "#FDF2F8", labs: 1 },
];

const labsByCategory: Record<string, string[]> = {
  "Lab Pangan": ["Lab Bioteknologi Pangan", "Lab Kimia Pangan"],
  "Lab Lingkungan": ["Lab Lingkungan 1"],
  "Lab Agribisnis": ["Lab Agribisnis"],
  "Lab Fisika": ["Lab Fisika Dasar", "Lab Fisika Lanjut", "Lab Fisika Material dan Komputasi", "Lab Fisika Instrumentasi", "Lab Geofisika"],
  "Lab Kimia": ["Lab Kimia Dasar", "Lab Kimia Analitik", "Lab Kimia Organik", "Lab Biokimia"],
  "Lab Biologi": ["Lab Biologi Dasar", "Lab Fisiologi", "Lab Ekologi", "Lab Mikrobiologi"],
  "Lab Komputer (TISIMAT)": ["Lab Sistem Operasi", "Lab Pemrograman", "Lab Jaringan", "Lab Matematika", "Lab Aplikasi 1", "Lab Aplikasi 2", "Lab Multimedia 1", "Lab Multimedia 2", "Lab Digital dan Robotik", "Lab Data Sains", "Lab Riset dan Pengembangan", "ELC Matematika"],
  "Lab Teknik Tambang": ["Lab Teknologi Mineral"],
  "Lab Uji Material": ["Lab Uji Material"],
  "Ruang Serbaguna": ["Ruang Smart Class"],
};

const timeSlots = ["08:00 – 10:00", "10:00 – 12:00", "13:00 – 15:00", "15:00 – 17:00"];
const slotStatus: Record<string, "available" | "limited" | "full"> = {
  "08:00 – 10:00": "available",
  "10:00 – 12:00": "limited",
  "13:00 – 15:00": "full",
  "15:00 – 17:00": "available",
};
const slotColor = {
  available: "bg-green-50 border-green-200 text-green-700 hover:bg-green-100",
  limited: "bg-blue-50 border-blue-200 text-blue-600 hover:bg-blue-100",
  full: "bg-red-50 border-red-200 text-red-400 cursor-not-allowed opacity-60",
};

const equipmentOptions = ["Spektrofotometer", "Mikroskop", "Sentrifuge", "PCR Cycler", "XRD Machine", "Osiloskop", "Server Rack", "GC Machine"];

/* ─── step indicator ─── */
const bookingSteps = ["Pilih Lab", "Pilih Ruangan", "Pilih Jadwal", "Isi Data", "Konfirmasi"];
const pindahSteps  = ["Pilih Lab", "Pilih Ruangan", "Jadwal Lama", "Jadwal Baru", "Isi Data", "Konfirmasi"];

function StepIndicator({ steps, current }: { steps: string[]; current: number }) {
  return (
    <div className="flex items-center justify-center mb-10 flex-wrap gap-y-4">
      {steps.map((s, i) => (
        <div key={s} className="flex items-center">
          <div className="flex flex-col items-center">
            <div
              className={`w-9 h-9 rounded-full flex items-center justify-center text-sm font-semibold transition-all ${
                i < current ? "bg-green-500 text-white" : i === current ? "text-white" : "bg-gray-200 text-gray-500"
              }`}
              style={i === current ? { backgroundColor: "#1565C0" } : {}}
            >
              {i < current ? <Check size={16} /> : i + 1}
            </div>
            <span className={`text-xs mt-1 hidden sm:block font-medium whitespace-nowrap ${i === current ? "text-[#1565C0]" : i < current ? "text-green-500" : "text-gray-400"}`}>
              {s}
            </span>
          </div>
          {i < steps.length - 1 && (
            <div className={`w-8 sm:w-14 h-0.5 mx-1 ${i < current ? "bg-green-400" : "bg-gray-200"}`} />
          )}
        </div>
      ))}
    </div>
  );
}

/* ─── shared sub-steps ─── */
function StepKategori({ onSelect }: { onSelect: (name: string) => void }) {
  return (
    <div>
      <h2 className="text-xl font-bold mb-6" style={{ color: "#1A1A2E", fontFamily: "'Plus Jakarta Sans', sans-serif" }}>Pilih Kategori Lab</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
        {labCategories.map((p) => (
          <button
            key={p.name}
            onClick={() => onSelect(p.name)}
            className="bg-white rounded-xl p-5 border-2 border-transparent shadow-sm hover:shadow-md hover:border-blue-200 transition-all text-center hover:-translate-y-1"
          >
            <div className="w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-3" style={{ backgroundColor: p.bg }}>
              <p.icon size={22} style={{ color: p.color }} />
            </div>
            <p className="text-xs font-semibold text-gray-800 leading-tight">{p.name}</p>
            <p className="text-xs text-gray-400 mt-1">{p.labs} Lab</p>
          </button>
        ))}
      </div>
    </div>
  );
}

function StepRuangan({ kategori, selectedLab, onSelect, onBack }: { kategori: string; selectedLab: string; onSelect: (l: string) => void; onBack: () => void }) {
  return (
    <div>
      <div className="flex items-center gap-3 mb-6">
        <button onClick={onBack} className="p-2 rounded-lg border border-gray-200 hover:bg-gray-100 transition-colors"><ChevronLeft size={18} /></button>
        <h2 className="text-xl font-bold" style={{ color: "#1A1A2E", fontFamily: "'Plus Jakarta Sans', sans-serif" }}>Pilih Ruangan — {kategori}</h2>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {(labsByCategory[kategori] || []).map((lab) => (
          <button
            key={lab}
            onClick={() => onSelect(lab)}
            className={`bg-white rounded-xl p-5 border-2 shadow-sm hover:shadow-md transition-all text-left flex items-center gap-4 ${selectedLab === lab ? "border-blue-500" : "border-transparent"}`}
          >
            <div className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0" style={{ backgroundColor: "#E3F2FD" }}>
              <FlaskConical size={20} style={{ color: "#1565C0" }} />
            </div>
            <div className="flex-1">
              <p className="font-semibold text-gray-800">{lab}</p>
              <p className="text-xs text-gray-400 mt-0.5">Kapasitas: 25–40 orang</p>
            </div>
            <ChevronRight size={16} className="text-gray-400" />
          </button>
        ))}
      </div>
    </div>
  );
}

function StepJadwal({ label, date, slot, setDate, setSlot, onNext, onBack }: {
  label: string; date: string; slot: string;
  setDate: (d: string) => void; setSlot: (s: string) => void;
  onNext: () => void; onBack: () => void;
}) {
  return (
    <div>
      <div className="flex items-center gap-3 mb-6">
        <button onClick={onBack} className="p-2 rounded-lg border border-gray-200 hover:bg-gray-100 transition-colors"><ChevronLeft size={18} /></button>
        <h2 className="text-xl font-bold" style={{ color: "#1A1A2E", fontFamily: "'Plus Jakarta Sans', sans-serif" }}>{label}</h2>
      </div>
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5 mb-5">
        <label className="block text-sm font-medium text-gray-700 mb-2">Pilih Tanggal</label>
        <input type="date" value={date} onChange={(e) => setDate(e.target.value)}
          className="w-full sm:w-64 px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-100" />
      </div>
      {date && (
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
          <p className="text-sm font-medium text-gray-700 mb-3">Pilih Sesi Waktu</p>
          <div className="grid grid-cols-2 gap-3">
            {timeSlots.map((s) => {
              const st = slotStatus[s];
              return (
                <button key={s} disabled={st === "full"} onClick={() => setSlot(s)}
                  className={`p-4 rounded-xl border-2 text-sm font-medium transition-all ${slot === s ? "ring-2 ring-blue-400" : ""} ${slotColor[st]}`}>
                  <div className="flex items-center gap-2 justify-center"><Clock size={14} />{s}</div>
                  <div className="text-xs mt-1">{st === "available" ? "Tersedia" : st === "limited" ? "Terbatas" : "Penuh"}</div>
                </button>
              );
            })}
          </div>
          <div className="flex gap-3 mt-4 flex-wrap text-xs">
            {[["Tersedia", "bg-green-50 text-green-700"], ["Terbatas", "bg-blue-50 text-blue-600"], ["Penuh", "bg-red-50 text-red-400"]].map(([l, c]) => (
              <span key={l} className={`px-3 py-1 rounded-full ${c} border border-current border-opacity-30`}>{l}</span>
            ))}
          </div>
          {slot && (
            <button onClick={onNext} className="mt-5 w-full py-3 rounded-full font-semibold text-white" style={{ backgroundColor: "#1E88E5" }}>
              Lanjutkan <ChevronRight size={16} className="inline" />
            </button>
          )}
        </div>
      )}
    </div>
  );
}

/* ══════════════════════════════════════
   BOOKING LAB FLOW
══════════════════════════════════════ */
function BookingFlow({ onBack, onSubmit }: { onBack: () => void; onSubmit?: (data: any) => void }) {
  const [step, setStep] = useState(0);
  const [kategori, setKategori] = useState("");
  const [lab, setLab] = useState("");
  const [date, setDate] = useState("");
  const [slot, setSlot] = useState("");
  const [form, setForm] = useState({ nim: "", nama: "", prodi: "", semester: "", matkul: "", peserta: "", dosen: "", alat: [] as string[], notes: "" });
  const [submitted, setSubmitted] = useState(false);
  const bookingCode = "BK-" + Math.random().toString(36).substr(2, 8).toUpperCase();

  const toggleAlat = (a: string) =>
    setForm((f) => ({ ...f, alat: f.alat.includes(a) ? f.alat.filter((x) => x !== a) : [...f.alat, a] }));

  return (
    <div>
      {!submitted && <StepIndicator steps={bookingSteps} current={step} />}

      {step === 0 && <StepKategori onSelect={(n) => { setKategori(n); setStep(1); }} />}

      {step === 1 && (
        <StepRuangan kategori={kategori} selectedLab={lab}
          onSelect={(l) => { setLab(l); setStep(2); }}
          onBack={() => setStep(0)} />
      )}

      {step === 2 && (
        <StepJadwal label="Pilih Jadwal & Waktu" date={date} slot={slot}
          setDate={setDate} setSlot={setSlot}
          onNext={() => setStep(3)} onBack={() => setStep(1)} />
      )}

      {step === 3 && (
        <div>
          <div className="flex items-center gap-3 mb-6">
            <button onClick={() => setStep(2)} className="p-2 rounded-lg border border-gray-200 hover:bg-gray-100 transition-colors"><ChevronLeft size={18} /></button>
            <h2 className="text-xl font-bold" style={{ color: "#1A1A2E", fontFamily: "'Plus Jakarta Sans', sans-serif" }}>Isi Data Peminjam</h2>
          </div>
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div><label className="block text-sm font-medium text-gray-700 mb-1">NIM *</label>
                <input value={form.nim} onChange={(e) => setForm({ ...form, nim: e.target.value })} placeholder="Contoh: 12345678" className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-100" /></div>
              <div><label className="block text-sm font-medium text-gray-700 mb-1">Nama Lengkap *</label>
                <input value={form.nama} onChange={(e) => setForm({ ...form, nama: e.target.value })} placeholder="Nama sesuai KTM" className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-100" /></div>
              <div><label className="block text-sm font-medium text-gray-700 mb-1">Program Studi *</label>
                <select value={form.prodi} onChange={(e) => setForm({ ...form, prodi: e.target.value })} className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-100 bg-white">
                  <option value="">Pilih Prodi</option>
                  {"Lab Pangan,Lab Lingkungan,Lab Agribisnis,Lab Fisika,Lab Kimia,Lab Biologi,Lab Komputer (TISIMAT),Lab Teknik Tambang,Lab Uji Material,Ruang Serbaguna".split(",").map((p) => <option key={p}>{p}</option>)}</select></div>
              <div><label className="block text-sm font-medium text-gray-700 mb-1">Semester *</label>
                <select value={form.semester} onChange={(e) => setForm({ ...form, semester: e.target.value })} className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-100 bg-white">
                  <option value="">Pilih Semester</option>
                  {[1,2,3,4,5,6,7,8].map((s) => <option key={s}>Semester {s}</option>)}</select></div>
            </div>
            <div><label className="block text-sm font-medium text-gray-700 mb-1">Mata Kuliah / Keperluan *</label>
              <input value={form.matkul} onChange={(e) => setForm({ ...form, matkul: e.target.value })} placeholder="Contoh: Praktikum Kimia Analitik" className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-100" /></div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div><label className="block text-sm font-medium text-gray-700 mb-1">Jumlah Peserta *</label>
                <input type="number" value={form.peserta} onChange={(e) => setForm({ ...form, peserta: e.target.value })} placeholder="Jumlah mahasiswa" className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-100" /></div>
              <div><label className="block text-sm font-medium text-gray-700 mb-1">Dosen Pembimbing (opsional)</label>
                <input value={form.dosen} onChange={(e) => setForm({ ...form, dosen: e.target.value })} placeholder="Nama dosen pembimbing" className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-100" /></div>
            </div>
            <div><label className="block text-sm font-medium text-gray-700 mb-1">Catatan Tambahan</label>
              <textarea value={form.notes} onChange={(e) => setForm({ ...form, notes: e.target.value })} placeholder="Informasi tambahan..." rows={3} className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-100 resize-none" /></div>
            <button onClick={() => setStep(4)} className="w-full py-3 rounded-full font-semibold text-white" style={{ backgroundColor: "#1E88E5" }}>
              Lanjut ke Konfirmasi <ChevronRight size={16} className="inline" />
            </button>
          </div>
        </div>
      )}

      {step === 4 && !submitted && (
        <div>
          <div className="flex items-center gap-3 mb-6">
            <button onClick={() => setStep(3)} className="p-2 rounded-lg border border-gray-200 hover:bg-gray-100 transition-colors"><ChevronLeft size={18} /></button>
            <h2 className="text-xl font-bold" style={{ color: "#1A1A2E", fontFamily: "'Plus Jakarta Sans', sans-serif" }}>Konfirmasi Booking</h2>
          </div>
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 mb-5">
            <h3 className="font-semibold text-gray-800 mb-4 pb-3 border-b border-gray-100">Ringkasan Booking</h3>
            <div className="space-y-3">
              {[
                ["Program Studi", kategori], ["Laboratorium", lab], ["Tanggal", date], ["Sesi Waktu", slot],
                ["NIM", form.nim || "-"], ["Nama", form.nama || "-"], ["Prodi", form.prodi || "-"],
                ["Semester", form.semester || "-"], ["Keperluan", form.matkul || "-"],
                ["Jumlah Peserta", form.peserta || "-"], ["Dosen Pembimbing", form.dosen || "-"],
              ].map(([label, value]) => (
                <div key={label} className="flex justify-between text-sm">
                  <span className="text-gray-500 w-44 flex-shrink-0">{label}</span>
                  <span className="text-gray-800 font-medium text-right">{value}</span>
                </div>
              ))}
            </div>
            <div className="mt-4 p-3 bg-blue-50 rounded-xl flex items-start gap-2 text-sm text-blue-700">
              <Info size={16} className="flex-shrink-0 mt-0.5" />
              Persetujuan booking diproses dalam 1×24 jam kerja. Notifikasi dikirim ke email terdaftar.
            </div>
          </div>
          <button onClick={() => {
            setSubmitted(true);
            onSubmit?.({ kodeForms: bookingCode, nim: form.nim, nama: form.nama, prodi: form.prodi, semester: form.semester, lab, labCategory: kategori, tanggal: date, sesi: slot, keperluan: form.matkul, jumlahPeserta: form.peserta, dosen: form.dosen, catatan: form.notes });
          }} className="w-full py-4 rounded-full font-semibold text-white text-lg hover:opacity-90 hover:shadow-lg transition-all" style={{ backgroundColor: "#1E88E5" }}>
            Konfirmasi & Kirim Booking
          </button>
        </div>
      )}

      {step === 4 && submitted && <SuccessCard code={bookingCode} label="Booking" onHome={onBack} />}
    </div>
  );
}

/* ══════════════════════════════════════
   PINDAH JADWAL KELAS FLOW
══════════════════════════════════════ */
function PindahJadwalFlow({ onBack, onSubmit }: { onBack: () => void; onSubmit?: (data: any) => void }) {
  const [step, setStep] = useState(0);
  const [kategori, setKategori] = useState("");
  const [lab, setLab] = useState("");
  const [oldDate, setOldDate] = useState(""); const [oldSlot, setOldSlot] = useState("");
  const [newDate, setNewDate] = useState(""); const [newSlot, setNewSlot] = useState("");
  const [form, setForm] = useState({ nim: "", nama: "", prodi: "", semester: "", matkul: "", dosen: "", alasan: "", notes: "" });
  const [submitted, setSubmitted] = useState(false);
  const kode = "PJ-" + Math.random().toString(36).substr(2, 8).toUpperCase();

  return (
    <div>
      {!submitted && <StepIndicator steps={pindahSteps} current={step} />}

      {step === 0 && <StepKategori onSelect={(n) => { setKategori(n); setStep(1); }} />}

      {step === 1 && (
        <StepRuangan kategori={kategori} selectedLab={lab}
          onSelect={(l) => { setLab(l); setStep(2); }}
          onBack={() => setStep(0)} />
      )}

      {step === 2 && (
        <StepJadwal label="Jadwal Saat Ini (yang ingin dipindah)" date={oldDate} slot={oldSlot}
          setDate={setOldDate} setSlot={setOldSlot}
          onNext={() => setStep(3)} onBack={() => setStep(1)} />
      )}

      {step === 3 && (
        <StepJadwal label="Jadwal Baru yang Diinginkan" date={newDate} slot={newSlot}
          setDate={setNewDate} setSlot={setNewSlot}
          onNext={() => setStep(4)} onBack={() => setStep(2)} />
      )}

      {step === 4 && (
        <div>
          <div className="flex items-center gap-3 mb-6">
            <button onClick={() => setStep(3)} className="p-2 rounded-lg border border-gray-200 hover:bg-gray-100 transition-colors"><ChevronLeft size={18} /></button>
            <h2 className="text-xl font-bold" style={{ color: "#1A1A2E", fontFamily: "'Plus Jakarta Sans', sans-serif" }}>Isi Data Permohonan</h2>
          </div>
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 space-y-4">
            {/* Ringkasan jadwal */}
            <div className="flex flex-col sm:flex-row gap-3 p-4 rounded-xl border border-blue-100 bg-blue-50">
              <div className="flex-1 text-center">
                <p className="text-xs text-gray-500 mb-1">Jadwal Saat Ini</p>
                <p className="font-semibold text-gray-800 text-sm">{lab}</p>
                <p className="text-xs text-blue-600 mt-0.5">{oldDate} · {oldSlot}</p>
              </div>
              <div className="flex items-center justify-center">
                <ArrowRight size={20} className="text-blue-400 rotate-0 sm:rotate-0" />
              </div>
              <div className="flex-1 text-center">
                <p className="text-xs text-gray-500 mb-1">Jadwal Baru</p>
                <p className="font-semibold text-gray-800 text-sm">{lab}</p>
                <p className="text-xs text-green-600 mt-0.5">{newDate} · {newSlot}</p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div><label className="block text-sm font-medium text-gray-700 mb-1">NIM *</label>
                <input value={form.nim} onChange={(e) => setForm({ ...form, nim: e.target.value })} placeholder="Contoh: 12345678" className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-100" /></div>
              <div><label className="block text-sm font-medium text-gray-700 mb-1">Nama Lengkap *</label>
                <input value={form.nama} onChange={(e) => setForm({ ...form, nama: e.target.value })} placeholder="Nama sesuai KTM" className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-100" /></div>
              <div><label className="block text-sm font-medium text-gray-700 mb-1">Program Studi *</label>
                <select value={form.prodi} onChange={(e) => setForm({ ...form, prodi: e.target.value })} className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-100 bg-white">
                  <option value="">Pilih Prodi</option>
                  {"Lab Pangan,Lab Lingkungan,Lab Agribisnis,Lab Fisika,Lab Kimia,Lab Biologi,Lab Komputer (TISIMAT),Lab Teknik Tambang,Lab Uji Material,Ruang Serbaguna".split(",").map((p) => <option key={p}>{p}</option>)}</select></div>
              <div><label className="block text-sm font-medium text-gray-700 mb-1">Semester *</label>
                <select value={form.semester} onChange={(e) => setForm({ ...form, semester: e.target.value })} className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-100 bg-white">
                  <option value="">Pilih Semester</option>
                  {[1,2,3,4,5,6,7,8].map((s) => <option key={s}>Semester {s}</option>)}</select></div>
            </div>
            <div><label className="block text-sm font-medium text-gray-700 mb-1">Mata Kuliah / Kelas *</label>
              <input value={form.matkul} onChange={(e) => setForm({ ...form, matkul: e.target.value })} placeholder="Contoh: Praktikum Kimia Analitik – Kelas A" className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-100" /></div>
            <div><label className="block text-sm font-medium text-gray-700 mb-1">Dosen Pembimbing *</label>
              <input value={form.dosen} onChange={(e) => setForm({ ...form, dosen: e.target.value })} placeholder="Nama dosen pembimbing / pengampu" className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-100" /></div>
            <div><label className="block text-sm font-medium text-gray-700 mb-1">Alasan Pemindahan *</label>
              <select value={form.alasan} onChange={(e) => setForm({ ...form, alasan: e.target.value })} className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-100 bg-white">
                <option value="">Pilih alasan</option>
                <option>Bentrok dengan kegiatan akademik lain</option>
                <option>Lab sedang dalam perbaikan / maintenance</option>
                <option>Permintaan dosen pembimbing</option>
                <option>Kegiatan kampus / universitas</option>
                <option>Lainnya</option>
              </select></div>
            <div><label className="block text-sm font-medium text-gray-700 mb-1">Keterangan Tambahan</label>
              <textarea value={form.notes} onChange={(e) => setForm({ ...form, notes: e.target.value })} placeholder="Informasi tambahan terkait permohonan pemindahan jadwal..." rows={3} className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-100 resize-none" /></div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Upload Surat Permohonan</label>
              <label className="border-2 border-dashed border-gray-200 rounded-xl p-6 text-center hover:border-blue-300 transition-colors cursor-pointer flex flex-col items-center gap-2 block">
                <Upload size={24} className="text-gray-400" />
                <p className="text-sm text-gray-500">Klik atau drag & drop file (PDF/JPG, maks 5MB)</p>
                <input type="file" accept=".pdf,.jpg,.jpeg,.png" className="hidden" onChange={(e) => {
                  const f = e.target.files?.[0];
                  if (f) alert(`File "${f.name}" berhasil dipilih.`);
                }} />
              </label>
            </div>
            <button onClick={() => setStep(5)} className="w-full py-3 rounded-full font-semibold text-white" style={{ backgroundColor: "#1E88E5" }}>
              Lanjut ke Konfirmasi <ChevronRight size={16} className="inline" />
            </button>
          </div>
        </div>
      )}

      {step === 5 && !submitted && (
        <div>
          <div className="flex items-center gap-3 mb-6">
            <button onClick={() => setStep(4)} className="p-2 rounded-lg border border-gray-200 hover:bg-gray-100 transition-colors"><ChevronLeft size={18} /></button>
            <h2 className="text-xl font-bold" style={{ color: "#1A1A2E", fontFamily: "'Plus Jakarta Sans', sans-serif" }}>Konfirmasi Permohonan</h2>
          </div>
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 mb-5">
            <h3 className="font-semibold text-gray-800 mb-4 pb-3 border-b border-gray-100">Ringkasan Permohonan Pindah Jadwal</h3>
            <div className="grid sm:grid-cols-2 gap-3 mb-4">
              <div className="bg-red-50 rounded-xl p-4">
                <p className="text-xs font-semibold text-red-500 mb-2 uppercase tracking-wider">Jadwal Lama</p>
                <p className="font-semibold text-gray-800 text-sm">{lab}</p>
                <p className="text-xs text-gray-500 mt-1">{oldDate}</p>
                <p className="text-xs text-red-500 mt-0.5">{oldSlot}</p>
              </div>
              <div className="bg-green-50 rounded-xl p-4">
                <p className="text-xs font-semibold text-green-600 mb-2 uppercase tracking-wider">Jadwal Baru</p>
                <p className="font-semibold text-gray-800 text-sm">{lab}</p>
                <p className="text-xs text-gray-500 mt-1">{newDate}</p>
                <p className="text-xs text-green-600 mt-0.5">{newSlot}</p>
              </div>
            </div>
            <div className="space-y-3">
              {[
                ["NIM", form.nim || "-"], ["Nama", form.nama || "-"], ["Prodi", form.prodi || "-"],
                ["Semester", form.semester || "-"], ["Mata Kuliah / Kelas", form.matkul || "-"],
                ["Dosen Pembimbing", form.dosen || "-"], ["Alasan", form.alasan || "-"],
              ].map(([label, value]) => (
                <div key={label} className="flex justify-between text-sm">
                  <span className="text-gray-500 w-44 flex-shrink-0">{label}</span>
                  <span className="text-gray-800 font-medium text-right">{value}</span>
                </div>
              ))}
            </div>
            <div className="mt-4 p-3 bg-blue-50 rounded-xl flex items-start gap-2 text-sm text-blue-700">
              <Info size={16} className="flex-shrink-0 mt-0.5" />
              Permohonan pemindahan jadwal akan diverifikasi oleh admin dalam 1×24 jam kerja.
            </div>
          </div>
          <button onClick={() => {
            setSubmitted(true);
            onSubmit?.({ kodePermohonan: kode, nim: form.nim, nama: form.nama, prodi: form.prodi, semester: form.semester, lab, labCategory: kategori, jadwalLama: oldDate, slotLama: oldSlot, jadwalBaru: newDate, slotBaru: newSlot, matkul: form.matkul, dosen: form.dosen, alasan: form.alasan, catatan: form.notes });
          }} className="w-full py-4 rounded-full font-semibold text-white text-lg hover:opacity-90 hover:shadow-lg transition-all" style={{ backgroundColor: "#1E88E5" }}>
            Kirim Permohonan Pindah Jadwal
          </button>
        </div>
      )}

      {step === 5 && submitted && <SuccessCard code={kode} label="Pindah Jadwal" onHome={onBack} />}
    </div>
  );
}

/* ─── generate & download PDF ─── */
function downloadPDF(code: string, label: string, details: string) {
  const isBooking = label === "Booking";
  const content = isBooking
    ? `SURAT KONFIRMASI BOOKING LABORATORIUM\nPLT UIN Syarif Hidayatullah Jakarta\n${"=".repeat(50)}\n\nKode Booking   : ${code}\nStatus         : Menunggu Persetujuan Kaprodi\nTanggal Dibuat : ${new Date().toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" })}\n\n${details}\n\n${"=".repeat(50)}\nDokumen ini digenerate otomatis oleh sistem PLT UIN Jakarta.\nHarap simpan sebagai bukti pengajuan booking laboratorium.`
    : `SURAT PERMOHONAN PINDAH JADWAL KELAS\nPLT UIN Syarif Hidayatullah Jakarta\n${"=".repeat(50)}\n\nKode Permohonan : ${code}\nStatus          : Menunggu Persetujuan Kaprodi\nTanggal Dibuat  : ${new Date().toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" })}\n\n${details}\n\n${"=".repeat(50)}\nDokumen ini digenerate otomatis oleh sistem PLT UIN Jakarta.\nHarap simpan sebagai bukti permohonan pindah jadwal.`;

  const blob = new Blob([content], { type: "text/plain;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `${code}.txt`;
  a.click();
  URL.revokeObjectURL(url);
}

/* ─── success card ─── */
function SuccessCard({ code, label, onHome, details = "" }: { code: string; label: string; onHome: () => void; details?: string }) {
  return (
    <div className="text-center bg-white rounded-2xl border border-gray-100 shadow-sm p-10">
      <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-5">
        <CheckCircle size={40} className="text-green-500" />
      </div>
      <h2 className="text-2xl font-bold mb-2" style={{ color: "#1A1A2E", fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
        Permohonan {label} Terkirim!
      </h2>
      <p className="text-gray-500 mb-4">Permintaan Anda sedang diproses. Cek email untuk konfirmasi.</p>

      {/* Status Persetujuan Kaprodi */}
      <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 mb-4 text-left">
        <p className="text-xs font-semibold text-amber-700 uppercase tracking-wider mb-2">Status Persetujuan Kaprodi</p>
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-amber-400 animate-pulse flex-shrink-0" />
          <span className="text-sm font-medium text-amber-800">Menunggu Persetujuan Kaprodi</span>
        </div>
        <p className="text-xs text-amber-600 mt-1.5">Kaprodi akan memverifikasi permohonan dalam 1×24 jam kerja. Notifikasi dikirim ke email Anda.</p>
      </div>

      <div className="bg-blue-50 rounded-xl p-4 mb-6 inline-block">
        <p className="text-sm text-gray-500 mb-1">Kode Permohonan</p>
        <p className="text-2xl font-bold tracking-wider" style={{ color: "#1565C0" }}>{code}</p>
      </div>

      <div className="flex flex-col sm:flex-row gap-3 justify-center">
        <button
          onClick={() => downloadPDF(code, label, details)}
          className="flex items-center gap-2 px-6 py-3 rounded-full font-semibold text-white transition-opacity hover:opacity-90"
          style={{ backgroundColor: "#1565C0" }}
        >
          <Download size={16} /> Unduh PDF
        </button>
        <button onClick={onHome} className="flex items-center gap-2 px-6 py-3 rounded-full font-semibold border-2 border-gray-200 text-gray-700 hover:bg-gray-50 transition-colors">
          Kembali ke Katalog
        </button>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════
   MAIN PAGE — katalog pilihan
══════════════════════════════════════ */
interface BookingLabPageProps {
  onSubmitBooking?: (data: any) => void;
  onSubmitPindah?: (data: any) => void;
  myBookings?: any[];
  myPindah?: any[];
  onCancelBooking?: (id: string) => void;
  onCancelPindah?: (id: string) => void;
  onDeleteBooking?: (id: string) => void;
  onDeletePindah?: (id: string) => void;
}

function StatusBadgeInline({ status }: { status: string }) {
  const map: Record<string, { cls: string; label: string }> = {
    menunggu: { cls: "bg-amber-50 text-amber-600 border-amber-200", label: "Menunggu Persetujuan" },
    disetujui: { cls: "bg-green-50 text-green-600 border-green-200", label: "Disetujui" },
    ditolak: { cls: "bg-red-50 text-red-500 border-red-200", label: "Ditolak" },
  };
  const s = map[status] ?? map.menunggu;
  return <span className={`px-2.5 py-1 rounded-full text-xs font-semibold border ${s.cls}`}>{s.label}</span>;
}

export function BookingLabPage({
  onSubmitBooking, onSubmitPindah,
  myBookings = [], myPindah = [],
  onCancelBooking, onCancelPindah,
  onDeleteBooking, onDeletePindah,
}: BookingLabPageProps = {}) {
  const [mode, setMode] = useState<null | "booking" | "pindah">(null);
  const [confirmCancel, setConfirmCancel] = useState<{ id: string; type: "booking" | "pindah" } | null>(null);
  const [confirmDelete, setConfirmDelete] = useState<{ id: string; type: "booking" | "pindah" } | null>(null);
  const totalRiwayat = myBookings.length + myPindah.length;

  return (
    <div style={{ fontFamily: "'Inter', sans-serif", backgroundColor: "#F0F7FF", minHeight: "100vh" }}>
      {/* Header */}
      <div style={{ backgroundColor: "#1565C0" }} className="py-8 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-2 text-blue-300 text-sm mb-3">
            <Link to="/" className="hover:text-white">Beranda</Link>
            <ChevronRight size={14} />
            {mode && (
              <>
                <button onClick={() => setMode(null)} className="hover:text-white">
                  Booking Lab
                </button>
                <ChevronRight size={14} />
                <span className="text-white">{mode === "booking" ? "Booking Lab" : "Pindah Jadwal Kelas"}</span>
              </>
            )}
            {!mode && <span className="text-white">Booking Lab</span>}
          </div>
          <h1 className="text-3xl font-bold text-white" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
            {mode === "booking" ? "Booking Laboratorium" : mode === "pindah" ? "Pindah Jadwal Kelas" : "Booking Lab"}
          </h1>
          <p className="text-blue-200 mt-2">
            {mode === "booking"
              ? "Ikuti langkah-langkah berikut untuk melakukan booking laboratorium"
              : mode === "pindah"
              ? "Ajukan permohonan pemindahan jadwal kelas praktikum"
              : "Pilih layanan yang ingin Anda gunakan"}
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
        {/* Katalog Pilihan */}
        {!mode && (
          <div>
            <p className="text-center text-gray-500 text-sm mb-8">Silakan pilih layanan yang tersedia</p>

            {/* Modal Konfirmasi Batal */}
            {confirmCancel && (
              <div className="fixed inset-0 z-50 flex items-center justify-center p-4" onClick={() => setConfirmCancel(null)}>
                <div className="absolute inset-0 bg-black/40" />
                <div className="relative bg-white rounded-2xl shadow-xl w-full max-w-sm p-6" onClick={(e) => e.stopPropagation()}>
                  <h3 className="font-bold text-gray-800 mb-2">Batalkan Permohonan?</h3>
                  <p className="text-sm text-gray-500 mb-5">Permohonan yang dibatalkan tidak dapat dikembalikan. Anda perlu mengajukan ulang jika masih membutuhkan.</p>
                  <div className="flex gap-3">
                    <button onClick={() => setConfirmCancel(null)} className="flex-1 py-2.5 rounded-xl border border-gray-200 text-sm font-medium text-gray-600 hover:bg-gray-50">Tidak</button>
                    <button onClick={() => {
                      if (confirmCancel.type === "booking") onCancelBooking?.(confirmCancel.id);
                      else onCancelPindah?.(confirmCancel.id);
                      setConfirmCancel(null);
                    }} className="flex-1 py-2.5 rounded-xl text-sm font-semibold text-white bg-amber-500 hover:bg-amber-600 transition-colors">Ya, Batalkan</button>
                  </div>
                </div>
              </div>
            )}

            {/* Modal Konfirmasi Hapus */}
            {confirmDelete && (
              <div className="fixed inset-0 z-50 flex items-center justify-center p-4" onClick={() => setConfirmDelete(null)}>
                <div className="absolute inset-0 bg-black/40" />
                <div className="relative bg-white rounded-2xl shadow-xl w-full max-w-sm p-6" onClick={(e) => e.stopPropagation()}>
                  <h3 className="font-bold text-gray-800 mb-2">Hapus dari Riwayat?</h3>
                  <p className="text-sm text-gray-500 mb-5">Riwayat permohonan ini akan dihapus permanen dari daftar Anda.</p>
                  <div className="flex gap-3">
                    <button onClick={() => setConfirmDelete(null)} className="flex-1 py-2.5 rounded-xl border border-gray-200 text-sm font-medium text-gray-600 hover:bg-gray-50">Tidak</button>
                    <button onClick={() => {
                      if (confirmDelete.type === "booking") onDeleteBooking?.(confirmDelete.id);
                      else onDeletePindah?.(confirmDelete.id);
                      setConfirmDelete(null);
                    }} className="flex-1 py-2.5 rounded-xl text-sm font-semibold text-white bg-red-500 hover:bg-red-600 transition-colors">Ya, Hapus</button>
                  </div>
                </div>
              </div>
            )}

            {/* Riwayat Permohonan */}
            {totalRiwayat > 0 && (
              <div className="mb-10">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-bold" style={{ color: "#1A1A2E", fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                    Riwayat Permohonan Saya
                  </h2>
                  <span className="text-sm text-gray-400">{totalRiwayat} permohonan</span>
                </div>

                {/* Booking Requests */}
                {myBookings.length > 0 && (
                  <div className="mb-5">
                    <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Booking Lab</p>
                    <div className="space-y-3">
                      {myBookings.map((b: any) => (
                        <div key={b.id} className="bg-white rounded-xl border border-gray-100 shadow-sm p-4">
                          <div className="flex items-start justify-between gap-3">
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-2 mb-1 flex-wrap">
                                <span className="text-xs font-mono text-gray-400">{b.kodeForms}</span>
                                <StatusBadgeInline status={b.status} />
                              </div>
                              <p className="font-semibold text-gray-800 text-sm">{b.lab}</p>
                              <p className="text-xs text-gray-500 mt-0.5">{b.labCategory} · {b.tanggal} · {b.sesi}</p>
                              <p className="text-xs text-gray-500 mt-0.5">Keperluan: {b.keperluan || "-"}</p>
                            </div>
                            <div className="flex flex-col items-end gap-1.5 flex-shrink-0">
                              <p className="text-xs text-gray-400">{b.submittedAt}</p>
                              <div className="flex gap-1.5">
                                {b.status === "menunggu" && (
                                  <button
                                    onClick={() => setConfirmCancel({ id: b.id, type: "booking" })}
                                    className="flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-medium bg-amber-50 text-amber-600 border border-amber-200 hover:bg-amber-100 transition-colors"
                                  >
                                    ✕ Batalkan
                                  </button>
                                )}
                                <button
                                  onClick={() => setConfirmDelete({ id: b.id, type: "booking" })}
                                  className="flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-medium bg-red-50 text-red-500 border border-red-200 hover:bg-red-100 transition-colors"
                                  title="Hapus dari riwayat"
                                >
                                  🗑
                                </button>
                              </div>
                            </div>
                          </div>
                          {b.status === "ditolak" && b.alasanTolak && (
                            <div className="mt-3 p-2.5 bg-red-50 rounded-lg border border-red-100 text-xs text-red-600">
                              <span className="font-semibold">Alasan Penolakan: </span>{b.alasanTolak}
                            </div>
                          )}
                          {b.status === "dibatalkan" && (
                            <div className="mt-3 p-2.5 bg-gray-50 rounded-lg border border-gray-200 text-xs text-gray-500">
                              ✕ Permohonan ini telah dibatalkan oleh Anda.
                            </div>
                          )}
                          {b.status === "disetujui" && (
                            <div className="mt-3 p-2.5 bg-green-50 rounded-lg border border-green-100 text-xs text-green-600">
                              ✓ Booking Anda telah disetujui oleh Kaprodi. Silakan datang sesuai jadwal yang telah ditentukan.
                            </div>
                          )}
                          {b.status === "menunggu" && (
                            <div className="mt-3 p-2.5 bg-amber-50 rounded-lg border border-amber-100 text-xs text-amber-600">
                              ⏳ Permohonan Anda sedang ditinjau oleh Kaprodi. Estimasi 1×24 jam kerja.
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Pindah Requests */}
                {myPindah.length > 0 && (
                  <div>
                    <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Pindah Jadwal</p>
                    <div className="space-y-3">
                      {myPindah.map((p: any) => (
                        <div key={p.id} className="bg-white rounded-xl border border-gray-100 shadow-sm p-4">
                          <div className="flex items-start justify-between gap-3">
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-2 mb-1 flex-wrap">
                                <span className="text-xs font-mono text-gray-400">{p.kodePermohonan}</span>
                                <StatusBadgeInline status={p.status} />
                              </div>
                              <p className="font-semibold text-gray-800 text-sm">{p.lab}</p>
                              <div className="flex gap-3 mt-1 text-xs">
                                <span className="text-red-500">Lama: {p.jadwalLama} · {p.slotLama}</span>
                                <span className="text-gray-400">→</span>
                                <span className="text-green-600">Baru: {p.jadwalBaru} · {p.slotBaru}</span>
                              </div>
                              <p className="text-xs text-gray-500 mt-0.5">Alasan: {p.alasan || "-"}</p>
                            </div>
                            <div className="flex flex-col items-end gap-1.5 flex-shrink-0">
                              <p className="text-xs text-gray-400">{p.submittedAt}</p>
                              <div className="flex gap-1.5">
                                {p.status === "menunggu" && (
                                  <button
                                    onClick={() => setConfirmCancel({ id: p.id, type: "pindah" })}
                                    className="flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-medium bg-amber-50 text-amber-600 border border-amber-200 hover:bg-amber-100 transition-colors"
                                  >
                                    ✕ Batalkan
                                  </button>
                                )}
                                <button
                                  onClick={() => setConfirmDelete({ id: p.id, type: "pindah" })}
                                  className="flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-medium bg-red-50 text-red-500 border border-red-200 hover:bg-red-100 transition-colors"
                                  title="Hapus dari riwayat"
                                >
                                  🗑
                                </button>
                              </div>
                            </div>
                          </div>
                          {p.status === "ditolak" && p.alasanTolak && (
                            <div className="mt-3 p-2.5 bg-red-50 rounded-lg border border-red-100 text-xs text-red-600">
                              <span className="font-semibold">Alasan Penolakan: </span>{p.alasanTolak}
                            </div>
                          )}
                          {p.status === "dibatalkan" && (
                            <div className="mt-3 p-2.5 bg-gray-50 rounded-lg border border-gray-200 text-xs text-gray-500">
                              ✕ Permohonan ini telah dibatalkan oleh Anda.
                            </div>
                          )}
                          {p.status === "disetujui" && (
                            <div className="mt-3 p-2.5 bg-green-50 rounded-lg border border-green-100 text-xs text-green-600">
                              ✓ Permohonan pindah jadwal Anda telah disetujui oleh Kaprodi.
                            </div>
                          )}
                          {p.status === "menunggu" && (
                            <div className="mt-3 p-2.5 bg-amber-50 rounded-lg border border-amber-100 text-xs text-amber-600">
                              ⏳ Permohonan Anda sedang ditinjau oleh Kaprodi. Estimasi 1×24 jam kerja.
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <div className="border-t border-gray-200 mt-8 mb-6" />
                <p className="text-center text-gray-500 text-sm mb-4">Ajukan permohonan baru</p>
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-3xl mx-auto">
              {/* Booking Lab Card */}
              <button
                onClick={() => setMode("booking")}
                className="group bg-white rounded-2xl border-2 border-transparent hover:border-blue-400 shadow-sm hover:shadow-xl transition-all p-8 text-left"
              >
                <div
                  className="w-16 h-16 rounded-2xl flex items-center justify-center mb-5 group-hover:scale-110 transition-transform"
                  style={{ backgroundColor: "#E3F2FD" }}
                >
                  <CalendarCheck size={30} style={{ color: "#1565C0" }} />
                </div>
                <h3
                  className="text-xl font-bold mb-2"
                  style={{ color: "#1A1A2E", fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                >
                  Booking Lab
                </h3>
                <p className="text-sm text-gray-500 leading-relaxed mb-5">
                  Ajukan peminjaman laboratorium untuk kegiatan praktikum, penelitian, atau kegiatan akademik lainnya.
                </p>
                <div className="flex flex-col gap-1.5">
                  {["Pilih lab & ruangan", "Pilih tanggal & sesi waktu", "Isi data"].map((f) => (
                    <div key={f} className="flex items-center gap-2 text-xs text-gray-500">
                      <Check size={13} className="text-green-500 flex-shrink-0" /> {f}
                    </div>
                  ))}
                </div>
                <div
                  className="mt-6 flex items-center gap-2 text-sm font-semibold"
                  style={{ color: "#1E88E5" }}
                >
                  Mulai Booking <ChevronRight size={16} />
                </div>
              </button>

              {/* Pindah Jadwal Card */}
              <button
                onClick={() => setMode("pindah")}
                className="group bg-white rounded-2xl border-2 border-transparent hover:border-blue-400 shadow-sm hover:shadow-xl transition-all p-8 text-left"
              >
                <div
                  className="w-16 h-16 rounded-2xl flex items-center justify-center mb-5 group-hover:scale-110 transition-transform"
                  style={{ backgroundColor: "#FFF3EE" }}
                >
                  <ArrowLeftRight size={30} style={{ color: "#1E88E5" }} />
                </div>
                <h3
                  className="text-xl font-bold mb-2"
                  style={{ color: "#1A1A2E", fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                >
                  Pindah Jadwal Kelas
                </h3>
                <p className="text-sm text-gray-500 leading-relaxed mb-5">
                  Ajukan permohonan pemindahan jadwal praktikum kelas ke waktu atau tanggal yang berbeda.
                </p>
                <div className="flex flex-col gap-1.5">
                  {["Tentukan jadwal saat ini", "Pilih jadwal baru yang tersedia", "Isi data & alasan pemindahan"].map((f) => (
                    <div key={f} className="flex items-center gap-2 text-xs text-gray-500">
                      <Check size={13} className="text-green-500 flex-shrink-0" /> {f}
                    </div>
                  ))}
                </div>
                <div
                  className="mt-6 flex items-center gap-2 text-sm font-semibold"
                  style={{ color: "#1E88E5" }}
                >
                  Ajukan Permohonan <ChevronRight size={16} />
                </div>
              </button>
            </div>
          </div>
        )}

        {mode === "booking" && <BookingFlow onBack={() => setMode(null)} onSubmit={onSubmitBooking} />}
        {mode === "pindah" && <PindahJadwalFlow onBack={() => setMode(null)} onSubmit={onSubmitPindah} />}
      </div>
    </div>
  );
}
