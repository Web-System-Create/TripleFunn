const express = require('express');
const fs = require('fs').promises;
const path = require('path');
const cors = require('cors');

const app = express();
const PORT = 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Paths
const I18N_DIR = path.join(__dirname, '../public/i18n');
const SITE_DATA_PATH = path.join(__dirname, '../public/data/defaultSiteData.json');

// Ensure directories exist
async function ensureDirectories() {
  try {
    await fs.access(I18N_DIR);
  } catch {
    await fs.mkdir(I18N_DIR, { recursive: true });
  }
}

// API Routes

// Get all translations
app.get('/api/translations', async (req, res) => {
  try {
    const languages = ['ro', 'en', 'hu'];
    const translations = {};
    
    for (const lang of languages) {
      try {
        const filePath = path.join(I18N_DIR, `${lang}.json`);
        const content = await fs.readFile(filePath, 'utf8');
        translations[lang] = JSON.parse(content);
      } catch (error) {
        console.warn(`Could not load ${lang} translations:`, error.message);
        translations[lang] = { language: lang };
      }
    }
    
    res.json(translations);
  } catch (error) {
    console.error('Error loading translations:', error);
    res.status(500).json({ error: 'Failed to load translations' });
  }
});

// Update specific translation
app.post('/api/translations/:lang/:key', async (req, res) => {
  try {
    const { lang, key } = req.params;
    const { value } = req.body;
    
    if (!['ro', 'en', 'hu'].includes(lang)) {
      return res.status(400).json({ error: 'Invalid language' });
    }
    
    const filePath = path.join(I18N_DIR, `${lang}.json`);
    
    // Load existing translations
    let translations = { language: lang };
    try {
      const content = await fs.readFile(filePath, 'utf8');
      translations = JSON.parse(content);
    } catch (error) {
      console.log(`Creating new ${lang} translation file`);
    }
    
    // Update nested key
    const keys = key.split('.');
    let current = translations;
    for (let i = 0; i < keys.length - 1; i++) {
      if (!current[keys[i]]) {
        current[keys[i]] = {};
      }
      current = current[keys[i]];
    }
    current[keys[keys.length - 1]] = value;
    
    // Save to file
    await fs.writeFile(filePath, JSON.stringify(translations, null, 2), 'utf8');
    
    console.log(`✅ Updated ${lang}.${key} = "${value}"`);
    res.json({ success: true, message: `Updated ${lang}.${key}` });
  } catch (error) {
    console.error('Error updating translation:', error);
    res.status(500).json({ error: 'Failed to update translation' });
  }
});

// Bulk update translations
app.post('/api/translations/bulk', async (req, res) => {
  try {
    const { translations } = req.body;
    
    for (const [lang, data] of Object.entries(translations)) {
      if (['ro', 'en', 'hu'].includes(lang)) {
        const filePath = path.join(I18N_DIR, `${lang}.json`);
        await fs.writeFile(filePath, JSON.stringify(data, null, 2), 'utf8');
        console.log(`✅ Updated ${lang} translations`);
      }
    }
    
    res.json({ success: true, message: 'All translations updated' });
  } catch (error) {
    console.error('Error bulk updating translations:', error);
    res.status(500).json({ error: 'Failed to bulk update translations' });
  }
});

// Get site data
app.get('/api/sitedata', async (req, res) => {
  try {
    const content = await fs.readFile(SITE_DATA_PATH, 'utf8');
    res.json(JSON.parse(content));
  } catch (error) {
    console.error('Error loading site data:', error);
    res.status(500).json({ error: 'Failed to load site data' });
  }
});

// Update site data
app.post('/api/sitedata', async (req, res) => {
  try {
    const siteData = req.body;
    await fs.writeFile(SITE_DATA_PATH, JSON.stringify(siteData, null, 2), 'utf8');
    console.log('✅ Updated site data');
    res.json({ success: true, message: 'Site data updated' });
  } catch (error) {
    console.error('Error updating site data:', error);
    res.status(500).json({ error: 'Failed to update site data' });
  }
});

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

// Start server
async function startServer() {
  await ensureDirectories();
  
  app.listen(PORT, () => {
    console.log(`🚀 Translation API Server running on http://localhost:${PORT}`);
    console.log(`📁 Serving translations from: ${I18N_DIR}`);
    console.log(`📄 Site data at: ${SITE_DATA_PATH}`);
    console.log(`\n🔗 API Endpoints:`);
    console.log(`   GET  /api/translations - Get all translations`);
    console.log(`   POST /api/translations/:lang/:key - Update specific translation`);
    console.log(`   POST /api/translations/bulk - Bulk update translations`);
    console.log(`   GET  /api/sitedata - Get site data`);
    console.log(`   POST /api/sitedata - Update site data`);
    console.log(`   GET  /api/health - Health check`);
  });
}

startServer().catch(console.error);