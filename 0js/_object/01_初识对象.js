/*
  new Object
  对象是引用类型数据，它是用来存储属性和属性值还有方法的容器
  通常用来描述一种事物，存储数据的一种方法手段
*/

/*
  创建对象的方法
  1. 字面量创建方式
  2. JS 内置构造函数创建方式
  3. 自定义构造函数创建
*/
var obj1 = {name: 'dog'};

var obj2 = new Object();
obj2.name = 'dog';

function CreateObj(){
  this.name = 'dog';
}
var obj3 = new CreateObj();

/* 
  创建对象三种方式的区别
  从输出的结果上来看三者的 __proto__ 指向不同
  obj1、obj2 指向的是 Object.prototype 说明他们是通过 Object 构造函数创建出来的
  而 obj3 指向的是 CreateObj.prototype，CreateObj.prototype.__proto__ -> Object.prototype 由此可知
  通过自定义构造函数创建的对象相对比前两种创建方式，原型的指向多增加了一层
*/
console.log('obj1', obj1.__proto__);
console.log('obj2', obj2.__proto__);
console.log('obj3', obj3.__proto__);


/* 
  构造函数是用来创建实例对象的方法
  能够更好的为实例添加属性和方法，单一责任制更好的实现代码的封装性
  语法规范上首字母需要大写
*/
function Dog(name, age){
  this.name = name;
  this.age = age;
  this.eat = function(){
    console.log('eat');
  };
  // return this
}
var husky = new Dog('哈士奇', 1);
console.log(husky);


/*
  构造函数在内部创建对象时
  首先它会先创建一个 this 实例，通过收集的参数作为属性赋值给 this 实例
  然后在 this 实例身上创建一个 __proto__ 属性并指向当前构造函数的原型对象
  确认原型链，最终将该实例对象隐式的返回
*/
function Test(a, b){
  var thiss = {};
  thiss.__proto__ = Test.prototype;
  thiss.a = a;
  thiss.b = b;
  return thiss;
}


/* 
  构造函数具有隐式的返回实例，如果更改了这个函数返回值
  如果返回的是引用类型将覆盖默认返回的实例对象，如果是基本类型则不会产生作用
*/
function Dog(name){
  this.name = name;
  // return '金毛'
  // return 123
  // return {} 影响结果 x
  // return [] 影响结果 x
  // return new Date() 影响结果 x
}
var husky = new Dog('哈士奇');
console.log(husky);
