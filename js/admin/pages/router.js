define([ "jquery", "underscore", "backbone", "marionette" ], function($, _, Backbone, Marionette) {
	return Backbone.Router.extend({
		routes: {
			"admin/pages": "pages",
			"admin/pages/create": "createPage",
			"admin/pages/update/:id": "updatePage",
			"admin/pages/delete/:id": "deletePage"
		},
		initialize: function () {
			window.App.pages = {};
		},
		pages: function () {
			require([ "admin/pages/collection", "admin/pages/collectionView" ], function (Collection, View) {
				window.App.adminNav.model.set({ active: "pages" });
				window.App.header.show(window.App.adminNav.view);
				new Collection().fetch({
					success: function (collection, response, options) {
						window.App.pages.collection = collection;
						window.App.content.show(new View({ collection: collection }));
					}
				});
			});
		},
		createPage: function () {
			require([ "admin/pages/model" ], function (Model) {
				window.App.adminNav.model.set({ active: "pages" });
				window.App.header.show(window.App.adminNav.view);
				var page = new Model();
				page.save({ category: prompt("Category:", ""), title: prompt("Title:", ""), date: prompt("Date:", "") }, {
					success: function (model, response, options) {
						window.App.router.navigate("admin/pages", { trigger: true });
					}
				});
			});
		},
		updatePage: function (id) {
			window.App.adminNav.model.set({ active: "pages" });
			window.App.header.show(window.App.adminNav.view);
			var page = window.App.pages.collection.findWhere({ id: id });
			page.save({ category: prompt("Category:", page.get("category")), title: prompt("Title:", page.get("title")), date: prompt("Date:", page.get("date")) }, {
				success: function (model, response, options) {
					window.App.router.navigate("admin/pages", { trigger: true });
				}
			});
		},
		deletePage: function (id) {
			var model = window.App.pages.collection.findWhere({ id: id });
			if(confirm("Delete Page?")) {
				model.destroy({
					success: function (model, response, options) {
						window.App.router.navigate("admin/pages", { trigger: true });
					}
				});
			}
		}
	});
});