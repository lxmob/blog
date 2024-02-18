/* 
  ASCII 码表
  ASCII 指的是“美国信息交换标准代码”，ASCII 码表分为表一（0 - 127）表二（128 - 255）1 个字节（byte）
  Unicode 码涵盖了 ASCII 码表，从 255 之后开始就是 2 个字节。
*/


// charCodeAt 方法
// 该方法可以返回指定位置字符的 Unicode 编码，返回值范围是 0 - 65535 之间的整数。
// charCodeAt 与 charAt 方法操作相似，但是后者返回的是指定位置的字符子串
console.log('12345'.charAt(0)); // '1'
console.log('12345'.charAt(-1)); // ''
console.log('12345'.charAt(NaN)); // '1'
console.log('12345'.charAt(Infinity)); // ''
console.log('12345'.charAt(10)); // ''

var str = 'abc';
var pos = str.charCodeAt(0);
console.log(pos); // 97


// 通过该方法的特性可以算出任意字符串所占用的字节总数
function strByteSum(str){
  var sum = str.length;
  if(!sum) return 0;
  for(var i = 0; i < str.length; i++){
    var pos = str.charCodeAt(i);
    if(pos > 255) sum++;
  }
  return sum;
}
console.log(strByteSum('jkahsdihjqikwe}{:}信')); // 20 byte


// 通过上面的方法可以获得任意字符串的占用字节数
// 可以根据此方法衍生出对一个字符串的数组进行从大到小进行排序
// 运用数组原型对象身上的 sort() 方法来实现功能
var arr = ['阴天多云', 'minga', '晴天', '暴风雨'];
function sortStrBytes(arr){
  return arr.sort((a, b) => strByteSum(a) - strByteSum(b));
}
console.log(sortStrBytes(arr)); // ['晴天', 'minga', '暴风雨', '阴天多云']


// 案例字符串中出现次数最多的字母
var str = 'kjasduiqwoejnasdmmmasldkasdiip';
function getStrTimes(str){
  var temp = {};
  for(var i = 0; i < str.length; i++){
    temp.hasOwnProperty(str[i]) ? temp[str[i]]++ : (temp[str[i]] = 1);
  }
  return temp;
}
console.log(getStrTimes(str));