/* 
  对数器
  一个生成随机样本自己做比对的机器
  对数器就是用来调 bug 的，让你不需要依赖线上的测试自己就能写对代码
  可以随意控制样本的大小
*/


// Math.random()
// 一个等概率获取随机树的方法
// double 类型数 -> 左闭右开 [0, 1)
function testRandom(){
  var testTime = 100000,
      count = 0;
  for(var i = 0; i < testTime; i++){
    if(Math.random() < 0.7){
      count++; // 随机数小于 0.7 记录一下
    }
  }
  // 记录数与总数做对比结果就是等概率 0.7 上下浮动
  console.log(count / testTime);
}
// testRandom();


// 如果是 0-K 数范围内等概率发生
// [0, K) -> [0, K-1]
function testKRandom(k){
  var testTime = 100000,
      countObj = {};
  for(var i = 0; i < testTime; i++){
    var num = parseInt(Math.random() * k);
    countObj[num] != undefined ? countObj[num]++ : (countObj[num] = 0);
  }
  for(var key in countObj){
    console.log('这个数 '+key+' 出现了'+countObj[key]+' 次');
  }
}
// testKRandom(10);


/* 
  上面的例子就表明 [0, x) 出现的次数是线性概率
  [0, x) x 的出现概率 = 100%
  如果是想要将 x 出现的概率调整为 x*x = x的平方怎么搞

  返回 [0, 1) 的一个小数
  任意的 x，x 属于 [0, 1), [0, x)范围上的数出现的概率由原来的 x 调整 x 的平方
*/
function xToXPower2(){
  return Math.max(Math.random(), Math.random());
}
function textX2Random(){
  var testTime = 100000,
      count = 0,
      x = 0.6;
  for(var i = 0; i < testTime; i++){
    if(xToXPower2() < x){
      count++;
    }
  }
  console.log(count / testTime);
  console.log(Math.pow(x, 2));
}
// textX2Random();


// 调整 x^3
function xToXPower3(){
  return Math.max(Math.random(), Math.max(Math.random(), Math.random()));
}


/* 
  等概率获取 1-5 范围的数函数改造为 
  -> 等概率获取 1-7 范围的数函数
*/
function random1_5(){
  return parseInt(Math.random() * 5) + 1;
}

// 改造 01 发生器，等概率返回 0 和 1
function random0_1(){
  var ans = 0;
  do{
    ans = random1_5();
  }while(ans == 3); // 遇到 3 就重新随
  return ans < 3 ? 0 : 1;
}
// console.log(random0_1());

// 等概率获取 0-7 范围的函数
// 利用二进制位，得到 000 ~ 111 做到等概率
function random0_7(){
  var ans = (random0_1() << 2) + (random0_1() << 1) + random0_1();
  return ans;
}
// console.log(random0_7());

// 改造等概率获取 0-6 范围的函数
function random0_6(){
  var ans = 0;
  do{
    ans = random0_7();
  }while(ans == 7);
  return ans;
}
// console.log(random0_6());

// 完成目标函数，等概率获取 1-7 范围的数
function random1_7(){
  return random0_6() + 1;
}
// console.log(random1_7());


/* 
  例如: 17-56
  56 - 17 = 39 -> [0, 39] 随机概率的数 + 17
  改造 01发生器看最大的数需要几个二进制位
  56 需要 6 个二进制位，那么就将 01发生器 row 6 次
  6 个二进制位就可以返回 [0, 63] 范围的数，如果 row 到的数比 39 大那么就重做
  [40, 63] 范围的数重做 
*/


/* 
  0 到 1 不等概率随机改造为
  -> 等概率随机 0 到 1
*/
function x(){
  return Math.random() < 0.84 ? 0 : 1;
}
function y(){
  var ans = 0;
  do{
    ans = x();
  }while(ans == x());
  // ans = 0 1
  // ans = 1 0
  return ans;
}
// console.log(y());


// 对数器
// 检查选择排序
function selectSort(arr){
  if(arr == null || arr.length < 2){
    return;
  }
  var N = arr.length;
  for(var i = 0; i < N; i++){
    var minNumIdx = i;
    for(var j = i + 1; j < N; j++){
      minNumIdx = arr[j] < arr[minNumIdx] ? j : minNumIdx;
    }
    var temp = arr[minNumIdx];
    arr[i] = arr[minNumIdx];
    arr[minNumIdx] = temp;
  }
}
// 随机生成一个数组，长度[0, maxLen-1]，arr中的每个值[0, maxVal-1]
function lenRandomValueRandom(maxLen, maxVal){
  var len = parseInt(Math.random() * maxLen),
      arr = new Array(len);
  for(var i = 0; i < len; i++){
    arr[i] = parseInt(Math.random() * maxVal);
  }
  return arr;
}
function copyArray(arr){
  var nArr = [];
  for(var i = 0; i < arr.length; i++){
    nArr[i] = arr[i];
  }
  return nArr;
}
// 检查是否有序
function isSorted(arr){
  var max = arr[0];
  for(var i = 1; i < arr.length; i++){
    if(max > arr[i]){
      return false;
    }
    max = Math.max(max, arr[i]);
  }
  return true;
}
function testSort(){
  var maxLen = 50,
      maxVal = 1000,
      testTime = 100000;
  console.log('测试开始');
  for(var i = 0; i < testTime; i++){
    var arr = lenRandomValueRandom(maxLen, maxVal),
        temp = copyArray(arr);
    selectSort(arr);
    if(!isSorted(arr)){
      for(var j = 0; j < temp.length; j++){
        console.log(temp[j]);
      }
      console.log('选择排序出错了');
      break;
    }
  }
  console.log('测试结束');
}
testSort();