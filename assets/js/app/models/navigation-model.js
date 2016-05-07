define([
    'backbone'
], function(Backbone) {

    var model = Backbone.Model.extend({
        defaults: {
            navItems: []
        },
        url: function () {
            return '/navigation'
        }
    });

    return model;

});
