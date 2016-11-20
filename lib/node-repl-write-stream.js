'use babel';

import { Writable } from 'stream';

export default class NodeReplWriteStream extends Writable {

  constructor(element) {
    super({ decodeStrings: false });
    this.element = element;
  }

   _write(data, enc, next) {
     const row = document.createElement('p');
     row.textContent = data.toString();
     this.element.appendChild(row);
     next();
  }
}
