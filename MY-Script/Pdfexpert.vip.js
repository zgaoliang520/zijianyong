/*
# Documents和PDFExpert
QX1.0.0:
^https:\/\/license\.pdfexpert\.com\/api\/1\.0\/pdfexpert6\/subscription\/(refresh$|check$) url script-response-body https://raw.githubusercontent.com/zgaoliang520/zijianyong/master/Pdfexpert.vip.js
Surge4.0:
http-response ^https:\/\/license\.pdfexpert\.com\/api\/.*\/(documents|pdfexpert6)\/subscription\/(refresh$|check$) requires-body=1,max-size=0,script-path=https://raw.githubusercontent.com/zgaoliang520/zijianyong/master/Documents&PDFExpert.sub.js
MITM = license.pdfexpert.com
*/

var obj= {
  "originalTransactionId": "20000618444996",
  "subscriptionState": "trial",
  "isInGracePeriod": false,
  "subscriptionExpirationDate": "13:15 03/11/2099",
  "subscriptionAutoRenewStatus": "autoRenewOn",
  "isEligibleForIntroPeriod": false,
  "isPDFExpert6User": false,
  "subscriptionReceiptId": "1572178404000"
};

$done({body: JSON.stringify(obj)});

//
© 2019 GitHub, Inc.
