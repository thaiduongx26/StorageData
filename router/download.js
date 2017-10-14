var express = require('express');
var path = require('path');
var fs = require('fs');
var utils = require('../utils');

var router = express.Router();

router.get('/:id/:name',(req, res) => {
	//Take name and id 
	var fId = req.params.id;
	var name = req.params.name;
	//Define file with fileId
	var filePath = utils.Main_Dir + `/${utils.Dir_Upload_Name}/` + `${fId}/` + `${name}`;
	res.download(filePath, name, (err) => {
		if(err) {
			res.end('Not Found');
		}	
	})
})

module.exports = router;