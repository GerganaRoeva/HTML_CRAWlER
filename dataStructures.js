class Stack {
  #items;
  #top;

  constructor() {
    this.#items = [];
    this.#top = -1;
  }

  push(element) {
    this.#top++;
    this.#items[this.#top] = element;
  }

  pop() {
    if (this.isEmpty()) {
      return null;
    }
    const poppedElement = this.#items[this.#top];
    this.#top--;

    return poppedElement;
  }

  peek() {
    if (this.isEmpty()) {
      return null;
    }
    return this.#items[this.#top];
  }

  isEmpty() {
    return this.#top === -1;
  }

  size() {
    return this.#top + 1;
  }

  clear() {
    this.#items = [];
    this.#top = -1;
  }
}

class TreeNode {
  constructor(type, tagName = null, attributes = {}, children = []) {
    this.type = type;
    this.tagName = tagName;
    this.attributes = attributes;
    this.children = children;
  }

  addChild(childNode) {
    this.children.push(childNode);
  }

  findChildByValue(targetValue) {
    for (const child of this.children) {
      if (child.value === targetValue) {
        return child;
      }
    }
    return null;
  }
}
export { Stack, TreeNode };
