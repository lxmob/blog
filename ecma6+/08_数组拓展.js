// Array.of
// 通过 n 个参数来创建一个新的数组实例，用来替代 Array
let arr1 = new Array(),
    arr2 = new Array(3),
    arr3 = Array.of(),
    arr4 = Array.of(1, false, null, {});
// console.log(arr1); // []
// console.log(arr2); // [ <3 empty items> ]
// console.log(arr3); // []
// console.log(arr4); // [ 1, false, null, {} ]

// Array.from
// [arrayList, mapFn, thisArg]
// 将类数组或部署迭代器的对象创建一个新的浅拷贝数组实例
function test(){
  console.log(arguments);
  console.log([].slice.call(arguments)); // es5
  console.log(Array.from(arguments)); // es6
}
// test(1, 2, 3);

let mObj = {[Symbol.iterator]: function(){
  return {i: 0, next: function(){
    let isDone = this.i > 3;
    return {value: isDone ? undefined : this.i++, done: isDone};
  }}
}}
// console.log(Array.from(mObj)); // [ 0, 1, 2, 3 ]

// [].fill
// [value, start, end]
// 填充数组默认从下标 0 开始，改变原数组
let arr5 = [1, 2, 3];
// arr5.fill(0); // [ 0, 0, 0 ]
// arr5.fill(0, 2); // [ 1, 2, 0 ]
// arr5.fill(0, -2); // [ 1, 0, 0 ]
// arr5.fill(0, 4); // [ 1, 2, 3 ]
// arr5.fill(0, 1, 2); // [ 1, 0, 3 ]
// arr5.fill(0, 1, 3); // [ 1, 0, 0 ]
// arr5.fill(0, 1, -2); // [ 1, 0, 0 ]
// console.log(arr5);

// [].keys、values、entries
// 生成迭代器对象与对象身上的方法行为一致
let arr = ['exercise', 'unbrella', 'pair'];
// for(let key of arr.keys()){console.log(key)};
// for(let key of arr.values()){console.log(key)};
// for(let key of arr.entries()){console.log(key)};

// findIndex includes
console.log([NaN].indexOf(NaN)); // -1
console.log([NaN].findIndex((k) => Object.is(NaN, k))); // 0
console.log([NaN].includes(NaN)); // true
