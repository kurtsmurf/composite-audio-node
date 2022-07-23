import { CompositeAudioNode } from "./CompositeAudioNode";

export class MyCompositeNode extends CompositeAudioNode {
  get gain() {
    return this._amp.gain;
  }

  constructor(context) {
    super(context);

    // Do stuffs below.
    this._amp = this.context.createGain();
    this._input.connect(this._amp);
    this._amp.connect(this._output);
  }
}
