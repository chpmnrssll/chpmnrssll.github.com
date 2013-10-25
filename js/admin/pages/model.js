define([ "jquery", "underscore", "backbone", "marionette" ], function($, _, Backbone, Marionette) {
	return Backbone.Model.extend({
		defaults: {
			category: "",
			title: "",
			date: "",
			content: ""
		},
		urlRoot: window.App.apiUrl + "pages/"
	});
});