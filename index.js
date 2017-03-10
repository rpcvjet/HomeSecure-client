'use strict';

const takePicture = require('./controllers/photo');
const passwordReader = require('./controllers/password');
const unlockDoor = require('./controllers/unlock');
const Sound = require('node-aplay');

module.exports = exports = {};
exports.tempPassword;

var Gpio = require('onoff').Gpio,
led = new Gpio(17, 'out');

function delay(ms){
	var ctr, rej, p = new Promise(function (resolve, reject) {
		ctr = setTimeout(resolve, ms);
		rej = reject;
	});
	p.cancel = function(){ clearTimeout(ctr); rej(Error("Cancelled"))};
	return p;
}

led.writeSync(0)
new Sound(`${__dirname}/assets/welcome.wav`).play();
delay(5000)
.then(takePicture())
.then(() => passwordReader())
.then(password => {
	console.log('you said', password)
	return  unlockDoor(password)
})
.then(() => {
	console.log('access granted')
	led.writeSync(1)
})
