var ndarray = require('ndarray')
var fft = require('ndarray-fft')
var mag = require('ndarray-complex').mag
var arr = new Float32Array(1024)
module.exports = function (self) {
  self.addEventListener('message',function (ev){
    var data = ev.data
    var reals = ndarray(data,[data.length,1])
    var imags = ndarray(arr,[data.length,1])
    for (var i = 0; i < 1024; i++){
      arr[i] = 0
    }
    fft(1,reals,imags)
    mag(reals,reals,imags)
    self.postMessage(reals.data)
  })
}
