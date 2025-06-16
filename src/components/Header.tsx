import { useState, useEffect } from 'react';
import { Menu, X, Phone, Globe, Settings, LogOut, ChevronUp, MessageCircle } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { useAdmin } from '../contexts/AdminContext';
import AdminPanel from './AdminPanel';
import LoginModal from './LoginModal';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLanguageOpen, setIsLanguageOpen] = useState(false);
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const { language, setLanguage, t } = useLanguage();
  const { siteData, isLoggedIn, login, logout } = useAdmin();

  const languages = [
    { code: 'ro', name: 'Română', flag: '🇷🇴' },
    { code: 'en', name: 'English', flag: '🇬🇧' },
    { code: 'hu', name: 'Magyar', flag: '🇭🇺' }
  ];

  const currentLanguage = languages.find(lang => lang.code === language);

  // Handle scroll to show/hide scroll to top button
  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleAdminToggle = () => {
    if (!isLoggedIn) {
      setIsLoginOpen(true);
    } else {
      setIsAdminOpen(true);
    }
  };

  const handleLogin = (username: string, password: string) => {
    const success = login(username, password);
    if (success) {
      setIsAdminOpen(true);
    }
    return success;
  };

  const handleLogout = () => {
    logout();
    setIsAdminOpen(false);
  };

  // Smooth scroll function with animation
  const smoothScrollTo = (elementId: string) => {
    const element = document.getElementById(elementId);
    if (element) {
      const headerHeight = 80; // Approximate header height
      const elementPosition = element.offsetTop - headerHeight;
      
      window.scrollTo({
        top: elementPosition,
        behavior: 'smooth'
      });
      
      // Close mobile menu if open
      setIsMenuOpen(false);
    }
  };

  // Scroll to top function
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  // Call function
  const makeCall = () => {
    if (siteData?.contact?.phone) {
      window.location.href = `tel:${siteData.contact.phone}`;
    }
  };

  // WhatsApp function - COMPLETELY FIXED with proper error handling
  const openWhatsApp = () => {
    console.log('WhatsApp button clicked!'); // Debug log
    
    // Check if siteData and contact exist
    if (!siteData?.contact?.whatsapp) {
      console.warn('WhatsApp number not available in siteData:', siteData);
      alert('Numărul WhatsApp nu este disponibil momentan. Vă rugăm să sunați la 0755286670');
      return;
    }

    // Get message with proper fallback
    const message = siteData.whatsappMessages?.contact?.[language] || 
                   siteData.whatsappMessages?.contact?.ro || 
                   '📞 Salut! Am o întrebare despre Triple Fun. Vă rog să mă contactați. Mulțumesc!';
    
    console.log('WhatsApp message:', message); // Debug log
    
    // Clean phone number with proper null checks
    const cleanPhone = siteData.contact.whatsapp.replace(/\D/g, '');
    console.log('Clean phone number:', cleanPhone); // Debug log
    
    // Only proceed if we have a valid phone number
    if (cleanPhone && cleanPhone.length > 0) {
      // Create proper WhatsApp URL
      const whatsappUrl = `https://wa.me/${cleanPhone}?text=${encodeURIComponent(message)}`;
      console.log('WhatsApp URL:', whatsappUrl); // Debug log
      
      // Try to open WhatsApp
      try {
        window.open(whatsappUrl, '_blank');
        console.log('WhatsApp opened successfully!'); // Debug log
      } catch (error) {
        console.error('Error opening WhatsApp:', error);
        alert('Nu s-a putut deschide WhatsApp. Vă rugăm să încercați din nou.');
      }
    } else {
      console.warn('Invalid WhatsApp number:', siteData.contact.whatsapp);
      alert('Numărul WhatsApp nu este valid. Vă rugăm să sunați la 0755286670');
    }
  };

  // Navigation items with smooth scroll (removed 'home')
  const navItems = ['services', 'menu', 'pricing', 'offers', 'gallery', 'regulations', 'contact'];

  return (
    <>
      <header className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 shadow-2xl sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center">
              {/* Only Logo - No Text */}
              <div className="flex items-center">
                <img 
                  src="/ChatGPT Image 11 iun. 2025, 23_55_34.png" 
                  alt="Triple Fun Logo" 
                  className="h-12 w-auto drop-shadow-lg hover:scale-110 transition-transform duration-300 cursor-pointer"
                  onClick={() => smoothScrollTo('home')}
                />
              </div>
            </div>
            
            <nav className="hidden md:flex space-x-6">
              {navItems.map((item) => (
                <button 
                  key={item}
                  onClick={() => smoothScrollTo(item)}
                  className="text-white hover:text-blue-200 transition-all duration-300 font-semibold text-lg hover:scale-105 transform relative group"
                >
                  {t(`nav.${item}`)}
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-200 transition-all duration-300 group-hover:w-full"></span>
                </button>
              ))}
            </nav>

            <div className="hidden md:flex items-center space-x-4">
              <div className="flex items-center text-sm text-white bg-white bg-opacity-20 px-3 py-2 rounded-full backdrop-blur-sm">
                <Phone className="h-4 w-4 mr-2" />
                <span>{siteData?.contact?.phone || '0755286670'}</span>
              </div>
              
              <div className="flex items-center space-x-2">
                <div className="relative">
                  <button
                    onClick={() => setIsLanguageOpen(!isLanguageOpen)}
                    className="flex items-center text-white hover:text-blue-200 transition-colors bg-white bg-opacity-20 px-3 py-2 rounded-full backdrop-blur-sm"
                  >
                    <Globe className="h-4 w-4 mr-1" />
                    <span className="font-semibold">{currentLanguage?.flag} {currentLanguage?.code.toUpperCase()}</span>
                  </button>
                  
                  {isLanguageOpen && (
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border overflow-hidden z-50 animate-fadeIn">
                      {languages.map((lang) => (
                        <button
                          key={lang.code}
                          onClick={() => {
                            setLanguage(lang.code as any);
                            setIsLanguageOpen(false);
                          }}
                          className={`w-full px-4 py-3 text-left hover:bg-gray-50 flex items-center space-x-3 transition-colors ${
                            language === lang.code ? 'bg-blue-50 text-blue-600' : 'text-gray-700'
                          }`}
                        >
                          <span className="text-xl">{lang.flag}</span>
                          <span className="font-medium">{lang.name}</span>
                        </button>
                      ))}
                    </div>
                  )}
                </div>
                
                {isLoggedIn ? (
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={handleAdminToggle}
                      className="flex items-center text-white hover:text-blue-200 transition-colors bg-white bg-opacity-20 px-3 py-2 rounded-full backdrop-blur-sm ring-2 ring-green-300"
                    >
                      <Settings className="h-4 w-4" />
                      <span className="ml-1 text-xs">ADMIN</span>
                    </button>
                    <button
                      onClick={handleLogout}
                      className="flex items-center text-white hover:text-blue-200 transition-colors bg-white bg-opacity-20 px-3 py-2 rounded-full backdrop-blur-sm"
                      title="Logout"
                    >
                      <LogOut className="h-4 w-4" />
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={handleAdminToggle}
                    className="flex items-center text-white hover:text-blue-200 transition-colors bg-white bg-opacity-20 px-3 py-2 rounded-full backdrop-blur-sm"
                  >
                    <Settings className="h-4 w-4" />
                  </button>
                )}
              </div>
            </div>

            <button
              className="md:hidden p-2 text-white"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {isMenuOpen && (
          <div className="md:hidden bg-gradient-to-r from-purple-600 to-pink-600 border-t border-white border-opacity-20 animate-slideDown">
            <div className="px-4 py-2 space-y-2">
              {navItems.map((item) => (
                <button 
                  key={item}
                  onClick={() => smoothScrollTo(item)}
                  className="block w-full text-left py-3 text-white hover:text-blue-200 font-semibold transition-all duration-300 hover:pl-4"
                >
                  {t(`nav.${item}`)}
                </button>
              ))}
              <div className="flex items-center justify-between pt-4 border-t border-white border-opacity-20">
                <div className="relative">
                  <button
                    onClick={() => setIsLanguageOpen(!isLanguageOpen)}
                    className="flex items-center text-white hover:text-blue-200 transition-colors"
                  >
                    <Globe className="h-4 w-4 mr-2" />
                    <span>{currentLanguage?.flag} {currentLanguage?.name}</span>
                  </button>
                  
                  {isLanguageOpen && (
                    <div className="absolute left-0 mt-2 w-48 bg-white rounded-lg shadow-lg border overflow-hidden z-50 animate-fadeIn">
                      {languages.map((lang) => (
                        <button
                          key={lang.code}
                          onClick={() => {
                            setLanguage(lang.code as any);
                            setIsLanguageOpen(false);
                          }}
                          className={`w-full px-4 py-3 text-left hover:bg-gray-50 flex items-center space-x-3 transition-colors ${
                            language === lang.code ? 'bg-blue-50 text-blue-600' : 'text-gray-700'
                          }`}
                        >
                          <span className="text-xl">{lang.flag}</span>
                          <span className="font-medium">{lang.name}</span>
                        </button>
                      ))}
                    </div>
                  )}
                </div>
                
                {isLoggedIn ? (
                  <div className="flex items-center space-x-3">
                    <button
                      onClick={handleAdminToggle}
                      className="flex items-center text-white hover:text-blue-200 transition-colors ring-2 ring-green-300 rounded px-2 py-1"
                    >
                      <Settings className="h-4 w-4 mr-2" />
                      Admin
                    </button>
                    <button
                      onClick={handleLogout}
                      className="flex items-center text-white hover:text-blue-200 transition-colors"
                    >
                      <LogOut className="h-4 w-4 mr-2" />
                      Logout
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={handleAdminToggle}
                    className="flex items-center text-white hover:text-blue-200 transition-colors"
                  >
                    <Settings className="h-4 w-4 mr-2" />
                    Admin
                  </button>
                )}
              </div>
            </div>
          </div>
        )}
      </header>

      {/* Floating Action Buttons - ORDINEA CORECTĂ: WhatsApp, Call, Scroll Up */}
      <div className="fixed bottom-6 right-6 z-40 flex flex-col space-y-3">
        {/* 1. WhatsApp Button - VERDE (primul) */}
        <button
          onClick={openWhatsApp}
          className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white p-4 rounded-full shadow-2xl transition-all duration-300 transform hover:scale-110 group"
          title="Trimite mesaj WhatsApp"
        >
          <MessageCircle className="h-6 w-6 group-hover:animate-pulse" />
        </button>

        {/* 2. Call Button - ALBASTRU-MOV (al doilea) */}
        <button
          onClick={makeCall}
          className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white p-4 rounded-full shadow-2xl transition-all duration-300 transform hover:scale-110 group"
          title={`Sună: ${siteData?.contact?.phone || '0755286670'}`}
        >
          <Phone className="h-6 w-6 group-hover:animate-pulse" />
        </button>

        {/* 3. Scroll to Top Button - MOV-ROZ (al treilea) */}
        {showScrollTop && (
          <button
            onClick={scrollToTop}
            className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white p-4 rounded-full shadow-2xl transition-all duration-300 transform hover:scale-110 animate-fadeIn"
            title="Înapoi sus"
          >
            <ChevronUp className="h-6 w-6" />
          </button>
        )}
      </div>

      <LoginModal 
        isOpen={isLoginOpen} 
        onClose={() => setIsLoginOpen(false)} 
        onLogin={handleLogin}
      />
      
      {isLoggedIn && (
        <AdminPanel isOpen={isAdminOpen} onClose={() => setIsAdminOpen(false)} />
      )}
    </>
  );
};

export default Header;
