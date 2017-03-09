var cp = require('child_process');
var watson = require('watson-developer-cloud');


// load environment params from a file named .env that's .gitignore'd
require('dotenv').load({silent: true});

module.exports = function() {
  return new Promise ((resolve, reject) => {

    var hasFlac = false;
    // try {
    //   hasFlac = !!cp.execSync('which flac').toString().trim();
    // } catch (ex) { }

    var speech_to_text = watson.speech_to_text({
      username: process.env.STT_USERNAME,
      password: process.env.STT_PASSWORD,
      version: 'v1',
      url: 'https://stream.watsonplatform.net/speech-to-text/api',
    });

    // first set up a session to connect the output and input(s)
    speech_to_text.createSession(null, function(err, session) {
      if (err) {
        exit(err);
      }
			console.log('now you can start')

		// set up the live output handler
		speech_to_text.observeResult({
			cookie_session: session.cookie_session,
			session_id: session.session_id,
			interim_results: true,
			silent: true,
		}, function (err, transcript) {
			if (err) {
				exit(err);
			}
			if(transcript.results[0].final === true){
				finish(transcript.results[0].alternatives[0].transcript)
			}
		});
	
	      // set up the recognize live to handle inputs
		var transcriptInput = speech_to_text.recognizeLive({
			content_type: hasFlac ? 'audio/flac' : 'audio/l16; rate=44100',
			cookie_session: session.cookie_session,
			session_id: session.session_id,
			interim_results: true,
			continuous: false,
			silent: true,
		}, function(err, transcript) {
			if (err) {
				 exit(err);
			}
	})

      // start the recording
	var mic = cp.spawn('arecord', ['--device=plughw:1,0', '--format=S16_LE', '--rate=44100', '--channels=1']); //, '--duration=10'
	if (hasFlac) {
		var flac = cp.spawn('flac', ['-0', '-', '-']);
		mic.stdout.pipe(flac.stdin);
		flac.stdout.pipe(transcriptInput);
		var micInput = transcriptInput;
	} else {
		mic.stdout.pipe(transcriptInput);
	}
	
	function exit(err) {
		console.log(err);
		mic.kill()
		reject(err)
	}
	
	function finish(password){
		mic.kill()
		resolve(password)
	}
    });
  });
};
