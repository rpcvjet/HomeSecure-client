'use strict';

const takePicture = require('./controllers/photo');

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
    console.log("Get Ready for a photo");
  default:
    console.log('BOOOOOOOYAAAA', line);
    takePicture.camera.start();
  }
  rl.prompt();
});
var Gpio = require('onoff').Gpio;

let BUTTON_GPIO = 12;
let RED_LED_GPIO = 16;

var redLED = new Gpio(RED_LED_GPIO, 'out');

redLED.writeSync(1);

function exit(err) {
  console.log('exit');
  if (err) console.log(err);
  button.unexport();
  process.exit();
}

process.on('SIGINT', exit);
