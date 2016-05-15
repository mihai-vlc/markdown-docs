define([
    'backbone'
], function(Backbone) {

    var model = Backbone.Model.extend({
        defaults: {
            content: ''
        },
        url: function() {
            return '/preview';
        }
    });

    return model;

});
