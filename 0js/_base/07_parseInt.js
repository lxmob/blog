/* 
  parseInt()
  JS 内置方法，该函数解析字符串并返回整数
  第一个参数是 string 类型，说明所有传递的参数都会转为 string 类型
  第二参数是 radix 表示 2 - 36 进制范围内的数
  默认参数 10 进制
*/

console.log(parseInt(' 123')); // 123
console.log(parseInt(true)); // NaN

// 0123456789abcdef 16 进制满足位数进 1
console.log(parseInt('b', 16)); // 11
console.log(parseInt('10', 16)); // 16

/*
  判定规则根据第一位如果是字符串则以 NaN 处理
  如果是数字截取到末尾最后一个数字
*/ 
console.log(parseInt('101abc')); // 101
console.log(parseInt('abc10')); // NaN

// parseInt 不能解析 Infinity
console.log(parseInt(Infinity)); // NaN
console.log(parseInt(-Infinity)); // NaN

// MDN 更加严格的判断实现
function _parseInt(val){
  if(/^(\-|\+)?([0-9]+|Infinity)$/.test(val)) return Number(val);
  return NaN;
}


/* 
  parseFloat()
  同 parseInt 规则一样，但是只接收一个参数 string
*/

console.log(parseFloat('3.1456a')); // 3.1456

// parseFloat 可以解析 Infinity
console.log(parseFloat(Infinity)); // Infinity
console.log(parseFloat(-Infinity)); // -Infinity