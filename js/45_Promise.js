/*
  Promise 期约对象
  异步行为的包装器，用来表示一个异步操作的成功或失败
  主要解决回调地狱、异步捕获异常以及同步并发异步代码的问题
*/

// 回调地狱
function test1 () {
  function test2 () {
    function test3 () {
      // ...
    }
  }
}

// try...catch
// 只能够捕获同步代码的异常，无法捕获异步代码的异常
try {
  // console.log(a);
  setTimeout(() => {
    // console.log(a); // 异步错误，终止后续代码执行
  }, 80)
} catch (e) {
  // console.log(e); // 捕获到同步代码错误
}

/*
  JS 异步任务
  1.宏任务（宏任务队里）包含：setTimeout、Ajax、I/O、UI交互等
  2.微任务（微任务队列）包含：Promise、Nodejs(process.nextTick)
  微任务会优先于宏任务先放入异步队列
*/

/*
  Promise 实例化对象内部存在三种状态
  pending(初始化)  fufilled(resolve)(成功)  rejected(失败)
  实例状态发生变更是异步行为，状态一旦确认，不可逆
*/

// executor 执行者
// 函数内部执行语句是同步行为
let p1 = new Promise((resolve, reject) => {
  // 同步执行
  Math.random() * 100 > 60 ? resolve() : reject();
})

// then 方法接收两个参数成功回调和失败回调
// 当 Promise 实例状态发生变化时，触发成功或失败的回调
p1.then(
  () => {
    console.log('fufilled: 成功了!');
  },
  () => {
    console.log('rejected: 失败了!');
  }
)

// Promise.then 链式调用
// .then 执行后的返回值作为下一次 .then 的执行参数
// .then 方法调用没有传入参数，方法将不会被执行
p1.then().then().then();

// Promise.catch 错误捕获
// Promise 实例状态固化后，无法捕获错误
new Promise((resolve) => {
  // resolve();
  // console.log(num);
}).catch((err) => console.log(err)); // ReferenceError: num is not defined

// Promise.all
// 将多个 Promise 实例整合成一个结果
// 参数需要是具备可迭代的集合，待所有结果完成后返回最终结果的数组
// 当集合内中有失败的 Promise 时，将第一个失败的 Promise 结果返回
Promise.all([
  new Promise((resolve, reject) => reject(1)),
  new Promise((resolve, reject) => reject(2)),
]).catch((err) => console.log(err)); // 1

// Promise.race
// 无论成功还是失败，都会返回一个 Promise 结果
// 根据可迭代的集合中，谁先触发结果就使用谁作为最终返回值
Promise.race([
  new Promise((resolve) => setTimeout(() => resolve(1), 2000)),
  new Promise((resolve) => setTimeout(() => resolve(2), 1000)),
]).then((val) => console.log(val)); // 2

// thenable 对象
// 通过将对象内部部署 then 方法实现转为 Promise 对象
let p7 = {
  then: function (resolve) {
    // executor 函数
    resolve(123);
    console.log(456); // 同步执行
  }
}
Promise.resolve(p7).then((val) => console.log(val)); // 123
