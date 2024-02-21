/*
  Symbol
  ES6 新增的基本数据类型属于原始值类型
  符号属性，特点唯一性，为了解决对象属性名重名导致的问题
*/

// 普通调用返回默认值
// console.log(Symbol()); // Symbol()

// 不能 new 实例化对象
// new Symbol(); // TypeError: Symbol is not a constructor

// 遵循唯一性
let s1 = Symbol(),
    s2 = Symbol();
// console.log(s1 === s2); // false

// typeof 判断新增类型
// console.log(typeof s1); // 'symbol'

// 指定具体值
let s3 = Symbol('foo');
// console.log(s3); // Symbol(foo)

// 不包含长度
console.log(s3.length); // undefined

// 对象作为值
let s4 = Symbol({name: 'ming'});
// console.log(s4); // Symbol([object Object])

// null undefined 作为值
// console.log(Symbol(null)); // Symbol(null)
// console.log(Symbol(undefined)); // Symbol()

// 不能转换为 Number 类型
// console.log(s3 + 100); // TypeError: Cannot convert a Symbol value to a number
// console.log(Number(s3)); // TypeError: Cannot convert a Symbol value to a number

// 可以转换为 String Boolean
// console.log(!s3); // false
// console.log(Boolean(s3)); // false
// console.log(String(s3)); // 'Symbol(foo)'

// 获取原型对象
// console.log(Object.getPrototypeOf(s1)); // Object [Symbol] {}


// 解决对象重名属性问题
let mKiin = {},
    mSymb = Symbol('name');
mKiin.name = 'kiin';
mKiin[mSymb] = 'kiin';
// console.log(mKiin); // { name: 'kiin', [Symbol(name)]: 'kiin' }
// console.log(mKiin.name); // 'kiin'
// console.log(mKiin[mSymb]); // 'kiin'
// console.log(mKiin['Symbol(name)']) // undefined


// Symbol.for
// 在全局创建一个 Symbol 注册表
// 每次调用都会检查 [[key]] 是否存在于注册表中
// 如果存在则取出对应的 [[symbol]] 不会重新创建 Symbol
let s5 = Symbol.for('jack'),
    s6 = Symbol.for('jack');
// console.log(s5 === s6); // true
// console.log(s5); // Symbol(jack)


// Symbol.keyFor
// 获取全局注册表中的 [[key]]
// console.log(Symbol.keyFor(s5)); // 'jack'
// console.log(Symbol.keyFor(s1)); // undefined


// Symbol 属性遍历
// for...in 遍历自身和继承的可枚举属性，不包含 Symbol 类型的值
// Object.keys 遍历自身可枚举的属性，不包含 Symbol 类型的值
// Object.getOwnPropertySymbols 遍历自身的 Symbol 类型的值

// for(let key of mKiin){console.log(key)}; // TypeError: mKiin is not iterable
// for(let key in mKiin){console.log(key)}; // 'name'
// console.log(Object.keys(mKiin)); // [ 'name' ]
// console.log(Object.getOwnPropertySymbols(mKiin)); // [ Symbol(name) ]


// Symbol 属性拷贝
// Object.assign 拷贝自身可枚举的属性，包含 Symbol 类型的值
// JSON.stringify 拷贝自身可枚举的属性，不包含 Symbol 类型的值

// console.log(Object.assign({}, mKiin)); // { name: 'kiin', [Symbol(name)]: 'kiin' }
// console.log(JSON.stringify(mKiin)); // {"name":"kiin"}


// Symbol 函数中提供了一系列判断用户行为的方法
// ES6 中当用户使用 instanceof 底层实际上调用了 Symbol.hasInstance 方法 
// Symbol(Symbol.hasInstance)
// console.log(mKiin instanceof Object);
