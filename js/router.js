define([ 'users/view', 'home/view' ], function(UsersView, HomeView) {
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
					usersView.render();
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