
function generatePopularityCloud(user){

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
			
			var data = [];
			
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
				var age = noteur[6];

				if (age >= 18 && age <= 21) {
					data.push([1, note]);
				} else if (age >= 22 && age <= 25) {
					data.push([2, note]);
				} else if (age >= 25 && age <= 29) {
					data.push([3, note]);
				}
			}

			//Generate cloud
			generateCloud(data);

			console.log(data);

		});
	});
}

function generateCloud(data){

	var svg = d3.select('body div.container #popularity-cloud').append("svg").attr("height", 500).attr("width", 1000).style("border", "1px solid black");

	var xScale = d3.scale.linear()
						.domain([0, 4])
						.range([10, 480]);

	var yScale = d3.scale.linear()
						.domain([0, 5])
						.range([10, 240]);

	var xAxis = d3.svg.axis()
						.scale(xScale)
						.orient("bottom");

	var yAxis = d3.svg.axis()
						.scale(yScale)
						.orient("left");

	svg.append("g").attr("class", "axis")
					.call(xAxis)
					.attr("transform", "translate(0,"+(480)+")");

	svg.append("g").attr("class", "axis")
					.call(yAxis);

	svg.selectAll("text")
		.data(data)
		.enter()
		.append("text")
		.text(function(d){
			return "("+d[0]+","+d[1]+")";
		})
		.attr("x", function(d){
			return xScale(d[0]);
		})
		.attr("y", function(d){
			return yScale(d[1]);
		});

	var circles = svg
					.selectAll("circle")
					.data(data)
					.enter()
					.append("circle");
	
	circles
		.attr("cx", function (d) { return xScale(d[0]); })
		.attr("cy", function (d) { return yScale(d[1]); })
		.attr("r", 3)
		.style("fill", "red");
}