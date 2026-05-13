/*
 * @lc app=leetcode.cn id=146 lang=javascript
 *
 * [146] LRU 缓存
 */

// @lc code=start
/**
 * @param {number} capacity
 */
var LinkNode = function(key, val) {
    this.val = val;
    this.key = key;
    this.prev = null;
    this.next = null;
}
function DoubleLinkedList() {
    this.head = new LinkNode();
    this.tail = new LinkNode();
    this.head.next = this.tail;
    this.tail.prev = this.head;
}

DoubleLinkedList.prototype.moveToHead = function(node) {
   this.head.next = node;
   node.prev = this.head;
   node.next = this.head.next;
   this.head.next.prev = node;
}

DoubleLinkedList.prototype.removeNode = function(node) {
    node.prev.next = node.next;
    node.next.prev = node.prev;
}

DoubleLinkedList.prototype.removeTail = function() {
    let tail = this.tail.prev;
    this.removeNode(tail);
    return tail;
}
var LRUCache = function(capacity) {
    this.capacity = capacity;
    this.cache = new Map();
    this.dll = new DoubleLinkedList();
};

/** 
 * @param {number} key
 * @return {number}
 */
LRUCache.prototype.get = function(key) {
    if (this.cache.has(key)) {
        let node = this.cache.get(key);
        this.dll.moveToHead(node);
        return node.val;
    }
    return -1;
};

/** 
 * @param {number} key 
 * @param {number} value
 * @return {void}
 */
LRUCache.prototype.put = function(key, value) {
    if (this.cache.has(key)) {
        let node = this.cache.get(key);
        node.val = value;
        this.dll.moveToHead(node);
    } else {
        let node = new LinkNode(key, value);
        this.cache.set(key, node);
        this.dll.moveToHead(node);
    }
    if (this.cache.size > this.capacity) {
        let tail = this.dll.removeTail();
        this.cache.delete(tail.key);
    }
};

/** 
 * Your LRUCache object will be instantiated and called as such:
 * var obj = new LRUCache(capacity)
 * var param_1 = obj.get(key)
 * obj.put(key,value)
 */
// @lc code=end

