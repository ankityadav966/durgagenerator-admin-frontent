import { useState, useEffect } from "react";
import { useContent } from "../context/ContentContext";
import { SectionHeader } from "../components/SectionHeader";
import { Plus, Trash2, Briefcase, BadgeDollarSign, ShieldCheck, Headphones, Truck, Clock, Zap, Star } from "lucide-react";

const ICON_OPTIONS = [
  { name: "Briefcase", icon: Briefcase },
  { name: "BadgeDollarSign", icon: BadgeDollarSign },
  { name: "ShieldCheck", icon: ShieldCheck },
  { name: "Headphones", icon: Headphones },
  { name: "Truck", icon: Truck },
  { name: "Clock", icon: Clock },
  { name: "Zap", icon: Zap },
  { name: "Star", icon: Star },
];

export const FeaturesManager = () => {
  const { content, updateSection } = useContent();
  const [features, setFeatures] = useState([]);

  useEffect(() => {
    if (content?.features) {
      setFeatures(JSON.parse(JSON.stringify(content.features)));
    }
  }, [content]);

  const handleFeatureChange = (index, field, value) => {
    const updated = [...features];
    updated[index][field] = value;
    setFeatures(updated);
  };

  const handleAddFeature = () => {
    const newFeat = {
      id: `feat-${Date.now()}`,
      icon: "ShieldCheck",
      title: "Reliable Service",
      desc: "Top-tier reliability guaranteed for every generator installation."
    };
    setFeatures([...features, newFeat]);
  };

  const handleDeleteFeature = (index) => {
    if (features.length <= 1) {
      alert("At least one feature card is required.");
      return;
    }
    const updated = features.filter((_, i) => i !== index);
    setFeatures(updated);
  };

  const handleSave = async () => {
    await updateSection("features", features);
  };

  return (
    <div className="space-y-8 pb-12">
      <SectionHeader
        badge="HOMEPAGE TRUST HIGHLIGHTS"
        title="Why Choose Us / Features"
        description="Edit the 4 main strength badges displayed under the Hero section on the homepage and about page."
        websiteRoute="/"
        onSave={handleSave}
      />

      <div className="grid md:grid-cols-2 gap-6">
        {features.map((feat, idx) => (
          <div
            key={feat.id || idx}
            className="bg-[#0c1a2d] border border-yellow-700/30 rounded-3xl p-6 shadow-xl relative space-y-4"
          >
            <div className="flex items-center justify-between pb-3 border-b border-yellow-900/30">
              <div className="flex items-center gap-3">
                <span className="w-8 h-8 rounded-xl bg-yellow-500/20 text-yellow-400 font-bold flex items-center justify-center border border-yellow-500/30 text-xs">
                  #{idx + 1}
                </span>
                <h3 className="font-serif font-bold text-white text-base">
                  {feat.title || "Feature Item"}
                </h3>
              </div>

              <button
                type="button"
                onClick={() => handleDeleteFeature(idx)}
                className="p-1.5 rounded-lg bg-red-950/60 hover:bg-red-900 text-red-300 border border-red-800/40"
              >
                <Trash2 size={14} />
              </button>
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-300 uppercase tracking-wider mb-2">
                Icon Selector
              </label>
              <div className="grid grid-cols-4 gap-2">
                {ICON_OPTIONS.map((item) => {
                  const IconComp = item.icon;
                  const isSelected = feat.icon === item.name;
                  return (
                    <button
                      type="button"
                      key={item.name}
                      onClick={() => handleFeatureChange(idx, "icon", item.name)}
                      className={`p-2.5 rounded-xl border flex flex-col items-center gap-1 transition-all ${
                        isSelected
                          ? "bg-yellow-500/20 border-yellow-500 text-yellow-400 font-bold"
                          : "bg-[#07162b] border-yellow-900/30 text-gray-400 hover:text-white"
                      }`}
                    >
                      <IconComp size={18} />
                      <span className="text-[10px]">{item.name}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-yellow-500 uppercase tracking-wider mb-1.5">
                Feature Title
              </label>
              <input
                type="text"
                value={feat.title || ""}
                onChange={(e) => handleFeatureChange(idx, "title", e.target.value)}
                placeholder="24/7 Support"
                className="w-full bg-[#07162b] border border-yellow-900/40 rounded-xl px-3.5 py-2.5 text-xs text-white focus:border-yellow-500 outline-none font-medium"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-300 uppercase tracking-wider mb-1.5">
                Short Description
              </label>
              <textarea
                rows="2"
                value={feat.desc || ""}
                onChange={(e) => handleFeatureChange(idx, "desc", e.target.value)}
                placeholder="Round the clock technical assistance..."
                className="w-full bg-[#07162b] border border-yellow-900/40 rounded-xl px-3.5 py-2 text-xs text-white focus:border-yellow-500 outline-none resize-none italic"
              />
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-center pt-2">
        <button
          type="button"
          onClick={handleAddFeature}
          className="px-5 py-3 rounded-xl bg-[#0f2440] hover:bg-[#15345c] text-yellow-400 border border-dashed border-yellow-600/40 font-bold text-xs flex items-center gap-2 cursor-pointer shadow"
        >
          <Plus size={16} />
          <span>Add Another Feature Card</span>
        </button>
      </div>
    </div>
  );
};
