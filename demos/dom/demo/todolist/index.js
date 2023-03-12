init()

function init() {
  initTodoList
}

var initTodoList = (function () {
  var iptWrap = document.getElementsByClassName('td-input-wrap')[0],
    showIpt = document.getElementsByClassName('miadd')[0],
    oList = document.getElementsByClassName('td-list')[0],
    addItem = document.querySelector('.td-btn-bd > button'),
    textIpt = document.querySelector('.td-input-bd > input'),
    isShowIpt = false,
    isEdit = false,
    curIdx = null

  // 切换输入框的展示
  addEvent(showIpt, 'click', function () {
    toggle()
    isShowIpt && resetStatus()
  })

  // 触发新增或修改的处理函数
  addEvent(addItem, 'click', function () {
    var val = textIpt.value.trim(),
      len = val.length,
      liItems = elemChildren(oList),
      liLen = liItems.length

    // 空值处理
    if (len <= 0) return

    // 是否存在子元素，如果存在内容判重处理
    if (liLen) {
      for (var i = 0; i < liItems.length; i++) {
        var pText = elemChildren(liItems[i])[0].innerText
        if (pText == val) return alert('内容重复')
      }
    }

    // 区分新增和修改
    if (isEdit) {
      elemChildren(liItems[curIdx])[0].innerText = val
      resetStatus()
    } else {
      var liNode = document.createElement('li')
      liNode.className = 'td-list-item'
      liNode.innerHTML = createTpl(val)
      oList.appendChild(liNode)
    }

    toggle()
  })

  // 事件代理获取触发编辑和删除事件的元素
  addEvent(oList, 'click', function (event) {
    var target = eventTarget(event),
      liItems = elemChildren(oList),
      className = target.className

    if (className == 'edit' || className == 'delete') {
      var liElem = parentElement(target, 2)

      // 保存到全局的下标项
      curIdx = [].indexOf.call(liItems, liElem)

      if (className == 'delete') {
        liElem.remove()
      } else {
        isEdit = true
        addItem.innerText = '编辑第' + (curIdx + 1) + '项'

        // 循环赋值选中和未选中类名
        for (var i = 0; i < liItems.length; i++) {
          liItems[i].className = 'td-list-item'
        }
        liItems[curIdx].className += ' active'
        toggle()
      }
    }
  })

  function toggle() {
    isShowIpt = !isShowIpt
    iptWrap.style.display = isShowIpt ? 'block' : 'none'
    textIpt.value = ''
  }

  function resetStatus() {
    curIdx = null
    isEdit = false
    textIpt.value = ''
    addItem.innerText = '增加项目'
  }

  function createTpl(text) {
    return `<p class="content">${text}</p>
        <div class="icon-wrap">
          <iconify-icon
            class="edit"
            icon="line-md:clipboard-arrow"
          ></iconify-icon>
          <iconify-icon class="delete" icon="line-md:close"></iconify-icon>
        </div>
      `
  }
})()
