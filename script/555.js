// #!name=555 电影猎手 去广告
// #!desc=包含开屏、轮播、banner广告屏蔽。增加了升级屏蔽
// #!author=wangqifei
// #!icon=
// #!homepage=
// #！updateTime；2023/7/8

// [Mitm]
// hostname =run.api.qyfxgd.cn,a.weilai555.com,a.ecoliving168.com,app-v1.ecoliving168.com

// [URL Rewrite]
// ^https:\/\/.*\/nj_vpic\/\d+\/\d+\/\d+$ reject-dict
// ^https?:\/\/.*\/api\/v\d\/advert\/config\?pack=[a-zA-Z0-9\/%+]*&signature=[a-zA-Z0-9]*$ reject-dict
// ^https?:\/\/.*\/api\/v\d\/app\/check_update\?pack=[a-zA-Z0-9\/%+]*&signature=[a-zA-Z0-9]*$ reject-dict
// ^https?:\/\/vpic\.cms\.qq\.com reject-200
// ^https?:\/\/hmma\.baidu\.com reject-200
// ^https?:\/\/bgg\.baidu\.com reject-200
// # 添加本地规则，url-regex reject-200 或reject drop也可以

// # 对网页 福利 内容进行屏蔽
// ^https://55dy1\.vip/vodtype/1\.html$ https://55dy1.vip/vodtype/1.html 307

// [Script]
// http-response ^https?:\/\/[^/]+\/api\/v\d\/movie\/index_recommend\?pack=[^&]+&signature=.+$
script-path=https://raw.githubusercontent.com/fqw000/tools/main/script/555.js, requires-body=true, binary-body-mode=false, timeout=10, tag=555去广告

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


// 过滤轮播图中type为3的项
if (obj.data && obj.data.length > 0) {
  var carousel = obj.data.find(item => item.title === '轮播图');
  if (carousel && carousel.list && carousel.list.length > 0) {
    carousel.list = carousel.list.filter(item => item.type !== 3);
  }
}

// 定义需要屏蔽的关键词数组
const blockedKeywords = ['vpic.cms.qq.com', 'community.image.video.qpic.cn'];

// 过滤data数组中含有被屏蔽关键词的元素
if (obj.data && obj.data.length > 0) {
  obj.data = obj.data.filter(item => !blockedKeywords.some(keyword => item.image.includes(keyword)));
}

$done({body: JSON.stringify(obj)});
