// Vercel Blob image service wrapper
// Requires BLOB_READ_WRITE_TOKEN env variable

export const MAX_FILE_SIZE = 4 * 1024 * 1024 // 4 MB
export const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/webp']

export function validateFile(file: File): string | null {
  if (file.size > MAX_FILE_SIZE) return 'File too large (max 4 MB)'
  if (!ALLOWED_TYPES.includes(file.type)) return 'Invalid file type (JPEG, PNG, WebP only)'
  return null
}

export function sanitizeFilename(name: string): string {
  return name.replace(/[^a-zA-Z0-9.-]/g, '_')
}
