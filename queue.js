class Queue {
  limit = undefined;
  ph = Symbol(false);
  q = [];
  idx = 0;
  constructor(limit = 0) {
    this.limit = limit;
    const enqueue = (item) => {
      this.q[this.idx] = item;
      this.idx++;
      return this.q;
    };
    const dequeue = () => {
      const headValue = this.q[0];
      this.q[0] = this.ph;
      this.q.filter((item) => item !== this.ph);
      return headValue;
    };
    const dump = () => {
      return this.q;
    };
    const peek = () => {
      return this.q[0];
    };
    const isEmpty = () => {
      return this.q.length < 1;
    };
    const isFull = () => {
      return this.q.length === this.limit;
    };
    const reset = () => {
      this.q = [];
      return this.q;
    };
    const rotate = (numItems) => {
      let head = this.idx;
      let headContent = this.q[head];

      this.q.push(headContent);
      this.q.splice(head, this.q.length - 1);
    };
    return {
      enqueue,
      dequeue,
      dump,
      isEmpty,
      peek,
      isFull,
      reset,
      rotate,
    };
  }
}

let q = new Queue(2);

q.enqueue("hi");
console.log(q.dump());

q.dequeue();
console.log(q.dump());
