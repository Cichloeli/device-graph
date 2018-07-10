var margin = 10,
    outerDiameter = 960,
    innerDiameter = outerDiameter - margin - margin;

var x = d3.scale.linear()
    .range([0, innerDiameter]);

var y = d3.scale.linear()
    .range([0, innerDiameter]);

var color = d3.scale.linear()
    .domain([-1, 5])
    .range(["#e1f4fd", "#00aeef"])
    .interpolate(d3.interpolateHcl);

var pack = d3.layout.pack()
    .padding(2)
    .size([innerDiameter, innerDiameter])
    .value(function(d) { return d.size; })

var svg = d3.select("#circle_pack").append("svg")
    .attr("width", outerDiameter)
    .attr("height", outerDiameter)
    .append("g")
    .attr("transform", "translate(" + margin + "," + margin + ")");

var tooltip = d3.select("#circle_pack").append("div")   
    .attr("class", "tooltip")               
    .style("opacity", 0);

var density_color = d3.scale.linear()
    .domain([0, 1, 2, 3, 4])
    .range(["#4eb3d3", "#fdd49e", "#fc8d59", "#d7301f", "#7f0000"])
    .interpolate(d3.interpolate);

function filter(data, size){
    if(data.children == undefined) return;
    data.children = data.children.filter(function(a){return (a.size>size || a.size == -1);});
    for(var i = 0; i < data.children.length; i++){
        filter(data.children[i], size);
    }
}

d3.json("graphOmahaIndexed.mtx_23_circle.json", function(error, root) {

    filter(root, 10);
    var focus = root,
        nodes = pack.nodes(root);

    svg.append("g").selectAll("circle")
        .data(nodes)
        .enter().append("circle")
        .attr("class", function(d) { return d.parent ? d.children ? "node" : "node node--leaf" : "node node--root"; })
        .attr("transform", function(d) { return "translate(" + d.x + "," + d.y + ")"; })
        .attr("r", function(d) { return d.r; })
        .style("fill", function(d) { return density_color(d.color); })
        .on("click", function(d) { return zoom(focus == d ? root : d); })
        .on("mouseover", function(d) {
            showTooltip(this,d, root);
        })
        .on("mouseout", function(d){
            hideTooltip();
        });

    // svg.append("g").selectAll("text")
    //     .data(nodes)
    //     .enter().append("text")
    //     .attr("class", "label")
    //     .attr("transform", function(d) { return "translate(" + d.x + "," + d.y + ")"; })
    //     .style("fill-opacity", function(d) { return d.parent === root ? 0 : 1; })
    //     .style("display", function(d) { return d.parent === root ? null : "none"; })
    //     .text(function(d) { return d.index; });

    d3.select(window)
        .on("click", function() { zoom(root); });

    function zoom(d, i) {
        var focus0 = focus;
        focus = d;

        var k = innerDiameter / d.r / 2;
        x.domain([d.x - d.r, d.x + d.r]);
        y.domain([d.y - d.r, d.y + d.r]);
        d3.event.stopPropagation();

        var transition = d3.selectAll("circle").transition()
            .duration(d3.event.altKey ? 7500 : 750)
            .attr("transform", function(d) { return "translate(" + x(d.x) + "," + y(d.y) + ")"; });

        transition.filter("circle")
            .attr("r", function(d) { return k * d.r; });

    // transition.filter("text")
    //     .filter(function(d) { return d.parent === focus || d.parent === focus0; })
    //     .style("fill-opacity", function(d) { return d.parent === focus ? 0 : 1; })
    //     .each("start", function(d) { if (d.parent === focus) this.style.display = "inline"; })
    //     .each("end", function(d) { if (d.parent !== focus) this.style.display = "none"; });
    }

});

d3.select(self.frameElement).style("height", outerDiameter + "px");

function showTooltip(c, node, root){

    var density = node.color;
    var size = node.size;
    var index = node.index;

    var matrix = c.getScreenCTM()
        .translate(+c.getAttribute("cx"),+c.getAttribute("cy"));
    tooltip.transition().duration(200).style("opacity", .9);
    var x = window.pageXOffset + matrix.e;
    var y = window.pageYOffset + matrix.f;
    tooltip.html("</p><p class='center-align'>Name: " + index +
                 "</p><p class='left-align'>Size:<span class='right-align'>" + size +
                 "</p><p class='left-align'>density:<span class='right-align'>" + density)
        .style("left", x + "px")     
        .style("top", y + "px");
};

function hideTooltip(){
    tooltip.transition().duration(200).style("opacity", 0);
};