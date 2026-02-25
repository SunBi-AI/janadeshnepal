/**
 * Centralized configuration for environment variables
 * Validates required environment variables at build time
 */

export const config = {
  apiBase: process.env.NEXT_PUBLIC_API_BASE || '',
  mediaBase: process.env.NEXT_PUBLIC_MEDIA_BASE || '',
} as const;

// Validate required environment variables
if (!config.apiBase) {
  throw new Error('NEXT_PUBLIC_API_BASE environment variable is required');
}

// Helper function to build API URLs
export function buildApiUrl(endpoint: string): string {
  return `${config.apiBase}${endpoint}`;
}

// Helper function to build media URLs
export function buildMediaUrl(path: string): string {
  if (!path) return '';
  if (path.startsWith('http')) return path;
  return `${config.mediaBase}${path}`;
}
