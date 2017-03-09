'use strict';

// var RaspiCam = require('raspicam');

const raspi = require('raspi');
const gpio = require('raspi-gpio');

raspi.init(() => {
  const input = new gpio.DigitalInput('P1-3');
  const output = new gpio.DigitalOutput('P1-5');
  output.write(input.read());
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
