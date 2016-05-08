define([
    'backbone',
    'templates',
    'app/utils/notify'
], function(Backbone, tpls) {

    var view = Backbone.View.extend({
        template: tpls['navigation.html'],

        initialize: function(options) {
            this.options = options || {};
            this.model = options.model;

            this.model.on('sync', this.render, this);
            this.model.on('error', this.handleError, this);
            this.model.fetch();
        },

        events: {
            'click a': 'handleNavigate'
        },

        handleError: function() {
            notify.error('There was an error with loading the navigation.');
        },

        handleNavigate: function(event) {
            event.preventDefault();
            var pageId = $(event.currentTarget).attr('href');
            if ( ! pageId || pageId == '#') {
                return;
            }

            Backbone.history.navigate(pageId, {trigger: true});
            this.activateItem(pageId);
        },

        activateItem: function(id) {
            this.$el.find('a.active').removeClass('active');
            this.$el.find('a[href="' + id + '"]').addClass('active');
        },

        initNavigation: function () {
            // collapsable navigation
            this.$('.nav-folder').on('click', function (e) {
                e.preventDefault();

                $(this).toggleClass('is-closed');
                $(this).parent().children('.nav-list').slideToggle();
            });
        },

        render: function() {

            var html = this.template({
                navItems: this.model.attributes.navItems,
                template: this.template
            });

            this.$el.html(html);
            this.initNavigation();

            return this;
        }
    });

    return view;
});
