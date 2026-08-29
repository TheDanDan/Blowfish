import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import { VitePWA } from 'vite-plugin-pwa'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), VitePWA({ registerType: 'prompt', manifest: { name: 'Blowfish Blackjack Trainer', short_name: 'Blowfish', description: 'A minimal offline blackjack strategy and card counting trainer.', theme_color: '#09110d', background_color: '#09110d', display: 'standalone', orientation: 'portrait-primary', icons: [{ src: 'favicon.svg', sizes: 'any', type: 'image/svg+xml', purpose: 'any maskable' }] } })],
})
