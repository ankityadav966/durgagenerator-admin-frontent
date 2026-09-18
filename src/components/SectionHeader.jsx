import { Save, Loader2, ExternalLink } from "lucide-react";
import { useContent } from "../context/ContentContext";

export const SectionHeader = ({
  title = "Edit Section",
  description = "",
  websiteRoute = "/",
  onSave,
}) => {
  const { saving } = useContent();

  return (
    <div className="bg-white border border-gray-200 rounded-xl p-5 mb-6 shadow-sm flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
      <div>
        <h1 className="text-xl sm:text-2xl font-bold text-gray-900">
          {title}
        </h1>

        {description && (
          <p className="text-gray-500 text-xs sm:text-sm mt-1">
            {description}
          </p>
        )}

        {websiteRoute && (
          <div className="mt-2 flex items-center gap-1.5 text-xs text-amber-700">
            <span>Website page:</span>
            <a
              href={`http://localhost:5173${websiteRoute}`}
              target="_blank"
              rel="noreferrer"
              className="font-medium underline hover:text-amber-800 inline-flex items-center gap-1"
            >
              {websiteRoute}
              <ExternalLink size={12} />
            </a>
          </div>
        )}
      </div>

      {onSave && (
        <div className="shrink-0">
          <button
            type="button"
            onClick={onSave}
            disabled={saving}
            className={`w-full sm:w-auto px-5 py-2.5 rounded-lg font-medium text-sm flex items-center justify-center gap-2 transition-colors cursor-pointer ${
              saving
                ? "bg-amber-400 text-white cursor-not-allowed"
                : "bg-amber-600 hover:bg-amber-700 text-white shadow-sm"
            }`}
          >
            {saving ? (
              <>
                <Loader2 size={16} className="animate-spin" />
                <span>Saving...</span>
              </>
            ) : (
              <>
                <Save size={16} />
                <span>Save Changes</span>
              </>
            )}
          </button>
        </div>
      )}
    </div>
  );
};
