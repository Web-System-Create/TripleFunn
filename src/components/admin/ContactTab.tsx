import React from 'react';

interface ContactTabProps {
  formData: {
    contact: {
      phone: string;
      whatsapp: string;
      email: string;
      address: string;
    };
  };
  handleContactChange: (field: string, value: string) => void;
}

const ContactTab: React.FC<ContactTabProps> = ({ formData, handleContactChange }) => {
  return (
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
  );
};

export default ContactTab;