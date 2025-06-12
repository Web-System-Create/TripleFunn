import React from 'react';
import { Camera, Star, Heart, Sparkles } from 'lucide-react';
import { useAdmin } from '../contexts/AdminContext';

const FullWidthGallery = () => {
  const { siteData } = useAdmin();

  return (
    <section className="py-20 bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        <div className="text-center">
          <h2 className="text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-6">
            Descoperă Lumea TripleFunn 🌟
          </h2>
          <p className="text-2xl text-gray-700 max-w-4xl mx-auto font-medium">
            O privire în universul nostru magic plin de aventuri, zâmbete și momente de neuitat
          </p>
        </div>
      </div>

      {/* Full Width Gallery */}
      <div className="w-full">
        {/* First Row - 3 images */}
        <div className="flex w-full h-80 mb-2">
          {siteData.fullWidthGallery.slice(0, 3).map((image, index) => (
            <div
              key={image.id}
              className="relative flex-1 group overflow-hidden"
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
                <Heart className="h-5 w-5 text-white" />
              </div>
            </div>
          ))}
        </div>

        {/* Second Row - 3 images */}
        <div className="flex w-full h-80">
          {siteData.fullWidthGallery.slice(3, 6).map((image, index) => (
            <div
              key={image.id}
              className="relative flex-1 group overflow-hidden"
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
                    <Sparkles className="h-5 w-5 mr-2 text-purple-300" />
                    <Star className="h-4 w-4 text-purple-300" />
                  </div>
                  <h3 className="font-bold text-xl mb-2">{image.title}</h3>
                  <p className="text-sm opacity-90">{image.description}</p>
                </div>
              </div>
              <div className="absolute top-4 right-4 bg-white/20 backdrop-blur-sm rounded-full p-2 opacity-0 group-hover:opacity-100 transition-all duration-300">
                <Heart className="h-5 w-5 text-white" />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Call to Action */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16">
        <div className="text-center">
          <div className="bg-gradient-to-r from-blue-500 to-purple-500 rounded-3xl p-8 text-white">
            <h3 className="text-3xl font-bold mb-4 flex items-center justify-center">
              <Sparkles className="h-8 w-8 mr-3 text-blue-200" />
              Vino să trăiești magia!
              <Heart className="h-8 w-8 ml-3 text-pink-300" />
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
