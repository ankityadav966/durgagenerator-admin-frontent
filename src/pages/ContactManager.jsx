import { useState, useEffect } from "react";
import { useContent } from "../context/ContentContext";
import { SectionHeader } from "../components/SectionHeader";
import { Phone, Mail, MapPin, MessageSquare, Globe, Clock, Share2 } from "lucide-react";

export const ContactManager = () => {
  const { content, updateSection } = useContent();
  const [settings, setSettings] = useState({
    siteName: "Durga Generators",
    tagline: "",
    primaryPhone: "+918854954525",
    primaryEmail: "vinayvssaini45254525@gmail.com",
    address: "",
    whatsappNumber: "918854954525",
    workingHours: "24/7 Available",
    mapEmbedUrl: "",
    socialLinks: {
      facebook: "",
      instagram: "",
      youtube: "",
      twitter: ""
    }
  });

  useEffect(() => {
    if (content?.siteSettings) {
      setSettings(JSON.parse(JSON.stringify(content.siteSettings)));
    }
  }, [content]);

  const handleChange = (field, value) => {
    setSettings({ ...settings, [field]: value });
  };

  const handleSocialChange = (network, value) => {
    setSettings({
      ...settings,
      socialLinks: {
        ...(settings.socialLinks || {}),
        [network]: value
      }
    });
  };

  const handleSave = async () => {
    await updateSection("siteSettings", settings);
  };

  return (
    <div className="space-y-8 pb-12">
      <SectionHeader
        badge="CONTACT & COMPANY PROFILE"
        title="Contact Info, Location & Social Links"
        description="Update official contact phone numbers, WhatsApp click-to-chat, support email, physical office address in Jaipur, Google Maps embed link, and social profiles. These sync across the Header, Footer, and Contact Page."
        websiteRoute="/contact"
        onSave={handleSave}
      />

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Contact Numbers & Channels */}
        <div className="bg-[#0c1a2d] border border-yellow-700/30 rounded-3xl p-6 lg:p-8 shadow-xl space-y-5">
          <h3 className="font-serif font-bold text-lg text-white pb-3 border-b border-yellow-900/30 flex items-center gap-2">
            <Phone className="text-yellow-500" size={18} />
            <span>Direct Communication Channels</span>
          </h3>

          <div>
            <label className="block text-xs font-semibold text-yellow-500 uppercase tracking-wider mb-1.5">
              Primary Calling Phone Number
            </label>
            <input
              type="text"
              value={settings.primaryPhone || ""}
              onChange={(e) => handleChange("primaryPhone", e.target.value)}
              placeholder="+91 8854954525"
              className="w-full bg-[#07162b] border border-yellow-900/40 rounded-xl px-4 py-2.5 text-xs text-white focus:border-yellow-500 outline-none font-mono"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-yellow-500 uppercase tracking-wider mb-1.5">
              WhatsApp Number (with country code, no + or spaces)
            </label>
            <input
              type="text"
              value={settings.whatsappNumber || ""}
              onChange={(e) => handleChange("whatsappNumber", e.target.value)}
              placeholder="918854954525"
              className="w-full bg-[#07162b] border border-yellow-900/40 rounded-xl px-4 py-2.5 text-xs text-white focus:border-yellow-500 outline-none font-mono"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-yellow-500 uppercase tracking-wider mb-1.5">
              Support Email Address
            </label>
            <input
              type="email"
              value={settings.primaryEmail || ""}
              onChange={(e) => handleChange("primaryEmail", e.target.value)}
              placeholder="vinayvssaini45254525@gmail.com"
              className="w-full bg-[#07162b] border border-yellow-900/40 rounded-xl px-4 py-2.5 text-xs text-white focus:border-yellow-500 outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-300 uppercase tracking-wider mb-1.5">
              Working / Operating Hours
            </label>
            <input
              type="text"
              value={settings.workingHours || ""}
              onChange={(e) => handleChange("workingHours", e.target.value)}
              placeholder="24/7 Available (Monday - Sunday)"
              className="w-full bg-[#07162b] border border-yellow-900/40 rounded-xl px-4 py-2.5 text-xs text-white focus:border-yellow-500 outline-none"
            />
          </div>
        </div>

        {/* Location & Map */}
        <div className="bg-[#0c1a2d] border border-yellow-700/30 rounded-3xl p-6 lg:p-8 shadow-xl space-y-5">
          <h3 className="font-serif font-bold text-lg text-white pb-3 border-b border-yellow-900/30 flex items-center gap-2">
            <MapPin className="text-yellow-500" size={18} />
            <span>Office Location & Google Map</span>
          </h3>

          <div>
            <label className="block text-xs font-semibold text-yellow-500 uppercase tracking-wider mb-1.5">
              Physical Office Address
            </label>
            <textarea
              rows="3"
              value={settings.address || ""}
              onChange={(e) => handleChange("address", e.target.value)}
              placeholder="Govind Nagar, Plot No. 64, Harmada, Jaipur..."
              className="w-full bg-[#07162b] border border-yellow-900/40 rounded-xl p-3 text-xs text-white focus:border-yellow-500 outline-none resize-none"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-300 uppercase tracking-wider mb-1.5">
              Google Maps Embed URL
            </label>
            <input
              type="text"
              value={settings.mapEmbedUrl || ""}
              onChange={(e) => handleChange("mapEmbedUrl", e.target.value)}
              placeholder="https://maps.google.com/maps?q=Harmada%20Jaipur..."
              className="w-full bg-[#07162b] border border-yellow-900/40 rounded-xl px-4 py-2.5 text-xs text-white focus:border-yellow-500 outline-none font-mono text-[11px]"
            />
            <p className="text-[11px] text-gray-500 mt-1 italic">
              Paste the 'src' link from Google Maps embed code.
            </p>
          </div>
        </div>
      </div>

      {/* Social Media Links */}
      <div className="bg-[#0c1a2d] border border-yellow-700/30 rounded-3xl p-6 lg:p-8 shadow-xl space-y-5">
        <h3 className="font-serif font-bold text-lg text-white pb-3 border-b border-yellow-900/30 flex items-center gap-2">
          <Share2 className="text-yellow-500" size={18} />
          <span>Social Media Profiles</span>
        </h3>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div>
            <label className="block text-xs font-semibold text-gray-300 uppercase tracking-wider mb-1.5">
              Facebook URL
            </label>
            <input
              type="text"
              value={settings.socialLinks?.facebook || ""}
              onChange={(e) => handleSocialChange("facebook", e.target.value)}
              placeholder="https://facebook.com/..."
              className="w-full bg-[#07162b] border border-yellow-900/40 rounded-xl px-3 py-2 text-xs text-white focus:border-yellow-500 outline-none font-mono"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-300 uppercase tracking-wider mb-1.5">
              Instagram URL
            </label>
            <input
              type="text"
              value={settings.socialLinks?.instagram || ""}
              onChange={(e) => handleSocialChange("instagram", e.target.value)}
              placeholder="https://instagram.com/..."
              className="w-full bg-[#07162b] border border-yellow-900/40 rounded-xl px-3 py-2 text-xs text-white focus:border-yellow-500 outline-none font-mono"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-300 uppercase tracking-wider mb-1.5">
              YouTube Channel
            </label>
            <input
              type="text"
              value={settings.socialLinks?.youtube || ""}
              onChange={(e) => handleSocialChange("youtube", e.target.value)}
              placeholder="https://youtube.com/..."
              className="w-full bg-[#07162b] border border-yellow-900/40 rounded-xl px-3 py-2 text-xs text-white focus:border-yellow-500 outline-none font-mono"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-300 uppercase tracking-wider mb-1.5">
              Twitter / X URL
            </label>
            <input
              type="text"
              value={settings.socialLinks?.twitter || ""}
              onChange={(e) => handleSocialChange("twitter", e.target.value)}
              placeholder="https://x.com/..."
              className="w-full bg-[#07162b] border border-yellow-900/40 rounded-xl px-3 py-2 text-xs text-white focus:border-yellow-500 outline-none font-mono"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
