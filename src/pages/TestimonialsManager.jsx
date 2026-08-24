import { useState, useEffect } from "react";
import { useContent } from "../context/ContentContext";
import { SectionHeader } from "../components/SectionHeader";
import { ImageUploadField } from "../components/ImageUploadField";
import { Plus, Trash2, Star } from "lucide-react";

export const TestimonialsManager = () => {
  const { content, updateSection } = useContent();
  const [testimonials, setTestimonials] = useState([]);

  useEffect(() => {
    if (content?.testimonials) {
      setTestimonials(JSON.parse(JSON.stringify(content.testimonials)));
    }
  }, [content]);

  const handleTestimonialChange = (index, field, value) => {
    const updated = [...testimonials];
    updated[index][field] = value;
    setTestimonials(updated);
  };

  const handleAddTestimonial = () => {
    const newTest = {
      id: `test-${Date.now()}`,
      name: "Amit Sharma",
      role: "Factory Manager",
      rating: 5,
      review: "Top-notch generator rental service. Silent equipment and quick installation in Jaipur.",
      image: "/assets/user1.jpg"
    };
    setTestimonials([...testimonials, newTest]);
  };

  const handleDeleteTestimonial = (index) => {
    if (window.confirm("Are you sure you want to delete this testimonial?")) {
      const updated = testimonials.filter((_, i) => i !== index);
      setTestimonials(updated);
    }
  };

  const handleSave = async () => {
    await updateSection("testimonials", testimonials);
  };

  return (
    <div className="space-y-8 pb-12">
      <SectionHeader
        badge="CUSTOMER REVIEWS & SOCIAL PROOF"
        title="Client Testimonials & Ratings"
        description="Manage the client feedback carousel on the homepage. Update reviewer names, roles, 5-star ratings, testimonial quotes, and customer avatar photos."
        websiteRoute="/"
        onSave={handleSave}
      />

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {testimonials.map((test, idx) => (
          <div
            key={test.id || idx}
            className="bg-[#0c1a2d] border border-yellow-700/30 rounded-3xl p-6 shadow-xl relative flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between pb-3 border-b border-yellow-900/30 mb-4">
                <span className="text-xs font-bold text-yellow-400 font-mono">
                  Review #{idx + 1}
                </span>
                <button
                  type="button"
                  onClick={() => handleDeleteTestimonial(idx)}
                  className="p-1.5 rounded-lg bg-red-950/60 hover:bg-red-900 text-red-300 border border-red-800/40"
                >
                  <Trash2 size={14} />
                </button>
              </div>

              <div className="space-y-4">
                {/* Image Upload for Client */}
                <ImageUploadField
                  label="Client Photo / Avatar"
                  value={test.image || ""}
                  onChange={(newUrl) => handleTestimonialChange(idx, "image", newUrl)}
                  helperText="Recommended: Square avatar photo."
                  aspect="cover"
                />

                <div>
                  <label className="block text-xs font-semibold text-yellow-500 uppercase tracking-wider mb-1">
                    Client Name
                  </label>
                  <input
                    type="text"
                    value={test.name || ""}
                    onChange={(e) => handleTestimonialChange(idx, "name", e.target.value)}
                    placeholder="Rajesh Sharma"
                    className="w-full bg-[#07162b] border border-yellow-900/40 rounded-xl px-3.5 py-2 text-xs text-white focus:border-yellow-500 outline-none font-bold"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-300 uppercase tracking-wider mb-1">
                    Role / Company / Designation
                  </label>
                  <input
                    type="text"
                    value={test.role || ""}
                    onChange={(e) => handleTestimonialChange(idx, "role", e.target.value)}
                    placeholder="Event Manager"
                    className="w-full bg-[#07162b] border border-yellow-900/40 rounded-xl px-3.5 py-2 text-xs text-white focus:border-yellow-500 outline-none font-mono"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-300 uppercase tracking-wider mb-1">
                    Star Rating (1 - 5)
                  </label>
                  <div className="flex items-center gap-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        type="button"
                        key={star}
                        onClick={() => handleTestimonialChange(idx, "rating", star)}
                        className={`p-1.5 rounded-lg border transition-all ${
                          (test.rating || 5) >= star
                            ? "bg-yellow-500/20 border-yellow-500 text-yellow-400"
                            : "bg-[#07162b] border-yellow-900/30 text-gray-600"
                        }`}
                      >
                        <Star size={16} fill="currentColor" />
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-300 uppercase tracking-wider mb-1">
                    Review Text / Quote
                  </label>
                  <textarea
                    rows="3"
                    value={test.review || ""}
                    onChange={(e) => handleTestimonialChange(idx, "review", e.target.value)}
                    placeholder="Excellent service! Generator was delivered on time..."
                    className="w-full bg-[#07162b] border border-yellow-900/40 rounded-xl px-3.5 py-2 text-xs text-white focus:border-yellow-500 outline-none resize-none italic"
                  />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-center pt-2">
        <button
          type="button"
          onClick={handleAddTestimonial}
          className="px-5 py-3 rounded-xl bg-[#0f2440] hover:bg-[#15345c] text-yellow-400 border border-dashed border-yellow-600/40 font-bold text-xs flex items-center gap-2 cursor-pointer shadow"
        >
          <Plus size={16} />
          <span>Add Another Customer Testimonial</span>
        </button>
      </div>
    </div>
  );
};
