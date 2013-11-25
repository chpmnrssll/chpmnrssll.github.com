define(["text!templates/pages/item.html"], function (Template) {
    "use strict";

    return Backbone.Marionette.ItemView.extend({
        template : _.template(Template),
        tagName : "article",
        className : "col-md-6"
    });
});
