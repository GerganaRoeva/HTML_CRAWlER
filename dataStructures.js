export class Stack {
  constructor() {
    this.items = [];
    this.top = -1;
  }

  push(element) {
    this.top++;
    this.items[this.top] = element;
  }

  pop() {
    if (this.isEmpty()) {
      return null;
    }
    const poppedElement = this.items[this.top];
    this.top--;

    return poppedElement;
  }

  peek() {
    if (this.isEmpty()) {
      return null;
    }
    return this.items[this.top];
  }

  isEmpty() {
    return this.top === -1;
  }

  size() {
    return this.top + 1;
  }

  clear() {
    this.items = [];
    this.top = -1;
  }
}
