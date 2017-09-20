var express = require('express');
var pagarme = require('pagarme');
var bodyParser = require('body-parser');

var app = express();

var amount;
var print;
var token;
var trx;

app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', function(req, res) {
    res.sendFile(__dirname + '/index.html');
});

app.post('/comprar', function(req, res) { 

    if (req.body.token) {
        token = req.body.token;

        console.log('*********** TOKEN: ' + token);

        print = '<h3>Token: ' + token + '</h3>\n';

    } 
    
    if (req.body.pagarme) {

        trx = req.body.pagarme;

        console.log('*********** CARD_HASH: ' + typeof trx);

        print = '<h3>Card_hash: ' + req.body.pagarme.card_hash + '</3>';

        pagarme.client
            .connect({api_key: 'ak_test_mvofz5xg6lezCy0HrZVHE2stg6oudU'})
            .then(client => client.transactions.create(trx))
            .catch(error => error.response.errors.map(console.log));
    }

    res.send(print);

});

app.post('/capture', function(req, res){
    
    console.log('*********** CAPTURA, token: ' + token + ' amount: ' + req.body.transaction.amount);
    
    pagarme.client
        .connect({ api_key: 'ak_test_mvofz5xg6lezCy0HrZVHE2stg6oudU' })
        .then(client => client.transactions.capture({ id: token, amount: req.body.transaction.amount }))
        .catch(error => error.response.errors.map(console.log));

});

app.listen(80, function(){console.log('\n*********** SERVER RUNNING ***********\n');});