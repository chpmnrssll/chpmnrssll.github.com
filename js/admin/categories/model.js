define([ "jquery", "underscore", "backbone", "marionette" ], function($, _, Backbone, Marionette) {
	return Backbone.Model.extend({
		defaults: {
			content: ""
			},
		urlRoot: apiUrl + "categories/"
	});
});