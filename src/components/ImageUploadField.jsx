import { useState, useRef } from "react";
import { Upload, Link as LinkIcon, Image as ImageIcon, Check, Loader2, X, Grid } from "lucide-react";
import { uploadApi } from "../api/client";

// Public website images available for quick selection
const WEBSITE_PRESET_IMAGES = [
  { name: "5 kVA Generator", path: "/assets/gen_5kva.png" },
  { name: "15 kVA Generator", path: "/assets/gen_15kva.png" },
  { name: "40 kVA Generator", path: "/assets/gen_40kva.png" },
  { name: "62 kVA Generator", path: "/assets/gen_62kva.png" },
  { name: "125 kVA Generator", path: "/assets/gen_125kva.png" },
  { name: "160 kVA Generator", path: "/assets/gen_160kva.png" },
  { name: "250 kVA Generator", path: "/assets/gen_250kva.png" },
  { name: "500 kVA Generator", path: "/assets/gen_500kva.png" },
  { name: "Generator 1", path: "/assets/gen1.png" },
  { name: "Generator 2", path: "/assets/gen2.png" },
  { name: "Generator 3", path: "/assets/gen3.png" },
  { name: "Generator 4", path: "/assets/gen4.png" },
  { name: "Hero Photo", path: "/assets/hero.png" },
  { name: "Durga Logo", path: "/assets/logo.jpeg" },
  { name: "Review User 1", path: "/assets/user1.jpg" },
  { name: "Review User 2", path: "/assets/user2.jpg" },
  { name: "Review User 3", path: "/assets/user3.jpg" },
];

export const ImageUploadField = ({
  label = "Image",
  value = "",
  onChange,
  helperText = "",
  aspect = "contain",
}) => {
  const [uploading, setUploading] = useState(false);
  const [activeTab, setActiveTab] = useState("presets"); // presets | upload | url
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

  const handleRemoveImage = () => {
    onChange("");
  };

  const getPreviewUrl = (url) => {
    if (!url) return "";
    return url;
  };

  return (
    <div className="bg-gray-50 p-4 rounded-xl border border-gray-200">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-3">
        <label className="text-xs font-semibold text-gray-700 uppercase tracking-wider flex items-center gap-1.5">
          <ImageIcon size={14} className="text-amber-600" />
          {label}
        </label>

        {/* Tab switcher */}
        <div className="flex gap-1 bg-gray-200/70 p-0.5 rounded-lg text-xs w-fit">
          <button
            type="button"
            onClick={() => setActiveTab("presets")}
            className={`px-2.5 py-1 rounded-md transition-colors ${
              activeTab === "presets" ? "bg-white text-gray-900 font-semibold shadow-xs" : "text-gray-600 hover:text-gray-900"
            }`}
          >
            Website Photos
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("upload")}
            className={`px-2.5 py-1 rounded-md transition-colors ${
              activeTab === "upload" ? "bg-white text-gray-900 font-semibold shadow-xs" : "text-gray-600 hover:text-gray-900"
            }`}
          >
            Upload File
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("url")}
            className={`px-2.5 py-1 rounded-md transition-colors ${
              activeTab === "url" ? "bg-white text-gray-900 font-semibold shadow-xs" : "text-gray-600 hover:text-gray-900"
            }`}
          >
            Image URL
          </button>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-4 items-start">
        {/* Preview Box */}
        <div className="relative w-36 h-36 shrink-0 bg-white rounded-lg border border-gray-300 overflow-hidden flex items-center justify-center">
          {value ? (
            <>
              <img
                src={getPreviewUrl(value)}
                alt="Preview"
                className={`w-full h-full p-1.5 ${
                  aspect === "cover" ? "object-cover" : "object-contain"
                }`}
                onError={(e) => {
                  e.currentTarget.style.display = "none";
                  const fallback = e.currentTarget.parentElement?.querySelector(".img-error-fallback");
                  if (fallback) fallback.classList.remove("hidden");
                }}
              />
              <div className="img-error-fallback hidden text-center p-2 text-gray-400 text-[11px]">
                <p>Failed to load</p>
                <p className="truncate max-w-[100px] text-[10px] text-gray-400">{value}</p>
              </div>
              <button
                type="button"
                onClick={handleRemoveImage}
                className="absolute top-1 right-1 bg-red-600 hover:bg-red-700 text-white p-1 rounded-md transition-colors cursor-pointer shadow-sm"
                title="Remove image"
              >
                <X size={13} />
              </button>
            </>
          ) : (
            <div className="text-center p-2 text-gray-400 text-xs">
              <ImageIcon size={24} className="mx-auto mb-1 text-gray-300" />
              <span>No image</span>
            </div>
          )}
        </div>

        {/* Tab content */}
        <div className="flex-1 w-full min-w-0">
          {activeTab === "presets" && (
            <div>
              <p className="text-[11px] text-gray-500 mb-2">
                Click any website photo to select it:
              </p>
              <div className="grid grid-cols-4 sm:grid-cols-6 gap-2 max-h-36 overflow-y-auto p-1 bg-white border border-gray-200 rounded-lg">
                {WEBSITE_PRESET_IMAGES.map((preset) => {
                  const isSelected = value === preset.path;
                  return (
                    <button
                      key={preset.path}
                      type="button"
                      onClick={() => onChange(preset.path)}
                      className={`group relative p-1 rounded border text-left flex flex-col items-center justify-center transition-colors cursor-pointer ${
                        isSelected
                          ? "border-amber-600 bg-amber-50 ring-1 ring-amber-600"
                          : "border-gray-200 hover:border-gray-400 bg-gray-50"
                      }`}
                      title={preset.name}
                    >
                      <img
                        src={preset.path}
                        alt={preset.name}
                        className="w-10 h-10 object-contain"
                        onError={(e) => {
                          e.currentTarget.style.display = "none";
                        }}
                      />
                      <span className="text-[9px] text-gray-600 truncate w-full text-center mt-1">
                        {preset.name}
                      </span>
                      {isSelected && (
                        <div className="absolute top-0.5 right-0.5 w-3.5 h-3.5 bg-amber-600 text-white rounded-full flex items-center justify-center text-[9px]">
                          <Check size={9} />
                        </div>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {activeTab === "upload" && (
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
                className={`w-full border border-dashed border-gray-300 hover:border-amber-500 rounded-lg p-4 flex flex-col items-center justify-center cursor-pointer transition-colors bg-white hover:bg-amber-50/30 ${
                  uploading ? "opacity-60 pointer-events-none" : ""
                }`}
              >
                {uploading ? (
                  <div className="flex items-center gap-2 text-amber-700 text-xs font-medium">
                    <Loader2 size={16} className="animate-spin" />
                    <span>Uploading...</span>
                  </div>
                ) : (
                  <div className="text-center">
                    <Upload size={20} className="mx-auto mb-1 text-gray-400" />
                    <p className="text-xs font-medium text-gray-700">Click to upload photo from computer</p>
                    <p className="text-[10px] text-gray-400 mt-0.5">PNG, JPG, WebP</p>
                  </div>
                )}
              </label>
            </div>
          )}

          {activeTab === "url" && (
            <div className="space-y-1.5">
              <div className="flex items-center gap-2 bg-white border border-gray-300 rounded-lg px-3 py-2 focus-within:border-amber-600 focus-within:ring-1 focus-within:ring-amber-600">
                <LinkIcon size={14} className="text-gray-400 shrink-0" />
                <input
                  type="text"
                  placeholder="https://example.com/photo.png or /assets/gen_5kva.png"
                  value={value}
                  onChange={(e) => onChange(e.target.value)}
                  className="w-full bg-transparent text-xs text-gray-900 placeholder:text-gray-400 outline-none"
                />
              </div>
            </div>
          )}

          {error && <p className="text-xs text-red-600 font-medium mt-1">{error}</p>}
          {helperText && <p className="text-[11px] text-gray-500 mt-1.5">{helperText}</p>}
        </div>
      </div>
    </div>
  );
};
