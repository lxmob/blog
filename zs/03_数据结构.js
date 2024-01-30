/* 
  所有的数据结构都是由连续结构、跳转结构组成的
  数组：连续结构 => 便于寻址 O(1) 不便于增删数据 O(n)
  链表：跳转结构 => 便于增删数据 O(1) 不便于寻址 O(n)
*/


// 从一个数组中计算 sum(L, R) 左侧数到右侧数的累加和
// 但是并不想每次都遍历这个数组求得累加和，通过每次都遍历求累加和浪费不必要的性能
// 而且 sum(L, R) 这个方法调用次数很频繁如何解决这样的问题
var arr = [2, 3, 4, 9, 1, 2, 5];

/* 
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
*/


/* 
  第二种：前缀和数组结构
  0 + 1 = 1 前一项与当前项累加保存至当前项
  H[2, 5, 9, 18, 19, 21, 26]
  sum(L, R) 当L=0时结果 = H[R]   当L!=0时结果 = H[R] - H[L-1]
*/
function rangeSum(arr){
  var N = arr.length,
      preSum = [];
      preSum[0] = arr[0];
  for(var i = 1; i < N; i++){
    preSum[i] = preSum[i - 1] + arr[i];
  }
  return function(L, R){
    return L == 0 ? preSum[R] : preSum[R] - preSum[L - 1];
  }
}
var sumFn = rangeSum(arr);
console.log(sumFn(2, 5));
console.log(sumFn(5, 5));
console.log(sumFn(6, 5));
console.log(sumFn(5, 6));