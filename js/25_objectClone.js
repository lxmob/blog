/* 
  hasOwnProperty 
  判断对象自身是否存在指定的属性，返回一个 boolean 值  
*/
function Dog () {
  this.name = 'dog';
  this.eat = function () {};
}
Dog.prototype.run = 'running';
var d = new Dog();
// for in 迭代一个对象除 Symbol 以外的可枚举属性，包含继承的可枚举属性
for (var key in d) {
  document.write(key, '<br />');

  if (d.hasOwnProperty(key)) {
    document.write('hasOwnProperty: ', key, '<br />');
  }
}


/* 
  浅拷贝只拷贝对象的第一层属性
  如果属性值是引用类型复制的将是引用地址
*/
function _clone (target, origin) {
  for (let key in origin) target[key] = origin[key];
  return target;
}
var origin = {
  name: 'origin',
  age: 10,
  house: { width: 100, height: 300 },
  maps: [1, 2, 3, 4],
};
origin.__proto__.name = 'proto_test';
var o1 = _clone(origin),
    o2 = _clone(origin);
o1.house.width = 500;
console.log(o2.house.width); // 500


/*
  深拷贝实现递归拷贝对象
  避免复制多层引用类型数据嵌套问题
*/
function _deepClone (target, origin) {
  var toString = Object.prototype.toString;
  for (var key in origin) {
    if (origin[key] && origin.hasOwnProperty(key)) {
      if (typeof origin[key] === 'object') {
        if (toString.call(origin[key]).slice(8, -1) === 'Array') {
          target[key] = _deepClone([], origin[key]);
        } else {
          target[key] = _deepClone({}, origin[key]);
        }
      } else {
        target[key] = origin[key];
      }
    }
  }
  return target;
}
var obj = _deepClone({}, origin);
obj.name = 'object';
obj.house.height = 500;
obj.maps.push(5);
console.log(obj);


/* 
  深拷贝另一种方式
  使用序列化形式进行字符串与对象互转 JSON.stringify & JSON.parse
*/
var jsonObj = {
  name: 'jsonObj',
  eat: function () {}, // -> 无法复制
  undf: undefined, // -> 无法复制
  regexp: /^\d+/, // -> {}
  symbol: Symbol('little'), // 无法复制
  null: null,
  date: new Date(),
}
console.log(JSON.parse(JSON.stringify(jsonObj)));
