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

    // initialize a focus group
    var focus = svg.append("g") 
        .style("display", "none");

    var bisectDate = d3.bisector(function(d) { return d.size; }).left;

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

    // create focus line
    // append the x line
    focus.append("line")
        .attr("class", "x")
        .style("stroke", "blue")
        .style("stroke-dasharray", "3,3")
        .style("opacity", 0.5)
        .attr("y1", 0)
        .attr("y2", height);

    // append the y line
    focus.append("line")
        .attr("class", "y")
        .style("stroke", "blue")
        .style("stroke-dasharray", "3,3")
        .style("opacity", 0.5)
        .attr("x1", width)
        .attr("x2", width);

    // append the circle at the intersection
    focus.append("circle")
        .attr("class", "y")
        .style("fill", "none")
        .style("stroke", "blue")
        .attr("r", 4);

    // append the rectangle to capture mouse
    svg.append("rect")
        .attr("width", width)
        .attr("height", height)
        .style("fill", "none")
        .style("pointer-events", "all")
        .on("mouseover", function() { focus.style("display", null); })
        .on("mouseout", function() { focus.style("display", "none"); })
        .on("mousemove", mousemove);

    function mousemove() {
        var x0 = x.invert(d3.mouse(this)[0]),
            i = bisectDate(data, x0, 1),
            d0 = data[i - 1],
            d1 = data[i] == undefined ? data[i-1] : data[i],
            d = x0 - d0.size > d1.size - x0 ? d1 : d0;

        focus.select("circle.y")
            .attr("transform",
                  "translate(" + x(d.size) + "," +
                                 y(d.value) + ")");

        focus.select(".x")
            .attr("transform",
                  "translate(" + x(d.size) + "," +
                                 y(d.value) + ")")
                       .attr("y2", height - y(d.value));

        focus.select(".y")
            .attr("transform",
                  "translate(" + width * -1 + "," +
                                 y(d.value) + ")")
                       .attr("x2", width + width);
    };
};