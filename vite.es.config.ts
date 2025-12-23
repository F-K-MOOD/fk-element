import vue from '@vitejs/plugin-vue'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue()
  ],
  resolve: {
    alias: {
      '@': '/src',
    },
  },
  build: {
    outDir: 'dist/es',
    lib: {
      entry: 'src/index.ts',
      name: 'FKElement',
      fileName: 'fk-element',
      formats: ['es']
    },
    rollupOptions: {
      // 确保外部化处理那些你不想打包进库的依赖
      external: ['vue', 'lodash-es', '@fortawesome/free-regular-svg-icons', '@fortawesome/free-solid-svg-icons', '@fortawesome/fontawesome-svg-core'],
      output: {
        exports: 'named',
        // 自定义CSS文件名
        assetFileNames: (assetInfo) => {
          if (assetInfo.name?.endsWith('.css')) {
            return 'index.css';
          }
          return assetInfo.name || 'asset';
        },
      },
    },
  },
})





