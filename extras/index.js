'use strict';
const fs = require('fs');
const express = require('express');


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
