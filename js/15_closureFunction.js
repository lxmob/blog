/* 
  简单点来讲闭包是一个容器
  当一个函数捆绑外部作用域时就会产生闭包，这个函数就是闭包函数
  换句话来讲，当一个函数被调用时导致内部函数被定义，此时该函数就是闭包函数
  所以 JS 中所有函数都是闭包函数
  但是具有实用性的闭包是指函数每次调用，函数使用了外部函数作用域中的变量或者自身被返回至外部

  优点：闭包是为了更好的集成和封装函数，让函数外部也可以访问函数内部的变量
  缺点：闭包会导致引用的函数 AO 执行期上下文不会被释放，过度的闭包可能会导致内存泄露或加载过慢
*/

/* 
  具体点来讲：当 test1 函数执行完毕时，对应的 AO 执行期上下文并没有销毁
  因为 test2 函数在创建 AO 执行期上下文时作用域链中包含 test1 函数 AO 引用
  当 test2 函数被外部环境变量保存时实用性闭包已经形成，test2 函数执行完毕时会销毁自己的 AO
  但是 test1 函数 AO 不会被销毁，为了能下次调用 test2 函数时再次使用 test1 函数 AO 执行期上下文
*/

// 闭包函数捆绑 global scope
function test1 () {
  // 闭包函数捆绑 test1 scope
  function test2 () {}
  return test2;
}
var fn = test1();
fn();

// 案例

function Demo (a, b, c) {
  var d = 1;
  this.a = a;
  this.b = b;
  this.c = c;
  function f() {
    d++;
    console.log(d);
  }
  this.g = f;
  // return this -> 闭包
}
var d1 = new Demo();
d1.g(); // 2
d1.g(); // 3
var d2 = new Demo();
d2.g(); // 2


// var Compute = (function () {
(function () {
  var num = 0;
  class Compute {
    add(n) {
      return num + n;
    }
    minus(n) {
      return num - n;
    }
  }
  // return Compute
  // 无论是挂载全局变量还是 return 指针，闭包都已经产生
  window.Compute = Compute;
})();
var c = new Compute();
console.log(c.num);
