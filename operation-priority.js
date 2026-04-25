function operationPriority(arr) {
  arr = arr.split('');
  const res = [];
  for(let i = 0; i < arr.length; i++) {
    if(arr[i] === '*' || arr[i] === '/') {
      let start = i;
      while(arr[i] && arr[i] !== '+' && arr[i] !== '-') {
        i += 1;
      }
      while(/\d+/.test(arr[start - 1])) {
        start -= 1;
      }
      res.push([start, i]);
    }
  }
  for(let i = 0; i < res.length; i++) {
    if (i === 0) {
      console.log(arr.slice(0, res[i][0]).join(''));
    }
    const [start, end] = res[i];
    console.log(start, end);
    console.log(arr.slice(start, end).join(''));
    if (i !== res.length - 1) {
      console.log(arr.slice(end, res[i+1][0]).join(''));
    }
    if (i === res.length - 1) {
      console.log(arr.slice(res[i][1], arr.length).join(''));
    }
  }
}

// console.log(operationPriority('11+12-23*34+5/2*4+10/5'))
console.log(operationPriority('11+2-3*4+5/2*4+10000/5+10'));