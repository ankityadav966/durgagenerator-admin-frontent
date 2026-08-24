import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  Sparkles,
  Zap,
  Star,
  Quote,
  Building2,
  ListOrdered,
  HelpCircle,
  PhoneCall,
  Settings,
  X,
  ExternalLink
} from "lucide-react";

export const navItems = [
  { path: "/", label: "Dashboard", icon: LayoutDashboard, badge: "Overview" },
  { path: "/hero", label: "Hero Banner", icon: Sparkles, badge: "Homepage" },
  { path: "/generators", label: "Generators & Prices", icon: Zap, badge: "Core Catalog" },
  { path: "/features", label: "Why Choose Us", icon: Star, badge: "Features" },
  { path: "/testimonials", label: "Testimonials", icon: Quote, badge: "Reviews" },
  { path: "/about", label: "About & Stats", icon: Building2, badge: "Story" },
  { path: "/how-it-works", label: "How It Works", icon: ListOrdered, badge: "Steps" },
  { path: "/faq", label: "FAQ Manager", icon: HelpCircle, badge: "Help" },
  { path: "/contact", label: "Contact & Social", icon: PhoneCall, badge: "Info" },
  { path: "/settings", label: "Settings & Password", icon: Settings, badge: "Admin" },
];

export const Sidebar = ({ isOpen, onClose }) => {
  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div
          onClick={onClose}
          className="fixed inset-0 bg-black/70 backdrop-blur-sm z-40 lg:hidden"
        />
      )}

      {/* Sidebar container */}
      <aside
        className={`fixed top-0 left-0 bottom-0 w-72 bg-[#0a1728] border-r border-yellow-700/20 z-50 flex flex-col transition-transform duration-300 ease-in-out lg:translate-x-0 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Brand Header */}
        <div className="p-6 border-b border-yellow-700/20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-yellow-500/20 border border-yellow-500/40 flex items-center justify-center text-yellow-400 font-bold font-serif text-xl shadow-[0_0_15px_rgba(234,179,8,0.2)]">
              DG
            </div>
            <div>
              <h2 className="font-serif font-bold text-lg text-white leading-tight">
                Durga Generator
              </h2>
              <p className="text-[11px] text-yellow-500 font-semibold tracking-wider uppercase">
                Admin Control Panel
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="lg:hidden text-gray-400 hover:text-white p-1"
          >
            <X size={20} />
          </button>
        </div>

        {/* Navigation list */}
        <div className="flex-1 overflow-y-auto px-4 py-6 space-y-1.5">
          <div className="px-3 pb-2 text-[11px] font-bold text-gray-400 tracking-wider uppercase">
            Website Section Managers
          </div>

          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.path}
                to={item.path}
                onClick={onClose}
                className={({ isActive }) =>
                  `flex items-center justify-between px-4 py-3 rounded-2xl text-sm font-medium transition-all duration-200 group ${
                    isActive
                      ? "bg-yellow-500 text-black font-bold shadow-lg shadow-yellow-500/20"
                      : "text-gray-300 hover:bg-[#13233d] hover:text-white"
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    <div className="flex items-center gap-3">
                      <Icon
                        size={18}
                        className={
                          isActive
                            ? "text-black"
                            : "text-yellow-500 group-hover:scale-110 transition-transform"
                        }
                      />
                      <span>{item.label}</span>
                    </div>
                    {item.badge && (
                      <span
                        className={`text-[10px] px-2 py-0.5 rounded-full font-semibold ${
                          isActive
                            ? "bg-black/20 text-black"
                            : "bg-[#13233d] text-yellow-400 border border-yellow-700/30"
                        }`}
                      >
                        {item.badge}
                      </span>
                    )}
                  </>
                )}
              </NavLink>
            );
          })}
        </div>

        {/* Footer / Live Website Link */}
        <div className="p-4 border-t border-yellow-700/20 bg-[#071322]">
          <a
            href="http://localhost:5173"
            target="_blank"
            rel="noreferrer"
            className="w-full flex items-center justify-center gap-2 bg-[#13233d] hover:bg-yellow-600 hover:text-black text-yellow-400 border border-yellow-700/40 px-4 py-2.5 rounded-xl text-xs font-semibold transition-all duration-200 group shadow"
          >
            <span>Open Live Website</span>
            <ExternalLink size={14} className="group-hover:translate-x-0.5 transition-transform" />
          </a>
        </div>
      </aside>
    </>
  );
};
