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
    outDir: 'dist/umd',
    lib: {
      entry: 'src/index.ts',
      name: 'FKElement',
      fileName: 'fk-element',
      formats: ['umd']
    },
    rollupOptions: {
      // 确保外部化处理那些你不想打包进库的依赖
      external: ['vue'],
      output: {
        // 在 UMD 构建模式下为这些外部化的依赖提供一个全局变量
        globals: {
          vue: 'Vue',
        },
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





