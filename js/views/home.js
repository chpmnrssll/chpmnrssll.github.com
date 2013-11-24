define(
    [
        "jquery",
        "underscore",
        "backbone",
        "marionette",
        "text!templates/home.html"
    ],
    function ($, _, Backbone, Marionette, Template) {

    "use strict";

    return Backbone.Marionette.CompositeView.extend({
        template : _.template(Template)
    });
});
