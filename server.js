var express = require('express');
var pagarme = require('pagarme');
var bodyParser = require('body-parser');

var app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json())

app.get('/', function(req, res) {
    res.sendFile(__dirname + '/index.html');
});

app.post('/comprar', function(req, res) { 

    var transaction = req.body.pagarme;

    res.send(   '<h3>Token: ' + req.body.token + '</h3>\n' + 
                '<h3>Card_hash: ' + req.body.pagarme.card_hash + '</3>');

    console.log('/comprar ' + JSON.stringify(req.body));

    pagarme.client
    .connect({api_key: 'ak_test_mvofz5xg6lezCy0HrZVHE2stg6oudU'})
    .then(client => client.transactions.create({transaction}))
    .catch(error => console.log(error));
});

app.post('/capture', function(req, res){

    var amount = req.body.transaction.amount;
    var token = req.body.transaction.id;
    
    pagarme.client
        .connect({ api_key: 'ak_test_mvofz5xg6lezCy0HrZVHE2stg6oudU' })
        .then(client => client.transactions.capture({ id: token, amount: amount }))
        .catch(error => console.error(error));
});

app.listen(80, function(){console.log('server running');});