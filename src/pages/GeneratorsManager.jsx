import { useState, useEffect } from "react";
import { useContent } from "../context/ContentContext";
import { SectionHeader } from "../components/SectionHeader";
import { ImageUploadField } from "../components/ImageUploadField";
import { Plus, Trash2, Zap, Tag, Fuel, Clock, Check, Eye } from "lucide-react";

export const GeneratorsManager = () => {
  const { content, updateSection } = useContent();
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
    <div className="space-y-8 pb-12">
      <SectionHeader
        badge="CORE PRODUCT CATALOG"
        title="Generators, Pricing & Cards"
        description="Manage all generator cards, prices (Day/Month), capacity labels, fuel types, duration options, and upload product photos. These cards appear on both the Homepage (Popular Generators) and the /generators catalog page with dynamic filters."
        websiteRoute="/generators"
        onSave={handleSave}
      />

      {/* Action Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-[#0a182b] p-4 rounded-2xl border border-yellow-700/20">
        <div className="w-full sm:w-80">
          <input
            type="text"
            placeholder="Search generator by name or kVA..."
            value={filterQuery}
            onChange={(e) => setFilterQuery(e.target.value)}
            className="w-full bg-[#07162b] border border-yellow-900/40 rounded-xl px-4 py-2.5 text-xs text-white placeholder:text-gray-500 focus:border-yellow-500 outline-none"
          />
        </div>

        <button
          type="button"
          onClick={handleAddGenerator}
          className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-yellow-500 hover:bg-yellow-400 text-black font-bold text-xs flex items-center justify-center gap-2 transition-all cursor-pointer shadow-md"
        >
          <Plus size={16} />
          <span>Add New Generator Product</span>
        </button>
      </div>

      {/* Generator Cards List */}
      <div className="grid lg:grid-cols-2 gap-8">
        {filtered.map((gen, idx) => {
          // Find real index in full array
          const realIndex = generators.findIndex((item) => item.id === gen.id);

          return (
            <div
              key={gen.id || idx}
              className="bg-[#0c1a2d] border-2 border-yellow-700/30 rounded-3xl p-6 shadow-xl relative flex flex-col justify-between"
            >
              {/* Card Header */}
              <div>
                <div className="flex items-center justify-between pb-4 border-b border-yellow-900/30 mb-6">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-xl bg-yellow-500/20 text-yellow-400 font-bold flex items-center justify-center border border-yellow-500/30 text-xs">
                      #{realIndex + 1}
                    </div>
                    <div>
                      <h3 className="font-serif font-bold text-lg text-white">
                        {gen.name}
                      </h3>
                      <span className="text-[11px] text-yellow-500 font-semibold font-mono">
                        {gen.capacity} • {gen.price}
                      </span>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => handleDeleteGenerator(realIndex)}
                    className="p-2 rounded-xl bg-red-950/60 hover:bg-red-900 text-red-300 border border-red-800/40 transition-colors text-xs font-semibold"
                    title="Delete generator card"
                  >
                    <Trash2 size={15} />
                  </button>
                </div>

                <div className="space-y-4">
                  {/* Image Upload */}
                  <ImageUploadField
                    label="Generator Photo"
                    value={gen.image || ""}
                    onChange={(newUrl) => handleGenChange(realIndex, "image", newUrl)}
                    helperText="Upload transparent PNG or clean photo of the generator."
                  />

                  {/* Title & Price */}
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-yellow-500 uppercase tracking-wider mb-1.5">
                        Generator Name / Title
                      </label>
                      <input
                        type="text"
                        value={gen.name || ""}
                        onChange={(e) => handleGenChange(realIndex, "name", e.target.value)}
                        placeholder="Silent Generator 5 kVA"
                        className="w-full bg-[#07162b] border border-yellow-900/40 rounded-xl px-3.5 py-2.5 text-xs text-white focus:border-yellow-500 outline-none font-medium"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-yellow-500 uppercase tracking-wider mb-1.5">
                        Rental Price (Day / Month)
                      </label>
                      <input
                        type="text"
                        value={gen.price || ""}
                        onChange={(e) => handleGenChange(realIndex, "price", e.target.value)}
                        placeholder="₹2,000 / Day"
                        className="w-full bg-[#07162b] border border-yellow-500/50 rounded-xl px-3.5 py-2.5 text-xs text-yellow-300 font-bold focus:border-yellow-400 outline-none font-mono"
                      />
                    </div>
                  </div>

                  {/* Capacity & Fuel */}
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-gray-300 uppercase tracking-wider mb-1.5">
                        Capacity (kVA)
                      </label>
                      <input
                        type="text"
                        value={gen.capacity || ""}
                        onChange={(e) => handleGenChange(realIndex, "capacity", e.target.value)}
                        placeholder="5 kVA"
                        className="w-full bg-[#07162b] border border-yellow-900/40 rounded-xl px-3.5 py-2.5 text-xs text-white focus:border-yellow-500 outline-none font-mono"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-gray-300 uppercase tracking-wider mb-1.5">
                        Fuel Type
                      </label>
                      <select
                        value={gen.fuel || "Diesel"}
                        onChange={(e) => handleGenChange(realIndex, "fuel", e.target.value)}
                        className="w-full bg-[#07162b] border border-yellow-900/40 rounded-xl px-3.5 py-2.5 text-xs text-white focus:border-yellow-500 outline-none"
                      >
                        <option value="Diesel">Diesel</option>
                        <option value="Petrol">Petrol</option>
                        <option value="Gas / Dual Fuel">Gas / Dual Fuel</option>
                      </select>
                    </div>
                  </div>

                  {/* Description */}
                  <div>
                    <label className="block text-xs font-semibold text-gray-300 uppercase tracking-wider mb-1.5">
                      Short Description / Best For
                    </label>
                    <input
                      type="text"
                      value={gen.desc || ""}
                      onChange={(e) => handleGenChange(realIndex, "desc", e.target.value)}
                      placeholder="Perfect for home backup & small shops"
                      className="w-full bg-[#07162b] border border-yellow-900/40 rounded-xl px-3.5 py-2.5 text-xs text-white focus:border-yellow-500 outline-none italic"
                    />
                  </div>

                  {/* Duration Tags */}
                  <div>
                    <label className="block text-xs font-semibold text-gray-300 uppercase tracking-wider mb-2">
                      Available Rental Durations
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {["Daily", "Weekly", "Monthly"].map((dur) => {
                        const isSelected = (gen.duration || []).includes(dur);
                        return (
                          <button
                            type="button"
                            key={dur}
                            onClick={() => handleDurationToggle(realIndex, dur)}
                            className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all cursor-pointer flex items-center gap-1.5 ${
                              isSelected
                                ? "bg-yellow-500/20 text-yellow-300 border-yellow-500/50"
                                : "bg-[#07162b] text-gray-400 border-yellow-900/30 hover:text-white"
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
                  <div className="pt-2 flex items-center justify-between bg-[#07162b] p-3 rounded-xl border border-yellow-900/30">
                    <span className="text-xs font-semibold text-gray-300">
                      Show in "Popular Generators" on Homepage
                    </span>
                    <input
                      type="checkbox"
                      checked={gen.popular !== false}
                      onChange={(e) => handleGenChange(realIndex, "popular", e.target.checked)}
                      className="w-4 h-4 accent-yellow-500 rounded cursor-pointer"
                    />
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
