$(document).ready(function(){

	$.ajaxSetup({ cache: false });
	
	generateFriendsEvolution(3);
	generatePercentFriendsMessage(3);
	generatePopularityByGender(3);

});

function getRequest(url, callback) {
	$.get(url, function(data) {
		data = $.parseJSON(data);
		callback(data);
	});
}