define(
    [
        "jquery",
        "underscore",
        "backbone",
        "marionette",
        "text!templates/pages/itemTemplate.html"
    ],
    function ($, _, Backbone, Marionette, Template) {

    "use strict";

    return Backbone.Marionette.ItemView.extend({
        template : _.template(Template),
        tagName : "tr"
    });
});
