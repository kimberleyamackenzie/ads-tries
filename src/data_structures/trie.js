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
      let child = node.children[radix];
      if (!child){
        child = new this.Node();
        node.children[radix] = child;
      }

      node = child;
    }

    if (node.words.includes(word)){
      return;
    } else {
      node.words.push(word);
      this._count += 1;
    }
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
    let node = this._root;

    for (let i = 0; i < codePrefix.length; i++){
      const radix = codePrefix[i];
      node = node.children[radix];

      if (!node){
        return [];
      }
    }

    const getNodeWords = (node, words) => {
      words.push(...node.words);

      Object.keys(node.children).forEach(childKey => {
        getNodeWords(node.children[childKey], words);
      });

      return words;
    }

    return getNodeWords(node, []);
  }

  count() {
    return this._count;
  }
}

export default Trie;
