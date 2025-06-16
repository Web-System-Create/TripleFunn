import React, { useState, useRef } from 'react';
import { Upload, X, Check, AlertCircle, Image as ImageIcon, Loader } from 'lucide-react';
import { uploadImage, uploadMultipleImages, validateImageFile, formatFileSize, UploadResult } from '../../utils/imageUpload';

interface ImageUploadComponentProps {
  onImageUploaded: (url: string, filename: string) => void;
  onError?: (error: string) => void;
  multiple?: boolean;
  maxFiles?: number;
  className?: string;
  placeholder?: string;
  accept?: string;
}

interface UploadState {
  isUploading: boolean;
  progress: number;
  currentFile: string;
  results: UploadResult[];
}

const ImageUploadComponent: React.FC<ImageUploadComponentProps> = ({
  onImageUploaded,
  onError,
  multiple = false,
  maxFiles = 5,
  className = '',
  placeholder = 'Drag & drop imagini aici sau click pentru a selecta',
  accept = 'image/*'
}) => {
  const [uploadState, setUploadState] = useState<UploadState>({
    isUploading: false,
    progress: 0,
    currentFile: '',
    results: []
  });
  const [dragActive, setDragActive] = useState(false);
  const [previewUrls, setPreviewUrls] = useState<string[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFiles = async (files: FileList | File[]) => {
    const fileArray = Array.from(files);

    // Limit number of files
    if (multiple && fileArray.length > maxFiles) {
      const error = `Poți încărca maximum ${maxFiles} imagini odată`;
      onError?.(error);
      return;
    }

    // Validate all files first
    const validationErrors: string[] = [];
    fileArray.forEach((file) => {
      const validation = validateImageFile(file);
      if (!validation.valid) {
        validationErrors.push(`${file.name}: ${validation.error}`);
      }
    });

    if (validationErrors.length > 0) {
      onError?.(validationErrors.join('\n'));
      return;
    }

    // Create preview URLs
    const previews = fileArray.map(file => URL.createObjectURL(file));
    setPreviewUrls(previews);

    // Start upload
    setUploadState(prev => ({ ...prev, isUploading: true, progress: 0, results: [] }));

    try {
      if (multiple) {
        // Upload multiple files
        const results = await uploadMultipleImages(
          fileArray,
          { maxSizeBytes: 5 * 1024 * 1024 }, // 5MB limit
          (progress, currentFile) => {
            setUploadState(prev => ({ ...prev, progress, currentFile }));
          }
        );

        setUploadState(prev => ({ ...prev, results, isUploading: false }));

        // Call callback for successful uploads
        results.forEach(result => {
          if (result.success && result.url && result.filename) {
            onImageUploaded(result.url, result.filename);
          }
        });

        // Report errors
        const errors = results.filter(r => !r.success).map(r => r.error).join('\n');
        if (errors) {
          onError?.(errors);
        }

      } else {
        // Upload single file
        const result = await uploadImage(fileArray[0]);

        setUploadState(prev => ({
          ...prev,
          results: [result],
          isUploading: false,
          progress: 100
        }));

        if (result.success && result.url && result.filename) {
          onImageUploaded(result.url, result.filename);
        } else {
          onError?.(result.error || 'Eroare la încărcarea imaginii');
        }
      }

    } catch (error) {
      console.error('Upload error:', error);
      setUploadState(prev => ({ ...prev, isUploading: false }));
      onError?.('Eroare neașteptată la încărcarea imaginii');
    }
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFiles(e.dataTransfer.files);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      handleFiles(e.target.files);
    }
  };

  const clearPreviews = () => {
    previewUrls.forEach(url => URL.revokeObjectURL(url));
    setPreviewUrls([]);
    setUploadState({
      isUploading: false,
      progress: 0,
      currentFile: '',
      results: []
    });
  };

  const openFileDialog = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className={`space-y-4 ${className}`}>
      {/* Upload Area */}
      <div
        className={`relative border-2 border-dashed rounded-lg p-6 text-center transition-colors cursor-pointer ${
          dragActive 
            ? 'border-blue-500 bg-blue-50' 
            : uploadState.isUploading
            ? 'border-gray-300 bg-gray-50'
            : 'border-gray-300 hover:border-gray-400 hover:bg-gray-50'
        }`}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
        onClick={!uploadState.isUploading ? openFileDialog : undefined}
      >
        <input
          ref={fileInputRef}
          type="file"
          multiple={multiple}
          accept={accept}
          onChange={handleInputChange}
          className="hidden"
          disabled={uploadState.isUploading}
        />

        {uploadState.isUploading ? (
          <div className="space-y-4">
            <Loader className="h-12 w-12 text-blue-500 mx-auto animate-spin" />
            <div>
              <p className="text-lg font-semibold text-gray-700">Se încarcă imaginile...</p>
              <p className="text-sm text-gray-500">{uploadState.currentFile}</p>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                style={{ width: `${uploadState.progress}%` }}
              />
            </div>
            <p className="text-sm text-gray-600">{Math.round(uploadState.progress)}% complet</p>
          </div>
        ) : (
          <div className="space-y-4">
            <Upload className="h-12 w-12 text-gray-400 mx-auto" />
            <div>
              <p className="text-lg font-semibold text-gray-700">{placeholder}</p>
              <p className="text-sm text-gray-500">
                Tipuri acceptate: JPG, PNG, GIF (max 5MB)
                {multiple && ` • Maximum ${maxFiles} fișiere`}
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Preview Images */}
      {previewUrls.length > 0 && (
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h4 className="font-semibold text-gray-700">Preview imagini:</h4>
            <button
              onClick={clearPreviews}
              className="text-red-500 hover:text-red-700 text-sm flex items-center"
            >
              <X className="h-4 w-4 mr-1" />
              Șterge toate
            </button>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
            {previewUrls.map((url, index) => (
              <div key={index} className="relative group">
                <img
                  src={url}
                  alt={`Preview ${index + 1}`}
                  className="w-full h-24 object-cover rounded-lg border"
                />
                <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center">
                  <ImageIcon className="h-6 w-6 text-white" />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Upload Results */}
      {uploadState.results.length > 0 && (
        <div className="space-y-2">
          <h4 className="font-semibold text-gray-700">Rezultate încărcare:</h4>
          {uploadState.results.map((result, index) => (
            <div
              key={index}
              className={`flex items-center space-x-3 p-3 rounded-lg border ${
                result.success ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200'
              }`}
            >
              {result.success ? (
                <Check className="h-5 w-5 text-green-500 flex-shrink-0" />
              ) : (
                <AlertCircle className="h-5 w-5 text-red-500 flex-shrink-0" />
              )}
              <div className="flex-1 min-w-0">
                {result.success ? (
                  <div>
                    <p className="text-sm font-medium text-green-800">
                      Încărcat cu succes: {result.filename}
                    </p>
                    {result.size && (
                      <p className="text-xs text-green-600">
                        Dimensiune: {formatFileSize(result.size)}
                      </p>
                    )}
                  </div>
                ) : (
                  <p className="text-sm text-red-800">{result.error}</p>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ImageUploadComponent;
