window.onload = function () {
  init()
}

function init() {
  initMagnifier()
}

var initMagnifier = function () {
  var imgWrap = document.getElementsByClassName('img-wrap')[0],
    magWrap = imgWrap.getElementsByClassName('mag-wrap')[0],
    magImg = magWrap.getElementsByClassName('mag-img')[0],
    magWidth = getStyles(magWrap, 'width'), // 放大镜容器宽度
    magHeight = getStyles(magWrap, 'height'), // 放大镜容器高度
    imgX = imgWrap.offsetLeft,
    imgY = imgWrap.offsetTop

  addEvent(imgWrap, 'mouseover', function (e) {
    var current = getXY(e)
    console.log(current)
    magWrap.className += ' show'
    showMag(current.x, current.y)

    addEvent(document, 'mousemove', mouseMove)
  })

  addEvent(imgWrap, 'mouseout', mouseOut)

  function mouseMove(e) {
    var current = getXY(e)
    showMag(current.x, current.y, current.mouseX, current.mouseY)
  }

  function mouseOut() {
    magWrap.className = 'mag-wrap'
    removeEvent(document, 'mousemove', mouseMove)
  }

  function getXY(e) {
    var ev = e || window.event
    return {
      // 放大镜需要移动的距离 = 鼠标距离文档顶点的位置 - 最外侧盒子与视口的距离 - 放大镜容器宽度 / 2
      x: pagePos(ev).x - imgX - magWidth / 2,
      y: pagePos(ev).y - imgY - magHeight / 2,
      // 用于判断边界值
      mouseX: pagePos(ev).x - imgX,
      mouseY: pagePos(ev).y - imgY,
    }
  }

  function showMag(x, y, mouseX, mouseY) {
    magWrap.style.left = x + 'px'
    magWrap.style.top = y + 'px'
    // 放大镜容器图片移动的距离 = 放大镜容器相反的距离
    magImg.style.left = -x + 'px'
    magImg.style.top = -y + 'px'

    // 边界值
    if (mouseX && mouseY) {
      if (
        mouseX < 0 ||
        mouseX > getStyles(imgWrap, 'width') ||
        mouseY < 0 ||
        mouseY > getStyles(imgWrap, 'height')
      ) {
        magWrap.className = 'mag-wrap'
      }
    }
  }
}
