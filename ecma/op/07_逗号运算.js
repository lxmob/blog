/* 
  逗号运算符(,)从左到右依次求值，并返回最后一个操作数的值
  逗号运算符优先级最低 = 1
*/

var x = 1;
x = (x++, x);
console.log(x); // 2

x = (2, 3);
console.log(x); // 3


var fn = (
  function test(){
    return 1;
  },
  function demo(){
    return "2";
  }
)();
console.log(typeof fn); // 'string'


for(var i = 0, j = 9; i <= 9; i++, j--){
  console.log(`a[${i}][${j}]`);
}


function func(){
  var x = 0;
  return (x += 1, x); // 等价 return ++x
}
console.log(func()); // 1