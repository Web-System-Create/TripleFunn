import { Gamepad2, PartyPopper, Cake, Users, Shield, Music, Edit } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { useAdmin } from '../contexts/AdminContext';

const Services = () => {
  const { t } = useLanguage();
  const { siteData, isAdmin } = useAdmin();

  const iconMap = {
    Gamepad2,
    PartyPopper,
    Cake,
    Music,
    Shield,
    Users
  };

  const colorClasses = [
    'bg-gradient-to-br from-blue-400 to-purple-500',
    'bg-gradient-to-br from-purple-400 to-pink-500',
    'bg-gradient-to-br from-pink-400 to-purple-500',
    'bg-gradient-to-br from-blue-400 to-indigo-500',
    'bg-gradient-to-br from-purple-400 to-blue-500',
    'bg-gradient-to-br from-pink-400 to-purple-500'
  ];

  return (
    <section id="services" className="py-20 bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-6">
            {t('services.title')} 🎪
          </h2>
          <p className="text-2xl text-gray-700 max-w-4xl mx-auto font-medium">
            {t('services.subtitle')}
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {siteData.services.map((service, index) => {
            const IconComponent = iconMap[service.icon as keyof typeof iconMap];
            const colorClass = colorClasses[index % colorClasses.length];
            
            return (
              <div 
                key={service.id}
                className="bg-white rounded-3xl p-8 shadow-2xl hover:shadow-3xl transition-all duration-300 transform hover:-translate-y-4 hover:scale-105 group border-4 border-transparent hover:border-purple-300"
              >
                {isAdmin && (
                  <button className="absolute top-4 right-4 p-2 bg-gray-100 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                    <Edit className="h-4 w-4 text-gray-600" />
                  </button>
                )}
                <div className={`${colorClass} p-6 rounded-full w-20 h-20 flex items-center justify-center mb-8 group-hover:scale-125 transition-transform shadow-lg`}>
                  <IconComponent className="h-10 w-10 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-6 group-hover:text-purple-600 transition-colors">{service.title}</h3>
                <p className="text-gray-600 leading-relaxed text-lg">{service.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Services;