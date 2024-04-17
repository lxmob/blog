/* 
  数组是对象的另一种特殊形式，它是一种有序的集合，可以存储任意类型的数据
  数组的 key 值是下标属性（index 索引）数组具备长度属性 .length
*/

// 1. 字面量声明
var arr1 = [1, 2, 3];

// 2. 构造函数声明
var arr2 = new Array();

// 3. 构造函数调用
var arr3 = Array();

// 所有的数组都继承于 Array.prototype 属性和方法
console.log(arr1.__proto__);
console.log(arr2.__proto__);
console.log(arr3.__proto__);


// 稀松数组
var arr4 = [, , 1, 2, , , 5, 6];
console.log(arr4.length); // 8

// 构造函数形式无法创建稀松数组
// var arr5 = new Array(, 1, 2, , 4, 5); // SyntaxError: Unexpected token ','
var arr5 = new Array(3); // [ empty * 3 ]
var arr6 = new Array("3"); // ['3']
