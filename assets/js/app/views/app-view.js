define([
    'backbone',
    'jquery',
    'templates',

    // views
    'app/views/header-view',
    'app/views/navigation-view',
    'app/views/homepage-view',
    'app/views/about-view'
], function(Backbone, $, tpls,
    HeaderView, NavigationView, HomepageView, AboutView
   ) {

    var view = Backbone.View.extend({
        el: '.js-app',

        views: {},

        initialize: function () {

            this.views.header = new HeaderView({
                el: '.js-app .header'
            }).render();

            this.views.header = new NavigationView({
                el: '.js-app .nav-items-list'
            }).reload();
        },

        render: function () {
            this.$('.main-container')
                .empty()
                .append(this.activeView.render().el);

            return this;
        },

        loadHome: function () {
            this.clean();
            this.activeView = new HomepageView();
            this.render();
        },

        loadAbout: function () {
            this.clean();
            this.activeView = new AboutView();
            this.render();
        },

        clean: function () {
            if (this.activeView) {
                this.activeView.remove();
            }
        }


    });

    return view;
});
