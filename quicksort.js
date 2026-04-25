function quickSort(arr) {
  if (!arr.length || arr.length === 1) {
    return arr;
  }
  let pivot = arr[0];

  let leftArr = [];
  let rightArr = [];

  for (let i = 1; i < arr.length; i++) {
    if (arr[i] < pivot) {
      leftArr.push(arr[i]);
    } else {
      rightArr.push(arr[i]);
    }
  }
  return [...quickSort(leftArr), pivot, ...quickSort(rightArr)]
}

const testArr = [2,5,7,1,3,7,45,3];

console.log(quickSort(testArr))