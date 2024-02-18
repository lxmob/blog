// 'use strict';

// 属性名简写与分组表达式
let spv = 10,
    time = new Date().getTime(),
    first = 'Mr.',
    last = 'ming';
let p = {
  spv, time,
  say(){console.log('hello world')},
  [first + last]: 'hi'
}
// console.log(p);


// 属性描述符
// 值(value) 
// 可写(writable) 
// 可枚举(enumerable) 
// 可配置(configurable)
let obj = {name: 'ming'},
    desc = Object.getOwnPropertyDescriptor(obj, 'name');
// console.log(desc);

// Object.defineProperty
// 允许在对象身上添加或修改一个属性进行描述并返回修改后的对象
// 这样做的好处就是可以配置对象属性的一些特性
Object.defineProperty(obj, 'age', {
  value: 27,
  writable: false,
  enumerable: true,
  configurable: false
})
// obj.age = 99; // 非严格模式下静默失败
// delete obj.age; // 配置不可删除该对象属性
// console.log(obj);

// 使用对象点语法添加属性方式，属性描述信息默认值都是 true
// obj.car = ['Benz', 'Toyota'];
// console.log(Object.getOwnPropertyDescriptor(obj, 'car'));

// 使用 defineProperty 方法来添加属性方式，属性描述信息默认值都是 false
// Object.defineProperty(obj, 'car', {value: ['Benz', 'Toyota']});
// console.log(Object.getOwnPropertyDescriptor(obj, 'car'));

/*
  getter setter
  js 中对象在赋值与读取时默认有两个操作 [[Get]] 与 [[Put]]
  [[Get]] 属性的读取，查找当前属性，如果不存在查找原型对象
  [[Put]] 属性的赋值
    1.首先看是否有重写 getter 与 setter
    2.然后看配置 writable 是否可写
    3.赋值
  
  getter setter 就是为了给对象身上的属性默认操作进行方法重写
*/

let op = {
  log: ['BMW', 'Mazda'],
  get latest(){ // 配置 getter 计算属性
    if(this.log.length == 0){
      return undefined;
    }
    return this.log[this.log.length - 1];
  },
  set push(cur){ // 要求至少有一个参数
    this.log.push(cur);
  }
}
op.push = 'Benz';
console.log(op.latest); // 'Benz'

let ob = {num: 1};
Object.defineProperty(ob, 'check', {
  get: function(){
    return this.num++;
  }
})
console.log(ob.check); // 1
console.log(ob.check); // 2


let somebody = {name: 'ming'};

// Object.preventExtensions 禁止扩展
// 禁止对象添加新属性并且防止对象的原型被重新指定
// Object.preventExtensions(somebody); // 禁止扩展

// somebody.name = 'mingming'; // 可以改
// delete somebody.name; // 可以删
// somebody.car = 'Benz'; // 不可以新增

// 方法新增属性
// 不区分模式 TypeError: Cannot define property car, object is not extensible
// Object.defineProperty(somebody, 'car', {value: 'Benz'});

// 不区分模式 TypeError: #<Object> is not extensible
// somebody.__proto__ = {constructor: Object}; // 禁止更改原型


// isExtensible 判断一个对象是否可扩展
// console.log(Object.isExtensible(somebody)); // false


// Object.seal 密封对象
// 底层通过调用 preventExtensions 禁止扩展对象
// 然后循环对象的属性将描述信息 configurable 设置为 false
// Object.seal(somebody);

// somebody.name = 'mingming'; // 可以改
// delete somebody.name; // 不可以删
// somebody.car = 'Benz'; // 不可以新增

// 方法新增属性
// 不区分模式 TypeError: Cannot define property car, object is not extensible
// Object.defineProperty(somebody, 'car', {value: 'Benz'});


// isSealed 判断一个对象是否被密封
// Object.isSealed(somebody); // true


// Object.freeze 冻结对象(浅冻结)
// 不能给冻结的对象新增、修改、删除属性
// Object.freeze(somebody);

// somebody.name = 'mingming'; // 不可以改
// somebody.age = 27; // 不可以新增
// delete somebody.name; // 不可以删

// 方法新增属性
// 不区分模式 TypeError: Cannot define property car, object is not extensible
// Object.defineProperty(somebody, 'car', {value: 'Benz'});


// isFrozen 判断一个对象是否被冻结
// Object.isFrozen(somebody); // true

// console.log(somebody);


// Object.is 判断两个值是否相等
// console.log(NaN == NaN); // false
// console.log(-0 == +0); // true
// console.log(null == undefined); // true

// console.log(Object.is(NaN, NaN)); // true
// console.log(Object.is(-0, +0)); // false
// console.log(Object.is(null, undefined)); // false


// Object.assign 合并对象仅包含可枚举自身属性(浅拷贝)
let mTar = {name: 'ming'},
    mObj = {age: 27, car: ['Benz', 'Toyota']};
// Object.assign(mTar, mObj);
// mergeObj.car.push('Mazda'); // 浅拷贝
// mergeObj.age = 18; // 拷贝属性值
// console.log(mTar);

let mHouse = {house: 'villa'};

// 第一个参数是目标对象
// 如果是原始类型先将目标对象转为包装对象然后进行拷贝源对象可枚举属性
// console.log(Object.assign(true, mHouse)); // Boolean {true, house: 'villa'}
// console.log(Object.assign(123, mHouse)); // Number {123, house: 'villa'}

// 第二个参数是源对象只将源对象可枚举的属性拷贝至目标对象
// 如果是原始类型，先将参数二转为包装对象然后判断属性是否可枚举
// 包装类中 [[primitiveValue]] 属性不可枚举
// 所以导致拷贝失败，忽略源对象属性
// console.log(Object.assign(mHouse, true)); // { house: 'villa' }
// console.log(Object.assign(mHouse, 123)); // { house: 'villa' }

// 原始类型中只有字符串包含可枚举的属性
// console.log(Object.assign(mHouse, 'key')); // {0: 'k', 1: 'e', 2: 'y', house: 'villa'}
// console.log(Object.assign('key', mHouse)); // String {'key', house: 'villa'}

// null undefined 将被忽略
// console.log(Object.assign(mHouse, null)); // { house: 'villa' }
// console.log(Object.assign(null, mHouse)); // TypeError: Cannot convert undefined or null to object

// 源对象与目标对象属性相同，后面覆盖前面
let mBag = {tk: {name: 'supreme'}},
    mWallet = {tk: {name: 'coach'}};
// console.log(Object.assign(mBag, mWallet)); // {tk: {name: 'coach'}}

// 数组合并按照索引值进行覆盖
let mCar = ['Benz', 'Toyota'],
    nCar = ['Mazda'];
// console.log(Object.assign(mCar, nCar)); // ['Mazda', 'Toyota']


// 取值函数的合并只保留属性与属性值
let mFoo = {
  get name(){
    return 'foo';
  },
  set date(val){
    console.log(val);
  }
}
let mBar = {name: 'bar'};
// console.log(Object.assign(mBar, mFoo)); // { name: 'foo' }

// 解决 assign 无法拷贝取值函数的问题
// 通过 getOwnPropertyDescriptors 获取属性描述符的对象集合
// 调用 defineProperties 重新给对象设置属性描述信息
Object.defineProperties(mBar, Object.getOwnPropertyDescriptors(mFoo));
// console.log(mBar); // { name: [Getter], date: [Setter] }
// console.log(mBar.name); // 'foo'


// 另一种实现克隆对象的方法
let mKiin = {name: 'kiin', age: 19},
// 通过 create 方法来选取需要继承对象的原型
    mCopy = Object.create(
      Object.getPrototypeOf(mKiin), // 该方法来获取对象的原型
      Object.getOwnPropertyDescriptors(mKiin) // 该参数为新对象添加可枚举属性描述符
    )
// mKiin.car = 'Mazda';
// console.log(mCopy); // { name: 'kiin', age: 19 }


// 对象属性迭代的方法
// 仅包含自身可枚举的属性(不包含继承属性)
// keys values entries
let mJack = {name: 'jack', age: 18};
Object.defineProperty(mJack, 'car', {value: 'Toyota', enumerable: false});
// console.log(Object.keys(mJack)); // [ 'name', 'age' ]
// console.log(Object.values(mJack)); // [ 'jack', 18 ]
// console.log(Object.entries(mJack)); // [ [ 'name', 'jack' ], [ 'age', 18 ] ]


// ES2017 对象展开方式
let mSpread = {name: 'spread', next: 'rest'},
    mRest = {name: 'rest', last: 'spread'},
    nSpread = {...mSpread, ...mRest};
// console.log(nSpread); // { name: 'rest', next: 'rest', last: 'spread' }
