function generateFriendsEvolution(user) {
	getRequest('webservices/liste_amis_user_m.php?user='+user, function(data) {
	    generateAxisData('first', data);
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