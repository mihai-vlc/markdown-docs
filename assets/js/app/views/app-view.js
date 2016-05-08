define([
    'backbone',
    'jquery',
    'templates',

    // views
    'app/views/header-view',
    'app/views/navigation-view',
    'app/views/page-view',

    // models
    'app/models/page-model',
    'app/models/navigation-model'
], function(Backbone, $, tpls,
    HeaderView, NavigationView, PageView,

    PageModel, NavigationModel
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
                .append(this.activeView.render().el);

            return this;
        },

        loadPage: function(pageId) {
            this.clean();
            var pageModel = new PageModel({ id: pageId });
            this.activeView = new PageView({ model: pageModel });
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
