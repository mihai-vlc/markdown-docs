define([
    'backbone',
    'app/views/app-view',
    'app/routers/router'
], function(Backbone, AppView, Router) {

    var app = {

        events: _.extend({}, Backbone.Events),

        init: function() {
            var appView = new AppView();

            var router = new Router(appView);
            Backbone.history.start({
                pushState: true
            });
        }
    };

    window.app = app;

    return app;
});
