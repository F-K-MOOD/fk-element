import { build } from 'vite';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

async function testBuild() {
  console.log('Starting build test...');
  try {
    await build({
      configFile: resolve(__dirname, 'vite.config.ts'),
      logLevel: 'info'
    });
    console.log('Build completed successfully');
  } catch (error) {
    console.error('Build failed:', error);
    process.exit(1);
  }
}

testBuild();
