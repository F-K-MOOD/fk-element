import { execSync } from 'child_process';
import { existsSync } from 'fs';

console.log('Before build - checking dist directory:');
console.log('dist exists:', existsSync('./dist'));

console.log('\nRunning build command...');
try {
  const output = execSync('pnpm run build', { encoding: 'utf8' });
  console.log('Build output:', output);
} catch (error) {
  console.error('Build failed with error:', error.message);
  console.error('Exit code:', error.status);
  if (error.stdout) console.error('Stdout:', error.stdout);
  if (error.stderr) console.error('Stderr:', error.stderr);
}

console.log('\nAfter build - checking dist directory:');
console.log('dist exists:', existsSync('./dist'));
