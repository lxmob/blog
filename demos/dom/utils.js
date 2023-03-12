// 获取元素中属性绝对值
function getStyles(elem, prop) {
  if (window.getComputedStyle) {
    return prop
      ? parseInt(window.getComputedStyle(elem, null)[prop])
      : window.getComputedStyle(elem, null)
  } else {
    return prop ? parseInt(elem.currentStyle[prop]) : elem.currentStyle
  }
}

// 获取鼠标位置偏移量
function pagePos(event) {
  var sLeft = getScrollOffset().left,
    sTop = getScrollOffset().top,
    cLeft = document.documentElement.clientLeft || 0,
    cTop = document.documentElement.clientTop || 0
  return {
    x: sLeft + event.clientX - cLeft,
    y: sTop + event.clientY - cTop,
  }
}

// 获取页面滚出距离（滚动条距离）
function getScrollOffset() {
  if (window.pageXOffset) {
    return { left: window.pageXOffset, top: window.pageYOffset }
  } else {
    return {
      left: document.body.scrollLeft + document.documentElement.scrollLeft,
      top: document.body.scrollTop + document.documentElement.scrollTop,
    }
  }
}

// 获取浏览器可视区域的尺寸
function getViewportSize() {
  if (window.innerHeight) {
    return { width: window.innerWidth, height: window.innerHeight }
  } else {
    var isW3C = document.compatMode === 'CSS1Compat'
    return {
      width: document[isW3C ? 'documentElement' : 'body'].clientWidth,
      height: document[isW3C ? 'documentElement' : 'body'].clientHeight,
    }
  }
}

// 获取页面整体宽高
function getScrollSize() {
  var isIE567 = !!document.body.scrollHeight
  return {
    width: document[isIE567 ? 'documentElement' : 'body'].scrollWidth,
    height: document[isIE567 ? 'documentElement' : 'body'].scrollHeight,
  }
}

// 获取元素距离视口的距离
function getElemClientRect(el) {
  var parent = el.offsetParent,
    offsetLeft = el.offsetLeft,
    offsetTop = el.offsetTop

  while (parent) {
    offsetLeft += parent.offsetLeft
    offsetTop += parent.offsetTop
    parent = parent.offsetParent
  }
  return { top: offsetTop, left: offsetLeft }
}

/**
 * 为目标元素绑定事件处理函数
 * @param {node} el
 * @param {string} type
 * @param {function} fn
 */
function addEvent(el, type, fn) {
  if (el.addEventListener) {
    el.addEventListener(type, fn, false)
  } else if (el.attachEvent) {
    el.attachEvent('on' + type, fn)
  } else {
    el['on' + type] = fn
  }
}

/**
 * 为目标元素删除事件处理函数
 * @param {node} el
 * @param {string} type
 * @param {function} fn
 */
function removeEvent(el, type, fn) {
  if (el.removeEventListener) {
    el.removeEventListener(type, fn, false)
  } else if (el.detachEvent) {
    el.detachEvent('on' + type, fn)
  } else {
    el['on' + type] = null
  }
}

/**
 * 阻止元素冒泡
 * @param {event} e
 */
function cancelBubble(e) {
  var event = e || window.event
  if (event.stopPropagation) {
    event.stopPropagation()
  } else {
    event.cancelBubble = true
  }
}

/**
 * 阻止元素默认事件
 * @param {event} e
 */
function preventDefault(e) {
  var event = e || window.event
  if (event.preventDefault) {
    event.preventDefault()
  } else {
    event.returnValue = false
  }
}

/**
 * 查找所有子元素集合
 * @param {node} node
 * @returns
 */
function elemChildren(node) {
  var temp = {
      length: 0,
      splice: Array.prototype.splice,
    },
    len = node.childNodes.length,
    item
  for (var i = 0; i < len; i++) {
    item = node.childNodes[i]
    if (item.nodeType == 1) {
      temp[temp.length] = item
      temp.length++
    }
  }
  return temp
}

/**
 * 判断该节点下是否有子元素
 * @param {node} node
 * @returns
 */
function hasElemChilds(node) {
  var len = node.childNodes.length,
    flags = false,
    item
  for (var i = 0; i < len; i++) {
    item = node.childNodes[i]
    if (item.nodeType == 1) {
      flags = true
    }
  }
  return flags
}

/**
 * 兼容处理IE9及以下事件源对象
 * @param {event} e
 * @returns
 */
function eventTarget(e) {
  var event = e || window.event
  return event.target ? event.target : event.srcElement
}

/**
 * 以自身开始向上查找第n个父级元素
 * @param {node} target
 * @param {number} n
 * @returns
 */
function parentElement(target, n) {
  var elem = target,
    isNotNum = typeof n !== 'number'
  if (isNotNum) {
    return elem
  } else if (n < 0) {
    return undefined
  }
  while (n) {
    if (elem.nodeName === 'HTML') {
      elem = null
      return elem
    }
    elem = elem.parentNode
    n--
  }
  return elem
}

/**
 * 元素拖拽
 * @param {event} el
 */
function elemDrag(el) {
  var x, y
  addEvent(el, 'mousedown', function (e) {
    var target = e || window.event
    x = pagePos(target).x - getStyles(el, 'left')
    y = pagePos(target).y - getStyles(el, 'top')
    addEvent(document, 'mousemove', mouseMove)
    addEvent(document, 'mouseup', mouseUp)
    cancelBubble(target)
    preventDefault(target)
  })
  function mouseMove(e) {
    var target = e || window.event
    el.style.top = pagePos(target).y - y + 'px'
    el.style.left = pagePos(target).x - x + 'px'
  }
  function mouseUp() {
    removeEvent(document, 'mousemove', mouseMove)
    removeEvent(document, 'mouseup', mouseUp)
  }
}

/**
 * 支持标签、类名、ID方式获取dom元素
 * @param {*} target
 * @returns
 */
function getDOM(target) {
  var _s = target.charAt(0),
    rTarget = target.replace(_s, '')

  switch (_s) {
    case '#':
      return document.getElementById(rTarget)
    case '.':
      return document.getElementsByClassName(rTarget)
    default:
      return document.getElementsByTagName(rTarget)
  }
}
