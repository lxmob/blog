// includes startsWith endsWith
// 这三个方法都是用来判断字符串中是否包含子串
let str1 = 'hash function is point code';

// console.log(str1.startsWith('h')); // true
// console.log(str1.startsWith('hash ')); // true
// console.log(str1.startsWith('f', 4)); // false
// console.log(str1.startsWith('f', 5)); // true

// console.log(str1.endsWith('code')); // true
// console.log(str1.endsWith('c', str1.length - 3)); // true

// console.log(str1.includes('is')); // true
// console.log(str1.includes(' ')); // true


// repeat
// 指定重复字符串的拼接次数，返回新的字符串
let str2 = 'hello!';
// console.log(str2.repeat(3)); // 'hello!hello!hello!'
// console.log(str2.repeat(0)); // ''
// console.log(str2.repeat(-1)); // RangeError: Invalid count value
// console.log(str2.repeat(2.5)); // 'hello!hello!'


// padStart padEnd
// 指定长度，按照具体参数值来填充字符串，返回新的字符串
let str3 = new Date().getMonth() + 1 + '月';
// console.log(str3.padStart(3)); // ' 2月'
// console.log(str3.padStart(3, 0)); // '02月'
// console.log(str3.padStart(10, 0)); // '000000002月'
// console.log(str3.padStart(2, 0)); // '2月'
// console.log(str3.padStart(0, 0)); // '2月'


// 模板字符串支持向字符串中增加 `${ 表达式 }`
let num = 10,
    count = 20,
    str4 = 'number is';
// console.log(`${str4} ${num + count}`); // 'number is 30'

// 函数调用也可以作为表达式的结果拼接字符串
function fn(){return [1, 2, 3]};
// console.log(`callback ${fn()}`); // 'callback 1,2,3'

// 这里是将函数隐士调用 toString 方法转为字符串后拼接的结果
// console.log(`callback ${fn}`); // 'callback function fn(){ [1, 2, 3] }'

// 应用于渲染模板
let userInfoList = [
  {name: 'kiin', age: 18}, 
  {name: 'ming', age: 27}
]
function tableRender(){
  return (
    `<table>
      ${userInfoList.map(item => (
        `<tr><td>${item.name}</td></tr>
         <tr><td>${item.age}</td></tr>`
      )).join('')}
    </table>`
  )
}
// tagTemp`${tableRender()}`;


// 模板函数
// 第一项参数是用表达式符号来做分割符，组成的字符串数组
// 后续参数是模板字符串中拼接每一项表达式的值
function tagTemp($, $1, $2){
  console.log($); // [ 'test ', ' render ', '' ]
  console.log($1); // 30
  console.log($2); // 200
}
// tagTemp`test ${count + num} render ${count * num}`;

// 使用模板字符串的形式，可能会导致恶意人员进行代码注入
// 例如向代码中添加 script 恶意脚本
// 使用模板函数防止恶意脚本注入
function safeHTML(temp){
  let rsl = temp.join('');
  for(var i = 1; i < arguments.length; i++){
    let arg = String(arguments[i]);
    rsl += arg.replace(/</g, '&lt').replace(/>/g, '&gt');
  }
  return rsl
}
let evilStr = '<script>alter("evil")</script>';
console.log(safeHTML`sent message for you ${evilStr}`);
