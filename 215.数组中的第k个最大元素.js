/*
 * @lc app=leetcode.cn id=215 lang=javascript
 *
 * [215] 数组中的第K个最大元素
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
var findKthLargest = function(nums, k) {
  function quickSelect(left, right) {
    let pivot = nums[left];
    let i = left;
    let j = right;

    while(i < j) {
      while(i < j && nums[j] >= pivot) {
        j--;
      }
      nums[i] = nums[j];
      while(i < j && nums[i] <= pivot) {
        i++;
      }
      nums[j] = nums[i];
    }

    nums[i] = pivot;
    return i;
  }
};
// @lc code=end

