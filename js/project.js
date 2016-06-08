$(document).ready(function(){

    $.ajaxSetup({ cache: false });

    //Begin first
    function getRequest(url, callback) {
        $.get(url, function(data) {
            data = $.parseJSON(data);
            callback(data);
        });
    }

    function generateFirstChart(idDiv, data) {
        var plot1 = $.jqplot(idDiv, [data], {
            title:'',
            axes:{
                xaxis:{
                    renderer:$.jqplot.DateAxisRenderer
                }
            },
            series:[{lineWidth:4, markerOptions:{style:'square'}}]
        });
    }

    var user = 7;
    getRequest('webservices/liste_amis_user_m.php?user='+user, function(data) {
        console.log(data);
        generateFirstChart('first', data);
    });
});
