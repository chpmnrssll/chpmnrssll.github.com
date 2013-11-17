require.config({
	urlArgs: "bust=" +  (new Date()).getTime(),
	paths: {
		jquery: "libs/jquery/jquery.min",
		bootstrap: "//netdna.bootstrapcdn.com/bootstrap/3.0.0/js/bootstrap.min",
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
		bootstrap: {
			exports: "Bootstrap"
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

require([ "jquery", "bootstrap", "underscore", "backbone", "marionette"], function($, Bootstrap, _, Backbone, Marionette) {
	window.App = new Marionette.Application();
	window.App.apiUrl = "http://chpmn-rssll.rhcloud.com/";	//"http://localhost/api/";
	
	window.App.addInitializer(function(options) {
		require([ "auth/model", "auth/view", "admin/users/collection", "admin/categories/collection", "admin/pages/collection", "router" ],
			function (AuthModel, AuthView, UsersCollection, CategoriesCollection, PagesCollection, Router) {
			
			window.App.addRegions({
				body: "body",
				navbar: "#navbar",
				content: "#content",
			});
			
			
			window.App.models = {
				auth: new AuthModel()
			}
			
			window.App.views = {
				auth: new AuthView({ model: window.App.models.auth })
			}
			
			window.App.collections = {
				users:  new UsersCollection(),
				categories: new CategoriesCollection(),
				pages: new PagesCollection()
			}
			
			_.each(window.App.collections, function(collection, key, list) {
				collection.fetch();
			});
			
			
			window.App.router = new Router();
			
			if (Backbone.history) {
				Backbone.history.start();
			}
			
			window.App.navbar.show(window.App.views.auth);
		});
		
	});

	window.App.start();
	//setTimeout(function () { window.App.start(); }, 3000);
});