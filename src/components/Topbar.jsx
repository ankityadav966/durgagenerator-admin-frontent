import { Menu, LogOut, ShieldCheck, ExternalLink, RefreshCw } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { useContent } from "../context/ContentContext";

export const Topbar = ({ onOpenSidebar }) => {
  const { user, logout } = useAuth();
  const { fetchContent, loading } = useContent();

  return (
    <header className="sticky top-0 z-30 bg-[#07162b]/90 backdrop-blur-md border-b border-yellow-700/20 px-6 py-4 flex items-center justify-between">
      <div className="flex items-center gap-4">
        <button
          onClick={onOpenSidebar}
          className="lg:hidden p-2 rounded-xl bg-[#13233d] text-yellow-400 hover:bg-[#1c3354] transition-colors"
          title="Open menu"
        >
          <Menu size={20} />
        </button>

        <div className="flex items-center gap-2">
          <div className="w-2.5 h-2.5 rounded-full bg-green-500 animate-pulse"></div>
          <span className="text-xs font-semibold text-gray-300 hidden sm:inline">
            System Live & Synchronized
          </span>
        </div>
      </div>

      <div className="flex items-center gap-4">
        {/* Refresh button */}
        <button
          onClick={fetchContent}
          disabled={loading}
          className="p-2 rounded-xl bg-[#13233d] hover:bg-[#1a3052] text-gray-300 hover:text-yellow-400 transition-colors border border-yellow-900/30 text-xs flex items-center gap-1.5"
          title="Refresh Content from Server"
        >
          <RefreshCw size={15} className={loading ? "animate-spin text-yellow-400" : ""} />
          <span className="hidden md:inline">Sync Data</span>
        </button>

        {/* User profile */}
        <div className="flex items-center gap-3 bg-[#13233d] border border-yellow-700/30 px-3.5 py-1.5 rounded-2xl">
          <div className="w-7 h-7 rounded-full bg-yellow-500/20 border border-yellow-500/50 flex items-center justify-center text-yellow-400 font-bold text-xs">
            <ShieldCheck size={14} />
          </div>
          <div className="hidden sm:block text-left">
            <p className="text-xs font-bold text-white leading-tight">
              {user?.name || user?.username || "Admin"}
            </p>
            <p className="text-[10px] text-yellow-500/80 font-mono">Master Administrator</p>
          </div>
        </div>

        {/* Logout button */}
        <button
          onClick={logout}
          className="flex items-center gap-1.5 bg-red-950/60 hover:bg-red-900 text-red-300 border border-red-800/40 px-3.5 py-2 rounded-xl text-xs font-semibold transition-all hover:scale-105 active:scale-95"
          title="Sign out of Admin Panel"
        >
          <LogOut size={15} />
          <span className="hidden sm:inline">Logout</span>
        </button>
      </div>
    </header>
  );
};
