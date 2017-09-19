var express = require('express');
var pagarme = require('pagarme');
var app = express();

app.get('/', function(req, res) {
    res.sendfile(__dirname + '/index.html');
});

app.post('/capture', function(req, res){
    var amount = req.body.amount;
    var token = req.body.token;
    console.log('amount: ' + amount + ' token: ' + token);
    
    pagarme.client.connect({ api_key: 'ak_test_mvofz5xg6lezCy0HrZVHE2stg6oudU' })
    .then(client => client.transactions.capture({ id: token, amount: amount }));

    res.send('ok');
});

app.listen(80, function(){});