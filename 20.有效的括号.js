/*
 * @lc app=leetcode.cn id=20 lang=javascript
 *
 * [20] 有效的括号
 */

// @lc code=start
/**
 * @param {string} s
 * @return {boolean}
 */
var isValid = function(s) {
  const sStack = [];
  const map = {
    ')': '(',
    ']': '[',
    '}': '{'
  };
  for (let i = 0; i < s.length; i++) {
    const char = s[i];
    if (char in map) {
      if (sStack.pop() !== map[char]) {
        return false;
      }
      continue;
    }

    sStack.push(char)
  }

  return sStack.length === 0;
};
// @lc code=end

