define([ "jquery", "underscore", "backbone", "marionette" ], function($, _, Backbone, Marionette) {
	return Backbone.Router.extend({
		routes: {
			"admin/categories": "categories",
			"admin/categories/create": "createCategory",
			"admin/categories/update/:id": "updateCategory",
			"admin/categories/delete/:id": "deleteCategory"
		},
		initialize: function () {
			window.App.categories = {};
		},
		categories: function () {
			require([ "admin/categories/collection", "admin/categories/collectionView" ], function (Collection, View) {
				window.App.adminNav.model.set({ active: "categories" });
				window.App.header.show(window.App.adminNav.view);
				new Collection().fetch({
					success: function (collection, response, options) {
						window.App.categories.collection = collection;
						window.App.content.show(new View({ collection: collection }));
					}
				});
			});
		},
		createCategory: function () {
			require([ "admin/categories/model" ], function (Model) {
				window.App.adminNav.model.set({ active: "categories" });
				window.App.header.show(window.App.adminNav.view);
				var category = new Model();
				category.save({ name: prompt("Name:", "") }, {
					success: function (model, response, options) {
						window.App.router.navigate("admin/categories", { trigger: true });
					}
				});
			});
		},
		updateCategory: function (id) {
			window.App.adminNav.model.set({ active: "categories" });
			window.App.header.show(window.App.adminNav.view);
			var category = window.App.categories.collection.findWhere({ id: id });
			category.save({ name: prompt("Name:", category.get("name")) }, {
				success: function (model, response, options) {
					window.App.router.navigate("admin/categories", { trigger: true });
				}
			});
		},
		deleteCategory: function (id) {
			var model = window.App.categories.collection.findWhere({ id: id });
			if(confirm("Delete Category?")) {
				model.destroy({
					success: function (model, response, options) {
						window.App.router.navigate("admin/categories", { trigger: true });
					}
				});
			}
		}
	});
});