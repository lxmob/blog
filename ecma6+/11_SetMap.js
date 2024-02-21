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


// Map 类似于“对象”，但并非对象的一种数据结构，也可以称 hash 结构
// 它的键名范围不仅限于字符串，而对象的键名只能是字符串
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
