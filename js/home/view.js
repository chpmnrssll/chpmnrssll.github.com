define([ "jquery", "underscore", "backbone", "marionette", "text!home/template.html" ], function($, _, Backbone, Marionette, Template) {
	return Backbone.Marionette.ItemView.extend({
		template: _.template(Template),
		className: "container"
	});
});