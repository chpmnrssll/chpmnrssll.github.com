<?php
require 'Slim/Slim/Slim.php';
require 'mongo/crud.php';
require 'mongo/list.php';
require 'mongo/command.php';

define('MONGO_HOST', 'localhost');
define('DB', 'api');

$app = new Slim();

// @todo: add count collection command mongo/commands.php

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
	$app->response()->header('Content-Type', 'application/json');
	$app->response()->body(json_encode($data));
	$app->stop();
});

// Create
$app->post('/:collection/', function ($collection) use ($app) {
	$document = json_decode(Slim::getInstance()->request()->getBody(), true);
	$data = mongoCreate(MONGO_HOST, DB, $collection, $document);
	
	$app->response()->header('Content-Type', 'application/json');
	$app->response()->body(json_encode($data));
	$app->stop();
});

// Read
$app->get('/:collection/:id', function ($collection, $id) use ($app) {
	$data = mongoRead(MONGO_HOST, DB, $collection, $id);
	
	$app->response()->header('Content-Type', 'application/json');
	$app->response()->body(json_encode($data));
	$app->stop();
});

// Update
$app->put('/:collection/:id', function ($collection, $id) use ($app) {
	$document = json_decode(Slim::getInstance()->request()->getBody(), true);
	$data = mongoUpdate(MONGO_HOST, DB, $collection, $id, $document);
	
	$app->response()->header('Content-Type', 'application/json');
	$app->response()->body(json_encode($data));
	$app->stop();
});

// Delete
$app->delete('/:collection/:id', function ($collection, $id) use ($app) {
	$data = mongoDelete(MONGO_HOST, DB, $collection, $id);
	
	$app->response()->header('Content-Type', 'application/json');
	$app->response()->body(json_encode($data));
	$app->stop();
});

$app->run();
?>