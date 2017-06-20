var AudioContext = window.AudioContext || window.webkitAudioContext
var audioCtx = new AudioContext()
var analyser = audioCtx.createAnalyser()
var getUserMedia = require('getusermedia')
 
getUserMedia({audio: true}, function (err, stream) {
  if (err) {
     console.log('failed')
  } 
  else source = audioCtx.createMediaStreamSource(stream)
  source.connect(analyser)
  analyser.fftSize = 2048
  var dataArray = new Float32Array(analyser.frequencyBinCount)
  analyser.getFloatFrequencyData(dataArray)
  console.log(dataArray)
});
