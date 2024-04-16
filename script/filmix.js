/*************************************

项目名称：Filmix
更新日期：2024-03-08
脚本作者：chxm1023
电报频道：https://t.me/chxm1023
使用声明：⚠️个人备份，🈲转载与售卖！

**************************************

[rewrite_local]
^https?:\/\/appv2\.filmix\.com\.cn\/api\/v\d\/users.+$ url script-response-body https://raw.githubusercontent.com/chxm1023/Rewrite/main/filmix.js

[mitm]
hostname = appv2.filmix.com.cn

*************************************/

var filmixPro = JSON.parse($response.body);

filmixPro.is_vip = true;
filmixPro.vip_start_time = "2024-01-01T09:09:09+09:00";
filmixPro.vip_end_time = "2099-0-091T09:09:09+09:00";

$done({body : JSON.stringify(filmixPro)});
