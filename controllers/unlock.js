
const superagent = require('superagent');

// const tempPassword = require('tempPassword');


module.exports = function(tempPassword) {
		console.log('tmppassworld', tempPassword)
    return superagent.post(`172.16.13.220:3000/api/unlock`)
    .field('password', tempPassword.trim())
     .attach('image', `${__dirname}/../photo/image.jpg`)
    .then(res => {
      console.log('tempPassword==============================>',tempPassword);
    })
    .catch((err) => {
			console.error(err)
			throw err;
		});
};
