import React from 'react';
import { Check, Star, Crown, Gift } from 'lucide-react';
import { useAdmin } from '../contexts/AdminContext';
import { useLanguage } from '../contexts/LanguageContext';

const Pricing = () => {
  const { siteData } = useAdmin();
  const { t } = useLanguage();

  const iconMap = {
    'Gift': Gift,
    'Star': Star,
    'Crown': Crown
  };

  return (
    <section id="pricing" className="py-20 bg-gradient-to-br from-blue-50 to-purple-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-800 mb-4">
            {t('pricing.title')}
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {t('pricing.subtitle')}
          </p>
        </div>

        <div className="grid lg:grid-cols-2 xl:grid-cols-4 gap-8">
          {siteData.pricing.map((pkg, index) => {
            const IconComponent = pkg.name.includes('Basic') ? Gift : 
                                 pkg.name.includes('Standard') ? Star : Crown;
            
            return (
              <div 
                key={pkg.id}
                className={`relative bg-white rounded-3xl p-8 shadow-xl border-2 ${
                  pkg.popular ? 'border-purple-500 scale-105 lg:scale-110 z-10' : 'border-gray-200'
                } transition-all duration-300 hover:scale-105`}
              >
                {pkg.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <span className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-6 py-2 rounded-full text-sm font-bold">
                      {t('pricing.popular')}
                    </span>
                  </div>
                )}

                <div className="text-center mb-8">
                  <div className={`inline-flex p-4 rounded-full mb-4 ${
                    pkg.popular ? 'bg-purple-100' : 'bg-gray-100'
                  }`}>
                    <IconComponent className={`h-8 w-8 ${
                      pkg.popular ? 'text-purple-500' : 'text-gray-600'
                    }`} />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-800 mb-2">{pkg.name}</h3>
                  <p className="text-gray-600 mb-4">{pkg.description}</p>
                  <div className="mb-4">
                    <span className="text-5xl font-bold text-gray-800">{pkg.price}</span>
                    <span className="text-gray-600 ml-2">lei</span>
                  </div>
                  <p className="text-purple-500 font-semibold">{pkg.duration} de distracție</p>
                </div>

                <ul className="space-y-4 mb-8">
                  {pkg.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-start">
                      <Check className="h-5 w-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700 text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>

                <button className={`w-full ${
                  pkg.popular ? 'bg-purple-500 hover:bg-purple-600' : 'bg-gray-600 hover:bg-gray-700'
                } text-white py-4 rounded-full font-semibold transition-all transform hover:scale-105 shadow-lg`}>
                  {t('pricing.book')}
                </button>
              </div>
            );
          })}
        </div>

        <div className="mt-16 text-center">
          <div className="bg-white rounded-2xl p-8 shadow-lg max-w-4xl mx-auto">
            <h3 className="text-2xl font-bold text-gray-800 mb-4">{t('pricing.additional')}</h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 text-sm">
              <div className="text-center">
                <div className="font-semibold text-gray-800">{t('pricing.extras.animators')}</div>
                <div className="text-purple-500">50 lei/oră</div>
              </div>
              <div className="text-center">
                <div className="font-semibold text-gray-800">{t('pricing.extras.time')}</div>
                <div className="text-purple-500">30 lei/oră</div>
              </div>
              <div className="text-center">
                <div className="font-semibold text-gray-800">{t('pricing.extras.decorations')}</div>
                <div className="text-purple-500">De la 25 lei</div>
              </div>
              <div className="text-center">
                <div className="font-semibold text-gray-800">{t('pricing.extras.transport')}</div>
                <div className="text-purple-500">20 lei</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Pricing;