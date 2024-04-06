var arr = [1, 2, 2, 4, 6, 7, 9, 10];

/*
  有序数组中查找目标数
  二分查找又称折半查找，在一个有序的列表中每次都进行折半查找
  折半就会有上终点和下终点 4 和 6，如果目标数是 9
  第一次查找上终点是 4, 4 之前的数是有序的全部小于 9, ok全都不看
  arr = [6, 7, 9, 10]
  第二次查找上终点是 7, 7 之前的数是有序的全部小于 9, ok全都不看
  arr = [9, 10]
  第三次查找上终点是 9, 9 目标数完成
  如果目标数是 5 最终查找都没找到则返回 -1 
*/
function findNum(arr, tar){
  var ans = undefined;
  if(arr == null || arr.length == 0){
    return ans;
  }
  var L = 0,
      R = arr.length - 1;
  // arr[L...R]  arr[0...N-1]
  while(L <= R){
    var mid = Math.floor((L + R) / 2);
    if(arr[mid] == tar){
      ans = arr[mid];
      break
    }else if(arr[mid] < tar){
      L = mid + 1;
    }else{
      R = mid - 1;
    }
  }
  return ans;
}

// console.log(findNum(arr, 9));
// console.log(findNum(arr, 100));


var arr1 = [1, 2, 2, 4, 4, 4, 6, 7, 9, 10];

/*
  有序数组中查找目标数最左的位置
  例如目标数 4 查找目标数最左侧位置是否还有等于 4 的
  第一次查找上终点是 4，ok符合目标数保存位置 ans = 4
  接下来要看左侧位置还有没有 >= 4 的数继续二分
  arr1 = [1, 2, 2, 4, 4]
  第二次查找上终点 2, ok小于 4 全部都不看
  arr1 = [4, 4]
  第三次查找上终点 4, ok符合目标数保存位置 ans = 3
  二分结束最后抓到位置的 ans 返回 
*/
function mostLeftNoLessNumIndex(arr, tar){
  var ans = -1;
  if(arr == null || arr.length == 0){
    return ans;
  }
  var L = 0,
      R = arr.length - 1;
  while(L <= R){
    var mid = Math.floor((L + R) / 2);
    if(arr[mid] >= tar){
      ans = mid;
      R = mid - 1;
    }else{
      L = mid + 1;
    }
  }
  return ans;
}

// console.log(mostLeftNoLessNumIndex(arr1, 4));
// console.log(mostLeftNoLessNumIndex(arr1, 90));


/* 
  无序数组中的数相邻且不相等查找局部最小值
  局部最小值情况
  1.[0] < [1] 0位置数最小
  2.[n-2] > [n-1] n-1位置数最小
  3.左 > [i] < 右 i位置数最小
  假设1 [0] > [1] 上的数走势则是下降趋势
  假设2 [n-2] < [n-1] 上的数走势则是上扬趋势
  那么 [0...n-1] 范围中必有局部最小的数
  二分取 mid 数，如果 [mid] 的数即比左边小也比右边小直接返回 [mid]
  如果 [mid-1] < [mid] 上的数则断言 [0...mid-1] 中必有局部最小，右边的数全都不看 
*/
function oneMinNumIdx(arr){
  if(arr == null || arr.length == 0){
    return -1;
  }
  var N = arr.length;
  if(N == 1){
    return 0;
  }
  if(arr[0] < arr[1]){
    return 0;
  }
  if(arr[N - 1] < arr[N - 2]){
    return N - 1;
  }
  var L = 0,
      R = N - 1;
  // 防止指针越界 L m R-1 R -> [5,3,3]
  while(L < R - 1){
    var mid = Math.floor((L + R) / 2);
    if(arr[mid - 1] > arr[mid] && arr[mid + 1] > arr[mid]){
      return mid;
    }else{
      // 左 > mid mid > 右
      // 左 < mid mid < 右
      // 左 < mid mid > 右
      if(arr[mid - 1] < arr[mid]){
        R = mid - 1;
      }else{
        L = mid + 1;
      }
    }
  }
  return arr[L] < arr[R] ? L : R;
}

// 对数器验证局部值最小问题
function testOneMinNumIdx(){
  var maxLen = 10,
      maxVal = 200,
      textTime = 100000;
  console.log('测试开始');
  for(var i = 0; i < textTime; i++){
    var arr = randomArray(maxLen, maxVal),
        ans = oneMinNumIdx(arr);
    if(!check(arr, ans)){
      printArray(arr);
      console.log('ans:', ans);
      break;
    }
  }
  console.log('测试结束');
}
function randomArray(maxLen, maxVal){
  var len = parseInt(Math.random() * maxLen),
      arr = new Array(len);
  if(len > 0){
    arr[0] = parseInt(Math.random() * maxVal);
    for(var i = 1; i < len; i++){
      do{
        arr[i] = parseInt(Math.random() * maxVal);
        // 相邻且不相等，相等就重新随
      }while(arr[i] == arr[i - 1]);
    }
  }
  return arr;
}
function check(arr, minIdx){
  if(arr.length == 0){
    return minIdx == -1;
  }
  var l = minIdx - 1,
      r = minIdx + 1,
      lBigNum = l >= 0 ? arr[l] > arr[minIdx] : true,
      rBigNum = r < arr.length ? arr[r] > arr[minIdx] : true;
  return lBigNum && rBigNum;
}
function printArray(arr){
  for(var i = 0; i < arr.length; i++){
    console.log(arr[i]);
  }
}

testOneMinNumIdx();