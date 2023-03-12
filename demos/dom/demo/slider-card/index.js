;(function (doc) {
  var oList = doc.getElementsByClassName('tb-recommend')[0],
    oItem = doc.getElementsByClassName('tb-recommend-item'),
    curIdx = 0

  var init = function () {
    bindEvent()
  }

  function bindEvent() {
    // 1、循环每一个元素绑定事件，缺点影响内存占用效率
    // for (var i = 0; i < oItem.length; i++) {
    //   addEvent(oItem[i], 'mouseover', function () {
    //     oItem[curIdx].className = 'tb-recommend-item'
    //     curIdx = [].indexOf.call(oItem, this)
    //     oItem[curIdx].className += ' active'
    //   })
    // }
    // 2、采用事件代理形式
    addEvent(oList, 'mouseover', slide)
    addEvent(oList, 'mouseout', slide)
  }

  function slide(e) {
    var ev = eventTarget(e),
      oParent = getParent(ev, 'li'),
      thisIdx = [].indexOf.call(oItem, oParent)

    if (curIdx !== thisIdx) {
      oItem[curIdx].className = 'tb-recommend-item'
      curIdx = thisIdx
      oItem[curIdx].className += ' active'
    }
  }

  function getParent(tar, elem) {
    while (tar.tagName.toLowerCase() !== elem) {
      tar = tar.parentNode
    }
    return tar
  }

  init()
})(document)
