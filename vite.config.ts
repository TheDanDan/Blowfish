import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import { VitePWA } from 'vite-plugin-pwa'

// https://vite.dev/config/
export default defineConfig({
  base: '/Blowfish/',
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['apple-touch-icon.png', 'blowfish-favicon.png'],
      manifest: {
        name: 'Blowfish Blackjack Trainer',
        short_name: 'Blowfish',
        description: 'A minimal offline blackjack strategy and card counting trainer.',
        theme_color: '#09110d',
        background_color: '#09110d',
        display: 'standalone',
        orientation: 'portrait-primary',
        categories: ['games', 'education'],
        icons: [
          { src: 'pwa-192x192.png', sizes: '192x192', type: 'image/png' },
          { src: 'pwa-512x512.png', sizes: '512x512', type: 'image/png' },
        ],
      },
    }),
  ],
})
