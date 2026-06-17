import { defineConfig } from 'vite'
import react, { reactCompilerPreset } from '@vitejs/plugin-react'
import babel from '@rolldown/plugin-babel'
import { VitePWA } from 'vite-plugin-pwa'
import path from 'path'
import fs from 'fs';
// import svgr from 'vite-plugin-svgr';

export default defineConfig({
  base: '/FlipCoin/',
  plugins: [
    react(),
    babel({ presets: [reactCompilerPreset()] }),
    // svgr(),
    VitePWA({
      // registerType: 'prompt',
      registerType: 'autoUpdate',
      injectRegister: 'auto',
      includeAssets: [
        'favicon.ico',
        'apple-touch-icon.png',
        'masked-icon.svg'
      ],
      manifest: {
        id: '/FlipCoin/',
        name: 'شیرخط',
        short_name: 'شیرخط',
        description: 'شیرخط',
        theme_color: '#f0f2f5',
        background_color: '#f0f2f5',
        display: 'standalone',
        start_url: '/FlipCoin/',
        scope: '/FlipCoin/',
        icons: [
          {
            src: 'pwa-36x36.png',
            sizes: '32x32',
            type: 'image/png'
          },
          {
            src: 'pwa-48x48.png',
            sizes: '48x48',
            type: 'image/png'
          },
          {
            src: 'pwa-72x72.png',
            sizes: '72x72',
            type: 'image/png'
          },
          {
            src: 'pwa-144x144.png',
            sizes: '144x144',
            type: 'image/png'
          },
          {
            src: 'pwa-192x192.png',
            sizes: '144x144',
            type: 'image/png'
          },
          {
            src: 'pwa-256x256.png',
            sizes: '256x256',
            type: 'image/png'
          },
          {
            src: 'pwa-512x512.png',
            sizes: '512x512',
            type: 'image/png'
          },
          {
            src: 'pwa-512x512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'any maskable'
          }
        ]
      },
      workbox: {
        globPatterns: ['**/*.{js,css,html,ico,png,svg,woff2,mp3}'],
        navigateFallback: '/FlipCoin/index.html',
        cleanupOutdatedCaches: true,
        clientsClaim: true,
        skipWaiting: false
      }
    })
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    https: {
      key: fs.readFileSync(path.resolve(__dirname, 'cert/localhost.key')),
      cert: fs.readFileSync(path.resolve(__dirname, 'cert/localhost.crt')),
    },
    port: 4000,
  },
})
