var RaspiCam = require('raspicam');



var camera = new RaspiCam({
  mode: 'photo',
  output: './photo/image.jpg' + Math.random(),
  encoding: 'jpg',
  timeout: 3000, // take the picture immediately
});

module.exports = function() {
  return new Promise ((resolve, reject) => {
    camera.on('start', function( err, timestamp ){
      console.log('photo started at ' + timestamp );
    });

    camera.on('read', function( err, timestamp, filename ){
      console.log('photo image captured with filename: ' + filename );
    });

    camera.on('exit', function( timestamp ){
      console.log('photo child process has exited at ' + timestamp );
      camera.stop();
      resolve();
    });

    camera.start();
  });

};
