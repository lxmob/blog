/* 
  类数组对象不会继承 Array.prototype 不具备数组原型对象身上的方法
  常见的类数组对象有
    1.通过 js 选择器获取的 dom 集合
    2.arguments 对象
*/

var classArr1 = document.getElementsByClassName('.class'),
    classArr2 = document.getElementsByTagName('div'),
    classArr3 = document.getElementsByName('username'),
    classArr4 = document.querySelectorAll('*');

function classArr5(){
  console.log(arguments) // 类数组对象
}
classArr5(1,2,3);


/* 
  创建一个类数组继承数组身上的方法，即可以是对象也可以是数组
  创建类属性的条件：
    1.需要具备下标属性
    2.需要具备 length 属性且与下标末尾对应
    3.需要继承来自 Array.prototype 的 push、splice 方法
*/
var classObjArr = {
  0: '类数组',
  1: '数组方法',
  2: '对象属性',
  name: 'classArr',
  options: 'config',
  length: 3,
  push: Array.prototype.push,
  splice: Array.prototype.splice
};
console.log(classObjArr[2]); // '对象属性'
console.log(classObjArr[1]); // '数组方法'
console.log(classObjArr.length); // 3


// 案例题
var simObjArr = {
  2: 3,
  3: 4,
  length: 2,
  push: Array.prototype.push,
  splice: Array.prototype.splice
};
simObjArr.push(1);
simObjArr.push(2);
console.log(simObjArr); // Object(4) [empty × 2, 1, 2, push: ƒ, splice: ƒ]