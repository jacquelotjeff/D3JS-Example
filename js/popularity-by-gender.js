function generatePopularityByGender(user) {
	// On appelle le webservice local, possibilité d'ajouter des paramètre get dans l'URL exploitable dans le script qui génère les données
	var url = 'webservices/notations_user.php?user='+user;

	getRequest(url, function(notations){
		
		var noteurs = [];

		for (var i = 0; i < notations.length; i++) {
			//Récupération de la note
			var notation = notations[i];
			noteurs.push(notations[i][0]);
		}

		var url = 'webservices/infos_user.php?user=' + noteurs.join();		

		getRequest(url, function(infosNoteurs){
			
			var data1 = {};
			data1[0] = {};
			data1[1] = {};
			
			var noteursIndex = [];
			for (var i = 0; i < infosNoteurs.length; i++) {
				noteursIndex[infosNoteurs[i][0]] = infosNoteurs;
			}

			for (var i = 0; i < notations.length; i++) {
				//Récupération de la note
				var notation = notations[i];

				//Récupération du genre et de la note afin de classés bien dans le tableau
				var note = notation[2];
				var noteur = noteursIndex[notation[0]][0];
				var gender = noteur[7];

				if (data1[gender][note]) {
					data1[gender][note] ++;
				} else {
					data1[gender][note] = 1;
				}
			}

			dataMale = [];
			for (var note in data1[1]) {
				dataMale.push(
					["Note " + note, data1[1][note]] 
				);
			}

			dataFemale = [];
			for (var note in data1[0]) {
				dataFemale.push(
					["Note " + note, data1[0][note]] 
				);
			}
			
			//Display the diagram
			if (dataMale.length!=0) {
				var plot1 = $.jqplot('popularity-by-gender-m', [dataMale], {
					seriesDefaults:{
						renderer:$.jqplot.PieRenderer, 
						rendererOptions: { showDataLabels: true }
					},
					legend:{
						show:true, 
						location:'e',
					}       
				});

				$(window).resize(function() {
					plot1.replot( { resetAxes: true } );
				});
			} else {
				var noDataHtml =  $("#no-data").html();
				$("#popularity-by-gender-m").append(noDataHtml);
			}

			if (dataFemale.length!=0) {
				var plot2 = $.jqplot('popularity-by-gender-f', [dataFemale], {
					seriesDefaults:{
						renderer:$.jqplot.PieRenderer, 
						rendererOptions: { showDataLabels: true }
					},
					legend:{
						show:true, 
						location:'e',
					}       
				});

				$(window).resize(function() {
					plot2.replot( { resetAxes: true } );
				});
			} else {
				var noDataHtml =  $("#no-data").html();
				$("#popularity-by-gender-f").append(noDataHtml);
			}

		});
	});
}