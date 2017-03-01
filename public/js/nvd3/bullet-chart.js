/**
 * 
 */
nv.addGraph(function() {
	var data={
		  "title": "Development",
		  "subtitle": "Features",
		  "ranges": [5,15,25,35],
		  "measures": [18],
		  "markers": [30]
		};

	var data1={
			  "title": "Testing",
			  "subtitle": "Progress",
			  "ranges": [2,8,15,20],
			  "measures": [7],
			  "markers": [20]
			};
    var chart = nv.models.bulletChart();

    d3.select('#bullet svg' )
    .attr("width", '100%')
    .attr("height", '100%')
    .attr("color",'orange')
        .datum(data)
        .transition().duration(1000)
        .call(chart)
        
        ;
    d3.select('#bullet1 svg' )
    .attr("width", '100%')
    .attr("height", '100%')
    	
        .datum(data1)
        .transition().duration(1000)
        .call(chart)
        
        ;

    return chart;
});
