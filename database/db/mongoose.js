var mongoose = require('mongoose');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/FilesSystem',{
	useMongoClient: true
});

module.exports = {mongoose};