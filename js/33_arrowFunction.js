/*
  ES6 箭头函数表达式
  原本的样式 () => {} 等同于 function (){}

  箭头函数的特点
  1.形参仅有一个参数时可以省略括号
  2.函数体仅有一条执行语句时可以省略花括号，并且作为该函数的返回值
  3.函数内没有 arguments 对象
  4.函数被调用中的 this 是由外部函数作用域决定
  5.不能够作为构造函数来使用
  6.在 generator 函数中 yield 命令不能生效
*/

let foo1 = a => a,
    foo2 = function (a) { return a; }, // 等价
    foo3 = (a, b) => a + b,
    foo4 = () => 1;

let foo5 = (a, b) => {
  console.log(arguments); // Uncaught ReferenceError: arguments is not define
  return a + b;
}
// foo5();

function foo10 () {
  console.log(arguments);
  setTimeout(() => {
    console.log(this); // global
    console.log(arguments); // 父级的 arguments
  })
}
// foo10(1, 2, 3);

let foo6 = (...args) => {
  // 前面例子中说明箭头函数中没有 arguments 对象
  // 如果就是想要在箭头函数中获取参数列表呢
  // 通过 ... spread / rest 展开或收集运算符
  console.log(args); // [1, 2]
  console.log(args.__proto__.constructor); // 真正的数组对象而不是类数组
}
// foo6(1, 2);

let foo7 = (a, b, c) => {
  console.log(a, b, c); // 1 2 3
}
// foo7(...[1, 2, 3]); // spread 展开运算
// foo7.apply(null, [1, 2, 3]); // 通过 ES5 方式模拟展开运算

let foo8 = (a, b, ...args) => {
  console.log(a, b, args); // 1 2 [3, 4] rest 收集参数必须是最后一个参数
}
// foo8(1, 2, 3, 4);

// 注意 rest 收集参数不会作为函数的形参长度
// console.log((function test(a){}).length); // 1
// console.log((function test(...args){}).length); // 0
// console.log((function test(a, ...args){}).length); // 1

// 函数默认值的形式也不会作为函数的形参长度
// console.log((function test(a, b = 1, ...args){}).length); // 1 

function foo9 () {
  console.log(this);
  // return function() {
  return () => {
    console.log(this.a); // 由外部函数调用时作用域所决定的 this 值
  }
}
let obj1 = { a: 1 },
    obj2 = { a: 2 },
    // bar = foo9(); // global undefined
    bar = foo9.call(obj1); // obj1 1
// bar 变量接收函数虽然被定义在全局但是箭头函数 this 已经被确定
// 通过 call、apply、bind 是无法再次改变箭头函数 this 值
// bar.call(obj2);
// bar.apply(obj2);
// bar.bind(obj2)();

let p = {
  eat () {
    console.log(this);
  },
  drink: () => {
    console.log(this); // p 所处的作用域是 global
  }
}
// p.eat(); // p
// p.drink(); // global

// 案例
function foo10 () {
  // return () => {
  //   return () => {
  //     return () => {
  return function () {
    return function () {
      return function () {
        console.log('id:', this.id);
      }
    }
  }
}
var f = foo10.call({ id: 1 });
var t1 = f.call({ id: 2 })()();
var t2 = f().call({ id: 3 })();
var t3 = f()().call({ id: 4 });
console.log(t1, t2, t3); // 'id:' 1 * 3
