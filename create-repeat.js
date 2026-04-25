function createRepeat(fn , repeat, interval) {
  return (...args) => {
    function execFn() {
      setTimeout(() => {
        fn(...args);
        repeat--;
        if (repeat > 0) {
          execFn();
        }
      }, interval * 1000)
    }
    execFn();
  }
}

createRepeat(console.log, 3, 4)('hello')

function objToArray(obj) {
  const res = []
  for(let key in obj) {
    console.log(key, obj[key]);
    const [op, value] = obj[key];
    res.push({
      key,
      op,
      value,
    })
  }
}
