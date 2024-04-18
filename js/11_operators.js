/* 
  赋值运算符
  = *= /= **= %= += -= &&= ||= ??= ...
  赋值类运算符优先级 = 2
*/
var x = (y = z = 1);
console.log(x, y, z); // 1 1 1

var a = 1;
console.log((a *= 3)); // 3

var b = 2;
console.log((b /= 2)); // 1

var c = 3;
console.log((c **= 3)); // 27
console.log((c **= 0)); // 1

var d = 4;
console.log((d %= 3)); // 1
console.log((d %= 0)); // NaN
console.log((d %= 'str')); // NaN

var e = 'hello';
console.log((e += ' world')); // hello world

var f = 10;
console.log((f -= 6)); // 4

var g = 2,
  h = 0;
console.log((g &&= 10)); // 10
console.log((h &&= 1)); // 0

var obj = { name: 'ming' };
obj.name ||= ' Mr.';
console.log((obj.age ||= 27)); // 27

var able = { desc: 'disabled' };
console.log((able.desc ??= 'open')); // 'disabled'
console.log((able.open ??= 'open')); // 'open'


/* 
  加减乘除取余
  + - * / % **
  幂优先级 = 14
  乘除取余优先级 = 13
  加减优先级 = 12
*/
var a = 'str' + 1 + 1;
var b = 1 + 1 + 'str' + 1 + undefined;
var c = null;
console.log(a); // 'str11'
console.log(b); // '2str1undefined'
console.log(c + 2); // 2 -> Number(null = 0) + 2 = 2

console.log(10 - 5); // 5
console.log(5 - 2.5); // 2.5
console.log(3 - null); // 3
console.log(5 - true); // 4 -> 5 - Number(true = 1) = 4
console.log(2 - 'str'); // NaN -> 2 - Number('str' = NaN) = NaN

console.log(3 * 4); // 12
console.log(-3 * 4); // -12
console.log('3' * 2); // 6 -> Number('3' = 3) * 2 = 6
console.log('str' * 2); // NaN -> Number('str' = NaN) * 2 = NaN

console.log(6 / 3); // 2
console.log(6 / '3'); // 2
console.log(6 / 0); //  Infinity
console.log(0 / 0); // NaN
console.log(1 / 0); // Infinity
console.log(-1 / 0); // -Infinity
console.log('str' / 0); // NaN
console.log(0 / 2); // 0
console.log(-0 / 1); // -0
console.log('1' / 1); // 1
console.log(null / 1); // 0
console.log('null' / 1); // NaN
console.log(true / 1); // 1
console.log('true' / 1); // NaN

console.log(13 % 5); // 3
console.log(-13 % 5); // -3
console.log(4 % 2); // 0
console.log(1 % 0); // NaN
console.log(100 % 0); // NaN
console.log(0 % 0); // NaN;
console.log(0 % 1); // 0;
console.log(1 % 0); // NaN;
console.log(true % 0); // NaN;
console.log('str' % 0); // NaN;
console.log(NaN % NaN); // NaN;
console.log(1 % NaN); // NaN;
console.log(Infinity % Infinity); // NaN;
console.log(Infinity % -Infinity); // NaN;

console.log(3 ** 4); // 81
console.log(10 ** -2); // 0.01


/* 
  递增递减运算符
  ++a --a 先运算，后输出，返回新的值，变更栈内存记录值
  a++ a-- 先输出，后运算，返回原本的值，变更栈内存记录值
  后置递增优先级 = 16
  前置递增优先级 = 15
*/
var a = 1;
console.log(a++); // 1
console.log(++a); // 2

var a = 5,
  b;
b = a++ + 1;
console.log(b, a); // 6 6

b = a-- + --a;
console.log(b, a); // 8 3

b = --a + --a;
console.log(b, a); // 7 3


/* 
  比较运算符
  > < >= <= == != === !==
  大小等于优先级 = 10
  判等不等优先级 = 9
*/
console.log(5 > 3); // true
console.log('5' > 3); // true -> Number('5' -> 5) > 3 = true
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
console.log(obj === obj); // true
console.log(null === null); // true
console.log(undefined === undefined); // true
console.log(NaN === undefined); // false
console.log(NaN === NaN); // false
console.log(+0 === -0); // true


/* 
  逻辑运算符 
  && 从左到右求值，遇到真就往后走，遇到假或走到最后就返回当前值
  || 从左到右求值，遇到假就往后走，遇到真或走到最后就返回当前值
  ?? 空值合并运算符，当左侧的数为 null 或者 undefined 时返回右侧的数，否则返回左侧的数
  ! 将真值或假值转换为对应的相反值
  逻辑非优先级 = 15
  逻辑与优先级 = 5
  逻辑或优先级 or 空值合并 = 4
*/
var a = 1;
console.log((b = a && 2)); // 2
console.log((b = 1 && 2 && undefined && a)); // undefined

var a = 1;
console.log((b = a || true)); // 1
console.log((b = 0 || null || 1 || 0)); // 1

var a = false;
console.log((a = !a)); // true

var n = null,
  u = undefined,
  str = '';
console.log(n ?? 1); // 1
console.log(u ?? 2); // 2
console.log(str ?? 3); // ''


/* 
  可选链运算符(ES6+) ?.
  在访问对象身上属性时防止该对象身上存在 null 或 undefined 可能会引发的错误
  该运算符默认返回 undefined 如果与函数调用使用，若调用的函数没有返回值则返回 undefined

  obj.val?.prop
  obj.val?.[expr]
  obj.func?.(args)

  优先级顺序 = 18
*/
var obj = {
  name: 'ming',
  desc: { age: 27 }
};
console.log(obj.info.like); // TypeError
console.log(obj.info?.like); // undefined

var n = null,
  x = 1;
console.log(n?.(x++)); // undefined
console.log(x); // 1 左操作数是 null 或 undefined 表达式将不会被计算


/* 
  逗号运算符(,)
  从左到右依次求值，并返回最后一个操作数的值
  逗号运算符优先级最低 = 1
*/
var x = 1;
x = (x++, x);
console.log(x); // 2

x = (2, 3);
console.log(x); // 3

var fn = (
  function test () {
    return 1;
  },
  function demo () {
    return "2";
  }
)();
console.log(typeof fn); // 'string'

for (var i = 0, j = 9; i <= 9; i++, j--) {
  console.log(`a[${i}][${j}]`);
}

function func () {
  var x = 0;
  return (x += 1), x; // 等价 return ++x
}
console.log(func()); // 1


/* 
  括号运算符用于控制表达式中的运算优先级
  包裹括号的都为表达式，单个括号没有值则为函数的执行符号 
  括号运算符优先级最高 = 19
  https://developer.mozilla.org/docs/Web/JavaScript/Reference/Operators/Operator_precedence
*/
var a = 10;
// 解析为立即执行函数但是并没有被执行
// 匿名函数忽略函数名称 (function b() {})
if (function b () {}) {
  a += typeof b;
}
console.log(a); // 10undefined

function foo1 (x) {
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
function foo2 (x) {
  console.log(arguments); // 5
  return x;
}(1, 2, 3, 4, 5);

(function foo3 (x) {
  console.log(arguments); // 1 2 3 4 5
  return x;
})(1, 2, 3, 4, 5);


/* 
  三元运算符
  condition ? exprIfTrue : exprIfFalse
  三元运算优先级 = 3
*/
var num = 10,
  pass = null;

if (num > 10) {
  pass = true;
} else {
  pass = false;
}
pass = num > 10 ? true : false;
