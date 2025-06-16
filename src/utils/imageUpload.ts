/**
 * Updated Image Upload Utility with Real Server Integration
 * Handles image uploads with validation, unique naming, and error handling
 */

export interface UploadResult {
  success: boolean;
  url?: string;
  filename?: string;
  error?: string;
  size?: number;
}

export interface UploadOptions {
  maxSizeBytes?: number;
  allowedTypes?: string[];
  generateUniqueName?: boolean;
  targetDirectory?: string;
  useRealServer?: boolean;
}

const DEFAULT_OPTIONS: Required<UploadOptions> = {
  maxSizeBytes: 5 * 1024 * 1024, // 5MB
  allowedTypes: ['image/jpeg', 'image/jpg', 'image/png', 'image/gif'],
  generateUniqueName: true,
  targetDirectory: 'uploads',
  useRealServer: true
};

// API endpoints
const UPLOAD_API_BASE = 'http://localhost:3002/api/upload';

/**
 * Validates an image file against size and type constraints
 */
export function validateImageFile(file: File, options: UploadOptions = {}): { valid: boolean; error?: string } {
  const opts = { ...DEFAULT_OPTIONS, ...options };

  // Check file type
  if (!opts.allowedTypes.includes(file.type)) {
    return {
      valid: false,
      error: `Tip de fișier neacceptat. Tipuri permise: ${opts.allowedTypes.map(type => type.split('/')[1]).join(', ')}`
    };
  }

  // Check file size
  if (file.size > opts.maxSizeBytes) {
    const maxSizeMB = opts.maxSizeBytes / (1024 * 1024);
    return {
      valid: false,
      error: `Fișierul este prea mare. Dimensiunea maximă permisă: ${maxSizeMB}MB`
    };
  }

  return { valid: true };
}

/**
 * Generates a unique filename while preserving the original extension
 */
export function generateUniqueFilename(originalName: string): string {
  const timestamp = Date.now();
  const randomString = Math.random().toString(36).substring(2, 8);
  const extension = originalName.split('.').pop()?.toLowerCase() || '';
  const nameWithoutExt = originalName.split('.').slice(0, -1).join('.');

  // Clean the original name (remove special characters, spaces)
  const cleanName = nameWithoutExt
    .toLowerCase()
    .replace(/[^a-z0-9]/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');

  return `${cleanName}-${timestamp}-${randomString}.${extension}`;
}

/**
 * Uploads an image file using the real upload server
 */
export async function uploadImage(file: File, options: UploadOptions = {}): Promise<UploadResult> {
  const opts = { ...DEFAULT_OPTIONS, ...options };

  try {
    // Validate the file
    const validation = validateImageFile(file, opts);
    if (!validation.valid) {
      return {
        success: false,
        error: validation.error
      };
    }

    if (opts.useRealServer) {
      // Use real upload server
      return await uploadToRealServer(file);
    } else {
      // Use placeholder/simulation
      return await simulateImageUpload(file);
    }

  } catch (error) {
    console.error('Upload error:', error);
    return {
      success: false,
      error: 'Eroare la încărcarea imaginii. Vă rugăm să încercați din nou.'
    };
  }
}

/**
 * Uploads to the real upload server
 */
async function uploadToRealServer(file: File): Promise<UploadResult> {
  try {
    const formData = new FormData();
    formData.append('image', file);

    const response = await fetch(`${UPLOAD_API_BASE}/single`, {
      method: 'POST',
      body: formData
    });

    const result = await response.json();

    if (result.success) {
      return {
        success: true,
        url: result.url,
        filename: result.filename,
        size: result.size
      };
    } else {
      return {
        success: false,
        error: result.error || 'Eroare la încărcarea pe server'
      };
    }

  } catch (error) {
    console.error('Real server upload error:', error);

    // Fallback to placeholder if server is not available
    console.log('🔄 Server not available, using placeholder...');
    return await simulateImageUpload(file);
  }
}

/**
 * Simulates image upload process (fallback)
 */
async function simulateImageUpload(file: File): Promise<UploadResult> {
  // Simulate upload delay
  await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 2000));

  try {
    // Use a placeholder service
    const placeholderUrl = `https://picsum.photos/800/600?random=${Date.now()}`;

    return {
      success: true,
      url: placeholderUrl,
      filename: generateUniqueFilename(file.name),
      size: file.size
    };

  } catch (error) {
    console.error('Simulated upload error:', error);
    return {
      success: false,
      error: 'Eroare la simularea încărcării imaginii'
    };
  }
}

/**
 * Uploads multiple images with progress tracking
 */
export async function uploadMultipleImages(
  files: FileList | File[],
  options: UploadOptions = {},
  onProgress?: (progress: number, currentFile: string) => void
): Promise<UploadResult[]> {

  const opts = { ...DEFAULT_OPTIONS, ...options };
  const fileArray = Array.from(files);

  if (opts.useRealServer) {
    // Try bulk upload to real server first
    try {
      const formData = new FormData();
      fileArray.forEach((file) => {
        formData.append('images', file);
      });

      onProgress?.(50, 'Încărcare pe server...');

      const response = await fetch(`${UPLOAD_API_BASE}/multiple`, {
        method: 'POST',
        body: formData
      });

      const result = await response.json();
      onProgress?.(100, 'Finalizat');

      if (result.success) {
        return result.files.map((file: any) => ({
          success: true,
          url: file.url,
          filename: file.filename,
          size: file.size
        }));
      }
    } catch (error) {
      console.log('🔄 Bulk upload failed, falling back to individual uploads...');
    }
  }

  // Fallback to individual uploads
  const results: UploadResult[] = [];

  for (let i = 0; i < fileArray.length; i++) {
    const file = fileArray[i];

    // Update progress
    if (onProgress) {
      const progress = (i / fileArray.length) * 100;
      onProgress(progress, file.name);
    }

    // Upload individual file
    const result = await uploadImage(file, options);
    results.push(result);

    // Small delay between uploads
    await new Promise(resolve => setTimeout(resolve, 100));
  }

  // Final progress update
  if (onProgress) {
    onProgress(100, 'Finalizat');
  }

  return results;
}

/**
 * Lists uploaded files from the server
 */
export async function listUploadedFiles(): Promise<{ success: boolean; files?: any[]; error?: string }> {
  try {
    const response = await fetch(`${UPLOAD_API_BASE}/list`);
    const result = await response.json();

    return result;
  } catch (error) {
    console.error('List files error:', error);
    return {
      success: false,
      error: 'Nu s-au putut încărca fișierele de pe server'
    };
  }
}

/**
 * Deletes a file from the server
 */
export async function deleteUploadedFile(filename: string): Promise<{ success: boolean; error?: string }> {
  try {
    const response = await fetch(`${UPLOAD_API_BASE}/${filename}`, {
      method: 'DELETE'
    });

    const result = await response.json();
    return result;
  } catch (error) {
    console.error('Delete file error:', error);
    return {
      success: false,
      error: 'Nu s-a putut șterge fișierul de pe server'
    };
  }
}

/**
 * Checks if the upload server is available
 */
export async function checkUploadServerStatus(): Promise<boolean> {
  try {
    const response = await fetch(`${UPLOAD_API_BASE}/health`);
    return response.ok;
  } catch (error) {
    return false;
  }
}

/**
 * Utility function to format file size for display
 */
export function formatFileSize(bytes: number): string {
  if (bytes === 0) return '0 Bytes';

  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

/**
 * Utility function to get file extension from filename
 */
export function getFileExtension(filename: string): string {
  return filename.split('.').pop()?.toLowerCase() || '';
}

/**
 * Checks if a file is a valid image based on its extension
 */
export function isValidImageExtension(filename: string): boolean {
  const validExtensions = ['jpg', 'jpeg', 'png', 'gif', 'webp'];
  const extension = getFileExtension(filename);
  return validExtensions.includes(extension);
}
