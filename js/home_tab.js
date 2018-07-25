// read in distribution data and create chart
var SIZEFILE = "data_files/SizeDistribution.tsv";
var DENSFILE = "data_files/DensityDistribution.tsv";
var HEATFILE = "data_files/heattest.tsv";

// create charts for home tag
function updateHomeTab(){

    // if there are existing charts delete them
    var old = document.getElementById("tab_info");
    if(old != null) removeElement("tab_info");

    // create chart location
    var html =
                '<div class="row">' +
                    '<div class="card">' +
                        '<div class="cardInnerMargin">' +
                            '<div id="dens_legend"></div>' +
                        '</div>' +
                    '</div>' +
                '</div>' +
                '<div class="row">' +
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
                '</div>' +
                '<div class="row">' +
                    '<div class="card">' +
                        '<div class="cardInnerMargin">' +
                            '<div id="heat_map"></div>' +
                        '</div>' +
                    '</div>' +
                '</div>' ;

    // append the charts to html
    addElement("home", "div", "container-fluid", "tab_info", html);

    create_legend("#dens_legend");

    // create the charts
    loadSize();
    loadDens();
    loadHeat();
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

        var ylabel = "Number of Nodes",
            xlabel = "Devices",
            title  = "Number of Nodes with &#8804 X Devices",
            target = "#size_distributions";

        var largest = d3.max(data, function(d){return d.value;}).toString(),
            zeros   = Math.pow(10,(largest.length - 2))

        if(largest.length > 4){
            data.forEach(function(d){
                d.value = +d.value/zeros
            });

            var zeros = zeros.toString();
            zeros  = zeros.slice(0, zeros.length - 3) + "," + zeros.slice(-3);
            ylabel = ylabel + " in " + zeros.toString();
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

        var ylabel = "Number of Nodes",
            xlabel = "Density",
            title  = "Number of Nodes with Density &#8804 X",
            target = "#dens_distributions";

        var largest = d3.max(data, function(d){return d.value;}).toString(),
            zeros   = Math.pow(10,(largest.length - 2))

        if(largest.length > 4){
            data.forEach(function(d){
                d.value = +d.value/zeros
            });

            var zeros = zeros.toString();
            zeros  = zeros.slice(0, zeros.length - 3) + "," + zeros.slice(-3);
            ylabel = ylabel + " in " + zeros.toString();
        };

        create_chart(data, target, title, ylabel, xlabel);
    });
}

function loadHeat(){
    d3.tsv(HEATFILE, function(d){
        return {
            size: +d.size,
            density: +d.density,
            value: +d.value
        };
    }, function(error, data){
        if(error) throw error;

        var ylabel = "Devices",
            xlabel = "Density",
            title  = "Node Size and Density",
            target = "#heat_map";

        create_heatmap(data, target, title, ylabel, xlabel);
    });
};