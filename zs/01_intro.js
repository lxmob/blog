/* 
  算法是什么
  1.有具体的问题
  2.有设计解决这个问题的具体流程
  3.有评价处理流程的可量化指标
*/

function swap(arr, i, j){
  var temp = arr[j];
  arr[j] = arr[i];
  arr[i] = temp;
}

function randomArr(){
  var arr = [];
  for(var i = 0; i < 10; i++){
    arr.push(parseInt(Math.random() * 100));
  }
  return arr;
}

module.exports = {
  swap,
  randomArr
}
