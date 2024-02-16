// 'use strict';

// 属性名简写与分组表达式
let spv = 10,
    time = new Date().getTime(),
    first = 'Mr.',
    last = 'ming';
let p = {
  spv,
  time,
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

// Object.defineProperty 静态方法
// 允许在对象身上添加或修改一个属性进行描述并返回修改后的对象
Object.defineProperty(obj, 'age', {
  value: 27,
  writable: false,
  enumerable: true,
  configurable: false
})
// obj.age = 99; // 非严格模式下，属于静默失败不会报错，严格模式下报错
// delete obj.age; // 配置不可删除该对象属性
// console.log(obj);


/*
  getter setter
  js 中对象在赋值与读取时默认有两个操作 [[Get]] 与 [[Put]]
  [[Get]] 属性的读取，查找当前属性如果不存在，查找原型对象
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
