define([ "jquery", "underscore", "backbone", "marionette"], function($, _, Backbone, Marionette) {
	return {
		initialize: function() {
			var app_router = Backbone.Router.extend({
				routes: {
					"": "home",
					"admin(/:tab)": "admin",
					"*actions": "error"
				},
				home: function () {
					require([ "home/view" ], function (View) {
						window.App.body.show(new View());
					});
				},
				admin: function (tab) {
					require([ "admin/header/view" ], function (View) {
						window.App.header.show(new View());
					});
					
					tab = (null === tab) ? "" : "/" + tab;
					require([ "admin" + tab + "/view" ], function (View) {
						window.App.content.show(new View());
					});
				},
				error: function () {
					console.log("Route not found");
				}
			});
			
			window.App.router = new app_router();
			Backbone.history.start();
		}
	}
});