const { spawn } = require('child_process');
const path = require('path');

// Set environment variable for Windows
process.env.NODE_ENV = 'development';

// Run the server with the correct path
const server = spawn('npx', ['tsx', 'server/index.ts'], {
  stdio: 'inherit',
  shell: true,
  cwd: process.cwd()
});

server.on('error', (error) => {
  console.error('Failed to start server:', error);
});

server.on('close', (code) => {
  console.log(`Server process exited with code ${code}`);
});