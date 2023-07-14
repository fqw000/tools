// 屏蔽id以"64b110e"开头的元素 
// 测试脚本使用
// [Mitm]
// hostname = www.555dianying.cc

// [Script]
// # 555dianying.cc去广告脚本
// http-response ^https?://www\.555dianying\.cc/ script-path=https://raw.githubusercontent.com/fqw000/tools/main/script/555webad.js, requires-body=true, timeout=10, tag=555web去广告


// 屏蔽555电影网广告和某个链接
const modifyResponse = (body) => {
  // 将响应体解析为JSON对象
  const obj = JSON.parse(body);

  // 屏蔽id以"64b110e"开头的div元素
  if (obj.data && obj.data.length > 0) {
    obj.data = obj.data.filter(item => {
      return item.id && !item.id.startsWith('64b110e');
    });
  }

  // 隐藏特定链接
  const links = obj.links || [];
  links.forEach(link => {
    if (link.url === 'https://www.555hd4.com/vodtype/124.html') {
      link.display = false;
    }
  });

  // 将修改后的JSON对象序列化为字符串并返回
  return JSON.stringify(obj);
};

$done({ body: modifyResponse($response.body) });
