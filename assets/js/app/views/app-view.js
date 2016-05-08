define([
    'backbone',
    'jquery',
    'templates',

    // views
    'app/views/header-view',
    'app/views/navigation-view',
    'app/views/page-view',
    'app/views/search-view',

    // models
    'app/models/page-model',
    'app/models/navigation-model',
    'app/models/search-result-model',

    // collections
    'app/collections/search-collection'
], function(Backbone, $, tpls,
    HeaderView, NavigationView, PageView, SearchView,

    PageModel, NavigationModel, SearchResultModel,

    SearchCollection
   ) {

    var view = Backbone.View.extend({
        el: '.js-app',

        views: {},

        initialize: function() {

            this.views.header = new HeaderView({
                el: '.js-app .header'
            }).render();

            this.views.header = new NavigationView({
                el: '.js-app .nav-items-list',
                model: new NavigationModel()
            });
        },

        render: function() {
            this.$('.js-main-content')
                .empty()
                .append(this.activeView.el);

            return this;
        },

        loadPage: function(pageId) {
            this.clean();
            if ( ! pageId) {
                pageId = '/';
            }

            var pageModel = new PageModel({ id: pageId });
            this.activeView = new PageView({ model: pageModel });
            this.render();
        },

        searchPages: function(query) {
            var collection = new SearchCollection({
                q: query,
                model: SearchResultModel
            });

            this.activeView = new SearchView({ collection: collection });
            this.render();
        },

        clean: function() {
            if (this.activeView) {
                this.activeView.remove();
            }
        }


    });

    return view;
});
