;(function () {
  var swiperEl = document.getElementsByClassName('swiper-wrap')[0],
    len = swiperEl.children.length - 2, // 实际应该展示的图片数量
    width = 500, // 每张图片的宽度
    curIdx = 1 // 当前展示图片的下标

  // 循环图片
  function loop() {
    clearInterval(swiperEl.timeId)
    swiperEl.timeId = setInterval(function () {
      ++curIdx
      swiperEl.style.transition = 'all .5s'
      swiperEl.style.left = curIdx * width * -1 + 'px'
      // 边界值
      if (curIdx == len + 1) {
        curIdx = 1
        setActiveDot()
        setTimeout(function () {
          // 关闭动画，延迟后改变位置信息，实现无缝衔接
          swiperEl.style.transitionProperty = 'none'
          swiperEl.style.left = -width + 'px'
        }, 500)
      } else {
        setActiveDot()
      }
    }, 2000)
  }

  // 初始化小圆点功能
  var dotsEl = document.getElementsByClassName('swiper-dot')[0],
    dots = dotsEl.children
  for (var i = 0; i < dots.length; i++) {
    ;(function (j) {
      dots[j].onmouseenter = function () {
        clearInterval(swiperEl.timeId)
        setActiveDot(j)
        curIdx = j + 1
        swiperEl.style.left = curIdx * width * -1 + 'px'
      }
      dots[j].onmouseleave = function () {
        loop()
      }
    })(i)
  }
  // 设置选中的小圆点样式
  function setActiveDot(idx) {
    for (var i = 0; i < len; i++) {
      dots[i].className = 'swiper-dot-item'
    }
    dots[idx !== undefined ? idx : curIdx - 1].className += ' active'
  }

  // 初始化左右两侧按钮功能
  var actionsEl = document.getElementsByClassName('swiper-actions')[0],
    leftBtn = actionsEl.children[0],
    rightBtn = actionsEl.children[1]
  // 绑定触发事件
  leftBtn.onclick = throttle(function () {
    --curIdx
    swiperEl.style.transition = 'all .5s'
    swiperEl.style.left = curIdx * width * -1 + 'px'
    if (curIdx == 0) {
      curIdx = len
      setActiveDot()
      setTimeout(function () {
        swiperEl.style.transitionProperty = 'none'
        swiperEl.style.left = curIdx * width * -1 + 'px'
      }, 500)
    } else {
      setActiveDot()
    }
  }, 500)
  rightBtn.onclick = throttle(function () {
    ++curIdx
    swiperEl.style.transition = 'all .5s'
    swiperEl.style.left = curIdx * width * -1 + 'px'
    if (curIdx === len + 1) {
      curIdx = 1
      setActiveDot()
      setTimeout(function () {
        swiperEl.style.transitionProperty = 'none'
        swiperEl.style.left = curIdx * width * -1 + 'px'
      }, 500)
    } else {
      setActiveDot()
    }
  }, 500)
  // 暂停轮播
  leftBtn.onmouseover = function () {
    clearInterval(swiperEl.timeId)
  }
  rightBtn.onmouseover = function () {
    clearInterval(swiperEl.timeId)
  }
  // 开启轮播
  leftBtn.onmouseout = function () {
    loop()
  }
  rightBtn.onmouseout = function () {
    loop()
  }

  // 节流
  function throttle(fn, time) {
    let canRun = true
    return function () {
      if (!canRun) return
      canRun = false
      setTimeout(() => {
        fn.apply(this, arguments)
        canRun = true
      }, time)
    }
  }

  window.swiper = { run: loop }
})()

swiper.run()
