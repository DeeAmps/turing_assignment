// Design a data structure for a binary search tree where each node has a key and a value,
//   and implement the following operations:
// - Search for a node, given as input a key, and output the value found on the
// searched node(or Null if such a node is not found)
// - Insert a node, given as input a(key, value) pair
//   - Delete all nodes having a certain key, given as input a key
//     - Print all keys in the tree in sorted order
//       - Given a reference to a node n in the tree, find the successor node, i.e., the node
// whose key is the smallest key greater than the key in node n(assuming all keys
//         in the tree have distinct values)


class Node {
  constructor(key, value) {
    this.key = key;
    this.value = value;
    this.left = null;
    this.right = null;
  }
}

class BinarySearchTreeDS {
  constructor() {
    this.root = null;
  }


  // Insert a node, given as input a (key, value) pair
  insert(key, value) {
    const newNode = new Node(key, value);
    if (this.root === null) {
      this.root = newNode;
      return this;
    }
    let current = this.root;
    while (true) {
      if (value === current.value) return undefined;
      if (value < current.value) {
        if (current.left === null) {
          current.left = newNode;
          return this;
        }
        current = current.left;
      } else {
        if (current.right === null) {
          current.right = newNode;
          return this;
        }
        current = current.right;
      }
    }
  }


  // Search for a node, given as input a key, and output the value found on the searched node(or Null if such a node is not found)
  search(key) {
    if (this.root === null) return false;
    let current = this.root;
    let found = false;
    while (current && !found) {
      if (key < current.key) {
        current = current.left;
      } else if (key > current.key) {
        current = current.right;
      } else {
        found = true;
      }
    }
    if (!found) return undefined;
    return current.value;
  }

  findMinNode(node) {
    if (node.left === null) {
      return node;
    }
    return this.findMinNode(node.left);
  }


  // Delete all nodes having a certain key, given as input a key
  delete(key) {
    const deleteNode = (node, key) => {
      if (!node) {
        return null;
      }
      if (key < node.value.key) {
        node.left = deleteNode(node.left, key);
        return node;
      } else if (key > node.value.key) {
        node.right = deleteNode(node.right, key);
        return node;
      } else {
        if (!node.left && !node.right) {
          return null;
        }
        if (!node.left) {
          node = node.right;
          return node;
        }
        if (!node.right) {
          node = node.left;
          return node;
        }
        const aux = this.findMinNode(node.right);
        node.value = aux.value;
        node.right = deleteNode(node.right, aux.value.key);
        return node;
      }
    };
    this.root = deleteNode(this.root, key);
  }

  // Print all keys in the tree in sorted order
  print() {
    const inOrder = (node) => {
      if (node) {
        inOrder(node.left);
        console.log(node.value);
        inOrder(node.right);
      }
    };
    inOrder(this.root);
  }

  successor(node) {
    if (node.right) {
      return this.findMinNode(node.right);
    }
    let currentNode = this.root;
    let successor = null;
    while (currentNode) {
      if (node.value.key < currentNode.value.key) {
        successor = currentNode;
        currentNode = currentNode.left;
      } else if (node.value.key > currentNode.value.key) {
        currentNode = currentNode.right;
      } else {
        break;
      }
    }
    return successor;
  }
}

const binarySearchTree = new BinarySearchTreeDS();
binarySearchTree.insert('a', 10);
binarySearchTree.insert('b', 8);
binarySearchTree.insert('c', 11);
binarySearchTree.insert('d', 15);
binarySearchTree.insert('e', 20);
binarySearchTree.insert('a', 25);
binarySearchTree.print();
binarySearchTree.delete('a');
console.log('=======================')
binarySearchTree.print();

console.log('done')
// console.log(binarySearchTree.search('a'));
