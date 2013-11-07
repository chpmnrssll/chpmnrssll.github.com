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
			
			require([ "admin/categories/collection" ], function (Collection) {
				new Collection().fetch({
					success: function (collection, response, options) {
						window.App.categories.collection = collection;
					}
				});
			});
		},
		categories: function () {
			require([ "admin/categories/collectionView" ], function (View) {
				window.App.adminNav.model.set({ active: "categories" });
				window.App.header.show(window.App.adminNav.view);
				window.App.content.show(new View({ collection: window.App.categories.collection }));
			});
		},
		createCategory: function () {
			require([ "admin/categories/model", "admin/categories/updateView" ], function (Model, View) {
				window.App.adminNav.model.set({ active: "categories" });
				window.App.header.show(window.App.adminNav.view);
				
				var category = new Model();
				window.App.categories.collection.add(category);
				window.App.content.show(new View({ model: category }));
			});
		},
		updateCategory: function (id) {
			require([ "admin/pages/updateView" ], function (View) {
				window.App.adminNav.model.set({ active: "categories" });
				window.App.header.show(window.App.adminNav.view);
				
				var category = window.App.categories.collection.findWhere({ id: id });
				window.App.content.show(new View({ model: category }));
			});
		},
		deleteCategory: function (id) {
			if(confirm("Delete Category?")) {
				var category = window.App.categories.collection.findWhere({ id: id });
				category.destroy({
					success: function (model, response, options) {
						window.App.router.navigate("admin/categories", { trigger: true });
					}
				});
			}
		}
	});
});