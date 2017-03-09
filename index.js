'use strict';
const fs = require('fs');
const express = require('express');
//const TextToSpeechV1 = require('watson-developer-cloud/text-to-speech/v1');
//var Sound = require('node-aplay');
// var RaspiCam = require('raspicam');
var Gpio = require('onoff').Gpio,
  led = new Gpio(16, 'out');
var button = new Gpio(17, 'in', 'both');
console.log('Is this working?');

//start the program here
button.watch(function(err, value) {
  if (err) exit();
  led.writeSync(led.readSync() === 0 ? 1 : 0);
//do stuff
  console.log('the file is playing');

 // new Sound('welcome.wav').play();

});//end of button
function exit() {
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
