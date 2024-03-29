/* 
  比较运算符
  > < >= <= == != === !==
  大小等于优先级 = 10
  判等不等优先级 = 9
*/

console.log(5 > 3); // true
console.log('5' > 3) ;// true -> Number('5' -> 5) > 3 = true
console.log('5' < 3n); // false
console.log('a' < 'b'); // true -> 比较的是ASCII码 'a'-97 'b'-98
console.log(true < false); // false
console.log(null < 0); // false
console.log(null > 1); // false
console.log(null == 0); // false
console.log(undefined < 1); // false
console.log(undefined > 1); // false
console.log(NaN > 1); // false
console.log(NaN < 1); // false
console.log('1' == 1); // true
console.log('1' === 1); // false -> 严格判断不仅判断大小也会判断类型
console.log(NaN == NaN); // false

var obj = {};
console.log;(obj === obj); // true
console.log(null === null); // true
console.log(undefined === undefined); // true
console.log(NaN === undefined); // false
console.log(NaN === NaN); // false
console.log(+0 === -0); // true