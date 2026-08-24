import { useState, useEffect } from "react";
import { useContent } from "../context/ContentContext";
import { SectionHeader } from "../components/SectionHeader";
import { ImageUploadField } from "../components/ImageUploadField";
import { Plus, Trash2, Hash } from "lucide-react";

export const AboutManager = () => {
  const { content, updateSection } = useContent();
  const [aboutData, setAboutData] = useState({
    heroSubtitle: "About Generator Rent",
    heroTitle: "Powering Your Business, Events & Projects",
    heroDescription: "We provide reliable generator rental services...",
    storyBadge: "Our Story",
    storyTitle: "Trusted Generator Rental Partner",
    storyParagraphs: [],
    storyImage: "",
    mission: "",
    vision: "",
    stats: []
  });

  useEffect(() => {
    if (content?.about) {
      setAboutData(JSON.parse(JSON.stringify(content.about)));
    }
  }, [content]);

  const handleFieldChange = (field, value) => {
    setAboutData({ ...aboutData, [field]: value });
  };

  const handleParagraphChange = (index, value) => {
    const updated = [...(aboutData.storyParagraphs || [])];
    updated[index] = value;
    setAboutData({ ...aboutData, storyParagraphs: updated });
  };

  const handleAddParagraph = () => {
    setAboutData({
      ...aboutData,
      storyParagraphs: [...(aboutData.storyParagraphs || []), "New paragraph about our team and service commitment."]
    });
  };

  const handleDeleteParagraph = (index) => {
    const updated = (aboutData.storyParagraphs || []).filter((_, i) => i !== index);
    setAboutData({ ...aboutData, storyParagraphs: updated });
  };

  const handleStatChange = (index, field, value) => {
    const updated = [...(aboutData.stats || [])];
    updated[index][field] = value;
    setAboutData({ ...aboutData, stats: updated });
  };

  const handleSave = async () => {
    await updateSection("about", aboutData);
  };

  return (
    <div className="space-y-8 pb-12">
      <SectionHeader
        badge="ABOUT US PAGE & STATISTICS"
        title="About Story, Mission & Counter Stats"
        description="Update the company background, mission and vision statements, story cover image, and live achievement numbers (500+ Generators, 1200+ Projects completed, etc.)."
        websiteRoute="/about"
        onSave={handleSave}
      />

      {/* Hero Header Area */}
      <div className="bg-[#0c1a2d] border border-yellow-700/30 rounded-3xl p-6 lg:p-8 shadow-xl space-y-4">
        <h3 className="font-serif font-bold text-lg text-white pb-3 border-b border-yellow-900/30">
          1. About Page Top Header
        </h3>

        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-yellow-500 uppercase tracking-wider mb-1.5">
              Subtitle Pill Text
            </label>
            <input
              type="text"
              value={aboutData.heroSubtitle || ""}
              onChange={(e) => handleFieldChange("heroSubtitle", e.target.value)}
              className="w-full bg-[#07162b] border border-yellow-900/40 rounded-xl px-3.5 py-2.5 text-xs text-white focus:border-yellow-500 outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-yellow-500 uppercase tracking-wider mb-1.5">
              Main Header Title
            </label>
            <input
              type="text"
              value={aboutData.heroTitle || ""}
              onChange={(e) => handleFieldChange("heroTitle", e.target.value)}
              className="w-full bg-[#07162b] border border-yellow-900/40 rounded-xl px-3.5 py-2.5 text-xs text-white focus:border-yellow-500 outline-none font-serif font-bold"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold text-gray-300 uppercase tracking-wider mb-1.5">
            Introductory Summary
          </label>
          <textarea
            rows="2"
            value={aboutData.heroDescription || ""}
            onChange={(e) => handleFieldChange("heroDescription", e.target.value)}
            className="w-full bg-[#07162b] border border-yellow-900/40 rounded-xl px-3.5 py-2 text-xs text-white focus:border-yellow-500 outline-none resize-none italic"
          />
        </div>
      </div>

      {/* Story & Cover Image */}
      <div className="bg-[#0c1a2d] border border-yellow-700/30 rounded-3xl p-6 lg:p-8 shadow-xl space-y-6">
        <h3 className="font-serif font-bold text-lg text-white pb-3 border-b border-yellow-900/30">
          2. Company Story & Cover Photo
        </h3>

        <div className="grid lg:grid-cols-12 gap-8">
          <div className="lg:col-span-7 space-y-4">
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-yellow-500 uppercase tracking-wider mb-1.5">
                  Story Badge
                </label>
                <input
                  type="text"
                  value={aboutData.storyBadge || ""}
                  onChange={(e) => handleFieldChange("storyBadge", e.target.value)}
                  className="w-full bg-[#07162b] border border-yellow-900/40 rounded-xl px-3.5 py-2.5 text-xs text-white focus:border-yellow-500 outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-yellow-500 uppercase tracking-wider mb-1.5">
                  Story Headline
                </label>
                <input
                  type="text"
                  value={aboutData.storyTitle || ""}
                  onChange={(e) => handleFieldChange("storyTitle", e.target.value)}
                  className="w-full bg-[#07162b] border border-yellow-900/40 rounded-xl px-3.5 py-2.5 text-xs text-white focus:border-yellow-500 outline-none font-bold"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-xs font-semibold text-gray-300 uppercase tracking-wider">
                  Story Paragraphs
                </label>
                <button
                  type="button"
                  onClick={handleAddParagraph}
                  className="text-xs text-yellow-400 hover:text-yellow-300 flex items-center gap-1 font-semibold"
                >
                  <Plus size={14} /> Add Paragraph
                </button>
              </div>

              <div className="space-y-3">
                {(aboutData.storyParagraphs || []).map((para, pIdx) => (
                  <div key={pIdx} className="flex items-start gap-2">
                    <textarea
                      rows="3"
                      value={para}
                      onChange={(e) => handleParagraphChange(pIdx, e.target.value)}
                      className="w-full bg-[#07162b] border border-yellow-900/40 rounded-xl p-3 text-xs text-white focus:border-yellow-500 outline-none resize-none italic"
                    />
                    <button
                      type="button"
                      onClick={() => handleDeleteParagraph(pIdx)}
                      className="p-2 rounded-lg bg-red-950/60 hover:bg-red-900 text-red-300 border border-red-800/40 mt-1"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="lg:col-span-5">
            <ImageUploadField
              label="About Story Cover Image"
              value={aboutData.storyImage || ""}
              onChange={(newUrl) => handleFieldChange("storyImage", newUrl)}
              helperText="Upload an industrial generator site photo or event setup image."
              aspect="cover"
            />
          </div>
        </div>
      </div>

      {/* Mission & Vision */}
      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-[#0c1a2d] border border-yellow-700/30 rounded-3xl p-6 shadow-xl space-y-3">
          <h3 className="font-serif font-bold text-lg text-white">Our Mission</h3>
          <textarea
            rows="4"
            value={aboutData.mission || ""}
            onChange={(e) => handleFieldChange("mission", e.target.value)}
            className="w-full bg-[#07162b] border border-yellow-900/40 rounded-xl p-3.5 text-xs text-white focus:border-yellow-500 outline-none resize-none italic"
          />
        </div>

        <div className="bg-[#0c1a2d] border border-yellow-700/30 rounded-3xl p-6 shadow-xl space-y-3">
          <h3 className="font-serif font-bold text-lg text-white">Our Vision</h3>
          <textarea
            rows="4"
            value={aboutData.vision || ""}
            onChange={(e) => handleFieldChange("vision", e.target.value)}
            className="w-full bg-[#07162b] border border-yellow-900/40 rounded-xl p-3.5 text-xs text-white focus:border-yellow-500 outline-none resize-none italic"
          />
        </div>
      </div>

      {/* Stats Counters */}
      <div className="bg-[#0c1a2d] border border-yellow-700/30 rounded-3xl p-6 lg:p-8 shadow-xl space-y-4">
        <h3 className="font-serif font-bold text-lg text-white pb-3 border-b border-yellow-900/30 flex items-center gap-2">
          <Hash className="text-yellow-500" size={20} />
          <span>3. Live Stats Counters</span>
        </h3>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {(aboutData.stats || []).map((stat, sIdx) => (
            <div key={sIdx} className="bg-[#07162b] p-4 rounded-2xl border border-yellow-900/40 space-y-2">
              <div>
                <label className="block text-[10px] font-semibold text-yellow-500 uppercase tracking-wider mb-1">
                  Counter Value
                </label>
                <input
                  type="text"
                  value={stat.number || ""}
                  onChange={(e) => handleStatChange(sIdx, "number", e.target.value)}
                  placeholder="500+"
                  className="w-full bg-[#0c1a2d] border border-yellow-700/30 rounded-lg px-3 py-2 text-sm text-yellow-300 font-bold focus:border-yellow-400 outline-none font-mono"
                />
              </div>

              <div>
                <label className="block text-[10px] font-semibold text-gray-400 uppercase tracking-wider mb-1">
                  Label / Description
                </label>
                <input
                  type="text"
                  value={stat.label || ""}
                  onChange={(e) => handleStatChange(sIdx, "label", e.target.value)}
                  placeholder="Generators Available"
                  className="w-full bg-[#0c1a2d] border border-yellow-700/30 rounded-lg px-3 py-2 text-xs text-white focus:border-yellow-400 outline-none"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
