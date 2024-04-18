/*
  iterator 迭代器
  Symbol 函数中提供了 Symbol.iterator 接口
  对支持迭代器的数据结构上进行迭代方式时，就是在调用 Symbol.iterator 接口
  
  对连续的数据结构读取值的一种方式，每次拉取都会消耗一次数据的组织方式
  例如日常生活中的抽纸巾，每一张都按照顺序排列，当我们需要时进行抽取
  每抽取一次都会消耗一张纸，最终抽取完时纸巾也就为空了

  迭代器存在的意义就是为了给大多数数据结构提供迭代的方式
  Array Map Set WeekMap WeekSet arguments nodeList TypedArray(类型数组)
*/

let arr = [1, 2, 3, 4],
    gtor = arr[Symbol.iterator]();

// console.log(arr[Symbol.iterator]); // Symbol(Symbol.iterator):

// console.log(gtor.next()); // { value: 1, done: false }
// console.log(gtor.next()); // { value: 2, done: false }
// console.log(gtor.next()); // { value: 3, done: false }
// console.log(gtor.next()); // { value: 4, done: false }
// console.log(gtor.next()); // { value: undefined, done: true }

// 封装数组迭代器方法
function makeIterator(arr){
  let idx = 0;
  return {next: () => ({value: arr[idx++], done: idx > arr.length})};
}

let gtor2 = makeIterator(arr);

// console.log(gtor2.next()); // { value: 1, done: false }
// console.log(gtor2.next()); // { value: 2, done: false }
// console.log(gtor2.next()); // { value: 3, done: false }
// console.log(gtor2.next()); // { value: 4, done: false }
// console.log(gtor2.next()); // { value: undefined, done: true }


// for...of 方法提供了 Symbol.iterator 接口
// 用来迭代部署过迭代器接口类型的数据，除了对象类型
// 因为对象类型数据结构并不是连续的数据结构，所以它没有部署迭代器接口
// 对象属性遍历的方式可以通过 for...in 方法来遍历

let mKiin = {name: 'kiin', age: 27};
// for(let key of mKiin){console.log(key)}; // TypeError: mKiin is not iterable

// 如果想要在对象身上使用迭代器
// 可以通过向对象部署自定义迭代器的方式来实现迭代功能
mKiin[Symbol.iterator] = function(){
  return {i: 0, 
    next: function(){
      var isDone = this.i > 3;
      return {value: isDone ? undefined : this.i++, done: isDone};
    }
  }
}
// let mKiinGtor = mKiin[Symbol.iterator]();
// console.log(mKiinGtor.next());
// console.log(mKiinGtor.next());
// console.log(mKiinGtor.next());
// console.log(mKiinGtor.next());
// console.log(mKiinGtor.next());

// 支持 for...of 迭代
// for(let key of mKiin){console.log(key)}; // 0 1 2 3

// 支持展开运算符
// console.log([...mKiin]); // [ 0, 1, 2, 3 ]
