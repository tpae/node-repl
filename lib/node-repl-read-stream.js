'use babel';

import { Readable } from 'stream';

export default class NodeReplReadStream extends Readable {

  constructor(content, options) {
    super(options);
    this.content = content.split('\n');
  }

  getLines() {
    return this.content.length;
  }

  _read() {
    if (this.content.length > 0) {
      this.push(this.content.shift()+'\n');
    } else {
      this.push(null);
    }
  }
}
