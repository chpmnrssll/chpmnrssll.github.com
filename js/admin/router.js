define([ "jquery", "underscore", "backbone", "marionette" ], function($, _, Backbone, Marionette) {
	return Backbone.Router.extend({
		routes: {
			"admin": "admin",
			"admin/users": "users",
			"admin/users(/:create)": "createUser",
			"admin/users(/update/:id)": "updateUser",
			"admin/users(/delete/:id)": "deleteUser",
			"admin/categories": "categories",
			"admin/pages": "pages"
		},
		initialize: function () {
			console.log("router.initialize");
			require([ "admin/nav/model", "admin/nav/view" ], function (Model, View) {
				window.App.users = {};
				window.App.adminNav = {};
				window.App.adminNav.model = new Model();
				window.App.adminNav.view = new View({ model: window.App.adminNav.model });
				
				//seems hacky, must wait until all subRouters loaded before calling Backbone.history.start
				window.App.vent.trigger("loaded");
			});
		},
		admin: function () {
			require([ "admin/view" ], function (View) {
				window.App.adminNav.model.set({ active: "admin" });
				window.App.header.show(window.App.adminNav.view);
				window.App.content.show(new View());
			});
		},
		users: function () {
			require([ "admin/users/collection", "admin/users/collectionView" ], function (Collection, View) {
				window.App.adminNav.model.set({ active: "users" });
				window.App.header.show(window.App.adminNav.view);
				new Collection().fetch({
					success: function (collection, response, options) {
						window.App.users.collection = collection;
						window.App.content.show(new View({ collection: collection }));
					}
				});
			});
		},
		createUser: function () {
			require([ "admin/users/model" ], function (Model) {
				window.App.adminNav.model.set({ active: "users" });
				window.App.header.show(window.App.adminNav.view);
				var user = new Model();
				user.save({ name: prompt("Name:", ""), email: prompt("Email:", "") }, {
					success: function (model, response, options) {
						window.App.router.navigate("admin/users", { trigger: true });
					}
				});
			});
		},
		updateUser: function (id) {
			require([ "admin/users/model" ], function (Model) {
				window.App.adminNav.model.set({ active: "users" });
				window.App.header.show(window.App.adminNav.view);
				var user = window.App.users.collection.findWhere({ id: id });
				
				user.save({ name: prompt("Name:", user.get("name")), email: prompt("Email:", user.get("email")) }, {
					success: function (model, response, options) {
						window.App.router.navigate("admin/users", { trigger: true });
					}
				});
			});
		},
		deleteUser: function (id) {
			var model = window.App.users.collection.findWhere({ id: id });
			
			if(confirm("Delete User?")) {
				model.destroy({
					success: function (model, response, options) {
						window.App.router.navigate("admin/users", { trigger: true });
					}
				});
			}
		},
		categories: function () {
			require([ "admin/categories/collection", "admin/categories/collectionView" ], function (Collection, View) {
				window.App.adminNav.model.set({ active: "categories" });
				window.App.header.show(window.App.adminNav.view);
				new Collection().fetch({
					success: function (collection, response, options) {
						window.App.content.show(new View({ collection: collection }));
					}
				});
			});
		},
		pages: function () {
			require([ "admin/pages/collection", "admin/pages/collectionView" ], function (Collection, View) {
				window.App.adminNav.model.set({ active: "pages" });
				window.App.header.show(window.App.adminNav.view);
				new Collection().fetch({
					success: function (collection, response, options) {
						window.App.content.show(new View({ collection: collection }));
					}
				});
			});
		}
	});
});