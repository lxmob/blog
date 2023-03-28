### JSONP

- JSON with padding：跨域获取 JSON 数据的一种非官方的模式
- 注意：
  - JSON 和 JSONP 不是一个类型
  - JSON 是数据交换的格式
  - JSONP 是一种跨域获取 JSON 数据的交互技术，非正式的协议
  - JSONP 抓取的资源并不直接是 JSON 数据，而是带有 JSON 数据参数的函数执行
  - JSONP 仅支持 GET 请求
- [具体代码](https://github.com/lxmob/blog/blob/main/demos/cross/jsonp-ajax/index.html)

```js
// 客户端期望返回的
{"name":"lxm","age":"26"}
// JSONP实际返回的
callback({"name":"lxm","age":"26"})
```

### Iframe

- 定义：嵌入式页面内联框架
- 通过 iframe 嵌入的页面父子页面之间获取 window 挂载的属性和方法
- 还可以进行操作父子之间的 location 跳转页面
