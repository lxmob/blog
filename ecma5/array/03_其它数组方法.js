/* 
  join()
  作用：数组转字符串，通过传递的参数作为分隔符进行连接，不传递默认以逗号分隔
  返回值：拼接后的字符串
  影响：不改变原数组
*/
var arr1 = ['Wind','Rain','Fire'];
console.log(arr1.join()); // "Wind,Rain,Fire"
console.log(arr1.join('')); // "WindRainFire"
console.log(arr1.join(0)); // "Wind0Rain0Fire"

// 源码实现
Array.prototype.join = function(spt = ''){
  var str = this[0]
  for(var i = 1; i < this.length; i++){
    str += ('' + spt + this[i]);
  }
  return str;
}


/* 
  concat(...args) 
  作用：合并数组，参数可以是值或者数组
  返回值：合并后的新数组
  影响：不改变原数组
*/
var arr2 = [4, 5, 6];
console.log(arr2.concat(1, 2, 3)); // [4, 5, 6, 1, 2, 3]
console.log(arr2.concat([1, 2], {})); // [4, 5, 6, 1, 2, {}]

// 源码实现
Array.prototype.concat = function(){
  var nArr = [...this];
  for(var i = 0; i < arguments.length; i++){
    var cur = arguments[i];
    Array.isArray(cur) ? nArr.push(...cur) : nArr.push(cur);
  }
  return nArr;
}


/* 
  slice(start, end)
  作用：浅拷贝数组，包括 start 但不包括 end
  返回值：新的数组
  影响：不改变原数组
*/
var arr3 = ['ming', 1, 2, 3, 'lili', NaN];
console.log(arr3.slice(2)); // [2, 3, 'lili', NaN]
console.log(arr3.slice(2, 4)); // [2, 3]
console.log(arr3.slice(-1, 2)); // []
console.log(arr3.slice(-2)); // ['lili', NaN]

var arr4 = [{ name: 'ming' }, 10, 11];
var arr5 = arr4.slice(0, 1);
arr5[0].name = 'lili';
console.log(arr5, arr4); // {name: 'lili'}


/* 
  indexOf(value, fromIndex) 
  作用：查找指定元素位置
  返回值：查找到元素第一次出现时的下标，如果没有找到返回 -1
*/
var arr6 = [4, 5, 5, 6];
console.log(arr6.indexOf(5)); // 1
console.log(arr6.indexOf(1)); // -1
console.log(arr6.indexOf(5, 2)); // 2

// 源码实现
Array.prototype.indexOf = function(tar){
  var arg2 = arguments[1],
      i = arg2 ? arg2 : 0,
      ans = -1;
  for(; i < this.length; i++){
    if(tar === this[i]){
      ans = i;
      break;
    }
  }
  return ans;
}
