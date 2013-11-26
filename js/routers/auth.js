//define(["admin/users/router", "admin/categories/router", "admin/pages/router"], function (UsersRouter, CategoriesRouter, PagesRouter) {
define([], function () {
    "use strict";

    return Backbone.Router.extend({
        routes : {
            "auth/manage" : "manage",
            "auth/settings" : "settings",
        },
        initialize : function () {
            /*
            this._subRouters = {
            users: new UsersRouter(),
            categories: new CategoriesRouter(),
            pages: new PagesRouter()
            }
             */
        },
        manage : function () {
            require(["views/navbar", "views/manage"], function (NavbarView, ManageView) {
                window.App.navbarModel.set("active", "manage");
                window.App.navbar.show(new NavbarView());
                window.App.content.show(new ManageView());
            });
        },
        settings : function () {
            require(["views/navbar", "views/settings"], function (NavbarView, SettingsView) {
                window.App.navbarModel.set("active", "settings");
                window.App.navbar.show(new NavbarView());
                window.App.content.show(new SettingsView());
            });
        }
    });
});
