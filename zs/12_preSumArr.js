/* 
  所有的数据结构都是由连续结构、跳转结构组成的
  数组：连续结构 -> 便于寻址 O(1) 不便于增删数据 O(n)
  链表：跳转结构 -> 便于增删数据 O(1) 不便于寻址 O(n)

  + - * / 都是属于固定时间的常数操作
  1 + 1 与 100万 + 100万 经历的计算过程都是固定的，底层都是 32 位信息计算相加的结果

  数组寻找也是属于固定时间的常数操作
  [1] 与 [100000] 经历的过程都是固定时间

  当调用一条语句时，所执行的过程是与固定时间有关还是与数据量有关的
  如果是与数据量有关的它就不是一个常数操作，反之如果与数据量无关的它就是一个固定时间的常数操作

  时间复杂度不关心系数和低阶项，只关心最高阶是什么
  当数据量很大时，时间复杂度就是来描述算法与数据量之间的关系，算法运行的增速时间
  1. 常数操作 O(1)
  2. 二分法 O(logn)
  3. 线性时间 O(n)
  4. 快排归并 O(nlogn) -> O(n) * O(logn)
  5. 简单排序 O(n2) -> 冒泡（等差数列）、插入、选择
  6. 旅行商 O(n!) 
*/

/*
  从一个数组中计算 sum(L, R) 左侧数到右侧数的累加和
  但是并不想每次都遍历这个数组求得累加和，通过每次都遍历求累加和浪费不必要的性能
  而且 sum(L, R) 这个方法调用次数很频繁如何解决这样的问题

  第一种：n*n / 2 表结构
     0  1  2  3  4  5  6 (R)
  0  2  5  9 18 19 21 26
  1  x  3  7 16 17 18 24
  2  x  x  4 13 14 16 21
  3  x  x  x  9 10 12 17
  4  x  x  x  x  1  3  8
  5  x  x  x  x  x  2  7
  6  x  x  x  x  x  x  5
  (L)

  第二种：前缀和数组结构
  0 + 1 = 1 前一项与当前项累加保存至当前项
  H[2, 5, 9, 18, 19, 21, 26]
  sum(L, R) 当L=0时结果 = H[R]   当L!=0时结果 = H[R] - H[L-1]
*/
var arr = [2, 3, 4, 9, 1, 2, 5];

function rangeSum(arr){
  var n = arr.length,
      preSum = [];
  preSum[0] = arr[0];
  for(var i = 1; i < n; i++){
    preSum[i] = preSum[i - 1] + arr[i];
  }
  return function(l, r){
    return l == 0 ? preSum[r] : preSum[r] - preSum[l - 1];
  }
}

var sumFn = rangeSum(arr);
console.log(sumFn(2, 5));
console.log(sumFn(5, 5));
console.log(sumFn(6, 5));
console.log(sumFn(5, 6));