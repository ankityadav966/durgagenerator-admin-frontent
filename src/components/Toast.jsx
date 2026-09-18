import { useContent } from "../context/ContentContext";
import { CheckCircle2, AlertCircle } from "lucide-react";

export const Toast = () => {
  const { toast } = useContent();

  if (!toast) return null;

  const isSuccess = toast.type === "success";

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <div
        className={`flex items-center gap-2.5 px-4 py-3 rounded-lg shadow-lg border text-xs font-medium ${
          isSuccess
            ? "bg-white text-emerald-800 border-emerald-300 shadow-emerald-900/10"
            : "bg-white text-red-800 border-red-300 shadow-red-900/10"
        }`}
      >
        {isSuccess ? (
          <CheckCircle2 className="text-emerald-600 shrink-0" size={16} />
        ) : (
          <AlertCircle className="text-red-600 shrink-0" size={16} />
        )}
        <span>{toast.message}</span>
      </div>
    </div>
  );
};
