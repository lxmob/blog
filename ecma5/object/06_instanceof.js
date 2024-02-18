/* 
  instanceof 
  判断 B 构造函数的 prototype 是否存在 A 实例对象原型链上
*/

function Dog(){};
var d = new Dog();
console.log(d instanceof Dog); // true
console.log(d instanceof Object); // true
console.log({} instanceof Object); // true
console.log([] instanceof Array); // true
console.log([] instanceof Object); // true
console.log(Number(1) instanceof Number); // false => Number作为函数调用返回原始值
console.log(new Number(123) instanceof Number); // true
console.log(String('123') instanceof Number); // false
console.log(Boolean(true) instanceof Number); // false
console.log(NaN instanceof Number); // false
console.log(null instanceof Object); // false

console.log(Object.prototype.toString.call(d)); // '[object Object]'