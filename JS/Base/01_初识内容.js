/*
  浏览器发展历程
  1990 年蒂姆·伯纳森·李，发明了超文本分享资源 Hyper-Text
        正式命名为 World Wide Web 移植到 C 语言上改名 libwww -> nexus
        目的是为了允许别人访问他人编写的网站

  1993 美国伊利诺大学 NCSA 组织，马克·安德森开发了 MOSIAC 浏览器，用来显示图片，图形化浏览器

  1994 马克·安德森和吉姆·克拉克（硅图 SGI 图形算法）一起创建了 MOSIAC communication corporation
        由于 MOSIAC 这个商标被伊利诺大学注册后又转卖给 spy glass 公司
        又更名为 Netscape communication corporation 网景公司（netscape navigator 浏览器）

  1996 微软公司收购了 spy glass 公司，使用 MOSIAC 浏览器内核开发了自己的 IE internet exploror 浏览器（trident 内核）
        后续又发布了 IE3 同时发布了 JScripe 脚本语言

  1996 网景公司布兰登·艾奇在 Netscape 开发了 livescript 脚本语言，借着 Sun 公司的 Java 爆火更名为 javascript

  2001 IE6 和 XP 诞生，ie6 带来了 js 引擎

  2003 mozilla 非盈利组织根据 Netscape navigator 开源了浏览器内核源码开发了自己的 firefox 浏览器

  2008 google 基于 webkit/blink 开发了 chrome 浏览器，带来了 V8 引擎
      1.直接翻译机器码
      2.独立于浏览器运行

  2009 甲骨文 oracle 收购了 Sun 公司，js 所有权归属甲骨文公司
*/

/*
  主流浏览器内核
  ie -> trident
  chrome -> webkit/blink
  safari -> webkit
  firefox -> gecko
  oprea -> presto
  edge -> webkit 
*/

/*
  European Computer Manufacturers Association 欧洲计算机制造商协会
  主要进行评估、开发、认可电信和计算机标准的组织
  制定了一套标准，其中 ECMA-262 是脚本语言的规范和标准 ECMAScript

  ECMAScript 发展历程
  97年 1.0
  98年 2.0
  99年 3.0 js通行标准
  07年 4.0草案 mozilla -> Branden Eich
  08年 4.0中止 过于激进 -> 改善 3.1 -> Harmony -> ECMAScript5
  09年 5.0发布 -> Harmony -> 其中 1/2 命名为 JS.NEXT 另外的 1/2 命名为JS.NEXT.NEXT
  11年 5.1 ISO国际标准
  13年 ES6 -> JS.NEXT -> 草案发布
  15年 ES6正式发布 -> ECMASript2015
*/

/*
  解释型语言：通过解释器进行一行一行解析代码后解释执行 
  编译型语言：通过编译器先编译代码然后翻译成机器码最终执行

  JS 是一门解释型语言（动态弱类型语言）
  动态 -> JS 的灵活性可随意对任意变量进行赋值
  弱类型 -> 不预先指定类型或者不锁定类型

  两者的区别
  1.跨平台性
    解释型语言不需要根据不同的系统平台进行移植
    编译型语言需要对不同平台编译不同平台的可执行文件，跨平台困难
    
  2.翻译的过程不一样
    编译型语言，源码 ——> 编译器 ——> 机器语言 ——> 可执行的文件
    解释型语言，源码 ——> 解释器 ——> 解释一行就执行一行

  混合型（java）
  混合型 java ——> javac ——> .class ——> JVM 解释执行
  编译型 C++ ——> .cpp 源码 ——> 编译器 ——> .s 汇编 ——> 汇编器 ——> .obj 目标代码 ——> 连接器 ——> 可执行文件
*/

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
