### Cookie

- 诞生：会话（seesion）和 Cookie 就是为了让 HTTP 请求具有记忆能力，来标识用户身份信息
- 定义：服务器发送给用户浏览器并保存在本地的一小块数据
- 生成：服务器通过接收浏览器的请求，响应 Set-Cookie 字段来设置 Cookie，也可以通过 document.cookie 增加值
- 过期时间：设置 Cookie 如果不加过期时间 Expires 中默认是负值，表示关闭浏览器即消失

### max-age

- 最大生存时间：通过 max-age（单位 s）来设置过期时间

```js
document.cookie = "host=192.168.128.1; max-age=30";
```

### expires

- 某一时间点过期：通过 expires 来设置到某一时间点删除 Cookie

```js
var d = new Date(),
  day = d.getDay();

d.setDate(day + 10);
document.cookie = "name=cookie; expires=" + d;
```

### 实验性代码

- [具体代码](../network/03_Cookie.html)

### 单点登录

www.baidu.com
zhidao.baidu.com
处于不同源的系统下，任意一个站点做了登录操作，其他站点都处于登录状态下的这种机制属于**单点登录**。

### 持久化登录

前端通过将用户的 username 与 password 传递到后端时，后端做了哪些事情？
定义一个加盐密码的标识 salt = ming，通过 md5 和加盐方式对数据进行双加密。
username -> md5(md5(username) + salt) -> ident_code 身份识别码
password -> md5(md5(password) + salt)
生成 token 身份令牌，数据格式 32/16 的 A-Za-z0-9 随机字符串，只要每次有登录操作，都会重新生成 token。
cookie 就是用来存储 auth 的数据，auth = ident_code:token。
后端通过调用 setcookie('auth', ident_code:token, 过期时间, 路径信息, 域名) 来存储用户身份的认证信息。
路径信息参数来表示生效的哪一个路径下的页面，通常使用根路径 `'/'` 来作为参数。
域名信息参数指定在哪一个域名下生效。

前端收到 cookie 后已经包含了过期时间，为什么后端还要在数据库中存储一份？
因为客户端的 cookie 存储时效是取自于系统时间，如果服务端与客户端的系统时间不一致，就会出现数据不准确。

设置好 cookie 后，用户下次再次进入页面时，后端拿到 cookie 设置的身份认证信息，通过与数据库中存储的过期时间进行对比，如果没有过期则进入登录状态，过期删除数据库中存储的 cookie 进入未登录状态，需要用户进行重新登录操作。
