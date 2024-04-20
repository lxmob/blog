/* 
  函数是一个固定功能或程序的代码段
  在这个封装体中需要一个入口和一个出口，而入口就是参数，出口就是返回值

  函数是对特定的功能进行抽象
  实现高内聚、低耦合、模块的单一责任制，使用函数能够对代码更好的解耦合
*/

/*
  创建函数的方法
  1.函数声明
  2.函数表达式
  3.匿名函数表达式（函数字面量）
*/

function fn (参数) {
  // 执行函数内部的语句
  console.log('fn');
}

// 将一个函数声明赋值给变量，此时属于函数表达式
// 会忽略原有函数名称，在外部调用时 text 函数是不可见的
// 但是在函数内部我们可以访问它，对它进行自调用（递归）
var fn3 = function text () {
  console.log('fn3');
  // text()
};
console.log(fn3.name); // text
fn3(); // fn
// text(); // ReferenceError

// 函数名字
var f = function () {};
console.log(f.name); // f
console.log(new Function().name); // anonymous 匿名的
console.log(f.bind(null).name); // bound f

/* 
  形参与实参
  形参形式上进行占位，可以通过函数名称 .length 来获取形参个数
  实参传递实际参数，当通过调用函数名称传递的参数就是实参
  在函数内部通过 arguments 来获取实参列表
*/
function add (a, b) {
  // 函数形参的个数
  console.log(add.length); // 10 20
  // 函数实参的伪数组
  console.log(arguments); // 10 20 30
}
add(10, 20, 30); // 实际参数

/*
  形参存放栈内存，实参存放在堆内存，形参和实参具有映射关系
  形参赋值实参也会跟着变，前提需要实参传递，映射两者对应关系
  但是实参的赋值，形参是不会改变的
*/
function add2 (a, b) {
  a = 20;
  b = 10;
  console.log(arguments[0]); // 20
  console.log(arguments[1]); // undefined
  arguments[1] = 30;
  console.log(arguments[1], b); // 30 10
}
add2(10);

/* 
  函数的终止与返回值
  函数在执行完毕后默认情况下返回的值是 undefined，通过在函数内使用 return 关键字
  可以改变函数的返回值，同时也可以中止函数内后续代码的执行
*/
function increment (a, b) {
  if (!a) {
    return;
  }
  return a + b;
}
console.log(increment()); // undefined
console.log(increment(1, 2)); // 3
