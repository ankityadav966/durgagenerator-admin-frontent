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
    <div className="space-y-6 pb-12">
      <SectionHeader
        title="Why Choose Us / Features"
        description="Core service highlights and strengths shown on the website."
        websiteRoute="/"
        onSave={handleSave}
      />

      <div className="grid md:grid-cols-2 gap-6">
        {features.map((feat, idx) => (
          <div
            key={feat.id || idx}
            className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm space-y-4"
          >
            <div className="flex items-center justify-between pb-3 border-b border-gray-200">
              <div className="flex items-center gap-2">
                <span className="w-6 h-6 rounded-md bg-amber-100 text-amber-800 font-bold flex items-center justify-center text-xs">
                  #{idx + 1}
                </span>
                <h3 className="font-bold text-gray-900 text-sm">
                  {feat.title || "Feature Item"}
                </h3>
              </div>

              <button
                type="button"
                onClick={() => handleDeleteFeature(idx)}
                className="p-1 rounded-lg text-gray-400 hover:text-red-600 hover:bg-red-50 transition-colors"
                title="Delete feature"
              >
                <Trash2 size={14} />
              </button>
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-2">
                Choose Icon
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
                      className={`p-2 rounded-lg border flex flex-col items-center gap-1 transition-colors cursor-pointer ${
                        isSelected
                          ? "bg-amber-50 border-amber-500 text-amber-800 font-semibold"
                          : "bg-gray-50 border-gray-200 text-gray-600 hover:bg-gray-100"
                      }`}
                    >
                      <IconComp size={16} />
                      <span className="text-[10px] truncate max-w-full">{item.name}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1">
                Feature Title
              </label>
              <input
                type="text"
                value={feat.title || ""}
                onChange={(e) => handleFeatureChange(idx, "title", e.target.value)}
                placeholder="24/7 Support"
                className="w-full bg-white border border-gray-300 rounded-lg px-3 py-2 text-xs text-gray-900 focus:border-amber-600 outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1">
                Description
              </label>
              <textarea
                rows="2"
                value={feat.desc || ""}
                onChange={(e) => handleFeatureChange(idx, "desc", e.target.value)}
                placeholder="Round the clock technical assistance..."
                className="w-full bg-white border border-gray-300 rounded-lg px-3 py-2 text-xs text-gray-900 focus:border-amber-600 outline-none resize-none"
              />
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-center pt-2">
        <button
          type="button"
          onClick={handleAddFeature}
          className="px-4 py-2 rounded-lg bg-white hover:bg-gray-50 text-gray-700 border border-gray-300 font-medium text-xs flex items-center gap-1.5 cursor-pointer shadow-sm"
        >
          <Plus size={14} />
          <span>Add Feature</span>
        </button>
      </div>
    </div>
  );
};
