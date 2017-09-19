var express = require('express');
var pagarme = require('pagarme');
var bodyParser = require('body-parser');

var app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json())

app.get('/', function(req, res) {
    res.sendfile(__dirname + '/index.html');
});

app.post('/comprar', function(req, res) {
    console.log('/comprar ' + JSON.stringty(req.body));
});

app.post('/capture', function(req, res){

    var amount = req.body.transaction.amount;
    var token = req.body.transaction.id;

    console.log('\n amount: ' + amount + ' id: ' + token);
    
    pagarme.client
        .connect({ api_key: 'ak_test_mvofz5xg6lezCy0HrZVHE2stg6oudU' })
        .then(client => client.transactions.capture({ id: token, amount: amount }))
        .catch(error => console.error(error));
});

app.listen(80, function(){console.log('server running');});