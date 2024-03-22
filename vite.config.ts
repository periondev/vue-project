import { fileURLToPath, URL } from 'node:url';
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import type { VitePWAOptions } from 'vite-plugin-pwa';
import { VitePWA } from 'vite-plugin-pwa';

const pwaOptions: Partial<VitePWAOptions> = {
  includeAssets: ['favicon.ico', 'apple-touch-icon.png', 'mask-icon.svg'],
  manifest: {
    name: '鄉鎮市區天氣預報',
    short_name: '天氣預報',
    description:
      '天氣預報網頁是一個使用者友善的資訊網頁，提供台灣各鄉鎮和市區的天氣預報，資訊皆來自中央氣象署的統計數據。憑藉直觀的界面和實時更新，使用者可以隨時了解所在地區的最新天氣狀況，也能儲存自訂地區以便日後快速查看。',
    theme_color: '#ffffff',
    icons: [
      {
        src: 'favicon-16x16.png',
        sizes: '16x16',
        type: 'image/png',
      },
      {
        src: 'favicon-32x32.png',
        sizes: '32x32',
        type: 'image/png',
      },
      {
        src: 'pwa-192x192.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: 'pwa-512x512.png',
        sizes: '512x512',
        type: 'image/png',
      },
      {
        src: 'maskable_icon_x384.png',
        sizes: '384x384',
        type: 'image/png',
        purpose: ['maskable'],
      },
    ],
  },
};

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), VitePWA(pwaOptions)],
  base: '/vue-weather/',
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  server: {
    host: true,
  },
});
