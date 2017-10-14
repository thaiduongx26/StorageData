var mongoose = require('mongoose');
var shortid = require('shortid');
var Schema = mongoose.Schema;

var typeFile = new Schema({
	shortUrl : {
		type: String 
	},
	nameFile: {
		type: String
	},
	size: {
		type:String
	}
});

var errorFind = {
	code: 404,
	result: "File not found!"
}


var File = mongoose.model('File',typeFile);

var makeFileDb = (makeFile) => {
	var newFile = new File({
		shortUrl: makeFile.dirName,
		nameFile: makeFile.fileName,
		size: makeFile.fileSize
	})
	newFile.save((err) => {
		if(err) return false;
	})
	return true;
}

var getFile = (shortid, callback) => {
	File.findOne({shortUrl: shortid} , (err, result) =>{
		if(!err) {
			if(result){
				var successFind = {
					code: 200,
					result: result
				}	
				callback(err, successFind);
			}else {
				callback(err, errorFind);
			}
		}else {
			callback(err, errorFind);
		}
		
	})
	
}

// getFile('rJRvGa7jW', (err, data) => {
// 	if(!err) {
// 		console.log(data);
// 	}
// })

module.exports = {
	File,
	makeFileDb,
	getFile
}