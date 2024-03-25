/* 
  for 循环步骤
  1. 声明 i 变量
  2. 判断条件 if(i < 10){} 若不满足则后续不执行
  3. 执行循环体内语句 console.log(i)
  4. i++
*/

for(var i = 0; i < 10; i++){
  console.log(i);
}

// or
var i = 0;
for(; i < 10; ){
  console.log(i);
  i++;
}

// 按照 for 循环的执行步骤，将它分为以下执行顺序，代码声明变量 i 然后输出 start 判断条件 i < 10
// 满足条件后执行循环体内代码输出 body 然后执行 i++ 再次循环，判断条件满足条件后执行循环体内代码
// 直到不满足条件时输出 end 循环结束
var i = 0;
for(console.log('start'); i < 10; console.log('end')){
  console.log('body');
  i++;
}


/* 
  while 循环
  需要有一个明显的结束条件，否则会引发程序的死循环
*/
var i = 0;
while(i < 10){
  console.log(i);
  i++;
}


/* 
  do while 循环
  先执行一次输出语句，后续判断下一次是否执行
*/
var i = 0;
do{
  // 先执行
  console.log('do while');
  i++;
}while(i < 10); // 满足条件后继续执行


/* 
  死循环引出 break 关键字 
  break 关键字会中断循环，而 continue 关键字用来跳出此次循环，执行下一次循环
*/
var i = 1;
for(; i; ){
  console.log(i);
  i++;
  if(i == 10){
    break;
    i = 0;
  }
}


// 100 以内的数跳过被 7 整除或个位数存在 7 的数
for(var i = 0; i <= 100; i++){
  if(i % 7 == 0 || i % 10 == 7){
    continue; // 意味跳过此次循环，后续代码不执行
  }
  console.log(i);
}

// 打印 0-99 的数
// () 内不能出现比较
// {} 内不能出现 i++ 或 i--
var i = 100;
for(; i--; ){
  console.log(i);
}

// 10^n
var n = 5,
    num = 1; // 底数
for(var i = 0; i < n; i++){
  num *= 10;
}
console.log(num);

// n 的阶乘
var n = 5,
    num = 1;
for(var i = 1; i <= 5; i++){
  num *= i;
}
console.log(num);

// 反转 num 要求不能使用方法
var num = 798,
    a = num % 10,
    b = ((num - a) % 100) / 10,
    c = (num - a - b * 10) / 100;
console.log('' + a + b + c);

// 打印 100 以内的质数
// 质数仅仅只能被 1 和本身整除的数，能被其他数整除的数不叫质数
var f = 0;
for(var i = 2; i <= 100; i++){
  for(var j = 1; j <= i; j++){
    if(i % j == 0){
      f++;
    }
  }
  if(f == 2){
    console.log(i);
  }
  f = 0;
}

// 斐波那契数列
// 已知两个数都为 1，后面的数依次为前两个数的和
var n = 5,
    cur = 1,
    next = 1,
    sum = 0;
for(var i = 0; i < n; i++){
  sum = cur + next;
  cur = next;
  next = sum;
}

// 99 乘法表
// 1 - 9 做一些事
// i = 1 1*1
// i = 2 1*2 2*2
for(var i = 1; i <= 9; i++){
  for(var j = 1; j <= i; j++){
    console.log(j, '*', i, '=', j * i, '&nbsp');
  }
  console.log('<br />');
}

// 水仙花数
// 求 100 - 999 内，个位上的幂数相加等于它本身
for(var i = 100; i <= 999; i++){
  var a = parseInt(i / 100),
      b = parseInt((i % 100) / 10),
      c = i % 10;
  if(a ** 3 + b ** 3 + c ** 3 == i){
    console.log(i);
  }
}