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
  Trash2,
  FolderOpen
} from "lucide-react";
import { uploadApi } from "../api/client";

export const ImageUploadField = ({
  label = "Image",
  value = "",
  onChange,
  helperText = "",
  aspect = "contain", // "contain" | "cover" | "avatar"
  compact = false,
}) => {
  const [uploading, setUploading] = useState(false);
  const [activeTab, setActiveTab] = useState("gallery"); // gallery | upload | url
  const [error, setError] = useState("");
  const [galleryImages, setGalleryImages] = useState([]);
  const [loadingGallery, setLoadingGallery] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
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
    if ((activeTab === "gallery" || isModalOpen) && galleryImages.length === 0) {
      fetchGallery();
    }
  }, [activeTab, isModalOpen]);

  const handleFileChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setUploading(true);
      setError("");
      const res = await uploadApi.uploadImage(file);
      if (res.success && res.url) {
        onChange(res.url);
        fetchGallery();
        setIsModalOpen(false);
      }
    } catch (err) {
      console.error("Cloudinary upload failed:", err);
      setError(err.message || "Failed to upload image to Cloudinary");
    } finally {
      setUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  const handleRemoveImage = () => {
    onChange("");
  };

  // Compact Mode (Ideal for Testimonials Avatars, table rows, and narrow cards)
  if (compact || aspect === "avatar") {
    return (
      <div className="bg-gray-50/80 p-3.5 rounded-xl border border-gray-200">
        <label className="block text-[11px] font-bold text-gray-700 uppercase tracking-wider mb-2.5 flex items-center justify-between">
          <span className="flex items-center gap-1.5">
            <ImageIcon size={13} className="text-amber-600" />
            {label}
          </span>
          <span className="text-[9px] lowercase font-normal px-1.5 py-0.2 bg-amber-100/70 text-amber-800 rounded border border-amber-200 flex items-center gap-0.5">
            <Cloud size={9} />
            Cloudinary
          </span>
        </label>

        <div className="flex items-center gap-3.5">
          {/* Avatar Preview */}
          <div className="relative w-14 h-14 rounded-full overflow-hidden shrink-0 border-2 border-amber-500/30 bg-white shadow-xs flex items-center justify-center">
            {value ? (
              <img
                src={value}
                alt="Avatar"
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.currentTarget.style.display = "none";
                  const fallback = e.currentTarget.parentElement?.querySelector(".avatar-fallback");
                  if (fallback) fallback.classList.remove("hidden");
                }}
              />
            ) : null}
            <div
              className={`avatar-fallback ${
                value ? "hidden" : ""
              } text-center text-gray-400 text-[10px] font-bold`}
            >
              <ImageIcon size={18} className="mx-auto text-gray-300" />
            </div>

            {value && (
              <button
                type="button"
                onClick={handleRemoveImage}
                className="absolute inset-0 bg-black/40 text-white opacity-0 hover:opacity-100 flex items-center justify-center transition-opacity cursor-pointer"
                title="Remove photo"
              >
                <X size={14} />
              </button>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex-1 flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={() => {
                setIsModalOpen(true);
                fetchGallery();
              }}
              className="px-3 py-1.5 bg-white hover:bg-gray-100 text-gray-800 border border-gray-300 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer shadow-2xs"
            >
              <FolderOpen size={13} className="text-amber-600" />
              <span>Choose Photo</span>
            </button>

            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              accept="image/*"
              className="hidden"
              id={`compact-upload-${label.replace(/\s+/g, "-")}`}
            />
            <label
              htmlFor={`compact-upload-${label.replace(/\s+/g, "-")}`}
              className={`px-3 py-1.5 bg-amber-50 hover:bg-amber-100 text-amber-800 border border-amber-200 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer shadow-2xs ${
                uploading ? "opacity-60 pointer-events-none" : ""
              }`}
            >
              {uploading ? (
                <>
                  <Loader2 size={13} className="animate-spin text-amber-600" />
                  <span>Uploading...</span>
                </>
              ) : (
                <>
                  <Upload size={13} className="text-amber-700" />
                  <span>Upload</span>
                </>
              )}
            </label>

            {value && (
              <button
                type="button"
                onClick={handleRemoveImage}
                className="text-xs text-red-600 hover:text-red-700 font-medium px-1.5 py-1 cursor-pointer"
              >
                Clear
              </button>
            )}
          </div>
        </div>

        {/* Modal for choosing from Cloudinary Library */}
        {isModalOpen && (
          <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[85vh] flex flex-col shadow-2xl border border-gray-200 overflow-hidden animate-in zoom-in-95 duration-150">
              <div className="p-4 border-b border-gray-200 flex items-center justify-between bg-gray-50">
                <div className="flex items-center gap-2">
                  <FolderOpen size={18} className="text-amber-600" />
                  <h3 className="text-sm font-bold text-gray-900">Select Cloudinary Photo</h3>
                  <span className="text-[10px] px-2 py-0.5 bg-amber-100 text-amber-800 rounded-full font-medium">
                    {galleryImages.length} Available
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="p-1 rounded-lg text-gray-400 hover:text-gray-700 hover:bg-gray-200 cursor-pointer"
                >
                  <X size={18} />
                </button>
              </div>

              <div className="p-4 overflow-y-auto flex-1">
                {loadingGallery ? (
                  <div className="p-12 text-center">
                    <Loader2 size={24} className="animate-spin mx-auto text-amber-600 mb-2" />
                    <p className="text-xs text-gray-500">Loading photos from Cloudinary...</p>
                  </div>
                ) : galleryImages.length === 0 ? (
                  <div className="p-10 text-center text-gray-400 text-xs">
                    No photos found in Cloudinary folder.
                  </div>
                ) : (
                  <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-3">
                    {galleryImages.map((img) => {
                      const isSelected = value === img.url;
                      const fileName = img.publicId.split("/").pop();

                      return (
                        <div
                          key={img.publicId}
                          onClick={() => {
                            onChange(img.url);
                            setIsModalOpen(false);
                          }}
                          className={`relative group p-1.5 rounded-xl border flex flex-col items-center justify-center transition-all cursor-pointer ${
                            isSelected
                              ? "border-amber-600 bg-amber-50 ring-2 ring-amber-600 shadow-sm"
                              : "border-gray-200 hover:border-amber-500 bg-gray-50 hover:bg-amber-50/20"
                          }`}
                        >
                          <div className="w-16 h-16 sm:w-20 sm:h-20 flex items-center justify-center overflow-hidden rounded-lg bg-white">
                            <img
                              src={img.url}
                              alt={fileName}
                              className="w-full h-full object-cover"
                              loading="lazy"
                            />
                          </div>
                          <span className="text-[10px] text-gray-700 truncate w-full text-center mt-1.5 font-medium px-1">
                            {fileName}
                          </span>
                          {isSelected && (
                            <div className="absolute top-1 right-1 w-5 h-5 bg-amber-600 text-white rounded-full flex items-center justify-center text-[11px] shadow-xs">
                              <Check size={12} />
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>

              <div className="p-3 border-t border-gray-200 bg-gray-50 flex items-center justify-between">
                <button
                  type="button"
                  onClick={fetchGallery}
                  disabled={loadingGallery}
                  className="text-xs text-amber-700 hover:text-amber-800 font-semibold flex items-center gap-1 cursor-pointer"
                >
                  <RefreshCw size={12} className={loadingGallery ? "animate-spin" : ""} />
                  <span>Refresh List</span>
                </button>
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-1.5 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded-lg text-xs font-semibold cursor-pointer"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}

        {error && <p className="text-xs text-red-600 font-medium mt-1">{error}</p>}
        {helperText && <p className="text-[10px] text-gray-400 mt-1">{helperText}</p>}
      </div>
    );
  }

  // Standard Mode (Used in Generators catalog, Hero banner, About page)
  return (
    <div className="bg-gray-50 p-3.5 sm:p-4 rounded-xl border border-gray-200">
      {/* Header with compact non-wrapping tabs */}
      <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
        <label className="text-xs font-bold text-gray-700 uppercase tracking-wider flex items-center gap-1.5">
          <ImageIcon size={14} className="text-amber-600" />
          <span>{label}</span>
        </label>

        {/* Compact Tab Switcher (Never overflows) */}
        <div className="flex bg-gray-200/80 p-0.5 rounded-lg text-xs">
          <button
            type="button"
            onClick={() => setActiveTab("gallery")}
            className={`px-2.5 py-1 rounded-md transition-colors cursor-pointer font-medium text-[11px] flex items-center gap-1 ${
              activeTab === "gallery"
                ? "bg-white text-gray-900 font-bold shadow-xs"
                : "text-gray-600 hover:text-gray-900"
            }`}
          >
            <FolderOpen size={12} />
            <span>Library</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("upload")}
            className={`px-2.5 py-1 rounded-md transition-colors cursor-pointer font-medium text-[11px] flex items-center gap-1 ${
              activeTab === "upload"
                ? "bg-white text-gray-900 font-bold shadow-xs"
                : "text-gray-600 hover:text-gray-900"
            }`}
          >
            <Upload size={12} />
            <span>Upload</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("url")}
            className={`px-2.5 py-1 rounded-md transition-colors cursor-pointer font-medium text-[11px] flex items-center gap-1 ${
              activeTab === "url"
                ? "bg-white text-gray-900 font-bold shadow-xs"
                : "text-gray-600 hover:text-gray-900"
            }`}
          >
            <LinkIcon size={12} />
            <span>URL</span>
          </button>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-3.5 items-start">
        {/* Preview Box */}
        <div className="relative w-28 h-28 sm:w-32 sm:h-32 shrink-0 bg-white rounded-lg border border-gray-300 overflow-hidden flex items-center justify-center shadow-2xs mx-auto sm:mx-0">
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
              <div className="img-error-fallback hidden text-center p-2 text-gray-400 text-[10px]">
                <p>Failed to load</p>
                <p className="truncate max-w-[90px] text-[9px] text-gray-400">{value}</p>
              </div>
              <button
                type="button"
                onClick={handleRemoveImage}
                className="absolute top-1 right-1 bg-red-600 hover:bg-red-700 text-white p-1 rounded-md transition-colors cursor-pointer shadow-xs"
                title="Remove image"
              >
                <X size={12} />
              </button>
            </>
          ) : (
            <div className="text-center p-2 text-gray-400 text-xs">
              <ImageIcon size={22} className="mx-auto mb-1 text-gray-300" />
              <span className="text-[11px]">No image</span>
            </div>
          )}
        </div>

        {/* Tab content */}
        <div className="flex-1 w-full min-w-0">
          {activeTab === "gallery" && (
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-[10px] text-gray-500 font-medium">
                  Click any photo to select:
                </span>
                <button
                  type="button"
                  onClick={fetchGallery}
                  disabled={loadingGallery}
                  className="text-[10px] text-amber-700 hover:text-amber-800 font-semibold flex items-center gap-1 cursor-pointer"
                >
                  <RefreshCw size={10} className={loadingGallery ? "animate-spin" : ""} />
                  <span>Refresh</span>
                </button>
              </div>

              {loadingGallery ? (
                <div className="p-6 text-center bg-white rounded-lg border border-gray-200">
                  <Loader2 size={16} className="animate-spin mx-auto text-amber-600 mb-1" />
                  <span className="text-[10px] text-gray-400">Loading Cloudinary photos...</span>
                </div>
              ) : galleryImages.length === 0 ? (
                <div className="p-4 text-center bg-white rounded-lg border border-dashed border-gray-200 text-xs text-gray-400">
                  No photos found.
                </div>
              ) : (
                <div className="grid grid-cols-3 sm:grid-cols-4 gap-2 max-h-36 overflow-y-auto p-1.5 bg-white border border-gray-200 rounded-lg">
                  {galleryImages.map((img) => {
                    const isSelected = value === img.url;
                    const fileName = img.publicId.split("/").pop();

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
                        <div className="w-12 h-12 flex items-center justify-center overflow-hidden">
                          <img
                            src={img.url}
                            alt={fileName}
                            className="w-full h-full object-contain"
                            loading="lazy"
                          />
                        </div>
                        <span className="text-[9px] text-gray-600 truncate w-full text-center mt-0.5 font-medium">
                          {fileName}
                        </span>

                        {isSelected && (
                          <div className="absolute top-1 left-1 w-3.5 h-3.5 bg-amber-600 text-white rounded-full flex items-center justify-center text-[9px]">
                            <Check size={9} />
                          </div>
                        )}
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
                className={`w-full border-2 border-dashed border-gray-300 hover:border-amber-500 rounded-lg p-3.5 flex flex-col items-center justify-center cursor-pointer transition-colors bg-white hover:bg-amber-50/30 ${
                  uploading ? "opacity-60 pointer-events-none" : ""
                }`}
              >
                {uploading ? (
                  <div className="flex flex-col items-center gap-1 text-amber-700 text-xs font-medium">
                    <Loader2 size={18} className="animate-spin text-amber-600" />
                    <span className="text-[11px]">Uploading to Cloudinary...</span>
                  </div>
                ) : (
                  <div className="text-center">
                    <Upload size={18} className="mx-auto mb-1 text-gray-400" />
                    <p className="text-xs font-bold text-gray-800">
                      Upload to Cloudinary
                    </p>
                    <p className="text-[9px] text-gray-400 mt-0.5">
                      JPG, PNG, WebP
                    </p>
                  </div>
                )}
              </label>
            </div>
          )}

          {activeTab === "url" && (
            <div className="space-y-1">
              <div className="flex items-center gap-2 bg-white border border-gray-300 rounded-lg px-2.5 py-1.5 focus-within:border-amber-600 focus-within:ring-1 focus-within:ring-amber-600">
                <LinkIcon size={13} className="text-gray-400 shrink-0" />
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
          {helperText && <p className="text-[10px] text-gray-400 mt-1">{helperText}</p>}
        </div>
      </div>
    </div>
  );
};
