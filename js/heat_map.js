function create_heatmap(data, target, title, ylabel, xlabel){
    // declare margins
    // declare width and height with padding
    var margin = {top: 85, right: 20, bottom: 50, left: 60},
        parent_width = $(target).parent().width();
        width = parent_width - margin.left - margin.right,
        height = screen.height/3 - margin.top - margin.bottom,
        gridSize = Math.floor(width / 10);

    // create svg object and translate to be contained in margins
    var svg = d3.select(target).append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g").attr("transform", "translate(" + margin.left + "," + margin.top + ")");
        // .on("mouseout", function(d){
        //     hideGraphTooltip();
        // });

    var graph_tooltip = d3.select(target).append("div")   
        .attr("class", "tooltip")               
        .style("opacity", 0);

    var x_elements = d3.set(data.map(function(d) { return d.density; } )).values(),
        y_elements = d3.set(data.map(function(d) { return d.size; } )).values();

    var xScale = d3.scale.ordinal()
        .domain([0.25, 0.5, 0.75, 1])
        .rangeBands([0, x_elements.length * gridSize]);

    var xAxis = d3.svg.axis()
        .scale(xScale)
        .tickFormat(function (d) {
            return d;
        })
        .orient("top");

    var yScale = d3.scale.ordinal()
        .domain(y_elements)
        .rangeBands([0, y_elements.length * gridSize]);

    var yAxis = d3.svg.axis()
        .scale(yScale)
        .tickFormat(function (d) {
            return d;
        })
        .orient("left");

    var colorScale = d3.scale.linear()
        .domain(createRange(data,5))
        .range(["#4eb3d3", "#fdd49e", "#fc8d59", "#d7301f", "#7f0000"]);

    var cells = svg.selectAll('rect')
        .data(data)
        .enter().append('g').append('rect')
        .attr("rx", 3)
        .attr("ry", 3)
        .attr('class', 'cell')
        .attr('width', gridSize - 1)
        .attr('height', gridSize - 1)
        .attr('y', function(d) { return yScale(d.size); })
        .attr('x', function(d) { return xScale(d.density); })
        .attr('fill', function(d) { return colorScale(d.value); })
        .on("click", function(d){
            console.log(d.size,d.density,d.value);
        });

    svg.append("g")
        .attr("class", "y axis")
        .call(yAxis)
        .selectAll('text')
        .attr('font-weight', 'normal');

    svg.append("g")
        .attr("class", "x axis")
        .call(xAxis)
        .selectAll('text')
        .attr('font-weight', 'normal')
        .style("text-anchor", "start")
        .attr("dx", ".8em")
        .attr("dy", ".5em")
        .attr("transform","rotate(-65)");

    // Add Y label
    svg.append("text")
        .style("fill", "grey")
        .attr("transform", "rotate(-90)")
        .attr("x", -height/2)
        .attr("y", -margin.left/(1.2))
        .style("text-anchor", "middle")
        .text(ylabel);

    // Add X label
    svg.append("text")
        .style("fill", "grey")
        .attr("x", width/2)
        .attr("y", height + margin.bottom/1.2)
        .style("text-anchor", "middle")
        .text(xlabel);
};

function createRange(data, indicies){
    var diff = Math.floor(d3.max(data, function(d){return d.value;}) / (indicies - 1));
    var range = [];
    var entry = 0;

    for(var i = 0; i < indicies; i++){
        range.push(entry);
        entry = entry + diff;
    }

    return range;
}