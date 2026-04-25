function *gen(x) {
    console.log('start');
    const y = yield x * 2;
    return y;
}

// const g = gen(1);
// console.log(g.next());
// console.log(g.next());

function asyncFunc(params, cb) {
    setTimeout(() => {
        cb({
            params,
            newParams: 'hhh'
        });
    }, 1000);
}


function asyncFunPromise(params) {
    return new Promise((resolve, reject) => {
       setTimeout(() => {
            resolve({
                params,
                newParams: 'promise-hhh'
            });
        }, 1000);
    })
}
const thunkify = (fn) => {
    return (...args) =>  {
        return (cb) => {
            return fn(...args, cb);
        }
    }
}

const thunkifyAsyncFunc = thunkify(asyncFunc);
// const asyncFuncThunk = thunkifyAsyncFunc('aaa');

// asyncFuncThunk((res) => {
//     console.log('asyncFuncThunk', res);
//     return res;
// })

function *asyncFuncWithGen() {
    const res = yield thunkifyAsyncFunc('aaa');
    console.log('asyncFuncWithGen', res);
    const res2 = yield thunkifyAsyncFunc('bbb');
    console.log('asyncFuncWithGen', res2);
    return 'done'
}

function *asyncFuncWithGenPromise() {
    const res = yield asyncFunPromise('aaa');
    console.log('asyncFuncWithGenPromise', res);
    const res2 = yield asyncFunPromise('bbb');
    console.log('asyncFuncWithGenPromise', res2);
    return 'done'
}

// const g2 = asyncFuncWithGenPromise();
// g2.next().value.then(res => {
//   g2.next(res).value.then(res2 => {
//     const result = g2.next(res2);
//     if (result.done) {
//         console.log('done', result.value);
//     }
//   })
// })
// const g = asyncFuncWithGen();
// g.next().value(res => {
//     console.log('g next', res);
//     g.next(res).value(res2 => {
//         console.log('g next2', res2);
//         g.next(res2);
//     })
// })

const run = generator => {
    const g = generator();
    const next = (res) => {
        const result = g.next(res);
        if (result.done) {
            return result.value;
        }
        result.value(next);
    }
    next();
}

// run(asyncFuncWithGen);

const runPromise = generator => {
    return new Promise((resolve, reject) => {
        const g = generator();
        const next = (res) => {
            const result = g.next(res);
            if (result.done) {
                resolve(result.value);
                return;
            }
            if (result.value instanceof Promise) {
                result.value.then(next, (err) => reject(g.throw(err).value));
            } else {
                result.value(next);
            }
        }
        next();
    })
}

function run22(generator) {
  const g = generator();
  return new Promise((resolve, reject) => {
    const next = (res) => {
      const result = g.next(res);
      if (result.done) {
        resolve(result.value);
        return;
      }
      if (result.value instanceof Promise) {
        result.value.then(next)
      } else {
        result.value(next)
      }
    }
    next();
  })
}
run22(asyncFuncWithGenPromise).then(res => {
    console.log('runPromise', res);
}).catch(err => {
    console.log('runPromise err', err);
})
