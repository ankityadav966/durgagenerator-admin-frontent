import { useState, useEffect } from "react";
import { useContent } from "../context/ContentContext";
import { SectionHeader } from "../components/SectionHeader";
import { ImageUploadField } from "../components/ImageUploadField";
import { Plus, Trash2 } from "lucide-react";

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
    <div className="space-y-6 pb-12">
      <SectionHeader
        title="About Us Page & Statistics"
        description="Company story, mission, vision, and experience stats."
        websiteRoute="/about"
        onSave={handleSave}
      />

      {/* Hero Header Area */}
      <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm space-y-4">
        <h3 className="font-bold text-sm text-gray-900 pb-2 border-b border-gray-200">
          About Page Header
        </h3>

        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1">
              Subtitle Pill Text
            </label>
            <input
              type="text"
              value={aboutData.heroSubtitle || ""}
              onChange={(e) => handleFieldChange("heroSubtitle", e.target.value)}
              className="w-full bg-white border border-gray-300 rounded-lg px-3 py-2 text-xs text-gray-900 focus:border-amber-600 outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1">
              Header Title
            </label>
            <input
              type="text"
              value={aboutData.heroTitle || ""}
              onChange={(e) => handleFieldChange("heroTitle", e.target.value)}
              className="w-full bg-white border border-gray-300 rounded-lg px-3 py-2 text-xs text-gray-900 font-semibold focus:border-amber-600 outline-none"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1">
            Introductory Summary
          </label>
          <textarea
            rows="2"
            value={aboutData.heroDescription || ""}
            onChange={(e) => handleFieldChange("heroDescription", e.target.value)}
            className="w-full bg-white border border-gray-300 rounded-lg px-3 py-2 text-xs text-gray-900 focus:border-amber-600 outline-none resize-none"
          />
        </div>
      </div>

      {/* Story & Cover Image */}
      <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm space-y-4">
        <h3 className="font-bold text-sm text-gray-900 pb-2 border-b border-gray-200">
          Company Story & Photo
        </h3>

        <div className="grid lg:grid-cols-12 gap-6">
          <div className="lg:col-span-7 space-y-4">
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1">
                  Story Badge
                </label>
                <input
                  type="text"
                  value={aboutData.storyBadge || ""}
                  onChange={(e) => handleFieldChange("storyBadge", e.target.value)}
                  className="w-full bg-white border border-gray-300 rounded-lg px-3 py-2 text-xs text-gray-900 focus:border-amber-600 outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1">
                  Story Title
                </label>
                <input
                  type="text"
                  value={aboutData.storyTitle || ""}
                  onChange={(e) => handleFieldChange("storyTitle", e.target.value)}
                  className="w-full bg-white border border-gray-300 rounded-lg px-3 py-2 text-xs text-gray-900 font-semibold focus:border-amber-600 outline-none"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  Story Paragraphs
                </label>
                <button
                  type="button"
                  onClick={handleAddParagraph}
                  className="text-xs text-amber-700 hover:text-amber-800 font-medium flex items-center gap-1 cursor-pointer"
                >
                  <Plus size={13} /> Add Paragraph
                </button>
              </div>

              <div className="space-y-2.5">
                {(aboutData.storyParagraphs || []).map((para, pIdx) => (
                  <div key={pIdx} className="flex items-start gap-2">
                    <textarea
                      rows="2"
                      value={para}
                      onChange={(e) => handleParagraphChange(pIdx, e.target.value)}
                      className="w-full bg-white border border-gray-300 rounded-lg p-2.5 text-xs text-gray-900 focus:border-amber-600 outline-none resize-none"
                    />
                    <button
                      type="button"
                      onClick={() => handleDeleteParagraph(pIdx)}
                      className="p-1.5 rounded-lg text-gray-400 hover:text-red-600 hover:bg-red-50 mt-0.5"
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
              label="Story Cover Photo"
              value={aboutData.storyImage || ""}
              onChange={(newUrl) => handleFieldChange("storyImage", newUrl)}
              helperText="Upload or choose photo for About page."
              aspect="cover"
            />
          </div>
        </div>
      </div>

      {/* Mission & Vision */}
      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm space-y-2">
          <h3 className="font-bold text-sm text-gray-900">Our Mission</h3>
          <textarea
            rows="3"
            value={aboutData.mission || ""}
            onChange={(e) => handleFieldChange("mission", e.target.value)}
            className="w-full bg-white border border-gray-300 rounded-lg p-3 text-xs text-gray-900 focus:border-amber-600 outline-none resize-none"
          />
        </div>

        <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm space-y-2">
          <h3 className="font-bold text-sm text-gray-900">Our Vision</h3>
          <textarea
            rows="3"
            value={aboutData.vision || ""}
            onChange={(e) => handleFieldChange("vision", e.target.value)}
            className="w-full bg-white border border-gray-300 rounded-lg p-3 text-xs text-gray-900 focus:border-amber-600 outline-none resize-none"
          />
        </div>
      </div>

      {/* Stats Counters */}
      <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm space-y-4">
        <h3 className="font-bold text-sm text-gray-900 pb-2 border-b border-gray-200">
          Achievement Counters
        </h3>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {(aboutData.stats || []).map((stat, sIdx) => (
            <div key={sIdx} className="bg-gray-50 p-3.5 rounded-lg border border-gray-200 space-y-2">
              <div>
                <label className="block text-[10px] font-semibold text-gray-600 uppercase tracking-wider mb-1">
                  Number / Counter
                </label>
                <input
                  type="text"
                  value={stat.number || ""}
                  onChange={(e) => handleStatChange(sIdx, "number", e.target.value)}
                  placeholder="500+"
                  className="w-full bg-white border border-gray-300 rounded-md px-2.5 py-1.5 text-xs text-amber-800 font-bold focus:border-amber-600 outline-none"
                />
              </div>

              <div>
                <label className="block text-[10px] font-semibold text-gray-600 uppercase tracking-wider mb-1">
                  Label
                </label>
                <input
                  type="text"
                  value={stat.label || ""}
                  onChange={(e) => handleStatChange(sIdx, "label", e.target.value)}
                  placeholder="Generators Available"
                  className="w-full bg-white border border-gray-300 rounded-md px-2.5 py-1.5 text-xs text-gray-900 focus:border-amber-600 outline-none"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
