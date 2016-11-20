'use babel';

import repl from 'repl';
import NodeReplReadStream from './node-repl-read-stream';
import NodeReplWriteStream from './node-repl-write-stream';

const WELCOME_MESSAGE = 'Welcome to Node.js ' + process.version;

export default class NodeReplView {

  constructor(serializedState) {
    // Create root element
    this.element = document.createElement('div');
    this.element.classList.add('node-repl');
    this.element.classList.add('native-key-bindings');
    this.element.setAttribute('tabindex', -1);

    this.outputElement = document.createElement('div');
    this.outputElement.textContent = WELCOME_MESSAGE;

    this.element.appendChild(this.outputElement);
    this.outStream = new NodeReplWriteStream(this.outputElement);
  }

  run() {
    const textEditor = atom.workspace.getActiveTextEditor();
    const readStream = new NodeReplReadStream(textEditor.getText());
    this.appendRunMessage("Executing " + readStream.getLines() + " lines...");
    this.replServer = repl.start({
      input: readStream,
      output: this.outStream,
      ignoreUndefined: true,
      prompt: ""
    });
  }

  appendRunMessage(message) {
    const row = document.createElement('p');
    row.classList.add('run-header');
    row.textContent = message;
    this.outputElement.appendChild(row);
  }

  clear() {
    this.outputElement.innerHTML = WELCOME_MESSAGE;
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
