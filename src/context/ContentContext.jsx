import { createContext, useContext, useState, useEffect, useCallback } from "react";
import { contentApi } from "../api/client";

const ContentContext = createContext(null);

export const ContentProvider = ({ children }) => {
  const [content, setContent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState(null);

  const showToast = (message, type = "success") => {
    setToast({ message, type, id: Date.now() });
    setTimeout(() => {
      setToast(null);
    }, 4000);
  };

  const fetchContent = useCallback(async () => {
    try {
      setLoading(true);
      const res = await contentApi.getAll();
      if (res.success && res.data) {
        setContent(res.data);
      }
    } catch (err) {
      console.error("Failed to load content:", err);
      showToast("Could not load content from server. Please check backend connection.", "error");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchContent();
  }, [fetchContent]);

  const updateSection = async (section, data) => {
    try {
      setSaving(true);
      const res = await contentApi.updateSection(section, data);
      if (res.success) {
        setContent((prev) => ({
          ...prev,
          [section]: res.data || data,
        }));
        showToast(`✅ ${section.toUpperCase()} updated successfully!`, "success");
        return res;
      }
    } catch (err) {
      console.error(`Failed to update ${section}:`, err);
      showToast(`❌ Failed to update ${section}: ${err.message}`, "error");
      throw err;
    } finally {
      setSaving(false);
    }
  };

  return (
    <ContentContext.Provider
      value={{
        content,
        loading,
        saving,
        toast,
        showToast,
        fetchContent,
        updateSection,
      }}
    >
      {children}
    </ContentContext.Provider>
  );
};

export const useContent = () => useContext(ContentContext);
