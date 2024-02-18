/*
  Array.of(...item)
  作用：通过 n 个参数来创建一个新的数组实例，用来替代 Array
  返回值：返回数组新实例化对象
*/
let arr1 = new Array(),
    arr2 = new Array(3),
    arr3 = Array.of(),
    arr4 = Array.of(1, false, null, {});
// console.log(arr1); // []
// console.log(arr2); // [ <3 empty items> ]
// console.log(arr3); // []
// console.log(arr4); // [ 1, false, null, {} ]


/*
  Array.from(arrayList, mapFn, thisArg)
  作用：将类数组或部署迭代器的对象创建一个新的浅拷贝数组实例
  返回值：返回浅拷贝的数组实例
*/
function test(){
  console.log(arguments);
  console.log([].slice.call(arguments)); // ES5
  console.log(Array.from(arguments)); // ES6
}
// test(1, 2, 3);

let mObj = {[Symbol.iterator]: function(){
  return {i: 0, next: function(){
    let isDone = this.i > 3;
    return {value: isDone ? undefined : this.i++, done: isDone};
  }}
}}
// console.log(Array.from(mObj)); // [ 0, 1, 2, 3 ]


/*
  includes(value, fromIndex)
  作用：判断一个数组是否包含一个指定的值
  返回值：布尔值
*/
let arr5 = [4, 5, 6];
console.log(arr5.includes(4)); // true
console.log(arr5.includes(1)); // false

// 索引大于数组长度则直接返回 false
console.log(arr5.includes(6, 4)); // false
console.log(arr5.includes(5, -100)); // true

// polyfill
Array.prototype.includes = function(tar){
  var arg2 = arguments[1],
      i = arg2 ? arg2 : 0,
      ans = false;
  for(; i < this.length; i++){
    if(tar === this[i]){
      ans = true;
      break;
    }
  }
  return ans;
}


/*
  fill(value, start, end)
  作用：填充数组默认从下标 0 开始
  返回值：填充后的数组，改变原数组
*/ 
let arr6 = [1, 2, 3];
// arr6.fill(0); // [ 0, 0, 0 ]
// arr6.fill(0, 2); // [ 1, 2, 0 ]
// arr6.fill(0, -2); // [ 1, 0, 0 ]
// arr6.fill(0, 4); // [ 1, 2, 3 ]
// arr6.fill(0, 1, 2); // [ 1, 0, 3 ]
// arr6.fill(0, 1, 3); // [ 1, 0, 0 ]
// arr6.fill(0, 1, -2); // [ 1, 0, 0 ]
// console.log(arr6);


/*
  keys values entries
  生成迭代器类型数组对象与 Object 身上的方法行为一致
*/
let arr7 = ['exercise', 'unbrella', 'pair'];
// for(let key of arr7.keys()){console.log(key)};
// for(let key of arr7.values()){console.log(key)};
// for(let key of arr7.entries()){console.log(key)};


/* 
  find(fn, this) 
  作用：查找元素满足函数的第一个元素的值
  返回值：目标元素，未找到则返回 undefined
*/
let arr8 = [{name: 'ming'},{name: 'lili'},{name: 'aiqing'}];
let rsl7 = arr8.find(function (item, idx, arr){
  // 返回一个真值表示已经找到了匹配的元素
  // 确定返回值后立即停止迭代
  return item.name === 'ming';
})
console.log(rsl7); // {name: 'ming'}

// polyfill
Array.prototype.find = function (cb){
  var that = this,
      len = that.length,
      arg2 = arguments[1] || window,
      ans = undefined;
  for(var i = 0; i < len; i++){
    if(cb.apply(arg2, [that[i], i, that])){
      ans = that[i];
      break;
    }
  }
  return ans;
}


/* 
  findIndex(fn, this)
  作用：查找元素满足函数第一个元素的索引值
  返回值：目标元素索引，未找到则返回 -1
*/
let arr9 = [1, 2, 11, 12];
let rsl = arr9.findIndex(function (item, idx, arr){
  // 返回一个真值表示已经找到了匹配的元素
  // 确定返回值后立即停止迭代
  return item % 2 === 0;
});
console.log(rsl); // 1

// polyfill
Array.prototype.findIndex = function (cb){
  var that = this,
      len = that.length,
      arg2 = arguments[1] || window,
      ans = -1;
  for(var i = 0; i < len; i++){
    if(cb.apply(arg2, [that[i], i, that])){
      ans = i;
      break;
    }
  }
  return ans;
}
