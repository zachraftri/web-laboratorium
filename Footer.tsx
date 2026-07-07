import { Link } from "react-router";
import { Mail, Phone, MapPin, Instagram, Twitter, Youtube, Facebook } from "lucide-react";
import { logoUIN } from "../assets";

export function Footer() {
  return (
    <footer style={{ backgroundColor: "#1565C0", fontFamily: "'Inter', sans-serif" }} className="text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1 lg:col-span-1">
            <div className="flex items-start gap-3 mb-4">
              <img src={logoUIN} alt="Logo UIN Jakarta" className="w-12 h-12 object-contain flex-shrink-0 rounded-lg bg-white p-1" />
              <span className="text-sm font-bold leading-snug" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                PLT UIN SYARIF HIDAYATULLAH JAKARTA
              </span>
            </div>
            <p className="text-blue-200 text-sm leading-relaxed mb-4">
              Platform manajemen laboratorium terpadu. Booking lab, cari alat, dan akses panduan penggunaan dalam satu platform.
            </p>
            <div className="flex gap-3">
              {[Instagram, Twitter, Youtube, Facebook].map((Icon, i) => (
                <a key={i} href="#" className="w-8 h-8 rounded-lg bg-white/10 hover:bg-white/25 flex items-center justify-center transition-colors">
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-4 text-white">Menu Utama</h4>
            <ul className="space-y-2">
              {[
                { label: "Beranda", to: "/" },
                { label: "Daftar Lab", to: "/prodi-lab" },
                { label: "Katalog Alat", to: "/katalog-alat" },
                { label: "Booking Lab", to: "/booking-lab" },
                { label: "Jadwal Lab", to: "/jadwal" },
                { label: "Penelitian", to: "/penelitian" },
              ].map((l) => (
                <li key={l.to}>
                  <Link to={l.to} className="text-blue-200 hover:text-white text-sm transition-colors">{l.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Daftar Lab */}
          <div>
            <h4 className="font-semibold mb-4 text-white">Daftar Lab</h4>
            <ul className="space-y-2">
              {["Lab Pangan", "Lab Lingkungan", "Lab Agribisnis", "Lab Fisika", "Lab Kimia", "Lab Biologi", "Lab Komputer (TISIMAT)", "Lab Teknik Tambang", "Lab Uji Material", "Ruang Serbaguna"].map((p) => (
                <li key={p}>
                  <Link to="/prodi-lab" className="text-blue-200 hover:text-white text-sm transition-colors">{p}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold mb-4 text-white">Kontak</h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-3 text-sm text-blue-200">
                <MapPin size={16} className="flex-shrink-0 mt-0.5" />
                <span>Jl. Ir. H. Juanda No. 95, Ciputat, Tangerang Selatan 15412</span>
              </li>
              <li className="flex items-center gap-3 text-sm text-blue-200">
                <Phone size={16} className="flex-shrink-0" />
                <span>(021) 7401925</span>
              </li>
              <li className="flex items-center gap-3 text-sm text-blue-200">
                <Mail size={16} className="flex-shrink-0" />
                <span>plt@uinjkt.ac.id</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 mt-10 pt-6 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-blue-200 text-sm">© 2024 PLT UIN Syarif Hidayatullah Jakarta. All rights reserved.</p>
          <p className="text-blue-200 text-sm">Pusat Laboratorium Terpadu</p>
        </div>
      </div>
    </footer>
  );
}
