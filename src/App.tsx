import Header from './components/Header';
import Hero from './components/Hero';
import FullWidthGallery from './components/FullWidthGallery';
import Services from './components/Services';
import Menu from './components/Menu';
import Pricing from './components/Pricing';
import Offers from './components/Offers';
import Gallery from './components/Gallery';
import Regulations from './components/Regulations';
import Contact from './components/Contact';
import Footer from './components/Footer';
import { useAdmin } from './contexts/AdminContext';
import { useLanguage } from './contexts/LanguageContext';

function App() {
  const { isLoading: adminLoading, siteData } = useAdmin();
  const { isLoading: i18nLoading, translations } = useLanguage();

  // Show loading screen while data is being loaded
  if (adminLoading || i18nLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-400 via-purple-500 to-pink-500 flex items-center justify-center">
        <div className="text-center text-white">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-white mx-auto mb-8"></div>
          <h2 className="text-3xl font-bold mb-4">Triple Fun</h2>
          <p className="text-xl opacity-90">Se încarcă...</p>
        </div>
      </div>
    );
  }

  // Verify we have essential data
  if (!siteData || !siteData.services || !siteData.pricing || !siteData.contact) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-400 via-orange-500 to-pink-500 flex items-center justify-center">
        <div className="text-center text-white">
          <h2 className="text-3xl font-bold mb-4">Eroare de încărcare</h2>
          <p className="text-xl opacity-90">Datele site-ului nu au putut fi încărcate</p>
          <div className="mt-4 text-sm opacity-75">
            <div>Services: {siteData?.services ? '✅' : '❌'}</div>
            <div>Pricing: {siteData?.pricing ? '✅' : '❌'}</div>
            <div>Contact: {siteData?.contact ? '✅' : '❌'}</div>
          </div>
          <button 
            onClick={() => window.location.reload()} 
            className="mt-4 bg-white text-red-500 px-6 py-2 rounded-full font-semibold hover:bg-gray-100"
          >
            Reîncarcă Pagina
          </button>
        </div>
      </div>
    );
  }

  // Verify we have translations
  if (!translations || Object.keys(translations).length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-yellow-400 via-orange-500 to-red-500 flex items-center justify-center">
        <div className="text-center text-white">
          <h2 className="text-3xl font-bold mb-4">Eroare traduceri</h2>
          <p className="text-xl opacity-90">Traducerile nu au putut fi încărcate</p>
          <div className="mt-4 text-sm opacity-75">
            <div>Verifică că fișierele /public/i18n/ro.json, en.json, hu.json există</div>
          </div>
          <button 
            onClick={() => window.location.reload()} 
            className="mt-4 bg-white text-orange-500 px-6 py-2 rounded-full font-semibold hover:bg-gray-100"
          >
            Reîncarcă Pagina
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <Header />
      <Hero />
      <FullWidthGallery />
      <Services />
      <Menu />
      <Pricing />
      <Offers />
      <Gallery />
      <Regulations />
      <Contact />
      <Footer />
    </div>
  );
}

export default App;