define(["text!admin/users/itemTemplate.html"], function (Template) {
    "use strict";

    return Backbone.Marionette.ItemView.extend({
        template : _.template(Template),
        tagName : "tr"
    });
});
