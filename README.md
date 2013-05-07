Micro.blog
==========

Micro blog. Created using Node.js ( http://nodejs.org ) and Mongodb ( http://www.mongodb.org ).

**Dependent modules:**

```javascript
require('mongoskin'),
require('connect'),
require('fs'),
require('url'),
require('querystring'),
require('ejs');
```

**MongoDB config:**

* 修改 /config.js 27 行
* DB_UserName: 用户名
* DB_Password: 密码
* DB_Host:port: 主机(域名/IP):端口号
* DB_Name: 数据库名

**Login authentication:**

* 修改 /config.js 20 - 23 行
* account: 登录用户名
* password: 登录密码
