'use strict';

const takePicture = require('./controllers/photo');
const passwordReader = require('./controllers/password');
const unlockDoor = require('./controllers/unlock');
const Sound = require('node-aplay');

module.exports = exports = {};
exports.tempPassword;

var Gpio = require('onoff').Gpio,
led = new Gpio(17, 'out');



led.writeSync(0)
new Sound(`${__dirname}/assets/welcome.wav`).play();
setTimeout(function(){
	takePicture();
}, 5000)
.then(() => passwordReader())
.then(password => {
	console.log('you said', password)
	return  unlockDoor(password)
})
.then(() => {
	console.log('access granted')
	led.writeSync(1)
})
