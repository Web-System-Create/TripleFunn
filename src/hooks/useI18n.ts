import { useState, useEffect } from 'react';

export type Language = 'ro' | 'en' | 'hu';

interface TranslationData {
  [key: string]: any;
}

interface UseI18nReturn {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
  translations: Record<Language, TranslationData>;
  updateTranslation: (key: string, language: Language, value: string) => void;
  isLoading: boolean;
}

const STORAGE_KEY = 'triple-fun-language';

// Default translations embedded in the hook as fallback
const defaultTranslations: Record<Language, TranslationData> = {
  ro: {
    nav: {
      services: "Servicii",
      menu: "Meniu",
      pricing: "Prețuri",
      offers: "Oferte",
      contact: "Contact",
      gallery: "Galerie",
      regulations: "Regulament",
      admin: "Admin"
    },
    hero: {
      title: "Cea mai",
      titleHighlight: "distractivă",
      titleEnd: "petrecere",
      subtitle: "Locul perfect pentru petreceri de copii, evenimente speciale și distracție în familie. Oferim experiențe memorabile într-un mediu sigur și prietenos.",
      ctaBook: "Rezervă Acum",
      ctaMenu: "Vezi Meniul",
      stats: {
        parties: "Petreceri reușite",
        experience: "Ani experiență",
        children: "Copii pe zi"
      }
    },
    services: {
      title: "Serviciile Noastre",
      subtitle: "Oferim o gamă completă de servicii pentru a face experiența ta și a copilului tău una specială"
    },
    menu: {
      title: "Meniul Nostru",
      subtitle: "Preparate delicioase pentru copii și adulți, pregătite cu ingrediente proaspete și multă dragoste",
      categories: {
        kids: "Meniu Copii",
        adults: "Meniu Adulți",
        drinks: "Băuturi"
      }
    },
    pricing: {
      title: "Pachete Petreceri",
      subtitle: "Alege pachetul perfect pentru petrecerea copilului tău. Toate pachetele includ acces complet la zonele de joacă",
      popular: "Cel mai popular",
      book: "Rezervă Acum",
      additional: "Servicii Adiționale",
      extras: {
        animators: "Animatori extra",
        time: "Prelungire timp",
        decorations: "Decorațiuni extra",
        transport: "Transport tort"
      }
    },
    offers: {
      title: "Oferte Speciale",
      subtitle: "Profită de ofertele noastre speciale și economisește la petrecerea perfectă pentru copilul tău",
      cta: {
        title: "Hai să facem o petrecere de neuitat!",
        subtitle: "Contactează-ne acum pentru a rezerva data dorită și pentru a primi o ofertă personalizată",
        call: "Sună Acum",
        whatsapp: "Trimite Mesaj WhatsApp"
      }
    },
    gallery: {
      title: "Galeria Noastră",
      subtitle: "Descoperă atmosfera magică și momentele speciale de la Triple Fun",
      filters: {
        all: "Toate",
        playground: "Zone de Joacă",
        parties: "Petreceri",
        food: "Mâncare",
        events: "Evenimente"
      }
    },
    regulations: {
      title: "Regulamentul Nostru",
      subtitle: "Pentru siguranța și confortul tuturor, vă rugăm să respectați regulamentul nostru"
    },
    contact: {
      title: "Contactează-ne",
      subtitle: "Suntem aici pentru tine! Contactează-ne pentru rezervări sau pentru orice întrebare"
    },
    footer: {
      description: "Locul perfect pentru petreceri de copii și distracție în familie. Creăm amintiri de neuitat într-un mediu sigur și prietenos.",
      quickNav: "Navigare Rapidă",
      services: "Servicii",
      contact: "Contact",
      schedule: "Program",
      copyright: "© 2024 Triple Fun. Toate drepturile rezervate.",
      madeWith: "Făcut cu",
      forChildren: "pentru copii"
    }
  },
  en: {
    nav: {
      services: "Services",
      menu: "Menu",
      pricing: "Pricing",
      offers: "Offers",
      contact: "Contact",
      gallery: "Gallery",
      regulations: "Regulations",
      admin: "Admin"
    },
    hero: {
      title: "The most",
      titleHighlight: "fun",
      titleEnd: "party",
      subtitle: "The perfect place for children's parties, special events and family fun. We offer memorable experiences in a safe and friendly environment.",
      ctaBook: "Book Now",
      ctaMenu: "View Menu",
      stats: {
        parties: "Successful parties",
        experience: "Years experience",
        children: "Children per day"
      }
    },
    services: {
      title: "Our Services",
      subtitle: "We offer a complete range of services to make your and your child's experience special"
    },
    menu: {
      title: "Our Menu",
      subtitle: "Delicious dishes for children and adults, prepared with fresh ingredients and lots of love",
      categories: {
        kids: "Kids Menu",
        adults: "Adults Menu",
        drinks: "Drinks"
      }
    },
    pricing: {
      title: "Party Packages",
      subtitle: "Choose the perfect package for your child's party. All packages include full access to play areas",
      popular: "Most Popular",
      book: "Book Now",
      additional: "Additional Services",
      extras: {
        animators: "Extra animators",
        time: "Time extension",
        decorations: "Extra decorations",
        transport: "Cake delivery"
      }
    },
    offers: {
      title: "Special Offers",
      subtitle: "Take advantage of our special offers and save on the perfect party for your child",
      cta: {
        title: "Let's make an unforgettable party!",
        subtitle: "Contact us now to book your desired date and receive a personalized offer",
        call: "Call Now",
        whatsapp: "Send WhatsApp Message"
      }
    },
    gallery: {
      title: "Our Gallery",
      subtitle: "Discover the magical atmosphere and special moments at Triple Fun",
      filters: {
        all: "All",
        playground: "Playground",
        parties: "Parties",
        food: "Food",
        events: "Events"
      }
    },
    regulations: {
      title: "Our Regulations",
      subtitle: "For everyone's safety and comfort, please follow our regulations"
    },
    contact: {
      title: "Contact Us",
      subtitle: "We are here for you! Contact us for reservations or any questions"
    },
    footer: {
      description: "The perfect place for children's parties and family fun. We create unforgettable memories in a safe and friendly environment.",
      quickNav: "Quick Navigation",
      services: "Services",
      contact: "Contact",
      schedule: "Schedule",
      copyright: "© 2024 Triple Fun. All rights reserved.",
      madeWith: "Made with",
      forChildren: "for children"
    }
  },
  hu: {
    nav: {
      services: "Szolgáltatások",
      menu: "Menü",
      pricing: "Árak",
      offers: "Ajánlatok",
      contact: "Kapcsolat",
      gallery: "Galéria",
      regulations: "Szabályzat",
      admin: "Admin"
    },
    hero: {
      title: "A leg",
      titleHighlight: "szórakoztatóbb",
      titleEnd: "buli",
      subtitle: "A tökéletes hely gyerekbulikhoz, különleges eseményekhez és családi szórakozáshoz. Emlékezetes élményeket kínálunk biztonságos és barátságos környezetben.",
      ctaBook: "Foglalj Most",
      ctaMenu: "Menü Megtekintése",
      stats: {
        parties: "Sikeres bulik",
        experience: "Év tapasztalat",
        children: "Gyerek naponta"
      }
    },
    services: {
      title: "Szolgáltatásaink",
      subtitle: "Teljes körű szolgáltatásokat kínálunk, hogy a te és gyermeked élménye különleges legyen"
    },
    menu: {
      title: "Menünk",
      subtitle: "Finom ételek gyerekeknek és felnőtteknek, friss alapanyagokból és sok szeretettel készítve",
      categories: {
        kids: "Gyerek Menü",
        adults: "Felnőtt Menü",
        drinks: "Italok"
      }
    },
    pricing: {
      title: "Buli Csomagok",
      subtitle: "Válaszd ki a tökéletes csomagot gyermeked bulijához. Minden csomag teljes hozzáférést biztosít a játékterületekhez",
      popular: "Legnépszerűbb",
      book: "Foglalj Most",
      additional: "Kiegészítő Szolgáltatások",
      extras: {
        animators: "Extra animátorok",
        time: "Időhosszabbítás",
        decorations: "Extra dekorációk",
        transport: "Torta szállítás"
      }
    },
    offers: {
      title: "Különleges Ajánlatok",
      subtitle: "Használd ki különleges ajánlatainkat és spórolj gyermeked tökéletes buliján",
      cta: {
        title: "Csináljunk egy felejthetetlen bulit!",
        subtitle: "Lépj kapcsolatba velünk most, hogy lefoglald a kívánt dátumot és kapj személyre szabott ajánlatot",
        call: "Hívj Most",
        whatsapp: "WhatsApp Üzenet Küldése"
      }
    },
    gallery: {
      title: "Galériánk",
      subtitle: "Fedezd fel a varázslatos hangulatot és különleges pillanatokat a Triple Fun-ban",
      filters: {
        all: "Összes",
        playground: "Játszótér",
        parties: "Bulik",
        food: "Étel",
        events: "Események"
      }
    },
    regulations: {
      title: "Szabályzatunk",
      subtitle: "Mindenki biztonsága és kényelme érdekében kérjük, tartsd be szabályzatunkat"
    },
    contact: {
      title: "Kapcsolat",
      subtitle: "Itt vagyunk neked! Lépj kapcsolatba velünk foglalásokért vagy bármilyen kérdésért"
    },
    footer: {
      description: "A tökéletes hely gyerekbulikhoz és családi szórakozáshoz. Felejthetetlen emlékeket teremtünk biztonságos és barátságos környezetben.",
      quickNav: "Gyors Navigáció",
      services: "Szolgáltatások",
      contact: "Kapcsolat",
      schedule: "Nyitvatartás",
      copyright: "© 2024 Triple Fun. Minden jog fenntartva.",
      madeWith: "Készítve",
      forChildren: "gyerekekért"
    }
  }
};

export const useI18n = (): UseI18nReturn => {
  const [language, setLanguageState] = useState<Language>(() => {
    if (typeof window !== 'undefined') {
      return (localStorage.getItem(STORAGE_KEY) as Language) || 'ro';
    }
    return 'ro';
  });

  const [translations, setTranslations] = useState<Record<Language, TranslationData>>(defaultTranslations);
  const [isLoading, setIsLoading] = useState(false);

  // Load translations from JSON files on mount and language change
  useEffect(() => {
    const loadTranslations = async () => {
      setIsLoading(true);
      try {
        const languages: Language[] = ['ro', 'en', 'hu'];
        const loadedTranslations: Record<Language, TranslationData> = {} as Record<Language, TranslationData>;

        await Promise.all(
          languages.map(async (lang) => {
            try {
              const response = await fetch(`/i18n/${lang}.json`);
              if (response.ok) {
                loadedTranslations[lang] = await response.json();
              } else {
                // Fallback to default translations
                loadedTranslations[lang] = defaultTranslations[lang];
              }
            } catch (error) {
              console.warn(`Failed to load ${lang} translations, using defaults:`, error);
              loadedTranslations[lang] = defaultTranslations[lang];
            }
          })
        );

        setTranslations(loadedTranslations);
      } catch (error) {
        console.error('Error loading translations:', error);
        setTranslations(defaultTranslations);
      } finally {
        setIsLoading(false);
      }
    };

    loadTranslations();
  }, []);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    if (typeof window !== 'undefined') {
      localStorage.setItem(STORAGE_KEY, lang);
    }
  };

  const getNestedValue = (obj: any, path: string): any => {
    return path.split('.').reduce((current, key) => {
      return current && current[key] !== undefined ? current[key] : undefined;
    }, obj);
  };

  const t = (key: string): string => {
    // Try to get value from current language
    let value = getNestedValue(translations[language], key);
    
    // If not found, try Romanian as fallback
    if (value === undefined && language !== 'ro') {
      value = getNestedValue(translations.ro, key);
    }
    
    // If still not found, return the key itself
    return typeof value === 'string' ? value : key;
  };

  const setNestedValue = (obj: any, path: string, value: string): void => {
    const keys = path.split('.');
    const lastKey = keys.pop()!;
    const target = keys.reduce((current, key) => {
      if (!current[key] || typeof current[key] !== 'object') {
        current[key] = {};
      }
      return current[key];
    }, obj);
    target[lastKey] = value;
  };

  const updateTranslation = async (key: string, lang: Language, value: string) => {
    // Update local state immediately
    const newTranslations = JSON.parse(JSON.stringify(translations)); // Deep clone
    setNestedValue(newTranslations[lang], key, value);
    setTranslations(newTranslations);
    
    // Save to server (JSON file)
    try {
      const response = await fetch(`/api/translations/${lang}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newTranslations[lang])
      });
      
      if (!response.ok) {
        console.warn('Failed to save translation to server, keeping local changes');
      }
    } catch (error) {
      console.warn('Failed to save translation to server:', error);
      // Keep local changes even if server save fails
    }
  };

  return {
    language,
    setLanguage,
    t,
    translations,
    updateTranslation,
    isLoading
  };
};