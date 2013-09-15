define([ 'users/model' ], function(User) {
	return Backbone.Collection.extend({
		model: User,
		url: apiUrl + "users/"
	});
});