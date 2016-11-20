'use babel';

import NodeReplView from './node-repl-view';
import { CompositeDisposable } from 'atom';

export default {

  nodeReplView: null,
  rightPanel: null,
  subscriptions: null,

  activate(state) {
    // get repl view
    this.nodeReplView = new NodeReplView(state.nodeReplViewState);

    this.rightPanel = atom.workspace.addRightPanel({
      item: this.nodeReplView.getElement(),
      visible: false
    });

    this.subscriptions = new CompositeDisposable();

    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'node-repl:toggle': () => this.toggle(),
      'node-repl:run': () => this.run(),
      'node-repl:clear': () => this.clear()
    }));
  },

  deactivate() {
    this.rightPanel.destroy();
    this.subscriptions.dispose();
    this.nodeReplView.destroy();
  },

  serialize() {
    return {
      nodeReplViewState: this.nodeReplView.serialize()
    };
  },

  run() {
    this.nodeReplView.run();
  },

  clear() {
    this.nodeReplView.clear();
  },

  toggle() {
    return (
      this.rightPanel.isVisible() ?
      this.rightPanel.hide() :
      this.rightPanel.show()
    );
  }

};
