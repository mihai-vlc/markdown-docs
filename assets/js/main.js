require.config({
    paths: {
        'jquery': 'libs/jquery.min',
        'underscore': 'libs/underscore',
        'backbone': 'libs/backbone',
        'templates': 'app/templates',
        'prism': 'libs/prism',
        'bootstrap': 'libs/bootstrap.min',
        'lobibox': 'libs/lobibox/lobibox.min',
        'messagebox': 'libs/lobibox/messageboxes.min',
        'inline-attachment': 'libs/inline-attachment',
        'URI': 'app/utils/URI'
    },
    packages: [{
        name: "codemirror",
        location: "libs/codemirror",
        main: "lib/codemirror"
    }],
    shim: {
        'bootstrap': ['jquery'],
        'prism': {
            exports: 'Prism'
        },
        'messagebox': {
            deps: ['jquery', 'lobibox'],
            exports: 'Lobibox'
        },
        'inline-attachment': {
            exports: 'inlineAttachment'
        },
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
