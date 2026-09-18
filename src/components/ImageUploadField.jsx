import { useState, useEffect, useRef } from "react";
import {
  Upload,
  Link as LinkIcon,
  Image as ImageIcon,
  Check,
  Loader2,
  X,
  Cloud,
  RefreshCw,
  Trash2
} from "lucide-react";
import { uploadApi } from "../api/client";

export const ImageUploadField = ({
  label = "Image",
  value = "",
  onChange,
  helperText = "",
  aspect = "contain",
}) => {
  const [uploading, setUploading] = useState(false);
  const [activeTab, setActiveTab] = useState("gallery"); // gallery | upload | url
  const [error, setError] = useState("");
  const [galleryImages, setGalleryImages] = useState([]);
  const [loadingGallery, setLoadingGallery] = useState(false);
  const [deletingId, setDeletingId] = useState(null);
  const fileInputRef = useRef(null);

  const fetchGallery = async () => {
    try {
      setLoadingGallery(true);
      const res = await uploadApi.getGallery();
      if (res.success && Array.isArray(res.images)) {
        setGalleryImages(res.images);
      }
    } catch (err) {
      console.error("Failed to load Cloudinary gallery:", err);
    } finally {
      setLoadingGallery(false);
    }
  };

  useEffect(() => {
    if (activeTab === "gallery" && galleryImages.length === 0) {
      fetchGallery();
    }
  }, [activeTab]);

  const handleFileChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setUploading(true);
      setError("");
      const res = await uploadApi.uploadImage(file);
      if (res.success && res.url) {
        onChange(res.url);
        // Refresh gallery in background
        fetchGallery();
      }
    } catch (err) {
      console.error("Cloudinary upload failed:", err);
      setError(err.message || "Failed to upload image to Cloudinary");
    } finally {
      setUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  const handleDeleteFromCloudinary = async (e, publicId) => {
    e.stopPropagation();
    const confirmed = window.confirm("Delete this image from Cloudinary?");
    if (!confirmed) return;

    try {
      setDeletingId(publicId);
      await uploadApi.deleteImage(publicId);
      setGalleryImages((prev) => prev.filter((img) => img.publicId !== publicId));
      if (value && value.includes(publicId)) {
        onChange("");
      }
    } catch (err) {
      console.error("Delete error:", err);
      setError("Failed to delete image from Cloudinary");
    } finally {
      setDeletingId(null);
    }
  };

  const handleRemoveImage = () => {
    onChange("");
  };

  return (
    <div className="bg-gray-50 p-4 rounded-xl border border-gray-200">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-3">
        <label className="text-xs font-semibold text-gray-700 uppercase tracking-wider flex items-center gap-1.5">
          <ImageIcon size={14} className="text-amber-600" />
          {label}
          <span className="text-[10px] lowercase font-normal px-1.5 py-0.2 bg-amber-100 text-amber-800 rounded border border-amber-200 flex items-center gap-0.5">
            <Cloud size={10} />
            Cloudinary
          </span>
        </label>

        {/* Tab switcher */}
        <div className="flex gap-1 bg-gray-200/70 p-0.5 rounded-lg text-xs w-fit">
          <button
            type="button"
            onClick={() => setActiveTab("gallery")}
            className={`px-2.5 py-1 rounded-md transition-colors cursor-pointer ${
              activeTab === "gallery"
                ? "bg-white text-gray-900 font-semibold shadow-xs"
                : "text-gray-600 hover:text-gray-900"
            }`}
          >
            Cloud Library
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("upload")}
            className={`px-2.5 py-1 rounded-md transition-colors cursor-pointer ${
              activeTab === "upload"
                ? "bg-white text-gray-900 font-semibold shadow-xs"
                : "text-gray-600 hover:text-gray-900"
            }`}
          >
            Upload to Cloudinary
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("url")}
            className={`px-2.5 py-1 rounded-md transition-colors cursor-pointer ${
              activeTab === "url"
                ? "bg-white text-gray-900 font-semibold shadow-xs"
                : "text-gray-600 hover:text-gray-900"
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
                src={value}
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
              <span>No image selected</span>
            </div>
          )}
        </div>

        {/* Tab content */}
        <div className="flex-1 w-full min-w-0">
          {activeTab === "gallery" && (
            <div>
              <div className="flex items-center justify-between mb-2">
                <p className="text-[11px] text-gray-500">
                  Select photo from Cloudinary library:
                </p>
                <button
                  type="button"
                  onClick={fetchGallery}
                  disabled={loadingGallery}
                  className="text-[11px] text-amber-700 hover:text-amber-800 font-medium flex items-center gap-1 cursor-pointer"
                  title="Reload photos from Cloudinary"
                >
                  <RefreshCw size={11} className={loadingGallery ? "animate-spin" : ""} />
                  <span>Refresh</span>
                </button>
              </div>

              {loadingGallery ? (
                <div className="p-8 text-center bg-white rounded-lg border border-gray-200">
                  <Loader2 size={18} className="animate-spin mx-auto text-amber-600 mb-1" />
                  <span className="text-[11px] text-gray-400">Loading Cloudinary photos...</span>
                </div>
              ) : galleryImages.length === 0 ? (
                <div className="p-6 text-center bg-white rounded-lg border border-dashed border-gray-200 text-xs text-gray-400">
                  No images found on Cloudinary. Use "Upload to Cloudinary" tab to add.
                </div>
              ) : (
                <div className="grid grid-cols-3 sm:grid-cols-5 gap-2 max-h-44 overflow-y-auto p-1.5 bg-white border border-gray-200 rounded-lg">
                  {galleryImages.map((img) => {
                    const isSelected = value === img.url;
                    const fileName = img.publicId.split("/").pop();
                    const isDeleting = deletingId === img.publicId;

                    return (
                      <div
                        key={img.publicId}
                        onClick={() => onChange(img.url)}
                        className={`group relative p-1 rounded-lg border text-left flex flex-col items-center justify-center transition-all cursor-pointer ${
                          isSelected
                            ? "border-amber-600 bg-amber-50 ring-2 ring-amber-600 shadow-xs"
                            : "border-gray-200 hover:border-gray-400 bg-gray-50"
                        }`}
                        title={fileName}
                      >
                        <img
                          src={img.url}
                          alt={fileName}
                          className="w-12 h-12 object-contain"
                          loading="lazy"
                        />
                        <span className="text-[9px] text-gray-600 truncate w-full text-center mt-1 font-medium">
                          {fileName}
                        </span>

                        {isSelected && (
                          <div className="absolute top-1 left-1 w-4 h-4 bg-amber-600 text-white rounded-full flex items-center justify-center text-[10px]">
                            <Check size={10} />
                          </div>
                        )}

                        {/* Cloudinary Delete Button on hover */}
                        <button
                          type="button"
                          onClick={(e) => handleDeleteFromCloudinary(e, img.publicId)}
                          disabled={isDeleting}
                          className="absolute top-1 right-1 opacity-0 group-hover:opacity-100 p-1 bg-red-600 hover:bg-red-700 text-white rounded transition-opacity cursor-pointer shadow-xs"
                          title="Delete from Cloudinary"
                        >
                          {isDeleting ? (
                            <Loader2 size={10} className="animate-spin" />
                          ) : (
                            <Trash2 size={10} />
                          )}
                        </button>
                      </div>
                    );
                  })}
                </div>
              )}
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
                className={`w-full border-2 border-dashed border-gray-300 hover:border-amber-500 rounded-lg p-5 flex flex-col items-center justify-center cursor-pointer transition-colors bg-white hover:bg-amber-50/30 ${
                  uploading ? "opacity-60 pointer-events-none" : ""
                }`}
              >
                {uploading ? (
                  <div className="flex flex-col items-center gap-1.5 text-amber-700 text-xs font-medium">
                    <Loader2 size={20} className="animate-spin text-amber-600" />
                    <span>Uploading directly to Cloudinary...</span>
                    <span className="text-[10px] text-gray-400">Zero local storage used</span>
                  </div>
                ) : (
                  <div className="text-center">
                    <Upload size={22} className="mx-auto mb-1 text-gray-400" />
                    <p className="text-xs font-semibold text-gray-800">
                      Upload directly to Cloudinary
                    </p>
                    <p className="text-[10px] text-gray-400 mt-0.5">
                      JPG, PNG, WebP, SVG • Stored in cloud
                    </p>
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
                  placeholder="https://res.cloudinary.com/..."
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
