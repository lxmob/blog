class PriorityQueue{
  constructor(compare){
    if(typeof compare != 'function'){
      throw new Error('compare function required!');
    }
    this.data = [];
    this.compare = compare;
  }
  // 二分查找插入的位置 O(logn)
  search(num){
    var L = 0,
        R = this.data.length;
    while(L < R){
      var mid = L + ((R - L) >> 1);
      if(this.compare(this.data[mid], num) > 0){
        R = mid;
      }else{
        L = mid + 1;
      }
    }
    return L;
  }
  // 入列
  offer(elem){
    var idx = this.search(elem);
    this.data.splice(idx, 0, elem);
    return this.data.length;
  }
  // 出列
  poll(){
    return this.data.shift();
  }
  // 判空
  isEmpty(){
    return !this.data.length;
  }
}

function compare(a, b){
  if(typeof a != 'number' || typeof b != 'number'){
    throw new Error('compare expect a number!');
  }
  // leetcode测试需要将这里改成 a.val - b.val
  return a - b;
};

var heap = new PriorityQueue(compare);
heap.offer(1);
heap.offer(10);
heap.offer(8);
heap.offer(5);
console.log(heap.poll());
console.log(heap);

exports.PriorityQueue = PriorityQueue;
