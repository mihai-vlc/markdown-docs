define([
    'backbone',
    'app/views/app-view',
    'app/routers/router'
], function(Backbone, AppView, Router) {

    var app = {

        init: function() {
            var appView = new AppView();

            var router = new Router(appView);
            Backbone.history.start({
                pushState: true
            });
        }
    }

    return app;
});
