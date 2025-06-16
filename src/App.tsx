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
  const { isLoading: adminLoading } = useAdmin();
  const { isLoading: i18nLoading } = useLanguage();

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