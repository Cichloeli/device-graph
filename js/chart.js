function create_chart(data, target, title, ylabel, xlabel){
    // declare margins
    // declar width and height with padding
    var margin = {top: 40, right: 20, bottom: 50, left: 60},
        width = screen.width/4.2 - margin.left - margin.right,
        height = screen.height/3 - margin.top - margin.bottom;

    // create svg object and translate to be contained in margins
    var svg = d3.select(target).append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g").attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    // Set the ranges
    var x = d3.scale.linear().range([0, width]);
    var y = d3.scale.linear().range([height, 0]);

    // Define the axes
    var xAxis = d3.svg.axis().scale(x)
        .orient("bottom").ticks(5);

    var yAxis = d3.svg.axis().scale(y)
        .orient("left").ticks(5);

    // Define the line
    var valueline = d3.svg.line()
        .x(function(d) { return x(d.size); })
        .y(function(d) { return y(d.value); });

    // Scale the range of the data
    x.domain(d3.extent(data, function(d) { return d.size; }));
    y.domain([0, d3.max(data, function(d) { return d.value; })]);

    // Add the valueline path.
    svg.append("path")
        .attr("class", "line")
        .attr("d", valueline(data));

    // Add the X Axis
    svg.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + height + ")")
        .call(xAxis);

    // Add the Y Axis
    svg.append("g")
        .attr("class", "y axis")
        .call(yAxis);

    // Add Y label
    svg.append("text")
        .style("fill", "grey")
        .attr("transform", "rotate(-90)")
        .attr("x", -height/2)
        .attr("y", -margin.left/(1.5))
        .style("text-anchor", "middle")
        .text(ylabel);

    // Add X label
    svg.append("text")
        .style("fill", "grey")
        .attr("x", width/2)
        .attr("y", height + margin.bottom/1.2)
        .style("text-anchor", "middle")
        .text(xlabel);

    // Add title
    svg.append("text")
        .style("fill", "grey")
        .attr("x", width/2)
        .attr("y", -margin.top/2)
        .style("text-anchor", "middle")
        .html(title)
};