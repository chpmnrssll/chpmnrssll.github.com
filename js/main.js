require.config({
	urlArgs: "bust=" +  (new Date()).getTime(),
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
		window.App.apiUrl = "http://chpmn-rssll.rhcloud.com/";	//"http://localhost/api/";
		window.App.router = new Router();
		window.App.models = {};
		window.App.views = {};
		window.App.addRegions({
			body: "body",
			header: "#header",
			content: "#content",
			footer: "#footer"
		});
	});
	
	window.App.on("initialize:after", function(options) {
		require([ "auth/model", "auth/view" ], function (AuthModel, AuthView) {
			window.App.models.AuthModel = new AuthModel();
			window.App.views.AuthView = new AuthView({ model: window.App.models.AuthModel });
			//window.App.header.show(window.App.views.AuthView);
		});
		
		if (Backbone.history) {
			Backbone.history.start();
		}
	});

	window.App.start();
	//setTimeout(function () { window.App.start(); }, 3000);
});