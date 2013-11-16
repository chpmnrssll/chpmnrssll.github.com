define([ "jquery", "underscore", "backbone", "marionette", "text!auth/loginTemplate.html", "text!auth/controlsTemplate.html" ], function($, _, Backbone, Marionette, LoginTemplate, ControlsTemplate) {
	return Backbone.Marionette.ItemView.extend({
		className: "container auth",
		getTemplate: function() {
			return this.model.get("auth") ? _.template(ControlsTemplate) : _.template(LoginTemplate);
		},
		modelEvents: {
			"change:auth": function () {
				this.render();
			}
		},
		events: {
			"click #login": function (e) {
				e.preventDefault();
				//this.model.set("auth", true);
				this.model.save({
					username: $("#userName").val(),
					password: $("#userPassword").val()
				});
			},
			"click #logout": function (e) {
				e.preventDefault();
				this.model.set("auth", false);
				window.App.router.navigate("")
			}
		}
	});
});