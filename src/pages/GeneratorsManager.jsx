import { useState, useEffect } from "react";
import { useContent } from "../context/ContentContext";
import { SectionHeader } from "../components/SectionHeader";
import { ImageUploadField } from "../components/ImageUploadField";
import { Plus, Trash2, Check, Save, Loader2 } from "lucide-react";

export const GeneratorsManager = () => {
  const { content, updateSection, saving } = useContent();
  const [generators, setGenerators] = useState([]);
  const [filterQuery, setFilterQuery] = useState("");

  useEffect(() => {
    if (content?.generators) {
      setGenerators(JSON.parse(JSON.stringify(content.generators)));
    }
  }, [content]);

  const handleGenChange = (index, field, value) => {
    const updated = [...generators];
    updated[index][field] = value;
    setGenerators(updated);
  };

  const handleDurationToggle = (genIndex, dur) => {
    const updated = [...generators];
    const currentDurations = updated[genIndex].duration || [];
    if (currentDurations.includes(dur)) {
      updated[genIndex].duration = currentDurations.filter((d) => d !== dur);
    } else {
      updated[genIndex].duration = [...currentDurations, dur];
    }
    setGenerators(updated);
  };

  const handleAddGenerator = () => {
    const newGen = {
      id: `gen-${Date.now()}`,
      name: "Silent Generator 30 kVA",
      capacity: "30 kVA",
      fuel: "Diesel",
      duration: ["Daily", "Weekly", "Monthly"],
      price: "₹3,500 / Day",
      desc: "Reliable power backup for weddings, offices and events.",
      image: "/assets/gen_40kva.png",
      features: ["Fuel Efficient", "Low Noise Enclosure", "24/7 Support"],
      popular: true
    };
    setGenerators([...generators, newGen]);
  };

  const handleDeleteGenerator = (index) => {
    const gen = generators[index];
    if (window.confirm(`Are you sure you want to delete '${gen.name}'?`)) {
      const updated = generators.filter((_, i) => i !== index);
      setGenerators(updated);
    }
  };

  const handleSave = async () => {
    await updateSection("generators", generators);
  };

  const filtered = generators.filter((g) =>
    (g.name || "").toLowerCase().includes(filterQuery.toLowerCase()) ||
    (g.capacity || "").toLowerCase().includes(filterQuery.toLowerCase()) ||
    (g.price || "").toLowerCase().includes(filterQuery.toLowerCase())
  );

  return (
    <div className="space-y-6 pb-12">
      <SectionHeader
        title="Generators Catalog & Pricing"
        description="Add, edit, or remove generator models, rental prices, photos, and specifications."
        websiteRoute="/generators"
        onSave={handleSave}
      />

      {/* Action Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 bg-white p-4 rounded-xl border border-gray-200 shadow-sm">
        <div className="w-full sm:w-80">
          <input
            type="text"
            placeholder="Search generator by name or kVA..."
            value={filterQuery}
            onChange={(e) => setFilterQuery(e.target.value)}
            className="w-full bg-gray-50 border border-gray-300 rounded-lg px-3.5 py-2 text-xs text-gray-900 placeholder:text-gray-400 focus:border-amber-600 focus:bg-white outline-none"
          />
        </div>

        <button
          type="button"
          onClick={handleAddGenerator}
          className="w-full sm:w-auto px-4 py-2 rounded-lg bg-amber-600 hover:bg-amber-700 text-white font-medium text-xs flex items-center justify-center gap-1.5 transition-colors cursor-pointer shadow-sm"
        >
          <Plus size={15} />
          <span>Add Generator</span>
        </button>
      </div>

      {/* Generator Cards List */}
      <div className="grid lg:grid-cols-2 gap-6">
        {filtered.map((gen, idx) => {
          const realIndex = generators.findIndex((item) => item.id === gen.id);

          return (
            <div
              key={gen.id || idx}
              className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm flex flex-col justify-between"
            >
              <div>
                {/* Header */}
                <div className="flex items-center justify-between pb-3 border-b border-gray-200 mb-4">
                  <div className="flex items-center gap-2.5">
                    <span className="w-6 h-6 rounded-md bg-amber-100 text-amber-800 font-bold flex items-center justify-center text-xs">
                      #{realIndex + 1}
                    </span>
                    <div>
                      <h3 className="font-bold text-sm text-gray-900">
                        {gen.name}
                      </h3>
                      <span className="text-xs text-amber-700 font-medium">
                        {gen.capacity} • {gen.price}
                      </span>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => handleDeleteGenerator(realIndex)}
                    className="p-1.5 rounded-lg text-gray-400 hover:text-red-600 hover:bg-red-50 transition-colors text-xs"
                    title="Delete generator"
                  >
                    <Trash2 size={15} />
                  </button>
                </div>

                <div className="space-y-3.5">
                  {/* Image Upload */}
                  <ImageUploadField
                    label="Generator Photo"
                    value={gen.image || ""}
                    onChange={(newUrl) => handleGenChange(realIndex, "image", newUrl)}
                    helperText="Select from website photos or upload new photo."
                  />

                  {/* Title & Price */}
                  <div className="grid sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1">
                        Generator Name
                      </label>
                      <input
                        type="text"
                        value={gen.name || ""}
                        onChange={(e) => handleGenChange(realIndex, "name", e.target.value)}
                        placeholder="Silent Generator 5 kVA"
                        className="w-full bg-white border border-gray-300 rounded-lg px-3 py-2 text-xs text-gray-900 focus:border-amber-600 outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1">
                        Rental Price
                      </label>
                      <input
                        type="text"
                        value={gen.price || ""}
                        onChange={(e) => handleGenChange(realIndex, "price", e.target.value)}
                        placeholder="₹2,000 / Day"
                        className="w-full bg-white border border-gray-300 rounded-lg px-3 py-2 text-xs text-amber-800 font-semibold focus:border-amber-600 outline-none"
                      />
                    </div>
                  </div>

                  {/* Capacity & Fuel */}
                  <div className="grid sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1">
                        Capacity
                      </label>
                      <input
                        type="text"
                        value={gen.capacity || ""}
                        onChange={(e) => handleGenChange(realIndex, "capacity", e.target.value)}
                        placeholder="5 kVA"
                        className="w-full bg-white border border-gray-300 rounded-lg px-3 py-2 text-xs text-gray-900 focus:border-amber-600 outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1">
                        Fuel Type
                      </label>
                      <select
                        value={gen.fuel || "Diesel"}
                        onChange={(e) => handleGenChange(realIndex, "fuel", e.target.value)}
                        className="w-full bg-white border border-gray-300 rounded-lg px-3 py-2 text-xs text-gray-900 focus:border-amber-600 outline-none"
                      >
                        <option value="Diesel">Diesel</option>
                        <option value="Petrol">Petrol</option>
                        <option value="Gas / Dual Fuel">Gas / Dual Fuel</option>
                      </select>
                    </div>
                  </div>

                  {/* Description */}
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1">
                      Short Description
                    </label>
                    <input
                      type="text"
                      value={gen.desc || ""}
                      onChange={(e) => handleGenChange(realIndex, "desc", e.target.value)}
                      placeholder="Perfect for home backup & small shops"
                      className="w-full bg-white border border-gray-300 rounded-lg px-3 py-2 text-xs text-gray-900 focus:border-amber-600 outline-none"
                    />
                  </div>

                  {/* Duration Tags */}
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1.5">
                      Rental Durations
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {["Daily", "Weekly", "Monthly"].map((dur) => {
                        const isSelected = (gen.duration || []).includes(dur);
                        return (
                          <button
                            type="button"
                            key={dur}
                            onClick={() => handleDurationToggle(realIndex, dur)}
                            className={`px-3 py-1 rounded-md text-xs font-medium border transition-colors cursor-pointer flex items-center gap-1 ${
                              isSelected
                                ? "bg-amber-100 text-amber-900 border-amber-300"
                                : "bg-gray-50 text-gray-600 border-gray-200 hover:bg-gray-100"
                            }`}
                          >
                            {isSelected && <Check size={12} />}
                            <span>{dur}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Popular Homepage Switch */}
                  <div className="pt-2 flex items-center justify-between bg-gray-50 p-3 rounded-lg border border-gray-200">
                    <span className="text-xs font-medium text-gray-700">
                      Show in "Popular Generators" on Homepage
                    </span>
                    <input
                      type="checkbox"
                      checked={gen.popular !== false}
                      onChange={(e) => handleGenChange(realIndex, "popular", e.target.checked)}
                      className="w-4 h-4 accent-amber-600 rounded cursor-pointer"
                    />
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Bottom Save Action Bar */}
      <div className="sticky bottom-4 z-20 bg-white/95 backdrop-blur-sm border border-gray-300 p-4 rounded-xl shadow-lg flex items-center justify-between gap-4 mt-6">
        <p className="text-xs text-gray-600 hidden sm:block">
          Total {generators.length} generators in catalog.
        </p>

        <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
          <button
            type="button"
            onClick={handleAddGenerator}
            className="px-4 py-2 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium text-xs flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <Plus size={14} />
            <span>Add Generator</span>
          </button>

          <button
            type="button"
            onClick={handleSave}
            disabled={saving}
            className={`px-6 py-2 rounded-lg font-medium text-xs flex items-center justify-center gap-1.5 transition-colors cursor-pointer shadow-sm ${
              saving
                ? "bg-amber-400 text-white cursor-not-allowed"
                : "bg-amber-600 hover:bg-amber-700 text-white"
            }`}
          >
            {saving ? (
              <>
                <Loader2 size={14} className="animate-spin" />
                <span>Saving...</span>
              </>
            ) : (
              <>
                <Save size={14} />
                <span>Save All Changes</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
