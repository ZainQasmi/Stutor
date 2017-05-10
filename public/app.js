console.log('app ks')
var app = angular.module('stutor', ['ngRoute'])
app.config(function($routeProvider,$locationProvider){
			// $locationProvider.html5Mode(true);
            $locationProvider.hashPrefix('');
            console.log('came here')
			$routeProvider.when('/', {
							templateUrl: 'pages/index1.html',
							controller: 'mainCtrl'
					}).when('/student/:id/dashboard', {
							templateUrl: 'pages/Student/index.html',
							controller: 'studentCtrl'
					}).when('/teacher/:id/dashboard', {
							templateUrl: 'pages/Teacher/index.html',
							controller: 'teacherCtrl'
					}).when('/teacher/:id/profile', {
							templateUrl: 'pages/Teacher/profile.html',
							controller: 'teacherCtrl'
					}).when('/student/:id/profile', {
							templateUrl: 'pages/Student/profile.html',
							controller: 'studentCtrl'
					}).when('/teacher/:id/settings', {
							templateUrl: 'pages/Teacher/settings.html',
							controller: 'teacherCtrl'
					}).when('/student/:id/settings', {
							templateUrl: 'pages/Student/settings.html',
							controller: 'studentCtrl'
					})
})

app.controller('mainCtrl',function ($route, $routeParams,$scope, $http, $location) {


})

app.controller('teacherCtrl',function ($route, $routeParams,$scope, $http, $location) {
    id = $routeParams.id;
    
    $scope.account_settings = function() {
        $location.path('/teacher/'+id+'/settings');
    }

    $scope.updateTeacher =function() {
        $http.post('/updateTeacher', $scope.userInfo).then(function(res){
            if (res.data.message == 'Updated') {
                $scope.showAlert = true;
                $scope.message = 'Info Updated'
            }
        })
    }

    $scope.settings = function() {
        $location.path('/teacher/'+id+'/profile');
    }

    $scope.getSubjects = function() {
        console.log('jelp')
        $http.post('/GetSubjects', {id: $routeParams.id}).then(function(res){
            $scope.subjects = res.data;
        })
    }

    $scope.getRequests = function() {
        console.log('jelp')
        $http.post('/GetRequests', {id: $routeParams.id}).then(function(res){
            console.log('This is req ' + res.data )
            $scope.requests = res.data;
        })
    }

    $scope.getTeacherInfo = function() {
        $http.post('/getTeacherInfo', {id : $routeParams.id}).then(function(res){
            $scope.userInfo = res.data;
        })
    }


    $scope.hide = function() {
        $scope.showAlert = false;
    }

    $scope.get_studentname = function(id) {
        console.log('innn')
        $http.post('/getStudentInfo', {id : id}).then(function(res){
            return (res.data.first_name +' ' +  res.data.last_name);
        })
    }

    $scope.get_studentcontact = function(id) {
        console.log('innaaaan')
        $http.post('/getStudentInfo', {id : id}).then(function(res){
            return (res.data.contact);
        })
    }
   
    $scope.addsub = function() {
        console.log($scope.tea)
        $scope.tea.id = $routeParams.id;
        $http.post('/addsub', $scope.tea).then(function(res){
            console.log()
           if (res.data.message == 'Created') {
               $scope.showAlert = true;
                $scope.message = 'Subject Added !'   
            } else {
                $scope.showAlert = true;
                $scope.message = 'Error Occured'
            }
        })
    }
})

app.controller('studentCtrl',function ($route, $routeParams,$scope, $http, $location) {
    id = $routeParams.id;
    $scope.user_id = $routeParams.id;
    $scope.settings = function() {
        $location.path('/student/'+id+'/settings');
    }

    $scope.hide = function() {
        $scope.showAlert = false;
    }

    $scope.account_settings = function() {
        $location.path('/student/'+id+'/settings');
    }

    $scope.updateStudent =function() {
        $http.post('/updateStudent', $scope.userInfo).then(function(res){
            if (res.data.message == 'Updated') {
                $scope.showAlert = true;
                $scope.message = 'Info Updated'
            }
        })
    }

    $scope.getStudentInfo = function() {
        $http.post('/getStudentInfo', {id : $routeParams.id}).then(function(res){
            $scope.userInfo = res.data;
        })
    }


    function getsubjectTeacher(results) {
        console.log('Got called')
        
    
}
    $scope.getItem =  function(){
        return sessionStorage.getItem('ids');
    }
    $scope.searchTeacher = function() {
        console.log($scope.student)
        $http.post('/searchTeacher', $scope.student).then(function(res) {
            $scope.results = res.data;
            console.log('These are results ' + res.data) 
            var ids = [];
            console.log('Here we are ' + res.data.length)
            $scope.showResults = true;
            $scope.tids = res.data;
            sessionStorage.setItem('ids',$scope.ids)
            console.log('jere are ' + $scope.tids)
        })
    }
             
             $scope.getTeacher = function(id) {
                console.log('This is data  '+ id)
                $http.post('/getSubjectTeacher', {id: id}).then(function(response) {
                    console.log('This is response ' + ' ' + '    ' + response.data)
                    return response.data;
                })
             }

            $scope.connect = function(id) {
                $http.post('/connect', {sid: $routeParams.id, tid: id}).then(function(res){
                    console.log('This is res')
                })
            }  
    
    console.log('Ustaad')
})