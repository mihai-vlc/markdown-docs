define([
    'backbone'
], function(Backbone) {

    var model = Backbone.Model.extend({
        defaults: {
            href: '',
            name: '',
            description: '',
            date: ''
        }
    });

    return model;

});
