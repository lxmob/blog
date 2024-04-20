/*
  Object.is 判断两个值是否相等
  解决全等 NaN、+0、-0 问题 MDN 相等性判断
*/
console.log(NaN == NaN); // false
console.log(-0 == +0); // true
console.log(null == undefined); // true

console.log(Object.is(NaN, NaN)); // true
console.log(Object.is(-0, +0)); // false
console.log(Object.is(null, undefined)); // false


/*
  对象属性迭代的方法
  仅包含自身可枚举的属性(不包含继承属性)
  keys values entries
*/
let mJack = { name: 'jack', age: 18 };
Object.defineProperty(mJack, 'car', { value: 'Toyota', enumerable: false });
console.log(Object.keys(mJack)); // [ 'name', 'age' ]
console.log(Object.values(mJack)); // [ 'jack', 18 ]
console.log(Object.entries(mJack)); // [ [ 'name', 'jack' ], [ 'age', 18 ] ]
