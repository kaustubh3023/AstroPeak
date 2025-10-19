const { spawn } = require('child_process');
const path = require('path');

// Set environment variables for Windows
process.env.NODE_ENV = 'development';

console.log('Starting React development server...\n');

// Use cross-env to handle environment variables across platforms
const devServer = spawn('npx', [
  'cross-env', 
  'NODE_ENV=development', 
  'tsx', 
  'server/index.ts'
], {
  stdio: 'inherit',
  shell: true,
  cwd: process.cwd()
});

devServer.on('error', (error) => {
  console.error('Failed to start development server:', error);
});

devServer.on('close', (code) => {
  console.log(`Development server exited with code ${code}`);
});

// Handle Ctrl+C gracefully
process.on('SIGINT', () => {
  console.log('\nShutting down development server...');
  devServer.kill('SIGINT');
  process.exit(0);
});