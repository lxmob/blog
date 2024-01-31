/* 
  三元运算符
  condition ? exprIfTrue : exprIfFalse
  三元运算优先级 = 3
*/

var num = 10,
    pass = null;

if(num > 10){
  pass = true;
}else{
  pass = false;
}

// =>

pass = num > 10 ? true : false;