/* 
  Object.create
  使用现有的对象来作为新创建对象的原型，用于继承属性和方法 
*/

var dog = Object.create(null);
console.log(dog); // No properties
dog.name = 'husky';

// 将 dog 作为原型对象创建 husky 继承 dog name 属性
var husky = Object.create(dog);
console.log(husky); // __proto__ -> dog { name: 'husky' }
console.log(husky.name); // 'husky'


/* 
  通过 Object.create 创建的对象无法调用 Object.prototype 身上的方法
  手动更改原型链也不行，原型链是程序在创建对象时默认生成的
  通过 Object.create 只是创建一个对象的原型并非原型链
*/
var person = Object.create(null); // 原型链已断
var prototype = {};

// 手动添加原型链是无效的，这个操作只是为实例对象增加了一个属性
person.__proto__ = prototype;
console.log(person);
// person.toString(); // TypeError: person.toString is not a function

// 但是可以通过这个属性，来访问添加的对象身上原型对象方法和属性
person.__proto__.toString();

// 手动为对象添加 toString 方法
var num = 1,
    cur = {};
// document.write(num); // 1
// document.write(cur); // [object Object]

var createObj = Object.create(null);
// document.write(createObj)
// Error cannot convert object to primitive value
createObj.toString = function () {
  return 'createObj';
};
// document.write(createObj); // 'createObj'

// toString 原型方法的重写
console.log(Number.prototype.toString.call(10, 2)); // 1010
console.log(Object.prototype.toString.call(1)); // '[object Number]'
