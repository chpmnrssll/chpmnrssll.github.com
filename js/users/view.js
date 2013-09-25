define([ 'jquery', 'underscore', 'backbone', 'marionette', 'text!users/template.html' ], function($, _, Backbone, Marionette, Template) {
	console.log(Backbone);
	return Backbone.Marionette.ItemView.extend({
		template: _.template(Template)
	});
	/*
	return Backbone.View.extend({
		template: _.template(template),
		render: function() {
			this.$el.html(this.template);
			$("body").empty();
			$("body").append(this.$el);
			
			return this;
		}
	});
	*/
});