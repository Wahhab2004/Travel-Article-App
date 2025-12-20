import AdminNavbar from "@/components/layout/AdminNavbar";



export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-slate-50/50">
      <AdminNavbar />
      
      <main className="pt-20 min-h-screen">
        <div className="p-4 md:p-10">
          {children}
        </div>
      </main>
    </div>
  );
}