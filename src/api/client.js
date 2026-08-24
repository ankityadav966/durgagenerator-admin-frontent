const API_BASE = import.meta.env.VITE_API_URL || "";

// Helper for authorized fetch
export const apiRequest = async (endpoint, options = {}) => {
  const token = localStorage.getItem("durga_admin_token");
  const headers = {
    ...options.headers,
  };

  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  if (!(options.body instanceof FormData) && !headers["Content-Type"]) {
    headers["Content-Type"] = "application/json";
  }

  const res = await fetch(`${API_BASE}${endpoint}`, {
    ...options,
    headers,
  });

  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.message || `Request failed with status ${res.status}`);
  }
  return data;
};

// API Services
export const authApi = {
  login: (username, password) =>
    apiRequest("/api/auth/login", {
      method: "POST",
      body: JSON.stringify({ username, password }),
    }),

  verifyMe: () => apiRequest("/api/auth/me"),

  changePassword: (payload) =>
    apiRequest("/api/auth/change-password", {
      method: "PUT",
      body: JSON.stringify(payload),
    }),
};

export const contentApi = {
  getAll: () => apiRequest("/api/content"),

  getSection: (section) => apiRequest(`/api/content/${section}`),

  updateSection: (section, data) =>
    apiRequest(`/api/content/${section}`, {
      method: "PUT",
      body: JSON.stringify(data),
    }),

  addGenerator: (generator) =>
    apiRequest("/api/content/generators/item", {
      method: "POST",
      body: JSON.stringify(generator),
    }),

  updateGenerator: (id, generator) =>
    apiRequest(`/api/content/generators/item/${id}`, {
      method: "PUT",
      body: JSON.stringify(generator),
    }),

  deleteGenerator: (id) =>
    apiRequest(`/api/content/generators/item/${id}`, {
      method: "DELETE",
    }),
};

export const uploadApi = {
  uploadImage: (file) => {
    const formData = new FormData();
    formData.append("image", file);
    return apiRequest("/api/upload", {
      method: "POST",
      body: formData,
    });
  },

  getGallery: () => apiRequest("/api/upload/gallery"),
};
