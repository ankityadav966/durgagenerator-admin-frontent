import { useState, useEffect, useRef } from "react";
import {
  Upload,
  Trash2,
  Copy,
  Check,
  RefreshCw,
  Cloud,
  Image as ImageIcon,
  ExternalLink,
  Loader2,
  AlertCircle
} from "lucide-react";
import { uploadApi } from "../api/client";

export const MediaManager = () => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [deletingId, setDeletingId] = useState(null);
  const [status, setStatus] = useState(null);
  const [copiedUrl, setCopiedUrl] = useState("");
  const [message, setMessage] = useState({ text: "", type: "" });
  const fileInputRef = useRef(null);

  const fetchStatus = async () => {
    try {
      const res = await uploadApi.getStatus();
      if (res.success) {
        setStatus(res);
      }
    } catch (err) {
      console.error("Status check failed:", err);
    }
  };

  const fetchGallery = async () => {
    try {
      setLoading(true);
      const res = await uploadApi.getGallery();
      if (res.success && res.images) {
        setImages(res.images);
      }
    } catch (err) {
      console.error("Failed to load Cloudinary gallery:", err);
      setMessage({ text: "Failed to load Cloudinary images", type: "error" });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStatus();
    fetchGallery();
  }, []);

  const handleUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setUploading(true);
      setMessage({ text: "", type: "" });
      const res = await uploadApi.uploadImage(file);
      if (res.success) {
        setMessage({ text: "Image successfully uploaded to Cloudinary!", type: "success" });
        await fetchGallery();
      } else {
        setMessage({ text: res.message || "Upload failed", type: "error" });
      }
    } catch (err) {
      console.error("Upload error:", err);
      setMessage({ text: err.message || "Failed to upload image to Cloudinary", type: "error" });
    } finally {
      setUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  const handleDelete = async (publicId) => {
    const confirmed = window.confirm("Are you sure you want to permanently delete this image from Cloudinary?");
    if (!confirmed) return;

    try {
      setDeletingId(publicId);
      setMessage({ text: "", type: "" });
      const res = await uploadApi.deleteImage(publicId);
      if (res.success) {
        setMessage({ text: "Image deleted from Cloudinary successfully", type: "success" });
        setImages((prev) => prev.filter((img) => img.publicId !== publicId));
      } else {
        setMessage({ text: res.message || "Delete failed", type: "error" });
      }
    } catch (err) {
      console.error("Delete error:", err);
      setMessage({ text: err.message || "Failed to delete image from Cloudinary", type: "error" });
    } finally {
      setDeletingId(null);
    }
  };

  const handleCopy = (url) => {
    navigator.clipboard.writeText(url);
    setCopiedUrl(url);
    setTimeout(() => setCopiedUrl(""), 2500);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-4 border-b border-gray-200">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-bold text-gray-900">Cloudinary Media Library</h1>
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
              <Cloud size={12} />
              100% Cloud Storage
            </span>
          </div>
          <p className="text-xs text-gray-500 mt-1">
            All images are stored, served and managed directly on Cloudinary ({status?.folder || "durga-generators"}).
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={fetchGallery}
            disabled={loading}
            className="px-3 py-2 bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 text-xs font-medium rounded-lg flex items-center gap-1.5 transition-colors cursor-pointer"
            title="Refresh list from Cloudinary"
          >
            <RefreshCw size={14} className={loading ? "animate-spin" : ""} />
            <span>Refresh</span>
          </button>

          <input
            type="file"
            ref={fileInputRef}
            onChange={handleUpload}
            accept="image/*"
            className="hidden"
            id="cloudinary-media-upload"
          />
          <label
            htmlFor="cloudinary-media-upload"
            className={`px-4 py-2 bg-amber-600 hover:bg-amber-700 text-white text-xs font-semibold rounded-lg flex items-center gap-1.5 transition-colors cursor-pointer shadow-sm ${
              uploading ? "opacity-60 pointer-events-none" : ""
            }`}
          >
            {uploading ? (
              <>
                <Loader2 size={14} className="animate-spin" />
                <span>Uploading to Cloudinary...</span>
              </>
            ) : (
              <>
                <Upload size={14} />
                <span>Upload to Cloudinary</span>
              </>
            )}
          </label>
        </div>
      </div>

      {/* Cloudinary Status Bar */}
      <div className="bg-white p-4 rounded-xl border border-gray-200 flex flex-wrap items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-6">
          <div>
            <span className="text-gray-400 block text-[10px] uppercase font-bold">Cloud Service</span>
            <span className="font-semibold text-gray-900">Cloudinary (Active)</span>
          </div>
          <div>
            <span className="text-gray-400 block text-[10px] uppercase font-bold">Cloud Name</span>
            <span className="font-mono text-gray-900">{status?.cloudName || "dswm5fwef"}</span>
          </div>
          <div>
            <span className="text-gray-400 block text-[10px] uppercase font-bold">Folder</span>
            <span className="font-mono text-gray-900">{status?.folder || "durga-generators"}</span>
          </div>
          <div>
            <span className="text-gray-400 block text-[10px] uppercase font-bold">Total Assets</span>
            <span className="font-semibold text-amber-600">{images.length} photos</span>
          </div>
        </div>
      </div>

      {/* Alert message */}
      {message.text && (
        <div
          className={`p-3 rounded-lg text-xs font-medium flex items-center justify-between ${
            message.type === "error"
              ? "bg-red-50 text-red-700 border border-red-200"
              : "bg-emerald-50 text-emerald-700 border border-emerald-200"
          }`}
        >
          <span>{message.text}</span>
          <button
            type="button"
            onClick={() => setMessage({ text: "", type: "" })}
            className="text-gray-400 hover:text-gray-700 font-bold ml-4 cursor-pointer"
          >
            ✕
          </button>
        </div>
      )}

      {/* Media Grid */}
      {loading ? (
        <div className="bg-white border border-gray-200 rounded-xl p-12 text-center">
          <Loader2 size={28} className="animate-spin mx-auto text-amber-600 mb-2" />
          <p className="text-xs text-gray-500 font-medium">Fetching photos from Cloudinary...</p>
        </div>
      ) : images.length === 0 ? (
        <div className="bg-white border border-dashed border-gray-300 rounded-xl p-12 text-center">
          <ImageIcon size={36} className="mx-auto text-gray-300 mb-2" />
          <p className="text-sm font-semibold text-gray-700">No photos in Cloudinary folder</p>
          <p className="text-xs text-gray-400 mt-1">Upload an image to get started.</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {images.map((img) => {
            const fileName = img.publicId.split("/").pop();
            const isDeleting = deletingId === img.publicId;

            return (
              <div
                key={img.publicId}
                className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-xs hover:shadow-md transition-shadow flex flex-col group"
              >
                {/* Image Container */}
                <div className="relative aspect-square bg-gray-50 flex items-center justify-center p-2 border-b border-gray-100 overflow-hidden">
                  <img
                    src={img.url}
                    alt={fileName}
                    className="w-full h-full object-contain"
                    loading="lazy"
                  />
                  {img.format && (
                    <span className="absolute top-2 left-2 px-1.5 py-0.5 rounded text-[10px] font-bold uppercase bg-black/60 text-white">
                      {img.format}
                    </span>
                  )}

                  {/* Hover Actions */}
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2 p-2">
                    <a
                      href={img.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-1.5 bg-white text-gray-800 rounded-lg hover:bg-gray-100 transition-colors"
                      title="View original"
                    >
                      <ExternalLink size={14} />
                    </a>
                    <button
                      type="button"
                      onClick={() => handleCopy(img.url)}
                      className="p-1.5 bg-white text-gray-800 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer"
                      title="Copy Cloudinary URL"
                    >
                      {copiedUrl === img.url ? <Check size={14} className="text-emerald-600" /> : <Copy size={14} />}
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDelete(img.publicId)}
                      disabled={isDeleting}
                      className="p-1.5 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors cursor-pointer"
                      title="Delete from Cloudinary"
                    >
                      {isDeleting ? <Loader2 size={14} className="animate-spin" /> : <Trash2 size={14} />}
                    </button>
                  </div>
                </div>

                {/* Info Bar */}
                <div className="p-2.5 flex-1 flex flex-col justify-between text-left">
                  <div>
                    <p className="text-xs font-semibold text-gray-800 truncate" title={fileName}>
                      {fileName}
                    </p>
                    <p className="text-[10px] text-gray-400 mt-0.5">
                      {img.width && img.height ? `${img.width}×${img.height}px` : "Image"}
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={() => handleCopy(img.url)}
                    className="mt-2 w-full py-1 px-2 rounded bg-gray-100 hover:bg-gray-200 text-gray-700 text-[10px] font-medium flex items-center justify-center gap-1 transition-colors cursor-pointer"
                  >
                    {copiedUrl === img.url ? (
                      <>
                        <Check size={11} className="text-emerald-600" />
                        <span className="text-emerald-700 font-semibold">URL Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy size={11} />
                        <span>Copy Cloudinary URL</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
