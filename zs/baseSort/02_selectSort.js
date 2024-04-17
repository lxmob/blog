/*
  数列中选择出最小的数后，并存放在序列的起始位置
  外层循环控制每一项，内层循环与每一项做对比记录最小值下标
  对比完后根据记录的最小值下标与外层循环当前项做交换

  流程设计
  0 - n-1 有序
  1 - n-1
  2 - n-1
  i - n-1
*/
var { swap, randomArr } = require('./01_utils.js');

function selectSort(arr = randomArr()){
  if(!arr || arr.length < 2){
    return arr;
  }
  var n = arr.length;
  for(var i = 0; i < n; i++){
    var minNumIdx = i;
    for(var j = i + 1; j < n; j++){
      minNumIdx = arr[j] < arr[minNumIdx] ? j : minNumIdx;
    }
    swap(arr, i, minNumIdx);
  }
  return arr;
}

console.log(selectSort());
