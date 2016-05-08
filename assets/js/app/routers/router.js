define([
    'backbone',
    'URI'
], function(Backbone, URI) {

    var router = Backbone.Router.extend({
        routes: {
            'search(/)': 'searchPages',
            '*others': 'loadPage'
        },

        initialize: function (appView) {
            this.appView = appView;
        },

        loadPage: function(pageId) {
            this.appView.loadPage(pageId);
            app.events.trigger('pageLoaded', pageId);
        },

        searchPages: function(queryString) {
            app.events.trigger('pageLoaded', 'search-page');

            var params = URI.parseQuery(queryString);

            if (params.q) {
                this.appView.searchPages(params.q);
            } else {
                Backbone.navigate('/', { trigger: true });
            }

        }

    });

    return router;
});
