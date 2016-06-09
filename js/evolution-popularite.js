function generateEvolutionPopularite(user) {
    getRequest('webservices/notations_user_m.php?user='+user, function(data) {
        console.log(data);
        generateAxisData('evolution-popularite', data);
    });
}

function generateAxisData(idDiv, data) {
    var plot1 = $.jqplot(idDiv, [data], {
        axes:{
            xaxis:{
                renderer:$.jqplot.DateAxisRenderer
            }
        },
        series:[{lineWidth:4, markerOptions:{style:'square'}}]
    });

    $(window).resize(function() {
        plot1.replot( { resetAxes: true } );
    });
}