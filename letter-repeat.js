/*
  利用字符重复出现的次数,编写一种方法,实现基本的字符串压缩功能。比如,字
符串aabcccccaaa会变为a2b1c5a3
*/

function compress(str) {
  let res = '';
  for(let i = 0; i < str.length; i++) {
    let count = 1;
    while(str[i] === str[i+1]) {
      count++;
      i++;
    }
    res += str[i] + count;
    count = 1;
  }
  return res;
}

console.log(compress('aabcccccaaagfe'))