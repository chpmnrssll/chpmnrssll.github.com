define([ 'text!users/template.html' ], function(template) {
	return Backbone.View.extend({
		template: _.template(template),
		render: function() {
			this.$el.html(this.template);
			$("body").empty();
			$("body").append(this.$el);
			
			return this;
		}
	});
});