import React, { useState } from 'react';
import { Coffee, Utensils, IceCream, Sandwich } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

const Menu = () => {
  const { t } = useLanguage();
  const [activeCategory, setActiveCategory] = useState('copii');

  const menuCategories = {
    copii: {
      title: t('menu.categories.kids'),
      icon: IceCream,
      items: [
        { 
          name: 'Crispy din mușchiuleț de pui', 
          description: '2 bucăți (100g) + 100g cartofi prăjiți + băutură la alegere', 
          price: '27 lei' 
        },
        { 
          name: 'Pizza Margherita (mini)', 
          description: 'Pizza specială pentru copii', 
          price: '20 lei' 
        },
        { 
          name: 'Paste cu sos de roșii', 
          description: 'Porție de copil cu parmezan', 
          price: '18 lei' 
        },
        { 
          name: 'Sandwich cu șuncă și cașcaval', 
          description: 'Pe pâine toast cu cartofi', 
          price: '15 lei' 
        },
        { 
          name: 'Înghețată 3 bile', 
          description: 'Vanilie, ciocolată, căpșuni', 
          price: '12 lei' 
        },
        { 
          name: 'Tort personalizat', 
          description: 'Comandă specială (min. 1kg)', 
          price: '150 lei' 
        }
      ]
    },
    adulti: {
      title: t('menu.categories.adults'),
      icon: Utensils,
      items: [
        { 
          name: 'Platou Grătar Mixt (10 persoane)', 
          description: '10 buc crispy pui + 10 buc ceafă + 10 buc mici + 650g cartofi prăjiți', 
          price: '350 lei' 
        },
        { 
          name: 'Platou Salamuri și Brânzeturi (10 persoane)', 
          description: 'Salamuri și brânzeturi italiene (2kg) servite cu focaccia', 
          price: '280 lei' 
        },
        { 
          name: 'Burger Classic', 
          description: 'Carne de vită, bacon, cașcaval, cartofi', 
          price: '35 lei' 
        },
        { 
          name: 'Salată Caesar', 
          description: 'Cu pui, crutoane, parmezan', 
          price: '28 lei' 
        },
        { 
          name: 'Pizza Quattro Stagioni', 
          description: 'Șuncă, ciuperci, măsline, ardei', 
          price: '32 lei' 
        },
        { 
          name: 'Paste Carbonara', 
          description: 'Cu bacon și parmezan', 
          price: '30 lei' 
        }
      ]
    },
    bauturi: {
      title: t('menu.categories.drinks'),
      icon: Coffee,
      items: [
        { 
          name: 'Sucuri naturale', 
          description: 'Portocale, mere, morcovi', 
          price: '8 lei' 
        },
        { 
          name: 'Limonadă fresh', 
          description: 'Preparată în casă', 
          price: '10 lei' 
        },
        { 
          name: 'Cafea espresso', 
          description: 'Blend premium', 
          price: '6 lei' 
        },
        { 
          name: 'Ceai vrac', 
          description: 'Diverse arome', 
          price: '5 lei' 
        },
        { 
          name: 'Smoothie fructe', 
          description: 'Banane, căpșuni, mango', 
          price: '15 lei' 
        },
        { 
          name: 'Apă minerală', 
          description: '0.5L sau 1.5L', 
          price: '4-6 lei' 
        }
      ]
    }
  };

  return (
    <section id="menu" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-800 mb-4">
            {t('menu.title')}
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {t('menu.subtitle')}
          </p>
        </div>

        <div className="flex flex-wrap justify-center mb-12 gap-4">
          {Object.entries(menuCategories).map(([key, category]) => (
            <button
              key={key}
              onClick={() => setActiveCategory(key)}
              className={`flex items-center px-6 py-3 rounded-full font-semibold transition-all ${
                activeCategory === key
                  ? 'bg-gradient-to-r from-orange-500 to-pink-500 text-white shadow-lg'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              <category.icon className="h-5 w-5 mr-2" />
              {category.title}
            </button>
          ))}
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {menuCategories[activeCategory].items.map((item, index) => (
            <div 
              key={index}
              className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-6 border hover:shadow-lg transition-all duration-300 group"
            >
              <div className="flex justify-between items-start mb-3">
                <h3 className="text-lg font-bold text-gray-800 group-hover:text-orange-500 transition-colors">
                  {item.name}
                </h3>
                <span className="text-2xl font-bold text-orange-500 ml-4">
                  {item.price}
                </span>
              </div>
              <p className="text-gray-600 text-sm leading-relaxed">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Menu;