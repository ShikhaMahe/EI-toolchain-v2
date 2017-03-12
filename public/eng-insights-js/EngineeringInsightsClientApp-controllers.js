var myAPIClientApp_controllers = angular.module(
		'EngineeringInsightsClientApp.controllers', []);

// create the controller and inject Angular's $scope

myAPIClientApp_controllers.controller('mainController', function($scope) {

	// create a message to display in our view

	$scope.message = 'Home Page';
	$scope.showDefectDetails = false;
	$scope.showTwoQ = true;
	document.getElementById("getTestSubmit").disabled = false;

});

 
  myAPIClientApp_controllers
		.controller(
				'demoCtrl',
				[
						'SweetAlert',
						function(SweetAlert) {
							
							
							var vm = this;
							vm.alert = function(alert) {
								SweetAlert
										.swal(alert); //simple alert
							}
						
							
							vm.confirm = function() {
								SweetAlert
										.swal(
												{
													title : "Are you sure?", //Bold text
													text : "Your will not be able to recover this imaginary file!", //light text
													type : "warning", //type -- adds appropiriate icon
													showCancelButton : true, // displays cancel btton
													confirmButtonColor : "#DD6B55",
													confirmButtonText : "Yes, delete it!",
													closeOnConfirm : false, //do not close popup after click on confirm, usefull when you want to display a subsequent popup
													closeOnCancel : false
												},
												function(isConfirm) { //Function that triggers on user action.
													if (isConfirm) {
														SweetAlert
																.swal("Deleted!");
													} else {
														SweetAlert
																.swal("Your file is safe!");
													}
												});
							}
						} ]);
	

myAPIClientApp_controllers.controller('headerController', function($scope,
		$http) {

	$http.get('json/projectnames.json').success(function(data, status) {
		$scope.projectnames = data;
		$scope.projectname = data[0];
		console.log($scope.projectnames);
	}).error(function(data, status) {

	});

	$scope.select = function(item) {
		$scope.projectname = item;
	};

});

myAPIClientApp_controllers.controller('loginController', function($scope) {
});

myAPIClientApp_controllers.controller('modalCtrl', [ '$modalInstance',
		'$scope', '$log', function($modalInstance, $scope, $log, option) {
			
		} ]);

myAPIClientApp_controllers
		.controller(
				'landingController',
				function($scope, $timeout, $http, $modal) {
					
					$("#pbreq").hover(function () {
					    $('#modalreq').modal({
					        show: true,
					        backdrop: true
					    })
					});

					$("#pbdev").hover(function () {
					    $('#modaldev').modal({
					        show: true,
					        backdrop: true
					    })
					});
					
					$("#pbbnd").hover(function () {
					    $('#modalbnd').modal({
					        show: true,
					        backdrop: true
					    })
					});
					
					$("#pbtest").hover(function () {
					    $('#modaltest').modal({
					        show: true,
					        backdrop: true
					    })
					});					

					$scope.closeReqDetails = function() {
						   $('#modalreq').modal({
						        show: false,
						        backdrop: true
						    })
					};
					
					$scope.showMouseHoverDetails = function() {
						
						$scope.Modal = $modal
								.open({
									//template : '<div class="modal" style="left: 62px; height:840px;"><div class="modal-body" style="left: 62px; height:840px;">message</div><div class="modal-footer"></div></div>',
									controller : 'modalCtrl',

								});
					};

					

					$('.progress').tooltip();
					$http
							.get('json/timeline.json')
							.success(
									function(data, status) {
										console.log("function called",
												data.projectname);
										console.log("function body", data.body);

										for (var i = 0; i < data.body.length; i++) {
											var phaseString = data.body[i];
											if (phaseString.id == "requirements") {

												if (phaseString.status == "success") {
													$scope.requirementGreenStatus = true;
													$scope.requirementYellowStatus = false;
													$scope.requirementRedStatus = false;
													$scope.reqcolor = "#5EBB5E";
												} else if (phaseString.status == "warning") {
													$scope.requirementGreenStatus = false;
													$scope.requirementYellowStatus = true;
													$scope.requirementRedStatus = false;
													$scope.reqcolor = "#F58F1C";
												} else if (phaseString.status == "danger") {
													$scope.requirementGreenStatus = false;
													$scope.requirementYellowStatus = false;
													$scope.requirementRedStatus = true;
													$scope.reqcolor = "#D63D3E";
												}

												$scope.requirementPercentage = phaseString.percentage;

									/*			$scope.requirementTopPop = "Frozen:"
														+ phaseString.completed
														+ "\nPending:"
														+ phaseString.pending
														+ "\nDuration:"
														+ phaseString.duration;
*/
												$scope.requirementTopPop = phaseString.staticPopOver;
												$scope.requirementDataContent = phaseString.healthInfo;

												console
														.log($scope.requirementDataContent);

											} else if (phaseString.id == "development") {
												console.log("phase body",
														phaseString.status);
												if (phaseString.status == "success") {
													$scope.developmentGreenStatus = true;
													$scope.developmentYellowStatus = false;
													$scope.developmentRedStatus = false;
													$scope.devcolor = "#5EBB5E";
												} else if (phaseString.status == "warning") {
													$scope.developmentGreenStatus = false;
													$scope.developmentYellowStatus = true;
													$scope.developmentRedStatus = false;
													$scope.devcolor = "#F58F1C";
												} else if (phaseString.status == "danger") {

													$scope.developmentGreenStatus = false;
													$scope.developmentYellowStatus = false;
													$scope.developmentRedStatus = true;
													console
															.log($scope.developmentRedStatus);
													$scope.devcolor = "#D63D3E";
												}
												$scope.developmentPercentage = phaseString.percentage;

											/*	$scope.developmentTopPop = "WorkItems Completed:"
														+ phaseString.completed
														+ "\nWorkItems Pending:"
														+ phaseString.pending
														+ "Duration:"
														+ phaseString.duration;
*/
												$scope.developmentDataContent = phaseString.healthInfo;
												$scope.developmentTopPop = phaseString.staticPopOver;

											} else if (phaseString.id == "build&deploy") {
												console.log("phase body",
														phaseString.status);
												if (phaseString.status == "success") {
													$scope.builddeployGreenStatus = true;
													$scope.builddeployYellowStatus = false;
													$scope.builddeployRedStatus = false;
													$scope.bndcolor = "#5EBB5E";
												} else if (phaseString.status == "warning") {
													$scope.builddeployGreenStatus = false;
													$scope.builddeployYellowStatus = true;
													$scope.builddeployRedStatus = false;
													$scope.bndcolor = "#F58F1C";
												} else if (phaseString.status == "danger") {
													$scope.builddeployGreenStatus = false;
													$scope.builddeployYellowStatus = false;
													$scope.builddeployRedStatus = true;
													$scope.bndcolor = "#D63D3E";
												}
												$scope.builddeployPercentage = phaseString.percentage;

											/*	$scope.builddeployTopPop = "Build Successful:"
														+ phaseString.completed
														+ "\nBuild Failed:"
														+ phaseString.pending
														+ "Duration:"
														+ phaseString.duration;
*/
												$scope.builddeployDataContent = phaseString.healthInfo;
												
												$scope.builddeployTopPop = phaseString.staticPopOver;
											} else if (phaseString.id == "test") {
												console.log("phase body",
														phaseString.status);
												if (phaseString.status == "success") {
													$scope.testGreenStatus = true;
													$scope.testYellowStatus = false;
													$scope.testRedStatus = false;
													$scope.testcolor = "#5EBB5E";
												} else if (phaseString.status == "warning") {
													$scope.testGreenStatus = false;
													$scope.testYellowStatus = true;
													$scope.testRedStatus = false;
													$scope.testcolor = "#F58F1C";
												} else if (phaseString.status == "danger") {
													$scope.testGreenStatus = false;
													$scope.testYellowStatus = false;
													$scope.testRedStatus = true;
													$scope.testcolor = "#D63D3E";
												}
												$scope.testPercentage = phaseString.percentage;

										/*		$scope.testTopPop = "Stories Tested:"
														+ phaseString.completed
														+ "\nStories Pending:"
														+ phaseString.pending
														+ "Duration:"
														+ phaseString.duration;
*/
												$scope.testDataContent = phaseString.healthInfo;
												$scope.testTopPop = phaseString.staticPopOver;
											}
										}
									}).error(function(data, status) {
							});

					$('.mypopover').popover('show');

					$(document).ready(function() {
						$('[data-toggle="popover fade bottom in"]').popover({
							placement : 'bottom',
							trigger : 'hover',
							delay : {
								"show" : 500,
								"hide" : 300
							},

						});
					});

					$scope.devAnalyzedClicked = function() {

						if ($scope.showAnalyzedDev) {
							$scope.showAnalyzedDev = false;
						} else if($scope.showAnalyzedTest){
							$scope.showAnalyzedTest = false;
						}
						else {
							$scope.showAnalyzedDev = true;
							$scope.showAnalyzedTest = false;
						}
					};

					$scope.devOptimizeNo = function() {

						if ($scope.showAnalyzedDev) {
							$scope.showAnalyzedDev = false;
						} else {
							$scope.showAnalyzedDev = true;
							$scope.showAnalyzedTest = false;
						}
					};

					$scope.startAjax = function() {
						$http.get('json/sunburst.json')

					};

					
					$scope.devOptimizeSuccessMsg = "Successfully ingested the development optimization into the planning stage!";
					$scope.devOptimizeYes = function() {

						if ($scope.showAnalyzedDev) {
							$scope.showAnalyzedDev = false;
						} else {
							$scope.showAnalyzedDev = true;
							$scope.showAnalyzedTest = false;
						}
					};

					$scope.testAnalyzedClicked = function() {
						if ($scope.showAnalyzedTest) {
							$scope.showAnalyzedTest = false;
						} else {
							$scope.showAnalyzedTest = true;
							$scope.showAnalyzedDev = false;
						}
					};
					
					$scope.testOptimizeSuccessMsg = "Successfully ingested the testing optimization into the planning stage!";
					$scope.testOptimizeYes = function() {

						if ($scope.showAnalyzedTest) {
							$scope.showAnalyzedTest = false;
						} else {
							$scope.showAnalyzedTest = true;
							$scope.showAnalyzedDev = false;
						}
					};
					
					$scope.testOptimizeNo = function() {

						if ($scope.showAnalyzedTest) {
							$scope.showAnalyzedTest = false;
						} else {
							$scope.showAnalyzedTest = true;
							$scope.showAnalyzedDev = false;
						}
					};

					$scope.testAnalyzedClicked = function() {
						if ($scope.showAnalyzedTest) {
							$scope.showAnalyzedTest = false;
						} else {
							$scope.showAnalyzedTest = true;
							$scope.showAnalyzedDev = false;
						}
					};

					window.onclick = function() {
						/*
						 * if (flgIsHide) { var scope =
						 * angular.element(document.getElementById('controller1')).scope();
						 * scope.safeApply(function () { scope.items.forEach(function (item) {
						 * item.isSelected = false; }); scope.selectedItemImage = "#"; }); } else
						 * flgIsHide = true;
						 */

						$scope.showAnalyzeTest = false;
						//$scope.showAnalyzeTest = false;
						$scope.showAnalyzedDev = false;
					}

					//For optimizetestcase
					optimizeTestcase = function() {
/**						//For Butterfly
						window
								.open(
										"/optimizetestcase",
										"mywindow",
										"left=0,top=0,width=1050,height=810,scrollbars=no,toolbar=no,directories=no,status=no,menubar=no,copyhistory=no,resizable=yes")
								.focus();
**/								
						//For Tree
						$(".testcaseoptimizer-iframe").colorbox({iframe:true, width:"80%", height:"80%",href:"/optimizetestcase"});
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
      $scope.totalreusableassert="1"; 
      $scope.showAnalyzedTest = false;
	  $scope.showAnalyzedDev = false;
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
     
      $http.get('json/optimizedDevelopmentData.json').
              success(function(data, status) {                
                 
                  $scope.totalreusableassert=data.phase[0].totalNoOfReusableProducts;                  
                  $scope.reusbleproducts=data.phase[0].reusableProducts;
                  $scope.skilllevel=data.phase[0].requiredSkillLevelOfProduct;
                  $scope.totalskilllevel=data.phase[0].totalSkillLevelOfProduct;
              }).error(function(data, status) {  
                alert("error"+data);
          });
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
       $http.get('json/optimizedDevelopmentData.json').
              success(function(data, status) {            
                 
                  $scope.totalreusableassert=data.phase[1].totalNoOfReusableProducts;                  
                  $scope.reusbleproducts=data.phase[1].reusableProducts;
                  $scope.skilllevel=data.phase[1].requiredSkillLevelOfProduct;
                  $scope.totalskilllevel=data.phase[1].totalSkillLevelOfProduct;
              }).error(function(data, status) {  
                alert("error"+data);
          }); 
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
 /************* Requirements Progress - multiBarChart  *********/
    

              $scope.optionsRequirementProgress = {
            chart: {
                type: 'multiBarHorizontalChart',  // Change type to multiBarHorizontalChart , to see Horizontal graph
                height: 250,
                x: function(d){return d.label;},
                y: function(d){return d.value;},
                showControls: false,
                showValues: true,
                duration: 500,
                stacked: false,
                xAxis: {
                    axisLabel: 'Per Day',
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
        $http.get('json/requirementGraphData.json').
              success(function(data, status) {                
                  $scope.dataRequirementProgress = data;                  
              }).error(function(data, status) {  
                alert("error"+data);
          }); 
       
      

d3.json("json/developmentGraphData.json",function dataFeatureDevelopementfun(data){

            $scope.optionsFeatureDevelopement = {
            chart: {
                type: 'multiBarChart',  // Change type to multiBarHorizontalChart , to see Horizontal graph
                height: 300,
                x: function(d){return d.label;},
                y: function(d){return d.value;},
                showControls: false,
                showValues: true,
                duration: 500,
                stacked: false,
                xAxis: {
                    axisLabel: 'Per Day',
                    showMaxMin: true                        
                },
                yAxis: {
                    axisLabel: 'Number of WorkItems',
                    tickFormat: function(d){
                        return d3.format(',.2f')(d);
                    }
                }
            }
        };
        $scope.dataFeatureDevelopement = data;
        });

  
  d3.json("json/testGraphData.json",function dataFeaturetestfun(data){

            $scope.optionsTestDevelopement = {
            chart: {
                type: 'multiBarChart',  // Change type to multiBarHorizontalChart , to see Horizontal graph
                height: 300,
                x: function(d){return d.label;},
                y: function(d){return d.value;},
                showControls: false,
                showValues: true,
                duration: 500,
                stacked: false,
                xAxis: {
                    axisLabel: 'Per Day',
                    showMaxMin: true                        
                },
                yAxis: {
                    axisLabel: 'Numbers',
                    tickFormat: function(d){
                        return d3.format(',.2f')(d);
                    }
                }
            }
        };
        $scope.dataTestDevelopement = data;
        });


d3.json("json/buildGraphData.json",function dataFeatureDevelopementfun(data){

            $scope.optionsDefectStatus = {
            chart: {
                type: 'multiBarChart',  // Change type to multiBarHorizontalChart , to see Horizontal graph
                height: 300,
                x: function(d){return d.label;},
                y: function(d){return d.value;},
                showControls: false,
                showValues: true,
                duration: 500,
                stacked: true,
                xAxis: {
                    axisLabel: 'Per Day',
                    showMaxMin: true                        
                },
                yAxis: {
                    axisLabel: 'Number of Builds',
                    tickFormat: function(d){
                        return d3.format(',.2f')(d);
                    }
                }
            }
        };
        $scope.dataDefectStatus = data;
        });

  d3.json("json/buildInsightGraphData.json",function dataFeatureDevelopementfun(data){

            $scope.optionsBuildTimetaked = {
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
                    useFixedDomain: false,
                    useNiceScale: false,
                    horizontalOff: false,
                    verticalOff: true,                    
                }
            }
        };

        $scope.dataBuildTimetaken = data;
        });
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





