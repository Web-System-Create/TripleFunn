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

export const useI18n = (): UseI18nReturn => {
  const [language, setLanguageState] = useState<Language>(() => {
    if (typeof window !== 'undefined') {
      return (localStorage.getItem(STORAGE_KEY) as Language) || 'ro';
    }
    return 'ro';
  });

  const [translations, setTranslations] = useState<Record<Language, TranslationData>>({} as Record<Language, TranslationData>);
  const [isLoading, setIsLoading] = useState(true);

  // Load translations from JSON files on mount
  useEffect(() => {
    const loadTranslations = async () => {
      setIsLoading(true);
      try {
        // Try to load from the default translations JSON file first
        const defaultResponse = await fetch('/data/defaultTranslations.json');
        if (defaultResponse.ok) {
          const defaultTranslations = await defaultResponse.json();
          setTranslations(defaultTranslations);
        } else {
          // Fallback: try to load individual language files
          const languages: Language[] = ['ro', 'en', 'hu'];
          const loadedTranslations: Record<Language, TranslationData> = {} as Record<Language, TranslationData>;

          await Promise.all(
            languages.map(async (lang) => {
              try {
                const response = await fetch(`/i18n/${lang}.json`);
                if (response.ok) {
                  const data = await response.json();
                  loadedTranslations[lang] = { ...data, language: lang };
                } else {
                  // Minimal fallback
                  loadedTranslations[lang] = { language: lang };
                }
              } catch (error) {
                console.warn(`Failed to load ${lang} translations:`, error);
                loadedTranslations[lang] = { language: lang };
              }
            })
          );

          setTranslations(loadedTranslations);
        }
      } catch (error) {
        console.error('Error loading translations:', error);
        // Minimal fallback
        setTranslations({
          ro: { language: 'ro' },
          en: { language: 'en' },
          hu: { language: 'hu' }
        });
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
    
    // Save to server (JSON file) - this would need a backend API
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