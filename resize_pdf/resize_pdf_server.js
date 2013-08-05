var express = require('express');
var fs = require('fs');
var app = express();
app.use(express.bodyParser());

var postHTML = '<!DOCTYPE html><html lang="en" dir="ltr" class="client-nojs">'+
'<head></head>'+
'<body>'+
'<form method="post" enctype="multipart/form-data">'+
' <label for="fileToUpload">Select a File to Upload</label><br />' +
'<input type="file" name="fileToUpload" id="fileToUpload" onchange="fileSelected();"/>' +
//'<input name="name"></input>'+
'<input type="submit">'+
'</form>'+
'</body>'+
'</html>';

app.get('/', function(req, res){
    res.send(postHTML);
});


app.post('/', function(req, res) {

    //move file around
    fs.readFile(req.files.fileToUpload.path, function (err, data) {
	var newPath = "./tmp/" + req.files.fileToUpload.name;
	fs.writeFile(newPath, data, function (err) {
	    
	    //child process
	    var exec = require('child_process').spawn;	    
	    exec("convert -density 300 -resize 2048x2048 -alpha off -transparent white -quality 85 ./tmp/" + req.files.fileToUpload.name + "[0] ./tmp/destination_%d.jpg",
		 function(err, stdout, stderr) {
		     if (err) {
			 console.log('child process exited with error code ' + err.stack);
			 return;
		     }
		     console.log("done");
		     fs.readFile('./tmp/destination_0.jpg', function(err, data) {
			 if (err) throw err; // Fail if the file can't be read.
			// res.writeHead(200, {'Content-Type': 'image/jpeg'});
			// res.end(data); // Send the file data to the browser.
		     });
		     res.writeHead(200, {'Content-Type': 'image/jpeg'});
		     exec.stdout.pipe(res);
		     res.on('end', function() {
			 exec.kill();
		     });

	    });

	});
    });

     console.log(JSON.stringify(req.files));
     console.log('req.files.name', req.files.fileToUpload.name);
});

app.listen(3000);
console.log('Listening on port 3000');