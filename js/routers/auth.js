define([], function () {
    "use strict";

    return Backbone.Router.extend({
        routes : {
            "auth/manage" : "manage",
            "auth/settings" : "settings",
        },
        manage : function () {
            require(["views/manage"], function (View) {
                window.App.navbarModel.set("active", "manage");
                window.App.content.show(new View());
            });
        },
        settings : function () {
            require(["views/settings"], function (View) {
                window.App.navbarModel.set("active", "settings");
                window.App.content.show(new View());
            });
        }
    });
});
