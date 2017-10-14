var express = require('express');
var app = express();
var path = require('path');
var upload = require('./router/upload');
var download = require('./router/download');
var file = require('./database/models/file');
var fs = require('fs');

app.use(express.static(path.join(__dirname, 'public')));

app.set('view engine', 'ejs');

app.use('/upload',upload);

app.use('/download',download);


app.get('/', (req, res) => {
	res.render(`Home/index`);
});

app.get('/:shortId', (req, res) => {
	var fileId = req.params.shortId;
	//console.log(fileId);
	file.getFile(fileId, (err, data) => {
		if(!err){
			if(data.code == 200) {
				//console.log(data);
				res.render('Download/download', {
					fileId: data.result.shortUrl,
					fileName: data.result.nameFile,
					fileSize: data.result.size
				});
			}else {
				res.send('<h1>404 Not Found</h1>');
			}
		}else {
			res.send('<h1>404 Not Found</h1>');
		}
	})
	
})



app.listen(3000,(req, res) => {
	console.log("Hi :) I'm Duong !");
	console.log("Contact : thaiduongx26@gmail.com");
	console.log("Started server");
});
