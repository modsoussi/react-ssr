const child_process = require('child_process');
const path = require('path');
const devPort = process.env.DEV_PORT || 3000;

let child = null;
function server(callback) {
  if (child) child.kill();

  child = child_process.spawn(process.execPath, [path.resolve(__dirname, '..', 'server.js')], {
    env: {
      NODE_ENV: 'development',
      DEV_PORT: devPort,
    }
  });
  child.stdout.on('data', (data) => {
    console.log(data.toString().trim());
  });
  child.stderr.on('data', (data) => {
    console.error(data.toString().trim());
  });
  child.on('message', (m) => {
    if (m === 'CONNECTED') {
      console.log('Server connected');
    }
  });

  if(callback) callback();
}

module.exports = server;