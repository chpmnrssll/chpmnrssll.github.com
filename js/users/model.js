define([], function() {
	return Backbone.Model.extend({
		defaults: {
			name: "",
			email: "",
			password: ""
			},
		urlRoot: apiUrl + "users/"
	});
});