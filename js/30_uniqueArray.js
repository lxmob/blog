// 方法一
// 拿每一项与后面几项做对比，找到重复的值删除对应的元素
function unique1 (arr) {
  for (var i = 0; i < arr.length; i++) {
    for (var j = i + 1; j < arr.length; j++) {
      if (arr[i] === arr[j]) {
        arr.splice(j, 1);
        j--;
      }
    }
  }
}

// -----------------------------------------------

// 方法二
// 使用对象容器的特性和 hasOwnProperty 方法，判断重复的 key
function unqiue2 (arr) {
  var temp = {}
  for (var i = 0; i < arr.length; i++) {
      if (!temp.hasOwnProperty(arr[i])) {
        temp[arr[i]] = arr[i];
      }
  }
  return Object.keys(temp);
}


// -----------------------------------------------

// 方法三
// 使用 ES6 新方法 Set 数据集结构和展开运算
function unique3 (arr) {
  return [...new Set(arr)];
}

// -----------------------------------------------

// 方法四
// 使用 filter + indexOf 方法，过滤掉相同元素索引项
function unique4 (arr) {
  return arr.filter(function (item, idx) {
    return arr.indexOf(item) === idx;
  });
}

// -----------------------------------------------

// 方法五
// 使用 sort 方法排序每一项，向后进行对比
function unique5 (arr) {
  arr.sort(function (a, b) {
    return a - b;
  });
  for (var i = 0; i < arr.length; i++) {
    if (arr[i] === arr[i + 1]) {
      arr.splice(i, 1);
      i--;
    }
  }
}

// -----------------------------------------------

// 方法六
// 使用 forEach + includes 方法
function unique6 (arr) {
  var nArr = [];
  arr.forEach(function (item) {
    if (!arr.includes(item)) {
      nArr.push(item);
    }
  });
  return nArr;
}
