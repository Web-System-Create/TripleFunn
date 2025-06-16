import React, { useState } from 'react';
import { Camera, Star, Sparkles, X, ChevronLeft, ChevronRight, ChevronDown, ChevronUp } from 'lucide-react';
import { useAdmin } from '../contexts/AdminContext';

const FullWidthGallery = () => {
  const { siteData } = useAdmin();
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null);
  const [showAllImages, setShowAllImages] = useState(false);

  // Show more functionality - limit to 4 images initially (2 rows)
  const INITIAL_IMAGES_LIMIT = 4;
  const shouldShowMoreButton = siteData.fullWidthGallery.length > INITIAL_IMAGES_LIMIT;
  const displayedImages = showAllImages ? siteData.fullWidthGallery : siteData.fullWidthGallery.slice(0, INITIAL_IMAGES_LIMIT);

  // Fullscreen gallery functions
  const openFullscreen = (index: number) => {
    setSelectedImageIndex(index);
  };

  const closeFullscreen = () => {
    setSelectedImageIndex(null);
  };

  const goToPrevious = () => {
    if (selectedImageIndex !== null && selectedImageIndex > 0) {
      setSelectedImageIndex(selectedImageIndex - 1);
    }
  };

  const goToNext = () => {
    if (selectedImageIndex !== null && selectedImageIndex < displayedImages.length - 1) {
      setSelectedImageIndex(selectedImageIndex + 1);
    }
  };

  // Handle keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      closeFullscreen();
    } else if (e.key === 'ArrowLeft') {
      goToPrevious();
    } else if (e.key === 'ArrowRight') {
      goToNext();
    }
  };

  // Split images into rows for display
  const getImageRows = () => {
    const rows = [];
    for (let i = 0; i < displayedImages.length; i += 3) {
      rows.push(displayedImages.slice(i, i + 3));
    }
    return rows;
  };

  const imageRows = getImageRows();

  return (
    <section className="py-20 bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        <div className="text-center">
          <h2 className="text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-6">
            Descoperă Lumea PlayFun 🌟
          </h2>
          <p className="text-2xl text-gray-700 max-w-4xl mx-auto font-medium">
            O privire în universul nostru magic plin de aventuri, zâmbete și momente de neuitat
          </p>
        </div>
      </div>

      {/* Full Width Gallery */}
      <div className="w-full">
        {imageRows.map((row, rowIndex) => (
          <div key={rowIndex} className={`flex w-full h-80 ${rowIndex < imageRows.length - 1 ? 'mb-2' : ''}`}>
            {row.map((image, imageIndex) => {
              const globalIndex = rowIndex * 3 + imageIndex;
              return (
                <div 
                  key={image.id}
                  className="relative flex-1 group overflow-hidden cursor-pointer"
                  onClick={() => openFullscreen(globalIndex)}
                >
                  <img
                    src={image.url}
                    alt={image.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500">
                    <div className="absolute bottom-0 left-0 right-0 p-6 text-white transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                      <div className="flex items-center mb-2">
                        <Camera className="h-5 w-5 mr-2 text-blue-300" />
                        <Star className="h-4 w-4 text-blue-300" />
                      </div>
                      <h3 className="font-bold text-xl mb-2">{image.title}</h3>
                      <p className="text-sm opacity-90">{image.description}</p>
                    </div>
                  </div>
                  <div className="absolute top-4 right-4 bg-white/20 backdrop-blur-sm rounded-full p-2 opacity-0 group-hover:opacity-100 transition-all duration-300">
                    <Camera className="h-5 w-5 text-white" />
                  </div>
                </div>
              );
            })}
          </div>
        ))}
      </div>

      {/* Show More/Less Button */}
      {shouldShowMoreButton && (
        <div className="text-center mt-8 mb-8">
          <button
            onClick={() => setShowAllImages(!showAllImages)}
            className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-8 py-4 rounded-full font-semibold hover:from-purple-600 hover:to-pink-600 transition-all transform hover:scale-105 shadow-lg flex items-center justify-center mx-auto"
          >
            {showAllImages ? (
              <>
                <ChevronUp className="h-5 w-5 mr-2" />
                Vezi mai puține imagini
              </>
            ) : (
              <>
                <ChevronDown className="h-5 w-5 mr-2" />
                Vezi toate imaginile ({siteData.fullWidthGallery.length - INITIAL_IMAGES_LIMIT} mai multe)
              </>
            )}
          </button>
        </div>
      )}

      {/* Fullscreen Gallery Modal */}
      {selectedImageIndex !== null && (
        <div 
          className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center"
          onKeyDown={handleKeyDown}
          tabIndex={0}
        >
          {/* Close Button */}
          <button
            onClick={closeFullscreen}
            className="absolute top-6 right-6 z-60 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full p-3 text-white transition-colors"
          >
            <X className="h-8 w-8" />
          </button>

          {/* Previous Button */}
          {selectedImageIndex > 0 && (
            <button
              onClick={goToPrevious}
              className="absolute left-6 top-1/2 transform -translate-y-1/2 z-60 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full p-3 text-white transition-colors"
            >
              <ChevronLeft className="h-8 w-8" />
            </button>
          )}

          {/* Next Button */}
          {selectedImageIndex < displayedImages.length - 1 && (
            <button
              onClick={goToNext}
              className="absolute right-6 top-1/2 transform -translate-y-1/2 z-60 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full p-3 text-white transition-colors"
            >
              <ChevronRight className="h-8 w-8" />
            </button>
          )}

          {/* Main Image */}
          <div className="relative max-w-7xl max-h-full mx-auto px-4">
            <img
              src={displayedImages[selectedImageIndex].url}
              alt={displayedImages[selectedImageIndex].title}
              className="max-w-full max-h-[90vh] object-contain rounded-lg shadow-2xl"
            />
            
            {/* Image Info */}
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6 text-white rounded-b-lg">
              <h3 className="text-2xl font-bold mb-2">{displayedImages[selectedImageIndex].title}</h3>
              <p className="text-lg opacity-90">{displayedImages[selectedImageIndex].description}</p>
              <div className="mt-4 flex items-center justify-between">
                <span className="text-sm opacity-75">
                  {selectedImageIndex + 1} din {displayedImages.length}
                </span>
                <div className="text-sm opacity-75">
                  Folosește săgețile ← → pentru navigare sau ESC pentru închidere
                </div>
              </div>
            </div>
          </div>

          {/* Thumbnail Navigation */}
          <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-2 max-w-full overflow-x-auto px-4">
            {displayedImages.map((image, index) => (
              <button
                key={image.id}
                onClick={() => setSelectedImageIndex(index)}
                className={`flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden border-2 transition-all ${
                  index === selectedImageIndex 
                    ? 'border-white scale-110' 
                    : 'border-white/30 hover:border-white/60'
                }`}
              >
                <img
                  src={image.url}
                  alt={image.title}
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Bottom Call to Action */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16">
        <div className="text-center">
          <div className="bg-gradient-to-r from-blue-500 to-purple-500 rounded-3xl p-8 text-white">
            <h3 className="text-3xl font-bold mb-4 flex items-center justify-center">
              <Sparkles className="h-8 w-8 mr-3 text-blue-200" />
              Vino să trăiești magia! 
            </h3>
            <p className="text-xl mb-8 opacity-90">
              Fiecare imagine spune o poveste de bucurie și aventură
            </p>
            <button className="bg-white text-blue-500 px-8 py-4 rounded-full font-semibold hover:bg-gray-100 transition-all transform hover:scale-105 shadow-lg">
              Rezervă Experiența Ta 🎉
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FullWidthGallery;