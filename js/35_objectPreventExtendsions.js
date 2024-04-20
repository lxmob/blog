/*
  Object.preventExtensions 禁止扩展
  禁止对象添加新属性并且防止对象的原型被重新指定
  对象属性可以改、可以删、不可以新增
*/
// let somebody = { name: 'ming' };
// Object.preventExtensions(somebody);
// somebody.name = 'mingming'; // 可以改
// delete somebody.name; // 可以删
// somebody.car = 'Benz'; // 不可以新增
// Object.defineProperty(somebody, 'car', { value: 'Benz' }); // TypeError
// somebody.__proto__ = { constructor: Object }; // TypeError

// isExtensible 判断一个对象是否可扩展
// console.log(Object.isExtensible(somebody)); // false


/*
  Object.seal 密封对象
  底层通过调用 preventExtensions 禁止扩展对象
  然后循环对象的属性将描述信息 configurable 设置为 false
  对象属性可以改、不可以删、不可以新增
*/
// let dog = { name: 'wangwang' };
// Object.seal(dog);
// dog.name = 'kiki'; // 可以改
// delete dog.name; // 不可以删
// dog.car = 'niko'; // 不可以新增
// Object.defineProperty(dog, 'car', { value: 'Benz' }); // TypeError
// dog.__proto__ = { constructor: Object }; // TypeError

// isSealed 判断一个对象是否被密封
// console.log(Object.isSealed(dog)); // true


/*
  Object.freeze 冻结对象(浅冻结)
  不能给冻结的对象新增、修改、删除属性
*/
let cat = { name: 'beila' };
Object.freeze(cat);
cat.name = 'lala'; // 不可以改
cat.age = 2; // 不可以新增
delete cat.name; // 不可以删
Object.defineProperty(cat, 'car', { value: 'Benz' }); // TypeError
cat.__proto__ = { constructor: Object }; // TypeError

// isFrozen 判断一个对象是否被冻结
console.log(Object.isFrozen(cat)); // true
