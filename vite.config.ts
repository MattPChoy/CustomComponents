import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from "path";
import dts from 'vite-plugin-dts'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    dts({ 
      entryRoot: 'src',
      include: ['src/lib.ts', 'src/components', 'src/models', 'src/styles'],
      outDir: 'dist',
      rollupTypes: true,
    })
  ],
  base: "/CustomComponents/",
  server: {
    port: 4000
  },
  build: {
    copyPublicDir: false,
    lib: {
      entry: resolve(__dirname, 'src/lib.ts'),
      name: "MattCustomComponents",
      formats: ['es', 'umd'],
      fileName: (format) => `main.${format}.js`
    },
    rollupOptions: {
      external: ['vue'],
      output: {
        assetFileNames: 'assets/[name][extname]',
        globals: {
          vue: "Vue"
        }
      },
    }
  },
});