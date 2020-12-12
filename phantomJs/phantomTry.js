var page = require('webpage').create();
var fs = require('fs');
var configs = createArray(fs.read('config.csv'))
var conf = configs.shift();
var url = conf[1];

page.open(url, function(status) {
 console.log("Status:" + status); 
 page.render('owncloud.png');
 phantom.exit();
});
