'use babel';

import repl from 'repl';
import NodeReplReadStream from './node-repl-read-stream';
import NodeReplWriteStream from './node-repl-write-stream';

const WELCOME_MESSAGE = 'Welcome to Node.js ' + process.version;

export default class NodeReplView {
  constructor() {
    // Create root element
    this.outStream;
    this.outputElement;
    this.element = atom.views.addViewProvider(() => {
      const element = document.createElement('main');

      element.classList.add('node-repl', 'native-key-bindings');
      element.setAttribute('tabindex', -1);

      const resizeElement = document.createElement('div');
      resizeElement.classList.add('node-repl__resizer');
      resizeElement.addEventListener('mousedown', resizeStart);

      function resizeStart() {
        document.addEventListener('mousemove', resize);
        document.addEventListener('mouseup', resizeStop);
      }

      function resize(evt) {
        const width = element.offsetWidth + element.getBoundingClientRect().left - evt.pageX;

        element.style.width = width + 'px';
      }

      function resizeStop() {
        document.removeEventListener('mousemove', resize);
        document.removeEventListener('mouseup', resizeStop);
      }

      const outputElement = document.createElement('section');
      outputElement.classList.add('node-repl__output');
      outputElement.innerHTML = WELCOME_MESSAGE;

      this.outputElement = outputElement;

      element.appendChild(resizeElement);
      element.appendChild(this.outputElement);

      this.outStream = new NodeReplWriteStream(this.outputElement);

      return element;
    });
  }

  run() {
    const textEditor = atom.workspace.getActiveTextEditor();
    const readStream = new NodeReplReadStream(textEditor.getText());
    this.appendRunMessage('Executing ' + readStream.getLines() + ' lines...');
    this.replServer = repl.start({
      input: readStream,
      output: this.outStream,
      ignoreUndefined: true,
      prompt: '',
      terminal: false
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
