import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getImageUrl(path: string | undefined | null): string {
  if (!path) return ""
  if (path.startsWith("http") || path.startsWith("blob:")) return path

  // Only prepend API URL if the path starts with /uploads
  if (path.startsWith("/uploads") || path.startsWith("uploads")) {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api"
    const baseUrl = apiUrl.replace(/\/api\/?$/, "")
    const cleanPath = path.startsWith("/") ? path : `/${path}`
    return `${baseUrl}${cleanPath}`
  }

  // Return original path for local assets (e.g., /imgs/...)
  return path
}
