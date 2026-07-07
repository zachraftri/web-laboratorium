import { useState, useRef, useEffect } from "react";
import { Eye, EyeOff, LogIn, AlertCircle, ArrowLeft, Mail, CheckCircle, KeyRound, RefreshCw, GraduationCap, ShieldCheck } from "lucide-react";
import { logoUIN } from "../assets";

interface Props {
  onLogin: (name: string, role: "mahasiswa" | "kaprodi") => void;
}

/* ─── Shared page shell ─── */
function PageShell({ children }: { children: React.ReactNode }) {
  return (
    <div
      className="min-h-screen flex items-center justify-center px-4 relative overflow-hidden"
      style={{ background: "linear-gradient(135deg, #1565C0 0%, #1E88E5 60%, #42A5F5 100%)", fontFamily: "'Inter', sans-serif" }}
    >
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-32 -left-32 w-96 h-96 rounded-full bg-white opacity-5" />
        <div className="absolute -bottom-24 -right-24 w-80 h-80 rounded-full bg-white opacity-5" />
        <div className="absolute top-1/2 left-1/4 w-48 h-48 rounded-full bg-white opacity-[0.03]" />
        <div className="absolute top-10 right-10 w-32 h-32 rounded-full bg-white opacity-[0.04]" />
      </div>
      <div className="w-full max-w-md relative z-10">
        <div className="text-center mb-6">
          <div className="inline-flex items-center justify-center w-24 h-24 rounded-2xl bg-white shadow-xl mb-4 p-2">
            <img src={logoUIN} alt="Logo UIN Jakarta" className="w-full h-full object-contain" />
          </div>
          <h1 className="text-xl font-bold text-white leading-snug" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
            PLT UIN Syarif Hidayatullah Jakarta
          </h1>
          <p className="text-blue-200 text-sm mt-1">Pusat Laboratorium Terpadu</p>
        </div>
        {children}
        <p className="text-center text-blue-200 text-xs mt-5">
          © 2024 Pusat Laboratorium Terpadu UIN Syarif Hidayatullah Jakarta
        </p>
      </div>
    </div>
  );
}

/* ─── OTP Input ─── */
function OtpInput({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  const inputs = useRef<(HTMLInputElement | null)[]>([]);
  const digits = Array.from({ length: 6 }, (_, i) => value[i] ?? "");

  const focusNext = (i: number) => { if (i < 5) inputs.current[i + 1]?.focus(); };
  const focusPrev = (i: number) => { if (i > 0) inputs.current[i - 1]?.focus(); };

  const handleChange = (i: number, e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value.replace(/\D/g, "");
    if (!raw) return;
    const char = raw[raw.length - 1];
    const next = [...digits]; next[i] = char;
    onChange(next.join(""));
    focusNext(i);
  };

  const handleKeyDown = (i: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace") {
      e.preventDefault();
      const next = [...digits];
      if (digits[i]) { next[i] = ""; onChange(next.join("")); }
      else { focusPrev(i); if (i > 0) { next[i - 1] = ""; onChange(next.join("")); } }
    } else if (e.key === "ArrowLeft") { e.preventDefault(); focusPrev(i); }
    else if (e.key === "ArrowRight") { e.preventDefault(); focusNext(i); }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const paste = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, 6);
    const next = Array.from({ length: 6 }, (_, i) => paste[i] ?? "");
    onChange(next.join(""));
    setTimeout(() => inputs.current[Math.min(paste.length, 5)]?.focus(), 0);
  };

  return (
    <div className="flex gap-2 justify-center">
      {digits.map((d, i) => (
        <input
          key={i}
          ref={(el) => { inputs.current[i] = el; }}
          type="text" inputMode="numeric" pattern="[0-9]*" maxLength={1}
          value={d}
          onChange={(e) => handleChange(i, e)}
          onKeyDown={(e) => handleKeyDown(i, e)}
          onPaste={handlePaste}
          onFocus={(e) => e.target.select()}
          autoComplete="one-time-code"
          className="w-12 text-center text-xl font-bold border-2 rounded-xl focus:outline-none transition-all"
          style={{
            height: 52,
            borderColor: d ? "#1565C0" : "#D1D5DB",
            color: "#1565C0",
            backgroundColor: d ? "#EFF6FF" : "#F9FAFB",
            boxShadow: d ? "0 0 0 3px rgba(21,101,192,0.12)" : "none",
          }}
        />
      ))}
    </div>
  );
}

function Spinner() {
  return (
    <svg className="animate-spin w-5 h-5" viewBox="0 0 24 24" fill="none">
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4l3-3-3-3v4a8 8 0 00-8 8h4z" />
    </svg>
  );
}

/* ─── Lupa Kata Sandi ─── */
type ForgotStep = "email" | "otp" | "newpass" | "success";

function ForgotPasswordPage({ onBack }: { onBack: () => void }) {
  const [step, setStep] = useState<ForgotStep>("email");
  const [email, setEmail] = useState(""); const [otp, setOtp] = useState("");
  const [newPass, setNewPass] = useState(""); const [confirmPass, setConfirmPass] = useState("");
  const [showNew, setShowNew] = useState(false); const [showConfirm, setShowConfirm] = useState(false);
  const [loading, setLoading] = useState(false); const [error, setError] = useState("");
  const [countdown, setCountdown] = useState(60); const [canResend, setCanResend] = useState(false);

  useEffect(() => {
    if (step !== "otp") return;
    setCountdown(60); setCanResend(false);
    const iv = setInterval(() => setCountdown((c) => { if (c <= 1) { clearInterval(iv); setCanResend(true); return 0; } return c - 1; }), 1000);
    return () => clearInterval(iv);
  }, [step]);

  const stepLabels: Record<ForgotStep, string> = {
    email: "Lupa Kata Sandi", otp: "Verifikasi OTP",
    newpass: "Buat Kata Sandi Baru", success: "Kata Sandi Berhasil Direset",
  };

  const iStyle = {
    onFocus: (e: React.FocusEvent<HTMLInputElement>) => { e.target.style.borderColor = "#1565C0"; e.target.style.boxShadow = "0 0 0 3px rgba(21,101,192,0.12)"; },
    onBlur: (e: React.FocusEvent<HTMLInputElement>) => { e.target.style.borderColor = "#E5E7EB"; e.target.style.boxShadow = "none"; },
    className: "w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none transition-all",
  };

  return (
    <PageShell>
      <div className="bg-white rounded-2xl shadow-2xl p-8">
        <div className="flex items-center gap-3 mb-6">
          {step !== "success" && (
            <button onClick={() => { setError(""); step === "email" ? onBack() : setStep(step === "otp" ? "email" : "otp"); }}
              className="p-2 rounded-xl hover:bg-blue-50 transition-colors text-gray-500 border border-gray-200">
              <ArrowLeft size={18} />
            </button>
          )}
          <div className="flex-1">
            <h2 className="text-xl font-bold" style={{ color: "#1565C0", fontFamily: "'Plus Jakarta Sans', sans-serif" }}>{stepLabels[step]}</h2>
            {step !== "success" && (
              <div className="flex gap-1.5 mt-2">
                {(["email","otp","newpass"] as ForgotStep[]).map((s, i) => (
                  <div key={s} className="h-1 rounded-full transition-all duration-300" style={{ width: 32, backgroundColor: ["email","otp","newpass"].indexOf(step) >= i ? "#1565C0" : "#E5E7EB" }} />
                ))}
              </div>
            )}
          </div>
        </div>

        {error && <div className="flex items-center gap-2 bg-red-50 border border-red-200 text-red-600 rounded-xl px-4 py-3 mb-5 text-sm"><AlertCircle size={15} className="flex-shrink-0" />{error}</div>}

        {step === "email" && (
          <div className="space-y-4">
            <p className="text-sm text-gray-500">Masukkan email terdaftar Anda. Kode OTP 6 digit akan dikirim untuk verifikasi.</p>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Alamat Email</label>
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="contoh@email.com" disabled={loading} onKeyDown={(e) => e.key === "Enter" && !loading && (() => { setError(""); if (!email.trim() || !email.includes("@")) { setError("Masukkan alamat email yang valid."); return; } setLoading(true); setTimeout(() => { setLoading(false); setStep("otp"); }, 1000); })()} {...iStyle} />
            </div>
            <button onClick={() => { setError(""); if (!email.trim() || !email.includes("@")) { setError("Masukkan alamat email yang valid."); return; } setLoading(true); setTimeout(() => { setLoading(false); setStep("otp"); }, 1000); }} disabled={loading} className="w-full py-3.5 rounded-xl font-semibold text-white flex items-center justify-center gap-2 transition-all hover:opacity-90 disabled:opacity-70" style={{ backgroundColor: "#1565C0" }}>
              {loading ? <><Spinner />Mengirim...</> : <><Mail size={17} />Kirim Kode OTP</>}
            </button>
            <p className="text-center text-sm text-gray-500">Ingat kata sandi? <button onClick={onBack} className="font-semibold hover:underline" style={{ color: "#1565C0" }}>Kembali masuk</button></p>
          </div>
        )}

        {step === "otp" && (
          <div className="space-y-5">
            <div className="text-center"><p className="text-sm text-gray-500">Kode OTP 6 digit telah dikirim ke</p><p className="font-semibold text-gray-800 text-sm mt-0.5">{email}</p></div>
            <OtpInput value={otp} onChange={setOtp} />
            <p className="text-center text-xs text-gray-400">Masukkan 6 digit angka yang dikirim ke email Anda</p>
            <div className="text-center text-sm">
              {canResend ? <button onClick={() => { setOtp(""); setCanResend(false); setCountdown(60); }} className="flex items-center gap-1.5 mx-auto font-semibold hover:underline" style={{ color: "#1565C0" }}><RefreshCw size={14} />Kirim Ulang Kode</button>
                : <span className="text-gray-500">Kirim ulang dalam <span className="font-semibold" style={{ color: "#1565C0" }}>{countdown}s</span></span>}
            </div>
            <button onClick={() => { setError(""); if (otp.replace(/\D/g,"").length < 6) { setError("Masukkan 6 digit kode OTP."); return; } setLoading(true); setTimeout(() => { setLoading(false); setStep("newpass"); }, 800); }} disabled={loading || otp.replace(/\D/g,"").length < 6} className="w-full py-3.5 rounded-xl font-semibold text-white flex items-center justify-center gap-2 transition-all hover:opacity-90 disabled:opacity-50" style={{ backgroundColor: "#1565C0" }}>
              {loading ? <><Spinner />Memverifikasi...</> : "Verifikasi OTP"}
            </button>
          </div>
        )}

        {step === "newpass" && (
          <div className="space-y-4">
            <p className="text-sm text-gray-500">Buat kata sandi baru yang kuat.</p>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Kata Sandi Baru</label>
              <div className="relative">
                <input type={showNew?"text":"password"} value={newPass} onChange={(e) => setNewPass(e.target.value)} placeholder="Min. 8 karakter" disabled={loading} className="w-full px-4 py-3 pr-11 border border-gray-200 rounded-xl text-sm focus:outline-none transition-all" onFocus={(e) => { e.target.style.borderColor="#1565C0"; e.target.style.boxShadow="0 0 0 3px rgba(21,101,192,0.12)"; }} onBlur={(e) => { e.target.style.borderColor="#E5E7EB"; e.target.style.boxShadow="none"; }} />
                <button type="button" onClick={() => setShowNew(!showNew)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">{showNew ? <EyeOff size={17}/> : <Eye size={17}/>}</button>
              </div>
              {newPass && <div className="flex gap-1 mt-2">{[1,2,3,4].map((i) => <div key={i} className="flex-1 h-1 rounded-full transition-all" style={{ backgroundColor: newPass.length >= i*2 ? (newPass.length >= 10 ? "#22C55E" : newPass.length >= 6 ? "#F59E0B" : "#EF4444") : "#E5E7EB" }} />)}</div>}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Konfirmasi Kata Sandi</label>
              <div className="relative">
                <input type={showConfirm?"text":"password"} value={confirmPass} onChange={(e) => setConfirmPass(e.target.value)} placeholder="Ulangi kata sandi baru" disabled={loading} className="w-full px-4 py-3 pr-11 border border-gray-200 rounded-xl text-sm focus:outline-none transition-all" onFocus={(e) => { e.target.style.borderColor="#1565C0"; e.target.style.boxShadow="0 0 0 3px rgba(21,101,192,0.12)"; }} onBlur={(e) => { e.target.style.borderColor="#E5E7EB"; e.target.style.boxShadow="none"; }} />
                <button type="button" onClick={() => setShowConfirm(!showConfirm)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">{showConfirm ? <EyeOff size={17}/> : <Eye size={17}/>}</button>
              </div>
              {confirmPass && newPass && <p className={`text-xs mt-1 ${confirmPass===newPass?"text-green-500":"text-red-400"}`}>{confirmPass===newPass?"✓ Kata sandi cocok":"✗ Kata sandi belum cocok"}</p>}
            </div>
            <button onClick={() => { setError(""); if (newPass.length < 8) { setError("Kata Sandi minimal 8 karakter."); return; } if (newPass !== confirmPass) { setError("Konfirmasi kata sandi tidak cocok."); return; } setLoading(true); setTimeout(() => { setLoading(false); setStep("success"); }, 1000); }} disabled={loading} className="w-full py-3.5 rounded-xl font-semibold text-white flex items-center justify-center gap-2 transition-all hover:opacity-90 disabled:opacity-70" style={{ backgroundColor: "#1565C0" }}>
              {loading ? <><Spinner />Menyimpan...</> : "Simpan Kata Sandi Baru"}
            </button>
          </div>
        )}

        {step === "success" && (
          <div className="text-center space-y-4 py-2">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto"><CheckCircle size={34} className="text-green-500" /></div>
            <div><p className="font-bold text-gray-800 text-base">Kata Sandi Berhasil Diperbarui!</p><p className="text-sm text-gray-500 mt-1">Silakan masuk menggunakan kata sandi baru Anda.</p></div>
            <button onClick={onBack} className="w-full py-3.5 rounded-xl font-semibold text-white transition-all hover:opacity-90" style={{ backgroundColor: "#1565C0" }}>
              <LogIn size={17} className="inline mr-2" /> Kembali ke Halaman Masuk
            </button>
          </div>
        )}
      </div>
    </PageShell>
  );
}

/* ─── Login Page ─── */
export function LoginPage({ onLogin }: Props) {
  const [role, setRole] = useState<"mahasiswa" | "kaprodi">("mahasiswa");
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showForgot, setShowForgot] = useState(false);

  if (showForgot) return <ForgotPasswordPage onBack={() => setShowForgot(false)} />;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!id.trim() || !password.trim()) {
      setError(`${role === "mahasiswa" ? "NIM" : "NIDN"} dan kata sandi tidak boleh kosong.`);
      return;
    }
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      if (role === "mahasiswa") {
        onLogin("Candra Rizqea Hakimin", "mahasiswa");
      } else {
        onLogin("Dr. Amelia Hasanuddin, M.Sc.", "kaprodi");
      }
    }, 1200);
  };

  return (
    <PageShell>
      <div className="bg-white rounded-2xl shadow-2xl p-8">
        {/* Role Selector */}
        <div className="flex gap-2 mb-6 bg-gray-100 rounded-xl p-1">
          <button
            onClick={() => { setRole("mahasiswa"); setId(""); setError(""); }}
            className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-semibold transition-all ${role === "mahasiswa" ? "bg-white shadow-sm text-[#1565C0]" : "text-gray-500 hover:text-gray-700"}`}
          >
            <GraduationCap size={16} /> Mahasiswa
          </button>
          <button
            onClick={() => { setRole("kaprodi"); setId(""); setError(""); }}
            className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-semibold transition-all ${role === "kaprodi" ? "bg-white shadow-sm text-[#1565C0]" : "text-gray-500 hover:text-gray-700"}`}
          >
            <ShieldCheck size={16} /> Kaprodi
          </button>
        </div>

        <h2 className="text-xl font-bold mb-1" style={{ color: "#1565C0", fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
          {role === "mahasiswa" ? "Masuk sebagai Mahasiswa" : "Masuk sebagai Kaprodi"}
        </h2>
        <p className="text-gray-500 text-sm mb-6">
          {role === "mahasiswa" ? "Gunakan NIM dan kata sandi SIAKAD" : "Gunakan NIDN dan kata sandi kepegawaian"}
        </p>

        {error && (
          <div className="flex items-center gap-2 bg-red-50 border border-red-200 text-red-600 rounded-xl px-4 py-3 mb-5 text-sm">
            <AlertCircle size={16} className="flex-shrink-0" /> {error}
          </div>
        )}

        {/* Role badge */}
        <div className={`flex items-center gap-2 px-3 py-2 rounded-xl mb-4 text-xs font-medium ${role === "mahasiswa" ? "bg-blue-50 text-blue-700" : "bg-purple-50 text-purple-700"}`}>
          {role === "mahasiswa"
            ? <><GraduationCap size={14} /> Portal Mahasiswa — akses booking lab & jadwal</>
            : <><ShieldCheck size={14} /> Portal Kaprodi — kelola persetujuan booking & jadwal</>
          }
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              {role === "mahasiswa" ? "NIM" : "NIDN"}
            </label>
            <input
              type="text"
              value={id}
              onChange={(e) => setId(e.target.value)}
              placeholder={role === "mahasiswa" ? "Masukkan NIM Anda" : "Masukkan NIDN Anda"}
              className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none transition-all"
              onFocus={(e) => { e.target.style.borderColor = "#1565C0"; e.target.style.boxShadow = "0 0 0 3px rgba(21,101,192,0.12)"; }}
              onBlur={(e) => { e.target.style.borderColor = "#E5E7EB"; e.target.style.boxShadow = "none"; }}
              disabled={loading}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Kata Sandi</label>
            <div className="relative">
              <input
                type={showPass ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Masukkan kata sandi Anda"
                className="w-full px-4 py-3 pr-12 border border-gray-200 rounded-xl text-sm focus:outline-none transition-all"
                onFocus={(e) => { e.target.style.borderColor = "#1565C0"; e.target.style.boxShadow = "0 0 0 3px rgba(21,101,192,0.12)"; }}
                onBlur={(e) => { e.target.style.borderColor = "#E5E7EB"; e.target.style.boxShadow = "none"; }}
                disabled={loading}
              />
              <button type="button" onClick={() => setShowPass(!showPass)} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors">
                {showPass ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          <div className="flex items-center justify-between pt-1">
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" className="w-4 h-4 rounded border-gray-300 accent-blue-600" />
              <span className="text-sm text-gray-500">Ingat saya</span>
            </label>
            <button type="button" onClick={() => setShowForgot(true)} className="text-sm font-medium hover:underline transition-colors" style={{ color: "#1565C0" }}>
              Lupa kata sandi?
            </button>
          </div>

          <button
            type="submit" disabled={loading}
            className="w-full py-3.5 rounded-xl font-semibold text-white flex items-center justify-center gap-2 transition-all hover:opacity-90 hover:shadow-lg mt-2 disabled:opacity-70"
            style={{ backgroundColor: "#1565C0" }}
          >
            {loading
              ? <><svg className="animate-spin w-5 h-5" viewBox="0 0 24 24" fill="none"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4l3-3-3-3v4a8 8 0 00-8 8h4z"/></svg>Memverifikasi...</>
              : <><LogIn size={18} /> Masuk</>
            }
          </button>
        </form>

        <div className="mt-6 pt-5 border-t border-gray-100 text-center">
          <p className="text-xs text-gray-400">
            Butuh bantuan? Hubungi{" "}
            <a href="mailto:plt@uinjkt.ac.id" className="font-medium" style={{ color: "#1565C0" }}>plt@uinjkt.ac.id</a>
          </p>
        </div>
      </div>
    </PageShell>
  );
}
