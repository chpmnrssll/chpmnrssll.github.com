<?php
require 'Slim/Slim/Slim.php';
require 'mongo/crud.php';
require 'mongo/list.php';
require 'mongo/command.php';

define('MONGO_HOST', 'localhost');
define('DB', 'api');

$app = new Slim();

// Routing
$app->get('/:collection/', '_list');
$app->post('/:collection/', '_create');
$app->get('/:collection/:id', '_read');
$app->put('/:collection/:id', '_update');
$app->delete('/:collection/:id', '_delete');

// @todo: add count collection command mongo/commands.php

// List
function _list($collection) {
	$select = array(
		'limit'  => (isset($_GET['limit']))  ? $_GET['limit']  : false, 
		'page'   => (isset($_GET['page']))   ? $_GET['page']   : false,
		'filter' => (isset($_GET['filter'])) ? $_GET['filter'] : false,
		'regex'  => (isset($_GET['regex']))  ? $_GET['regex']  : false,
		'sort'   => (isset($_GET['sort']))   ? $_GET['sort']   : false
	);
	
	$data = mongoList(MONGO_HOST, DB, $collection, $select);
	echo json_encode($data, JSON_PRETTY_PRINT);
}

// Create
function _create($collection) {
	$document = json_decode(Slim::getInstance()->request()->getBody(), true);
	$data = mongoCreate(MONGO_HOST, DB, $collection, $document);
	echo json_encode($data, JSON_PRETTY_PRINT);
}

// Read
function _read($collection, $id) {
	$data = mongoRead(MONGO_HOST, DB, $collection, $id);
	echo json_encode($data, JSON_PRETTY_PRINT);
}

// Update
function _update($collection, $id) {
	$document = json_decode(Slim::getInstance()->request()->getBody(), true);
	$data = mongoUpdate(MONGO_HOST, DB, $collection, $id, $document);
	echo json_encode($data, JSON_PRETTY_PRINT);
}

// Delete
function _delete($collection, $id) {
	$data = mongoDelete(MONGO_HOST, DB, $collection, $id);
	echo json_encode($data, JSON_PRETTY_PRINT);
}

$app->run();
?>
<script src="//ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min.js"></script>