<!DOCTYPE html>
<html>
<head>
	<title>TPS 3 Visualisation</title>

	<!-- Inclusion JS (librairie + scripts de création de graph) -->
	<script type="text/javascript" src="js/jquery.js"></script>
	<script type="text/javascript" src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/js/bootstrap.min.js"></script>
	<link href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap.min.css" type="text/css" rel="stylesheet"></link>

	<!-- D3 js -->
	<script type="text/javascript" src="js/d3.min.js"></script>
	
	<!-- Intégration de Jqplot -->
	<script type="text/javascript" src="js/jquery.jqplot.min.js"></script>
	<script type="text/javascript" src="js/renderer/jqplot.barRenderer.js"></script>
	<script type="text/javascript" src="js/renderer/jqplot.categoryAxisRenderer.js"></script>
	<script type="text/javascript" src="js/renderer/jqplot.highlighter.js"></script>
	<script type="text/javascript" src="js/renderer/jqplot.pieRenderer.js"></script>
	<script type="application/javascript" src="js/renderer/jqplot.dateAxisRenderer.js"></script>

	<!-- Fichier surchargés -->
	<script type="text/javascript" src="js/percent-friends-message.js"></script>
	<script type="text/javascript" src="js/friends-evolution.js"></script>
    <script type="text/javascript" src="js/pourcent-friend-gender.js"></script>
    <script type="text/javascript" src="js/popularity-by-gender.js"></script>
    <script type="text/javascript" src="js/friends-by-gender-years.js"></script>
	<script type="text/javascript" src="js/project.js"></script>
	<link href="css/project.css" type="text/css" rel="stylesheet"></link>

</head>
<body>
<div class="container">
    <div class="page-header">
        <h1>Statistiques</h1>
    </div>

    <div class="col-md-12 friends-evolution">
        <h3>Evolution du nombre d'amis</h3>
        <div id="friends-evolution"></div>
    </div>

    <div class="second">
        <h3>Deuxième statistique</h3>
        <div id="second"></div>
    </div>

    <div class="col-md-12 pourcent_friend_gender">
        <h3>Pourcentage d'amis masculins et féminins</h3>
        <div id="pourcent_friend_gender"></div>
    </div>

	<div class="col-md-12 percent-friends-message">
		<h3>Pourcentage de messages envoyés à des amis / non amis</h3>
		<div id="percent-friends-message">
			
		</div>
	</div>

	<div class="col-md-12">
		<h3>Popularité en fonction du genre</h3>
		<div class="col-md-6">
			<h1>Hommes</h1>
			<div id="popularity-by-gender-m">
			</div>
		</div>
		<div class="col-md-6">
			<h1>Femmes</h1>
			<div id="popularity-by-gender-f" class="col-md-6">
			</div>
		</div>
	</div>

	<div class="col-md-12">
		<h3>Répartition des amis par tranche d'âge et par sexe</h3>
		<div id="friends-by-gender-years-info">
		</div>
		<div id="friends-by-gender-years" class="test">
		</div>
	</div>
</div>

</body>
</html>