import React, { useState } from 'react';
import { Download, Upload, Info, Save, RefreshCw, AlertCircle, CheckCircle } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';

const TranslationsTab: React.FC = () => {
  const { translations, updateTranslation, saveTranslations } = useLanguage();
  const [translationEdits, setTranslationEdits] = useState<{[key: string]: {[lang: string]: string}}>({});
  const [isSaving, setIsSaving] = useState(false);
  const [lastSaved, setLastSaved] = useState<string | null>(null);
  const [apiStatus, setApiStatus] = useState<'unknown' | 'available' | 'unavailable'>('unknown');

  // Check API status on component mount
  React.useEffect(() => {
    checkApiStatus();
  }, []);

  const checkApiStatus = async () => {
    try {
      const API_BASE_URL = `http://${window.location.hostname}:3001/api`;

      const response = await fetch(`${API_BASE_URL}/health`);
      if (response.ok) {
        setApiStatus('available');
      } else {
        setApiStatus('unavailable');
      }
    } catch (error) {
      setApiStatus('unavailable');
    }
  };

  // Common translation keys for editing
  const commonTranslationKeys = [
    'nav.services',
    'nav.menu',
    'nav.pricing',
    'nav.offers',
    'nav.contact',
    'nav.gallery',
    'nav.regulations',
    'hero.title',
    'hero.titleHighlight',
    'hero.titleEnd',
    'hero.subtitle',
    'hero.ctaBook',
    'hero.ctaMenu',
    'services.title',
    'services.subtitle',
    'menu.title',
    'menu.subtitle',
    'pricing.title',
    'pricing.subtitle',
    'pricing.popular',
    'pricing.book',
    'offers.title',
    'offers.subtitle',
    'gallery.title',
    'gallery.subtitle',
    'regulations.title',
    'regulations.subtitle',
    'contact.title',
    'contact.subtitle',
    'footer.description',
    'footer.quickNav',
    'footer.services',
    'footer.contact',
    'footer.schedule',
    'footer.copyright',
    'footer.madeWith',
    'footer.forChildren'
  ];

  const getTranslationValue = (key: string, lang: string): string => {
    if (translationEdits[key] && translationEdits[key][lang] !== undefined) {
      return translationEdits[key][lang];
    }

    const keys = key.split('.');
    let value: any = translations[lang as keyof typeof translations];
    for (const k of keys) {
      value = value?.[k as keyof typeof value];
    }
    return typeof value === 'string' ? value : '';
  };

  const handleTranslationChange = (key: string, lang: string, value: string) => {
    setTranslationEdits(prev => ({
      ...prev,
      [key]: {
        ...prev[key],
        [lang]: value
      }
    }));

    updateTranslation(key, lang as any, value);
  };

  const handleSaveTranslations = async () => {
    setIsSaving(true);
    try {
      const success = await saveTranslations();
      if (success) {
        setLastSaved(new Date().toLocaleTimeString());
        alert('✅ Traducerile au fost salvate cu succes în fișierele JSON!\n\n🌐 TOȚI clienții vor vedea noile traduceri la următorul refresh al paginii.');
        setApiStatus('available');
      } else {
        alert('❌ Eroare la salvarea traducerilor.\n\n🔧 Verifică că API server-ul rulează:\ncd server && npm start');
        setApiStatus('unavailable');
      }
    } catch (error) {
      console.error('Error saving translations:', error);
      alert('❌ Eroare la salvarea traducerilor.\n\n🔧 Pentru a salva în fișierele JSON, pornește API server-ul:\ncd server && npm start');
      setApiStatus('unavailable');
    } finally {
      setIsSaving(false);
    }
  };

  const exportTranslations = () => {
    const dataStr = JSON.stringify(translations, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);

    const exportFileDefaultName = 'triple-fun-translations.json';

    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
  };

  const importTranslations = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const importedTranslations = JSON.parse(e.target?.result as string);
          // Update translations
          Object.keys(importedTranslations).forEach(lang => {
            if (['ro', 'en', 'hu'].includes(lang)) {
              Object.keys(importedTranslations[lang]).forEach(key => {
                if (key !== 'language') {
                  updateTranslation(key, lang as any, importedTranslations[lang][key]);
                }
              });
            }
          });
          alert('✅ Traducerile au fost importate cu succes!\n\nApasă "Salvează în Fișiere" pentru a le aplica pentru toți clienții.');
        } catch (error) {
          alert('❌ Eroare la importarea traducerilor. Verificați formatul fișierului.');
        }
      };
      reader.readAsText(file);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-bold text-gray-800">Gestionare Traduceri</h3>
        <div className="flex items-center space-x-3">
          <button
            onClick={checkApiStatus}
            className="bg-gray-500 hover:bg-gray-600 text-white px-3 py-2 rounded-lg text-sm transition-colors"
            title="Verifică starea API"
          >
            <RefreshCw className="h-4 w-4" />
          </button>
          <button
            onClick={handleSaveTranslations}
            disabled={isSaving}
            className="bg-green-500 hover:bg-green-600 disabled:bg-green-300 text-white px-4 py-2 rounded-lg font-semibold transition-colors flex items-center"
          >
            {isSaving ? (
              <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
            ) : (
              <Save className="h-4 w-4 mr-2" />
            )}
            {isSaving ? 'Se salvează...' : 'Salvează în Fișiere JSON'}
          </button>
          <button
            onClick={exportTranslations}
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold transition-colors flex items-center"
          >
            <Download className="h-4 w-4 mr-2" />
            Export
          </button>
          <label className="bg-purple-500 hover:bg-purple-600 text-white px-4 py-2 rounded-lg font-semibold transition-colors flex items-center cursor-pointer">
            <Upload className="h-4 w-4 mr-2" />
            Import
            <input
              type="file"
              accept=".json"
              onChange={importTranslations}
              className="hidden"
            />
          </label>
        </div>
      </div>

      {/* API Status */}
      <div className={`border-l-4 p-4 rounded-lg ${
        apiStatus === 'available' 
          ? 'bg-green-50 border-green-400' 
          : apiStatus === 'unavailable'
          ? 'bg-red-50 border-red-400'
          : 'bg-yellow-50 border-yellow-400'
      }`}>
        <div className="flex items-start">
          {apiStatus === 'available' ? (
            <CheckCircle className="h-5 w-5 text-green-400 mr-3 mt-0.5 flex-shrink-0" />
          ) : (
            <AlertCircle className="h-5 w-5 text-red-400 mr-3 mt-0.5 flex-shrink-0" />
          )}
          <div>
            <h4 className={`font-semibold mb-2 ${
              apiStatus === 'available' ? 'text-green-800' : 'text-red-800'
            }`}>
              {apiStatus === 'available' ? '✅ API Server Activ!' : '❌ API Server Inactiv'}
            </h4>
            <div className={`text-sm space-y-2 ${
              apiStatus === 'available' ? 'text-green-700' : 'text-red-700'
            }`}>
              {apiStatus === 'available' ? (
                <>
                  <p><strong>🎯 Perfect!</strong> Traducerile se vor salva în fișierele JSON</p>
                  <p><strong>🌐 Pentru toți clienții:</strong> Modificările vor fi imediat disponibile</p>
                  <p><strong>🔧 Server:</strong> http://localhost:3001 - Funcționează</p>
                </>
              ) : (
                <>
                  <p><strong>⚠️ Atenție:</strong> Traducerile se salvează doar local (pentru preview)</p>
                  <p><strong>🔧 Pentru a salva în fișiere:</strong> Pornește API server-ul</p>
                  <div className="mt-2 p-2 bg-red-100 rounded text-xs">
                    <strong>Comandă:</strong><br/>
                    <code>cd server && npm install && npm start</code>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      {lastSaved && (
        <div className="bg-green-50 border border-green-200 p-3 rounded-lg">
          <p className="text-green-800 text-sm">
            ✅ Ultima salvare: {lastSaved} - Traducerile sunt acum live în fișierele JSON!
          </p>
        </div>
      )}

      {/* How it works */}
      <div className="bg-blue-50 border-l-4 border-blue-400 p-4 rounded-lg">
        <div className="flex items-start">
          <Info className="h-5 w-5 text-blue-400 mr-3 mt-0.5 flex-shrink-0" />
          <div>
            <h4 className="font-semibold text-blue-800 mb-2">🔄 Cum funcționează</h4>
            <div className="text-sm text-blue-700 space-y-1">
              <p><strong>1. Clienții:</strong> Se încarcă normal din /public/i18n/*.json</p>
              <p><strong>2. Admin editează:</strong> Modificările se văd instant (preview local)</p>
              <p><strong>3. Admin salvează:</strong> API-ul actualizează fișierele JSON</p>
              <p><strong>4. Toți clienții:</strong> Văd modificările la următorul refresh</p>
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        {commonTranslationKeys.map((key) => (
          <div key={key} className="bg-gray-50 p-4 rounded-lg border">
            <h4 className="font-semibold text-gray-800 mb-3">{key}</h4>
            <div className="grid md:grid-cols-3 gap-3">
              {['ro', 'en', 'hu'].map((lang) => (
                <div key={lang}>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {lang.toUpperCase()} {lang === 'ro' ? '🇷🇴' : lang === 'en' ? '🇬🇧' : '🇭🇺'}
                  </label>
                  <textarea
                    value={getTranslationValue(key, lang)}
                    onChange={(e) => handleTranslationChange(key, lang, e.target.value)}
                    rows={2}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm resize-none"
                    placeholder={`Traducere în ${lang.toUpperCase()}`}
                  />
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TranslationsTab;
