'use strict';

// var RaspiCam = require('raspicam');

var Raspi = require('raspi-io');
var five = require('johnny-five');
var board = new five.Board({
  io: new Raspi(),
});
console.log('Did this work?');


board.on('ready', () => {
  // Create an Led on  (GPIO4)
  // and strobe it on/off
  console.log('Yes it did...');
  (new five.Led('GPIO4')).strobe();

  // var led = new five.Led('P1-7');
  // led.strobe(500);
});


//
// var Gpio = require('onoff').Gpio;
//   led = new Gpio(14, 'out'),
//   button = new Gpio(4, 'in', 'both');
//
// button.watch(function(err, value) {
//   led.writeSync(value);
// });




//
//
// var camera = new RaspiCam({
//   mode: 'photo',
//   output: './photo/image.jpg' + Math.random(),
//   encoding: 'jpg',
//   timeout: 3000, // take the picture immediately
// });
//
// camera.on('start', function( err, timestamp ){
//   console.log('photo started at ' + timestamp );
// });
//
// camera.on('read', function( err, timestamp, filename ){
//   console.log('photo image captured with filename: ' + filename );
// });
//
// camera.on('exit', function( timestamp ){
//   console.log('photo child process has exited at ' + timestamp );
//   camera.stop();
// });
//
// camera.start();
