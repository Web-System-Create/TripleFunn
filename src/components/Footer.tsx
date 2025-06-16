import React from 'react';
import { MapPin, Phone, Mail, Facebook, Instagram, Heart } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

const Footer = () => {
  const { t } = useLanguage();

  return (
    <footer className="bg-gray-800 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center mb-6">
              <img 
                src="/ChatGPT Image 11 iun. 2025, 23_55_34.png" 
                alt="Triple Fun Logo" 
                className="h-10 w-auto mr-3"
              />
              <span className="text-2xl font-bold">Triple Fun</span>
            </div>
            <p className="text-gray-300 leading-relaxed mb-6">
              {t('footer.description')}
            </p>
            <div className="flex space-x-4">
              <a href="#" className="bg-blue-600 p-2 rounded-full hover:bg-blue-700 transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="bg-pink-600 p-2 rounded-full hover:bg-pink-700 transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-6">{t('footer.quickNav')}</h3>
            <ul className="space-y-3">
              <li><a href="#services" className="text-gray-300 hover:text-white transition-colors">{t('nav.services')}</a></li>
              <li><a href="#menu" className="text-gray-300 hover:text-white transition-colors">{t('nav.menu')}</a></li>
              <li><a href="#pricing" className="text-gray-300 hover:text-white transition-colors">{t('nav.pricing')}</a></li>
              <li><a href="#offers" className="text-gray-300 hover:text-white transition-colors">{t('nav.offers')}</a></li>
              <li><a href="#gallery" className="text-gray-300 hover:text-white transition-colors">{t('nav.gallery')}</a></li>
              <li><a href="#regulations" className="text-gray-300 hover:text-white transition-colors">{t('nav.regulations')}</a></li>
              <li><a href="#contact" className="text-gray-300 hover:text-white transition-colors">{t('nav.contact')}</a></li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-6">{t('footer.services')}</h3>
            <ul className="space-y-3 text-gray-300">
              <li>Petreceri Private</li>
              <li>Evenimente Corporate</li>
              <li>Animatori Profesioniști</li>
              <li>Catering Complet</li>
              <li>Zone de Joacă Exterior</li>
              <li>Piscină Încălzită</li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-6">{t('footer.contact')}</h3>
            <div className="space-y-4">
              <div className="flex items-center">
                <MapPin className="h-5 w-5 mr-3 text-orange-500" />
                <span className="text-gray-300">Strada Jocului Nr. 15, București</span>
              </div>
              <div className="flex items-center">
                <Phone className="h-5 w-5 mr-3 text-orange-500" />
                <span className="text-gray-300">0748 55 99 79</span>
              </div>
              <div className="flex items-center">
                <Mail className="h-5 w-5 mr-3 text-orange-500" />
                <span className="text-gray-300">contact@triplefun.ro</span>
              </div>
            </div>

            <div className="mt-6">
              <h4 className="font-semibold mb-3">{t('footer.schedule')}</h4>
              <div className="text-sm text-gray-300 space-y-1">
                <p>Luni - Joi: 10:00 - 20:00</p>
                <p>Vineri: 10:00 - 22:00</p>
                <p>Sâmb - Dum: 09:00 - 22:00</p>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-300 text-sm">
              {t('footer.copyright')}
            </p>
            <p className="text-gray-300 text-sm flex items-center mt-4 md:mt-0">
              {t('footer.madeWith')} <Heart className="h-4 w-4 mx-1 text-red-500 fill-current" /> {t('footer.forChildren')}
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;