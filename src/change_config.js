const config = require(__dirname + '/config.json');

let change = (setting, value) => {
  const old = config;
  var changed = config;

  changed[setting] = value;
  return changed;
};
// DOES NOT SAVE
let write = (setting, value) => {
  require('fs').writeFile(__dirname + '/config.json', JSON.stringify(change(setting, value), null, 2), function (err) {
    if (err) {
      alert(err);
    }
  });
};

module.exports = write;
