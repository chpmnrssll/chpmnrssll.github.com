define([ "jquery", "underscore", "backbone", "marionette" ], function($, _, Backbone, Marionette) {
	return Backbone.Router.extend({
		routes: {
			"admin/users": "users",
			"admin/users/create": "createUser",
			"admin/users/update/:id": "updateUser",
			"admin/users/delete/:id": "deleteUser",
		},
		initialize: function () {
			window.App.users = {};
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
			window.App.adminNav.model.set({ active: "users" });
			window.App.header.show(window.App.adminNav.view);
			var user = window.App.users.collection.findWhere({ id: id });
			user.save({ name: prompt("Name:", user.get("name")), email: prompt("Email:", user.get("email")) }, {
				success: function (model, response, options) {
					window.App.router.navigate("admin/users", { trigger: true });
				}
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
		}
	});
});