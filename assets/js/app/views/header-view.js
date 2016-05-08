define([
    'backbone',
    'templates',
    'URI'
], function(Backbone, tpls, URI) {

    var view = Backbone.View.extend({
        template: tpls['header.html'],

        initialize: function (options) {
            this.options = options || {};
        },

        events: {
            'submit form': 'handleSearch'
        },

        handleSearch: function(event) {
            event.preventDefault();
            var data = $(event.target).serialize();

            Backbone.history.navigate('/search?' + data, { trigger: true });
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
