const child_process = require('child_process');
const path = require('path');

let child = null;
function server() {
  if (child) child.kill();

  child = child_process.spawn(path.resolve(__dirname, '..', 'server.js'));
}

module.exports = server;