const superagent = require('superagent');


module.exports = function() {
  return new Promise ((resolve, reject) => {

    superagent.post(`172.16.13.220/api/unlock`)
    .field('password', tempPassword)
    .attach('image', `${__dirname}/photo/image.jpg`)
    .then(res => {
      console.log(res);
    })
    .catch((err) => console.error(err));
  });

};
