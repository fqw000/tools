// 屏蔽id以"64b110e"开头的元素 
// 测试脚本使用
// [Mitm]
// hostname = www.555dianying.cc

// [Script]
// # 555dianying.cc去广告脚本
// http-response ^https?://www\.555dianying\.cc/ script-path=https://raw.githubusercontent.com/fqw000/tools/main/script/555webad.js, requires-body=true, timeout=10, tag=555web去广告

    let body = $response.body;
    let html = new TextDecoder().decode(body);
    let parser = new DOMParser();
    let doc = parser.parseFromString(html, 'text/html');
  
    // 获取所有class为"links"的A标签，并隐藏目标链接
    var hideLinks = function() {
      const links = doc.querySelectorAll('a.links');
      links.forEach(link => {
        if (link.getAttribute('href') === 'https://www.555hd4.com/vodtype/124.html') {
          link.style.display = 'none';
        }
      });
    }
  
    // 屏蔽class值为"is_pc"和"is_mb"的div元素
    var blockElements = function() {
      var elements = doc.querySelectorAll('div.is_pc, div.is_mb');
      for (var i = 0; i < elements.length; i++) {
        var element = elements[i];
        element.parentNode.removeChild(element);
      }
    }
  
    // 屏蔽包含有午夜福利字样的li元素
    var blockLiElements = function() {
      var liElements = doc.querySelectorAll('li.swiper-slide.navbar-item');
      for (var i = 0; i < liElements.length; i++) {
        var liElement = liElements[i];
        var spanElement = liElement.querySelector('span');
        if (spanElement && spanElement.innerText === '午夜福利') {
          liElement.parentNode.removeChild(liElement);
        }
      }
    }
    
    // 执行脚本
    hideLinks();
    blockElements();
    blockLiElements();
  
    // 转换回字符串并返回修改后的响应内容
    body = new TextEncoder().encode(doc.documentElement.outerHTML);
    $done({body});
