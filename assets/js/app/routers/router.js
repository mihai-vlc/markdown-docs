define([
    'backbone'
], function(Backbone) {

    var router = Backbone.Router.extend({
        routes: {
            'search(/)': 'searchPage',
            '*others': 'loadPage'
        },

        initialize: function (appView) {
            this.appView = appView;
        },

        loadPage: function(pageId) {
            this.appView.loadPage(pageId);
        },

        searchPage: function() {
            console.log('searchPage');
        }

    });

    return router;
});


