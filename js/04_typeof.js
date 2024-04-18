/* 
  typeof 方法是 JS 内置的方法
  typeof 方法返回值是判断后的数据类型，是字符串形式
  typeof 方法返回的值包含 number string boolean undefined function object(null) symbol
*/

console.log(typeof 1); // 'number'
console.log(typeof 'str'); // 'string'
console.log(typeof true); // 'boolean'

/*
  JS 设计历史遗留问题
  null 指代的是空对象的指针和空对象的占位符
*/
console.log(typeof null); // 'object'

console.log(typeof undefined); // 'undefined'
console.log(typeof NaN); // 'number'
console.log(typeof Infinity); // 'number'
console.log(typeof {}); // 'object'
console.log(typeof []); // 'object'
console.log(typeof function () {}); // 'function'
console.log(typeof Date()); // 'string'
console.log(typeof new Date()); // 'object'

// typeof 在判断没有声明的变量时是不会报错的
console.log(typeof a); // 'undefined'
console.log(typeof typeof a); // 'string'

// 增强实现多种类型
function _typeof (tar) {
  var cur = typeof tar;
  if (tar == null) {
    return 'null';
  } else if (cur == 'object') {
    return Object.prototype.toString.call(tar).slice(8, -1).toLowerCase();
  } else {
    return cur;
  }
}

console.log(_typeof(undefined)); // 'undefined'
console.log(_typeof(null)); // 'null'
console.log(_typeof(true)); // 'boolean'
console.log(_typeof('str')); // 'string'
console.log(_typeof({})); // 'object'
console.log(_typeof([])); // 'array'
console.log(_typeof(function () {})); // 'function'
console.log(_typeof(new Number(123))); // 'number'
console.log(_typeof(new String('str'))); // 'string'
console.log(_typeof(new Boolean(false))); // 'boolean'
