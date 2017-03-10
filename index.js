'use strict';

const Gpio = require('onoff').Gpio
const Sound = require('node-aplay')

const takePicture = require('./controllers/photo');
const passwordReader = require('./controllers/password');
const unlockDoor = require('./controllers/unlock');
const soundPlay = require('./controllers/sound.js');

let led = new Gpio(17, 'out');

led.writeSync(0)

new Sound(`${__dirname}/assets/welcome.wav`).play();
takePicture()
.then(() => soundPlay(`${__dirname}/assets/password.wav`))	
.then(() => passwordReader())
.then(password => {
	console.log('you said', password)
	return  unlockDoor(password)
})
.then(() => {
	console.log('access granted')
	led.writeSync(1)
	return soundPlay(`${__dirname}/assets/recognized.wav`)
})
.catch(() => soundPlay(`${__dirname}/assets/notrecognized.wav`))
