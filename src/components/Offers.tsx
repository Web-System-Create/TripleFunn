import React from 'react';
import { Percent, Clock, Users, Calendar } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

const Offers = () => {
  const { t } = useLanguage();

  const offers = [
    {
      icon: Percent,
      title: t('offers.discount.title'),
      description: t('offers.discount.desc'),
      validUntil: t('offers.discount.valid'),
      color: 'bg-blue-500',
      bgColor: 'bg-blue-50'
    },
    {
      icon: Users,
      title: t('offers.free.title'),
      description: t('offers.free.desc'),
      validUntil: t('offers.free.valid'),
      color: 'bg-purple-500',
      bgColor: 'bg-purple-50'
    },
    {
      icon: Calendar,
      title: t('offers.anniversary.title'),
      description: t('offers.anniversary.desc'),
      validUntil: t('offers.anniversary.valid'),
      color: 'bg-pink-500',
      bgColor: 'bg-pink-50'
    },
    {
      icon: Clock,
      title: t('offers.happy.title'),
      description: t('offers.happy.desc'),
      validUntil: t('offers.happy.valid'),
      color: 'bg-indigo-500',
      bgColor: 'bg-indigo-50'
    }
  ];

  return (
    <section id="offers" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-800 mb-4">
            {t('offers.title')}
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {t('offers.subtitle')}
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {offers.map((offer, index) => (
            <div 
              key={index}
              className={`${offer.bgColor} rounded-2xl p-8 border-l-4 border-${offer.color.split('-')[1]}-500 hover:shadow-lg transition-all duration-300 group`}
            >
              <div className="flex items-start mb-6">
                <div className={`${offer.color} p-3 rounded-full mr-4 group-hover:scale-110 transition-transform`}>
                  <offer.icon className="h-6 w-6 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-gray-800 mb-2">{offer.title}</h3>
                  <p className="text-gray-700 leading-relaxed mb-3">{offer.description}</p>
                  <span className="text-sm text-gray-500 italic">{offer.validUntil}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-gradient-to-r from-blue-500 to-purple-500 rounded-3xl p-8 text-center text-white">
          <h3 className="text-3xl font-bold mb-4">{t('offers.cta.title')}</h3>
          <p className="text-xl mb-8 opacity-90">
            {t('offers.cta.subtitle')}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-blue-500 px-8 py-4 rounded-full font-semibold hover:bg-gray-100 transition-all transform hover:scale-105">
              {t('offers.cta.call')}
            </button>
            <button className="border-2 border-white text-white px-8 py-4 rounded-full font-semibold hover:bg-white hover:text-blue-500 transition-all">
              {t('offers.cta.whatsapp')}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Offers;