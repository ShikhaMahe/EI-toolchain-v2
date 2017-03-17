var app = angular.module('ReusableAsset-Vs-WorkItem-d3App', ['d3']);

app.factory('reusableAssetServices', function($http,$window){
	var myObject ={
			getPropableWorkItems: function (reusableAssetId) {
		   		 
		  		  console.log("1. reusableAssetId--->"+reusableAssetId);
		  		  
		  		  var REST_URL='js/reusableasset-vs-workitem/json/reusabeasset-vs-workitems.json';
		  		  console.log("3. REST URL to be Invoked--->"+REST_URL);
		  		  return $http(
		  		    		{
		  		    			  method: 'GET',
		  		    			  url: REST_URL
		  		    			}		
		  		    // To ensure the promises (to make this call sync) I'm handling the Success and failure in controller
		  		    );
		  		  
		  	  },
		  	getreusableAssets:function(){
		   		 
		  		  var REST_URL='js/reusableasset-vs-workitem/json/reusableassets.json';
		  		  console.log("3. REST URL to be Invoked--->"+REST_URL);
		  		  return $http(
		  		    		{
		  		    			  method: 'GET',
		  		    			  url: REST_URL
		  		    			}		
		  		    // To ensure the promises (to make this call sync) I'm handling the Success and failure in controller
		  		    );
		  		  
		  	  },
		  	  spinnerConfig:function(){
		  		var spin_config = {
			  			  lines: 15 // The number of lines to draw
			  			, length: 43 // The length of each line
			  			, width: 13 // The line thickness
			  			, radius: 42 // The radius of the inner circle
			  			, scale: 0.5 // Scales overall size of the spinner
			  			, corners: 1 // Corner roundness (0..1)
			  			, color: '#000' // #rgb or #rrggbb or array of colors
			  			, opacity: 0.25 // Opacity of the lines
			  			, rotate: 0 // The rotation offset
			  			, direction: -1 // 1: clockwise, -1: counterclockwise
			  			, speed: 1.5 // Rounds per second
			  			, trail: 72 // Afterglow percentage
			  			, fps: 20 // Frames per second when using setTimeout() as a fallback for CSS
			  			, zIndex: 2e9 // The z-index (defaults to 2000000000)
			  			, className: 'spinner' // The CSS class to assign to the spinner
			  			, top: '48%' // Top position relative to parent
			  			, left: '50%' // Left position relative to parent
			  			, shadow: false // Whether to render a shadow
			  			, hwaccel: false // Whether to use hardware acceleration
			  			, position: 'absolute' // Element positioning
			  			};
			  		
			  		var spinner=new Spinner(spin_config);
			  		return spinner;
		  		  
		  	  },
		  	spinnerAction:function(spinnerConfig,action){
		  		var target = document.getElementById('forspinner');
		  		
		  		console.log(">>>> Spin action>>>>>" + action);
		  		if(action==='spin'){
		  			spinnerConfig.spin(target);
		  			//spinner.spin(target);
		  			console.log(">>>> Spin started");
		  		}
		  		else if(action==='stop'){
		  			//spinner.stop(target);
		  			spinnerConfig.stop(target);
		  			console.log(">>>> Spin Stopped");
		  		}
		  			
		  		
		  	}  
		}
	return myObject;
	
});

app.controller('chartCntrl', ['d3', '$scope', '$http', 'reusableAssetServices','$timeout',function(d3, $scope,$http,reusableAssetServices,$timeout){
	$scope.reusableAssets;
	$scope.populatereusableAssets = function(){
		var respreusableAssets = reusableAssetServices.getreusableAssets();
		
		respreusableAssets.then(function (result) {
			
			$scope.reusableAssets=result.data;
			
		}, function(err) {
	    	  console.log(err);
	    	  return;
	      }
		  
		  );
	}
	
	
	
	
	$scope.drawTreeChart = function(reusableAssetId){
		var treeData;
		$scope.tempData={"name":"","children":[]};
		 var resp ;
		
		//Start the spinner
		var spinnerConfig = reusableAssetServices.spinnerConfig();
		reusableAssetServices.spinnerAction(spinnerConfig,'spin');
		
		
		
		 //In side the Call back function of the Timeout i have provided the complete implementation.
		setTimeout(function(){
			
			//To stop the spinner
			reusableAssetServices.spinnerAction(spinnerConfig,'stop');
			
			//To fetch the workitems which may  re-use a specific asset from backend
			resp = reusableAssetServices.getPropableWorkItems(reusableAssetId);
			
			//Promise architecture to get the response and draw the Chart
			resp.then(function (result) {
			  
			
			  treeData=result.data[reusableAssetId];
			  
			//************** Generate the tree diagram	 *****************
				var margin = {top: 20, right: 90, bottom: 30, left: 200},
			    width = 740 - margin.left - margin.right,
			    height = 440 - margin.top - margin.bottom;

			// append the svg object to the body of the page
			// appends a 'group' element to 'svg'
			// moves the 'group' element to the top left margin

				
				d3.select("svg").remove();	
			var svg = d3.select("#tree-chart").append("svg")
				.attr("id","workitem-optimizer")
			    .attr("width", "100%")
			    .attr("height", height + margin.top + margin.bottom)
			  .append("g")
			    .attr("transform", "translate("
			          + margin.left + "," + margin.top + ")");

			var i = 0,
			    duration = 1250,
			    root;

			// declares a tree layout and assigns the size
			var treemap = d3.tree().size([height, width]);

			// Assigns parent, children, height, depth
			root = d3.hierarchy(treeData, function(d) { return d.children; });
			root.x0 = height / 2;
			root.y0 = 0;

			// Collapse after the second level
			//root.children.forEach(collapse);

			update(root);
				




			// Collapse the node and all it's children
			function collapse(d) {

				  if(d.children) {
				    d._children = d.children
				    d._children.forEach(collapse)
				    d.children = null
				  }
				
			}

			function update(source) {


				  // Assigns the x and y position for the nodes
				  var treeData = treemap(root);

				  // Compute the new tree layout.
				  var nodes = treeData.descendants(),
				      links = treeData.descendants().slice(1);

				  // Normalize for fixed-depth.
				  nodes.forEach(function(d){ d.y = d.depth * 180});

				  // ****************** Nodes section ***************************

				  // Update the nodes...
				  var node = svg.selectAll('g.node')
				      .data(nodes, function(d) {return d.id || (d.id = ++i); });

				  // Enter any new modes at the parent's previous position.
				  var nodeEnter = node.enter().append('g')
				      .attr('class', 'node')
				      .attr("transform", function(d) {
				        return "translate(" + source.y0 + "," + source.x0 + ")";
				    })
				    .on('click', click);

				  // Add Circle for the nodes
				  nodeEnter.append('circle')
				      .attr('class', 'node')
				      .attr('r', 1e-6)
				      .style("fill", function(d) {
				          return d._children ? "lightsteelblue" : "#fff";
				      });

				  // Add labels for the nodes
				  nodeEnter.append('text')
				      .attr("dy", ".35em")
				      .attr("x", function(d) {
				          return d.children || d._children ? -13 : 13;
				      })
				      .attr("text-anchor", function(d) {
				          return d.children || d._children ? "end" : "start";
				      })
				      .text(function(d) { return d.data.name; });

				  // UPDATE
				  var nodeUpdate = nodeEnter.merge(node);

				  // Transition to the proper position for the node
				  nodeUpdate.transition()
				    .duration(duration)
				    .attr("transform", function(d) { 
				        return "translate(" + d.y + "," + d.x + ")";
				     });

				  // Update the node attributes and style
				  nodeUpdate.select('circle.node')
				    .attr('r', 10)
				    .style("fill", function(d) {
				        return d._children ? "lightsteelblue" : "#fff";
				    })
				    .attr('cursor', 'pointer');


				  // Remove any exiting nodes
				  var nodeExit = node.exit().transition()
				      .duration(duration)
				      .attr("transform", function(d) {
				          return "translate(" + source.y + "," + source.x + ")";
				      })
				      .remove();

				  // On exit reduce the node circles size to 0
				  nodeExit.select('circle')
				    .attr('r', 1e-6);

				  // On exit reduce the opacity of text labels
				  nodeExit.select('text')
				    .style('fill-opacity', 1e-6);

				  // ****************** links section ***************************

				  // Update the links...
				  var link = svg.selectAll('path.link')
				      .data(links, function(d) { return d.id; });

				  // Enter any new links at the parent's previous position.
				  var linkEnter = link.enter().insert('path', "g")
				      .attr("class", "link")
				      .style("stroke", function(d) {
						  //alert("d-->" +link);
							if(d.data.relavant==='y')
							return "green";
							else
							return "red";	
						  })
				      .attr('d', function(d){
				        var o = {x: source.x0, y: source.y0}
				        return diagonal(o, o)
				      });

				  // UPDATE
				  var linkUpdate = linkEnter.merge(link);

				  // Transition back to the parent element position
				  linkUpdate.transition()
				      .duration(duration)
				      .attr('d', function(d){ return diagonal(d, d.parent) });

				  // Remove any exiting links
				  var linkExit = link.exit().transition()
				      .duration(duration)
				      .attr('d', function(d) {
				        var o = {x: source.x, y: source.y}
				        return diagonal(o, o)
				      })
				      .remove();

				  // Store the old positions for transition.
				  nodes.forEach(function(d){
				    d.x0 = d.x;
				    d.y0 = d.y;
				  });

				  // Creates a curved (diagonal) path from parent to the child nodes
				  function diagonal(s, d) {

				    path = `M ${s.y} ${s.x}
				            C ${(s.y + d.y) / 2} ${s.x},
				              ${(s.y + d.y) / 2} ${d.x},
				              ${d.y} ${d.x}`

				    return path
				  }

				  // Toggle children on click.
				  function click(d) {
				    if (d.children) {
				        d._children = d.children;
				        d.children = null;
				      } else {
				        d.children = d._children;
				        d._children = null;
				      }
				    update(d);
				  }
				
			}  
		        

		  }, function(err) {
	    	  console.log(err);
	    	  return;
	      }
		  
		  );},1000);
		
	
		
		 
		 
		
		

		 
		 
		 
		//var treeData = {"name":"Def-1","children":[{"name":"TestCase-1","relavant":"y","children":[{"name":"TestCase-9","relavant":"y"},{"name":"TestCase-10","relavant":"n"}]},{"name":"TestCase-2","relavant":"y"},{"name":"TestCase-3","relavant":"n"},{"name":"TestCase-4","relavant":"y"},{"name":"TestCase-5","relavant":"n"},{"name":"TestCase-6","relavant":"y"}]};
		

	
}

	
}]);