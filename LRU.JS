class LRU {
  constructor(capacity) {
    this.capacity = capacity;
    this.cache = new Map();
  }
  get(key) {
    if (this.cache.has(key)) {
      this.cache.delete(key);
      this.cache.set(key, this.cache.get(key));
      return this.cache.get(key);
    }
    return -1;
  }
  put(key, value) {
    if(this.cache.has(key)) {
      this.cache.delete(key);
    }
    this.cache.set(key, value);
    if(this.cache.size > this.capacity) {
      this.cache.delete(this.cache.keys().next().value);
    }
  }
}