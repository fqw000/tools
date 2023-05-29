<h1># > 路过请绕行，谢绝Fork！</h1>
<h2 >Do Not Fork </h2>
<blockquote><em><br/> 此Repo仅供本人测试使用，谢绝引用！</em></br></br></blockquote>



### lemon的一些说明

- 通过提取客户端v2rayNG的订阅链接保存到lemon.site
- 触发extract-lemon-list.yml
   - 每3个小时更新一次  
   - 读取lemon.site内的订阅链接网址对应的内容
   - 将网址内容同步至lemon.sub，解决v2ray订阅
   - 对lemon.sub进行解码同步至lemon.list，解决loon订阅
   - 修改lemon.site读取的链接网址为客户端提供的Clash的订阅网址，并读取clash订阅到lemon.yaml
   - 提取clash订阅内的proxies内容到lemonnode.yaml
   - 使用lemonlite.yaml保存clash订阅内的proxies内容，并与lemonbanner.yaml合并到lemonliste.yaml形成一个完整的自定义订阅内容
   - 注：lemonbanner.yaml内容为代理集和规则集合。
   - 
