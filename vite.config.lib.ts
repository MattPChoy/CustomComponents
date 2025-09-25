import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'
import dts from 'vite-plugin-dts'
import libCss from 'vite-plugin-libcss'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    dts({
      entryRoot: 'src',
      include: ['src/lib.ts', 'src/components', 'src/models', 'src/styles'],
      outDir: 'dist',
      rollupTypes: true,
    }),
    libCss(),
  ],
  base: '/CustomComponents/',
  server: {
    port: 4000,
  },
  build: {
    copyPublicDir: false,
    cssCodeSplit: true,
    lib: {
      entry: resolve(__dirname, 'src/lib.ts'),
      name: 'MattCustomComponents',
      formats: ['es', 'umd'],
      fileName: (format) => `main.${format}.js`,
    },
    rollupOptions: {
      external: ['vue'],
      output: {
        assetFileNames: (assetInfo) => {
          // Ensure all CSS emitted by the library (global CSS and SFC CSS) is bundled into a single file named lib.css at dist root
          if (assetInfo.name && assetInfo.name.toString().endsWith('.css')) {
            return 'lib.css'
          }
          return 'assets/[name][extname]'
        },
        globals: {
          vue: 'Vue',
        },
      },
    },
  },
})
