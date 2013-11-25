require.config({
    urlArgs : "bust=" + new Date().getTime(),
    paths : {
        "backbone" : "libs/backbone/backbone-min",
        "bootstrap" : "libs/bootstrap/bootstrap.min",
        "jquery" : "libs/jquery/jquery-2.0.3.min",
        "marionette" : "libs/marionette/backbone.marionette.min",
        "underscore" : "libs/underscore/underscore-min"
    },
    shim : {
        "backbone" : {
            deps : ["jquery", "underscore"],
            exports : "Backbone"
        },
        "bootstrap" : {
            deps : ["jquery"]
        },
        "jquery" : {
            exports : "$"
        },
        "marionette" : {
            deps : ["jquery", "underscore", "backbone"],
            exports : "Marionette"
        },
        "underscore" : {
            exports : "_"
        }
    }
});

require(
    [
        "backbone",
        "bootstrap",
        "jquery",
        "marionette",
        "underscore"
    ],
    function (Backbone, Bootstrap, $, Marionette, _) {
    "use strict";

    window.App = new Marionette.Application();
    window.App.apiUrl = "http://chpmn-rssll.rhcloud.com/";
    window.App.addInitializer(function (options) {
        require(
            [
                "router",
                "models/navbar",
                "collections/pages"
            ],
            function (Router, NavbarModel, PagesCollection) {

            window.App.router = new Router();

            window.App.navbarModel = new NavbarModel();

            window.App.collections = {
                pages : new PagesCollection()
            };

            _.each(window.App.collections, function (collection, key, list) {
                collection.fetch();
            });

            window.App.addRegions({
                navbar : "#navbar",
                content : "#content"
            });

            if (Backbone.history) {
                Backbone.history.start();
            }
        });

        /*
        require(
        [
        "auth/model",
        "auth/view",
        "admin/users/collection",
        "admin/categories/collection",
        "admin/pages/collection",
        "router"
        ],
        function (AuthModel, AuthView, UsersCollection, CategoriesCollection, PagesCollection, Router) {

        window.App.addRegions({
        body : "body",
        navbar : "#navbar",
        content : "#content"
        });

        window.App.models = {
        auth : new AuthModel()
        };

        window.App.views = {
        auth : new AuthView({
        model : window.App.models.auth
        })
        };

        window.App.collections = {
        users : new UsersCollection(),
        categories : new CategoriesCollection(),
        pages : new PagesCollection()
        };

        _.each(window.App.collections, function (collection, key, list) {
        collection.fetch();
        });

        window.App.router = new Router();
        if (Backbone.history) {
        Backbone.history.start();
        }

        window.App.navbar.show(window.App.views.auth);

        });
         */
        //console.log("window.App.initialize");

    });

    window.App.start();
});
