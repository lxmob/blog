/*
  ES6 数值拓展将全局对象中 parseInt parseFloat isNaN 等
  这些方法进行调整，主要解决调用方法时参数存在隐士转换的问题
  调整后的新方法作为 Number 构造函数中的静态方法
  全局中的方法还保持原来的形式，向后兼容

  同时 ES6 新增了一些新的数值表示法
  例如 8 进制（0o）、16 进制（0x）、2 进制（0b）
*/

console.log(0x1f7); // 503
console.log(0o767); // 503
console.log(0b111110111); // 503
console.log(Number.prototype.toString.call(503, 2)); // 111110111
console.log(parseInt(111110111, 2)); // 503


// 全局中 isNaN 方法是先将参数隐士转为数字类型，然后判断是否为非数
// 而 Number 中新方法是直接判断参数是否等于 NaN，类似于严格判等
console.log(isNaN(NaN)); // true
console.log(isNaN('NaN')); // true
console.log(isNaN('asdf1')); // true
console.log(isNaN(undefined)); // true
console.log(isNaN(null)); // false

console.log(Number.isNaN(NaN)); // true
console.log(Number.isNaN('NaN')); // false
console.log(Number.isNaN(null)); // false
console.log(Number.isNaN(undefined)); // false


// isFinite 判断是否是有限的数
// 全局中 isFinite 方法也是存在隐士转换问题
console.log(isFinite(NaN)); // false
console.log(isFinite(null)); // true
console.log(isFinite(undefined)); // false
console.log(isFinite(Infinity)); // false
console.log(isFinite('123')); // true
console.log(Number.isFinite(null)); // false
console.log(Number.isFinite('123')); // false
console.log(Number.isFinite(12)); // true

// 安全整数
console.log(Number.MAX_SAFE_INTEGER === Math.pow(2, 53) - 1); // true
console.log(Number.MIN_SAFE_INTEGER); // -9007199254740991
