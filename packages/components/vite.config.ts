import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'
import { defineConfig } from 'vite'
import dts from 'vite-plugin-dts'

export default defineConfig({
  plugins: [
    vue(),
    dts({
      outDir: 'dist/types',
      tsconfigPath: '../../tsconfig.app.json',
      include: ['src/**/*.ts', 'src/**/*.vue'],
      insertTypesEntry: true,
      rollupTypes: true
    })
  ],
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src')
    }
  },
  build: {
    lib: {
      entry: resolve(__dirname, 'index.ts'),
      name: 'FKElement',
      fileName: (format) => {
        return format === 'es' ? 'fk-element.js' : 'fk-element.umd.js'
      },
      formats: ['es', 'umd']
    },
    rollupOptions: {
      // 外部化依赖：不打包进产物
      external: [
        'vue',
        '@fortawesome/fontawesome-svg-core',
        '@fortawesome/free-regular-svg-icons',
        '@fortawesome/free-solid-svg-icons'
      ],
      output: {
        globals: {
          vue: 'Vue'
        },
        exports: 'named',
        // 让每个组件的 CSS 单独输出，如 button.css, input.css
        assetFileNames: (chunkInfo) => {
          if (chunkInfo.name?.endsWith('.css')) {
            return '[name].css'
          }
          return '[name].[ext]'
        }
      }
    },
    sourcemap: true,
    emptyOutDir: true
  }
})