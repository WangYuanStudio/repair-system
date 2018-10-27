# repair-system

报装系统前台 + 后台

### 前端的同学
```bash
npm run dev
```


### 后端的同学

dist文件夹是构建好的静态文件 无特殊情况下

需要保持index.html和其他静态文件的相对路径

进入后台
> /#/admin

不管前台后台 静态文件的base地址都是/

path: /

hash: #/admin

```javascript
>location

{
  hash:"#/admin"
  host:"localhost:8080"
  hostname:"localhost"
  href:"http://localhost:8080/#/admin"
  origin:"http://localhost:8080"
  pathname:"/"
  port:"8080"
  protocol:"http:"
}
```
