/* 
  归并排序
  D&C 分治法将已有序的子序合并得到完全有序的序列
  子序如何做到有序
  取两个子序指针移动对比大小拷贝值到新数组中当有一个子序指针越界即合并另一个子序中剩余项
  时间复杂度 O(n) * O(logN)
  自上而下的递归版本 
*/
var { randomArr } = require('./01_intro.js');

function mergeSort(arr = randomArr()){
  if(arr == null || arr.length < 2){
    return;
  }
  function process(arr, L, R){
    // base case
    if(L == R){
      return;
    }
    var mid = L + ((R - L) >> 1);
    // D&C分治
    process(arr, L, mid);
    process(arr, mid + 1, R);
    merge(arr, L, mid, R); // 后序递归
  }
  process(arr, 0, arr.length - 1);
}

function merge(arr, L, M, R){
  var nArr = [],
      i = 0,
      p1 = L, // 左序指针
      p2 = M + 1; // 右序指针
  // 两侧指针都未越界
  while(p1 <= M && p2 <= R){
    nArr[i++] = arr[p1] <= arr[p2] ? arr[p1++] : arr[p2++];
  }
  // 两侧指针有一侧越界
  while(p1 <= M){
    nArr[i++] = arr[p1++];
  }
  while(p2 <= R){
    nArr[i++] = arr[p2++];
  }
  // 覆盖原数组项
  for(var j = 0; j < nArr.length; j++){
    arr[L + j] = nArr[j]; // 左右两侧各要考虑到 -> L + j
  }
}

// 非递归实现归并排序 -> 迭代算步长
function mergeSortNotR(arr = randomArr()){
  if(arr == null || arr.length < 2){
    return
  }
  var N = arr.length,
      step = 1; // 步长
  while(step < N){
    var L = 0;
    while(L < N){
      // 边界情况当凑不够步长数时 break -> [2, 4, 2]
      if(step >= N - L){
        break;
      }
      var M = L + step - 1,
          R = M + Math.min(step, N - M - 1);
      merge(arr, L, M, R);
      L = R + 1; // 切换下一组
    }
    if(step > Math.floor(N / 2)){
      break;
    }
    step <<= 1;
  }
}
