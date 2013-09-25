define([ 'jquery', 'underscore', 'backbone', 'marionette', 'users/view', 'home/view' ], function($, _, Backbone, Marionette, UsersView, HomeView) {
	return {
		initialize: function() {
			var app_router = Backbone.Router.extend({
				routes: {
					'': 'home',
					'users': 'users',
					'*actions': 'error'
				},
				home: function () {
					var homeView = new HomeView();
					homeView.render();
				},
				users: function () {
					var usersView = new UsersView();
				},
				error: function () {
					alert("Error");
				}
			});
			
			new app_router();
			Backbone.history.start();
		}
	}
});