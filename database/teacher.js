var mongoose = require('mongoose');

var catSchema = mongoose.Schema({
	first_name: String,
	last_name: String, 
    location: String,
    contact : String,
    email : String,
    password: String,
    cpassword : String,
    gender : String,
    country : String,
    city : String,
    contact : String
});

var teacher = module.exports =  mongoose.model('teacher', catSchema)

module.exports.findUserbyId = function(userId, callback) {
    teacher.find({_id: userId},callback);
}

