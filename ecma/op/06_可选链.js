/* 
  可选链运算符 ?.
  在访问对象身上属性时防止该对象身上存在 null 或 undefined 可能会引发的错误
  该运算符默认返回 undefined 如果与函数调用使用，若调用的函数没有返回值则返回 undefined

  obj.val?.prop
  obj.val?.[expr]
  obj.func?.(args)

  优先级顺序 = 18
*/

var obj = { 
  name: 'ming', 
  desc: { age: 27 } 
};
console.log(obj.info.like); // TypeError
console.log(obj.info?.like); // undefined

var n = null,
    x = 1;
console.log(n?.(x++)); // undefined
console.log(x); // 1 左操作数是 null 或 undefined 表达式将不会被计算