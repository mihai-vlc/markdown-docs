define([
    'backbone'
], function(Backbone) {

    var collection = Backbone.Collection.extend({
        initialize: function(options) {
            this.options = options || {};
            this.q = options.q;
        },
        url: function() {
            return '/loadSearchResults?q=' + encodeURIComponent(this.q);
        }
    });

    return collection;

});
