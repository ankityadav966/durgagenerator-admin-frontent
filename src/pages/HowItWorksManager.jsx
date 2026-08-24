import { useState, useEffect } from "react";
import { useContent } from "../context/ContentContext";
import { SectionHeader } from "../components/SectionHeader";
import { ListOrdered, CheckCircle2 } from "lucide-react";

export const HowItWorksManager = () => {
  const { content, updateSection } = useContent();
  const [data, setData] = useState({
    heroSubtitle: "Simple Rental Process",
    heroTitle: "How It Works",
    heroDesc: "Renting a generator has never been easier...",
    steps: [],
    rentalPlans: []
  });

  useEffect(() => {
    if (content?.howItWorks) {
      setData(JSON.parse(JSON.stringify(content.howItWorks)));
    }
  }, [content]);

  const handleStepChange = (index, field, value) => {
    const updated = [...(data.steps || [])];
    updated[index][field] = value;
    setData({ ...data, steps: updated });
  };

  const handlePlanChange = (index, field, value) => {
    const updated = [...(data.rentalPlans || [])];
    updated[index][field] = value;
    setData({ ...data, rentalPlans: updated });
  };

  const handleSave = async () => {
    await updateSection("howItWorks", data);
  };

  return (
    <div className="space-y-8 pb-12">
      <SectionHeader
        badge="RENTAL PROCESS & PACKAGES"
        title="How It Works & Flexible Plans"
        description="Edit the 5-step rental workflow and the Daily, Weekly, and Monthly rental package descriptions on the /how-it-works page."
        websiteRoute="/how-it-works"
        onSave={handleSave}
      />

      {/* 5 Steps */}
      <div className="bg-[#0c1a2d] border border-yellow-700/30 rounded-3xl p-6 lg:p-8 shadow-xl space-y-6">
        <h3 className="font-serif font-bold text-lg text-white pb-3 border-b border-yellow-900/30 flex items-center gap-2">
          <ListOrdered className="text-yellow-500" size={20} />
          <span>1. The 5 Easy Steps</span>
        </h3>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {(data.steps || []).map((step, idx) => (
            <div key={idx} className="bg-[#07162b] p-5 rounded-2xl border border-yellow-900/40 space-y-3 relative">
              <div className="flex items-center gap-2">
                <span className="w-7 h-7 rounded-lg bg-yellow-500 text-black font-bold flex items-center justify-center text-xs">
                  {step.step || idx + 1}
                </span>
                <span className="text-xs font-semibold text-yellow-400">Step {idx + 1}</span>
              </div>

              <div>
                <label className="block text-[10px] font-semibold text-gray-400 uppercase tracking-wider mb-1">
                  Step Title
                </label>
                <input
                  type="text"
                  value={step.title || ""}
                  onChange={(e) => handleStepChange(idx, "title", e.target.value)}
                  className="w-full bg-[#0c1a2d] border border-yellow-700/30 rounded-lg px-3 py-2 text-xs text-white focus:border-yellow-400 outline-none font-bold"
                />
              </div>

              <div>
                <label className="block text-[10px] font-semibold text-gray-400 uppercase tracking-wider mb-1">
                  Description
                </label>
                <textarea
                  rows="2"
                  value={step.desc || ""}
                  onChange={(e) => handleStepChange(idx, "desc", e.target.value)}
                  className="w-full bg-[#0c1a2d] border border-yellow-700/30 rounded-lg p-2.5 text-xs text-white focus:border-yellow-400 outline-none resize-none italic"
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 3 Rental Plans */}
      <div className="bg-[#0c1a2d] border border-yellow-700/30 rounded-3xl p-6 lg:p-8 shadow-xl space-y-6">
        <h3 className="font-serif font-bold text-lg text-white pb-3 border-b border-yellow-900/30 flex items-center gap-2">
          <CheckCircle2 className="text-yellow-500" size={20} />
          <span>2. Flexible Rental Duration Plans</span>
        </h3>

        <div className="grid md:grid-cols-3 gap-6">
          {(data.rentalPlans || []).map((plan, pIdx) => (
            <div key={pIdx} className="bg-[#07162b] p-5 rounded-2xl border border-yellow-900/40 space-y-3">
              <div>
                <label className="block text-[10px] font-semibold text-yellow-500 uppercase tracking-wider mb-1">
                  Plan Name
                </label>
                <input
                  type="text"
                  value={plan.title || ""}
                  onChange={(e) => handlePlanChange(pIdx, "title", e.target.value)}
                  className="w-full bg-[#0c1a2d] border border-yellow-700/30 rounded-lg px-3 py-2 text-xs text-white focus:border-yellow-400 outline-none font-bold"
                />
              </div>

              <div>
                <label className="block text-[10px] font-semibold text-gray-400 uppercase tracking-wider mb-1">
                  Plan Description
                </label>
                <textarea
                  rows="3"
                  value={plan.desc || ""}
                  onChange={(e) => handlePlanChange(pIdx, "desc", e.target.value)}
                  className="w-full bg-[#0c1a2d] border border-yellow-700/30 rounded-lg p-2.5 text-xs text-white focus:border-yellow-400 outline-none resize-none italic"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
