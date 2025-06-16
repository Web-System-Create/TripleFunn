import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface SiteData {
  logo: string;
  siteName: string;
  contact: {
    phone: string;
    whatsapp: string;
    email: string;
    address: string;
  };
  whatsappMessages: {
    booking: {
      ro: string;
      en: string;
      hu: string;
    };
    contact: {
      ro: string;
      en: string;
      hu: string;
    };
  };
  schedule: {
    [key: string]: string;
  };
  hero: {
    title: string;
    subtitle: string;
  };
  services: Array<{
    id: string;
    title: string;
    description: string;
    icon: string;
    color: string;
  }>;
  menu: {
    [category: string]: {
      title: string;
      items: Array<{
        name: string;
        description: string;
        price: string;
      }>;
    };
  };
  pricing: Array<{
    id: string;
    name: string;
    price: string;
    duration: string;
    description: string;
    features: string[];
    popular: boolean;
  }>;
  offers: Array<{
    id: string;
    title: string;
    description: string;
    validUntil: string;
    color: string;
  }>;
  gallery: Array<{
    id: string;
    url: string;
    title: string;
    category: string;
  }>;
  fullWidthGallery: Array<{
    id: string;
    url: string;
    title: string;
    description: string;
  }>;
  regulations?: Array<{
    id: string;
    icon: string;
    title: string;
    items: string[];
    color: string;
    bgColor: string;
  }>;
  regulationTexts: {
    warningTitle: {
      ro: string;
      en: string;
      hu: string;
    };
    warningText: {
      ro: string;
      en: string;
      hu: string;
    };
    refusalTitle: {
      ro: string;
      en: string;
      hu: string;
    };
    refusalText: {
      ro: string;
      en: string;
      hu: string;
    };
    acceptanceText: {
      ro: string;
      en: string;
      hu: string;
    };
    thankYouTitle: {
      ro: string;
      en: string;
      hu: string;
    };
    thankYouText: {
      ro: string;
      en: string;
      hu: string;
    };
  };
  multilingualContent: {
    [key: string]: {
      ro: string;
      en: string;
      hu: string;
    };
  };
}

interface AdminContextType {
  siteData: SiteData;
  updateSiteData: (data: Partial<SiteData>) => void;
  isAdmin: boolean;
  isLoggedIn: boolean;
  setIsAdmin: (admin: boolean) => void;
  login: (username: string, password: string) => boolean;
  logout: () => void;
  updateMultilingualContent: (key: string, language: string, value: string) => void;
  getMultilingualContent: (key: string, language: string) => string;
  isLoading: boolean;
}

const ADMIN_CREDENTIALS = {
  username: 'admin',
  password: 'admin123'
};

const STORAGE_KEY = 'triple-fun-site-data';

const AdminContext = createContext<AdminContextType | undefined>(undefined);

export const AdminProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [siteData, setSiteData] = useState<SiteData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('triple-fun-admin-logged-in') === 'true';
    }
    return false;
  });

  // Load default site data from JSON file
  useEffect(() => {
    const loadDefaultSiteData = async () => {
      setIsLoading(true);
      try {
        // Try to load from localStorage first
        if (typeof window !== 'undefined') {
          const stored = localStorage.getItem(STORAGE_KEY);
          if (stored) {
            const parsedData = JSON.parse(stored);
            setSiteData(parsedData);
            setIsLoading(false);
            return;
          }
        }

        // If no localStorage data, load from JSON file
        const response = await fetch('/data/defaultSiteData.json');
        if (response.ok) {
          const defaultData = await response.json();
          setSiteData(defaultData);
        } else {
          console.error('Failed to load default site data');
          // Fallback to minimal data structure
          setSiteData({
            logo: 'TF',
            siteName: 'Triple Fun',
            contact: {
              phone: '0748 55 99 79',
              whatsapp: '40748559979',
              email: 'contact@triplefun.ro',
              address: 'Strada Jocului Nr. 15, București'
            },
            whatsappMessages: {
              booking: {
                ro: '🎉 Salut! Vreau să rezerv o petrecere la Triple Fun!',
                en: '🎉 Hello! I want to book a party at Triple Fun!',
                hu: '🎉 Szia! Szeretnék bulit foglalni a Triple Fun-ban!'
              },
              contact: {
                ro: '📞 Salut! Am o întrebare despre Triple Fun.',
                en: '📞 Hello! I have a question about Triple Fun.',
                hu: '📞 Szia! Kérdésem van a Triple Fun-nal kapcsolatban.'
              }
            },
            schedule: {},
            hero: { title: '', subtitle: '' },
            services: [],
            menu: {},
            pricing: [],
            offers: [],
            gallery: [],
            fullWidthGallery: [],
            regulationTexts: {
              warningTitle: { ro: '', en: '', hu: '' },
              warningText: { ro: '', en: '', hu: '' },
              refusalTitle: { ro: '', en: '', hu: '' },
              refusalText: { ro: '', en: '', hu: '' },
              acceptanceText: { ro: '', en: '', hu: '' },
              thankYouTitle: { ro: '', en: '', hu: '' },
              thankYouText: { ro: '', en: '', hu: '' }
            },
            multilingualContent: {}
          });
        }
      } catch (error) {
        console.error('Error loading default site data:', error);
        setSiteData({
          logo: 'TF',
          siteName: 'Triple Fun',
          contact: {
            phone: '0748 55 99 79',
            whatsapp: '40748559979',
            email: 'contact@triplefun.ro',
            address: 'Strada Jocului Nr. 15, București'
          },
          whatsappMessages: {
            booking: {
              ro: '🎉 Salut! Vreau să rezerv o petrecere la Triple Fun!',
              en: '🎉 Hello! I want to book a party at Triple Fun!',
              hu: '🎉 Szia! Szeretnék bulit foglalni a Triple Fun-ban!'
            },
            contact: {
              ro: '📞 Salut! Am o întrebare despre Triple Fun.',
              en: '📞 Hello! I have a question about Triple Fun.',
              hu: '📞 Szia! Kérdésem van a Triple Fun-nal kapcsolatban.'
            }
          },
          schedule: {},
          hero: { title: '', subtitle: '' },
          services: [],
          menu: {},
          pricing: [],
          offers: [],
          gallery: [],
          fullWidthGallery: [],
          regulationTexts: {
            warningTitle: { ro: '', en: '', hu: '' },
            warningText: { ro: '', en: '', hu: '' },
            refusalTitle: { ro: '', en: '', hu: '' },
            refusalText: { ro: '', en: '', hu: '' },
            acceptanceText: { ro: '', en: '', hu: '' },
            thankYouTitle: { ro: '', en: '', hu: '' },
            thankYouText: { ro: '', en: '', hu: '' }
          },
          multilingualContent: {}
        });
      } finally {
        setIsLoading(false);
      }
    };

    loadDefaultSiteData();
  }, []);

  // Save to localStorage when siteData changes
  useEffect(() => {
    if (siteData && typeof window !== 'undefined') {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(siteData));
      } catch (error) {
        console.error('Error saving data to localStorage:', error);
      }
    }
  }, [siteData]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('triple-fun-admin-logged-in', isLoggedIn.toString());
    }
  }, [isLoggedIn]);

  const updateSiteData = (data: Partial<SiteData>) => {
    if (siteData) {
      setSiteData(prev => {
        const newData = { ...prev!, ...data };
        return newData;
      });
    }
  };

  const updateMultilingualContent = (key: string, language: string, value: string) => {
    if (siteData) {
      setSiteData(prev => ({
        ...prev!,
        multilingualContent: {
          ...prev!.multilingualContent,
          [key]: {
            ...prev!.multilingualContent[key],
            [language]: value
          }
        }
      }));
    }
  };

  const getMultilingualContent = (key: string, language: string): string => {
    return siteData?.multilingualContent[key]?.[language as keyof typeof siteData.multilingualContent[typeof key]] || '';
  };

  const login = (username: string, password: string): boolean => {
    if (username === ADMIN_CREDENTIALS.username && password === ADMIN_CREDENTIALS.password) {
      setIsLoggedIn(true);
      setIsAdmin(true);
      return true;
    }
    return false;
  };

  const logout = () => {
    setIsLoggedIn(false);
    setIsAdmin(false);
  };

  // Show loading state while data is being loaded
  if (isLoading || !siteData) {
    return (
      <AdminContext.Provider value={{
        siteData: {} as SiteData,
        updateSiteData: () => {},
        isAdmin: false,
        isLoggedIn: false,
        setIsAdmin: () => {},
        login: () => false,
        logout: () => {},
        updateMultilingualContent: () => {},
        getMultilingualContent: () => '',
        isLoading: true
      }}>
        {children}
      </AdminContext.Provider>
    );
  }

  return (
    <AdminContext.Provider value={{ 
      siteData, 
      updateSiteData, 
      isAdmin, 
      isLoggedIn,
      setIsAdmin, 
      login, 
      logout,
      updateMultilingualContent,
      getMultilingualContent,
      isLoading
    }}>
      {children}
    </AdminContext.Provider>
  );
};

export const useAdmin = () => {
  const context = useContext(AdminContext);
  if (context === undefined) {
    throw new Error('useAdmin must be used within an AdminProvider');
  }
  return context;
};