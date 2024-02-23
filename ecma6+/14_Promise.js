/*
  Promise 期约对象
  用来表示一个异步操作的成功或失败，异步行为的包装器
  主要解决回调地狱、异步异常捕获以及同步并发异步代码的问题
*/

// 问题一：回调地狱
const fs = require('fs');
fs.readFile('./12_Proxy.js', 'utf-8', (err, data) => {
  if(err) throw err;
  fs.readFile('./12_Proxy.js', 'utf-8', (err, data) => {
    if(err) throw err;
    fs.readFile('./12_Proxy.js', 'utf-8', (err, data) => {
      if(err) throw err;
      // ...
    })
  })
})

// 问题二：try...catch 只能够捕获同步代码的异常，无法捕获异步代码的异常
try{
  // console.log(a);
  setTimeout(() => {
    // console.log(a); // 终止后续代码执行
  }, 80)
}catch(e){
  // console.log(e); // ReferenceError: a is not defined
}


// Promise A+  bluebird
// ES6

// executor 执行者函数
let p1 = new Promise((resolve, reject) => {
  console.log('同步执行'); // executor
  Math.random() * 100 > 60 ? resolve() : reject();
})

console.log(123); // 同步代码

// Promise 实例化对象内部存在三种状态
// pending(初始化)  fufilled(resolve)(成功)  rejected(失败)
// 对象的状态不受外界影响，状态的不可逆

// then 方法接收两个参数 onFulfilled(成功回调) onRejected(失败回调)
// 当实例化对象状态发生变化时，通过回调函数触发操作
p1.then(
  () => {
    console.log('fufilled: 成功了!');
  },
  () => {
    console.log('rejected: 失败了!');
  }
)

// JS 异步任务
// 1.宏任务（宏任务队里）包含：setTimeout、Ajax、I/O、UI交互等
// 2.微任务（微任务队列）包含：Promise、Nodejs(process.nextTick)
// 微任务会优先于宏任务先放入异步队列

// Promise 实例状态本身就是异步的，当状态发生变更会将异步操作推进异步队列
// 等待主线程执行完毕后，将异步队列中待执行代码，放入主线程执行

// Promise.then 链式调用
// .then 执行后的返回值作为下一次 .then 的执行参数
// .then 方法调用没有参数将不会被执行
p1.then().then().then();
p1.then(
  () => {
    console.log('fufilled: 2次成功了!');
    // return true;
  },
  () => {
    console.log('rejected: 2次失败了!');
    // return new Promise.reject();
  }
).then(
  () => {
    console.log('fufilled: 3次成功了!');
  },
  () => {
    console.log('rejected: 3次失败了!');
  }
)

// Promise.catch 错误捕获
// catch 方法实例状态固化后，无法捕获错误
let p2 = new Promise((resolve, reject) => {
  // resolve();
  // reject('TypeError: a is not function');
  // console.log(num);
})
p2.then(null, (err) => console.log(err));
p2.catch((err) => console.log(err)); // 等于这种写法

// Promise 实例状态如果依赖于另外一个实例的失败状态，会导致自身状态无效
let p3 = new Promise((resolve, reject) => {
  // setTimeout(() => reject(new Error('failed')), 3000);
})
let p4 = new Promise((resolve, reject) => {
  // setTimeout(() => resolve(p3), 1000); // 等待 p3 的状态
})
p4.then((val) => {
  console.log(val); // 不会被执行
}).catch((err) => {
  console.log(err); // 捕获到错误
})

// Promise.all
// 将多个 Promise 实例整合成一个结果
// 参数需要是具备可迭代的集合，待所有结果完成后返回最终结果的数组
// 当集合内中有失败的 Promise 时，将第一个失败的 Promise 结果返回
let p5 = Promise.all([
  new Promise((resolve, reject) => reject(1)),
  new Promise((resolve, reject) => reject(2))
])
p5.then((res) => {
  console.log(res); // [ true, true ]
}).catch((err) => {
  console.log(err); // 1
})

// Promise.race
// 无论成功还是失败，都会返回一个 Promise 结果
// 根据可迭代的集合中，谁先触发结果就使用谁作为最终返回值
let p6 = Promise.race([
  new Promise((resolve) => {
    setTimeout(() => resolve(1), 2000);
  }),
  new Promise((resolve) => {
    setTimeout(() => resolve(2), 1500);
  })
])
p6.then((res) => {
  console.log(res);
})



