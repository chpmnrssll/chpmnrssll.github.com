<?php
require 'Slim/Slim/Slim.php';
require 'mongo/crud.php';
require 'mongo/list.php';
require 'mongo/command.php';

define('MONGO_HOST', $_ENV['OPENSHIFT_MONGODB_DB_URL']);	//'localhost'
define('DB', 'chpmn');	//api

$app = new Slim();
$app->response()->header('Content-Type', 'application/json');
$app->response()->header('Access-Control-Allow-Origin', '*');

// @todo: add count collection command mongo/commands.php

$app->get('/', function () use ($app) {
	$app->response()->body('GET /');
	$app->stop();
});

// CORS Preflight response
$app->options('/.*?', function () use ($app) {
	$app->response()->header('Access-Control-Allow-Origin', '*');
	$app->response()->header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
	$app->response()->header('Access-Control-Allow-Headers', 'X-Requested-With, X-authentication, X-client, Content-Type');
	$app->stop();
});

// List
$app->get('/:collection/', function ($collection) use ($app) {
	$select = array(
		'limit'  => (isset($_GET['limit']))  ? $_GET['limit']  : false, 
		'page'   => (isset($_GET['page']))   ? $_GET['page']   : false,
		'filter' => (isset($_GET['filter'])) ? $_GET['filter'] : false,
		'regex'  => (isset($_GET['regex']))  ? $_GET['regex']  : false,
		'sort'   => (isset($_GET['sort']))   ? $_GET['sort']   : false
	);
	
	$data = mongoList(MONGO_HOST, DB, $collection, $select);
	$app->response()->body(json_encode($data));
	$app->stop();
});

// Create
$app->post('/:collection/', function ($collection) use ($app) {
	$document = json_decode(Slim::getInstance()->request()->getBody(), true);
	$data = mongoCreate(MONGO_HOST, DB, $collection, $document);
	$app->response()->body(json_encode($data));
	$app->stop();
});

// Read
$app->get('/:collection/:id', function ($collection, $id) use ($app) {
	$data = mongoRead(MONGO_HOST, DB, $collection, $id);
	$app->response()->body(json_encode($data));
	$app->stop();
});

// Update
$app->put('/:collection/:id', function ($collection, $id) use ($app) {
	$document = json_decode(Slim::getInstance()->request()->getBody(), true);
	$data = mongoUpdate(MONGO_HOST, DB, $collection, $id, $document);
	$app->response()->body(json_encode($data));
	$app->stop();
});

// Delete
$app->delete('/:collection/:id', function ($collection, $id) use ($app) {
	$data = mongoDelete(MONGO_HOST, DB, $collection, $id);
	$app->response()->body(json_encode($data));
	$app->stop();
});

$app->run();
?>