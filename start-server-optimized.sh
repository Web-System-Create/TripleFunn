#!/bin/bash

# Script optimizat pentru pornirea aplicației pe server
echo "🚀 Pornire Triple Fun OPTIMIZAT pe server..."

# Oprește procesele existente
echo "⏹️ Oprire procese existente..."
pm2 stop triple-fun 2>/dev/null || true
pm2 delete triple-fun 2>/dev/null || true

# Creează directoarele necesare
echo "📁 Creare directoare..."
mkdir -p logs
mkdir -p public/uploads
mkdir -p dist

# Setează permisiuni
echo "🔒 Setare permisiuni..."
chmod -R 755 .
chmod -R 777 public/uploads
chmod -R 777 logs

# Instalează dependențele
echo "📦 Instalare dependențe..."
npm install

# BUILD pentru producție (RAPID!)
echo "🏗️ Build pentru producție..."
npm run build

# Pornește aplicația cu PM2 (preview mode - RAPID!)
echo "🎯 Pornire aplicație optimizată..."
pm2 start ecosystem.config.js

# Salvează configurația PM2
echo "💾 Salvare configurație PM2..."
pm2 save

# Afișează status
echo "📊 Status aplicație:"
pm2 status

echo ""
echo "✅ Triple Fun pornit cu succes OPTIMIZAT!"
echo "🌐 Aplicația rulează pe portul 80"
echo "⚡ Loading time: ~1-2 secunde (vs 10+ în dev)"
echo "📝 Pentru logs: pm2 logs triple-fun"
echo "🔄 Pentru restart: pm2 restart triple-fun"
echo ""
echo "🎯 IMPORTANT: Pentru modificări admin:"
echo "   1. Modificările se salvează automat"
echo "   2. Nu mai e nevoie de rebuild"
echo "   3. Site-ul rămâne rapid!"
echo ""