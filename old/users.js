$(document).ready(function () {
	var serverUrl = "http://localhost/chpmnrssll.github.io/api/";
	
	var User = Backbone.Model.extend({
		defaults: {
			name: "",
			email: "",
			password: ""
			},
		urlRoot: serverUrl + "users/"
	});
	
	var Users = Backbone.Collection.extend({
		model: User,
		url: serverUrl + "users/"
	});
	
	var UserItemView = Backbone.View.extend({
		template: _.template($('#user-item').html()),
		tagName: "tr",
		events: {
			"click .edit-user": "edit",
			"click .delete-user": "delete"
		},
		render: function() {
			this.$el.append(this.template(this.model.toJSON()));
			return this;
		},
		edit: function (e) {
			console.log("edit " + JSON.stringify(this.model.toJSON()));
		},
		delete: function (e) {
			if(confirm("Delete User?")) {
				this.model.set("id", this.model.get("_id"));	//stupid backbone.js!!!
				this.model.destroy();
				this.$el.remove();
				console.log("delete " + JSON.stringify(this.model.toJSON()));
			}
		}
	});
	
	var UserListView = Backbone.View.extend({
		template: _.template($('#user-list').html()),
		el: $("#new-user-list"),
		render: function() {
			this.$el.html(this.template);
			_.each(this.collection.models, this.processUser, this);
			return this;
		},
		processUser: function(user) {
			this.$("#user-items").append(new UserItemView({ model: user }).render().$el);
		}
	});
	
	var users = new Users();
	users.fetch({
		success: function (collection, response, options) {
			var userListView = new UserListView({ collection: users });
			userListView.render();
		},
		error: function (collection, response, options) {
			alert("error");
		}
	});
	
	var AppRouter = Backbone.Router.extend({
		routes: {
			"create-user": "create-user"
		}
	});
	
	var app_router = new AppRouter;
	app_router.on('route:create-user', function () {
		alert("create-user");
	});
	Backbone.history.start();
	
	/*
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
	*/
	
/*
var $projects 			= $('#users'),
	projects 			= null,
	currentProjectId 	= null,
	projectListView 	= null,
	taskListView 		= null,
	serverUrl			= 'http://localhost/chpmnrssll.github.io/api/';

User = Backbone.Model.extend({
	defaults: {
		id: null,
		name: '',
		email: ''
	},
	urlRoot: serverUrl + 'users/'
});

Users = Backbone.Collection.extend({
	model: User,
	url: serverUrl + 'users/'
});

UserItem = Backbone.View.extend({
	tagName: 'li',
	initialize: function() {
		this.render = _.bind(this.render, this);				// We are attaching context to render method
		this.template = _.template($('#user-item').html());		// Defining/loading underscore template
		this.model.bind('change', this.render);					// Bind any change in the model to render method
	},
	render: function() {
		this.$el.html(this.template(this.model.attributes));	// Filling template with model attributes
		return this;
	}
});

// View for project list, collection of projects
UserList = Backbone.View.extend({
	initialize: function() {
		_(this).bindAll('add', 'remove');

		// Holder of single project views
		this._users = [];
		
		// For each element in collection we run the 'add' method
		this.collection.each(this.add);
		
		// Binding collection events to our methods
		this.collection.bind('add', this.add);
    	this.collection.bind('remove', this.remove);
	},
	render: function() {
		// Initializing and setting flag from which we'll know if our view was rendered or not
		this._rendered = true;

		// We render single project items and append it to DOM element
		_(this._users).each(function(item) {
			$users.append(item.render().el);
		});
	},
	// Method that fires when project item is added (either from collection after fetching or creating a new one)
	add: function(user) {
		var userItem = new UserItem({model: user});
		// Adding project item view to the list
		this._users.push(userItem);

		// If view is rendered then we add our rendered item to this view
		if (this._rendered) {
			this.$el.append(userItem.render().el);
		}
	},
	// Fires when removing project item
	remove: function(user) {
		// Determining which view we need to remove from markup
		var view = _(this._users).select(function(cv) { return cv.model === user; })[0];
		if (this._rendered) {
			$(view.el).remove();
		}

		// Triggering click to the first project item
		$users.find('li:nth-child(2)').find('a').trigger('click');
	}
});

users = new Users();
// Fetching projects from DB
users.fetch({success: function() {
	userListView = new UserList({
		collection: users,
		el: $users
	});
	userListView.render();

	// Triggering click on first project which will load its tasks
	$users.find('li:nth-child(2)').find('a').trigger('click');
}});

// Attaching to "Add project" button
$('#create-user').click(function(e) {
	var view = new UserDialog({model: new User()});
	view.show();
	return false;
});

// Attaching to "Delete project (X)" button
$('#delete-user').click(function(e) {
	users.get(currentUserId).destroy();
	return false;	
});
*/
});