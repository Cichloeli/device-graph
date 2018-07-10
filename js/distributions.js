// read in distribution data and create chart

// size distribution
d3.tsv("js/test1.tsv", function(error, data) {
    if(error) throw error;

    var ylabel = "Number of Nodes";
    var xlabel = "Number of Devices";
    var title  = "Number of Nodes with &#8805 X Devices";
    var target = "#size_distributions";

    data.forEach(function(d){
        d.size = +d.size;
        d.value = +d.value;
    });

    create_chart(data, target, title, ylabel, xlabel);
});

//density distribution
d3.tsv("js/test2.tsv", function(error, data) {
    if(error) throw error;

    var ylabel = "Number of Nodes";
    var xlabel = "Density";
    var title  = "Number of Nodes with Density &#8805 X";
    var target = "#dens_distributions";

    data.forEach(function(d){
        d.size = +d.size;
        d.value = +d.value;
    });

    create_chart(data, target, title, ylabel, xlabel);
});