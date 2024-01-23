### HTTP 和 HTTPs 是什么

- HyperText Transfer Protocol 超文本传输协议
- 定义：按照协议规则先向 WEB 服务器发送请求，将超文本传输至浏览器本地
- HyperText Transfer Protocol Secure 超文本传输安全协议
- 定义：基于 SSL/TLS 安全版，为网络通信提供安全及数据完整性的一种安全协议，对网络连接进行加密
- SSL：Secure Sockets Layer 安全套接层
- TLS：Transport Layer Security 传输层安全
- 两者区别
  - HTTP 是不安全的（监听和中间人攻击等手段，获取网站账户信息和敏感信息）HTTPS 可防止被攻击
  - HTTP 协议的传输内容都是明文，直接在 TCP 连接上运行，无状态对于事务处理没有记忆能力，客户端和服务器都无法验证对方身份
  - HTTPs 协议的传输内容都被 SSL/TLS 加密，且运行在 SSL/TLS 上，SSL/TLS 运行在 TCP 连接上，所以数据传输是安全的

### HTTP 版本

#### 0.9

- 只能发送 GET 请求
- 只能请求访问 HTML 格式的数据

#### 1.0

- 增加了 POST、HEAD 的请求方式
- 支持多种数据格式的请求与访问
- 支持 cache 缓存功能
- 新增状态码、多字符集支持、内容编码等
- 早期 HTTP/1.0 不支持 keep-alive 长连接，只支持串行连接（短连接）
- 后期 HTTP/1.0 开始支持长连接，增加 Connection：keep-alive 字段（非标准字段）

#### 1.1

- 增加持久化连接（默认开启 Connection：keep-alive）
- 增加管道化机制（支持多个请求同时发送）
- 增加 PUT、PATCH、OPTIONS、DELETE 请求方法
- 增加 HOST 字段（指定服务器域名）
- 增加 100 状态码（continue）支持只发送头部信息请求
- 增加身份认证机制
- 支持传送内容的一部分和文件断点续传
- 新增 24 个错误状态码
- 缺点对带宽的利用率不理想
  - TCP 慢启动
  - 同时建立起多条 TCP 连接，争抢网络带宽资源
  - 队头阻塞，限行管道队列

#### 2.0

- 二进制帧协议（头信息与数据体使用二进制进行传输）
- 增加双工模式（客户端同时发送多个请求，服务端同时处理多个请求）
- 头部信息压缩机制（每次请求都会带上所有信息发送给服务端，因为 HTTP 是无状态连接，无法记录之前发送的事物，所以要压缩头部信息）
- 服务端推送（服务器会把客户端需要的资源一起推送到客户端，合适加载静态资源）
- 多工模式（处理请求时先响应已处理好的部分，再响应其他请求，最后再解决没有处理好的部分）

### Request 报文

```
请求行：
# POST  / http://nodejs.cn / HTTP/1.1
请求方式      uri      协议的版本(1.0 2.0)

请求头：
# Host: nodejs.cn:8000        	主机名
# Connection: keep-alive      	连接设置
# Accept                      	设置客户端接受的数据类型
# Cache-Control: no-cache     	设置缓存
# User-Agent                  	设置当前客户端的标识
# ContentType: application/x-www-form-urlencoded 参数格式
# Referer                       得知请求资源的页面
# Accept-Encoding             	设置编码(gzip 压缩)
# Accept-Language             	设置接受的语言
# Cookie                      	保存的数据

空行

请求体：
# username=admin&passworld=admin
```

### Response 报文

```
响应行：
# HTTP/1.1  200          OK
  版本     状态码      状态标识

响应头：
# Server: nginx/1.15.12                   服务器信息
# Date: Fri, 22 Nov 2019 06:56:52 GMT     时间 GMT 时区
# Content-Type                            数据格式
# Transfer-Encoding: chunked              传输报文主体格式
# Content-Length                          内容的长度
# Last-Modified                           最后的修改时间
# Expires: Fri, 22 Nov 2019 18:56:52 GMT  过期时间
# Cache-Control: max-age=43200            缓存设置
# Set-Cookie: SESSION=NzBm

空行

响应体：
# <html> <head></head><body></body> </html>
```

### 减少 HTTP 请求的方法

- CSS 雪碧图（精灵图）多张图片合并一张
- Base64 编码图片，缺点容易导致代码量增加
- 合并脚本与样式文件
- 配置多个域名，CDN 加速服务
- 尽量使用浏览器缓存机制
