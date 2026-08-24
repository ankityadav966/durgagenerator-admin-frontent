import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { ShieldCheck, Lock, User, Loader2, ArrowRight, Sparkles } from "lucide-react";

export const Login = () => {
  const [username, setUsername] = useState("admin");
  const [password, setPassword] = useState("admin123");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await login(username, password);
    } catch (err) {
      setError(err.message || "Failed to login. Please check credentials.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#07162b] text-[#e8e4db] flex items-center justify-center p-4 relative overflow-hidden font-sans">
      {/* Cinematic gold atmosphere */}
      <div className="absolute -top-40 -left-40 w-96 h-96 bg-yellow-500/15 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-yellow-600/10 rounded-full blur-[140px] pointer-events-none"></div>

      <div className="max-w-md w-full relative z-10">
        {/* Brand Card */}
        <div className="bg-[#0e1d33] border border-yellow-700/30 rounded-3xl p-8 sm:p-10 shadow-2xl relative">
          <div className="absolute top-0 right-0 w-24 h-24 bg-yellow-500/10 rounded-bl-full pointer-events-none"></div>

          {/* Logo Header */}
          <div className="text-center mb-8">
            <div className="w-16 h-16 rounded-2xl bg-yellow-500/20 border border-yellow-500/40 flex items-center justify-center mx-auto text-yellow-400 font-bold font-serif text-2xl shadow-[0_0_20px_rgba(234,179,8,0.25)] mb-4">
              DG
            </div>
            <h1 className="text-3xl font-bold font-serif text-white tracking-tight">
              Durga Generator Rent
            </h1>
            <p className="text-xs text-yellow-500 font-semibold tracking-widest uppercase mt-1">
              Admin Portal Login
            </p>
          </div>

          {/* Error alert */}
          {error && (
            <div className="mb-6 p-4 rounded-xl bg-red-950/70 border border-red-800/50 text-red-300 text-xs font-medium animate-shake">
              {error}
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-xs font-semibold text-gray-300 uppercase tracking-wider mb-2">
                Admin Username
              </label>
              <div className="flex items-center gap-3 bg-[#07162b] border border-yellow-900/40 rounded-2xl px-4 py-3.5 focus-within:border-yellow-500 focus-within:ring-1 focus-within:ring-yellow-500 transition-all">
                <User size={18} className="text-yellow-600 shrink-0" />
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="admin"
                  required
                  className="w-full bg-transparent text-sm text-white placeholder:text-gray-600 outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-300 uppercase tracking-wider mb-2">
                Password
              </label>
              <div className="flex items-center gap-3 bg-[#07162b] border border-yellow-900/40 rounded-2xl px-4 py-3.5 focus-within:border-yellow-500 focus-within:ring-1 focus-within:ring-yellow-500 transition-all">
                <Lock size={18} className="text-yellow-600 shrink-0" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  className="w-full bg-transparent text-sm text-white placeholder:text-gray-600 outline-none"
                />
              </div>
            </div>

            {/* Quick Demo Info */}
            <div className="p-3 bg-[#07162b]/60 rounded-xl border border-yellow-900/30 text-[11px] text-gray-400 space-y-1">
              <p className="text-yellow-400/90 font-medium flex items-center gap-1.5">
                <Sparkles size={12} /> Default Credentials:
              </p>
              <p className="font-mono text-gray-300">Username: <span className="text-yellow-300">admin</span> | Password: <span className="text-yellow-300">admin123</span></p>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-yellow-500 hover:bg-yellow-400 text-black font-bold py-4 rounded-2xl transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] shadow-lg shadow-yellow-500/20 flex items-center justify-center gap-2 cursor-pointer mt-2 text-sm"
            >
              {loading ? (
                <>
                  <Loader2 size={18} className="animate-spin" />
                  <span>Verifying Credentials...</span>
                </>
              ) : (
                <>
                  <span>Sign In to Dashboard</span>
                  <ArrowRight size={18} />
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
