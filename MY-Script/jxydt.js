/*
# 驾照一点通vip
QX1.0.0:
^https:\/\/vipapi\.jxedt\.com\/vip\/check url script-response-body https://raw.githubusercontent.com/zgaoliang520/zijianyong/master/jxydt.js
Surge4.0:
http-response ^https://vipapi.jxedt.com/vip/ requires-body=1,max-size=0,script-path=https://raw.githubusercontent.com/zgaoliang520/zijianyong/master/jxydt.js,script-update-interval=0
MITM = vipapi.jxedt.com
*/

var obj = JSON.parse($response.body);
 obj={
 "data": {
  "is_vip": "1",
  "vip_expired": "4092599349",
  "is_vip_now": true
 },
 "error": false,
 "status": 200
};
$done({body: JSON.stringify(obj)});
//
