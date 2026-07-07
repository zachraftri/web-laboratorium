import { useState } from "react";
import { Link } from "react-router";
import { ChevronRight, Search, ChevronDown, Mail, Phone } from "lucide-react";

type FAQItem = { q: string; a: string };

const faqData: Record<string, FAQItem[]> = {
  Umum: [
    { q: "Apa itu LabKampus?", a: "LabKampus adalah platform manajemen laboratorium kampus terpadu yang memungkinkan mahasiswa, dosen, dan peneliti untuk melakukan booking lab, mencari informasi peralatan, dan mengakses panduan penggunaan secara online." },
    { q: "Siapa yang bisa menggunakan LabKampus?", a: "LabKampus dapat digunakan oleh mahasiswa aktif, dosen, dan peneliti yang terdaftar di universitas. Setiap pengguna harus mendaftarkan akun menggunakan email kampus yang valid." },
    { q: "Apakah LabKampus tersedia 24 jam?", a: "Platform LabKampus dapat diakses 24/7, namun booking lab hanya dapat diproses pada hari dan jam kerja (Senin-Jumat, 08:00-16:00 WIB). Penggunaan laboratorium mengikuti jadwal operasional kampus." },
    { q: "Bagaimana cara mendaftar akun?", a: "Klik tombol 'Login / Daftar' di pojok kanan atas, pilih 'Daftar Akun Baru', isi formulir dengan data diri dan email kampus Anda, lalu verifikasi email untuk mengaktifkan akun." },
    { q: "Apakah ada biaya penggunaan platform?", a: "Platform LabKampus gratis untuk digunakan oleh seluruh civitas akademika kampus. Untuk penggunaan peralatan tertentu, mungkin terdapat biaya bahan habis pakai yang dibebankan sesuai kebijakan laboratorium masing-masing." },
  ],
  Booking: [
    { q: "Bagaimana cara melakukan booking laboratorium?", a: "Akses menu 'Booking Lab', pilih program studi, pilih laboratorium yang diinginkan, tentukan tanggal dan sesi waktu yang tersedia, isi formulir data peminjam, upload surat keterangan, lalu konfirmasi booking Anda." },
    { q: "Berapa lama proses persetujuan booking?", a: "Proses persetujuan booking memakan waktu maksimal 1x24 jam kerja. Anda akan menerima notifikasi email setelah booking disetujui atau ditolak beserta alasannya." },
    { q: "Berapa lama maksimal waktu penggunaan lab?", a: "Durasi penggunaan laboratorium adalah per sesi (2 jam). Untuk keperluan penelitian yang membutuhkan waktu lebih lama, hubungi kepala laboratorium untuk pengaturan khusus." },
    { q: "Bisakah membatalkan booking yang sudah dibuat?", a: "Pembatalan booking dapat dilakukan maksimal 24 jam sebelum jadwal penggunaan melalui halaman 'Riwayat Booking' di profil Anda. Pembatalan kurang dari 24 jam memerlukan konfirmasi dari dosen pembimbing." },
    { q: "Berapa kapasitas maksimum per booking?", a: "Kapasitas maksimum per booking sesuai kapasitas laboratorium yang dipilih (tertera di informasi lab). Untuk kelompok besar, disarankan membagi menjadi beberapa sesi." },
    { q: "Apa yang terjadi jika booking tidak disetujui?", a: "Jika booking tidak disetujui, Anda akan menerima email berisi alasan penolakan. Anda dapat mengajukan booking ulang dengan memperbaiki dokumen atau memilih jadwal yang berbeda." },
  ],
  "Alat & Fasilitas": [
    { q: "Bagaimana cara mengetahui ketersediaan alat?", a: "Status ketersediaan alat dapat dilihat di halaman Katalog Alat. Setiap alat memiliki indikator 'Tersedia' atau 'Tidak Tersedia'. Untuk booking spesifik alat, sertakan dalam formulir booking lab." },
    { q: "Apakah ada panduan penggunaan alat?", a: "Ya, setiap alat memiliki tutorial video dan dokumen SOP (Standard Operating Procedure) yang dapat diakses melalui halaman Katalog Alat. Mahasiswa disarankan mempelajari SOP sebelum menggunakan alat." },
    { q: "Siapa yang bertanggung jawab jika alat rusak saat digunakan?", a: "Kerusakan alat akibat kelalaian pengguna menjadi tanggung jawab peminjam sesuai kebijakan kampus. Pastikan mengikuti SOP dengan benar dan melaporkan segera jika terjadi kerusakan." },
    { q: "Apakah semua alat bisa dipinjam secara mandiri?", a: "Beberapa alat memerlukan pendampingan dari teknisi atau laboran, terutama untuk alat berteknologi tinggi seperti SEM, XRD, dan GC. Hal ini akan tertera di informasi detail alat." },
    { q: "Bagaimana jika alat yang dibutuhkan sedang dalam perawatan?", a: "Status perawatan alat akan tercermin di Katalog Alat. Anda dapat menghubungi pengelola lab untuk informasi jadwal selesai perawatan atau mencari alternatif alat yang setara." },
  ],
  "Keamanan & SOP": [
    { q: "APD apa yang wajib digunakan di laboratorium?", a: "APD minimal yang wajib digunakan adalah jas lab, kacamata pelindung, dan sarung tangan. Untuk lab kimia, tambahkan masker dan sepatu tertutup. Detail APD per laboratorium tercantum dalam SOP masing-masing lab." },
    { q: "Apa yang harus dilakukan jika terjadi kecelakaan di lab?", a: "Segera hubungi laboran atau dosen pembimbing yang ada di lokasi. Gunakan kotak P3K untuk penanganan awal. Laporan kecelakaan wajib diisi dalam formulir yang tersedia di setiap laboratorium." },
    { q: "Apakah boleh masuk lab di luar jam booking?", a: "Tidak diperbolehkan. Akses laboratorium hanya diizinkan sesuai jadwal booking yang telah disetujui. Pelanggaran dapat mengakibatkan sanksi akademik." },
    { q: "Bagaimana prosedur penanganan bahan kimia berbahaya?", a: "Setiap bahan kimia berbahaya harus ditangani sesuai MSDS (Material Safety Data Sheet) yang tersedia di laboratorium. Wajib menggunakan APD lengkap dan tidak bekerja sendirian saat menangani bahan B3." },
  ],
  Penelitian: [
    { q: "Bisakah mahasiswa S1 mengakses lab untuk penelitian skripsi?", a: "Ya, mahasiswa S1 yang sedang mengerjakan skripsi dapat menggunakan laboratorium untuk keperluan penelitian dengan melampirkan surat keterangan dari dosen pembimbing skripsi." },
    { q: "Apakah penelitian lintas prodi diperbolehkan?", a: "Penelitian kolaborasi lintas prodi diperbolehkan dan didukung. Booking dapat dilakukan oleh dosen koordinator penelitian dengan melampirkan surat tugas penelitian dari fakultas." },
    { q: "Bagaimana cara mendaftarkan penelitian ke showcase?", a: "Hasil penelitian dapat didaftarkan ke Showcase Penelitian melalui formulir yang tersedia di halaman Penelitian. Penelitian akan diverifikasi oleh admin sebelum dipublikasikan." },
    { q: "Apakah ada kuota khusus lab untuk penelitian?", a: "Beberapa laboratorium memiliki alokasi khusus untuk kegiatan penelitian. Informasi ini dapat dilihat di detail masing-masing laboratorium. Booking untuk penelitian sebaiknya dilakukan jauh hari sebelumnya." },
  ],
};

const categories = Object.keys(faqData);

export function FAQPage() {
  const [activeTab, setActiveTab] = useState("Umum");
  const [search, setSearch] = useState("");
  const [openItem, setOpenItem] = useState<number | null>(null);

  const allFAQs = Object.entries(faqData).flatMap(([cat, items]) => items.map((item) => ({ ...item, cat })));
  const displayItems = search
    ? allFAQs.filter((f) => f.q.toLowerCase().includes(search.toLowerCase()) || f.a.toLowerCase().includes(search.toLowerCase()))
    : faqData[activeTab];

  return (
    <div style={{ fontFamily: "'Inter', sans-serif", backgroundColor: "#F0F7FF", minHeight: "100vh" }}>
      {/* Header */}
      <div style={{ backgroundColor: "#1565C0" }} className="py-8 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-2 text-blue-300 text-sm mb-3">
            <Link to="/" className="hover:text-white">Beranda</Link>
            <ChevronRight size={14} />
            <span className="text-white">FAQ</span>
          </div>
          <h1 className="text-3xl font-bold text-white" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
            Pertanyaan yang Sering Diajukan
          </h1>
          <p className="text-blue-200 mt-2">Temukan jawaban untuk pertanyaan Anda seputar penggunaan laboratorium</p>

          {/* Search */}
          <div className="relative mt-6 max-w-lg">
            <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Cari pertanyaan..."
              value={search}
              onChange={(e) => { setSearch(e.target.value); setOpenItem(null); }}
              className="w-full pl-12 pr-4 py-3 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-300 text-gray-800"
            />
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        {!search && (
          <div className="flex flex-wrap gap-2 mb-6">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => { setActiveTab(cat); setOpenItem(null); }}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors border ${
                  activeTab === cat ? "text-white border-transparent" : "bg-white border-gray-200 text-gray-600 hover:border-gray-300"
                }`}
                style={activeTab === cat ? { backgroundColor: "#1565C0" } : {}}
              >
                {cat}
                <span className="ml-1.5 text-xs opacity-60">({faqData[cat].length})</span>
              </button>
            ))}
          </div>
        )}

        {search && (
          <p className="text-sm text-gray-500 mb-4">
            {displayItems.length} hasil untuk "<strong>{search}</strong>"
          </p>
        )}

        <div className="space-y-3">
          {(displayItems as FAQItem[]).map((faq, i) => (
            <div key={i} className="bg-white rounded-xl border border-blue-100 shadow-sm overflow-hidden">
              <button
                className="w-full flex items-center justify-between p-5 text-left"
                onClick={() => setOpenItem(openItem === i ? null : i)}
              >
                <span className="font-medium text-gray-800 pr-4 leading-snug">{faq.q}</span>
                <ChevronDown
                  size={18}
                  className={`flex-shrink-0 text-gray-400 transition-transform duration-200 ${openItem === i ? "rotate-180" : ""}`}
                />
              </button>
              {openItem === i && (
                <div className="px-5 pb-5">
                  <div className="h-px bg-gray-100 mb-4" />
                  <p className="text-sm text-gray-600 leading-relaxed">{faq.a}</p>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Contact CTA */}
        <div
          className="mt-10 rounded-2xl p-8 text-center"
          style={{ background: "linear-gradient(135deg, #1565C0 0%, #1976D2 100%)" }}
        >
          <h3 className="text-xl font-bold text-white mb-2" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
            Masih ada pertanyaan?
          </h3>
          <p className="text-blue-200 text-sm mb-6">Tim kami siap membantu Anda. Hubungi kami melalui:</p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a
              href="mailto:lab@kampus.ac.id"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full font-semibold text-white border-2 border-white/30 hover:bg-white/10 transition-colors"
            >
              <Mail size={16} /> lab@kampus.ac.id
            </a>
            <a
              href="tel:021-1234-5678"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full font-semibold text-[#1565C0] bg-white hover:bg-blue-50 transition-colors"
            >
              <Phone size={16} /> (021) 1234-5678
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
