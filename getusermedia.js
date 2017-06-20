var AudioContext = window.AudioContext || window.webkitAudioContext
var audioCtx = new AudioContext()
var analyser = audioCtx.createAnalyser();
var getUserMedia = require('getusermedia')
 
getUserMedia({audio: true}, function (err, stream) {
  if (err) {
     console.log('failed')
  } 
  else source = audioCtx.createMediaStreamSource(stream);
  source.connect(analyser);
  analyser.fftSize = 2048;
  var bufferLength = analyser.frequencyBinCount;
  var dataArray = new Float32Array(bufferLength);
  analyser.getFloatFrequencyData(dataArray);
  console.log(dataArray)
});
