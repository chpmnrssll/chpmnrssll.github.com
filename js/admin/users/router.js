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
			
			require([ "admin/users/collection" ], function (Collection) {
				new Collection().fetch({
					success: function (collection, response, options) {
						window.App.users.collection = collection;
					}
				});
			});
		},
		users: function () {
			require([ "admin/users/collectionView" ], function (View) {
				window.App.adminNav.model.set({ active: "users" });
				window.App.header.show(window.App.adminNav.view);
				window.App.content.show(new View({ collection: window.App.users.collection }));
			});
		},
		createUser: function () {
			require([ "admin/users/model", "admin/users/updateView" ], function (Model, View) {
				window.App.adminNav.model.set({ active: "users" });
				window.App.header.show(window.App.adminNav.view);
				
				var user = new Model();
				window.App.users.collection.add(user);
				window.App.content.show(new View({ model: user }));
			});
		},
		updateUser: function (id) {
			require([ "admin/users/updateView" ], function (View) {
				window.App.adminNav.model.set({ active: "users" });
				window.App.header.show(window.App.adminNav.view);
				
				var user = window.App.users.collection.findWhere({ id: id });
				window.App.content.show(new View({ model: user }));
			});
		},
		deleteUser: function (id) {
			if(confirm("Delete User?")) {
				var model = window.App.users.collection.findWhere({ id: id });
				model.destroy({
					success: function (model, response, options) {
						window.App.router.navigate("admin/users", { trigger: true });
					}
				});
			}
		}
	});
});