/*
克拉壁纸解锁付费壁纸
Surge4：
http-response ^https:\/\/claritywallpaper\.com\/clarity\/api\/(userInfo|special\/queryByCatalogAll) requires-body=1,script-path=https://raw.githubusercontent.com/ddgksf2013/Cuttlefish/master/Crack/clarity.js,tag=克拉
QX：
^https:\/\/claritywallpaper\.com\/clarity\/api\/(userInfo|special\/queryByCatalogAll) url script-response-body clarity.js
Surge & QX MITM = claritywallpaper.com
*/
var body = $response.body;
var url = $request.url;
var obj = JSON.parse(body);

const userinfo = '/userInfo';
const setfree = '/special/queryByCatalogAll';

if (url.indexOf(setfree) != -1) {
   for (var i = 0; i < obj.data.length; i++) {
       obj.data[i].isFree = true;
       obj.data[i].random = "Kqp5/Z35ga5WBeNcLue+dBwZW4ZWRoDFMAqqU48d06Y=";
   }
   body = JSON.stringify(obj);
}
if (url.indexOf(userinfo) != -1) {
   obj.data.level = 5;
   obj.data.expireTime = 4070965662;
   body = JSON.stringify(obj);
}
$done({body});
