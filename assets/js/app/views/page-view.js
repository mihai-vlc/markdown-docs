define([
    'backbone',
    'templates',
    'app/utils/notify',
    'prism'
], function(Backbone, tpls, notify, prism) {

    var view = Backbone.View.extend({
        template: tpls['page.html'],
        templateNotFound: tpls['404.html'],
        className: 'markdown-body',

        initialize: function (options) {
            this.options = options || {};
            this.model = options.model;

            this.model.on('sync', this.render, this);
            this.model.on('error', this.handleError, this);
            this.model.fetch();
        },

        handleError: function() {
            notify.error('There was an error with loading the page data.');
        },

        initContent: function() {
            // make all external links open in a new window
            this.$('a').filter(function() {
                return this.hostname != window.location.hostname;
            }).attr('target', '_blank');

            // autofocus on the main content
            $('[autofocus]').focus();

            // highlight the code areas
            Prism.highlightAll();

        },

        render: function() {
            var template = this.template;
            var data = this.model.attributes;

            if (data.status == 404) {
                template = this.templateNotFound;
            }

            var html = template(data);

            this.$el.html(html);
            this.initContent();

            app.events.trigger('pageContentLoaded', {
                $el: this.$el,
                id: this.model.attributes.id
            });

            return this;
        }
    });

    return view;
});
