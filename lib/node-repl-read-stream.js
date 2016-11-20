'use babel';

import { Readable } from 'stream';

export default class NodeReplReadStream extends Readable {

  constructor(content, options) {
    super(options);
    this.content = content;
  }

  _read(size) {
    if (this.content.length > 0) {
      this.push(this.content.slice(0, size));
      this.content = this.content.slice(size);
    } else {
      this.push(null);
    }
  }
}
