var express = require('express');
var path = require('path');
var fs = require('fs')
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongo = require('mongodb');
var mongoose = require('mongoose');
var teacher = require('./database/teacher');
var student = require('./database/student');
var subject = require('./database/subjects');
var requests = require('./database/requests');

var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
mongoose.connect('mongodb://localhost/tutor', function(err){
	console.log('err')
});

// app.use(express.static(path.join(__dirname, 'public')));


app.use(express.static(path.join(__dirname, 'public')));


app.post('/createTeacher', function(req, res){
	console.log('came here')
	teacher.create({first_name: req.body.firstname,country : req.body.country,location : req.body.city, last_name: req.body.lastname, email:req.body.email,password : req.body.password, cpassword : req.body.cpassword, gender: req.body.gender}, function(err, tea) {
		if (err) throw err;
		console.log('teacher ' + tea)
		res.sendFile(path.join(__dirname+'/public/pages/created.html'));
	})
})

app.post('/signinTeacher', function(req, res){
	console.log(req.body);
	teacher.findOne({email : req.body.email}, function(err, tea){
		if (err) throw err;
		console.log('this is Tea ' + tea);
		if (tea.password == req.body.password) {
			res.redirect('/#/teacher/'+tea._id+'/dashboard');
		}
	})
})

app.post('/createStudent', function(req, res){
	console.log('came here')
	student.create({first_name: req.body.firstname,country : req.body.country,location : req.body.city, last_name: req.body.lastname, email:req.body.email,password : req.body.password, cpassword : req.body.cpassword, gender: req.body.gender}, function(err, tea) {
		if (err) throw err;
		console.log('teacher ' + tea)
		res.sendFile(path.join(__dirname+'/public/pages/created.html'));
	})
})

app.post('/signinStudent', function(req, res){
	console.log(req.body);
	student.findOne({email : req.body.email}, function(err, tea){
		if (err) throw err;
		console.log('this is Tea ' + tea);
		if (tea.password == req.body.password) {
			res.redirect('/#/student/'+tea._id+'/dashboard');
		}
	})
})

app.post('/addsub', function(req, res){
	console.log('posted')
	console.log(req.body);
	subject.create({name: req.body.subject, owner_id: req.body.id}, function(err, sub) {
		if (err) throw err;
		res.send({message: 'Created', subject:sub});
	})
})

app.post('/GetSubjects', function(req, res){
	console.log(req.body)
	subject.find({owner_id: req.body.id}, function(err, subs){
		if (err) throw err;
		console.log('This is subjects ' + subs)
		res.send(subs);
	})
})

app.post('/GetRequests', function(req, res){
	console.log('coming in with ' + req.body.id)
	requests.find({t_id: req.body.id}, function(err, result) {
		if (err) throw err;
		res.send(result);
	})
});

app.post('/getTeacherInfo', function(req, res){
	teacher.findOne({_id: req.body.id}, function(err, tea) {
		if (err) throw err;
		res.send(tea);
	})
})

app.post('/updateTeacher', function(req, res){
	teacher.findOneAndUpdate({email: req.body.email},
	{first_name: req.body.first_name,contact: req.body.contact, country : req.body.country,location : req.body.location,city : req.body.city, last_name: req.body.last_name, email:req.body.email,password : req.body.password, cpassword : req.body.cpassword, gender: req.body.gender},
	function(err, tea){
		if (err) throw err;
		res.send({message:'Updated', teacher : tea})
	})
}) 
/// FOr student

app.post('/getStudentInfo', function(req, res){
	student.findOne({_id: req.body.id}, function(err, tea) {
		if (err) throw err;
		res.send(tea);
	})
})

app.post('/updateStudent', function(req, res){
	student.findOneAndUpdate({email: req.body.email},
	{first_name: req.body.first_name, contact: req.body.contact, country : req.body.country,location : req.body.location,city : req.body.city, last_name: req.body.last_name, email:req.body.email,password : req.body.password, cpassword : req.body.cpassword, gender: req.body.gender},
	function(err, tea){
		if (err) throw err;
		res.send({message:'Updated', teacher : tea})
	})
}) 

app.post('/updateStudent', function(req, res){
	teacher.findOneAndUpdate({email: req.body.email},
	{first_name: req.body.first_name,country : req.body.country, location : req.body.location, city : req.body.city, last_name: req.body.last_name, email:req.body.email,password : req.body.password, cpassword : req.body.cpassword, gender: req.body.gender},
	function(err, tea){
		if (err) throw err;
		res.send({message:'Updated', teacher : tea})
	})
})


function returner(results, i, teachersArr,sub){
	subject.find({owner_id : results[i]._id}, function(err, subs) {
				for (var j = 0; j < subs.length; j++) {
				console.log('These are subs and results ' + results[i]);
				console.log(subs[j].name + ' ==== ' + sub )
				if (subs[j].name == sub) {
					// console.log(results[i])
					teachersArr.push(results[i]);
					console.log(teachersArr)
				}
			}
			console.log('Returning')
			console.log(teachersArr)
			return teachersArr
		})
		
}
app.post('/searchTeacher' , function(req, res){
	// find the instructors in the area then see if he teachers that subject or not
	let teachersArr = [];
	console.log('wajay hain aakar')
	// subject.find({name : req.body.subject}, function(err, results) {
		teacher.find({location : req.body.area} , function(err, results){
			if (err) throw err;
			console.log(results)
			res.send(results);
		})
	})

app.post('/getSubjectTeacher', function(req, res){
	console.log('reqs ' + req.body)
	var all  =[];
	var ids= req.body.id
		teacher.findOne({_id : req.body.id}, function(err, result) {
			console.log(result)
			res.send(result)
	})
})

app.post('/connect', function(req, res) {
	var scontact;
	var sname ;
	student.findOne({_id : req.body.sid}, function(err, result){
		if (err) throw err;
		scontact = result.contact;
		sname = result.first_name + ' ' + result.last_name;
	})
	
	requests.create({t_id: req.body.tid, s_id: req.body.sid, scontact: scontact, sname: sname}, function(err, result){
		if (err) throw err;
		res.send({message: 'Created'});
	})
})

app.set('port', (process.env.PORT || 4000));

app.listen(app.get('port'), function(){
	console.log('Server started on port '+app.get('port'));
});