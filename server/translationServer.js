const express = require('express');
const fs = require('fs').promises;
const path = require('path');
const cors = require('cors');
const multer = require('multer');
const crypto = require('crypto');

const app = express();
const PORT = 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Paths
const I18N_DIR = path.join(__dirname, '../public/i18n');
const SITE_DATA_PATH = path.join(__dirname, '../public/data/defaultSiteData.json');
const UPLOAD_DIR = path.join(__dirname, '../public/uploads');

// Ensure directories exist
async function ensureDirectories() {
  try {
    await fs.access(I18N_DIR);
  } catch {
    await fs.mkdir(I18N_DIR, { recursive: true });
  }

  try {
    await fs.access(UPLOAD_DIR);
  } catch {
    await fs.mkdir(UPLOAD_DIR, { recursive: true });
    console.log(`📁 Created upload directory: ${UPLOAD_DIR}`);
  }
}

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: async (req, file, cb) => {
    await ensureDirectories();
    cb(null, UPLOAD_DIR);
  },
  filename: (req, file, cb) => {
    // Generate unique filename
    const timestamp = Date.now();
    const randomString = crypto.randomBytes(6).toString('hex');
    const extension = path.extname(file.originalname).toLowerCase();
    const nameWithoutExt = path.basename(file.originalname, extension);

    // Clean the original name
    const cleanName = nameWithoutExt
        .toLowerCase()
        .replace(/[^a-z0-9]/g, '-')
        .replace(/-+/g, '-')
        .replace(/^-|-$/g, '');

    const uniqueFilename = `${cleanName}-${timestamp}-${randomString}${extension}`;
    cb(null, uniqueFilename);
  }
});

// File filter for images only
const fileFilter = (req, file, cb) => {
  const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'];

  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error(`Tip de fișier neacceptat: ${file.mimetype}. Tipuri permise: ${allowedTypes.join(', ')}`), false);
  }
};

// Configure multer
const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB limit
    files: 10 // Maximum 10 files per request
  }
});

// ===========================================
// TRANSLATION API ROUTES
// ===========================================

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

// ===========================================
// UPLOAD API ROUTES
// ===========================================

// Upload health check
app.get('/api/upload/health', (req, res) => {
  res.json({
    status: 'OK',
    timestamp: new Date().toISOString(),
    server: 'Triple Fun Combined Server - Upload Module',
    version: '1.0.0',
    uploadDir: UPLOAD_DIR,
    maxFileSize: '5MB',
    allowedTypes: ['jpeg', 'jpg', 'png', 'gif', 'webp']
  });
});

// Single file upload
app.post('/api/upload/single', upload.single('image'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        error: 'Nu a fost selectat niciun fișier'
      });
    }

    const publicUrl = `/uploads/${req.file.filename}`;

    console.log(`✅ Uploaded: ${req.file.originalname} → ${req.file.filename}`);

    res.json({
      success: true,
      url: publicUrl,
      filename: req.file.filename,
      originalName: req.file.originalname,
      size: req.file.size,
      mimetype: req.file.mimetype
    });

  } catch (error) {
    console.error('Upload error:', error);
    res.status(500).json({
      success: false,
      error: error.message || 'Eroare la încărcarea fișierului'
    });
  }
});

// Multiple files upload
app.post('/api/upload/multiple', upload.array('images', 10), async (req, res) => {
  try {
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({
        success: false,
        error: 'Nu au fost selectate fișiere'
      });
    }

    const results = req.files.map(file => ({
      success: true,
      url: `/uploads/${file.filename}`,
      filename: file.filename,
      originalName: file.originalname,
      size: file.size,
      mimetype: file.mimetype
    }));

    console.log(`✅ Uploaded ${req.files.length} files`);

    res.json({
      success: true,
      files: results,
      count: req.files.length
    });

  } catch (error) {
    console.error('Multiple upload error:', error);
    res.status(500).json({
      success: false,
      error: error.message || 'Eroare la încărcarea fișierelor'
    });
  }
});

// List uploaded files
app.get('/api/upload/list', async (req, res) => {
  try {
    const files = await fs.readdir(UPLOAD_DIR);
    const imageFiles = files.filter(file => {
      const ext = path.extname(file).toLowerCase();
      return ['.jpg', '.jpeg', '.png', '.gif', '.webp'].includes(ext);
    });

    const fileDetails = await Promise.all(
        imageFiles.map(async (filename) => {
          const filePath = path.join(UPLOAD_DIR, filename);
          const stats = await fs.stat(filePath);

          return {
            filename,
            url: `/uploads/${filename}`,
            size: stats.size,
            uploadDate: stats.birthtime.toISOString(),
            modifiedDate: stats.mtime.toISOString()
          };
        })
    );

    // Sort by upload date (newest first)
    fileDetails.sort((a, b) => new Date(b.uploadDate).getTime() - new Date(a.uploadDate).getTime());

    res.json({
      success: true,
      files: fileDetails,
      count: fileDetails.length
    });

  } catch (error) {
    console.error('List files error:', error);
    res.status(500).json({
      success: false,
      error: 'Eroare la listarea fișierelor'
    });
  }
});

// Delete file
app.delete('/api/upload/:filename', async (req, res) => {
  try {
    const { filename } = req.params;
    const filePath = path.join(UPLOAD_DIR, filename);

    // Security check - ensure filename doesn't contain path traversal
    if (filename.includes('..') || filename.includes('/') || filename.includes('\\')) {
      return res.status(400).json({
        success: false,
        error: 'Nume de fișier invalid'
      });
    }

    await fs.unlink(filePath);
    console.log(`🗑️ Deleted: ${filename}`);

    res.json({
      success: true,
      message: `Fișierul ${filename} a fost șters cu succes`
    });

  } catch (error) {
    console.error('Delete file error:', error);

    if (error.code === 'ENOENT') {
      res.status(404).json({
        success: false,
        error: 'Fișierul nu a fost găsit'
      });
    } else {
      res.status(500).json({
        success: false,
        error: 'Eroare la ștergerea fișierului'
      });
    }
  }
});

// ===========================================
// MAIN HEALTH CHECK
// ===========================================

// Main health check
app.get('/api/health', (req, res) => {
  res.json({
    status: 'OK',
    timestamp: new Date().toISOString(),
    server: 'Triple Fun Combined API Server',
    version: '2.0.0',
    modules: {
      translations: 'Active',
      uploads: 'Active',
      siteData: 'Active'
    },
    endpoints: {
      translations: '/api/translations',
      sitedata: '/api/sitedata',
      uploads: '/api/upload',
      health: '/api/health'
    }
  });
});

// Error handling middleware
app.use((error, req, res, next) => {
  if (error instanceof multer.MulterError) {
    if (error.code === 'LIMIT_FILE_SIZE') {
      return res.status(400).json({
        success: false,
        error: 'Fișierul este prea mare. Dimensiunea maximă permisă este 5MB'
      });
    }
    if (error.code === 'LIMIT_FILE_COUNT') {
      return res.status(400).json({
        success: false,
        error: 'Prea multe fișiere. Maximum 10 fișiere per request'
      });
    }
  }

  res.status(500).json({
    success: false,
    error: error.message || 'Eroare de server'
  });
});

// Start server
async function startServer() {
  await ensureDirectories();

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`🚀 Triple Fun Combined API Server running on port ${PORT}`);
    console.log(`📁 Serving translations from: ${I18N_DIR}`);
    console.log(`📄 Site data at: ${SITE_DATA_PATH}`);
    console.log(`📁 Upload directory: ${UPLOAD_DIR}`);
    console.log(`📊 Max file size: 5MB`);
    console.log(`📋 Allowed types: JPEG, PNG, GIF, WebP`);
    console.log(`\n🔗 API Endpoints:`);
    console.log(`   === TRANSLATIONS ===`);
    console.log(`   GET  /api/translations - Get all translations`);
    console.log(`   POST /api/translations/:lang/:key - Update specific translation`);
    console.log(`   POST /api/translations/bulk - Bulk update translations`);
    console.log(`   === SITE DATA ===`);
    console.log(`   GET  /api/sitedata - Get site data`);
    console.log(`   POST /api/sitedata - Update site data`);
    console.log(`   === UPLOADS ===`);
    console.log(`   POST /api/upload/single - Upload single image`);
    console.log(`   POST /api/upload/multiple - Upload multiple images`);
    console.log(`   GET  /api/upload/list - List uploaded files`);
    console.log(`   DELETE /api/upload/:filename - Delete file`);
    console.log(`   GET  /api/upload/health - Upload health check`);
    console.log(`   === GENERAL ===`);
    console.log(`   GET  /api/health - Main health check`);
    console.log(`\n🌐 Server accessible at:`);
    console.log(`   Local: http://localhost:${PORT}`);
    console.log(`   Network: http://0.0.0.0:${PORT}`);
    console.log(`   Production: https://triplefunn.ro/api`);
  });
}

startServer().catch(console.error);
