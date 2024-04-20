// ES6 对象属性名简写与分组表达式
let spv = 10,
  time = new Date().getTime(),
  first = 'Mr.',
  last = 'ming';

let p = {
  spv,
  time,
  say() {
    console.log('hello world');
  },
  [first + last]: 'hi'
}

/*
  Object.defineProperty
  允许在对象身上添加或修改一个属性进行描述并返回修改后的对象
  这样做的好处就是可以配置对象属性的一些特性
  使用 defineProperty 方法添加的属性，属性描述信息默认值是 false
  使用对象点语法添加属性方式，属性描述信息默认值都是 true
*/
Object.defineProperty(p, 'age', {
  value: 27
})

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
  get latest () {
    // 配置 getter 计算属性
    if (this.log.length == 0) {
      return undefined;
    }
    return this.log[this.log.length - 1];
  },
  set push (cur) {
    // 要求至少有一个参数
    this.log.push(cur);
  }
}
op.push = 'Benz';
console.log(op.latest); // 'Benz'

// 添加属性描述
let ob = { num: 1 };
Object.defineProperty(ob, 'check', {
  get: function () {
    return this.num++;
  }
})
console.log(ob.check); // 1
console.log(ob.check); // 2

/*
  Object.getOwnPropertyDescriptor
  获取对象属性描述符
  value
  writable
  enumerable
  configurable
  getter
  setter
*/
let desc = Object.getOwnPropertyDescriptor(p, 'time');
console.log(desc);
