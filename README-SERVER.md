# 🚀 Ghid pentru Rularea pe Server - Modul Dezvoltare

## 📋 **De ce Modul Dezvoltare pe Server?**

Pentru că aplicația Triple Fun are:
- ✅ **Conținut dinamic** (admin panel care modifică informații)
- ✅ **Upload de imagini** 
- ✅ **Actualizări în timp real**
- ✅ **Funcționalități interactive**

**Build-ul static NU va funcționa** pentru aceste funcționalități!

## 🖥️ **Configurare Server**

### 1. **Instalare Node.js pe Server**
```bash
# Ubuntu/Debian
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# CentOS/RHEL
curl -fsSL https://rpm.nodesource.com/setup_18.x | sudo bash -
sudo yum install -y nodejs

# Verifică instalarea
node --version
npm --version
```

### 2. **Upload Proiect pe Server**
```bash
# Prin SCP/SFTP sau Git
scp -r proiect-folder user@server:/path/to/app/
# SAU
git clone repository-url /path/to/app/
```

### 3. **Instalare Dependențe**
```bash
cd /path/to/app/
npm install
```

### 4. **Configurare pentru Producție**
```bash
# Instalează PM2 pentru management procese
npm install -g pm2

# Creează fișier de configurare
```

### 5. **Pornire Aplicație cu PM2**
```bash
# Pornește aplicația
pm2 start npm --name "triple-fun" -- run dev

# Configurează pentru restart automat
pm2 startup
pm2 save

# Verifică status
pm2 status
pm2 logs triple-fun
```

## 🔧 **Configurare Nginx (Reverse Proxy)**

```nginx
server {
    listen 80;
    server_name your-domain.com;

    location / {
        proxy_pass http://localhost:5173;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }
}
```

## 🔒 **Pentru HTTPS (SSL)**

```bash
# Instalează Certbot
sudo apt install certbot python3-certbot-nginx

# Obține certificat SSL
sudo certbot --nginx -d your-domain.com

# Auto-renewal
sudo crontab -e
# Adaugă: 0 12 * * * /usr/bin/certbot renew --quiet
```

## 📁 **Structura Fișiere pe Server**

```
/var/www/triple-fun/
├── src/
├── public/
│   ├── uploads/          # Pentru imagini uploadate
│   └── ...
├── package.json
├── vite.config.ts
└── ...
```

## 🛡️ **Securitate și Permisiuni**

```bash
# Creează user dedicat
sudo useradd -m -s /bin/bash triplefun
sudo usermod -aG sudo triplefun

# Setează permisiuni
sudo chown -R triplefun:triplefun /var/www/triple-fun/
sudo chmod -R 755 /var/www/triple-fun/
sudo chmod -R 777 /var/www/triple-fun/public/uploads/
```

## 🔄 **Comenzi Utile pentru Management**

```bash
# Restart aplicație
pm2 restart triple-fun

# Stop aplicație
pm2 stop triple-fun

# Logs în timp real
pm2 logs triple-fun --lines 100

# Monitoring
pm2 monit

# Update cod și restart
cd /var/www/triple-fun/
git pull origin main
npm install
pm2 restart triple-fun
```

## 🌐 **Configurare Domeniu**

1. **Pointează domeniul** către IP-ul serverului
2. **Configurează DNS** A record
3. **Testează accesul** la `http://your-domain.com`

## 📊 **Monitoring și Backup**

```bash
# Backup automat
#!/bin/bash
# backup.sh
DATE=$(date +%Y%m%d_%H%M%S)
tar -czf /backups/triple-fun_$DATE.tar.gz /var/www/triple-fun/
find /backups/ -name "triple-fun_*.tar.gz" -mtime +7 -delete

# Adaugă în crontab pentru backup zilnic
0 2 * * * /path/to/backup.sh
```

## ⚡ **Optimizări Performance**

```bash
# În vite.config.ts pentru server
export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0',
    port: 5173,
    hmr: {
      port: 5173
    }
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: undefined
      }
    }
  }
})
```

## 🚨 **Troubleshooting**

### Port ocupat:
```bash
sudo lsof -i :5173
sudo kill -9 PID
```

### Probleme permisiuni:
```bash
sudo chown -R $USER:$USER /var/www/triple-fun/
```

### Logs erori:
```bash
pm2 logs triple-fun --err
journalctl -u nginx -f
```

## 📞 **Support**

Pentru probleme specifice:
1. Verifică logs: `pm2 logs triple-fun`
2. Testează local: `npm run dev`
3. Verifică configurarea Nginx
4. Controlează permisiunile fișierelor

---

**🎯 IMPORTANT:** Aplicația va rula în modul dezvoltare pe server, permițând toate funcționalitățile dinamice să funcționeze perfect!