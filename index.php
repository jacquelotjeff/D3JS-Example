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
	<link href="css/jquery.jqplot.min.css" type="text/css" rel="stylesheet"></link>
	<script type="text/javascript" src="js/renderer/jqplot.barRenderer.js"></script>
	<script type="text/javascript" src="js/renderer/jqplot.categoryAxisRenderer.js"></script>
	<script type="text/javascript" src="js/renderer/jqplot.highlighter.js"></script>
	<script type="text/javascript" src="js/renderer/jqplot.pieRenderer.js"></script>
	<script type="application/javascript" src="js/renderer/jqplot.dateAxisRenderer.js"></script>
	
	<script type="application/javascript" src="js/d3.min.js"></script>

	<!-- Fichier surchargés -->
	<script type="text/javascript" src="js/percent-friends-message.js"></script>
	<script type="text/javascript" src="js/friends-evolution.js"></script>
    <script type="text/javascript" src="js/pourcent-friend-gender.js"></script>
    <script type="text/javascript" src="js/popularity-by-gender.js"></script>
    <script type="text/javascript" src="js/friends-by-gender-years.js"></script>
    <script type="text/javascript" src="js/popularity-cloud.js"></script>
	<link href="css/project.css" type="text/css" rel="stylesheet"></link>
	
	<?php
		$user = !empty($_GET['user']) ? $_GET['user'] : 1;
		include 'webservices/get_infos_current_user.php';
		$current_user = getInfosCurrentUser($user);
	?>
</head>
<body>
<div class="container">
	<div class="row">
		<div id="user-details" class="col-lg-6 col-sm-6">
		    <div class="card hovercard">
		        <div class="card-background">
		            <img class="card-bkimg" alt="" style="width: 100px; height: 100px; src="https://placeholdit.imgix.net/~text?txtsize=33&w=100&h=100">
		            <!-- http://lorempixel.com/850/280/people/9/ -->
		        </div>
		        <div class="useravatar">
		            <img alt="" src="img/<?= $current_user['chemin'] ?>">
		        </div>
		        <div class="card-info"> <span class="card-title"><?= $current_user['pseudo'] ?></span>

		        </div>
		    </div>
		    <div class="btn-pref btn-group btn-group-justified btn-group-lg" role="group" aria-label="...">
		        <div class="btn-group" role="group">
		            <button type="button" id="stars" class="btn btn-primary" href="#tab1" data-toggle="tab"><span class="glyphicon glyphicon-star" aria-hidden="true"></span>
		                <div class="hidden-xs">Statistiques</div>
		            </button>
		        </div>
		        <div class="btn-group" role="group">
		            <button type="button" id="favorites" class="btn btn-default" href="#tab2" data-toggle="tab"><span class="glyphicon glyphicon-heart" aria-hidden="true"></span>
		                <div class="hidden-xs">Messages</div>
		            </button>
		        </div>
		        <div class="btn-group" role="group">
		            <button type="button" id="following" class="btn btn-default" href="#tab3" data-toggle="tab"><span class="glyphicon glyphicon-user" aria-hidden="true"></span>
		                <div class="hidden-xs"><?= $current_user['nb_friends'] ?> amis</div>
		            </button>
		        </div>
		    </div>
	    </div>
	</div>
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
		<div id="percent-friends-message"></div>
	</div>
	
	<div class="row popularity-by-gender">
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

	<div class="row">
		<div class="col-md-12">
			<h3>Répartition des amis par tranche d'âge et par sexe</h3>
			<div id="friends-by-gender-years-info">
			</div>
			<div id="friends-by-gender-years" class="test"></div>
		</div>
	</div>
	
	<div class="row">
		<div class="col-md-12">
			<h3>Nuage de points de la popularité par tranche d'âge.</h3>
			<div id="popularity-cloud"></div>
		</div>
	</div>
</div>

<script>
	var current_user = '<?= $user ?>';
</script>
<script type="text/javascript" src="js/project.js"></script>

</body>
</html>