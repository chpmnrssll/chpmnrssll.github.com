var apiUrl = "http://localhost/chpmnrssll.github.io/api/";

require.config({
	urlArgs: "bust=" +  (new Date()).getTime(),
	baseUrl: "js/",
	paths: {
		jquery: "libs/jquery/jquery.min",
		underscore: "libs/underscore/underscore.min",
		backbone: "libs/backbone/backbone.min",
		"backbone.wreqr": "libs/backbone.marionette/backbone.wreqr",
		"backbone.eventbinder": "libs/backbone.marionette/backbone.eventbinder",
		"backbone.babysitter": "libs/backbone.marionette/backbone.babysitter",
		marionette: "libs/backbone.marionette/backbone.marionette.min",
	},
	shim: {
		jquery: {
			exports: "$"
		},
		underscore: {
			exports: "_"
		},
		backbone: {
			deps: ["jquery", "underscore"],
			exports: "Backbone"
		},
		marionette: {
			deps: ["jquery", "underscore", "backbone"],
			exports: "Marionette"
		}
	}
});

require([ "jquery", "underscore", "backbone", "marionette", "router" ], function($, _, Backbone, Marionette, Router) {
	window.App = new Marionette.Application();
	window.App.addRegions({
		body: "body",
		header: "#header",
		content: "#content",
		footer: "#footer"
	});
	
	window.App.addInitializer(function(options) {
		Router.initialize();
	});
	
	window.App.start();
	//setTimeout(function () { window.App.start(); }, 3000);
});

/*
$(document).ready(function() {
	Backbone.View.prototype.close = function() {
		this.remove();
		this.unbind();
		if(this.onClose) {
			this.onClose();
		}
	}
	
	var serverUrl = "http://localhost/chpmnrssll.github.io/api/";	
	
	var UsersMainView = Backbone.View.extend({
		template: _.template($("#users-main").html()),
		render: function() {
			this.$el.html(this.template);
			$("body").append(this.$el);
			return this;
		},
	});
	
	var UserItemView = Backbone.View.extend({
		template: _.template($("#user-item").html()),
		tagName: "tr",
		render: function() {
			this.$el.html(this.template(this.model.toJSON()));
			return this;
		}
	});
	
	var UserListView = Backbone.View.extend({
		template: _.template($("#user-list").html()),
		render: function() {
			this.$el.html(this.template);
			_.each(this.collection.models, this.processUser, this);
			return this;
		},
		processUser: function(user) {
			this.$("#user-items").append(new UserItemView({ model: user }).render().$el);
		}
	});
	
	var UserEditView = Backbone.View.extend({
		template: _.template($("#user-edit").html()),
		render: function() {
			if(this.model) {
				this.$el.html(this.template(this.model.toJSON()));
			} else {
				this.$el.html(this.template());
			}
			return this;
		}
	});
	
	var AppRouter = Backbone.Router.extend({
		routes: {
			"": "home",
			"users": "list",
			"users/create": "create",
			"users/edit/:id": "edit",
			"users/delete/:id": "delete"
		},
		initialize: function() {
			this.views = {};
		},
		showView: function(view) {
			if(this.views.current) {
				this.views.current.close();
			}
			this.views.current = view;
			this.views.current.render();
		},
		home: function() {
			$("body").append("<a href=\"#users\">users</a>");
		},
		list: function() {
			this.showView(new UsersMainView());
			new UserListView({ collection: this.users, el: $("#users-content") }).render();
		},
		create: function() {
			new UsersMainView().render();
			new UserEditView({ el: $("#users-content") }).render();
		},
		edit: function (id) {
			new UsersMainView().render();
			new UserEditView({ el: $("#users-content") }).render();
		},
		delete: function (id) {
			if(confirm("Delete User?")) {
				var model = this.users.findWhere({ _id: id });
				model.set("id", model.get("_id"));	//stupid backbone.js!!!
				model.destroy();
			}
		}
	});
	
	var app_router = new AppRouter();
	Backbone.history.start({ root: "chpmnrssll.github.io" });
	
	new Users().fetch({
		success: function (collection, response, options) {
			app_router.users = collection;
		}
	});
	
	// Create & Read model test
	var user = new User();
	user.save({ name: "Russ", email: "russ@mail.com", password: "russ" }, {
		success: function (model, response, options) {
			console.log(response);
			getModel();
		},
		error: function (model, response, options) {
			console.log(response);
			alert("error");
		}
	});
	
	function getModel() {
		var newUser = new User({ id: user.get("_id") });
		newUser.fetch({
			success: function (model, response, options) {
				console.log(response);
				alert(JSON.stringify(model));
			},
			error: function (model, response, options) {
				console.log(response);
				alert("error");
			}
		});
	}
});
*/