define([ "jquery", "underscore", "backbone", "marionette", "text!admin/pages/updateTemplate.html" ], function($, _, Backbone, Marionette, Template) {
	return Backbone.Marionette.CompositeView.extend({
		template: _.template(Template),
		className: "container",
		events: {
			"click #save": function (event) {
				require([ "admin/pages/model" ], function (Model) {
					var page = new Model();
					page.save({ category: prompt("Category:", ""), title: prompt("Title:", ""), date: prompt("Date:", "") }, {
						success: function (model, response, options) {
							window.App.router.navigate("admin/pages", { trigger: true });
						}
					});
				});
			},
			"click #cancel": function (event) {
				window.App.router.navigate("#admin/pages", { trigger: true });
			}
		}
	});
});