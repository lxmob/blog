/* 
  算法是什么
  1.有具体的问题
  2.有设计解决这个问题的具体流程
  3.有评价处理流程的可量化指标
*/

// 简单排序
var arr = [2, 4, 2, 9, 8, 7, 2, 1, 4, 3, 6, 5, 4];

// 置换函数
function swap(arr, i, j){
  var temp = arr[j];
  arr[j] = arr[i];
  arr[i] = temp;
}

// 选择排序
// 选择出最小的数存放在序列的起始位置与最小的下标项交换
// 再从剩余未排序元素中继续寻找最小的数然后放到已排序序列的末尾
function selectSort(arr){
  if(arr == null || arr.length < 2){
    return;
  }
  var N = arr.length;
  for(var i = 0; i < N; i++){
    // 0 ~ n-1
    // 1 ~ n-1
    // 2 ~ n-1
    // i ~ n-1
    var minNumIndex = i;
    for(var j = i + 1; j < N; j++){
      // 将最小数的下标交换至第 i 项
      minNumIndex = arr[j] < arr[minNumIndex] ? j : minNumIndex;
    }
    swap(arr, i, minNumIndex);
  }
}
// console.log(arr);
// selectSort(arr);
// console.log(arr);


// 冒泡排序
// 比较相邻的元素如果第一个比第二个大就交换他们两个反之不交换
// 最终将最大的值排至末尾针对所有的元素重复以上的步骤除了已排序好的末尾序列的数
function bubbleSort(arr){
  if(arr == null || arr.length < 2){
    return;
  }
  // 0 ~ n-1
  // 0 ~ n-2
  // 0 ~ n-3
  var N = arr.length;
  for(var end = N - 1; end >= 0; end--){
    // 0 ~ end 干一坨事
    // 0 1  1 2  2 3  end-1 end
    for(var second = 1; second <= end; second++){
      if(arr[second - 1] > arr[second]){
        swap(arr, second - 1, second);
      }
    }
  }
}
// console.log(arr);
// bubbleSort(arr);
// console.log(arr);


// 插入排序
// 将第一待排序序列第一个元素看做一个有序序列
// 把第二个元素到最后一个元素当成是未排序序列
// 每次将未排序序列的第一个元素与有序序列中对比选择合适的位置进行插入
function insertSort(arr){
  if(arr == null || arr.length < 2){
    return;
  }
  // 0 ~ 0 完成
  // 0 ~ 1
  // 0 ~ 2
  // 0 ~ n-1
  var N = arr.length;
  for(var end = 1; end < N; end++){
    var newNumIdx = end;
    while(
      newNumIdx - 1 >= 0 &&
      arr[newNumIdx - 1] > arr[newNumIdx]
    ){
      swap(arr, newNumIdx - 1, newNumIdx);
      newNumIdx--;
    }
  }
}
// console.log(arr);
// insertSort(arr);
// console.log(arr);

function insertSort1(arr){
  if(arr == null || arr.length < 2){
    return;
  }
  var N = arr.length;
  for(var end = 1; end < N; end++){
    // pre 新数的前一个位置   end-1 end
    for(
      var pre = end - 1; 
      pre >= 0 && arr[pre] > arr[pre + 1]; 
      pre--
    ){ swap(arr, pre, pre + 1); }
  }
}
console.log(arr);
insertSort1(arr);
console.log(arr);