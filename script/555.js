/*
var body = $response.body;
var obj = JSON.parse(body);

// 屏蔽layout值为advert_self的项
if (obj.data && obj.data.length > 0) {
  var newData = [];
  for (var i = 0; i < obj.data.length; i++) {
    if (obj.data[i].layout !== "advert_self") {
      newData.push(obj.data[i]);
    }
  }
  obj.data = newData;
}

// 过滤轮播图中type为3的项
if (obj.data && obj.data.length > 0) {
  var carousel = obj.data.find(item => item.title === '轮播图');
  if (carousel && carousel.list && carousel.list.length > 0) {
    carousel.list = carousel.list.filter(item => item.type !== 3);
  }
}

$done({body: JSON.stringify(obj)});
*/


var body = $response.body;
var obj = JSON.parse(body);

// [mitim] 
hostname =a.weilai555.com,www.555zxdy.com
// 屏蔽 href 值为 "vod/type/id/38.html" 的上一级 div 元素内容，屏蔽网页 18+ 内容  
if (obj.data && obj.data.length > 0) {
  obj.data = obj.data.filter(item => {
    if (item.layout === "advert_self") {
      return false;
    }
    if (item.list && item.list.length > 0) {
      item.list = item.list.filter(i => i.href !== "vod/type/id/38.html");
    }
    return true;
  });
}

// 过滤特定条件的数据项
if (obj.data && obj.data.length > 0) {
  obj.data = obj.data.filter(item => {
    // 过滤轮播图中type为3的项
    if (item.title === '轮播图' && item.list && item.list.length > 0) {
      item.list = item.list.filter(i => i.type !== 3);
    }
    // 过滤其他特定条件的数据项
    // ...
    return true;
  });
}

$done({body: JSON.stringify(obj)});
