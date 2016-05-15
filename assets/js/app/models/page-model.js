define([
    'backbone'
], function(Backbone) {

    var model = Backbone.Model.extend({
        defaults: {
            pageTitle: '',
            content: '',
            oldId: ''
        },
        url: function() {
            return '/page/' + this.id;
        }
    });

    return model;

});
