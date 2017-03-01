
var myAPIClientApp_controllers= angular.module('EngineeringInsightsClientApp.controllers', []);
	

// create the controller and inject Angular's $scope

myAPIClientApp_controllers.controller('mainController', function($scope) {

    // create a message to display in our view

    
     $scope.message = 'Home Page';
    $scope.showDefectDetails = false;
    document.getElementById("getTestSubmit").disabled=false;

});

myAPIClientApp_controllers.controller('loginController', function($scope) {});
myAPIClientApp_controllers.controller('dod-analysisController', function($scope) {
	
	/************* Requirements Progress - multiBarChart  *********/
	
	$scope.optionsRequirementProgress = {
            chart: {
                type: 'multiBarChart',  // Change type to multiBarHorizontalChart , to see Horizontal graph
                height: 250,
                x: function(d){return d.label;},
                y: function(d){return d.value;},
                showControls: true,
                showValues: true,
                duration: 500,
                xAxis: {
                	axisLabel: 'Months',
                	showMaxMin: true	                    
                },
                yAxis: {
                    axisLabel: 'Requirements',
                    tickFormat: function(d){
                        return d3.format(',.2f')(d);
                    }
                }
            }
        };

        $scope.dataRequirementProgress = [
            {
                "key": "Actual Completion Rate",
                "color": "#e77338",
                "values": [
                    {
                        "label" : "Apr" ,
                        "value" : 0
                    } ,
                    {
                        "label" : "May" ,
                        "value" : 2
                    } ,
                    {
                        "label" : "June" ,
                        "value" : 6
                    } ,
                    {
                        "label" : "Jul" ,
                        "value" : 7
                    } ,
                    {
                        "label" : "Aug" ,
                        "value" : 8
                    },
                    {
                        "label" : "Sep" ,
                        "value" : 10
                    },
                    {
                        "label" : "Oct" ,
                        "value" : 12
                    },
                    {
                        "label" : "Nov" ,
                        "value" : 15
                    },
                    {
                        "label" : "Dec" ,
                        "value" : 17
                    },
                    {
                        "label" : "Jan" ,
                        "value" : 18
                    },
                    {
                        "label" : "Feb" ,
                        "value" : 19
                    },
                    {
                        "label" : "Mar" ,
                        "value" : 20
                    }
                ]
            },
            {
                "key": "Expected Completion Rate",
                "color": "#1f77b4",
                "values": [
                           {
   	                        "label" : "Apr" ,
   	                        "value" : 0
   	                    } ,
   	                    {
   	                        "label" : "May" ,
   	                        "value" : 8
   	                    } ,
   	                    {
   	                        "label" : "June" ,
   	                        "value" : 11
   	                    } ,
   	                    {
   	                        "label" : "Jul" ,
   	                        "value" : 15
   	                    } ,
   	                    {
   	                        "label" : "Aug" ,
   	                        "value" : 19
   	                    },
   	                    {
   	                        "label" : "Sep" ,
   	                        "value" : 21
   	                    },
   	                    {
   	                        "label" : "Oct" ,
   	                        "value" : 25
   	                    },
   	                    {
   	                        "label" : "Nov" ,
   	                        "value" : 28
   	                    },
   	                    {
   	                        "label" : "Dec" ,
   	                        "value" : 30
   	                    },
   	                    {
   	                        "label" : "Jan" ,
   	                        "value" : 32
   	                    },
   	                    {
   	                        "label" : "Feb" ,
   	                        "value" : 37
   	                    },
   	                    {
   	                        "label" : "Mar" ,
   	                        "value" : 38
   	                    }
   	                ]
            }
        ];
	
	 /************* Design Analysis - Donut Chart  *********/ 
	
	$scope.optionsDesignAnalysis = {
	          chart: {
	              type: 'pieChart',
	              height: 250,
	              donut: true,
	              x: function(d){return d.key;},
	              y: function(d){return d.y;},
	              //showLabels: true,

	              pie: {
	                  startAngle: function(d) { return d.startAngle-Math.PI},
	                  endAngle: function(d) { return d.endAngle-Math.PI}
	              },
	              duration: 500,
	              legend: {
	                  margin: {
	                      top: 5,
	                      right: 70,
	                      bottom: 5,
	                      left: 0
	                  }
	              }
	          }
	      };

	      $scope.dataDesignAnalysis = [           
	          {
	              key: "Completed",
	              y: 22
	          },
	          {
	              key: "In-Progress",
	              y: 10
	          },
	          {
	              key: "Not Started",
	              y: 6
	          }
	      ];
	
	/************* Feature Developement - Line+Bar Chart  *********/  
	$scope.optionsFeatureDevelopement = {
            chart: {
                type: 'linePlusBarChart',
                height: 250,
                margin: {
                    top: 30,
                    right: 75,
                    bottom: 50,
                    left: 75
                },
                bars: {
                    forceY: [0]
                },
                bars2: {
                    forceY: [0]
                },
                color: ['#1f77b4', 'darkred'],
                x: function(d,i) { return i },
                xAxis: {
                    axisLabel: 'Months',
                    tickFormat: function(d) {
                        var dx = $scope.dataFeatureDevelopement[0].values[d] && $scope.dataFeatureDevelopement[0].values[d].x || 0;
                        if (dx > 0) {
                            return d3.time.format('%x')(new Date(dx))
                        }
                        return null;
                    }
                },
                x2Axis: {
                    tickFormat: function(d) {
                        var dx = $scope.dataFeatureDevelopement[0].values[d] && $scope.dataFeatureDevelopement[0].values[d].x || 0;
                        return d3.time.format('%b-%Y')(new Date(dx))
                    },
                    showMaxMin: true
                },
                y1Axis: {
                    axisLabel: 'Features',
                    tickFormat: function(d){
                        return d3.format(',f')(d);
                    },
                    //axisLabelDistance: 12
                },
                y3Axis: {
                    tickFormat: function(d){
                        return d3.format(',f')(d);
                    }
                }
            }
        };

        $scope.dataFeatureDevelopement = [
            {
                "key" : "Features Actual" ,
                "bar": true,
                "values" : [ [ 1476594000000 , 3] , [ 1477976400000 , 6] , [ 1479272400000 , 9] , [ 1480568400000 , 12] , [ 1481864400000 , 15] , [ 1483246800000 , 18] , [ 1484542800000 , 20] , [ 1485925200000 , 23] , [ 1487221200000 , 0] , [ 1488344400000 , 26],[1489640400000 , 28] ]
            },
            {
                "key" : "Features Backlog" ,
                "values" : [ [ 1476594000000 , 2] , [ 1477976400000 , 4] , [ 1479272400000 , 5] , [ 1480568400000 , 6] , [ 1481864400000 , 7] , [ 1483246800000 , 9], [ 1484542800000 , 12] , [ 1485925200000 , 14] , [ 1487221200000 , 0] , [ 1488344400000 , 16],[1489640400000 , 18]  ]
            }
        ].map(function(series) {
                series.values = series.values.map(function(d) { return {x: d[0], y: d[1] } });
                return series;
            });

	
	/***************** Defect Status - MultiBarChart *********/
	$scope.optionsDefectStatus = {
	          chart: {
	              type: 'multiBarChart',
	              height: 250,
	              margin : {
	                  top: 20,
	                  right: 20,
	                  bottom: 60,
	                  left: 45
	              },
	              clipEdge: true,
	              staggerLabels: true,
	              transitionDuration: 1000,
	              tooltips: true,
	              tooltipContent: function (key, x, y, e, graph) {
	                return '<p>' + key + ': ' + y + '</p>';
	              },
	              stacked: true,
	              showControls: false,
	              xAxis: {
	                  axisLabel: 'Months',
	                  showMaxMin: true,
	                  tickFormat: function(d) {return d;}
	              },
	              yAxis: {
	                  axisLabel: 'Defects',
	                  axisLabelDistance: -20,
	                  tickFormat: function(d){
	                      return d3.format(',.f')(d);
	                  }
	              }
	          }
	      };

	      $scope.dataDefectStatus = generateData();

	      function generateData() {
	        var values = [];
	        var values0 =[];
	        var values1 = [];
	        //change number of bars here by editing '90'//
	        //for (var h=0; h<5; h++) {
	          //replace the y values with your own values//
	          values.push({x: 'Oct', y: 1200});
	          values0.push({x: 'Oct', y: 800});
	          values1.push({x: 'Oct', y: 700});

	          values.push({x: 'Nov', y: 700});
	          values0.push({x: 'Nov', y: 700});
	          values1.push({x: 'Nov', y: 400});

	          values.push({x: 'Dec', y: 1100});
	          values0.push({x: 'Dec', y: 200});
	          values1.push({x: 'Dec', y: 200});

	          values.push({x: 'Jan', y: 600});
	          values0.push({x: 'Jan', y: 500});
	          values1.push({x: 'Jan', y: 100});

	          values.push({x: 'Feb', y: 200});
	          values0.push({x: 'Feb', y: 200});
	          values1.push({x: 'Feb', y: 100})

	        //}

	      return [{
	        key: 'Filed',
	        color: '#1f77b4',
	        //color: '#bcbd22',
	        values: values
	        },
	        {
	          key: 'Fixed',
	          color: '#aec7e8',
	          values: values0
	        },
	        {
	          key: 'Verified',
	          color: '#e77338',
	          values: values1
	        }
	      ];
	      }
	      
	/************* Overall Health - Bullet Chart *********/    
	$scope.optionsOverallHealth = {
            chart: {
                type: 'bulletChart',
                duration: 500
            }
        };

	$scope.dataOverallHealth={
			"title": "Development",
			"subtitle": "Features",
			"ranges": [5,15,25,35],
			"measures": [18],
			"markers": [30]
			};

	$scope.data1OverallHealth={
			"title": "Testing",
			"subtitle": "Progress",
			"ranges": [2,8,15,20],
			"measures": [7],
			"markers": [20]
			};  
	
	
	
});

myAPIClientApp_controllers.controller('defect-analyticsController', function($scope) {
    //Define the `myDataSource` scope variable.
    $scope.myDataSource = {
        chart: {
             caption: "Number of Relevent TestCases",
        subcaption: "Defect Id",
        startingangle: "120",
        showlabels: "0",
        showlegend: "1",
        enablemultislicing: "0",
        slicingdistance: "15",
        showpercentvalues: "1",
        showpercentintooltip: "0",
        plottooltext: "$label : $datavalue",
        theme: "fint"
        },
        data: [
             {
            label: "Total TestCases",
            value: "15000"
        },
        {
            label: "Relevant TestCases",
            value: "9000"
        }        
        ]
    };
     $scope.myDataSourceUseCases = {
        chart: {
             caption: "Number of Relevent UseCases",
        subcaption: "Defect Id",
        startingangle: "120",
        showlabels: "0",
        showlegend: "1",
        enablemultislicing: "0",
        slicingdistance: "15",
        showpercentvalues: "1",
        showpercentintooltip: "0",
        plottooltext: "$label : $datavalue",
        theme: "fint"
        },
        data: [
             {
            label: "Total UseCases",
            value: "10000"
        },
        {
            label: "Relevant UseCases",
            value: "4000"
        }        
        ]
    };
});
myAPIClientApp_controllers.controller('testcase-optimizationController', function($scope,$http) {  
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
    $http.get('json/defect.json').
        success(function(data, status) {
            $scope.people=data;
        }).error(function(data, status) {  

    });
        $scope.getTestCases = function(){
    	//$scope.selectedDefect = selectedDef;
        window.location = "#defect-analytics";
  };

  $scope.defectSelected = function(selectedDef){
      document.getElementById("getTestSubmit").disabled=false;
      $scope.showDefectDetails = true;
      $scope.selectedDefect = JSON.parse(selectedDef);
      console.log("def",$scope.selectedDefec);
    console.log("show details",$scope.showDefectDetails); 
};
    
});
myAPIClientApp_controllers.controller('defectCasesController', function($scope) {});





