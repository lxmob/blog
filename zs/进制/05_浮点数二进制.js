/*
  浮点数十进制转二进制
  1. 整数部分：除以 2 取余数，直到商为零，将余数倒序
  2. 余数部分：乘以 2 取整数，直到小数部分为零，正序取整

  25.125

  整数部分
  25 / 2 = 12 % 1
  12 / 2 = 6  % 0
  6  / 2 = 3  % 0
  3  / 2 = 1  % 1
  1  / 2 = 0  % 1
  = 11001

  小数部分
  0.125 * 2 = 0.25 | 0
  0.25  * 2 = 0.5  | 0
  0.5   * 2 = 1.0  | 1
  = 001

  25.125 = 11001.001
*/

/*
  浮点数的存储
  遵循 IEEE754 标准 Institute of Electrical and Electronics Engineers
  754 二进制浮点数算术标准

  V = (-1)^0 * M * 2^E

  11001.001
  V = (-1)^0 * 1.1001001 * 2^4

  float (4字节，32位)
  double(8字节，64位)
*/
