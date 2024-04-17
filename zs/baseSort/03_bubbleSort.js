/*
  比较相邻的元素如果第一个比第二个大就交换，反之不交换
  最终将最大的值排至末尾，对所有的元素重复以上的步骤，除了已排序好的末尾序列的数
  外层循环控制每一项递减，内存循环从起始位置开始两两对比，做交换

  流程设计
  0 - n-1
  0 - n-2
  0 - n-3
  0 - end
*/
var { swap, randomArr } = require('./01_utils.js');

function bubbleSort(arr = randomArr()){
  if(!arr || arr.length < 2){
    return arr;
  }
  var n = arr.length;
  for(var i = n - 1; i >= 0; i--){
    for(var j = 1; j <= i; j++){
      if(arr[j - 1] > arr[j]){
        swap(arr, j - 1, j);
      }
    }
  }
  return arr;
}

console.log(bubbleSort());
