var http = require('http');
var splitter = require('./splitter.js');
var express = require('express');
 
/*var postHTML =
  '<html><head><title>Post Example</title></head>' +
  '<body>' +
  '<form method="post">' +
  'Your Fist Name: <input name="first_name"><br>' +
  'Your Last Name: <input name="last_name"><br>' +
  '<input type="submit">' +
  '</form>' +
  '</body></html>';*/
 
var postHTML = '<!DOCTYPE html><html lang="en" dir="ltr" class="client-nojs">'+
'<head></head>'+
'<body>'+
'<form method="post">'+
'<input name="name"></input>'+
'<input type="submit">'+
'</form>'+
'</body>'+
'</html>';

http.createServer(function (req, res) {
  var body = "";
  req.on('data', function (chunk) {
    body += chunk;
  });
  req.on('end', function () {
    console.log('POSTed: ' + body);
 
    if (body != '')
    {
        var hash = splitter.formValues(body);
 
         console.log("name= " + hash["first_name"]);
         //console.log("input2 = " + hash["last_name"]);
 
         res.writeHead(200);
         res.write('Hello ' + hash["first_name"]/* + ', ' + hash["last_name"]*/ + '!');
         res.end();
         return;
    }
 
    res.writeHead(200);
    res.end(postHTML);
  });
}).listen(8080);


/*var express = require('express');
var app = express();
app.use(express.bodyParser());

  app.get('/hello.txt', function(req, res){
  var body = 'Hello World';
  res.setHeader('Content-Type', 'text/plain');
  res.setHeader('Content-Length', body.length);
  res.end(body);
});



app.get('/', function(req, res){
    console.log("GET: " + JSON.stringify(req.body));
    res.send('Hello World');
});


app.post('/', function(req, res) {

    console.log(JSON.stringify(req.body));

    console.log('req.body.name', req.body['name']);
});

app.listen(3000);
console.log('Listening on port 3000');
*/








/*
// example using express.js:
var express = require('express')
, app = express().use(express.bodyParser());
app.use(express.bodyParser());
app.post('/', function(req, res){
    console.log("boom");
  var email = req.param('name', null);  // second parameter is default
});
app.listen(80);*/