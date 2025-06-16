import { Star, Calendar, Sparkles, Heart, Zap } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { useAdmin } from '../contexts/AdminContext';

const Hero = () => {
  const { t, language } = useLanguage();
  const { siteData } = useAdmin();

  // Smooth scroll function
  const smoothScrollTo = (elementId: string) => {
    const element = document.getElementById(elementId);
    if (element) {
      const headerHeight = 80; // Approximate header height
      const elementPosition = element.offsetTop - headerHeight;
      
      window.scrollTo({
        top: elementPosition,
        behavior: 'smooth'
      });
    }
  };

  // WhatsApp booking function - FIXED with proper null checks
  const handleBookingWhatsApp = () => {
    // Check if whatsapp number exists
    if (!siteData?.contact?.whatsapp) {
      console.warn('WhatsApp number not available');
      return;
    }

    const message = siteData.whatsappMessages?.booking?.[language] || 
                   siteData.whatsappMessages?.booking?.ro || 
                   '🎉 Salut! Vreau să rezerv o petrecere la Triple Fun! Vă rog să mă contactați pentru detalii. Mulțumesc!';
    
    // Clean phone number (remove any spaces, dashes, etc.) with null check
    const cleanPhone = siteData.contact.whatsapp.replace(/\D/g, '');
    
    // Check if cleanPhone is not empty
    if (!cleanPhone) {
      console.warn('Invalid WhatsApp number');
      return;
    }
    
    // Create proper WhatsApp URL
    const whatsappUrl = `https://wa.me/${cleanPhone}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <section id="home" className="relative bg-gradient-to-br from-blue-400 via-purple-500 via-pink-500 to-purple-600 min-h-screen flex items-center overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-10 left-10 w-20 h-20 bg-blue-300 rounded-full opacity-60 animate-bounce"></div>
        <div className="absolute top-32 right-20 w-16 h-16 bg-purple-400 rounded-full opacity-60 animate-pulse"></div>
        <div className="absolute bottom-20 left-32 w-24 h-24 bg-pink-400 rounded-full opacity-60 animate-bounce delay-300"></div>
        <div className="absolute bottom-40 right-10 w-12 h-12 bg-blue-400 rounded-full opacity-60 animate-pulse delay-500"></div>
        <div className="absolute top-1/2 left-1/4 w-8 h-8 bg-purple-400 rounded-full opacity-60 animate-bounce delay-700"></div>
      </div>
      
      <div className="absolute inset-0 bg-black bg-opacity-10"></div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="text-white">
            <div className="flex items-center mb-6">
              <div className="flex text-blue-200">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-6 w-6 fill-current animate-pulse" style={{ animationDelay: `${i * 0.2}s` }} />
                ))}
              </div>
              <span className="ml-3 text-lg opacity-90 font-semibold">Evaluat cu 5 stele de părinți</span>
            </div>
            
            <h1 className="text-6xl lg:text-7xl font-bold mb-8 leading-tight">
              {t('hero.title')} <span className="text-blue-200 animate-pulse">{t('hero.titleHighlight')}</span> {t('hero.titleEnd')}
              <div className="inline-flex ml-4">
                <Sparkles className="h-12 w-12 text-blue-200 animate-spin" />
                <Heart className="h-10 w-10 text-pink-300 animate-bounce ml-2" />
                <Zap className="h-11 w-11 text-purple-300 animate-pulse ml-2" />
              </div>
            </h1>
            
            <p className="text-2xl mb-10 opacity-90 leading-relaxed font-medium">
              {t('hero.subtitle')}
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 mb-12">
              <button 
                onClick={handleBookingWhatsApp}
                className="bg-white text-purple-700 px-12 py-6 rounded-full font-bold text-2xl hover:bg-gray-100 hover:text-purple-800 transition-all transform hover:scale-110 shadow-2xl border-4 border-white relative overflow-hidden group"
              >
                <span className="relative z-10 flex items-center justify-center">
                  {t('hero.ctaBook')} 🎉
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-yellow-300 to-orange-400 opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
              </button>
              <button 
                onClick={() => smoothScrollTo('menu')}
                className="border-4 border-white text-white px-10 py-5 rounded-full font-bold text-xl hover:bg-white hover:text-purple-600 transition-all transform hover:scale-105 shadow-xl"
              >
                {t('hero.ctaMenu')} 🍕
              </button>
            </div>
            
            <div className="grid grid-cols-3 gap-8 text-center">
              <div className="bg-white bg-opacity-20 backdrop-blur-sm rounded-2xl p-6 transform hover:scale-105 transition-all">
                <div className="text-4xl font-bold mb-2">500+ 🎈</div>
                <div className="text-lg opacity-90">{t('hero.stats.parties')}</div>
              </div>
              <div className="bg-white bg-opacity-20 backdrop-blur-sm rounded-2xl p-6 transform hover:scale-105 transition-all">
                <div className="text-4xl font-bold mb-2">10 🏆</div>
                <div className="text-lg opacity-90">{t('hero.stats.experience')}</div>
              </div>
              <div className="bg-white bg-opacity-20 backdrop-blur-sm rounded-2xl p-6 transform hover:scale-105 transition-all">
                <div className="text-4xl font-bold mb-2">50+ 👶</div>
                <div className="text-lg opacity-90">{t('hero.stats.children')}</div>
              </div>
            </div>
          </div>
          
          <div className="relative">
            <div className="bg-gradient-to-br from-white from-10% via-blue-100 via-30% to-purple-100 backdrop-blur-lg rounded-3xl p-8 border-4 border-white border-opacity-50 shadow-2xl transform hover:scale-105 transition-all">
              <h3 className="text-purple-800 text-3xl font-bold mb-8 flex items-center">
                📅 Program Săptămâna
                <Sparkles className="h-8 w-8 ml-3 text-blue-500 animate-spin" />
              </h3>
              <div className="space-y-6">
                {Object.entries(siteData.schedule).map(([day, hours], index) => (
                  <div key={index} className="flex items-center text-purple-800 bg-white bg-opacity-60 rounded-xl p-4 transform hover:scale-105 transition-all">
                    <Calendar className="h-6 w-6 mr-4 text-purple-500" />
                    <span className="flex-1 font-semibold text-lg">{day}</span>
                    <span className="font-bold text-xl text-blue-600">{hours}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;