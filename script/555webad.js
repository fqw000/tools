# 屏蔽id以"64b110e"开头的元素 
# 测试脚本使用
// [Mitm]
// hostname = www.555dianying.cc

// [Script]
// # 555dianying.cc去广告脚本
// http-response ^https?://www\.555dianying\.cc/ script-path=https://raw.githubusercontent.com/fqw000/tools/main/script/555webad.js, requires-body=true, timeout=10, tag=555web去广告


var blockElements = function(response) {
  var contentType = response.headers["Content-Type"];
  if (contentType && contentType.indexOf("text/html") !== -1) {
    var body = response.body;
    var html = body.toString();
    var doc = new DOMParser().parseFromString(html, "text/html");
    var elements = doc.querySelectorAll('[id^="64b110e"]');
    for (var i = 0; i < elements.length; i++) {
      var element = elements[i];
      element.parentNode.removeChild(element);
    }
    response.body = doc.documentElement.outerHTML;
  }
}

$done({ onResponse: blockElements });
