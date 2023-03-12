;(function () {
  var wHeight = getViewportSize().height,
    sHeight = getScrollSize().height,
    isPlay = false,
    t = null

  var AutoReader = function (opt) {
    this.backTopBtn = opt.backTopBtn
    this.scrollBtn = opt.scrollBtn

    var _self = this
    // 绑定滚动事件，监听滚动距离展示返回顶部按钮
    addEvent(
      window,
      'scroll',
      function () {
        _self.backTopBtnShow()
      },
      false
    )
    // 绑定返回顶部按钮点击事件处理函数，清理定时器
    addEvent(this.backTopBtn, 'click', function () {
      isPlay = false
      clearInterval(t)
      setBtnStyle(_self.scrollBtn)
      window.scrollTo(0, 0)
    })
    // 绑定自动滚动按钮点击事件处理函数，开启滚动事件
    addEvent(this.scrollBtn, 'click', function () {
      _self.setAutoPlay.call(_self.scrollBtn)
    })
  }

  AutoReader.prototype = {
    backTopBtnShow: function () {
      var scrollTop = getScrollOffset().top,
        curBtn = this.backTopBtn
      curBtn.style.display = scrollTop ? 'block' : 'none'
    },
    setAutoPlay: function () {
      var scrollTop = getScrollOffset().top,
        _self = this
      // 页面整体滚动距离 = 视口高度 + 滚动条滚出页面的距离
      // 如果已经滚动到底部退出函数
      if (sHeight == wHeight + scrollTop) {
        return
      }
      // 开启滚动
      if (!isPlay) {
        t = setInterval(function () {
          var scrollTop = getScrollOffset().top
          if (sHeight <= wHeight + scrollTop) {
            isPlay = false
            clearInterval(t)
            setBtnStyle(_self)
          } else {
            window.scrollBy(0, 1)
            setBtnStyle(_self)
          }
        }, 1)
        isPlay = true
      } else {
        isPlay = false
        clearInterval(t)
        setBtnStyle(_self)
      }
    },
  }

  function setBtnStyle(that) {
    that.style.backgroundColor = isPlay ? '#ff0000' : '#ffff00'
    that.innerText = isPlay ? '暂停滚动' : '开始滚动'
  }

  window.AutoReader = AutoReader
})()

new AutoReader({
  scrollBtn: document.getElementsByClassName('app-scroll')[0],
  backTopBtn: document.getElementsByClassName('app-backtop')[0],
})
