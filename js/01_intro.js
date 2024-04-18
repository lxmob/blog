/* 
  JS组成的三个部分
  ECMAScript：语法、变量、关键字、保留字、原始值、基本类型、引用类型、对象、函数等等
  DOM：document object model 遵循 w3c 规范
  BOM：browser object model 没有规范（其实指每个浏览器产商都有不同的设计，没有相应规范约束，从而导致混乱）
*/

/*
  JS中的三种对象
  1.本地对象：Native Object
    是指 JS 语言本身提供的对象，可以直接在 JS 代码中使用
    Object、Function、Array、String、Number、Boolean
    Error、EvalError、SyntaxError、RangeError、ReferenceError、TypeError、URIError
    Date、RegExp

  2.内置对象：Built-in Object
    它们不是由 JS 语言本身提供的，而是由宿主环境所提供的
    例如浏览器环境 window，以及 Nodejs 中的 Global
    Math、JSON等
    isNaN()、parseInt()、decodeURI()、encodeURI()、Infinity、NaN、undefined

    本地对象和内置对象都是 ES 的内部对象

  3.宿主对象：Host Object
    执行 JS 脚本的环境提供的对象，浏览器对象，浏览器各大厂商提供存在兼容性问题
    浏览器对象 window（BOM）和 document（DOM）-> w3c规范
*/

/* 
  JS 引擎是单线程的，但是它可以模拟多线程
  让用户在等待加载进度的同时去进行其它操作
  具体一点 JS 是通过轮转时间片来模拟的多线程
  轮转时间片是短时间之内轮流执行多个任务的片段

  具体的执行步骤
  1.有任务 1 和任务 2
  2.进行切分任务 1 和任务 2
  3.随机排列这些任务片段，组成队列
  4.按照这个队列顺序将任务送进 JS 进程
  5.然后 JS 线程执行一个又一个的任务片段
*/

/* 
  var 声明变量规范
  1.变量名称必须仅包含字母、数字、符号 $ 和 _
  2.首字符不能是数字，无法使用保留字和关键字命名
  3.小驼峰写法 camelCase
  4.可以用中文声明变量，但是极其不推荐
*/

/*
  var 声明变量特点
  1.可以不预先指定值，在预编译阶段默认为 undefined
  2.可以重复声明但是会导致环境变量污染，可以使用立即执行函数解决外部环境变量污染
  3.变量声明提升至作用域顶部
*/

/* 
  基本类型
  Number String Boolean undefined null
  在栈内存中开辟一块空间记录变量值，如果是相同变量名重新赋值（注意不是覆盖栈内存中原有变量的空间）
  而是在栈内存中重新开辟一块空间记录新的变量值，栈内存空间中的值是不可变更的

  引用类型
  Object Array Function Date RegExp等
  在栈内存中开辟一块空间记录的是指针地址
  而这个指针指向堆内存中的一块空间记录着数据值
*/
