/**
 * Utility functions for the MatchaResume application
 */

/**
 * Formats a file size in bytes to a human-readable string
 * @param bytes - File size in bytes
 * @returns Formatted string (e.g., "1.5 MB", "2.3 KB")
 */
export const formatSize = (bytes: number): string => {
  if (bytes === 0) return "0 Bytes";

  const k = 1024;
  const sizes = ["Bytes", "KB", "MB", "GB", "TB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(1))} ${sizes[i]}`;
};

/**
 * Validates if a file type is allowed
 * @param file - File to validate
 * @param allowedTypes - Array of allowed MIME types
 * @returns Boolean indicating if file type is valid
 */
export const isValidFileType = (
  file: File,
  allowedTypes: string[]
): boolean => {
  return allowedTypes.includes(file.type);
};

/**
 * Validates if a file size is within the allowed limit
 * @param file - File to validate
 * @param maxSizeBytes - Maximum allowed size in bytes
 * @returns Boolean indicating if file size is valid
 */
export const isValidFileSize = (file: File, maxSizeBytes: number): boolean => {
  return file.size <= maxSizeBytes;
};

/**
 * Gets file extension from filename
 * @param filename - Name of the file
 * @returns File extension (e.g., "pdf", "docx")
 */
export const getFileExtension = (filename: string): string => {
  return filename.split(".").pop()?.toLowerCase() || "";
};
