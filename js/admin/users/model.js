define([ "jquery", "underscore", "backbone", "marionette" ], function($, _, Backbone, Marionette) {
	return Backbone.Model.extend({
		defaults: {
			name: "",
			email: ""
			},
		urlRoot: apiUrl + "users/"
	});
});