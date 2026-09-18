import { Link } from "react-router-dom";
import { useContent } from "../context/ContentContext";
import {
  Image,
  Zap,
  CheckCircle,
  MessageSquare,
  Info,
  ListOrdered,
  HelpCircle,
  Phone,
  Settings,
  ArrowRight,
  ExternalLink
} from "lucide-react";

export const Dashboard = () => {
  const { content } = useContent();

  const generators = content?.generators || [];
  const heroSlides = content?.hero?.slides || [];
  const testimonials = content?.testimonials || [];
  const faqs = content?.faqs || [];

  const sections = [
    {
      title: "Hero Banner",
      path: "/hero",
      icon: Image,
      count: `${heroSlides.length} Slides`,
      desc: "Homepage top slider images, headings, and call-to-action buttons."
    },
    {
      title: "Generators & Pricing",
      path: "/generators",
      icon: Zap,
      count: `${generators.length} Generators`,
      desc: "Generator models (5kVA to 500kVA), rental prices, photos, and specs."
    },
    {
      title: "Why Choose Us",
      path: "/features",
      icon: CheckCircle,
      count: `${content?.features?.length || 4} Features`,
      desc: "Service highlights, advantages, and trust points."
    },
    {
      title: "Customer Reviews",
      path: "/testimonials",
      icon: MessageSquare,
      count: `${testimonials.length} Reviews`,
      desc: "Client testimonials, names, ratings, and customer photos."
    },
    {
      title: "About Us",
      path: "/about",
      icon: Info,
      count: `${content?.about?.stats?.length || 4} Stats`,
      desc: "Company story, mission, vision, and experience stats."
    },
    {
      title: "How It Works",
      path: "/how-it-works",
      icon: ListOrdered,
      count: `${content?.howItWorks?.steps?.length || 5} Steps`,
      desc: "Rental process steps and daily/weekly rental plans."
    },
    {
      title: "FAQ",
      path: "/faq",
      icon: HelpCircle,
      count: `${faqs.length} Questions`,
      desc: "Frequently asked questions and answers."
    },
    {
      title: "Contact Info",
      path: "/contact",
      icon: Phone,
      count: "Contact Details",
      desc: "Phone numbers, WhatsApp, Jaipur address, and social links."
    },
    {
      title: "Settings",
      path: "/settings",
      icon: Settings,
      count: "Security",
      desc: "Change admin login username and password."
    }
  ];

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-gray-900">
            Dashboard
          </h1>
          <p className="text-gray-500 text-sm mt-1">
            Welcome to Durga Generator Admin Panel. Manage your website content and generator catalog.
          </p>
        </div>

        <a
          href="http://localhost:5173"
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-1.5 px-4 py-2 bg-amber-600 hover:bg-amber-700 text-white rounded-lg text-xs font-medium transition-colors shadow-sm w-fit"
        >
          <span>Open Website</span>
          <ExternalLink size={13} />
        </a>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm">
          <span className="text-xs font-medium text-gray-500">Generators in Catalog</span>
          <p className="text-2xl font-bold text-gray-900 mt-1">{generators.length}</p>
        </div>
        <div className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm">
          <span className="text-xs font-medium text-gray-500">Hero Slides</span>
          <p className="text-2xl font-bold text-gray-900 mt-1">{heroSlides.length}</p>
        </div>
        <div className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm">
          <span className="text-xs font-medium text-gray-500">Customer Reviews</span>
          <p className="text-2xl font-bold text-gray-900 mt-1">{testimonials.length}</p>
        </div>
        <div className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm">
          <span className="text-xs font-medium text-gray-500">FAQ Questions</span>
          <p className="text-2xl font-bold text-gray-900 mt-1">{faqs.length}</p>
        </div>
      </div>

      {/* Live Generators Preview Section with Real Images */}
      <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-base font-bold text-gray-900">
              Generators Catalog Preview
            </h2>
            <p className="text-xs text-gray-500">
              Live products showing on the website
            </p>
          </div>
          <Link
            to="/generators"
            className="text-xs font-medium text-amber-700 hover:text-amber-800 hover:underline inline-flex items-center gap-1"
          >
            <span>Manage All Generators</span>
            <ArrowRight size={13} />
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-4 gap-3">
          {generators.slice(0, 8).map((gen, idx) => (
            <div
              key={gen.id || idx}
              className="border border-gray-200 rounded-lg p-3 bg-gray-50 hover:bg-white hover:border-amber-400 transition-colors flex flex-col items-center text-center"
            >
              <div className="w-20 h-20 bg-white rounded-md border border-gray-200 p-1 flex items-center justify-center mb-2 overflow-hidden">
                <img
                  src={gen.image || "/assets/gen_5kva.png"}
                  alt={gen.name}
                  className="w-full h-full object-contain"
                  onError={(e) => {
                    e.currentTarget.src = "/assets/gen_5kva.png";
                  }}
                />
              </div>
              <p className="text-xs font-semibold text-gray-900 truncate w-full">
                {gen.name || gen.title}
              </p>
              <span className="text-[11px] text-amber-700 font-medium">
                {gen.price}
              </span>
              <span className="text-[10px] text-gray-500">
                {gen.capacity} • {gen.fuel || "Diesel"}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Website Sections Grid */}
      <div>
        <h2 className="text-base font-bold text-gray-900 mb-3">
          Edit Website Sections
        </h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {sections.map((sec, idx) => {
            const Icon = sec.icon;
            return (
              <Link
                key={idx}
                to={sec.path}
                className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm hover:border-amber-500 hover:shadow-md transition-all flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div className="w-9 h-9 rounded-lg bg-amber-50 text-amber-700 flex items-center justify-center border border-amber-200">
                      <Icon size={18} />
                    </div>
                    <span className="text-[11px] font-medium text-gray-500 bg-gray-100 px-2 py-0.5 rounded">
                      {sec.count}
                    </span>
                  </div>

                  <h3 className="text-sm font-bold text-gray-900 group-hover:text-amber-700 transition-colors">
                    {sec.title}
                  </h3>

                  <p className="text-xs text-gray-500 mt-1 leading-relaxed line-clamp-2">
                    {sec.desc}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-gray-100 flex items-center justify-between text-xs font-medium text-amber-700">
                  <span>Edit Section</span>
                  <ArrowRight size={13} className="group-hover:translate-x-0.5 transition-transform" />
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
};
