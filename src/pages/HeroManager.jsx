import { useState, useEffect } from "react";
import { useContent } from "../context/ContentContext";
import { SectionHeader } from "../components/SectionHeader";
import { ImageUploadField } from "../components/ImageUploadField";
import { Plus, Trash2, Sparkles, Layers, ArrowUp, ArrowDown } from "lucide-react";

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
      badge: "⚡ NEW POWER SOLUTION",
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
      alert("At least one slide is required for the Hero carousel.");
      return;
    }
    if (window.confirm("Are you sure you want to delete this hero slide?")) {
      const updated = heroData.slides.filter((_, i) => i !== index);
      setHeroData({ ...heroData, slides: updated });
    }
  };

  const handleSave = async () => {
    await updateSection("hero", heroData);
  };

  return (
    <div className="space-y-8 pb-12">
      <SectionHeader
        badge="HOMEPAGE HERO SECTION"
        title="Hero Carousel & Banners"
        description="The Hero Section is the very first slider users see when opening the website homepage. Edit headings, slogans, badges, buttons, and generator display images."
        websiteRoute="/"
        onSave={handleSave}
      />

      {/* Slide Items */}
      <div className="space-y-8">
        {heroData.slides.map((slide, idx) => (
          <div
            key={slide.id || idx}
            className="bg-[#0c1a2d] border border-yellow-700/30 rounded-3xl p-6 lg:p-8 shadow-xl relative"
          >
            {/* Header / Number */}
            <div className="flex items-center justify-between pb-6 border-b border-yellow-900/30 mb-6">
              <div className="flex items-center gap-3">
                <span className="w-9 h-9 rounded-xl bg-yellow-500/20 text-yellow-400 font-bold font-serif flex items-center justify-center border border-yellow-500/30 text-sm">
                  #{idx + 1}
                </span>
                <div>
                  <h3 className="font-serif font-bold text-lg text-white">
                    Slide {idx + 1}: {slide.title || "Untitled Slide"}
                  </h3>
                  <p className="text-[11px] text-gray-400">Carousel Slide Item</p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => handleDeleteSlide(idx)}
                className="p-2.5 rounded-xl bg-red-950/60 hover:bg-red-900 text-red-300 border border-red-800/40 transition-colors flex items-center gap-1.5 text-xs font-semibold"
                title="Delete this slide"
              >
                <Trash2 size={14} />
                <span>Delete Slide</span>
              </button>
            </div>

            <div className="grid lg:grid-cols-12 gap-8">
              {/* Form inputs */}
              <div className="lg:col-span-7 space-y-5">
                <div>
                  <label className="block text-xs font-semibold text-yellow-500 uppercase tracking-wider mb-2">
                    Top Badge Pill Text
                  </label>
                  <input
                    type="text"
                    value={slide.badge || ""}
                    onChange={(e) => handleSlideChange(idx, "badge", e.target.value)}
                    placeholder="🏠 HOME POWER SOLUTION"
                    className="w-full bg-[#07162b] border border-yellow-900/40 rounded-xl px-4 py-3 text-sm text-white placeholder:text-gray-600 focus:border-yellow-500 outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-yellow-500 uppercase tracking-wider mb-2">
                    Main Slide Heading (Title)
                  </label>
                  <input
                    type="text"
                    value={slide.title || ""}
                    onChange={(e) => handleSlideChange(idx, "title", e.target.value)}
                    placeholder="Reliable Home Power Backup"
                    className="w-full bg-[#07162b] border border-yellow-900/40 rounded-xl px-4 py-3 text-sm text-white font-serif font-bold placeholder:text-gray-600 focus:border-yellow-500 outline-none text-lg"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-yellow-500 uppercase tracking-wider mb-2">
                    Description Slogan
                  </label>
                  <textarea
                    rows="3"
                    value={slide.desc || ""}
                    onChange={(e) => handleSlideChange(idx, "desc", e.target.value)}
                    placeholder="Keep your home running smoothly during power cuts..."
                    className="w-full bg-[#07162b] border border-yellow-900/40 rounded-xl px-4 py-3 text-sm text-white placeholder:text-gray-600 focus:border-yellow-500 outline-none resize-none"
                  />
                </div>

                {/* Buttons Config */}
                <div className="grid sm:grid-cols-2 gap-4 pt-2">
                  <div>
                    <label className="block text-xs font-semibold text-gray-300 uppercase tracking-wider mb-2">
                      Primary Button Text
                    </label>
                    <input
                      type="text"
                      value={slide.buttonText || "Book Now"}
                      onChange={(e) => handleSlideChange(idx, "buttonText", e.target.value)}
                      className="w-full bg-[#07162b] border border-yellow-900/40 rounded-xl px-3.5 py-2.5 text-xs text-white focus:border-yellow-500 outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-gray-300 uppercase tracking-wider mb-2">
                      Primary Button Link
                    </label>
                    <input
                      type="text"
                      value={slide.buttonLink || "tel:+918854954525"}
                      onChange={(e) => handleSlideChange(idx, "buttonLink", e.target.value)}
                      className="w-full bg-[#07162b] border border-yellow-900/40 rounded-xl px-3.5 py-2.5 text-xs text-white focus:border-yellow-500 outline-none font-mono"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-gray-300 uppercase tracking-wider mb-2">
                      Secondary Button Text
                    </label>
                    <input
                      type="text"
                      value={slide.secondaryButtonText || "View Generators"}
                      onChange={(e) => handleSlideChange(idx, "secondaryButtonText", e.target.value)}
                      className="w-full bg-[#07162b] border border-yellow-900/40 rounded-xl px-3.5 py-2.5 text-xs text-white focus:border-yellow-500 outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-gray-300 uppercase tracking-wider mb-2">
                      Secondary Button Link
                    </label>
                    <input
                      type="text"
                      value={slide.secondaryButtonLink || "/generators"}
                      onChange={(e) => handleSlideChange(idx, "secondaryButtonLink", e.target.value)}
                      className="w-full bg-[#07162b] border border-yellow-900/40 rounded-xl px-3.5 py-2.5 text-xs text-white focus:border-yellow-500 outline-none font-mono"
                    />
                  </div>
                </div>
              </div>

              {/* Image Upload for slide */}
              <div className="lg:col-span-5">
                <ImageUploadField
                  label={`Slide #${idx + 1} Hero Image`}
                  value={slide.image || ""}
                  onChange={(newUrl) => handleSlideChange(idx, "image", newUrl)}
                  helperText="Recommended: Transparent PNG generator image or high-res photo. Will appear with dynamic gold backlight on homepage."
                />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Add New Slide Button */}
      <div className="flex justify-center pt-4">
        <button
          type="button"
          onClick={handleAddSlide}
          className="px-6 py-4 rounded-2xl bg-[#0f2440] hover:bg-[#15345c] text-yellow-400 border-2 border-dashed border-yellow-600/40 hover:border-yellow-400 font-bold text-sm flex items-center gap-2 transition-all cursor-pointer shadow-lg"
        >
          <Plus size={18} />
          <span>Add Another Hero Carousel Slide</span>
        </button>
      </div>
    </div>
  );
};
