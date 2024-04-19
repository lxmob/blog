/*
  JS 严格模式
  消除 JS 语法的一些不合理、不严谨之处，减少一些怪异行为
  消除代码运行的一些不安全之处，保证代码运行的安全
  提高编译器效率，增加运行速度
  注意 IE9 及以下 IE 不支持严格模式
*/

'use strict';

// 1.不能使用 with 表达式
var num = 1,
  obj = { num: 2 };
function test () {
  var num = 3;
  // with 函数能够通过传递的参数不同改变内部代码执行时的作用域
  // with(test){
  // with(window){
  // with(obj){
  //   console.log(num);
  // }
}
test();

// 2.不能声明暗示全局变量属性
// globalAttr = 10;

// 3.不能删除系统设计的原有属性
// delete Object.prototype;

// 4.不能使用函数 callee 与 caller
function foo () {
  // console.log(arguments.callee);
  // console.log(foo.caller);
}
foo();

// 5.函数中的 this 值不再是 window
function bar () {
  // console.log(this); // undefined
}
bar();

// 6.函数形参不能重复
// function zen(a, a){};

// 7.eval 函数在严格模式下具有自己的作用域
eval('var num = 20; console.log(num)'); // eval 会将传入的字符串当作 JS 代码来执行
console.log(num); // 1
