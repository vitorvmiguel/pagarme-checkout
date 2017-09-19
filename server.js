var express = require('express');
var pagarme = require('pagarme');
var bodyParser = require('body-parser');

var app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json())

app.get('/', function(req, res) {
    res.sendfile(__dirname + '/index.html');
});

app.post('/capture', function(req, res){

    var amount = req.body.transaction.amount;
    var token = req.body.transaction.id;

    console.log('amount: ' + amount + ' id: ' + token);
    
    pagarme.client.connect({ api_key: 'ak_test_mvofz5xg6lezCy0HrZVHE2stg6oudU' })
    .then(client => client.transactions.capture({ id: token, amount: amount }));

    res.send('ok');
});

app.listen(80, function(){console.log('server running');});