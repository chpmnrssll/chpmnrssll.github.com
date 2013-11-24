define(
    [
        "jquery",
        "underscore",
        "backbone",
        "marionette",
        "models/page"
    ],
    function ($, _, Backbone, Marionette, Model) {

    "use strict";

    return Backbone.Collection.extend({
        model : Model,
        url : window.App.apiUrl + "pages/"
    });
});
