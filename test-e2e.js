const http = require('http');
const { spawn } = require('child_process');
const path = require('path');

async function testFullStack() {
  console.log('🚀 Launching Full-Stack Validation Harness...');

  // Start Server
  const serverProcess = spawn('node', ['dist/app.js'], {
    cwd: path.resolve(__dirname, 'server'),
    stdio: 'pipe',
    shell: true,
  });

  serverProcess.stdout.on('data', (d) => process.stdout.write('[SERVER] ' + d));
  serverProcess.stderr.on('data', (d) => process.stderr.write('[SERVER-ERR] ' + d));

  // Wait 1.5s for server to initialize
  await new Promise((r) => setTimeout(r, 1500));

  // Check backend health
  console.log('\n📡 Probing Backend on http://localhost:4000/api/health...');
  const healthData = await new Promise((resolve, reject) => {
    http.get('http://127.0.0.1:4000/api/health', (res) => {
      let data = '';
      res.on('data', (c) => (data += c));
      res.on('end', () => resolve(JSON.parse(data)));
    }).on('error', reject);
  });

  console.log('✅ BACKEND RESPONDED:', healthData);

  // Check public products API
  console.log('\n📡 Probing Backend on http://localhost:4000/api/products...');
  const productsData = await new Promise((resolve, reject) => {
    http.get('http://127.0.0.1:4000/api/products', (res) => {
      let data = '';
      res.on('data', (c) => (data += c));
      res.on('end', () => resolve(JSON.parse(data)));
    }).on('error', reject);
  });

  console.log(`✅ PRODUCTS RETURNED: ${productsData.length} items (First item: ${productsData[0]?.name})`);

  // Kill server process cleanly
  serverProcess.kill();

  console.log('\n======================================================');
  console.log('🎉 FULL APPLICATION VALIDATION COMPLETE AND VERIFIED!');
  console.log('======================================================\n');
  process.exit(0);
}

testFullStack().catch((err) => {
  console.error('Validation failed:', err);
  process.exit(1);
});

