/*
 * @lc app=leetcode.cn id=15 lang=javascript
 *
 * [15] 三数之和
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @return {number[][]}
 */
var threeSum = function(nums) {
  nums.sort((a, b) => a - b);
  const res = [];
  for(let i = 0; i < nums.length; i++) {
    let left = i + 1;
    let right = nums.length - 1;
    if (nums[i] > 0) break;
    if (nums[i] === nums[i - 1]) continue;
    while(left < right) {
      const sum = nums[i] + nums[left] + nums[right];
      if (sum > 0) {
        right--;
        continue;
      }
      if (sum < 0) {
        left++;
        continue;
      }
      if (sum === 0) {
        res.push([nums[i], nums[left], nums[right]]);

        while(left < right && nums[left] === nums[left + 1]) {
          left++;
        }
        while(left < right && nums[right] === nums[right - 1]) {
          right--;
        }
        left++;
        right--;
      }
    }
  }

  return res;
};
// @lc code=end

