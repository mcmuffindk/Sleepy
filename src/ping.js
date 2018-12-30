const ssh = require('ssh2');
const config = require(__dirname + '/config.json');
var conn = new ssh();

var connection = conn.on('ready', function() {
  conn.shell(function(err, stream) {
    if (err) {
    document.getElementById('updown').textContent='stopped';
    console.log('Server is stopped');
    setTimeout(ping, 10000);
  } else {
    stream.on('close', function() {
      conn.end();
    }).on('data', function(data) {
    }).stderr.on('data', function(data) {
    });
    stream.end('exit\n');
  }
  });
}).on('end', function () {
  document.getElementById('updown').textContent='running';
  setTimeout(ping, 10000);
}).on('error', function() {
  document.getElementById('updown').textContent='stopped';
  setTimeout(ping, 10000);
});

let ping = () => {
  if (config.key !== "") {
    connection.connect({
      host: config.ip,
      port: config.port,
      username: config.username,
      privateKey: require('fs').readFileSync(config.key),
      passphrase: config.passphrase,
      readyTimeout: 5000
    });
  } else if (config.password !== "") {
    connection.connect({
      host: config.ip,
      port: config.port,
      username: config.username,
      password: config.password,
      readyTimeout: 5000
    });
  } else {
    alert('Please provide a private key or set a password\n(Sleepy needs a restart for changes to take effect)');
  }
};

module.exports = ping;
