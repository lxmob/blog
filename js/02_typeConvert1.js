/*
  显示类型转换
  通常是指将一个数据类型转换为另一个数据类型的过程
  开发人员能够通过代码描述看得到的逻辑转换内容
  1.字符串转换 String()
  2.数字转换 Number()
  3.布尔转换 Boolean()
*/

/*
  Number
  undefined -> NaN
  null -> 0
  true -> 1
  false -> 0
  BigInt -> TypeError
  Symbol -> TypeError
  '' -> 0
  ' ' -> 0
  '123a' -> NaN
*/
console.log(Number('.123')); // 0.123
console.log(Number('123a')); // NaN
console.log(Number(true)); // 1
console.log(Number(false)); // 0
console.log(Number(null)); // 0
console.log(Number(undefined)); // NaN
console.log(Number('')); // 0
console.log(Number(' ')); // 0
console.log(Number(Symbol('symbol'))); // TypeError
console.log(Number(BigInt('symbol'))); // TypeError

/*
  String
  将基本类型数据拼接为字符串形式
*/
console.log(String(123)); // '123'
console.log(String(undefined)); // 'undefined'
console.log(String(NaN)); // 'NaN'
console.log(String(null)); // 'null'
console.log(String(true)); // 'true'

/*
  Boolean
  falsy值 -> undefined null NaN +-0 false ''
*/
console.log(Boolean(NaN)); // false
console.log(Boolean(null)); // false
console.log(Boolean(false)); // false
console.log(Boolean(undefined)); // false
console.log(Boolean(0)); // false
console.log(Boolean('')); // false
console.log(Boolean(' ')); // true
