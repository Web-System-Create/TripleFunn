import React, { useState, useEffect } from 'react';
import { X, Save, Plus, Trash2, AlertTriangle } from 'lucide-react';
import { useAdmin } from '../contexts/AdminContext';

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

  const handleSave = () => {
    updateSiteData(formData);
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

  const addOffer = () => {
    const newOffer = {
      id: Date.now().toString(),
      title: 'Ofertă Nouă',
      description: 'Descrierea ofertei',
      validUntil: 'Valabil până...',
      color: 'bg-blue-500'
    };
    setFormData(prev => ({
      ...prev,
      offers: [...prev.offers, newOffer]
    }));
  };

  const updateOffer = (index: number, field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      offers: prev.offers.map((offer, i) => 
        i === index ? { ...offer, [field]: value } : offer
      )
    }));
  };

  const removeOffer = (index: number) => {
    setFormData(prev => ({
      ...prev,
      offers: prev.offers.filter((_, i) => i !== index)
    }));
  };

  const addGalleryImage = (galleryType: 'gallery' | 'fullWidthGallery') => {
    const newImage = {
      id: Date.now().toString(),
      url: 'https://images.pexels.com/photos/1148998/pexels-photo-1148998.jpeg?auto=compress&cs=tinysrgb&w=800',
      title: 'Imagine Nouă',
      ...(galleryType === 'gallery' ? { category: 'playground' } : { description: 'Descrierea imaginii' })
    };
    setFormData(prev => ({
      ...prev,
      [galleryType]: [...prev[galleryType], newImage]
    }));
  };

  const updateGalleryImage = (galleryType: 'gallery' | 'fullWidthGallery', index: number, field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [galleryType]: prev[galleryType].map((image, i) => 
        i === index ? { ...image, [field]: value } : image
      )
    }));
  };

  const removeGalleryImage = (galleryType: 'gallery' | 'fullWidthGallery', index: number) => {
    setFormData(prev => ({
      ...prev,
      [galleryType]: prev[galleryType].filter((_, i) => i !== index)
    }));
  };

  const addRegulation = () => {
    const newRegulation = {
      id: Date.now().toString(),
      icon: 'Shield',
      title: 'Regulă Nouă',
      items: ['Punct 1', 'Punct 2'],
      color: 'bg-blue-500',
      bgColor: 'bg-blue-50'
    };
    setFormData(prev => ({
      ...prev,
      regulations: [...prev.regulations, newRegulation]
    }));
  };

  const updateRegulation = (index: number, field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      regulations: prev.regulations.map((regulation, i) => 
        i === index ? { ...regulation, [field]: value } : regulation
      )
    }));
  };

  const removeRegulation = (index: number) => {
    setFormData(prev => ({
      ...prev,
      regulations: prev.regulations.filter((_, i) => i !== index)
    }));
  };

  const addRegulationItem = (regulationIndex: number) => {
    setFormData(prev => ({
      ...prev,
      regulations: prev.regulations.map((regulation, i) => 
        i === regulationIndex ? { 
          ...regulation, 
          items: [...regulation.items, 'Punct nou'] 
        } : regulation
      )
    }));
  };

  const updateRegulationItem = (regulationIndex: number, itemIndex: number, value: string) => {
    setFormData(prev => ({
      ...prev,
      regulations: prev.regulations.map((regulation, i) => 
        i === regulationIndex ? { 
          ...regulation, 
          items: regulation.items.map((item: string, j: number) => 
            j === itemIndex ? value : item
          ) 
        } : regulation
      )
    }));
  };

  const removeRegulationItem = (regulationIndex: number, itemIndex: number) => {
    setFormData(prev => ({
      ...prev,
      regulations: prev.regulations.map((regulation, i) => 
        i === regulationIndex ? { 
          ...regulation, 
          items: regulation.items.filter((_: any, j: number) => j !== itemIndex) 
        } : regulation
      )
    }));
  };

  const updateRegulationText = (textKey: string, language: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      regulationTexts: {
        ...prev.regulationTexts,
        [textKey]: {
          ...prev.regulationTexts[textKey as keyof typeof prev.regulationTexts],
          [language]: value
        }
      }
    }));
  };

  const tabs = [
    { id: 'contact', label: 'Contact', icon: '📞' },
    { id: 'services', label: 'Servicii', icon: '🎪' },
    { id: 'pricing', label: 'Prețuri', icon: '💰' },
    { id: 'offers', label: 'Oferte', icon: '🎁' },
    { id: 'gallery', label: 'Galerie', icon: '📸' },
    { id: 'fullWidthGallery', label: 'Galerie Full', icon: '🖼️' },
    { id: 'regulations', label: 'Regulament', icon: '📋' },
    { id: 'regulationTexts', label: 'Texte Regulament', icon: '📝' }
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
                <p className="text-white/80 text-sm">Gestionează conținutul site-ului</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <button
                onClick={handleSave}
                className="bg-green-500 hover:bg-green-600 px-4 py-2 rounded-lg font-semibold transition-colors flex items-center"
              >
                <Save className="h-4 w-4 mr-2" />
                Salvează
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
          {/* Contact Tab */}
          {activeTab === 'contact' && (
            <div className="space-y-6">
              <h3 className="text-lg font-bold text-gray-800 mb-4">Informații Contact</h3>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Telefon</label>
                  <input
                    type="text"
                    value={formData.contact.phone}
                    onChange={(e) => handleContactChange('phone', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="0748 55 99 79"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">WhatsApp</label>
                  <input
                    type="text"
                    value={formData.contact.whatsapp}
                    onChange={(e) => handleContactChange('whatsapp', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="40748559979"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                  <input
                    type="email"
                    value={formData.contact.email}
                    onChange={(e) => handleContactChange('email', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="contact@triplefun.ro"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Adresa</label>
                  <input
                    type="text"
                    value={formData.contact.address}
                    onChange={(e) => handleContactChange('address', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Strada Jocului Nr. 15, București"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Services Tab */}
          {activeTab === 'services' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-bold text-gray-800">Servicii</h3>
                <button
                  onClick={addService}
                  className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold transition-colors flex items-center"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Adaugă Serviciu
                </button>
              </div>
              <div className="space-y-4">
                {formData.services.map((service, index) => (
                  <div key={service.id} className="bg-gray-50 p-4 rounded-lg border">
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="font-semibold text-gray-800">Serviciu #{index + 1}</h4>
                      <button
                        onClick={() => removeService(index)}
                        className="text-red-500 hover:text-red-700 p-1"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                    <div className="grid md:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Titlu</label>
                        <input
                          type="text"
                          value={service.title}
                          onChange={(e) => updateService(index, 'title', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Icon</label>
                        <select
                          value={service.icon}
                          onChange={(e) => updateService(index, 'icon', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                        >
                          <option value="Gamepad2">Gamepad2</option>
                          <option value="PartyPopper">PartyPopper</option>
                          <option value="Cake">Cake</option>
                          <option value="Music">Music</option>
                          <option value="Shield">Shield</option>
                          <option value="Users">Users</option>
                        </select>
                      </div>
                      <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Descriere</label>
                        <textarea
                          value={service.description}
                          onChange={(e) => updateService(index, 'description', e.target.value)}
                          rows={3}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm resize-none"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Pricing Tab */}
          {activeTab === 'pricing' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-bold text-gray-800">Pachete Prețuri</h3>
                <button
                  onClick={addPricingPackage}
                  className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold transition-colors flex items-center"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Adaugă Pachet
                </button>
              </div>
              <div className="space-y-6">
                {formData.pricing.map((pkg, index) => (
                  <div key={pkg.id} className="bg-gray-50 p-4 rounded-lg border">
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="font-semibold text-gray-800">{pkg.name}</h4>
                      <button
                        onClick={() => removePricingPackage(index)}
                        className="text-red-500 hover:text-red-700 p-1"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                    <div className="grid md:grid-cols-3 gap-3 mb-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Nume Pachet</label>
                        <input
                          type="text"
                          value={pkg.name}
                          onChange={(e) => updatePricingPackage(index, 'name', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Preț</label>
                        <input
                          type="text"
                          value={pkg.price}
                          onChange={(e) => updatePricingPackage(index, 'price', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Durată</label>
                        <input
                          type="text"
                          value={pkg.duration}
                          onChange={(e) => updatePricingPackage(index, 'duration', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                        />
                      </div>
                    </div>
                    <div className="mb-4">
                      <label className="block text-sm font-medium text-gray-700 mb-1">Descriere</label>
                      <textarea
                        value={pkg.description}
                        onChange={(e) => updatePricingPackage(index, 'description', e.target.value)}
                        rows={2}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm resize-none"
                      />
                    </div>
                    <div className="mb-4">
                      <div className="flex items-center">
                        <input
                          type="checkbox"
                          checked={pkg.popular}
                          onChange={(e) => updatePricingPackage(index, 'popular', e.target.checked)}
                          className="mr-2"
                        />
                        <label className="text-sm font-medium text-gray-700">Pachet Popular</label>
                      </div>
                    </div>
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <label className="block text-sm font-medium text-gray-700">Caracteristici</label>
                        <button
                          onClick={() => addFeature(index)}
                          className="text-blue-500 hover:text-blue-700 text-sm flex items-center"
                        >
                          <Plus className="h-3 w-3 mr-1" />
                          Adaugă
                        </button>
                      </div>
                      <div className="space-y-2">
                        {pkg.features.map((feature: string, featureIndex: number) => (
                          <div key={featureIndex} className="flex items-center space-x-2">
                            <input
                              type="text"
                              value={feature}
                              onChange={(e) => updateFeature(index, featureIndex, e.target.value)}
                              className="flex-1 px-3 py-1 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                            />
                            <button
                              onClick={() => removeFeature(index, featureIndex)}
                              className="text-red-500 hover:text-red-700 p-1"
                            >
                              <Trash2 className="h-3 w-3" />
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Offers Tab */}
          {activeTab === 'offers' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-bold text-gray-800">Oferte Speciale</h3>
                <button
                  onClick={addOffer}
                  className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold transition-colors flex items-center"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Adaugă Ofertă
                </button>
              </div>
              <div className="space-y-4">
                {formData.offers.map((offer, index) => (
                  <div key={offer.id} className="bg-gray-50 p-4 rounded-lg border">
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="font-semibold text-gray-800">Oferta #{index + 1}</h4>
                      <button
                        onClick={() => removeOffer(index)}
                        className="text-red-500 hover:text-red-700 p-1"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                    <div className="grid md:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Titlu</label>
                        <input
                          type="text"
                          value={offer.title}
                          onChange={(e) => updateOffer(index, 'title', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Valabilitate</label>
                        <input
                          type="text"
                          value={offer.validUntil}
                          onChange={(e) => updateOffer(index, 'validUntil', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                        />
                      </div>
                      <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Descriere</label>
                        <textarea
                          value={offer.description}
                          onChange={(e) => updateOffer(index, 'description', e.target.value)}
                          rows={3}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm resize-none"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Gallery Tab */}
          {activeTab === 'gallery' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-bold text-gray-800">Galerie Imagini</h3>
                <button
                  onClick={() => addGalleryImage('gallery')}
                  className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold transition-colors flex items-center"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Adaugă Imagine
                </button>
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                {formData.gallery.map((image, index) => (
                  <div key={image.id} className="bg-gray-50 p-4 rounded-lg border">
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="font-semibold text-gray-800">Imagine #{index + 1}</h4>
                      <button
                        onClick={() => removeGalleryImage('gallery', index)}
                        className="text-red-500 hover:text-red-700 p-1"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                    <div className="space-y-3">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">URL Imagine</label>
                        <input
                          type="text"
                          value={image.url}
                          onChange={(e) => updateGalleryImage('gallery', index, 'url', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Titlu</label>
                        <input
                          type="text"
                          value={image.title}
                          onChange={(e) => updateGalleryImage('gallery', index, 'title', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Categorie</label>
                        <select
                          value={image.category}
                          onChange={(e) => updateGalleryImage('gallery', index, 'category', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                        >
                          <option value="playground">Zone de Joacă</option>
                          <option value="parties">Petreceri</option>
                          <option value="food">Mâncare</option>
                          <option value="events">Evenimente</option>
                        </select>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Full Width Gallery Tab */}
          {activeTab === 'fullWidthGallery' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-bold text-gray-800">Galerie Full Width</h3>
                <button
                  onClick={() => addGalleryImage('fullWidthGallery')}
                  className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold transition-colors flex items-center"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Adaugă Imagine
                </button>
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                {formData.fullWidthGallery.map((image, index) => (
                  <div key={image.id} className="bg-gray-50 p-4 rounded-lg border">
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="font-semibold text-gray-800">Imagine #{index + 1}</h4>
                      <button
                        onClick={() => removeGalleryImage('fullWidthGallery', index)}
                        className="text-red-500 hover:text-red-700 p-1"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                    <div className="space-y-3">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">URL Imagine</label>
                        <input
                          type="text"
                          value={image.url}
                          onChange={(e) => updateGalleryImage('fullWidthGallery', index, 'url', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Titlu</label>
                        <input
                          type="text"
                          value={image.title}
                          onChange={(e) => updateGalleryImage('fullWidthGallery', index, 'title', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Descriere</label>
                        <textarea
                          value={image.description}
                          onChange={(e) => updateGalleryImage('fullWidthGallery', index, 'description', e.target.value)}
                          rows={2}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm resize-none"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Regulations Tab */}
          {activeTab === 'regulations' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-bold text-gray-800">Regulament</h3>
                <button
                  onClick={addRegulation}
                  className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold transition-colors flex items-center"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Adaugă Secțiune
                </button>
              </div>
              <div className="space-y-6">
                {formData.regulations.map((regulation, index) => (
                  <div key={regulation.id} className="bg-gray-50 p-4 rounded-lg border">
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="font-semibold text-gray-800">{regulation.title}</h4>
                      <button
                        onClick={() => removeRegulation(index)}
                        className="text-red-500 hover:text-red-700 p-1"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                    <div className="grid md:grid-cols-2 gap-3 mb-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Titlu</label>
                        <input
                          type="text"
                          value={regulation.title}
                          onChange={(e) => updateRegulation(index, 'title', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Icon</label>
                        <select
                          value={regulation.icon}
                          onChange={(e) => updateRegulation(index, 'icon', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                        >
                          <option value="Shield">Shield</option>
                          <option value="AlertTriangle">AlertTriangle</option>
                          <option value="Users">Users</option>
                          <option value="Clock">Clock</option>
                          <option value="Camera">Camera</option>
                          <option value="Heart">Heart</option>
                          <option value="CheckCircle">CheckCircle</option>
                          <option value="XCircle">XCircle</option>
                        </select>
                      </div>
                    </div>
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <label className="block text-sm font-medium text-gray-700">Puncte Regulament</label>
                        <button
                          onClick={() => addRegulationItem(index)}
                          className="text-blue-500 hover:text-blue-700 text-sm flex items-center"
                        >
                          <Plus className="h-3 w-3 mr-1" />
                          Adaugă Punct
                        </button>
                      </div>
                      <div className="space-y-2">
                        {regulation.items.map((item: string, itemIndex: number) => (
                          <div key={itemIndex} className="flex items-start space-x-2">
                            <textarea
                              value={item}
                              onChange={(e) => updateRegulationItem(index, itemIndex, e.target.value)}
                              rows={2}
                              className="flex-1 px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm resize-none"
                            />
                            <button
                              onClick={() => removeRegulationItem(index, itemIndex)}
                              className="text-red-500 hover:text-red-700 p-1 mt-1"
                            >
                              <Trash2 className="h-3 w-3" />
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Regulation Texts Tab */}
          {activeTab === 'regulationTexts' && (
            <div className="space-y-6">
              <h3 className="text-lg font-bold text-gray-800">Texte Regulament Multilingv</h3>
              <div className="space-y-6">
                {Object.entries(formData.regulationTexts).map(([textKey, translations]) => (
                  <div key={textKey} className="bg-gray-50 p-4 rounded-lg border">
                    <h4 className="font-semibold text-gray-800 mb-3 capitalize">{textKey.replace(/([A-Z])/g, ' $1')}</h4>
                    <div className="grid md:grid-cols-3 gap-3">
                      {['ro', 'en', 'hu'].map((lang) => (
                        <div key={lang}>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            {lang.toUpperCase()} {lang === 'ro' ? '🇷🇴' : lang === 'en' ? '🇬🇧' : '🇭🇺'}
                          </label>
                          <textarea
                            value={translations[lang as keyof typeof translations]}
                            onChange={(e) => updateRegulationText(textKey, lang, e.target.value)}
                            rows={3}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm resize-none"
                            placeholder={`Text în ${lang.toUpperCase()}`}
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;