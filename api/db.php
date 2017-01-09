<?php
function getDB() {
	$dbhost="localhost";
	$dbuser="root";
	$dbpass="redhat@1111p";
	$dbname="time-board";
	$dbConnection = new PDO("mysql:host=$dbhost;dbname=$dbname", $dbuser, $dbpass);	
	$dbConnection->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
	return $dbConnection;
}


?>