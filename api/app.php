<?php
/**
 * Created by PhpStorm.
 * User: spider-ninja
 * Date: 6/4/16
 * Time: 1:12 PM
 */

\Slim\Slim::registerAutoloader();

global $app;

if(!isset($app))
    $app = new \Slim\Slim();

$app->response->headers->set('Access-Control-Allow-Credentials',  'true');

$app->response->headers->set('Content-Type', 'application/json');

/* Starting routes */

$app->get('/objects/result','showResult');
$app->get('/objects', 'showAllChallanges');
$app->post('/objects','insertChallenge' );
/*$app->get('/cities','getAllCities');*/


/* Ending Routes */

$app->run();