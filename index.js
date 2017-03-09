'use strict';
require('dotenv');
const fs = require('fs');
const express = require('express');
const TextToSpeechV1 = require('watson-developer-cloud/text-to-speech/v1');
const app = express();
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
const text_to_speech = new TextToSpeechV1({
  username: '8c33d8d9-9c61-4e7e-a998-310bf03a24fe',
  password: 'Ner5yJEu40vD',
});
var params = {
  text: 'Welcome home. Your picture will now be taken for authentication purposes',
  voice: 'en-US_AllisonVoice', // Optional voice
  accept: 'audio/wav',
};
// Pipe the synthesized text to a file
text_to_speech.synthesize(params).pipe(fs.createWriteStream('new.wav'));
console.log('this is before the get route');
  res.set({'Content-Type': 'audio/wav'});
  var readStream = fs.createReadStream(filepath);
  readStream.pipe(res);

});//end of button function
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
