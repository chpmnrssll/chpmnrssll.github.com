define([ 'jquery', 'underscore', 'backbone', 'marionette', 'users/model' ], function($, _, Backbone, Marionette, Model) {
	return Backbone.Collection.extend({
		model: Model,
		url: apiUrl + 'users/'
	});
});