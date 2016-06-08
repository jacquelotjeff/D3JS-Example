function generatePopularityByGender(user) {

	// On appelle le webservice local, possibilité d'ajouter des paramètre get dans l'URL exploitable dans le script qui génère les données
	var url = 'webservices/notations_user.php?user='+user;
	getRequest(url, function(notations){
		for (var i = 0; i < notations.length; i++) {
			console.log(notations[i]);
		}
	});
}