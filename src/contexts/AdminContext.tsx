import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { defaultSiteData } from '../data/defaultSiteData';

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
  const [siteData, setSiteData] = useState<SiteData>(defaultSiteData as SiteData);
  const [isLoading, setIsLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('triple-fun-admin-logged-in') === 'true';
    }
    return false;
  });

  // Load data from localStorage or use defaults
  useEffect(() => {
    const loadSiteData = () => {
      setIsLoading(true);
      try {
        if (typeof window !== 'undefined') {
          const stored = localStorage.getItem(STORAGE_KEY);
          if (stored) {
            const parsedData = JSON.parse(stored);
            // Merge with defaults to ensure all properties exist
            setSiteData({ ...defaultSiteData, ...parsedData } as SiteData);
          } else {
            setSiteData(defaultSiteData as SiteData);
          }
        } else {
          setSiteData(defaultSiteData as SiteData);
        }
      } catch (error) {
        console.error('Error loading site data:', error);
        setSiteData(defaultSiteData as SiteData);
      } finally {
        setIsLoading(false);
      }
    };

    loadSiteData();
  }, []);

  // Save to localStorage when siteData changes
  useEffect(() => {
    if (siteData && typeof window !== 'undefined' && !isLoading) {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(siteData));
      } catch (error) {
        console.error('Error saving data to localStorage:', error);
      }
    }
  }, [siteData, isLoading]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('triple-fun-admin-logged-in', isLoggedIn.toString());
    }
  }, [isLoggedIn]);

  const updateSiteData = (data: Partial<SiteData>) => {
    setSiteData(prev => {
      const newData = { ...prev, ...data };
      return newData;
    });
  };

  const updateMultilingualContent = (key: string, language: string, value: string) => {
    setSiteData(prev => ({
      ...prev,
      multilingualContent: {
        ...prev.multilingualContent,
        [key]: {
          ...prev.multilingualContent[key],
          [language]: value
        }
      }
    }));
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