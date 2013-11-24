define(
    [
        "jquery",
        "underscore",
        "backbone",
        "marionette",
        "views/home/itemView",
        "text!templates/home/collectionTemplate.html"
    ],
    function ($, _, Backbone, Marionette, ItemView, Template) {

    "use strict";

    return Backbone.Marionette.CompositeView.extend({
        itemView : ItemView,
        itemViewContainer : "#homeContent",
        template : _.template(Template)
    });
});
