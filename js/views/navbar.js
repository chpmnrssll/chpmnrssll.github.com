define(
    [
        "jquery",
        "underscore",
        "backbone",
        "marionette",
        "text!templates/navbar.html"
    ],
    function ($, _, Backbone, Marionette, Template) {

    "use strict";

    return Backbone.Marionette.ItemView.extend({
        template : _.template(Template),
        tagName : "nav",
        className : "navbar navbar-default navbar-static-top"
    });
});
