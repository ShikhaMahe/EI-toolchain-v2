    // create the module and name it engApp    
    var engApp = angular.module('EngineerInsight', ['ngRoute']);  
      
    // configure our routes    
    engApp.config(function($routeProvider) {  
        $routeProvider  
      
        // route for the home page    
            .when('/', {  
            templateUrl: 'pages/home.html',  
            controller: 'mainController'  
        })  
      
        // route for the defect page    
        .when('/defect', {  
            templateUrl: 'pages/defect.html',  
            controller: 'defectController'  
        })  
      
        // route for the testcase page    
        .when('/testcase', {  
            templateUrl: 'pages/testcase.html',  
            controller: 'contactController'  
        })
        
          // route for the testcase page    
        .when('/QA', {  
            templateUrl: 'pages/QA.html',  
            controller: 'contactController'  
        });
        
      
    });  
      
    // create the controller and inject Angular's $scope    
    engApp.controller('mainController', function($scope) {  
        // create a message to display in our view    
        $scope.HomeMessage = 'Home Controller Called !!!';  
    });  
      
    engApp.controller('defectController', function($scope,$http) {  
        $scope.defectMessage = 'defect Controller Called !!!';
        
        $scope.content = null;
        //var json1 = '{"result":true,"count":1}';
        var json2='{"id":"all","body":[{"ID":"117","Owner":"manoj","Priority":"High","Severity":"Critical"},{"ID":"118","Owner":"manoj","Priority":"High","Severity":"Critical"}]}';
        obj = JSON.parse(json2);
        var jsonbody=obj.body[0].ID;
        console.log("obj message : " ,obj);
       // alert(jsonbody);
        //var defectJson=JSON.parse('/defects.json');
        //alert(defectJson.count);
        $http.get('defect.json').
            success(function(data, status) {
                $scope.people=data;
            }).error(function(data, status) {  

        });
        
    });  
      
    engApp.controller('contactController', function($scope) {  
        $scope.ContactMessage = 'Contact Controller Called !!!';  
    });  