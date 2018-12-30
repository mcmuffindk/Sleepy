const ssh = require('ssh2');
const config = require(__dirname + '/config.json');
var conn = new ssh();

var connection = conn.on('ready', function() {
  conn.shell(function(err, stream) {
    if (err) throw err;
    stream.on('close', function() {
      alert('Server shutdown in 60 seconds!');
      conn.end();
    }).on('data', function(data) {
    }).stderr.on('data', function(data) {
      alert('An error occured, please provide this error output if you need help\nSTDERR: ' + data);
    });
    stream.end('sudo shutdown && exit\n' + config.password + '\n');
  });
});

let stop = () => {
  if (config.key !== "") {
    connection.connect({
      host: config.ip,
      port: config.port,
      username: config.username,
      privateKey: require('fs').readFileSync(config.key),
      passphrase: config.passphrase
    });
  } else if (config.password !== "") {
    connection.connect({
      host: config.ip,
      port: config.port,
      username: config.username,
      password: config.password
    });
  } else {
    alert('Please provide a private key or set a password\n(Sleepy needs a restart for changes to take effect)');
  }
};

module.exports = stop;
