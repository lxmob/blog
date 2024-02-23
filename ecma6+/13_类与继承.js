/*
  class 语法糖
  本质上就是在模拟构造函数
  将 ES5 以前声明构造函数的方式换了一种方式
  增加代码的可读性、维护性、减少出错的机会
*/

class Person{
  // 定义 constructor 属性构造器函数
  constructor(name, age){
    // 构造器函数内配置实例化“私有属性”
    this.name = name;
    this.age = age;
  }

  // 定义原型对象中“共有”方法
  run(){
    console.log('run my city');
  }

  // ES2017 实例化对象“私有属性”新写法
  car = ['Benz', 'Toyota'];
}
// console.log(Person);
// console.log(typeof Person); // 'function'


// class 原型中声明的属性和方法是不可枚举的
// console.log(Object.keys(Person.prototype)); // []

// 拓展 class 原型对象的共有属性，通过这种方式配置的属性可以枚举
// 因为字面量创建对象的方式，属性描述信息默认都为 true => 05_对象拓展.js
Object.assign(Person.prototype, {
  eat: function(){
    console.log('have a eat');
  }
})
// console.log(Object.keys(Person.prototype)); // [ 'eat' ]


// class 中如果没有配置 constructor 系统会自动添加一个
class Foo{};
let foo = new Foo();
// console.log(foo); // Foo {}


// class 声明方式也可以是表达式的形式
// 构造实例化的方式必须通过 new 的方式来执行
// let Bar = class{};
// let Bar = class{}(); // TypeError: Class constructors cannot be invoked without 'new'
// let bar = new class{}();
// console.log(bar); // {}


// class 声明函数存在 TDZ
// let h = new Hash(); // ReferenceError: Cannot access 'Hash' before initialization
// class Hash{};


// 通过 Symbol 将内部共有方法改造成私有化
let _day = Symbol('day');
class Time{
  month(){
    return new Date().getMonth() + 1;
  }
  [_day](){
    return new Date().getDay();
  }
}
let d = new Time();
// console.log(d.month());
// console.log(d._day());
// console.log(d[_day]());


// 定义 static 静态属性和方法
class MerkleTree{
  static rootHash = Math.random();
  static verifyTx(){
    console.log('tx fee');
    // class 中内部方法默认是严格模式
    console.log(this);
  }
}
let mTree = new MerkleTree();
// console.log(mTree.rootHash); // undefined
// console.log(MerkelTree.rootHash); // 静态属性方法仅构造函数本身可以访问
// console.log(MerkleTree.verifyTx()); // undefined


// class 中的取值函数
class VerkleTree{
  get rootHash(){
    return Math.random();
  }
  set hashVal(val){
    console.log(val);
  }
}
let vTree = new VerkleTree();
// console.log(vTree.rootHash);
// console.log(VerkleTree.rootHash); // undefined


// class 中继承关键字 extends
class Singer extends Person{ 
  // 派生类必须使用 super 关键字来调用父类构造器创建实例化对象
  // ReferenceError: Must call super constructor in derived class before accessing 'this' or returning from derived constructor
  constructor(name, age){
    super(name, age);
    // this 只有当 super 调用后才能访问
    // console.log(this);
  }
}
let s = new Singer('iu', 18);
console.log(s);


/*
  super 关键字
  1.在 constructor 中指向父类的构造器
  2.在对象方法中指向原型对象
  3.在 static 静态方法中指向继承的父类
*/
let obj = {
  name: 'kiin',
  run(){
    console.log(super.city);
  }
}
let proto = {city: 'beijing'};
Object.setPrototypeOf(obj, proto);
obj.run(); // 'beijing'


// class 修饰器模式
// 在 ES5 可以通过 defineProperty 对构造函数属性进行更改
// 而在 ES6 想要对 class 类属性和方法进行描述要使用修饰器
// 修饰器就是在不改变原有结构的基础上，新增功能
// 好处是能够将业务与逻辑的分离，使代码块更加简洁，可维护性更高
@unable
class Modifier{
  @readonly
  grass(){
    console.log('grass');
  }

  @log('click')
  click(){
    console.log('click');
  }
};
function unable(tar){
  tar.isAble = true;
}
function readonly(tar, key, descriptor){
  console.log(tar, key, descriptor);
}

// 通常用来做“埋点”，每操作一次数据，想对操作的动作做一个数据记录
function log(type){
  return function (tar, key, descriptor){
    let _method = descriptor.value;
    descriptor.value = (...args) => {
      _method.apply(tar, args);
      console.log(type);
    }
  }
}
