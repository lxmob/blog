/* 
  forEach(fn, this)
  作用：迭代遍历，使数组中每一项元素执行一次函数
  返回值：undefined
*/
var arr1 = [1, 2, 3];
arr1.forEach(function(item, idx, arr){
  item *= 2;
});
console.log(arr1); // [1, 2, 3]
// 源码实现
Array.prototype.forEach = function(cb){
  var that = this,
      len = that.length,
      arg2 = arguments[1] || window;
  for(var i = 0; i < len; i++){
    cb.apply(arg2, [that[i], i, that]);
  }
}


/* 
  filter(fn, this)
  作用：过滤筛选，浅拷贝数组保留通过函数的元素项
  返回值：新数组
*/
var arr2 = [12, 5, 8, 130, 44];
var rsl2 = arr2.filter(function (item, idx, arr){
  // 函数返回真值则保留元素，反之则不保留
  return item >= 10;
});
console.log(rsl2); // [12, 130, 44]
// 源码实现
Array.prototype.filter = function (cb){
  var that = this,
      len = that.length,
      arg2 = arguments[1] || window,
      nArr = [];
  for(var i = 0; i < len; i++){
    cb.apply(arg2, [that[i], i, that]) ? nArr.push(that[i]) : '';
  }
  return nArr;
};


/* 
  map(fn, this)
  作用：映射，数组组中每一项元素都会调用函数，保留调用函数后的返回值
  返回值：新数组
*/
var arr3 = [2, 3, 4];
var rsl3 = arr3.map(function (item, idx, arr){
  return (item *= 2);
});
console.log(rsl3); // [4, 6, 8]
// 源码实现
Array.prototype.map = function (cb){
  var that = this,
      len = that.length,
      arg2 = arguments[1] || window,
      nArr = [];
  for(var i = 0; i < len; i++){
    nArr.push(cb.apply(arg2, [that[i], i, that]));
  }
  return nArr;
}


/* 
  some(fn, this)
  作用：单元测试，数组中至少有一个元素通过了函数
  返回值：布尔值
*/
var arr4 = [10, 11, 3];
var rsl4 = arr4.some(function (item, idx, arr){
  // 返回一个真值表示元素项通过了测试
  // 确定返回值后立即停止迭代
  return item % 2 === 0;
});
console.log(rsl4); // true
// 源码实现
Array.prototype.some = function (cb){
  var that = this,
      len = that.length,
      arg2 = arguments[1] || window,
      ans = false;
  for(var i = 0; i < len; i++){
    if(cb.apply(arg2, [that[i], i, that])){
      ans = true;
      break;
    }
  }
  return ans;
}


/* 
  every(fn, this)
  作用：数组中所有元素通过了函数
  返回值：布尔值
*/
var arr5 = [10, 11, 3];
var rsl5 = arr5.every(function (item, idx, arr){
  // 返回一个真值表示元素项通过了测试
  // 确定返回值后立即停止迭代
  return item >= 10;
});
console.log(rsl5); // false
// 源码实现
Array.prototype.every = function (cb){
  var that = this,
      len = that.length,
      arg2 = arguments[1] || window,
      ans = true;
  for(var i = 0; i < len; i++){
    if(!cb.apply(arg2, [that[i], i, that])){
      ans = false;
      break;
    }
  }
  return ans;
}


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
var rsl6 = arr6.reduce(function (pre, next){
  return (pre += next);
});
console.log(rsl6); // 15
// 源码实现
Array.prototype.reduce = function (cb, initVal){
  var that = this,
      len = that.length,
      arg2 = arguments[2] || window;
  for(var i = 0; i < len; i++){
    initVal = cb.apply(arg2, [initVal, that[i], i, that]);
  }
  return initVal;
}


/* 
  reduceRight(fn, initVal)
  作用：与 reduce 一样，结果是以倒叙的形式展示
  返回值：累计执行函数的结果
*/
Array.prototype.reduceRight = function (cb, initVal){
  var that = this,
      len = that.length,
      arg2 = arguments[2] || window;
  for(var i = len - 1; i >= 0; i--){
    initVal = cb.apply(arg2, [initVal, that[i], i, that]);
  }
  return initVal;
}


/* 
  find(fn, this) 
  作用：查找元素满足函数的第一个元素的值
  返回值：目标元素，未找到则返回 undefined
*/
var arr7 = [
  { name: 'ming' },
  { name: 'lili' },
  { name: 'aiqing' },
  { name: 'xiaoqing' },
];
var rsl7 = arr7.find(function (item, idx, arr){
  // 返回一个真值表示已经找到了匹配的元素
  // 确定返回值后立即停止迭代
  return item.name === 'ming';
});
console.log(rsl7); // {name: 'ming'}
// 源码实现
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
var arr = [1, 2, 11, 12];
var rsl = arr.findIndex(function (item, idx, arr){
  // 返回一个真值表示已经找到了匹配的元素
  // 确定返回值后立即停止迭代
  return item % 2 === 0;
});
console.log(rsl); // 1
// 源码实现
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
