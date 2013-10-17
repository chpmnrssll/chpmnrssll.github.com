define([ "jquery", "underscore", "backbone", "marionette"], function($, _, Backbone, Marionette) {
	return {
		initialize: function() {
			var app_router = Backbone.Router.extend({
				routes: {
					"": "home",
					"admin/users": "users",
					"admin/categories": "categories",
					"admin(/:tab)": "admin",
					"*actions": "error"
				},
				home: function () {
					require([ "home/view" ], function (View) {
						window.App.header.close();
						window.App.content.show(new View());
					});
				},
				users: function () {
					require([ "admin/nav/view", "admin/nav/model" ], function (View, Model) {
						var m = new Model({ active: "users" });
						window.App.header.show(new View({ model: m }));
					});
					
					require([ "admin/users/collection", "admin/users/collectionView" ], function (Collection, View) {
						new Collection().fetch({
							success: function (collection, response, options) {
								window.App.content.show(new View({ collection: collection }));
							}
						});
					});
				},
				categories: function () {
					require([ "admin/nav/view", "admin/nav/model" ], function (View, Model) {
						var m = new Model({ active: "categories" });
						window.App.header.show(new View({ model: m }));
					});
					
					require([ "admin/categories/collection", "admin/categories/collectionView" ], function (Collection, View) {
						new Collection().fetch({
							success: function (collection, response, options) {
								window.App.content.show(new View({ collection: collection }));
							}
						});
					});
				},
				admin: function (tab) {
					require([ "admin/nav/view", "admin/nav/model"  ], function (View, Model) {
						var m = new Model({ active: "admin" });
						window.App.header.show(new View({ model: m }));
					});
					alert(tab);
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