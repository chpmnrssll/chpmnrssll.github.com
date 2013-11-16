define([ "jquery", "underscore", "backbone", "marionette", "admin/router" ], function($, _, Backbone, Marionette, AdminRouter) {
	return Backbone.Router.extend({
		routes: {
			"": "home",
			"*actions": "error"
		},
		initialize: function () {
			this._subRouters = {
				admin: new AdminRouter()
			}
		},
		home: function () {
			require([ "home/collectionView" ], function (View) {
				window.App.header.close();
				
				//update collection first
				window.App.collections.pages.fetch({
					success: function (collection, response, options) {
						collection.set(collection.filter(
							function (page) {
								return page.get("category") !== "Admin";
							}
						));
						window.App.content.show(new View({ collection: collection }));
					}
				});
			});
		},
		error: function () {
			console.log("Route: " + Backbone.history.fragment + " not found");
		}
	});
});