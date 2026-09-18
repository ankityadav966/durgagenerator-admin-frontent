import { useState, useEffect } from "react";
import { useContent } from "../context/ContentContext";
import { SectionHeader } from "../components/SectionHeader";
import { ImageUploadField } from "../components/ImageUploadField";
import { Plus, Trash2 } from "lucide-react";

export const HeroManager = () => {
  const { content, updateSection } = useContent();
  const [heroData, setHeroData] = useState({
    sectionTitle: "Hero Section",
    slides: []
  });

  useEffect(() => {
    if (content?.hero) {
      setHeroData(JSON.parse(JSON.stringify(content.hero)));
    }
  }, [content]);

  const handleSlideChange = (index, field, value) => {
    const updated = [...heroData.slides];
    updated[index][field] = value;
    setHeroData({ ...heroData, slides: updated });
  };

  const handleAddSlide = () => {
    const newSlide = {
      id: `hero-${Date.now()}`,
      badge: "⚡ POWER SOLUTION",
      title: "Powerful Generator Rental",
      desc: "Instant and dependable power backup solution tailored to your exact requirement in Jaipur.",
      image: "/assets/gen_62kva.png",
      buttonText: "Book Now",
      buttonLink: "tel:+918854954525",
      secondaryButtonText: "View Generators",
      secondaryButtonLink: "/generators"
    };
    setHeroData({
      ...heroData,
      slides: [...heroData.slides, newSlide]
    });
  };

  const handleDeleteSlide = (index) => {
    if (heroData.slides.length <= 1) {
      alert("At least one slide is required.");
      return;
    }
    if (window.confirm("Are you sure you want to delete this slide?")) {
      const updated = heroData.slides.filter((_, i) => i !== index);
      setHeroData({ ...heroData, slides: updated });
    }
  };

  const handleSave = async () => {
    await updateSection("hero", heroData);
  };

  return (
    <div className="space-y-6 pb-12">
      <SectionHeader
        title="Hero Banner Slider"
        description="Homepage top carousel slides, headings, and call-to-action buttons."
        websiteRoute="/"
        onSave={handleSave}
      />

      {/* Slide Items */}
      <div className="space-y-6">
        {heroData.slides.map((slide, idx) => (
          <div
            key={slide.id || idx}
            className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm"
          >
            {/* Header */}
            <div className="flex items-center justify-between pb-3 border-b border-gray-200 mb-4">
              <div className="flex items-center gap-2">
                <span className="w-6 h-6 rounded-md bg-amber-100 text-amber-800 font-bold flex items-center justify-center text-xs">
                  #{idx + 1}
                </span>
                <h3 className="font-bold text-sm text-gray-900">
                  {slide.title || `Slide ${idx + 1}`}
                </h3>
              </div>

              <button
                type="button"
                onClick={() => handleDeleteSlide(idx)}
                className="p-1.5 rounded-lg text-gray-400 hover:text-red-600 hover:bg-red-50 transition-colors text-xs flex items-center gap-1"
                title="Delete slide"
              >
                <Trash2 size={14} />
                <span>Delete</span>
              </button>
            </div>

            <div className="grid lg:grid-cols-12 gap-6">
              {/* Form inputs */}
              <div className="lg:col-span-7 space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1">
                    Top Badge / Tag
                  </label>
                  <input
                    type="text"
                    value={slide.badge || ""}
                    onChange={(e) => handleSlideChange(idx, "badge", e.target.value)}
                    placeholder="🏠 HOME POWER SOLUTION"
                    className="w-full bg-white border border-gray-300 rounded-lg px-3 py-2 text-xs text-gray-900 focus:border-amber-600 outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1">
                    Slide Heading (Title)
                  </label>
                  <input
                    type="text"
                    value={slide.title || ""}
                    onChange={(e) => handleSlideChange(idx, "title", e.target.value)}
                    placeholder="Reliable Home Power Backup"
                    className="w-full bg-white border border-gray-300 rounded-lg px-3 py-2 text-sm font-semibold text-gray-900 focus:border-amber-600 outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1">
                    Description Slogan
                  </label>
                  <textarea
                    rows="2"
                    value={slide.desc || ""}
                    onChange={(e) => handleSlideChange(idx, "desc", e.target.value)}
                    placeholder="Keep your home running smoothly during power cuts..."
                    className="w-full bg-white border border-gray-300 rounded-lg px-3 py-2 text-xs text-gray-900 focus:border-amber-600 outline-none resize-none"
                  />
                </div>

                {/* Buttons Config */}
                <div className="grid sm:grid-cols-2 gap-3 pt-1">
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1">
                      Primary Button Text
                    </label>
                    <input
                      type="text"
                      value={slide.buttonText || "Book Now"}
                      onChange={(e) => handleSlideChange(idx, "buttonText", e.target.value)}
                      className="w-full bg-white border border-gray-300 rounded-lg px-3 py-2 text-xs text-gray-900 focus:border-amber-600 outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1">
                      Primary Button Link
                    </label>
                    <input
                      type="text"
                      value={slide.buttonLink || "tel:+918854954525"}
                      onChange={(e) => handleSlideChange(idx, "buttonLink", e.target.value)}
                      className="w-full bg-white border border-gray-300 rounded-lg px-3 py-2 text-xs text-gray-900 focus:border-amber-600 outline-none font-mono"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1">
                      Secondary Button Text
                    </label>
                    <input
                      type="text"
                      value={slide.secondaryButtonText || "View Generators"}
                      onChange={(e) => handleSlideChange(idx, "secondaryButtonText", e.target.value)}
                      className="w-full bg-white border border-gray-300 rounded-lg px-3 py-2 text-xs text-gray-900 focus:border-amber-600 outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1">
                      Secondary Button Link
                    </label>
                    <input
                      type="text"
                      value={slide.secondaryButtonLink || "/generators"}
                      onChange={(e) => handleSlideChange(idx, "secondaryButtonLink", e.target.value)}
                      className="w-full bg-white border border-gray-300 rounded-lg px-3 py-2 text-xs text-gray-900 focus:border-amber-600 outline-none font-mono"
                    />
                  </div>
                </div>
              </div>

              {/* Image Upload */}
              <div className="lg:col-span-5">
                <ImageUploadField
                  label={`Slide #${idx + 1} Image`}
                  value={slide.image || ""}
                  onChange={(newUrl) => handleSlideChange(idx, "image", newUrl)}
                  helperText="Choose generator photo or upload custom image."
                />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Add New Slide Button */}
      <div className="flex justify-center pt-2">
        <button
          type="button"
          onClick={handleAddSlide}
          className="px-4 py-2.5 rounded-lg bg-white hover:bg-gray-50 text-gray-700 border border-gray-300 font-medium text-xs flex items-center gap-1.5 transition-colors cursor-pointer shadow-sm"
        >
          <Plus size={15} />
          <span>Add New Hero Slide</span>
        </button>
      </div>
    </div>
  );
};
