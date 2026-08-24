import { Save, Loader2, ExternalLink, Sparkles } from "lucide-react";
import { useContent } from "../context/ContentContext";

export const SectionHeader = ({
  badge = "SECTION MANAGER",
  title = "Edit Section",
  description = "Make changes to this section and click Save Changes to publish instantly to the live website.",
  websiteRoute = "/",
  onSave,
  hasChanges = false,
}) => {
  const { saving } = useContent();

  return (
    <div className="bg-[#0f2139] border border-yellow-700/30 rounded-3xl p-6 lg:p-8 shadow-xl relative overflow-hidden mb-8">
      {/* Subtle gold gradient aura */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-yellow-500/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 relative z-10">
        <div>
          <div className="inline-flex items-center gap-2 bg-[#1b3459] px-4 py-1.5 rounded-full text-yellow-400 text-xs font-semibold tracking-wider border border-yellow-600/30 shadow-sm mb-3">
            <Sparkles size={14} className="text-yellow-400" />
            <span>{badge}</span>
          </div>

          <h1 className="text-3xl lg:text-4xl font-bold font-serif text-white tracking-tight drop-shadow-sm">
            {title}
          </h1>

          <p className="text-gray-300 text-sm mt-2 max-w-2xl leading-relaxed italic">
            {description}
          </p>

          {websiteRoute && (
            <div className="mt-3 flex items-center gap-2 text-xs text-yellow-500/90 font-mono">
              <span>📍 Changes apply to live route:</span>
              <a
                href={websiteRoute}
                target="_blank"
                rel="noreferrer"
                className="underline hover:text-yellow-300 inline-flex items-center gap-1"
              >
                {websiteRoute}
                <ExternalLink size={12} />
              </a>
            </div>
          )}
        </div>

        {onSave && (
          <div className="shrink-0 flex items-center gap-3">
            <button
              onClick={onSave}
              disabled={saving}
              className={`px-8 py-3.5 rounded-2xl font-bold text-sm flex items-center gap-2 shadow-lg transition-all duration-300 cursor-pointer ${
                saving
                  ? "bg-yellow-700/50 text-yellow-200 cursor-not-allowed"
                  : "bg-yellow-500 hover:bg-yellow-400 text-black hover:scale-105 shadow-yellow-500/20 active:scale-95"
              }`}
            >
              {saving ? (
                <>
                  <Loader2 size={18} className="animate-spin" />
                  <span>Saving to Live Site...</span>
                </>
              ) : (
                <>
                  <Save size={18} />
                  <span>Save Changes</span>
                </>
              )}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
