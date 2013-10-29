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
			require([ "home/view" ], function (HomeView) {
				window.App.header.close();
				window.App.content.show(new HomeView());
				window.App.footer.show(window.App.views.AuthView);
			});
		},
		error: function () {
			console.log("Route: " + Backbone.history.fragment + " not found");
		}
	});
});