var body = $response.body;
var obj = JSON.parse(body);
if (obj.data && obj.data.length > 0) {
    var carousel = obj.data.find(item => item.title === '轮播图');
    if (carousel && carousel.list && carousel.list.length > 0) {
        carousel.list = carousel.list.filter(item => item.type !== 3);
    }
}
$done({body: JSON.stringify(obj)});
