const obj = {
    a: 1,
    b: 2,
    [Symbol.iterator]: function*() {
        for (let key in this) {
            yield this[key];
        }
    }
}


var [a, b] = obj;
console.log(a, b);
// g = obj[Symbol.iterator]();
// console.log(g.next());
// console.log(g.next());
function *gen(x) {
  const y = yield x * 2;
  return y
}

const g = gen(2);
const res1 = g.next() // res1 {value: 4, done: false};
console.log(res1);

const res2 = g.next() // res2 {value: undefined, done: true};
console.log(res2);
