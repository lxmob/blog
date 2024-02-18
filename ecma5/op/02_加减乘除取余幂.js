/* 
  加减乘除取余
  + - * / % **
  幂优先级 = 14
  乘除取余优先级 = 13
  加减优先级 = 12
*/

var a = "str" + 1 + 1;
var b = 1 + 1 + "str" + 1 + undefined;
var c = null;
console.log(a); // 'str11' 
console.log(b); // '2str1undefined'
console.log(c + 2); // 2 => Number(null = 0) + 2 = 2

console.log(10 - 5); // 5
console.log(5 - 2.5); // 2.5
console.log(3 - null); // 3
console.log(5 - true); // 4 => 5 - Number(true = 1) = 4
console.log(2 - 'str'); // NaN => 2 - Number('str' = NaN) = NaN

console.log(3 * 4); // 12
console.log(-3 * 4); // -12
console.log('3' * 2); // 6 => Number('3' = 3) * 2 = 6
console.log('str' * 2); // NaN => Number('str' = NaN) * 2 = NaN

console.log(6 / 3); // 2
console.log(6 / '3'); // 2
console.log(6 / 0); //  Infinity
console.log(0 / 0); // NaN
console.log(1 / 0); // Infinity
console.log(-1 / 0); // -Infinity
console.log("str" / 0); // NaN
console.log(0 / 2); // 0
console.log(-0 / 1); // -0
console.log("1" / 1); // 1
console.log(null / 1); // 0
console.log("null" / 1); // NaN
console.log(true / 1); // 1
console.log("true" / 1); // NaN

console.log(13 % 5); // 3
console.log(-13 % 5); // -3
console.log(4 % 2); // 0
console.log(1 % 0); // NaN
console.log(100 % 0); // NaN
console.log(0 % 0); // NaN;
console.log(0 % 1); // 0;
console.log(1 % 0); // NaN;
console.log(true % 0); // NaN;
console.log("str" % 0); // NaN;
console.log(NaN % NaN); // NaN;
console.log(1 % NaN); // NaN;
console.log(Infinity % Infinity); // NaN;
console.log(Infinity % -Infinity); // NaN;

console.log(3 ** 4); // 81
console.log(10 ** -2); // 0.01
