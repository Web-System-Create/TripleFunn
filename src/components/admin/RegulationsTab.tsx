import React from 'react';
import { Plus, Trash2 } from 'lucide-react';

interface Regulation {
  id: string;
  icon: string;
  title: string;
  items: string[];
  color: string;
  bgColor: string;
}

interface RegulationTexts {
  warningTitle: { ro: string; en: string; hu: string };
  warningText: { ro: string; en: string; hu: string };
  refusalTitle: { ro: string; en: string; hu: string };
  refusalText: { ro: string; en: string; hu: string };
  acceptanceText: { ro: string; en: string; hu: string };
  thankYouTitle: { ro: string; en: string; hu: string };
  thankYouText: { ro: string; en: string; hu: string };
}

interface RegulationsTabProps {
  regulations: Regulation[];
  regulationTexts: RegulationTexts;
  updateRegulation: (index: number, field: string, value: any) => void;
  addRegulation: () => void;
  removeRegulation: (index: number) => void;
  addRegulationItem: (regulationIndex: number) => void;
  updateRegulationItem: (regulationIndex: number, itemIndex: number, value: string) => void;
  removeRegulationItem: (regulationIndex: number, itemIndex: number) => void;
  updateRegulationText: (textKey: string, language: string, value: string) => void;
}

const RegulationsTab: React.FC<RegulationsTabProps> = ({ 
  regulations,
  regulationTexts,
  updateRegulation,
  addRegulation,
  removeRegulation,
  addRegulationItem,
  updateRegulationItem,
  removeRegulationItem,
  updateRegulationText
}) => {
  const iconOptions = [
    { value: 'Shield', label: 'Shield' },
    { value: 'AlertTriangle', label: 'AlertTriangle' },
    { value: 'Users', label: 'Users' },
    { value: 'Clock', label: 'Clock' },
    { value: 'Camera', label: 'Camera' },
    { value: 'Heart', label: 'Heart' },
    { value: 'CheckCircle', label: 'CheckCircle' },
    { value: 'XCircle', label: 'XCircle' }
  ];

  const colorOptions = [
    { value: 'bg-blue-500', bgValue: 'bg-blue-50', label: 'Albastru' },
    { value: 'bg-green-500', bgValue: 'bg-green-50', label: 'Verde' },
    { value: 'bg-purple-500', bgValue: 'bg-purple-50', label: 'Mov' },
    { value: 'bg-pink-500', bgValue: 'bg-pink-50', label: 'Roz' },
    { value: 'bg-orange-500', bgValue: 'bg-orange-50', label: 'Portocaliu' },
    { value: 'bg-red-500', bgValue: 'bg-red-50', label: 'Roșu' },
    { value: 'bg-indigo-500', bgValue: 'bg-indigo-50', label: 'Indigo' },
    { value: 'bg-yellow-500', bgValue: 'bg-yellow-50', label: 'Galben' }
  ];

  return (
    <div className="space-y-8">
      {/* Regulation Sections */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-bold text-gray-800">Secțiuni Regulament</h3>
          <button
            onClick={addRegulation}
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold transition-colors flex items-center"
          >
            <Plus className="h-4 w-4 mr-2" />
            Adaugă Secțiune
          </button>
        </div>
        <div className="space-y-6">
          {regulations.map((regulation, index) => (
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
              <div className="grid md:grid-cols-3 gap-3 mb-4">
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
                    {iconOptions.map((icon) => (
                      <option key={icon.value} value={icon.value}>
                        {icon.label}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Culoare</label>
                  <select
                    value={regulation.color}
                    onChange={(e) => {
                      const selectedColor = colorOptions.find(c => c.value === e.target.value);
                      updateRegulation(index, 'color', e.target.value);
                      if (selectedColor) {
                        updateRegulation(index, 'bgColor', selectedColor.bgValue);
                      }
                    }}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                  >
                    {colorOptions.map((color) => (
                      <option key={color.value} value={color.value}>
                        {color.label}
                      </option>
                    ))}
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

      {/* Regulation Texts */}
      <div className="border-t pt-8">
        <h3 className="text-lg font-bold text-gray-800 mb-6">Texte Regulament Multilingv</h3>
        <div className="space-y-6">
          {Object.entries(regulationTexts).map(([textKey, translations]) => (
            <div key={textKey} className="bg-gray-50 p-4 rounded-lg border">
              <h4 className="font-semibold text-gray-800 mb-3 capitalize">
                {textKey.replace(/([A-Z])/g, ' $1')}
              </h4>
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
    </div>
  );
};

export default RegulationsTab;