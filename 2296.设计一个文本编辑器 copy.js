/*
 * @lc app=leetcode.cn id=2296 lang=javascript
 *
 * [2296] 设计一个文本编辑器
 */

// @lc code=start

var Node = function(val) {
    this.val = val;
    this.next = null;
    this.prev = null;
}

Node.prototype.insert = function(val) {
    const node = new Node(val);
    node.next = this;
    node.prev = this.prev;
    if (this.prev) {
        this.prev.next = node;
    }
    this.prev = node;
}

Node.prototype.remove = function() {
    let prevNode = this.prev;
    this.prev = prevNode.prev;
    if (this.prev) {
        this.prev.next = this;
    }
}

Node.prototype.range = function(end) {
    let cur = this;
    let res = '';
    while(cur !== end) {
        res += cur.val;
        cur = cur.next;
    }
    return res;
}
var TextEditor = function() {
   this.cursor = new Node('\0');
};

/** 
 * @param {string} text
 * @return {void}
 */
TextEditor.prototype.addText = function(text) {
   for(let i = 0; i< text.length; i++) {
    this.cursor.insert(text[i]);
   }
};

/** 
 * @param {number} k
 * @return {number}
 */


TextEditor.prototype.deleteText = function(k) {
    let count = 0;
    while(k > 0 && this.cursor.prev) {
        this.cursor.remove();
        k--;
        count++;
    }
    return count;
};

/** 
 * @param {number} k
 * @return {string}
 */
TextEditor.prototype.cursorLeft = function(k) {
    while(k > 0 && this.cursor.prev) {
        this.cursor = this.cursor.prev;
        k--;
    }
    let head = this.cursor;

    for(let i = 0; i< 10 && head.prev; i++) {
        head = head.prev;
    }
    return head.range(this.cursor);
};

/** 
 * @param {number} k
 * @return {string}
 */
TextEditor.prototype.cursorRight = function(k) {
    while(k > 0 && this.cursor.next) {
        this.cursor = this.cursor.next;
        k--;
    }
    let head = this.cursor;

    for(let i = 0; i< 10 && head.prev; i++) {
        head = head.prev;
    }
    return head.range(this.cursor);
};

/** 
 * Your TextEditor object will be instantiated and called as such:
 * var obj = new TextEditor()
 * obj.addText(text)
 * var param_2 = obj.deleteText(k)
 * var param_3 = obj.cursorLeft(k)
 * var param_4 = obj.cursorRight(k)
 */
// @lc code=end

