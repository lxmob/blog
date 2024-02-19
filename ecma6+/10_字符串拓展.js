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
// 指定重复字符串的拼接次数，并返回构造新的字符串
let str2 = 'hello!';
// console.log(str2.repeat(3)); // 'hello!hello!hello!'
// console.log(str2.repeat(0)); // ''
// console.log(str2.repeat(-1)); // RangeError: Invalid count value
// console.log(str2.repeat(2.5)); // 'hello!hello!'


// padStart padEnd
// 给定长度填充字符串，时钟、彩票号码案例
let str3 = new Date().getMonth() + 1 + '月';
// console.log(str3.padStart(3)); // ' 2月'
// console.log(str3.padStart(3, 0)); // '02月'
// console.log(str3.padStart(10, 0)); // '000000002月'
// console.log(str3.padStart(2, 0)); // '2月'
// console.log(str3.padStart(0, 0)); // '2月'


// 模板字符串 ${ 表达式 }
let num = 10,
    count = 20,
    str4 = 'number is';
// console.log(`${str4} ${num + count}`); // 'number is 30'

function fn(){return [1, 2, 3]};
// console.log(`callback ${fn}`); // 'callback function fn(){ [1, 2, 3] }'
// console.log(`callback ${fn()}`); // 'callback 1,2,3'

// 渲染模板
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
// console.log(tableRender());


// 标签模板
// 参数一是表达式符号做分割后的字符串数组
// 后续参数是模板字符串表达式的值
function tagTemp($, $1, $2){
  console.log($); // [ 'test ', ' render ', '' ]
  console.log($1); // 30
  console.log($2); // 200
}
// tagTemp`${tableRender()}`;
// tagTemp`test ${count + num} render ${count * num}`;

// 防止恶意脚本注入
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
