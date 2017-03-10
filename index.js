'use strict';

const takePicture = require('./controllers/photo');
const passwordReader = require('./controllers/password');
const unlockDoor = require('./controllers/unlock');


module.exports = exports = {};
exports.tempPassword;

var Gpio = require('onoff').Gpio,
led = new Gpio(17, 'out');

var iv = setInterval(function(){
  led.writeSync(led.readSync() === 0 ? 1 : 0)
}, 500);

let readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  prompt: 'HOMESECURE: ',
});

rl.prompt();




rl.on('line', (line) => {
  switch(line.trim()) {
    case 'photo':
    console.log('Get Ready for a photo');
    takePicture()
    .then(() => rl.prompt())
    .catch((err) => {
      console.log(err);
      rl.prompt();
    });
    break;
    case 'p':
    passwordReader()
    .then((password) => {
      exports.tempPassword = password.trim();
      console.log('tempPassword', exports.tempPassword);
      rl.prompt();
    })
    .catch((err) => {
      console.log(err);
      rl.prompt();
    });
    break;
    case 'u':
    console.log('Now to unlock');
    unlockDoor(exports.tempPassword)
    .then(() => rl.prompt())
    .catch((err) => {
      console.log(err);
      rl.prompt();
    });
    break;
    default:
    console.log('BOOOOOOOYAAAA', line);
  }

});




// Stop blinking the LED and turn it off after 5 seconds.
setTimeout(function() {
  clearInterval(iv); // Stop blinking
  led.writeSync(0);  // Turn LED off.
  led.unexport();    // Unexport GPIO and free resources
}, 5000);











// var Gpio = require('onoff').Gpio;
//
// let BUTTON_GPIO = 12;
// let RED_LED_GPIO = 16;
//
// var redLED = new Gpio(RED_LED_GPIO, 'out');
//
// redLED.writeSync(1);
//
// function exit(err) {
//   console.log('exit');
//   if (err) console.log(err);
//   button.unexport();
//   process.exit();
// }
//
// process.on('SIGINT', exit);
