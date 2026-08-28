// Browser-first host for Swachh Bharat Urban.
// Run with: node portal-host.cjs
const path = require('path');
const fs = require('fs');

// The browser launcher runs from the workspace root, while the packaged
// provider configuration lives beside the portable application. Load it
// before requiring the bundled server so both launch modes use the same AI
// provider, model, and vision settings.
function loadEnvFile(filePath) {
  if (!fs.existsSync(filePath)) return false;
  for (const line of fs.readFileSync(filePath, 'utf8').split(/\r?\n/)) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) continue;
    const separator = trimmed.indexOf('=');
    if (separator < 1) continue;
    const key = trimmed.slice(0, separator).trim();
    const value = trimmed.slice(separator + 1).trim().replace(/^['"]|['"]$/g, '');
    if (key && value && !process.env[key]) process.env[key] = value;
  }
  return true;
}

// The packaged server is self-contained; production mode avoids attempting to
// load the optional Vite development middleware from node_modules.
process.env.NODE_ENV = 'production';
const distServer = path.join(__dirname, 'CleanCity AI (Portable)', 'resources', 'app', 'dist', 'server.cjs');
loadEnvFile(path.join(__dirname, 'CleanCity AI (Portable)', '.env.local'));
loadEnvFile(path.join(__dirname, '.env.local'));
const { startServer } = require(distServer);

startServer().then((port) => {
  fs.writeFileSync(path.join(__dirname, '.portal-port'), String(port), 'utf8');
  console.log(`Swachh Bharat Urban is ready at http://localhost:${port}`);
  console.log('Open that address in any modern browser. Press Ctrl+C to stop.');
}).catch((error) => {
  console.error('Portal startup failed:', error.message);
  process.exitCode = 1;
});
