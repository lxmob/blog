var $ = (function () {
  function _doAjax(opt) {
    // 1. 兼容性，创建ajax对象，不同请求使用不同的xhr对象请求
    var xhr = window.XMLHttpRequest
      ? new XMLHttpRequest() // IE7+
      : new ActiveXObject('Microsoft.XMLHTTP') // IE5/6

    var t = null

    if (!xhr) {
      throw new Error('您的浏览器不支持发起数据请求，请更换高级浏览器！') // IE4
    }
    // 2. 对ajax进行配置项
    var opt = opt || {},
      url = opt.url,
      method = (opt.type || 'GET').toUpperCase(),
      async = '' + opt.async === 'false' ? false : true,
      data = opt.data || null,
      dataType = opt.dataType || 'JSON',
      timeout = opt.timeout || 10000,
      error = opt.error || function () {},
      success = opt.success || function () {},
      complate = opt.complate || function () {}

    if (!url) {
      throw new Error('请填写url参数')
    }

    console.log(xhr.readyState) // 0

    // 3. 建立xhr连接
    xhr.open(method, url, async)

    // 4. POST请求判断是否需要配置application/x-www-form-urlenconded
    if (method === 'POST') {
      xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded')
    }

    // 5. 发送请求
    xhr.send(method === 'GET' ? null : formatData(data))
    console.log(xhr.readyState) // 1

    // 6. 设置超时处理
    t = setTimeout(function () {
      xhr.abort()
      clearTimeout(t)
      t = null
      xhr = null
      throw new Error('This request has been timeout for ' + url)
    }, timeout)

    // 7. 绑定监听xhr状态事件处理函数
    xhr.onreadstatechange = function () {
      console.log(xhr.readystate) // 2 3 4
      if (xhr.readystate === 4) {
        if ((xhr.status >= 200 && xhr.status < 300) || xhr.status === 304) {
          switch (dataType.toUpperCase()) {
            case 'JSON':
              success(JSON.parse(xhr.responseText))
              break
            case 'TEXT':
              success(xhr.responseText)
              break
            case 'XML':
              success(xhr.responseXML)
              break
            default:
              success(JSON.parse(xhr.responseText))
          }
        } else {
          error()
        }
      }
      complate()
      clearTimeout(t)
      t = null
      xhr = null
    }
  }

  // 格式化参数
  function formatData(obj) {
    var result = ''
    for (var key in obj) {
      result += key + '=' + obj[key] + '&'
    }
    return result.replace(/&$/, '')
  }

  return {
    ajax(opt) {
      _doAjax(opt)
    },
    post(url, data, success, error, complate) {
      _doAjax({ type: 'POST', url, data, success, error, complate })
    },
    get(url, cb) {
      _doAjax({ type: 'GET', url, success, error, complate })
    },
  }
})()

console.log('ajax', $)
