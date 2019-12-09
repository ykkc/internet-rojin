
var SLACK_INCOMMING_WEBHOOK_URL = '';

function doPost(e) {
  var message = "";
  if (e.parameter. text === "") {
    return ContentService.createTextOutput("メッセージが入力されていません。「/2ch てすと」のような形での入力をお願いします。").setMimeType(ContentService.MimeType.JSON);
  } else {
    message = e.parameter.text;
    notifyToSlack(message);
    return ContentService.createTextOutput("").setMimeType(ContentService.MimeType.JSON);
  }
}

function countUp() {
  var postCount = PropertiesService.getScriptProperties().getProperty('POST_COUNT');
  postCount++;
  PropertiesService.getScriptProperties().setProperty("POST_COUNT", postCount);
  return postCount;
}

function notifyToSlack(message) {
  var count = countUp();
  var today = new Date();
  var name = count + " : 以下、VIPがお送りします : " + Utilities.formatDate(today, 'Asia/Tokyo', 'yyyy/MM/dd HH:mm:ss') + " ID:xxxxxxxx"
  
  var jsonData =
  {
     "username" : name,
     "text" : message
  };
  
  var payload = JSON.stringify(jsonData);

  var options =
  {
    "method" : "post",
    "contentType" : "application/json",
    "payload" : payload
  };
  
  UrlFetchApp.fetch(SLACK_INCOMMING_WEBHOOK_URL, options);
}
