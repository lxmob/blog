/* 
  问题
  1.包装类是什么
  2.包装类能够用来做什么
  3.包装类内部是怎么实现的呢
*/


/* 
  原始类型值是没有属性和方法的
  包装对象能够在原始类型 Number、String、Boolean 身上读取属性和调用方法的一种 JS 隐性的方式
*/
var a = 1;
console.log(a); // 1
var b = Number(a);
b.len = 1;
console.log(b); // { [primitiveValue]: 1, len: 1 }
var d = a + b;
console.log(d); // 2


/* 
  首先它会内部调用对应的内置构造函数创建对象
  然后通过这个对象来访问属性和方法 
*/
var num = 123;
// 这里 js 做了包装类但是并没有将包装类对象赋值给任意的变量
num.len = 3; // new Number(123).len = 3 => delete
console.log(num.len); // undeinfed

var str = 'string';
// 包装类中默认的属性 { [primitiveValue]: 'string', length: 0 }
console.log(str.length); // 6 => new String(str).length
str.length = 1; // new String(str).length = 1 形成包装类但是未赋值变量 => delete
console.log(str.length); // 6


// 案例题
var str = 'ming';
str += 10; // 'ming10'
var type = typeof str; // 'string'
if(type.length === 6){ // true
  type.text = 'string'; // new String(type).text = 'string' => delete
}
console.log(type.text); // undefined