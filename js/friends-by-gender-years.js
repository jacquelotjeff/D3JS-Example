function generateFriendsByGenderYears(user) {
	// On appelle le webservice local, possibilité d'ajouter des paramètre get dans l'URL exploitable dans le script qui génère les données
	var url = 'webservices/liste_amis_user.php?user='+user;

	getRequest(url, function(friends){
		
		var friendsId = [];

		for (var i = 0; i < friends.length; i++) {
			//Récupération de la note
			friendsId.push(friends[i][1]);
		}

		var url = 'webservices/infos_user.php?user=' + friendsId.join();		

		getRequest(url, function(friends) {

			var data1 = {};
			data1[0] = {};
			data1[1] = {};
			
			var slicesYears = ['18-21', '22-25', '25-29'];
			//Initialisation du tableau avec des valeurs à zeros
			for (var i = 0; i < slicesYears.length; i++) {
				data1[0][slicesYears[i]] = 0;
				data1[1][slicesYears[i]] = 0;
			}

			for (var i = 0; i < friends.length; i++) {

				var friend = friends[i];
				var age = friend[6];
				var gender = friend[7];
				
				if (age >= 18 && age <= 21) {

						data1[gender]["18-21"] ++;

				} else if (age >= 22 && age <= 25) {

						data1[gender]["22-25"] ++;

				} else if (age >= 25 && age <= 29) {

						data1[gender]["25-29"] ++;

				}

			}

			var serieMale = [];
			for (var age in data1[1]) {
				serieMale.push(data1[1][age]);
			}

			var serieFemale = [];
			for (var age in data1[0]) {
				serieFemale.push(data1[0][age]);
			}

			plot2 = $.jqplot('friends-by-gender-years', [serieFemale, serieMale], {
	            seriesDefaults: {
	                renderer:$.jqplot.BarRenderer,
	                pointLabels: { show: true }
	            },
	            axes: {
	                xaxis: {
	                    renderer: $.jqplot.CategoryAxisRenderer,
	                    ticks: slicesYears
	                }
	            }
        	});

			$(window).resize(function() {
				plot2.replot( { resetAxes: true } );
			});
				
        	$('#friends-by-gender-years').bind('jqplotDataHighlight', 
	            function (ev, seriesIndex, pointIndex, data) {
	            	var genderStr = (seriesIndex == 1 ? 'homme' : 'femme');
	            	console.log(data);
	                $('#friends-by-gender-years-info').html(data[1] + " ami(s) " + genderStr + " dont l'âge est compris dans " + slicesYears[pointIndex]);
	            }
        	);

        	$('#friends-by-gender-years').bind('jqplotDataUnhighlight', 
	            function (ev) {
	                $('#friends-by-gender-years-info').html('Survolez les données pour lire une interprétation.');
	            }
        	);
		});

	});
}
