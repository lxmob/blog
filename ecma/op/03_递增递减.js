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