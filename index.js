'use strict'

var Inflater = require('./inflater')

module.exports = InflateStream

require('mkstream')(InflateStream)
var Buffer = require('buffer').Buffer

//ugly ugly ugly hack, need to use it until I find a better API
var isBrowser = typeof window != 'undefined' && window.document && window.navigator && window.location

function InflateStream(){
  var _this = this
  this.buffers = []
  this.inflater = new Inflater()

  this.writable = true
  this.readable = true
}

InflateStream.prototype.write = function(data){
  this.buffers.push(data)

  if(isBrowser){
    var inflaterData = new Uint8Array(data.parent).subarray(data.offset, data.offset + data.length)
  } else {
    var inflaterData = new Uint8Array(data)
  }
  var outputData = this.inflater.append(inflaterData)
  if(typeof outputData == 'object')
    this.emit('data', outputData)
  else if (outputData != -1)
    this.emit('error', 'Inflater emitted ' + outputData)
}

InflateStream.prototype.end = function(){
  this.emit('end')
}

InflateStream.prototype.destroy = function(){
  this.emit('end')
}
