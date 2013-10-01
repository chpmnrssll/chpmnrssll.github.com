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
						window.App.header.close();
						window.App.content.show(new View());
					});
				},
				admin: function (tab) {
					
					require([ "admin/nav/view" ], function (View) {
						window.App.header.show(new View());
					});
					
					filename = (null === tab) ? "" : "/" + tab;
					require([ "admin" + filename + "/view" ], function (View) {
						window.App.content.show(new View());
					});
				},
				error: function () {
					console.log("Route: " + Backbone.history.fragment + " not found");
				}
			});
			
			window.App.router = new app_router();
			Backbone.history.start();
		}
	}
});