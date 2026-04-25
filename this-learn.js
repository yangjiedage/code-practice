const obj = {
    fn1: () => {
        console.log(this);
    },
    fn2: function() {
        console.log(this);
    }
}

obj.fn1();
obj.fn2();

const x = new obj.fn1(); //  执行报错
console.log(x);
const y = new obj.fn2();
console.log(y);
