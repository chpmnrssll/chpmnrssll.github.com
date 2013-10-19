define([ "jquery", "underscore", "backbone", "marionette" ], function($, _, Backbone, Marionette) {
	var AdminRouter = Backbone.Router.extend({
		routes: {
			"admin/users": "users",
			"admin/categories": "categories",
			"admin(/:tab)": "admin"
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
			
			filename = (null === tab) ? "" : "/" + tab;
			require([ "admin" + filename + "/view" ], function (View) {
				window.App.content.show(new View());
			});
		}
	});
	
	return AdminRouter;
});