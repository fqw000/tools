var body = $response.body;
let obj = JSON.parse($response.body); obj.data = obj.data.filter(t => "advert_self" !== t.layout), obj.data.forEach(t => { t.list = t.list.filter(t => 3 !== t.type) }), $done({ body: JSON.stringify(obj) });

// var obj = JSON.parse(body);

// // 定义需要屏蔽的关键词数组
// // const blockedKeywords = ['vpic.cms.qq.com', 'community.image.video.qpic.cn'];

// // 屏蔽 layout 值为 advert_self 的项
// obj.data = obj.data.filter(item => item.layout !== "advert_self");

// // 过滤轮播图中 type 为 3 的项
// const carousel = obj.data.find(item => item.title === 'carousel');
// if (carousel && carousel.list && carousel.list.length > 0) {
//     carousel.list = carousel.list.filter(item => item.type !== 3);
// }

// // 注释掉过滤 data 数组中含有被屏蔽关键词的元素的操作
// // obj.data = obj.data.filter(item => !blockedKeywords.some(keyword => item.image.includes(keyword)));

// $done({ body: JSON.stringify(obj) });

