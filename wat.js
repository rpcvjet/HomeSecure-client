'use strict';
let readline = require('readline')
const rl = readline.createInterface({
	input: process.stdin,
	output: process.stdout,
	prompt: 'HOMESECURE: '
});

rl.prompt();

rl.on('line', (line) => {
	switch(line.trim()) {
		default:
		console.log('BOOOOOOOYAAAA', line);
	}
	rl.prompt();
})
var Gpio = require('onoff').Gpio

let BUTTON_GPIO = 12
let RED_LED_GPIO = 16

var redLED = new Gpio(RED_LED_GPIO, 'out');

redLED.writeSync(1)

function exit(err) {
  console.log('exit')
  if (err) console.log(err)
  button.unexport();
  process.exit();
}

process.on('SIGINT', exit);
