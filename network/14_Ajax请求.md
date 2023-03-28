### Ajax Asynchronous JavaScript and XML

- 定义：通过 Ajax 不刷新页面获取所需的数据，行为可以是异步和同步
- 历史：
  - 1999：IE5.0 允许 JS 脚本向服务器单独发起 HTTP 请求的新功能
  - 2004：Gmail 推出异步邮件更新功能
  - 2005：Google Map 异步更新地图服务
  - 2005：Ajax 被各大厂公认命名
  - 2006：W3C 发布 Ajax 国际标准
- 总结：通过 javascript 异步通信，请求服务器返回 JSON/XML 文档，前端从 JSON/XML 文档中提取数据，在不刷新整个网页的基础上，渲染到网页相应的位置

### XHR 对象

- 原生 XMLHttpRequest 与 ActiveXObject
- 定义：XMLHttpRequest 本身是一个 Js 引擎内置的构造函数
- 兼容性：IE5/IE6 使用 ActiveXObject
- 方法：
  - open：接收三个参数，method 请求方法、url 请求地址、async 是否开启异步
  - send：发送 POST 请求体需要携带参数，GET 不填写
- 事件：
  - onreadystatechang：挂载到 xhr 对象上的事件
- 属性：
  - readyState：通过 xhr 对象发送 HTTP 请求的各阶段状态码（0-4）当 readyState 变化时会触发 change 事件执行绑定的事件处理函数
  - status：服务器响应的状态码
  - responseText：获取字符串数据
  - responseXML：获取 XML 数据

### readState 阶段

- 0：请求未初始化
- 1：服务器连接已建立
- 2：请求已接收
- 3：请求处理中
- 4：请求已完成，且响应已就绪

### POST 请求注意事项

- send 方法参数中的格式：a=1&b=2&c=3
- 在发送 POST 请求前要设置请求头信息：xhr.setRequestHeader("Content-type","application/x-www-form-urlencoded");

### XHR 标准分为 Level1 和 Level2

- Level1
  - 无法发送跨域请求
  - 仅支持发送纯文本（xml、html、json）
  - 无法获取传输进度
- Level2
  - 可以发送跨域请求
  - 支持获取二进制数据
  - 支持上传文件
  - formData 对象
  - 可以获取传输进度
  - 可以设置超时时间

### Ajax Level2 新增事件（不常用->兼容性问题）

- xhr.onloadstart：绑定 HTTP 请求发出的监听函数
- xhr.onerror：绑定请求失败的监听函数
- xhr.onload：绑定请求成功完成的监听函数
- xhr.onabort：绑定请求中止（调用 abort()方法）的监听函数
- xhr.onloadend：绑定请求完成（无论失败或成功）的监听函数
- 执行顺序：loadstart -> readyState === 4 -> load/error/abort -> loadend

### 简单封装 Ajax

- [具体代码](https://github.com/lxmob/blog/blob/main/demos/cross/ajax/index.js)
