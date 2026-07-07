import { useState } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router";
import { useEffect } from "react";
import { Navbar } from "./components/Navbar";
import { Footer } from "./components/Footer";
import { LoginPage } from "./components/LoginPage";
import { HomePage } from "./components/HomePage";
import { ProdiLabPage } from "./components/ProdiLabPage";
import { KatalogAlatPage } from "./components/KatalogAlatPage";
import { BookingLabPage } from "./components/BookingLabPage";
import { JadwalPage } from "./components/JadwalPage";
import { StatistikPage } from "./components/StatistikPage";
import { PenelitianPage } from "./components/PenelitianPage";
import { FAQPage } from "./components/FAQPage";
import { KaprodiDashboard, type BookingRequest, type PindahRequest } from "./components/KaprodiDashboard";

/* MARKER-MAKE-KIT-INVOKED */

type User = { name: string; role: "mahasiswa" | "kaprodi" };

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo(0, 0); }, [pathname]);
  return null;
}

function MainApp({
  user, onLogout,
  onSubmitBooking, onSubmitPindah,
  bookingRequests, pindahRequests,
  onCancelBooking, onCancelPindah,
  onDeleteBooking, onDeletePindah,
}: {
  user: User; onLogout: () => void;
  onSubmitBooking: (data: Omit<BookingRequest, "id" | "type" | "status" | "submittedAt">) => void;
  onSubmitPindah: (data: Omit<PindahRequest, "id" | "type" | "status" | "submittedAt">) => void;
  bookingRequests: BookingRequest[];
  pindahRequests: PindahRequest[];
  onCancelBooking: (id: string) => void;
  onCancelPindah: (id: string) => void;
  onDeleteBooking: (id: string) => void;
  onDeletePindah: (id: string) => void;
}) {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar user={user.name} onLogout={onLogout} />
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/prodi-lab" element={<ProdiLabPage />} />
          <Route path="/katalog-alat" element={<KatalogAlatPage />} />
          <Route path="/booking-lab" element={
            <BookingLabPage
              onSubmitBooking={onSubmitBooking}
              onSubmitPindah={onSubmitPindah}
              myBookings={bookingRequests}
              myPindah={pindahRequests}
              onCancelBooking={onCancelBooking}
              onCancelPindah={onCancelPindah}
              onDeleteBooking={onDeleteBooking}
              onDeletePindah={onDeletePindah}
            />
          } />
          <Route path="/jadwal" element={<JadwalPage />} />
          <Route path="/statistik" element={<StatistikPage />} />
          <Route path="/penelitian" element={<PenelitianPage />} />
          <Route path="/faq" element={<FAQPage />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default function App() {
  const [user, setUser] = useState<User | null>(null);
  const [bookingRequests, setBookingRequests] = useState<BookingRequest[]>([]);
  const [pindahRequests, setPindahRequests] = useState<PindahRequest[]>([]);

  const handleLogin = (name: string, role: "mahasiswa" | "kaprodi") => {
    setUser({ name, role });
  };

  const handleLogout = () => setUser(null);

  const handleSubmitBooking = (data: Omit<BookingRequest, "id" | "type" | "status" | "submittedAt">) => {
    const newReq: BookingRequest = {
      ...data,
      id: Date.now().toString(),
      type: "booking",
      status: "menunggu",
      submittedAt: new Date().toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric", hour: "2-digit", minute: "2-digit" }),
    };
    setBookingRequests((prev) => [...prev, newReq]);
  };

  const handleSubmitPindah = (data: Omit<PindahRequest, "id" | "type" | "status" | "submittedAt">) => {
    const newReq: PindahRequest = {
      ...data,
      id: Date.now().toString(),
      type: "pindah",
      status: "menunggu",
      submittedAt: new Date().toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric", hour: "2-digit", minute: "2-digit" }),
    };
    setPindahRequests((prev) => [...prev, newReq]);
  };

  const handleUpdateBooking = (id: string, status: "disetujui" | "ditolak", alasanTolak?: string) => {
    setBookingRequests((prev) => prev.map((r) => r.id === id ? { ...r, status, alasanTolak } : r));
  };

  const handleUpdatePindah = (id: string, status: "disetujui" | "ditolak", alasanTolak?: string) => {
    setPindahRequests((prev) => prev.map((r) => r.id === id ? { ...r, status, alasanTolak } : r));
  };

  const handleCancelBooking = (id: string) => {
    setBookingRequests((prev) => prev.map((r) => r.id === id ? { ...r, status: "dibatalkan" as any } : r));
  };

  const handleCancelPindah = (id: string) => {
    setPindahRequests((prev) => prev.map((r) => r.id === id ? { ...r, status: "dibatalkan" as any } : r));
  };

  const handleDeleteBooking = (id: string) => {
    setBookingRequests((prev) => prev.filter((r) => r.id !== id));
  };

  const handleDeletePindah = (id: string) => {
    setPindahRequests((prev) => prev.filter((r) => r.id !== id));
  };

  if (!user) {
    return <LoginPage onLogin={handleLogin} />;
  }

  if (user.role === "kaprodi") {
    return (
      <KaprodiDashboard
        user={user.name}
        onLogout={handleLogout}
        bookingRequests={bookingRequests}
        pindahRequests={pindahRequests}
        onUpdateBooking={handleUpdateBooking}
        onUpdatePindah={handleUpdatePindah}
      />
    );
  }

  return (
    <BrowserRouter>
      <ScrollToTop />
      <MainApp
        user={user}
        onLogout={handleLogout}
        onSubmitBooking={handleSubmitBooking}
        onSubmitPindah={handleSubmitPindah}
        bookingRequests={bookingRequests}
        pindahRequests={pindahRequests}
        onCancelBooking={handleCancelBooking}
        onCancelPindah={handleCancelPindah}
        onDeleteBooking={handleDeleteBooking}
        onDeletePindah={handleDeletePindah}
      />
    </BrowserRouter>
  );
}
