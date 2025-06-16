import React, { useState } from 'react';
import { Camera, Filter, X } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { useAdmin } from '../contexts/AdminContext';

const Gallery = () => {
  const { t } = useLanguage();
  const { siteData } = useAdmin();
  const [activeFilter, setActiveFilter] = useState('all');
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

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
          {filteredImages.map((image, index) => (
            <div 
              key={image.id}
              className="group relative bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 cursor-pointer"
              onClick={() => setSelectedImage(image.url)}
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

        {/* Modal for enlarged image */}
        {selectedImage && (
          <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4" onClick={() => setSelectedImage(null)}>
            <div className="relative max-w-4xl max-h-full">
              <button
                onClick={() => setSelectedImage(null)}
                className="absolute -top-12 right-0 text-white hover:text-gray-300 transition-colors"
              >
                <X className="h-8 w-8" />
              </button>
              <img
                src={selectedImage}
                alt="Enlarged view"
                className="max-w-full max-h-full object-contain rounded-lg"
              />
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
            <button className="bg-white text-blue-500 px-8 py-4 rounded-full font-semibold hover:bg-gray-100 transition-all transform hover:scale-105 shadow-lg">
              Rezervă Petrecerea 🎉
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Gallery;