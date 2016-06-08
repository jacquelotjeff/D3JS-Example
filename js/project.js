$(document).ready(function(){

	$.ajaxSetup({ cache: false });
	
	generateFriendsEvolution(7);
	generatePercentFriendsMessage(3);
	generateEvolutionPopularite(13)
	generatePopularityByGender(3);


});

function getRequest(url, callback) {
	$.get(url, function(data) {
		data = $.parseJSON(data);
		callback(data);
	});
}