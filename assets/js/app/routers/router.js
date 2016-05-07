define([
    'backbone'
], function(Backbone) {

    var router = Backbone.Router.extend({
        routes: {
            'about(/)': 'loadAbout',
            '*others': 'loadHome',
        },

        initialize: function (appView) {
            this.appView = appView;
        },

        loadHome: function () {
            console.log("this");
            // this.appView.loadHome();
        },

        loadAbout: function () {
            this.appView.loadAbout();
        }

    });

    return router;
});


