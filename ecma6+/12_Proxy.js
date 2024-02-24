/*
  Proxy 代理对象
  用于创建一个对象的代理，实现对象基本操作的拦截与自定义
  例如属性查找、赋值、枚举、函数调用等
*/

// new Proxy(target, handle-options)

let o = {name: 'kiin'};
let p = new Proxy(o, {
  get: function(tar, key){
    console.log(tar); // { name: 'kiin' }
    console.log(key); // 'name'
    return tar[key];
  },
  set: function(tar, key, val){
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
*/

console.log(Reflect);
// console.log(Reflect.get(p, 'name')); // 'kiin'
console.log(Reflect.has(p, 'name')); // true
