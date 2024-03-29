/* 
  括号运算符用于控制表达式中的运算优先级
  包裹括号的都为表达式，单个括号没有值则为函数的执行符号 
  括号运算符优先级最高 = 19
  https://developer.mozilla.org/docs/Web/JavaScript/Reference/Operators/Operator_precedence
*/

var a = 10;
// 这里将解析为 (function b() {}) 将忽略函数名
if(function b() {}){
  a += typeof b;
}
console.log(a); // 10undefined

function foo1(x){
  console.log(arguments); // 1 2 3 4 5
  return x;
}
foo1(1, 2, 3, 4, 5);

function foo2(x){
  console.log(arguments); // 5
  return x;
}(1, 2, 3, 4, 5);
    
;(function foo3(x){
  console.log(arguments); // 1 2 3 4 5
  return x;
})(1, 2, 3, 4, 5);