/*
  将第一待排序序列第一个元素看做一个有序序列
  把第二个元素到最后一个元素当成是未排序序列
  每次将未排序序列的第一个元素与有序序列中对比选择合适的位置进行插入

  流程设计
  0 - 0 已经有序
  0 - 1
  0 - 2
  0 - n-1
*/
var { swap, randomArr } = require('./01_intro.js');

function insertSort(arr = randomArr()){
  if(!arr || arr.length < 2){
    return arr;
  }
  var n = arr.length;
  for(var i = 1; i < n; i++){
    // var newNumIdx = i;
    // while(newNumIdx - 1 >= 0 && arr[newNumIdx - 1] > arr[newNumIdx]){
    //   swap(arr, newNumIdx - 1, newNumIdx);
    //   newNumIdx--;
    // }
    for(var pre = i - 1; pre >= 0 && arr[pre] > arr[pre + 1]; pre--){
      swap(arr, pre, pre + 1);
    }
  }
  return arr;
}

console.log(insertSort());
