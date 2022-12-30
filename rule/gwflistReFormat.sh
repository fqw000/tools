#!/bin/bash
echo "开始下载GFWlist"
# macos试用的sed是基于BSD的，和LINUX的不同，这里使用了brew安装gun-sed。

# https://raw.githubusercontent.com/gfwlist/gfwlist/master/gfwlist.txt
# wget http://repo.or.cz/gfwlist.git/blob_plain/HEAD:/gfwlist.txt
echo “下载完成”
# base=$(base64 -d gfwlist.txt >gwflistencode.txt)
echo "解码文件写入成功"
sed -i '' 's/^!!*\|^@@*/# >>>/' gwflistencode.txt
cat gwflistencode.txt
# echo "$base"

 
# sed不支持正则的零宽断言， 弃。