/*
  递归函数
  通过函数内部自身调用的方式是递归函数，递归函数需要有一个结束条件作为出口
  使用递归函数可以帮助我们计算函数内部代码块累积执行的结果
  相对比 for 循环递归函数可以在计算量较小的程序块中更加便捷
  缺点：计算量大时容易造成栈溢出，不过 ES6 之后提出的尾递归调用优化了性能
*/


// 案例题
// 找到计算的规律，结束递归的条件作为出口
function factorial(n){
  if(n == 1){
    return 1;
  }
  return (n * factorial(n - 1));
}
console.log(factorial(5));

// 想象成队列，由最后一个满足结束条件的函数依次执行
// factorial(5) = 5 * factorial(5 - 1)
// factorial(4) = 4 * factorial(4 - 1)
// factorial(3) = 3 * factorial(3 - 1)
// factorial(2) = 2 * factorial(2 - 1)

// 算出斐波那契数列的第 n 位
function fibonacci(n){
  if(n <= 2){
    return 1;
  }
  // 前两位之和 = 第三项结果 n3 = n1 + n2
  // 要求第 n 项的结果，n - 1 项 + n - 2 项
  return fibonacci(n - 1) + fibonacci(n - 2);
}
console.log(fibonacci(5));