// read in distribution data and create chart

var SIZEINPUT = "data_files/SizeDistribution.tsv";
var DENSINPUT = "data_files/SizeDistribution.tsv";

// create charts for home tag
function updateHomeTab(){

    // if there are existing charts delete them
    var old = document.getElementById("tab_charts");
    if(old != null) removeElement("tab_charts");

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
    d3.tsv(SIZEINPUT, loadSize);
    d3.tsv(SIZEINPUT, loadDens);

    // append the charts to html
    addElement("home", "div", "container-fluid", "tab_charts", html)
}

// size distribution
function loadSize(error, data) {
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
};

//density distribution
function loadDens(error, data) {
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
};