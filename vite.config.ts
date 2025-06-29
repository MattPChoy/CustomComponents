import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from "path";

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue()],
  base: "/CustomComponents/",
  server: {
    port: 4000
  },
  build:{
    lib: {
      // The file that is loaded when someone imports the plugin into the app
      entry: resolve(__dirname, "src/index.ts"),
      name: "MattCustomComponents",
      fileName: "matt-custom-components"
    },
    rollupOptions: {
      // make sure to externalize deps that shouldn't be bundled
      // into your library
      external: ["vue"],
      output: {
        // Provide global variables to use in the UMD build
        // for externalized deps
        globals: {
          vue: "Vue",
        },
      },
    },
  },
});