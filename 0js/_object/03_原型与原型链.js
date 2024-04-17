/*
  原型是对象也是容器，用来存放属性和方法的
  原型是为了能够让构造函数创建出来的实例对象继承自身(prototype)的属性和方法

  而每一个构造出来的实例对象想要访问原型对象身上的属性和方法
  通过 __proto__ 的属性节点，一层一层的向下查找属性和方法
  这种继承关系就叫做原型链

  原型链是为了不需要在每次创建实例的时候
  都去为实例创建一个属性或方法，而是直接继承原型身上的属性和方法

  原型对象 prototype 是作为对象容器的属性存在
  而原型链是通过实例继承原型对象产生 __proto__ 的原型链节点
*/
function Dog(name, age){
  this.name = name;
  this.age = age;
}
Dog.prototype.variety = 'husky';
Dog.prototype.eat = function (){};

var d1 = new Dog('qq', 2);
var d2 = new Dog('oo', 1);

console.log(d2.variety); // 'husky' 实例对象自身没有属性会去原型对象中查找

d2.variety = 'golden'; // 将自身添加了一个属性
console.log(d2.variety); // 'golden'

console.log(Dog.prototype.variety); // 'husky' 实例对象是无法直接向原型对象中更改属性的


/*
  constructor 构造器属性
  原型对象 prototype 身上的属性，指向构造函数本身
*/
function Professor(){}
function Teacher(name, age){
  this.age = age;
  this.name = name;
}
console.log(Teacher.prototype);
Teacher.prototype = {
  constructor: Professor,
};
console.log(Teacher.prototype.constructor); // Professor


/*
  __proto__
  实例对象身上的隐式属性指向构造函数的原型对象
  通过 new 关键字在内部创建 this 对象是实例对象
  实例对象身上会添加一个 __proto__ 属性，是继承的原型对象
*/
function Car(){
  var thiss = {
    __proto__: Car.prototype = {
      name: 'Honda',
    }
  };
  // this.name = 'Benz'
  return thiss;
}
Car.prototype.name = 'Honda';
var car = new Car();
console.log(car.name); // 'Honda'


// 修改 __proto__ 属性
function Person(){};
Person.prototype.name = 'ming';
var p1 = {name: 'lili'};
var p2 = new Person();
console.log(p2.name); // 'ming'
p2.__proto__ = p1;
console.log(p2.name); // 'lili'


/* 
  实例化对象时在 new 关键字之后原型链已经确定了
  自身添加一个 __proto__ 的属性，将 Car.prototype 属性对象赋值
  然后 Car.prototype 属性指向了一个字面量对象
  和 car 实例化时 prototype 对象不是同一个
*/
Car.prototype.name = 'Benz';
function Car(){}
// function Car(){
//    this{
//      __proto__: Car.prototype{
//        name: 'Benz'
//     }
//   }
// }

// Car.prototype = { name: 'Mazda' };
var car = new Car();

// 这里只是给 Car 构造函数增加了一个 prototype 属性
// 同时是一个字面量对象
Car.prototype = { name: 'Mazda' };

// 重写 name 属性
// Car.prototype.name = 'Mazda'
console.log(car.name); // Benz


// 实例化对象是无法修改父祖先级的 prototype 原始值属性
function Professor(){};
var p = new Professor();
function Teacher(){
  this.unf = undefined;
  this.bol = true;
  this.str = 'str';
  this.num = 100;
  this.desc = {name: 'ming'};
}
Teacher.prototype = p;
var t = new Teacher();
function Student(){};
Student.prototype = t;
var s = new Student();
// s.desc.name = 'mingming' // 引用类型可以修改属性
// s.desc.name += 'ming'
// s.num++ // 基本类型无法修改 -> s.num = s.num + 1
// s.str += 'ming'
// s.bol += 1
// s.unf += 10
console.log(s);