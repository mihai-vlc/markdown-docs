define([
    'backbone',
    'templates'
], function(Backbone, tpls) {

    var view = Backbone.View.extend({
        template: tpls['homepage.html'],

        initialize: function (options) {
            this.options = options || {};
        },

        render: function() {
            var html = this.template();

            this.$el.html(html);

            return this;
        }
    });

    return view;
});
