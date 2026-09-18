import { useState, useEffect } from "react";
import { useContent } from "../context/ContentContext";
import { SectionHeader } from "../components/SectionHeader";
import { Plus, Trash2 } from "lucide-react";

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
    if (window.confirm("Are you sure you want to delete this FAQ?")) {
      const updated = faqs.filter((_, i) => i !== index);
      setFaqs(updated);
    }
  };

  const handleSave = async () => {
    await updateSection("faqs", faqs);
  };

  return (
    <div className="space-y-6 pb-12">
      <SectionHeader
        title="FAQ (Frequently Asked Questions)"
        description="Questions and answers shown on the FAQ page."
        websiteRoute="/faq"
        onSave={handleSave}
      />

      <div className="space-y-4">
        {faqs.map((faq, idx) => (
          <div
            key={faq.id || idx}
            className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm space-y-3"
          >
            <div className="flex items-center justify-between pb-3 border-b border-gray-200">
              <span className="text-xs font-semibold text-gray-500">
                Question #{idx + 1}
              </span>

              <button
                type="button"
                onClick={() => handleDeleteFaq(idx)}
                className="p-1 rounded-lg text-gray-400 hover:text-red-600 hover:bg-red-50 transition-colors"
                title="Delete question"
              >
                <Trash2 size={14} />
              </button>
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1">
                Question
              </label>
              <input
                type="text"
                value={faq.question || ""}
                onChange={(e) => handleFaqChange(idx, "question", e.target.value)}
                placeholder="What generator sizes are available?"
                className="w-full bg-white border border-gray-300 rounded-lg px-3 py-2 text-xs text-gray-900 font-semibold focus:border-amber-600 outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1">
                Answer
              </label>
              <textarea
                rows="2"
                value={faq.answer || ""}
                onChange={(e) => handleFaqChange(idx, "answer", e.target.value)}
                placeholder="Detailed answer text..."
                className="w-full bg-white border border-gray-300 rounded-lg p-2.5 text-xs text-gray-900 focus:border-amber-600 outline-none resize-none"
              />
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-center pt-2">
        <button
          type="button"
          onClick={handleAddFaq}
          className="px-4 py-2 rounded-lg bg-white hover:bg-gray-50 text-gray-700 border border-gray-300 font-medium text-xs flex items-center gap-1.5 cursor-pointer shadow-sm"
        >
          <Plus size={14} />
          <span>Add Question</span>
        </button>
      </div>
    </div>
  );
};
