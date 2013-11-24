define(
    [
        "jquery",
        "underscore",
        "backbone",
        "marionette",
        "views/pages/item",
        "text!templates/pages/collection.html"
    ],
    function ($, _, Backbone, Marionette, ItemView, Template) {

    "use strict";

    return Backbone.Marionette.CompositeView.extend({
        itemView : ItemView,
        template : _.template(Template)
    });
});
