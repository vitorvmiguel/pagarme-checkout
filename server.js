var express = require('express');
var pagarme = require('pagarme');
var bodyParser = require('body-parser');

var app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json())

app.get('/', function(req, res) {
    res.sendfile(__dirname + '/index.html');
});

app.post('/capture', function(req, res){

    console.log(req.body);
    
    pagarme.client.connect({ api_key: 'ak_test_mvofz5xg6lezCy0HrZVHE2stg6oudU' })
    .then(client => client.transactions.capture({ id: token, amount: amount }));

    res.send('ok');
});

app.listen(80, function(){});