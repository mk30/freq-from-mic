var AudioContext = window.AudioContext || window.webkitAudioContext
var context = new AudioContext()
var getUserMedia = require('getusermedia')
var work = require('webworkify')
var w = work(require('./worker.js'))

module.exports = function (f){
  getUserMedia({audio: true}, function (err, stream) {
    if (err) {
       console.log(err)
    } 
    else var input = context.createMediaStreamSource(stream)
    var processor = context.createScriptProcessor(1024,1,1)
    input.connect(processor)
    processor.connect(context.destination)
    var arr = new Float32Array(1024)
    processor.onaudioprocess = function(ev){
      var data = ev.inputBuffer.getChannelData(0)
      w.postMessage(data)
      w.addEventListener('message', function (ev) {
          fftdata = ev.data
          f(fftdata, context.sampleRate)
      })
    }
  })
}
