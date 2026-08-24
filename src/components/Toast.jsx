import { useContent } from "../context/ContentContext";
import { CheckCircle2, AlertCircle, X } from "lucide-react";

export const Toast = () => {
  const { toast } = useContent();

  if (!toast) return null;

  const isSuccess = toast.type === "success";

  return (
    <div className="fixed bottom-6 right-6 z-50 animate-bounce">
      <div
        className={`flex items-center gap-3 px-5 py-4 rounded-xl shadow-2xl border text-sm font-medium ${
          isSuccess
            ? "bg-[#132d20] text-green-300 border-green-500/40 shadow-green-950/50"
            : "bg-[#331313] text-red-300 border-red-500/40 shadow-red-950/50"
        }`}
      >
        {isSuccess ? <CheckCircle2 className="text-green-400 shrink-0" size={20} /> : <AlertCircle className="text-red-400 shrink-0" size={20} />}
        <span>{toast.message}</span>
      </div>
    </div>
  );
};
