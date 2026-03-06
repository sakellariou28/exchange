import react from '@vitejs/plugin-react-swc';
import { visualizer } from 'rollup-plugin-visualizer';
import { defineConfig } from 'vite';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), visualizer()],
  build: {
    rollupOptions: {
      output: {
        // @see https://v3.vitejs.dev/guide/build.html#chunking-strategy
        // @see https://rollupjs.org/configuration-options/#output-manualchunks
        manualChunks(id) {
          if (id.includes('node_modules')) {
            return id.split('node_modules/')[1].split('/')[0];
          }
        },
      },
    },
  },
});
