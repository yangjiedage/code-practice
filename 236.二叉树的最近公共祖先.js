/*
 * @lc app=leetcode.cn id=236 lang=javascript
 *
 * [236] 二叉树的最近公共祖先
 */

// @lc code=start
/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @param {TreeNode} p
 * @param {TreeNode} q
 * @return {TreeNode}
 */
var lowestCommonAncestor = function(root, p, q) {
  if (!root) {
    return null;
  }

  console.log(root.val);
  // if (root === p || root === q) {
  //   return root;
  // }
  const left = lowestCommonAncestor(root.left, p, q);
  const right = lowestCommonAncestor(root.right, p, q);

  // if (left && right) {
  //   return root;
  // }
  // if (left) {
  //   return left;
  // }
  // if (right) {
  //   return right;
  // }
};

/**
  这个方法其实就是在处理当前节点，递归调用前的逻辑是递归结束的条件处理，是从上到下遍历时的处理，对于这代码就是当发现节点是p、q或者触底就不在遍历之后的子树，递归调用后的逻辑是回溯处理，把分别获取到的左子树和右子树的结果开始处理，如果左子树和右子树都发现，那么代表当前节点就是祖先，如果左子树有右子树没有，那么代表全部都在左子树，那么左子树找到的节点就是公共祖先，反之亦然
 */
// @lc code=end

