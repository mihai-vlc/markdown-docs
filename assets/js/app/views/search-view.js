define([
    'backbone',
    'templates',
    'app/utils/notify'
], function(Backbone, tpls, notify) {

    var view = Backbone.View.extend({
        template: tpls['search.html'],

        initialize: function (options) {
            this.options = options || {};
            this.collection = options.collection;

            this.collection.on('sync', this.render, this);
            this.collection.on('error', this.handleError, this);
            this.collection.fetch();
        },

        handleError: function() {
            notify.error('There was an error with loading the search results.');
        },

        events: {
            'click a[href]': 'handleNavigate'
        },

        handleNavigate: function(event) {
            event.preventDefault();
            var pageId = $(event.currentTarget).attr('href');

            if ( ! pageId || pageId == '#') {
                return;
            }

            Backbone.history.navigate(pageId, {trigger: true});
        },

        render: function() {
            var results = this.collection.models.map(function (model) { return model.toJSON() });

            var html = this.template({
                query: this.collection.q,
                results: results
            });

            this.$el.html(html);

            return this;
        }
    });

    return view;
});
