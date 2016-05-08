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
        },

        searchPages: function(queryString) {
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


