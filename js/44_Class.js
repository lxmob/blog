/*
  class 语法糖
  本质上就是在模拟构造函数
  将 ES5 以前声明构造函数的方式换了一种方式，增加代码的可读性、维护性
  
  注意的点：
  1.原型中共有属性方法不可枚举
  2.构造实例必须使用 new 关键字
  3.声明方式可以是表达式形式，声明类存在 TDZ
  4.类默认具备 constructor 不写不会报错
  5.默认是严格模式
*/

class Person {
  // 定义 constructor 属性构造器函数
  constructor (name, age) {
    // 实例化对象“私有属性”
    this.name = name;
    this.age = age;
  }

  // ES2017 “私有属性”新写法
  house = 'big villa';
  car = ['Benz', 'Toyota'];

  // “共有属性”存放在原型对象中
  run () {
    console.log('run my city');
  }
}
// console.log(Person);
// console.log(typeof Person); // 'function'

// class 原型中声明的属性和方法是不可枚举的
// 拓展 class 原型对象的共有属性，通过这种方式配置的属性可以枚举
// 因为字面量创建对象的方式，属性描述信息默认都为 true => 37_objectAssign.js
Object.assign(Person.prototype, {
  eat: function () {
    console.log('have a eat');
  }
})
// console.log(Object.keys(Person.prototype)); // [ 'eat' ]

// 定义 static 静态属性和方法
class MerkleTree {
  static rootHash = Math.random();
  static verifyTx() {
    console.log('tx fee');
  }
}
let mTree = new MerkleTree();
// console.log(mTree.rootHash); // undefined
// console.log(MerkelTree.rootHash); // 静态属性方法仅构造函数本身可以访问
// console.log(MerkleTree.verifyTx()); // undefined

// class 中定义取值函数
class VerkleTree {
  get rootHash() {
    return Math.random();
  }
  set hashVal(val) {
    console.log(val);
  }
}
let vTree = new VerkleTree();
// console.log(vTree.rootHash);
// console.log(VerkleTree.rootHash); // undefined

// class 中继承关键字 extends
class Singer extends Person {
  // 派生类必须使用 super 关键字来调用父类构造器创建实例化对象
  constructor(name, age) {
    super(name, age);
    // this 只有当 super 调用后才能访问
    // console.log(this);
  }
}
let s = new Singer('iu', 18);
console.log(s);

/*
  super 关键字
  1.在 constructor 中是父类的构造器
  2.在对象方法中是原型对象
  3.在 static 静态方法中是继承的父类
*/
let obj = {
  name: 'kiin',
  run() {
    console.log(super.city);
  }
}
let proto = { city: 'beijing' };
Object.setPrototypeOf(obj, proto);
obj.run(); // 'beijing'

/*
  class 修饰器模式
  在 ES5 可以通过 defineProperty 对属性进行描述
  而在 ES6 想要对 class 类属性和方法进行描述要使用修饰器
  修饰器就是在不改变原有结构的基础上，新增功能
  好处是能够将业务与逻辑的分离，使代码块更加简洁，可维护性更高
*/
@unable
class Modifier {
  @readonly
  grass () {
    console.log('grass');
  }

  @log('click')
  click () {
    console.log('click');
  }
}
function unable (tar) {
  tar.isAble = true;
}
function readonly (tar, key, descriptor) {
  console.log(tar, key, descriptor);
}

// 通常用来做“埋点”，每操作一次数据，想对操作的动作做一个数据记录
function log (type) {
  return function (tar, key, descriptor) {
    let _method = descriptor.value;
    descriptor.value = (...args) => {
      _method.apply(tar, args);
      console.log(type);
    }
  }
}
