import { useState } from "react";
import { Link, useLocation } from "react-router";
import { Menu, X, Eye, EyeOff, LogIn, LogOut, ChevronDown } from "lucide-react";
import { logoUIN } from "../assets";

const navLinks = [
  { label: "Beranda", path: "/" },
  { label: "Daftar Lab", path: "/prodi-lab" },
  { label: "Katalog Alat", path: "/katalog-alat" },
  { label: "Booking Lab", path: "/booking-lab" },
  { label: "Jadwal", path: "/jadwal" },
  { label: "Penelitian", path: "/penelitian" },
  { label: "FAQ", path: "/faq" },
];

function LoginModal({ onClose }: { onClose: () => void }) {
  const [nim, setNim] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4" onClick={onClose}>
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" />
      <div
        className="relative bg-white rounded-2xl shadow-2xl w-full max-w-sm p-8"
        onClick={(e) => e.stopPropagation()}
      >
        <button onClick={onClose} className="absolute top-4 right-4 p-1.5 rounded-lg text-gray-400 hover:bg-gray-100 hover:text-gray-600 transition-colors">
          <X size={18} />
        </button>

        <div className="flex flex-col items-center mb-7">
          <img src={logoUIN} alt="Logo UIN Jakarta" className="w-16 h-16 object-contain mb-3" />
          <h2 className="text-lg font-bold text-center leading-tight" style={{ color: "#1565C0", fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
            PLT UIN Syarif Hidayatullah Jakarta
          </h2>
          <p className="text-xs text-gray-400 mt-1">Silakan masuk untuk melanjutkan</p>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">NIM</label>
            <input
              type="text"
              value={nim}
              onChange={(e) => setNim(e.target.value)}
              placeholder="Masukkan NIM Anda"
              className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none transition-all"
              onFocus={(e) => e.target.style.boxShadow = "0 0 0 3px rgba(21,101,192,0.15)"}
              onBlur={(e) => e.target.style.boxShadow = "none"}
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
                className="w-full px-4 py-2.5 pr-11 border border-gray-200 rounded-xl text-sm focus:outline-none transition-all"
                onFocus={(e) => e.target.style.boxShadow = "0 0 0 3px rgba(21,101,192,0.15)"}
                onBlur={(e) => e.target.style.boxShadow = "none"}
              />
              <button type="button" onClick={() => setShowPass(!showPass)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors">
                {showPass ? <EyeOff size={17} /> : <Eye size={17} />}
              </button>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" className="rounded border-gray-300 w-4 h-4" />
              <span className="text-xs text-gray-500">Ingat saya</span>
            </label>
            <button className="text-xs font-medium hover:underline" style={{ color: "#1565C0" }}>
              Lupa kata sandi?
            </button>
          </div>

          <button
            className="w-full py-3 rounded-xl font-semibold text-white flex items-center justify-center gap-2 transition-opacity hover:opacity-90 mt-2"
            style={{ backgroundColor: "#1565C0" }}
            onClick={onClose}
          >
            <LogIn size={17} /> Masuk
          </button>
        </div>

        <p className="text-center text-xs text-gray-400 mt-5">
          Gunakan NIM dan kata sandi SIAKAD Anda untuk masuk.
        </p>
      </div>
    </div>
  );
}

interface NavbarProps {
  user?: string;
  onLogout?: () => void;
}

export function Navbar({ user, onLogout }: NavbarProps) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [loginOpen, setLoginOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <>
      {loginOpen && <LoginModal onClose={() => setLoginOpen(false)} />}

      <nav className="sticky top-0 z-50 bg-white shadow-sm border-b border-blue-100" style={{ fontFamily: "'Inter', sans-serif" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 gap-4">
            <Link to="/" className="flex items-center gap-2.5 flex-shrink-0">
              <img src={logoUIN} alt="Logo UIN Jakarta" className="w-9 h-9 object-contain" />
              <span className="text-sm font-bold leading-tight hidden sm:block" style={{ color: "#1565C0", fontFamily: "'Plus Jakarta Sans', sans-serif", maxWidth: 200 }}>
                PLT UIN SYARIF HIDAYATULLAH JAKARTA
              </span>
              <span className="text-sm font-bold sm:hidden" style={{ color: "#1565C0", fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                PLT UIN
              </span>
            </Link>

            <div className="hidden lg:flex items-center gap-1 flex-1 justify-center">
              {navLinks.map((link) => (
                <Link key={link.path} to={link.path}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${isActive(link.path) ? "bg-blue-50 text-[#1565C0]" : "text-gray-600 hover:text-[#1565C0] hover:bg-blue-50"}`}>
                  {link.label}
                </Link>
              ))}
            </div>

            <div className="hidden lg:flex items-center gap-3 flex-shrink-0">
              {user ? (
                <div className="relative">
                  <button
                    onClick={() => setUserMenuOpen(!userMenuOpen)}
                    className="flex items-center gap-2 px-3 py-2 rounded-full border-2 border-blue-200 hover:border-blue-400 transition-colors bg-blue-50"
                  >
                    <div className="w-7 h-7 rounded-full flex items-center justify-center text-white text-xs font-bold" style={{ backgroundColor: "#1565C0" }}>
                      {user.charAt(0)}
                    </div>
                    <span className="text-sm font-medium text-gray-700 max-w-32 truncate">{user}</span>
                    <ChevronDown size={14} className={`text-gray-400 transition-transform ${userMenuOpen ? "rotate-180" : ""}`} />
                  </button>
                  {userMenuOpen && (
                    <div className="absolute right-0 top-full mt-2 bg-white rounded-xl shadow-xl border border-blue-100 py-2 w-52 z-50">
                      <div className="px-4 py-2 border-b border-gray-100 mb-1">
                        <p className="text-xs text-gray-400">Masuk sebagai</p>
                        <p className="text-sm font-semibold text-gray-800 truncate">{user}</p>
                      </div>
                      <button
                        onClick={() => { setUserMenuOpen(false); onLogout?.(); }}
                        className="w-full flex items-center gap-2 px-4 py-2.5 text-sm text-red-500 hover:bg-red-50 transition-colors"
                      >
                        <LogOut size={15} /> Keluar
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <button
                  onClick={() => setLoginOpen(true)}
                  className="flex items-center gap-1.5 px-4 py-2 text-sm font-semibold text-white rounded-full transition-opacity hover:opacity-90 whitespace-nowrap"
                  style={{ backgroundColor: "#1565C0" }}
                >
                  <LogIn size={15} /> Login
                </button>
              )}
            </div>

            <button className="lg:hidden p-2 rounded-lg text-gray-600 hover:bg-blue-50" onClick={() => setMobileOpen(!mobileOpen)}>
              {mobileOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {mobileOpen && (
          <div className="lg:hidden bg-white border-t border-blue-100 py-3 px-4 space-y-1">
            {navLinks.map((link) => (
              <Link key={link.path} to={link.path} onClick={() => setMobileOpen(false)}
                className={`block px-3 py-2 rounded-lg text-sm font-medium transition-colors ${isActive(link.path) ? "bg-blue-50 text-[#1565C0]" : "text-gray-700 hover:bg-blue-50"}`}>
                {link.label}
              </Link>
            ))}
            <div className="pt-2 border-t border-blue-100">
              {user ? (
                <div className="space-y-2">
                  <div className="flex items-center gap-2 px-3 py-2 bg-blue-50 rounded-lg">
                    <div className="w-7 h-7 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0" style={{ backgroundColor: "#1565C0" }}>
                      {user.charAt(0)}
                    </div>
                    <span className="text-sm font-medium text-gray-700 truncate">{user}</span>
                  </div>
                  <button
                    onClick={() => { setMobileOpen(false); onLogout?.(); }}
                    className="w-full flex items-center justify-center gap-1.5 px-4 py-2 text-sm font-semibold text-red-500 border border-red-200 rounded-full hover:bg-red-50 transition-colors"
                  >
                    <LogOut size={15} /> Keluar
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => { setMobileOpen(false); setLoginOpen(true); }}
                  className="w-full flex items-center justify-center gap-1.5 px-4 py-2 text-sm font-semibold text-white rounded-full"
                  style={{ backgroundColor: "#1565C0" }}
                >
                  <LogIn size={15} /> Login
                </button>
              )}
            </div>
          </div>
        )}
      </nav>
    </>
  );
}
