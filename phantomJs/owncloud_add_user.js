var casper = require('casper').create();
var fs = require('fs');
var configs = createArray(fs.read('config.csv'))
var conf = configs.shift();
var url = conf[1];

casper.start(url[1],function(){
    user = config.shift();
    pass = config.shift();
    var args = {user: user[1], password: pass[1]};
    this.fill('form', args, true); // login

    url = config.shift();
    this.waitForSelector('form.searchbox', function(){
        this.thenOpen(url);
        console.log('open ');

        var users = createArray(fs.read('users.csv'));
        addUser(this, users);
    });
});

function addUser(_this, list) {
    if (list.length == 0) return;

    console.log(_this);
    _this.wait(1000);

    data = list.shift();
    user = data[0],  pass = data[1];
    _this.waitForSelector('div.groups div.groupsListContainer', function() {
        console.log('waited groupsListContainer');
        _this.click('div.groups div.groupsListContainer');
        console.log('clicked groupsListContainer');

        _this.waitForSelector('input[id$=option-advisor]', function() {
            console.log('waited option-advisor');
            _this.click('input[id$=option-advisor]');
            console.log('clicked option-advisor');

            _this.fillSelectors('form#newuser', {
                'input[id=newusername]': user,
                'input[id=newuserpassword]': pass
            }, true);
            console.log('casper.submit!!');
            console.log('');

            addUser(_this, list);
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
