import React, { useState, useEffect } from 'react';
import { X, Save, AlertTriangle } from 'lucide-react';
import { useAdmin } from '../contexts/AdminContext';
import ContactTab from './admin/ContactTab';
import TranslationsTab from './admin/TranslationsTab';
import ServicesTab from './admin/ServicesTab';
import PricingTab from './admin/PricingTab';

interface AdminPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

const AdminPanel: React.FC<AdminPanelProps> = ({ isOpen, onClose }) => {
  const { siteData, updateSiteData } = useAdmin();
  const [activeTab, setActiveTab] = useState('contact');
  const [formData, setFormData] = useState({
    contact: {
      phone: '',
      whatsapp: '',
      email: '',
      address: ''
    },
    services: [] as any[],
    pricing: [] as any[],
    offers: [] as any[],
    gallery: [] as any[],
    fullWidthGallery: [] as any[],
    regulations: [] as any[],
    regulationTexts: {
      warningTitle: { ro: '', en: '', hu: '' },
      warningText: { ro: '', en: '', hu: '' },
      refusalTitle: { ro: '', en: '', hu: '' },
      refusalText: { ro: '', en: '', hu: '' },
      acceptanceText: { ro: '', en: '', hu: '' },
      thankYouTitle: { ro: '', en: '', hu: '' },
      thankYouText: { ro: '', en: '', hu: '' }
    }
  });

  useEffect(() => {
    if (siteData) {
      setFormData({
        contact: { ...siteData.contact },
        services: [...siteData.services],
        pricing: [...siteData.pricing],
        offers: [...siteData.offers],
        gallery: [...siteData.gallery],
        fullWidthGallery: [...siteData.fullWidthGallery],
        regulations: siteData.regulations ? [...siteData.regulations] : [],
        regulationTexts: siteData.regulationTexts ? { ...siteData.regulationTexts } : {
          warningTitle: { ro: '', en: '', hu: '' },
          warningText: { ro: '', en: '', hu: '' },
          refusalTitle: { ro: '', en: '', hu: '' },
          refusalText: { ro: '', en: '', hu: '' },
          acceptanceText: { ro: '', en: '', hu: '' },
          thankYouTitle: { ro: '', en: '', hu: '' },
          thankYouText: { ro: '', en: '', hu: '' }
        }
      });
    }
  }, [siteData]);

  if (!isOpen) return null;

  const handleSave = async () => {
    updateSiteData(formData);
    alert('✅ Datele site-ului au fost salvate cu succes!');
    onClose();
  };

  const handleContactChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      contact: {
        ...prev.contact,
        [field]: value
      }
    }));
  };

  // Service management functions
  const addService = () => {
    const newService = {
      id: Date.now().toString(),
      title: 'Serviciu Nou',
      description: 'Descrierea serviciului',
      icon: 'Gamepad2',
      color: 'bg-blue-500'
    };
    setFormData(prev => ({
      ...prev,
      services: [...prev.services, newService]
    }));
  };

  const updateService = (index: number, field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      services: prev.services.map((service, i) => 
        i === index ? { ...service, [field]: value } : service
      )
    }));
  };

  const removeService = (index: number) => {
    setFormData(prev => ({
      ...prev,
      services: prev.services.filter((_, i) => i !== index)
    }));
  };

  // Pricing management functions
  const addPricingPackage = () => {
    const newPackage = {
      id: Date.now().toString(),
      name: 'Pachet Nou',
      price: '199',
      duration: '2 ore',
      description: 'Descrierea pachetului',
      features: ['Caracteristică 1', 'Caracteristică 2'],
      popular: false
    };
    setFormData(prev => ({
      ...prev,
      pricing: [...prev.pricing, newPackage]
    }));
  };

  const updatePricingPackage = (index: number, field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      pricing: prev.pricing.map((pkg, i) => 
        i === index ? { ...pkg, [field]: value } : pkg
      )
    }));
  };

  const removePricingPackage = (index: number) => {
    setFormData(prev => ({
      ...prev,
      pricing: prev.pricing.filter((_, i) => i !== index)
    }));
  };

  const addFeature = (packageIndex: number) => {
    setFormData(prev => ({
      ...prev,
      pricing: prev.pricing.map((pkg, i) => 
        i === packageIndex ? { 
          ...pkg, 
          features: [...pkg.features, 'Caracteristică nouă'] 
        } : pkg
      )
    }));
  };

  const updateFeature = (packageIndex: number, featureIndex: number, value: string) => {
    setFormData(prev => ({
      ...prev,
      pricing: prev.pricing.map((pkg, i) => 
        i === packageIndex ? { 
          ...pkg, 
          features: pkg.features.map((feature: string, j: number) => 
            j === featureIndex ? value : feature
          ) 
        } : pkg
      )
    }));
  };

  const removeFeature = (packageIndex: number, featureIndex: number) => {
    setFormData(prev => ({
      ...prev,
      pricing: prev.pricing.map((pkg, i) => 
        i === packageIndex ? { 
          ...pkg, 
          features: pkg.features.filter((_: any, j: number) => j !== featureIndex) 
        } : pkg
      )
    }));
  };

  const tabs = [
    { id: 'contact', label: 'Contact', icon: '📞' },
    { id: 'translations', label: 'Traduceri', icon: '🌐' },
    { id: 'services', label: 'Servicii', icon: '🎪' },
    { id: 'pricing', label: 'Prețuri', icon: '💰' },
    { id: 'offers', label: 'Oferte', icon: '🎁' },
    { id: 'gallery', label: 'Galerie', icon: '📸' },
    { id: 'regulations', label: 'Regulament', icon: '📋' }
  ];

  return (
    <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl w-full max-w-6xl max-h-[90vh] overflow-hidden shadow-2xl">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-500 to-purple-500 p-6 text-white">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="bg-white/20 p-2 rounded-full">
                <AlertTriangle className="h-6 w-6" />
              </div>
              <div>
                <h2 className="text-xl font-bold">Panou Administrare</h2>
                <p className="text-white/80 text-sm">Gestionează conținutul site-ului și traducerile</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <button
                onClick={handleSave}
                className="bg-green-500 hover:bg-green-600 px-4 py-2 rounded-lg font-semibold transition-colors flex items-center"
              >
                <Save className="h-4 w-4 mr-2" />
                Salvează Site Data
              </button>
              <button
                onClick={onClose}
                className="bg-white/20 hover:bg-white/30 p-2 rounded-lg transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="border-b border-gray-200 bg-gray-50">
          <div className="flex overflow-x-auto">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center px-4 py-3 text-sm font-medium whitespace-nowrap border-b-2 transition-colors ${
                  activeTab === tab.id
                    ? 'border-blue-500 text-blue-600 bg-white'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:bg-gray-100'
                }`}
              >
                <span className="mr-2">{tab.icon}</span>
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[60vh]">
          {activeTab === 'contact' && (
            <ContactTab 
              formData={formData} 
              handleContactChange={handleContactChange} 
            />
          )}

          {activeTab === 'translations' && <TranslationsTab />}

          {activeTab === 'services' && (
            <ServicesTab 
              services={formData.services}
              updateService={updateService}
              addService={addService}
              removeService={removeService}
            />
          )}

          {activeTab === 'pricing' && (
            <PricingTab 
              pricing={formData.pricing}
              updatePricingPackage={updatePricingPackage}
              addPricingPackage={addPricingPackage}
              removePricingPackage={removePricingPackage}
              addFeature={addFeature}
              updateFeature={updateFeature}
              removeFeature={removeFeature}
            />
          )}

          {/* Other tabs can be implemented similarly */}
          {activeTab === 'offers' && (
            <div className="text-center py-8">
              <p className="text-gray-500">Tab Oferte - În dezvoltare</p>
            </div>
          )}

          {activeTab === 'gallery' && (
            <div className="text-center py-8">
              <p className="text-gray-500">Tab Galerie - În dezvoltare</p>
            </div>
          )}

          {activeTab === 'regulations' && (
            <div className="text-center py-8">
              <p className="text-gray-500">Tab Regulament - În dezvoltare</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;