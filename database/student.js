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

var student = module.exports =  mongoose.model('Student', catSchema)

module.exports.findUserbyId = function(userId, callback) {
    student.find({_id: userId},callback);
}

