export const BASE_URL =
  process.env.NEXT_PUBLIC_BASE_URL || "http://127.0.0.1:8000"; // Fetch from env or default

export const ASSETS_PREFIX =
  process.env.NODE_ENV === "production" ? "/docusearch" : "";
