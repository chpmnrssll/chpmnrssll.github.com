define(
    [
        "jquery",
        "underscore",
        "backbone",
        "marionette",
        "views/users/itemView",
        "text!templates/users/collectionTemplate.html"
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
