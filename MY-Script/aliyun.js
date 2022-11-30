/*

* ==UserScript==
* @ScriptName        FileBall挂载阿里云盘、Alist
* @Author            @Changes,@Cuttlefish
* @TgChannel         https://t.me/ddgksf2021
* @Contribute        https://t.me/ddgksf2013_bot
* @Feedback          📮 ddgksf2013@163.com 📮
* @WechatID          墨鱼手记
* @UpdateTime        2022-09-13
* @ScriptFunction    FileBall挂载阿里云盘、Alist，播放云盘中的音乐和视频文件
* @Attention         如需引用请注明出处，谢谢合作！
* @Version           v0.0.10
* @Suit              脚本已使用Env做了兼容处理，理论适配多个工具，请自行测试
* @ScriptURL         https://github.com/ddgksf2013/Cuttlefish/raw/master/Script/ali.js
* ==/UserScript==

# Surge
 
[Script]
阿里云盘 = type=http-request,pattern=^https?:\/\/.*\.example\.com,requires-body=1,max-size=0,timeout=10,script-path=https://raw.githubusercontent.com/githubdulong/Script/master/ali.js

[MITM]
hostname = *example.com


FileBall操作步骤:
*************************************
第一步：圈X 添加重写
1.1 类型选 script-analyze-echo-response
1.2 URL to match 填 ^http://aliyun\.example\.com
1.3 Script 填 aliyun.js

第二步：下载aliyun.js
下载aliyun.js后，保存到圈X的文件夹下（系统文件应用- Quantumult X - Scripts）

第三步：添加Synology协议
地址填 aliyun.example.com
用户名填 abc
密码填 refresh_token（需要用阿里云盘扫描alist的二维码获得）
https://alist-doc.nn.ci/docs/driver/aliyundrive

第四步：连接 & Enjoy


*************************************
*/

var url = $request.url;
//console.log(url);
var accessToken = $prefs.valueForKey('ali_access_token') ?? '';
var driveId = $prefs.valueForKey('ali_drive_id') ?? '';

var headers = {
    'Referer': 'https://www.aliyundrive.com/',
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/87.0.4280.88 Safari/537.36',
    'Content-Type': 'application/json'
};
var myResponse = {
    status: 'HTTP/1.1 200 OK',
};
var obj = {};

function hex2str(hex) {
    var trimedStr = hex.trim();
    var rawStr = trimedStr.substr(0, 2).toLowerCase() === "0x" ? trimedStr.substr(2) : trimedStr;
    var len = rawStr.length;
    if (len % 2 !== 0) {
        return "";
    }
    var curCharCode;
    var resultStr = [];
    for (var i = 0; i < len; i = i + 2) {
        curCharCode = parseInt(rawStr.substr(i, 2), 16);
        resultStr.push(String.fromCharCode(curCharCode));
    }
    return resultStr.join("");
}

if (url.indexOf('/webapi/auth.cgi') != -1) {
    // 登录接口，替换为刷新refresh token
    const body = $request.body;
    const password = body.match(/passwd=([^&]*)/)[1];
    const refreshToken = $prefs.valueForKey('ali_refresh_token') ?? password;
    const data = {
        refresh_token: refreshToken,
        grant_type: 'refresh_token'
    };
    const req = {
        url: 'https://auth.aliyundrive.com/v2/account/token',
        method: 'POST',
        headers: headers,
        body: JSON.stringify(data)
    };
    $task.fetch(req).then(res => {
        const json = JSON.parse(res.body);
        if (json.refresh_token && json.access_token && json.default_drive_id) {
            $prefs.setValueForKey(json.refresh_token, 'ali_refresh_token');
            $prefs.setValueForKey(json.access_token, 'ali_access_token');
            $prefs.setValueForKey(json.default_drive_id, 'ali_drive_id');
            obj = {
                success: true,
                data: {
                    sid: json.access_token
                }
            };
            myResponse.body = JSON.stringify(obj);
            $done(myResponse);
        } else {
            $done();
        }
    });
} else if (url.indexOf('/webapi/entry.cgi') != -1) {
    const body = $request.body;
    if (typeof(body) === 'string') {
        // 当前的请求为加载目录
        if (body.indexOf('list_share') != -1 || body.indexOf('method=list') != -1) {
            headers.authorization = 'Bearer ' + accessToken;
            const parentId = body.match(/folder_path=([^&]*)/) === null ? "root" : body.match(/folder_path=([^&]*)/)[1];
            var isRootFolder = parentId === "root";
            const data = {
                drive_id: driveId,
                fields: '*',
                parent_file_id: parentId,
                limit: 200
            };
            const req = {
                url: 'https://api.aliyundrive.com/v2/file/list',
                method: 'POST',
                headers: headers,
                body: JSON.stringify(data)
            };
            $task.fetch(req).then(res => {
                const items = JSON.parse(res.body).items;
                var files = [];
                items.forEach(function(item) {
                    const file = {
                        isdir: item.type === 'folder',
                        path: item.file_id,
                        name: item.name,
                        additional: {
                            size: item.size
                        }
                    };
                    files.push(file);
                });
                const result = isRootFolder ? {
                    total: 0,
                    offset: 0,
                    shares: files
                } : {
                    total: 0,
                    offset: 0,
                    files: files
                };
                obj = {
                    success: true,
                    data: result
                };
                myResponse.body = JSON.stringify(obj);
                $done(myResponse);
            });
        }
    } else {
        $done();
    }
} else if (url.indexOf('fbdownload') != -1) {
    const hex = url.match(/dlink=%22(.*)%22/)[1];
    const fileid = hex2str(hex);
    const body = {
        drive_id: driveId,
        expire_sec: 14400,
        file_id: fileid
    };
    headers.authorization = 'Bearer ' + accessToken;
    const req = {
        url: 'https://api.aliyundrive.com/v2/file/get_download_url',
        method: 'POST',
        headers: headers,
        body: JSON.stringify(body)
    };
    $task.fetch(req).then(res => {
        const link = JSON.parse(res.body).url;
        $done({
            status: "HTTP/1.1 302 Found",
            headers: {
                "Location": link
            }
        });
    });
}
