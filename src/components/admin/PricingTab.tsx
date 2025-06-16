import React from 'react';
import { Plus, Trash2 } from 'lucide-react';

interface PricingPackage {
  id: string;
  name: string;
  price: string;
  duration: string;
  description: string;
  features: string[];
  popular: boolean;
}

interface PricingTabProps {
  pricing: PricingPackage[];
  updatePricingPackage: (index: number, field: string, value: any) => void;
  addPricingPackage: () => void;
  removePricingPackage: (index: number) => void;
  addFeature: (packageIndex: number) => void;
  updateFeature: (packageIndex: number, featureIndex: number, value: string) => void;
  removeFeature: (packageIndex: number, featureIndex: number) => void;
}

const PricingTab: React.FC<PricingTabProps> = ({ 
  pricing, 
  updatePricingPackage, 
  addPricingPackage, 
  removePricingPackage,
  addFeature,
  updateFeature,
  removeFeature
}) => {
  return (
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
        {pricing.map((pkg, index) => (
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
  );
};

export default PricingTab;