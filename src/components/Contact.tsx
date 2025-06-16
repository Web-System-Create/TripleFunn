import React, { useState } from 'react';
import { MapPin, Phone, Mail, Clock, Facebook, Instagram, MessageCircle } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { useAdmin } from '../contexts/AdminContext';

const Contact = () => {
  const { t } = useLanguage();
  const { siteData } = useAdmin();
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    date: '',
    message: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Check if required fields are filled
    if (!formData.name || !formData.phone || !formData.message) {
      alert('Vă rugăm să completați toate câmpurile obligatorii (nume, telefon, mesaj).');
      return;
    }
    
    // Use fallback WhatsApp number if not available in siteData
    const whatsappNumber = siteData?.contact?.whatsapp || '0755286670';
    
    // Create WhatsApp message
    const whatsappMessage = `🎉 *Cerere de Rezervare Triple Fun*

👤 *Nume:* ${formData.name}
📞 *Telefon:* ${formData.phone}
📧 *Email:* ${formData.email || 'Nu a fost specificat'}
📅 *Data dorită:* ${formData.date || 'Nu a fost specificată'}

💬 *Mesaj:*
${formData.message}

---
Trimis de pe site-ul Triple Fun`;

    try {
      // Clean phone number and create proper WhatsApp URL
      const cleanPhone = whatsappNumber.replace(/\D/g, '');
      const whatsappUrl = `https://wa.me/${cleanPhone}?text=${encodeURIComponent(whatsappMessage)}`;
      
      // Open WhatsApp
      window.open(whatsappUrl, '_blank');
      
      // Show success message
      alert('Mesajul a fost pregătit pentru WhatsApp! Se va deschide aplicația WhatsApp.');
      
      // Reset form
      setFormData({
        name: '',
        phone: '',
        email: '',
        date: '',
        message: ''
      });
    } catch (error) {
      console.error('Error opening WhatsApp:', error);
      alert('A apărut o eroare. Vă rugăm să sunați direct la 0748 55 99 79.');
    }
  };

  return (
    <section id="contact" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-800 mb-4">
            {t('contact.title')}
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {t('contact.subtitle')}
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          <div className="space-y-8">
            <div className="bg-white rounded-2xl p-6 shadow-lg">
              <h3 className="text-2xl font-bold text-gray-800 mb-6">Informații de Contact</h3>
              
              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="bg-orange-100 p-3 rounded-full mr-4">
                    <MapPin className="h-6 w-6 text-orange-500" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800">Adresa</h4>
                    <p className="text-gray-600">{siteData?.contact?.address || 'Strada Jocului Nr. 15, București'}</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="bg-pink-100 p-3 rounded-full mr-4">
                    <Phone className="h-6 w-6 text-pink-500" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800">Telefon</h4>
                    <p className="text-gray-600">{siteData?.contact?.phone || '0748 55 99 79'}</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="bg-green-100 p-3 rounded-full mr-4">
                    <MessageCircle className="h-6 w-6 text-green-500" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800">WhatsApp</h4>
                    <p className="text-gray-600">+{siteData?.contact?.whatsapp || '40 755 28 66 70'}</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="bg-purple-100 p-3 rounded-full mr-4">
                    <Mail className="h-6 w-6 text-purple-500" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800">Email</h4>
                    <p className="text-gray-600">{siteData?.contact?.email || 'contact@triplefun.ro'}</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="bg-blue-100 p-3 rounded-full mr-4">
                    <Clock className="h-6 w-6 text-blue-500" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800">Program</h4>
                    <div className="text-gray-600 space-y-1">
                      {siteData?.schedule ? Object.entries(siteData.schedule).map(([day, hours]) => (
                        <p key={day}>{day}: {hours}</p>
                      )) : (
                        <>
                          <p>Luni - Joi: 10:00 - 20:00</p>
                          <p>Vineri: 10:00 - 22:00</p>
                          <p>Sâmbătă - Duminică: 09:00 - 22:00</p>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-8">
                <h4 className="font-semibold text-gray-800 mb-4">Urmărește-ne</h4>
                <div className="flex space-x-4">
                  <a href="#" className="bg-blue-600 p-3 rounded-full text-white hover:bg-blue-700 transition-colors">
                    <Facebook className="h-5 w-5" />
                  </a>
                  <a href="#" className="bg-pink-600 p-3 rounded-full text-white hover:bg-pink-700 transition-colors">
                    <Instagram className="h-5 w-5" />
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-lg">
            <h3 className="text-2xl font-bold text-gray-800 mb-6">Trimite-ne un Mesaj</h3>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Numele tău *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition-all"
                    placeholder="Introduceți numele"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Telefon *
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition-all"
                    placeholder="0755 28 66 70"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition-all"
                  placeholder="your@email.com"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Data dorită pentru petrecere
                </label>
                <input
                  type="date"
                  name="date"
                  value={formData.date}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition-all"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Mesajul tău *
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  rows={4}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition-all resize-none"
                  placeholder="Spune-ne mai multe despre petrecerea dorită..."
                  required
                ></textarea>
              </div>

              <div className="bg-green-50 border border-green-200 p-4 rounded-lg">
                <div className="flex items-center mb-2">
                  <MessageCircle className="h-5 w-5 text-green-500 mr-2" />
                  <h4 className="font-semibold text-green-800">Mesajul se trimite pe WhatsApp</h4>
                </div>
                <p className="text-sm text-green-700">
                  Când apăsați "Trimite pe WhatsApp", se va deschide WhatsApp cu mesajul completat automat pentru a ne contacta rapid.
                </p>
              </div>

              <button 
                type="submit"
                className="w-full bg-gradient-to-r from-green-500 to-green-600 text-white py-4 rounded-lg font-semibold hover:from-green-600 hover:to-green-700 transition-all transform hover:scale-105 shadow-lg flex items-center justify-center"
              >
                <MessageCircle className="h-5 w-5 mr-2" />
                Trimite pe WhatsApp
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;