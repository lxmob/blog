/* 
  push(...args)
  作用：末尾增加元素
  返回值：新数组的长度
*/
var arr1 = [4, 5, 6];
console.log(arr1.push(1, 2, 3)); // 6
console.log(arr1); // [4, 5, 6, 1, 2, 3]

// 源码实现
Array.prototype.push = function(){
  for(var i = 0; i < arguments.length; i++){
    this[this.length] = arguments[i];
  }
  return this.length;
}


/* 
  unshift(...args)
  作用：头部增加元素
  返回值：新数组的长度
*/
var arr2 = [4, 5, 6];
console.log(arr2.unshift(1, 2, 3)); // 6
console.log(arr2); // [1, 2, 3, 4, 5, 6]

// 源码实现
Array.prototype.unshift = function(){
  var argsLen = arguments.length,
      sumLen = argsLen + this.length;
  for(var i = sumLen - 1; i >= 0; i--){
    this[i] = this[i - argsLen];
    if(i - argsLen < 0){
      this[i] = arguments[i];
    }
  }
  return this.length;
}


/* 
  pop()
  作用：删除最后一个元素
  返回值：被删除的数（如果数组为空则返回 undefined）
*/
var arr3 = [4, 5, 6];
console.log(arr3.pop()); // 6
console.log(arr3.pop()); // 5
console.log(arr3.pop()); // 4
console.log(arr3.pop()); // undefined

// 源码实现
Array.prototype.pop = function(){
  var len = this.length,
      cur = this[len - 1];
  if(!len) return cur;
  this.length--;
  return cur;
}


/* 
  shift()
  作用：删除第一个元素
  返回值：被删除的数（如果数组为空则返回 undefined）
*/
var arr4 = [4, 5, 6];
console.log(arr4.shift()); // 4
console.log(arr4.shift()); // 5
console.log(arr4.shift()); // 6
console.log(arr4.shift()); // undefined

// 源码实现
Array.prototype.shift = function(){
  var len = this.length,
      cur = this[0];
  if(!len) return cur;
  for(var i = 0; i < len; i++){
    this[i] = this[i + 1];
  }
  this.length--;
  return cur;
}


/* 
  splice(startIdx, delCount, ...args)
  作用：增删改数组
  返回值：被删除元素组成的数组，若没有被删除的元素则返回空数组
*/
var arr5 = ['parrot','anemone','blue','trumpet','sturgeon'];
console.log(arr5.splice(arr5.length - 3, 2)); // ['blue', 'trumpet']
console.log(arr5.splice(-2, 1)); // ['trumpet']
console.log(arr5.splice(2)); // ['blue', 'trumpet', 'sturgeon']
// 获取指定的下标元素
function splice(idx, arr){
  return (idx += idx >= 0 ? 0 : arr.length);
}
console.log(arr5[splice(3, arr5)]); // 'trumpet'
console.log(arr5[splice(-3, arr5)]); // 'blue'


/* 
  reverse()
  作用：反转数组
  返回值：反转后的源数组
*/
var arr6 = [1, 2, 3];
console.log(arr6.reverse()); // [3, 2, 1]
console.log(arr6); // [3, 2, 1]

// 源码实现
Array.prototype.reverse = function(){
  for(var i = 0; i < (this.length >> 1); i++){
    var temp = this[i];
    this[i] = this[this.length - 1 - i];
    this[this.length - 1 - i] = temp;
  }
  return this;
}


/* 
  sort(fn?)
  作用：数组排序
  如果省略参数元素按照转换为的字符串的各个字符的 Unicode 码进行排序
  返回值：排序后的源数组
*/
var arr7 = [12, 32, 1, 2, 90, 56];
arr7.sort(); // [1, 12, 2, 32, 56, 90]
function compareFn(){
  if(a > b){
    return 1 // 正值，[b, a]
  }else if(a < b){
    return -1 // 负值，[a, b]
  }else{
    return 0 // 不变
  }
}
arr7.sort((a, b) => a - b); // [1, 2, 12, 32, 56, 90]
arr7.sort(() => Math.random() - 0.5); // 随机排列 => Math.random 开区间 0-1
