import React from 'react';
import { Plus, Trash2 } from 'lucide-react';

interface Offer {
  id: string;
  title: string;
  description: string;
  validUntil: string;
  color: string;
}

interface OffersTabProps {
  offers: Offer[];
  updateOffer: (index: number, field: string, value: string) => void;
  addOffer: () => void;
  removeOffer: (index: number) => void;
}

const OffersTab: React.FC<OffersTabProps> = ({ 
  offers, 
  updateOffer, 
  addOffer, 
  removeOffer 
}) => {
  const colorOptions = [
    { value: 'bg-blue-500', label: 'Albastru' },
    { value: 'bg-green-500', label: 'Verde' },
    { value: 'bg-purple-500', label: 'Mov' },
    { value: 'bg-pink-500', label: 'Roz' },
    { value: 'bg-orange-500', label: 'Portocaliu' },
    { value: 'bg-red-500', label: 'Roșu' },
    { value: 'bg-indigo-500', label: 'Indigo' },
    { value: 'bg-yellow-500', label: 'Galben' }
  ];

  return (
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
        {offers.map((offer, index) => (
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
            <div className="grid md:grid-cols-2 gap-3 mb-3">
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
            </div>
            <div className="mb-3">
              <label className="block text-sm font-medium text-gray-700 mb-1">Culoare</label>
              <select
                value={offer.color}
                onChange={(e) => updateOffer(index, 'color', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
              >
                {colorOptions.map((color) => (
                  <option key={color.value} value={color.value}>
                    {color.label}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Descriere</label>
              <textarea
                value={offer.description}
                onChange={(e) => updateOffer(index, 'description', e.target.value)}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm resize-none"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OffersTab;