/*
  隐式类型转换
  在某些操作中，JS 引擎会自动将一个数据类型转换为另一个数据类型
*/

/*
  -0 与 +0 比较
  由于 IEEE754 浮点数规范中的符号位不同而引起的
  所以 JS 会认为 -0 < 0
  但是在比较相等的情况下 JS 认为 -0 与 +0 的数值相等
*/
console.log(-0 > +0); // false
console.log(-0 < +0); // false
console.log(-0 == +0); // true

/*
  当 JS 检测到 ++ 运算后
  会自动将 a 隐式转换为 Number 类型，然后再进行运算
  Number('12a') -> NaN
*/
var a = '12a';
console.log(a++); // NaN

/*
  在遇到 (* / - %) 这些运算符
  其中有一个是数字时，会将字符串转为 Number 类型
*/
var a = '3' * 2;
console.log(a); // 6

/*
  在比较大小时
  需要将两边值类型转换成 Number 类型进行比较
*/
console.log('1' > 2); // false
console.log(1 > '2'); // false
console.log(null < 3); // true

/*
  运算步骤:
  1.2 > 1 返回 true
  2.隐式转换 Number(true) -> 1 > 3
  3.返回false
*/
console.log(2 > 1 > 3); // false

/*
  运算步骤:
  1.2 > 1 返回 true
  2.隐式转换 Number(true) -> 1 == 1
  3.返回 true
*/
console.log(2 > 1 == 1); // true

/*
  如果两边都是字符串类型数据
  比较大小时，是取 ASCII 码表中的值，进行比较
  https://tool.oschina.net/commons?type=4
*/
console.log('a' > 'b'); // false
console.log('acd' > 'abc'); // true

/*
  相等与不等比较
  严格判等时，首先比较的是数据类型是否相同
*/
console.log(1 == '1'); // true
console.log(1 != '2'); // true
console.log(1 === '1'); // false

/*
  NaN & undefined & null
  NaN 与任何类型都不相等包括它自身
  undefined -> Number(undefined) -> NaN

  null 在 JS 中代表特殊的值，即空对象的引用，是一种设计缺陷
  虽然在 Number(null) 将值转换为 0 但是在比较时 null 与 0 不同
*/
console.log(NaN == NaN); // false
console.log(undefined > 0); // false
console.log(undefined < 0); // false
console.log(undefined == 0); // false
console.log(null < 0); // false
console.log(null > 0); // false
console.log(null == 0); // false
// 特殊性
console.log(null == undefined); // true
console.log(null === undefined); // false

/*
  isNaN 方法
  内部会先进行数字类型转换调用 Number()
*/
console.log(isNaN('str')); // true
console.log(isNaN(undefined)); // true
console.log(isNaN(null)); // false
console.log(isNaN('12a')); // true
console.log(isNaN(NaN)); // true
