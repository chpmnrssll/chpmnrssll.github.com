define(
    [
        "jquery",
        "underscore",
        "backbone",
        "marionette",
        "views/pages/itemView",
        "text!templates/pages/collectionTemplate.html"
    ],
    function ($, _, Backbone, Marionette, ItemView, Template) {

    "use strict";

    return Backbone.Marionette.CompositeView.extend({
        itemView : ItemView,
        itemViewContainer : "tbody",
        template : _.template(Template),
        className : "container"
    });
});
