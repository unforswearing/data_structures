class RingBuffer {
  pointer = 0;
  collector = {};

  get(item) {
    if (!item) return undefined;
    return this.collector[item];
  }

  add(item) {
    if (!item) return undefined;
    return item;
  }
}
