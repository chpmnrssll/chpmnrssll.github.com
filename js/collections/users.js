define(
    [
        "jquery",
        "underscore",
        "backbone",
        "marionette",
        "models/user"
    ],
    function ($, _, Backbone, Marionette, Model) {

    "use strict";

    return Backbone.Collection.extend({
        model : Model,
        url : window.App.apiUrl + "users/"
    });
});
