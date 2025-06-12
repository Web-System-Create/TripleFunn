import React, { useState, useRef } from 'react';
import { X, Save, Plus, Trash2, Edit3, Upload, Star, Crown, Gift, Image, AlertTriangle, GripVertical, Eye, EyeOff } from 'lucide-react';
import { useAdmin } from '../contexts/AdminContext';
import { useLanguage } from '../contexts/LanguageContext';

interface AdminPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

const AdminPanel: React.FC<AdminPanelProps> = ({ isOpen, onClose }) => {
  const { siteData, updateSiteData } = useAdmin();
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState('general');
  const [formData, setFormData] = useState(siteData);
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);
  const [uploadingImages, setUploadingImages] = useState<boolean>(false);
  const [draggedItem, setDraggedItem] = useState<string | null>(null);
  const [dragOverItem, setDragOverItem] = useState<string | null>(null);
  const [previewLanguage, setPreviewLanguage] = useState<'ro' | 'en' | 'hu'>('ro');
  const fileInputRef = useRef<HTMLInputElement>(null);

  if (!isOpen) return null;

  const handleSave = () => {
    updateSiteData(formData);
    onClose();
  };

  const addService = () => {
    const newService = {
      id: Date.now().toString(),
      title: 'Serviciu Nou',
      description: 'Descrierea serviciului',
      icon: 'Gamepad2',
      color: 'bg-blue-500'
    };
    setFormData({
      ...formData,
      services: [...formData.services, newService]
    });
  };

  const removeService = (id: string) => {
    setFormData({
      ...formData,
      services: formData.services.filter(service => service.id !== id)
    });
  };

  const updateService = (id: string, field: string, value: string) => {
    setFormData({
      ...formData,
      services: formData.services.map(service =>
        service.id === id ? { ...service, [field]: value } : service
      )
    });
  };

  const addMenuItem = (category: string) => {
    const newItem = {
      name: 'Produs Nou',
      description: 'Descrierea produsului',
      price: '0 lei'
    };
    setFormData({
      ...formData,
      menu: {
        ...formData.menu,
        [category]: {
          ...formData.menu[category],
          items: [...formData.menu[category].items, newItem]
        }
      }
    });
  };

  const removeMenuItem = (category: string, index: number) => {
    setFormData({
      ...formData,
      menu: {
        ...formData.menu,
        [category]: {
          ...formData.menu[category],
          items: formData.menu[category].items.filter((_, i) => i !== index)
        }
      }
    });
  };

  const updateMenuItem = (category: string, index: number, field: string, value: string) => {
    setFormData({
      ...formData,
      menu: {
        ...formData.menu,
        [category]: {
          ...formData.menu[category],
          items: formData.menu[category].items.map((item, i) =>
            i === index ? { ...item, [field]: value } : item
          )
        }
      }
    });
  };

  const addPricingPackage = () => {
    const newPackage = {
      id: Date.now().toString(),
      name: 'Pachet Nou',
      price: '299',
      duration: '3 ore',
      description: 'Descrierea pachetului',
      features: ['Caracteristică 1', 'Caracteristică 2'],
      popular: false
    };
    setFormData({
      ...formData,
      pricing: [...formData.pricing, newPackage]
    });
  };

  const removePricingPackage = (id: string) => {
    setFormData({
      ...formData,
      pricing: formData.pricing.filter(pkg => pkg.id !== id)
    });
  };

  const updatePricingPackage = (id: string, field: string, value: any) => {
    setFormData({
      ...formData,
      pricing: formData.pricing.map(pkg =>
        pkg.id === id ? { ...pkg, [field]: value } : pkg
      )
    });
  };

  const addFeatureToPricing = (packageId: string) => {
    setFormData({
      ...formData,
      pricing: formData.pricing.map(pkg =>
        pkg.id === packageId 
          ? { ...pkg, features: [...pkg.features, 'Caracteristică nouă'] }
          : pkg
      )
    });
  };

  const removeFeatureFromPricing = (packageId: string, featureIndex: number) => {
    setFormData({
      ...formData,
      pricing: formData.pricing.map(pkg =>
        pkg.id === packageId 
          ? { ...pkg, features: pkg.features.filter((_, i) => i !== featureIndex) }
          : pkg
      )
    });
  };

  const updatePricingFeature = (packageId: string, featureIndex: number, value: string) => {
    setFormData({
      ...formData,
      pricing: formData.pricing.map(pkg =>
        pkg.id === packageId 
          ? { 
              ...pkg, 
              features: pkg.features.map((feature, i) => 
                i === featureIndex ? value : feature
              ) 
            }
          : pkg
      )
    });
  };

  const addOffer = () => {
    const newOffer = {
      id: Date.now().toString(),
      title: 'Ofertă Nouă',
      description: 'Descrierea ofertei',
      validUntil: 'Valabil până la...',
      color: 'bg-blue-500'
    };
    setFormData({
      ...formData,
      offers: [...formData.offers, newOffer]
    });
  };

  const removeOffer = (id: string) => {
    setFormData({
      ...formData,
      offers: formData.offers.filter(offer => offer.id !== id)
    });
  };

  const updateOffer = (id: string, field: string, value: string) => {
    setFormData({
      ...formData,
      offers: formData.offers.map(offer =>
        offer.id === id ? { ...offer, [field]: value } : offer
      )
    });
  };

  // Gallery Management Functions with Drag & Drop
  const addGalleryImage = () => {
    const newImage = {
      id: Date.now().toString(),
      url: 'https://images.pexels.com/photos/1148998/pexels-photo-1148998.jpeg?auto=compress&cs=tinysrgb&w=800',
      title: 'Imagine Nouă',
      category: 'playground'
    };
    setFormData({
      ...formData,
      gallery: [...formData.gallery, newImage]
    });
  };

  const removeGalleryImage = (id: string) => {
    if (deleteConfirm === id) {
      setFormData({
        ...formData,
        gallery: formData.gallery.filter(img => img.id !== id)
      });
      setDeleteConfirm(null);
    } else {
      setDeleteConfirm(id);
      // Auto-cancel confirmation after 3 seconds
      setTimeout(() => setDeleteConfirm(null), 3000);
    }
  };

  const updateGalleryImage = (id: string, field: string, value: string) => {
    setFormData({
      ...formData,
      gallery: formData.gallery.map(img =>
        img.id === id ? { ...img, [field]: value } : img
      )
    });
  };

  // Regulations Management Functions
  const addRegulation = () => {
    const newRegulation = {
      id: Date.now().toString(),
      icon: 'Shield',
      title: 'Regulă Nouă',
      items: ['Punct nou de regulament'],
      color: 'bg-blue-500',
      bgColor: 'bg-blue-50'
    };
    setFormData({
      ...formData,
      regulations: [...(formData.regulations || []), newRegulation]
    });
  };

  const removeRegulation = (id: string) => {
    setFormData({
      ...formData,
      regulations: (formData.regulations || []).filter(reg => reg.id !== id)
    });
  };

  const updateRegulation = (id: string, field: string, value: any) => {
    setFormData({
      ...formData,
      regulations: (formData.regulations || []).map(reg =>
        reg.id === id ? { ...reg, [field]: value } : reg
      )
    });
  };

  const addRegulationItem = (regulationId: string) => {
    setFormData({
      ...formData,
      regulations: (formData.regulations || []).map(reg =>
        reg.id === regulationId 
          ? { ...reg, items: [...reg.items, 'Punct nou'] }
          : reg
      )
    });
  };

  const removeRegulationItem = (regulationId: string, itemIndex: number) => {
    setFormData({
      ...formData,
      regulations: (formData.regulations || []).map(reg =>
        reg.id === regulationId 
          ? { ...reg, items: reg.items.filter((_, i) => i !== itemIndex) }
          : reg
      )
    });
  };

  const updateRegulationItem = (regulationId: string, itemIndex: number, value: string) => {
    setFormData({
      ...formData,
      regulations: (formData.regulations || []).map(reg =>
        reg.id === regulationId 
          ? { 
              ...reg, 
              items: reg.items.map((item, i) => 
                i === itemIndex ? value : item
              ) 
            }
          : reg
      )
    });
  };

  // Update regulation texts
  const updateRegulationText = (textKey: string, language: string, value: string) => {
    setFormData({
      ...formData,
      regulationTexts: {
        ...formData.regulationTexts,
        [textKey]: {
          ...formData.regulationTexts[textKey],
          [language]: value
        }
      }
    });
  };

  // Drag & Drop Functions
  const handleDragStart = (e: React.DragEvent, imageId: string) => {
    setDraggedItem(imageId);
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/html', imageId);
    
    // Add visual feedback
    const dragImage = e.currentTarget.cloneNode(true) as HTMLElement;
    dragImage.style.transform = 'rotate(5deg)';
    dragImage.style.opacity = '0.8';
    e.dataTransfer.setDragImage(dragImage, 0, 0);
  };

  const handleDragOver = (e: React.DragEvent, imageId: string) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
    setDragOverItem(imageId);
  };

  const handleDragLeave = () => {
    setDragOverItem(null);
  };

  const handleDrop = (e: React.DragEvent, targetImageId: string) => {
    e.preventDefault();
    
    if (!draggedItem || draggedItem === targetImageId) {
      setDraggedItem(null);
      setDragOverItem(null);
      return;
    }

    const draggedIndex = formData.gallery.findIndex(img => img.id === draggedItem);
    const targetIndex = formData.gallery.findIndex(img => img.id === targetImageId);

    if (draggedIndex === -1 || targetIndex === -1) return;

    const newGallery = [...formData.gallery];
    const [draggedImage] = newGallery.splice(draggedIndex, 1);
    newGallery.splice(targetIndex, 0, draggedImage);

    setFormData({
      ...formData,
      gallery: newGallery
    });

    setDraggedItem(null);
    setDragOverItem(null);
  };

  const handleDragEnd = () => {
    setDraggedItem(null);
    setDragOverItem(null);
  };

  // File Upload with Drag & Drop
  const handleFileUpload = (files: FileList) => {
    setUploadingImages(true);

    Array.from(files).forEach((file, index) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        const newImage = {
          id: (Date.now() + index).toString(),
          url: e.target?.result as string,
          title: file.name.replace(/\.[^/.]+$/, ""),
          category: 'playground'
        };

        setFormData(prev => ({
          ...prev,
          gallery: [...prev.gallery, newImage]
        }));
      };
      reader.readAsDataURL(file);
    });

    setTimeout(() => {
      setUploadingImages(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }, 1000);
  };

  const handleFileInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      handleFileUpload(files);
    }
  };

  const triggerFileUpload = () => {
    fileInputRef.current?.click();
  };

  // Drop Zone for file uploads
  const handleDropZoneDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'copy';
  };

  const handleDropZoneDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      handleFileUpload(files);
    }
  };

  const tabs = [
    { id: 'general', label: 'General', icon: '⚙️' },
    { id: 'services', label: 'Servicii', icon: '🎯' },
    { id: 'menu', label: 'Meniu', icon: '🍕' },
    { id: 'pricing', label: 'Prețuri', icon: '💰' },
    { id: 'offers', label: 'Oferte', icon: '🎁' },
    { id: 'gallery', label: 'Galerie', icon: '📸' },
    { id: 'regulations', label: 'Regulament', icon: '📋' }
  ];

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl w-full max-w-6xl max-h-[90vh] overflow-hidden">
        <div className="flex items-center justify-between p-6 border-b bg-gradient-to-r from-orange-500 to-pink-500 text-white">
          <h2 className="text-2xl font-bold">🛠️ Panou Admin</h2>
          <div className="flex items-center space-x-4">
            <button
              onClick={handleSave}
              className="bg-white/20 hover:bg-white/30 px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors"
            >
              <Save className="h-4 w-4" />
              <span>Salvează</span>
            </button>
            <button
              onClick={onClose}
              className="bg-white/20 hover:bg-white/30 p-2 rounded-lg transition-colors"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>

        <div className="flex h-[calc(90vh-80px)]">
          {/* Sidebar */}
          <div className="w-64 bg-gray-50 border-r overflow-y-auto">
            <div className="p-4">
              <h3 className="font-semibold text-gray-800 mb-4">Secțiuni</h3>
              <div className="space-y-2">
                {tabs.map(tab => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full text-left px-4 py-3 rounded-lg flex items-center space-x-3 transition-colors ${
                      activeTab === tab.id
                        ? 'bg-orange-500 text-white'
                        : 'text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    <span className="text-lg">{tab.icon}</span>
                    <span>{tab.label}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto p-6">
            {activeTab === 'general' && (
              <div className="space-y-6">
                <h3 className="text-xl font-bold text-gray-800">Informații Generale</h3>
                
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Logo (Text)</label>
                    <input
                      type="text"
                      value={formData.logo}
                      onChange={(e) => setFormData({ ...formData, logo: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Numele Site-ului</label>
                    <input
                      type="text"
                      value={formData.siteName}
                      onChange={(e) => setFormData({ ...formData, siteName: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Telefon</label>
                    <input
                      type="text"
                      value={formData.contact.phone}
                      onChange={(e) => setFormData({
                        ...formData,
                        contact: { ...formData.contact, phone: e.target.value }
                      })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                    <input
                      type="email"
                      value={formData.contact.email}
                      onChange={(e) => setFormData({
                        ...formData,
                        contact: { ...formData.contact, email: e.target.value }
                      })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Adresa</label>
                  <input
                    type="text"
                    value={formData.contact.address}
                    onChange={(e) => setFormData({
                      ...formData,
                      contact: { ...formData.contact, address: e.target.value }
                    })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Subtitlu Hero</label>
                  <textarea
                    value={formData.hero.subtitle}
                    onChange={(e) => setFormData({
                      ...formData,
                      hero: { ...formData.hero, subtitle: e.target.value }
                    })}
                    rows={3}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <h4 className="font-semibold text-gray-800 mb-4">Program</h4>
                  <div className="space-y-3">
                    {Object.entries(formData.schedule).map(([day, hours]) => (
                      <div key={day} className="flex items-center space-x-4">
                        <div className="w-32 font-medium text-gray-700">{day}:</div>
                        <input
                          type="text"
                          value={hours}
                          onChange={(e) => setFormData({
                            ...formData,
                            schedule: { ...formData.schedule, [day]: e.target.value }
                          })}
                          className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'services' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-bold text-gray-800">Servicii</h3>
                  <button
                    onClick={addService}
                    className="bg-orange-500 text-white px-4 py-2 rounded-lg flex items-center space-x-2 hover:bg-orange-600 transition-colors"
                  >
                    <Plus className="h-4 w-4" />
                    <span>Adaugă Serviciu</span>
                  </button>
                </div>

                <div className="space-y-4">
                  {formData.services.map((service) => (
                    <div key={service.id} className="bg-gray-50 p-4 rounded-lg">
                      <div className="flex items-center justify-between mb-4">
                        <h4 className="font-semibold text-gray-800">Serviciu #{service.id}</h4>
                        <button
                          onClick={() => removeService(service.id)}
                          className="text-red-500 hover:text-red-700 p-1"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                      
                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Titlu</label>
                          <input
                            type="text"
                            value={service.title}
                            onChange={(e) => updateService(service.id, 'title', e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                          />
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Icon</label>
                          <select
                            value={service.icon}
                            onChange={(e) => updateService(service.id, 'icon', e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                          >
                            <option value="Gamepad2">Gamepad2</option>
                            <option value="PartyPopper">PartyPopper</option>
                            <option value="Cake">Cake</option>
                            <option value="Music">Music</option>
                            <option value="Shield">Shield</option>
                            <option value="Users">Users</option>
                          </select>
                        </div>
                      </div>
                      
                      <div className="mt-4">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Descriere</label>
                        <textarea
                          value={service.description}
                          onChange={(e) => updateService(service.id, 'description', e.target.value)}
                          rows={3}
                          className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'menu' && (
              <div className="space-y-6">
                <h3 className="text-xl font-bold text-gray-800">Meniu</h3>
                
                {Object.entries(formData.menu).map(([category, categoryData]) => (
                  <div key={category} className="bg-gray-50 p-6 rounded-lg">
                    <div className="flex items-center justify-between mb-4">
                      <h4 className="text-lg font-semibold text-gray-800">{categoryData.title}</h4>
                      <button
                        onClick={() => addMenuItem(category)}
                        className="bg-orange-500 text-white px-3 py-1 rounded flex items-center space-x-1 hover:bg-orange-600 transition-colors text-sm"
                      >
                        <Plus className="h-3 w-3" />
                        <span>Adaugă</span>
                      </button>
                    </div>
                    
                    <div className="space-y-3">
                      {categoryData.items.map((item, index) => (
                        <div key={index} className="bg-white p-4 rounded border">
                          <div className="flex items-center justify-between mb-3">
                            <span className="font-medium text-gray-800">Produs #{index + 1}</span>
                            <button
                              onClick={() => removeMenuItem(category, index)}
                              className="text-red-500 hover:text-red-700 p-1"
                            >
                              <Trash2 className="h-3 w-3" />
                            </button>
                          </div>
                          
                          <div className="grid md:grid-cols-3 gap-3">
                            <div>
                              <label className="block text-xs font-medium text-gray-700 mb-1">Nume</label>
                              <input
                                type="text"
                                value={item.name}
                                onChange={(e) => updateMenuItem(category, index, 'name', e.target.value)}
                                className="w-full px-2 py-1 border border-gray-300 rounded text-sm focus:ring-1 focus:ring-orange-500 focus:border-transparent"
                              />
                            </div>
                            
                            <div>
                              <label className="block text-xs font-medium text-gray-700 mb-1">Preț</label>
                              <input
                                type="text"
                                value={item.price}
                                onChange={(e) => updateMenuItem(category, index, 'price', e.target.value)}
                                className="w-full px-2 py-1 border border-gray-300 rounded text-sm focus:ring-1 focus:ring-orange-500 focus:border-transparent"
                              />
                            </div>
                            
                            <div className="md:col-span-1">
                              <label className="block text-xs font-medium text-gray-700 mb-1">Descriere</label>
                              <input
                                type="text"
                                value={item.description}
                                onChange={(e) => updateMenuItem(category, index, 'description', e.target.value)}
                                className="w-full px-2 py-1 border border-gray-300 rounded text-sm focus:ring-1 focus:ring-orange-500 focus:border-transparent"
                              />
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'pricing' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-bold text-gray-800">Pachete Prețuri</h3>
                  <button
                    onClick={addPricingPackage}
                    className="bg-orange-500 text-white px-4 py-2 rounded-lg flex items-center space-x-2 hover:bg-orange-600 transition-colors"
                  >
                    <Plus className="h-4 w-4" />
                    <span>Adaugă Pachet</span>
                  </button>
                </div>

                <div className="space-y-6">
                  {formData.pricing.map((pkg) => (
                    <div key={pkg.id} className="bg-gray-50 p-6 rounded-lg">
                      <div className="flex items-center justify-between mb-4">
                        <h4 className="font-semibold text-gray-800">Pachet #{pkg.id}</h4>
                        <button
                          onClick={() => removePricingPackage(pkg.id)}
                          className="text-red-500 hover:text-red-700 p-1"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                      
                      <div className="grid md:grid-cols-2 gap-4 mb-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Nume Pachet</label>
                          <input
                            type="text"
                            value={pkg.name}
                            onChange={(e) => updatePricingPackage(pkg.id, 'name', e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                          />
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Preț (lei)</label>
                          <input
                            type="text"
                            value={pkg.price}
                            onChange={(e) => updatePricingPackage(pkg.id, 'price', e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                          />
                        </div>
                      </div>

                      <div className="grid md:grid-cols-2 gap-4 mb-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Durată</label>
                          <input
                            type="text"
                            value={pkg.duration}
                            onChange={(e) => updatePricingPackage(pkg.id, 'duration', e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                          />
                        </div>
                        
                        <div className="flex items-center">
                          <label className="flex items-center">
                            <input
                              type="checkbox"
                              checked={pkg.popular}
                              onChange={(e) => updatePricingPackage(pkg.id, 'popular', e.target.checked)}
                              className="mr-2"
                            />
                            <span className="text-sm font-medium text-gray-700">Pachet Popular</span>
                          </label>
                        </div>
                      </div>

                      <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Descriere</label>
                        <textarea
                          value={pkg.description}
                          onChange={(e) => updatePricingPackage(pkg.id, 'description', e.target.value)}
                          rows={2}
                          className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                        />
                      </div>

                      <div>
                        <div className="flex items-center justify-between mb-3">
                          <label className="block text-sm font-medium text-gray-700">Caracteristici</label>
                          <button
                            onClick={() => addFeatureToPricing(pkg.id)}
                            className="bg-blue-500 text-white px-2 py-1 rounded text-xs hover:bg-blue-600 transition-colors"
                          >
                            <Plus className="h-3 w-3 inline mr-1" />
                            Adaugă
                          </button>
                        </div>
                        <div className="space-y-2">
                          {pkg.features.map((feature, index) => (
                            <div key={index} className="flex items-center space-x-2">
                              <input
                                type="text"
                                value={feature}
                                onChange={(e) => updatePricingFeature(pkg.id, index, e.target.value)}
                                className="flex-1 px-2 py-1 border border-gray-300 rounded text-sm focus:ring-1 focus:ring-orange-500 focus:border-transparent"
                              />
                              <button
                                onClick={() => removeFeatureFromPricing(pkg.id, index)}
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

            {activeTab === 'offers' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-bold text-gray-800">Oferte Speciale</h3>
                  <button
                    onClick={addOffer}
                    className="bg-orange-500 text-white px-4 py-2 rounded-lg flex items-center space-x-2 hover:bg-orange-600 transition-colors"
                  >
                    <Plus className="h-4 w-4" />
                    <span>Adaugă Ofertă</span>
                  </button>
                </div>

                <div className="space-y-4">
                  {formData.offers.map((offer) => (
                    <div key={offer.id} className="bg-gray-50 p-4 rounded-lg">
                      <div className="flex items-center justify-between mb-4">
                        <h4 className="font-semibold text-gray-800">Ofertă #{offer.id}</h4>
                        <button
                          onClick={() => removeOffer(offer.id)}
                          className="text-red-500 hover:text-red-700 p-1"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                      
                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Titlu Ofertă</label>
                          <input
                            type="text"
                            value={offer.title}
                            onChange={(e) => updateOffer(offer.id, 'title', e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                          />
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Valabilitate</label>
                          <input
                            type="text"
                            value={offer.validUntil}
                            onChange={(e) => updateOffer(offer.id, 'validUntil', e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                          />
                        </div>
                      </div>
                      
                      <div className="mt-4">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Descriere</label>
                        <textarea
                          value={offer.description}
                          onChange={(e) => updateOffer(offer.id, 'description', e.target.value)}
                          rows={3}
                          className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'gallery' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-bold text-gray-800">Galerie cu Drag & Drop 🎯</h3>
                  <div className="flex items-center space-x-3">
                    <button
                      onClick={triggerFileUpload}
                      disabled={uploadingImages}
                      className="bg-blue-500 text-white px-4 py-2 rounded-lg flex items-center space-x-2 hover:bg-blue-600 transition-colors disabled:opacity-50"
                    >
                      <Upload className="h-4 w-4" />
                      <span>{uploadingImages ? 'Se încarcă...' : 'Upload Imagini'}</span>
                    </button>
                    <button
                      onClick={addGalleryImage}
                      className="bg-orange-500 text-white px-4 py-2 rounded-lg flex items-center space-x-2 hover:bg-orange-600 transition-colors"
                    >
                      <Plus className="h-4 w-4" />
                      <span>Adaugă URL</span>
                    </button>
                  </div>
                </div>

                {/* Hidden file input */}
                <input
                  ref={fileInputRef}
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={handleFileInputChange}
                  className="hidden"
                />

                {/* Drop Zone for file uploads */}
                <div
                  onDragOver={handleDropZoneDragOver}
                  onDrop={handleDropZoneDrop}
                  className="border-2 border-dashed border-blue-300 rounded-lg p-8 text-center bg-blue-50 hover:bg-blue-100 transition-colors"
                >
                  <Upload className="h-12 w-12 text-blue-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-blue-700 mb-2">Trage și lasă imaginile aici</h3>
                  <p className="text-blue-600">sau apasă butonul "Upload Imagini" de mai sus</p>
                </div>

                {/* Upload Progress */}
                {uploadingImages && (
                  <div className="bg-blue-50 border border-blue-200 p-4 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-blue-500"></div>
                      <span className="text-blue-700">Se încarcă imaginile...</span>
                    </div>
                  </div>
                )}

                {/* Instructions */}
                <div className="bg-gradient-to-r from-purple-50 to-pink-50 border border-purple-200 p-4 rounded-lg">
                  <h4 className="font-semibold text-purple-800 mb-2">🎯 Instrucțiuni Drag & Drop:</h4>
                  <ul className="text-sm text-purple-700 space-y-1">
                    <li>• <strong>Reordonare:</strong> Trage imaginile pentru a le reordona</li>
                    <li>• <strong>Upload:</strong> Trage fișiere în zona albastră de mai sus</li>
                    <li>• <strong>Ștergere:</strong> Apasă de 2 ori butonul roșu pentru confirmare</li>
                    <li>• <strong>Editare:</strong> Modifică URL-ul, titlul și categoria în timp real</li>
                  </ul>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  {formData.gallery.map((image, index) => (
                    <div
                      key={image.id}
                      draggable
                      onDragStart={(e) => handleDragStart(e, image.id)}
                      onDragOver={(e) => handleDragOver(e, image.id)}
                      onDragLeave={handleDragLeave}
                      onDrop={(e) => handleDrop(e, image.id)}
                      onDragEnd={handleDragEnd}
                      className={`bg-gray-50 p-4 rounded-lg border-2 transition-all cursor-move ${
                        draggedItem === image.id 
                          ? 'opacity-50 scale-95 border-orange-300' 
                          : dragOverItem === image.id
                          ? 'border-orange-400 bg-orange-50 scale-105 shadow-lg'
                          : 'border-transparent hover:border-orange-200 hover:shadow-md'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center space-x-2">
                          <GripVertical className="h-5 w-5 text-gray-400" />
                          <h4 className="font-semibold text-gray-800">#{index + 1} - {image.title}</h4>
                        </div>
                        <div className="flex items-center space-x-2">
                          {/* Delete button with confirmation */}
                          <button
                            onClick={() => removeGalleryImage(image.id)}
                            className={`p-1 transition-colors ${
                              deleteConfirm === image.id 
                                ? 'text-red-700 bg-red-100 rounded' 
                                : 'text-red-500 hover:text-red-700'
                            }`}
                            title={deleteConfirm === image.id ? 'Confirmă ștergerea' : 'Șterge imaginea'}
                          >
                            {deleteConfirm === image.id ? (
                              <AlertTriangle className="h-4 w-4" />
                            ) : (
                              <Trash2 className="h-4 w-4" />
                            )}
                          </button>
                        </div>
                      </div>
                      
                      {/* Delete confirmation message */}
                      {deleteConfirm === image.id && (
                        <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
                          <div className="flex items-center space-x-2 text-red-700">
                            <AlertTriangle className="h-4 w-4" />
                            <span className="text-sm font-medium">Apasă din nou pentru a confirma ștergerea</span>
                          </div>
                        </div>
                      )}
                      
                      <div className="mb-4">
                        <img 
                          src={image.url} 
                          alt={image.title}
                          className="w-full h-32 object-cover rounded border"
                          onError={(e) => {
                            e.currentTarget.src = 'https://via.placeholder.com/400x200?text=Imagine+Indisponibilă';
                          }}
                        />
                      </div>
                      
                      <div className="space-y-3">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">URL Imagine</label>
                          <input
                            type="text"
                            value={image.url}
                            onChange={(e) => updateGalleryImage(image.id, 'url', e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-orange-500 focus:border-transparent text-sm"
                            placeholder="https://example.com/image.jpg"
                          />
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Titlu</label>
                          <input
                            type="text"
                            value={image.title}
                            onChange={(e) => updateGalleryImage(image.id, 'title', e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                            placeholder="Titlul imaginii"
                          />
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Categorie</label>
                          <select
                            value={image.category}
                            onChange={(e) => updateGalleryImage(image.id, 'category', e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                          >
                            <option value="playground">🎪 Zone de Joacă</option>
                            <option value="parties">🎉 Petreceri</option>
                            <option value="food">🍕 Mâncare</option>
                            <option value="events">🎯 Evenimente</option>
                          </select>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Empty state */}
                {formData.gallery.length === 0 && (
                  <div className="text-center py-12 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300">
                    <Image className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-700 mb-2">Nicio imagine în galerie</h3>
                    <p className="text-gray-500 mb-4">Adaugă prima imagine pentru a începe galeria</p>
                    <button
                      onClick={addGalleryImage}
                      className="bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600 transition-colors"
                    >
                      Adaugă Prima Imagine
                    </button>
                  </div>
                )}
              </div>
            )}

            {activeTab === 'regulations' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-bold text-gray-800">Regulament și Texte Legale 📋</h3>
                  <div className="flex items-center space-x-3">
                    <select
                      value={previewLanguage}
                      onChange={(e) => setPreviewLanguage(e.target.value as 'ro' | 'en' | 'hu')}
                      className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    >
                      <option value="ro">🇷🇴 Română</option>
                      <option value="en">🇬🇧 English</option>
                      <option value="hu">🇭🇺 Magyar</option>
                    </select>
                    <button
                      onClick={addRegulation}
                      className="bg-orange-500 text-white px-4 py-2 rounded-lg flex items-center space-x-2 hover:bg-orange-600 transition-colors"
                    >
                      <Plus className="h-4 w-4" />
                      <span>Adaugă Regulă</span>
                    </button>
                  </div>
                </div>

                {/* Editable Regulation Texts */}
                <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-6 rounded-lg border border-blue-200">
                  <h4 className="font-bold text-blue-800 mb-4">📝 Texte Editabile Regulament</h4>
                  
                  <div className="space-y-6">
                    {/* Warning Text */}
                    <div className="bg-white p-4 rounded-lg border">
                      <h5 className="font-semibold text-gray-800 mb-3">⚠️ Text Avertisment</h5>
                      <div className="space-y-3">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Titlu ({previewLanguage.toUpperCase()})</label>
                          <input
                            type="text"
                            value={formData.regulationTexts.warningTitle[previewLanguage]}
                            onChange={(e) => updateRegulationText('warningTitle', previewLanguage, e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Text ({previewLanguage.toUpperCase()})</label>
                          <textarea
                            value={formData.regulationTexts.warningText[previewLanguage]}
                            onChange={(e) => updateRegulationText('warningText', previewLanguage, e.target.value)}
                            rows={3}
                            className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Refusal Text */}
                    <div className="bg-white p-4 rounded-lg border">
                      <h5 className="font-semibold text-gray-800 mb-3">🚫 Dreptul de Refuz</h5>
                      <div className="space-y-3">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Titlu ({previewLanguage.toUpperCase()})</label>
                          <input
                            type="text"
                            value={formData.regulationTexts.refusalTitle[previewLanguage]}
                            onChange={(e) => updateRegulationText('refusalTitle', previewLanguage, e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Text ({previewLanguage.toUpperCase()})</label>
                          <textarea
                            value={formData.regulationTexts.refusalText[previewLanguage]}
                            onChange={(e) => updateRegulationText('refusalText', previewLanguage, e.target.value)}
                            rows={4}
                            className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Acceptance Text */}
                    <div className="bg-white p-4 rounded-lg border">
                      <h5 className="font-semibold text-gray-800 mb-3">🚪 Text Acceptare</h5>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Text ({previewLanguage.toUpperCase()})</label>
                        <input
                          type="text"
                          value={formData.regulationTexts.acceptanceText[previewLanguage]}
                          onChange={(e) => updateRegulationText('acceptanceText', previewLanguage, e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                        />
                      </div>
                    </div>

                    {/* Thank You Text */}
                    <div className="bg-white p-4 rounded-lg border">
                      <h5 className="font-semibold text-gray-800 mb-3">🙏 Mesaj Mulțumire</h5>
                      <div className="space-y-3">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Titlu ({previewLanguage.toUpperCase()})</label>
                          <input
                            type="text"
                            value={formData.regulationTexts.thankYouTitle[previewLanguage]}
                            onChange={(e) => updateRegulationText('thankYouTitle', previewLanguage, e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Text ({previewLanguage.toUpperCase()})</label>
                          <textarea
                            value={formData.regulationTexts.thankYouText[previewLanguage]}
                            onChange={(e) => updateRegulationText('thankYouText', previewLanguage, e.target.value)}
                            rows={3}
                            className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Preview Section */}
                <div className="bg-gray-50 p-6 rounded-lg border">
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="font-bold text-gray-800">👁️ Preview ({previewLanguage.toUpperCase()})</h4>
                    <Eye className="h-5 w-5 text-gray-600" />
                  </div>
                  
                  <div className="space-y-4 text-sm">
                    <div className="bg-red-100 border border-red-300 p-3 rounded">
                      <div className="font-bold text-red-800">{formData.regulationTexts.warningTitle[previewLanguage]}</div>
                      <div className="text-red-700 mt-1">{formData.regulationTexts.warningText[previewLanguage]}</div>
                    </div>
                    
                    <div className="bg-gray-100 border border-gray-300 p-3 rounded">
                      <div className="font-bold text-gray-800">{formData.regulationTexts.refusalTitle[previewLanguage]}</div>
                      <div className="text-gray-700 mt-1">{formData.regulationTexts.refusalText[previewLanguage]}</div>
                    </div>
                    
                    <div className="bg-yellow-100 border border-yellow-300 p-3 rounded">
                      <div className="font-bold text-yellow-800">{formData.regulationTexts.acceptanceText[previewLanguage]}</div>
                    </div>
                    
                    <div className="bg-green-100 border border-green-300 p-3 rounded">
                      <div className="font-bold text-green-800">{formData.regulationTexts.thankYouTitle[previewLanguage]}</div>
                      <div className="text-green-700 mt-1">{formData.regulationTexts.thankYouText[previewLanguage]}</div>
                    </div>
                  </div>
                </div>

                {/* Regulations List */}
                <div className="space-y-4">
                  <h4 className="font-bold text-gray-800">📋 Puncte Regulament</h4>
                  {(formData.regulations || []).map((regulation) => (
                    <div key={regulation.id} className="bg-gray-50 p-4 rounded-lg">
                      <div className="flex items-center justify-between mb-4">
                        <h5 className="font-semibold text-gray-800">Regulă #{regulation.id}</h5>
                        <button
                          onClick={() => removeRegulation(regulation.id)}
                          className="text-red-500 hover:text-red-700 p-1"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                      
                      <div className="grid md:grid-cols-2 gap-4 mb-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Titlu</label>
                          <input
                            type="text"
                            value={regulation.title}
                            onChange={(e) => updateRegulation(regulation.id, 'title', e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                          />
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Icon</label>
                          <select
                            value={regulation.icon}
                            onChange={(e) => updateRegulation(regulation.id, 'icon', e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                          >
                            <option value="Shield">Shield</option>
                            <option value="AlertTriangle">AlertTriangle</option>
                            <option value="Users">Users</option>
                            <option value="Clock">Clock</option>
                            <option value="Camera">Camera</option>
                            <option value="Heart">Heart</option>
                            <option value="XCircle">XCircle</option>
                          </select>
                        </div>
                      </div>

                      <div>
                        <div className="flex items-center justify-between mb-3">
                          <label className="block text-sm font-medium text-gray-700">Puncte Regulament</label>
                          <button
                            onClick={() => addRegulationItem(regulation.id)}
                            className="bg-blue-500 text-white px-2 py-1 rounded text-xs hover:bg-blue-600 transition-colors"
                          >
                            <Plus className="h-3 w-3 inline mr-1" />
                            Adaugă Punct
                          </button>
                        </div>
                        <div className="space-y-2">
                          {regulation.items.map((item, index) => (
                            <div key={index} className="flex items-start space-x-2">
                              <textarea
                                value={item}
                                onChange={(e) => updateRegulationItem(regulation.id, index, e.target.value)}
                                rows={2}
                                className="flex-1 px-2 py-1 border border-gray-300 rounded text-sm focus:ring-1 focus:ring-orange-500 focus:border-transparent"
                              />
                              <button
                                onClick={() => removeRegulationItem(regulation.id, index)}
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

                {/* Empty state */}
                {(!formData.regulations || formData.regulations.length === 0) && (
                  <div className="text-center py-12 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300">
                    <AlertTriangle className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-700 mb-2">Nicio regulă adăugată</h3>
                    <p className="text-gray-500 mb-4">Adaugă prima regulă pentru a începe regulamentul</p>
                    <button
                      onClick={addRegulation}
                      className="bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600 transition-colors"
                    >
                      Adaugă Prima Regulă
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;