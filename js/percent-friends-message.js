function generatePercentFriendsMessage(user) {

	// On appelle le webservice local, possibilité d'ajouter des paramètre get dans l'URL exploitable dans le script qui génère les données
	var url = 'webservices/messages_user.php?user='+user;
	getRequest(url, function(messages){
		
		var url = 'webservices/liste_amis_user.php?user='+user;
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
			var plot1 = $.jqplot('percent-friends-message', [data], {
				seriesDefaults:{
					renderer:$.jqplot.PieRenderer, 
					rendererOptions: { showDataLabels: true }
				},
				legend:{
					show:true, 
					location:'e',
				}       
			});

		});
	});
}