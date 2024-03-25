/* 
  继承一
  原型链继承将父类的实例对象作为子类的原型对象
  缺点：如果是多个实例对象对引用类型操作共享一块内存数据造成污染
*/
function Professor(){
  this.cars = ['Benz','BMW','Bugatti'];
}
Teacher.prototype = new Professor();
function Teacher(){};
var t1 = new Teacher(),
    t2 = new Teacher(),
    t3 = new Teacher();
t1.cars.push('Buick');
console.log(t1.cars); // ['Benz','BMW','Bugatti','Buick']
console.log(t3.cars); // ['Benz','BMW','Bugatti','Buick']


/* 
  继承二
  通过 call/apply 来借用构造函数的属性和方法 
  缺点：无法访问被借用的构造函数原型对象属性方法，每次构造实例都需要调用父类构造器影响性能
*/
function Teacher(){
  this.cars = ['Benz','BMW','Bugatti'];
}
Teacher.prototype = {key:'BenzKey'};
function Student(name){
  Teacher.call(this);
  this.name = name;
}
var s1 = new Student('ming'),
    s2 = new Student('ling');
s1.cars.push('Buick');
// 解决共享内存数据问题每个实例都会创建自己的数据内存
console.log(s2.cars); // ['Benz','BMW','Bugatti']
console.log(s2.key); // undefined 


/* 
  继承三
  原型继承（圣杯模式）
  产生的问题：在父类原型对象上赋值的属性，如果将子类的原型指向父类原型
            子类更改原型对象上的属性，将会导致父类原型对象属性变更，引用的同一块地址
  解决方案：创建一个缓冲区，通过一个纯净的对象来作为中间件存储属性，并将中间件的原型对象指向父类原型
*/
Person.prototype.phone = 'iphone12';
function Person(){};
function Student(){};
function inherit(Target, Origin){
  function Buffer(){};
  Buffer.prototype = Origin.prototype;
  Target.prototype = new Buffer();
  Target.prototype.constructor = Target;
  Target.prototype.super_class = Origin;
}
inherit(Student, Person);
var s = new Student();
// 完美解决在子类原型对象上更改属性且不影响父类原型问题，同时还能够操作父类属性和方法
Student.prototype.phone = 'iphone6';
var p = new Person();
console.log(s, p);


// 插件改造 ES5 模块化开发
var inheritPlugin = (function(){
  var Buffer = function(){};
  return function(Target, Origin){
    Buffer.prototype = Origin.prototype;
    Target.prototype = new Buffer();
    Target.prototype.constructor = Target;
    Target.prototype.super_class = Origin;
  };
})();
Person.prototype.phone = 'iphone12';
function Person(){};
function Student(){};
inheritPlugin(Student, Person);
var s = new Student();
Student.prototype.phone = 'iphone6';
var p = new Person();
console.log(s, p);