import vue from '@vitejs/plugin-vue'
import { copyFileSync, existsSync, mkdirSync } from 'fs'
import { resolve } from 'path'
import { defineConfig } from 'vite'
import dts from 'vite-plugin-dts'

function extractComponentCSS() {
  return {
    name: 'extract-component-css',
    writeBundle() {
      const srcDir = resolve(__dirname, 'src')
      const distDir = resolve(__dirname, 'dist', 'components')

      if (!existsSync(distDir)) {
        mkdirSync(distDir, { recursive: true })
      }

      const components = ['Button', 'Collapse', 'Dropdown', 'Form', 'Icon', 'Input', 'Message', 'Tooltip']

      components.forEach(component => {
        const srcCssPath = resolve(srcDir, component, 'style.css')
        const distCssPath = resolve(distDir, `${component.toLowerCase()}.css`)

        if (existsSync(srcCssPath)) {
          copyFileSync(srcCssPath, distCssPath)
        }
      })
    }
  }
}

export default defineConfig({
  plugins: [
    vue(),
    dts({
      outDir: 'dist/types',
      tsconfigPath: './tsconfig.json',
      include: ['src/**/*.ts', 'src/**/*.vue'],
      insertTypesEntry: true,
      rollupTypes: true
    }),
    extractComponentCSS()
  ],
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src')
    }
  },
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'FKElement',
      fileName: (format) => format === 'es' ? 'fk-element.js' : 'fk-element.umd.js',
      formats: ['es', 'umd']
    },
    rollupOptions: {
      external: ['vue'],
      output: {
        globals: {
          vue: 'Vue'
        },
        assetFileNames: 'index.css'
      }
    },
    cssCodeSplit: true,
    sourcemap: true
  }
})
