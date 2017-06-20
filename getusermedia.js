var AudioContext = window.AudioContext || window.webkitAudioContext
var context = new AudioContext()
var getUserMedia = require('getusermedia')
var ndarray = require('ndarray')
var fft = require('ndarray-fft')
var mag = require('ndarray-complex').mag
 
getUserMedia({audio: true}, function (err, stream) {
  if (err) {
     console.log(err)
  } 
  else var input = context.createMediaStreamSource(stream)
  var processor = context.createScriptProcessor(1024,1,1);
  input.connect(processor);
  processor.connect(context.destination);
  var arr = new Float32Array(1024)
  processor.onaudioprocess = function(ev){
    var data = ev.inputBuffer.getChannelData(0)
    var reals = ndarray(data,[data.length,1])
    var imags = ndarray(arr,[data.length,1])
    for (var i = 0; i < 1024; i++){
      arr[i] = 0
    }
    fft(1,reals,imags)
    mag(reals,reals,imags)
    for (var i=0;i<reals.data.length/2;i++){
      var freq = i * context.sampleRate / reals.data.length  
      if (reals.data[i]>3000){
        console.log(freq, reals.data[i])
      }
    }
  };
});
