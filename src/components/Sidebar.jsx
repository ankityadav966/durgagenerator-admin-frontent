import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  Image,
  Zap,
  CheckCircle,
  MessageSquare,
  Info,
  ListOrdered,
  HelpCircle,
  Phone,
  Settings,
  X,
  ExternalLink,
  Cloud
} from "lucide-react";
import { PUBLIC_SITE_URL } from "../api/config";

export const navItems = [
  { path: "/", label: "Dashboard", icon: LayoutDashboard },
  { path: "/hero", label: "Hero Banner", icon: Image },
  { path: "/generators", label: "Generators", icon: Zap },
  { path: "/media", label: "Media Library", icon: Cloud },
  { path: "/features", label: "Why Choose Us", icon: CheckCircle },
  { path: "/testimonials", label: "Testimonials", icon: MessageSquare },
  { path: "/about", label: "About Us", icon: Info },
  { path: "/how-it-works", label: "How It Works", icon: ListOrdered },
  { path: "/faq", label: "FAQ", icon: HelpCircle },
  { path: "/contact", label: "Contact Info", icon: Phone },
  { path: "/settings", label: "Settings", icon: Settings },
];

export const Sidebar = ({ isOpen, onClose }) => {
  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div
          onClick={onClose}
          className="fixed inset-0 bg-black/40 z-40 lg:hidden"
        />
      )}

      {/* Sidebar container */}
      <aside
        className={`fixed top-0 left-0 bottom-0 w-64 bg-white border-r border-gray-200 z-50 flex flex-col transition-transform duration-200 lg:translate-x-0 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Brand Header */}
        <div className="h-16 px-6 border-b border-gray-200 flex items-center justify-between bg-white">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-amber-600 flex items-center justify-center text-white font-bold text-sm">
              DG
            </div>
            <div>
              <h2 className="font-bold text-sm text-gray-900 leading-tight">
                Durga Generator
              </h2>
              <p className="text-[11px] text-gray-500 font-medium">
                Admin Panel
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="lg:hidden text-gray-400 hover:text-gray-700 p-1 rounded-md"
          >
            <X size={18} />
          </button>
        </div>

        {/* Navigation list */}
        <div className="flex-1 overflow-y-auto p-3 space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.path}
                to={item.path}
                onClick={onClose}
                end={item.path === "/"}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-3.5 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                    isActive
                      ? "bg-amber-50 text-amber-900 font-semibold border-l-4 border-amber-600"
                      : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    <Icon
                      size={18}
                      className={isActive ? "text-amber-600" : "text-gray-400"}
                    />
                    <span>{item.label}</span>
                  </>
                )}
              </NavLink>
            );
          })}
        </div>

        {/* Footer / Website Link */}
        <div className="p-3 border-t border-gray-200 bg-gray-50">
          <a
            href={PUBLIC_SITE_URL}
            target="_blank"
            rel="noreferrer"
            className="w-full flex items-center justify-center gap-2 bg-white hover:bg-gray-100 text-gray-700 border border-gray-300 px-3 py-2 rounded-lg text-xs font-medium transition-colors"
          >
            <span>View Website</span>
            <ExternalLink size={13} className="text-gray-400" />
          </a>
        </div>
      </aside>
    </>
  );
};
