/* 
  二叉树由头部父节点分叉左右子节点
  子节点再依次进行分叉，连续的结构，同时各个子节点之间相互不串联

      1
    2   3
  4  5 6 7
  先序：头左右，输出 = 1,2,4,5,3,6,7
  中序：左头右，输出 = 4,2,5,1,6,3,7
  后序：左右头，输出 = 4,5,2,6,7,3,1

      1
    2   3
  递归序：输出 = 1,2,2,2,1,3,3,3,1
*/

// 二叉树节点
function TreeNode(val){
  this.left = null;
  this.right = null;
  this.val = val ? val : '';
}

// 先序
function preQueue(head){
  if(head == null){
    return null;
  }
  console.log(head.val);
  preQueue(head.left);
  preQueue(head.right);
}

// 中序
function inQueue(head){
  if(head == null){
    return null;
  }
  inQueue(head.left);
  console.log(head.val);
  inQueue(head.right);
}

// 后序
function posQueue(head){
  if(head == null){
    return null;
  }
  posQueue(head.left);
  posQueue(head.right);
  console.log(head.val);
}

// 递归序
function f(head){
  if(head == null){
    return null;
  }
  // 1
  f(head.left);
  // 2
  f(head.right);
  // 3
}


// 对比两颗树节点是否相同
// https://leetcode.cn/problems/same-tree/description/
function isSameTree(h1, h2){
  // base case
  // 左树或右树有一个节点与另一个颗树节点没有对上则结构不同
  if(h1 == null ^ h2 == null){
    return false;
  }
  // 两颗树节点都为空
  if(h1 == null && h2 == null){
    return true;
  }
  // 都不为空
  return (
    h1.val == h2.val &&
    isSameTree(h1.left, h2.left) &&
    isSameTree(h1.right, h2.right)
  )
}


// 判断一颗树是否是镜面树
// https://leetcode.cn/problems/symmetric-tree/description/
function isSymmetric(root){
  function isMirror(h1, h2){
    // base case
    if(h1 == null ^ h2 == null){
      return false;
    }
    if(h1 == null && h2 == null){
      return true;
    }
    return (
      h1.val == h2.val &&
      isMirror(h1.left, h2.right) &&
      isMirror(h1.right, h2.left)
    )
  }
  return isMirror(root, root);
}


// 返回一颗树的最大深度
// https://leetcode.cn/problems/maximum-depth-of-binary-tree/description/
function maxDepth(root){
  if(root == null){
    return 0;
  }
  // 右叶子节点向上累加
  return Math.max(maxDepth(root.left), maxDepth(root.right)) + 1;
}


// 从先序数组和中序数组构建一颗树(困难)
// https://leetcode.cn/problems/construct-binary-tree-from-preorder-and-inorder-traversal/description/
function buildTree(pre, inn){
  // base case
  if(pre == null || inn == null || pre.length != inn.length){
    return null;
  }
  function f(pre, L1, R1, inn, L2, R2){
    // 越界情况
    // 先序 [1,2,3] 中序 [2,3,1] => 无右树
    if(L1 > R1){
      return null;
    }
    var head = new TreeNode(pre[L1]);
    // 先序 L1(头) - R1
    // 中序 L2 - find - R2
    // 先序左树 = (L1+1) - (L1+find-L2) 中序左树 = L2 - (find-1)
    // 先序右树 = (L1+find+1-L2) - R1 中序右树 = (find+1) - R2
    var h2Idx = L2;
    for(;inn[h2Idx] != pre[L1]; h2Idx++);
    head.left = f(pre, L1+1, L1+find-L2, inn, L2, find-1);
    head.right = f(pre, L1+find+1-L2, R1, inn, find+1, R2);
    return head;
  }
  return f(pre, 0, pre.length - 1, inn, 0, inn.length - 1);
}


// 二叉树层序遍历自下而上收集节点
// https://leetcode.cn/problems/binary-tree-level-order-traversal-ii/description/
function levelOrderBottom(root){
  var nList = [],
      queue = [root];
  // 正序迭代开启一个队列收集节点
  // 1.当前队列的 size 有多少第二步就执行多少次
  // 2.弹出节点，然后收集该节点左右节点加入队列

  // base case
  while(queue.length != 0 && root != null){
    var size = queue.length,
        curLevel = [];
    for(var i = 0; i < size; i++){
      var cur = queue.shift();
      curLevel.push(cur.val);
      if(cur.left != null) queue.push(cur.left);
      if(cur.right != null) queue.push(cur.right);
    }
    nList.unshift(curLevel);
  }
  return nList;
}


// 判断是否是平衡二叉树
// 平衡树：每一颗子树左树高度与右树高度差 <= 1
// https://leetcode.cn/problems/balanced-binary-tree/description/
function isBalanced(root){
  // 以某个节点头的时候返回两个信息
  // 1.该节点树是否是平的
  // 2.该节点树的高度是多少
  function getInfo(isBlc, h){
    return {isBlc, h};
  }
  function process(head){
    // base case
    if(head == null){
      return getInfo(true, 0);
    }
    var lInfo = process(head.left),
        rInfo = process(head.right),
        // 左右树高度取最大值后加上自身节点高度
        height = Math.max(lInfo.h, rInfo.h) + 1,
        isBlc = lInfo.isBlc && rInfo.isBlc && Math.abs(lInfo.h - rInfo.h) < 2;
    return getInfo(isBlc, height);
  }
  return process(root).isBlc;
}


// 判断是否是搜索树
// 搜索树：每一颗子树左树的值都比头小右树的值都比头大
// 左树搜索树最大 max < h，右树搜索树最小 min > h
// https://leetcode.cn/problems/validate-binary-search-tree/description/
function isValidBST(root){
  if(root == null){
    return true;
  }
  // 以某个节点头的时候返回三个信息
  // 1.该节点树是否是搜索树
  // 2.该节点树的最大值和最小值是多少
  function getInfo(isBST, min, max){
    return {isBST, min, max};
  }
  function process(head){
    // base case
    if(head == null){
      return null;
    }
    var lInfo = process(head.left),
        rInfo = process(head.right),
        max = head.val,
        min = head.val;
    // 搜索左右树最大最小值信息
    if(lInfo != null){
      max = Math.max(lInfo.max, max);
      min = Math.min(lInfo.min, min);
    }
    if(rInfo != null){
      max = Math.max(rInfo.max, max);
      min = Math.min(rInfo.min, min);
    }
    var isBST = true;
    if(lInfo != null && !lInfo.isBST) isBST = false;
    if(rInfo != null && !rInfo.isBST) isBST = false;
    // left max < head  right min > head
    // 1.如果左树或右树是空那么它就是搜索树没有节点可搜索
    // 2.如果左树最大值 < 当前头的值且右树最小值 > 当前头的值那么它就是搜索树
    var lMaxNum = lInfo == null ? true : lInfo.max < head.val,
        rMinNum = rInfo == null ? true : rInfo.min > head.val;
    if(!lMaxNum || !rMinNum) isBST = false;
    return getInfo(isBST, max, min);
  }
  return process(root).isBST;
}


// 路径总和
// 查找出从头到叶子节点的路径值总和是否有等于目标数的
// https://leetcode.cn/problems/path-sum/description/
function hasPathSum(root, ts){
  if(root == null){
    return false;
  }
  var hasSum = false;
  // 模拟 reduce 累加器思想
  function process(head, ps, ts){
    // base case
    // 是叶子节点
    if(head.left == null && head.right == null){
      if(head.val + ps == ts){
        hasSum = true;
        return;
      }
    }
    // 非叶子节点
    ps += head.val;
    if(head.left != null) process(head.left, ps, ts);
    if(head.right != null) process(head.right, ps, ts);
  }
  process(root, 0, ts);
  return hasSum;
}


// 路径总和同时记录达成总和的路径
// https://leetcode.cn/problems/path-sum-ii/description/
function pathSum(root, ts){
  var ans = [],
      path = [];
  if(root == null){
    return ans;
  }
  function process(head, ps, ts){
    // base case
    // 是叶子节点
    if(head.left == null && head.right == null){
      if(head.val + ps == ts){
        path.push(head.val);
        ans.push(path.slice());
        path.pop();
        return;
      }
    }
    // 非叶子节点
    path.push(head.val);
    ps += head.val;
    if(head.left != null) process(head.left, ps, ts);
    if(head.right != null) process(head.right, ps, ts);
    path.pop();
  }
  process(root, 0, ts);
  return ans;
}