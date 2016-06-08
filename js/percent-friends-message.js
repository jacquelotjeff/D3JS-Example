$(document).ready(function(){

$.ajaxSetup({ cache: false });
generateThirdChart();

	//Begin third
	function getRequest(url, callback) {
		$.get(url, function(data) {
			data = $.parseJSON(data);
			callback(data);
		});
	}

	function generateThirdChart(idDiv, data) {
		var user = 3;

		// On appelle le webservice local, possibilité d'ajouter des paramètre get dans l'URL exploitable dans le script qui génère les données
		var url = 'http://localhost/data-visu/TP_NOTE_DATAVIZ/webservices/messages_user.php?user='+user;
		getRequest(url, function(messages){
			
			var url = 'http://localhost/data-visu/TP_NOTE_DATAVIZ/webservices/liste_amis_user.php?user='+user;
			getRequest(url, function(friends){

				var countMessageToFriends = 0;
				
				friendsId = [];
				for (var i = 0; i < friends.length; i++) {
					friendsId.push(friends[i][1]);
				}

				//On parcourt les messages
				for (var i = 0; i < messages.length; i++) {

					var found = $.inArray(messages[i][1], friendsId) > -1;

					if(found){
						countMessageToFriends ++;
					}
				}
				//var percentMessageToFriends = countMessageToFriends/messages.length*100;

				var data = [
					["Ami", countMessageToFriends],
					["Non ami", messages.length - countMessageToFriends]
				];

				//Display the diagram
				generatePieChart('percent-friends-message', data);


			});
		});
	}

	function generatePieChart(idDiv, data) {
		// On génère l'exemple du TP :
		var plot1 = $.jqplot(idDiv, [data], {
			seriesDefaults:{
				renderer:$.jqplot.PieRenderer, 
				rendererOptions: { showDataLabels: true }
			},
			legend:{
				show:true, 
				location:'e',
			}       
		});
	}
	//End third

});