var casper = require('casper').create();
var fs = require('fs');
var configs = createArray(fs.read('config.csv'))
var conf = configs.shift();
var url = conf[1];

casper.start(url[1], function() {
    var users = createArray(fs.read('users.csv'));
    console.log('casper.start ');
    loginn(this, users);
});

//
function loginn(_this, users) {
    console.log('loginn');
    console.log(_this);
    _this.wait(1000);

    data = users.shift();
    args = { user: data[0], password: data[1] };
    console.log("user"+data[0]);

    // login
    _this.fill('form', args, true);
    _this.waitForSelector('form.searchbox', function() {
        // upload a picture
        console.log('upload file');
        // _this.page.uploadFile('#file_upload_start', '/var/apps/tmp/pics/011.jpg');
        // _this.fill('form#form_file_uploader', { upd_file : '/var/apps/tmp/pics/011.jpg' }, true);
        _this.page.uploadFile('#upd_file', '/var/apps/tmp/pics/011.jpg');
        console.log('uploaded file');

        _this.waitForSelector('form.searchbox', function() {
            console.log('log out');
            _this.click('span#expandDisplayName');
            _this.thenClick('a#logout');
            console.log('loged out');
        });
        // click ＋ボタン
        // click アップロード

        // logout
        // _this.click('span#expandDisplayName');
        // _this.thenClick('a#logout');
        // _this.waitForSelector('form[name=login]', function() {
        //     loginn(_this, users);
        // });
    });
}

function createArray(buf) {
    var arr = new Array();
    var lines  = buf.split("\n");
    for (var i = 0; i < lines.length;++i) {
        var cells = lines[i].replace("\r","").split(",");
        if( cells.length != 1 ) {
            arr.push(cells);
        }
    }
    return arr;
}

console.log('casper.run');
casper.run();
