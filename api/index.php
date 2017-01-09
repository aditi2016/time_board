<?php

require_once "header.php";

include 'db.php';
require 'Slim/Slim.php';


//objects resource
require_once "resources/objects/result/showResult.php";
require_once "resources/objects/showAllChallanges.php";
require_once "resources/objects/insertChallenge.php";
require_once "resources/objects/result/insertUser.php";
require_once "resources/auth/userAuth.php";
require_once "resources/user/checkMobile.php";

//app
require_once "app.php";



?>