import { useState, useEffect } from "react";
import { useContent } from "../context/ContentContext";
import { SectionHeader } from "../components/SectionHeader";
import { Plus, Trash2, HelpCircle } from "lucide-react";

export const FaqManager = () => {
  const { content, updateSection } = useContent();
  const [faqs, setFaqs] = useState([]);

  useEffect(() => {
    if (content?.faqs) {
      setFaqs(JSON.parse(JSON.stringify(content.faqs)));
    }
  }, [content]);

  const handleFaqChange = (index, field, value) => {
    const updated = [...faqs];
    updated[index][field] = value;
    setFaqs(updated);
  };

  const handleAddFaq = () => {
    const newFaq = {
      id: `faq-${Date.now()}`,
      question: "How do I calculate generator load requirement?",
      answer: "Our expert team provides free site inspections and load calculation to ensure you get the exact capacity required."
    };
    setFaqs([...faqs, newFaq]);
  };

  const handleDeleteFaq = (index) => {
    if (window.confirm("Are you sure you want to delete this FAQ item?")) {
      const updated = faqs.filter((_, i) => i !== index);
      setFaqs(updated);
    }
  };

  const handleSave = async () => {
    await updateSection("faqs", faqs);
  };

  return (
    <div className="space-y-8 pb-12">
      <SectionHeader
        badge="HELP & FAQ CENTER"
        title="Frequently Asked Questions (FAQ)"
        description="Add, edit, or remove FAQ questions and answers. These appear as expandable accordion answers on the /faq page."
        websiteRoute="/faq"
        onSave={handleSave}
      />

      <div className="space-y-4">
        {faqs.map((faq, idx) => (
          <div
            key={faq.id || idx}
            className="bg-[#0c1a2d] border border-yellow-700/30 rounded-2xl p-5 shadow-lg space-y-3 relative"
          >
            <div className="flex items-center justify-between pb-3 border-b border-yellow-900/30">
              <div className="flex items-center gap-2">
                <HelpCircle size={16} className="text-yellow-500" />
                <span className="text-xs font-bold text-yellow-400 font-mono">
                  Question #{idx + 1}
                </span>
              </div>

              <button
                type="button"
                onClick={() => handleDeleteFaq(idx)}
                className="p-1.5 rounded-lg bg-red-950/60 hover:bg-red-900 text-red-300 border border-red-800/40 text-xs"
                title="Delete this question"
              >
                <Trash2 size={14} />
              </button>
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-yellow-500 uppercase tracking-wider mb-1">
                Question
              </label>
              <input
                type="text"
                value={faq.question || ""}
                onChange={(e) => handleFaqChange(idx, "question", e.target.value)}
                placeholder="What generator sizes are available?"
                className="w-full bg-[#07162b] border border-yellow-900/40 rounded-xl px-3.5 py-2.5 text-xs text-white focus:border-yellow-500 outline-none font-bold"
              />
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-gray-400 uppercase tracking-wider mb-1">
                Answer
              </label>
              <textarea
                rows="2"
                value={faq.answer || ""}
                onChange={(e) => handleFaqChange(idx, "answer", e.target.value)}
                placeholder="Detailed answer text..."
                className="w-full bg-[#07162b] border border-yellow-900/40 rounded-xl p-3 text-xs text-white focus:border-yellow-500 outline-none resize-none italic"
              />
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-center pt-2">
        <button
          type="button"
          onClick={handleAddFaq}
          className="px-5 py-3 rounded-xl bg-[#0f2440] hover:bg-[#15345c] text-yellow-400 border border-dashed border-yellow-600/40 font-bold text-xs flex items-center gap-2 cursor-pointer shadow"
        >
          <Plus size={16} />
          <span>Add New FAQ Question</span>
        </button>
      </div>
    </div>
  );
};
