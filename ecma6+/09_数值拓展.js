/*
  数值拓展
  es6 将 parseInt parseFloat isNaN 方法汇总到 Number 构造函数中
  同时做了一些调整例如 isNaN，新增了一些新的数值表示法，例如 8 进制、16 进制、2 进制
*/

console.log(0x1f7); // 503
console.log(0o767); // 503
console.log(0b111110111); // 503
console.log(Number.prototype.toString.call(503, 2)); // 111110111
console.log(parseInt(111110111, 2)); // 503
console.log(isNaN(NaN)); // true

// 全局中 isNaN 方法是先将参数隐士转为数字
// 而 Number 中方法是直接判断参数是否等于 NaN
console.log(isNaN('NaN')); // true
console.log(isNaN('asdf1')); // true
console.log(isNaN(null)); // false
console.log(isNaN(undefined)); // true
console.log(Number.isNaN('NaN')); // false
console.log(Number.isNaN(NaN)); // true
console.log(Number.isNaN(null)); // false
console.log(Number.isNaN(undefined)); // false

// isFinite 判断是否是有限的数
// 全局中 isFinite 方法也是存在隐士转换
console.log(isFinite(NaN)); // false
console.log(isFinite(null)); // true
console.log(isFinite(undefined)); // false
console.log(isFinite(Infinity)); // false
console.log(isFinite('123')); // true
console.log(Number.isFinite(null)); // false
console.log(Number.isFinite('123')); // false

// 安全整数
console.log(Number.MAX_SAFE_INTEGER === Math.pow(2, 53) - 1); // true
console.log(Number.MIN_SAFE_INTEGER); // -9007199254740991
