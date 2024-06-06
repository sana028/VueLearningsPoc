import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx';
import vuetify from 'vite-plugin-vuetify';
import dotenv, { config } from 'dotenv';
import babel from '@rollup/plugin-babel';
import resolve from '@rollup/plugin-babel'

dotenv.config();
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueJsx(),
    vuetify({ autoImport : true}),
    babel() ,
    resolve({
      extensions: ['.js', '.ts','*.mjs']
  })
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
      
    },
    extensions: ['.js', '.ts', '.jsx', '.tsx', '.mjs'],
  },
  define: {
    __VALUE__: `"${process.env.VALUE}"` // wrapping in "" since it's a string
  },
})
