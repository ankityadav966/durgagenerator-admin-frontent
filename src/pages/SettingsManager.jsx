import { useState } from "react";
import { SectionHeader } from "../components/SectionHeader";
import { useAuth } from "../context/AuthContext";
import { useContent } from "../context/ContentContext";
import { authApi } from "../api/client";
import { Lock, Download, Check, AlertCircle, Loader2 } from "lucide-react";

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
    downloadAnchor.setAttribute("download", `durga_generator_backup_${Date.now()}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
    showToast("Content backup downloaded!");
  };

  return (
    <div className="space-y-6 pb-12">
      <SectionHeader
        title="Admin Settings"
        description="Update admin username and password, or download website data backup."
        websiteRoute="/"
      />

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Change Password */}
        <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm space-y-4">
          <h3 className="font-bold text-sm text-gray-900 pb-2 border-b border-gray-200">
            Admin Login Credentials
          </h3>

          {message && (
            <div
              className={`p-3 rounded-lg text-xs font-medium flex items-center gap-2 ${
                message.type === "success"
                  ? "bg-green-50 text-green-800 border border-green-200"
                  : "bg-red-50 text-red-800 border border-red-200"
              }`}
            >
              {message.type === "success" ? <Check size={14} /> : <AlertCircle size={14} />}
              <span>{message.text}</span>
            </div>
          )}

          <form onSubmit={handlePasswordSubmit} className="space-y-3.5">
            <div>
              <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1">
                Admin Username
              </label>
              <input
                type="text"
                value={newUsername}
                onChange={(e) => setNewUsername(e.target.value)}
                required
                className="w-full bg-white border border-gray-300 rounded-lg px-3 py-2 text-xs text-gray-900 focus:border-amber-600 outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1">
                Current Password (Required)
              </label>
              <input
                type="password"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                required
                placeholder="Current password"
                className="w-full bg-white border border-gray-300 rounded-lg px-3 py-2 text-xs text-gray-900 focus:border-amber-600 outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1">
                New Password (Optional)
              </label>
              <input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="Leave blank to keep unchanged"
                className="w-full bg-white border border-gray-300 rounded-lg px-3 py-2 text-xs text-gray-900 focus:border-amber-600 outline-none"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full mt-2 bg-amber-600 hover:bg-amber-700 text-white font-medium py-2 rounded-lg text-xs flex items-center justify-center gap-1.5 transition-colors cursor-pointer shadow-sm"
            >
              {loading ? <Loader2 size={15} className="animate-spin" /> : <Lock size={15} />}
              <span>Update Credentials</span>
            </button>
          </form>
        </div>

        {/* Backup */}
        <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm space-y-4 flex flex-col justify-between">
          <div>
            <h3 className="font-bold text-sm text-gray-900 pb-2 border-b border-gray-200">
              Data Backup & Export
            </h3>

            <p className="text-gray-600 text-xs mt-3 leading-relaxed">
              Download a complete JSON backup of all generator listings, prices, hero slides, reviews, and settings.
            </p>

            <div className="mt-4 p-3 rounded-lg bg-gray-50 border border-gray-200 space-y-1.5 text-xs text-gray-600">
              <p className="flex items-center justify-between">
                <span>Storage format:</span>
                <span className="font-medium text-gray-900">JSON</span>
              </p>
              <p className="flex items-center justify-between">
                <span>Uploads directory:</span>
                <span className="font-medium text-gray-900">/uploads & /assets</span>
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={handleExportJson}
            className="w-full bg-gray-100 hover:bg-gray-200 text-gray-800 border border-gray-300 font-medium py-2.5 rounded-lg text-xs flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
          >
            <Download size={15} />
            <span>Download Content Backup (.json)</span>
          </button>
        </div>
      </div>
    </div>
  );
};
