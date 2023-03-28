### 请求方法

- `GET` 获取数据
- `POST` 修改资源
- `PUT` 上传资源（form 表单不支持，提交即存储原则，无验证机制存在安全漏洞，服务端需要配置支持该方法）
- `DELETE` 删除资源（form 表单不支持，提交即存储原则，无验证机制存在安全漏洞，服务端需要配置支持该方法）
- `HEAD` 获取报文首部内容
- `OPTIONS` 查询服务器资源支持的 HTTP 请求方法
- `TRACE` 回显服务器收到的请求，用于测试和诊断
- `CONNECT` 使用隧道协议连接代理服务器

### GET 和 POST 的区别

- POST 更安全，不会作为 URL 的一部分、不会被缓存、保存在服务器日志和浏览器记录中
- POST 发送的数据量更大（GET 有参数长度限制）
  - 长度限制：IE（2083 字节）firefox（65536 字符）chrome（8182 字符）safari（80000 字符）opera（190000 字符）
- POST 支持更多的数据类型，GET 只能发送 ASCII 字符
- POST 比 GET 速度慢
  - POST 请求包含更多的请求头字段
  - POST 接收数据之前会先将请求头发送给服务器确认，然后发送数据
    - 第三次握手，浏览器确认并发送 POST 请求头
    - 服务器返回状态码 100 后，continue 响应
    - 浏览器开始发送数据
    - 服务器返回 200 响应
  - GET 会进行数据缓存，POST 不会
  - POST 不能进行管道化传输
    - 串行连接，每次都需要连接请求断开连接
    - 持久化连接（connection：keep-alive）HTTP1.0/1.1 连接不会关闭
    - 管道化持久连接（HTTP1.1 把所有请求任务放到发送队列中，不等响应，一个个发送请求的同时接收相应的响应，弊端中间有任务失败会导致队列清空重新再发）
- GET 遵循幂等性，只能用来获取数据

### 数据格式

- GET、DELETE、HEAD 方法，参数风格为标准的 Query String 风格的参数，如 `url?a=1&b=2`
- POST、PUT、PATCH、OPTIONS 方法
  - `multipart/form-data` 表单形式提交，既可以上传键值对也可以上传多个文件
  - `application/x-www-from-urlencoded` 以键值对的数据格式提交
  - `application/json` 序列化字符串
  - `text/xml` 以 `xml` 格式传输
  - `text/plain` 数据以纯文本形式进行编码
  - `binary` 只可以上传二进制数据 `application/octet-stream` 用来上传文件，一次只能上传一个文件
