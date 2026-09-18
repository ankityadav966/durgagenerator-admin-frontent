import { useState } from "react";
import { Outlet } from "react-router-dom";
import { Sidebar } from "./Sidebar";
import { Topbar } from "./Topbar";
import { Toast } from "./Toast";
import { useContent } from "../context/ContentContext";
import { Loader2 } from "lucide-react";

export const AdminLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { loading, content } = useContent();

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col font-sans">
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <div className="lg:pl-64 flex-1 flex flex-col min-w-0">
        <Topbar onOpenSidebar={() => setSidebarOpen(true)} />

        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-6xl w-full mx-auto">
          {loading && !content ? (
            <div className="h-[50vh] flex flex-col items-center justify-center gap-3 text-center">
              <Loader2 size={32} className="text-amber-600 animate-spin" />
              <p className="text-gray-500 text-sm font-medium">
                Loading data...
              </p>
            </div>
          ) : (
            <Outlet />
          )}
        </main>
      </div>

      <Toast />
    </div>
  );
};
