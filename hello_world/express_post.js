var express = require('express');
var app = express();
app.use(express.bodyParser());

var postHTML = '<!DOCTYPE html><html lang="en" dir="ltr" class="client-nojs">'+
'<head></head>'+
'<body>'+
'<form method="post">'+
'<input name="name"></input>'+
'<input type="submit">'+
'</form>'+
'</body>'+
'</html>';


app.get('/', function(req, res){
    res.send(postHTML);
});


app.post('/', function(req, res) {

    console.log(JSON.stringify(req.body));

    console.log('req.body.name', req.body['name']);
});

app.listen(3000);
console.log('Listening on port 3000');