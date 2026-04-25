Function.prototype.myApply = function(context, args = []) {
  context = context || window;
  const fnKey = Symbol('fn');
  context[fnKey] = this;  
  const res = context[fnKey](...args);
  delete context[fnKey];
  return res;
}

Function.prototype.myBind = function(context, ...args) {
  context = context || window;
  const fnKey = Symbol('fn');
  context[fnKey] = this;  
  return function() {
    return context[fnKey](...args, ...arguments);
  }
}

function sayName() {
  console.log(...arguments)
  console.log(this.name);
}

const obj = {
  name: 'obj',
}

const sayObjFunc  = sayName.myBind(obj, 123, 'aaaa');
sayObjFunc.myApply({name: 'jjj'});

function myNew(Func, ...args) {
  let obj = {};
  obj.__proto__ = Func.prototype;
  const res = Func.myApply(obj, args);
  return res instanceof Object ? res : obj;
}

function Animal(name) {
  this.name = name;
  this.sayName = function() {
    console.log(this.name);
  }
}

const a1 = myNew(Animal, 'monkey')

a1.sayName.call({name: 'a1'});

/**
 * 防抖节流
 */

function debounce(fn, delay) {
  let timer = null;
  return function () {
    if (timer) {
      clearTimeout(timer)
    }
    timer = setTimeout(() => {
      fn.apply(this, arguments);
    }, delay)
  }
}
function throttle(fn, delay) {
  let start = Date.now();
  return function () {
    let now = Date.now();
    if (now - start >= delay) {
      fn.apply(this, arguments);
      start = now;
    }
  }
}

function shallowCopy(obj, isDeep) {
  if (typeof obj !== 'object' || obj === null) {
    return obj
  }
  const res = {}
  for (let key in obj) {
    res[key] = !isDeep ? obj[key] : shallowCopy(obj[key]);
  }
  return res;
}


const obj1 = {
  a: 1,
  b: {
    c: 2,
  }
}

const shallowObj = shallowCopy(obj1);
const deepObj = deepCopy(obj1);

console.log(shallowObj.b === obj1.b)
console.log(deepObj, deepObj.b === obj1.b)
