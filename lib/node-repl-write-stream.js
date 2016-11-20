'use babel';

import { Writable } from 'stream';

const ELLIPSIS = /[.]{3,}/g;

export default class NodeReplWriteStream extends Writable {

  constructor(element) {
    super({ decodeStrings: false });
    this.element = element;
  }

   _write(data, enc, next) {
     if (data.length > 0 && !ELLIPSIS.test(data.toString().trim())) {
       const row = document.createElement('p');
       row.textContent = data.toString();
       this.element.appendChild(row);
    }
     next();
  }
}
