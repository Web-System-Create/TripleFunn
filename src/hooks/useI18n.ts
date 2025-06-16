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
  saveTranslations: () => Promise<boolean>;
  isLoading: boolean;
}

const STORAGE_KEY = 'triple-fun-language';
const API_BASE_URL = 'http://localhost:3001/api';

export const useI18n = (): UseI18nReturn => {
  const [language, setLanguageState] = useState<Language>(() => {
    if (typeof window !== 'undefined') {
      return (localStorage.getItem(STORAGE_KEY) as Language) || 'ro';
    }
    return 'ro';
  });

  const [translations, setTranslations] = useState<Record<Language, TranslationData>>({
    ro: { language: 'ro' },
    en: { language: 'en' },
    hu: { language: 'hu' }
  });
  const [isLoading, setIsLoading] = useState(true);

  // Load translations ONLY from local JSON files (no API dependency for clients)
  useEffect(() => {
    const loadTranslations = async () => {
      setIsLoading(true);
      console.log('🌐 Loading translations from local files...');
      
      try {
        const languages: Language[] = ['ro', 'en', 'hu'];
        const loadedTranslations: Record<Language, TranslationData> = {} as Record<Language, TranslationData>;
        
        const loadPromises = languages.map(async (lang) => {
          try {
            console.log(`📥 Loading ${lang} translations...`);
            const response = await fetch(`/i18n/${lang}.json`);
            
            if (response.ok) {
              const data = await response.json();
              console.log(`✅ Successfully loaded ${lang} translations`);
              loadedTranslations[lang] = { ...data, language: lang };
            } else {
              console.warn(`❌ Failed to load ${lang} translations - Status: ${response.status}`);
              loadedTranslations[lang] = createFallbackTranslations(lang);
            }
          } catch (error) {
            console.error(`❌ Error loading ${lang} translations:`, error);
            loadedTranslations[lang] = createFallbackTranslations(lang);
          }
        });

        await Promise.all(loadPromises);
        
        console.log('🎯 All translations loaded successfully');
        setTranslations(loadedTranslations);
      } catch (error) {
        console.error('💥 Critical error loading translations:', error);
        const fallbackTranslations = {
          ro: createFallbackTranslations('ro'),
          en: createFallbackTranslations('en'),
          hu: createFallbackTranslations('hu')
        };
        setTranslations(fallbackTranslations);
      } finally {
        setIsLoading(false);
        console.log('🏁 Translation loading completed');
      }
    };

    loadTranslations();
  }, []);

  // Create fallback translations structure
  const createFallbackTranslations = (lang: Language): TranslationData => {
    const fallbacks = {
      ro: {
        language: 'ro',
        nav: {
          services: 'Servicii',
          menu: 'Meniu',
          pricing: 'Prețuri',
          offers: 'Oferte',
          contact: 'Contact',
          gallery: 'Galerie',
          regulations: 'Regulament'
        },
        hero: {
          title: 'Cea mai',
          titleHighlight: 'distractivă',
          titleEnd: 'petrecere',
          subtitle: 'Locul perfect pentru petreceri de copii',
          ctaBook: 'Rezervă Acum',
          ctaMenu: 'Vezi Meniul'
        },
        services: {
          title: 'Serviciile Noastre',
          subtitle: 'Servicii complete pentru copii'
        },
        menu: {
          title: 'Meniul Nostru',
          subtitle: 'Preparate delicioase'
        },
        pricing: {
          title: 'Pachete Petreceri',
          subtitle: 'Alege pachetul perfect',
          popular: 'Cel mai popular',
          book: 'Rezervă Acum'
        },
        offers: {
          title: 'Oferte Speciale',
          subtitle: 'Profită de ofertele noastre'
        },
        gallery: {
          title: 'Galeria Noastră',
          subtitle: 'Descoperă atmosfera magică'
        },
        regulations: {
          title: 'Regulamentul Nostru',
          subtitle: 'Pentru siguranța tuturor'
        },
        contact: {
          title: 'Contactează-ne',
          subtitle: 'Suntem aici pentru tine'
        },
        footer: {
          description: 'Locul perfect pentru petreceri de copii',
          copyright: '© 2024 Triple Fun. Toate drepturile rezervate.'
        }
      },
      en: {
        language: 'en',
        nav: {
          services: 'Services',
          menu: 'Menu',
          pricing: 'Pricing',
          offers: 'Offers',
          contact: 'Contact',
          gallery: 'Gallery',
          regulations: 'Regulations'
        },
        hero: {
          title: 'The most',
          titleHighlight: 'fun',
          titleEnd: 'party',
          subtitle: 'The perfect place for children\'s parties',
          ctaBook: 'Book Now',
          ctaMenu: 'View Menu'
        },
        services: {
          title: 'Our Services',
          subtitle: 'Complete services for children'
        },
        menu: {
          title: 'Our Menu',
          subtitle: 'Delicious dishes'
        },
        pricing: {
          title: 'Party Packages',
          subtitle: 'Choose the perfect package',
          popular: 'Most Popular',
          book: 'Book Now'
        },
        offers: {
          title: 'Special Offers',
          subtitle: 'Take advantage of our offers'
        },
        gallery: {
          title: 'Our Gallery',
          subtitle: 'Discover the magical atmosphere'
        },
        regulations: {
          title: 'Our Regulations',
          subtitle: 'For everyone\'s safety'
        },
        contact: {
          title: 'Contact Us',
          subtitle: 'We are here for you'
        },
        footer: {
          description: 'The perfect place for children\'s parties',
          copyright: '© 2024 Triple Fun. All rights reserved.'
        }
      },
      hu: {
        language: 'hu',
        nav: {
          services: 'Szolgáltatások',
          menu: 'Menü',
          pricing: 'Árak',
          offers: 'Ajánlatok',
          contact: 'Kapcsolat',
          gallery: 'Galéria',
          regulations: 'Szabályzat'
        },
        hero: {
          title: 'A leg',
          titleHighlight: 'szórakoztatóbb',
          titleEnd: 'buli',
          subtitle: 'A tökéletes hely gyerekbulikhoz',
          ctaBook: 'Foglalj Most',
          ctaMenu: 'Menü Megtekintése'
        },
        services: {
          title: 'Szolgáltatásaink',
          subtitle: 'Teljes körű szolgáltatások'
        },
        menu: {
          title: 'Menünk',
          subtitle: 'Finom ételek'
        },
        pricing: {
          title: 'Buli Csomagok',
          subtitle: 'Válaszd ki a tökéletes csomagot',
          popular: 'Legnépszerűbb',
          book: 'Foglalj Most'
        },
        offers: {
          title: 'Különleges Ajánlatok',
          subtitle: 'Használd ki ajánlatainkat'
        },
        gallery: {
          title: 'Galériánk',
          subtitle: 'Fedezd fel a varázslatos hangulatot'
        },
        regulations: {
          title: 'Szabályzatunk',
          subtitle: 'Mindenki biztonsága érdekében'
        },
        contact: {
          title: 'Kapcsolat',
          subtitle: 'Itt vagyunk neked'
        },
        footer: {
          description: 'A tökéletes hely gyerekbulikhoz',
          copyright: '© 2024 Triple Fun. Minden jog fenntartva.'
        }
      }
    };

    return fallbacks[lang];
  };

  const setLanguage = (lang: Language) => {
    console.log(`🌍 Changing language to: ${lang}`);
    setLanguageState(lang);
    if (typeof window !== 'undefined') {
      localStorage.setItem(STORAGE_KEY, lang);
    }
  };

  const getNestedValue = (obj: any, path: string): any => {
    if (!obj || typeof obj !== 'object') return undefined;
    
    return path.split('.').reduce((current, key) => {
      return current && current[key] !== undefined ? current[key] : undefined;
    }, obj);
  };

  const t = (key: string): string => {
    // Special case for language key
    if (key === 'language') {
      return language;
    }
    
    // Try to get value from current language
    let value = getNestedValue(translations[language], key);
    
    // If not found, try Romanian as fallback
    if (value === undefined && language !== 'ro') {
      value = getNestedValue(translations.ro, key);
    }
    
    // If still not found, return the key itself
    const result = typeof value === 'string' ? value : key;
    
    // Debug log for missing translations (only in development)
    if (result === key && key !== 'language' && typeof window !== 'undefined' && window.location.hostname === 'localhost') {
      console.warn(`🔍 Missing translation for key: ${key} in language: ${language}`);
    }
    
    return result;
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

  // Update translation in local state (for admin preview)
  const updateTranslation = (key: string, lang: Language, value: string) => {
    console.log(`📝 Updating local translation: ${key} = ${value} (${lang})`);
    
    // Update local state immediately for admin preview
    const newTranslations = JSON.parse(JSON.stringify(translations)); // Deep clone
    setNestedValue(newTranslations[lang], key, value);
    setTranslations(newTranslations);
  };

  // Save translations to API (ONLY for admin - modifies actual JSON files)
  const saveTranslations = async (): Promise<boolean> => {
    try {
      console.log('💾 Saving translations to API (will update JSON files)...');
      
      // Try to save to API - this will modify the actual JSON files
      const response = await fetch(`${API_BASE_URL}/translations/bulk`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ translations })
      });
      
      if (response.ok) {
        console.log('✅ Translations saved successfully to JSON files via API');
        console.log('🌐 All clients will see changes on next page refresh');
        return true;
      } else {
        console.error('❌ Failed to save translations to API:', response.status);
        return false;
      }
    } catch (error) {
      console.error('❌ API not available - translations not saved to files:', error);
      console.log('ℹ️ Changes are only local. Start API server to save to files.');
      return false;
    }
  };

  return {
    language,
    setLanguage,
    t,
    translations,
    updateTranslation,
    saveTranslations,
    isLoading
  };
};