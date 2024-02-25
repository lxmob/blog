/*
  function* 生成器函数
  通过生成器函数，生成一个 generator 对象
  生成器函数内部由 yield 产出不同的值，来控制函数内代码暂停和执行
  相当于一个状态机
*/

function* foo(){
  console.log(1);
  yield 'a';
  console.log(2);
  yield 'b';
  console.log(3);
  yield 'c';
  console.log(4);
  return 'd';
}
let gen1 = foo();
// 调用 next 方法执行 yield 后面的语句
// 返回值与迭代器返回的数据结构相同，同时将 yield 的值作为 value
// console.log(gen1.next());
// console.log(gen1.next());
// console.log(gen1.next());
// console.log(gen1.next());


// yield 本身本不会产出值，默认为 undefined
// 但是通过向 next 方法传递参数，使得 yield 产出值
function* bar(){
  let num = yield 'a';
  console.log(num); // 100
  yield 'b';
  return 'c';
}
let gen2 = bar();
// console.log(gen2.next());
// console.log(gen2.next(100));


// yield 作为函数参数使用
function* zen(){
  logAb(yield 'a', yield 'b');
}
function logAb(a, b){
  console.log(a, b); // undefined undefined
}
let gen3 = zen();
// console.log(gen3.next());
// console.log(gen3.next());
// console.log(gen3.next());


// 结合对象迭代器方式
// 这样做的好处使代码更加简洁
let mTimes = {count: 0};
mTimes[Symbol.iterator] = function*(){
  while(this.count < 3){
    yield this.count++;
  }
}
for(let key of mTimes){console.log(key)}; // 0 1 2


// yield 区间以及生成器对象 throw & return 方法
function* kong(){
  try{
    yield 1;
  }catch(e){
    console.log(e); // 捕获错误
  }
  yield 2;
}
let gen4 = kong();
// console.log(gen4.return()); // 终止后续执行
// console.log(gen4.next()); // 1
// 抛出错误，并默认执行了一次 next
// console.log(gen4.throw('type error')); // 2


// async await 生成器函数的语法糖
// “TJHolowaychuk” 编写的 co 库就是在执行 async await 做的事
// async 函数返回的是 Promise 对象，await 等待的也是 Promise 对象
