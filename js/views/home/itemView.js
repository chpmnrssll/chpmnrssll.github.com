define(
    [
        "jquery",
        "underscore",
        "backbone",
        "marionette",
        "text!templates/home/itemTemplate.html"
    ],
    function ($, _, Backbone, Marionette, Template) {

    "use strict";

    return Backbone.Marionette.ItemView.extend({
        template : _.template(Template),
        tagName : "article",
        className : "col-md-6"
    });
});
