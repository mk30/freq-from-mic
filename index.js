var glsl = require('glslify')
var regl = require('regl')({extensions: ['oes_texture_float']})
var camera = require('regl-camera')(regl, {
  distance: 4, far: 5000
})
var mat4 = require('gl-mat4')
var vec3 = require('gl-vec3')
var anormals = require('angle-normals')

function makecatmug (regl) {
  var catmug = require('./catmug.json')
  var model = []
  return regl({
    frag: glsl`
      precision mediump float;
      #pragma glslify: snoise = require('glsl-noise/simplex/3d')
      #pragma glslify: cnoise = require('glsl-curl-noise')
      uniform float time;
      varying vec3 vnorm, vpos;
      void main () {
        gl_FragColor =
        vec4(cnoise(vnorm-vpos), 1.0);
      }
    `,
    vert: glsl`
      precision mediump float;
      #pragma glslify: snoise = require('glsl-noise/simplex/3d')
      uniform mat4 projection, view, model;
      uniform float time, texwidth;
      uniform sampler2D tex;
      attribute vec3 position, normal;
      varying vec3 vnorm, vpos;
      void main () {
        vnorm = normal;
        float x = 0.0
          + log(1.0+length(texture2D(tex, vec2(0.001,0.5))))*0.01
          + log(1.0+length(texture2D(tex, vec2(0.002,0.5))))*0.01
          + log(1.0+length(texture2D(tex, vec2(0.0005,0.5))))*0.01;
        vpos = position + vnorm * x;
        gl_Position = projection * view * model *
        vec4(vpos,1);
      }
    `,
    attributes: {
      position: catmug.positions,
      normal: anormals(catmug.cells, catmug.positions)
    },
    uniforms: {
      model: function (context) {
        var theta = context.time
        mat4.rotateY(model, mat4.identity(model),
        Math.sin(theta)/2)
        return model
      },
      time: regl.context('time'),
      tex: regl.prop('tex'),
      texwidth: regl.prop('texwidth')
    },
    primitive: "triangles",
    blend: {
      enable: true,
      func: { src: 'src alpha', dst: 'one minus src alpha' }
    },
    cull: { enable: true },
    elements: catmug.cells
  })
}
var draw = {
  catmug: makecatmug(regl)
}
var getfreqs = require('./getusermedia.js')
getfreqs(function(data, samplerate){
  mictex({
    data: data,
    width: data.length/4,
    height: 1
  })
  width = data.length/4
})
var width = 0
var mictex = regl.texture()
regl.frame(function (context) {
  regl.clear({ color: [0,0,0,1], depth: true })
  camera(function () {
    draw.catmug({tex: mictex, texwidth: width})
  })
})
