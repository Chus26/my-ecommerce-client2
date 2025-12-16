// src/services/recommendationServices.js
import { getAuthToken } from "../utils/auth";
const API_BASE = (process.env.REACT_APP_BACKEND_API || process.env.REACT_APP_API_URL || "").replace(/\/+$/, "");
const makeUrl = (p) => (API_BASE ? `${API_BASE}${p}` : p);

// ✅ Đơn giản hóa: Không cần truyền limit nữa vì backend đã tự xử lý
export async function getAiAccessories() {
  const token = getAuthToken();
  if (!token || token === "TOKEN EXPIRED") return { recommendations: [] };

  try {
    const res = await fetch(makeUrl(`/api/recommendations/ai-accessories`), {
      headers: { Authorization: `Bearer ${token}` },
    });
    if (!res.ok) return { recommendations: [] };
    return res.json();
  } catch (error) {
    console.error("Failed to fetch AI accessories:", error);
    return { recommendations: [] };
  }
}