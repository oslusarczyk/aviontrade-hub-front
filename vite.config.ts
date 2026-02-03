import { defineConfig } from 'vite'
import { devtools } from '@tanstack/devtools-vite'
import { tanstackStart } from '@tanstack/react-start/plugin/vite'
import viteReact from '@vitejs/plugin-react'
import viteTsConfigPaths from 'vite-tsconfig-paths'
import { fileURLToPath, URL } from 'url'

import tailwindcss from '@tailwindcss/vite'
import netlify from '@netlify/vite-plugin-tanstack-start'

const config = defineConfig({
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
      'use-sync-external-store/shim/index.js': 'react',
    },
  },
  // Prevent runtime dependency discovery to avoid Windows rename issues
  cacheDir: '.vite',
  optimizeDeps: {
    force: false,
    noDiscovery: true,
    include: [
      '@clerk/tanstack-react-start',
      '@clerk/clerk-react',
      '@clerk/shared',
      '@clerk/types',
      'react',
      'react-dom',
      'recharts',
    ],
  },

  plugins: [
    devtools(),
    netlify(),
    // this is the plugin that enables path aliases
    viteTsConfigPaths({
      projects: ['./tsconfig.json'],
    }),
    tailwindcss(),
    tanstackStart(),
    viteReact(),
  ],

})

export default config