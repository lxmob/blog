/* 
  JS组成的三个部分
    ECMAScript：语法、变量、关键字、保留字、原始值、原始类型、引用类型、对象、函数等等
    DOM：document object model 遵循 w3c 规范
    BOM：browser object model 没有规范（其实指每个浏览器产商都有不同的设计，没有相应规范约束，从而导致混乱）
*/

/*
  JS中的三种对象
  1. 本地对象：Native Object
    Object、Function、Array、String、Number、Boolean
    Error、EvalError、SyntaxError、RangeError、ReferenceError、TypeError、URIError
    Date、RegExp

  2. 内置对象：Built-in Object
    Global、Math
    isNaN()、parseInt()、decodeURI()、encodeURI()、Infinity、NaN、undefined

    本地对象和内置对象都是 ES 的内部对象

  3. 宿主对象：Host Object
    执行 JS 脚本的环境提供的对象，浏览器对象，浏览器各大厂商提供存在兼容性问题
    浏览器对象 window（BOM）和 document（DOM）-> w3c规范
*/

/* 
  JS 引擎是单线程的
  为什么当我们在页面中操作进行下载文件，展现出进度条时还能继续进行其它操作呢？
  当文件正在下载进度条被 JS 线程频繁的计算产生结果
  在此时间段内我们还可以进行其它操作例如查看详情，弹框等等

  so...

  JS 是通过什么来实现这一步操作的？
    它是通过轮转时间片来模拟的多线程

  轮转时间片是什么？
    短时间之内轮流执行多个任务的片段

  执行步骤
    1. 有任务 1 和任务 2
    2. 进行切分任务 1 和任务 2
    3. 随机排列这些任务片段，组成队列
    4. 按照这个队列顺序将任务送进 JS 进程
    5. 然后 JS 线程执行一个又一个的任务片段
*/