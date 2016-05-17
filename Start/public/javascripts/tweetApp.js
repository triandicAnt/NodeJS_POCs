var app = angular.module('tweetApp',['ngRoute']);
console.log('I m getting called');
// configure routing
app.config(function($routeProvider){
    $routeProvider
    .when('/',{
        templateUrl:'main.html',
        controller: 'mainController'
    })
    .when('/login',{
        templateUrl:'login.html',
        controller:'authController'
    })
    .when('/register',{
        templateUrl: 'register.html',
        controller: 'authController'
    });
});

// mainController to control main 
app.controller('mainController',function($scope){
    $scope.posts = [];
    $scope.newPost = {created_by:'', text:'',created_at:''}; 

    $scope.post = function(){
        $scope.newPost.created_at = Date.now();
        $scope.posts.push($scope.newPost);
        $scope.newPost = {created_by:'', text:'',created_at:''};
    };

});

// authController for login and register

app.controller('authController',function($scope){
    $scope.user = {username:'',password:''};
    $scope.error_message = '';
    
    $scope.login = function () {
        $scope.error_message = 'Login request for '+ $scope.user.username;
    };
    $scope.register = function(){
        $scope.error_message = 'Registration request for '+$scope.user.username;
    };
});