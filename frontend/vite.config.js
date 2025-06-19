import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import fs from 'fs';
import path from 'path';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
    server: {
      hmr: {
        host: 'cc241066-10710.node.fhstp.cc',
        // You might still need clientPort depending on your setup
        // clientPort: 443, // or 80
        // protocol: 'wss', // or 'ws'
      },
        host: '0.0.0.0',
      https: {
        key: fs.readFileSync(path.resolve(__dirname, 'localhost-key.pem')),
        cert: fs.readFileSync(path.resolve(__dirname, 'localhost-cert.pem')),
      },
      allowedHosts: ['cc241066-10710.node.fhstp.cc'],
    },
})
