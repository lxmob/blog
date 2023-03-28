### Connection HTTP 长连接和短连接

- 短连接：每次请求一个资源就建立连接，请求完成后连接立马关闭
- 长连接：只建立一次连接，多次资源请求都复用该连接，完成后关闭

### 早期 HTTP1.0

- 每个 HTTP 请求都要创建一个 TCP/IP 连接，串行连接（短连接）

### 后期 HTTP1.0

- 在请求头中增加：Connection: keep-alive 字段

### HTTP1.1

- 默认开启 Connection: keep-alive
- 如果需要关闭 Connection: close
- 大多数浏览器中都默认使用 HTTP1.1 规范
