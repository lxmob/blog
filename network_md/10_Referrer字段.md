### Referrer

- 来源域名（请求头字段）当浏览器向服务器发送请求时，会携带 Referer 告知服务器从哪个页面跳转链接过来的
- 服务器可以通过 Referer 字段分析不同渠道的流量分布、用户搜索的关键词

### 不携带 Referer 信息

```html
<meta name="referrer" content="no-referrer" />
```

- Referrer Policy: `no-referrer`
- 无 Referer 字段

### 携带 Referer 信息

```html
<meta name="referrer" content="origin" />
```

- Referrer Policy: `origin`
- Referer: `http://localhost/`

### 协议降级

- 当从 HTTPs 页面引入 HTTP 资源时不发送 Referrer 信息，大部分浏览器默认策略
- Referrer Policy: `no-referrer-when-downgrade`
- Referer: `http://localhost/home/network/`

### 应用场景

- 资源防止盗链：服务器拉取资源之前判断 Referer 是否是自己的域名或 IP，如果不是就拦截，如果是则拉取资源
- 扩展：时间戳防盗链，使用时间戳和密钥来标识资源是否过期和签名，其中如果一项不满足则都会被拦截
