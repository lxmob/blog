// 1. SyntaxError 语法错误
// 变量名不规范、关键字赋值
// var 1 = 1;
// new = 1;
// function = 1;
// function 1test(){};


// 2. ReferenceError 引用错误
// 变量或函数未被声明但是被调用或引用
// foo();
// console.log(num);
// var a = 1 = 2;


// 3. RangeError 范围错误
// 数组长度为负数
// [1, 2, 3].length = -1;
// 对象方法参数超出预设范围
// (100).toFixed(-1);
// 函数堆栈调用超过最大值


// 4. TypeError 类型错误
// 调用不存在的方法，首先判断类型是否可调用
// 123();
// ({}).say();
// 实例化原始值
// new '123';


// 5. URIError URI错误
// console.log(encodeURI('中文')); // 将中文字符转为固定的编码
// console.log(decodeURI('%E4%B8%AD%E6%96%87')) // 将编码转为中文
// 编码遵循一定的规范
// decodeURI('%qwei1298*&');


// 6. EvalError eval函数执行错误
// 不推荐使用，会导致 XSS 攻击
// eval('console.log("eval")'); // 放入任意代码字符串都会执行


// 以上介绍的 JS 错误类型都可以人为制造抛出
// 都对应的有错误类型构造函数，它们继承于 Error 构造函数
// var err = new Error('custom error');
// throw err;
// var tErr = new TypeError('type error');
// throw tErr;


// JS 是解释性语言解释一行输出一行
// 说明在执行代码的时候如果遇到错误，后续代码都不会执行了
// 可以通过 try...catch 来规避这种风险
console.log('1');
// console.log(num);
try {
  console.log(num);
} catch (e) {
  // catch 中只有出现错误时才会执行代码块
  console.log(e.name); // 'ReferenceError'
  console.log(e.message); // 'num is not defined'
} finally {
  console.log('finally'); // finally 无论 try 代码块中是否有错都会执行
}
console.log('2');
