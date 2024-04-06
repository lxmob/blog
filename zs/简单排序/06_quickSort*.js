/* 
  快速排序
  D&C分治法结合分层方式实现
  首先先介绍分层，选择序列中最后 p 数实现将 <p 放左边 >p 放右边 =p 放中间
  1. 分区 <区 和 >区
  2. 当前数 <p 当前数和 <区下一个数做交换，<区右扩，跳下一个
  3. 当前数 >p 当前数和 >区上一个数做交换，>区左扩，当前数不动
  4. 当前数 =p 直接跳下一个
  5. 当前数与 >区 边界撞上了停止迭代
  6. 最后一个数与 >区 第一个数做交换
*/
var { swap, randomArr } = require('./01_utils.js');

function quickSort(arr = randomArr()){
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