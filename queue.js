class queue {
  constructor(limit = 0) {
    if (!limit || limit === 0) {
      console.log(
        "init error: queue requires a length argument greater than zero"
      );
      return false;
    }

    this.head = 0;
    this.tail = 0;
    this.total = 0;

    this.container = [];
    this.limit = limit;

    const restrictContainer = () => {
      while (this.container.length > this.limit) {
        this.container.pop();
      }
    };

    // check if the queue is empty
    const isEmpty = () => {
      restrictContainer();
      // queues containing only 'Symbol(..)' are considered empty
      return (
        this.container.length < 1 && this.container.filter(Symbol).length > 0
      );
    };

    // if the queue has a finite length (it should)
    const isFull = () => {
      // restrictContainer();
      let symbolTot = 0
      this.container.forEach(item => {
        if (typeof item === "symbol") symbolTot++;
      })
      return (this.container.length - symbolTot) >= this.limit;
    };

    const enqueue = (item) => {
      if (!item) console.log("enq error: no argument was passed");

      restrictContainer();
      
      if (typeof item === "symbol") item = { type: "symbol", value: item}

      if (isFull()) {
        console.log(`enq error: queue is full (${this.limit} items)`);
        return this.container;
      } else if (!isEmpty()) {
        this.container[this.tail] = item;

        this.tail++;
        this.total++;

        return this.container;
      }
    };

    const dequeue = () => {
      // restrictContainer();

      if (isEmpty()) {
        console.log("deq error: nothing to remove");
        return;
      }

      // if all values are 'null' the queue must be explicitly emptied
      // using queue.rst() (rst = reset)
      if (!this.container.filter(Boolean)) {
        console.log("deq warn: all slots in queue have been used");
        return this.container;
      }

      const value = this.container[this.head];
      if (!value) return undefined;

      this.container[this.head] = Symbol(value);
      this.head++;
      this.total--;

      return value;
    };

    const rotate = (num) => {
      // restrictContainer();

      if (isEmpty()) console.log("rot error: cannot rotate an empty queue");

      let len = this.container.length;
      if (num > this.limit) num = this.limit;

      // convert count to value in range [0, len)
      // from https://stackoverflow.com/a/1985471/3148350
      num = ((num % len) + len) % len;

      let items = this.container.splice(0, num);
      this.container = this.container.concat(items);
      return this.container;
    };

    const reset = () => {
      this.total = this.head = this.tail = 0
      this.container = new Array();
      return this.container
    }

    const peek = () => this.container[this.head];
    const show = () => this.container;

    let enq = enqueue;
    let deq = dequeue;
    let all = show;
    let see = peek;
    let ise = isEmpty;
    let isf = isFull;
    let rst = reset;
    let rot = rotate;

    return { enq, deq, all, see, ise, isf, rst, rot };
  }
}
