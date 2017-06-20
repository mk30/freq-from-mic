var getfreqs = require('./getusermedia.js')
getfreqs(function(data, samplerate){
  for (var i=0;i<data.length/2;i++){
    var freq = i * samplerate / data.length  
    if (data[i]>3000){
      console.log(freq, data[i])
    }
  }
})
