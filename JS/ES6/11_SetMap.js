// Set 类似于“数组”，但并非数组的一种集合
// Set 特点集合中每一个成员的值都是唯一的

// 创建集合
// 实例化参数必须是具备迭代器接口的数据类型
// 对象数据结构如果没有自定义配置迭代器接口则无法作为参数
let s1 = new Set([1, 2, 3]),
    s2 = new Set('asdioqweo');

// let s3 = new Set({name: 'kiin'});
// TypeError: object is not iterable (cannot read property Symbol(Symbol.iterator))

// 虽然普通对象实例不具备 iterator 接口
// 但是可以通过调用集合实例原型对象 add 方法来添加对象成员
s1.add({name: 'kk'});

// add 方法返回值是当前集合的实例化对象
// 支持链式调用，默认参数如果没有指定，值为 undefined
s1.add().add(null).add(NaN).add(undefined);

// console.log(s1);  // { 1, 2, 3, undefined, null, NaN, {name: 'kk'} }

// 集合长度属性
// console.log(s1.size); // 7

// 通过原型中 delete 方法删除集合中成员
// 该方法返回值为布尔值，表示成员是否删除成功，说明它不支持链式调用
s1.delete();
s1.delete(2);
s1.delete(3);

// console.log(s1); // { 1, null, NaN, { name: 'kk' } }

// has 判断某一项是否存在于集合中
// clear 清空集合方法返回值是 undefined
// console.log(s1.has(1)); // true
// console.log(s1.clear()); // undefined
// console.log(s1); // Set(0) {}

// 集合对象也具备迭代器接口
// 其中 keys 与 values 方法输出值一致
// for(let key of s1.keys()){console.log(key)};
// for(let key of s1.values()){console.log(key)};
// for(let key of s1.entries()){console.log(key)};

// 原型方法中迭代器接口默认调用的是 values
// for(let key of s1){console.log(key)};
// console.log(Set.prototype[Symbol.iterator] === Set.prototype.values); // true

// 使用 Set 集合求交集、并集、差集
let s3 = new Set([1, 2, 3]),
    s4 = new Set([2, 3, 4]);

let union = new Set([...s3, ...s4]);
// console.log(union); // Set(4) { 1, 2, 3, 4 }

let intersert = new Set([...s3].filter(x => s4.has(x)));
// console.log(intersert); // Set(2) { 2, 3 }

let diffset = new Set([...s3].filter(x => !s4.has(x)));
// console.log(diffset); // Set(1) { 1 }

// 映射新的数据结构
// 下面两种方式的输出结构是等价的
let s5 = new Set([...s3].map(x => x * 2)),
    s6 = new Set(Array.from(s3, x => x * 2));
// console.log(s5, s6); // Set(3) { 2, 4, 6 }

// -----------------------------------------------

// Map 类似于“对象”，但并非对象的一种数据结构，也可以称 hash 结构
// 它的键名范围不仅限于字符串，而对象的键名只能是字符串或者 Symbol 类型
let m1 = new Map([['name', 'kiin']]);

// key 值重复覆盖
m1.set('name', 'ming');

// 同样支持链式调用
m1.set(1, 'number')
  .set(true, Boolean)
  .set(new Date(), 'time')
  .set(() => {}, '=>')
  .set([], [1, 2, 3])
  .set({}, {name: 'kiin'})
  .set(new Map(), m1)
  .set(NaN, NaN)
  .set(null, null)
  .set(undefined, undefined);

// 通过 get 方法参数为键名，获取对应的数据值
// console.log(m1.get(NaN)); // NaN

// console.log(m1);

// Map 原型方法中迭代器接口默认调用的是 entries
// for(let [key, value] of m1){console.log(key, value)};
// console.log(Map.prototype[Symbol.iterator] === Map.prototype.entries); // true


// weakMap weakSet
// 采用弱引用机制，当外界强引用断掉时 obj = null 集合内的引用会立即被垃圾回收机制给回收
// 弱映射与弱集合，除了该集合以外，键对象没有被其它地方引用，都会被回收 -> DOM 事件绑定案例
// 要求每一个成员只能是对象数据类型，原始类型是没有生命周期的，因此不能作为键名
// 原型对象中不具备遍历方法，因为垃圾回收器根本不知道集合中的数据在什么时间是否被回收

let wm = new WeakMap(),
    ws = new WeakSet();

// ws.add(1); // TypeError: Invalid value used in weak set
// wm.set(true, 1); // TypeError: Invalid value used as weak map key
ws.add({name: 'kiin'});
wm.set({name: 'kiin'}, 1);


// deepClone
// null undefined Object RegExp Date
// function x 静态方法不拷贝

function deepClone(origin, hashMap = new WeakMap()){
  // 小技巧利用 null == undefined 的坑，减少类型判断
  if(origin == undefined || typeof origin !== 'object'){
    return origin;
  }
  if(origin instanceof RegExp){
    return RegExp(origin);
  }
  if(origin instanceof Date){
    return Date(origin);
  }
  // 每次拷贝前都先判断一下当前要拷贝的值是否存在 hash 表中
  const hashKey = hashMap.get(origin);
  // 如果存在就不拷贝了
  if(hashKey){
    return hashKey;
  }
  // 小技巧通过传入的源对象去构建新对象实例，避免区分数组与对象的类型判断
  let target = new origin.constructor();
  // 记录一下当前要拷贝对象的 hash 值
  hashMap.set(origin, target);
  for(let key in origin){
    if(origin.hasOwnProperty(key)){
      target[key] = deepClone(origin[key], hashMap);
    }
  }
  return target;
}

let obj1 = {
  name: 'kiin',
  info: {
    age: 18,
    car: ['Benz', 'Toyota']
  }
}
let obj2 = deepClone(obj1);
obj2.info.car.push('Mazda');
console.log(obj1);
console.log(obj2); // 成功深拷贝


// 深拷贝中循环引用问题
// 解决：使用 Map 结构 Hash 表的方案去记录一下，已拷贝过的对象不再拷贝
// 可以使用 weakMap 弱引用，当键名对象不在被外部所引用时，Map 内部存储的数据就被垃圾回收给释放了
let obj3 = {},
    obj4 = {}
obj3.quote = obj4;
obj4.quote = obj3;
console.log(deepClone(obj4)); // RangeError: Maximum call stack size exceeded
