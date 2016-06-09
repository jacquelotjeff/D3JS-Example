<?php
	
	function getInfosCurrentUser($user)
	{
		// Le tableau de résultat
		$result_request = array();
		// Connexion à la BDD
		include("bdd/connexion_bdd.php");
		
		$query = "SELECT u.id, pseudo, password, email, p.chemin, date_inscription, age, sexe, COUNT(r.user2) as nb_friends
				FROM utilisateurs u
				LEFT JOIN photos p
				ON p.id = u.photo
				LEFT JOIN relations r
				ON r.user1 = u.id
				";
		if($user != 0) {
			$query = $query." WHERE u.id = ".$user;
		}		
		$result = mysqli_query($conn, $query);
	
		// Déconnexion de la BDD
		include("bdd/deconnexion_bdd.php");
		
		return mysqli_fetch_assoc($result);
	}
?>