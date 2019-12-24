/*
#人人视频解锁原画
QX1.0.0:
^https:\/\/api\.rr\.tv(\/user\/privilege\/list|\/ad\/getAll) url script-response-body https://raw.githubusercontent.com/zgaoliang520/zijianyong/master/rrtv.js
Surge4.0:
http-response ^https:\/\/api\.rr\.tv(\/user\/privilege\/list|\/ad\/getAll) requires-body=1,max-size=0,script-path=https://raw.githubusercontent.com/zgaoliang520/zijianyong/master/rrtv.js
MITM = api.rr.tv
*/

var body = $response.body;
var url = $request.url;

if (url.indexOf('/ad/getAll') != -1) {
    var obj = JSON.parse(body);
    obj.data.adList = [];
    body = JSON.stringify(obj);
} else if (url.indexOf('/user/privilege/list') != -1) {
    var obj = JSON.parse(body);
    obj.data = [{"action":"play","effectObject":"video","id":1,"function":"originalPainting","func":"originalPainting","endTime":1667341767582,"description":"解锁原画","icon":"jiesuoyuanhua"},{"action":"play","effectObject":"video","id":4,"function":"noLimit","func":"noLimit","endTime":1567341767582,"description":"看剧无限制","icon":"kanjuwuxianzhi"},{"action":"play","effectObject":"growth","id":37,"function":"0.4","func":"0.4","endTime":1667341767582,"description":"看剧经验+40%","icon":"jingyanzhijiacheng"},{"action":"send","effectObject":"danmu","id":43,"function":"superBarrageBlue","func":"superBarrageBlue","endTime":1667341767582,"description":"超级弹幕","icon":"chaojidanmu"},{"action":"play","effectObject":"video","id":23,"function":"noAd","func":"noAd","endTime":1667341767582,"description":"看剧无广告","icon":"kanjuwuguanggao"}];
    
}
body = JSON.stringify(obj);
$done({body});
