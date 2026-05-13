/*
 * @lc app=leetcode.cn id=1472 lang=javascript
 *
 * [1472] 设计浏览器历史记录
 */

// @lc code=start
/**
 * @param {string} homepage
 */

var PageNode = function(url) {
    this.val = url;
    this.prev = null;
    this.next = null;
}

PageNode.prototype.insert = function(node) {
    node.prev = this;
    this.next = node;
}
var BrowserHistory = function(homepage) {
    this.cursor = new PageNode(homepage);;
};

/** 
 * @param {string} url
 * @return {void}
 */
BrowserHistory.prototype.printPath = function() {
    console.log('printPath start');
    let cur = this.cursor;
    while(cur) {
        console.log(cur.val);
        cur = cur.prev;
    }
}
BrowserHistory.prototype.visit = function(url) {
    let node = new PageNode(url);
    this.cursor.insert(node);
    this.cursor = node;
};

/** 
 * @param {number} steps
 * @return {string}
 */
BrowserHistory.prototype.back = function(steps) {
    while(steps > 0 && this.cursor.prev) {
        this.cursor = this.cursor.prev;
        steps--;
    }
    return this.cursor.val;
};

/** 
 * @param {number} steps
 * @return {string}
 */
BrowserHistory.prototype.forward = function(steps) {
    while(steps > 0 && this.cursor.next) {
        this.cursor = this.cursor.next;
        steps--;
    }
    return this.cursor.val;
};

/** 
 * Your BrowserHistory object will be instantiated and called as such:
 * var obj = new BrowserHistory(homepage)
 * obj.visit(url)
 * var param_2 = obj.back(steps)
 * var param_3 = obj.forward(steps)
 */
// @lc code=end

