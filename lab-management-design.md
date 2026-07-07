Design a comprehensive university laboratory management website called "LabKampus" with a clean, professional academic aesthetic. Use a color palette of deep navy blue (#1B2B5E), white, light gray (#F5F6FA), and accent orange (#FF6B35). Use Inter or Plus Jakarta Sans as the primary font.

---

## GLOBAL COMPONENTS

Navigation bar (sticky):
- Logo "LabKampus" on the left
- Nav links: Beranda | Prodi & Lab | Katalog Alat | Booking Lab | Jadwal | Penelitian | FAQ
- Search bar with icon in center
- Login/Register button on the right
- Dropdown mega-menu on hover for "Prodi & Lab"

Footer:
- University logo and lab name
- Quick links, contact info, social media icons
- Copyright info

---

## PAGE 1 — HOMEPAGE (Beranda)

Hero section:
- Full-width banner with headline: "Eksplorasi & Manfaatkan Laboratorium Kampus"
- Subtitle: "Booking lab, cari alat, dan akses panduan penggunaan — semua dalam satu platform"
- Two CTA buttons: "Booking Lab Sekarang" (orange) and "Jelajahi Katalog Alat" (outlined)
- Background: abstract geometric pattern with lab imagery overlay

Stats dashboard strip (4 cards in a row):
- Total Lab: 24 Lab
- Total Alat: 318 Alat
- Pengguna Aktif: 1.240
- Penelitian Aktif: 87

Prodi Section (horizontal scroll cards):
8 program studi cards with icons:
1. Teknik Tambang — pickaxe icon
2. Teknik Informatika — code bracket icon
3. Sistem Informasi — database icon
4. Biologi — leaf/DNA icon
5. Kimia — flask icon
6. Fisika — atom icon
7. Matematika — sigma/calculator icon
8. Agribisnis — plant/agriculture icon

Each card: colored gradient top, prodi name, "X Laboratorium" count, arrow button

Featured Lab Equipment Section:
- Section title: "Alat Unggulan Lab"
- Grid of 6 equipment cards, each showing: equipment photo placeholder, name, prodi badge, "Lihat Tutorial" video button (YouTube icon), short function description, "Lihat Detail" button

Virtual Lab Tour Banner:
- Wide card with "Virtual Tour Lab" title
- Grid of 4 photo thumbnails (lab interior placeholders)
- "Mulai Tour Virtual" button

Research Showcase section:
- Title: "Penelitian Terkini"
- 3 horizontal cards each with: research title, prodi tag, tools used, researcher name, date, "Baca Selengkapnya" link

FAQ Preview:
- 5 accordion FAQ items
- "Lihat Semua FAQ" button

---

## PAGE 2 — PRODI & LAB PAGE

Page header with breadcrumb

8 Prodi tabs or sidebar filter:
[Teknik Tambang] [Teknik Informatika] [Sistem Informasi] [Biologi] [Kimia] [Fisika] [Matematika] [Agribisnis]

When a prodi is selected, show:
- Prodi banner with name, icon, and short description
- Lab cards grid (3 per row):
  Each lab card contains:
  - Lab name (e.g., "Lab Petrografi", "Lab Jaringan Komputer")
  - Prodi badge
  - Availability status chip: "Tersedia" (green) or "Penuh" (red) or "Terbatas" (orange)
  - Capacity info: "Kapasitas: 30 orang"
  - Facilities listed: AC, Proyektor, Komputer, dll
  - Two buttons: "Lihat Alat" and "Booking Lab"

---

## PAGE 3 — KATALOG ALAT (Equipment Catalog)

Page header: "Katalog Alat Laboratorium"

Filter sidebar (left):
- Search bar
- Filter by Prodi (checkbox list of 8 prodi)
- Filter by Lab
- Filter by Availability
- Filter by Category

Equipment grid (right, 3 columns):
Each equipment card:
- Equipment image placeholder (lab equipment photo)
- Equipment name (bold)
- Prodi + Lab badge
- Short function (1 line)
- "Tersedia" / "Tidak Tersedia" status badge
- Three action buttons: [Detail] [Tutorial Video] [SOP]

Equipment Detail Modal / Page:
- Large image
- Equipment name and category
- Specification table (Model, Merek, Tahun, Kapasitas, dll)
- Function description paragraph
- YouTube video embed section titled "Tutorial Penggunaan"
- SOP & Safety Guide accordion
- Related equipment section

---

## PAGE 4 — BOOKING LAB

Page header: "Booking / Peminjaman Laboratorium"

Step indicator: 1. Pilih Prodi → 2. Pilih Lab → 3. Pilih Jadwal → 4. Isi Data → 5. Konfirmasi

Step 1 — Choose Prodi:
Grid of 8 prodi cards (same style as homepage)

Step 2 — Choose Lab:
Cards showing available labs within selected prodi

Step 3 — Jadwal & Waktu:
- Calendar component showing real-time slot availability
- Time slot grid (08:00-10:00, 10:00-12:00, 13:00-15:00, 15:00-17:00)
- Color coding: Green=Tersedia, Orange=Terbatas, Red=Penuh, Gray=Libur

Step 4 — Form Data:
- NIM, Nama, Prodi, Semester
- Mata Kuliah / Keperluan
- Jumlah Peserta
- Dosen Pembimbing (optional)
- Alat yang Dibutuhkan (multi-select)
- Notes textarea
- Upload Surat Keterangan (file input)

Step 5 — Konfirmasi:
- Summary card with all booking details
- "Konfirmasi & Kirim" orange button
- Success state: green checkmark, booking code, download PDF button

---

## PAGE 5 — JADWAL REALTIME

Page header: "Jadwal Penggunaan Lab"

Filter bar: Prodi filter | Lab filter | Tanggal picker | Tampilan (Harian/Mingguan)

Weekly calendar grid view:
- Columns: Senin - Sabtu
- Rows: time slots per hour (08:00 - 17:00)
- Color-coded booking blocks: blue=confirmed, orange=pending, green=free
- Hover tooltip on each block showing: Lab name, User group, Prodi, Duration

List view toggle:
- Sortable table with columns: Tanggal, Lab, Prodi, Waktu, Pengguna, Status, Kapasitas Terisi

---

## PAGE 6 — DASHBOARD STATISTIK (Admin/Public View)

Header: "Dashboard Statistik Laboratorium"

KPI Cards row (5 cards):
- Total Lab Aktif: 24
- Total Alat: 318  
- Booking Bulan Ini: 456
- Pengguna Terdaftar: 1.240
- Penelitian Selesai: 87

Charts section (2 columns):
- Bar chart: "Penggunaan Lab per Prodi" (8 bars, one per prodi)
- Line chart: "Tren Booking 6 Bulan Terakhir"
- Donut chart: "Distribusi Penggunaan Lab per Prodi"
- Table: "Alat Paling Sering Digunakan" (top 10)

---

## PAGE 7 — RESEARCH SHOWCASE

Header: "Showcase Penelitian"

Filter by Prodi, Year, Equipment Used

Research cards (2 columns):
Each card:
- Research title
- Abstract (2-3 lines)
- Author + Supervisor
- Prodi badge + Year
- Equipment tags (chips): "Spektrofotometer", "Mikroskop", dll
- "Baca Selengkapnya" link
- Thumbnail image

---

## PAGE 8 — FAQ

Header: "Pertanyaan yang Sering Diajukan"

Category tabs: Umum | Booking | Alat & Fasilitas | Keamanan & SOP | Penelitian

Accordion FAQ list (10-15 items per category):
- Expandable questions with detailed answers
- Search bar at top to search FAQ
- "Hubungi Kami" button at bottom

---

## DESIGN SPECIFICATIONS

Colors:
- Primary: #1B2B5E (deep navy)
- Secondary: #FF6B35 (orange accent)
- Success: #22C55E
- Warning: #F59E0B  
- Danger: #EF4444
- Background: #F5F6FA
- Card: #FFFFFF
- Text primary: #1A1A2E
- Text secondary: #6B7280

Typography:
- Heading: Plus Jakarta Sans Bold
- Body: Inter Regular/Medium
- Labels: Inter SemiBold

Spacing: 8px grid system

Components style:
- Cards with subtle shadow and 12px border radius
- Buttons: rounded-full for primary CTAs, rounded-lg for secondary
- Badges/chips: pill-shaped with category colors
- Status indicators: colored dots + text
- Clean tables with alternating row colors

Mobile responsive breakpoints:
- Desktop: 1280px
- Tablet: 768px  
- Mobile: 375px

Iconography: Use Phosphor Icons or Lucide Icons (consistent outline style)

Overall vibe: Professional, academic, clean, trustworthy — similar to modern university portal + SaaS dashboard aesthetic.