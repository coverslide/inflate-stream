'use strict'

var Inflater = require('./inflater')

module.exports = InflateStream

require('mkstream')(InflateStream)

function InflateStream(stream){
  var inflater = new Inflater()
  var _this = this
  stream.on('data', function(data){
    var decompressedData = inflater.append(new Uint8Array(data))
    if(decompressedData.buffer)
      _this.emit('data', decompressedData.buffer)
    else
      _this.emit('error', new Error('Received response ' + decompressedData + ' from inflater'))
  })

  stream.on('end', function(data){
    _this.emit('end')
  })
}
