var casper = require('casper').create();
var fs = require('fs');
var configs = createArray(fs.read('config.csv'))
var conf = configs.shift();
var url = conf[1];

casper.start(url[1],function(){
    user = config.shift();
    pass = config.shift();
    var args = {user: user[1], password: pass[1]};
    this.fill('form', args, true);

    this.waitForSelector('form.searchbox', function(){

        url = config.shift();
        this.thenOpen(url);

        this.waitForSelector('div.groups div.groupsListContainer', function() {
            this.click('div.groups div.groupsListContainer');
            this.waitForSelector('input[id$=option-advisor]', function() {
                this.click('input[id$=option-advisor]');

                this.fillSelectors('form#newuser', {
                    'input[id=newusername]': 'sh_test',
                    'input[id=newuserpassword]': '111'
                }, true);
            });
        });
    });
});

console.log('casper.run');
casper.run();
