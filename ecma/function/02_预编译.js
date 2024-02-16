/* 
  问题
  1.预编译是什么
  2.预编译中函数与变量提升的区别
  3.预编译AO与GO的区别
*/


/* 
  js引擎在执行代码前需要先对代码进行通篇的语法检查
  然后进行预编译的过程
  最后交由解释器解释一行执行一行
*/

// 函数声明提升
// 整体提升可以优先调用函数
test();
function test(){
  console.log("test");
}

// 变量声明提升
// 提升的是声明变量而不是赋值语句
// var a
// a = 10
console.log(a); // undefined
var a = 10;

// 暗示全局变量 imply global variable
// es3 中在函数内部没有使用 var 声明的变量默认会被提升到全局变量
function imply(){
  var n = m = 10
}
imply();
console.log(window.m); // 10



// AO 与 GO 执行期上下文

function fn(a){
  console.log(a); // function a(){}
  var a = 1;
  console.log(a); // 1
  function a(){}
  console.log(a); // 1
  var b = function(){};
  console.log(b); // function (){}
  function d(){}
}
fn(2);

// 当 fn 函数执行为什么我们看到第一个输出的 a 变量是函数？
// 当声明语句和函数声明同时存在时，我们应该怎样区分？

/* 
  AO activation object 活跃对象，函数上下文
  函数在执行前首先要进行预编译创建 AO 对象
  1.收集变量声明和形参
    AO = { a: undefined, b: undefined }
  2.将实参的值赋值给形参
    AO = { a: 2, b: undefined }
  3.收集函数声明并赋值
    AO = { a: function a(){}, b: undefined, d: function d(){} }
  4.执行函数后 AO 对象的值
    AO = { a: 1, b: function(){}, d: function(){} }
  5.函数执行完毕后释放 AO
*/


var aa = 1;
function aa(){
  console.log(2);
}
console.log(aa); // 1
/*
  GO global object 全局对象上下文 window
  全局对象上下文创建前进行预编译创建 GO 对象
  1.收集变量声明
    GO = { a: undefined }
  2.收集函数声明
    GO = { a: function a(){} }
  3.执行环境代码
    GO = { a: 1 }
*/


// 案例题

function test(){
  console.log(b);
  // 预编译过程中根本不看这些 if 只看有没有变量声明
  if(a){
    var b = 2;
  }
  c = 3;
  console.log(c);
}
var a;
test();
a = 1;
console.log(a);
/*
  GO = {
    a: undefined -> 1
    test: function test(){},
    c: 3
  }
  AO = {
    b: undefined
  }
*/


function test(){
  return a;
  a = 1;
  function a(){}
  var a = 2;
}
console.log(test()); // fn
/*
  GO = {
    test: function test(){}
  }
  AO = {
    a: undefined -> function a(){}
  }
*/


function test(){
  a = 1;
  function a(){}
  var a = 2;
  return a;
}
console.log(test()); // 2
/*
  GO = {
    test: function test(){},
    a: 1
  }
  AO = {
    a: undefined -> function a(){} -> 2
  }
*/


a = 1;
function test(e){
  function e(){}
  arguments[0] = 2;
  console.log(e); // 2
  if(a){
    // 这里函数执行时 AO 里的变量 a 还是 undefined
    // 故 b 没有赋值
    var b = 3;
  }
  var c;
  a = 4;
  var a;
  console.log(b); // undefined
  f = 5;
  console.log(c); // undefined
  console.log(a); // 4
}
var a;
test(1);
console.log(a); // 1
console.log(f); // 5
/*
  GO = {
    a: undefined -> 1,
    test: function test(){},
    f: 5
  }
  AO = {
    e: undefined -> 1 -> function e(){} -> 2,
    c: undefined,
    a: undefined -> 4,
    b: undefined
  }
*/


var x = 1,
y = (z = 0);
function add(n){
return (n = n + 1);
}
y = add(x);
function add(n){
return (n = n + 3);
}
z = add(x);
console.log(x, y, z); // 1 4 4
/*
  GO = {
    x: 1,
    y: 0,
    z: 0,
    add: function add(n){ return n = n + 3 }
  }
*/
