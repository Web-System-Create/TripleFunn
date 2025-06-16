import React from 'react';
import { Plus, Trash2 } from 'lucide-react';

interface FullWidthGalleryImage {
  id: string;
  url: string;
  title: string;
  description: string;
}

interface FullWidthGalleryTabProps {
  fullWidthGallery: FullWidthGalleryImage[];
  updateGalleryImage: (index: number, field: string, value: string) => void;
  addGalleryImage: () => void;
  removeGalleryImage: (index: number) => void;
}

const FullWidthGalleryTab: React.FC<FullWidthGalleryTabProps> = ({ 
  fullWidthGallery, 
  updateGalleryImage, 
  addGalleryImage, 
  removeGalleryImage 
}) => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-bold text-gray-800">Galerie Full Width</h3>
        <button
          onClick={addGalleryImage}
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold transition-colors flex items-center"
        >
          <Plus className="h-4 w-4 mr-2" />
          Adaugă Imagine
        </button>
      </div>
      <div className="grid md:grid-cols-2 gap-4">
        {fullWidthGallery.map((image, index) => (
          <div key={image.id} className="bg-gray-50 p-4 rounded-lg border">
            <div className="flex items-center justify-between mb-3">
              <h4 className="font-semibold text-gray-800">Imagine #{index + 1}</h4>
              <button
                onClick={() => removeGalleryImage(index)}
                className="text-red-500 hover:text-red-700 p-1"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
            
            {/* Image Preview */}
            {image.url && (
              <div className="mb-3">
                <img 
                  src={image.url} 
                  alt={image.title}
                  className="w-full h-32 object-cover rounded-lg"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = 'https://images.pexels.com/photos/1148998/pexels-photo-1148998.jpeg?auto=compress&cs=tinysrgb&w=400';
                  }}
                />
              </div>
            )}
            
            <div className="space-y-3">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">URL Imagine</label>
                <input
                  type="text"
                  value={image.url}
                  onChange={(e) => updateGalleryImage(index, 'url', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                  placeholder="https://example.com/image.jpg"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Titlu</label>
                <input
                  type="text"
                  value={image.title}
                  onChange={(e) => updateGalleryImage(index, 'title', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Descriere</label>
                <textarea
                  value={image.description}
                  onChange={(e) => updateGalleryImage(index, 'description', e.target.value)}
                  rows={2}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm resize-none"
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FullWidthGalleryTab;