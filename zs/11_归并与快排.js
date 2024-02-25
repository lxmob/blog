var arr = [2, 4, 2, 9, 8, 7, 2, 1, 4, 3, 6, 5, 4];

/* 
  归并排序
  D&C分治法将已有序的子序合并得到完全有序的序列
  子序如何做到有序
  取两个子序指针移动对比大小拷贝值到新数组中当有一个子序指针越界即合并另一个子序中剩余项
  时间复杂度 O(n) * O(logN)
  自上而下的递归版本 
*/
function mergeSort(arr){
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

// console.log(arr);
// mergeSort(arr);
// console.log(arr);


// 非递归实现归并排序 -> 迭代算步长
function mergeSortNotR(arr){
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

// console.log(arr);
// mergeSortNotR(arr);
// console.log(arr);


/* 
  快速排序
  D&C分治法结合分层方式实现
  首先先介绍分层，选择序列中最后 p 数实现将 <p 放左边 >p 放右边 =p 放中间
  1.分区 <区 和 >区
  2.当前数 <p 当前数和 <区下一个数做交换，<区右扩，跳下一个
  3.当前数 >p 当前数和 >区上一个数做交换，>区左扩，当前数不动
  4.当前数 =p 直接跳下一个
  5.当前数与 >区 边界撞上了停止迭代
  6.最后一个数与 >区 第一个数做交换
*/
function partition(arr){
  var N = arr.length,
      p = arr[N - 1], // p数
      lessR = -1, // <区
      moreL = N - 1, // >区
      index = 0;
  while(index < moreL){
    if(arr[index] < p){
      swap(arr, index++, ++lessR);
    }else if(arr[index] > p){
      swap(arr, index, --moreL);
    }else{
      index++;
    }
  }
  swap(arr, N - 1, moreL);
}
function swap(arr, i, j){
  var temp = arr[i];
  arr[i] = arr[j];
  arr[j] = temp;
}

// console.log(arr);
// partition(arr);
// console.log(arr);

function quickSort(arr){
  if(arr == null || arr.length < 2){
    return;
  }
  // 返回=区左右两侧边界信息 -> 递归分治
  // 分层 arr[L...R] 范围 arr[R] 作为划分值
  function partition(arr, L, R){
    var lessR = L - 1,
        moreL = R,
        index = L;
    while(index < moreL){
      if(arr[index] < arr[R]){
        swap(arr, index++, ++lessR);
      }else if(arr[index] > arr[R]){
        swap(arr, index, --moreL);
      }else{
        index++;
      }
    }
    swap(arr, R, moreL);
    return {l: lessR + 1, r: moreL};
  }
  function process(arr, L, R){
    if(L >= R){
      return;
    }
    var equalInfo = partition(arr, L, R);
    process(arr, L, equalInfo.l - 1);
    process(arr, equalInfo.r + 1, R);
  }
  process(arr, 0, arr.length - 1);
}

console.log(arr);
quickSort(arr);
console.log(arr);