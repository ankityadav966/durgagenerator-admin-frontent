import { useState, useRef } from "react";
import { Upload, Link as LinkIcon, Image as ImageIcon, Check, Loader2, X } from "lucide-react";
import { uploadApi } from "../api/client";

export const ImageUploadField = ({
  label = "Section Image",
  value = "",
  onChange,
  helperText = "Upload a high-quality JPG, PNG, or WebP image, or paste an image URL.",
  aspect = "contain", // contain | cover
}) => {
  const [uploading, setUploading] = useState(false);
  const [activeTab, setActiveTab] = useState(value && value.startsWith("http") ? "url" : "upload");
  const [error, setError] = useState("");
  const fileInputRef = useRef(null);

  const handleFileChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setUploading(true);
      setError("");
      const res = await uploadApi.uploadImage(file);
      if (res.success && res.url) {
        onChange(res.url);
      }
    } catch (err) {
      console.error("Image upload failed:", err);
      setError(err.message || "Failed to upload image");
    } finally {
      setUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  const getPreviewUrl = (url) => {
    if (!url) return "";
    if (url.startsWith("http://") || url.startsWith("https://") || url.startsWith("data:")) {
      return url;
    }
    // If relative path like /assets/gen_5kva.png or /uploads/filename.png
    return url;
  };

  return (
    <div className="space-y-3 bg-[#0d1c33] p-4 rounded-2xl border border-yellow-700/20">
      <div className="flex items-center justify-between">
        <label className="text-sm font-semibold text-yellow-500 uppercase tracking-wider flex items-center gap-2">
          <ImageIcon size={16} />
          {label}
        </label>
        <div className="flex gap-1 bg-[#07162b] p-1 rounded-lg border border-yellow-900/30 text-xs">
          <button
            type="button"
            onClick={() => setActiveTab("upload")}
            className={`px-3 py-1 rounded-md transition-all ${
              activeTab === "upload" ? "bg-yellow-600 text-black font-semibold shadow" : "text-gray-400 hover:text-white"
            }`}
          >
            File Upload
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("url")}
            className={`px-3 py-1 rounded-md transition-all ${
              activeTab === "url" ? "bg-yellow-600 text-black font-semibold shadow" : "text-gray-400 hover:text-white"
            }`}
          >
            Image URL
          </button>
        </div>
      </div>

      <div className="grid sm:grid-cols-3 gap-4 items-center">
        {/* Preview Box */}
        <div className="relative w-full h-36 bg-[#07162b] rounded-xl border border-yellow-900/40 overflow-hidden flex items-center justify-center group shadow-inner">
          {value ? (
            <>
              <img
                src={getPreviewUrl(value)}
                alt="Preview"
                className={`w-full h-full p-2 transition-transform duration-300 group-hover:scale-105 ${
                  aspect === "cover" ? "object-cover" : "object-contain"
                }`}
                onError={(e) => {
                  e.currentTarget.src = "https://placehold.co/400x300/13233d/ca8a04?text=Preview+Error";
                }}
              />
              <button
                type="button"
                onClick={() => onChange("")}
                className="absolute top-2 right-2 bg-red-600/80 hover:bg-red-600 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                title="Remove image"
              >
                <X size={14} />
              </button>
            </>
          ) : (
            <div className="text-center p-3 text-gray-500 text-xs">
              <ImageIcon size={28} className="mx-auto mb-1 opacity-40 text-yellow-600" />
              <span>No image chosen</span>
            </div>
          )}
        </div>

        {/* Input area */}
        <div className="sm:col-span-2 space-y-2">
          {activeTab === "upload" ? (
            <div>
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                accept="image/*"
                className="hidden"
                id={`file-input-${label.replace(/\s+/g, "-")}`}
              />
              <label
                htmlFor={`file-input-${label.replace(/\s+/g, "-")}`}
                className={`w-full border-2 border-dashed border-yellow-700/40 hover:border-yellow-500 rounded-xl p-4 flex flex-col items-center justify-center cursor-pointer transition-all bg-[#07162b]/50 hover:bg-[#07162b] ${
                  uploading ? "opacity-60 pointer-events-none" : ""
                }`}
              >
                {uploading ? (
                  <div className="flex items-center gap-2 text-yellow-500 text-sm font-medium">
                    <Loader2 size={18} className="animate-spin" />
                    <span>Uploading image...</span>
                  </div>
                ) : (
                  <div className="text-center">
                    <Upload size={22} className="mx-auto mb-1 text-yellow-500" />
                    <p className="text-xs font-semibold text-gray-200">Click to browse or drop file here</p>
                    <p className="text-[11px] text-gray-500 mt-0.5">PNG, JPG, WebP up to 10MB</p>
                  </div>
                )}
              </label>
            </div>
          ) : (
            <div className="space-y-1">
              <div className="flex items-center gap-2 bg-[#07162b] border border-yellow-900/40 rounded-xl px-3 py-2.5 focus-within:border-yellow-500">
                <LinkIcon size={16} className="text-yellow-600 shrink-0" />
                <input
                  type="text"
                  placeholder="https://example.com/generator-image.png"
                  value={value}
                  onChange={(e) => onChange(e.target.value)}
                  className="w-full bg-transparent text-sm text-gray-100 placeholder:text-gray-600 outline-none"
                />
              </div>
              <p className="text-[11px] text-gray-500">You can paste any web image URL or relative asset path.</p>
            </div>
          )}

          {error && <p className="text-xs text-red-400 font-medium">{error}</p>}
          <p className="text-[11px] text-gray-400 italic">{helperText}</p>
        </div>
      </div>
    </div>
  );
};
