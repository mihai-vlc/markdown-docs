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

            app.events.on('pageLoaded', this.activateItem.bind(this));
            app.events.on('pageSaved', this.updateNavigation.bind(this));
            app.events.on('pageDeleted', this.updateNavigation.bind(this));
        },


        handleError: function() {
            notify.error('There was an error with loading the navigation.');
        },

        events: {
            'click a': 'handleNavigate'
        },

        handleNavigate: function(event) {
            event.preventDefault();
            var pageId = $(event.currentTarget).attr('href');
            if ( ! pageId || pageId == '#') {
                return;
            }

            Backbone.history.navigate(pageId, {trigger: true});
        },

        activateItem: function(id) {
            this.$el.find('a.active').removeClass('active');

            if ( ! id) {
                return;
            }

            // ensure the id starts with /
            if (id[0] != '/') {
                id = '/' + id;
            }

            this.activeId = id;
            this.$el.find('a[href="' + id + '"]').addClass('active');
        },

        updateNavigation: function(id) {
            this.model.fetch();
        },

        initNavigation: function () {

            if (this.activeId) {
                this.activateItem(this.activeId);
            }

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
