/**
 * 判断一个点是否在三角形内
 */
var pointInTriangle = (function () {
  function vec(a, b) {
    return {
      x: b.x - a.x,
      y: b.y - a.y,
    }
  }

  function vecProduct(v1, v2) {
    return v1.x * v2.y - v2.x * v1.y
  }

  function sameSymbols(a, b) {
    return (a ^ b) >= 0
  }

  return function (opt) {
    var PA = vec(opt.p, opt.a),
      PB = vec(opt.p, opt.b),
      PC = vec(opt.p, opt.c),
      R1 = vecProduct(PA, PB),
      R2 = vecProduct(PB, PC),
      R3 = vecProduct(PC, PA)

    return sameSymbols(R1, R2) && sameSymbols(R2, R3)
  }
})()
