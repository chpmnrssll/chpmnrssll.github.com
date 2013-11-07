define([ "jquery", "underscore", "backbone", "marionette", "admin/users/router", "admin/categories/router", "admin/pages/router" ], function($, _, Backbone, Marionette, UsersRouter, CategoriesRouter, PagesRouter) {
	return Backbone.Router.extend({
		routes: {
			"admin": "admin",
		},
		initialize: function () {
			this._subRouters = {
				users: new UsersRouter(),
				categories: new CategoriesRouter(),
				pages: new PagesRouter()
			}
			
			require([ "admin/nav/model", "admin/nav/view" ], function (Model, View) {
				window.App.adminNav = {};
				window.App.adminNav.model = new Model();
				window.App.adminNav.view = new View({ model: window.App.adminNav.model });
			});
		},
		admin: function () {
			require([ "admin/view" ], function (View) {
				window.App.adminNav.model.set({ active: "admin" });
				window.App.header.show(window.App.adminNav.view);
				window.App.content.show(new View());
			});
		}
	});
});