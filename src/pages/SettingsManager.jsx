import { useState } from "react";
import { SectionHeader } from "../components/SectionHeader";
import { useAuth } from "../context/AuthContext";
import { useContent } from "../context/ContentContext";
import { authApi } from "../api/client";
import { Lock, Download, ShieldCheck, Check, AlertCircle, KeyRound, Loader2 } from "lucide-react";

export const SettingsManager = () => {
  const { user } = useAuth();
  const { content, showToast } = useContent();

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [newUsername, setNewUsername] = useState(user?.username || "admin");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    setMessage(null);
    setLoading(true);

    try {
      const res = await authApi.changePassword({
        currentPassword,
        newPassword: newPassword || undefined,
        newUsername: newUsername || undefined,
      });

      if (res.success) {
        setMessage({ type: "success", text: "Admin credentials updated successfully!" });
        setCurrentPassword("");
        setNewPassword("");
        showToast("Admin credentials updated!", "success");
      }
    } catch (err) {
      setMessage({ type: "error", text: err.message || "Failed to update password" });
    } finally {
      setLoading(false);
    }
  };

  const handleExportJson = () => {
    if (!content) return;
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(content, null, 2));
    const downloadAnchor = document.createElement("a");
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `durga_generator_content_backup_${Date.now()}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
    showToast("Content backup downloaded successfully!");
  };

  return (
    <div className="space-y-8 pb-12">
      <SectionHeader
        badge="ADMIN SECURITY & SYSTEM"
        title="Admin Settings & Security"
        description="Update your administrator credentials, secure your portal with a new password, and download full backup copies of your website content."
        websiteRoute="/"
      />

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Change Password */}
        <div className="bg-[#0c1a2d] border border-yellow-700/30 rounded-3xl p-6 lg:p-8 shadow-xl space-y-6">
          <h3 className="font-serif font-bold text-lg text-white pb-3 border-b border-yellow-900/30 flex items-center gap-2">
            <KeyRound className="text-yellow-500" size={18} />
            <span>Admin Authentication Details</span>
          </h3>

          {message && (
            <div
              className={`p-4 rounded-xl text-xs font-semibold flex items-center gap-2 ${
                message.type === "success"
                  ? "bg-green-950/70 text-green-300 border border-green-800/50"
                  : "bg-red-950/70 text-red-300 border border-red-800/50"
              }`}
            >
              {message.type === "success" ? <Check size={16} /> : <AlertCircle size={16} />}
              <span>{message.text}</span>
            </div>
          )}

          <form onSubmit={handlePasswordSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-gray-300 uppercase tracking-wider mb-1.5">
                Admin Username
              </label>
              <input
                type="text"
                value={newUsername}
                onChange={(e) => setNewUsername(e.target.value)}
                required
                className="w-full bg-[#07162b] border border-yellow-900/40 rounded-xl px-4 py-2.5 text-xs text-white focus:border-yellow-500 outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-yellow-500 uppercase tracking-wider mb-1.5">
                Current Password (Required)
              </label>
              <input
                type="password"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                required
                placeholder="Enter current password"
                className="w-full bg-[#07162b] border border-yellow-900/40 rounded-xl px-4 py-2.5 text-xs text-white focus:border-yellow-500 outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-300 uppercase tracking-wider mb-1.5">
                New Password (Optional, leave blank if keeping same)
              </label>
              <input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="Minimum 5 characters"
                className="w-full bg-[#07162b] border border-yellow-900/40 rounded-xl px-4 py-2.5 text-xs text-white focus:border-yellow-500 outline-none"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full mt-2 bg-yellow-500 hover:bg-yellow-400 text-black font-bold py-3 rounded-xl text-xs flex items-center justify-center gap-2 transition-all cursor-pointer shadow"
            >
              {loading ? <Loader2 size={16} className="animate-spin" /> : <Lock size={16} />}
              <span>Update Credentials</span>
            </button>
          </form>
        </div>

        {/* Backup & System Info */}
        <div className="bg-[#0c1a2d] border border-yellow-700/30 rounded-3xl p-6 lg:p-8 shadow-xl space-y-6 flex flex-col justify-between">
          <div>
            <h3 className="font-serif font-bold text-lg text-white pb-3 border-b border-yellow-900/30 flex items-center gap-2">
              <ShieldCheck className="text-yellow-500" size={18} />
              <span>Data Backup & Export</span>
            </h3>

            <p className="text-gray-300 text-xs mt-4 leading-relaxed italic">
              You can download a complete backup of all generator cards, prices, uploaded images list, customer testimonials, and contact settings as a clean JSON file at any time.
            </p>

            <div className="mt-6 p-4 rounded-2xl bg-[#07162b] border border-yellow-900/30 space-y-2 text-xs text-gray-300">
              <p className="flex items-center justify-between">
                <span className="text-gray-400">Database Format:</span>
                <span className="font-mono text-yellow-400">JSON Flat File</span>
              </p>
              <p className="flex items-center justify-between">
                <span className="text-gray-400">Image Storage:</span>
                <span className="font-mono text-yellow-400">/uploads folder</span>
              </p>
              <p className="flex items-center justify-between">
                <span className="text-gray-400">Authentication:</span>
                <span className="font-mono text-yellow-400">JWT Token (7-day validity)</span>
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={handleExportJson}
            className="w-full bg-[#132845] hover:bg-yellow-500 hover:text-black text-yellow-300 border border-yellow-600/40 font-bold py-3.5 rounded-xl text-xs flex items-center justify-center gap-2 transition-all cursor-pointer shadow"
          >
            <Download size={16} />
            <span>Download Full Content Backup (.json)</span>
          </button>
        </div>
      </div>
    </div>
  );
};
