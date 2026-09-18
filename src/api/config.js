// Centralized API and Production URLs configuration
export const PRODUCTION_API_URL = "https://api.durgagenerator.com";
export const PRODUCTION_PUBLIC_SITE_URL = "https://durgagenerator.com";

// Active API Base URL - defaults to production URL unless overridden by VITE_API_URL env var
export const API_BASE = (
  import.meta.env.VITE_API_URL || PRODUCTION_API_URL
).replace(/\/$/, "");

// Uploads Base URL for uploaded images/files
export const UPLOADS_BASE = `${API_BASE}/uploads/`;

// Public Website URL for links from admin
export const PUBLIC_SITE_URL = (
  import.meta.env.VITE_PUBLIC_SITE_URL || PRODUCTION_PUBLIC_SITE_URL
).replace(/\/$/, "");

// API Endpoints mapping
export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: `${API_BASE}/api/auth/login`,
    ME: `${API_BASE}/api/auth/me`,
    CHANGE_PASSWORD: `${API_BASE}/api/auth/change-password`,
  },
  CONTENT: {
    ALL: `${API_BASE}/api/content`,
    SECTION: (section) => `${API_BASE}/api/content/${section}`,
    GENERATORS_ITEM: `${API_BASE}/api/content/generators/item`,
    GENERATOR_BY_ID: (id) => `${API_BASE}/api/content/generators/item/${id}`,
  },
  UPLOAD: {
    BASE: `${API_BASE}/api/upload`,
    GALLERY: `${API_BASE}/api/upload/gallery`,
    STATUS: `${API_BASE}/api/upload/status`,
    DELETE: (publicId) => `${API_BASE}/api/upload/${encodeURIComponent(publicId)}`,
  },
  HEALTH: `${API_BASE}/api/health`,
};
