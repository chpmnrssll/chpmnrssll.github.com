define(["text!admin/pages/updateTemplate.html"], function (Template) {
    "use strict";

    return Backbone.Marionette.CompositeView.extend({
        template : _.template(Template),
        className : "container",
        events : {
            "click #pageSave" : function (event) {
                this.model.save({
                    category : $("#pageCategory").val(),
                    date : $("#pageDate").val(),
                    title : $("#pageTitle").val(),
                    content : $("#pageContent").val()
                }, {
                    success : function (model, response, options) {
                        window.App.collections.pages.add(model);
                        window.App.router.navigate("admin/pages", {
                            trigger : true
                        });
                    }
                });
            },
            "click #pageCancel" : function (event) {
                window.App.router.navigate("admin/pages", {
                    trigger : true
                });
            }
        }
    });
});
