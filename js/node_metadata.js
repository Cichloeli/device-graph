function updateNodeTab(){
    // if there are existing charts delete them
    var old = document.getElementById("tab_charts");
    if(old != null) removeElement("tab_charts");

    // create chart location
    var html = '<div class="row">' +
                    '<div class="card">' +
                        '<div class="cardInnerMargin">' +
                            '<div id="node_metadata">' +
                                '<h1 align="center">Click on a Node</h2>' +
                            '</div>'+
                        '</div>' +
                    '</div>' +
                '</div>';

    // append the charts to html
    addElement("node", "div", "container-fluid", "tab_charts", html);
};