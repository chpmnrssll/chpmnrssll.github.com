define(["views/users/itemView", "text!templates/users/collectionTemplate.html"], function (ItemView, Template) {
    "use strict";

    return Backbone.Marionette.CompositeView.extend({
        itemView : ItemView,
        itemViewContainer : "tbody",
        template : _.template(Template),
        className : "container"
    });
});
