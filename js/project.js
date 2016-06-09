$(document).ready(function(){

	$.ajaxSetup({ cache: false });
	
	generateFriendsEvolution(current_user);
	generatePercentFriendsMessage(current_user);
	generatePopularityByGender(current_user);
	generatePourcentFriendGender(current_user);
	generateFriendsByGenderYears(current_user);
	generatePopularityCloud(current_user);

});

function getRequest(url, callback) {
	$.get(url, function(data) {
		data = $.parseJSON(data);
		callback(data);
	});
}