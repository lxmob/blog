// es6 变量默认值
function test1(x = 1, y = 2){
  console.log(x + y);
}
// test1(3, 7);
// test1(1);
// test1(null, 4);
// test1();

let x = 1; // 全局作用域变量 x
function foo1(y = x){
  let x = 2; // 函数作用域变量 x
  console.log(y) // 1
}
// foo1();

function foo2(x = 1){
  // let x = 2; // 与函数作用域中形参重复声明
  console.log(x); // 报错
}

function foo3(x = x){
// 当函数具有默认值且执行时函数 () 内会形成一个单独的作用域
// 可以看作是 function foo3(let x = x) 
// 当取 x 值时 x 存放在暂时性死区
  console.log(x); // 报错
}
// foo3();

// 设置默认值形成块级作用域
function foo(x, y = function(){ x = 2; console.log(x);}){
  var x = 3;
  // x = 3;
  y();
  console.log(x); // 3
}
foo();
console.log(x); // 1


// es6 变量解构赋值

// 模式匹配（结构化赋值）
// let [a, b, c] = [1, 2, 3];
// console.log(a, b, c); // 1 2 3

// let [a, [b], [[c]]] = [1, [2], [[3]]];
// console.log(a, b, c); // 1 2 3

// 解构失败
// let [a, [b], [[c]]] = [1, [], [[]]];
// console.log(a, b, c); // 1 undefined undefined

// 不完全解构
// let [a, [], [[]]] = [1, [2], [[3]]];
// console.log(a); // 1

// 解构默认值
// let [a = 6] = [];
// console.log(a); // 6

// let [a, b = 2] = [1, undefined];
// console.log(a, b); // 1 2

// let [a, b = 2] = [1, null];
// console.log(a, b); // 1 null

// 默认值也可以是函数
// function test2(){
//   console.log(1);
// }
// let [a = test2()] = [1];
// console.log(a); // 1

// 默认值也可以是变量
// let [a = 1, b = a] = [];
// console.log(a, b);


// es6 对象默认值写法
let pName = 'ming',
    pAge = 27,
    pKey = 'custom',
    pVal = 'key',
    person = {
      pName,
      pAge,
      run(){}, // es6 对象方法写法
      [pKey + pVal]: pName // es6 字符串拼接属性
    }
// console.log(person);

// es6 对象解构赋值
// let {a: a, b: b, c: c} = {a: 1, b: 2, c: 3};
// let {a, b, c} = {a: 1, b: 2, c: 3}; // es6 简写
// console.log(a, b, c); // 1 2 3

// 根据对应的键名映射自定义键名称
// let {a: cta, b: ctb, c: ctc} = {a: 1, b: 2, c: 3}; 
// console.log(cta, ctb, ctc); // 1 2 3

// 不完全解构和默认值
// let {a = 1, b, c, e} = {b: 2, c: 3, d: 4};
// console.log(a, b, c, e); // 1 2 3 undefined

// 重名键值映射
let person1 = {name: 'ming', age: 27, son: {son: {name: 'sanny'}}}
let {son: {son: son1}} = person1;
// console.log(son1.name); // 'sanny'


// es6 括号解构赋值
// let a;
// {a} = {a: 1}; // 语法错误，js 认为 {} 内是一个块级作用域
// ({a} = {a: 1}); // 加上 () 按照表达式解析
// console.log(a); // 1

// 使用 let/var 声明变量解构赋值加上 () 就报错
// let [(a)] = {a: 1}; // 语法错误
// let ({a: b}) = {a: 1}; // let is not defined => let = {a: 1}
// let {(a): b} = {a: 1}; // 语法错误
// let {a: (b)} = {a: 1}; // 语法错误
// console.log(b);

// 解构赋值匹配规则需要相同才能够匹配
// [(b)] = [3];
// console.log(b); // 3 作为全局变量

// ([b]) = [3];
// console.log(b); // 报错，匹配的规则不同 () 与 [] 无法匹配

// ({a: (b) = {}});
// console.log(b); // {} b 默认值

// let a = {};
// [(a.b)] = [3];
// console.log(a); // {b: 3}

// 混合形式，模式匹配解构赋值
let arr = [1, 2, 3], obj = {};
[obj.a, obj.b, obj.c] = arr;
// console.log(obj); // {a: 1, b: 2, c: 3}

// 数组也是特殊的对象，也能进行解构赋值
// 数组与对象匹配，按照索引的模式
let arr1 = [1, 2, 3];
let {0: first, [arr.length - 1]: last} = arr1;
// console.log(first, last);


// es6 函数解构赋值
function test3([x, y]){ // 数组参数形式
  console.log(x, y);
}
// test3([1, 2]); // 1 2
// test3([1]); // 1 undefined
// test3([]); // undefined undefined

function test4({x, y}){ // 对象参数形式
  console.log(x, y);
}
// test4({y: 2, x: 1}); // 1 2
// test4({y: 2}); // undefined 2
// test4({}); // undefined undefined

function test5({x = 10} = {}, {y} = {y: 10}){ 
  // x 解构时空对象没有匹配到 x 所以默认值就是 10
  console.log(x, y);
}
// test5(); // 10 10
// test5({}, {}); // 10 undefined
// test5({x: 2}, {y: 3}); // 2 3


// es6 解构隐士转换问题
const uki = 'mingg'
const [a, b, c, d, e] = uki;
console.log(a, b, c, d, e); // 'm i n g g'

const {length: len} = uki;
console.log(len); // 5

const {toString: tStr} = 123;
console.log(tStr); // function

// 基础类型中 Boolean String Number 是可以进行隐士转换的
// 而 undefined null 是不可以进行隐士转换的

// const {und} = undefined;
// console.log(und); // 报错

// const {nll} = null;
// console.log(nll); // 报错
