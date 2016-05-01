require.config({
    baseUrl: '/assets/js',
    paths: {
      'jquery': 'lib/jquery.min',
      'prism': 'lib/prism',
      'bootstrap': 'lib/bootstrap.min',
      'lobibox': 'lib/lobibox/lobibox.min',
      'messagebox': 'lib/lobibox/messageboxes.min'
    },
    packages: [{
        name: "codemirror",
        location: "lib/codemirror",
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
        }
    }
});


require(['app/app'], function (app) {
    app.init();
});

