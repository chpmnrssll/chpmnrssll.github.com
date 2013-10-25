define([ "jquery", "underscore", "backbone", "marionette" ], function($, _, Backbone, Marionette) {
	return Backbone.Model.extend({
		defaults: {
			name: ""
		},
		urlRoot: window.App.apiUrl + "categories/"
	});
});