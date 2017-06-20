var AudioContext = window.AudioContext || window.webkitAudioContext
var audioCtx = new AudioContext()
var getUserMedia = require('getusermedia')
 
getUserMedia({audio: true}, function (err, stream) {
    // if the browser doesn't support user media 
    // or the user says "no" the error gets passed 
    // as the first argument. 
    if (err) {
       console.log('failed')
    } else {
       console.log('got a stream', stream)  
    }
});
