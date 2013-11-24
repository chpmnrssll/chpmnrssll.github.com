define(
    [
        "jquery",
        "underscore",
        "backbone",
        "marionette",
        "admin/router"
    ],
    function ($, _, Backbone, Marionette, AdminRouter) {

    "use strict";

    return Backbone.Router.extend({
        routes : {
            "" : "home",
            "*actions" : "error"
        },
        initialize : function () {
            /*
            this._subRouters = {
            admin : new AdminRouter()
            }
             */
        },
        home : function () {
            require(["views/home"], function (View) {

                //update collection first
                window.App.collections.pages.fetch({
                    success : function (collection, response, options) {
                        collection.set(collection.filter(
                                function (page) {
                                return page.get("category") !== "Admin";
                            }));

                        window.App.content.show(new View());
                    }
                });

            });
        },
        error : function () {
            console.log("Route: " + Backbone.history.fragment + " not found");
        }
    });
});
