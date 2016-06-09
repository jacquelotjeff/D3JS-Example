
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
					data.push([1, note, gender]);
				} else if (age >= 22 && age <= 25) {
					data.push([2, note, gender]);
				} else if (age >= 26 && age <= 29) {
					data.push([3, note, gender]);
				}
			}

			//Generate cloud
			generateCloud(data);

		});
	});
}

function generateCloud(data){

	width = 300,   // width of svg
    height = 300,  // height of svg
    padding = 50; // space around the chart, not including labels

	var svg = d3.select('body div.container #popularity-cloud').append("svg").attr("height", height).attr("width", width).style("border", "1px solid black");

	var xScale = d3.scale.linear()
						.domain([0, 4])
						.range([padding, width - padding]);

	var yScale = d3.scale.linear()
						.domain([5, 1])
						.range([height - padding, padding]);

	var xAxis = d3.svg.axis()
						.scale(xScale)
						.orient("bottom")
						.tickValues([1, 2, 3])
						.tickFormat(function (d) {
							return getStrSliceYear(d);
						});

	var yAxis = d3.svg.axis()
						.scale(yScale)
						.orient("left")
						.tickFormat(d3.format("d"));

	svg.append("g").attr("class", "axis")
					.call(xAxis)
					.attr("transform", "translate(0," + (height-padding) + ")");

	svg.append("g").attr("class", "axis")
					.call(yAxis)
					.attr("transform", "translate("+padding+",0)");

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

		svg.append("text")
            .attr("text-anchor", "middle")  // this makes it easy to centre the text as the transform is applied to the anchor
            .attr("transform", "translate("+ (padding/2) +","+(height/2)+")rotate(-90)")  // text is drawn off the screen top left, move down and out and rotate
            .text("Note");

		svg.append("text")
            .attr("text-anchor", "middle")  // this makes it easy to centre the text as the transform is applied to the anchor
            .attr("transform", "translate("+ (width/2) +","+(height-(padding/3))+")")  // centre below axis
            .text("Tranche d'âge");

	var circles = svg
					.selectAll("circle")
					.data(data)
					.enter()
					.append("circle");
	
	circles
		.attr("cx", function (d) { return xScale(d[0]); })
		.attr("cy", function (d) { return yScale(d[1]); })
		.attr("r", 3)
		.style("fill", function (d) {
			//Comparaison du genre
			if (d[2] == 1) {
				return 'blue';
			} else {
				return 'violet';
			}
		});
}

function getStrSliceYear(data){
	if (data == 1) {
		return "18-21";
	} else if (data == 2) {
		return "22-25";
	} else {
		return "26-29";
	}
}