import { useState, useEffect } from "react";
import { useContent } from "../context/ContentContext";
import { SectionHeader } from "../components/SectionHeader";
import { ImageUploadField } from "../components/ImageUploadField";
import { Plus, Trash2, Star, MessageSquare } from "lucide-react";

export const TestimonialsManager = () => {
  const { content, updateSection } = useContent();
  const [testimonials, setTestimonials] = useState([]);
  const [deleteConfirmIdx, setDeleteConfirmIdx] = useState(null);

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
      name: "New Client",
      role: "Business Owner",
      rating: 5,
      review: "Prompt delivery and outstanding generator rental service in Jaipur.",
      image: "https://res.cloudinary.com/dswm5fwef/image/upload/v1789724482/durga-generators/user1.png",
    };
    setTestimonials([...testimonials, newTest]);
  };

  const handleDeleteTestimonial = (index) => {
    const updated = testimonials.filter((_, i) => i !== index);
    setTestimonials(updated);
    setDeleteConfirmIdx(null);
  };

  const handleSave = async () => {
    await updateSection("testimonials", testimonials);
  };

  return (
    <div className="space-y-6 pb-12">
      <SectionHeader
        title="Customer Reviews & Testimonials"
        description="Manage customer testimonials, avatars, and star ratings displayed on the website."
        websiteRoute="/"
        onSave={handleSave}
      />

      {/* Testimonials List - 2 spacious columns so nothing overflows */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {testimonials.map((test, idx) => (
          <div
            key={test.id || idx}
            className="bg-white border border-gray-200 rounded-2xl p-5 sm:p-6 shadow-sm flex flex-col justify-between relative hover:border-amber-400/60 transition-colors"
          >
            <div>
              {/* Card Header */}
              <div className="flex items-center justify-between pb-3.5 border-b border-gray-100 mb-4">
                <div className="flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-amber-50 text-amber-800 text-xs font-bold flex items-center justify-center border border-amber-200">
                    {idx + 1}
                  </span>
                  <span className="text-xs font-bold text-gray-800">
                    {test.name || `Review #${idx + 1}`}
                  </span>
                </div>

                {deleteConfirmIdx === idx ? (
                  <div className="flex items-center gap-1.5 animate-in fade-in duration-150">
                    <span className="text-[11px] text-red-600 font-semibold">Delete?</span>
                    <button
                      type="button"
                      onClick={() => handleDeleteTestimonial(idx)}
                      className="px-2 py-0.5 bg-red-600 hover:bg-red-700 text-white rounded text-[10px] font-bold cursor-pointer"
                    >
                      Yes
                    </button>
                    <button
                      type="button"
                      onClick={() => setDeleteConfirmIdx(null)}
                      className="px-2 py-0.5 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded text-[10px] font-medium cursor-pointer"
                    >
                      No
                    </button>
                  </div>
                ) : (
                  <button
                    type="button"
                    onClick={() => setDeleteConfirmIdx(idx)}
                    className="p-1.5 rounded-lg text-gray-400 hover:text-red-600 hover:bg-red-50 transition-colors cursor-pointer"
                    title="Delete review"
                  >
                    <Trash2 size={14} />
                  </button>
                )}
              </div>

              <div className="space-y-4">
                {/* Avatar Uploader (Compact mode - clean circle, zero overflow) */}
                <ImageUploadField
                  label="Reviewer Photo"
                  value={test.image || ""}
                  onChange={(newUrl) => handleTestimonialChange(idx, "image", newUrl)}
                  helperText="Choose photo from Cloudinary library or upload new."
                  compact={true}
                  aspect="avatar"
                />

                {/* Name & Role Inputs */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] font-bold text-gray-700 uppercase tracking-wider mb-1">
                      Client Name
                    </label>
                    <input
                      type="text"
                      value={test.name || ""}
                      onChange={(e) => handleTestimonialChange(idx, "name", e.target.value)}
                      placeholder="e.g. Rajesh Sharma"
                      className="w-full bg-white border border-gray-300 rounded-lg px-3 py-2 text-xs text-gray-900 font-semibold focus:border-amber-600 outline-none transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-gray-700 uppercase tracking-wider mb-1">
                      Role / Business
                    </label>
                    <input
                      type="text"
                      value={test.role || ""}
                      onChange={(e) => handleTestimonialChange(idx, "role", e.target.value)}
                      placeholder="e.g. Event Manager"
                      className="w-full bg-white border border-gray-300 rounded-lg px-3 py-2 text-xs text-gray-900 focus:border-amber-600 outline-none transition-colors"
                    />
                  </div>
                </div>

                {/* Star Rating */}
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label className="text-[11px] font-bold text-gray-700 uppercase tracking-wider">
                      Star Rating
                    </label>
                    <span className="text-xs font-bold text-amber-600">
                      {test.rating || 5} Stars
                    </span>
                  </div>
                  <div className="flex items-center gap-1 bg-gray-50 p-2 rounded-lg border border-gray-200 w-fit">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        type="button"
                        key={star}
                        onClick={() => handleTestimonialChange(idx, "rating", star)}
                        className={`p-1 rounded transition-transform hover:scale-110 cursor-pointer ${
                          (test.rating || 5) >= star
                            ? "text-amber-400 fill-amber-400"
                            : "text-gray-300 fill-gray-200"
                        }`}
                      >
                        <Star size={17} fill="currentColor" />
                      </button>
                    ))}
                  </div>
                </div>

                {/* Review Textarea */}
                <div>
                  <label className="block text-[11px] font-bold text-gray-700 uppercase tracking-wider mb-1">
                    Review Text
                  </label>
                  <textarea
                    rows="3"
                    value={test.review || ""}
                    onChange={(e) => handleTestimonialChange(idx, "review", e.target.value)}
                    placeholder="Describe client experience with generator rental..."
                    className="w-full bg-white border border-gray-300 rounded-lg p-3 text-xs text-gray-900 leading-relaxed focus:border-amber-600 outline-none resize-none transition-colors"
                  />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Add Review Button */}
      <div className="flex justify-center pt-4">
        <button
          type="button"
          onClick={handleAddTestimonial}
          className="px-5 py-2.5 rounded-xl bg-white hover:bg-gray-50 text-gray-800 border border-gray-300 font-bold text-xs flex items-center gap-2 cursor-pointer shadow-sm hover:border-amber-500 transition-colors"
        >
          <Plus size={15} className="text-amber-600" />
          <span>Add New Testimonial</span>
        </button>
      </div>
    </div>
  );
};
