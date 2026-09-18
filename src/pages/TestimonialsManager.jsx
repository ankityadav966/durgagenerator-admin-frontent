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
    <div className="space-y-6 pb-12">
      <SectionHeader
        title="Customer Reviews & Testimonials"
        description="Client testimonials displayed on the homepage."
        websiteRoute="/"
        onSave={handleSave}
      />

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {testimonials.map((test, idx) => (
          <div
            key={test.id || idx}
            className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between pb-3 border-b border-gray-200 mb-4">
                <span className="text-xs font-semibold text-gray-500">
                  Review #{idx + 1}
                </span>
                <button
                  type="button"
                  onClick={() => handleDeleteTestimonial(idx)}
                  className="p-1 rounded-lg text-gray-400 hover:text-red-600 hover:bg-red-50 transition-colors"
                  title="Delete review"
                >
                  <Trash2 size={14} />
                </button>
              </div>

              <div className="space-y-3.5">
                <ImageUploadField
                  label="Avatar / Photo"
                  value={test.image || ""}
                  onChange={(newUrl) => handleTestimonialChange(idx, "image", newUrl)}
                  helperText="Select review avatar."
                  aspect="cover"
                />

                <div>
                  <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1">
                    Client Name
                  </label>
                  <input
                    type="text"
                    value={test.name || ""}
                    onChange={(e) => handleTestimonialChange(idx, "name", e.target.value)}
                    placeholder="Rajesh Sharma"
                    className="w-full bg-white border border-gray-300 rounded-lg px-3 py-2 text-xs text-gray-900 font-medium focus:border-amber-600 outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1">
                    Role / Business
                  </label>
                  <input
                    type="text"
                    value={test.role || ""}
                    onChange={(e) => handleTestimonialChange(idx, "role", e.target.value)}
                    placeholder="Event Organizer"
                    className="w-full bg-white border border-gray-300 rounded-lg px-3 py-2 text-xs text-gray-900 focus:border-amber-600 outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1">
                    Rating (Stars)
                  </label>
                  <div className="flex items-center gap-1.5">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        type="button"
                        key={star}
                        onClick={() => handleTestimonialChange(idx, "rating", star)}
                        className={`p-1 rounded border transition-colors cursor-pointer ${
                          (test.rating || 5) >= star
                            ? "bg-amber-50 border-amber-300 text-amber-500"
                            : "bg-gray-50 border-gray-200 text-gray-300"
                        }`}
                      >
                        <Star size={15} fill="currentColor" />
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1">
                    Review Text
                  </label>
                  <textarea
                    rows="3"
                    value={test.review || ""}
                    onChange={(e) => handleTestimonialChange(idx, "review", e.target.value)}
                    placeholder="Generator service was very prompt and reliable..."
                    className="w-full bg-white border border-gray-300 rounded-lg px-3 py-2 text-xs text-gray-900 focus:border-amber-600 outline-none resize-none"
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
          className="px-4 py-2 rounded-lg bg-white hover:bg-gray-50 text-gray-700 border border-gray-300 font-medium text-xs flex items-center gap-1.5 cursor-pointer shadow-sm"
        >
          <Plus size={14} />
          <span>Add Testimonial</span>
        </button>
      </div>
    </div>
  );
};
