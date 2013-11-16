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
				var that = this;
				e.preventDefault();
				$.ajax({
					url: window.App.apiUrl + "auth/",
					type: "GET",
					beforeSend: function(xhr) {
						xhr.setRequestHeader('AUTH_USER', $("#userName").val());
						xhr.setRequestHeader('AUTH_PW', $("#userPassword").val());
					},
					success: function(data) {
						console.log(typeof data);
						//if(data[0].auth) {
							that.model.set("auth", true);
							$("#userNameInput").toggleClass("has-error");
							$("#userPasswordInput").toggleClass("has-error");
						//}
					},
					statusCode: {
						403: function() {
							$("#userNameInput").toggleClass("has-error");
							$("#userPasswordInput").toggleClass("has-error");
						}
					}
				});
			},
			"click #logout": function (e) {
				e.preventDefault();
				this.model.set("auth", false);
				window.App.router.navigate("", { trigger: true })
			}
		}
	});
});