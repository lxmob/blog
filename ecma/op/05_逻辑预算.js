/* 
  逻辑运算符 
  && 从左到右求值，遇到真就往后走，遇到假或走到最后就返回当前值
  || 从左到右求值，遇到假就往后走，遇到真或走到最后就返回当前值
  ?? 空值合并运算符，当左侧的数为 null 或者 undefined 时返回右侧的数，否则返回左侧的数
  ! 将真值或假值转换为对应的相反值
  逻辑非优先级 = 15
  逻辑与优先级 = 5
  逻辑或优先级 or 空值合并 = 4
*/

var a = 1;
console.log(b = a && 2); // 2
console.log(b = 1 && 2 && undefined && a); // undefined

var a = 1;
console.log(b = a || true); // 1
console.log(b = 0 || null || 1 || 0); // 1

var a = false;
console.log(a = !a); // true 

var n = null, 
    u = undefined, 
    str = '';
console.log(n ?? 1); // 1
console.log(u ?? 2); // 2
console.log(str ?? 3); // ''