'use strict';

const takePicture = require('./controllers/photo');
const passwordReader = require('./controllers/password');
const unlockDoor = require('./controllers/unlock');
const Sound = require('node-aplay');

module.exports = exports = {};
exports.tempPassword;

var Gpio = require('onoff').Gpio,
  led = new Gpio(17, 'out');
var button = new Gpio(19, 'in');

button.watch(function(err) {
  if (err) exit();


  led.writeSync(0)
  new Sound(`${__dirname}/assets/welcome.wav`).play();
  takePicture()
  .then(() => passwordReader())
  .then(password => {
    console.log('you said', password)
    return  unlockDoor(password)
  })
  .then(() => {
    console.log('access granted')
    led.writeSync(1)
    new Sound(`${__dirname}/assets/recognized.wav`).play();
  })

});

function exit() {
  button.unexport();
  process.exit();
}

process.on('SIGINT', exit);
