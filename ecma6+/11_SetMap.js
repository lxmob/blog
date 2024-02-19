/*
  Set 类似于数组但并非数组的一种数据结构

  Set 特点
  1.数据集中每一个成员的值是唯一的
  2.使用原型对象身上 add 方法支持链式调用

  Set 应用场景
  1.可以做数组去重
  2.求集合交集、并集、差集
*/

let s1 = new Set([1, 2, 3]),
    s2 = new Set('asdioqweo');

// 所有支持迭代器接口的数据都可以作为实例化时参数
// 对象数据结构不具备迭代器接口
// s3 = new Set({name: 'kiin'}); 
// TypeError: object is not iterable (cannot read property Symbol(Symbol.iterator))

s1.add(1).add().add(null).add(NaN).add(undefined);
s1.add({name: 'kk'});

// console.log(s1);  // { 1, 2, 3, undefined, null, NaN, {name: 'kk'} }
// console.log(s1.size); // 7

// delete 方法返回的是布尔值
// 说明目前只有 add 方法支持链式调用
// s1.delete(2).delete(3); // TypeError: s1.delete(...).delete is not a function
s1.delete(2);
s1.delete(3);
s1.delete(undefined);

// console.log(s1); // { 1, null, NaN, { name: 'kk' } }

// has 方法判断某一项是否存在于集合中
// console.log(s1.has(1)); // true

// 清空集合方法返回 undefined
// console.log(s1.clear()); // undefined
// console.log(s1); // Set(0) {}

// 迭代器方法 keys values entries
// keys 与 values 方法输出值行为一致
// for(let key of s1.keys()){console.log(key)};
// for(let key of s1.values()){console.log(key)};
// for(let key of s1.entries()){console.log(key)};

// 原型方法中迭代器接口默认调用的是 values
// for(let key of s1){console.log(key)};
// console.log(Set.prototype[Symbol.iterator] === Set.prototype.values); // true

// 求交集、并集、差集
let s3 = new Set([1, 2, 3]),
    s4 = new Set([2, 3, 4]);

let union = new Set([...s3, ...s4]);
// console.log(union); // Set(4) { 1, 2, 3, 4 }

let intersert = new Set([...s3].filter(x => s4.has(x)));
// console.log(intersert); // Set(2) { 2, 3 }

let diffset = new Set([...s3].filter(x => !s4.has(x)));
// console.log(diffset); // Set(1) { 1 }

// 映射新的数据结构
let s5 = new Set([...s3].map(x => x * 2)),
    s6 = new Set(Array.from(s3, x => x * 2));
// console.log(s5, s6); // Set(3) { 2, 4, 6 }


/*
  Map 类似于对象但并非对象的一种数据结构(hash结构)
  它的键类型值范围不仅限于字符串，而对象只能是字符串
*/
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

// console.log(m1.get(NaN)); // NaN

// console.log(m1);

// 原型方法中迭代器接口默认调用的是 entries
// for(let [key, value] of m1){console.log(key, value)};
// console.log(Map.prototype[Symbol.iterator] === Map.prototype.entries); // true
