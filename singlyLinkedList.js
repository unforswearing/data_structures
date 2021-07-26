class SinglyList {
   constructor() {
     this.Node = (data) => {
      this.data = data;
      this.next = null;
     }
   }

  _length = 0;
  head = null;


  add(value) {
    let node = this.Node(value);
    let currentNode = this.head;

    if (!currentNode) {
      this.head = node;
      this._length++;

      return node;
    }

    while (currentNode.next) {
      currentNode = currentNode.next;
    }

    currentNode.next = node;

    this._length++;

    return node;
  }

  searchNodeAt(position) {
    let currentNode = this.head
    let length = this._length
    let count = 1
    let message = { failure: "Failure: non-existent node in this list." };

    // 1st use-case: an invalid position
    if (length === 0 || position < 1 || position > length) {
      throw new Error(message.failure);
    }

    // 2nd use-case: a valid position
    while (count < position) {
      currentNode = currentNode.next;
      count++;
    }

    return currentNode;
  }

  remove(position) {
    let currentNode = this.head
    let length = this._length
    let count = 0
    let message = { failure: "Failure: non-existent node in this list." }
    let beforeNodeToDelete = null
    let nodeToDelete = null
    let deletedNode = null;

    // 1st use-case: an invalid position
    if ((position < 0) || (position > length)) {
      throw new Error(message.failure);
    }

    // 2nd use-case: the first node is removed
    if (position === 1) {
      this.head = currentNode.next;
      deletedNode = currentNode;
      currentNode = null;
      this._length--;

      return deletedNode;
    }

    // 3rd use-case: any other node is removed
    while (count < position) {
      beforeNodeToDelete = currentNode;
      nodeToDelete = currentNode.next;
      count++;
    }

    beforeNodeToDelete.next = nodeToDelete.next;
    deletedNode = nodeToDelete;
    nodeToDelete = null;
    this._length--;

    return deletedNode;
  }
}

let list = new SinglyList()
list.add("pork")

console.log(list.searchNodeAt("pork"))