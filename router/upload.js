var formidable = require('formidable');
var path = require('path');
var fs = require('fs');
var mkdirp = require('mkdirp');
var express = require('express');
var router = express.Router();
var utils = require('../utils');
var shortid = require('shortid');
var file = require('../database/models/file');
var mongoose = require('../database/db/mongoose');

function MakeFile() {
	this.fileName = "";
	this.dirName  = shortid.generate();
	this.fileSize = 0;
};

var successStatus = (data) => {
	var result = {
		code: 200,
		data: data
	}
	return result;
}

var errorStatus = () => {
	var result = {
		code : 400,
		message: "Failed to upload file"
	}
	return result;
}

var successUpload = (res, makeFile) => {
	var resultSave = file.makeFileDb(makeFile);
	if(resultSave){
		var jsonres = JSON.stringify(successStatus(makeFile.dirName));
		res.end(jsonres);
			
		// console.log(jsonres);
	}else {
		res.end(errorStatus());
	}	
}

var makeDir = (nameDir) => {
	mkdirp(path.join(utils.Main_Dir, utils.Dir_Upload_Name, nameDir), (err) => {
	    if (err) return false;
	    return true;
	});
}

var makeUploadProcess = (req, res) => {
	const makeFile = new MakeFile();
	//Make new dir of file with name is a shortid
	makeDir(makeFile.dirName);
	
	var form = new formidable.IncomingForm();
	//Dir upload 
	form.uploadDir = path.join(utils.Main_Dir, utils.Dir_Upload_Name, makeFile.dirName);
	//No alowed muti-files
	form.multiples = false;
	//log error
	form.on('error', (err) => {
		console.log(err);
	});
	//Rename file
	form.on('file', (name, file) => {
		fs.rename(file.path, path.join(form.uploadDir,file.name));
		makeFile.fileName = file.name;
		makeFile.fileSize = file.size;
	});
	//End 
	form.on('end',() => {
		successUpload(res, makeFile);
	});
	//Parse data from req
	form.parse(req);
};

router.post('/' ,(req, res) => {
	makeUploadProcess(req, res);
});

module.exports = router;