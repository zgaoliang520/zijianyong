/******************************

[rewrite_local]

^https:\/\/mbpapi\.shegu\.net\/api\/api_client url script-response-body moviebox.js

[mitm] 

hostname = mbpapi.shegu.net

******************************/

var body = $response.body;

var url = $request.url;

var obj = JSON.parse(body);

const vip = '/index';

if (url.indexOf(vip) != -1) {

    obj.data.dead_time = 2027383523;

obj.data.isvip = 1;

    body = JSON.stringify(obj);

}

$done({body});

