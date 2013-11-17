define([ "jquery", "underscore", "backbone", "marionette", "home/itemView", "text!home/collectionTemplate.html" ], function($, _, Backbone, Marionette, ItemView, Template) {
	return Backbone.Marionette.CompositeView.extend({
		itemView: ItemView,
		itemViewContainer: "#homeContent",
		template: _.template(Template),
	});
});