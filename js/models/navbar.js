define(
    [
        "jquery",
        "underscore",
        "backbone",
        "marionette"
    ],
    function ($, _, Backbone, Marionette) {

    "use strict";

    return Backbone.Model.extend({
        defaults : {
            active : "home"
        }
    });
});
