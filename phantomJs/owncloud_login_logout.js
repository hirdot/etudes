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
    console.log('');
    console.log(_this);
    _this.wait(1000);

    data = users.shift();
    args = { user: data[0], password: data[1] };

    // login
    _this.fill('form', args, true);
    _this.waitForSelector('form.searchbox', function() {

        // logout
        _this.click('span#expandDisplayName');
        _this.thenClick('a#logout');
        _this.waitForSelector('form[name=login]', function() {
            loginn(_this, users);
        });
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
