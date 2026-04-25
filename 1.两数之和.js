/*
 * @lc app=leetcode.cn id=1 lang=javascript
 *
 * [1] 两数之和
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
var twoSum = function(nums, target) {
  const map = new Map();
  for(let i = 0; i < nums.length; i++) {
    const completeNum = target - nums[i]
    if (map.has(completeNum)) {
      return [map.get(completeNum), i]
    }
    map.set(nums[i], i);
  }

  return []
};
// @lc code=end

