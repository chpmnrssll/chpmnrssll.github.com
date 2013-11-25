define(["text!templates/navbar.html"], function (Template) {
    "use strict";

    return Backbone.Marionette.ItemView.extend({
        template : _.template(Template),
        tagName : "nav",
        className : "navbar navbar-default navbar-fixed-top"
    });
});
