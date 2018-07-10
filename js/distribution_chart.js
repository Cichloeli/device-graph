function create_distribution(){
	// declare margins
	// declar width and height with padding
	var margin = {top: 40, right: 20, bottom: 200, left: 60},
        width = screen.width/4.2 - margin.left - margin.right,
        height = 400 - margin.top - margin.bottom;

    // create svg object and translate to be contained in margins
	var svg = d3.select("#distributions").append("svg")
		.attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
    	.append("g").attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    // open data to be drawn
    d3.tsv("js/test.tsv", function(error, data){
    	if(error) throw error;

    	data.forEach(function(d){
    		d.size = +d.size;
    		d.value = +d.value;
    	});

    });
};