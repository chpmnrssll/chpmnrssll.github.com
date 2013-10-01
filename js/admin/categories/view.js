define([ "jquery", "underscore", "backbone", "marionette", "text!admin/categories/template.html" ], function($, _, Backbone, Marionette, Template) {
	return Backbone.Marionette.ItemView.extend({
		template: _.template(Template),
		className: "container"
	});
});