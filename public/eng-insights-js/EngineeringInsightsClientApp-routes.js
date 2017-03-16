var ClientApp_route = angular.module('EngineeringInsightsClientApp.routes',['ngRoute']);


// configure our routes

ClientApp_route.config(function($routeProvider) {

    $routeProvider


        // route for the home page

        .when('/login', {
            templateUrl : 'pages/login.html',
            controller  : 'loginController'
        })
        .when('/star', {
            templateUrl : 'pages/starbrustchart.html',
            controller  : 'loginController'
        })
        .when('/landing', {
            templateUrl : 'pages/landing.html',
            controller  : 'landingController'
        })
       
        .when('/angular-dod-analysis', {

            templateUrl : 'pages/angular-dod-analysis.html',
            controller  : 'dod-analysisController'
        })        
       
        .when('/angular-testcase-optimization', {

            templateUrl : 'pages/angular-testcase-optimization.html',
            controller  : 'testcase-optimizationController'
        })
         .when('/defect-analytics', {
            templateUrl : 'pages/defect-analytics.html',
            controller  : 'defect-analyticsController'
        })
         .when('/devCompareOptimizer', {
            templateUrl : 'pages/compare.html',
            controller  : 'compareCtlAfterOptimize'
        })
         .when('/testCompareOptimizer', {
            templateUrl : 'pages/compareTestPhase.html',
            controller  : 'compareCtlAfterOptimize'
        })
        
        .otherwise({
        redirectTo: 'views/index.html'
        });

});