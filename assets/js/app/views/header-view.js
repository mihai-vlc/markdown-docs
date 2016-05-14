define([
    'backbone',
    'templates',
    'URI',
    'app/views/edit-view',
    'app/models/page-model',
    'app/utils/notify'
], function(Backbone, tpls, URI, EditView, PageModel, notify) {

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
            var pageId = Backbone.history.fragment;

            if ( ! pageId && (action == 'delete' || action == 'edit')) {
                notify.error('This page is not editable !');
                return;
            }

            if (action == 'edit') {
                new EditView({
                    title: 'Edit page',
                    pageModel: new PageModel({ id: pageId })
                }).show();

            } else if (action == 'new-page') {
                new EditView({
                    title: 'Create page',
                    pageModel: new PageModel()
                }).show();

            } else if (action == 'commit') {
                this.commitChanges();

            } else if (action == 'delete') {

                notify.confirm("Are you sure you want to delete this page ?", function() {
                    new PageModel({ id: pageId }).destroy({
                        success: function() {
                            app.events.trigger('pageDeleted', pageId);
                            Backbone.history.navigate('/', { trigger: true });
                            notify.success('success', 'The page ' + pageId + ' was deleted !');
                        },
                        error: function() {
                            notify.error('There was an error with deleting the page !');
                        }
                    })
                });
            }

        },

        // should this be a model ???
        commitChanges: function() {
            $.ajax({
                url: '/commit',
                type: 'POST',
                success: function() {
                    notify.success('The changes were committed successfully !');
                },
                error: function  () {
                    notify.error('There was an error with committing the data !');
                }
            });
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
