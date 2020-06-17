class TrieNode {
  constructor() {
    this.words = [];
    this.children = {};
  }
}

class Trie {
  constructor(words, buildCode, Node=TrieNode) {
    this.Node = Node;
    this.buildCode = buildCode;
    this._root = new this.Node();
    this._count = 0;
    words.forEach(word => this.addWord(word));
  }

  addWord(word) {
    // Basically an insert!
    const code = this.buildCode(word);
    let node = this._root;

    for (let i = 0; i < code.length; i++){
      const radix = code[i];
      if (!node.children[radix]){
        node.children[radix] = new TrieNode();
        node = node.children[radix];
      }
    }

    node.words.push(word);
  }

  lookupCode(code) {
    let node = this._root;

    for (let i = 0; i < code.length; i++){
      const radix = code[i];
      node = node.children[radix];

      if (!node){
        return [];
      }
    }

    return node.words;
  }

  lookupPrefix(codePrefix) {
  }

  count() {
    return this._count;
  }
}

export default Trie;
