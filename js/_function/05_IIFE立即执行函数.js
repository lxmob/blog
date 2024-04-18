/* 
  immediately invoked function expression 
  立即执行函数当页面加载时，自动执行，执行完毕立即释放该函数

  由括号运算符包裹形成表达式（忽略原有的函数名）然后被执行符号 () 执行
  当执行完毕后该函数在内存中被销毁，导致在之后环境中找不到该函数

  优点：私有化变量防止全局变量污染，使固定代码块进行模块化
  缺点：当代码量较大时不利于维护，函数执行后无法复用
*/


// 写法一
;(function (){})();
// 写法二
;(function (){}()); // w3c推荐


console.log(test); // Uncaught ReferenceError: test is not defined;
(function test(){
  var a = 1,
      b = 2;
  console.log(a + b);
})();
// 函数表达式，将忽略函数声明时的命名
var test = function fn(){
  console.log(1);
};
console.log(fn); //  Uncaught ReferenceError: fn is not defined;


// 表达式与执行符号
// 只有表达式形式才能被执行符号 () 执行
(function add(a, b){
  console.log(a + b);
})(1, 2);

// 属于函数声明并非表达式
// function test(a, b){}(); // SyntaxError: Unexpected token ')'

// 通过加运算符可以将函数声明变成表达式的方法
!function test(){
  console.log("test");
}();
-function test(){
  console.log("test");
}();
+function test(){
  console.log("test");
}();
1 || function test(){
  console.log("test");
}();

// (6) 是一个表达式并不是执行符号
function test(){}(6); // -> function text(){};(6)

// var test = function(){} 作为函数表达式，与执行符号 () 组合
// 此时函数表达式会立即执行
// 而 test 变量接收的结果就是匿名函数 function(){} 立即执行返回的结果
var test = function (){
  console.log(2);
}();
console.log(test); // undefined



// 结合闭包
// 当 arr 被外部所引用时闭包形成，myArr 函数数组被调用
// 在内部作用域 AO 访问的 i 已经是 10 
function test(){
  var arr = [],
      i = 0;
  for(; i < 10;){
    arr[i] = function (){
      console.log(i);
    }
    i++;
  }
  return arr;
}
var myArr = test();
for(var j = 0; j < myArr.length; j++){
  myArr[j](); // 10*10
}

// ->

function test1(){
  var i = 0;
  for(; i < 10;){
    (function (){
      console.log(i); // 0 1 2 3 4 5 6 7 8 9
    })();
    i++;
  }
}
test1();

// ->

function test2(){
  var arr = [],
      i = 0;
  for(; i < 10;){
    arr[i] = function (num){
      console.log(num);
    }
    i++;
  }
  return arr;
}
var myArr = test2();
for(var j = 0; j < myArr.length; j++){
  myArr[j](j);  // 0 1 2 3 4 5 6 7 8 9
}

// ->

function test3(){
  var arr = [],
      i = 0;
  for(; i < 10;){
    (function(j){
      arr[j] = function (){
        console.log(j);
      }
    })(i);
    i++;
  }
  return arr;
}
var myArr = test3();
for(var j = 0; j < myArr.length; j++){
  myArr[j]();  // 0 1 2 3 4 5 6 7 8 9
}
