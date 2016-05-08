define([
    'backbone'
], function(Backbone) {

    var model = Backbone.Model.extend({
        defaults: {
            pageTitle: '',
            content: ''
        },
        url: function() {
            return '/loadPageData/' + this.id
        }
    });

    return model;

});
