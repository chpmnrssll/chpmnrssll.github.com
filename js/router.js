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
			
			//seems hacky, must wait until all subRouters loaded before calling Backbone.history.start
			window.App.vent.on("loaded", function() {
				if (Backbone.history) {
					Backbone.history.start();
				}
			});
		},
		home: function () {
			require([ "home/view" ], function (View) {
				window.App.header.close();
				window.App.content.show(new View());
			});
		},
		error: function () {
			console.log("Route: " + Backbone.history.fragment + " not found");
		}
	});
});