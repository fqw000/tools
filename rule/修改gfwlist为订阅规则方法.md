<!-- 
gfwlist列表规则说明：
！ 开始表示注释
* 通配符，匹配任何字符串
@@ 以此开头表示白名单，
| 以此开始或者结束表示开始处或者结束处严格匹配，没有其他内容了
|| 以此开头会忽略协议规则进行匹配，比如忽略http，https等
^ 分隔符匹配除数字，字母，-，.,%以外的其他字符
$ 指明后面的是过滤类型，比如是是image还是script等 

-->





<!-- 按照顺序替换 -->
正则表达式          替换字符传或【执行操作】
<!-- 注释掉注释和正则表达式 -->
^!!*|^@@*    # >>>

<!-- 调整||http:// 和||https://  域名规则 排除掉ip地址访问的-->
\|https?://(?!((2(5[0-5]|[0-4]\d))|[0-1]?\d{1,2})(\.((2(5[0-5]|[0-4]\d))|[0-1]?\d{1,2})){3})    DOMAIN,

<!-- 调整IP地址规则 -->
\|https?://(?=((2(5[0-5]|[0-4]\d))|[0-1]?\d{1,2})(\.((2(5[0-5]|[0-4]\d))|[0-1]?\d{1,2})){3})    IP-CIDR,

<!-- 删除行开头的/ -->
/$       【留空即删除】

<!-- 调整以.开头的域名后缀规则 -->
^\.     DOMAIN-SUFFIX,

<!-- 调整||开头的域名规则 -->
^\|\|        DOMAIN,

<!-- 调整IP地址开头的IP规则，在其行首加入IP-CIDR， -->
\b^(?=((2(5[0-5]|[0-4]\d))|[0-1]?\d{1,2})(\.((2(5[0-5]|[0-4]\d))|[0-1]?\d{1,2})){3})    IP-CIDR,

<!-- 在域名网址行首添加DOMSIN -->
\b^(?=^(?=^.{3,255}$)[a-zA-Z0-9][-a-zA-Z0-9]{0,62}(\.[a-zA-Z0-9][-a-zA-Z0-9]{0,62})+)

<!-- 非以www开头的域名规则替换为DOMAIN-SUFFIX -->
^DOMAIN,(?!(www))        DOMAIN-SUFFIX,


_____github action workflow___
name: GFWtoLoonRules

on:
  push:
    paths:
      - 'gfw.list'

jobs:
  update_file:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout Repository
        uses: actions/checkout@v2

      - name: Update File
        run: |
          # 读取文件内容
          content=$(<gfw.list)
          
          # sed不支持正则断言，使用perl代替
          #content=$(echo "$content" | sed 's/ssr:/\nssr:/g')
          # 注释掉注释和正则表达式 
          content=$(echo "$content" | perl -pe 's/^!!*|^@@*/# >>>/g')
          # 调整||http:// 和||https://  域名规则 排除掉ip地址访问的
          content=$(echo "$content" | perl -pe 's/\|https?://(?!((2(5[0-5]|[0-4]\d))|[0-1]?\d{1,2})(\.((2(5[0-5]|[0-4]\d))|[0-1]?\d{1,2})){3})/DOMAIN,/g')
          # 调整IP地址规则
          content=$(echo "$content" | perl -pe 's/\|https?://(?=((2(5[0-5]|[0-4]\d))|[0-1]?\d{1,2})(\.((2(5[0-5]|[0-4]\d))|[0-1]?\d{1,2})){3})/IP-CIDR,/g')
          #  删除行开头的/
          content=$(echo "$content" | perl -pe 's//$//g')
          # 调整以.开头的域名后缀规则
          content=$(echo "$content" | perl -pe 's/^\./DOMAIN-SUFFIX,/g')
          # 调整||开头的域名规则
          content=$(echo "$content" | perl -pe 's/^\|\|/DOMAIN,/g')
          # 调整IP地址开头的IP规则，在其行首加入IP-CIDR，
          content=$(echo "$content" | perl -pe 's/\b^(?=((2(5[0-5]|[0-4]\d))|[0-1]?\d{1,2})(\.((2(5[0-5]|[0-4]\d))|[0-1]?\d{1,2})){3})/IP-CIDR,/g')
          # 在域名网址行首添加DOMSIN
          content=$(echo "$content" | perl -pe 's/\b^(?=^(?=^.{3,255}$)[a-zA-Z0-9][-a-zA-Z0-9]{0,62}(\.[a-zA-Z0-9][-a-zA-Z0-9]{0,62})+)/DOMAIN,/g')
          # 非以www开头的域名规则替换为DOMAIN-SUFFIX
          content=$(echo "$content" | perl -pe 's/^DOMAIN,(?!(www))/DOMAIN-SUFFIX,/g')

          

          ^!!*|^@@*    # >>>
          # 编码更新后的文件内容
          encoded_content=$(echo "$content")
          
          # 更新文件
          echo "$encoded_content" > gfw.list
          
          # 提交更新
          git config --local user.email "wang_zi_mo@163.com"
          git config --local user.name "fqw000"
          git commit -m "ss.list" -a
          git push