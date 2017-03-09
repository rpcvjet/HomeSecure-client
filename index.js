'use strict';

// var RaspiCam = require('raspicam');

// const raspi = require('raspi');
// const gpio = require('raspi-gpio');

var Gpio = require('onoff').Gpio,
  led = new Gpio(16, 'out');
  var button = new Gpio(17, 'in', 'both');
  console.log('Is this working?');

    button.watch(function(err, value) {
    if (err) exit();
    led.writeSync(led.readSync() === 0 ? 1 : 0);
    console.log('BUTTTTTTTON');
  });


  function exit() {
    buzzer.unexport();
    button.unexport();
    process.exit();
  }
  process.on('SIGINT', exit);




console.log('If this came up without the yes then nope.');

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
