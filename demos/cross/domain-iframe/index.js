var ajaxDoamin = (function () {
  function craeteIframe(iframeId, iframeSrc) {
    var iframe = document.createElement('iframe')
    iframe.id = iframeId
    iframe.src = iframeSrc
    iframe.style.display = 'none'
    return iframe
  }

  return function (opt) {
    document.domain = opt.basicDoamin
    var iframe = craeteIframe(opt.iframeId, opt.iframeSrc)
    iframe.onload = function () {
      var $$ = document.getElementById(opt.iframeId).contentWindow.$
      $$.ajax({
        url: opt.url,
        type: opt.type,
        data: opt.data,
        success: opt.success,
        error: opt.error,
      })
    }
    document.body.appendChild(iframe)
  }
})()
