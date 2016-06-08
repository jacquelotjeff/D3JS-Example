function generateEvolutionPopularite(user) {
    getRequest('webservices/notation_user.php?user='+user, function(data) {
        generateAxisData('evolution-popularite', data);
    });
}

function generateAxisData(idDiv, data) {
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