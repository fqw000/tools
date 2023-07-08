
const targetLink = 'https://www.555hd4.com/vodtype/124.html';

$done({
  body: $response.body.replace(new RegExp(`<a class="links" href="${targetLink}"></a>`, 'g'), '')
});

//  油猴脚本实现对 https://55dy1.vip/vodtype/1.html 网页 福利 18+ 的屏蔽
// // ==UserScript==
// // @name         555影视 福利 屏蔽
// // @namespace    
// // @version      1
// // @description  Hide links with specific href attribute value on a certain webpage.
// // @match        https://55dy1.vip/vodtype/1.html
// // @grant        none
// // ==/UserScript==

// (function() {
//   'use strict';

//   // 获取所有class为"links"的A标签
//   const links = document.querySelectorAll('a.links');

//   // 遍历链接，找到目标链接并隐藏
//   links.forEach(link => {
//     if (link.getAttribute('href') === 'https://www.555hd4.com/vodtype/124.html') {
//       link.style.display = 'none';
//     }
//   });
// })();
