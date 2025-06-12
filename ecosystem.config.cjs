module.exports = {
  apps: [{
    name: 'triple-fun',
    script: 'npm',
    args: 'run preview',
    cwd: process.cwd(),
    instances: 1,
    autorestart: true,
    watch: false,
    max_memory_restart: '1G',
    env: {
      NODE_ENV: 'production',
      PORT: 80
    },
    error_file: './logs/err.log',
    out_file: './logs/out.log',
    log_file: './logs/combined.log',
    time: true,
    wait_ready: true,
    listen_timeout: 10000
  }]
};