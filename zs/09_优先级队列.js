// 优先级队列小根堆
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


// 合并K个升序链表 -> 数据结构是混合型链表数组
// ll = [[1,4,5],[1,3,4],[2,6]]
// https://leetcode.cn/problems/merge-k-sorted-lists/description/
function mergeKList(ll){
  if(ll == null){
    return ll;
  }
  var heap = new PriorityQueue(compare);
  for(var i = 0; i < ll.length; i++){
    if(ll[i] != null){
      heap.offer(ll[i]); // 头节点入队
    }
  }
  var head = heap.poll(),
      pre = head;
  if(pre.next != null){
    head.offer(pre.next);
  }
  // base case
  while(!heap.isEmpty()){
    var cur = heap.poll();
    pre.next = cur;
    pre = cur;
    if(cur.next != null){
      heap.offer(cur.next);
    }
  }
  return head;
}