#!/bin/bash

# Script simplu pentru deployment pe server
echo "🚀 Deployment Triple Fun..."

# Oprește aplicația
pm2 stop triple-fun 2>/dev/null || true

# Creează directoarele necesare
mkdir -p logs public/uploads public/i18n

# Setează permisiuni
chmod -R 755 .
chmod -R 777 public/uploads logs public/i18n

# Instalează dependențele și build
npm install
npm run build

# Pornește aplicația cu PM2
pm2 start ecosystem.config.cjs
pm2 save

echo "✅ Deployment complet!"
echo "🌐 Site disponibil pe portul 80"
echo "📝 Pentru logs: pm2 logs triple-fun"
echo "🔄 Pentru restart: pm2 restart triple-fun"