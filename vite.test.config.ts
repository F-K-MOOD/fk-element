import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import dts from 'vite-plugin-dts'

export default defineConfig({
  plugins: [
    vue(),
    dts({
      outDir: 'dist/types',
      rollupTypes: true
    })
  ],
  build: {
    lib: {
      entry: 'src/index.ts',
      name: 'FKElement',
      formats: ['es']
    }
  }
})
