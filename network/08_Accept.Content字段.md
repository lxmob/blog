### Accept

- 定义：客户端希望接收的数据类型格式，属于请求头字段
- Accept：`text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8`
- 字段内容使用逗号分隔，使用`;q=0~1` 来表示权重
- q：相对品质因子（权重）它的取值范围是 0 ～ 1，如果没有指定则默认为 q=1，如果赋值为 0 则提示服务器该内容类型格式不被浏览器接受

### Content-Type

- 定义：标识资源类型与编码的格式
- Content-Type: `text/html;charset=UTF-8（Accept-Charset）`

### Accept-Language

- 定义：浏览器支持的语言
- Accept-Language: `zh-CN,en-US;q=0.8,en;q=0.6`

### Content-Language

- 定义：说明返回资源的语言类型
- Content-Language：`zh-CN`

### Accept-Encoding

- 定义：浏览器可以接受的资源编码格式（压缩格式）
- Accept-Encoding: `gzip,deflate,br`

### Content-Encoding

- 定义：服务器返回资源的编码格式（压缩格式，优化传输内容的大小）
- Content-Encoding: `gzip`

### Content-length

- 定义：描述 HTTP 消息实体的传输长度
- GET 请求：请求头没有 Content-length，响应头带 Content-length
- POST 请求：请求头与响应头都带 Content-length
