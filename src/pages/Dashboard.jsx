import { Link } from "react-router-dom";
import { useContent } from "../context/ContentContext";
import {
  Sparkles,
  Zap,
  Star,
  Quote,
  Building2,
  ListOrdered,
  HelpCircle,
  PhoneCall,
  ArrowRight,
  CheckCircle2,
  Layers,
  Flame,
  Image as ImageIcon
} from "lucide-react";

export const Dashboard = () => {
  const { content } = useContent();

  const sections = [
    {
      title: "Hero Banner & Carousel",
      path: "/hero",
      icon: Sparkles,
      count: `${content?.hero?.slides?.length || 3} Slides`,
      desc: "Manage homepage main slides, slogans, background titles, badges, and generator images.",
      badge: "Homepage Top",
      color: "from-amber-500/20 to-yellow-600/10",
      accent: "text-amber-400"
    },
    {
      title: "Generator Catalog & Pricing",
      path: "/generators",
      icon: Zap,
      count: `${content?.generators?.length || 8} Equipment Cards`,
      desc: "Update generator capacities (5kVA - 500kVA), rental prices per day/month, images, and fuel specs.",
      badge: "Core Products",
      color: "from-yellow-500/20 to-orange-600/10",
      accent: "text-yellow-400",
      highlight: true
    },
    {
      title: "Why Choose Us (Features)",
      path: "/features",
      icon: Star,
      count: `${content?.features?.length || 4} Feature Cards`,
      desc: "Highlight company strengths like 24/7 Support, Well Maintained generators, and Affordable Prices.",
      badge: "Trust Factors",
      color: "from-blue-500/20 to-indigo-600/10",
      accent: "text-blue-400"
    },
    {
      title: "Customer Reviews",
      path: "/testimonials",
      icon: Quote,
      count: `${content?.testimonials?.length || 3} Testimonials`,
      desc: "Manage client feedback, customer names, event/business designations, star ratings, and avatars.",
      badge: "Social Proof",
      color: "from-emerald-500/20 to-teal-600/10",
      accent: "text-emerald-400"
    },
    {
      title: "About Page & Live Stats",
      path: "/about",
      icon: Building2,
      count: `${content?.about?.stats?.length || 4} Stat Counters`,
      desc: "Company story, Mission, Vision, and numeric counters (500+ Generators, 1200+ Projects, 98% Satisfaction).",
      badge: "About Us",
      color: "from-purple-500/20 to-pink-600/10",
      accent: "text-purple-400"
    },
    {
      title: "How It Works & Rental Plans",
      path: "/how-it-works",
      icon: ListOrdered,
      count: `${content?.howItWorks?.steps?.length || 5} Process Steps`,
      desc: "5 easy rental steps (Choose -> Quote -> Delivery -> Install -> Support) and Daily/Weekly/Monthly plans.",
      badge: "Process",
      color: "from-cyan-500/20 to-sky-600/10",
      accent: "text-cyan-400"
    },
    {
      title: "FAQ Center",
      path: "/faq",
      icon: HelpCircle,
      count: `${content?.faqs?.length || 8} Q&A Items`,
      desc: "Frequently Asked Questions regarding generator delivery, fuel policies, emergency backup, and operator support.",
      badge: "Help & Support",
      color: "from-rose-500/20 to-red-600/10",
      accent: "text-rose-400"
    },
    {
      title: "Contact Info & Location",
      path: "/contact",
      icon: PhoneCall,
      count: "Phone, WhatsApp, Maps",
      desc: "Phone (+91 8854954525), WhatsApp quick chat, office address in Jaipur, Google Maps embed, social links.",
      badge: "Communication",
      color: "from-amber-600/20 to-yellow-700/10",
      accent: "text-yellow-500"
    }
  ];

  return (
    <div className="space-y-10">
      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-[#0f2440] via-[#132c4f] to-[#0a182b] border border-yellow-600/30 rounded-3xl p-8 lg:p-10 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-yellow-500/15 rounded-full blur-3xl pointer-events-none"></div>

        <div className="relative z-10">
          <div className="inline-flex items-center gap-2 bg-yellow-500/20 text-yellow-400 border border-yellow-500/30 px-3.5 py-1 rounded-full text-xs font-semibold uppercase tracking-wider mb-4">
            <Flame size={14} className="text-yellow-400" />
            <span>Master Content Management System</span>
          </div>

          <h1 className="text-3xl lg:text-5xl font-bold font-serif text-white tracking-tight">
            Durga Generator Rent <span className="text-yellow-400">Dashboard</span>
          </h1>

          <p className="text-gray-300 text-sm lg:text-base mt-3 max-w-3xl leading-relaxed italic">
            Select any section below to update live text content, generator rental prices, card specifications, and upload images. All changes immediately sync with the live website.
          </p>

          <div className="mt-6 flex flex-wrap items-center gap-4 text-xs">
            <div className="flex items-center gap-2 bg-[#07162b]/80 border border-yellow-700/30 px-4 py-2 rounded-xl text-gray-300">
              <CheckCircle2 size={16} className="text-green-400" />
              <span>Full Dynamic Control Active</span>
            </div>
            <div className="flex items-center gap-2 bg-[#07162b]/80 border border-yellow-700/30 px-4 py-2 rounded-xl text-gray-300">
              <ImageIcon size={16} className="text-yellow-400" />
              <span>Direct Image File Upload Supported</span>
            </div>
          </div>
        </div>
      </div>

      {/* Sections Grid */}
      <div>
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold font-serif text-white flex items-center gap-2">
              <Layers className="text-yellow-500" size={24} />
              <span>Website Sections to Edit</span>
            </h2>
            <p className="text-gray-400 text-xs mt-1">
              Click on any card to open its dedicated section editor.
            </p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-6">
          {sections.map((sec, idx) => {
            const Icon = sec.icon;
            return (
              <Link
                key={idx}
                to={sec.path}
                className={`bg-[#0d1d33] border rounded-3xl p-6 hover:shadow-2xl transition-all duration-300 hover:-translate-y-1.5 flex flex-col justify-between group relative overflow-hidden ${
                  sec.highlight
                    ? "border-yellow-500/50 shadow-[0_0_20px_rgba(234,179,8,0.15)] bg-gradient-to-b from-[#132845] to-[#0d1d33]"
                    : "border-yellow-900/20 hover:border-yellow-600/40"
                }`}
              >
                {/* Background Glow */}
                <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${sec.color} rounded-full blur-2xl group-hover:scale-150 transition-transform`}></div>

                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className={`p-3 rounded-2xl bg-[#07162b] border border-yellow-700/20 ${sec.accent}`}>
                      <Icon size={22} />
                    </div>
                    <span className="text-[10px] font-bold uppercase tracking-wider bg-[#07162b] px-3 py-1 rounded-full text-yellow-400 border border-yellow-700/30">
                      {sec.count}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold font-serif text-white group-hover:text-yellow-400 transition-colors">
                    {sec.title}
                  </h3>

                  <p className="text-gray-400 text-xs mt-2.5 line-clamp-3 leading-relaxed italic">
                    {sec.desc}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-yellow-900/30 flex items-center justify-between text-xs font-semibold text-yellow-500 group-hover:text-yellow-300">
                  <span>Edit Section</span>
                  <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
};
