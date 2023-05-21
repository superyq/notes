1. http: 最初，浏览器-服务器 传输信息用的（网页，图片，视频等），后来 app-服务器、服务器-服务器 通信、广泛使用 http1.1
   http 是基于 TCP 协议，要通讯必须先建立 TCP 连接
2. json.xml.www-form-urlencoded 格式
3. 2 正常，3 重定向，
   4 客户端错误：400 Bad Request 请求不符合接口要求，格式错误之类，
   401 Unauthorized 需要先认证
   403 Forbidden 没权限
   404 Not Found 请求 url 不存在
   5 服务端错误
