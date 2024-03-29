/* 
  链表
  单链表：一块内存空间中被分配的值，这个值中记录 next 指针记录下一片空间的内存地址
  双链表：一块内存空间中被分配的值，这个值中记录着 last 和 next 指针记录上一片和下一片空间的内存地址

  {value, next: 0x100}
  {value, last: 0x101, next: 0x102}
*/
function LinkedNode(val){
  this.last = null;
  this.next = null;
  this.val = val ? val : '';
}


// 单链表反转
function rll(head){
  var pre = null,
      next = null;
  while(head != null){
    // a -> b -> c -> d -> null
    // null <- a <- b <- c <- d
    // 1. 记录 H 项指针
    // 2. 将当前 H 项指针指向 pre
    // 3. 记录 pre 作为下一项的指针
    // 4. 移动 H
    // 5. 如果 H == null 已经到尾部直接返回 pre
    next = head.next;
    head.next = pre;
    pre = head;
    head = next;
  }
  return pre;
}


// 双链表反转
function rdl(head){
  var pre = null,
      next = null;
  while(head != null){
    // null <~ a -><~ b -><~ c -><~ d -> null
    // null <- a ~><- b ~><- c ~><- d ~> null
    // 1. 记录 H 项 next 指针
    // 2. 将当前 H 项 next 指针指向 pre
    // 3. 将当前 H 项 last 指针指向 next
    // 4. 记录 pre 作为下一项的 next 指针
    // 5. 移动 H
    // 6. 如果 H == null 已经到尾部直接返回 pre
    next = head.next;
    head.next = pre;
    head.last = next;
    pre = head;
    head = next;
  }
  return pre;
}


// 单链表实现队列 O(1)
class LinkedListQueue{
  head = null; // 头
  tail = null; // 尾
  length = 0;

  isEmpty(){
    return this.length == 0;
  }
  
  size(){
    return this.length;
  }

  offer(val = ''){
    var cur = new LinkedNode(val);
    // 队列中的第一个元素头尾都指向它
    if(this.tail == null){
      this.head = cur;
      this.tail = cur;
    }else{
      this.tail.next = cur;
      this.tail = cur;
    }
    return ++this.length;
  }

  poll(){
    var ans = null;
    if(this.head != null){
      ans = this.head.val;
      this.head = this.head.next;
      this.length--;
    }
    // 边界情况
    // 队列中头部弹出最后一个元素时 head 一定是 null
    if(this.head == null){
      this.tail = null;
    }
    return ans;
  }

  peek(){
    var ans = null;
    if(this.head != null){
      ans = this.head.val;
    }
    return ans;
  }
}
var myQueue = new LinkedListQueue();
console.log(myQueue.offer(3));
console.log(myQueue.offer(0));
console.log(myQueue.offer(6));
console.log(myQueue.isEmpty());
console.log(myQueue.poll());
console.log(myQueue.size());
console.log(myQueue.peek());
console.log(myQueue);


// 单链表实现栈 O(1)
class LinkedListStack{
  head = null // 头
  length = 0;

  isEmpty(){
    return this.length == 0;
  }

  size(){
    return this.length;
  }

  push(val = ''){
    var cur = new LinkedNode(val);
    if(this.head == null){
      this.head = cur;
    }else{
      // 老头换新头
      cur.next = this.head;
      this.head = cur;
    }
    return ++this.length;
  }

  pop(){
    var ans = null;
    if(this.head != null){
      ans = this.head.val;
      this.head = this.head.next;
      this.length--;
    }
    return ans;
  }

  peek(){
    return this.head != null ? this.head.val : null;
  }
}
var myStack = new LinkedListStack();
console.log(myStack.push(3));
console.log(myStack.push(0));
console.log(myStack.push(6));
console.log(myStack.isEmpty());
console.log(myStack.pop());
console.log(myStack.size());
console.log(myStack.peek());
console.log(myStack);


// 双端链表实现双端队列 O(1)
// 单链是无法实现双端队列的，因为没办法解决尾部出问题
// 尾部出找不到上一项的可达项，所以肯定是双链
class DobbleLinkedListToDeque{
  head = null;
  tail = null;
  length = 0;

  isEmpty(){
    return this.length == 0;
  }

  size(){
    return this.length;
  }

  pushHead(val = ''){
    var cur = new LinkedNode(val);
    if(this.head == null){
      this.head = cur;
      this.tail = cur;
    }else{
      // 新项的 next 指针 -> 老头
      // 老头的 last 指针 -> 新项
      // 老头 -> 新头
      cur.next = this.head;
      this.head.last = cur;
      this.head = cur;
    }
    return ++this.length;
  }

  pushTail(val = ''){
    var cur = new LinkedNode(val);
    if(this.tail == null){
      this.head = cur;
      this.tail = cur;
    }else{
      cur.next = this.tail;
      this.tail.next = cur;
      this.tail = cur;
    }
    return ++this.length;
  }

  pollHead(){
    var ans = null;
    if(this.head == null){
      return ans;
    }
    this.length--;
    ans = this.head.val;
    // 边界情况，队列中只有一项
    if(this.head == this.tail){
      this.head = null;
      this.tail = null;
    }else{
      // 换头 -> head = head.next
      // 头项的 last -> null
      this.head = this.head.next;
      this.head.last = null;
    }
    return ans;
  }

  pollTail(){
    var ans = null;
    if(this.tail == null){
      return ans;
    }
    this.length--;
    ans = this.tail.val;
    if(this.head == this.tail){
      this.head = null;
      this.tail = null;
    }else{
      this.tail = this.tail.last;
      this.tail.next = null;
    }
    return ans;
  }

  peekHead(){
    return this.head != null ? this.head.value : null;
  }

  peekTail(){
    return this.tail != null ? this.tail.value : null;
  }
}
var myDeque = new DobbleLinkedListToDeque();
console.log(myDeque.isEmpty());
console.log(myDeque.size());
console.log(myDeque.pushHead(1));
console.log(myDeque.pollTail());
console.log(myDeque.pushHead(3));
console.log(myDeque);
console.log(myDeque.pollHead());
console.log(myDeque.pushTail(3));
console.log(myDeque.pushTail(0));
console.log(myDeque.pushTail(9));
console.log(myDeque.pollHead());
console.log(myDeque);


/* 
  K个节点的组内逆序调整
  给定一个单链表的头节点 head，和一个正数 K，实现 K 个节点的小组内逆序调整
  如果最后一个组不够 K 个就不调整，K 一定大于 0
  1 2 3 4 5 6 7 8 K = 3
  调整后 -> 3 2 1 6 5 4 7 8
  https://leetcode.cn/problems/reverse-nodes-in-k-group/description/
*/
function reverseKGroup(head, K){
  var start = head,
      end = getKGroupEnd(start, K);
  // 边界条件
  // 链表数不够 K 个为一组
  if(end == null){
    return head;
  }
  // 换头
  head = end;
  reverse(start, end);
  // 上一组的结尾节点
  var lastEnd = start;
  while(lastEnd.next != null){
    // 开始的节点 = 反转后 K 组最后一项的 next 节点
    start = lastEnd.next;
    end = getKGroupEnd(start, K);
    if(end == null){
      return head;
    }
    reverse(start, end);
    // 上一组反转后 K 组最后一项 next 节点应该指向反转前 K 组最后一项节点
    lastEnd.next = end;
    lastEnd = start;
  }
  return head;
}
// 该函数返回从 start 开始数 K 项的 end 元素
function getKGroupEnd(start, K){
  while(--K != 0 && start != null){
    start = start.next;
  }
  return start;
}
// 单链 K 数项一组反转
// 1.记录 end 下一项节点
// 2.单联反转交换
// 3.移动游标 cur 重复第二步操作直至等于 end 结束
// 4.将 start.next 指向 end
function reverse(start, end){
  end = end.next;
  var pre = null,
      next = null,
      cur = start;
  while(cur != end){
    next = cur.next;
    cur.next = pre;
    pre = cur;
    cur = next;
  }
  start.next = end;
}


/* 
  两个链表数相加
  l1 = [9,9,9,9,9,9,9], l2 = [9,9,9,9]
  rt = [8,9,9,9,0,0,0,1]
  https://leetcode.cn/problems/add-two-numbers/description/
*/
function addTwoNumbers(h1, h2){
  var len1 = listLength(h1),
      len2 = listLength(h2),
      l = len1 > len2 ? h1 : h2, // 长链表
      s = l == h1 ? heda2 : h1, // 短链表
      curL = l,
      curS = s,
      last = curL, // 保存最后一项
      carry = 0, // 进位信息
      curNum = 0; // 当前数
  // 第一阶段 l 有 s 有
  while(curS != null){
    // 两数相加再加进位信息
    curNum = curL.val + curS.val + carry;
    curL.val = curNum % 10;
    // 两数大于 10 保存进位信息
    carry = Math.floor(curNum / 10);
    last = curL;
    curL = curL.next;
    curS = curS.next;
  }
  // 第二阶段 l 有 s 无
  while(curL != null){
    curNum = curL.val + carry;
    curL.val = curNum % 10;
    carry = Math.floor(curNum / 10);
    last = curL;
    curL = curL.next;
  }
  // 第三阶段 l 无 s 无进位信息有
  if(carry != 0){
    last.next = new LinkedNode(1);
  }
  return l;
}
// 求链表长度
function listLength(head){
  var len = 0;
  while(head != null){
    len++;
    head = head.next;
  }
  return len;
}


/* 
  合并两个有序的链表
  1-3-3-5-7  2-2-2-3-7 -> 1-2-2-2-3-3-3-5-7-7
  https://leetcode.cn/problems/merge-two-sorted-lists/description
*/
function mergeTwoLists(h1, h2){
  if(h1 == null || h2 == null){
    return h1 == null ? h2 : h1;
  }
  // 谁小谁做头
  var head = h1.val <= h2.val ? h1 : h2,
      cur1 = head.next,
      cur2 = head == h1 ? h2 : h1,
      pre = head;
  // 边界情况，看谁先结束
  while(cur1 != null && cur2 != null){
    if(cur1.val <= cur2.val){
      pre.next = cur1;
      cur1 = cur1.next;
    }else{
      pre.next = cur2;
      cur2 = cur2.next;
    }
    pre = pre.next;
  }
  // 如果 cur1 或者 cur2 等于 null 了
  // 说明 head1 或者 head2 其中一个已经到末尾了
  pre.next = cur1 != null ? cur1 : cur2;
  return head;
}