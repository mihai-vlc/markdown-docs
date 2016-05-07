define([
    'backbone',
    'templates',
    'app/models/navigation-model'
], function(Backbone, tpls, NavigationModel) {

    var view = Backbone.View.extend({
        template: tpls['navigation.html'],

        initialize: function(options) {
            this.options = options || {};
            this.model = new NavigationModel();
        },

        events: {
            'click a': 'handleNavigate'
        },

        handleNavigate: function(event) {
            event.preventDefault();
            var pageId = $(event.target).attr('href');
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

        reload: function() {
            this.model.fetch({
                success: function (model, data) {
                    this.navItems = data.navItems;
                    this.render();
                }.bind(this)
            });
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
            if ( ! this.navItems) {
                return;
            }

            var html = this.template({
                navItems: this.navItems,
                template: this.template
            });

            this.$el.html(html);
            this.initNavigation();

            return this;
        }
    });

    return view;
});
