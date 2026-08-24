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
    <div className="min-h-screen bg-[#07162b] text-[#e8e4db] flex flex-col font-sans">
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <div className="lg:pl-72 flex-1 flex flex-col min-w-0">
        <Topbar onOpenSidebar={() => setSidebarOpen(true)} />

        <main className="flex-1 p-4 sm:p-6 lg:p-10 max-w-7xl w-full mx-auto">
          {loading && !content ? (
            <div className="h-[60vh] flex flex-col items-center justify-center gap-4 text-center">
              <Loader2 size={40} className="text-yellow-500 animate-spin" />
              <p className="text-gray-400 text-sm font-medium">
                Loading website content from backend...
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
