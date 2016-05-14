define([
    'backbone',
    'templates',
    'URI',
    'app/views/edit-view',
    'app/models/page-model'
], function(Backbone, tpls, URI, EditView, PageModel) {

    var view = Backbone.View.extend({
        template: tpls['header.html'],

        initialize: function (options) {
            this.options = options || {};
        },

        events: {
            'submit form': 'handleSearch',
            'click a.js-nav': 'handleNavigate',
            'click [data-action]': 'handleAction'
        },

        handleSearch: function(event) {
            event.preventDefault();
            var data = $(event.target).serialize();

            Backbone.history.navigate('/search?' + data, { trigger: true });
        },

        handleNavigate: function(event) {
            event.preventDefault();
            var pageId = $(event.currentTarget).attr('href');
            if ( ! pageId || pageId == '#') {
                return;
            }

            Backbone.history.navigate(pageId, {trigger: true});
        },

        handleAction: function(event) {
            event.preventDefault();
            var $btn = $(event.currentTarget);
            var action = $btn.data('action');

            if (action == 'edit') {
                new EditView({
                    title: 'Edit page',
                    pageModel: new PageModel({ id: Backbone.history.fragment })
                }).show();
            } else if (action == 'new-page') {
                new EditView({
                    title: 'Create page',
                    pageModel: new PageModel()
                }).show();
            }

        },

        setDefaultQuery: function() {
            var params = URI.parseQuery(location.search);

            if (params.q) {
                this.$('.js-query').val(params.q);
            }
        },

        render: function() {
            var html = this.template();

            this.$el.html(html);
            this.setDefaultQuery();

            return this;
        }
    });

    return view;
});
