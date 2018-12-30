const wol = require('wakeonlan');
const config = require(__dirname + '/config.json');

let start = () => {
  wol(config.MAC).then(() => {
    alert('Wake On Lan sent!\nThe server will start in a minute')
  });
};

module.exports = start;
