import React, { useState } from 'react';
import { Camera, Filter, X, MessageCircle, ChevronLeft, ChevronRight, ChevronDown, ChevronUp } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { useAdmin } from '../contexts/AdminContext';

const Gallery = () => {
  const { t, language } = useLanguage();
  const { siteData } = useAdmin();
  const [activeFilter, setActiveFilter] = useState('all');
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null);
  const [showAllImages, setShowAllImages] = useState(false);

  // Gallery images with the uploaded photos
  const galleryImages = [
    {
      id: '1',
      url: '/WhatsApp Image 2025-06-10 at 09.16.42.jpeg',
      title: 'Pachet Triple Fun - Exterior + Piscină',
      category: 'playground',
      description: 'Spațiu exterior cu tobogan, hinte, tiroliana și piscină încălzită'
    },
    {
      id: '2',
      url: '/WhatsApp Image 2025-06-10 at 09.16.43 (1).jpeg',
      title: 'Platou Salamuri și Brânzeturi Italiene',
      category: 'food',
      description: 'Platou pentru 10 persoane cu salamuri și brânzeturi italiene'
    },
    {
      id: '3',
      url: '/WhatsApp Image 2025-06-10 at 09.16.43 (2).jpeg',
      title: 'Platou Grătar Mixt',
      category: 'food',
      description: 'Crispy pui, ceafă, mici și cartofi prăjiți pentru 10 persoane'
    },
    {
      id: '4',
      url: '/WhatsApp Image 2025-06-10 at 09.16.43 (3).jpeg',
      title: 'Meniu Copil - Crispy Pui',
      category: 'food',
      description: 'Crispy din mușchiuleț de pui cu cartofi prăjiți și băutură'
    },
    {
      id: '5',
      url: '/WhatsApp Image 2025-06-10 at 09.16.43 (4).jpeg',
      title: 'Meniu Copil - Varianta cu Apă',
      category: 'food',
      description: 'Crispy din mușchiuleț de pui cu cartofi prăjiți și apă plată'
    },
    {
      id: '6',
      url: 'https://images.pexels.com/photos/1148998/pexels-photo-1148998.jpeg?auto=compress&cs=tinysrgb&w=800',
      title: 'Zona de joacă principală',
      category: 'playground',
      description: 'Tobogane moderne și zone de joacă sigure pentru copii'
    },
    {
      id: '7',
      url: 'https://images.pexels.com/photos/1148999/pexels-photo-1148999.jpeg?auto=compress&cs=tinysrgb&w=800',
      title: 'Petrecere aniversară',
      category: 'parties',
      description: 'Atmosferă magică pentru sărbătorirea zilei de naștere'
    },
    {
      id: '8',
      url: 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=800',
      title: 'Animatori profesioniști',
      category: 'parties',
      description: 'Echipa noastră de animatori creează momente de neuitat'
    },
    {
      id: '9',
      url: 'https://images.pexels.com/photos/1640774/pexels-photo-1640774.jpeg?auto=compress&cs=tinysrgb&w=800',
      title: 'Evenimente corporate',
      category: 'events',
      description: 'Team building și evenimente corporate într-un cadru relaxant'
    },
    {
      id: '10',
      url: 'https://images.pexels.com/photos/1640775/pexels-photo-1640775.jpeg?auto=compress&cs=tinysrgb&w=800',
      title: 'Spații moderne',
      category: 'playground',
      description: 'Design contemporan și sigur pentru copii'
    },
    {
      id: '11',
      url: 'https://images.pexels.com/photos/1640776/pexels-photo-1640776.jpeg?auto=compress&cs=tinysrgb&w=800',
      title: 'Distracție garantată',
      category: 'parties',
      description: 'Zâmbete și bucurie pentru toți copiii'
    },
    {
      id: '12',
      url: 'https://images.pexels.com/photos/1148997/pexels-photo-1148997.jpeg?auto=compress&cs=tinysrgb&w=800',
      title: 'Zone de relaxare',
      category: 'playground',
      description: 'Spații confortabile pentru părinți'
    }
  ];

  const categories = [
    { key: 'all', label: t('gallery.filters.all'), icon: Camera },
    { key: 'playground', label: t('gallery.filters.playground'), icon: Camera },
    { key: 'parties', label: t('gallery.filters.parties'), icon: Camera },
    { key: 'food', label: t('gallery.filters.food'), icon: Camera },
    { key: 'events', label: t('gallery.filters.events'), icon: Camera }
  ];

  const filteredImages = activeFilter === 'all' 
    ? galleryImages 
    : galleryImages.filter(img => img.category === activeFilter);

  // Show more functionality - limit to 8 images initially
  const INITIAL_IMAGES_LIMIT = 8;
  const shouldShowMoreButton = filteredImages.length > INITIAL_IMAGES_LIMIT;
  const displayedImages = showAllImages ? filteredImages : filteredImages.slice(0, INITIAL_IMAGES_LIMIT);

  // WhatsApp booking function
  const handleBookingWhatsApp = () => {
    if (!siteData?.contact?.whatsapp) {
      console.warn('WhatsApp number not available');
      return;
    }

    const message = siteData.whatsappMessages?.booking?.[language] || 
                   siteData.whatsappMessages?.booking?.ro || 
                   '🎉 Salut! Vreau să rezerv o petrecere la Triple Fun! Vă rog să mă contactați pentru detalii. Mulțumesc!';
    
    const cleanPhone = siteData.contact.whatsapp.replace(/\D/g, '');
    
    if (!cleanPhone) {
      console.warn('Invalid WhatsApp number');
      return;
    }
    
    const whatsappUrl = `https://wa.me/${cleanPhone}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

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

  // Reset show all when filter changes
  React.useEffect(() => {
    setShowAllImages(false);
  }, [activeFilter]);

  return (
    <section id="gallery" className="py-20 bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-6">
            {t('gallery.title')} 📸
          </h2>
          <p className="text-2xl text-gray-700 max-w-4xl mx-auto font-medium">
            {t('gallery.subtitle')}
          </p>
        </div>

        {/* Filter Buttons */}
        <div className="flex flex-wrap justify-center mb-12 gap-4">
          {categories.map((category) => (
            <button
              key={category.key}
              onClick={() => setActiveFilter(category.key)}
              className={`flex items-center px-6 py-3 rounded-full font-semibold transition-all transform hover:scale-105 ${
                activeFilter === category.key
                  ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg'
                  : 'bg-white text-gray-700 hover:bg-gray-50 shadow-md'
              }`}
            >
              <Filter className="h-5 w-5 mr-2" />
              {category.label}
            </button>
          ))}
        </div>

        {/* Gallery Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {displayedImages.map((image, index) => (
            <div 
              key={image.id}
              className="group relative bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 cursor-pointer"
              onClick={() => openFullscreen(index)}
            >
              <div className="aspect-square overflow-hidden">
                <img
                  src={image.url}
                  alt={image.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  loading="lazy"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                  <h3 className="font-bold text-lg mb-1">{image.title}</h3>
                  <p className="text-sm opacity-90">{image.description}</p>
                </div>
              </div>
              <div className="absolute top-4 right-4 bg-white/20 backdrop-blur-sm rounded-full p-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <Camera className="h-5 w-5 text-white" />
              </div>
            </div>
          ))}
        </div>

        {/* Show More/Less Button */}
        {shouldShowMoreButton && (
          <div className="text-center mt-12">
            <button
              onClick={() => setShowAllImages(!showAllImages)}
              className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-8 py-4 rounded-full font-semibold hover:from-blue-600 hover:to-purple-600 transition-all transform hover:scale-105 shadow-lg flex items-center justify-center mx-auto"
            >
              {showAllImages ? (
                <>
                  <ChevronUp className="h-5 w-5 mr-2" />
                  Vezi mai puține ({INITIAL_IMAGES_LIMIT} din {filteredImages.length})
                </>
              ) : (
                <>
                  <ChevronDown className="h-5 w-5 mr-2" />
                  Vezi toate imaginile ({filteredImages.length - INITIAL_IMAGES_LIMIT} mai multe)
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

        {/* Call to Action */}
        <div className="mt-16 text-center">
          <div className="bg-gradient-to-r from-blue-500 to-purple-500 rounded-3xl p-8 text-white">
            <h3 className="text-3xl font-bold mb-4">Vrei să fii următorul în galeria noastră? 📷</h3>
            <p className="text-xl mb-8 opacity-90">
              Rezervă acum și creează amintiri de neuitat pentru copilul tău!
            </p>
            <button 
              onClick={handleBookingWhatsApp}
              className="bg-white text-blue-500 px-8 py-4 rounded-full font-semibold hover:bg-gray-100 transition-all transform hover:scale-105 shadow-lg flex items-center justify-center mx-auto"
            >
              <MessageCircle className="h-5 w-5 mr-2" />
              Rezervă Petrecerea 🎉
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Gallery;