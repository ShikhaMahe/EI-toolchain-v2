
var myAPIClientApp_controllers= angular.module('EngineeringInsightsClientApp.controllers', []);
	

// create the controller and inject Angular's $scope

myAPIClientApp_controllers.controller('mainController', function($scope) {

    // create a message to display in our view

    
     $scope.message = 'Home Page';
    $scope.showDefectDetails = false;
    $scope.showTwoQ=true;
    document.getElementById("getTestSubmit").disabled=false;

});

myAPIClientApp_controllers.controller('loginController', function($scope) {});
myAPIClientApp_controllers.controller('landingController', function($scope, $timeout) {

  $('.mypopover').popover('show');
 
 
  
  $scope.devAnalyzedClicked = function(){	   
	   
	   
	   if ($scope.showAnalyzedDev) {
	        $scope.showAnalyzedDev = false;
	        } else {
	            $scope.showAnalyzedDev = true;
	        }
  }; 
  
  $scope.testAnalyzedClicked = function(){
	  if ($scope.showAnalyzedTest) {
	        $scope.showAnalyzedTest = false;
	        } else {
	            $scope.showAnalyzedTest = true;
	        }
 }; 
 
 window.onclick = function () {
   /*  if (flgIsHide) {
         var scope = angular.element(document.getElementById('controller1')).scope();
         scope.safeApply(function () {
             scope.items.forEach(function (item) {
                 item.isSelected = false;
             });
             scope.selectedItemImage = "#";
         });
     }
     else
         flgIsHide = true; */
	 
	 $scope.showAnalyzeTest = false;  	
	 $scope.showAnalyzeTest = false;  	
 }
  
  
 /******** Concept Map Data *****************/
  optimizeTestcase = function(){
		window.open("/optimizetestcase" , "mywindow", "left=0,top=0,width=1050,height=810,scrollbars=no,toolbar=no,directories=no,status=no,menubar=no,copyhistory=no,resizable=yes").focus();
} 

//Code to refresh the Slider in WhatIf Tab
  $scope.refreshSlider = function(){
	  $timeout(function() {
       $scope.$broadcast('rzSliderForceRender');
	  });
   }
    $scope.range_slider_ticks_values = {
    minValue: "0",
    maxValue: "5",
    options: {
       floor: 0,
       ceil: 3,
       step: 1,
       showTicksValues: true,
       stepsArray: [
                  {value: 1, legend: 'Beginner'},
                  {value: 2},
                  {value: 3, legend: 'Average'},
                  {value: 4},
                  {value: 5, legend: 'Expert'}
                ]
    }
    };



  $scope.showReqProgressChart = true;
  //Variable for showing the tab view in landing page
  $scope.tab = 1;

    $scope.setTab = function(newTab){
      $scope.tab = newTab;
    };

    $scope.isSet = function(tabNum){
      return $scope.tab === tabNum;
    };
    //End tab logic

    //onClick of progress bar to enable and disable the div based on user inputs 
   $scope.progressClicked = function(selectedProgress){
    $scope.selectedPhase = selectedProgress;

    if($scope.selectedPhase=="requirement"){
      $scope.showReqProgressChart = true;
      $scope.showTwoQ= false;
      $scope.showdevelopmentprogress = false;
      $scope.showtestingprogress = false;
      $scope.showdevEngineeringprogress = false;
      $scope.showTestEngineeringprogress = false;  
      $scope.showBuildprogress = false; 
      $scope.showBuildInsightprogress= false;   
    }
    if($scope.selectedPhase=="development"){
      $scope.showReqProgressChart = false;
      $scope.showTwoQ= true;
      $scope.showdevelopmentprogress = true;
      $scope.showtestingprogress = false;
      $scope.showdevEngineeringprogress = true;
      $scope.showTestEngineeringprogress = false;   
      $scope.showBuildprogress = false; 
      $scope.showBuildInsightprogress= false;   
    }
    if($scope.selectedPhase=="testing"){
      $scope.showReqProgressChart = false;
      $scope.showTwoQ= true;
      $scope.showdevelopmentprogress = false;
      $scope.showtestingprogress = true;
      $scope.showdevEngineeringprogress = false;
      $scope.showTestEngineeringprogress = true;     
      $scope.showBuildprogress = false; 
      $scope.showBuildInsightprogress= false; 
    }
    if($scope.selectedPhase=="deploy"){

      $scope.showReqProgressChart = false;
      $scope.showTwoQ= true;
      $scope.showdevelopmentprogress = false;
      $scope.showtestingprogress = false;
      $scope.showdevEngineeringprogress = false;
      $scope.showTestEngineeringprogress = false; 
      $scope.showBuildprogress = true;  
      $scope.showBuildInsightprogress= true;    
    }
   
   };
    //End of progress bar logic


    $scope.myDataSource = {
        chart: {
             caption: "Number of Defects",
        subcaption: "",
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
            label: "open",
            value: "120"
        },
         {
            label: "Deferred",
            value: "80"
        },
             {
            label: "Verified",
            value: "110"
        },
        {
            label: "Fixed",
            value: "250"
        }        
        ]
    };

 
     /************* Requirements Progress - multiBarChart  *********/
    

     $scope.optionsRequirementProgress = {
                chart: {
                    type: 'multiBarHorizontalChart',  // Change type to multiBarHorizontalChart , to see Horizontal graph
                    height: 300,
                    x: function(d){return d.label;},
                    y: function(d){return d.value;},
                    showControls: true,
                    showValues: true,
                    duration: 500,
                    xAxis: {
                      axisLabel: 'Per Week',
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
                            "label" : "Dec 19" ,
                            "value" : 5
                        } ,
                        {
                            "label" : "Dec 26" ,
                            "value" : 8
                        } ,
                        {
                            "label" : "Jan 2" ,
                            "value" : 6
                        } ,
                        {
                            "label" : "Jan 9" ,
                            "value" : 7
                        } ,
                        {
                            "label" : "Jan 16" ,
                            "value" : 10
                        },
                        {
                            "label" : "Jan 23" ,
                            "value" : 7
                        },
                        {
                            "label" : "Jan 30" ,
                            "value" : 10
                        },
                        {
                            "label" : "Feb 5" ,
                            "value" : 23
                        },
                        {
                            "label" : "Feb 13" ,
                            "value" : 26
                        },
                        {
                            "label" : "Feb 20" ,
                            "value" : 21
                        },
                        {
                            "label" : "Feb 27" ,
                            "value" : 20
                        }
                        
                    ]
                },
                {
                    "key": "Expected Completion Rate",
                    "color": "#1f77b4",
                    "values": [
                               {
                                "label" : "Dec 19" ,
                                "value" : 6
                            } ,
                            {
                                "label" : "Dec 26" ,
                                "value" : 10
                            } ,
                            {
                                "label" : "Jan 2" ,
                                "value" : 11
                            } ,
                            {
                                "label" : "Jan 9" ,
                                "value" : 13
                            } ,
                            {
                                "label" : "Jan 16" ,
                                "value" : 19
                            },
                            {
                                "label" : "Jan 23" ,
                                "value" : 14
                            },
                            {
                                "label" : "Jan 30" ,
                                "value" : 25
                            },
                            {
                                "label" : "Feb 5" ,
                                "value" : 20
                            },
                            {
                                "label" : "Feb 13" ,
                                "value" : 21
                            },
                            {
                                "label" : "Feb 20" ,
                                "value" : 18
                            },
                            {
                                "label" : "Feb 27" ,
                                "value" : 28
                            }
                            
                        ]
                }
            ];

    $scope.optionspiedefectchart = {
            chart: {
                type: 'pieChart',
                height: 300,
                x: function(d){return d.key;},
                y: function(d){return d.y;},
                showLabels: true,
                duration: 500,
                labelThreshold: 0.01,
                labelSunbeamLayout: true,
                legend: {
                    margin: {
                        top: 5,
                        right: 35,
                        bottom: 5,
                        left: 0
                    }
                }
            }
        };

        $scope.piedefectdata = [
            {
                key: "Open",
                y: 7600
            },
            {
                key: "Fixed",
                y: 4000
            },
            {
                key: "verified",
                y: 3000
            },
             {
                key: "Defered",
                y: 1000
            }
            
        ];
        
        /********************* SunBurst ********/
        $scope.options = {
                chart: {
                    type: 'sunburstChart',
                    height: 250,
                    showLabels: true,
                    labelThreshold: 0.01,
                    labelSunbeamLayout: true,
                    showControls: true,
                    showValues: true,
                    color: d3.scale.category20c(),
                    duration: 150
                }
            };

        $scope.data = [{
            "name": "Project",
            "children": [ {"name": "Stories",   "children": [
                                {
                                    "name": "Story1",
                                    "children": [
                                        {
                                            "name": "Defect1",
                                            "children": [
                                                {"name": "TestCase1"},
                                                {"name": "TestCase2"},
                                                {"name": "TestCase3"},
                                                {"name": "TestCase4"}
                                            ]
                                        },
                                        {
                                            "name": "Defect2",
                                            "children": [
                                                {"name": "TestCase1"},
                                                {"name": "TestCase2"},
                                                {"name": "TestCase3"},                                   
                                            ]
                                        },
                                        {
                                            "name": "Defect3",
                                            "children": [
                                                {"name": "TestCase1"}
                                            ]
                                        }
                                    ]
                                },
                                {
                                    "name": "Story2",
                                    "children": [
                                        {"name": "Defect1"},
                                        {"name": "Defect2"},
                                        {
                                            "name": "Defect3",
                                            "children": [
                                                {"name": "TestCase1"},
                                                {"name": "TestCase2"},
                                                {"name": "TestCase3"},
                                                {"name": "TestCase4"},
                                                {"name": "TestCase5"},
                                                {"name": "TestCase6"},
                                                {"name": "TestCase7"},
                                                {"name": "TestCase8"},
                                                {"name": "TestCase9"}
                                            ]
                                        },
                                        {"name": "Defect4"},
                                        {"name": "Defect5"},
                                        {"name": "Defect6"},
                                        {"name": "Defect7"},
                                        {"name": "Defect8"},
                                        {"name": "Defect9"},
                                        {"name": "Defect10"},
                                        {"name": "Defect11"},
                                        {"name": "Defect12"}
                                    ]
                                },
                                {
                                    "name": "story3",
                                    "children": [
                                        {
                                            "name": "Defect1",
                                            "children": [
                                                {"name": "TestCase1"},
                                                {"name": "TestCase2"},
                                                {"name": "TestCase3"},
                                                {"name": "TestCase4"},
                                                {"name": "TestCase5"}
                                            ]
                                        },
                                      
                                    ]
                                },
                                {
                                    "name": "story4",
                                    "children": [
                                        {"name": "Defect1"},
                                        {"name": "Defect2"},
                                        {"name": "Defect3"},
                                        {"name": "Defect4"}
                                    ]
                                },
                                {
                                    "name": "story5",
                                    "children": [
                                        {"name": "Defect1"}
                                    ]
                                },
                                {
                                    "name": "story6",
                                    "children": [
                                        {"name": "Defect1"},
                                        {"name": "Defect1"},
                                        {"name": "Defect1"},
                                        {"name": "Defect1"},
                                        {"name": "Defect1"},
                                        {"name": "Defect1"},
                                        {"name": "Defect1"},
                                        {"name": "Defect1"}
                                    ]
                                },
                                {
                                    "name": "story7",
                                    "children": [
                                        {"name": "Defect"},
                                        {"name": "Defect1"},
                                        {"name": "Defect"},
                                        {"name": "Defect"},
                                        {"name": "Defect"},
                                        {"name": "Defect"},
                                        {"name": "Defect"},
                                        {"name": "Defect"},
                                        {"name": "Defect"},
                                        {"name": "Defect"},
                                        {"name": "Defect"},
                                        {"name": "Defect"},
                                        {"name": "Defect"},
                                        {"name": "Defect"},
                                        {"name": "Defect"},
                                        {"name": "Defect"},
                                        {"name": "Defect"},
                                        {"name": "Defect"},
                                        {
                                            "name": "TestCases",
                                            "children": [
                                                {"name": "TestCase"},
                                                {"name": "TestCase"},
                                                {"name": "TestCase"}
                                           
                                            ]
                                        },
                                        {
                                            "name": "UseCases",
                                            "children": [
                                                {"name": "UseCase"},
                                                {"name": "UseCase"},
                                                {"name": "UseCase"}
                                           
                                            ]
                                        }
                                      ]
                                    
                                },
                                {
                                    "name": "story8",
                                    "children": [
                                        {"name": "Defect"},
                                        {"name": "Defect1"},
                                        {"name": "Defect"},
                                        {"name": "Defect"},
                                        {"name": "Defect"},
                                        {"name": "Defect"},
                                        {"name": "Defect"},
                                        {"name": "Defect"},
                                        {"name": "Defect"},
                                        {"name": "Defect"},
                                        {"name": "Defect"},
                                        {"name": "Defect"},
                                        {"name": "Defect"},
                                        {"name": "Defect"},
                                        {"name": "Defect"},
                                        {"name": "Defect"},
                                        {"name": "Defect"},
                                        {"name": "Defect"},
                                        {
                                            "name": "TestCases",
                                            "children": [
                                                {"name": "TestCase"},
                                                {"name": "TestCase"},
                                                {"name": "TestCase"}
                                           
                                            ]
                                        },
                                        {
                                            "name": "UseCases",
                                            "children": [
                                                {"name": "UseCase"},
                                                {"name": "UseCase"},
                                                {"name": "UseCase"}
                                           
                                            ]
                                        }
                                      ]
                                    
                                },
                                {
                                    "name": "story9",
                                    "children": [
                                        {"name": "Defect"},
                                        {"name": "Defect1"},
                                        {"name": "Defect"},
                                        {"name": "Defect"},
                                        {"name": "Defect"},
                                        {"name": "Defect"},
                                        {"name": "Defect"},
                                        {"name": "Defect"},
                                        {"name": "Defect"},
                                        {"name": "Defect"},
                                        {"name": "Defect"},
                                        {"name": "Defect"},
                                        {"name": "Defect"},
                                        {"name": "Defect"},
                                        {"name": "Defect"},
                                        {"name": "Defect"},
                                        {"name": "Defect"},
                                        {"name": "Defect"},
                                        {
                                            "name": "TestCases",
                                            "children": [
                                                {"name": "TestCase"},
                                                {"name": "TestCase"},
                                                {"name": "TestCase"}
                                           
                                            ]
                                        },
                                        {
                                            "name": "UseCases",
                                            "children": [
                                                {"name": "UseCase"},
                                                {"name": "UseCase"},
                                                {"name": "UseCase"}
                                           
                                            ]
                                        }
                                      ]
                                    
                                },
                                {
                                    "name": "story10",
                                    "children": [
                                        {"name": "Defect"},
                                        {"name": "Defect1"},
                                        {"name": "Defect"},
                                        {"name": "Defect"},
                                        {"name": "Defect"},
                                        {"name": "Defect"},
                                        {"name": "Defect"},
                                        {"name": "Defect"},
                                        {"name": "Defect"},
                                        {"name": "Defect"},
                                        {"name": "Defect"},
                                        {"name": "Defect"},
                                        {"name": "Defect"},
                                        {"name": "Defect"},
                                        {"name": "Defect"},
                                        {"name": "Defect"},
                                        {"name": "Defect"},
                                        {"name": "Defect"},
                                        {
                                            "name": "TestCases",
                                            "children": [
                                                {"name": "TestCase"},
                                                {"name": "TestCase"},
                                                {"name": "TestCase"}
                                           
                                            ]
                                        },
                                        {
                                            "name": "UseCases",
                                            "children": [
                                                {"name": "UseCase"},
                                                {"name": "UseCase"},
                                                {"name": "UseCase"}
                                           
                                            ]
                                        }
                                      ]
                                    
                                },
                                {
                                    "name": "story11",
                                    "children": [
                                        {"name": "Defect"},
                                        {"name": "Defect1"},
                                        {"name": "Defect"},
                                        {"name": "Defect"},
                                        {"name": "Defect"},
                                        {"name": "Defect"},
                                        {"name": "Defect"},
                                        {"name": "Defect"},
                                        {"name": "Defect"},
                                        {"name": "Defect"},
                                        {"name": "Defect"},
                                        {"name": "Defect"},
                                        {"name": "Defect"},
                                        {"name": "Defect"},
                                        {"name": "Defect"},
                                        {"name": "Defect"},
                                        {"name": "Defect"},
                                        {"name": "Defect"},
                                        {
                                            "name": "TestCases",
                                            "children": [
                                                {"name": "TestCase"},
                                                {"name": "TestCase"},
                                                {"name": "TestCase"}
                                           
                                            ]
                                        },
                                        {
                                            "name": "UseCases",
                                            "children": [
                                                {"name": "UseCase"},
                                                {"name": "UseCase"},
                                                {"name": "UseCase"}
                                           
                                            ]
                                        }
                                      ]
                                    
                                },
                                {
                                    "name": "story12"                             
                                    
                                },
                                {
                                    "name": "story13",
                                    "children": [
                                        {"name": "Defect"},
                                        {"name": "Defect1"},
                                        {"name": "Defect"},
                                        {"name": "Defect"},
                                        {"name": "Defect"},
                                        {"name": "Defect"},
                                        {"name": "Defect"},
                                        {"name": "Defect"},
                                        {"name": "Defect"},
                                        {"name": "Defect"},
                                        {"name": "Defect"},
                                        {"name": "Defect"},
                                        {"name": "Defect"},
                                        {"name": "Defect"},
                                        {"name": "Defect"},
                                        {"name": "Defect"},
                                        {"name": "Defect"},
                                        {"name": "Defect"},
                                        {
                                            "name": "TestCases",
                                            "children": [
                                                {"name": "TestCase"},
                                                {"name": "TestCase"},
                                                {"name": "TestCase"}
                                           
                                            ]
                                        },
                                        {
                                            "name": "UseCases",
                                            "children": [
                                                {"name": "UseCase"},
                                                {"name": "UseCase"},
                                                {"name": "UseCase"}
                                           
                                            ]
                                        }
                                      ]
                                    
                                },
                                {
                                    "name": "story14",
                                    "children": [
                                        {"name": "Defect"},
                                        {"name": "Defect1"},
                                        {"name": "Defect"},
                                        {"name": "Defect"},
                                        {"name": "Defect"},
                                        {"name": "Defect"},
                                        {"name": "Defect"},
                                        {"name": "Defect"},
                                        {"name": "Defect"},
                                        {"name": "Defect"},
                                        {"name": "Defect"},
                                        {"name": "Defect"},
                                        {"name": "Defect"},
                                        {"name": "Defect"},
                                        {"name": "Defect"},
                                        {"name": "Defect"},
                                        {"name": "Defect"},
                                        {"name": "Defect"},
                                        {
                                            "name": "TestCases",
                                            "children": [
                                                {"name": "TestCase"},
                                                {"name": "TestCase"},
                                                {"name": "TestCase"}
                                           
                                            ]
                                        },
                                        {
                                            "name": "UseCases",
                                            "children": [
                                                {"name": "UseCase"},
                                                {"name": "UseCase"},
                                                {"name": "UseCase"}
                                           
                                            ]
                                        }
                                      ]
                                    
                                },
                                {
                                    "name": "story15",
                                   
                                    
                                }
                                ]}, {"name": "Skills","children":[

                                                                  {
                                                                      "name":"SQA Testing & Methodologies"
                                                                      
                                                                  },
                                                                  {
                                                                      "name":"Test Plans, Cases & Processes"
                                                                  },
                                                                  {
                                                                      "name":"Functional Requirements"
                                                                  },
                                                                  {
                                                                      "name":"Scripting & Documentation"
                                                                  },
                                                                  {
                                                                      "name":"Regression & Negative Testing"
                                                                  }, 
                                                                  {
                                                                      "name":"UI & Compatibility Testing"
                                                                  }, 
                                                                  {
                                                                      "name":"Data Interface & Migration Testing"
                                                                  }, 
                                                                  {
                                                                      "name":"Testing Automation"
                                                                  }, 
                                                                  {
                                                                      "name":"Defect/Bug Tracking"
                                                                  },
                                                                  {
                                                                      "name":"Test Strategies & Coverages"
                                                                  },
                                                                  {
                                                                      "name":"QA & QC Standards"
                                                                  }

                                                              ]}]
                         
                        }
                    ]

   /***************** Developement Insights -SunBurst 2  **********/
        
        $scope.optionsDevSunBurst = {
                chart: {
                    type: 'sunburstChart',
                    height: 250,
                    showLabels: true,
                    labelThreshold: 0.01,
                    labelSunbeamLayout: true,
                    showControls: true,
                    showValues: true,
                    color: d3.scale.category20c(),
                    duration: 150
                }
            };
        $scope.dataDevSunBurst = [{
                "name": "Project",
                "children": [
                    {
                        "name": "Resources",
                        "children": [
                            {
                                "name": "HardWare",
                                "children": [
                                    {"name": "HardWare Acquired",
                                    "children": [
                                    {"name": "HW1"},
                                    {"name": "HW2"},
                                    {"name": "HW3"},
                                    {"name": "HW4"},
                                    {"name": "HW5"}
                                ]},
                                    {"name": "HardWare Yet To Acquire",
                                    "children": [
                                    {"name": "HW11"},
                                    {"name": "HW8"},
                                    {"name": "HW9"}                                   
                                ]},
                                   
                                ]
                            },
                            {
                                "name": "People",
                                "children": [
                                    {"name": "People Yet To Onboard",
                                    "children": [
                                    {"name": "P1"},
                                    {"name": "P2"}
                                    
                                ]},
                                    {"name": "People Onboarded",
                                    "children": [
                                    {"name": "P6"},
                                    {"name": "P7"},
                                    {"name": "P8"},
                                    {"name": "P3"},
                                    {"name": "P4"},
                                    {"name": "P5"}                                   
                                ]},
                                   
                                ]
                            }
                        ]
                    },
                    {
                        "name": "Skills",
                        "children": [
                            {"name": "Development", "children": [
                                    {"name": "P1", 
                                    "children":[{"name":"Java", "size" : 1},{"name":"J2EE", "size" : 3},{"name":"JSP" ,"size" : 4},{"name":"Node js", "size" : 5}]},
                                    {"name": "P2", 
                                    "children":[{"name":"Js", "size" : 5},{"name":"Angular JS", "size" : 3},{"name":"JSP", "size" : 2}]},
                                    {"name": "p3", 
                                    "children":[{"name":"Js", "size" : 1},{"name":"Angular JS", "size" : 2},{"name":"JSP", "size" : 5}]},
                                    {"name": "P4", 
                                    "children":[{"name":"React.js", "size" : 2},{"name":"Angular JS", "size" : 3},{"name":"JSP", "size" : 1}]},
                                    {"name": "P7", 
                                    "children":[{"name":"D3.js", "size" : 1},{"name":"REST Service", "size" : 3},{"name":"C", "size" : 4}]}
                                   
                                ]}
                        ]
                    },
                    {
                        "name": "Dependency",
                        "children": [
                            {
                                "name": "Features",
                                "children": [
                                    {"name": "Feature1", "children":[{"name":"D1"},{"name":"D2"},{"name":"D3"}]},
                                    {"name": "Feature2", "children":[{"name":"D1"},{"name":"D4"},{"name":"D6"},{"name":"D7"}]},
                                    {"name": "Feature3", "children":[{"name":"D4"},{"name":"D1"}]},
                                    {"name": "Feature5", "children":[{"name":"D7"},{"name":"D2"}]},
                                    {"name": "Feature6", "children":[{"name":"D2"},{"name":"D1"},{"name":"D4"},{"name":"D5"}]}
                                ]
                            }
                        ]
                    },
                    
                ]
            }];

/***************** Defect Status - MultiBarChart *********/
    $scope.optionsDefectStatus = {
              chart: {
                  type: 'multiBarChart',
                  height: 300,
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
                  axisLabel: 'Per Week',
                    showMaxMin: false,
                    tickFormat: function(d) {
                        return d3.time.format('%x')(new Date(d))
                    }
                },
                  yAxis: {
                      axisLabel: 'Nos of Builds',
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
           
             

              values0.push({x: 1482728400000, y: 0});
              values1.push({x: 1482728400000, y: 0});

         
              values0.push({x: 1483333200000, y: 0});
              values1.push({x: 1483333200000, y: 0});

                values0.push({x: 1483938000000, y: 0});
              values1.push({x: 1483938000000, y: 0});

               
                values0.push({x: 1484542800000, y: 3});
              values1.push({x: 1484542800000, y: 1});

                values0.push({x: 1485147600000, y: 3});
              values1.push({x: 1485147600000, y: 2});

               values0.push({x: 1485752400000, y: 15});
              values1.push({x: 1485752400000, y: 2});

                values0.push({x: 1486357200000, y: 14});
              values1.push({x: 1486357200000, y: 0});

                values0.push({x: 1486962000000, y: 15});
              values1.push({x: 1486962000000, y: 5});


              values0.push({x: 1487566800000, y: 20});
              values1.push({x: 1487566800000, y: 0});


              values0.push({x: 1488171600000, y: 10});
              values1.push({x: 1488171600000, y: 8});

               values0.push({x: 1488776400000, y: 15});
              values1.push({x: 1488776400000, y: 10});

               values0.push({x: 1489381200000, y: 15});
              values1.push({x: 1489381200000, y: 10});

               values0.push({x: 1489986000000, y: 0});
              values1.push({x: 1489986000000, y: 0});

              values0.push({x: 1490590800000, y: 0});
              values1.push({x: 1490590800000, y: 0});

          return [
            {
              key: 'Success',
              color: '#aec7e8',
              values: values0
            },
            {
              key: 'Failed',
              color: '#e77338',
              values: values1
            }
          ];
        }
    //MultiBarChart end here

  //Build and deploy Chart 
  $scope.optionsBuildTimetaked =  {
            chart: {
                type: 'stackedAreaChart',
                height: 300,
                margin : {
                    top: 20,
                    right: 30,
                    bottom: 40,
                    left: 60
                },
                x: function(d){return d[0];},
                y: function(d){return d[1];},
                useVoronoi: false,
                clipEdge: true,
                duration: 100,
                useInteractiveGuideline: true,
                xAxis: {
                  axisLabel: 'Per Day',
                    showMaxMin: false,
                    tickFormat: function(d) {
                        return d3.time.format('%x')(new Date(d))
                    }
                },
                yAxis: {
                  axisLabel: 'Avarage Time taken in minutes',
                    tickFormat: function(d){
                        return d3.format(',.2f')(d);
                    }
                },
                zoom: {
                    enabled: false,
                   //scaleExtent: [1, 10],
                    useFixedDomain: false,
                    useNiceScale: false,
                    horizontalOff: false,
                    verticalOff: true,
                    //unzoomEventType: 'dblclick.zoom'
                }
            }
        };

        $scope.dataBuildTimetaken = [
            {
                "key" : "Avarage time taken for Success Build / day  " ,
                "values" : [ [ 1484542800000 , 21.02286281168] , [ 1484629200000 , 22.093608385173] , [ 1484888400000 , 25.108079299458] , [ 1484974800000 , 26.982389242348] , [ 1485061200000 , 19.828984957662] , [ 1485147600000 , 19.914055036294] , [ 1485234000000 , 19.436150539916] , [ 1485320400000 , 21.558650338602] , [ 1485406800000 , 24.395594061773] , [ 1485493200000 , 24.747089309384] , [ 1485579600000 , 23.491755498807] , [ 1485666000000 , 23.376634878164] , [ 1485752400000 , 24.581223154533] , [ 1485925200000 , 24.922476843538] , [ 1486011600000 , 27.357712939042] , [ 1486098000000 , 26.503020572593] , [ 1486184400000 , 26.658901244878] , [ 1486270800000 , 27.065704156445] , [ 1486357200000 , 28.735320452588] , [ 1486443600000 , 31.572277846319] , [ 1486530000000 , 30.932161503638] , [ 1486616400000 , 31.627029785554] , [ 1486702800000 , 28.728743674232] , [ 1486789200000 , 26.858365172675] , [ 1486875600000 , 27.279922830032] , [ 1486962000000 , 34.408301211324] , [ 1487048400000 , 34.794362930439] , [ 1487134800000 , 35.609978198951] , [ 1487221200000 , 33.574394968037] , [ 1487307600000 , 31.979405070598] , [ 1487394000000 , 31.19009040297] , [ 1487480400000 , 31.083933968994] , [ 1487566800000 , 29.668971113185]] //, [ 1117512000000 , 31.490638014379] , [ 1120104000000 , 31.818617451128] , [ 1122782400000 , 32.960314008183] , [ 1125460800000 , 31.313383196209] , [ 1128052800000 , 33.125486081852] , [ 1130734800000 , 32.791805509149] , [ 1133326800000 , 33.506038030366] , [ 1136005200000 , 26.96501697216] , [ 1138683600000 , 27.38478809681] , [ 1141102800000 , 27.371377218209] , [ 1143781200000 , 26.309915460827] , [ 1146369600000 , 26.425199957518] , [ 1149048000000 , 26.823411519396] , [ 1151640000000 , 23.850443591587] , [ 1154318400000 , 23.158355444054] , [ 1156996800000 , 22.998689393695] , [ 1159588800000 , 27.9771285113] , [ 1162270800000 , 29.073672469719] , [ 1164862800000 , 28.587640408904] , [ 1167541200000 , 22.788453687637] , [ 1170219600000 , 22.429199073597] , [ 1172638800000 , 22.324103271052] , [ 1175313600000 , 17.558388444187] , [ 1177905600000 , 16.769518096208] , [ 1180584000000 , 16.214738201301] , [ 1183176000000 , 18.729632971229] , [ 1185854400000 , 18.814523318847] , [ 1188532800000 , 19.789986451358] , [ 1191124800000 , 17.070049054933] , [ 1193803200000 , 16.121349575716] , [ 1196398800000 , 15.141659430091] , [ 1199077200000 , 17.175388025297] , [ 1201755600000 , 17.286592443522] , [ 1204261200000 , 16.323141626568] , [ 1206936000000 , 19.231263773952] , [ 1209528000000 , 18.446256391095] , [ 1212206400000 , 17.822632399764] , [ 1214798400000 , 15.53936647598] , [ 1217476800000 , 15.255131790217] , [ 1220155200000 , 15.660963922592] , [ 1222747200000 , 13.254482273698] , [ 1225425600000 , 11.920796202299] , [ 1228021200000 , 12.122809090924] , [ 1230699600000 , 15.691026271393] , [ 1233378000000 , 14.720881635107] , [ 1235797200000 , 15.387939360044] , [ 1238472000000 , 13.765436672228] , [ 1241064000000 , 14.631445864799] , [ 1243742400000 , 14.292446536221] , [ 1246334400000 , 16.170071367017] , [ 1249012800000 , 15.948135554337] , [ 1251691200000 , 16.612872685134] , [ 1254283200000 , 18.778338719091] , [ 1256961600000 , 16.756026065421] , [ 1259557200000 , 19.385804443146] , [ 1262235600000 , 22.950590240168] , [ 1264914000000 , 23.61159018141] , [ 1267333200000 , 25.708586989581] , [ 1270008000000 , 26.883915999885] , [ 1272600000000 , 25.893486687065] , [ 1275278400000 , 24.678914263176] , [ 1277870400000 , 25.937275793024] , [ 1280548800000 , 29.461381693838] , [ 1283227200000 , 27.357322961861] , [ 1285819200000 , 29.057235285673] , [ 1288497600000 , 28.549434189386] , [ 1291093200000 , 28.506352379724] , [ 1293771600000 , 29.449241421598] , [ 1296450000000 , 25.796838168807] , [ 1298869200000 , 28.740145449188] , [ 1301544000000 , 22.091744141872] , [ 1304136000000 , 25.07966254541] , [ 1306814400000 , 23.674906973064] , [ 1309406400000 , 23.418002742929] , [ 1312084800000 , 23.24364413887] , [ 1314763200000 , 31.591854066817] , [ 1317355200000 , 31.497112374114] , [ 1320033600000 , 26.67238082043] , [ 1322629200000 , 27.297080015495] , [ 1325307600000 , 20.174315530051] , [ 1327986000000 , 19.631084213898] , [ 1330491600000 , 20.366462219461] , [ 1333166400000 , 19.284784434185] , [ 1335758400000 , 19.157810257624]]
            },

            {
                "key" : "Avarage time taken for failure Build / day"  ,
                "values" : [ [ 1484542800000 , 7.9085410566608] , [ 1484629200000 , 5.8996782364764] , [ 1484888400000 , 6.0591869346923] , [ 1484974800000 , 5.9667815800451] , [ 1485061200000 , 8.65528925664] , [ 1485147600000 , 8.7690763386254] , [ 1485234000000 , 8.6386160387453] , [ 1485320400000 , 5.9895557449743] , [ 1485406800000 , 6.3840324338159] , [ 1485493200000 , 6.5196511461441] , [ 1485579600000 , 7.0738618553114] , [ 1485666000000 , 6.5745957367133] , [ 1485752400000 , 6.4658359184444] , [ 1485925200000 , 2.7622758754954] , [ 1486011600000 , 2.9794782986241] , [ 1486098000000 , 2.8735432712019] , [ 1486184400000 , 1.6344817513645] , [ 1486270800000 , 1.5869248754883] , [ 1486357200000 , 1.7172279157246] , [ 1486443600000, 1.9649927409867] , [ 1486530000000 , 2.0261695079196] , [ 1486616400000 , 2.0541261923929] , [ 1486702800000 , 3.9466318927569] , [ 1486789200000 , 3.7826770946089] , [ 1486875600000 , 3.9543021004028] , [ 1486962000000 , 3.8309891064711] , [ 1487048400000 , 3.6340958946166] , [ 1487134800000 , 3.5289755762525] , [ 1487221200000 , 5.702378559857] , [ 1487307600000 , 5.6539569019223] , [ 1487394000000 , 5.5449506370392] , [ 1487480400000 , 4.7579993280677] , [ 1487566800000 , 4.4816139372906]] //, [ 1117512000000 , 4.5965558568606] , [ 1120104000000 , 4.3747066116976] , [ 1122782400000 , 4.4588822917087] , [ 1125460800000 , 4.4460351848286] , [ 1128052800000 , 3.7989113035136] , [ 1130734800000 , 3.7743883140088] , [ 1133326800000 , 3.7727852823828] , [ 1136005200000 , 7.2968111448895] , [ 1138683600000 , 7.2800122043237] , [ 1141102800000 , 7.1187787503354] , [ 1143781200000 , 8.351887016482] , [ 1146369600000 , 8.4156698763993] , [ 1149048000000 , 8.1673298604231] , [ 1151640000000 , 5.5132447126042] , [ 1154318400000 , 6.1152537710599] , [ 1156996800000 , 6.076765091942] , [ 1159588800000 , 4.6304473798646] , [ 1162270800000 , 4.6301068469402] , [ 1164862800000 , 4.3466656309389] , [ 1167541200000 , 6.830104897003] , [ 1170219600000 , 7.241633040029] , [ 1172638800000 , 7.1432372054153] , [ 1175313600000 , 10.608942063374] , [ 1177905600000 , 10.914964549494] , [ 1180584000000 , 10.933223880565] , [ 1183176000000 , 8.3457524851265] , [ 1185854400000 , 8.1078413081882] , [ 1188532800000 , 8.2697185922474] , [ 1191124800000 , 8.4742436475968] , [ 1193803200000 , 8.4994601179319] , [ 1196398800000 , 8.7387319683243] , [ 1199077200000 , 6.8829183612895] , [ 1201755600000 , 6.984133637885] , [ 1204261200000 , 7.0860136043287] , [ 1206936000000 , 4.3961787956053] , [ 1209528000000 , 3.8699674365231] , [ 1212206400000 , 3.6928925238305] , [ 1214798400000 , 6.7571718894253] , [ 1217476800000 , 6.4367313362344] , [ 1220155200000 , 6.4048441521454] , [ 1222747200000 , 5.4643833239669] , [ 1225425600000 , 5.3150786833374] , [ 1228021200000 , 5.3011272612576] , [ 1230699600000 , 4.1203601430809] , [ 1233378000000 , 4.0881783200525] , [ 1235797200000 , 4.1928665957189] , [ 1238472000000 , 7.0249415663205] , [ 1241064000000 , 7.006530880769] , [ 1243742400000 , 6.994835633224] , [ 1246334400000 , 6.1220222336254] , [ 1249012800000 , 6.1177436137653] , [ 1251691200000 , 6.1413396231981] , [ 1254283200000 , 4.8046006145874] , [ 1256961600000 , 4.6647600660544] , [ 1259557200000 , 4.544865006255] , [ 1262235600000 , 6.0488249316539] , [ 1264914000000 , 6.3188669540206] , [ 1267333200000 , 6.5873958262306] , [ 1270008000000 , 6.2281189839578] , [ 1272600000000 , 5.8948915746059] , [ 1275278400000 , 5.5967320482214] , [ 1277870400000 , 0.99784432084837] , [ 1280548800000 , 1.0950794175359] , [ 1283227200000 , 0.94479734407491] , [ 1285819200000 , 1.222093988688] , [ 1288497600000 , 1.335093106856] , [ 1291093200000 , 1.3302565104985] , [ 1293771600000 , 1.340824670897] , [ 1296450000000 , 0] , [ 1298869200000 , 0] , [ 1301544000000 , 0] , [ 1304136000000 , 0] , [ 1306814400000 , 0] , [ 1309406400000 , 0] , [ 1312084800000 , 0] , [ 1314763200000 , 0] , [ 1317355200000 , 4.4583692315] , [ 1320033600000 , 3.6493043348059] , [ 1322629200000 , 3.8610064091761] , [ 1325307600000 , 5.5144800685202] , [ 1327986000000 , 5.1750695220791] , [ 1330491600000 , 5.6710066952691] , [ 1333166400000 , 5.5611890039181] , [ 1335758400000 , 5.5979368839939]]
            },

            
        ]

//Build and deploy ends here
            $scope.optionsFeatureDevelopement = {
            chart: {
                type: 'linePlusBarChart',
                height: 300,
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
                    axisLabel: 'Per Week',
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
                "values" : [ [ 1482123600000 , 0] , [ 1482728400000 , 0] , [ 1483333200000 , 0] , [ 1483938000000 , 8] , [ 1484542800000 , 11] , [ 1485147600000 , 18] , [ 1485752400000 , 20] , [ 1486357200000 , 18] , [ 1486962000000 , 0] , [ 1487566800000 , 18],[1488171600000 , 20],[1488776400000 , 19],[1489381200000 , 15], [1489986000000 , 17]]
            },
            {
                "key" : "Features Backlog" ,
                "values" : [ [ 1482123600000 , 0] , [ 1482728400000 , 0] , [ 1483333200000 , 0] , [ 1483938000000 , 2] , [ 1484542800000 , 7] , [ 1485147600000 , 9], [ 1485752400000 , 12] , [ 1486357200000 , 14] , [ 1486962000000 , 0] , [ 1487566800000 , 16],[1488171600000 , 18] ,[1488776400000 , 10],[1489381200000 , 6],[1489986000000 , 8] ]
            }
        ].map(function(series) {
                series.values = series.values.map(function(d) { return {x: d[0], y: d[1] } });
                return series;
            });


});
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
	                  axisLabel: 'Nos of Builds and Deploy',
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
	       
              values0.push({x: 'July', y: 500});
              values1.push({x: 'July', y: 300});

                values0.push({x: 'Aug', y: 300});
              values1.push({x: 'Aug', y: 100});

                values0.push({x: 'Sep', y: 700});
              values1.push({x: 'Sep', y: 500});


	          values0.push({x: 'Oct', y: 800});
	          values1.push({x: 'Oct', y: 700});

	        //  values.push({x: 'Nov', y: 700});
	          values0.push({x: 'Nov', y: 700});
	          values1.push({x: 'Nov', y: 400});

	      //    values.push({x: 'Dec', y: 1100});
	          values0.push({x: 'Dec', y: 200});
	          values1.push({x: 'Dec', y: 100});

	      //    values.push({x: 'Jan', y: 600});
	          values0.push({x: 'Jan', y: 500});
	          values1.push({x: 'Jan', y: 100});

	      //    values.push({x: 'Feb', y: 200});
	          values0.push({x: 'Feb', y: 200});
	          values1.push({x: 'Feb', y: 100});

                values0.push({x: 'Mar', y: 600});
              values1.push({x: 'Mar', y: 100});

               
                values0.push({x: 'April', y: 200});
              values1.push({x: 'April', y: 500});

                values0.push({x: 'May', y: 400});
              values1.push({x: 'May', y: 100});


	        //}

	      return [/*{
	        key: 'Filed',
	        color: '#1f77b4',
	        //color: '#bcbd22',
	        values: values
	        },*/
	        {
	          key: 'Sucess',
	          color: '#aec7e8',
	          values: values0
	        },
	        {
	          key: 'Failed',
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





