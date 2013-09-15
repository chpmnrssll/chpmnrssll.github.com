define([ 'text!home/template.html' ], function(homeTemplate) {
	return Backbone.View.extend({
		template: _.template(homeTemplate),
		render: function() {
			this.$el.html(this.template);
			$("body").empty();
			$("body").append(this.$el);
			
			return this;
		}
	});
});