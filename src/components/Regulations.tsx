import React from 'react';
import { Shield, AlertTriangle, Users, Clock, Camera, Heart, CheckCircle, XCircle } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { useAdmin } from '../contexts/AdminContext';

const Regulations = () => {
  const { t, language } = useLanguage();
  const { siteData } = useAdmin();

  const iconMap = {
    Shield,
    AlertTriangle,
    Users,
    Clock,
    Camera,
    Heart,
    CheckCircle,
    XCircle
  };

  // Use regulations from admin context if available, otherwise use default
  const regulations = siteData.regulations || [
    {
      id: '1',
      icon: 'Users',
      title: "Vârsta și Accesul",
      items: [
        "Spațiul de distracție este destinat copiilor cu vârsta cuprinsă între 1 și 14 ani",
        "Părinții/Însoțitorii sunt obligați să aducă la cunoștință copiilor și însoțitorilor invitați prevederile prezentului regulament",
        "Daunele produse vor fi suportate de către cei care au închiriat locația/le-au produs"
      ],
      color: "bg-blue-500",
      bgColor: "bg-blue-50"
    },
    {
      id: '2',
      icon: 'Shield',
      title: "Încălțăminte și Igienă",
      items: [
        "Accesul copiilor în spațiul de joacă este permis doar cu încălțări de schimb neutilizate în exterior (papuci de casă, botoșei, șosete curate)",
        "Accesul adulților în spațiul de joacă este permis doar cu protecție încălțăminte de unică folosință (disponibilă gratuit la intrare)",
        "Toți utilizatorii își vor spăla și dezinfecta mâinile înainte de joacă, precum și după folosirea WC-ului"
      ],
      color: "bg-green-500",
      bgColor: "bg-green-50"
    },
    {
      id: '3',
      icon: 'AlertTriangle',
      title: "Obiecte Interzise",
      items: [
        "Este interzis accesul în zona copiilor cu obiecte mici sau ascuțite care pot deteriora elementele de joacă (cuțite, creioane, agrafe, monezi, cordoane, brățări, cercei mari, lanțuri, etc.)",
        "Prin nerespectarea acestei reguli, adulții care au adus copiii își asumă întreaga responsabilitate în eventualele incidente",
        "Este interzis accesul cu guma de mestecat, acadele și înghețată în zona de joacă"
      ],
      color: "bg-red-500",
      bgColor: "bg-red-50"
    },
    {
      id: '4',
      icon: 'XCircle',
      title: "Mâncare și Băuturi",
      items: [
        "Este interzis accesul și consumul de mâncare sau băuturi în zona de joacă",
        "Acestea se consumă doar la mesele din zona de luat masa",
        "Nu sunt acceptați copii bolnavi în incinta locului de joacă"
      ],
      color: "bg-orange-500",
      bgColor: "bg-orange-50"
    },
    {
      id: '5',
      icon: 'Heart',
      title: "Comportament și Siguranță",
      items: [
        "Nu sunt admise: comportamentul violent, jocurile agresive sau loviturile aplicate copiilor",
        "Vă rugăm să utilizați echipamentele de joacă și jucăriile conform scopului lor și cu respect pentru ceilalți",
        "Părinții sunt direct răspunzători de toți copiii pe care îi invită la petrecerile organizate"
      ],
      color: "bg-purple-500",
      bgColor: "bg-purple-50"
    },
    {
      id: '6',
      icon: 'Clock',
      title: "Rezervări și Plăți",
      items: [
        "Cu 48h înainte de eveniment, comunicați numărul total de persoane participante la tel: 0748 55 99 79",
        "Avansul nu se returnează",
        "În cazul daunelor materiale din neglijență, se va achita contravaloarea obiectelor deteriorate"
      ],
      color: "bg-indigo-500",
      bgColor: "bg-indigo-50"
    },
    {
      id: '7',
      icon: 'Camera',
      title: "Filmări și Fotografii",
      items: [
        "În acest spațiu SE VA FILMA/FOTOGRAFIA în cadrul evenimentelor pentru distribuirea pe rețelele de socializare",
        "Prin participarea la evenimente vă exprimați acordul privind cele de mai sus",
        "Dacă nu doriți acest lucru, vă rugăm să ne comunicați verbal și în scris"
      ],
      color: "bg-pink-500",
      bgColor: "bg-pink-50"
    }
  ];

  // Get regulation texts from admin context with fallback to defaults
  const getRegulationText = (key: string) => {
    return siteData.regulationTexts?.[key]?.[language] || '';
  };

  return (
    <section id="regulations" className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-6">
            {t('regulations.title')} 📋
          </h2>
          <p className="text-2xl text-gray-700 max-w-4xl mx-auto font-medium">
            {t('regulations.subtitle')}
          </p>
        </div>

        {/* Important Notice */}
        <div className="bg-gradient-to-r from-red-500 to-pink-500 rounded-3xl p-8 text-white mb-12 text-center">
          <AlertTriangle className="h-12 w-12 mx-auto mb-4" />
          <h3 className="text-2xl font-bold mb-4">
            {getRegulationText('warningTitle') || '⚠️ ATENȚIE IMPORTANTĂ ⚠️'}
          </h3>
          <p className="text-xl font-semibold">
            {getRegulationText('warningText') || 'NERESPECTAREA REGULILOR ATRAGE DUPĂ SINE O TAXĂ SUPLIMENTARĂ DE 300 LEI (reprezentând taxa de curățenie)'}
          </p>
        </div>

        {/* Regulations Grid */}
        <div className="grid lg:grid-cols-2 gap-8 mb-12">
          {regulations.map((section, index) => {
            const IconComponent = iconMap[section.icon as keyof typeof iconMap] || Shield;
            
            return (
              <div 
                key={section.id}
                className={`${section.bgColor} rounded-2xl p-8 border-l-4 border-${section.color.split('-')[1]}-500 hover:shadow-lg transition-all duration-300 group`}
              >
                <div className="flex items-start mb-6">
                  <div className={`${section.color} p-3 rounded-full mr-4 group-hover:scale-110 transition-transform`}>
                    <IconComponent className="h-6 w-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-gray-800 mb-4">{section.title}</h3>
                    <ul className="space-y-3">
                      {section.items.map((item, itemIndex) => (
                        <li key={itemIndex} className="flex items-start">
                          <CheckCircle className="h-5 w-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                          <span className="text-gray-700 text-sm leading-relaxed">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Additional Important Rules */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <div className="bg-yellow-50 border-l-4 border-yellow-500 rounded-2xl p-6">
            <div className="flex items-center mb-4">
              <AlertTriangle className="h-6 w-6 text-yellow-500 mr-3" />
              <h4 className="font-bold text-gray-800">Obiecte de Valoare</h4>
            </div>
            <p className="text-gray-700">
              Nu lăsați obiecte de valoare nesupravegheate. Nu ne asumăm răspunderea în cazul pierderii sau distrugerii acestora.
            </p>
          </div>

          <div className="bg-red-50 border-l-4 border-red-500 rounded-2xl p-6">
            <div className="flex items-center mb-4">
              <XCircle className="h-6 w-6 text-red-500 mr-3" />
              <h4 className="font-bold text-gray-800">Animale de Companie</h4>
            </div>
            <p className="text-gray-700">
              Prietenii noștri, animalele, nu sunt autorizați să intre în spațiul de joacă.
            </p>
          </div>
        </div>

        {/* Final Warning */}
        <div className="bg-gradient-to-r from-gray-800 to-gray-900 rounded-3xl p-8 text-white text-center">
          <Shield className="h-12 w-12 mx-auto mb-4 text-yellow-300" />
          <h3 className="text-2xl font-bold mb-4">
            {getRegulationText('refusalTitle') || 'Dreptul de Refuz'}
          </h3>
          <p className="text-lg mb-6">
            {getRegulationText('refusalText') || 'Ne rezervăm dreptul de a interzice accesul oricărei persoane care nu respectă regulamentele de securitate sau prezintă un comportament agresiv sau periculos. În cazul nerespectării prezentului regulament, ne vedem obligați să evacuăm persoanele în cauză și să le interzicem accesul în incinta locului de joacă.'}
          </p>
          <div className="bg-yellow-500 text-gray-900 rounded-2xl p-4 font-bold text-xl">
            {getRegulationText('acceptanceText') || '🚪 INTRAREA ÎN SALA DE JOACĂ SE CONSIDERĂ ACCEPTUL DVS. A TERMENILOR ȘI CONDIȚIILOR!'}
          </div>
        </div>

        {/* Thank You Message */}
        <div className="text-center mt-12">
          <div className="bg-gradient-to-r from-green-500 to-blue-500 rounded-3xl p-8 text-white">
            <Heart className="h-12 w-12 mx-auto mb-4 text-pink-300" />
            <h3 className="text-3xl font-bold mb-4">
              {getRegulationText('thankYouTitle') || 'VĂ MULȚUMIM! 🙏'}
            </h3>
            <p className="text-xl">
              {getRegulationText('thankYouText') || 'Pentru înțelegere și pentru că ne ajutați să menținem Triple Fun un loc sigur și distractiv pentru toți copiii!'}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Regulations;