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

/*
  问题
  1.什么是块级作用域
  2.块级作用域的特点
*/

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

// ------------------------------------------------------

/*
  let 变量声明特点
  1.同一变量在同一个作用域下不能重复声明
  2.不会声明提升，会产生一个暂时性死区
  3.只能在当前作用域下生效
*/

let num = 100;
// let num = 200; // 重复声明

function test1(){
  let num = 100;
  // let num = 200; // 重复声明
}
test1();

function test2(num){
  // let num = 100; // 重复声明
  console.log(num);
}
test2(200);

// ------------------------------------------------------

// console.log(c); // 报错
let c = 30;

var d = d;
console.log(d); // undefined

// let d = d;
// console.log(d); // 报错

function test3(x = y, y = 2){ // 暂时性死区
  console.log(x,y); // 报错
}
// test3();

// console.log(typeof e); // 报错
let e;

// ------------------------------------------------------

function test4(num){
  {
    let num = 100;
    console.log(num); // 100
  }
  console.log(num); // 200
}
test4(200);

// for(;1;){
//   let num = 1;
// }
console.log(num); // 不报错上面代码会导致死循环

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
for(let k = 0; k < 10; k++){
  let k = 'a'; // 'a'*10
  // var k = 'a'; // 报错重复声明
  console.log(k); 
}


