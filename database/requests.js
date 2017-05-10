var mongoose = require('mongoose');

var catSchema = mongoose.Schema({
    sname : String,
    scontact : String,
    t_id : { type: mongoose.Schema.Types.ObjectId, ref: 'teacher' },
    s_id : { type: mongoose.Schema.Types.ObjectId, ref: 'student' }
});

var request = module.exports =  mongoose.model('request', catSchema);



