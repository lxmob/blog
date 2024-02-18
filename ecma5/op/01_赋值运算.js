/* 
  赋值运算符
  = *= /= **= %= += -= &&= ||= ??= ...
  赋值类运算符优先级 = 2
*/

var x = y = z = 1;
console.log(x, y, z); // 1 1 1

var a = 1;
console.log(a *= 3); // 3

var b = 2;
console.log(b /= 2); // 1

var c = 3;
console.log(c **= 3); // 27
console.log(c **= 0); // 1

var d = 4;
console.log(d %= 3); // 1
console.log(d %= 0); // NaN
console.log(d %= 'str'); // NaN

var e = 'hello';
console.log(e += ' world'); // hello world

var f = 10;
console.log(f -= 6); // 4

var g = 2, h = 0;
console.log(g &&= 10); // 10
console.log(h &&= 1); // 0

var obj = { name: 'ming' };
obj.name ||= ' Mr.';
console.log(obj.age ||= 27); // 27

var able = { desc: 'disabled' };
console.log(able.desc ??= 'open'); // 'disabled'
console.log(able.open ??= 'open'); // 'open'