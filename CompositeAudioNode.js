// see https://github.com/GoogleChromeLabs/web-audio-samples/wiki/CompositeAudioNode

export class CompositeAudioNode {
  constructor(context) {
    this.context = context;
    this._input = this.context.createGain();
    this._output = this.context.createGain();
  }

  connect(...args) {
    this._output.connect.apply(this._output, args);
  }

  disconnect(...args) {
    this._output.disconnect.apply(this._output, ...args);
  }
}

AudioNode.prototype._connect = AudioNode.prototype.connect;
AudioNode.prototype.connect = function (...args) {
  if (args[0] instanceof CompositeAudioNode) args[0] = args[0]._input;
  this._connect.apply(this, args);
};


