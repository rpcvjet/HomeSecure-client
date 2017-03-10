
const superagent = require('superagent');
let tempPassword = 'this is a password';

module.exports = function() {

  return new Promise ((resolve, reject) => {

    superagent.post(`172.16.13.220:3000/api/unlock`)
    .field('password', tempPassword)
     .attach('image', `${__dirname}/../photo/image.jpg`)
    .then(res => {
      console.log(res);
    })
    .catch((err) => console.error(err));
  });

};
