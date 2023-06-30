*/
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

if (obj.data && obj.data.length > 0) {
  var newData = [];
  var carousel = obj.data.find(item => item.title === '轮播图');
  for (var i = 0; i < obj.data.length; i++) {
    if (obj.data[i].layout !== "advert_self") {
      newData.push(obj.data[i]);
    }
  }
  if (carousel && carousel.list && carousel.list.length > 0) {
    carousel.list = carousel.list.filter(item => item.type !== 3);
  }
  obj.data = newData;
}
