/*
 * @lc app=leetcode.cn id=2296 lang=javascript
 *
 * [2296] 设计一个文本编辑器
 */

// @lc code=start

var TextEditor = function() {
    this.cursorIndex = 0;
    this.textContent = '|';
};

/** 
 * @param {string} text
 * @return {void}
 */
TextEditor.prototype.addText = function(text) {
   this.textContent = this.textContent.slice(0, this.cursorIndex) + text + this.textContent.slice(this.cursorIndex);
   this.cursorIndex += text.length;

};

/** 
 * @param {number} k
 * @return {number}
 */

TextEditor.prototype.getCursorLeftContent = function() {
    return this.textContent.slice(0, this.cursorIndex);
}

TextEditor.prototype.getCursorRightContent = function() {
    return this.textContent.slice(this.cursorIndex + 1, this.textContent.length);
}
TextEditor.prototype.deleteText = function(k) {
    let deleteStart = Math.max(0, this.cursorIndex - k);
    let deleteEnd = this.cursorIndex
    this.cursorIndex = deleteStart;
    this.textContent = this.textContent.slice(0, deleteStart) + this.textContent.slice(deleteEnd);
    return deleteEnd - deleteStart;
};

/** 
 * @param {number} k
 * @return {string}
 */
TextEditor.prototype.cursorLeft = function(k) {
    const textOriginContent = this.getCursorLeftContent() + this.getCursorRightContent();
    this.cursorIndex = Math.max(0, this.cursorIndex - k);
    this.textContent = textOriginContent.slice(0, this.cursorIndex) + '|' + textOriginContent.slice(this.cursorIndex);
    const returnLen = Math.min(this.cursorIndex, 10);
    const start = Math.max(0, this.cursorIndex - returnLen);
    return this.textContent.slice(start, this.cursorIndex);
    
};

/** 
 * @param {number} k
 * @return {string}
 */
TextEditor.prototype.cursorRight = function(k) {
    const textOriginContent = this.getCursorLeftContent() + this.getCursorRightContent();
    this.cursorIndex = Math.min(textOriginContent.length, this.cursorIndex + k);
    this.textContent = textOriginContent.slice(0, this.cursorIndex) + '|' + textOriginContent.slice(this.cursorIndex);
    const returnLen = Math.min(this.cursorIndex, 10);
    const start = Math.max(0, this.cursorIndex - returnLen);
    return this.textContent.slice(start, this.cursorIndex);
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

