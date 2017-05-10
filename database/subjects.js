var mongoose = require('mongoose');

var catSchema = mongoose.Schema({
	name: String,
    owner_id : { type: mongoose.Schema.Types.ObjectId, ref: 'teacher' }
});

var subject = module.exports =  mongoose.model('subjects', catSchema)



