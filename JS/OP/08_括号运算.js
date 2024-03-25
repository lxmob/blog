/* 
  括号运算符用于控制表达式中的运算优先级
  包裹括号的都为表达式，单个括号没有值则为函数的执行符号 
  括号运算符优先级最高 = 19
  https://developer.mozilla.org/docs/Web/JavaScript/Reference/Operators/Operator_precedence
*/

var a = 10;
// 解析为立即执行函数但是并没有被执行
// 匿名函数忽略函数名称 (function b() {})
if(function b() {}){
  a += typeof b;
}
console.log(a); // 10undefined

function foo1(x){
  console.log(arguments); // 1 2 3 4 5
  return x;
}
// 函数调用时实际传递的参数
// 映射到 arguments 上
foo1(1, 2, 3, 4, 5);

// foo2 函数作为函数声明
// 并没有被执行符号所包裹，所以不是表达式
// JS 在解析后面括号内容时，会认为是括号运算返回最后一个值
// foo2 函数加上执行符号后调用，传递参数
function foo2(x){
  console.log(arguments); // 5
  return x;
}(1, 2, 3, 4, 5);

;(function foo3(x){
  console.log(arguments); // 1 2 3 4 5
  return x;
})(1, 2, 3, 4, 5);