/*
  let 变量声明特点
  1.同一变量在同一个作用域中不能重复声明
  2.存在声明提升，但是会产生一个暂时性死区(TDZ temporal dead zone)
  3.只能在当前作用域下生效，外部不可访问块级作用域中的变量
*/

// 重复声明案例

// 全局作用域中重复声明
let num = 100;
// let num = 200;

// 函数作用域中重复声明
function test1(){
  let num = 100;
  // let num = 200; 
}
// test1();

// 函数作用域中与形参变量重复声明
function test2(num){
  // let num = 100; 
  console.log(num);
}
// test2(200);

// -----------------------------------------------

// TDZ暂时性死区案例

// console.log(c); // ReferenceError: Cannot access 'c' before initialization
let c = 30;

// let e = e; // SyntaxError: Identifier 'e' has already been declared

var d = d;
// console.log(d); // undefined

var arr = [];
for(var i = 0; i < 10; i++){
  arr[i] = function(){
    console.log(i);
  }
}
for(var i = 0; i < 10; i++){ // 注意 var 二次声明 i 变量被重新覆盖了
  // arr[i]();
}

// typeof 也不可避免 TDZ
// console.log(typeof e); // ReferenceError: Cannot access 'e' before initialization
let e;

// -----------------------------------------------

// 块级作用域案例

// 函数内产生块级作用域
function test3(num){
  {
    let num = 100;
    console.log(num); // 100
  }
  console.log(num); // 200
}
// test3(200);

// 使用 let 变量声明导致 for() 括号内产生块级作用域
// 而 {} 内如果使用 let 则属于子块级作用域
for(let k = 0; k < 10; k++){
  let k = 'a';
  // console.log(k);  // 'a'*10

  // var 变量声明提升导致重复声明
  // 这里可以理解为变量提升的过程中发现块级作用域中已经包含了重复变量
  // var k = 'a'; // SyntaxError: Identifier 'k' has already been declared
}

if(1){
  let a = 10;
  {
    // var a = 20; // SyntaxError: Identifier 'a' has already been declared
  }
}

// -----------------------------------------------

// 特殊情况案例

// console.log(test4); // undefined 说明函数没有提升
// console.log(test5); // 同上
{
  // test4(); // 'test4' 块级作用域内部提升
  // test5(); // 'test5' 同上

  // ES6 中兼容在块级作用域中写函数声明
  // 函数声明的形式也会产生块级作用域
  function test4(){
    console.log('test4');
  }
  // 但是编码规范不提倡，推荐写成函数表达式的形式
  var test5 = function(){
    console.log('test5');
  }
}
// test4(); // 'test4' 说明块级作用域消失后，函数声明存在全局作用域中
// test5(); // 'test5' 同上

{
  let a = 1;
  // 同一个块级作用域下重复声明
  // function a(){}; // SyntaxError: Identifier 'a' has already been declared
  {
    // 函数声明产生块级作用域，函数内部提升
    // a(); // 'a fn'
    function a(){
      console.log('a fn') 
    }
  }
  // console.log(a); // 1
}
// 说明 a 函数没有被提升到全局作用域
// a(); // ReferenceError: a is not defined

// -----------------------------------------------

// 函数默认值案例

function test6(x = 1, y = 2){
  console.log(x + y);
}
// test6(3, 7); // 10
// test6(1); // 3
// test6(null, 4); // 4
// test6(); // 3

function test7(x = y, y = 2){
  console.log(x, y);
}
// test7(); // Uncaught ReferenceError: Cannot access 'y' before initialization

let x = 1;
function test8(y = x){
  let x = 2;
  console.log(y) // 1
}
// test8();

function test9(x = 1){
  // let x = 2; // SyntaxError: Identifier 'x' has already been declared
}

// 函数形参默认值 TDZ
// 当取 x 值时 x 存放在暂时性死区
// function test10(let x = x){
function test10(x = x){ 
  // ReferenceError: Cannot access 'x' before initialization
}
// test10();

// 函数参数 () 内看作成单独的作用域
function test11(x, y = function(){ x = 2; console.log(x);}){
  var x = 3;
  // x = 3;
  y();
  console.log(x); // 3
}
test11();
console.log(x); // 1

// -----------------------------------------------

/*
  const 变量声明特点与 let 相同
  其中特殊的点是 const 一旦定义必须赋值且后续不能更改
  对于引用类型的值 const 保存的是指针
*/

const obj = {name: 'ming'};
// obj = {age: 27}; // TypeError: Assignment to constant variable.

// 特殊注意: 使用 let const class 声明的变量不会作为 window 的属性
// console.log(global.obj); // undefined
