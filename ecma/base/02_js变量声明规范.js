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

var a = 'a',
    b = 'b';

var _ = '_',
    $ = '$';

// var 123 = 123 // SytanxError
// var class = 'class' // SytanxError

var 中国 = '中国';
console.log(中国); // 中国

var a = 'aa',
    b = 'bb';
console.log(a, b); // 'aa' 'bb'