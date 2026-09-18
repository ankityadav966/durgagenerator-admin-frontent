import { Menu, LogOut, User } from "lucide-react";
import { useAuth } from "../context/AuthContext";

export const Topbar = ({ onOpenSidebar }) => {
  const { user, logout } = useAuth();

  return (
    <header className="sticky top-0 z-30 bg-white border-b border-gray-200 px-4 sm:px-6 h-16 flex items-center justify-between">
      <div className="flex items-center gap-3">
        <button
          onClick={onOpenSidebar}
          className="lg:hidden p-2 rounded-lg bg-gray-100 text-gray-700 hover:bg-gray-200 transition-colors"
          title="Open menu"
        >
          <Menu size={18} />
        </button>

        <span className="text-sm font-semibold text-gray-800">
          Durga Generator Admin
        </span>
      </div>

      <div className="flex items-center gap-3">
        {/* User profile */}
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-gray-50 border border-gray-200">
          <div className="w-6 h-6 rounded-full bg-amber-100 flex items-center justify-center text-amber-800 font-semibold text-xs">
            <User size={13} />
          </div>
          <span className="text-xs font-medium text-gray-700">
            {user?.name || user?.username || "Admin"}
          </span>
        </div>

        {/* Logout button */}
        <button
          onClick={logout}
          className="flex items-center gap-1.5 text-gray-600 hover:text-red-600 hover:bg-red-50 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors border border-transparent hover:border-red-200"
          title="Sign out"
        >
          <LogOut size={14} />
          <span className="hidden sm:inline">Logout</span>
        </button>
      </div>
    </header>
  );
};
