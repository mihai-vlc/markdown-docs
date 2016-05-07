require.config({
    paths: {
        'jquery': 'libs/jquery.min',
        'underscore': 'libs/underscore',
        'backbone': 'libs/backbone',
        'templates': 'app/templates'
    },

    shim: {
        'templates': {
            deps: ['underscore'],
            exports: '_templates_app_'
        }
    }

});


require([
    'app/app'
],
function (app) {
    'use strict';
    app.init();
});
