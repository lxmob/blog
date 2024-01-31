/* 
  变量名称必须仅包含字母、数字、符号 $ 和 _
  首字符不能是数字，无法使用保留字和关键字命名
  小驼峰写法 camelCase
  可以用中文声明变量，但是极其不推荐
  变量同名后面的值覆盖前面的值
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