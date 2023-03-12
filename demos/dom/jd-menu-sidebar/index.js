window.onload = function () {
  init()
}

function init() {
  initMenu()
}

var initMenu = function () {
  var oMenu = document.getElementById('J_menu_sidebar'),
    oMenuItems = oMenu.getElementsByClassName('main-item'),
    menuLen = oMenuItems.length,
    subWrap = document.getElementsByClassName('sub')[0],
    oSubItems = document.getElementsByClassName('sub-item'),
    menuItem,
    subItem,
    isInSub = false,
    isFirst = true,
    t = null,
    movePoses = []

  addEvent(oMenu, 'mouseenter', function () {
    addEvent(document, 'mousemove', handleMouseMove)
  })
  addEvent(oMenu, 'mouseleave', handleMouseLeave)

  addEvent(subWrap, 'mouseenter', function () {
    isInSub = true
  })
  addEvent(subWrap, 'mouseleave', function () {
    isInSub = false
  })

  for (var i = 0; i < menuLen; i++) {
    menuItem = oMenuItems[i]
    addEvent(menuItem, 'mouseenter', handleMouseEnter)
  }

  // 实现斜着进入子菜单需要获取三个点，1. 鼠标初始移入菜单的点位、2. 子菜单左上顶点、3. 子菜单左下顶点
  // 三者连成一个三角形区域，判断如果用户后续移动的点位在三角形内则属于斜着进入
  // 那么需要绑定一个mousemove事件，来获取用户移动后的点位，后续则需要进行延迟切换菜单

  /**
   *    A-----B
   *     \  p |
   *      \   |
   *       \  |
   *        \ |
   *         \|
   *          C
   *
   */

  function handleMouseMove(e) {
    var ev = e || window.event
    // 记录鼠标移动的倒数第一和倒数第二个点来形成 A点和 P点
    movePoses.push({
      x: pagePos(ev).x,
      y: pagePos(ev).y,
    })
    if (movePoses.length >= 3) {
      movePoses.shift()
    }
  }

  // 移入函数
  function handleMouseEnter(e) {
    var ev = eventTarget(e),
      thisIdx = [].indexOf.call(oMenuItems, ev),
      posesLen = movePoses.length,
      curPos = movePoses[posesLen - 1] || { x: 0, y: 0 }, // P点，防止第一次进来没有move生成的点位报错
      lastPos = movePoses[posesLen - 2] || { x: 0, y: 0 }, // A点，防止第一次进来没有move生成的点位报错
      isDelay = doTimeout(lastPos, curPos)

    console.log(isDelay)

    subWrap.className = 'sub'

    // 频繁触发enter只取最后一项
    if (t) {
      clearTimeout(t)
    }
    // 解决第一次进来是延迟的问题
    if (!isFirst) {
      // 如果需要延迟说明鼠标是斜着进入
      if (isDelay) {
        // 延迟切换菜单
        t = setTimeout(function () {
          // 如果已经在子菜单内则不需要切换菜单
          if (isInSub) {
            return
          }
          setActive(thisIdx)
          t = null
        }, 300)
      } else {
        setActive(thisIdx)
      }
    } else {
      setActive(thisIdx)
      isFirst = false
    }
  }

  // 移出函数
  function handleMouseLeave() {
    subWrap.className += ' hide'
    removeClassName()
    removeEvent(document, 'mousemove', handleMouseMove)
  }

  // 是否要启动延迟
  function doTimeout(lastPos, curPos) {
    var bPos = {
        x: getStyles(oMenu, 'margin-left') + getStyles(oMenu, 'width'),
        y: getStyles(oMenu, 'margin-top'),
      },
      cPos = {
        x: getStyles(oMenu, 'margin-left') + getStyles(oMenu, 'width'),
        y: getStyles(oMenu, 'margin-top') + getStyles(oMenu, 'height'),
      }

    return pointInTriangle({
      p: curPos,
      a: lastPos,
      b: bPos,
      c: cPos,
    })
  }

  // 设置高亮元素
  function setActive(idx) {
    removeClassName()
    oMenuItems[idx].className += ' active'
    oSubItems[idx].className += ' active'
  }

  // 设置高亮前删除原有类名
  function removeClassName() {
    for (var i = 0; i < menuLen; i++) {
      menuItem = oMenuItems[i]
      menuItem.className = 'main-item'
      subItem = oSubItems[i]
      subItem.className = 'sub-item'
    }
  }
}
