// from the archives...
function BinarySearchTree() {
  var params = {
    root: null,
    constructor: function () {
      this.root = null;
    },
    contains: function (value) {
      var current = this.root;
      while (current) {
        if (value > current.value) {
          current = current.right;
        } else if (value < current.value) {
          current = current.left;
        } else {
          return true;
        }
      }
      return false;
    },
    add: function (value) {
      var node = {
        value: value,
        left: null,
        right: null,
      };

      if (this.root === null) {
        this.root = node;
        return;
      }

      var current = this.root;

      while (true) {
        if (value > current.value) {
          if (!current.right) {
            current.right = node;
            break;
          }
          current = current.right;
        } else if (value < current.value) {
          if (!current.left) {
            current.left = node;
            break;
          }
          current = current.left;
        } else {
          break;
        }
      }
    },
  };

  return params;
}
