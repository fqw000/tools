// 本地调试json，以检验js的操作
// 注意文件目录，本js和a.json同在d:/
// a.jon为待js操作的json
//b.json为js操作后的json文件内容

// 调用fs读取本地json
const fs = require('fs');
const path = require('path');
// 读取本地的 JSON 文件 ，路径在d盘根目录
const jsonFilePath = 'D:/a.json';
const jsonData = fs.readFileSync(jsonFilePath, 'utf8');
const obj = JSON.parse(jsonData);

// 以下为js执行代码部分，本例为对555影视的广告屏蔽演示：

// 屏蔽 layout 值为 advert_self 的项
// if (obj.data && obj.data.length > 0) {
//     var newData = [];
//     for (var i = 0; i < obj.data.length; i++) {
//         if (obj.data[i].layout !== "advert_self") {
//             newData.push(obj.data[i]);
//         }
//     }
//     obj.data = newData;
// }
// 精简为：
obj.data = obj.data.filter(item => item.layout !== "advert_self");

// 过滤轮播图中 type 为 3 的项
// if (obj.data && obj.data.length > 0) {
//     var carousel = obj.data.find(item => item.title === '轮播图');
//     if (carousel && carousel.list && carousel.list.length > 0) {
//         carousel.list = carousel.list.filter(item => item.type !== 3);
//     }
// }
// 精简为：
const carousel = obj.data.find(item => item.title === '轮播图');
if (carousel && carousel.list && carousel.list.length > 0) {
    carousel.list = carousel.list.filter(item => item.type !== 3);
}

// 执行代码到此结束

// 将修改后的数据转换为 JSON 字符串
const modifiedJson = JSON.stringify(obj, null, 2);

// 在当前目录写入到新的 JSON 文件
const outputFilePath = path.join(__dirname, 'b.json');
fs.writeFileSync(outputFilePath, modifiedJson, 'utf8');

console.log('b.json 文件保存成功');