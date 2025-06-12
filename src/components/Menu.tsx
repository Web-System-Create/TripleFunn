import React, { useState } from 'react';
import { Coffee, Utensils, IceCream, Sandwich } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

const Menu = () => {
  const { t } = useLanguage();
  const [activeCategory, setActiveCategory] = useState('copii');

  const menuCategories = {
    copii: {
      title: t('menu.category.copii'),
      icon: IceCream,
      items: [
        { 
          name: t('menu.kids.crispy'), 
          description: t('menu.kids.crispy.desc'), 
          price: '27 lei' 
        },
        { 
          name: t('menu.kids.pizza'), 
          description: t('menu.kids.pizza.desc'), 
          price: '20 lei' 
        },
        { 
          name: t('menu.kids.pasta'), 
          description: t('menu.kids.pasta.desc'), 
          price: '18 lei' 
        },
        { 
          name: t('menu.kids.sandwich'), 
          description: t('menu.kids.sandwich.desc'), 
          price: '15 lei' 
        },
        { 
          name: t('menu.kids.icecream'), 
          description: t('menu.kids.icecream.desc'), 
          price: '12 lei' 
        },
        { 
          name: t('menu.kids.cake'), 
          description: t('menu.kids.cake.desc'), 
          price: '150 lei' 
        }
      ]
    },
    adulti: {
      title: t('menu.category.adulti'),
      icon: Utensils,
      items: [
        { 
          name: t('menu.adults.grill'), 
          description: t('menu.adults.grill.desc'), 
          price: '350 lei' 
        },
        { 
          name: t('menu.adults.charcuterie'), 
          description: t('menu.adults.charcuterie.desc'), 
          price: '280 lei' 
        },
        { 
          name: t('menu.adults.burger'), 
          description: t('menu.adults.burger.desc'), 
          price: '35 lei' 
        },
        { 
          name: t('menu.adults.caesar'), 
          description: t('menu.adults.caesar.desc'), 
          price: '28 lei' 
        },
        { 
          name: t('menu.adults.pizza'), 
          description: t('menu.adults.pizza.desc'), 
          price: '32 lei' 
        },
        { 
          name: t('menu.adults.carbonara'), 
          description: t('menu.adults.carbonara.desc'), 
          price: '30 lei' 
        }
      ]
    },
    bauturi: {
      title: t('menu.category.bauturi'),
      icon: Coffee,
      items: [
        { 
          name: t('menu.drinks.juice'), 
          description: t('menu.drinks.juice.desc'), 
          price: '8 lei' 
        },
        { 
          name: t('menu.drinks.lemonade'), 
          description: t('menu.drinks.lemonade.desc'), 
          price: '10 lei' 
        },
        { 
          name: t('menu.drinks.coffee'), 
          description: t('menu.drinks.coffee.desc'), 
          price: '6 lei' 
        },
        { 
          name: t('menu.drinks.tea'), 
          description: t('menu.drinks.tea.desc'), 
          price: '5 lei' 
        },
        { 
          name: t('menu.drinks.smoothie'), 
          description: t('menu.drinks.smoothie.desc'), 
          price: '15 lei' 
        },
        { 
          name: t('menu.drinks.water'), 
          description: t('menu.drinks.water.desc'), 
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