import path from 'path';

import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts'

export default defineConfig(() => ({
  build: {
    lib: {
      entry: path.resolve(__dirname, "src/index.ts"),
      formats: ["es"],
      fileName: 'index'
    },
    rollupOptions: {
      external: ['react', 'applet-apis', 'applet-design', 'applet-store', 'framer-motion', 'react-icons', 'react-router-dom'],
      output: {
        globals: {
          react: 'React'
        }
      }
    },
  },
  plugins: [
    dts()
  ]
}));