import React from 'react';
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

function App() {
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