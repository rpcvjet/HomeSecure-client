'use strict'
const Sound = require('node-aplay');

module.exports = path => {
	return new Promise((resolve) => {
		let sound = new Sound(path)
		sound.play()
		sound.on('complete', () => {
			resolve()
		})
	})
}
