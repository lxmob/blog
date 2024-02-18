/* 
  函数中 callee 与 caller 的区分
  callee => 函数本身
  caller => 调用函数的引用
*/

function dog(name, age){
  console.log(arguments.callee.length); // 形参长度
  console.log(arguments.callee); // 函数本身
  console.log(dog.length); // 形参长度
  console.log(arguments.length); // 实参长度

  function run(){
    console.log(arguments.callee); // [Function: run]
    console.log("caller", run.caller); // [Function: dog]
  }
  run();
}
dog("husky");


// 通过 callee 我们可以调用自身
var sum = (function (n){
  if (n <= 1) {
    return 1;
  }
  return n + arguments.callee(n - 1);
})(10);
console.log(sum);