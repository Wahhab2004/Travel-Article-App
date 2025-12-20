import AdminNavbar from "@/components/layout/AdminNavbar";



export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-slate-50/50">
      <AdminNavbar /> {/* Navbar yang kita buat di atas */}
      
      {/* pt-20 untuk memberi ruang agar konten mulai di bawah navbar (h-20) */}
      <main className="pt-20 min-h-screen">
        <div className="p-4 md:p-10">
          {children}
        </div>
      </main>
    </div>
  );
}