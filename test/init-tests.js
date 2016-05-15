
require.config({
    paths: {

        'jasmine' :'lib/jasmine-2.3.4/jasmine',
        'jasmine-html' :'lib/jasmine-2.3.4/jasmine-html',
        'jasmine-boot' :'lib/jasmine-2.3.4/boot',
        'app': '../assets/js/app',


        // application dependencies
        'jquery': '../assets/js/libs/jquery.min',
        'underscore': '../assets/js/libs/underscore',
        'backbone': '../assets/js/libs/backbone',
        'templates': '../assets/js/app/templates'

    },
    shim: {
        'underscore': {
            exports: '_'
        },
        'backbone': {
            deps: ['underscore', 'jquery'],
            exports: 'Backbone'
        },
        'templates': {
            deps: ['underscore'],
            exports: '_templates_app_'
        },


        'jasmine-html': {
            deps: ['jasmine']
        },
        'jasmine-boot': {
            deps: ['jasmine', 'jasmine-html']
        }
    }
});

require(['jasmine-boot'], function () {

    // attach a list of all the specs to be executed here
    var specs = [
        'spec/headerSpec'
    ];

    require(specs, function () {
        window.onload();
    });

});


