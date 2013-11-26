//define(["admin/router"], function (AdminRouter) {
define([], function () {
    "use strict";

    return Backbone.Router.extend({
        routes : {
            "" : "home",
            "*actions" : "error"
        },
        initialize : function () {
            /* this._subRouters = {
            admin : new AdminRouter()
            } */
        },
        home : function () {
            require(["views/navbar", "views/home"], function (NavbarView, HomeView) {
                window.App.navbarModel.set("active", "home");
                window.App.navbar.show(new NavbarView());
                window.App.content.show(new HomeView());
            });
        },
        error : function () {
            console.log("Route: " + Backbone.history.fragment + " not found");
        }
    });
});
