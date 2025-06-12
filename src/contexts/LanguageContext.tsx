import React, { createContext, useContext, useState, ReactNode } from 'react';

type Language = 'ro' | 'en' | 'hu';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const translations = {
  ro: {
    // Header (removed 'nav.home')
    'nav.services': 'Servicii',
    'nav.menu': 'Meniu',
    'nav.pricing': 'Prețuri',
    'nav.offers': 'Oferte',
    'nav.contact': 'Contact',
    'nav.gallery': 'Galerie',
    'nav.regulations': 'Regulament',
    'nav.admin': 'Admin',
    
    // Hero
    'hero.title': 'Cea mai',
    'hero.title.highlight': 'distractivă',
    'hero.title.end': 'petrecere',
    'hero.subtitle': 'Locul perfect pentru petreceri de copii, evenimente speciale și distracție în familie. Oferim experiențe memorabile într-un mediu sigur și prietenos.',
    'hero.cta.book': 'Rezervă Acum',
    'hero.cta.menu': 'Vezi Meniul',
    'hero.stats.parties': 'Petreceri reușite',
    'hero.stats.experience': 'Ani experiență',
    'hero.stats.children': 'Copii pe zi',
    
    // Services
    'services.title': 'Serviciile Noastre',
    'services.subtitle': 'Oferim o gamă completă de servicii pentru a face experiența ta și a copilului tău una specială',
    
    // Menu
    'menu.title': 'Meniul Nostru',
    'menu.subtitle': 'Preparate delicioase pentru copii și adulți, pregătite cu ingrediente proaspete și multă dragoste',
    'menu.category.copii': 'Meniu Copii',
    'menu.category.adulti': 'Meniu Adulți',
    'menu.category.bauturi': 'Băuturi',
    
    // Menu Items - Kids
    'menu.kids.crispy': 'Crispy din mușchiuleț de pui',
    'menu.kids.crispy.desc': '2 bucăți (100g) + 100g cartofi prăjiți + băutură la alegere',
    'menu.kids.pizza': 'Pizza Margherita (mini)',
    'menu.kids.pizza.desc': 'Pizza specială pentru copii',
    'menu.kids.pasta': 'Paste cu sos de roșii',
    'menu.kids.pasta.desc': 'Porție de copil cu parmezan',
    'menu.kids.sandwich': 'Sandwich cu șuncă și cașcaval',
    'menu.kids.sandwich.desc': 'Pe pâine toast cu cartofi',
    'menu.kids.icecream': 'Înghețată 3 bile',
    'menu.kids.icecream.desc': 'Vanilie, ciocolată, căpșuni',
    'menu.kids.cake': 'Tort personalizat',
    'menu.kids.cake.desc': 'Comandă specială (min. 1kg)',
    
    // Menu Items - Adults
    'menu.adults.grill': 'Platou Grătar Mixt (10 persoane)',
    'menu.adults.grill.desc': '10 buc crispy pui + 10 buc ceafă + 10 buc mici + 650g cartofi prăjiți',
    'menu.adults.charcuterie': 'Platou Salamuri și Brânzeturi (10 persoane)',
    'menu.adults.charcuterie.desc': 'Salamuri și brânzeturi italiene (2kg) servite cu focaccia',
    'menu.adults.burger': 'Burger Classic',
    'menu.adults.burger.desc': 'Carne de vită, bacon, cașcaval, cartofi',
    'menu.adults.caesar': 'Salată Caesar',
    'menu.adults.caesar.desc': 'Cu pui, crutoane, parmezan',
    'menu.adults.pizza': 'Pizza Quattro Stagioni',
    'menu.adults.pizza.desc': 'Șuncă, ciuperci, măsline, ardei',
    'menu.adults.carbonara': 'Paste Carbonara',
    'menu.adults.carbonara.desc': 'Cu bacon și parmezan',
    
    // Menu Items - Drinks
    'menu.drinks.juice': 'Sucuri naturale',
    'menu.drinks.juice.desc': 'Portocale, mere, morcovi',
    'menu.drinks.lemonade': 'Limonadă fresh',
    'menu.drinks.lemonade.desc': 'Preparată în casă',
    'menu.drinks.coffee': 'Cafea espresso',
    'menu.drinks.coffee.desc': 'Blend premium',
    'menu.drinks.tea': 'Ceai vrac',
    'menu.drinks.tea.desc': 'Diverse arome',
    'menu.drinks.smoothie': 'Smoothie fructe',
    'menu.drinks.smoothie.desc': 'Banane, căpșuni, mango',
    'menu.drinks.water': 'Apă minerală',
    'menu.drinks.water.desc': '0.5L sau 1.5L',
    
    // Pricing
    'pricing.title': 'Pachete Petreceri',
    'pricing.subtitle': 'Alege pachetul perfect pentru petrecerea copilului tău. Toate pachetele includ acces complet la zonele de joacă',
    'pricing.popular': 'Cel mai popular',
    'pricing.book': 'Rezervă Acum',
    'pricing.additional': 'Servicii Adiționale',
    'pricing.extra.animators': 'Animatori extra',
    'pricing.extra.time': 'Prelungire timp',
    'pricing.extra.decorations': 'Decorațiuni extra',
    'pricing.extra.transport': 'Transport tort',
    
    // Offers
    'offers.title': 'Oferte Speciale',
    'offers.subtitle': 'Profită de ofertele noastre speciale și economisește la petrecerea perfectă pentru copilul tău',
    'offers.discount.title': '20% Reducere Luni-Joi',
    'offers.discount.desc': 'Rezervă petrecerea între Luni și Joi și primești 20% reducere la toate pachetele!',
    'offers.discount.valid': 'Valabil până pe 31 Decembrie 2024',
    'offers.free.title': 'Al 2-lea Copil GRATUIT',
    'offers.free.desc': 'Pentru rezervări de grup (minimum 20 copii), al 2-lea copil participă gratuit!',
    'offers.free.valid': 'Ofertă permanentă',
    'offers.anniversary.title': 'Pachet Aniversar Complet',
    'offers.anniversary.desc': 'Rezervă cu 30 zile înainte și primești decorațiuni tematice și tort personalizat GRATUIT!',
    'offers.anniversary.valid': 'Pentru rezervări în avans',
    'offers.happy.title': 'Happy Hour 10-14',
    'offers.happy.desc': 'Între orele 10:00-14:00, toate băuturile și gustările sunt cu 30% mai ieftine!',
    'offers.happy.valid': 'În fiecare zi',
    'offers.cta.title': 'Hai să facem o petrecere de neuitat!',
    'offers.cta.subtitle': 'Contactează-ne acum pentru a rezerva data dorită și pentru a primi o ofertă personalizată',
    'offers.cta.call': 'Sună Acum: 0722 123 456',
    'offers.cta.whatsapp': 'Trimite Mesaj WhatsApp',
    
    // Gallery
    'gallery.title': 'Galeria Noastră',
    'gallery.subtitle': 'Descoperă atmosfera magică și momentele speciale de la PlayFun',
    'gallery.filter.all': 'Toate',
    'gallery.filter.playground': 'Zone de Joacă',
    'gallery.filter.parties': 'Petreceri',
    'gallery.filter.food': 'Mâncare',
    'gallery.filter.events': 'Evenimente',
    
    // Regulations
    'regulations.title': 'Regulamentul Nostru',
    'regulations.subtitle': 'Pentru siguranța și confortul tuturor, vă rugăm să respectați regulamentul nostru',
    
    // Contact
    'contact.title': 'Contactează-ne',
    'contact.subtitle': 'Suntem aici pentru tine! Contactează-ne pentru rezervări sau pentru orice întrebare',
    
    // Footer
    'footer.description': 'Locul perfect pentru petreceri de copii și distracție în familie. Creăm amintiri de neuitat într-un mediu sigur și prietenos.',
    'footer.quickNav': 'Navigare Rapidă',
    'footer.services': 'Servicii',
    'footer.contact': 'Contact',
    'footer.schedule': 'Program',
    'footer.copyright': '© 2024 Triple Fun. Toate drepturile rezervate.',
    'footer.madeWith': 'Făcut cu',
    'footer.forChildren': 'pentru copii'
  },
  en: {
    // Header (removed 'nav.home')
    'nav.services': 'Services',
    'nav.menu': 'Menu',
    'nav.pricing': 'Pricing',
    'nav.offers': 'Offers',
    'nav.contact': 'Contact',
    'nav.gallery': 'Gallery',
    'nav.regulations': 'Regulations',
    'nav.admin': 'Admin',
    
    // Hero
    'hero.title': 'The most',
    'hero.title.highlight': 'fun',
    'hero.title.end': 'party',
    'hero.subtitle': 'The perfect place for children\'s parties, special events and family fun. We offer memorable experiences in a safe and friendly environment.',
    'hero.cta.book': 'Book Now',
    'hero.cta.menu': 'View Menu',
    'hero.stats.parties': 'Successful parties',
    'hero.stats.experience': 'Years experience',
    'hero.stats.children': 'Children per day',
    
    // Services
    'services.title': 'Our Services',
    'services.subtitle': 'We offer a complete range of services to make your and your child\'s experience special',
    
    // Menu
    'menu.title': 'Our Menu',
    'menu.subtitle': 'Delicious dishes for children and adults, prepared with fresh ingredients and lots of love',
    'menu.category.copii': 'Kids Menu',
    'menu.category.adulti': 'Adults Menu',
    'menu.category.bauturi': 'Drinks',
    
    // Menu Items - Kids
    'menu.kids.crispy': 'Crispy Chicken Tenders',
    'menu.kids.crispy.desc': '2 pieces (100g) + 100g french fries + drink of choice',
    'menu.kids.pizza': 'Mini Margherita Pizza',
    'menu.kids.pizza.desc': 'Special pizza for kids',
    'menu.kids.pasta': 'Pasta with Tomato Sauce',
    'menu.kids.pasta.desc': 'Kid portion with parmesan',
    'menu.kids.sandwich': 'Ham & Cheese Sandwich',
    'menu.kids.sandwich.desc': 'On toast bread with fries',
    'menu.kids.icecream': '3-Scoop Ice Cream',
    'menu.kids.icecream.desc': 'Vanilla, chocolate, strawberry',
    'menu.kids.cake': 'Custom Cake',
    'menu.kids.cake.desc': 'Special order (min. 1kg)',
    
    // Menu Items - Adults
    'menu.adults.grill': 'Mixed Grill Platter (10 people)',
    'menu.adults.grill.desc': '10 pcs crispy chicken + 10 pcs pork neck + 10 pcs sausages + 650g french fries',
    'menu.adults.charcuterie': 'Charcuterie & Cheese Platter (10 people)',
    'menu.adults.charcuterie.desc': 'Italian cold cuts and cheeses (2kg) served with focaccia',
    'menu.adults.burger': 'Classic Burger',
    'menu.adults.burger.desc': 'Beef patty, bacon, cheese, fries',
    'menu.adults.caesar': 'Caesar Salad',
    'menu.adults.caesar.desc': 'With chicken, croutons, parmesan',
    'menu.adults.pizza': 'Quattro Stagioni Pizza',
    'menu.adults.pizza.desc': 'Ham, mushrooms, olives, peppers',
    'menu.adults.carbonara': 'Carbonara Pasta',
    'menu.adults.carbonara.desc': 'With bacon and parmesan',
    
    // Menu Items - Drinks
    'menu.drinks.juice': 'Fresh Juices',
    'menu.drinks.juice.desc': 'Orange, apple, carrot',
    'menu.drinks.lemonade': 'Fresh Lemonade',
    'menu.drinks.lemonade.desc': 'Homemade',
    'menu.drinks.coffee': 'Espresso Coffee',
    'menu.drinks.coffee.desc': 'Premium blend',
    'menu.drinks.tea': 'Loose Leaf Tea',
    'menu.drinks.tea.desc': 'Various flavors',
    'menu.drinks.smoothie': 'Fruit Smoothie',
    'menu.drinks.smoothie.desc': 'Banana, strawberry, mango',
    'menu.drinks.water': 'Mineral Water',
    'menu.drinks.water.desc': '0.5L or 1.5L',
    
    // Pricing
    'pricing.title': 'Party Packages',
    'pricing.subtitle': 'Choose the perfect package for your child\'s party. All packages include full access to play areas',
    'pricing.popular': 'Most Popular',
    'pricing.book': 'Book Now',
    'pricing.additional': 'Additional Services',
    'pricing.extra.animators': 'Extra animators',
    'pricing.extra.time': 'Time extension',
    'pricing.extra.decorations': 'Extra decorations',
    'pricing.extra.transport': 'Cake delivery',
    
    // Offers
    'offers.title': 'Special Offers',
    'offers.subtitle': 'Take advantage of our special offers and save on the perfect party for your child',
    'offers.discount.title': '20% Discount Mon-Thu',
    'offers.discount.desc': 'Book your party between Monday and Thursday and get 20% off all packages!',
    'offers.discount.valid': 'Valid until December 31, 2024',
    'offers.free.title': '2nd Child FREE',
    'offers.free.desc': 'For group bookings (minimum 20 children), the second child participates for free!',
    'offers.free.valid': 'Permanent offer',
    'offers.anniversary.title': 'Complete Birthday Package',
    'offers.anniversary.desc': 'Book 30 days in advance and get themed decorations and custom cake FREE!',
    'offers.anniversary.valid': 'For advance bookings',
    'offers.happy.title': 'Happy Hour 10-14',
    'offers.happy.desc': 'Between 10:00-14:00, all drinks and snacks are 30% cheaper!',
    'offers.happy.valid': 'Every day',
    'offers.cta.title': 'Let\'s make an unforgettable party!',
    'offers.cta.subtitle': 'Contact us now to book your desired date and receive a personalized offer',
    'offers.cta.call': 'Call Now: 0722 123 456',
    'offers.cta.whatsapp': 'Send WhatsApp Message',
    
    // Gallery
    'gallery.title': 'Our Gallery',
    'gallery.subtitle': 'Discover the magical atmosphere and special moments at PlayFun',
    'gallery.filter.all': 'All',
    'gallery.filter.playground': 'Playground',
    'gallery.filter.parties': 'Parties',
    'gallery.filter.food': 'Food',
    'gallery.filter.events': 'Events',
    
    // Regulations
    'regulations.title': 'Our Regulations',
    'regulations.subtitle': 'For everyone\'s safety and comfort, please follow our regulations',
    
    // Contact
    'contact.title': 'Contact Us',
    'contact.subtitle': 'We are here for you! Contact us for reservations or any questions',
    
    // Footer
    'footer.description': 'The perfect place for children\'s parties and family fun. We create unforgettable memories in a safe and friendly environment.',
    'footer.quickNav': 'Quick Navigation',
    'footer.services': 'Services',
    'footer.contact': 'Contact',
    'footer.schedule': 'Schedule',
    'footer.copyright': '© 2024 Triple Fun. All rights reserved.',
    'footer.madeWith': 'Made with',
    'footer.forChildren': 'for children'
  },
  hu: {
    // Header (removed 'nav.home')
    'nav.services': 'Szolgáltatások',
    'nav.menu': 'Menü',
    'nav.pricing': 'Árak',
    'nav.offers': 'Ajánlatok',
    'nav.contact': 'Kapcsolat',
    'nav.gallery': 'Galéria',
    'nav.regulations': 'Szabályzat',
    'nav.admin': 'Admin',
    
    // Hero
    'hero.title': 'A leg',
    'hero.title.highlight': 'szórakoztatóbb',
    'hero.title.end': 'buli',
    'hero.subtitle': 'A tökéletes hely gyerekbulikhoz, különleges eseményekhez és családi szórakozáshoz. Emlékezetes élményeket kínálunk biztonságos és barátságos környezetben.',
    'hero.cta.book': 'Foglalj Most',
    'hero.cta.menu': 'Menü Megtekintése',
    'hero.stats.parties': 'Sikeres bulik',
    'hero.stats.experience': 'Év tapasztalat',
    'hero.stats.children': 'Gyerek naponta',
    
    // Services
    'services.title': 'Szolgáltatásaink',
    'services.subtitle': 'Teljes körű szolgáltatásokat kínálunk, hogy a te és gyermeked élménye különleges legyen',
    
    // Menu
    'menu.title': 'Menünk',
    'menu.subtitle': 'Finom ételek gyerekeknek és felnőtteknek, friss alapanyagokból és sok szeretettel készítve',
    'menu.category.copii': 'Gyerek Menü',
    'menu.category.adulti': 'Felnőtt Menü',
    'menu.category.bauturi': 'Italok',
    
    // Menu Items - Kids
    'menu.kids.crispy': 'Ropogós Csirkemell',
    'menu.kids.crispy.desc': '2 darab (100g) + 100g sült krumpli + választott ital',
    'menu.kids.pizza': 'Mini Margherita Pizza',
    'menu.kids.pizza.desc': 'Speciális pizza gyerekeknek',
    'menu.kids.pasta': 'Tészta Paradicsomos Szósszal',
    'menu.kids.pasta.desc': 'Gyerek adag parmezánnal',
    'menu.kids.sandwich': 'Sonkás-Sajtos Szendvics',
    'menu.kids.sandwich.desc': 'Pirított kenyéren krumplival',
    'menu.kids.icecream': '3 Gombóc Fagylalt',
    'menu.kids.icecream.desc': 'Vanília, csokoládé, eper',
    'menu.kids.cake': 'Egyedi Torta',
    'menu.kids.cake.desc': 'Különleges rendelés (min. 1kg)',
    
    // Menu Items - Adults
    'menu.adults.grill': 'Vegyes Grillkínálat (10 fő)',
    'menu.adults.grill.desc': '10 db ropogós csirke + 10 db tarja + 10 db kolbász + 650g sült krumpli',
    'menu.adults.charcuterie': 'Felvágott és Sajt Tál (10 fő)',
    'menu.adults.charcuterie.desc': 'Olasz felvágottak és sajtok (2kg) focacciával tálalva',
    'menu.adults.burger': 'Klasszikus Burger',
    'menu.adults.burger.desc': 'Marhahús, szalonna, sajt, krumpli',
    'menu.adults.caesar': 'Caesar Saláta',
    'menu.adults.caesar.desc': 'Csirkével, krutonnal, parmezánnal',
    'menu.adults.pizza': 'Quattro Stagioni Pizza',
    'menu.adults.pizza.desc': 'Sonka, gomba, olíva, paprika',
    'menu.adults.carbonara': 'Carbonara Tészta',
    'menu.adults.carbonara.desc': 'Szalonnával és parmezánnal',
    
    // Menu Items - Drinks
    'menu.drinks.juice': 'Friss Gyümölcslevek',
    'menu.drinks.juice.desc': 'Narancs, alma, sárgarépa',
    'menu.drinks.lemonade': 'Friss Limonádé',
    'menu.drinks.lemonade.desc': 'Házi készítésű',
    'menu.drinks.coffee': 'Espresso Kávé',
    'menu.drinks.coffee.desc': 'Prémium keverék',
    'menu.drinks.tea': 'Szálas Tea',
    'menu.drinks.tea.desc': 'Különböző ízek',
    'menu.drinks.smoothie': 'Gyümölcs Turmix',
    'menu.drinks.smoothie.desc': 'Banán, eper, mangó',
    'menu.drinks.water': 'Ásványvíz',
    'menu.drinks.water.desc': '0.5L vagy 1.5L',
    
    // Pricing
    'pricing.title': 'Buli Csomagok',
    'pricing.subtitle': 'Válaszd ki a tökéletes csomagot gyermeked bulijához. Minden csomag teljes hozzáférést biztosít a játékterületekhez',
    'pricing.popular': 'Legnépszerűbb',
    'pricing.book': 'Foglalj Most',
    'pricing.additional': 'Kiegészítő Szolgáltatások',
    'pricing.extra.animators': 'Extra animátorok',
    'pricing.extra.time': 'Időhosszabbítás',
    'pricing.extra.decorations': 'Extra dekorációk',
    'pricing.extra.transport': 'Torta szállítás',
    
    // Offers
    'offers.title': 'Különleges Ajánlatok',
    'offers.subtitle': 'Használd ki különleges ajánlatainkat és spórolj gyermeked tökéletes buliján',
    'offers.discount.title': '20% Kedvezmény Hétfő-Csütörtök',
    'offers.discount.desc': 'Foglalj hétfő és csütörtök között és kapj 20% kedvezményt minden csomagra!',
    'offers.discount.valid': 'Érvényes 2024. december 31-ig',
    'offers.free.title': '2. Gyerek INGYEN',
    'offers.free.desc': 'Csoportos foglalásokhoz (minimum 20 gyerek), a második gyerek ingyen részt vehet!',
    'offers.free.valid': 'Állandó ajánlat',
    'offers.anniversary.title': 'Teljes Születésnapi Csomag',
    'offers.anniversary.desc': 'Foglalj 30 nappal előre és kapj tematikus dekorációt és egyedi tortát INGYEN!',
    'offers.anniversary.valid': 'Előzetes foglalásokhoz',
    'offers.happy.title': 'Happy Hour 10-14',
    'offers.happy.desc': '10:00-14:00 között minden ital és snack 30%-kal olcsóbb!',
    'offers.happy.valid': 'Minden nap',
    'offers.cta.title': 'Csináljunk egy felejthetetlen bulit!',
    'offers.cta.subtitle': 'Lépj kapcsolatba velünk most, hogy lefoglald a kívánt dátumot és kapj személyre szabott ajánlatot',
    'offers.cta.call': 'Hívj Most: 0722 123 456',
    'offers.cta.whatsapp': 'WhatsApp Üzenet Küldése',
    
    // Gallery
    'gallery.title': 'Galériánk',
    'gallery.subtitle': 'Fedezd fel a varázslatos hangulatot és különleges pillanatokat a PlayFun-ban',
    'gallery.filter.all': 'Összes',
    'gallery.filter.playground': 'Játszótér',
    'gallery.filter.parties': 'Bulik',
    'gallery.filter.food': 'Étel',
    'gallery.filter.events': 'Események',
    
    // Regulations
    'regulations.title': 'Szabályzatunk',
    'regulations.subtitle': 'Mindenki biztonsága és kényelme érdekében kérjük, tartsd be szabályzatunkat',
    
    // Contact
    'contact.title': 'Kapcsolat',
    'contact.subtitle': 'Itt vagyunk neked! Lépj kapcsolatba velünk foglalásokért vagy bármilyen kérdésért',
    
    // Footer
    'footer.description': 'A tökéletes hely gyerekbulikhoz és családi szórakozáshoz. Felejthetetlen emlékeket teremtünk biztonságos és barátságos környezetben.',
    'footer.quickNav': 'Gyors Navigáció',
    'footer.services': 'Szolgáltatások',
    'footer.contact': 'Kapcsolat',
    'footer.schedule': 'Nyitvatartás',
    'footer.copyright': '© 2024 Triple Fun. Minden jog fenntartva.',
    'footer.madeWith': 'Készítve',
    'footer.forChildren': 'gyerekekért'
  }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('ro');

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations['ro']] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};