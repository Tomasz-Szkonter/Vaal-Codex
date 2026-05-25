import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    open: false,
    // guide-resources/ lives one level above the Vite project root.
    // Whitelist the parent dir so general/route.js can import the JSON.
    fs: {
      allow: ['..'],
    },
  },
});
