import { CompositeAudioNode } from "./CompositeAudioNode.js";

export class PlaybackPositionNode extends CompositeAudioNode {

  get playbackPosition() {
    this.analyser.getFloatTimeDomainData(this.sampleHolder);
    return this.sampleHolder[0];
  }

  set buffer(audioBuffer) {
    const timeline = new Float32Array(audioBuffer.length);
    timeline.forEach((_, i) => timeline[i] = i / timeline.length);

    const spicyBuffer = this.context.createBuffer(
      3,
      audioBuffer.length,
      audioBuffer.sampleRate,
    );
    spicyBuffer.copyToChannel(audioBuffer.getChannelData(0), 0);
    spicyBuffer.copyToChannel(audioBuffer.getChannelData(1), 1);
    spicyBuffer.copyToChannel(timeline, 2);

    this.bufferSource.buffer = spicyBuffer;
  }

  constructor(context) {
    super(context);
    this.bufferSource = this.context.createBufferSource();
    this.analyser = this.context.createAnalyser();
    this.sampleHolder = new Float32Array(1);

    const splitter = this.context.createChannelSplitter();
    this.bufferSource.connect(splitter);

    const merger = this.context.createChannelMerger();
    merger.connect(this._output);

    splitter.connect(merger, 0, 0);
    splitter.connect(merger, 1, 1);
    splitter.connect(this.analyser, 2);
  }
}

