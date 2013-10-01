define([ 'jquery', 'underscore', 'backbone', 'marionette', 'categories/model' ], function($, _, Backbone, Marionette, Model) {
	return Backbone.Collection.extend({
		model: Model,
		url: apiUrl + 'categories/'
	});
});