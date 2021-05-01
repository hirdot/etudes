function send_to_slack(text) {

  let data = {"text":text};
  let payload = JSON.stringify(data);

  let options = {
    "method":"post",
    "contentType":"application/json",
    "payload":payload
  };

  let postUrl = 'https://hooks.slack.com/services/<hoge>/<fuga>/<piyo>';
  UrlFetchApp.fetch(postUrl, options);
}
