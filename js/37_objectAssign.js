// Object.assign 合并对象仅包含可枚举自身属性(浅拷贝)
let mTar = { name: 'ming' },
    mObj = { age: 27, car: ['Benz', 'Toyota'] };
// Object.assign(mTar, mObj);
// mergeObj.car.push('Mazda'); // 浅拷贝
// mergeObj.age = 18; // 拷贝属性值
// console.log(mTar);

let mHouse = { house: 'villa' };

// 第一个参数是目标对象
// 如果是基本类型先将目标对象转为包装对象然后进行拷贝源对象可枚举属性
// console.log(Object.assign(true, mHouse)); // Boolean {true, house: 'villa'}
// console.log(Object.assign(123, mHouse)); // Number {123, house: 'villa'}

// 第二个参数是源对象只将源对象可枚举的属性拷贝至目标对象
// 如果是基本类型，先将参数二转为包装对象然后判断属性是否可枚举
// 包装类中 [[primitiveValue]] 属性不可枚举
// 所以导致拷贝失败，忽略源对象属性
// console.log(Object.assign(mHouse, true)); // { house: 'villa' }
// console.log(Object.assign(mHouse, 123)); // { house: 'villa' }

// 基本类型中只有字符串包含可枚举的属性
// console.log(Object.assign(mHouse, 'key')); // {0: 'k', 1: 'e', 2: 'y', house: 'villa'}
// console.log(Object.assign('key', mHouse)); // String {'key', house: 'villa'}

// null undefined 将被忽略
// console.log(Object.assign(mHouse, null)); // { house: 'villa' }
// console.log(Object.assign(null, mHouse)); // TypeError: Cannot convert undefined or null to object

// 源对象与目标对象属性相同，后面覆盖前面
let mBag = { tk: { name: 'supreme' } },
    mWallet = { tk: { name: 'coach' } };
// console.log(Object.assign(mBag, mWallet)); // {tk: {name: 'coach'}}

// 数组合并按照索引值进行覆盖
let mCar = ['Benz', 'Toyota'],
    nCar = ['Mazda'];
// console.log(Object.assign(mCar, nCar)); // ['Mazda', 'Toyota']

// 取值函数的合并只保留属性与属性值
let mFoo = {
  get name() {
    return 'foo';
  },
  set date(val) {
    console.log(val);
  }
}
let mBar = { name: 'bar' };
// console.log(Object.assign(mBar, mFoo)); // { name: 'foo' }

// 解决 assign 无法拷贝取值函数的问题
// 通过 getOwnPropertyDescriptors 获取属性描述符的对象集合
// 调用 defineProperties 重新给对象设置属性描述信息
Object.defineProperties(mBar, Object.getOwnPropertyDescriptors(mFoo));
// console.log(mBar); // { name: [Getter], date: [Setter] }
// console.log(mBar.name); // 'foo'

// 另一种实现克隆对象的方法
let mKiin = { name: 'kiin', age: 19 },
    // 通过 create 方法来选取需要继承对象的原型
    mCopy = Object.create(
      Object.getPrototypeOf(mKiin), // 该方法来获取对象的原型
      Object.getOwnPropertyDescriptors(mKiin) // 该参数为新对象添加可枚举属性描述符
    )
// mKiin.car = 'Mazda';
// console.log(mCopy); // { name: 'kiin', age: 19 }
