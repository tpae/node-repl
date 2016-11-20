'use babel';

import repl from 'repl';
import NodeReplReadStream from './node-repl-read-stream';
import NodeReplWriteStream from './node-repl-write-stream';

export default class NodeReplView {

  constructor(serializedState) {
    // Create root element
    this.element = document.createElement('div');
    this.element.classList.add('node-repl');

    this.outputElement = document.createElement('div');
    this.outputElement.textContent = 'Welcome to Node.js';

    this.element.appendChild(this.outputElement);
    this.outStream = new NodeReplWriteStream(this.outputElement);
  }

  run() {
    const textEditor = atom.workspace.getActiveTextEditor();
    const readStream = new NodeReplReadStream(textEditor.getText());

    this.replServer = repl.start({
      input: readStream,
      output: this.outStream
    });
  }

  clear() {
    this.outputElement.innerHTML = ''
  }

  serialize() {}

  destroy() {
    this.replServer.
    this.element.remove();
  }

  getElement() {
    return this.element;
  }

}
