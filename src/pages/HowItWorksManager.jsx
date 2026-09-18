import { useState, useEffect } from "react";
import { useContent } from "../context/ContentContext";
import { SectionHeader } from "../components/SectionHeader";

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
    <div className="space-y-6 pb-12">
      <SectionHeader
        title="How It Works & Rental Plans"
        description="Rental workflow steps and package plans."
        websiteRoute="/how-it-works"
        onSave={handleSave}
      />

      {/* 5 Steps */}
      <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm space-y-4">
        <h3 className="font-bold text-sm text-gray-900 pb-2 border-b border-gray-200">
          Rental Process Steps
        </h3>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {(data.steps || []).map((step, idx) => (
            <div key={idx} className="bg-gray-50 p-4 rounded-lg border border-gray-200 space-y-2.5">
              <div className="flex items-center gap-2">
                <span className="w-6 h-6 rounded-md bg-amber-600 text-white font-bold flex items-center justify-center text-xs">
                  {step.step || idx + 1}
                </span>
                <span className="text-xs font-semibold text-gray-800">Step {idx + 1}</span>
              </div>

              <div>
                <label className="block text-[10px] font-semibold text-gray-600 uppercase tracking-wider mb-1">
                  Step Title
                </label>
                <input
                  type="text"
                  value={step.title || ""}
                  onChange={(e) => handleStepChange(idx, "title", e.target.value)}
                  className="w-full bg-white border border-gray-300 rounded-md px-2.5 py-1.5 text-xs text-gray-900 font-medium focus:border-amber-600 outline-none"
                />
              </div>

              <div>
                <label className="block text-[10px] font-semibold text-gray-600 uppercase tracking-wider mb-1">
                  Description
                </label>
                <textarea
                  rows="2"
                  value={step.desc || ""}
                  onChange={(e) => handleStepChange(idx, "desc", e.target.value)}
                  className="w-full bg-white border border-gray-300 rounded-md p-2 text-xs text-gray-900 focus:border-amber-600 outline-none resize-none"
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Rental Plans */}
      <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm space-y-4">
        <h3 className="font-bold text-sm text-gray-900 pb-2 border-b border-gray-200">
          Rental Duration Plans
        </h3>

        <div className="grid md:grid-cols-3 gap-4">
          {(data.rentalPlans || []).map((plan, idx) => (
            <div key={idx} className="bg-gray-50 p-4 rounded-lg border border-gray-200 space-y-2.5">
              <div>
                <label className="block text-[10px] font-semibold text-gray-600 uppercase tracking-wider mb-1">
                  Plan Title
                </label>
                <input
                  type="text"
                  value={plan.title || ""}
                  onChange={(e) => handlePlanChange(idx, "title", e.target.value)}
                  className="w-full bg-white border border-gray-300 rounded-md px-2.5 py-1.5 text-xs text-gray-900 font-semibold focus:border-amber-600 outline-none"
                />
              </div>

              <div>
                <label className="block text-[10px] font-semibold text-gray-600 uppercase tracking-wider mb-1">
                  Plan Details
                </label>
                <textarea
                  rows="3"
                  value={plan.desc || ""}
                  onChange={(e) => handlePlanChange(idx, "desc", e.target.value)}
                  className="w-full bg-white border border-gray-300 rounded-md p-2 text-xs text-gray-900 focus:border-amber-600 outline-none resize-none"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
