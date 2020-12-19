/*

Quantumult X 脚本:

[奥利给直播] unlock （by 浥轻尘）

Download Link : https://ok6.app/

[rewrite_local]

#奥利给直播会员

^https?:\/\/1008610010\.yohui\.vip\/index\.php\/Api\/LiveApi\/getMovietime url script-response-body AoLiGei.js

[mitm]

hostname = 1008610010.yohui.vip,

*/

let obj = JSON.parse($response.body);

obj.data.status = 1;  

$done({body: JSON.stringify(obj)});

