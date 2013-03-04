'use strict'

var Inflater = require('./inflater')

module.exports = InflateStream

require('mkstream')(InflateStream)

function InflateStream(stream){
  var inflater = new Inflater()
  var _this = this
  stream.on('data', function(data){
    _this.emit('data', inflater.append(new Uint8Array(data)))
  })

  stream.on('end', function(data){
    _this.emit('end')
  })
}
