class DontWork extends AudioBufferSourceNode {
    set buffer(buffer) {
        const spicyBuffer = this.context.createBuffer(buffer.numberOfChannels + 1, buffer.length, buffer.sampleRate);
        for (let i = 0; i < buffer.numberOfChannels; i++) {
            spicyBuffer.copyFromChannel(buffer.getChannelData(i), i);
        }
        const timeline = new Float32Array(buffer.length);
        for (let i = 0; i < timeline.length; i++) {
            timeline[i] = i / timeline.length;
        }

        this._buffer = spicyBuffer;
    }
    connect(destinationNodeOrParam, output, input) {
        if (destinationNodeOrParam instanceof AudioNode) {
            for (let i = 0; i < this.buffer.length - 1; i++) {
                this.connect(destinationNodeOrParam, i, i);
            }
            return this;
        }
        else {
            throw "AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAHHHHHHHHH";
        }
    }
}

export class PlaybackPositionNode extends AudioBufferSourceNode {
    constructor(...args) {
        super(...args);
    }

    set buffer (value) {
        console.log(value)
        this._buffer = value
    }

    get buffer () {
        return this._buffer
    }
}