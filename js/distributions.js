// read in distribution data and create chart
var SIZEFILE = "data_files/SizeDistribution.tsv";
var DENSFILE = "data_files/DensityDistribution.tsv";

// create charts for home tag
function updateHomeTab(){

    // if there are existing charts delete them
    var old = document.getElementById("tab_info");
    if(old != null) removeElement("tab_info");

    // create chart location
    var html = '<div class="row">' +
                    '<div class="card">' +
                        '<div class="cardInnerMargin">' +
                            '<div id="size_distributions"></div>'+
                        '</div>' +
                    '</div>' +
                '</div>' +
                '<div class="row">' +
                    '<div class="card">' +
                        '<div class="cardInnerMargin">' +
                            '<div id="dens_distributions"></div>' +
                        '</div>' +
                    '</div>' +
                '</div>';

    // create the charts
    loadSize();
    loadDens();

    // append the charts to html
    addElement("home", "div", "container-fluid", "tab_info", html)
}

// size distribution
function loadSize() {
    d3.tsv(SIZEFILE, function(d){
        return {
            size : +d.Size,
            value : +d.value
        };
    }, function(error, data){
        if(error) throw error;

        var ylabel = "Number of Nodes";
        var xlabel = "Number of Devices";
        var title  = "Number of Nodes with &#8804 X Devices";
        var target = "#size_distributions";

        var largest = d3.max(data, function(d){return d.value;}).toString()
        var zeros   = Math.pow(10,(largest.length - 2))

        if(largest.length > 4){
            data.forEach(function(d){
                d.value = +d.value/zeros
            });

            var zeros = zeros.toString();
            var zeros  = zeros.slice(0, zeros.length - 3) + "," + zeros.slice(-3);
            var ylabel = ylabel + " in " + zeros.toString();
        };

        create_chart(data, target, title, ylabel, xlabel);
    });
};

//density distribution
function loadDens(){
    d3.tsv(DENSFILE, function(d){
        return {
            size : +d.density,
            value : +d.value
        };
    }, function(error, data){
        if(error) throw error;

        var ylabel = "Number of Nodes";
        var xlabel = "Density";
        var title  = "Number of Nodes with Density &#8804 X";
        var target = "#dens_distributions";

        var largest = d3.max(data, function(d){return d.value;}).toString()
        var zeros   = Math.pow(10,(largest.length - 2))

        if(largest.length > 4){
            data.forEach(function(d){
                d.value = +d.value/zeros
            });

            var zeros = zeros.toString();
            var zeros  = zeros.slice(0, zeros.length - 3) + "," + zeros.slice(-3);
            var ylabel = ylabel + " in " + zeros.toString();
        };

        create_chart(data, target, title, ylabel, xlabel);
    });
}