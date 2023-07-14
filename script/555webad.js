let body = $response.body;
let html = String.fromCharCode.apply(null, new Uint8Array(body));

// 创建一个空白的 DOM 对象
let newDoc = document.implementation.createHTMLDocument();

// 将 HTML 字符串插入到新的 DOM 对象中
newDoc.documentElement.innerHTML = html;

// 获取所有class为"links"的A标签，并隐藏目标链接
var hideLinks = function() {
  const links = newDoc.querySelectorAll('a.links');
  links.forEach(link => {
    if (link.getAttribute('href') === 'https://www.555hd4.com/vodtype/124.html') {
      link.style.display = 'none';
    }
  });
}

// 屏蔽class值为"is_pc"和"is_mb"的div元素
var blockElements = function() {
  var elements = newDoc.querySelectorAll('div.is_pc, div.is_mb');
  for (var i = 0; i < elements.length; i++) {
    var element = elements[i];
    element.parentNode.removeChild(element);
  }
}

// 屏蔽包含有午夜福利字样的li元素
var blockLiElements = function() {
  var liElements = newDoc.querySelectorAll('li.swiper-slide.navbar-item');
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

// 获取修改后的 HTML 字符串并转换回字节数组
let newHtml = newDoc.documentElement.outerHTML;
let bytes = new Array(newHtml.length);
for (let i = 0; i < newHtml.length; i++) {
  bytes[i] = newHtml.charCodeAt(i);
}

// 返回修改后的响应内容
$done({body: new Uint8Array(bytes)});
