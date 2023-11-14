// #!name=555 电影猎手 去广告
// #!desc=包含开屏、轮播、banner广告屏蔽。增加了升级屏蔽
// #!author=Zephyrcus
// #!icon=
// #!homepage=
// #！updateTime:2023/11/14

// [Mitm]
// hostname =run.api.qyfxgd.cn,a.weilai555.com,a.ecoliving168.com,app-v1.ecoliving168.com

// [URL Rewrite]
// ^https:\/\/.*\/nj_vpic\/\d+\/\d+\/\d+$ - reject-200
// ^https?:\/\/.*\/api\/v\d\/advert\/config\?pack=[a-zA-Z0-9\/%+]*&signature=[a-zA-Z0-9]*$ - reject-200
// ^https?:\/\/.*\/api\/v\d\/app\/check_update\?pack=[a-zA-Z0-9\/%+]*&signature=[a-zA-Z0-9]*$ - reject-200
// ^https?:\/\/vpic\.cms\.qq\.com - reject-200
// ^https?:\/\/hmma\.baidu\.com - reject-200
// ^https?:\/\/bgg\.baidu\.com - reject-200
// # 添加本地规则，url-regex reject-200 或reject drop也可以

// # 对网页 福利 内容进行屏蔽
// ^https://55dy1\.vip/vodtype/1\.html$ https://55dy1.vip/vodtype/1.html 307

// [Script]
// http-response ^https?:\/\/[^/]+\/api\/v\d\/movie\/index_recommend\?pack=[^&]+&signature=.+$ script-path=https://raw.githubusercontent.com/fqw000/tools/main/script/555.js, requires-body=true, binary-body-mode=false, timeout=10, tag=555去广告

var body = $response.body;
var obj = JSON.parse(body);

// 定义需要屏蔽的关键词数组
// const blockedKeywords = ['vpic.cms.qq.com', 'community.image.video.qpic.cn'];

// 屏蔽 layout 值为 advert_self 的项
obj.data = obj.data.filter(item => item.layout !== "advert_self");

// 过滤轮播图中 type 为 3 的项
const carousel = obj.data.find(item => item.title === '轮播图');
if (carousel && carousel.list && carousel.list.length > 0) {
    carousel.list = carousel.list.filter(item => item.type !== 3);
}

// 注释掉过滤 data 数组中含有被屏蔽关键词的元素的操作
// obj.data = obj.data.filter(item => !blockedKeywords.some(keyword => item.image.includes(keyword)));

$done({ body: JSON.stringify(obj) });
