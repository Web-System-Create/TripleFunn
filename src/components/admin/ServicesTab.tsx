import React from 'react';
import { Plus, Trash2 } from 'lucide-react';

interface Service {
  id: string;
  title: string;
  description: string;
  icon: string;
  color: string;
}

interface ServicesTabProps {
  services: Service[];
  updateService: (index: number, field: string, value: string) => void;
  addService: () => void;
  removeService: (index: number) => void;
}

const ServicesTab: React.FC<ServicesTabProps> = ({ 
  services, 
  updateService, 
  addService, 
  removeService 
}) => {
  return (
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
        {services.map((service, index) => (
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
  );
};

export default ServicesTab;