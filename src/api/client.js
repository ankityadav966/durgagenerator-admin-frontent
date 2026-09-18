import { API_BASE, API_ENDPOINTS, UPLOADS_BASE, PRODUCTION_API_URL } from "./config";

export { API_BASE, API_ENDPOINTS, UPLOADS_BASE, PRODUCTION_API_URL };

// Helper for authorized fetch with production live API
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

  // Ensure full URL is formed properly with API_BASE
  const url = endpoint.startsWith("http://") || endpoint.startsWith("https://")
    ? endpoint
    : `${API_BASE}${endpoint.startsWith("/") ? "" : "/"}${endpoint}`;

  const res = await fetch(url, {
    ...options,
    headers,
  });

  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.message || `Request failed with status ${res.status}`);
  }
  return data;
};

// Auth API Services
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

// Content API Services (CRUD operations)
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

// Upload API Services (Cloudinary / File upload & delete)
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

  deleteImage: (publicId) =>
    apiRequest(`/api/upload/${encodeURIComponent(publicId)}`, {
      method: "DELETE",
    }),

  getStatus: () => apiRequest("/api/upload/status"),
};
