define([ 'jquery', 'underscore', 'backbone', 'marionette', 'pages/model' ], function($, _, Backbone, Marionette, Model) {
	return Backbone.Collection.extend({
		model: Model,
		url: apiUrl + 'pages/'
	});
});