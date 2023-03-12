window.onload = function () {
  init()
}

function init() {
  inputSearch()
}

// 搜索框模块
var inputSearch = (function () {
  var autoKw = document.getElementById('J_autoKw'),
    searchKw = document.getElementById('J_search_kw'),
    recomKw = JSON.parse(document.getElementById('J_recomKw').innerHTML),
    kwOrder = 0,
    timeId = null

  function setAutoKws() {
    autoKwChange()
    timeId = setInterval(autoKwChange, 3000)
  }

  function autoKwChange() {
    var len = recomKw.length
    autoKw.innerText = recomKw[kwOrder]
    kwOrder = kwOrder >= len - 1 ? 0 : ++kwOrder
  }

  addEvent(searchKw, 'blur', function () {
    autoKw.style.color = '#989898'
    timeId = setInterval(autoKwChange, 3000)
  })
  addEvent(searchKw, 'focus', function () {
    autoKw.style.color = '#ddd'
    clearInterval(timeId)
  })
  addEvent(searchKw, 'input', function () {
    setAutoKwShow(this.value)
  })
  addEvent(searchKw, 'propertyChange', function () {
    setAutoKwShow(this.value)
  })

  function setAutoKwShow(val) {
    var len = val.length
    autoKw.style.display = len ? 'none' : 'block'
  }

  return function () {
    setAutoKws()
  }
})()
