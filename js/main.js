require.config({
	urlArgs: "bust=" +  (new Date()).getTime(),
	baseUrl: "js/",
	paths: {
		jquery: "libs/jquery/jquery.min",
		underscore: "libs/underscore/underscore.min",
		backbone: "libs/backbone/backbone.min",
		"backbone.wreqr": "libs/backbone.marionette/backbone.wreqr",
		"backbone.eventbinder": "libs/backbone.marionette/backbone.eventbinder",
		"backbone.babysitter": "libs/backbone.marionette/backbone.babysitter",
		marionette: "libs/backbone.marionette/backbone.marionette.min",
	},
	shim: {
		jquery: {
			exports: "$"
		},
		underscore: {
			exports: "_"
		},
		backbone: {
			deps: ["jquery", "underscore"],
			exports: "Backbone"
		},
		marionette: {
			deps: ["jquery", "underscore", "backbone"],
			exports: "Marionette"
		}
	}
});

require([ "jquery", "underscore", "backbone", "marionette", "router" ], function($, _, Backbone, Marionette, Router) {
	window.App = new Marionette.Application();
	
	window.App.addInitializer(function(options) {
		//window.App.apiUrl = "http://localhost/chpmnrssll.github.io/api/";
		window.App.apiUrl = "http://chpmn-rssll.rhcloud.com/";
		window.App.router = new Router();
		window.App.addRegions({
			body: "body",
			header: "#header",
			content: "#content",
			footer: "#footer"
		});
	});
	
	window.App.start();
	//setTimeout(function () { window.App.start(); }, 3000);
});

/*
$(document).ready(function() {
		
	new Users().fetch({
		success: function (collection, response, options) {
			app_router.users = collection;
		}
	});
	
	// Create & Read model test
	var user = new User();
	user.save({ name: "Russ", email: "russ@mail.com", password: "russ" }, {
		success: function (model, response, options) {
			console.log(response);
			getModel();
		},
		error: function (model, response, options) {
			console.log(response);
			alert("error");
		}
	});
	
	function getModel() {
		var newUser = new User({ id: user.get("_id") });
		newUser.fetch({
			success: function (model, response, options) {
				console.log(response);
				alert(JSON.stringify(model));
			},
			error: function (model, response, options) {
				console.log(response);
				alert("error");
			}
		});
	}
});
*/