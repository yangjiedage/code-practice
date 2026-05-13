/*
 * @lc app=leetcode.cn id=432 lang=javascript
 *
 * [432] 全 O(1) 的数据结构
 */

// @lc code=start

var Node = function(val) {
    this.vals = new Set([val]);
    this.count = 1;
    this.next = null;
    this.prev = null;
}

Node.prototype.addNode = function(val) {
   if (this.next && this.next.count === this.count + 1) {
      this.next.vals.add(val);
      this.vals.delete(val);
      return
   }

    const nextNode = new Node(val);
    let currentNext = this.next;
    this.next = nextNode;
    nextNode.prev = this;
    nextNode.count = this.count + 1;
    this.vals.delete(val);
    if (currentNext) {
        nextNode.next = currentNext;
        currentNext.prev = nextNode;
    }
}

Node.prototype.removeNode = function(val) {
   if (this.prev) {
       this.prev.vals.add(val);
        this.vals.delete(val);
   } else {
      this.vals.delete(val);
   }
}

var AllOne = function() {
    
};

/** 
 * @param {string} key
 * @return {void}
 */
AllOne.prototype.inc = function(key) {
    
};

/** 
 * @param {string} key
 * @return {void}
 */
AllOne.prototype.dec = function(key) {
    
};

/**
 * @return {string}
 */
AllOne.prototype.getMaxKey = function() {
    
};

/**
 * @return {string}
 */
AllOne.prototype.getMinKey = function() {
    
};

/** 
 * Your AllOne object will be instantiated and called as such:
 * var obj = new AllOne()
 * obj.inc(key)
 * obj.dec(key)
 * var param_3 = obj.getMaxKey()
 * var param_4 = obj.getMinKey()
 */
// @lc code=end

