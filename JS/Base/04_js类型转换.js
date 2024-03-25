// 显示类型转换

// Number 类型直接将参数转化为数字类型，如果不能转化则返回NaN
console.log(Number('.123')); // 0.123
console.log(Number(' .123')); // 0.123
console.log(Number(123)); // 123
console.log(Number('123')); // 123
console.log(Number(true)); // 1
console.log(Number('true')); // NaN
console.log(Number(null)); // 0
console.log(Number(undefined)); // NaN
console.log(Number('1a')); // NaN
console.log(Number('3.14')); // 3.14
console.log(Number('')); // 0
console.log(Number(' ')); // 0
console.log(Number(-1)); // -1

// String 将数据直接转化为字符串类型
console.log(String(123)); // '123'
console.log(String('123')); // '123'
console.log(String(NaN)); // 'NaN'
console.log(String(null)); // 'null'
console.log(String(true)); // 'true'

// Boolean 判断为 false 的值，undefined null NaN 0 false ''
console.log(Boolean(undefined)); // false
console.log(Boolean(null)); // false
console.log(Boolean(false)); // false
console.log(Boolean('')); // false
console.log(Boolean(' ')); // true
console.log(Boolean(NaN)); // false
console.log(Boolean(0)); // false

// -----------------------------------------------

// 隐式类型转换

// Number 隐式类型转换，针对于原始数据类型
console.log(-0 > +0); // false
console.log(-0 < +0); // false
console.log(-0 == +0); // true

var a = '12a'; // Number('12a') ---> NaN
a++; // 当系统检测到++运算后，会自动将a隐式转换为number类型，然后再进行运算
console.log(a); // NaN

var a = '12'; // Number('12') ---> 12
a++; // a = 12 + 1
console.log(a); // 13

// Number('3') ---> 3 * 2
var a = '3' * 2; // (* / - %) 如果遇到这些运算符，其中有一个是数字，那么就会把字符串转为number类型
console.log(a); // 6

// 比较大小是需要将两边值类型转换成 Number 类型进行比较
console.log('1' > 2); // false
console.log(1 > '2'); // false
console.log(null < 3); // true

console.log(2 > 1 > 3);
// 运算步骤:
// 1. 2 > 1 返回true
// 2. 隐式转换Number(true) --> 1 > 3
// 3. 返回false

console.log(2 > 1 == 1);
// 运算步骤:
// 1. 2 > 1 返回true
// 2. 隐式转换Number(true) --> 1 == 1
// 3. 返回true

// String 字符串之间的比较，比较的是在ASCII码表中的值
console.log('a' > 'b'); // false
console.log('acd' > 'abc') // true

// Boolean == & != 隐式转换, === & !== 不进行隐式转换
console.log(1 == '1'); // true
console.log(1 != '2'); // true
console.log(1 === '1'); // false

// NaN & undefined & null
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

// isNaN 方法
// 内部会先进行数字类型转换调用 Number()
console.log(isNaN('str')); // true
console.log(isNaN(undefined)); // true
console.log(isNaN(null)); // false
console.log(isNaN('12a')); // true
console.log(isNaN(12a)) //  SyntaxError
console.log(isNaN(NaN)); // true