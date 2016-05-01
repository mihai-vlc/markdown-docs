require.config({
    baseUrl: '/assets/js',
    paths: {
      'jquery': 'lib/jquery.min',
      'prism': 'lib/prism',
      'bootstrap': 'lib/bootstrap.min'
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
        }
    }
});


require(['app/app'], function (app) {
    app.init();
});

