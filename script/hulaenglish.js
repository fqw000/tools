/*******************************

脚本功能：呼啦少儿英语——解锁VIP
软件版本：1.23.0
脚本作者：彭于晏💞
更新时间：2024-10—8
使用声明：此脚本仅供学习与交流，请勿转载与贩卖！⚠️⚠️⚠️

*******************************

[rewrite_local]

^http[s]?:\/\/apiv2.hula123.com\/api\/v1\/me url script-response-body https://raw.githubusercontent.com/fqw000/tools/main/script/hulaenglish.js

[mitm] 

hostname = apiv2.hula123.com

*******************************/

var body = $response.body.replace(/is_vip":\w+/g,'is_vip":true')
.replace(/is_free_vip":\w+/g,'is_free_vip":true')
.replace(/nick_name":".*?"/g,'nick_name":"付费用户"')
.replace(/show_free_vip_dialog":\w+/g,'show_free_vip_dialog":true')
$done({ body });
