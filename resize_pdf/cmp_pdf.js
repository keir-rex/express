var express = require('express');
var fs = require('fs');
var app = express();
app.use(express.bodyParser());

var postHTML = '<!DOCTYPE html><html lang="en" dir="ltr" class="client-nojs">'+
'<head></head>'+
'<body>'+
'<form method="post" enctype="multipart/form-data">'+
'<label for="fileToUpload">Select a File to Upload</label><br />' +
'<input type="file" name="fileToUpload" id="fileToUpload" onchange="fileSelected();"/>' +
'<input type="submit">'+
'</form>'+
'</body>'+
'</html>';

app.get('/', function(req, res){
    res.send(postHTML);
});


app.post('/', function(req, res) {

    //move file around
   // fs.readFile(req.files.fileToUpload.path, function (err, data) 
   // {
//	var newPath = "./tmp/" + req.files.fileToUpload.name;
//	fs.writeFile(newPath, data, function (err) 
//	{
	    
	    //child process
	    var exec = require('child_process').exec;	    
	    exec("convert -density 300 -resize 2048x2048 -alpha off -transparent white -quality 85 " + req.files.fileToUpload.path + "[0] ./tmp/destination_%d.jpg", function(err, stdout, stderr) 
		 {
		     
		     if (err) 
		     {
			 console.log('child process exited with error code ' + err.stack);
			 return;
		     }
		     console.log("done");
		     res.writeHead(200, {'Content-Type': 'image/jpeg'});
		     fs.createReadStream('./tmp/destination_0.jpg').pipe(res);
		     res.on('end', function() 
		     {
			 exec.kill();
		     });//close res.on
		 });//close call-back function
//	});//close write file
   // });//read file

     console.log(JSON.stringify(req.files));
     console.log('req.files.name', req.files.fileToUpload.name);
});

app.listen(3000);
console.log('Listening on port 3000');