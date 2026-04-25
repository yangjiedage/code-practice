let arr2 = [1,2,3,[4,5,[6,7,[8]]]];

function flatArr(arr) {
 
  function flatArrInter(arr) {
    const res = []
    for (let i = 0; i< arr.length; i++) {
      if (Array.isArray(arr[i])) {
        res.push(...flatArrInter(arr[i]))
      } else {
        res.push(arr[i])
      }
    }
    return res;
  }

  return flatArrInter(arr);
}

console.log(flatArr(arr2));