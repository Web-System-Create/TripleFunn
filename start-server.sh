#!/bin/bash

# Script pentru pornirea aplicației pe server
echo "🚀 Pornire Triple Fun pe server..."

# Oprește procesele existente
echo "⏹️ Oprire procese existente..."
pm2 stop triple-fun 2>/dev/null || true
pm2 delete triple-fun 2>/dev/null || true

# Creează directoarele necesare
echo "📁 Creare directoare..."
mkdir -p logs
mkdir -p public/uploads

# Setează permisiuni
echo "🔒 Setare permisiuni..."
chmod -R 755 .
chmod -R 777 public/uploads
chmod -R 777 logs

# Instalează dependențele
echo "📦 Instalare dependențe..."
npm install

# Pornește aplicația cu PM2
echo "🎯 Pornire aplicație..."
pm2 start ecosystem.config.js

# Salvează configurația PM2
echo "💾 Salvare configurație PM2..."
pm2 save

# Afișează status
echo "📊 Status aplicație:"
pm2 status

echo ""
echo "✅ Triple Fun pornit cu succes!"
echo "🌐 Aplicația rulează pe portul 80"
echo "📝 Pentru logs: pm2 logs triple-fun"
echo "🔄 Pentru restart: pm2 restart triple-fun"
echo ""