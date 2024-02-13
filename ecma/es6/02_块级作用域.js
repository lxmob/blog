// var 声明变量的特点

// 1.可以不预先指定值，在预编译阶段默认赋值为 undefined
var a; // undefined

// 2.重复声明会导致环境污染
var a = 10;
var a = 20;

// 可以使用立即执行函数解决全局环境变量污染
(function isVar(){
  // 但是内部重复声明还是会造成污染
  var a = 10;
  var a = 20;
})();

// 3.变量声明提升
console.log(b); // undefined
var b = 30;

// ------------------------------------------------------

if(1){
  // 块级作用域
}

for(;1;){
  // 块级作用域
  break;
}

{
  // 块级作用域
}

switch(1){
  // 块级作用域
}

try{
  // 块级作用域
}catch{
  // 块级作用域
}

// ------------------------------------------------------

/*
  let 变量声明特点
  1.同一变量在同一个作用域中不能重复声明
  2.不会声明提升，会产生一个暂时性死区(TDZ temporal dead zone)
  3.只能在当前作用域下生效
  
  let 本质上就是给 js 增加了一个块级作用域
*/

let num = 100;
// let num = 200; // 全局作用域中重复声明

function test1(){
  let num = 100;
  // let num = 200; // 函数作用域中重复声明
}
// test1();

function test2(num){
  // let num = 100; // 函数作用域中与形参变量重复声明
  console.log(num);
}
// test2(200);

// ------------------------------------------------------

// console.log(c); // 报错，变量声明不会提升
let c = 30;

var d = d;
// console.log(d); // undefined 不报错，var 声明变量提升

// let d = d;
// console.log(d); // 报错，变量声明不会提升

function test3(x = y, y = 2){ // es6 函数默认值声明方式，属于暂时性死区
  console.log(x, y); // 报错，初始化前无法访问 y
}
// test3();

// console.log(typeof e); // 报错，暂时性死区
let e;

// ------------------------------------------------------

function test4(num){
  {
    let num = 100; // 不同作用域下声明变量
    console.log(num); // 100
  }
  console.log(num); // 200
}
// test4(200);

// for(;1;){
//   let num = 1;
// }
console.log(num); // 不报错，但是上面代码会导致死循环，一直在声明 num

var arr = [];
for(var i = 0; i < 10; i++){
  arr[i] = function(){
    console.log(i);
  }
}
for(var i = 0; i < 10; i++){ // 注意 var 二次声明 i 变量被重新覆盖了
  // arr[i]();
}

for(var j = 0; j < 10; j++){
  j = 'a';
  // console.log(j); // 'a'
}

// for(这里面属于父块级作用域) 
// 而 {} 这个属于子块级作用域
// let k = 0;
// for(; k < 10; k++){
for(let k = 0; k < 10; k++){
  let k = 'a'; // 'a'*10
  // var k = 'a'; // 报错，变量所处同一作用域，重复声明
  // console.log(k); 
}

if(1){
  let a = 10;
  {
    // var a = 20; // 变量 a 提升到全局，导致 let 重复声明
    console.log(a); // 报错
  }
}

// ------------------------------------------------------

if(1){
  // es6 中兼容在块级作用域中写函数声明
  function test5(){
    console.log('test5')
  }
  // 但是编码规范不提倡，需要写成函数表达式的形式
  var test6 = function(){

  }
}
test5(); // 函数声明提升到全局作用域

if(1){
  // return 123; // 块级作用域没有返回值，没有方式可以接收返回数据
}

{
  let a = 1;
  // function a(){} // 报错，同一个块级作用域下重复声明
  {
    function a(){} // 不报错，函数声明提升至当前作用域下
  }
  console.log(a);
}

// ------------------------------------------------------

/*
  const 变量声明特点
  1.一旦定义必须赋值且后续不能更改
  2.不会声明提升，会产生一个暂时性死区
  3.对于引用类型保存的是指针

  使用 let const class 声明的变量不会作为 window 的属性
*/

const obj = {};
// Object.freeze(obj); // 冻结对象，不能新增修改删除属性
obj.name = 'ming';
console.log(obj);
