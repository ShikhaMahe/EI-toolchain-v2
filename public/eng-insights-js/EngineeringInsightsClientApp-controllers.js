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

myAPIClientApp_controllers.controller('buildInsightsController', function($scope,$http) {
	 $http.get('json/buildInsights.json').
   success(function(data, status) {
  	 console.log(data);
       $scope.buildinsight=data;
       
   }).error(function(data, status) {  

});
	
});

myAPIClientApp_controllers.controller('compareCtlAfterOptimize', function($scope,$http) {

	 $scope.optionsDevCompareProgress = {
            chart: {
		                type: 'multiBarChart',  // Change type to multiBarHorizontalChart , to see Horizontal graph
		                height: 300,
		                width:600,
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
        $http.get('json/developmentGraphOptimizedData.json').
              success(function(data, status) {                
                  $scope.dataDevOptimizedProgress = data;                  
              }).error(function(data, status) {  
                alert("error"+data);
          }); 
        $http.get('json/developmentPhaseGraphData.json').
              success(function(data, status) {                
                  $scope.dataDevCompareProgress = data;                  
              }).error(function(data, status) {  
                alert("error"+data);
          }); 


           $scope.optionsTestCompareProgress = {
            chart: {
		                type: 'multiBarChart',  // Change type to multiBarHorizontalChart , to see Horizontal graph
		                height: 300,
		                width:600,
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
        $http.get('json/testGraphOptimizeData.json').
              success(function(data, status) {                
                  $scope.dataTestOptimizedProgress = data;                  
              }).error(function(data, status) {  
                alert("error"+data);
          });
          $http.get('json/testGraphData.json').
              success(function(data, status) {                
                  $scope.dataTestCompareProgress = data;                  
              }).error(function(data, status) {  
                alert("error"+data);
          }); 
       
      

});






myAPIClientApp_controllers
		.controller(
				'landingController',
				function($scope, $timeout, $http, $modal) {
					
					
					
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
												$scope.requirementTopPop = phaseString.staticPopOver;
												$scope.requirementDataContent = phaseString.healthInfo;
												console.log($scope.requirementDataContent);
												document.getElementById("Requirement_tip_content").innerHTML = $scope.requirementDataContent;

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
												$scope.developmentDataContent = phaseString.healthInfo;
												$scope.developmentTopPop = phaseString.staticPopOver;
												
												 document.getElementById("Development_tip_content").innerHTML = $scope.developmentDataContent;

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
												$scope.builddeployDataContent = phaseString.healthInfo;
												
												document.getElementById("Build_tip_content").innerHTML = $scope.builddeployDataContent;
												
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
												$scope.testDataContent = phaseString.healthInfo;
												$scope.testTopPop = phaseString.staticPopOver;
												document.getElementById("Test_tip_content").innerHTML = $scope.testDataContent;
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
					$scope.showDevCompareOption=false;
					$scope.showTestCompareOption=false;
					
					$scope.user = {
							reusbleproducts: []
						  };
					
					$scope.devReusableChecked = function() {
					    var checkedBoxes = "";
					    for (var i = 0; i < $scope.user.reusbleproducts.length; i++) {
					      checkedBoxes += $scope.user.reusbleproducts[i] + " ";
					    }
					    
						$scope.devReusableTable = true;
						document.getElementById("devAnalyzeButton").disabled = false;
						
					   // alert(checkedBoxes);
					    if(checkedBoxes=="Security Service ")
					    	$scope.devReusableId = "Sec";					   
					    else if(checkedBoxes=="DB Framework ")
					    	$scope.devReusableId = "DB";
					    else if(checkedBoxes=="UI Development Framework ")
					    	$scope.devReusableId = "UI";
					    else if(checkedBoxes=="Security Service DB Framework ")
					    	$scope.devReusableId = "SecDB";
			            else if(checkedBoxes=="Security Service UI Development Framework ")
					    	$scope.devReusableId = "SecUI";
                        else if(checkedBoxes=="DB Framework UI Development Framework ")
					    	$scope.devReusableId = "DBUI";
                        else if(checkedBoxes=="Security Service DB Framework UI Development Framework ")
					    	$scope.devReusableId = "SecDBUI";
                        else{
					    	$scope.devReusableId = "";
					    	$scope.devReusableTable = false;					    	
							$scope.showAnalyzedDev = false;	
					    	document.getElementById("devAnalyzeButton").disabled = true;
					    }		    
					    	
					  };					  
					

					$scope.devAnalyzedClicked = function() {
						$scope.devReusableChecked();
						$scope.user.reusbleproducts = [];
						document.getElementById("devAnalyzeButton").disabled = true;
						
						$scope.analyzedDevJson();
			
						if(!$scope.showAnalyzedDev){
							$scope.showAnalyzedDev = true;
							$scope.showAnalyzedTest = false;							
						}							
					};

					$scope.devOptimizeNo = function() {						
						$scope.showAnalyzedDev = false;
						$scope.showAnalyzedTest = false;
						
					};
				
					$scope.devOptimizeSuccessMsg = "Successfully ingested the development optimization into the planning stage!";
					
					$scope.analyzedDevJson = function(){
						$http
						.get('json/analyzedDev.json')
						.success(
								function(data, status) {
									
									console.log("function body", data.body);

									for (var i = 0; i < data.body.length; i++) {
										var reString = data.body[i];
										
										if (reString.id == $scope.devReusableId) {
											$scope.reusablesdev = reString.reusableProducts;
											console.log($scope.reusablesdev);
											break;
										}
									}
								}).error(function(data, status) {
								});
										
					};
					$scope.devOptimizeYes = function() {
						
						
						$scope.showDevCompareOption=true;
						
						$scope.showAnalyzedDev = false;
						$scope.showAnalyzedTest = false;
						
						$http.get('json/developmentGraphOptimizedData.json').
			              success(function(data, status) {                
			                  $scope.dataFeatureDevelopement = data;                  
			              }).error(function(data, status) {  
			                alert("error"+data);
			          });
						
				        if($scope.showTestCompareOption){
								
				        	//alert('here timelineDevAndTestOptimization.json');
								$http
										.get('json/timelineDevAndTestOptimization.json')
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
															$scope.requirementTopPop = phaseString.staticPopOver;
															$scope.requirementDataContent = phaseString.healthInfo;
															console.log($scope.requirementDataContent);
															document.getElementById("Requirement_tip_content").innerHTML = $scope.requirementDataContent;
															

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
															$scope.developmentDataContent = phaseString.healthInfo;
															$scope.developmentTopPop = phaseString.staticPopOver;
															
															document.getElementById("Development_tip_content").innerHTML = $scope.developmentDataContent;

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
															$scope.builddeployDataContent = phaseString.healthInfo;
															$scope.builddeployTopPop = phaseString.staticPopOver;

															document.getElementById("Build_tip_content").innerHTML = $scope.builddeployDataContent;
														
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
															$scope.testDataContent = phaseString.healthInfo;
															$scope.testTopPop = phaseString.staticPopOver;
															document.getElementById("Test_tip_content").innerHTML = $scope.testDataContent;
														}
													}
												}).error(function(data, status) {
										});

						}else{
							//alert('here timelineDevOptimization.json');
								$http
										.get('json/timelineDevOptimization.json')
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
															$scope.requirementTopPop = phaseString.staticPopOver;
															$scope.requirementDataContent = phaseString.healthInfo;
															console.log($scope.requirementDataContent);
															document.getElementById("Requirement_tip_content").innerHTML = $scope.requirementDataContent;

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
															$scope.developmentDataContent = phaseString.healthInfo;
															$scope.developmentTopPop = phaseString.staticPopOver;
															
															document.getElementById("Development_tip_content").innerHTML = $scope.developmentDataContent;

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
															$scope.builddeployDataContent = phaseString.healthInfo;
															$scope.builddeployTopPop = phaseString.staticPopOver;
															
															document.getElementById("Build_tip_content").innerHTML = $scope.builddeployDataContent;
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
															$scope.testDataContent = phaseString.healthInfo;
															$scope.testTopPop = phaseString.staticPopOver;
															document.getElementById("Test_tip_content").innerHTML = $scope.testDataContent;
														}
													}
												}).error(function(data, status) {
										});
						}
						};
						
						$scope.testuser = {
								reusbleproducts: []
							  };

						$scope.testReusableChecked = function() {
							
						    var checkedBoxes = "";
						    for (var i = 0; i < $scope.testuser.reusbleproducts.length; i++) {
						      checkedBoxes += $scope.testuser.reusbleproducts[i] + " ";
						    }
						    $scope.testReusableTable = true;
						    document.getElementById("testAnalyzeButton").disabled = false;
						    
						  //  alert(checkedBoxes);
						    if(checkedBoxes=="Security Automation ")
						    	$scope.testReusableId = "Sec";		    	
						    else if(checkedBoxes=="Common Library Automation ")
						    	$scope.testReusableId = "Com";
						    else if(checkedBoxes=="Security Automation Common Library Automation ")
						    	$scope.testReusableId = "SecCom";	
                            else{
						    	$scope.testReusableId = "";
						    	$scope.testReusableTable = false;
						    	$scope.showAnalyzedTest = false;									
						    	document.getElementById("testAnalyzeButton").disabled = true;
						    }
						    
						    	
						  };
					


					$scope.testAnalyzedClicked = function() {
						
						$scope.testReusableChecked();
						
				//		if($scope.testReusableId = "" && $scope.range_slider_ticks_values.minValue)
						
						$scope.testuser.reusbleproducts = [];
						document.getElementById("testAnalyzeButton").disabled = true;
						console.log($scope.testReusableId);
						$scope.analyzedTestJson();
						
						if (!$scope.showAnalyzedTest){
							$scope.showAnalyzedTest = true;
							$scope.showAnalyzedDev = false;								
						}				
						
				
					};
					
					
					$scope.analyzedTestJson = function(){
						$http
						.get('json/analyzedTest.json')
						.success(
								function(data, status) {
									
									console.log("function body", data.body);

									for (var i = 0; i < data.body.length; i++) {
										var reString = data.body[i];
										
										if (reString.id == $scope.testReusableId) {
											$scope.reusablestest = reString.reusableProducts;
											console.log($scope.reusablestest);
											break;
										}
									}
								}).error(function(data, status) {
								});
										
					};
					
					$scope.testOptimizeSuccessMsg = "Successfully ingested the testing optimization into the planning stage!";
					$scope.testOptimizeYes = function() {
						$scope.showTestCompareOption=true;
						if ($scope.showAnalyzedTest) {
							$scope.showAnalyzedTest = false;
						} else {
							$scope.showAnalyzedTest = true;
							$scope.showAnalyzedDev = false;
						}
						$http.get('json/testGraphOptimizeData.json').
			              success(function(data, status) {                
			                  $scope.dataTestDevelopement = data;                  
			              }).error(function(data, status) {  
			                alert("error"+data);
			          });
			          if($scope.showDevCompareOption){
								
				        	$http
										.get('json/timelineDevAndTestOptimization.json')
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
															$scope.requirementTopPop = phaseString.staticPopOver;
															$scope.requirementDataContent = phaseString.healthInfo;
															console.log($scope.requirementDataContent);
															document.getElementById("Requirement_tip_content").innerHTML = $scope.requirementDataContent;
															

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
															$scope.developmentDataContent = phaseString.healthInfo;
															$scope.developmentTopPop = phaseString.staticPopOver;
															
															document.getElementById("Development_tip_content").innerHTML = $scope.developmentDataContent;

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
															$scope.builddeployDataContent = phaseString.healthInfo;
															$scope.builddeployTopPop = phaseString.staticPopOver;

															document.getElementById("Build_tip_content").innerHTML = $scope.builddeployDataContent;
														
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
															$scope.testDataContent = phaseString.healthInfo;
															$scope.testTopPop = phaseString.staticPopOver;
															document.getElementById("Test_tip_content").innerHTML = $scope.testDataContent;
														}
													}
												}).error(function(data, status) {
										});

						}else{
							//alert('here timelineDevOptimization.json');
								$http
										.get('json/timelineTestOptimization.json')
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
															$scope.requirementTopPop = phaseString.staticPopOver;
															$scope.requirementDataContent = phaseString.healthInfo;
															console.log($scope.requirementDataContent);
															document.getElementById("Requirement_tip_content").innerHTML = $scope.requirementDataContent;

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
															$scope.developmentDataContent = phaseString.healthInfo;
															$scope.developmentTopPop = phaseString.staticPopOver;
															
															document.getElementById("Development_tip_content").innerHTML = $scope.developmentDataContent;

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
															$scope.builddeployDataContent = phaseString.healthInfo;
															$scope.builddeployTopPop = phaseString.staticPopOver;
															
															document.getElementById("Build_tip_content").innerHTML = $scope.builddeployDataContent;
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
															$scope.testDataContent = phaseString.healthInfo;
															$scope.testTopPop = phaseString.staticPopOver;
															document.getElementById("Test_tip_content").innerHTML = $scope.testDataContent;
														}
													}
												}).error(function(data, status) {
										});
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
				
				
					//For optimizetestcase
					optimizeTestcase = function() {
						//For Tree
						$(".testcaseoptimizer-iframe").colorbox({iframe:true, width:"80%", height:"80%",href:"/optimizetestcase"});
	
						}
					
						reusableAssetVsWorkItems = function() {
						$(".reusableasset-vs-workitems-iframe").colorbox({iframe:true, width:"80%", height:"90%",href:"/reusableasset-vs-workitems"});
						}
						
						compareDev = function() {

						$(".devoptimizer-iframe").colorbox({iframe:true, width:"73%", height:"47%",href:"/devCompareOptimizer"});
	
						}

						compareTest = function() {

						$(".testoptimizer-iframe").colorbox({iframe:true, width:"73%", height:"47%",href:"/testCompareOptimizer"});
	
						}
						
						buildanddeployinsights = function() {
							$(".buildanddeployinsights-iframe").colorbox({iframe:true, width:"80%", height:"90%",href:"/build-deploy-insights"});
						}


//Code to refresh the Slider in WhatIf Tab
  $scope.refreshSlider = function(){
    $timeout(function() {
       $scope.$broadcast('rzSliderForceRender');
    });
   }
  
  $scope.myChangeListener = function(sliderId) {
	    console.log(sliderId, 'has changed with ', $scope.range_slider_ticks_values.value);
	    $scope.lastSliderUpdated = $scope.range_slider_ticks_values.value;
	  }; 
	  
    $scope.range_slider_ticks_values = {
    minValue: "0",
    maxValue: "5",
    options: {
    //   onChange: $scope.myChangeListener,
       floor: 0,
       ceil: 3,
       step: 1,
       showTicksValues: true,
  //     id: 'sliderA',
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
	$scope.tab = 1;
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
    
    $scope.optionsbulletChart = {
            chart: {
                type: 'bulletChart',
                transitionDuration: 30,
                //color:"#008000"
            }
        };
 	/*$scope.optionsExpectedbulletChart = {
            chart: {
                type: 'bulletChart',
                transitionDuration: 30
            }
        };*/
    $scope.databulletchart = {
            "title": "Predicted Completion",
            "subtitle": "in Days",
            "ranges": [13,15],
            "measures": [13],
            "markers": [15]
        }

        $scope.dataTestbulletchart = {
            "title": "Predicted Completion",
            "subtitle": "in Days",
            "ranges": [10,15,20,25,30],
            "measures": [25],
            "markers": [30]
        }
	/*
		$scope.dataExpectedTestbulletchart = {
            "title": "Expected Completion",
            "subtitle": "in Days",
            "ranges": [10,15,20,25,30,35,40],
            "measures": [30],
            "markers": [30]
        }*/
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
                },
               tooltip: {
  					//contentGenerator: function(d) { return '<h3>HELLO WORLD</h3>'; }
				}
            }
        };
        $scope.dataFeatureDevelopement = data;
        $scope.dataFeatureCompareDevelopement = data;
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





});


myAPIClientApp_controllers.controller('defect-analyticsController', function($scope) {});
myAPIClientApp_controllers.controller('testcase-optimizationController', function($scope,$http) {});
myAPIClientApp_controllers.controller('defectCasesController', function($scope) {});
myAPIClientApp_controllers.controller('loginController', function($scope) {});
myAPIClientApp_controllers.controller('modalCtrl', function($scope) {});

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



