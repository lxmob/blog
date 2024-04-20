/*
  Proxy 代理对象
  用于创建一个对象的代理，实现对象基本操作的拦截与自定义
  例如属性查找、赋值、枚举、函数调用等
*/

// new Proxy(target, handle-options)

let o = { name: 'kiin' };
let p = new Proxy(o, {
  get: function (tar, key) {
    console.log(tar); // { name: 'kiin' }
    console.log(key); // 'name'
    return tar[key];
  },
  set: function (tar, key, val) {
    tar[key] = val;
  }
})
// console.log(p.name); // 'kiin'
// console.log(p.age); // undefined

p.age = 18;
// console.log(p.age); // 18
// console.log(p, o); // { name: 'kiin', age: 18 }

/*
  Reflect 内置对象
  用于拦截 JS 基本操作方法与 Proxy-handle 方法相同
  Reflect 同 Symbol 一样无法进行构造，它不是一个函数对象

  Reflect 相当于一个方法容器，JS 对 Object 的定义非常的混乱
  存在很多共用的方法，ECMA 认为将这些方法放入一个新的 Reflect 当中
  未来大家都去使用 Reflect 而不是 Object 的静态方法，然而并没什么卵用
  标准是有了，但是长久以来大家的开发模式形成习惯，很难去改变
*/

console.log(Reflect);
// console.log(Reflect.get(p, 'name')); // 'kiin'
console.log(Reflect.has(p, 'name')); // true
