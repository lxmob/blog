/* 
  forEach(fn, this)
  作用：迭代遍历，使数组中每一项元素执行一次函数
  返回值：undefined
*/
var arr1 = [1, 2, 3];
arr1.forEach(function (item, idx, arr) {
  item *= 2;
});
console.log(arr1); // [1, 2, 3]

// 源码实现
Array.prototype.forEach = function (cb) {
  var arg2 = arguments[1] || window;
  for (var i = 0; i < this.length; i++) {
    cb.apply(arg2, [this[i], i, this]);
  }
}

// -----------------------------------------------

/* 
  filter(fn, this)
  作用：过滤筛选，浅拷贝数组保留通过函数的元素项
  返回值：新数组
*/
var arr2 = [12, 5, 8, 130, 44];
var rsl2 = arr2.filter(function (item, idx, arr) {
  // 函数返回真值则保留元素，反之则不保留
  return item >= 10;
})
console.log(rsl2); // [12, 130, 44]

// 源码实现
Array.prototype.filter = function (cb) {
  var arg2 = arguments[1] || window,
      nArr = [];
  for (var i = 0; i < this.length; i++) {
    cb.apply(arg2, [this[i], i, this]) ? nArr.push(this[i]) : '';
  }
  return nArr;
}

// -----------------------------------------------

/* 
  map(fn, this)
  作用：映射，数组组中每一项元素都会调用函数，保留调用函数后的返回值
  返回值：新数组
*/
var arr3 = [2, 3, 4];
var rsl3 = arr3.map(function (item, idx, arr) {
  return (item *= 2);
})
console.log(rsl3); // [4, 6, 8]

// 源码实现
Array.prototype.map = function (cb) {
  var arg2 = arguments[1] || window,
      nArr = [];
  for (var i = 0; i < this.length; i++) {
    nArr.push(cb.apply(arg2, [this[i], i, this]));
  }
  return nArr;
}

// -----------------------------------------------

/* 
  some(fn, this)
  作用：单元测试，数组中至少有一个元素通过了函数
  返回值：布尔值
*/
var arr4 = [10, 11, 3];
var rsl4 = arr4.some(function (item, idx, arr) {
  // 返回一个真值表示元素项通过了测试
  // 确定返回值后立即停止迭代
  return item % 2 === 0;
})
console.log(rsl4); // true

// 源码实现
Array.prototype.some = function (cb) {
  var arg2 = arguments[1] || window,
      ans = false;
  for (var i = 0; i < this.length; i++) {
    if (cb.apply(arg2, [this[i], i, this])) {
      ans = true;
      break;
    }
  }
  return ans;
}

// -----------------------------------------------

/* 
  every(fn, this)
  作用：数组中所有元素通过了函数
  返回值：布尔值
*/
var arr5 = [10, 11, 3];
var rsl5 = arr5.every(function (item, idx, arr) {
  // 返回一个真值表示元素项通过了测试
  // 确定返回值后立即停止迭代
  return item >= 10;
})
console.log(rsl5); // false

// 源码实现
Array.prototype.every = function (cb) {
  var arg2 = arguments[1] || window,
      ans = true;
  for (var i = 0; i < this.length; i++) {
    if (!cb.apply(arg2, [this[i], i, this])) {
      ans = false;
      break;
    }
  }
  return ans;
}

// -----------------------------------------------

/* 
  reduce(fn, initVal)
  作用：归纳函数，遍历数组元素每一步都将当前元素的值与前一步的结果相加
  返回值：累计执行函数的结果
  fn = function (pre, next, idx, arr) {
    pre = 上一次调用的结果，如果指定了 initVal 则是指定值，否则就是 arr[0] 的值
    next = 当前元素的值，如果指定了 initVal 则是 arr[0]，否则就是 arr[1] 的值
    idx = 正在处理元素的下标索引
    arr = 调用了 reduce 方法的数组本身
  }
*/
var arr6 = [4, 5, 6];
var rsl6 = arr6.reduce(function (pre, next) {
  return (pre += next);
})
console.log(rsl6); // 15

// 源码实现
Array.prototype.reduce = function (cb, initVal) {
  var arg2 = arguments[2] || window;
  for (var i = 0; i < this.length; i++) {
    initVal = cb.apply(arg2, [initVal, this[i], i, this]);
  }
  return initVal;
}

// -----------------------------------------------

/* 
  reduceRight(fn, initVal)
  作用：与 reduce 一样，结果是以倒叙的形式展示
  返回值：累计执行函数的结果
*/
Array.prototype.reduceRight = function (cb, initVal) {
  var arg2 = arguments[2] || window;
  for (var i = this.length - 1; i >= 0; i--) {
    initVal = cb.apply(arg2, [initVal, this[i], i, this]);
  }
  return initVal;
}
