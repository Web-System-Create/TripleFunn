import React, { useState } from 'react';
import { Image as ImageIcon, Folder, Trash2, ExternalLink } from 'lucide-react';
import ImageUploadComponent from './ImageUploadComponent';

interface UploadedImage {
  id: string;
  url: string;
  filename: string;
  uploadDate: string;
  size?: number;
}

const ImageUploadTab: React.FC = () => {
  const [uploadedImages, setUploadedImages] = useState<UploadedImage[]>([]);
  const [selectedImages, setSelectedImages] = useState<string[]>([]);
  const [uploadError, setUploadError] = useState<string>('');

  const handleImageUploaded = (url: string, filename: string) => {
    const newImage: UploadedImage = {
      id: Date.now().toString(),
      url,
      filename,
      uploadDate: new Date().toLocaleString('ro-RO')
    };

    setUploadedImages(prev => [newImage, ...prev]);
    setUploadError('');
  };

  const handleUploadError = (error: string) => {
    setUploadError(error);
  };

  const toggleImageSelection = (imageId: string) => {
    setSelectedImages(prev => 
      prev.includes(imageId) 
        ? prev.filter(id => id !== imageId)
        : [...prev, imageId]
    );
  };

  const deleteSelectedImages = () => {
    if (selectedImages.length === 0) return;

    const confirmDelete = window.confirm(
      `Ești sigur că vrei să ștergi ${selectedImages.length} imagine(i)?`
    );

    if (confirmDelete) {
      setUploadedImages(prev => 
        prev.filter(img => !selectedImages.includes(img.id))
      );
      setSelectedImages([]);
    }
  };

  const copyImageUrl = (url: string) => {
    navigator.clipboard.writeText(url).then(() => {
      alert('URL-ul imaginii a fost copiat în clipboard!');
    }).catch(() => {
      alert('Nu s-a putut copia URL-ul. Încearcă din nou.');
    });
  };

  const selectAllImages = () => {
    if (selectedImages.length === uploadedImages.length) {
      setSelectedImages([]);
    } else {
      setSelectedImages(uploadedImages.map(img => img.id));
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-bold text-gray-800">Încărcare Imagini</h3>
          <p className="text-sm text-gray-600">
            Încarcă imagini pentru galerie, servicii sau alte secțiuni ale site-ului
          </p>
        </div>
        <div className="flex items-center space-x-3">
          {uploadedImages.length > 0 && (
            <>
              <button
                onClick={selectAllImages}
                className="text-blue-500 hover:text-blue-700 text-sm"
              >
                {selectedImages.length === uploadedImages.length ? 'Deselectează toate' : 'Selectează toate'}
              </button>
              {selectedImages.length > 0 && (
                <button
                  onClick={deleteSelectedImages}
                  className="bg-red-500 hover:bg-red-600 text-white px-3 py-2 rounded-lg text-sm flex items-center"
                >
                  <Trash2 className="h-4 w-4 mr-1" />
                  Șterge ({selectedImages.length})
                </button>
              )}
            </>
          )}
        </div>
      </div>

      {/* Upload Error */}
      {uploadError && (
        <div className="bg-red-50 border border-red-200 p-4 rounded-lg">
          <p className="text-red-800 text-sm">{uploadError}</p>
        </div>
      )}

      {/* Upload Component */}
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <ImageUploadComponent
          onImageUploaded={handleImageUploaded}
          onError={handleUploadError}
          multiple={true}
          maxFiles={10}
          placeholder="Drag & drop imagini aici sau click pentru a selecta"
        />
      </div>

      {/* Usage Instructions */}
      <div className="bg-blue-50 border border-blue-200 p-4 rounded-lg">
        <div className="flex items-start">
          <ImageIcon className="h-5 w-5 text-blue-500 mr-3 mt-0.5 flex-shrink-0" />
          <div>
            <h4 className="font-semibold text-blue-800 mb-2">Cum să folosești imaginile încărcate:</h4>
            <div className="text-sm text-blue-700 space-y-1">
              <p>1. <strong>Încarcă imaginile</strong> folosind zona de mai sus</p>
              <p>2. <strong>Copiază URL-ul</strong> imaginii din lista de mai jos</p>
              <p>3. <strong>Folosește URL-ul</strong> în galerie, servicii sau alte secțiuni</p>
              <p>4. <strong>Tipuri acceptate:</strong> JPG, PNG, GIF (max 5MB per imagine)</p>
            </div>
          </div>
        </div>
      </div>

      {/* Uploaded Images Gallery */}
      {uploadedImages.length > 0 && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h4 className="font-semibold text-gray-800">
              Imagini încărcate ({uploadedImages.length})
            </h4>
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <Folder className="h-4 w-4" />
              <span>Stocate în /public/uploads/</span>
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {uploadedImages.map((image) => (
              <div
                key={image.id}
                className={`bg-white border rounded-lg overflow-hidden transition-all ${
                  selectedImages.includes(image.id) 
                    ? 'border-blue-500 ring-2 ring-blue-200' 
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                {/* Image Preview */}
                <div className="relative">
                  <img
                    src={image.url}
                    alt={image.filename}
                    className="w-full h-48 object-cover"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = 'https://images.pexels.com/photos/1148998/pexels-photo-1148998.jpeg?auto=compress&cs=tinysrgb&w=400';
                    }}
                  />
                  
                  {/* Selection Checkbox */}
                  <div className="absolute top-2 left-2">
                    <input
                      type="checkbox"
                      checked={selectedImages.includes(image.id)}
                      onChange={() => toggleImageSelection(image.id)}
                      className="w-4 h-4 text-blue-600 bg-white border-gray-300 rounded focus:ring-blue-500"
                    />
                  </div>

                  {/* View Full Size */}
                  <button
                    onClick={() => window.open(image.url, '_blank')}
                    className="absolute top-2 right-2 bg-black bg-opacity-50 text-white p-1 rounded hover:bg-opacity-70 transition-opacity"
                    title="Vezi mărime completă"
                  >
                    <ExternalLink className="h-4 w-4" />
                  </button>
                </div>

                {/* Image Info */}
                <div className="p-4 space-y-3">
                  <div>
                    <h5 className="font-medium text-gray-800 truncate" title={image.filename}>
                      {image.filename}
                    </h5>
                    <p className="text-xs text-gray-500">
                      Încărcat: {image.uploadDate}
                    </p>
                  </div>

                  {/* URL Copy */}
                  <div className="space-y-2">
                    <label className="block text-xs font-medium text-gray-700">
                      URL pentru folosire:
                    </label>
                    <div className="flex items-center space-x-2">
                      <input
                        type="text"
                        value={image.url}
                        readOnly
                        className="flex-1 px-2 py-1 text-xs border border-gray-300 rounded bg-gray-50"
                      />
                      <button
                        onClick={() => copyImageUrl(image.url)}
                        className="bg-blue-500 hover:bg-blue-600 text-white px-2 py-1 rounded text-xs"
                        title="Copiază URL"
                      >
                        Copiază
                      </button>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center justify-between pt-2 border-t border-gray-100">
                    <span className="text-xs text-gray-500">
                      {image.size ? `${(image.size / 1024).toFixed(1)} KB` : 'Dimensiune necunoscută'}
                    </span>
                    <button
                      onClick={() => toggleImageSelection(image.id)}
                      className={`text-xs px-2 py-1 rounded ${
                        selectedImages.includes(image.id)
                          ? 'bg-blue-100 text-blue-700'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      {selectedImages.includes(image.id) ? 'Selectat' : 'Selectează'}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Empty State */}
      {uploadedImages.length === 0 && (
        <div className="text-center py-12 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300">
          <ImageIcon className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h4 className="text-lg font-semibold text-gray-600 mb-2">
            Nicio imagine încărcată încă
          </h4>
          <p className="text-gray-500">
            Folosește zona de încărcare de mai sus pentru a adăuga imagini
          </p>
        </div>
      )}
    </div>
  );
};

export default ImageUploadTab;