var AudioContext = window.AudioContext || window.webkitAudioContext
var context = new AudioContext()
var getUserMedia = require('getusermedia')
 
getUserMedia({audio: true}, function (err, stream) {
  if (err) {
     console.log(err)
  } 
  else var input = context.createMediaStreamSource(stream)
  var processor = context.createScriptProcessor(1024,1,1);
  input.connect(processor);
  processor.connect(context.destination);
  processor.onaudioprocess = function(e){
    console.log(e.inputBuffer);
  };
});
