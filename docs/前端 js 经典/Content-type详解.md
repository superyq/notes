# Content-type 详解

1. 什么是 Content-Type

Content-Type 是 HTTP 协议中的一个请求头或响应头字段，用于指示发送或接收的实体的媒体类型，告诉服务器或客户端如何解析和处理请求或响应的主体部分。

2. Content-Type 的构成

Content-Type 由两部分组成：媒体类型/字符集。

媒体类型：指示了主体部分的数据类型，常见媒体类型有 text/plain、text/html、application/json。

字符集：指示了主体部分所使用的字符编码方式，常见的字符集有 UTF-8、ISO-8859-1 等。

例如：Content-Type = application/json;charset=utf-8

3. 常用 Content-type 类型

3.1 application/x-www-form-urlencoded

HTTP 会将请求参数用 key1=val1&key2=val2 的方式拼接，并放到请求实体里面，不支持文件，一般用于表单提交。

<img src="../../images/Content-type 详解/1.jpg"/>

3.2 multipart/form-data

生成边界来分割字段，支持文件上传的格式。

<img src="../../images/Content-type 详解/2.jpg"/>

3.3 application/json

JSON 是一种轻量级的数据格式，以“键-值”对的方式组织的数据。需要参数本身就是 json 格式的数据。

<img src="../../images/Content-type 详解/3.jpg"/>

4. 其他 Content-type 类型

text/plain：纯文本格式；
text/html：HTML 格式；
text/css：Cascading Style Sheets；
text/javascript：JavaScript 代码；
application/xml：XML 格式数据；
application/octet-stream：二进制流数据；
image/jpeg：JPEG 格式图片；
image/gif：GIF 格式图片；
image/png：PNG 格式图片；
audio/mpeg：MP3 格式音频；
video/mp4：MP4 格式视频；
