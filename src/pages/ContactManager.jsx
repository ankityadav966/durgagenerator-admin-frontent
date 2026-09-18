import { useState, useEffect } from "react";
import { useContent } from "../context/ContentContext";
import { SectionHeader } from "../components/SectionHeader";
import { Phone, MapPin, Share2 } from "lucide-react";

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
    <div className="space-y-6 pb-12">
      <SectionHeader
        title="Contact Info & Company Details"
        description="Phone numbers, WhatsApp, email, Jaipur office address, and social links."
        websiteRoute="/contact"
        onSave={handleSave}
      />

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Contact Numbers */}
        <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm space-y-4">
          <h3 className="font-bold text-sm text-gray-900 pb-2 border-b border-gray-200">
            Direct Contact Information
          </h3>

          <div>
            <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1">
              Calling Phone Number
            </label>
            <input
              type="text"
              value={settings.primaryPhone || ""}
              onChange={(e) => handleChange("primaryPhone", e.target.value)}
              placeholder="+91 8854954525"
              className="w-full bg-white border border-gray-300 rounded-lg px-3 py-2 text-xs text-gray-900 focus:border-amber-600 outline-none font-mono"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1">
              WhatsApp Number (e.g. 918854954525)
            </label>
            <input
              type="text"
              value={settings.whatsappNumber || ""}
              onChange={(e) => handleChange("whatsappNumber", e.target.value)}
              placeholder="918854954525"
              className="w-full bg-white border border-gray-300 rounded-lg px-3 py-2 text-xs text-gray-900 focus:border-amber-600 outline-none font-mono"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1">
              Support Email
            </label>
            <input
              type="email"
              value={settings.primaryEmail || ""}
              onChange={(e) => handleChange("primaryEmail", e.target.value)}
              placeholder="vinayvssaini45254525@gmail.com"
              className="w-full bg-white border border-gray-300 rounded-lg px-3 py-2 text-xs text-gray-900 focus:border-amber-600 outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1">
              Operating Hours
            </label>
            <input
              type="text"
              value={settings.workingHours || ""}
              onChange={(e) => handleChange("workingHours", e.target.value)}
              placeholder="24/7 Available (Monday - Sunday)"
              className="w-full bg-white border border-gray-300 rounded-lg px-3 py-2 text-xs text-gray-900 focus:border-amber-600 outline-none"
            />
          </div>
        </div>

        {/* Location & Map */}
        <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm space-y-4">
          <h3 className="font-bold text-sm text-gray-900 pb-2 border-b border-gray-200">
            Office Location & Map
          </h3>

          <div>
            <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1">
              Office Address
            </label>
            <textarea
              rows="3"
              value={settings.address || ""}
              onChange={(e) => handleChange("address", e.target.value)}
              placeholder="Govind Nagar, Plot No. 64, Harmada, Jaipur..."
              className="w-full bg-white border border-gray-300 rounded-lg p-2.5 text-xs text-gray-900 focus:border-amber-600 outline-none resize-none"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1">
              Google Maps Embed URL
            </label>
            <input
              type="text"
              value={settings.mapEmbedUrl || ""}
              onChange={(e) => handleChange("mapEmbedUrl", e.target.value)}
              placeholder="https://maps.google.com/maps?..."
              className="w-full bg-white border border-gray-300 rounded-lg px-3 py-2 text-xs text-gray-900 focus:border-amber-600 outline-none font-mono text-[11px]"
            />
          </div>
        </div>
      </div>

      {/* Social Media Links */}
      <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm space-y-4">
        <h3 className="font-bold text-sm text-gray-900 pb-2 border-b border-gray-200">
          Social Media Links
        </h3>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div>
            <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1">
              Facebook
            </label>
            <input
              type="text"
              value={settings.socialLinks?.facebook || ""}
              onChange={(e) => handleSocialChange("facebook", e.target.value)}
              placeholder="https://facebook.com/..."
              className="w-full bg-white border border-gray-300 rounded-lg px-3 py-2 text-xs text-gray-900 focus:border-amber-600 outline-none font-mono"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1">
              Instagram
            </label>
            <input
              type="text"
              value={settings.socialLinks?.instagram || ""}
              onChange={(e) => handleSocialChange("instagram", e.target.value)}
              placeholder="https://instagram.com/..."
              className="w-full bg-white border border-gray-300 rounded-lg px-3 py-2 text-xs text-gray-900 focus:border-amber-600 outline-none font-mono"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1">
              YouTube
            </label>
            <input
              type="text"
              value={settings.socialLinks?.youtube || ""}
              onChange={(e) => handleSocialChange("youtube", e.target.value)}
              placeholder="https://youtube.com/..."
              className="w-full bg-white border border-gray-300 rounded-lg px-3 py-2 text-xs text-gray-900 focus:border-amber-600 outline-none font-mono"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1">
              Twitter / X
            </label>
            <input
              type="text"
              value={settings.socialLinks?.twitter || ""}
              onChange={(e) => handleSocialChange("twitter", e.target.value)}
              placeholder="https://x.com/..."
              className="w-full bg-white border border-gray-300 rounded-lg px-3 py-2 text-xs text-gray-900 focus:border-amber-600 outline-none font-mono"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
