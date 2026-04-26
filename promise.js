function resolvePromise(x, resolve, reject) {
  if (x instanceof MyPromise) {
    // 如果返回 Promise，等待其完成
    x.then(resolve, reject);
  } else {
    // 普通值，直接 resolve
    resolve(x);
  }
}
class MyPromise {
  constructor(executor) {
    this.state = 'pending';
    this.value = undefined;
    this.reason = undefined;
    this.fulfilledFunc = [];
    this.rejectedFunc = [];
    const resolveFunc = (value) => {
      if (this.state === 'pending') {
        this.state = 'fulfilled';
        this.value = value;
        this.fulfilledFunc.forEach(func => func());
      }
    }
    const rejectFunc = (reason) => {
      if (this.state === 'pending') {
        this.state = 'rejected';
        this.reason = reason;
        this.rejectedFunc.forEach(func => func());
      }
    }
    try {
      executor(resolveFunc, rejectFunc);
    } catch (error) {
      rejectFunc(error);
    }
  }
  then(onFulfill, onRejected) {
    onFulfill = typeof onFulfill === 'function' ? onFulfill : value => value;
    onRejected = typeof onRejected === 'function' ? onRejected : reason => { throw reason };

    return new MyPromise((resolve, reject) => {
      const microResolve = () => {
        queueMicrotask(() => {
          try {
            const x = onFulfill(this.value);
            resolvePromise(x, resolve, reject);
          } catch (error) {
            reject(error);
          }
        });
      }
      const microRejected = () => {
        queueMicrotask(() => {
          try {
            const x = onRejected(this.reason);
            resolvePromise(x, resolve, reject);
          } catch (error) {
            reject(error);
          }
         });
      }
      if (this.state === 'pending') {
        this.fulfilledFunc.push(microResolve);
        this.rejectedFunc.push(microRejected)
      } else if (this.state === 'fulfilled') {
        microResolve()
      } else {
        microRejected()
      }
    })
  }
  finally(onFinally) {
    let P = this.constructor;
    // return this.then(
    //   value  => P.resolve(onFinally()).then(() => value), // 成功时：执行 callback，完成后返回原值
    //   reason => P.resolve(onFinally()).then(() => { throw reason }) // 失败时：执行 callback，完成后抛出原错
    // );
    return this.then((value) => {
        onFinally();
        return value;
    }, (err) => {
        onFinally();
        throw err;
    });
  }
  static resolve(value) {
    return new MyPromise(resolve => resolve(value));
  }
  static reject(reason) {
    return new MyPromise((resolve, reject) => reject(reason));
  }
  catch(onRejected) {
    return this.then(null, onRejected);
  }
}
// Promise.resolve().then(() => {
//     console.log('1');
//     return Promise.resolve('2');
// }).then(res => {
//     console.log(res);
// })

// Promise.resolve().then(() => {
//     console.log('3');
// }).then(() => {
//     console.log('4');
// }).then(() => {
//     console.log('5');
// }).then(() => {
//     console.log('6');
// }).then(() => {
//     console.log('7');
// }).then(() => {
//     console.log('8');
// })

// setTimeout(() => {
//     console.log('9');
// }, 0);


// MyPromise.resolve().then(() => {
//     console.log('b1');
// }).then(() => {
//     console.log('b2');
// }).then(() => {
//     console.log('b3');
// })
 
// MyPromise.resolve().then(() => {
//     console.log('a1');
// }).then(() => {
//     console.log('a2');
// }).then(() => {
//     console.log('a3');
// }).then(() => {
//     console.log('a4');
// }).then(() => {
//     console.log('a5');
// }).then(() => {
//     console.log('a6');
// })


// new MyPromise((resolve, reject) => {
//     console.log('state', this.state);
//     resolve('1');
// })

MyPromise.reject('err!!').finally((res) => {
    console.log('success', res);
}).then(res => {
    console.log('then', res);
}, err => {
    console.log('err', err);
}).catch(err => {
    console.log('catch', err);
})

// MyPromise.resolve(1).then(res => {
//     console.log('promise1 resolve', res);
//     return 2
// }, err => {
//     console.log('promise1 reject', err);
// }).then(res => {
//     console.log('promise2 resolve', res);
//     throw 3
// }, err => {
//     console.log('promise2 reject', err);
// }).then(res => {
//     console.log('promise3 resolve', res);
// }, err => {
//     console.log('promise3 reject', err);
//     return 4;
// }).then(res => {
//     console.log('promise4 resolve', res);
// }, err => {
//     console.log('promise4 reject', err);
// })


MyPromise.resolve('p1').then(res => {
  console.log('res1', res);
  throw 'reject111'
}).then(null, (reject) => {
  console.log('reject2', reject);
  return 'res2'
}).finally((res) => {
  console.log('final3', res)
}).then(res => {
  console.log('res4', res)
})