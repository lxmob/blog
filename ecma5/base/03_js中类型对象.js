/* 
  原始类型
    包含：Number String Boolean undefined null
    定义：在栈内存中开辟一块空间记录变量值，如果是相同变量名重新赋值（注意不是覆盖栈内存中原有变量的空间）
      而会在栈内存中重新开辟一块空间记录新的变量值，栈内存空间中的值是不可变更的。

  引用类型
    包含：Object Array Function Date RegExp等
    定义：在栈内存中开辟一块空间记录的是指针，而这个指针指向堆内存中的一块空间记录着数据值。
*/

var abc = 'abc';
    abc = 123;

var arr = [1, 2, 3];
var obj = { list: arr };
obj.list = [2, 3, 4];
console.log(arr);